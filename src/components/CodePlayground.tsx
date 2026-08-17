"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { Play, RotateCcw, Copy, Check, Terminal, Cpu } from "lucide-react";
import CyberPanel from "./CyberPanel";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/types";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-mono text-sm text-gray-500">
      Loading editor...
    </div>
  ),
});

function EditorFallback() {
  return (
    <div className="flex h-full items-center justify-center font-mono text-sm text-gray-500">
      Loading editor...
    </div>
  );
}

async function runWhenIdle(cb: () => void) {
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(cb, { timeout: 2000 });
  } else {
    setTimeout(cb, 1000);
  }
}

interface CodePlaygroundProps {
  defaultCode: string;
  language: Language;
  expectedOutput?: string;
  readOnly?: boolean;
  height?: string;
  onRun?: (code: string) => void;
  /** Called after each run with the raw terminal output (for auto-verification). */
  onRunOutput?: (output: string) => void;
  /** Called whenever the editor contents change (for the AI coach context). */
  onCodeChange?: (code: string) => void;
}

async function executeCode(code: string, language: Language) {
  const res = await fetch("/api/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Execution failed" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export default function CodePlayground({
  defaultCode,
  language,
  expectedOutput,
  readOnly = false,
  height = "320px",
  onRun,
  onRunOutput,
  onCodeChange,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [executionMode, setExecutionMode] = useState<"idle" | "real" | "simulated" | "error">("idle");

  useEffect(() => {
    let disposed = false;
    const start = () => runWhenIdle(() => !disposed && setEditorReady(true));
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }
    return () => {
      disposed = true;
      window.removeEventListener("load", start);
    };
  }, []);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setOutput("");
    setExecutionMode("idle");

    try {
      const result = await executeCode(code, language);
      setOutput(result.output);
      setExecutionMode(result.real ? "real" : "simulated");
      if (result.error && !result.real) {
        console.warn(result.error);
      }
      onRunOutput?.(result.output ?? "");
    } catch (err) {
      setOutput(`// Execution error:\n// ${err instanceof Error ? err.message : "Unknown error"}`);
      setExecutionMode("error");
      onRunOutput?.("");
    }

    setRunning(false);
    onRun?.(code);
  }, [code, language, onRun, onRunOutput]);

  const handleReset = () => {
    setCode(defaultCode);
    setOutput("");
    setExecutionMode("idle");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const monacoLang =
    language === "c"
      ? "c"
      : language === "asm"
      ? "plaintext"
      : language === "python"
      ? "python"
      : language === "cpp"
      ? "cpp"
      : language === "js"
      ? "javascript"
      : language === "rust"
      ? "rust"
      : language === "sql"
      ? "sql"
      : "shell";

  const modeColor = {
    idle: "text-gray-500",
    real: "text-cyber-cyan",
    simulated: "text-gray-300",
    error: "text-cyber-red",
  }[executionMode];

  const modeLabel = {
    idle: "Ready",
    real: "Live Execution",
    simulated: "Simulated",
    error: "Error",
  }[executionMode];

  return (
    <CyberPanel title="Code Playground" icon={<Terminal className="h-4 w-4" />}>
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className={cn(
              "rounded px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider",
              language === "c"
                ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                : "bg-white/5 text-gray-300 border border-white/10"
            )}>
              {language === "c"
                ? "C11"
                : language === "asm"
                ? "x86-64 NASM"
                : language === "python"
                ? "Python 3"
                : language === "cpp"
                ? "C++20"
                : language === "js"
                ? "JavaScript"
                : language === "rust"
                ? "Rust 2021"
                : language === "sql"
                ? "SQLite"
                : "Bash"}
            </span>
            {executionMode !== "idle" && (
              <span className={cn("flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-mono border", modeColor)}>
                {executionMode === "real" && <Cpu className="h-3 w-3" />}
                {modeLabel}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="rounded-lg p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="h-4 w-4 text-cyber-cyan" /> : <Copy className="h-4 w-4" />}
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
              className="flex items-center gap-2 rounded-lg bg-cyber-cyan px-4 py-2 text-sm font-mono text-cyber-dark font-semibold hover:bg-cyber-cyan/90 transition-colors disabled:opacity-50"
            >
              <Play className={cn("h-4 w-4", running && "animate-pulse")} />
              {running ? "Running..." : "Run"}
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-white/5 overflow-hidden" style={{ height }}>
          {editorReady ? (
            <MonacoEditor
              language={monacoLang}
              value={code}
              onChange={(v) => {
                if (readOnly) return;
                const next = v ?? "";
                setCode(next);
                onCodeChange?.(next);
              }}
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
          ) : (
            <EditorFallback />
          )}
        </div>

        <div className="rounded-lg border border-white/5 bg-black/40 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Terminal className="h-3 w-3 text-cyber-cyan" />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
              Output
            </span>
            {expectedOutput && output && (
              <span className={cn(
                "text-[10px] font-mono ml-auto",
                output.includes(expectedOutput) ? "text-cyber-cyan" : "text-cyber-red"
              )}>
                {output.includes(expectedOutput) ? "✓ Expected output matched" : "✗ Output mismatch"}
              </span>
            )}
          </div>
          <pre className="font-mono text-sm text-gray-200 whitespace-pre-wrap min-h-[40px]">
            {output || "// Click Run to execute"}
          </pre>
        </div>
      </div>
    </CyberPanel>
  );
}
