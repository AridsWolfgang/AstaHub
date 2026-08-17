/**
 * Minimal OpenRouter chat client for the AI coach. Uses the OpenAI-compatible
 * `/chat/completions` endpoint with plain fetch — no SDK dependency, no vendor
 * lock-in. The model is configurable via `AI_MODEL` (defaults to a cheap,
 * capable instruct model).
 */

export const DEFAULT_AI_MODEL = "openai/gpt-4o-mini";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export type OpenRouterResult = { ok: true; text: string } | { ok: false; error: string; code: string };

export async function askOpenRouter(input: {
  messages: ChatMessage[];
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<OpenRouterResult> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${input.apiKey}`,
    },
    body: JSON.stringify({
      model: input.model || DEFAULT_AI_MODEL,
      messages: input.messages,
      max_tokens: input.maxTokens ?? 300,
      temperature: input.temperature ?? 0.5,
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!res.ok) {
    return {
      ok: false,
      error: `The model provider returned ${res.status}${res.status === 401 ? " — check the API key." : ""}`,
      code: `HTTP_${res.status}`,
    };
  }

  const data = (await res.json().catch(() => null)) as {
    choices?: { message?: { content?: unknown } }[];
  } | null;
  const text = typeof data?.choices?.[0]?.message?.content === "string" ? data.choices[0].message.content : null;
  if (!text || !text.trim()) {
    return { ok: false, error: "The model returned an empty reply.", code: "EMPTY" };
  }

  return { ok: true, text: text.trim() };
}