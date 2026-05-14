import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions, submitAssessment } from '../lib/api';
import type { Answer, Question } from '../lib/types';

// ── Fallback questions (used when API returns empty or is unavailable) ─────────
// Option IDs mirror the attribute keys defined in backend/app/kb/questions.py
const LOCAL_QUESTIONS: Question[] = [
  {
    id: 'q_subject',
    category: 'subject',
    text: 'Which of these subjects interests you the most?',
    type: 'single',
    options: [
      { id: 'strong_math', label: 'Mathematics' },
      { id: 'strong_biology', label: 'Biology' },
      { id: 'interest_technology', label: 'Computer Science' },
      { id: 'interest_art', label: 'Creative Arts' },
    ],
  },
  {
    id: 'q_academic',
    category: 'academic',
    text: 'Which subject were you strongest in at school?',
    type: 'single',
    options: [
      { id: 'strong_math', label: 'Mathematics' },
      { id: 'strong_biology', label: 'Life Sciences' },
      { id: 'strong_physics', label: 'Physics' },
      { id: 'strong_accounts', label: 'Accounting / Economics' },
    ],
  },
  {
    id: 'q_career',
    category: 'interest',
    text: 'What kind of career environment appeals most to you?',
    type: 'single',
    options: [
      { id: 'interest_technology', label: 'Technology & Research' },
      { id: 'interest_helping_others', label: 'Healthcare & Social Work' },
      { id: 'interest_business', label: 'Business & Management' },
      { id: 'interest_media', label: 'Media & Creative Arts' },
    ],
  },
  {
    id: 'q_activity',
    category: 'interest',
    text: 'Which of these activities sounds most enjoyable?',
    type: 'single',
    options: [
      { id: 'enjoys_problem_solving', label: 'Building or programming things' },
      { id: 'interest_helping_others', label: 'Helping or caring for others' },
      { id: 'interest_business', label: 'Organising or leading projects' },
      { id: 'artistic_expression', label: 'Designing or performing' },
    ],
  },
  {
    id: 'q_thinking',
    category: 'personality',
    text: 'How would you best describe your thinking style?',
    type: 'single',
    options: [
      { id: 'analytical', label: 'Analytical & logical' },
      { id: 'creative', label: 'Creative & imaginative' },
      { id: 'empathetic', label: 'Empathetic & people-focused' },
      { id: 'detail_oriented', label: 'Structured & detail-oriented' },
    ],
  },
  {
    id: 'q_team_role',
    category: 'personality',
    text: 'In a group project, which role comes most naturally to you?',
    type: 'single',
    options: [
      { id: 'enjoys_problem_solving', label: 'The technical problem-solver' },
      { id: 'leadership_oriented', label: 'The organiser and leader' },
      { id: 'verbal_communication', label: 'The communicator and presenter' },
      { id: 'creative', label: 'The idea generator and designer' },
    ],
  },
  {
    id: 'q_skill',
    category: 'personality',
    text: 'Which skill feels most natural to you?',
    type: 'single',
    options: [
      { id: 'logical_thinking', label: 'Logical & critical thinking' },
      { id: 'enjoys_research', label: 'Research & investigation' },
      { id: 'written_communication', label: 'Writing & storytelling' },
      { id: 'artistic_expression', label: 'Visual & artistic creation' },
    ],
  },
  {
    id: 'q_science',
    category: 'subject',
    text: 'Which area of science excites you most?',
    type: 'single',
    options: [
      { id: 'strong_math', label: 'Mathematics & Computing' },
      { id: 'strong_biology', label: 'Biology & Life Sciences' },
      { id: 'strong_chemistry', label: 'Chemistry & Materials' },
      { id: 'strong_physics', label: 'Physics & Engineering' },
    ],
  },
  {
    id: 'q_impact',
    category: 'interest',
    text: 'What type of impact do you most want to make?',
    type: 'single',
    options: [
      { id: 'interest_technology', label: 'Advance technology & innovation' },
      { id: 'interest_helping_others', label: 'Improve health & communities' },
      { id: 'interest_business', label: 'Drive economic growth' },
      { id: 'interest_science', label: 'Expand scientific knowledge' },
    ],
  },
  {
    id: 'q_challenge',
    category: 'academic',
    text: 'Which challenge would you find most rewarding?',
    type: 'single',
    options: [
      { id: 'enjoys_problem_solving', label: 'Designing software or systems' },
      { id: 'strong_biology', label: 'Diagnosing and treating illness' },
      { id: 'interest_business', label: 'Building and scaling a company' },
      { id: 'enjoys_research', label: 'Conducting scientific experiments' },
    ],
  },
];

