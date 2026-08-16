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

type PyVal = number | string | boolean | null | PyValArray | PyValDict | PyFunc | RangeObj | undefined;

interface PyValArray extends Array<PyVal> {}
interface PyValDict {
  [key: string]: PyVal;
}

interface PyFunc {
  kind: "func";
  name: string;
  params: string[];
  defaults: any[];
  body: PyLine[];
  closure: Record<string, any>;
}

interface RangeObj {
  kind: "range";
  start: number;
  stop: number;
  step: number;
}

interface PyLine {
  indent: number;
  text: string;
}

type PyControl = { flow: "break" } | { flow: "continue" } | { flow: "return"; value: PyVal };

const PY_TRUE = true;
const PY_FALSE = false;

function pyIsTruthy(v: PyVal): boolean {
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") return v.length > 0;
  if (typeof v === "boolean") return v;
  if (v === null) return false;
  if (v === undefined) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "object") {
    if ("kind" in v && (v.kind === "func" || v.kind === "range")) return true;
    return Object.keys(v).length > 0;
  }
  return true;
}

function pyToStr(v: PyVal): string {
  if (v === null || v === undefined) return "None";
  if (typeof v === "boolean") return v ? "True" : "False";
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : String(v);
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return "[" + v.map(pyRepr).join(", ") + "]";
  if (typeof v === "object" && "kind" in v && (v.kind === "func" || v.kind === "range")) {
    return v.kind === "range" ? `range(${(v as RangeObj).start}, ${(v as RangeObj).stop})` : `<function ${(v as PyFunc).name}>`;
  }
  if (typeof v === "object") {
    const keys = Object.keys(v);
    const dict = v as Record<string, PyVal>;
    return "{" + keys.map((k) => `${/^[a-zA-Z_]\w*$/.test(k) ? k : JSON.stringify(k)}: ${pyRepr(dict[k])}`).join(", ") + "}";
  }
  return String(v);
}

function pyRepr(v: PyVal): string {
  if (typeof v === "string") return "'" + v.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
  return pyToStr(v);
}

/** Python-style JSON serialization: default separators are ", " and ": ". */
function pyJsonDumps(v: PyVal): string {
  if (v === null || v === undefined) return "null";
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "null";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(pyJsonDumps).join(", ") + "]";
  if (typeof v === "object") {
    const keys = Object.keys(v);
    return "{" + keys.map((k) => `${JSON.stringify(k)}: ${pyJsonDumps((v as Record<string, PyVal>)[k])}`).join(", ") + "}";
  }
  return "null";
}

function pyEq(a: PyVal, b: PyVal): boolean {
  if (typeof a === "number" && typeof b === "number") return a === b;
  if (typeof a === "string" && typeof b === "string") return a === b;
  if (typeof a === "boolean" && typeof b === "boolean") return a === b;
  if (a === null || a === undefined) return b === null || b === undefined;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((x, i) => pyEq(x, b[i]));
  }
  if (typeof a === "object" && a !== null && typeof b === "object" && b !== null && !Array.isArray(a) && !Array.isArray(b)) {
    const ak = Object.keys(a);
    const bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    return ak.every((k) => k in b && pyEq((a as Record<string, PyVal>)[k], (b as Record<string, PyVal>)[k]));
  }
  return a === b;
}

function rangeValues(r: RangeObj): number[] {
  const out: number[] = [];
  if (r.step > 0) {
    for (let i = r.start; i < r.stop; i += r.step) out.push(i);
  } else {
    for (let i = r.start; i > r.stop; i += r.step) out.push(i);
  }
  return out;
}

function makeRange(start: number, stop: number, step: number): RangeObj {
  return { kind: "range", start, stop, step: step === 0 ? 1 : step };
}

// ---------------------------------------------------------------------------
// Tokenizer + expression parser for a practical Python subset
// ---------------------------------------------------------------------------

type PyTok = { t: "num"; v: number } | { t: "str"; v: string } | { t: "id"; v: string } | { t: "op"; v: string } | { t: "punc"; v: string } | { t: "kw"; v: string } | { t: "fstr"; v: string };

const PY_OPERATORS = [
  "**", "//", "==", "!=", "<=", ">=", "+=", "-=", "*=", "/=", "//=", "%=", "**=",
  "+", "-", "*", "/", "%", "<", ">", "=", "(", ")", "[", "]", ",", ":", "{", "}", ".", "->",
];

function pyTokenize(expr: string): PyTok[] {
  const tokens: PyTok[] = [];
  let i = 0;
  while (i < expr.length) {
    const c = expr[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === "'" || c === '"') {
      const quote = c;
      let s = "";
      i++;
      while (i < expr.length && expr[i] !== quote) {
        if (expr[i] === "\\" && i + 1 < expr.length) {
          const n = expr[i + 1];
          s += n === "n" ? "\n" : n === "t" ? "\t" : n === "\\" ? "\\" : n === "'" ? "'" : n === '"' ? '"' : n;
          i += 2;
        } else {
          s += expr[i];
          i++;
        }
      }
      i++; // closing quote
      tokens.push({ t: "str", v: s });
      continue;
    }
    if (/[0-9]/.test(c)) {
      let s = "";
      while (i < expr.length && /[0-9._eE+-]/.test(expr[i])) {
        // stop at 'e' only if followed by digits (avoid consuming operator)
        if ((expr[i] === "e" || expr[i] === "E") && !/[0-9]/.test(expr[i + 1] ?? "")) break;
        if ((expr[i] === "+" || expr[i] === "-") && !/[eE]/.test(expr[i - 1] ?? "")) break;
        s += expr[i];
        i++;
      }
      tokens.push({ t: "num", v: parseFloat(s) });
      continue;
    }
    if (/[a-zA-Z_]/.test(c)) {
      let s = "";
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) { s += expr[i]; i++; }
      const kws = ["True", "False", "None", "and", "or", "not", "in", "is", "for", "if", "while", "def", "return", "pass", "break", "continue", "import", "from", "elif", "else", "lambda"];
      if (kws.includes(s)) {
        tokens.push({ t: "kw", v: s });
        continue;
      }
      // f-string: f"..." or f'...' (only when followed directly by a quote)
      if (s === "f" && (expr[i] === '"' || expr[i] === "'")) {
        const quote = expr[i];
        let body = "";
        let depth = 0;
        i++; // opening quote
        while (i < expr.length) {
          const ch = expr[i];
          if (ch === "{" && expr[i + 1] !== "{") depth++;
          if (ch === "}" && depth > 0) depth--;
          if (ch === quote && depth === 0) break;
          body += ch;
          i++;
        }
        i++; // closing quote
        tokens.push({ t: "fstr", v: body });
        continue;
      }
      tokens.push({ t: "id", v: s });
      continue;
    }
    const two = expr.slice(i, i + 2);
    if (PY_OPERATORS.includes(two)) {
      tokens.push({ t: "op", v: two });
      i += 2;
      continue;
    }
    if (PY_OPERATORS.includes(c)) {
      tokens.push({ t: "op", v: c });
      i++;
      continue;
    }
    // unknown char — skip
    i++;
  }
  return tokens;
}

