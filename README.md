# Degree Recommendation Expert System

A rule-based expert system that helps high school and pre-university students choose a suitable university degree program.

**Course:** WID2001 Knowledge Representation and Reasoning (KRR)

---

## System Overview

```
Frontend (React + Tailwind) → Backend (FastAPI) → Inference Engine → Knowledge Base → Supabase DB
```

Three core components:
- **Knowledge Base** — Degree frames (`degrees.json`) and IF-THEN rules (`rules.py`)
- **Inference Engine** — Forward chaining (`forward_chaining.py`)
- **User Interface** — React multi-page app (Landing → Questionnaire → Results)

Optional module included:
- **Explanation Facility** — Shows which rules fired for each recommendation

---

## Project Structure

```
DegreeRecommendation/
├── frontend/                  # React + TypeScript + Tailwind CSS
│   └── src/
│       ├── pages/             # LandingPage, QuestionnairePage, ResultsPage
│       ├── components/        # UI, layout, assessment components
│       └── lib/               # API client, TypeScript types
│
├── backend/                   # FastAPI Python backend
│   └── app/
│       ├── api/routes.py      # REST endpoint handlers
│       ├── engine/            # Forward chaining inference engine
│       ├── kb/                # Rules, degree frames, questions
│       └── models/schemas.py  # Pydantic request/response models
│
├── database/schema.sql        # Supabase PostgreSQL schema
├── docs/                      # Expert consultation & elicitation records
└── README.md
```

---

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt

# Create .env from template
cp .env.example .env
# Fill in SUPABASE_URL and SUPABASE_KEY in .env

uvicorn app.main:app --reload
```

Runs at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

---

## Development Status

| Component | Status |
|---|---|
| File structure | Done |
| Knowledge Base (rules) | Pending expert consultation |
| Inference Engine | Pending |
| Backend API | Pending |
| Database | Pending |
| Frontend — Landing | Pending |
| Frontend — Questionnaire | Pending |
| Frontend — Results | Pending |

---

## SDG Alignment

UN Sustainable Development Goal 4 — Quality Education
