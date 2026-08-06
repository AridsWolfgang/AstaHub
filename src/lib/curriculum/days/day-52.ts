import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "CPU Architecture",
    subtitle: "Registers, ALU, and the fetch-decode-execute cycle",
    tags: ["architecture", "registers", "cpu"],
    theory: {
      sections: [
        {
          heading: "The Fetch-Decode-Execute Cycle",
          content:
            "Every CPU runs in an infinite loop: fetch the next instruction from memory (RIP register holds the address), decode it (control unit interprets opcode and operands), execute it (ALU performs arithmetic, memory unit reads/writes, or control flow changes). This is the von Neumann architecture foundation.",
        },
        {
          heading: "x86-64 General Purpose Registers",
          content:
            "x86-64 has 16 general-purpose registers (GPRs), each 64 bits wide. RAX (accumulator), RBX (base), RCX (counter), RDX (data), RSI (source index), RDI (dest index), RBP (base pointer), RSP (stack pointer), and R8–R15 (extended). You can access sub-registers: EAX (32-bit), AX (16-bit), AL (low 8-bit), AH (high 8-bit).",
          codeExample: `; Register size access patterns:\nmov rax, 0x1234567890ABCDEF  ; full 64-bit\nmov eax, 0xDEADBEEF          ; lower 32 bits, zero-extends\nmov ax, 0xCAFE               ; lower 16 bits\nmov al, 0x42                 ; lower 8 bits\nmov ah, 0xFF                 ; bits 15:8\n; After mov eax instruction: RAX = 0x00000000DEADBEEF`,
        },
        {
          heading: "The ALU and Flags Register",
          content:
            "The Arithmetic Logic Unit performs math and bitwise operations. Results set flags in RFLAGS: ZF (zero), CF (carry), SF (sign), OF (overflow), PF (parity), AF (adjust). Conditional jumps (JE, JG, JL) read these flags to make decisions.",
          codeExample: `; How flags are set:\nmov rax, 0x7FFFFFFFFFFFFFFF  ; max positive\nadd rax, 1                   ; overflow! OF=1, SF=1, ZF=0\n; After addition:\n; jo overflow_handler        ; jump if OF=1\n; js negative_result         ; jump if SF=1`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 52: CPU Architecture\n; Experiment with registers and flags\n\nsection .text\nglobal _start\n\n_start:\n    ; Try different register sizes\n    mov rax, 0x1234567890ABCDEF\n    mov rbx, 0\n    mov ecx, 0xDEAD\n\n    ; Check flags via arithmetic\n    mov rax, 100\n    add rax, 50      ; rax = 150\n    sub rax, 200     ; rax = -50, SF=1, OF=0\n\n    ; Exit\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d52-q1", type: "quiz", title: "Register Basics",
        description: "Test your register knowledge",
        question: "How many general-purpose registers does x86-64 have?",
        options: [
          { id: "a", text: "8", correct: false },
          { id: "b", text: "16", correct: true },
          { id: "c", text: "32", correct: false },
          { id: "d", text: "4", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d52-q2", type: "quiz", title: "Flags Register",
        description: "Understanding condition flags",
        question: "Which flag is set when a subtraction produces a result of zero?",
        options: [
          { id: "a", text: "CF (Carry Flag)", correct: false },
          { id: "b", text: "OF (Overflow Flag)", correct: false },
          { id: "c", text: "ZF (Zero Flag)", correct: true },
          { id: "d", text: "SF (Sign Flag)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d52-c1", type: "code", title: "Register Explorer",
        description: "Write code that sets up registers with specific values and performs arithmetic",
        starterCode: `section .text\nglobal _start\n\n_start:\n    ; Set RAX = 500, RBX = 200\n    ; Then compute RAX = RAX - RBX\n    ; Then compute RBX = RAX + 100\n    mov rax, 500\n    mov rbx, 200\n    ; TODO: subtract rbx from rax\n    ; TODO: add 100 to rbx\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["Use sub for subtraction", "Use add for addition", "Instructions go in order"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d52-a1", title: "Register Calculator",
      description: "Write an assembly program that performs a sequence of arithmetic operations across multiple registers",
      requirements: [
        "Use at least 4 different registers (RAX, RBX, RCX, RDX)",
        "Perform addition, subtraction, and multiplication",
        "Move results between registers",
        "Exit cleanly with code 0",
      ],
      starterCode: `section .text\nglobal _start\n\n_start:\n    ; Multi-register calculation:\n    ; (a + b) * c - d\n    mov rax, 15     ; a\n    mov rbx, 25     ; b\n    mov rcx, 4      ; c\n    mov rdx, 30     ; d\n\n    ; TODO: rax = rax + rbx\n    ; TODO: rax = rax * rcx (hint: mul rcx stores result in rdx:rax)\n    ; TODO: sub something to get final result\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Four registers used correctly", points: 20 },
        { criterion: "Addition implementation", points: 20 },
        { criterion: "Subtraction implementation", points: 20 },
        { criterion: "Multiplication implementation", points: 25 },
        { criterion: "Clean exit", points: 15 },
      ],
      xpReward: 100,
    },
};

export default lesson;