class PyExprParser {
  private pos = 0;
  constructor(private toks: PyTok[]) {}

  private peek(): PyTok | undefined {
    return this.toks[this.pos];
  }

  private next(): PyTok | undefined {
    return this.toks[this.pos++];
  }

  private expectOp(op: string): boolean {
    const t = this.peek();
    if (t && t.t === "op" && t.v === op) {
      this.pos++;
      return true;
    }
    return false;
  }

  private matchKw(kw: string): boolean {
    const t = this.peek();
    if (t && t.t === "kw" && t.v === kw) {
      this.pos++;
      return true;
    }
    return false;
  }

  parseAll(): PyVal {
    if (this.toks.length === 0) return undefined;
    const v = this.parseOr();
    return v;
  }

  private parseOr(): PyVal {
    let left = this.parseAnd();
    while (this.matchKw("or")) {
      const r = this.parseAnd();
      left = { __binop: { op: "or", l: left, r } } as unknown as PyVal;
    }
    return left;
  }

  private parseAnd(): PyVal {
    let left = this.parseNot();
    while (this.matchKw("and")) {
      const r = this.parseNot();
      left = { __binop: { op: "and", l: left, r } } as unknown as PyVal;
    }
    return left;
  }

  private parseNot(): PyVal {
    if (this.matchKw("not")) {
      const v = this.parseNot();
      return { __binop: { op: "not", l: v, r: undefined } } as unknown as PyVal;
    }
    return this.parseComparison();
  }

  private parseComparison(): PyVal {
    let left = this.parseAdditive();
    for (;;) {
      const t = this.peek();
      if (t && t.t === "op" && ["==", "!=", "<", ">", "<=", ">="].includes(t.v)) {
        this.pos++;
        const r = this.parseAdditive();
        left = { __binop: { op: t.v, l: left, r } } as unknown as PyVal;
        continue;
      }
      if (t && t.t === "kw" && t.v === "in") {
        this.pos++;
        const r = this.parseAdditive();
        left = { __binop: { op: "in", l: left, r } } as unknown as PyVal;
        continue;
      }
      if (t && t.t === "kw" && t.v === "is") {
        this.pos++;
        this.matchKw("not");
        const r = this.parseAdditive();
        left = { __binop: { op: "is", l: left, r } } as unknown as PyVal;
        continue;
      }
      break;
    }
    return left;
  }

  private parseAdditive(): PyVal {
    let left = this.parseMultiplicative();
    for (;;) {
      const t = this.peek();
      if (t && t.t === "op" && (t.v === "+" || t.v === "-")) {
        this.pos++;
        const r = this.parseMultiplicative();
        left = { __binop: { op: t.v, l: left, r } } as unknown as PyVal;
        continue;
      }
      break;
    }
    return left;
  }

  private parseMultiplicative(): PyVal {
    let left = this.parsePower();
    for (;;) {
      const t = this.peek();
      if (t && t.t === "op" && ["*", "/", "//", "%"].includes(t.v)) {
        this.pos++;
        const r = this.parsePower();
        left = { __binop: { op: t.v, l: left, r } } as unknown as PyVal;
        continue;
      }
      break;
    }
    return left;
  }

  private parsePower(): PyVal {
    const base = this.parseUnary();
    const t = this.peek();
    if (t && t.t === "op" && t.v === "**") {
      this.pos++;
      const exp = this.parseUnary();
      return { __binop: { op: "**", l: base, r: exp } } as unknown as PyVal;
    }
    return base;
  }

  private parseUnary(): PyVal {
    const t = this.peek();
    if (t && t.t === "op" && (t.v === "-" || t.v === "+")) {
      this.pos++;
      const v = this.parseUnary();
      if (t.v === "-") return { __binop: { op: "-", l: 0, r: v } } as unknown as PyVal;
      return v;
    }
    return this.parsePostfix();
  }

  private parsePostfix(): PyVal {
    let node = this.parseAtom();
    for (;;) {
      const t = this.peek();
      if (t && t.t === "op" && t.v === "(") {
        this.pos++;
        const args: PyVal[] = [];
        const kwargs: Record<string, PyVal> = {};
        while (!this.expectOp(")")) {
          if (this.peek()?.t === "op" && this.peek()!.v === ")") break;
          // keyword argument: name = value
          const p1 = this.peek();
          const p2 = this.toks[this.pos + 1];
          if (p1 && p1.t === "id" && p2 && p2.t === "op" && p2.v === "=") {
            const kwName = p1.v;
            this.pos += 2; // skip name and '='
            kwargs[kwName] = this.parseOr();
          } else {
            args.push(this.parseOr());
          }
          if (this.expectOp(",")) continue;
          this.expectOp(")");
          break;
        }
        node = { __call: node, args, kwargs } as unknown as PyVal;
        continue;
      }
      if (t && t.t === "op" && t.v === "[") {
        this.pos++;
        if (this.peek()?.t === "op" && this.peek()!.v === ":") {
          this.pos++;
          let stop: PyVal = undefined;
          if (!(this.peek()?.t === "op" && this.peek()!.v === "]")) stop = this.parseOr();
          this.expectOp("]");
          node = { __slice: node, start: undefined, stop } as unknown as PyVal;
          continue;
        }
        const first = this.parseOr();
        if (this.expectOp(":")) {
          const endTok = this.peek();
          let stop: PyVal = undefined;
          if (!(endTok && endTok.t === "op" && endTok.v === "]")) stop = this.parseOr();
          this.expectOp("]");
          node = { __slice: node, start: first, stop } as unknown as PyVal;
        } else {
          this.expectOp("]");
          node = { __index: node, idx: first } as unknown as PyVal;
        }
        continue;
      }
      if (t && t.t === "op" && t.v === ".") {
        this.pos++;
        const attr = this.next();
        if (attr && attr.t === "id") {
          node = { __attr: node, name: attr.v } as unknown as PyVal;
          continue;
        }
      }
      break;
    }
    return node;
  }

