import { Link } from 'react-router-dom';

const imgIconAssessment = 'https://www.figma.com/api/mcp/asset/580e4c0f-b2be-4685-adeb-e4eac642cc33';
const imgIconKnowledge = 'https://www.figma.com/api/mcp/asset/76acccb5-5709-4b2c-b3c9-38bfbba7b84b';
const imgIconResults = 'https://www.figma.com/api/mcp/asset/f8b0c988-40c9-44fc-a13e-6a1bdd17c857';
const imgCircuitry = 'https://www.figma.com/api/mcp/asset/9baf493f-e055-4cdf-981a-413530596e7a';

const SPECS = [
  { label: 'PROCESSOR', value: 'Rule Engine' },
  { label: 'MEMORY', value: 'Knowledge Base' },
  { label: 'STORAGE', value: '50+ Degrees' },
  { label: 'DISPLAY', value: 'Smart Results' },
];

const FEATURES = [
  {
    icon: imgIconAssessment,
    iconHeight: 'h-[30px]',
    title: 'Personalised Assessment',
    description:
      'Answer targeted questions about your interests, skills, and goals. Our engine profiles your academic fit and narrows down the best degree paths just for you.',
    featured: false,
  },
  {
    icon: imgIconKnowledge,
    iconHeight: 'h-[27px]',
    title: 'Knowledge-Driven',
    description:
      'Every recommendation is validated against a curated knowledge base of 50+ degree programmes, crafted by academic experts to ensure accurate and meaningful results.',
    featured: true,
  },
  {
    icon: imgIconResults,
    iconHeight: 'h-[24px]',
    title: 'Clear Recommendations',
    description:
      'Receive a clear, ranked list of degree recommendations with explanations of why each programme suits your profile, helping you make an informed decision.',
    featured: false,
  },
];

