/**
 * Pure validation for the public registration endpoint.
 * Kept dependency-free so it can be unit-tested without a database.
 */

export const NAME_MAX = 60;
export const PASSWORD_MIN = 6;
export const PASSWORD_MAX = 128;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type RegistrationInput = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
};

export type RegistrationValidation =
  | { ok: true; name: string; email: string; password: string }
  | { ok: false; error: string; status: number };

/** Normalize an email for storage: lowercase + trim. */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/** Validate a raw registration payload. Never trusts field types. */
export function validateRegistration(input: RegistrationInput): RegistrationValidation {
  const { name, email, password } = input;
  if (!name || !email || !password) {
    return { ok: false, error: "Name, email, and password are required.", status: 400 };
  }
  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > NAME_MAX) {
    return { ok: false, error: `Name must be between 2 and ${NAME_MAX} characters.`, status: 400 };
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return { ok: false, error: "A valid email is required.", status: 400 };
  }
  if (typeof password !== "string" || password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
    return {
      ok: false,
      error: `Password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters.`,
      status: 400,
    };
  }
  return { ok: true, name: name.trim(), email: normalizeEmail(email), password };
}
