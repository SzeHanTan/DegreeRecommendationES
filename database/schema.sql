-- Degree Recommendation Expert System — Supabase PostgreSQL Schema
-- Run this in the Supabase SQL Editor to initialise all tables.

-- ─── Sessions ────────────────────────────────────────────────────────────────
-- One row per student who completes the assessment.

CREATE TABLE IF NOT EXISTS sessions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Responses ───────────────────────────────────────────────────────────────
-- Stores each answer a student gave, linked to their session.

CREATE TABLE IF NOT EXISTS responses (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id   UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    question_id  TEXT NOT NULL,
    answer       TEXT NOT NULL,   -- JSON-serialised string or array
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Recommendations ─────────────────────────────────────────────────────────
-- Stores the ranked degree recommendations produced for a session.

CREATE TABLE IF NOT EXISTS recommendations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id  UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    rank        INTEGER NOT NULL,       -- 1 = top recommendation
    degree      TEXT NOT NULL,
    score       INTEGER NOT NULL,
    max_score   INTEGER NOT NULL,
    percentage  NUMERIC(5,2) NOT NULL,
    rules_fired JSONB NOT NULL DEFAULT '[]',
    explanation TEXT NOT NULL DEFAULT '',
    career_paths JSONB NOT NULL DEFAULT '[]',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_responses_session_id        ON responses(session_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_session_id  ON recommendations(session_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_rank        ON recommendations(session_id, rank);
