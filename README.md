# Degree Recommendation Expert System

A rule-based expert system that helps high school and pre-university students choose a suitable university degree program.

**Course:** WID2001 Knowledge Representation and Reasoning (KRR)

---

## System Overview

```
User Interface (React) → Inference Engine (JavaScript) → Knowledge Base (Rules + Degree Data)
```

Three core components:

- **Knowledge Base (KB)** — Degree frame profiles (`degrees.js`), IF-THEN production rules (`rules.js`), and questionnaire questions (`questions.js`)
- **Inference Engine (IE)** — Forward chaining logic (`inferenceEngine.js`)
- **User Interface (UI)** — React multi-page app (Landing → Questionnaire → Results)

Optional module included:

- **Explanation Facility** — Shows which rules fired for each recommendation

> No backend or database required. All logic runs entirely in the browser.

---

## Project Structure

```
DegreeRecommendationES/
├── frontend/
│   └── src/
│       ├── kb/                    # Knowledge Base
│       │   ├── degrees.js         # Degree frame profiles
│       │   ├── questions.js       # Questionnaire questions
│       │   └── rules.js           # IF-THEN production rules
│       │
│       ├── engine/                # Inference Engine
│       │   └── inferenceEngine.js # Forward chaining logic
│       │
│       ├── pages/                 # User Interface — pages
│       │   ├── LandingPage.tsx
│       │   ├── QuestionnairePage.tsx
│       │   └── ResultsPage.tsx
│       │
│       ├── components/            # User Interface — reusable components
│       │   ├── assessment/        # ProgressBar, QuestionCard
│       │   ├── layout/            # Header, Footer
│       │   └── ui/                # Button, ScoreBar, RecommendationCard
│       │
│       └── lib/
│           └── types.ts           # TypeScript type definitions
│
├── docs/                          # Expert consultation & elicitation records
└── README.md
```

---

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

---

## Development Status

| Component | Status |
|---|---|
| File structure | Done |
| Knowledge Base — Degree frames | Done |
| Knowledge Base — Questions | Done |
| Knowledge Base — Rules (25–35) | Pending expert consultation |
| Inference Engine — Forward chaining | Done |
| UI — Landing Page | Done |
| UI — Questionnaire Page | Done |
| UI — Results Page | Done |
| Explanation Facility | Done |

---

## SDG Alignment

UN Sustainable Development Goal 4 — Quality Education
