import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "The Metal Layer",
    subtitle: "Assembly Genesis — what lies beneath C",
    tags: ["intro", "genesis", "register-expert"],
    theory: {
      sections: [
        {
          heading: "Machine Code",
          content:
            "Machine code is the raw binary that the CPU executes directly. Each instruction is encoded as a sequence of bytes — opcode bytes specify the operation, while ModRM and SIB bytes encode operands and addressing modes. x86-64 uses a variable-length encoding: common instructions like mov rax, rbx take 3 bytes, while complex ones can stretch to 15 bytes. Disassemblers like objdump reverse this process, translating bytes back into human-readable mnemonics.",
        },
        {
          heading: "Mnemonics",
          content:
            "Assembly mnemonics are human-readable abbreviations for machine code instructions. mov, add, sub, jmp each map to specific opcode bytes. NASM (Netwide Assembler) uses Intel syntax: mov rax, rbx means 'move rbx into rax.' The assembler handles the tedious work of computing opcodes, ModRM bytes, and immediate encodings so you can reason at a higher level.",
          codeExample: `; x86-64 NASM syntax
section .data
    msg db 'Hello, registers!', 0

section .text
global _start

_start:
    ; System call: write(1, msg, len)
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, 18
    syscall
    mov rax, 60
    xor rdi, rdi
    syscall`,
        },
        {
          heading: "ISA and the Register Expert Mindset",
          content:
            "The Instruction Set Architecture (ISA) is the contract between software and hardware — the complete set of instructions your CPU can execute. x86-64 is a CISC ISA with over 1000 instructions, variable-length encoding, and decades of backward compatibility. As a Register Expert, you no longer take the compiler's word for granted — you read the disassembly, understand each instruction's cost, and write assembly when only the metal will do.",
        },
      ],
    },
    playground: {
      defaultCode: `; x86-64 NASM syntax
section .data
    msg db 'Hello, registers!', 0

section .text
global _start

_start:
    ; System call: write(1, msg, len)
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, 18
    syscall
    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d61-q1", type: "quiz", title: "Machine Code",
        description: "Understanding the binary layer",
        question: "What determines the variable-length encoding in x86-64 instructions?",
        options: [
          { id: "a", text: "The compiler version", correct: false },
          { id: "b", text: "The opcode, ModRM, and SIB bytes", correct: true },
          { id: "c", text: "The operating system", correct: false },
          { id: "d", text: "The number of registers used", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d61-q2", type: "quiz", title: "NASM Syntax",
        description: "Intel syntax basics",
        question: "In NASM Intel syntax, what does 'mov rax, rbx' mean?",
        options: [
          { id: "a", text: "Move rax into rbx", correct: false },
          { id: "b", text: "Move rbx into rax", correct: true },
          { id: "c", text: "Compare rax to rbx", correct: false },
          { id: "d", text: "Add rbx to rax", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d61-c1", type: "code", title: "First System Call",
        description: "Write a NASM program that calls sys_exit(42)",
        starterCode: `section .text
global _start

_start:
    ; TODO: Set up sys_exit (rax=60) with exit code 42
    nop`,
        hints: ["Use mov rax, 60 for sys_exit", "Set rdi to the exit code", "Don't forget syscall"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d61-a1", title: "Register Expert Boot",
      description: "Write a NASM program that prints a multi-line banner using only sys_write calls, then exits with code 0.",
      requirements: [
        "Print at least 3 lines of text using sys_write (rax=1)",
        "Use a separate syscall for each line",
        "Each line must end with a newline (0x0A)",
        "Exit with code 0 using sys_exit",
        "Comment each instruction explaining what it does",
      ],
      starterCode: `section .data
    line1 db 'Assembly Genesis', 0xA
    len1  equ $ - line1

section .text
global _start

_start:
    ; Your multi-line banner here
    nop`,
      rubric: [
        { criterion: "Correct sys_write calls (3+ lines)", points: 30 },
        { criterion: "Correct sys_exit with code 0", points: 20 },
        { criterion: "Each instruction commented", points: 25 },
        { criterion: "Clean code and proper section usage", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
