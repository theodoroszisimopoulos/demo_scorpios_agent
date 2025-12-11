const steps = [
    "🌑 Initiating Scorpios Executive Protocol...",
    "📥 Ingesting Operational Streams (Bodrum, Mykonos)...",
    "👁️ Analyzing Visual Integrity vs. Timeline...",
    "💸 Evaluating Investment Deal Flow (Ventures)...",
    "🌍 Detecting Market Threat (Six Senses / Ibiza)...",
    "⚖️ Balancing Brand Ethos with Commercial Strategy...",
    "✅ Synthesis Complete."
];

const demoEmails = [
    {
        "id": 1,
        "sender": "Michael (Lead Architect)",
        "subject": "Bodrum Site: Stone Sourcing Crisis",
        "time": "08:15",
        "preview": "The local quarry in Turkey can't match the 'weathered' texture. They suggest polished limestone. It looks too commercial..."
    },
    {
        "id": 2,
        "sender": "VIP Relations",
        "subject": "Prince Al-Saud Request - Tonight",
        "time": "09:30",
        "preview": "He wants the Sunset Terrace for 40 ppl. We are booked with members. He is looking to invest in the Tulum project..."
    },
    {
        "id": 3,
        "sender": "Ventures Team",
        "subject": "Deal Flow: 'Longevity Lab'",
        "time": "10:00",
        "preview": "Seed round for the bio-hacking clinic. Valuation $12M. Do we integrate this into Mykonos?"
    }
];

const demoCalendar = [
    {
        "time": "11:00 AM",
        "title": "Creative Dir: Summer '26 Rituals",
        "desc": "Reviewing 'Ancient Future' artist lineup."
    },
    {
        "time": "03:00 PM",
        "title": "Soho House / Capital Call",
        "desc": "Post-acquisition expansion strategy (Dubai/Tulum)."
    }
];

const demoBriefing = `MARKET INTEL: Six Senses just announced a partnership with 'RoseBar' to launch a 'Club & Wellness' hybrid in Ibiza. Targets our demographic.

OPPORTUNITY: Distressed boutique hotel in Santa Teresa (Costa Rica) listed for $8M. Oceanfront. Perfect for 'Scorpios Lite' winter concept.`;

const fallbackResponse = {
    brief: {
        risk: "Bodrum Aesthetic Violation: Polished stone dilutes the brand. 3-week delay recommended.",
        opportunity: "Costa Rica Asset ($8M): Undervalued oceanfront asset. Strategic counter-move to Six Senses Ibiza.",
        market: "VIP Conflict: Bumping members for Prince Al-Saud risks community backlash despite capital potential."
    },
    actions: [
        {
            type: "DECIDE",
            title: "VIP Protocol",
            owner: "CEO",
            urgency: "High",
            action_text: "Approve Hybrid Plan: Prince gets Cabanas, Members keep Terrace."
        },
        {
            type: "DELEGATE",
            title: "Bodrum Stone Sourcing",
            owner: "Michael (Arch)",
            urgency: "Medium",
            action_text: "Fly to Greece quarry. Find textured alternative. Delay approved."
        },
        {
            type: "INVEST",
            title: "Costa Rica vs. Longevity Lab",
            owner: "Ventures",
            urgency: "High",
            action_text: "Pause Bio-hacking deal. Request Due Diligence packet for Santa Teresa land."
        }
    ],
    chat_context: "Local fallback engaged."
};

let executionCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    hydrateInputs();
    renderSourcePreview();
    document.getElementById('run-btn').addEventListener('click', runAgent);
});

function hydrateInputs() {
    const emailsText = JSON.stringify(demoEmails, null, 2);
    const calendarText = JSON.stringify(demoCalendar, null, 2);
    document.getElementById('emails-input').value = emailsText;
    document.getElementById('calendar-input').value = calendarText;
    document.getElementById('briefing-input').value = demoBriefing;
}

function renderSourcePreview() {
    const emailsPreview = document.getElementById('emails-preview');
    emailsPreview.innerHTML = demoEmails.map(email => `
        <div class="item">
            <strong>${email.sender}</strong> — ${email.subject}
            <div class="time">${email.time}</div>
            <div class="soft">${email.preview}</div>
        </div>
    `).join('');

    const calendarPreview = document.getElementById('calendar-preview');
    calendarPreview.innerHTML = demoCalendar.map(item => `
        <div class="item">
            <strong>${item.time}</strong> — ${item.title}
            <div class="soft">${item.desc}</div>
        </div>
    `).join('');

    document.getElementById('briefing-preview').innerText = demoBriefing;
}