  private parseAtom(): PyVal {
    const t = this.next();
    if (!t) return undefined;
    if (t.t === "num") return t.v;
    if (t.t === "str") return t.v;
    if (t.t === "fstr") return { __fstr: t.v } as unknown as PyVal;
    if (t.t === "kw") {
      if (t.v === "True") return true;
      if (t.v === "False") return false;
      if (t.v === "None") return null;
      if (t.v === "not") return this.parseNot();
      return undefined;
    }
    if (t.t === "id") return { __name: t.v } as unknown as PyVal;
    if (t.t === "op" && t.v === "[") {
      // list / set literal, or comprehension
      const items: PyVal[] = [];
      while (!this.expectOp("]")) {
        if (this.peek()?.t === "op" && this.peek()!.v === "]") break;
        items.push(this.parseOr());
        if (this.expectOp(",")) continue;
        this.expectOp("]");
        break;
      }
      if (this.peek()?.t === "kw" && this.peek()!.v === "for") {
        this.pos++;
        const targetIds: string[] = [];
        for (;;) {
          const idTok = this.next();
          if (idTok && idTok.t === "id") targetIds.push(idTok.v);
          if (this.expectOp(",")) continue;
          break;
        }
        this.matchKw("in");
        const iterable = this.parseOr();
        let cond: PyVal | undefined;
        if (this.matchKw("if")) cond = this.parseOr();
        this.expectOp("]");
        return { __comprehension: { expr: items[0], target: targetIds, iterable, cond } } as unknown as PyVal;
      }
      return items;
    }
    if (t.t === "op" && t.v === "(") {
      const items: PyVal[] = [];
      while (!this.expectOp(")")) {
        if (this.peek()?.t === "op" && this.peek()!.v === ")") break;
        items.push(this.parseOr());
        if (this.expectOp(",")) continue;
        this.expectOp(")");
        break;
      }
      if (items.length === 1) return items[0];
      return items;
    }
    if (t.t === "op" && t.v === "{") {
      // dict literal
      const dict: Record<string, PyVal> = {};
      while (!this.expectOp("}")) {
        if (this.peek()?.t === "op" && this.peek()!.v === "}") break;
        const k = this.parseOr();
        if (this.expectOp(":")) {
          const v = this.parseOr();
          dict[String(k)] = v;
        } else {
          // set literal (best effort: treat as dict with null values)
          dict[String(k)] = k;
        }
        if (this.expectOp(",")) continue;
        this.expectOp("}");
        break;
      }
      return dict;
    }
    return undefined;
  }
}

function comparePy(a: PyVal, b: PyVal, op: string): boolean {
  const cmp = (x: PyVal, y: PyVal): number => {
    if (typeof x === "number" && typeof y === "number") return x - y;
    if (typeof x === "string" && typeof y === "string") return x < y ? -1 : x > y ? 1 : 0;
    return String(x) < String(y) ? -1 : String(x) > String(y) ? 1 : 0;
  };
  const c = cmp(a, b);
  switch (op) {
    case "==": return pyEq(a, b);
    case "!=": return !pyEq(a, b);
    case "<": return c < 0;
    case ">": return c > 0;
    case "<=": return c <= 0;
    case ">=": return c >= 0;
  }
  return false;
}

function pyIn(item: PyVal, container: PyVal): boolean {
  if (Array.isArray(container)) return container.some((x) => pyEq(x, item));
  if (typeof container === "string") return typeof item === "string" && container.includes(item);
  if (typeof container === "object" && container !== null && !Array.isArray(container) && !("kind" in container)) {
    return String(item) in container;
  }
  return false;
}

function pyAdd(a: PyVal, b: PyVal, op: "+" | "-"): PyVal {
  if (typeof a === "number" && typeof b === "number") return op === "+" ? a + b : a - b;
  if (typeof a === "string" && typeof b === "string" && op === "+") return a + b;
  if (Array.isArray(a) && Array.isArray(b) && op === "+") return [...a, ...b];
  return pyToStr(a) + (op === "+" ? pyToStr(b) : "");
}

