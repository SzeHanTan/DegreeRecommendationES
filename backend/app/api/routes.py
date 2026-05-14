# TODO: Implement API route handlers
# Endpoints:
#   GET  /questions               → return full question list from KB
#   POST /submit-assessment       → run inference engine, store in DB, return session_id
#   GET  /recommendations/{id}   → retrieve ranked results from DB

from fastapi import APIRouter, HTTPException

from app.models.schemas import (
    AssessmentPayload,
    AssessmentResponse,
    Question,
    RecommendationResult,
)

router = APIRouter()


@router.get("/questions", response_model=list[Question])
def get_questions():
    """Return the full questionnaire."""
    # TODO: Load questions from kb/questions.py or questions.json
    raise HTTPException(status_code=501, detail="Not implemented yet")


@router.post("/submit-assessment", response_model=AssessmentResponse)
def submit_assessment(payload: AssessmentPayload):
    """
    Accept student answers, run forward chaining inference,
    persist results to Supabase, return session ID.
    """
    # TODO:
    #   1. Convert answers to facts dict
    #   2. Call engine.run(facts) → recommendations
    #   3. Store session + answers + recommendations in Supabase
    #   4. Return session_id
    raise HTTPException(status_code=501, detail="Not implemented yet")


@router.get("/recommendations/{session_id}", response_model=RecommendationResult)
def get_recommendations(session_id: str):
    """Retrieve a previously generated recommendation result."""
    # TODO: Query Supabase for session and join recommendations
    raise HTTPException(status_code=501, detail="Not implemented yet")
