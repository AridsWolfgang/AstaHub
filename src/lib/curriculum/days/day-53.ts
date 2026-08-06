import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "MOV & Data Movement",
    subtitle: "Loading, storing, and transferring data",
    tags: ["instructions", "mov", "data-movement"],
    theory: {
      sections: [
        {
          heading: "The MOV Instruction Family",
          content:
            "MOV is the most common instruction. Syntax: `mov destination, source`. Both operands must be the same size. You cannot MOV from memory to memory directly — use a register as intermediary. MOV does not affect flags.",
          codeExample: `; MOV variants:\nmov rax, 42         ; immediate → register\nmov rbx, rax        ; register → register\nmov rax, [addr]     ; memory → register\nmov [addr], rax     ; register → memory\n; mov [x], [y]      ; INVALID — use mov rax, [y]; mov [x], rax`,
        },
        {
          heading: "Immediate Values and Sign Extension",
          content:
            "Immediates are constants embedded in the instruction. Moving a 32-bit immediate into a 64-bit register zero-extends it. For signed values, use MOVSX (sign-extend) or MOVZX (zero-extend). Smaller immediates produce shorter instruction encodings.",
          codeExample: `; Immediate sizes:\nmov rax, 42       ; 7 bytes: 48 C7 C0 2A 00 00 00\nmov eax, 42       ; 5 bytes: B8 2A 00 00 00 (zero-extends)\nmov al, 42        ; 2 bytes: B0 2A\n\n; Sign extension:\nmovsx rax, byte [var]   ; sign-extend byte to 64-bit\nmovzx rax, byte [var]   ; zero-extend byte to 64-bit`,
        },
        {
          heading: "Memory Addressing Forms",
          content:
            "The source or destination can reference memory using various forms: `[address]` (direct), `[reg]` (register indirect), `[reg + offset]` (base+displacement), `[reg + reg*scale]` (indexed), `[reg + reg*scale + offset]` (full). Scale can be 1, 2, 4, or 8.",
          codeExample: `; Memory addressing examples:\nmov rax, [0x601040]          ; direct\nmov rax, [rbx]               ; register indirect\nmov rax, [rbx + 16]          ; base + displacement\nmov rax, [rbx + rcx*8]       ; base + index*scale\nmov rax, [rbx + rcx*4 + 32]  ; full form\n\n; LEA computes address without accessing memory:\nlea rax, [rbx + rcx*4]      ; rax = rbx + rcx*4`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 53: MOV & Data Movement\n; Practice with different MOV forms\n\nsection .data\n    val dq 12345\n    arr dq 10, 20, 30, 40\n\nsection .text\nglobal _start\n\n_start:\n    ; Immediate to register\n    mov rax, 100\n\n    ; Register to register\n    mov rbx, rax\n\n    ; Memory to register\n    mov rcx, [val]\n\n    ; Register to memory\n    mov [val], rcx\n\n    ; LEA (load effective address)\n    lea rdx, [arr]\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d53-q1", type: "quiz", title: "MOV Rules",
        description: "Understanding MOV constraints",
        question: "Which of these MOV operations is valid?",
        options: [
          { id: "a", text: "mov [x], [y] — memory to memory", correct: false },
          { id: "b", text: "mov rax, rbx — register to register", correct: true },
          { id: "c", text: "mov 42, rax — immediate as destination", correct: false },
          { id: "d", text: "mov [x], 42 — mismatched sizes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d53-q2", type: "quiz", title: "Addressing Modes",
        description: "How memory addresses work",
        question: "What does LEA do?",
        options: [
          { id: "a", text: "Loads data from memory into a register", correct: false },
          { id: "b", text: "Computes the effective address without accessing memory", correct: true },
          { id: "c", text: "Loads the address of a label into a register", correct: false },
          { id: "d", text: "Loads the flags register", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d53-c1", type: "code", title: "Data Mover",
        description: "Use MOV and LEA to transfer values between registers and memory",
        starterCode: `section .data\n    src dq 999\n    dest dq 0\n\nsection .text\nglobal _start\n\n_start:\n    ; TODO: Load [src] into RAX\n    ; TODO: Store RAX into [dest]\n    ; TODO: Load address of dest into RBX using LEA\n    ; TODO: Load value at [rbx] into RCX\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: [
          "Use mov rax, [src] to load from memory",
          "Use lea rbx, [dest] for address",
          "Use mov rcx, [rbx] for indirect load",
        ],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d53-a1", title: "Memory Copy Routine",
      description: "Write assembly code that copies an 8-byte value from one memory location to another using a register intermediary, then loads its address via LEA",
      requirements: [
        "Define two qword variables in .data section",
        "Copy value from source to destination using a register",
        "Use LEA to get address of destination into a register",
        "Load the copied value indirectly through the LEA register",
      ],
      starterCode: `section .data\n    source dq 0xDEADBEEFCAFE\n    dest   dq 0\n\nsection .text\nglobal _start\n\n_start:\n    ; Step 1: Load source value\n    mov rax, [source]\n\n    ; Step 2: Store into destination\n    mov [dest], rax\n\n    ; Step 3: Get address of dest using LEA\n    lea rbx, [dest]\n\n    ; Step 4: Load indirectly\n    mov rcx, [rbx]\n\n    ; Exit\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Memory load using [src]", points: 20 },
        { criterion: "Memory store using [dest]", points: 20 },
        { criterion: "LEA used for address computation", points: 25 },
        { criterion: "Indirect load through LEA result", points: 20 },
        { criterion: "Clean exit", points: 15 },
      ],
      xpReward: 100,
    },
};

export default lesson;
