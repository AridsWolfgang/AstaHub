/**
 * Certificate verification — real, public, honest.
 *
 * Certificates are issued server-side when a track is completed
 * (see src/lib/progressValidation.ts -> isTrackComplete). Anyone can
 * verify one at `/certificates/:id/verify`, backed by
 * `GET /api/certificates/:id/verify` — a plain database lookup that
 * exposes only the credential itself plus the earner's display name.
 * No login, no PII beyond what the earner chose to share by publishing
 * their verification link.
 */

export type CertificateIdParse =
  | { ok: true; id: string }
  | { ok: false; code: "INVALID_ID"; error: string };

/**
 * Build the verification URL for a certificate id.
 * Pure helper — never throws.
 */
export function certificateUrl(id: string): string {
  const safe = encodeURIComponent(String(id).trim());
  return `/certificates/${safe}/verify`;
}

/**
 * Validate a certificate id from a URL param or pasted code.
 * Prisma cuid() is ~25 chars, alphanumeric, starts with 'c'. Be lenient:
 * allow 10–64 chars, alphanumerics plus - and _.
 */
export function parseCertificateId(input: unknown): CertificateIdParse {
  const v = String(input ?? "").trim();
  if (!v || !/^[a-z0-9_-]{10,64}$/i.test(v)) {
    return {
      ok: false,
      code: "INVALID_ID",
      error: "That doesn't look like a certificate code. Check the link and try again.",
    };
  }
  return { ok: true, id: v };
}
