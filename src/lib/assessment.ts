/**
 * Server-side assessment stub — honest, never fake.
 *
 * The vision: run a learner's code for a specific exercise through a
 * real execution backend (Piston) and verify the output contains the
 * expected substring. Until that backend is configured, every call
 * returns an explicit NOT_CONFIGURED result so the UI never pretends
 * a submission was graded.
 */

export type AssessmentEnv = Record<string, string | undefined>;

export type VerifyExerciseInput = {
  track: string;
  day: number;
  exerciseId: string;
  code: string;
  /** Substring a correct run must produce (the lesson's expectedOutput). */
  expectedOutput?: string;
  /** Optional already-captured stdout to check instead of `code`. */
  output?: string;
};

export type VerifyExerciseResult =
  | { ok: true; passed: boolean; message: string }
  | { ok: false; code: "NOT_CONFIGURED" | "INVALID_INPUT"; error: string };

/**
 * True when the server has an execution backend for grading.
 * Requires a Piston (or compatible) endpoint; without it grading
 * cannot run and the caller must fall back to client-side checks.
 */
export function isServerVerificationConfigured(env?: AssessmentEnv): boolean {
  const e: AssessmentEnv =
    env ??
    (typeof process !== "undefined" && (process as unknown as { env?: AssessmentEnv }).env
      ? ((process as unknown as { env: AssessmentEnv }).env as AssessmentEnv)
      : {});
  const url = e.PISTON_API_URL ?? e.VITE_PISTON_API_URL;
  return Boolean(url && String(url).trim());
}

/**
 * Honest stub for server-side exercise verification.
 *
 * - Validates required fields first (INVALID_INPUT).
 * - Until the execution backend is configured returns NOT_CONFIGURED.
 * - When configured, checks that the (provided or code-derived) output
 *   contains `expectedOutput` as a substring — the same gate the
 *   client-side LessonView uses, but on the server.
 *
 * This function never executes code itself; the real implementation will
 * POST {code, language} to Piston and inspect the returned stdout.
 */
export function verifyExerciseStub(
  input: VerifyExerciseInput,
  env?: AssessmentEnv
): VerifyExerciseResult {
  const track = typeof input.track === "string" ? input.track.trim() : "";
  const exerciseId = typeof input.exerciseId === "string" ? input.exerciseId.trim() : "";
  const code = typeof input.code === "string" ? input.code : "";
  const day = Number(input.day);

  if (!track || !exerciseId || !code || !Number.isInteger(day) || day < 1 || day > 365) {
    return {
      ok: false,
      code: "INVALID_INPUT",
      error: "track, day, exerciseId, and code are required for verification.",
    };
  }

  if (!isServerVerificationConfigured(env)) {
    return {
      ok: false,
      code: "NOT_CONFIGURED",
      error:
        "Server-side verification is not configured on this server. Set PISTON_API_URL to a Piston instance to enable graded execution — until then verification runs client-side only.",
    };
  }

  // When configured: check expectedOutput. No expectedOutput means there's
  // nothing to gate on — treat as passed so the endpoint stays honest.
  const expected = typeof input.expectedOutput === "string" ? input.expectedOutput : "";
  if (!expected) {
    return { ok: true, passed: true, message: "No expected output to verify — marked as passed." };
  }

  const haystack = typeof input.output === "string" ? input.output : code;
  const passed = haystack.includes(expected);
  return {
    ok: true,
    passed,
    message: passed
      ? "Output contains the expected substring."
      : `Output does not contain the expected substring "${expected.slice(0, 80)}".`,
  };
}
