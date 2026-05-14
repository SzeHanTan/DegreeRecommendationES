from pydantic import BaseModel


# ─── Question Schemas ─────────────────────────────────────────────────────────

class QuestionOption(BaseModel):
    id: str
    label: str


class Question(BaseModel):
    id: str
    category: str  # 'academic' | 'interest' | 'personality' | 'subject'
    text: str
    type: str      # 'single' | 'multi' | 'scale'
    options: list[QuestionOption]


# ─── Assessment Schemas ───────────────────────────────────────────────────────

class Answer(BaseModel):
    question_id: str
    value: str | list[str]


class AssessmentPayload(BaseModel):
    name: str
    answers: list[Answer]


class AssessmentResponse(BaseModel):
    session_id: str


# ─── Recommendation Schemas ───────────────────────────────────────────────────

class RuleFired(BaseModel):
    rule_id: str
    description: str
    points_added: int


class DegreeRecommendation(BaseModel):
    degree: str
    score: int
    max_score: int
    percentage: float
    rules_fired: list[RuleFired]
    explanation: str
    career_paths: list[str]


class RecommendationResult(BaseModel):
    session_id: str
    name: str
    recommendations: list[DegreeRecommendation]
    attribute_summary: dict[str, bool]
    created_at: str
