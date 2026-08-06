import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "The Silicon Masterpiece",
    subtitle: "100 days of mastery — capstone reflection and the road ahead",
    tags: ["capstone", "final", "master"],
    theory: {
      sections: [
        {
          heading: "The Journey Across 100 Days",
          content:
            "You began with printf and a blinking cursor. One hundred days later, you've traced the arc from C variables and pointers through dynamic memory, file I/O, data structures, and system calls — then crossed the bridge into bare metal: x86-64 registers, SIMD, paging, interrupts, bootloaders, inline assembly, and performance counter analysis. This is a rare skillset. Few programmers ever understand both C and assembly at this depth. You are now equipped to read the machine's native language.",
        },
        {
          heading: "The Silicon Master's Arsenal",
          content:
            "Your toolkit now spans the full stack: C systems programming (memory management, concurrency, networking, embedded patterns) and x86-64 assembly (instruction encoding, ABI, SIMD optimization, kernel interfaces, security analysis). You can read a disassembly and see the compiler's intent, write inline assembly when performance demands it, and communicate with hardware at the port and interrupt level.",
          codeExample: `; ASM Capstone — Final Project
; ============================
;
; Complete your chosen project.
; Ensure:
; - Clean compilation with no errors
; - Handles edge cases gracefully
; - Well-commented code
; - Performance considerations addressed
;
; "The metal speaks to those who listen."

section .text
global _start
_start:
    ; Your silicon masterpiece begins here
    nop`,
        },
        {
          heading: "Beyond Day 100",
          content:
            "Mastery is not a finish line — it's a practice. Here are your next frontiers: (1) Write a bootable kernel in NASM that enters 64-bit long mode. (2) Implement a custom memory allocator in C and benchmark it against glibc malloc. (3) Contribute to an open-source project that works close to the metal (kernel, embedded, game engine, browser JS engine). (4) Learn ARM64 assembly — your x86 knowledge transfers directly; the ISA differences will deepen your architectural intuition. (5) Teach someone else: the best way to solidify mastery is to guide another through the first 50 days.",
        },
      ],
    },
    playground: {
      defaultCode: `; Choose your capstone:
; 1. Bootable kernel (protected mode)
; 2. Custom encryption/compression tool
; 3. Retro game for boot sector
; 4. ELF packer/protector
; 5. Performance-critical library function

section .text
global _start
_start:
    ; Your silicon masterpiece begins here
    nop`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d100-q1", type: "quiz", title: "Full Stack",
        description: "Reflecting on 100 days of learning",
        question: "Which of the following statements best describes the relationship between C and assembly?",
        options: [
          { id: "a", text: "Assembly is obsolete; C compilers always generate better code", correct: false },
          { id: "b", text: "C provides portable abstractions; assembly gives you the full power and responsibility of the machine", correct: true },
          { id: "c", text: "They are completely independent languages with no connection", correct: false },
          { id: "d", text: "Assembly is just C with different syntax", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d100-q2", type: "quiz", title: "The Expert Mindset",
        description: "Advanced systems thinking",
        question: "What is the primary value of knowing assembly for a C programmer?",
        options: [
          { id: "a", text: "Being able to write everything in assembly", correct: false },
          { id: "b", text: "Understanding what the compiler actually does, optimizing smarter, and debugging at the lowest level", correct: true },
          { id: "c", text: "It looks impressive on a resume", correct: false },
          { id: "d", text: "Avoiding the need for C altogether", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d100-c1", type: "code", title: "Silicon Signature",
        description: "Write a program that prints a multi-line ASCII art sigil and your 100-day achievement using NASM syscalls",
        starterCode: `section .data
    ; Your ASCII art here

section .text
global _start

_start:
    ; Your masterpiece output
    nop`,
        hints: ["Plan your ASCII art carefully", "Use multiple sys_write calls", "End with sys_exit 0"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d100-a1", title: "The Grand Synthesis",
      description: "Choose one capstone project from the list and complete it with full documentation: (1) bootable kernel, (2) custom encryption tool, (3) retro boot-sector game, (4) ELF packer, (5) performance-critical library routine. Your submission must compile cleanly, handle edge cases, and include a README explaining the architecture.",
      requirements: [
        "Fully working code that compiles and runs without errors",
        "README with architecture overview, build instructions, and design decisions",
        "Comments explaining every significant section",
        "Test cases demonstrating correctness with edge cases",
        "Performance notes (for optimization-focused projects)",
      ],
      starterCode: `; Your Name — Silicon Masterpiece
; 100-Day Capstone Project
; ==========================
;
; Complete your chosen project.
;
; Submission checklist:
; [ ] Code compiles and runs
; [ ] README with build instructions
; [ ] Architecture diagram or explanation
; [ ] Test results with sample output
; [ ] Self-assessment: what did you learn?

section .text
global _start
_start:
    ; Your silicon masterpiece begins here
    nop`,
      rubric: [
        { criterion: "Functional code with no errors", points: 30 },
        { criterion: "Architecture documentation (README)", points: 25 },
        { criterion: "Code comments and quality", points: 20 },
        { criterion: "Test cases and edge cases", points: 15 },
        { criterion: "Self-assessment and reflection", points: 10 },
      ],
      xpReward: 100,
    },
};

export default lesson;
