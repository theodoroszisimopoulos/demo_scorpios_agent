import json
import os

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
from pydantic import BaseModel


app = FastAPI(title="Scorpios Executive Agent", version="0.1.0")

# Initialize OpenAI client if available; keep running without a key.
api_key = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key else None


class AgentRequest(BaseModel):
    emails: str
    calendar: str
    market_data: str


def get_hardcoded_scorpios_response():
    return {
        "brief": {
            "risk": "Bodrum Aesthetic Violation: Polished stone dilutes the brand. 3-week delay recommended.",
            "opportunity": "Costa Rica Asset ($8M): Undervalued oceanfront asset. Strategic counter-move to Six Senses Ibiza.",
            "market": "VIP Conflict: Bumping members for Prince Al-Saud risks community backlash despite capital potential.",
        },
        "actions": [
            {
                "type": "DECIDE",
                "title": "VIP Protocol",
                "owner": "CEO",
                "urgency": "High",
                "action_text": "Approve Hybrid Plan: Prince gets Cabanas, Members keep Terrace.",
            },
            {
                "type": "DELEGATE",
                "title": "Bodrum Stone Sourcing",
                "owner": "Michael (Arch)",
                "urgency": "Medium",
                "action_text": "Fly to Greece quarry. Find textured alternative. Delay approved.",
            },
            {
                "type": "INVEST",
                "title": "Costa Rica vs. Longevity Lab",
                "owner": "Ventures",
                "urgency": "High",
                "action_text": "Pause Bio-hacking deal. Request Due Diligence packet for Santa Teresa land.",
            },
        ],
        "chat_context": "Demo fallback used because no API key was supplied.",
    }


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.post("/api/run_agent")
async def run_agent(data: AgentRequest):
    """
    Run the Scorpios strategy agent. Falls back to a curated response
    to keep the demo consistent when no API key is configured.
    """
    if not client:
        return JSONResponse(get_hardcoded_scorpios_response())

    system_prompt = """
    You are the Strategic Partner for the CEO of 'Scorpios' (Hospitality & Investment).
    Balance 'Brand Soul' (Wabi-Sabi, Rituals) with 'Commercial Expansion'.
    1. Brand Integrity > Efficiency.
    2. Identify investment opportunities (Real Estate/Ventures).
    3. Synthesize inputs into a JSON: {
        "brief": {"risk": "...", "opportunity": "...", "market": "..."},
        "actions": [{"type": "DECIDE"|"DELEGATE"|"INVEST", "title": "...", "owner": "...", "action_text": "..."}],
        "chat_context": "..."
    }
    """

    try:
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": f"Context:\nEMAILS: {data.emails}\nCALENDAR: {data.calendar}\nMARKET: {data.market_data}",
                },
            ],
            response_format={"type": "json_object"},
        )
        content = completion.choices[0].message.content
        return JSONResponse(json.loads(content))
    except Exception:
        return JSONResponse(get_hardcoded_scorpios_response())


# Serve the static frontend from /public when running locally.
app.mount("/", StaticFiles(directory="public", html=True), name="static")

