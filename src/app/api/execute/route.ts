import { NextRequest, NextResponse } from "next/server";
import { simulateAnsi } from "@/lib/simulator";
import { rateLimit, clientIp } from "@/lib/rateLimit";

interface FileEntry {
  name?: string;
  content: string;
  encoding?: "base64" | "hex" | "utf8";
}

interface PistonRequest {
  language: string;
  version: string;
  files: FileEntry[];
  stdin?: string;
  args?: string[];
  compile_timeout?: number;
  run_timeout?: number;
  compile_cpu_time?: number;
  run_cpu_time?: number;
  compile_memory_limit?: number;
  run_memory_limit?: number;
}

interface PistonRunResult {
  stdout: string;
  stderr: string;
  output: string;
  code: number;
  signal: string | null;
  message: string | null;
  status: string | null;
}

interface PistonResponse {
  language: string;
  version: string;
  compile?: PistonRunResult;
  run: PistonRunResult;
}

const PISTON_API = "https://emkc.org/api/v2/piston";
const AUTH_TOKEN = process.env.PISTON_AUTH_TOKEN || "";

// Abuse protection — public route, no auth.
const MAX_CODE_LENGTH = 50_000;
const MAX_BODY_BYTES = 128 * 1024;
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60 * 1000;

function getPistonLanguage(lang: string): { language: string; version: string } {
  if (lang === "c") return { language: "c", version: "10.2.0" };
  if (lang === "asm") return { language: "nasm", version: "2.15.05" };
  if (lang === "python") return { language: "python", version: "*" };
  if (lang === "cpp") return { language: "c++", version: "*" };
  if (lang === "js") return { language: "javascript", version: "*" };
  if (lang === "rust") return { language: "rust", version: "*" };
  if (lang === "sql") return { language: "sqlite3", version: "*" };
  if (lang === "bash") return { language: "bash", version: "*" };
  return { language: lang, version: "*" };
}

async function executeViaPiston(code: string, language: string): Promise<{
  output: string;
  error: string | null;
  real: boolean;
}> {
  const { language: pistonLang, version } = getPistonLanguage(language);

  const body: PistonRequest = {
    language: pistonLang,
    version,
    files: [{ content: code }],
    run_timeout: 5000,
    run_cpu_time: 5000,
  };

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (AUTH_TOKEN) headers["Authorization"] = `Bearer ${AUTH_TOKEN}`;

  const res = await fetch(`${PISTON_API}/execute`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Piston API ${res.status}: ${text}`);
  }

  const data: PistonResponse = await res.json();

  const compileOutput = data.compile
    ? `// Compiler output:\n${data.compile.stderr || data.compile.stdout || "(ok)"}\n`
    : "";

  const runStdout = data.run.stdout || "";
  const runStderr = data.run.stderr || "";
  const exitCode = data.run.code;

  let output = "";
  if (compileOutput) output += compileOutput + "\n";
  if (runStdout) output += runStdout;
  if (runStderr) output += `\n// Stderr:\n${runStderr}`;
  output += `\n\n// Process exited with code ${exitCode}`;

  const error = data.run.status === "TO"
    ? "Execution timed out"
    : data.run.status === "SG"
    ? `Killed by signal ${data.run.signal}`
    : runStderr && !runStdout
    ? runStderr
    : null;

  return { output, error, real: true };
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (!rateLimit(`execute:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  let body: { code?: unknown; language?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { code, language } = body as { code: string; language: string };

  if (!code || !language) {
    return NextResponse.json(
      { error: "Missing 'code' or 'language' field" },
      { status: 400 }
    );
  }

  if (typeof code !== "string" || code.length === 0 || code.length > MAX_CODE_LENGTH) {
    return NextResponse.json(
      { error: `'code' must be a string up to ${MAX_CODE_LENGTH} characters.` },
      { status: 400 }
    );
  }

  if (language !== "c" && language !== "asm" && language !== "python" && language !== "cpp" && language !== "js" && language !== "rust" && language !== "sql" && language !== "bash") {
    return NextResponse.json(
      { error: "Language must be 'c', 'asm', 'python', 'cpp', 'js', 'rust', 'sql', or 'bash'" },
      { status: 400 }
    );
  }

  let real = false;
  let output: string;
  let error: string | null = null;

  if (AUTH_TOKEN) {
    try {
      const result = await executeViaPiston(code, language);
      output = result.output;
      error = result.error;
      real = result.real;
    } catch (e) {
      console.warn("Piston API failed, falling back:", e);
      output = simulateAnsi(code, language);
      error = "(Piston API unavailable — using simulated execution)";
    }
  } else {
    output = simulateAnsi(code, language);
    error = "(Simulated execution — set PISTON_AUTH_TOKEN for real compilation)";
  }

  return NextResponse.json({ output, error, real });
}
