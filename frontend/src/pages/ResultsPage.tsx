import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchRecommendations } from '../lib/api';
import type { RecommendationResult } from '../lib/types';
import RecommendationCard from '../components/ui/RecommendationCard';
import ScoreBar from '../components/ui/ScoreBar';

// Decorative assets from Figma design
const imgBrainIcon =
  'https://www.figma.com/api/mcp/asset/cf193a07-7eb3-4a88-8f28-06157975b823';
const imgCircuitBoard =
  'https://www.figma.com/api/mcp/asset/f7bf69d6-50f5-46ff-9bd6-8096e7ba639f';

// ── Demo data (used when sessionId === "demo", backend not yet wired) ──────────
const DEMO_RESULT: RecommendationResult = {
  sessionId: 'demo',
  name: 'Demo Student',
  recommendations: [
    {
      degree: 'Computer Science',
      score: 85,
      maxScore: 100,
      percentage: 85,
      rulesFired: [
        { ruleId: 'CS-01', description: 'Strong mathematics and enjoys problem solving', pointsAdded: 30 },
        { ruleId: 'CS-02', description: 'High interest in technology and computing', pointsAdded: 20 },
        { ruleId: 'CS-03', description: 'Analytical and logical thinking style', pointsAdded: 20 },
        { ruleId: 'CS-04', description: 'Prefers building and engineering solutions', pointsAdded: 15 },
      ],
      explanation:
        'Your strong analytical mindset and interest in technology indicate a natural fit for Computer Science. Your preference for logical problem-solving and building systems aligns well with the core curriculum and career outcomes of this programme. Students with your profile consistently excel in algorithm design, software engineering, and systems thinking.',
      careerPaths: ['Software Engineer', 'Data Scientist', 'Systems Architect'],
    },
    {
      degree: 'Data Science',
      score: 72,
      maxScore: 100,
      percentage: 72,
      rulesFired: [
        { ruleId: 'DS-01', description: 'Strong mathematics background', pointsAdded: 30 },
        { ruleId: 'DS-02', description: 'Enjoys research and investigation', pointsAdded: 20 },
        { ruleId: 'DS-03', description: 'Logical and critical thinking', pointsAdded: 22 },
      ],
      explanation:
        'Your mathematical strength and research interest align well with Data Science.',
      careerPaths: ['Data Analyst', 'ML Engineer', 'Research Scientist'],
    },
    {
      degree: 'Information Technology',
      score: 58,
      maxScore: 100,
      percentage: 58,
      rulesFired: [
        { ruleId: 'IT-01', description: 'Interest in technology', pointsAdded: 20 },
        { ruleId: 'IT-02', description: 'Logical thinking style', pointsAdded: 20 },
        { ruleId: 'IT-03', description: 'Detail-oriented personality', pointsAdded: 18 },
      ],
      explanation:
        'Your interest in technology and structured thinking fits IT management well.',
      careerPaths: ['IT Consultant', 'Network Administrator', 'Systems Analyst'],
    },
  ],
  attributeSummary: {
    strong_math: true,
    analytical: true,
    interest_technology: true,
    enjoys_problem_solving: true,
    logical_thinking: true,
    creative: false,
    interest_helping_others: false,
  },
  createdAt: new Date().toISOString(),
};

// ── Loading ────────────────────────────────────────────────────────────────────

function LoadingView() {
  return (
    <div className="bg-cream min-h-full flex items-center justify-center">
      <span className="font-code text-ink text-[14px] tracking-[1.2px]">
        {'> ANALYSING YOUR PROFILE...'}
      </span>
    </div>
  );
}

// ── Error ──────────────────────────────────────────────────────────────────────

