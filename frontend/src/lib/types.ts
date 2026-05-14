// ─── Question Types ──────────────────────────────────────────────────────────

export type QuestionType = 'single' | 'multi' | 'scale';

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  category: 'academic' | 'interest' | 'personality' | 'subject';
  text: string;
  type: QuestionType;
  options: QuestionOption[];
}

// ─── Assessment Types ─────────────────────────────────────────────────────────

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface AssessmentPayload {
  name: string;
  answers: Answer[];
}

// ─── Recommendation Types ─────────────────────────────────────────────────────

export interface RuleFired {
  ruleId: string;
  description: string;
  pointsAdded: number;
}

export interface DegreeRecommendation {
  degree: string;
  score: number;
  maxScore: number;
  percentage: number;
  rulesFired: RuleFired[];
  explanation: string;
  careerPaths: string[];
}

export interface RecommendationResult {
  sessionId: string;
  name: string;
  recommendations: DegreeRecommendation[];
  attributeSummary: Record<string, boolean>;
  createdAt: string;
}
