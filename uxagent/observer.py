from __future__ import annotations

from .schemas import Observation
from .tools import BrowserTools


class PageObserver:
    def __init__(self, tools: BrowserTools):
        self.tools = tools

    async def observe(self, step_id: str) -> Observation:
        dom_summary = await self.tools.get_dom_summary()
        interactables = await self.tools.get_interactables()
        layout_warnings = await self.tools.measure_layout()
        screenshot = await self.tools.take_screenshot(f"{step_id}-{self.tools.current_viewport}")
        page = self.tools._page()
        return Observation(
            step_id=step_id,
            url=page.url,
            title=await page.title(),
            viewport=self.tools.current_viewport,
            screenshot_path=screenshot,
            visible_text=dom_summary.get("visible_text", ""),
            dom_summary=dom_summary,
            interactables=interactables,
            console_errors=list(self.tools.console_errors[-20:]),
            network_errors=list(self.tools.network_errors[-20:]),
            layout_warnings=layout_warnings,
        )

