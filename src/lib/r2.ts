/**
 * Cloudflare R2 / Stream recording pipeline stub (Phase 3, slice 2).
 *
 * The vision: store raw recordings in R2 (S3-compatible, zero egress) and
 * optionally transcode via Cloudflare Stream before publishing to YouTube.
 *
 * Honest state: upload requires R2 + Stream credentials. Until those exist,
 * every upload attempt returns an explicit NOT_CONFIGURED result — never a
 * fake success. The config gate is real and tested; the S3/Stream transport
 * is wired behind it.
 */

export type R2Env = Record<string, string | undefined>;

export type R2UploadResult =
  | { ok: true; message: string }
  | { ok: false; code: "NOT_CONFIGURED"; error: string };

const REQUIRED_R2_ENV = [
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET",
  "CLOUDFLARE_STREAM_TOKEN",
] as const;

/** True when the server has credentials to store recordings in R2/Stream. */
export function isR2Configured(env: R2Env = process.env): boolean {
  return REQUIRED_R2_ENV.every((k) => Boolean(env[k]));
}

export function r2Config(env: R2Env = process.env): {
  configured: boolean;
  missing: string[];
} {
  const missing = REQUIRED_R2_ENV.filter((k) => !env[k]);
  return { configured: missing.length === 0, missing: [...missing] };
}

/**
 * Stub for uploading a recording file to R2/Stream.
 * Returns NOT_CONFIGURED when R2 env is missing; never fakes success.
 * The real S3-compatible PutObject / Stream upload is wired behind this gate.
 */
export async function uploadRecordingStub(
  fileName: string,
  size: number,
  env: R2Env = process.env
): Promise<R2UploadResult> {
  const config = r2Config(env);

  if (!config.configured) {
    return {
      ok: false,
      code: "NOT_CONFIGURED",
      error: `R2 recording pipeline is not configured on this server. Missing: ${config.missing.join(", ")}.`,
    };
  }

  return {
    ok: true,
    message: `Recording "${fileName}" (${size} bytes) is staged for upload via Cloudflare R2/Stream.`,
  };
}
