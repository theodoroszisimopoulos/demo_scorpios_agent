# Scorpios Executive Agent

A Vercel-ready Python/FastAPI application that mimics an autonomous Chief of Staff for executive decision-making. The agent synthesizes emails, calendar events, and market intelligence into strategic briefings and actionable decisions.

## Features

- **Strategic Synthesis**: Analyzes operational streams (emails, calendar, market data) to identify risks, opportunities, and market dynamics
- **Actionable Intelligence**: Generates prioritized action items with clear ownership and execution paths
- **Premium UX**: Dark mode interface with "Digital Wabi-Sabi" aesthetic—earthy tones, serif fonts, high-end hospitality feel
- **Real-time Processing**: Animated "thinking" logs that simulate deep analysis
- **Graceful Fallbacks**: Works seamlessly with or without OpenAI API key

## Project Structure

```
scorpios-agent/
├── api/
│   └── index.py            # FastAPI Backend
├── public/
│   ├── index.html          # Main UI
│   ├── styles.css          # Scorpios Theme
│   ├── app.js              # Logic & Animations
│   └── scorpios.png        # Logo & Favicon
├── requirements.txt        # Python Dependencies
├── vercel.json             # Vercel Configuration
└── README.md               # This file
```

## Local Development

### Prerequisites

- Python 3.10+
- pip

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/theodoroszisimopoulos/demo_scorpios_agent.git
   cd demo_scorpios_agent
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**
   ```bash
   uvicorn api.index:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Open in browser**
   Navigate to `http://localhost:8000`

### Environment Variables (Optional)

For live OpenAI integration, set:
```bash
export OPENAI_API_KEY=your_key_here
```

Without an API key, the app uses a curated fallback response to ensure the demo always works.

## Deployment to Vercel

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables** (optional, for OpenAI)
   ```bash
   vercel env add OPENAI_API_KEY
   ```

The `vercel.json` configuration handles:
- API routes (`/api/*`) → FastAPI backend
- Static files (`/public/*`) → Frontend assets

## How It Works

1. **Input Sources**: The demo preloads with sample data:
   - **Emails**: Operational issues (Bodrum stone sourcing, VIP requests, deal flow)
   - **Calendar**: Upcoming strategic meetings
   - **Market Intel**: Competitive threats and opportunities

2. **Agent Processing**: When you click "Run Agent", the system:
   - Simulates deep analysis with animated thinking logs
   - Calls the FastAPI backend (or uses fallback)
   - Synthesizes inputs into strategic briefings

3. **Output**: Returns:
   - **Brief**: Risk, opportunity, and market analysis
   - **Actions**: Prioritized decisions with owners and execution steps

4. **Execution**: Click "Execute" on any action to trigger confirmation workflows

## Technology Stack

- **Backend**: FastAPI, OpenAI API (optional)
- **Frontend**: Vanilla JavaScript, Custom CSS (no frameworks)
- **Deployment**: Vercel (serverless functions + static hosting)

## License

This is a demo project for portfolio purposes.

