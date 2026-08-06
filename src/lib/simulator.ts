export type SimValue = number | string | number[] | { array: string; index: number };

const TYPES_SIZES: Record<string, number> = {
  int: 4, char: 1, float: 4, double: 8, long: 8, "long long": 8,
  short: 2, unsigned: 4, "unsigned int": 4, "unsigned char": 1,
  size_t: 8, "int*": 8, "char*": 8, "void*": 8,
  int32_t: 4, int64_t: 8, uint32_t: 4, uint64_t: 8,
};

const OPERS = ["+", "-", "*", "/", "%", "<<", ">>", "&", "^", "|", "&&", "||", ">=", "<=", "==", "!=", ">", "<"];

function evalCExpr(expr: string, vars: Record<string, SimValue>): number {
  let e = expr;

  e = e.replace(/(\w+)\[([^\]]+)\]/g, (_m, name, idx) => {
    const arr = vars[name];
    const ix = evalCExpr(idx, vars);
    if (Array.isArray(arr)) return String(arr[ix] ?? 0);
    return "0";
  });

  e = e.replace(/(\+\+|--)(\w+)/g, (_m, op, name) => {
    const cur = typeof vars[name] === "number" ? vars[name] : 0;
    const v = op === "++" ? cur + 1 : cur - 1;
    vars[name] = v;
    return String(v);
  });
  e = e.replace(/(\w+)(\+\+|--)/g, (_m, name, op) => {
    const cur = typeof vars[name] === "number" ? vars[name] : 0;
    vars[name] = op === "++" ? cur + 1 : cur - 1;
    return String(cur);
  });

  e = e.replace(/\*\(\s*(\w+)\s*\+\s*(\d+)\s*\)/g, (_m, name, off) => {
    const p = vars[name];
    if (p && typeof p === "object" && !Array.isArray(p)) {
      const arr = vars[p.array];
      if (Array.isArray(arr)) return String(arr[p.index + Number(off)] ?? 0);
    }
    return "0";
  });

  e = e.replace(/\*\s*(\w+)/g, (_m, name) => {
    const p = vars[name];
    if (p && typeof p === "object" && !Array.isArray(p)) {
      const arr = vars[p.array];
      if (Array.isArray(arr)) return String(arr[p.index] ?? 0);
    }
    return "0";
  });

  e = e.replace(/([(,=;{}\[])\s*&\s*(?=\w)/g, "$1 0");
  e = e.replace(/sizeof\s*\([^)]+\)/g, "4");
  e = e.replace(/"([^"]*)"/g, "0");
  e = e.replace(/'([^'])'/g, (_m, c: string) => c.charCodeAt(0).toString());

  const parts = e.split(/(\*\*|\+|\-|\*|\/|%|<<|>>|&|\^|\||&&|\|\||>=|<=|==|!=|>|<)/g);
  let result = 0;
  let op = "+";

  for (const part of parts) {
    const t = part.trim();
    if (t === "") continue;
    if (OPERS.includes(t)) {
      op = t;
      continue;
    }
    let val: number;
    const varMatch = t.match(/^([a-zA-Z_]\w*)$/);
    if (varMatch && varMatch[1] in vars) {
      const v = vars[varMatch[1]];
      val = typeof v === "number" ? v : 0;
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
      case "&&": result = result && val ? 1 : 0; break;
      case "||": result = result || val ? 1 : 0; break;
      case ">": result = result > val ? 1 : 0; break;
      case "<": result = result < val ? 1 : 0; break;
      case ">=": result = result >= val ? 1 : 0; break;
      case "<=": result = result <= val ? 1 : 0; break;
      case "==": result = result === val ? 1 : 0; break;
      case "!=": result = result !== val ? 1 : 0; break;
    }
  }
  return result;
}

