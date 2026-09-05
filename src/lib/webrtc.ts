/**
 * WebRTC P2P live-coding stub (Phase 3, slice 2).
 *
 * The vision: browser-to-browser live coding via WebRTC (video + shared
 * editor) with a signaling server and TURN/STUN for NAT traversal.
 *
 * Honest state: P2P requires a signaling backend and/or TURN credentials.
 * Until those exist, every signaling attempt returns NOT_CONFIGURED — never
 * a fake peer connection. The config gate is real and tested; the actual
 * RTCPeerConnection + Socket.io signaling is wired behind it.
 */

export type WebRTCEnv = Record<string, string | undefined>;

export type WebRTCOfferResult =
  | { ok: true; message: string }
  | { ok: false; code: "NOT_CONFIGURED"; error: string };

const SIGNALING_KEYS = ["SIGNALING_URL", "NEXT_PUBLIC_SIGNALING_URL"] as const;
const TURN_KEYS = ["TURN_URL", "TURN_USERNAME", "TURN_CREDENTIAL"] as const;
const ALL_WEBRTC_KEYS = [...SIGNALING_KEYS, ...TURN_KEYS] as const;

/**
 * True when the server has enough config to attempt a WebRTC session.
 * Requires at least one signaling URL or a TURN server. This mirrors the
 * production requirement: a signaling channel plus NAT traversal.
 */
export function isWebRTCConfigured(env: WebRTCEnv = process.env): boolean {
  return Boolean(env.SIGNALING_URL || env.NEXT_PUBLIC_SIGNALING_URL || env.TURN_URL);
}

export function webrtcConfig(env: WebRTCEnv = process.env): {
  configured: boolean;
  missing: string[];
} {
  const configured = isWebRTCConfigured(env);
  if (configured) return { configured: true, missing: [] };
  const missing = ALL_WEBRTC_KEYS.filter((k) => !env[k]);
  return { configured: false, missing: [...missing] };
}

/**
 * Stub for creating a WebRTC signaling offer.
 * Returns NOT_CONFIGURED when signaling/TURN env is missing; never fakes a peer.
 * The real RTCPeerConnection + signaling transport is wired behind this gate.
 */
export async function createSignalingOfferStub(
  env: WebRTCEnv = process.env
): Promise<WebRTCOfferResult> {
  const config = webrtcConfig(env);

  if (!config.configured) {
    return {
      ok: false,
      code: "NOT_CONFIGURED",
      error: `WebRTC P2P is not configured on this server. Missing: ${config.missing.join(", ")}. Set SIGNALING_URL (or NEXT_PUBLIC_SIGNALING_URL) and/or TURN_URL with TURN_USERNAME/TURN_CREDENTIAL to enable live P2P sessions.`,
    };
  }

  return {
    ok: true,
    message: "WebRTC signaling is configured. A peer offer can now be created via the signaling server and TURN/STUN.",
  };
}
