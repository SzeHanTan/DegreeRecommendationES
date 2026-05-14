/**
 * Rule-Based Knowledge Base (IF-THEN Production Rules)
 * Each rule defines conditions and the degree scores it adds when matched.
 *
 * Rule structure:
 *   id          — unique rule identifier
 *   description — plain-English explanation shown in the Explanation Facility
 *   conditions  — array of { questionId, value } that must all be matched
 *   scores      — object mapping degree IDs to point values added when rule fires
 */

export const RULES = [
  // ─── Computer Science Rules ─────────────────────────────────────────────────
  {
    id: 'CS-01',
    description: 'Strong in Mathematics and enjoys problem solving',
    conditions: [
      { questionId: 'q_math', value: 'strong' },
      { questionId: 'q_problem_solving', value: 'strong' },
    ],
    scores: { computer_science: 30, engineering: 15 },
  },
  {
    id: 'CS-02',
    description: 'Interested in technology and computers',
    conditions: [
      { questionId: 'q_interest', value: 'technology' },
    ],
    scores: { computer_science: 25, engineering: 10 },
  },
  {
    id: 'CS-03',
    description: 'Best subject is Additional Mathematics',
    conditions: [
      { questionId: 'q_best_subject', value: 'add_math' },
    ],
    scores: { computer_science: 20, engineering: 20, accounting: 10 },
  },
  {
    id: 'CS-04',
    description: 'Enjoys coding or exploring technology in free time',
    conditions: [
      { questionId: 'q_free_time', value: 'coding' },
    ],
    scores: { computer_science: 25 },
  },
  {
    id: 'CS-05',
    description: 'Analytical personality with interest in tech career',
    conditions: [
      { questionId: 'q_personality', value: 'analytical' },
      { questionId: 'q_career_goal', value: 'tech' },
    ],
    scores: { computer_science: 20, engineering: 15 },
  },

  // ─── Engineering Rules ──────────────────────────────────────────────────────
  {
    id: 'ENG-01',
    description: 'Strong in Mathematics and Physics',
    conditions: [
      { questionId: 'q_math', value: 'strong' },
      { questionId: 'q_best_subject', value: 'physics' },
    ],
    scores: { engineering: 30 },
  },
  {
    id: 'ENG-02',
    description: 'Enjoys hands-on building and experimenting',
    conditions: [
      { questionId: 'q_work_style', value: 'hands_on' },
      { questionId: 'q_career_goal', value: 'tech' },
    ],
    scores: { engineering: 25 },
  },
  {
    id: 'ENG-03',
    description: 'Interested in technology and enjoys problem solving',
    conditions: [
      { questionId: 'q_interest', value: 'technology' },
      { questionId: 'q_problem_solving', value: 'strong' },
    ],
    scores: { engineering: 20 },
  },

  // ─── Business Rules ─────────────────────────────────────────────────────────
  {
    id: 'BUS-01',
    description: 'Strong communication skills and interest in business',
    conditions: [
      { questionId: 'q_communication', value: 'strong' },
      { questionId: 'q_interest', value: 'business' },
    ],
    scores: { business: 30 },
  },
  {
    id: 'BUS-02',
    description: 'Leadership personality who enjoys managing projects',
    conditions: [
      { questionId: 'q_personality', value: 'leader' },
    ],
    scores: { business: 25, mass_communication: 10 },
  },
  {
    id: 'BUS-03',
    description: 'Career goal in commerce or finance',
    conditions: [
      { questionId: 'q_career_goal', value: 'commerce' },
    ],
    scores: { business: 20, accounting: 20 },
  },
  {
    id: 'BUS-04',
    description: 'Tracks budgets or thinks about business ideas in free time',
    conditions: [
      { questionId: 'q_free_time', value: 'finance' },
    ],
    scores: { business: 20, accounting: 15 },
  },

  // ─── Accounting Rules ───────────────────────────────────────────────────────
  {
    id: 'ACC-01',
    description: 'Strong in Mathematics with detail-oriented personality',
    conditions: [
      { questionId: 'q_math', value: 'strong' },
      { questionId: 'q_personality', value: 'detail' },
    ],
    scores: { accounting: 30 },
  },
  {
    id: 'ACC-02',
    description: 'Best subject is Accounts',
    conditions: [
      { questionId: 'q_best_subject', value: 'accounts' },
    ],
    scores: { accounting: 30, business: 10 },
  },
  {
    id: 'ACC-03',
    description: 'Prefers structured work following clear rules',
    conditions: [
      { questionId: 'q_work_style', value: 'structured' },
      { questionId: 'q_career_goal', value: 'commerce' },
    ],
    scores: { accounting: 20 },
  },

  // ─── Psychology Rules ───────────────────────────────────────────────────────
  {
    id: 'PSY-01',
    description: 'Enjoys helping or advising people',
    conditions: [
      { questionId: 'q_interest', value: 'helping' },
    ],
    scores: { psychology: 30, medicine: 10 },
  },
  {
    id: 'PSY-02',
    description: 'Social personality with career goal in education or counselling',
    conditions: [
      { questionId: 'q_personality', value: 'social' },
      { questionId: 'q_career_goal', value: 'social' },
    ],
    scores: { psychology: 30 },
  },
  {
    id: 'PSY-03',
    description: 'Volunteers or does community service in free time',
    conditions: [
      { questionId: 'q_free_time', value: 'volunteering' },
    ],
    scores: { psychology: 20, medicine: 10 },
  },
  {
    id: 'PSY-04',
    description: 'Strong communication skills and social personality',
    conditions: [
      { questionId: 'q_communication', value: 'strong' },
      { questionId: 'q_personality', value: 'social' },
    ],
    scores: { psychology: 20, mass_communication: 15 },
  },

  // ─── Mass Communication Rules ───────────────────────────────────────────────
  {
    id: 'MCOM-01',
    description: 'Enjoys writing, presenting, or creating content',
    conditions: [
      { questionId: 'q_interest', value: 'media' },
    ],
    scores: { mass_communication: 30 },
  },
  {
    id: 'MCOM-02',
    description: 'Strong communication skills with creative personality',
    conditions: [
      { questionId: 'q_communication', value: 'strong' },
      { questionId: 'q_personality', value: 'creative' },
    ],
    scores: { mass_communication: 25, multimedia_design: 10 },
  },
  {
    id: 'MCOM-03',
    description: 'Enjoys reading, debating, or writing in free time',
    conditions: [
      { questionId: 'q_free_time', value: 'reading' },
    ],
    scores: { mass_communication: 20 },
  },
  {
    id: 'MCOM-04',
    description: 'Best subject is Bahasa Malaysia or English',
    conditions: [
      { questionId: 'q_best_subject', value: 'bm_english' },
    ],
    scores: { mass_communication: 20 },
  },

  // ─── Multimedia Design Rules ────────────────────────────────────────────────
  {
    id: 'MM-01',
    description: 'High creativity and interest in design',
    conditions: [
      { questionId: 'q_creativity', value: 'strong' },
      { questionId: 'q_interest', value: 'design' },
    ],
    scores: { multimedia_design: 35 },
  },
  {
    id: 'MM-02',
    description: 'Best subject is Art & Design',
    conditions: [
      { questionId: 'q_best_subject', value: 'art' },
    ],
    scores: { multimedia_design: 30 },
  },
  {
    id: 'MM-03',
    description: 'Enjoys drawing, photography, or crafting in free time',
    conditions: [
      { questionId: 'q_free_time', value: 'art' },
    ],
    scores: { multimedia_design: 25 },
  },
  {
    id: 'MM-04',
    description: 'Creative personality with career goal in arts or media',
    conditions: [
      { questionId: 'q_personality', value: 'creative' },
      { questionId: 'q_career_goal', value: 'creative' },
    ],
    scores: { multimedia_design: 25, mass_communication: 15 },
  },

  // ─── Medicine Rules ─────────────────────────────────────────────────────────
  {
    id: 'MED-01',
    description: 'Strong in Biology and Chemistry',
    conditions: [
      { questionId: 'q_best_subject', value: 'biology' },
      { questionId: 'q_best_subject', value: 'chemistry' },
    ],
    scores: { medicine: 35 },
  },
  {
    id: 'MED-02',
    description: 'Strong science skills and career goal in healthcare',
    conditions: [
      { questionId: 'q_science', value: 'strong' },
      { questionId: 'q_career_goal', value: 'health' },
    ],
    scores: { medicine: 35 },
  },
  {
    id: 'MED-03',
    description: 'Interested in helping others with strong science background',
    conditions: [
      { questionId: 'q_interest', value: 'helping' },
      { questionId: 'q_science', value: 'strong' },
    ],
    scores: { medicine: 25, psychology: 10 },
  },
];