function simulateC(code: string): string[] {
  const lines = code.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)\}\s*(else.*)$/);
    if (m) {
      lines[i] = `${m[1]}}`;
      lines.splice(i + 1, 0, m[2]);
    }
  }
  const vars: Record<string, SimValue> = {};
  const out: string[] = [];
  let steps = 0;
  let halted = false;

  const isTrivia = (l: string) =>
    l === "" || l.startsWith("//") || l.startsWith("/*") || l.startsWith("*");

  function findMatchingClose(openIdx: number): number {
    let depth = 0;
    for (let i = openIdx; i < lines.length; i++) {
      const t = lines[i].trim();
      const opens = (t.match(/\{/g) || []).length;
      const closes = (t.match(/\}/g) || []).length;
      depth += opens - closes;
      if (depth <= 0) return i;
    }
    return lines.length;
  }

  function statementEnd(i: number): number {
    for (let k = i; k < lines.length; k++) {
      const t = lines[k].trim();
      if (t.endsWith(";") || t === "{" || t.endsWith("{")) return k + 1;
      if (t === "}") return k;
    }
    return lines.length;
  }

  function printfLine(line: string): boolean {
    const m = line.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\s*\)\s*;?/);
    if (!m) return false;
    let format = m[1]
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\%/g, "\x00PERCENT\x00");
    const args = m[2] ? m[2].split(",").map((a) => a.trim()) : [];
    let argIdx = 0;
    format = format.replace(/%([-+]?\d*(?:\.\d+)?)?([difsucpxX])/g, (_mm, _w, spec) => {
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
    out.push(format);
    return true;
  }

  function processStatement(line: string): void {
    if (line.startsWith("return")) {
      halted = true;
      return;
    }
    if (printfLine(line)) return;

    const putsMatch = line.match(/puts\s*\(\s*"([^"]*)"\s*\)\s*;?/);
    if (putsMatch) {
      out.push(putsMatch[1].replace(/\\n/g, "\n"));
      return;
    }

    const arrDecl = line.match(/(?:int|char|float|double|long|unsigned)\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{(.*)\}\s*;?/);
    if (arrDecl) {
      vars[arrDecl[1]] = arrDecl[2].split(",").map((s) => evalCExpr(s.trim(), vars));
      return;
    }

    const declMatch = line.match(/^(?:(?:const|static|volatile|unsigned|signed|long|short)\s+)*(?:int|char|float|double|unsigned|signed|long|short)\s+(.+?)\s*;?\s*$/);
    if (declMatch) {
      const decls = declMatch[1].split(",");
      for (const d of decls) {
        const assign = d.match(/^\s*(?:\*)?\s*(\w+)\s*=\s*(.+)$/);
        if (assign) {
          const name = assign[1];
          if (d.includes("*")) {
            const target = assign[2].trim();
            if (Array.isArray(vars[target])) vars[name] = { array: target, index: 0 };
            else vars[name] = evalCExpr(target, vars);
          } else {
            vars[name] = evalCExpr(assign[2], vars);
          }
        } else {
          const plain = d.match(/(\w+)/);
          if (plain) vars[plain[1]] = 0;
        }
      }
      return;
    }

    const arrAss = line.match(/(\w+)\[([^\]]+)\]\s*=\s*([^;]+);?/);
    if (arrAss && Array.isArray(vars[arrAss[1]])) {
      const arr = vars[arrAss[1]] as number[];
      arr[evalCExpr(arrAss[2], vars)] = evalCExpr(arrAss[3], vars);
      return;
    }

    const assignMatch = line.match(/^(\w+)\s*=\s*([^;]+);?$/);
    if (assignMatch && assignMatch[1] in vars) {
      const cur = vars[assignMatch[1]];
      if (cur && typeof cur === "object" && !Array.isArray(cur)) {
        cur.index = evalCExpr(assignMatch[2].replace(new RegExp(assignMatch[1], "g"), String(cur.index)), vars);
      } else {
        vars[assignMatch[1]] = evalCExpr(assignMatch[2], vars);
      }
      return;
    }

    const postfix = line.match(/^(\w+)\s*(\+\+|--);?$/);
    if (postfix && postfix[1] in vars) {
      const cur = vars[postfix[1]];
      if (typeof cur === "number") vars[postfix[1]] = cur + (postfix[2] === "++" ? 1 : -1);
      return;
    }

    const compound = line.match(/^(\w+)\s*(\+=|-=|\*=|\/=|%=|<<=|>>=|&=|\|=|\^=)\s*([^;]+);?$/);
    if (compound && compound[1] in vars) {
      const cur = vars[compound[1]];
      if (typeof cur === "number") {
        const rhs = evalCExpr(compound[3], vars) as number;
        const op = compound[2];
        vars[compound[1]] = op === "+=" ? cur + rhs
          : op === "-=" ? cur - rhs
          : op === "*=" ? cur * rhs
          : op === "/=" ? Math.floor(cur / rhs)
          : op === "%=" ? cur % rhs
          : op === "<<=" ? cur << rhs
          : op === ">>=" ? cur >> rhs
          : op === "&=" ? cur & rhs
          : op === "|=" ? cur | rhs
          : cur ^ rhs;
      }
      return;
    }

    const sizeofMatch = line.match(/sizeof\s*\(\s*(\w[\w\s*]*)\s*\)/);
    if (sizeofMatch) {
      const type = sizeofMatch[1].trim();
      out.push(`${type}: ${TYPES_SIZES[type] || 4} bytes`);
    }
  }

  function skipBody(i: number): number {
    const t = lines[i].trim();
    if (t.endsWith("{")) return findMatchingClose(i) + 1;
    return statementEnd(i);
  }

  function executeBody(i: number): number {
    const t = lines[i].trim();
    if (t.endsWith("{")) {
      const close = findMatchingClose(i);
      runBlock(i + 1, close);
      return close + 1;
    }
    processStatement(t);
    return statementEnd(i);
  }

  function runBlock(start: number, end: number): void {
    let i = start;
    while (i < end && steps++ < 5000 && !halted) {
      const raw = lines[i];
      const line = raw.trim();
      if (isTrivia(line) || line === "}") {
        i++;
        continue;
      }

      const ifMatch = line.match(/^if\s*\((.*?)\)\s*(.*)$/);
      const elseMatch = line.match(/^else\s*(.*)$/);
      const forMatch = line.match(/^for\s*\((.*?)\)\s*(.*)$/);
      const whileMatch = line.match(/^while\s*\((.*?)\)\s*(.*)$/);

      if (ifMatch) {
        const cond = ifMatch[1];
        const inline = ifMatch[2].trim();
        let branchTaken = evalCExpr(cond, vars) !== 0;
        i = inline === "{" || inline === "" ? executeOrSkipBody(i, branchTaken) : applyInline(i, branchTaken, inline);
        while (i < lines.length && steps++ < 5000) {
          const nxt = lines[i].trim();
          const elif = nxt.match(/^else\s+if\s*\((.*?)\)\s*(.*)$/);
          if (elif) {
            const c2 = evalCExpr(elif[1], vars) !== 0;
            const inline2 = elif[2].trim();
            if (!branchTaken) {
              branchTaken = c2;
              i = inline2 === "{" || inline2 === "" ? executeOrSkipBody(i, branchTaken) : applyInline(i, branchTaken, inline2);
            } else {
              i = skipBody(i);
            }
            continue;
          }
          const els = nxt.match(/^else\s*(.*)$/);
          if (els) {
            const inlineE = els[1].trim();
            if (!branchTaken) {
              i = inlineE === "{" || inlineE === "" ? executeBody(i) : (processStatement(inlineE), statementEnd(i));
              branchTaken = true;
            } else {
              i = skipBody(i);
            }
            continue;
          }
          break;
        }
        continue;
      }

      if (forMatch) {
        const header = forMatch[1];
        const inline = forMatch[2].trim();
        const [init, cond, step] = header.split(";");
        if (init) processStatement(init.trim());

        let body: { braced: boolean; start: number; end: number } | null = null;
        let close = -1;
        if (inline === "{") {
          close = findMatchingClose(i);
          body = { braced: true, start: i + 1, end: close };
        } else if (inline) {
          body = { braced: false, start: -1, end: i + 1 };
        } else {
          let j = i + 1;
          const t = lines[j] ? lines[j].trim() : "";
          if (t.endsWith("{")) {
            const c2 = findMatchingClose(j);
            body = { braced: true, start: j + 1, end: c2 };
            close = c2;
          } else {
            body = { braced: false, start: j, end: statementEnd(j) };
          }
        }

        let iterations = 0;
        while (!halted && iterations++ < 1000 && evalCExpr((cond || "1").trim(), vars) !== 0) {
          if (body.braced) runBlock(body.start, body.end);
          else if (body.start === -1) processStatement(inline);
          else processStatement(lines[body.start].trim());
          if (step) processStatement(step.trim());
        }
        i = close >= 0 ? close + 1 : statementEnd(i);
        continue;
      }

      if (whileMatch) {
        const cond = whileMatch[1];
        const inline = whileMatch[2].trim();

        let body: { braced: boolean; start: number; end: number } | null = null;
        let close = -1;
        if (inline === "{") {
          close = findMatchingClose(i);
          body = { braced: true, start: i + 1, end: close };
        } else if (inline) {
          body = { braced: false, start: -1, end: i + 1 };
        } else {
          let j = i + 1;
          const t = lines[j] ? lines[j].trim() : "";
          if (t.endsWith("{")) {
            const c2 = findMatchingClose(j);
            body = { braced: true, start: j + 1, end: c2 };
            close = c2;
          } else {
            body = { braced: false, start: j, end: statementEnd(j) };
          }
        }

        let iterations = 0;
        while (!halted && iterations++ < 1000 && evalCExpr(cond.trim(), vars) !== 0) {
          if (body.braced) runBlock(body.start, body.end);
          else if (body.start === -1) processStatement(inline);
          else processStatement(lines[body.start].trim());
        }
        i = close >= 0 ? close + 1 : statementEnd(i);
        continue;
      }

      processStatement(line);
      i = statementEnd(i);
    }
  }

  function executeOrSkipBody(i: number, run: boolean): number {
    return run ? executeBody(i) : skipBody(i);
  }

  function applyInline(i: number, run: boolean, inline: string): number {
    if (run) processStatement(inline);
    return statementEnd(i);
  }

  runBlock(0, lines.length);

  if (out.length === 0) {
    out.push("// Program compiled successfully.");
    out.push("// Return value: 0 (success)");
  }
  return out;
}

function simulateAsm(code: string): string[] {
  const output: string[] = [];

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

    if (/nop/.test(line)) { ip++; continue; }

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

  output.push(`; Program halted. Exit code: 0`);
  return output;
}

export function simulateAnsi(code: string, language: string): string {
  const output: string[] = [];
  output.push(`// ASTA Runner v2.0 — ${language === "c" ? "Simulated C (C11)" : "Simulated NASM x86-64"}`);
  output.push(`// ─────────────────────────────────────────────`);
  output.push("");

  output.push(...(language === "c" ? simulateC(code) : simulateAsm(code)));

  output.push("");
  output.push(`// Process finished — exit code 0`);
  return output.join("\n");
}
