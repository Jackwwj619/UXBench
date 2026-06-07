from __future__ import annotations

import asyncio
import os
import re
from pathlib import Path
from typing import Any

from playwright.async_api import Browser, BrowserContext, Page, Playwright, async_playwright

from .schemas import Interactable, LayoutWarning, ToolResult


VIEWPORTS: dict[str, dict[str, int]] = {
    "desktop": {"width": 1280, "height": 800},
    "mobile": {"width": 390, "height": 844},
}


class BrowserTools:
    def __init__(self, run_dir: Path, headless: bool = True, protect_risky_actions: bool = True):
        self.run_dir = run_dir
        self.screenshot_dir = run_dir / "screenshots"
        self.screenshot_dir.mkdir(parents=True, exist_ok=True)
        self.headless = headless
        self.playwright: Playwright | None = None
        self.browser: Browser | None = None
        self.context: BrowserContext | None = None
        self.page: Page | None = None
        self.console_errors: list[str] = []
        self.network_errors: list[str] = []
        self.current_viewport = "desktop"
        self.protect_risky_actions = protect_risky_actions

    async def start(self) -> None:
        self.playwright = await async_playwright().start()
        try:
            self.browser = await self.playwright.chromium.launch(headless=self.headless)
        except Exception as first_error:  # noqa: BLE001
            executable_path = find_installed_browser()
            if not executable_path:
                raise first_error
            self.browser = await self.playwright.chromium.launch(
                headless=self.headless,
                executable_path=executable_path,
                args=["--no-first-run", "--no-default-browser-check"],
            )
        self.context = await self.browser.new_context(viewport=VIEWPORTS["desktop"])
        self.page = await self.context.new_page()
        self._attach_listeners(self.page)

    async def close(self) -> None:
        if self.context:
            await self.context.close()
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()

    def _attach_listeners(self, page: Page) -> None:
        def on_console(msg: Any) -> None:
            if msg.type == "error":
                self.console_errors.append(_trim(msg.text, 500))

        def on_request_failed(request: Any) -> None:
            url = request.url
            if url.startswith("data:"):
                return
            failure = request.failure
            reason = failure if isinstance(failure, str) else getattr(failure, "error_text", "")
            self.network_errors.append(_trim(f"{url} {reason}".strip(), 500))

        page.on("console", on_console)
        page.on("requestfailed", on_request_failed)

    async def open_page(self, url: str) -> ToolResult:
        page = self._page()
        before_url = page.url
        try:
            await page.goto(url, wait_until="load", timeout=15000)
            await self._settle()
            return ToolResult(
                action="open_page",
                before_url=before_url,
                after_url=page.url,
                changed=before_url != page.url,
                feedback=f"Opened {page.url}",
            )
        except Exception as exc:  # noqa: BLE001 - browser errors need to be recorded.
            return ToolResult(
                action="open_page",
                before_url=before_url,
                after_url=page.url,
                error=f"Failed to open page: {exc}",
            )

    async def set_viewport(self, viewport: str) -> None:
        if viewport not in VIEWPORTS:
            raise ValueError(f"Unknown viewport: {viewport}")
        await self._page().set_viewport_size(VIEWPORTS[viewport])
        self.current_viewport = viewport
        await self._settle(short=True)

    async def take_screenshot(self, label: str, full_page: bool = False) -> str:
        safe_label = re.sub(r"[^a-zA-Z0-9_.-]+", "-", label).strip("-") or "screenshot"
        path = self.screenshot_dir / f"{safe_label}.png"
        await self._page().screenshot(path=str(path), full_page=full_page)
        return str(path.resolve())

    async def capture_viewport_pair(self, label: str) -> list[str]:
        original = self.current_viewport
        paths: list[str] = []
        for viewport in ("desktop", "mobile"):
            await self.set_viewport(viewport)
            paths.append(await self.take_screenshot(f"{label}-{viewport}", full_page=False))
        await self.set_viewport(original)
        return paths

    async def get_dom_summary(self) -> dict[str, Any]:
        return await self._page().evaluate(
            """
            () => {
              const text = (document.body && document.body.innerText || "")
                .replace(/\\s+/g, " ")
                .trim();
              const headingNodes = Array.from(document.querySelectorAll("h1,h2,h3")).slice(0, 20);
              const headings = headingNodes.map((el) => el.innerText.trim()).filter(Boolean);
              return {
                title: document.title || "",
                url: location.href,
                visible_text: text.slice(0, 4000),
                text_length: text.length,
                headings,
                counts: {
                  buttons: document.querySelectorAll("button").length,
                  links: document.querySelectorAll("a[href]").length,
                  inputs: document.querySelectorAll("input, textarea, select").length,
                  forms: document.querySelectorAll("form").length,
                  dialogs: document.querySelectorAll("dialog,[role='dialog'],.modal").length
                }
              };
            }
            """
        )

    async def get_interactables(self) -> list[Interactable]:
        raw_items = await self._page().evaluate(INTERACTABLES_JS)
        return [Interactable(**item) for item in raw_items]

    async def measure_layout(self) -> list[LayoutWarning]:
        raw = await self._page().evaluate(LAYOUT_JS)
        warnings: list[LayoutWarning] = []
        for item in raw[:80]:
            warnings.append(LayoutWarning(**item))
        return warnings

    async def click(self, target_id: str) -> ToolResult:
        page = self._page()
        before_url = page.url
        before_text = await self.visible_text(limit=2000)
        info = await self.element_info(target_id)
        target_name = _element_name(info)
        if self.protect_risky_actions and is_final_destructive_text(target_name):
            return ToolResult(
                action="click",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                changed=False,
                error=f"Skipped final destructive confirmation: {target_name}",
                feedback="The target looked like a final destructive/payment confirmation.",
            )

        try:
            await page.locator(f'[data-uxagent-id="{target_id}"]').click(timeout=4000)
            await self._settle()
            after_text = await self.visible_text(limit=2000)
            return ToolResult(
                action="click",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                changed=before_url != page.url or before_text != after_text,
                feedback=_change_feedback(before_url, page.url, before_text, after_text),
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(
                action="click",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                error=f"Click failed for {target_name or target_id}: {exc}",
            )

    async def type_text(self, target_id: str, text: str, enter: bool = False) -> ToolResult:
        page = self._page()
        before_url = page.url
        before_text = await self.visible_text(limit=2000)
        try:
            locator = page.locator(f'[data-uxagent-id="{target_id}"]')
            await locator.fill(text, timeout=4000)
            if enter:
                await locator.press("Enter", timeout=2000)
            await self._settle()
            after_text = await self.visible_text(limit=2000)
            return ToolResult(
                action="type_text",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                changed=before_url != page.url or before_text != after_text or bool(text),
                feedback=_change_feedback(before_url, page.url, before_text, after_text)
                or f"Entered text into {target_id}.",
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(
                action="type_text",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                error=f"Typing failed for {target_id}: {exc}",
            )

    async def hover(self, target_id: str) -> ToolResult:
        page = self._page()
        before_url = page.url
        before_text = await self.visible_text(limit=2000)
        info = await self.element_info(target_id)
        target_name = _element_name(info) or target_id
        try:
            await page.locator(f'[data-uxagent-id="{target_id}"]').hover(timeout=4000)
            await self._settle(short=True)
            after_text = await self.visible_text(limit=2000)
            return ToolResult(
                action="hover",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                changed=before_text != after_text,
                feedback=_change_feedback(before_url, page.url, before_text, after_text)
                or f"Hovered {target_name}.",
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(
                action="hover",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                error=f"Hover failed for {target_name}: {exc}",
            )

    async def select_option(self, target_id: str, value: str | None = None) -> ToolResult:
        page = self._page()
        before_url = page.url
        before_text = await self.visible_text(limit=2000)
        before_value = await self._control_value(target_id)
        try:
            option = await page.evaluate(
                """
                ({ targetId, requestedValue }) => {
                  const el = document.querySelector(`[data-uxagent-id="${targetId}"]`);
                  if (!el || el.tagName.toLowerCase() !== "select") return null;
                  const options = Array.from(el.options || []).filter((option) => !option.disabled);
                  if (!options.length) return null;
                  const current = el.value;
                  let picked = null;
                  if (requestedValue) {
                    const needle = String(requestedValue).toLowerCase();
                    picked = options.find((option) =>
                      String(option.value).toLowerCase() === needle ||
                      String(option.label || option.textContent).toLowerCase().includes(needle)
                    );
                  }
                  if (!picked) picked = options.find((option) => option.value !== current) || options[0];
                  return {
                    value: picked.value,
                    label: (picked.label || picked.textContent || picked.value || "").trim()
                  };
                }
                """,
                {"targetId": target_id, "requestedValue": value},
            )
            if not option:
                return ToolResult(
                    action="select_option",
                    target=target_id,
                    before_url=before_url,
                    after_url=page.url,
                    error=f"No selectable option found for {target_id}.",
                )
            await page.locator(f'[data-uxagent-id="{target_id}"]').select_option(option["value"], timeout=4000)
            await self._settle()
            after_text = await self.visible_text(limit=2000)
            after_value = await self._control_value(target_id)
            return ToolResult(
                action="select_option",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                changed=before_value != after_value or before_text != after_text,
                feedback=f"Selected option '{option['label'] or option['value']}'. "
                + (_change_feedback(before_url, page.url, before_text, after_text) or ""),
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(
                action="select_option",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                error=f"Select option failed for {target_id}: {exc}",
            )

    async def check(self, target_id: str, checked: bool = True) -> ToolResult:
        page = self._page()
        before_url = page.url
        before_text = await self.visible_text(limit=2000)
        state_before = await self._checked_state(target_id)
        try:
            locator = page.locator(f'[data-uxagent-id="{target_id}"]')
            info = await self.element_info(target_id)
            input_type = str(info.get("type") or info.get("input_type") or "").lower()
            tag = str(info.get("tag") or "").lower()
            if tag == "input" and input_type in {"checkbox", "radio"}:
                await locator.set_checked(checked, timeout=4000)
            else:
                if state_before is None:
                    return ToolResult(
                        action="check" if checked else "uncheck",
                        target=target_id,
                        before_url=before_url,
                        after_url=page.url,
                        error="Target does not expose checked state through native input or aria-checked.",
                    )
                if state_before != checked:
                    await locator.click(timeout=4000)
            await self._settle()
            after_text = await self.visible_text(limit=2000)
            state_after = await self._checked_state(target_id)
            return ToolResult(
                action="check" if checked else "uncheck",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                changed=state_before != state_after or before_text != after_text,
                feedback=f"Checked state changed from {state_before} to {state_after}.",
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(
                action="check" if checked else "uncheck",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                error=f"{'Check' if checked else 'Uncheck'} failed for {target_id}: {exc}",
            )

    async def drag(self, target_id: str, delta_x: int = 120, delta_y: int = 0) -> ToolResult:
        page = self._page()
        before_url = page.url
        before_text = await self.visible_text(limit=2000)
        before_value = await self._control_value(target_id)
        try:
            locator = page.locator(f'[data-uxagent-id="{target_id}"]')
            await locator.scroll_into_view_if_needed(timeout=3000)
            box = await locator.bounding_box(timeout=4000)
            if not box:
                return ToolResult(
                    action="drag",
                    target=target_id,
                    before_url=before_url,
                    after_url=page.url,
                    error=f"No bounding box available for {target_id}.",
                )
            start_x = box["x"] + box["width"] / 2
            start_y = box["y"] + box["height"] / 2
            await page.mouse.move(start_x, start_y)
            await page.mouse.down()
            await page.mouse.move(start_x + delta_x, start_y + delta_y, steps=10)
            await page.mouse.up()
            await self._settle()
            after_text = await self.visible_text(limit=2000)
            after_value = await self._control_value(target_id)
            return ToolResult(
                action="drag",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                changed=before_value != after_value or before_text != after_text,
                feedback=_change_feedback(before_url, page.url, before_text, after_text)
                or f"Dragged target by ({delta_x}, {delta_y}); value changed from {before_value} to {after_value}.",
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(
                action="drag",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                error=f"Drag failed for {target_id}: {exc}",
            )

    async def scroll(
        self,
        delta_x: int = 0,
        delta_y: int = 700,
        target_id: str | None = None,
        to: str | None = None,
    ) -> ToolResult:
        page = self._page()
        before_url = page.url
        try:
            positions = await page.evaluate(
                """
                ({ deltaX, deltaY, targetId, to }) => {
                  const before = { x: window.scrollX, y: window.scrollY };
                  if (targetId) {
                    const el = document.querySelector(`[data-uxagent-id="${targetId}"]`);
                    if (el) el.scrollIntoView({ block: "center", inline: "nearest" });
                  } else if (to === "top") {
                    window.scrollTo(0, 0);
                  } else if (to === "bottom") {
                    window.scrollTo(0, document.documentElement.scrollHeight);
                  } else {
                    window.scrollBy(deltaX, deltaY);
                  }
                  const after = { x: window.scrollX, y: window.scrollY };
                  return { before, after };
                }
                """,
                {"deltaX": delta_x, "deltaY": delta_y, "targetId": target_id, "to": to},
            )
            await self._settle(short=True)
            changed = positions["before"] != positions["after"]
            return ToolResult(
                action="scroll",
                target=target_id,
                before_url=before_url,
                after_url=page.url,
                changed=changed,
                feedback=f"Scrolled from {positions['before']} to {positions['after']}.",
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(action="scroll", before_url=before_url, after_url=page.url, error=str(exc))

    async def press_key(self, key: str) -> ToolResult:
        page = self._page()
        before_url = page.url
        before_text = await self.visible_text(limit=2000)
        try:
            await page.keyboard.press(key)
            await self._settle()
            after_text = await self.visible_text(limit=2000)
            return ToolResult(
                action="press_key",
                before_url=before_url,
                after_url=page.url,
                changed=before_url != page.url or before_text != after_text,
                feedback=_change_feedback(before_url, page.url, before_text, after_text),
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(action="press_key", before_url=before_url, after_url=page.url, error=str(exc))

    async def go_back(self) -> ToolResult:
        page = self._page()
        before_url = page.url
        try:
            await page.go_back(wait_until="load", timeout=5000)
            await self._settle()
            return ToolResult(
                action="go_back",
                before_url=before_url,
                after_url=page.url,
                changed=before_url != page.url,
                feedback=f"Navigated back to {page.url}.",
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(action="go_back", before_url=before_url, after_url=page.url, error=str(exc))

    async def go_forward(self) -> ToolResult:
        page = self._page()
        before_url = page.url
        try:
            await page.go_forward(wait_until="load", timeout=5000)
            await self._settle()
            return ToolResult(
                action="go_forward",
                before_url=before_url,
                after_url=page.url,
                changed=before_url != page.url,
                feedback=f"Navigated forward to {page.url}.",
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(action="go_forward", before_url=before_url, after_url=page.url, error=str(exc))

    async def reload(self) -> ToolResult:
        page = self._page()
        before_url = page.url
        try:
            await page.reload(wait_until="load", timeout=10000)
            await self._settle()
            return ToolResult(
                action="reload",
                before_url=before_url,
                after_url=page.url,
                changed=False,
                feedback=f"Reloaded {page.url}.",
            )
        except Exception as exc:  # noqa: BLE001
            return ToolResult(action="reload", before_url=before_url, after_url=page.url, error=str(exc))

    async def wait(self, seconds: float = 1.0) -> ToolResult:
        page = self._page()
        before_url = page.url
        capped = max(0.0, min(float(seconds), 10.0))
        before_text = await self.visible_text(limit=2000)
        await asyncio.sleep(capped)
        after_text = await self.visible_text(limit=2000)
        return ToolResult(
            action="wait",
            before_url=before_url,
            after_url=page.url,
            changed=before_text != after_text,
            feedback=f"Waited {capped:.1f} seconds.",
        )

    async def visible_text(self, limit: int = 4000) -> str:
        text = await self._page().evaluate(
            """() => (document.body && document.body.innerText || "").replace(/\\s+/g, " ").trim()"""
        )
        return text[:limit]

    async def element_info(self, target_id: str) -> dict[str, Any]:
        return await self._page().evaluate(
            """
            (targetId) => {
              const el = document.querySelector(`[data-uxagent-id="${targetId}"]`);
              if (!el) return {};
              return {
                text: (el.innerText || el.textContent || "").replace(/\\s+/g, " ").trim(),
                aria_label: el.getAttribute("aria-label") || "",
                title: el.getAttribute("title") || "",
                value: el.getAttribute("value") || "",
                href: el.getAttribute("href") || "",
                type: el.getAttribute("type") || "",
                tag: el.tagName.toLowerCase()
              };
            }
            """,
            target_id,
        )

    def clear_errors(self) -> None:
        self.console_errors.clear()
        self.network_errors.clear()

    def _page(self) -> Page:
        if self.page is None:
            raise RuntimeError("BrowserTools.start() must be called before use.")
        return self.page

    async def _settle(self, short: bool = False) -> None:
        page = self._page()
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        try:
            await page.wait_for_load_state("networkidle", timeout=1000 if short else 2500)
        except Exception:
            pass
        await asyncio.sleep(0.15 if short else 0.35)

    async def _checked_state(self, target_id: str) -> bool | None:
        return await self._page().evaluate(
            """
            (targetId) => {
              const el = document.querySelector(`[data-uxagent-id="${targetId}"]`);
              if (!el) return null;
              const tag = el.tagName.toLowerCase();
              const type = String(el.getAttribute("type") || "").toLowerCase();
              if (tag === "input" && ["checkbox", "radio"].includes(type)) return Boolean(el.checked);
              const aria = el.getAttribute("aria-checked");
              if (aria === "true") return true;
              if (aria === "false") return false;
              return null;
            }
            """,
            target_id,
        )

    async def _control_value(self, target_id: str) -> str | None:
        return await self._page().evaluate(
            """
            (targetId) => {
              const el = document.querySelector(`[data-uxagent-id="${targetId}"]`);
              if (!el) return null;
              if ("value" in el) return String(el.value);
              return el.getAttribute("aria-valuenow") || el.getAttribute("data-value") || null;
            }
            """,
            target_id,
        )


def is_final_destructive_text(text: str) -> bool:
    normalized = _normalize(text)
    dangerous = [
        "confirm delete",
        "delete account",
        "delete my",
        "remove permanently",
        "permanently delete",
        "place order",
        "purchase",
        "pay now",
        "submit payment",
        "confirm payment",
        "cancel application",
        "clear all data",
        "close account",
    ]
    return any(term in normalized for term in dangerous)


def find_installed_browser() -> str | None:
    env_path = os.environ.get("UXAGENT_BROWSER_PATH")
    if env_path and Path(env_path).exists():
        return env_path

    candidates = [
        os.path.join(os.environ.get("PROGRAMFILES", ""), "Google", "Chrome", "Application", "chrome.exe"),
        os.path.join(os.environ.get("PROGRAMFILES(X86)", ""), "Google", "Chrome", "Application", "chrome.exe"),
        os.path.join(os.environ.get("LOCALAPPDATA", ""), "Google", "Chrome", "Application", "chrome.exe"),
        os.path.join(os.environ.get("PROGRAMFILES", ""), "Microsoft", "Edge", "Application", "msedge.exe"),
        os.path.join(os.environ.get("PROGRAMFILES(X86)", ""), "Microsoft", "Edge", "Application", "msedge.exe"),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate
    return None


def _element_name(info: dict[str, Any]) -> str:
    return " ".join(str(info.get(key, "") or "") for key in ("aria_label", "text", "title", "value", "href")).strip()


def _normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower()).strip()


def _trim(text: str, limit: int) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    return text[:limit]


def _change_feedback(before_url: str, after_url: str, before_text: str, after_text: str) -> str:
    if before_url != after_url:
        return f"URL changed from {before_url} to {after_url}."
    if before_text != after_text:
        return "Visible content changed after the action."
    return "No obvious URL or visible-text change was detected after the action."


INTERACTABLES_JS = r"""
() => {
  window.__uxagentCounter = window.__uxagentCounter || 0;
  const selector = [
    "a[href]",
    "button",
    "input",
    "textarea",
    "select",
    "[role='button']",
    "[role='link']",
    "[role='checkbox']",
    "[role='radio']",
    "[role='switch']",
    "[role='slider']",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  function visible(el) {
    const style = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" &&
      rect.width > 0 && rect.height > 0;
  }

  function clean(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function labelFor(el) {
    if (el.labels && el.labels.length) {
      return clean(Array.from(el.labels).map((label) => label.innerText).join(" "));
    }
    if (el.id && window.CSS && CSS.escape) {
      const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (label) return clean(label.innerText);
    }
    const parent = el.closest("label");
    return parent ? clean(parent.innerText) : "";
  }

  function kindFor(el) {
    const tag = el.tagName.toLowerCase();
    const type = (el.getAttribute("type") || "").toLowerCase();
    const role = (el.getAttribute("role") || "").toLowerCase();
    if (tag === "select") return "selectable";
    if (["checkbox", "radio", "switch", "slider"].includes(role)) return "clickable";
    if ((tag === "input" || tag === "textarea") &&
        !["button", "submit", "reset", "checkbox", "radio", "range", "file", "hidden"].includes(type)) {
      return "typeable";
    }
    if (tag === "button" || tag === "a" || role === "button" || role === "link" ||
        ["button", "submit", "reset", "checkbox", "radio", "range", "file"].includes(type)) {
      return "clickable";
    }
    return "other";
  }

  const seen = new Set();
  const items = [];
  for (const el of Array.from(document.querySelectorAll(selector))) {
    if (seen.has(el) || !visible(el)) continue;
    seen.add(el);
    if (!el.dataset.uxagentId) {
      window.__uxagentCounter += 1;
      el.dataset.uxagentId = `ux-${window.__uxagentCounter}`;
    }
    const rect = el.getBoundingClientRect();
    const tag = el.tagName.toLowerCase();
    const label = labelFor(el);
    const text = clean(el.innerText || el.textContent);
    const aria = clean(el.getAttribute("aria-label"));
    const placeholder = clean(el.getAttribute("placeholder"));
    const value = clean(el.getAttribute("value"));
    const href = clean(el.getAttribute("href"));
    const title = clean(el.getAttribute("title"));
    const name = aria || label || text || placeholder || value || title || href;
    items.push({
      target_id: el.dataset.uxagentId,
      tag,
      kind: kindFor(el),
      role: el.getAttribute("role") || null,
      name: name.slice(0, 220),
      text: text.slice(0, 220),
      aria_label: aria.slice(0, 220),
      label: label.slice(0, 220),
      placeholder: placeholder.slice(0, 220),
      href: href.slice(0, 300),
      input_type: clean(el.getAttribute("type")).slice(0, 80),
      enabled: !el.disabled && el.getAttribute("aria-disabled") !== "true",
      visible: true,
      bbox: {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      }
    });
  }
  return items.slice(0, 250);
}
"""


LAYOUT_JS = r"""
() => {
  const warnings = [];
  const selector = "a[href],button,input,textarea,select,[role='button'],[role='link']";

  function clean(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function visible(el) {
    const style = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" &&
      rect.width > 0 && rect.height > 0;
  }

  function labelFor(el) {
    if (el.labels && el.labels.length) return clean(Array.from(el.labels).map((l) => l.innerText).join(" "));
    if (el.id && window.CSS && CSS.escape) {
      const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (label) return clean(label.innerText);
    }
    const parent = el.closest("label");
    return parent ? clean(parent.innerText) : "";
  }

  function nameFor(el) {
    return clean(el.getAttribute("aria-label")) ||
      labelFor(el) ||
      clean(el.innerText || el.textContent) ||
      clean(el.getAttribute("placeholder")) ||
      clean(el.getAttribute("value")) ||
      clean(el.getAttribute("title"));
  }

  if (document.documentElement.scrollWidth > window.innerWidth + 4) {
    warnings.push({
      kind: "horizontal_overflow",
      severity: "medium",
      message: `Page width ${document.documentElement.scrollWidth}px exceeds viewport ${window.innerWidth}px.`,
      target_id: null,
      evidence: { scroll_width: document.documentElement.scrollWidth, viewport_width: window.innerWidth }
    });
  }

  const controls = Array.from(document.querySelectorAll(selector)).filter(visible).slice(0, 180);
  for (const el of controls) {
    const rect = el.getBoundingClientRect();
    const targetId = el.dataset.uxagentId || null;
    const tag = el.tagName.toLowerCase();
    const name = nameFor(el);
    const type = clean(el.getAttribute("type")).toLowerCase();

    if ((tag === "button" || tag === "a" || el.getAttribute("role") === "button") && !name) {
      warnings.push({
        kind: "empty_interactive_label",
        severity: "medium",
        message: "An interactive control has no visible or accessible label.",
        target_id: targetId,
        evidence: { tag, x: Math.round(rect.x), y: Math.round(rect.y) }
      });
    }

    if (["input", "textarea", "select"].includes(tag) &&
        !["hidden", "submit", "button", "reset"].includes(type) &&
        !labelFor(el) && !clean(el.getAttribute("aria-label")) && !clean(el.getAttribute("placeholder"))) {
      warnings.push({
        kind: "missing_input_label",
        severity: "medium",
        message: "A form field has no label, aria-label, or placeholder.",
        target_id: targetId,
        evidence: { tag, type, x: Math.round(rect.x), y: Math.round(rect.y) }
      });
    }

    if ((tag === "button" || tag === "a" || type === "checkbox" || type === "radio") &&
        (rect.width < 44 || rect.height < 44)) {
      warnings.push({
        kind: "small_tap_target",
        severity: "low",
        message: `Tap target is ${Math.round(rect.width)}x${Math.round(rect.height)}px, below the 44px mobile guidance.`,
        target_id: targetId,
        evidence: { width: Math.round(rect.width), height: Math.round(rect.height), name: name.slice(0, 80) }
      });
    }
  }

  return warnings;
}
"""