function ErrorView({ message }: { message: string }) {
  return (
    <div className="bg-cream min-h-full flex flex-col items-center justify-center gap-6">
      <p className="font-code text-sticker-red text-[14px] tracking-[1.2px]">
        {`> ERROR: ${message}`}
      </p>
      <div className="flex items-center gap-4">
        <Link to="/assessment">
          <button className="bg-ink text-cream font-code text-[14px] px-8 py-4 drop-shadow-[4px_4px_0px_#1c1c13] cursor-pointer">
            Start New Assessment
          </button>
        </Link>
        <Link to="/results/demo">
          <button className="border border-ink font-code text-[14px] px-8 py-4 cursor-pointer hover:bg-cream-light transition-colors text-ink">
            View Demo
          </button>
        </Link>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided.');
      setLoading(false);
      return;
    }
    // Demo mode — preview page without a running backend
    if (sessionId === 'demo') {
      setResult(DEMO_RESULT);
      setLoading(false);
      return;
    }
    fetchRecommendations(sessionId)
      .then(setResult)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <LoadingView />;
  if (error || !result) return <ErrorView message={error ?? 'Failed to load results.'} />;

  const top = result.recommendations[0];
  const others = result.recommendations.slice(1, 3);
  const seqTag = (sessionId ?? 'UNKNOWN').slice(0, 8).toUpperCase();

  return (
    <div className="bg-cream min-h-full">
      <div className="mx-auto max-w-[1280px] px-10 pt-10 pb-16 flex flex-col gap-16">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="border-b-2 border-ink pb-[34px] flex items-end justify-between">
          <div className="flex flex-col gap-[15px]">
            <div className="bg-badge-blue border border-ink px-[13px] py-[5px] self-start">
              <span className="font-code text-white text-[10px] leading-[15px]">
                MATCH CONFIRMED
              </span>
            </div>
            <h1 className="font-display font-normal text-[48px] leading-[57.6px] tracking-[-0.48px] text-ink">
              Analysis Complete:
              <br />
              <em className="italic">{top.degree}</em>
            </h1>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex flex-col items-end">
              <span className="font-code font-bold text-muted text-[12px] tracking-[1.2px]">
                CONFIDENCE SCORE
              </span>
              <span className="font-code font-bold text-ink text-[18px] leading-[27px]">
                {top.percentage.toFixed(2)}%
              </span>
            </div>
            {/* Print / share icon box */}
            <div className="bg-cream-dark border-2 border-ink size-[48px] flex items-center justify-center shrink-0">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <rect x="1" y="3" width="18" height="12" rx="1" stroke="#1c1c13" strokeWidth="1.5" />
                <path d="M7 3V1H13V3" stroke="#1c1c13" strokeWidth="1.5" />
                <rect x="4" y="7" width="12" height="1.5" fill="#1c1c13" />
                <rect x="4" y="10" width="8" height="1.5" fill="#1c1c13" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-8">

          {/* Left column — 7 cols */}
          <div className="col-span-7 flex flex-col gap-8">

            {/* SYSTEM_METRICS panel */}
            <div className="bg-[#f7f4e5] border border-ink drop-shadow-[2px_2px_0px_#1c1c13] flex flex-col gap-4 p-[17px]">
              <div className="border-b border-ink pb-[9px] flex items-center justify-between">
                <span className="font-code font-bold text-ink text-[12px] tracking-[1.2px]">
                  SYSTEM_METRICS
                </span>
                <span className="font-code font-bold text-ink text-[12px] tracking-[1.2px]">
                  v.1984.0
                </span>
              </div>

              <div className="flex flex-col gap-4 pb-4">
                {result.recommendations.slice(0, 3).map((rec, i) => (
                  <ScoreBar
                    key={rec.degree}
                    label={`#${i + 1} ${rec.degree}`}
                    percentage={rec.percentage}
                  />
                ))}
              </div>

              <div className="border-t border-dashed border-ink flex items-center justify-between pt-[9px] pb-2 px-2">
                <span className="font-code text-muted text-[11px] leading-[16.5px]">
                  * BASED ON RULE INFERENCE ENGINE
                </span>
                <span className="font-code text-muted text-[11px] leading-[16.5px]">
                  SEQ: {seqTag}
                </span>
              </div>
            </div>

            {/* "Why this fits you" narrative block */}
            <div className="bg-cream-dark border border-ink p-[33px] relative overflow-hidden flex flex-col gap-4">
              {/* Decorative brain/gear icon */}
              <img
                alt=""
                src={imgBrainIcon}
                className="absolute top-0 right-0 h-[69px] w-[67px] object-cover pointer-events-none opacity-30"
              />

              <h2 className="font-display font-normal text-[28px] leading-[42px] text-ink">
                Why this fits you
              </h2>

              <div className="flex flex-col gap-4 max-w-[672px]">
                <p className="font-body text-ink text-[18px] leading-[28.8px]">
                  {top.explanation}
                </p>

                {top.rulesFired.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2">
                    <span className="font-code font-bold text-muted text-[11px] tracking-[1.2px]">
                      KEY FACTORS IDENTIFIED
                    </span>
                    {top.rulesFired.map((rule) => (
                      <div
                        key={rule.ruleId}
                        className="flex items-start justify-between border-b border-border pb-1.5"
                      >
                        <span className="font-code text-ink text-[13px] leading-[20px]">
                          {rule.description}
                        </span>
                        <span className="font-code font-bold text-sticker-red text-[12px] shrink-0 pl-4">
                          +{rule.pointsAdded}pts
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column — 5 cols */}
          <div className="col-span-5 flex flex-col gap-8">

            {/* SUGGESTED CAREER PATHS panel */}
            <div className="bg-[#fdfaea] border-2 border-ink flex flex-col">
              {/* Panel header */}
              <div className="bg-ink px-4 py-2">
                <span className="font-code font-bold text-[#fdfaea] text-[12px] tracking-[1.2px]">
                  SUGGESTED CAREER PATHS
                </span>
              </div>

              {/* Career path rows */}
              <div className="flex flex-col px-4 pt-4">
                {top.careerPaths.length === 0 ? (
                  <p className="font-code text-muted text-[14px] pb-4">
                    No career paths available.
                  </p>
                ) : (
                  top.careerPaths.map((path, i) => (
                    <div
                      key={path}
                      className={[
                        'flex items-start justify-between pb-4',
                        i > 0 ? 'border-t-2 border-ink pt-[18px]' : '',
                      ].join(' ')}
                    >
                      <div className="flex flex-col">
                        <h3 className="font-display font-normal text-[24px] leading-[36px] text-ink">
                          {path}
                        </h3>
                        <span className="font-code text-muted text-[10px] leading-[15px]">
                          CAREER PATHWAY
                        </span>
                      </div>
                      <div className="flex flex-col items-end shrink-0 pl-4">
                        <span className="font-code font-bold text-sticker-red text-[16px] leading-[24px]">
                          #{i + 1}
                        </span>
                        <span className="font-code text-muted text-[10px] uppercase leading-[15px]">
                          SUGGESTED
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Analysis status + other matches panel */}
            <div className="bg-cream-dark border border-ink p-[17px] flex flex-col gap-4">
              {/* Status row */}
              <div className="flex items-start gap-4">
                <div className="border border-ink w-[90px] h-[90px] shrink-0 overflow-hidden relative">
                  <img
                    alt=""
                    src={imgCircuitBoard}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-white mix-blend-saturation" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-code font-bold text-ink text-[12px] tracking-[1.2px]">
                    ANALYSIS_COMPLETE
                  </span>
                  <div className="flex flex-col">
                    <span className="font-code text-ink text-[12px] leading-[15px]">
                      Session: {(sessionId ?? 'N/A').slice(0, 12)}
                    </span>
                    <span className="font-code text-ink text-[12px] leading-[15px]">
                      Status: OPERATIONAL
                    </span>
                    <span className="font-code text-ink text-[12px] leading-[15px]">
                      Matches: {result.recommendations.length}
                    </span>
                    <span className="font-code text-ink text-[12px] leading-[15px]">
                      Name: {result.name}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0px_0px_5px_0px_rgba(34,197,94,0.5)]" />
                    <div className="w-2 h-2 rounded-full bg-ink opacity-20" />
                    <div className="w-2 h-2 rounded-full bg-ink opacity-20" />
                  </div>
                </div>
              </div>

              {/* Other matches */}
              {others.length > 0 && (
                <div className="border-t border-ink pt-4 flex flex-col gap-1">
                  <span className="font-code font-bold text-muted text-[11px] tracking-[1.2px] pb-1">
                    OTHER MATCHES
                  </span>
                  {others.map((rec, i) => (
                    <RecommendationCard
                      key={rec.degree}
                      recommendation={rec}
                      rank={i + 2}
                      isTop={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Footer actions ────────────────────────────────────────── */}
        <div className="border-t border-ink pt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0px_0px_5px_0px_rgba(34,197,94,0.5)]" />
            <span className="font-code text-muted text-[12px] tracking-[1.2px]">
              ASSESSMENT FINALISED FOR {result.name.toUpperCase()}
            </span>
          </div>
          <Link to="/assessment">
            <button className="bg-ink text-cream font-code text-[14px] px-8 py-4 drop-shadow-[4px_4px_0px_#1c1c13] cursor-pointer hover:opacity-90 transition-opacity">
              Start New Assessment
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