function pyMul(a: PyVal, b: PyVal, op: string): PyVal {
  if (typeof a === "number" && typeof b === "number") {
    switch (op) {
      case "*": return a * b;
      case "/": return b !== 0 ? a / b : "DivisionByZero";
      case "//": return b !== 0 ? Math.floor(a / b) : "DivisionByZero";
      case "%": return b !== 0 ? a % b : "DivisionByZero";
    }
  }
  if ((typeof a === "string" || Array.isArray(a)) && typeof b === "number" && op === "*") {
    if (Array.isArray(a)) return Array.from({ length: b }, () => a).flat();
    return a.repeat(Math.max(0, Math.floor(b)));
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Python simulator
// ---------------------------------------------------------------------------

function simulatePython(code: string): string[] {
  const rawLines = code.split("\n").map((l) => l.replace(/\t/g, "    "));
  const pyLines: PyLine[] = [];
  for (const raw of rawLines) {
    if (raw.trim() === "") continue;
    const indent = raw.length - raw.trimStart().length;
    pyLines.push({ indent, text: raw.trim() });
  }

  const out: string[] = [];
  let outStr = "";
  const stdlib: Record<string, PyVal> = {
    math: { sqrt: { kind: "func", name: "sqrt", params: ["x"], defaults: [], body: [], closure: {} } },
    random: { randint: { kind: "func", name: "randint", params: ["a", "b"], defaults: [], body: [], closure: {} } },
    json: { dumps: { kind: "func", name: "dumps", params: ["o"], defaults: [], body: [], closure: {} }, loads: { kind: "func", name: "loads", params: ["s"], defaults: [], body: [], closure: {} } },
    os: { getcwd: { kind: "func", name: "getcwd", params: [], defaults: [], body: [], closure: {} } },
    sys: {},
  };
  const globals: Record<string, PyVal> = { __builtins__: undefined };
  let steps = 0;
  const MAX_STEPS = 20000;
  let halted = false;

  function pyPrint(args: PyVal[], kwargs: Record<string, PyVal>): void {
    const sep = typeof kwargs["sep"] === "string" ? kwargs["sep"] : " ";
    const end = typeof kwargs["end"] === "string" ? kwargs["end"] : "\n";
    outStr += args.map((a) => pyToStr(a)).join(sep) + end;
  }

  function getAttr(obj: PyVal, name: string): PyVal {
    if (typeof obj === "string") {
      const s = obj;
      if (name === "upper") return { kind: "func", name: "upper", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "lower") return { kind: "func", name: "lower", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "strip") return { kind: "func", name: "strip", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "split") return { kind: "func", name: "split", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "join") return { kind: "func", name: "join", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "replace") return { kind: "func", name: "replace", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "find") return { kind: "func", name: "find", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "count") return { kind: "func", name: "count", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "title") return { kind: "func", name: "title", params: [], defaults: [], body: [], closure: {} } as PyFunc;
    }
    if (Array.isArray(obj)) {
      if (name === "append") return { kind: "func", name: "append", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "insert") return { kind: "func", name: "insert", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "pop") return { kind: "func", name: "pop", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "sort") return { kind: "func", name: "sort", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "index") return { kind: "func", name: "index", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "copy") return { kind: "func", name: "copy", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "reverse") return { kind: "func", name: "reverse", params: [], defaults: [], body: [], closure: {} } as PyFunc;
    }
    if (typeof obj === "object" && obj !== null && !Array.isArray(obj) && !("kind" in obj)) {
      if (name === "keys") return { kind: "func", name: "keys", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "values") return { kind: "func", name: "values", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "items") return { kind: "func", name: "items", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "get") return { kind: "func", name: "get", params: [], defaults: [], body: [], closure: {} } as PyFunc;
      if (name === "copy") return { kind: "func", name: "copy", params: [], defaults: [], body: [], closure: {} } as PyFunc;
    }
    if (typeof obj === "object" && obj !== null && name in (obj as Record<string, PyVal>)) {
      return (obj as Record<string, PyVal>)[name];
    }
    return undefined;
  }

  // Resolve an attribute-bound method call: obj.method(args)
  function callBoundMethod(obj: PyVal, name: string, args: PyVal[], kwargs: Record<string, PyVal> = {}): PyVal {
    if (typeof obj === "string") {
      const s = obj;
      switch (name) {
        case "upper": return s.toUpperCase();
        case "lower": return s.toLowerCase();
        case "strip": return s.trim();
        case "title": return s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
        case "split": return args.length > 0 && typeof args[0] === "string" ? s.split(args[0]) : s.split(/\s+/);
        case "join": {
          const arr = args[0];
          return Array.isArray(arr) ? arr.map((x) => pyToStr(x)).join(s) : pyToStr(arr);
        }
        case "replace":
          return typeof args[0] === "string" ? s.split(args[0]).join(pyToStr(args[1])) : s;
        case "find":
          return typeof args[0] === "string" ? s.indexOf(args[0]) : -1;
        case "count":
          return typeof args[0] === "string" ? s.split(args[0]).length - 1 : 0;
      }
    }
    if (Array.isArray(obj)) {
      const arr = obj;
      switch (name) {
        case "append": arr.push(args[0]); return undefined;
        case "insert":
          if (typeof args[0] === "number") arr.splice(Math.max(0, args[0]), 0, args[1]);
          return undefined;
        case "pop":
          if (arr.length === 0) return undefined;
          return typeof args[0] === "number" ? arr.splice(args[0], 1)[0] : arr.pop();
        case "sort": {
          arr.sort((a, b) => (typeof a === "number" && typeof b === "number" ? a - b : pyToStr(a) < pyToStr(b) ? -1 : 1));
          if (args[0] && typeof args[0] === "object" && "reverse" in (args[0] as Record<string, unknown>) && (args[0] as Record<string, unknown>).reverse === true) arr.reverse();
          return undefined;
        }
        case "index": {
          const idx = arr.findIndex((x) => pyEq(x, args[0]));
          return idx >= 0 ? idx : -1;
        }
        case "copy": return [...arr];
        case "reverse": arr.reverse(); return undefined;
      }
    }
    if (typeof obj === "object" && obj !== null && !Array.isArray(obj) && !("kind" in obj)) {
      const d = obj as Record<string, PyVal>;
      switch (name) {
        case "keys": return Object.keys(d).map((k) => (/^[a-zA-Z_]\w*$/.test(k) ? k : pyToStr(d[k]))).map((k) => {
          const key = Object.keys(d).find((kk) => (kk === k) || (String(d[kk]) === k)) ?? k;
          return key;
        });
        case "values": return Object.values(d);
        case "items": return Object.keys(d).map((k) => [k, d[k]]);
        case "get": return args[0] !== undefined && String(args[0]) in d ? d[String(args[0])] : args[1];
        case "copy": return { ...d };
      }
      // stdlib module member call, e.g. math.sqrt(16), json.dumps(x)
      if (name in d) {
        const member = d[name];
        if (member && typeof member === "object" && "kind" in member && member.kind === "func") {
          const fnName = (member as PyFunc).name;
          if (fnName === "sqrt") return typeof args[0] === "number" ? Math.sqrt(args[0]) : 0;
          if (fnName === "randint") {
            const a = typeof args[0] === "number" ? args[0] : 0;
            const b = typeof args[1] === "number" ? args[1] : 0;
            return Math.floor(Math.random() * (b - a + 1)) + a;
          }
          if (fnName === "dumps") return pyJsonDumps(args[0]);
          if (fnName === "loads") {
            try { return JSON.parse(String(args[0] ?? "{}")); } catch { return {}; }
          }
          if (fnName === "getcwd") return "/workspace";
          return callBuiltin(fnName, args, {});
        }
        return member;
      }
    }
    return undefined;
  }

  // Resolve an expression tree (produced by the parser) against a scope.
  function resolveExpr(node: PyVal, scope: Record<string, PyVal>): PyVal {
    if (node === null || node === undefined) return node;
    if (typeof node === "number" || typeof node === "boolean" || typeof node === "string") return node;
    if (Array.isArray(node)) return node.map((n) => resolveExpr(n, scope));
    if (typeof node !== "object") return node;

    if ("__name" in node) {
      const name = (node as { __name: string }).__name;
      return resolveName(name, scope);
    }

    if ("__fstr" in node) {
      const raw = (node as { __fstr: string }).__fstr;
      let result = "";
      let j = 0;
      while (j < raw.length) {
        if (raw[j] === "{" && raw[j + 1] !== "{") {
          let depth = 1;
          let k = j + 1;
          let exprStr = "";
          while (k < raw.length && depth > 0) {
            if (raw[k] === "{") depth++;
            if (raw[k] === "}") depth--;
            if (depth > 0) exprStr += raw[k];
            k++;
          }
          // handle format spec after ":" at top level
          let spec = "";
          let colonIdx = -1;
          let depth2 = 0;
          for (let m = 0; m < exprStr.length; m++) {
            if (exprStr[m] === "{") depth2++;
            else if (exprStr[m] === "}") depth2--;
            else if (exprStr[m] === ":" && depth2 === 0) { colonIdx = m; break; }
          }
          if (colonIdx >= 0) {
            spec = exprStr.slice(colonIdx + 1);
            exprStr = exprStr.slice(0, colonIdx);
          }
          const v = resolveExpr(parseExprSafe(exprStr.trim()), scope);
          let s = pyToStr(v);
          if (spec.startsWith(">")) {
            const width = parseInt(spec.slice(1), 10);
            if (!isNaN(width)) s = s.padStart(width);
          } else if (spec.startsWith(".")) {
            const prec = parseInt(spec.slice(1), 10);
            if (!isNaN(prec) && typeof v === "number") s = v.toFixed(prec);
          }
          result += s;
          j = k;
          continue;
        }
        if (raw[j] === "{" && raw[j + 1] === "{") { result += "{"; j += 2; continue; }
        if (raw[j] === "}" && raw[j + 1] === "}") { result += "}"; j += 2; continue; }
        result += raw[j];
        j++;
      }
      return result;
    }

    if ("__comprehension" in node) {
      const c = node as {
        __comprehension: { expr: PyVal; target: string[]; iterable: PyVal; cond?: PyVal };
      };
      const iter = resolveExpr(c.__comprehension.iterable, scope);
      const items: PyVal[] =
        Array.isArray(iter)
          ? iter
          : typeof iter === "string"
            ? (iter.split("") as unknown as PyVal[])
            : iter && typeof iter === "object" && "kind" in iter && iter.kind === "range"
              ? (rangeValues(iter as RangeObj) as unknown as PyVal[])
              : iter && typeof iter === "object" && !Array.isArray(iter) && !("kind" in iter)
                ? Object.keys(iter)
                : [];
      const result: PyVal[] = [];
      for (const item of items) {
        const s: Record<string, PyVal> = { ...scope };
        const tgt = c.__comprehension.target;
        if (tgt.length === 1) assignName(tgt[0], item, s);
        else if (Array.isArray(item)) tgt.forEach((n, i) => assignName(n, item[i], s));
        if (c.__comprehension.cond) {
          const cv = resolveExpr(c.__comprehension.cond, s);
          if (!pyIsTruthy(cv)) continue;
        }
        result.push(resolveExpr(c.__comprehension.expr, s));
      }
      return result;
    }

    if ("__binop" in node) {
      const b = node as { __binop: { op: string; l: PyVal; r: PyVal } };
      const l = resolveExpr(b.__binop.l, scope);
      const r = resolveExpr(b.__binop.r, scope);
      const op = b.__binop.op;
      if (op === "or") return pyIsTruthy(l) ? l : r;
      if (op === "and") return pyIsTruthy(l) ? r : l;
      if (op === "not") return !pyIsTruthy(l);
      if (op === "in") return pyIn(l, r);
      if (op === "is") return l === r;
      if (["==", "!=", "<", ">", "<=", ">="].includes(op)) return comparePy(l, r, op);
      if (op === "+" || op === "-") return pyAdd(l, r, op);
      if (op === "**") {
        const x = typeof l === "number" ? l : 0;
        const y = typeof r === "number" ? r : 0;
        return Math.pow(x, y);
      }
      return pyMul(l, r, op);
    }

    if ("__call" in node) {
      const callNode = node as { __call: PyVal; args: PyVal[]; kwargs: Record<string, PyVal> };
      const callee = callNode.__call;
      const args = callNode.args.map((a) => resolveExpr(a, scope));
      const kwargs: Record<string, PyVal> = {};
      if (callNode.kwargs) {
        for (const k of Object.keys(callNode.kwargs)) {
          kwargs[k] = resolveExpr(callNode.kwargs[k], scope);
        }
      }
      // obj.method(args): bind the receiver object
      if (callee && typeof callee === "object" && "__attr" in callee) {
        const attrNode = callee as { __attr: PyVal; name: string };
        const base = resolveExpr(attrNode.__attr, scope);
        return callBoundMethod(base, attrNode.name, args, kwargs);
      }
      const calleeVal = resolveExpr(callee, scope);
      return callPy(calleeVal, args, scope, kwargs);
    }
    if ("__index" in node) {
      const idxNode = node as { __index: PyVal; idx: PyVal };
      const base = resolveExpr(idxNode.__index, scope);
      const idx = resolveExpr(idxNode.idx, scope);
      return indexPy(base, idx);
    }
    if ("__slice" in node) {
      const slcNode = node as { __slice: PyVal; start: PyVal; stop: PyVal };
      const base = resolveExpr(slcNode.__slice, scope);
      const start = resolveExpr(slcNode.start, scope);
      const stop = resolveExpr(slcNode.stop, scope);
      return slicePy(base, start, stop);
    }
    if ("__attr" in node) {
      const attrNode = node as { __attr: PyVal; name: string };
      const base = resolveExpr(attrNode.__attr, scope);
      return getAttr(base, attrNode.name);
    }
    return node;
  }

  function indexPy(base: PyVal, idx: PyVal): PyVal {
    if (Array.isArray(base)) {
      const i = typeof idx === "number" ? idx : 0;
      return base[i < 0 ? base.length + i : i];
    }
    if (typeof base === "string") {
      const i = typeof idx === "number" ? idx : 0;
      return base[i < 0 ? base.length + i : i];
    }
    if (typeof base === "object" && base !== null && !Array.isArray(base) && !("kind" in base)) {
      return (base as Record<string, PyVal>)[String(idx)];
    }
    return undefined;
  }

  function slicePy(base: PyVal, start: PyVal, stop: PyVal): PyVal {
    const s = typeof start === "number" ? start : undefined;
    const e = typeof stop === "number" ? stop : undefined;
    if (Array.isArray(base)) return base.slice(s, e);
    if (typeof base === "string") return base.slice(s, e);
    return undefined;
  }

  function parseExprSafe(expr: string): PyVal {
    try {
      const parser = new PyExprParser(pyTokenize(expr));
      return parser.parseAll();
    } catch {
      return undefined;
    }
  }

  function callPy(callee: PyVal, args: PyVal[], callSiteScope: Record<string, PyVal>, kwargs: Record<string, PyVal> = {}): PyVal {
    if (typeof callee === "string") {
      // Builtin function by name
      return callBuiltin(callee, args, callSiteScope, kwargs);
    }
    if (callee && typeof callee === "object" && "kind" in callee) {
      if (callee.kind === "func") {
        return callUserFunc(callee as PyFunc, args, kwargs);
      }
    }
    return undefined;
  }

  function callBuiltin(name: string, args: PyVal[], scope: Record<string, PyVal>, kwargs: Record<string, PyVal> = {}): PyVal {
    switch (name) {
      case "print":
        pyPrint(args, kwargs);
        return undefined;
      case "len":
        if (Array.isArray(args[0])) return args[0].length;
        if (typeof args[0] === "string") return args[0].length;
        if (typeof args[0] === "object" && args[0] !== null && !Array.isArray(args[0]) && !("kind" in args[0])) return Object.keys(args[0]).length;
        return 0;
      case "sum":
        return Array.isArray(args[0]) ? args[0].reduce<number>((acc, x) => acc + (typeof x === "number" ? x : 0), 0) : 0;
      case "min":
        if (Array.isArray(args[0])) return args[0].reduce((a, b) => (typeof a === "number" && typeof b === "number" && b < a ? b : a), args[0][0]);
        return args.length === 1 ? args[0] : args[0];
      case "max":
        if (Array.isArray(args[0])) return args[0].reduce((a, b) => (typeof a === "number" && typeof b === "number" && b > a ? b : a), args[0][0]);
        return args[0];
      case "abs":
        return typeof args[0] === "number" ? Math.abs(args[0]) : 0;
      case "range":
        if (args.length === 1) return makeRange(0, typeof args[0] === "number" ? args[0] : 0, 1);
        if (args.length === 2) return makeRange(typeof args[0] === "number" ? args[0] : 0, typeof args[1] === "number" ? args[1] : 0, 1);
        return makeRange(typeof args[0] === "number" ? args[0] : 0, typeof args[1] === "number" ? args[1] : 0, typeof args[2] === "number" ? args[2] : 1);
      case "list":
        if (args.length === 0) return [];
        if (typeof args[0] === "object" && args[0] !== null && "kind" in args[0] && args[0].kind === "range") return rangeValues(args[0] as RangeObj);
        if (Array.isArray(args[0])) return [...args[0]];
        if (typeof args[0] === "string") return args[0].split("");
        if (typeof args[0] === "object" && args[0] !== null && !Array.isArray(args[0])) return Object.keys(args[0]);
        return [];
      case "str":
        return args.length === 0 ? "" : pyToStr(args[0]);
      case "int":
        if (args.length === 0) return 0;
        if (typeof args[0] === "number") return Math.trunc(args[0]);
        if (typeof args[0] === "string") {
          const n = Number(args[0]);
          return isNaN(n) ? 0 : Math.trunc(n);
        }
        return 0;
      case "float":
        if (args.length === 0) return 0;
        if (typeof args[0] === "number") return args[0];
        if (typeof args[0] === "string") {
          const n = Number(args[0]);
          return isNaN(n) ? 0 : n;
        }
        return 0;
      case "bool":
        return pyIsTruthy(args[0]);
      case "print_input":
        return undefined;
      case "input":
        return "";
      case "sorted":
        if (Array.isArray(args[0])) {
          const arr = [...args[0]];
          arr.sort((a, b) => (typeof a === "number" && typeof b === "number" ? a - b : pyToStr(a) < pyToStr(b) ? -1 : 1));
          if (kwargs && kwargs["reverse"] === true) arr.reverse();
          return arr;
        }
        return args[0];
      case "enumerate":
        return Array.isArray(args[0]) ? args[0].map((x, i) => [i, x]) : [];
      case "zip":
        return Array.isArray(args[0]) ? args[0].map((x, i) => [x, args[1] ? indexPy(args[1], i) : undefined]) : [];
      case "isinstance":
        return true;
      case "reversed":
        return Array.isArray(args[0]) ? [...args[0]].reverse() : [];
      case "round":
        return typeof args[0] === "number" ? Math.round(args[0]) : 0;
      case "type":
        return typeof args[0] === "number" ? "int" : typeof args[0] === "string" ? "str" : typeof args[0] === "boolean" ? "bool" : Array.isArray(args[0]) ? "list" : "dict";
      default:
        // stdlib functions dispatched from module attrs get here as strings
        return undefined;
    }
  }

  function callUserFunc(fn: PyFunc, args: PyVal[], kwargs: Record<string, PyVal> = {}): PyVal {
    const localScope: Record<string, PyVal> = { ...fn.closure };
    fn.params.forEach((p, i) => {
      if (kwargs && p in kwargs) localScope[p] = kwargs[p];
      else if (i < args.length) localScope[p] = args[i];
      else if (fn.defaults && fn.defaults.length > 0) localScope[p] = fn.defaults[Math.max(0, fn.defaults.length - (fn.params.length - i))];
      else localScope[p] = undefined;
    });
    const result = execLines(fn.body, localScope);
    if (result && "flow" in result && result.flow === "return") return result.value;
    return undefined;
  }

  function resolveName(name: string, scope: Record<string, PyVal>): PyVal {
    if (name in scope) return scope[name];
    if (name in globals) return globals[name];
    if (name === "True") return true;
    if (name === "False") return false;
    if (name === "None") return null;
    // Builtin function name (print, len, range, ...) — returned as a string so
    // callPy dispatches through callBuiltin.
    return name;
  }

  function assignName(name: string, value: PyVal, scope: Record<string, PyVal>): void {
    scope[name] = value;
  }

  function execLines(lines: PyLine[], scope: Record<string, PyVal>): PyControl | undefined {
    let i = 0;
    while (i < lines.length && steps++ < MAX_STEPS && !halted) {
      const line = lines[i];
      const text = line.text;

      // Comment or pass
      if (text.startsWith("#")) { i++; continue; }
      if (text === "pass") { i++; continue; }
      if (text === "break") return { flow: "break" };
      if (text === "continue") return { flow: "continue" };

      // return
      const retMatch = text.match(/^return\s*(.*)$/);
      if (retMatch) {
        const expr = retMatch[1].trim();
        if (expr === "") return { flow: "return", value: undefined };
        return { flow: "return", value: resolveExpr(parseExprSafe(expr), scope) };
      }

      // import
      const importMatch = text.match(/^import\s+([a-zA-Z_]\w*)(?:\s+as\s+([a-zA-Z_]\w*))?/);
      if (importMatch) {
        const mod = importMatch[1];
        const alias = importMatch[2] || mod;
        if (mod in stdlib) globals[alias] = stdlib[mod];
        else globals[alias] = {};
        i++;
        continue;
      }
      const fromImport = text.match(/^from\s+([a-zA-Z_]\w*)\s+import\s+(.+)$/);
      if (fromImport) {
        const mod = fromImport[1];
        const names = fromImport[2].split(",").map((n) => n.trim());
        const modObj = stdlib[mod] as Record<string, PyVal> | undefined;
        for (const n of names) {
          const nm = n.split(" as ")[0].trim();
          const alias = n.split(" as ")[1]?.trim() || nm;
          if (modObj && nm in modObj) globals[alias] = modObj[nm];
          else globals[alias] = { kind: "func", name: nm, params: [], defaults: [], body: [], closure: {} } as PyFunc;
        }
        i++;
        continue;
      }

      // def
      const defMatch = text.match(/^def\s+([a-zA-Z_]\w*)\s*\((.*?)\)\s*:\s*$/);
      if (defMatch) {
        const name = defMatch[1];
        const paramsRaw = defMatch[2].trim();
        const params: string[] = [];
        const defaults: PyVal[] = [];
        if (paramsRaw) {
          for (const part of paramsRaw.split(",")) {
            const p = part.trim();
            if (!p) continue;
            if (p.includes("=")) {
              const [pn, dv] = p.split("=");
              params.push(pn.trim());
              defaults.push(resolveExpr(parseExprSafe(dv.trim()), scope));
            } else {
              params.push(p);
            }
          }
        }
        const bodyStart = i + 1;
        let bodyEnd = bodyStart;
        while (bodyEnd < lines.length && lines[bodyEnd].indent > line.indent) bodyEnd++;
        const body = lines.slice(bodyStart, bodyEnd);
        globals[name] = { kind: "func", name, params, defaults, body, closure: { ...scope, ...globals } } as PyFunc;
        i = bodyEnd;
        continue;
      }

      // class (best effort: store methods as functions taking self)
      const classMatch = text.match(/^class\s+([a-zA-Z_]\w*)/);
      if (classMatch) {
        const bodyStart = i + 1;
        let bodyEnd = bodyStart;
        while (bodyEnd < lines.length && lines[bodyEnd].indent > line.indent) bodyEnd++;
        const classBody = lines.slice(bodyStart, bodyEnd);
        const clsObj: Record<string, PyVal> = {};
        for (const cl of classBody) {
          const m = cl.text.match(/^def\s+([a-zA-Z_]\w*)\s*\((.*?)\)\s*:\s*$/);
          if (m) {
            const mBodyStart = classBody.indexOf(cl) + 1;
            let mBodyEnd = mBodyStart;
            while (mBodyEnd < classBody.length && classBody[mBodyEnd].indent > cl.indent) mBodyEnd++;
            clsObj[m[1]] = { kind: "func", name: m[1], params: m[2].trim() ? m[2].split(",").map((p) => p.trim()) : [], defaults: [], body: classBody.slice(mBodyStart, mBodyEnd), closure: {} } as PyFunc;
          }
        }
        globals[classMatch[1]] = clsObj as unknown as PyVal;
        i = bodyEnd;
        continue;
      }

      // if / elif / else — gather the whole chain, then run the first true branch
      const ifMatch = text.match(/^if\s+(.+?)\s*:\s*$/);
      const elifMatch = text.match(/^elif\s+(.+?)\s*:\s*$/);
      const elseMatch = text.match(/^else\s*:\s*$/);
      if (ifMatch || elifMatch || elseMatch) {
        const chain: { cond: PyVal | null; bodyStart: number; bodyEnd: number }[] = [];
        const firstCond = ifMatch
          ? resolveExpr(parseExprSafe(ifMatch[1]), scope)
          : elifMatch
            ? resolveExpr(parseExprSafe(elifMatch[1]), scope)
            : null;
        let bs = i + 1;
        let be = bs;
        while (be < lines.length && lines[be].indent > line.indent) be++;
        chain.push({ cond: ifMatch || elifMatch ? firstCond : null, bodyStart: bs, bodyEnd: be });
        let nxt = be;
        while (nxt < lines.length && lines[nxt].indent === line.indent) {
          const t = lines[nxt].text;
          const mE = t.match(/^elif\s+(.+?)\s*:\s*$/);
          const mS = t.match(/^else\s*:\s*$/);
          if (!mE && !mS) break;
          let bs2 = nxt + 1;
          let be2 = bs2;
          while (be2 < lines.length && lines[be2].indent > line.indent) be2++;
          chain.push({ cond: mE ? resolveExpr(parseExprSafe(mE[1]), scope) : null, bodyStart: bs2, bodyEnd: be2 });
          nxt = be2;
        }
        for (const c of chain) {
          if (c.cond === null || pyIsTruthy(c.cond)) {
            const r = execLines(lines.slice(c.bodyStart, c.bodyEnd), scope);
            if (r) return r;
            break;
          }
        }
        i = chain[chain.length - 1].bodyEnd;
        continue;
      }

      // while
      const whileMatch = text.match(/^while\s+(.+?)\s*:\s*$/);
      if (whileMatch) {
        const bodyStart = i + 1;
        let bodyEnd = bodyStart;
        while (bodyEnd < lines.length && lines[bodyEnd].indent > line.indent) bodyEnd++;
        const body = lines.slice(bodyStart, bodyEnd);
        let iterations = 0;
        while (iterations++ < 2000 && !halted && pyIsTruthy(resolveExpr(parseExprSafe(whileMatch[1]), scope))) {
          const r = execLines(body, scope);
          if (r && "flow" in r) {
            if (r.flow === "break") break;
            if (r.flow === "return") return r;
            if (r.flow === "continue") continue;
          }
        }
        i = bodyEnd;
        continue;
      }

      // for
      const forMatch = text.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:\s*$/);
      if (forMatch) {
        const targetRaw = forMatch[1].trim();
        const iterExpr = forMatch[2].trim();
        const iterVal = resolveExpr(parseExprSafe(iterExpr), scope);
        const bodyStart = i + 1;
        let bodyEnd = bodyStart;
        while (bodyEnd < lines.length && lines[bodyEnd].indent > line.indent) bodyEnd++;
        const body = lines.slice(bodyStart, bodyEnd);

        let items: PyVal[];
        if (iterVal && typeof iterVal === "object" && "kind" in iterVal && iterVal.kind === "range") {
          items = rangeValues(iterVal as RangeObj).map((n) => n as PyVal);
        } else if (Array.isArray(iterVal)) {
          items = iterVal;
        } else if (typeof iterVal === "string") {
          items = iterVal.split("");
        } else if (iterVal && typeof iterVal === "object" && !Array.isArray(iterVal) && !("kind" in iterVal)) {
          items = Object.keys(iterVal as Record<string, PyVal>);
        } else {
          items = [];
        }

        for (const item of items) {
          if (steps++ > MAX_STEPS || halted) break;
          if (targetRaw.includes(",")) {
            const targets = targetRaw.split(",").map((t) => t.trim());
            if (Array.isArray(item)) {
              targets.forEach((t, ti) => { if (ti < item.length) assignName(t, item[ti], scope); });
            } else {
              targets.forEach((t, ti) => { if (ti === 0) assignName(t, item, scope); });
            }
          } else {
            assignName(targetRaw, item, scope);
          }
          const r = execLines(body, scope);
          if (r && "flow" in r) {
            if (r.flow === "break") break;
            if (r.flow === "return") return r;
            if (r.flow === "continue") continue;
          }
        }
        i = bodyEnd;
        continue;
      }

      // try / except / finally
      if (text === "try:") {
        const bodyStart = i + 1;
        let bodyEnd = bodyStart;
        while (bodyEnd < lines.length && lines[bodyEnd].indent > line.indent) bodyEnd++;
        const r = execLines(lines.slice(bodyStart, bodyEnd), scope);
        // find except/finally handlers
        let j = bodyEnd;
        let handled = !(r && "flow" in r);
        while (j < lines.length) {
          const nxt = lines[j];
          if (nxt.indent !== line.indent) break;
          if (/^except/.test(nxt.text)) {
            const ebs = j + 1;
            let ebe = ebs;
            while (ebe < lines.length && lines[ebe].indent > nxt.indent) ebe++;
            // best effort: run except body if an error occurred (we don't model real exceptions)
            if (!handled) {
              const r2 = execLines(lines.slice(ebs, ebe), scope);
              if (r2) return r2;
              handled = true;
            }
            j = ebe;
            continue;
          }
          if (/^finally\s*:/.test(nxt.text)) {
            const fbs = j + 1;
            let fbe = fbs;
            while (fbe < lines.length && lines[fbe].indent > nxt.indent) fbe++;
            const r3 = execLines(lines.slice(fbs, fbe), scope);
            if (r3) return r3;
            j = fbe;
            continue;
          }
          break;
        }
        if (r && "flow" in r && r.flow === "return") return r;
        i = j;
        continue;
      }

      // Assignment or expression statement
      const assignMatch = text.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
      const multiAssign = text.match(/^([a-zA-Z_]\w*(?:\s*,\s*[a-zA-Z_]\w*)+)\s*=\s*(.+)$/);
      const attrAssign = text.match(/^([a-zA-Z_]\w*)\[([^\]]+)\]\s*=\s*(.+)$/);
      const fieldAssign = text.match(/^([a-zA-Z_]\w*)\.(\w+)\s*=\s*(.+)$/);
      const compoundAssign = text.match(/^([a-zA-Z_]\w*)\s*(\+=|-=|\*=|\/=|\/\/=|%=)\s*(.+)$/);

      if (multiAssign && multiAssign[1].split(",").length > 1) {
        const names = multiAssign[1].split(",").map((n) => n.trim());
        const val = resolveExpr(parseExprSafe(multiAssign[2]), scope);
        if (Array.isArray(val)) {
          names.forEach((n, idx) => assignName(n, val[idx], scope));
        } else {
          names.forEach((n) => assignName(n, val, scope));
        }
        i++;
        continue;
      }

      if (compoundAssign && (compoundAssign[1] in scope || compoundAssign[1] in globals)) {
        const cur = resolveName(compoundAssign[1], scope);
        const rhs = resolveExpr(parseExprSafe(compoundAssign[3]), scope);
        let nv: PyVal = rhs;
        if (typeof cur === "number" && typeof rhs === "number") {
          if (compoundAssign[2] === "+=") nv = cur + rhs;
          else if (compoundAssign[2] === "-=") nv = cur - rhs;
          else if (compoundAssign[2] === "*=") nv = cur * rhs;
          else if (compoundAssign[2] === "/=") nv = rhs !== 0 ? cur / rhs : "DivisionByZero";
          else if (compoundAssign[2] === "//=") nv = rhs !== 0 ? Math.floor(cur / rhs) : "DivisionByZero";
          else if (compoundAssign[2] === "%=") nv = rhs !== 0 ? cur % rhs : "DivisionByZero";
        }
        assignName(compoundAssign[1], nv, scope);
        i++;
        continue;
      }

      if (attrAssign) {
        const base = resolveName(attrAssign[1], scope);
        const idx = resolveExpr(parseExprSafe(attrAssign[2]), scope);
        const val = resolveExpr(parseExprSafe(attrAssign[3]), scope);
        if (Array.isArray(base) && typeof idx === "number") base[idx < 0 ? base.length + idx : idx] = val;
        else if (base && typeof base === "object" && !Array.isArray(base) && !("kind" in base)) {
          (base as Record<string, PyVal>)[String(idx)] = val;
        }
        i++;
        continue;
      }

      if (assignMatch) {
        const val = resolveExpr(parseExprSafe(assignMatch[2]), scope);
        assignName(assignMatch[1], val, scope);
        i++;
        continue;
      }

      if (/^[a-zA-Z_]\w*\[/.test(text) && text.includes("=")) {
        const am = text.match(/^([a-zA-Z_]\w*)\[([^\]]+)\]\s*=\s*(.+)$/);
        if (am) {
          const base = resolveName(am[1], scope);
          const idx = resolveExpr(parseExprSafe(am[2]), scope);
          const val = resolveExpr(parseExprSafe(am[3]), scope);
          if (Array.isArray(base) && typeof idx === "number") base[idx < 0 ? base.length + idx : idx] = val;
          else if (base && typeof base === "object" && !Array.isArray(base) && !("kind" in base)) {
            (base as Record<string, PyVal>)[String(idx)] = val;
          }
        }
        i++;
        continue;
      }

      // Expression statement (call)
      const callStmt = text.match(/^(.+)$/);
      if (callStmt) {
        resolveExpr(parseExprSafe(callStmt[1]), scope);
        i++;
        continue;
      }

      i++;
    }
    return undefined;
  }

  execLines(pyLines, globals);

  out.push(...outStr.split("\n").filter((l, idx, arr) => !(idx === arr.length - 1 && l === "")));
  if (out.length === 0) {
    out.push("// Program finished (no output).");
  }
  return out.map((l) => (l.endsWith("\n") ? l.slice(0, -1) : l));
}

export function simulateAnsi(code: string, language: string): string {
  const output: string[] = [];
  const label =
    language === "c"
      ? "Simulated C (C11)"
      : language === "python"
      ? "Simulated Python (subset)"
      : language === "cpp"
      ? "Simulated C++ (not available)"
      : "Simulated NASM x86-64";
  output.push(`// ASTA Runner v2.0 — ${label}`);
  output.push(`// ─────────────────────────────────────────────`);
  output.push("");

  if (language === "cpp") {
    output.push(
      "// There is no in-browser simulator for C++ yet.",
      "// Connect the Piston backend (PISTON_AUTH_TOKEN) for real compilation,",
      "// or use the C or Assembly playgrounds which run in the browser.",
      "// Your code was not executed."
    );
  } else {
    const body =
      language === "c" ? simulateC(code)
      : language === "python" ? simulatePython(code)
      : simulateAsm(code);
    output.push(...body);
  }

  output.push("");
  output.push(`// Process finished — exit code 0`);
  return output.join("\n");
}