// Retro block ID derived from question index for decorative display
function toBlockId(index: number) {
  const val = ((index + 1) * 0x1a3b + 0x2a00) & 0xffff;
  return '0x' + val.toString(16).toUpperCase().padStart(4, '0');
}

// ── Name Step ──────────────────────────────────────────────────────────────────

function NameStep({
  name,
  onChange,
  onEnter,
}: {
  name: string;
  onChange: (v: string) => void;
  onEnter: () => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-display font-normal text-[48px] leading-[57.6px] tracking-[-0.48px] text-ink">
        Identify yourself.
      </h2>
      <p className="font-body text-muted text-[16px] leading-[24px] -mt-4">
        Enter your name so we can personalise your degree recommendations.
      </p>
      <div>
        <label className="font-code font-bold text-muted text-[12px] tracking-[1.2px] block mb-3">
          FULL_NAME
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onEnter()}
          placeholder="Type your name..."
          autoFocus
          className="w-full bg-transparent border-b-2 border-ink font-code text-[28px] text-ink tracking-[0.5px] outline-none placeholder:text-muted placeholder:opacity-40 pb-2"
        />
      </div>
    </div>
  );
}

// ── Question Step ──────────────────────────────────────────────────────────────

function QuestionStep({
  question,
  answer,
  onSelect,
}: {
  question: Question;
  answer: string | string[] | undefined;
  onSelect: (optionId: string) => void;
}) {
  const isSelected = (optId: string) => {
    if (!answer) return false;
    return Array.isArray(answer) ? answer.includes(optId) : answer === optId;
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-display font-normal text-[48px] leading-[57.6px] tracking-[-0.48px] text-ink">
        {question.text}
      </h2>

      {question.type === 'multi' && (
        <p className="font-code text-muted text-[12px] tracking-[1.2px] -mt-4">
          SELECT ALL THAT APPLY
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 pt-2">
        {question.options.map((opt, i) => {
          const selected = isSelected(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={[
                'text-left px-[17px] py-[17px] border flex flex-col gap-2 cursor-pointer transition-all',
                selected
                  ? 'bg-ink border-ink'
                  : 'bg-[#fdfaea] border-ink drop-shadow-[4px_4px_0px_#1c1c13] hover:bg-cream-light',
              ].join(' ')}
            >
              <span
                className={[
                  'font-code font-bold text-[12px] tracking-[1.2px] leading-[12px] opacity-60',
                  selected ? 'text-cream' : 'text-ink',
                ].join(' ')}
              >
                {`OPT_${String(i + 1).padStart(2, '0')}`}
              </span>
              <span
                className={[
                  'font-code font-bold text-[18px] leading-[27px]',
                  selected ? 'text-cream' : 'text-ink',
                ].join(' ')}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function QuestionnairePage() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [onNameStep, setOnNameStep] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Stable pseudo-random kernel ID for the session metadata display
  const kernelId = useMemo(() => {
    const chars = 'ABCDEF0123456789';
    return (
      'SYS-' +
      Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    );
  }, []);

  useEffect(() => {
    fetchQuestions()
      .then((qs) => setQuestions(qs.length ? qs : LOCAL_QUESTIONS))
      .catch(() => setQuestions(LOCAL_QUESTIONS))
      .finally(() => setLoading(false));
  }, []);

  const totalQuestions = questions.length;
  const progressPercent = onNameStep
    ? 0
    : Math.round((currentIndex / totalQuestions) * 100);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isLastQuestion = !onNameStep && currentIndex === totalQuestions - 1;

  const canGoNext = onNameStep
    ? userName.trim().length > 0
    : !!currentAnswer &&
      (!Array.isArray(currentAnswer) || currentAnswer.length > 0);

  function selectOption(questionId: string, optionId: string, type: string) {
    setAnswers((prev) => {
      if (type === 'multi') {
        const cur = (prev[questionId] as string[] | undefined) ?? [];
        const next = cur.includes(optionId)
          ? cur.filter((id) => id !== optionId)
          : [...cur, optionId];
        return { ...prev, [questionId]: next };
      }
      return { ...prev, [questionId]: optionId };
    });
  }

  function handleNext() {
    if (onNameStep) {
      if (!userName.trim()) return;
      setOnNameStep(false);
      return;
    }
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      handleSubmit();
    }
  }

  function handlePrev() {
    if (!onNameStep && currentIndex === 0) {
      setOnNameStep(true);
    } else if (!onNameStep) {
      setCurrentIndex((i) => i - 1);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const answersArr: Answer[] = Object.entries(answers).map(
        ([questionId, value]) => ({ questionId, value }),
      );
      const { sessionId } = await submitAssessment({
        name: userName.trim(),
        answers: answersArr,
      });
      navigate(`/results/${sessionId}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed');
      setSubmitting(false);
    }
  }

  const userStatus = onNameStep
    ? 'AWAITING_INPUT'
    : isLastQuestion
      ? 'FINALIZING'
      : 'EVALUATION_IN_PROGRESS';

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="bg-[#fdfaea] min-h-full flex items-center justify-center">
        <span className="font-code text-ink text-[14px] tracking-[1.2px]">
          {'> LOADING QUESTIONNAIRE...'}
        </span>
      </div>
    );
  }

  // ── Page ───────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#fdfaea] min-h-full">
      <div className="mx-auto max-w-[900px] px-10 pt-20 pb-16 flex flex-col gap-16">

        {/* Progress bar — hidden on name step */}
        {!onNameStep && (
          <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between">
              <span className="font-code font-bold text-[12px] text-ink tracking-[1.2px]">
                CALCULATING ALIGNMENT... {progressPercent}%
              </span>
              <span className="font-code text-[#858383] text-[14px]">
                BLOCK: {toBlockId(currentIndex)}
              </span>
            </div>
            <div className="bg-cream-light border border-ink h-4 relative">
              <div
                className="absolute bg-ink inset-[2px]"
                style={{ right: `calc(${100 - progressPercent}% + 2px)` }}
              />
            </div>
          </div>
        )}

        {/* Question card */}
        <div className="bg-[#f7f4e5] border-2 border-ink p-[66px] relative flex flex-col gap-8">
          {/* Decorative terminal corner */}
          <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-ink opacity-20" />

          {/* ACTIVE_QUERY_SESSION badge */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sticker-red shadow-[0px_0px_8px_0px_rgba(162,62,30,0.6)] shrink-0" />
            <span className="font-code font-bold text-[12px] text-sticker-red tracking-[1.2px]">
              ACTIVE_QUERY_SESSION
            </span>
          </div>

          {onNameStep ? (
            <NameStep name={userName} onChange={setUserName} onEnter={handleNext} />
          ) : currentQuestion ? (
            <QuestionStep
              question={currentQuestion}
              answer={currentAnswer}
              onSelect={(id) =>
                selectOption(currentQuestion.id, id, currentQuestion.type)
              }
            />
          ) : null}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={onNameStep}
            className="border border-ink px-[33px] py-[17px] flex items-center gap-2 font-code text-[14px] text-ink disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:bg-cream-light transition-colors"
          >
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
              <path
                d="M7 1L2 6.5L7 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Previous
          </button>

          <span className="font-code italic text-[#858383] text-[14px]">
            {submitting ? 'SUBMITTING...' : 'AUTO-SAVING PROGRESS...'}
          </span>

          <button
            onClick={handleNext}
            disabled={!canGoNext || submitting}
            className="bg-ink text-cream px-8 py-4 flex items-center gap-2 font-code text-[14px] drop-shadow-[4px_4px_0px_#1c1c13] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Submit' : 'Next'}
            {!isLastQuestion && (
              <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                <path
                  d="M1 1L6 6.5L1 12"
                  stroke="#ebe8d9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {submitError && (
          <p className="font-code text-sticker-red text-[13px] text-center">
            {`> ERROR: ${submitError}`}
          </p>
        )}

        {/* System meta info */}
        <div className="border-t border-ink grid grid-cols-3 gap-8 pt-[17px] opacity-60">
          <div>
            <p className="font-code text-ink text-[10px] leading-[15px]">KERNEL_ID</p>
            <p className="font-code text-ink text-[14px] leading-[21px]">{kernelId}</p>
          </div>
          <div>
            <p className="font-code text-ink text-[10px] leading-[15px]">ENCRYPTION</p>
            <p className="font-code text-ink text-[14px] leading-[21px]">AES-STATIC-256</p>
          </div>
          <div>
            <p className="font-code text-ink text-[10px] leading-[15px]">USER_STATUS</p>
            <p
              className={[
                'font-code text-[14px] leading-[21px]',
                onNameStep ? 'text-muted' : 'text-sticker-red',
              ].join(' ')}
            >
              {userStatus}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
