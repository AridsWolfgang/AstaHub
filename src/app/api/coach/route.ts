import { NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import {
  parseCoachRequest,
  buildCoachMessages,
  enforceCoachRules,
  isCoachConfigured,
} from "@/lib/coach";
import { askOpenRouter, DEFAULT_AI_MODEL } from "@/lib/openrouter";

export async function POST(req: Request) {
  if (!rateLimit(`coach:${clientIp(req)}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  if (!isCoachConfigured()) {
    return NextResponse.json(
      {
        error:
          "The AI coach isn't configured on this server yet. Add OPENROUTER_API_KEY to enable it — until then, the built-in hints and community Q&A are your human-first helpers.",
        code: "NOT_CONFIGURED",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseCoachRequest(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const result = await askOpenRouter({
    messages: buildCoachMessages(parsed.value),
    apiKey: process.env.OPENROUTER_API_KEY!,
    model: process.env.AI_MODEL || DEFAULT_AI_MODEL,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error, code: result.code }, { status: 502 });
  }

  return NextResponse.json({ hint: enforceCoachRules(result.text) });
}