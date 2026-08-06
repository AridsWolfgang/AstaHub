"use client";

import { useState } from "react";
import CodePlayground from "@/components/CodePlayground";
import CyberPanel from "@/components/CyberPanel";
import { cn } from "@/lib/utils";

const TEMPLATES = {
  c: {
    hello: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
    pointers: `#include <stdio.h>\n\nint main(void) {\n    int x = 42;\n    int *p = &x;\n    printf("x = %d, *p = %d\\n", x, *p);\n    printf("Address: %p\\n", (void*)p);\n    return 0;\n}`,
    malloc: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = malloc(5 * sizeof(int));\n    if (!arr) return 1;\n    for (int i = 0; i < 5; i++) arr[i] = i * 10;\n    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    free(arr);\n    return 0;\n}`,
    struct: `#include <stdio.h>\n\ntypedef struct {\n    char name[32];\n    int id;\n    float gpa;\n} Student;\n\nint main(void) {\n    Student s = {"Alice", 1001, 3.85f};\n    printf("%s (ID: %d) GPA: %.2f\\n", s.name, s.id, s.gpa);\n    return 0;\n}`,
  },
  asm: {
    hello: `section .data\n    msg db 'Hello, Assembly!', 0xA\n    len equ $ - msg\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 1      ; sys_write\n    mov rdi, 1      ; stdout\n    mov rsi, msg\n    mov rdx, len\n    syscall\n    mov rax, 60     ; sys_exit\n    xor rdi, rdi\n    syscall`,
    registers: `section .text\nglobal _start\n\n_start:\n    mov rax, 10\n    mov rbx, 20\n    add rax, rbx    ; rax = 30\n    sub rax, 5      ; rax = 25\n    imul rax, 2     ; rax = 50\n    ; Inspect register values`,
    stack: `section .text\nglobal _start\n\n_start:\n    push 42\n    push 100\n    pop rax         ; rax = 100\n    pop rbx         ; rbx = 42\n    ; Stack grows downward\n    nop`,
    bitwise: `section .text\nglobal _start\n\n_start:\n    mov rax, 0b1100\n    mov rbx, 0b1010\n    and rax, rbx    ; 1000 = 8\n    mov rcx, rax\n    or  rcx, rbx    ; 1110 = 14\n    xor rcx, rbx    ; 0100 = 4\n    nop`,
  },
};

export default function PlaygroundPage() {
  const [lang, setLang] = useState<"c" | "asm">("c");
  const [template, setTemplate] = useState("hello");
  const [code, setCode] = useState(TEMPLATES.c.hello);

  const templates = TEMPLATES[lang];
  const templateKeys = Object.keys(templates) as (keyof typeof templates)[];

  const handleLangChange = (newLang: "c" | "asm") => {
    setLang(newLang);
    setTemplate("hello");
    setCode(TEMPLATES[newLang].hello);
  };

  const handleTemplateChange = (key: string) => {
    setTemplate(key);
    setCode(templates[key as keyof typeof templates]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Playground
        </h1>
        <p className="text-sm text-gray-500 font-mono">
          A free workbench for C and x86-64 Assembly — outside the curriculum
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {(["c", "asm"] as const).map((l) => (
          <button
            key={l}
            onClick={() => handleLangChange(l)}
            className={cn(
              "rounded-lg px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all",
              lang === l
                ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                : "text-gray-500 hover:text-white border border-transparent"
            )}
          >
            {l === "c" ? "C Language" : "x86-64 Assembly"}
          </button>
        ))}

        <div className="h-4 w-px bg-cyber-border mx-2" />

        {templateKeys.map((key) => (
          <button
            key={key}
            onClick={() => handleTemplateChange(key)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-mono capitalize transition-all",
              template === key
                ? "bg-white/5 text-white border border-white/10"
                : "text-gray-500 hover:text-white"
            )}
          >
            {key}
          </button>
        ))}
      </div>

      <CodePlayground
        defaultCode={code}
        language={lang}
        height="500px"
      />

      <CyberPanel title="Quick Reference" className="mt-6">
        <div className="grid gap-4 md:grid-cols-2 text-xs font-mono">
          {lang === "c" ? (
            <>
              <div>
                <p className="text-cyber-cyan mb-2">Essential Headers</p>
                <pre className="text-gray-400">{`<stdio.h>  — I/O (printf, scanf)
<stdlib.h> — Memory (malloc, free)
<string.h> — Strings (strlen, strcpy)
<stdint.h> — Fixed-width types`}</pre>
              </div>
              <div>
                <p className="text-cyber-cyan mb-2">Compile & Run</p>
                <pre className="text-gray-400">{`gcc -Wall -Wextra -std=c11 -o prog prog.c
./prog
echo $?    # exit code`}</pre>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-cyber-cyan mb-2">Key Registers</p>
                <pre className="text-gray-400">{`RAX — accumulator / return
RBX — base / callee-saved
RCX — counter / 4th arg
RDX — data / 3rd arg
RDI — 1st arg / dest index
RSI — 2nd arg / source index
RSP — stack pointer
RBP — base pointer`}</pre>
              </div>
              <div>
                <p className="text-cyber-cyan mb-2">Assemble & Link</p>
                <pre className="text-gray-400">{`nasm -f elf64 program.asm
ld -o program program.o
./program`}</pre>
              </div>
            </>
          )}
        </div>
      </CyberPanel>
    </div>
  );
}
