import { NextRequest, NextResponse } from "next/server";

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

function getPistonLanguage(lang: string): { language: string; version: string } {
  if (lang === "c") return { language: "c", version: "10.2.0" };
  if (lang === "asm") return { language: "nasm", version: "2.15.05" };
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

const TYPES_SIZES: Record<string, number> = {
  int: 4, char: 1, float: 4, double: 8, long: 8, "long long": 8,
  short: 2, unsigned: 4, "unsigned int": 4, "unsigned char": 1,
  size_t: 8, "int*": 8, "char*": 8, "void*": 8,
  int32_t: 4, int64_t: 8, uint32_t: 4, uint64_t: 8,
};

function simulateAnsi(code: string, language: string): string {
  const output: string[] = [];
  output.push(`// ASTA Runner v2.0 — ${language === "c" ? "Simulated C (C11)" : "Simulated NASM x86-64"}`);
  output.push(`// ─────────────────────────────────────────────`);
  output.push("");

  if (language === "c") {
    const lines = code.split("\n");
    const vars: Record<string, number | string> = {};
    let hasOutput = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) continue;

      const printfMatch = trimmed.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\s*\)\s*;/);
      if (printfMatch) {
        hasOutput = true;
        let format = printfMatch[1]
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t")
          .replace(/\\"/g, '"')
          .replace(/\\%/g, "\x00PERCENT\x00");
        const args = printfMatch[2] ? printfMatch[2].split(",").map((a) => a.trim()) : [];

        let argIdx = 0;
        format = format.replace(/%([-+]?\d*(?:\.\d+)?)?([difsucpxX])/g, (_match, _width, spec) => {
          if (argIdx >= args.length) return "?";
          const arg = args[argIdx++];
          let val: string;
          if (spec === "d" || spec === "i") val = evalCExpr(arg, vars).toString();
          else if (spec === "c") val = String.fromCharCode(evalCExpr(arg, vars) as number);
          else if (spec === "f") val = (evalCExpr(arg, vars) as number).toFixed(2);
          else if (spec === "s") val = arg.replace(/^"|"$/g, "");
          else if (spec === "p") val = `0x${(0x7ffe + Math.floor(Math.random() * 0xffff)).toString(16)}`;
          else if (spec === "x" || spec === "X") val = (evalCExpr(arg, vars) as number).toString(16);
          else if (spec === "u") val = Math.abs(evalCExpr(arg, vars) as number).toString();
          else val = "?";
          return val;
        });
        format = format.replace(/\x00PERCENT\x00/g, "%");
        output.push(format);
        continue;
      }

      const putsMatch = trimmed.match(/puts\s*\(\s*"([^"]*)"\s*\)\s*;/);
      if (putsMatch) {
        hasOutput = true;
        output.push(putsMatch[1].replace(/\\n/g, "\n"));
        continue;
      }

      const declMatch = trimmed.match(/(int|char|float|double|long|unsigned)\s+(\w+)\s*=\s*([^;]+);/);
      if (declMatch) {
        const type = declMatch[1];
        const name = declMatch[2];
        const expr = declMatch[3];
        vars[name] = evalCExpr(expr, vars);
        continue;
      }

      const assignMatch = trimmed.match(/(\w+)\s*=\s*([^;]+);/);
      if (assignMatch && assignMatch[1] in vars) {
        vars[assignMatch[1]] = evalCExpr(assignMatch[2], vars);
        continue;
      }

      const sizeofMatch = trimmed.match(/sizeof\s*\(\s*(\w[\w\s*]*)\s*\)/);
      if (sizeofMatch) {
        const type = sizeofMatch[1].trim();
        const size = TYPES_SIZES[type] || 4;
        output.push(`${type}: ${size} bytes`);
        hasOutput = true;
      }
    }

    if (!hasOutput) {
      output.push(`// Program compiled successfully.`);
      output.push(`// Return value: 0 (success)`);
    }
  } else {
    output.push(`; NASM x86-64 — simulated execution`);

    if (code.includes("mov rax, 1") || code.includes("sys_write")) {
      const msgMatch = code.match(/db\s+'([^']+)'/);
      if (msgMatch) output.push(msgMatch[1]);
    }

    const regs: Record<string, number> = {
      rax: 0, rbx: 0, rcx: 0, rdx: 0, rsi: 0, rdi: 0,
      r8: 0, r9: 0, r10: 0, r11: 0, r12: 0, r13: 0, r14: 0, r15: 0,
    };
    const labels: Record<string, number> = {};
    const stack: number[] = [];

    const lines = code.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      const labelMatch = trimmed.match(/^(\w+):/);
      if (labelMatch) labels[labelMatch[1]] = i;
    }

    let ip = 0;
    let maxSteps = 200;
    while (ip < lines.length && maxSteps > 0) {
      maxSteps--;
      const line = lines[ip].trim();
      if (line === "" || line.startsWith(";") || line.match(/^\w+:/)) { ip++; continue; }

      const movMatch = line.match(/mov\s+(r\w+),\s*(\d+)/);
      if (movMatch && movMatch[1] in regs) {
        regs[movMatch[1]] = parseInt(movMatch[2]);
        ip++; continue;
      }

      const movRegMatch = line.match(/mov\s+(r\w+),\s*(r\w+)/);
      if (movRegMatch && movRegMatch[1] in regs && movRegMatch[2] in regs) {
        regs[movRegMatch[1]] = regs[movRegMatch[2]];
        ip++; continue;
      }

      const addMatch = line.match(/add\s+(r\w+),\s*(\d+)/);
      if (addMatch && addMatch[1] in regs) {
        regs[addMatch[1]] += parseInt(addMatch[2]);
        ip++; continue;
      }

      const subMatch = line.match(/sub\s+(r\w+),\s*(\d+)/);
      if (subMatch && subMatch[1] in regs) {
        regs[subMatch[1]] -= parseInt(subMatch[2]);
        ip++; continue;
      }

      const imulMatch = line.match(/imul\s+(r\w+),\s*(\d+)/);
      if (imulMatch && imulMatch[1] in regs) {
        regs[imulMatch[1]] *= parseInt(imulMatch[2]);
        ip++; continue;
      }

      const pushMatch = line.match(/push\s+(r\w+)/);
      if (pushMatch && pushMatch[1] in regs) {
        stack.push(regs[pushMatch[1]]);
        ip++; continue;
      }

      const pushImmMatch = line.match(/push\s+(\d+)/);
      if (pushImmMatch) {
        stack.push(parseInt(pushImmMatch[1]));
        ip++; continue;
      }

      const popMatch = line.match(/pop\s+(r\w+)/);
      if (popMatch && popMatch[1] in regs && stack.length > 0) {
        regs[popMatch[1]] = stack.pop()!;
        ip++; continue;
      }

      const xorMatch = line.match(/xor\s+(r\w+),\s*(r\w+)/);
      if (xorMatch && xorMatch[1] in regs && xorMatch[2] in regs) {
        regs[xorMatch[1]] ^= regs[xorMatch[2]];
        ip++; continue;
      }

      const andMatch = line.match(/and\s+(r\w+),\s*(r\w+)/);
      if (andMatch && andMatch[1] in regs && andMatch[2] in regs) {
        regs[andMatch[1]] &= regs[andMatch[2]];
        ip++; continue;
      }

      const orMatch = line.match(/or\s+(r\w+),\s*(r\w+)/);
      if (orMatch && orMatch[1] in regs && orMatch[2] in regs) {
        regs[orMatch[1]] |= regs[orMatch[2]];
        ip++; continue;
      }

      const shlMatch = line.match(/shl\s+(r\w+),\s*(\d+)/);
      if (shlMatch && shlMatch[1] in regs) {
        regs[shlMatch[1]] <<= parseInt(shlMatch[2]);
        ip++; continue;
      }

      const shrMatch = line.match(/shr\s+(r\w+),\s*(\d+)/);
      if (shrMatch && shrMatch[1] in regs) {
        regs[shrMatch[1]] >>= parseInt(shrMatch[2]);
        ip++; continue;
      }

      const decMatch = line.match(/dec\s+(r\w+)/);
      if (decMatch && decMatch[1] in regs) {
        regs[decMatch[1]]--;
        ip++; continue;
      }

      const nopMatch = line.match(/nop/);
      if (nopMatch) { ip++; continue; }

      const jmpMatch = line.match(/jmp\s+(\w+)/);
      if (jmpMatch && jmpMatch[1] in labels) {
        ip = labels[jmpMatch[1]] + 1; continue;
      }

      const jnzMatch = line.match(/jnz\s+(\w+)/);
      if (jnzMatch && jnzMatch[1] in labels) {
        if (regs["rcx"] !== 0) { ip = labels[jnzMatch[1]] + 1; continue; }
        ip++; continue;
      }

      const syscallMatch = line.match(/syscall/);
      if (syscallMatch) {
        if (regs["rax"] === 60) {
          output.push(`; Program halted. Exit code: ${regs["rdi"] || 0}`);
        } else if (regs["rax"] === 1) {
          output.push(`; sys_write(${regs["rdi"]}, ..., ${regs["rdx"]})`);
        }
        ip++; continue;
      }

      ip++;
    }

    if (code.includes("mov rax, 60") || code.includes("sys_exit")) {
    } else {
      output.push(`; Program halted. Exit code: 0`);
    }
  }

  output.push("");
  output.push(`// Process finished — exit code 0`);
  return output.join("\n");
}

