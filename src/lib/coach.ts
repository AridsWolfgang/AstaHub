/**
 * Pure AI-coach logic — the hint ladder, prompt construction, and request
 * validation for the Phase 4 "AI Companion". Dependency-free so it can be
 * unit-tested without a network.
 *
 * The discipline (vision §2.2): the AI is a coach, never an oracle. It asks,
 * nudges, and guides — it never hands over a finished answer, and every reply
 * ends with "now write it yourself."
 */

export const COACH_HINT_LEVELS = 4;

export interface HintRung {
  level: number;
  title: string;
  instruction: string;
}

/** The four-rung hint ladder, in order. Level 3 is the only one that may show code — and it is deliberately broken. */
export const HINT_LADDER: HintRung[] = [
  {
    level: 0,
    title: "Clarify",
    instruction:
      "What is the problem really asking? Restate it in your own words. What goes in, what comes out, and what would a passing example look like?",
  },
  {
    level: 1,
    title: "Shrink it",
    instruction:
      "What is the smallest version of this you can build first? Ignore edge cases and make the happy path work. Get something running, then extend it.",
  },
  {
    level: 2,
    title: "Name the concept",
    instruction:
      "Here is the concept that applies. Can you name the concept? Once you can name it, look it up in the lesson or a reference and write it yourself.",
  },
  {
    level: 3,
    title: "Find the bug",
    instruction:
      "Here is a deliberately broken version of a solution. Find the bug, fix it in your own editor, and explain in one line why the original was wrong.",
  },
];

export const COACH_SYSTEM_PROMPT = `You are the AstaHub coach. You teach by asking and guiding, never by giving finished answers.

Rules you must follow, without exception:
1. NEVER provide a complete, correct solution to the exercise. No full program, no finished function, no copy-paste answer.
2. Nudge toward the answer with questions, smaller sub-problems, and concept names.
3. If you show any code, it must be partial, or deliberately broken, or only the concept's skeleton with blanks.
4. Keep every reply under 150 words. Short, warm, and pointed.
5. Reward the struggle: acknowledge that a wrong attempt with a real try is worth more than a copied answer.
6. Always end your reply with exactly: "Now write it yourself."`;

export const COACH_CODE_MAX = 4_000;
export const COACH_QUESTION_MAX = 1_000;
export const COACH_TRACK_MAX = 30;
export const COACH_TOPIC_MAX = 200;
export const COACH_PROMPT_MAX = 1_000;

export interface CoachRequest {
  track: string;
  day: number;
  topic: string;
  prompt: string;
  code: string;
  /** 0..3 for progressive hints; undefined for a free-form concept question. */
  hintLevel: number | undefined;
  question: string;
}

export type CoachValidationResult = { ok: true; value: CoachRequest } | { ok: false; error: string };

/** Parse and validate an incoming /api/coach body. */
export function parseCoachRequest(body: unknown): CoachValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;

  const track = typeof b.track === "string" ? b.track.trim().slice(0, COACH_TRACK_MAX) : "c";
  const day = Number(b.day);
  if (!Number.isInteger(day) || day < 1 || day > 365) {
    return { ok: false, error: "A valid lesson day is required." };
  }
  const topic = typeof b.topic === "string" ? b.topic.trim().slice(0, COACH_TOPIC_MAX) : "";
  const prompt = typeof b.prompt === "string" ? b.prompt.trim().slice(0, COACH_PROMPT_MAX) : "";
  const code = typeof b.code === "string" ? b.code.slice(0, COACH_CODE_MAX) : "";

  let hintLevel: number | undefined;
  if (b.hintLevel !== undefined && b.hintLevel !== null) {
    const lvl = Number(b.hintLevel);
    if (!Number.isInteger(lvl) || lvl < 0 || lvl >= COACH_HINT_LEVELS) {
      return { ok: false, error: `Hint level must be 0–${COACH_HINT_LEVELS - 1}.` };
    }
    hintLevel = lvl;
  }

  const question = typeof b.question === "string" ? b.question.trim().slice(0, COACH_QUESTION_MAX) : "";

  if (!topic && !prompt) {
    return { ok: false, error: "A topic or prompt is required so the coach knows the context." };
  }
  if (hintLevel === undefined && !question) {
    return { ok: false, error: "Ask a question or request a hint." };
  }
  if (hintLevel !== undefined && question) {
    return { ok: false, error: "Ask either for a hint or a question, not both at once." };
  }

  return { ok: true, value: { track, day, topic, prompt, code, hintLevel, question } };
}

/** Build the user message for a progressive hint. */
export function buildHintPrompt(req: CoachRequest): string {
  const rung = HINT_LADDER[req.hintLevel!];
  const lines = [
    `Track: ${req.track} · Day ${req.day}`,
    req.topic ? `Topic: ${req.topic}` : null,
    req.prompt ? `Exercise: ${req.prompt}` : null,
    req.code ? `My code so far:\n\`\`\`\n${req.code}\n\`\`\`` : null,
    "",
    `Hint level ${req.hintLevel} (${rung.title}): ${rung.instruction}`,
  ].filter((l): l is string => l !== null);

  return lines.join("\n");
}

/** Build the user message for a free-form concept question. */
export function buildQuestionPrompt(req: CoachRequest): string {
  const lines = [
    `Track: ${req.track} · Day ${req.day}`,
    req.topic ? `Topic: ${req.topic}` : null,
    req.prompt ? `Exercise: ${req.prompt}` : null,
    req.code ? `My code so far:\n\`\`\`\n${req.code}\n\`\`\`` : null,
    "",
    `The learner asks: ${req.question}`,
    "",
    "Answer as a coach. Guide them to discover the answer themselves; do not give a finished solution.",
  ].filter((l): l is string => l !== null);

  return lines.join("\n");
}

export function buildCoachMessages(req: CoachRequest): { role: "system" | "user"; content: string }[] {
  const userPrompt = req.hintLevel !== undefined ? buildHintPrompt(req) : buildQuestionPrompt(req);
  return [
    { role: "system", content: COACH_SYSTEM_PROMPT },
    { role: "user", content: userPrompt },
  ];
}

/** Post-process the model reply: trim, cap length, and enforce the closing line. */
export function enforceCoachRules(text: string): string {
  let t = text.trim();
  if (t.length > 2_000) t = t.slice(0, 2_000).trimEnd();
  if (!/now write it yourself\.?$/i.test(t)) {
    t = t.replace(/[.!?]?\s*$/, "") + ". Now write it yourself.";
  }
  return t;
}

/** True when the server has an OpenRouter key to power the coach. */
export function isCoachConfigured(env: Record<string, string | undefined> = process.env): boolean {
  return Boolean(env.OPENROUTER_API_KEY);
}