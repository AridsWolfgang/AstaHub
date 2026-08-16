import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Reverse Engineering",
    subtitle: "Reading disassembly like a book",
    tags: ["reverse"],
    theory: {
      sections: [
        {
          heading: "objdump",
          content:
            "objdump is the first tool of the reverse engineer. objdump -d file disassembles every executable section, turning machine bytes back into mnemonics with their addresses; objdump -d -M intel file switches from AT&T to Intel syntax; objdump -t dumps the symbol table so you can find function names immediately. Combined with file and readelf, you can learn a binary's architecture, entry point, and exported symbols before running a single instruction.",
          codeExample: `# Basic disassembly workflow:
# objdump -d ./program        ; disassemble .text
# objdump -d -M intel ./program   ; Intel syntax
# objdump -t ./program        ; symbol table
# objdump -s -j .rodata ./program ; strings in rodata
#
# Example output (Intel):
# 401006: 48 89 e5      mov rbp, rsp
# 401009: 48 83 ec 10   sub rsp, 0x10`,
        },
        {
          heading: "Ghidra",
          content:
            "Ghidra is a free decompiler from the NSA. Unlike a raw disassembler, it lifts machine code into structured C-like pseudocode with variable names, control flow, and data types. Its decompiler turns a wall of mov/add/cmp/jne into an if/else with a loop you can actually read. Ghidra's strengths are its project-based workflow, cross-references (who calls this function?), and its scripting API for automating analysis. The habit that matters: use Ghidra to get the shape of the code, then drop to raw disassembly to confirm the exact instructions.",
        },
        {
          heading: "Pattern Recognition",
          content:
            "Most reverse engineering is recognizing compiled idioms rather than reading instructions cold. A function prologue of push rbp; mov rbp, rsp; sub rsp, N is the standard frame setup. A loop compiles to a compare, a conditional jump, and a backward branch at the bottom. switch statements become jump tables — indirect jumps through a table indexed by the value. String references (lea rdi, [rip+msg]) reveal what a function prints. Recognizing these fingerprints lets you read a disassembly at the level of intent: 'this is the memset, this is the argument parser, this is the loop that computes the checksum.'",
        },
      ],
    },
    playground: {
      defaultCode: `; x86-64 function prologue + loop idiom:
; C:  int sum(int n) { int s = 0; for (int i = 0; i < n; i++) s += i; return s; }
;
; push rbp
; mov  rbp, rsp
; mov  DWORD PTR [rbp-4], 0   ; s = 0
; mov  DWORD PTR [rbp-8], 0   ; i = 0
; .L2: cmp DWORD PTR [rbp-8], edi
;      jge .L3
;      mov eax, [rbp-8]
;      add [rbp-4], eax
;      inc DWORD PTR [rbp-8]
;      jmp .L2
; .L3: mov eax, [rbp-4]
;      pop rbp
;      ret`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d73-q1", type: "quiz", title: "Prologue",
        description: "Recognizing the standard function setup",
        question: "Which instruction sequence is the standard x86-64 function prologue?",
        options: [
          { id: "a", text: "push rbp; mov rbp, rsp", correct: true },
          { id: "b", text: "mov eax, 0; ret", correct: false },
          { id: "c", text: "syscall; syscall", correct: false },
          { id: "d", text: "cld; rep movsb", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d73-q2", type: "quiz", title: "Jump Tables",
        description: "How switch statements compile",
        question: "How does a switch statement with dense integer cases typically compile?",
        options: [
          { id: "a", text: "Into an indirect jump through a lookup table", correct: true },
          { id: "b", text: "Into a single unconditional jump", correct: false },
          { id: "c", text: "Into a syscall", correct: false },
          { id: "d", text: "Into a REP prefix loop", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d73-c1", type: "code", title: "Spot the Pattern",
        description: "Identify the control flow in a commented disassembly",
        starterCode: `; Identify this compiled construct:
;   401000: xor eax, eax
;   401002: mov ecx, 5
;   401005: add eax, ecx
;   401007: dec ecx
;   401008: jnz 401005
;
; TODO: write a one-line C comment naming the construct
; and what rax holds when it exits.
section .text
global _start
_start:
    nop`,
        hints: ["There is a backwards jump and a decrement — that's a loop", "rcx counts down from 5 to 1", "eax accumulates 5+4+3+2+1 = 15"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d73-a1", title: "Reverse a Binary",
      description: "Compile a small C program with gcc -O0 -fno-asynchronous-unwind-tables, disassemble it with objdump -d -M intel, and write a hand-annotated version that explains what each block does — identify the function prologue, any loops, and the syscall or call sites.",
      requirements: [
        "Compile a C program with a function, a loop, and a string print",
        "Disassemble with objdump -d -M intel",
        "Annotate the prologue, loop, and call instructions",
        "Identify how the string constant is referenced (lea rip-relative)",
        "Write the equivalent C pseudocode from the disassembly",
      ],
      starterCode: `# Build a target binary:
# gcc -O0 -fno-asynchronous-unwind-tables -o target target.c
#
# Then inspect:
# objdump -d -M intel ./target | less
#
# Target source (save as target.c):
# #include <stdio.h>
# int main(void) {
#     int sum = 0;
#     for (int i = 1; i <= 5; i++) sum += i;
#     printf("sum=%d\\n", sum);
#     return 0;
# }`,
      rubric: [
        { criterion: "Binary compiled and disassembled", points: 20 },
        { criterion: "Prologue and epilogue identified", points: 25 },
        { criterion: "Loop control flow annotated", points: 25 },
        { criterion: "C pseudocode reconstructed", points: 30 },
      ],
      xpReward: 100,
    },
};

export default lesson;
