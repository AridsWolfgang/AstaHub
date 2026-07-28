"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { Play, RotateCcw, Copy, Check, Terminal } from "lucide-react";
import CyberPanel from "./CyberPanel";
import { cn } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-mono text-sm text-gray-500">
      Loading editor...
    </div>
  ),
});

interface CodePlaygroundProps {
  defaultCode: string;
  language: "c" | "asm";
  expectedOutput?: string;
  readOnly?: boolean;
  height?: string;
  onRun?: (code: string) => void;
}

function simulateExecution(code: string, language: "c" | "asm"): string {
  const output: string[] = [];
  output.push(`// ASTA Code Runner v1.0`);
  output.push(`// Language: ${language === "c" ? "C (C11)" : "x86-64 NASM"}`);
  output.push(`// ─────────────────────────────`);
  output.push(``);

  if (language === "c") {
    const printfMatches = code.match(/printf\s*\(\s*"([^"\\]|\\.)*"/g);
    if (printfMatches) {
      for (const match of printfMatches) {
        const strMatch = match.match(/"((?:[^"\\]|\\.)*)"/);
        if (strMatch) {
          let formatted = strMatch[1]
            .replace(/\\n/g, "\n")
            .replace(/\\t/g, "\t")
            .replace(/\\"/g, '"');
          const varMatch = formatted.match(/%[dfsc]/g);
          if (varMatch) {
            formatted = formatted.replace(/%[dfsc]/g, () => {
              const numMatch = code.match(/=\s*(\d+)/);
              return numMatch ? numMatch[1] : "?";
            });
          }
          output.push(formatted);
        }
      }
    }

    if (code.includes("sizeof")) {
      const types: Record<string, number> = {
        int: 4, char: 1, float: 4, double: 8, long: 8, "long long": 8,
      };
      for (const [type, size] of Object.entries(types)) {
        if (code.includes(type)) {
          output.push(`${type}: ${size} bytes`);
        }
      }
    }

    if (output.length <= 4) {
      output.push(`// Program compiled successfully.`);
      output.push(`// Return value: 0 (success)`);
      output.push(`//`);
      output.push(`// Note: Full C compilation requires a backend compiler.`);
      output.push(`// This sandbox simulates output for learning purposes.`);
    }
  } else {
    output.push(`; NASM Assembly — simulated execution`);
    if (code.includes("mov rax, 1") || code.includes("sys_write")) {
      const msgMatch = code.match(/db\s+'([^']+)'/);
      if (msgMatch) output.push(msgMatch[1]);
    }
    if (code.includes("mov rax,")) {
      const movMatch = code.match(/mov\s+r(a|b|c|d|i|x),\s*(\d+)/g);
      if (movMatch) {
        for (const m of movMatch) {
          const parts = m.match(/mov\s+(r\w+),\s*(\d+)/);
          if (parts) output.push(`; ${parts[1]} = ${parts[2]}`);
        }
      }
    }
    output.push(`; Program halted. Exit code: 0`);
  }

  output.push(``);
  output.push(`// Process finished — exit code 0`);
  return output.join("\n");
}

export default function CodePlayground({
  defaultCode,
  language,
  expectedOutput,
  readOnly = false,
  height = "320px",
  onRun,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setOutput("");
    await new Promise((r) => setTimeout(r, 600));
    const result = simulateExecution(code, language);
    setOutput(result);
    setRunning(false);
    onRun?.(code);
  }, [code, language, onRun]);

  const handleReset = () => {
    setCode(defaultCode);
    setOutput("");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const monacoLang = language === "c" ? "c" : "plaintext";

  return (
    <CyberPanel glow="green" title="Code Playground" icon={<Terminal className="h-4 w-4" />}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={cn(
              "rounded px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider",
              language === "c"
                ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                : "bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20"
            )}>
              {language === "c" ? "C11" : "x86-64 NASM"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="rounded-lg p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="h-4 w-4 text-matrix-500" /> : <Copy className="h-4 w-4" />}
            </button>
            <button
              onClick={handleReset}
              className="rounded-lg p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Reset code"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-2 rounded-lg bg-matrix-500/20 border border-matrix-500/30 px-4 py-2 text-sm font-mono text-matrix-500 hover:bg-matrix-500/30 transition-all disabled:opacity-50"
            >
              <Play className="h-4 w-4" />
              {running ? "Running..." : "Run"}
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-white/5 overflow-hidden" style={{ height }}>
          <MonacoEditor
            language={monacoLang}
            value={code}
            onChange={(v) => !readOnly && setCode(v ?? "")}
            theme="vs-dark"
            options={{
              readOnly,
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "JetBrains Mono, Fira Code, Consolas, monospace",
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              padding: { top: 12 },
              renderLineHighlight: "line",
              cursorBlinking: "smooth",
              smoothScrolling: true,
              tabSize: 4,
            }}
          />
        </div>

        {(output || expectedOutput) && (
          <div className="rounded-lg border border-white/5 bg-black/40 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Terminal className="h-3 w-3 text-matrix-500" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                Output
              </span>
            </div>
            <pre className="font-mono text-sm text-matrix-500 whitespace-pre-wrap">
              {output || "// Click Run to execute"}
            </pre>
          </div>
        )}
      </div>
    </CyberPanel>
  );
}
