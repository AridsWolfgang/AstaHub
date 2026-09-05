/**
 * Certificate verification helpers — honest stub.
 *
 * Certificates are issued server-side when a track is completed
 * (see src/lib/progressValidation.ts -> isTrackComplete). Verification
 * will eventually be a public, shareable link backed by a real database
 * lookup and optionally a signed URL. Until that portal exists every
 * verification attempt returns an explicit, non-fake result.
 */

export type CertificateEnv = Record<string, string | undefined>;

export type CertificateVerifyResult =
  | { ok: true; message: string }
  | { ok: false; code: "INVALID_ID" | "NOT_FOUND" | "NOT_CONFIGURED"; error: string };

/**
 * Build the verification URL for a certificate id.
 * Pure helper — never throws, always returns a path even when the
 * public portal is not yet configured.
 */
export function certificateUrl(id: string): string {
  const safe = encodeURIComponent(String(id).trim());
  return `/certificates/${safe}/verify`;
}

/**
 * Gate: true when the server has a public verification base URL
 * configured. Until CERTIFICATE_VERIFY_URL is set, verification links
 * are honest stubs and the UI explains the portal is coming.
 */
export function isCertificateVerifiable(env?: CertificateEnv): boolean {
  const e: CertificateEnv =
    env ??
    (typeof process !== "undefined" && (process as unknown as { env?: CertificateEnv }).env
      ? ((process as unknown as { env: CertificateEnv }).env as CertificateEnv)
      : {});
  const raw = e.CERTIFICATE_VERIFY_URL ?? e.VITE_CERTIFICATE_VERIFY_URL;
  return Boolean(raw && String(raw).trim());
}

function isValidCertificateId(id: string): boolean {
  const v = String(id).trim();
  if (!v) return false;
  // Prisma cuid() is ~25 chars, alphanumeric, starts with 'c'. Be lenient:
  // allow 10–64 chars, alphanumerics plus - and _.
  return /^[a-z0-9_-]{10,64}$/i.test(v);
}

/**
 * Honest stub for server-side certificate verification.
 *
 * - Validates id format first (INVALID_ID).
 * - Until a real verification service (DB lookup + optional signed URL)
 *   exists, every well-formed id returns NOT_FOUND — never a fake success.
 */
export function verifyCertificateStub(
  id: string,
  _env?: CertificateEnv
): CertificateVerifyResult {
  if (!isValidCertificateId(String(id ?? ""))) {
    return {
      ok: false,
      code: "INVALID_ID",
      error: "Invalid certificate id format.",
    };
  }

  // Honest: no real verification service yet. A real implementation would
  // look up the Certificate row by id and, when CERTIFICATE_VERIFY_URL is
  // set, return a signed public URL. Until then we never fake success.
  return {
    ok: false,
    code: "NOT_FOUND",
    error:
      "Certificate verification is not yet available — the public verification portal is coming soon. The certificate id is well-formed but no verification service is backing it yet.",
  };
}