export default function LandingPage() {
  return (
    <div className="bg-cream flex flex-col gap-16 pb-32 pt-16 px-8">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="grid grid-cols-12 gap-x-12 min-h-[716px] items-center">
        {/* Left */}
        <div className="col-span-7 flex flex-col">
          <h1 className="font-display font-normal text-[72px] leading-[72px] tracking-[-1.44px] text-ink">
            Introducing
            <br />
            <em className="italic">Expert System.</em>
          </h1>

          <div className="pt-8 max-w-[576px]">
            <p className="font-body text-[18px] leading-[29.25px] text-muted">
              Not a search engine. Degree Finder thinks, maps your academic
              path, matches your strengths, and guides you to the perfect
              programme. The smartest way to find your degree is here.
            </p>
          </div>

          <div className="pt-8">
            <div className="flex items-center">
              <Link to="/assessment">
                <button className="bg-ink text-cream px-10 py-5 font-code font-bold text-[18px] leading-[27px] drop-shadow-[4px_4px_0px_#1c1c13] cursor-pointer">
                  Start Assessment
                </button>
              </Link>
              <div className="pl-8">
                <div className="border-l border-ink pl-8 flex flex-col gap-1">
                  <span className="font-code text-ink text-[18px] tracking-[0.9px]">
                    $0.00
                  </span>
                  <span className="font-code font-bold text-muted text-[12px] tracking-[1.2px]">
                    100% FREE
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 w-full max-w-[672px]">
            <div className="border-t border-border pt-16 grid grid-cols-2 gap-x-20 gap-y-10">
              {SPECS.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-code font-bold text-muted text-[12px] tracking-[1.2px]">
                    {label}
                  </span>
                  <span className="font-code text-ink text-[18px] leading-[27px]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Retro computer illustration */}
        <div className="col-span-5 bg-cream border-2 border-ink shadow-[4px_4px_0px_0px_#1c1c13] flex flex-col items-center justify-center p-[34px] relative overflow-clip self-center">
          {/* Blue star badge */}
          <div className="absolute top-1/2 right-3 z-10 rotate-12 -translate-y-1/2">
            <div className="bg-badge-blue border border-ink drop-shadow-[2px_2px_0px_#1c1c13] rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-white text-[14px] leading-none select-none">★</span>
            </div>
          </div>

          {/* Red sticker */}
          <div className="absolute bottom-10 left-8 z-10 -rotate-12">
            <div className="bg-sticker-red border border-ink drop-shadow-[2px_2px_0px_#1c1c13] px-[5px] py-[5px]">
              <span className="font-code text-white text-[8px] leading-[12px]">
                MACHINE INTEL
              </span>
            </div>
          </div>

          {/* CRT Monitor Shell */}
          <div className="bg-cream-dark border-2 border-ink rounded-[12px] relative w-full z-20 h-[354px] shrink-0">
            <div className="p-[26px] flex items-stretch justify-center h-full">
              {/* Screen */}
              <div className="flex-1 relative rounded-[8px] border border-ink shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] overflow-hidden">
                {/* Screen background */}
                <div className="absolute inset-0 bg-[#121212] rounded-[8px]" />

                {/* Screen content */}
                <div className="relative p-[17px] h-full flex flex-col rounded-[8px] overflow-hidden z-10">
                  {/* Terminal header bar */}
                  <div className="border-b border-[rgba(0,255,65,0.3)] opacity-80 pb-2 mb-2 flex justify-between shrink-0">
                    <span className="font-code text-terminal text-[10px] uppercase leading-[12.5px]">
                      EXPERTOS 1.0
                    </span>
                    <span className="font-code text-terminal text-[10px] uppercase leading-[12.5px]">
                      TERMINAL_MODE
                    </span>
                  </div>

                  {/* Terminal boot lines */}
                  <div className="opacity-90 flex flex-col gap-0 shrink-0">
                    <p className="font-code text-terminal text-[10px] uppercase leading-[12.5px]">
                      {`> INITIALIZING RULE ENGINE...`}
                    </p>
                    <p className="font-code text-terminal text-[10px] uppercase leading-[12.5px]">
                      {`> LOADING DEGREE DATABASE...`}
                    </p>
                    <p className="font-code text-terminal text-[10px] uppercase leading-[12.5px]">
                      {`> SYSTEM STATUS: READY`}
                    </p>
                    <p className="font-code text-terminal text-[10px] uppercase leading-[12.5px]">
                      {`> _`}
                    </p>
                  </div>

                  {/* Floating DATA ANALYSIS window */}
                  <div className="absolute inset-[4px_0px_0px_0px] flex items-center justify-center z-20 pointer-events-none">
                    <div className="backdrop-blur-[2px] bg-[rgba(68,71,72,0.2)] border border-terminal w-[238px] h-[148px] relative">
                      <div className="absolute top-3 left-3 right-3 border-b border-terminal pb-px flex justify-between">
                        <span className="font-code text-terminal text-[10px] uppercase leading-[12.5px]">
                          DATA ANALYSIS
                        </span>
                        <span className="font-code text-terminal text-[10px] leading-[12.5px]">
                          [X]
                        </span>
                      </div>
                      <div className="absolute inset-[34px_12px_10px_12px] grid grid-cols-4 gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="bg-terminal" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CRT vignette */}
                <div className="absolute inset-0 pointer-events-none rounded-[8px] shadow-[inset_0px_0px_40px_1px_rgba(0,0,0,0.9)]" />
              </div>
            </div>

            {/* Monitor vents */}
            <div className="absolute bottom-1 right-8 opacity-20 flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-ink w-[4px] h-[16px]" />
              ))}
            </div>
          </div>

          {/* Keyboard area */}
          <div className="relative w-full z-10 pt-4 shrink-0">
            <div className="h-2 mx-[12.5%] bg-[rgba(68,71,72,0.2)] rounded-full" />
            <div className="pt-4 grid grid-cols-12 gap-1 opacity-60">
              <div className="bg-cream-dark border border-ink h-6 col-span-1" />
              <div className="bg-cream-dark border border-ink h-6 col-span-1" />
              <div className="bg-cream-dark border border-ink h-6 col-span-2" />
              <div className="bg-cream-dark border border-ink h-6 col-span-1" />
              <div className="bg-cream-dark border border-ink h-6 col-span-1" />
              <div className="bg-cream-dark border border-ink h-6 col-span-4" />
              <div className="bg-cream-dark border border-ink h-6 col-span-1" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────── */}
      <section className="border-t-2 border-ink pt-16 flex flex-col gap-12">
        <div className="flex items-end justify-between">
          <div className="max-w-[576px]">
            <h2 className="font-display font-normal text-[48px] leading-[57.6px] tracking-[-0.48px] text-ink">
              Intelligent Matching.
            </h2>
            <p className="font-body text-[16px] leading-[24px] text-muted mt-2">
              Designed for academic clarity, our Expert System maps your
              interests and strengths to the best-fit degree programmes using
              specialised knowledge rules.
            </p>
          </div>
          <div className="flex items-center shrink-0">
            <div className="w-3 h-3 rounded-full bg-accent shadow-[0px_0px_8px_0px_#fe825c]" />
            <span className="pl-2 font-code font-bold text-ink text-[12px] tracking-[1.2px] uppercase">
              SYSTEM ONLINE
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {FEATURES.map(({ icon, iconHeight, title, description, featured }) => (
            <div
              key={title}
              className={[
                'border border-ink p-[33px] flex flex-col',
                featured
                  ? 'bg-white drop-shadow-[4px_4px_0px_#1c1c13]'
                  : 'bg-cream-light',
              ].join(' ')}
            >
              <div className={`${iconHeight} w-full relative shrink-0`}>
                <img
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain object-left"
                  src={icon}
                />
              </div>
              <div className="pt-4 border-b border-border pb-[9px]">
                <h3 className="font-code font-bold text-ink text-[18px] leading-[27px]">
                  {title}
                </h3>
              </div>
              <div className="pt-4">
                <p className="font-body text-muted text-[14px] leading-[20px]">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dark Banner ────────────────────────────────────────── */}
      <section className="bg-ink border-2 border-ink p-[42px] overflow-hidden">
        <div className="flex items-center justify-between gap-8">
          <div className="max-w-[448px] shrink-0">
            <h2 className="font-display font-normal text-[48px] leading-[57.6px] tracking-[-0.48px] text-cream-dark">
              Built to Guide.
            </h2>
            <p className="font-code text-cream-dark text-[16px] leading-[24px] tracking-[1.6px] uppercase opacity-80 mt-4">
              RULE-BASED ENGINE / EXPERT KNOWLEDGE /
              <br />
              BUILT FOR STUDENTS
            </p>
          </div>
          <div className="flex-1 h-[256px] min-w-0 opacity-60 border border-[#1c1b1b] relative overflow-hidden">
            <img
              alt=""
              className="absolute w-full h-auto top-[-60%] left-0 max-w-none"
              src={imgCircuitry}
            />
            <div className="absolute inset-0 bg-white mix-blend-saturation" />
          </div>
        </div>
      </section>
    </div>
  );
}
