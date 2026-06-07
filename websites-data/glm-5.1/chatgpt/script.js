document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOpen = document.getElementById('sidebarOpen');
    const newChatBtn = document.getElementById('newChatBtn');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const modelSelector = document.getElementById('modelSelector');
    const modelDropdown = document.getElementById('modelDropdown');
    const userMenu = document.getElementById('userMenu');
    const userMenuDropdown = document.getElementById('userMenuDropdown');
    const voiceBtn = document.getElementById('voiceBtn');

    let isGenerating = false;
    let currentChat = 'current';
    let conversationState = 'initial';
    let drafts = {};

    const chatGPTIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.28 9.37a5.88 5.88 0 00-.51-4.85 5.96 5.96 0 00-6.42-2.86A5.9 5.9 0 0011 0a5.96 5.96 0 00-5.68 4.12 5.88 5.88 0 00-3.93 2.85 5.96 5.96 0 00.74 6.98 5.88 5.88 0 00.51 4.85 5.96 5.96 0 006.42 2.86A5.9 5.9 0 0013 24a5.96 5.96 0 005.68-4.12 5.88 5.88 0 003.93-2.85 5.96 5.96 0 00-.74-6.98" fill="currentColor"/></svg>`;

    // Frontend-only mock: all responses are hardcoded text triggered by keyword matching, no real LLM calls.
    const responses = {
        travel: `Here's a travel plan for Tokyo that fits your constraints:

**5-Day Tokyo Itinerary (Budget: $2000, Vegetarian-Friendly)**

**Day 1 - Arrival & Shibuya**
- Check into hotel in Shinjuku area (~$120/night)
- Explore Shibuya Crossing and Hachiko statue
- Dinner at Afuri Ramen (excellent vegetarian options)

**Day 2 - Traditional Tokyo**
- Senso-ji Temple in Asakusa (free)
- Nakamise shopping street
- Ueno Park and museums (~$10)
- Vegetarian kaiseki dinner at Sougo (~$40)

**Day 3 - Harajuku & Shibuya**
- Meiji Shrine (free)
- Takeshita Street shopping
- Yoyogi Park
- Ain Soph Journey for vegan burgers

**Day 4 - Day Trip to Kamakura**
- Great Buddha (~$3)
- Hokokuji Bamboo Temple (~$3)
- Beach walk
- Train pass (~$15 round trip)

**Day 5 - Akihabara & Departure**
- Electric Town exploration
- Last-minute shopping
- Airport transfer

**Estimated Budget Breakdown:**
- Accommodation: $600 (5 nights)
- Food: $400 ($80/day vegetarian dining)
- Transport: $200 (Suica card + day trips)
- Activities: $150
- Shopping/misc: $250
- Buffer: $400

**Tips:**
- Get a Suica card for easy transit
- Download Google Translate for menus
- "Yasai" means vegetables in Japanese
- Many Buddhist temples have vegetarian restaurants nearby

Would you like me to adjust anything about this plan?`,

        budget_lower: `Here's the revised plan with a tighter budget of **$1200**:

**5-Day Tokyo (Budget Edition)**

**Accommodation: $300 total**
- Stay at a well-rated hostel like Nui. or K's House (~$60/night)
- Private rooms available for slightly more

**Food: $200 total ($40/day)**
- Breakfast: Convenience store onigiri & fruit (~$5)
- Lunch: Vegetarian set meals at local spots (~$10-12)
- Dinner: Rotate between curry houses, ramen shops, and izakayas (~$15-20)
- Tip: 7-Eleven and Lawson have great cheap vegetarian options

**Transport: $120**
- Get a 72-hour Tokyo Metro pass ($15)
- Walk when possible (Tokyo is very walkable)
- Skip the Kamakura day trip or use local trains

**Activities: $80**
- Focus on free attractions: Meiji Shrine, Senso-ji, parks, markets
- One paid museum or experience
- Free observation decks (Tokyo Metropolitan Government Building)

**Shopping/Buffer: $500**

**Key Money-Saving Tips:**
1. Eat at conveyor belt sushi (kaitenzushi) - many veggie options for $1-2/plate
2. Visit Don Quijote for cheap snacks and souvenirs
3. Use the free walking tours (tip-based)
4. Fill water bottles at stations (tap water is safe)
5. Visit temples early morning for fewer crowds and free entry

**Revised Total: ~$1,200**

This keeps the core experience intact while cutting accommodation and food costs significantly. Want me to adjust further or focus on specific aspects?`,

        weekend_trip: `Here are a few weekend trip ideas that work well for a 2–3 day getaway from a major city:

**Option 1 — City Escape (1.5–2 hr drive / train)**
- Pick a nearby city you haven't fully explored
- Day 1: arrive afternoon, neighborhood walk, dinner at a local favorite
- Day 2: morning museum or landmark + afternoon park / market, evening live music or sports
- Day 3: brunch + one last attraction, head home by mid-afternoon

**Option 2 — Nature Reset**
- Aim for a state / national park within 2–3 hours
- Day 1: drive in, easy 2–3 mile trail, lodge or cabin check-in
- Day 2: full-day hike (start early), packed lunch, scenic drive at sunset
- Day 3: lazy morning, one short trail, drive home

**Option 3 — Coastal or Lake Town**
- Beach or lakeside town within 2–3 hours
- Mix of swimming, seafood, slow walks, sunset views
- Bring layers — coast evenings are cooler than you think

**Practical checklist**
1. Book accommodation early — weekend rates spike Thursday night
2. Top off fuel + check tire pressure before you leave
3. Download offline maps for spotty cell areas
4. Carry some cash for small-town parking / vendors
5. Reusable water bottle + snacks save \$15+ per stop

Tell me your starting city and what vibe you're after (food, nature, history, nightlife) and I'll narrow it down to specific destinations.`,

        professional_email: `Sure — here's a flexible template you can adapt. If you tell me the recipient, goal, and any background, I'll draft the actual email.

**General-purpose professional email**

> **Subject:** [Clear, 5–8 words — the topic or action]
>
> Hi [Name],
>
> [1 sentence — warm opener or reference to a prior thread.]
>
> [1–2 sentences — what you're writing about, with the key fact upfront.]
>
> [1–2 sentences — what you need from them or what you're offering. Be specific about scope and timing.]
>
> [Optional 1 sentence — what happens next, or why it matters.]
>
> Thanks,
> [Your name]

**Five tips that make professional emails land**
1. Put the ask in the subject line ("Quick question on Q3 budget", not "Hello")
2. Lead with the conclusion, then context — busy readers skim
3. One ask per email; multiple asks get half-answered
4. Be explicit about deadlines ("by Friday EOD") rather than vague ("soon")
5. End with a clear next step, not just "let me know"

Share the recipient, the goal, and any history, and I'll turn this skeleton into a real draft you can send.`,

        quantum_computing: `Quantum computing is a different way of doing computation that uses the rules of quantum mechanics. Here's the simplest version:

**Classical bit vs. quantum bit (qubit)**
- A normal computer stores information in **bits** — each bit is 0 or 1, like a switch off or on.
- A quantum computer uses **qubits**. A qubit can be 0, 1, or a *blend* of both at once. That blend is called **superposition**.

**Why the blend matters**
Imagine a coin spinning in the air. While it's spinning, it isn't heads or tails — it's both possibilities at once. A qubit is a little like that spinning coin: until you "look" (measure), it's in a mix of states.

- 2 classical bits represent 1 of 4 values (00, 01, 10, 11)
- 2 qubits can represent **all 4 at the same time**
- 50 qubits can hold a state space bigger than a quadrillion classical bits

**Entanglement**
Qubits can be linked so the state of one instantly correlates with another, even at a distance. This lets quantum machines coordinate calculations in ways classical machines can't.

**What this is actually good for**
Quantum computers aren't faster at everything. They shine at a narrow set of problems:
- Factoring huge numbers (Shor's algorithm — breaks current public-key crypto)
- Simulating molecules and materials (drug discovery, chemistry)
- Certain optimization problems with massive option spaces
- A handful of machine-learning subroutines

For email, video, gaming — your laptop is still better.

**Where we are today**
- Hardware exists but is noisy: hundreds to a few thousand qubits, error-prone
- Most active research is error correction and hybrid classical + quantum algorithms
- "Useful" quantum advantage on practical problems is still in early days

Want me to go deeper on superposition, entanglement, or specific algorithms like Shor's or Grover's?`,

        python_debug: `Happy to help — paste the code and the error message and I'll dig in. Meanwhile, here's a debugging workflow that catches most Python bugs fast.

**1. Read the traceback bottom-up**
The last line tells you *what* went wrong; the lines above tell you *where*. Common ones:
- \`TypeError\` — wrong type passed (often \`None\` where an object was expected)
- \`IndexError\` / \`KeyError\` — accessing a missing list / dict entry
- \`AttributeError: 'NoneType' object has no attribute ...\` — a function returned \`None\` when you expected a value
- \`ImportError\` / \`ModuleNotFoundError\` — wrong env or missing dependency

**2. Print + isolate**
Add \`print(type(x), repr(x))\` around the suspect line. Cheap, fast, works everywhere.

**3. Drop into a debugger**
\`\`\`python
breakpoint()   # Python 3.7+
# or: import pdb; pdb.set_trace()
\`\`\`
Then use \`n\` (next), \`s\` (step into), \`p var\` (print), \`l\` (list code), \`c\` (continue).

**4. Common Python gotchas**
- Mutable default arguments: \`def f(x=[])\` — that list is shared across calls
- \`is\` vs \`==\`: use \`==\` for equality, \`is\` only for \`None\` / singletons
- Integer vs float division: \`/\` returns float, \`//\` returns int
- Tabs mixed with spaces in indentation (\`python -tt yourfile.py\` flags this)
- Iterating and modifying the same list / dict at once
- f-strings missing the \`f\` prefix

**5. Reproduce in isolation**
Strip the code down to the smallest snippet that still fails. About 70% of the time you find the bug while doing that.

Send me the traceback (all of it), the function where it happens, and what you expected vs. what you got — I'll pinpoint the fix.`,

        explain_concept: `Sure — to give a clear explanation, I'll use a four-layer approach. Pick a topic and I'll fill these in concretely, but here's the structure I'll follow:

**1. One-sentence definition**
The simplest accurate version, no jargon. If a smart 12-year-old can't follow it, the sentence isn't good enough yet.

**2. A familiar analogy**
Connect the new concept to something the reader already knows. Analogies are imperfect, so I'll note where they break down.

**3. Why it matters / where you'd see it**
Without this, the concept feels abstract. A concrete use case anchors it.

**4. One layer deeper**
Add the next piece of mechanism — how it actually works, or what makes it non-obvious. Stop before it becomes a textbook.

**Example: "What is recursion?"**
1. *Definition:* a function that calls itself to solve smaller versions of the same problem.
2. *Analogy:* Russian nesting dolls — to open the biggest one, you open the next-smaller, and the next, until the smallest doll (the "base case") has nothing inside.
3. *Why it matters:* it's the cleanest way to walk tree-shaped data (file systems, HTML, JSON) and to express problems like factorial, Fibonacci, or maze-solving.
4. *Deeper:* every recursive call adds a frame to the call stack. Forget the base case and you get a stack overflow.

Tell me the concept you want explained — physics, code, philosophy, finance — and I'll run it through this template.`,

        code_general: `Happy to help with code. To give you something useful, I usually need three things:

1. **Language and version** (Python 3.12, Node 20, Go 1.22, etc.)
2. **What you're trying to do** — the end goal, not just the immediate symptom
3. **What you've tried** + the actual error or unexpected output

While you put that together, here's a general-purpose debugging checklist that solves a surprising share of "my code doesn't work" cases:

**Quick checks**
- Read the error message slowly, all of it — the answer is often literally in there
- Print the inputs to the failing function: are they the type and shape you assumed?
- Did the bug start after a recent change? \`git diff\` is your friend
- Restart the dev server / kernel / shell — stale state masks real bugs
- Search the exact error string — chances are someone hit it before

**If it's logic, not an exception**
- Add an assertion or print at every step where you *think* a value is correct
- Walk through the code with the smallest possible input by hand
- Write a tiny test that reproduces the bug — once it's reproducible, it's fixable

Drop the snippet + the symptom and I'll dig in.`,

        default: `Great question — here's how I'd approach it.

**1. Clarify the goal**
Are you looking for a quick answer, a step-by-step plan, or a deep explanation? The more specific the goal, the more useful I can be.

**2. Break it into smaller pieces**
Most questions get easier once split into 2–3 sub-questions. "How do I do X?" usually becomes: *What are the inputs?* → *What's the standard approach?* → *What goes wrong in practice?*

**3. Common things I can help with**
- Drafting and rewriting (emails, docs, blog posts, code)
- Explaining concepts (technical, scientific, historical)
- Planning (trips, projects, learning paths, events)
- Analyzing (text, data, decisions, trade-offs)
- Coding (writing, debugging, reviewing, refactoring)

If you share a bit more context — what you've tried, where you're stuck, or what the final output should look like — I'll give you something much more tailored.

Which direction would you like to go?`
    };

    function initChat() {
        showConversation();
    }

    function showConversation() {
        chatMessages.innerHTML = '';
        addMessage('user', 'Plan a 5-day trip to Tokyo for me. I have a budget of $2000, I\'m vegetarian, and I want a mix of cultural experiences and modern city life. I prefer walking-friendly areas and need restaurant recommendations that accommodate dietary restrictions.');
        addMessage('assistant', responses.travel);
        conversationState = 'replied';
    }

    function showWelcomeScreen() {
        chatMessages.innerHTML = `
            <div class="welcome-screen">
                <svg class="welcome-logo" viewBox="0 0 24 24" fill="none">
                    <path d="M22.28 9.37a5.88 5.88 0 00-.51-4.85 5.96 5.96 0 00-6.42-2.86A5.9 5.9 0 0011 0a5.96 5.96 0 00-5.68 4.12 5.88 5.88 0 00-3.93 2.85 5.96 5.96 0 00.74 6.98 5.88 5.88 0 00.51 4.85 5.96 5.96 0 006.42 2.86A5.9 5.9 0 0013 24a5.96 5.96 0 005.68-4.12 5.88 5.88 0 003.93-2.85 5.96 5.96 0 00-.74-6.98" fill="#fff"/>
                </svg>
                <h1>How can I help you today?</h1>
                <div class="welcome-suggestions">
                    <div class="suggestion-card" data-prompt="Plan a weekend trip to a nearby city">
                        <div class="title">Plan a trip</div>
                        <div class="desc">Help me organize a weekend getaway</div>
                    </div>
                    <div class="suggestion-card" data-prompt="Help me write a professional email">
                        <div class="title">Write an email</div>
                        <div class="desc">Draft a professional message</div>
                    </div>
                    <div class="suggestion-card" data-prompt="Explain quantum computing in simple terms">
                        <div class="title">Explain a concept</div>
                        <div class="desc">Break down complex topics simply</div>
                    </div>
                    <div class="suggestion-card" data-prompt="Help me debug my Python code">
                        <div class="title">Debug code</div>
                        <div class="desc">Find and fix issues in your code</div>
                    </div>
                </div>
            </div>
        `;

        document.querySelectorAll('.suggestion-card').forEach(card => {
            card.addEventListener('click', () => {
                const prompt = card.dataset.prompt;
                messageInput.value = prompt;
                messageInput.dispatchEvent(new Event('input'));
                sendMessage();
            });
        });
    }

    function addMessage(role, content) {
        const msgEl = document.createElement('div');
        msgEl.className = 'message';

        const avatar = role === 'user'
            ? `<div class="message-avatar user">J</div>`
            : `<div class="message-avatar assistant">${chatGPTIcon}</div>`;

        const formattedContent = formatContent(content);

        const actions = role === 'assistant' ? `
            <div class="message-actions">
                <button class="message-action-btn" aria-label="Copy">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                    </svg>
                </button>
                <button class="message-action-btn" aria-label="Thumbs up">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
                        <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                    </svg>
                </button>
                <button class="message-action-btn" aria-label="Thumbs down">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/>
                        <path d="M17 2h3a2 2 0 012 2v7a2 2 0 01-2 2h-3"/>
                    </svg>
                </button>
                <button class="message-action-btn" aria-label="Regenerate">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 4v6h6"/><path d="M23 20v-6h-6"/>
                        <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/>
                    </svg>
                </button>
            </div>
        ` : '';

        msgEl.innerHTML = `${avatar}<div class="message-content">${formattedContent}${actions}</div>`;
        chatMessages.appendChild(msgEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function formatContent(text) {
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^\- (.+)$/gm, '<li>$1</li>')
            .replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

        const paragraphs = html.split('\n\n');
        return paragraphs.map(p => {
            if (p.includes('<li>')) {
                return `<ul>${p}</ul>`;
            }
            return `<p>${p.replace(/\n/g, '<br>')}</p>`;
        }).join('');
    }

    function showTypingIndicator() {
        const msgEl = document.createElement('div');
        msgEl.className = 'message typing-message';
        msgEl.innerHTML = `
            <div class="message-avatar assistant">${chatGPTIcon}</div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(msgEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typing = chatMessages.querySelector('.typing-message');
        if (typing) typing.remove();
    }

    async function streamResponse(text) {
        removeTypingIndicator();

        const msgEl = document.createElement('div');
        msgEl.className = 'message';
        msgEl.innerHTML = `
            <div class="message-avatar assistant">${chatGPTIcon}</div>
            <div class="message-content"><p class="streaming-cursor"></p></div>
        `;
        chatMessages.appendChild(msgEl);

        const contentEl = msgEl.querySelector('.message-content');
        const streamEl = contentEl.querySelector('p');
        let charIndex = 0;
        const chunkSize = 3;

        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (!isGenerating || charIndex >= text.length) {
                    clearInterval(interval);
                    streamEl.classList.remove('streaming-cursor');
                    contentEl.innerHTML = formatContent(text);
                    contentEl.innerHTML += `
                        <div class="message-actions">
                            <button class="message-action-btn" aria-label="Copy">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                                </svg>
                            </button>
                            <button class="message-action-btn" aria-label="Thumbs up">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                                </svg>
                            </button>
                            <button class="message-action-btn" aria-label="Thumbs down">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path d="M17 2h3a2 2 0 012 2v7a2 2 0 01-2 2h-3"/>
                                </svg>
                            </button>
                            <button class="message-action-btn" aria-label="Regenerate">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/>
                                </svg>
                            </button>
                        </div>
                    `;
                    isGenerating = false;
                    resolve();
                    return;
                }
                charIndex += chunkSize;
                streamEl.textContent = text.substring(0, charIndex);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 15);
        });
    }

    function pickResponse(text) {
        const t = text.toLowerCase();

        // Keyword matching first (covers welcome screen's 4 suggestion cards + initial Tokyo conversation)
        if (t.includes('budget') && (t.includes('low') || t.includes('cheap') || t.includes('less') || t.includes('reduce'))) {
            return responses.budget_lower;
        }
        if ((t.includes('weekend') && t.includes('trip')) || t.includes('getaway') || t.includes('weekend trip')) {
            return responses.weekend_trip;
        }
        if (t.includes('email') || t.includes('letter') || t.includes('message draft')) {
            return responses.professional_email;
        }
        if (t.includes('quantum')) {
            return responses.quantum_computing;
        }
        if (t.includes('debug') || t.includes('python') || t.includes('stack trace') || t.includes('traceback')) {
            return responses.python_debug;
        }
        if (t.includes('explain') || t.includes('what is') || t.includes('how does') || t.includes('concept')) {
            return responses.explain_concept;
        }
        if (t.includes('code') || t.includes('javascript') || t.includes('typescript') || t.includes('function') || t.includes('bug')) {
            return responses.code_general;
        }
        if (t.includes('tokyo') || t.includes('japan') || (t.includes('trip') && (t.includes('plan') || t.includes('vegetarian')))) {
            return responses.travel;
        }

        // No keyword match: after the first round, default to budget_lower (continues the initial Tokyo chat); otherwise fall back to default
        if (conversationState === 'replied') return responses.budget_lower;
        return responses.default;
    }

    async function sendMessage() {
        const text = messageInput.value.trim();
        if (!text || isGenerating) return;

        addMessage('user', text);
        messageInput.value = '';
        messageInput.style.height = 'auto';
        sendBtn.classList.remove('active');
        delete drafts[currentChat];

        isGenerating = true;
        showTypingIndicator();

        await new Promise(r => setTimeout(r, 1500));

        const response = pickResponse(text);

        conversationState = 'followup';
        await streamResponse(response);
    }

    // Event Listeners
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
        sendBtn.classList.toggle('active', messageInput.value.trim().length > 0);
    });

    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    sendBtn.addEventListener('click', sendMessage);

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    // Start with sidebar collapsed on mobile so chat is visible and open-button is reachable
    if (isMobile()) {
        sidebar.classList.add('collapsed');
    }

    sidebarClose.addEventListener('click', () => {
        sidebar.classList.add('collapsed');
        document.getElementById('sidebarOpen').style.display = 'flex';
    });

    document.getElementById('sidebarOpen').addEventListener('click', () => {
        sidebar.classList.remove('collapsed');
        if (!isMobile()) {
            document.getElementById('sidebarOpen').style.display = 'none';
        }
    });

    // Close sidebar on mobile when tapping outside
    document.addEventListener('click', (e) => {
        if (isMobile() && !sidebar.classList.contains('collapsed')) {
            if (!sidebar.contains(e.target) && e.target.id !== 'sidebarOpen' && !e.target.closest('#sidebarOpen')) {
                sidebar.classList.add('collapsed');
            }
        }
    });

    newChatBtn.addEventListener('click', () => {
        currentChat = 'new';
        conversationState = 'initial';
        drafts = {};
        messageInput.value = '';
        sendBtn.classList.remove('active');
        document.getElementById('inputArea').style.display = '';
        document.querySelectorAll('.chat-history-item').forEach(i => i.classList.remove('active'));
        showWelcomeScreen();
    });

    modelSelector.addEventListener('click', (e) => {
        e.stopPropagation();
        const shown = modelDropdown.classList.toggle('show');
        modelSelector.setAttribute('aria-expanded', shown ? 'true' : 'false');
    });
    modelSelector.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            modelSelector.click();
        }
    });

    document.querySelectorAll('.model-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.model-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            const name = opt.querySelector('.model-name').textContent;
            modelSelector.querySelector('span').textContent = name;
            modelDropdown.classList.remove('show');
            showToast('Switched to ' + name);
        });
    });

    userMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenuDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        modelDropdown.classList.remove('show');
        userMenuDropdown.classList.remove('show');
    });

    document.querySelectorAll('.chat-history-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Save current draft
            if (currentChat && messageInput.value.trim()) {
                drafts[currentChat] = messageInput.value;
            }
            document.querySelectorAll('.chat-history-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            currentChat = item.dataset.chat;
            // Restore draft for the new chat
            messageInput.value = drafts[currentChat] || '';
            sendBtn.classList.toggle('active', messageInput.value.trim().length > 0);
            if (currentChat === 'current') {
                showConversation();
            } else {
                chatMessages.innerHTML = `
                    <div class="message">
                        <div class="message-avatar user">J</div>
                        <div class="message-content"><p>This is a previous conversation.</p></div>
                    </div>
                    <div class="message">
                        <div class="message-avatar assistant">${chatGPTIcon}</div>
                        <div class="message-content"><p>I'd be happy to help you continue this conversation. What would you like to discuss?</p></div>
                    </div>
                `;
            }
        });
    });

    voiceBtn.addEventListener('click', () => {
        voiceBtn.style.color = '#ef4444';
        setTimeout(() => {
            voiceBtn.style.color = '';
            messageInput.value = 'Can you make the budget even lower?';
            messageInput.dispatchEvent(new Event('input'));
        }, 2000);
    });

    // Share button
    const shareModalOverlay = document.getElementById('shareModalOverlay');
    const shareModalCopy = document.getElementById('shareModalCopy');
    const shareModalClose = document.getElementById('shareModalClose');
    document.getElementById('shareBtn').addEventListener('click', () => {
        shareModalOverlay.classList.add('show');
    });
    shareModalCopy.addEventListener('click', () => {
        const url = document.getElementById('shareModalUrl').textContent;
        navigator.clipboard.writeText(url).catch(() => {});
        shareModalCopy.textContent = 'Copied!';
        setTimeout(() => { shareModalCopy.textContent = 'Copy link'; }, 2000);
    });
    shareModalClose.addEventListener('click', () => {
        shareModalOverlay.classList.remove('show');
    });
    shareModalOverlay.addEventListener('click', (e) => {
        if (e.target === shareModalOverlay) shareModalOverlay.classList.remove('show');
    });

    // Attach button
    document.querySelector('.attach-btn').addEventListener('click', () => {
        showToast('File upload is available on Plus plan');
    });

    // Explore GPTs
    document.getElementById('exploreApps').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('inputArea').style.display = 'none';
        chatMessages.innerHTML = `
            <div class="welcome-screen">
                <h1>Explore GPTs</h1>
                <p style="color:var(--text-muted);margin-bottom:24px;">Discover and use custom GPTs created by the community</p>
                <div class="welcome-suggestions">
                    <div class="suggestion-card">
                        <div class="title">DALL-E</div>
                        <div class="desc">Turn your ideas into images</div>
                    </div>
                    <div class="suggestion-card">
                        <div class="title">Data Analyst</div>
                        <div class="desc">Analyze and visualize your data</div>
                    </div>
                    <div class="suggestion-card">
                        <div class="title">Creative Writing Coach</div>
                        <div class="desc">Get feedback on your writing</div>
                    </div>
                    <div class="suggestion-card">
                        <div class="title">Math Tutor</div>
                        <div class="desc">Step-by-step math help</div>
                    </div>
                </div>
            </div>
        `;
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    const searchContainer = searchInput.parentElement;
    const searchClear = document.createElement('button');
    searchClear.className = 'search-clear';
    searchClear.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    searchClear.style.display = 'none';
    searchContainer.appendChild(searchClear);

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        document.querySelectorAll('.chat-history-item').forEach(item => {
            item.style.display = 'flex';
        });
        const emptyState = searchContainer.parentElement.querySelector('.search-empty');
        if (emptyState) emptyState.remove();
        searchInput.focus();
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchClear.style.display = query.length > 0 ? 'flex' : 'none';
        let visibleCount = 0;
        document.querySelectorAll('.chat-history-item').forEach(item => {
            const text = item.querySelector('span').textContent.toLowerCase();
            const matches = text.includes(query);
            item.style.display = matches ? 'flex' : 'none';
            if (matches) visibleCount++;
        });
        const existingEmpty = searchContainer.parentElement.querySelector('.search-empty');
        if (existingEmpty) existingEmpty.remove();
        if (query.length > 0 && visibleCount === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'search-empty';
            emptyDiv.setAttribute('aria-live', 'polite');
            emptyDiv.textContent = 'No chats match "' + searchInput.value + '"';
            emptyDiv.style.cssText = 'padding:16px 12px;color:var(--text-muted);font-size:13px;text-align:center;';
            searchContainer.parentElement.insertBefore(emptyDiv, searchContainer.nextSibling);
        }
    });

    // Settings menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const text = item.textContent.trim();
            if (text === 'Settings') {
                e.preventDefault();
                userMenuDropdown.classList.remove('show');
                showSettingsModal();
            } else if (text === 'Help & FAQ') {
                e.preventDefault();
                userMenuDropdown.classList.remove('show');
                showToast('Opening Help Center...');
            } else if (text === 'Release notes') {
                e.preventDefault();
                userMenuDropdown.classList.remove('show');
                showToast('Opening release notes...');
            }
        });
    });

    // Copy button on messages
    document.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('.message-action-btn[aria-label="Copy"]');
        if (copyBtn) {
            const msgContent = copyBtn.closest('.message-content');
            const text = msgContent.querySelector('p') ? msgContent.innerText : '';
            showToast('Copied to clipboard');
        }
        const thumbsUp = e.target.closest('.message-action-btn[aria-label="Thumbs up"]');
        if (thumbsUp) {
            thumbsUp.style.color = '#10a37f';
            showToast('Thanks for your feedback!');
        }
        const thumbsDown = e.target.closest('.message-action-btn[aria-label="Thumbs down"]');
        if (thumbsDown) {
            thumbsDown.style.color = '#ef4444';
            showToast('Thanks for your feedback!');
        }
        const regenBtn = e.target.closest('.message-action-btn[aria-label="Regenerate"]');
        if (regenBtn) {
            showToast('Regenerating response...');
        }
    });

    // Toast notification
    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // Settings modal
    function showSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'settings-modal';
        modal.innerHTML = `
            <div class="settings-overlay"></div>
            <div class="settings-panel">
                <div class="settings-header">
                    <h2>Settings</h2>
                    <button class="settings-close" aria-label="Close settings">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div class="settings-body">
                    <div class="settings-nav">
                        <button class="settings-nav-item active">General</button>
                        <button class="settings-nav-item">Data controls</button>
                        <button class="settings-nav-item">Speech</button>
                        <button class="settings-nav-item">Builder profile</button>
                    </div>
                    <div class="settings-content">
                        <div class="setting-row">
                            <div class="setting-label">
                                <span>Theme</span>
                            </div>
                            <select class="setting-select">
                                <option>Dark</option>
                                <option>Light</option>
                                <option>System</option>
                            </select>
                        </div>
                        <div class="setting-row">
                            <div class="setting-label">
                                <span>Language</span>
                            </div>
                            <select class="setting-select">
                                <option>English (US)</option>
                                <option>Chinese (Simplified)</option>
                                <option>Japanese</option>
                            </select>
                        </div>
                        <div class="setting-row">
                            <div class="setting-label">
                                <span>Archived chats</span>
                            </div>
                            <button class="setting-action-btn">Manage</button>
                        </div>
                        <div class="setting-row">
                            <div class="setting-label">
                                <span>Delete all chats</span>
                            </div>
                            <button class="setting-action-btn danger">Delete all</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('show'));

        modal.querySelector('.settings-close').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 200);
        });
        modal.querySelector('.settings-overlay').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 200);
        });
        modal.querySelectorAll('.settings-nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                modal.querySelectorAll('.settings-nav-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    initChat();
});
