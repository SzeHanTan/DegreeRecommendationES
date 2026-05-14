import type { AssessmentPayload, Question, RecommendationResult } from './types';

const BASE_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail ?? `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Fetch the full question list from the backend
export function fetchQuestions(): Promise<Question[]> {
  return request<Question[]>('/questions');
}

// Submit assessment answers and receive a session ID
export function submitAssessment(payload: AssessmentPayload): Promise<{ sessionId: string }> {
  return request<{ sessionId: string }>('/submit-assessment', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// Retrieve ranked recommendations by session ID
export function fetchRecommendations(sessionId: string): Promise<RecommendationResult> {
  return request<RecommendationResult>(`/recommendations/${sessionId}`);
}