async function runAgent() {
    const logContainer = document.getElementById('agent-logs');
    const resultContainer = document.getElementById('results-area');
    const progressBar = document.getElementById('progress-bar-fill');
    const runButton = document.getElementById('run-btn');

    // Reset UI
    logContainer.innerHTML = '';
    resultContainer.style.display = 'none';
    progressBar.style.width = '0%';
    setRunningState(true, runButton);

    // 1. The Animation Loop
    for (let i = 0; i < steps.length; i++) {
        const div = document.createElement('div');
        div.className = 'log-entry';
        div.innerText = steps[i];
        logContainer.appendChild(div);
        progressBar.style.width = `${((i + 1) / steps.length) * 100}%`;
        logContainer.scrollTop = logContainer.scrollHeight;
        await new Promise(r => setTimeout(r, 900));
    }

    // 2. Fetch Data (Call API or use Demo Fallback)
    const payload = collectInputs();
    let data = fallbackResponse;

    try {
        const response = await fetch('/api/run_agent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            data = await response.json();
        }
    } catch (err) {
        console.warn('Falling back to local response', err);
    }

    // 3. Render Results
    renderDashboard(data);
    resultContainer.style.display = 'grid';
    setRunningState(false, runButton);
}

function collectInputs() {
    const emailsRaw = document.getElementById('emails-input').value.trim();
    const calendarRaw = document.getElementById('calendar-input').value.trim();
    const briefingRaw = document.getElementById('briefing-input').value.trim();
    return {
        emails: emailsRaw || JSON.stringify(demoEmails),
        calendar: calendarRaw || JSON.stringify(demoCalendar),
        market_data: briefingRaw || demoBriefing
    };
}

function renderDashboard(data) {
    document.getElementById('card-risk').innerText = data?.brief?.risk || '—';
    document.getElementById('card-opp').innerText = data?.brief?.opportunity || '—';
    document.getElementById('card-market').innerText = data?.brief?.market || '—';

    const actionList = document.getElementById('action-list');
    const actions = Array.isArray(data?.actions) ? data.actions : [];
    actionList.innerHTML = actions.map(action => `
        <div class="action-card type-${(action.type || 'delegate').toLowerCase()}">
            <div class="action-header">
                <span class="badge">${action.type || 'ACTION'}</span>
                <span class="owner">${action.owner || 'Unassigned'}</span>
            </div>
            <h4>${action.title || ''}</h4>
            <p>${action.action_text || ''}</p>
            <button class="exec-btn" type="button">Execute</button>
        </div>
    `).join('') || '<p class="microcopy">No actions returned.</p>';

    wireExecuteAnimations();
}

function setRunningState(isRunning, button) {
    const inputArea = document.getElementById('input-area');
    button.disabled = isRunning;
    inputArea.style.opacity = isRunning ? '0.5' : '1';
}

function wireExecuteAnimations() {
    const buttons = document.querySelectorAll('.exec-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.disabled = true;
            btn.classList.remove('executing');
            void btn.offsetWidth; // restart animation
            btn.classList.add('executing');
            executionCount += 1;
            showExecutionMessage(executionCount, btn.closest('.action-card'));
            setTimeout(() => {
                alert('Action marked for execution');
                btn.disabled = false;
            }, 800);
        });
    });
}

function showExecutionMessage(count, cardEl) {
    if (count === 1) {
        openPremiumConfirmationEmail(cardEl);
    } else if (count === 2) {
        openInlineNotice(cardEl, 'Ops Routed', 'Bodrum sourcing dispatched to Michael; 3-week buffer approved.');
    } else if (count === 3) {
        openInlineNotice(cardEl, 'Investment Motion', 'Due diligence request sent for Santa Teresa land; Longevity Lab paused.');
    } else {
        openInlineNotice(cardEl, 'Logged', 'Action recorded and aligned to Scorpios guardrails.');
    }
}

function openPremiumConfirmationEmail(cardEl) {
    const title = cardEl?.querySelector('h4')?.innerText || 'Scorpios Action';
    const owner = cardEl?.querySelector('.owner')?.innerText || 'Owner';
    const message = `
        <div style="font-family: 'Inter', sans-serif; padding: 18px; color: #1f1f1f; background:#fdfbf7;">
            <h3 style="margin-top:0; color:#a68a64;">Scorpios Executive Agent</h3>
            <p style="margin:8px 0 12px;">An email has been sent to the Head of Department with the decision.</p>
            <p style="margin:0 0 4px;"><strong>Action:</strong> ${title}</p>
            <p style="margin:0 0 4px;"><strong>Owner:</strong> ${owner}</p>
            <p style="margin:10px 0 0; color:#4b4b4b;">Decision: Prince gets Cabanas; members keep the Terrace.</p>
        </div>
    `;
    const win = window.open('', 'scorpios_notice', 'width=480,height=260');
    if (win) {
        win.document.write(message);
        win.document.close();
    } else {
        alert('An email has been sent to the Head of Department with the decision.');
    }
}

function openInlineNotice(cardEl, title, body) {
    const message = `
        <div style="font-family: 'Inter', sans-serif; padding: 18px; color: #1f1f1f; background:#fdfbf7;">
            <h3 style="margin-top:0; color:#a68a64;">${title}</h3>
            <p style="margin:8px 0 12px;">${body}</p>
        </div>
    `;
    const win = window.open('', `scorpios_notice_${title}`, 'width=460,height=220');
    if (win) {
        win.document.write(message);
        win.document.close();
    } else {
        alert(body);
    }
}

