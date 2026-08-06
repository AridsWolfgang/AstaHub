import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Assembly Genesis",
    subtitle: "What is Assembly and why learn it?",
    tags: ["intro", "asm", "registers"],
    theory: {
      sections: [
        {
          heading: "Why Assembly in 2026?",
          content:
            "Assembly language is the human-readable representation of machine code. Every high-level language compiler ultimately produces assembly or direct machine code. Understanding assembly gives you insight into CPU behaviour, calling conventions, memory layout, and low-level debugging. It's essential for reverse engineering, embedded systems, OS development, and performance tuning.",
        },
        {
          heading: "Mnemonics vs Machine Code",
          content:
            "Each assembly instruction (mnemonic) corresponds to one or more bytes of machine code. For example, `mov rax, 42` encodes to `48 C7 C0 2A 00 00 00`. The assembler (NASM, GAS, MASM) translates mnemonics into binary. The disassembler does the reverse. Every CPU architecture has its own Instruction Set Architecture (ISA).",
          codeExample: `; Assembly → Machine code examples:\n; mov rax, 42    →  48 C7 C0 2A 00 00 00\n; add rax, rbx   →  48 01 D8\n; syscall        →  0F 05\n; ret            →  C3`,
        },
        {
          heading: "NASM Syntax Basics",
          content:
            "NASM (Netwide Assembler) uses Intel syntax: `opcode destination, source`. Sections organise the program: `.data` for initialized data, `.bss` for uninitialized data, `.text` for code. The `global _start` directive makes the entry point visible to the linker.",
          codeExample: `; Minimal NASM program:\nsection .data\n    msg db 'Hello, ASM!', 0xA\n    len equ $ - msg\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 1       ; sys_write\n    mov rdi, 1       ; stdout\n    mov rsi, msg     ; buffer\n    mov rdx, len     ; length\n    syscall\n    mov rax, 60      ; sys_exit\n    xor rdi, rdi     ; exit code 0\n    syscall`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 51: Assembly Genesis\n; Try running your first assembly program\n\nsection .data\n    msg db 'Hello from Assembly!', 0xA\n    len equ $ - msg\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 1      ; syscall: write\n    mov rdi, 1      ; fd: stdout\n    mov rsi, msg    ; buf\n    mov rdx, len    ; count\n    syscall\n    mov rax, 60     ; syscall: exit\n    xor rdi, rdi    ; status: 0\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d51-q1", type: "quiz", title: "What is Assembly?",
        description: "Test your understanding of assembly language",
        question: "What does an assembler do?",
        options: [
          { id: "a", text: "Executes machine code directly", correct: false },
          { id: "b", text: "Translates mnemonics to machine code", correct: true },
          { id: "c", text: "Compiles C code to assembly", correct: false },
          { id: "d", text: "Links object files into executables", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d51-q2", type: "quiz", title: "NASM Sections",
        description: "Understanding program sections",
        question: "Which NASM section contains the executable code?",
        options: [
          { id: "a", text: ".data", correct: false },
          { id: "b", text: ".bss", correct: false },
          { id: "c", text: ".text", correct: true },
          { id: "d", text: ".rodata", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d51-c1", type: "code", title: "Custom Greeting",
        description: "Modify the hello program to print your own message",
        starterCode: `section .data\n    msg db 'YOUR_NAME_HERE', 0xA\n    len equ $ - msg\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, msg\n    mov rdx, len\n    syscall\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        expectedOutput: "YOUR_NAME_HERE",
        hints: ["Change the text in the db directive", "Update len if you change the message length"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d51-a1", title: "Hello Explorer",
      description: "Write a program that prints a multi-line intro banner in assembly",
      requirements: [
        "Print at least 3 lines of text using separate sys_write calls",
        "Each line must use a different message buffer",
        "Use equ for length calculation",
        "Exit with code 0",
      ],
      starterCode: `section .data\n    line1 db 'Welcome to Assembly!', 0xA\n    len1 equ $ - line1\n    line2 db 'You are now thinking in mnemonics.', 0xA\n    len2 equ $ - line2\n    line3 db 'Level: ASM Initiate', 0xA\n    len3 equ $ - line3\n\nsection .text\nglobal _start\n\n_start:\n    ; Print line1\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, line1\n    mov rdx, len1\n    syscall\n    ; Print line2\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, line2\n    mov rdx, len2\n    syscall\n    ; Print line3\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, line3\n    mov rdx, len3\n    syscall\n    ; Exit\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Three separate print operations", points: 30 },
        { criterion: "Correct sys_write setup", points: 25 },
        { criterion: "Length calculation accuracy", points: 15 },
        { criterion: "Proper exit handling", points: 15 },
        { criterion: "Code readability and comments", points: 15 },
      ],
      xpReward: 100,
    },
};

export default lesson;