function evalCExpr(expr: string, vars: Record<string, number | string>): number {
  const cleaned = expr
    .replace(/sizeof\s*\([^)]+\)/g, "4")
    .replace(/"([^"]*)"/g, "0")
    .replace(/'([^'])'/g, (_, c) => c.charCodeAt(0).toString());

  const parts = cleaned.split(/(\*\*|\+|\-|\*|\/|%|<<|>>|&|\^|\||&&|\|\|)/g);
  let result = 0;
  let op = "+";

  for (const part of parts) {
    const t = part.trim();
    if (t === "") continue;
    if (["+", "-", "*", "/", "%", "<<", ">>", "&", "^", "|", "&&", "||"].includes(t)) {
      op = t;
    } else {
      let val: number;
      const varMatch = t.match(/^([a-zA-Z_]\w*)$/);
      if (varMatch && varMatch[1] in vars) {
        val = vars[varMatch[1]] as number;
      } else if (t.startsWith("0x")) {
        val = parseInt(t, 16);
      } else if (t.startsWith("0b")) {
        val = parseInt(t.slice(2), 2);
      } else if (t.includes(".")) {
        val = parseFloat(t);
      } else {
        val = parseInt(t) || 0;
      }

      switch (op) {
        case "+": result += val; break;
        case "-": result -= val; break;
        case "*": result *= val; break;
        case "/": result = val !== 0 ? Math.floor(result / val) : 0; break;
        case "%": result = val !== 0 ? result % val : 0; break;
        case "<<": result <<= val; break;
        case ">>": result >>= val; break;
        case "&": result &= val; break;
        case "^": result ^= val; break;
        case "|": result |= val; break;
        case "&&": result = (result && val) ? 1 : 0; break;
        case "||": result = (result || val) ? 1 : 0; break;
      }
    }
  }
  return result;
}

export async function POST(request: NextRequest) {
  const { code, language } = await request.json();

  if (!code || !language) {
    return NextResponse.json(
      { error: "Missing 'code' or 'language' field" },
      { status: 400 }
    );
  }

  if (language !== "c" && language !== "asm") {
    return NextResponse.json(
      { error: "Language must be 'c' or 'asm'" },
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
      console.warn("Piston API failed, falling back to simulation:", e);
      output = simulateAnsi(code, language);
      error = "(Piston API unavailable — using simulated execution)";
    }
  } else {
    output = simulateAnsi(code, language);
    error = "(Simulated execution — set PISTON_AUTH_TOKEN for real compilation)";
  }

  return NextResponse.json({ output, error, real });
}
