import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Functions & CALL/RET",
    subtitle: "Calling conventions and stack frames",
    tags: ["functions", "call", "ret", "abi"],
    theory: {
      sections: [
        {
          heading: "CALL and RET",
          content:
            "CALL pushes the return address (address of the next instruction) onto the stack and jumps to the target label. RET pops the return address and jumps to it. This allows functions to return to the caller. The pair CALL/RET is the fundamental mechanism for code reuse in assembly. CALL is equivalent to `push return_addr; jmp target`.",
          codeExample: `; CALL/RET mechanism:\n_start:\n    call my_func    ; push address of 'next', jmp my_func\nnext:               ; execution resumes here after RET\n    mov rax, 60\n    xor rdi, rdi\n    syscall\n\nmy_func:\n    ; function body\n    ret             ; pop address from stack, jmp there\n\n; Manual equivalent of CALL:\n; lea rax, [next]\n; push rax\n; jmp my_func`,
        },
        {
          heading: "Function Prologue and Epilogue",
          content:
            "The standard prologue saves the old RBP and sets up the new frame: `push rbp; mov rbp, rsp`. Then RSP is decremented to allocate local variables. The epilogue reverses this: `mov rsp, rbp; pop rbp; ret`. Parameters passed on the stack are at [rbp+16], [rbp+24], etc. Locals are at [rbp-8], [rbp-16], etc.",
          codeExample: `; Complete function frame:\nmy_function:\n    ; Prologue\n    push rbp\n    mov rbp, rsp\n    sub rsp, 32     ; allocate 32 bytes for locals\n\n    ; Save callee-saved registers\n    push rbx\n    push r12\n\n    ; Function body...\n    ; [rbp+16] = first stack arg\n    ; [rbp-8]  = local var\n\n    ; Epilogue\n    pop r12\n    pop rbx\n    mov rsp, rbp\n    pop rbp\n    ret`,
        },
        {
          heading: "System V AMD64 Calling Convention",
          content:
            "The System V ABI is used on Linux/macOS x86-64. Integer/pointer arguments go in: RDI, RSI, RDX, RCX, R8, R9 (left to right). Additional arguments go on the stack (right to left). RAX holds the return value. Caller-saved registers (RAX, RCX, RDX, RSI, RDI, R8-R11) may be clobbered by the callee. Callee-saved registers (RBX, RBP, R12-R15) must be preserved. The stack must be 16-byte aligned before CALL.",
          codeExample: `; Calling a function with 3 args:\n; int sum(int a, int b, int c) { return a + b + c; }\n\nmov rdi, 10        ; first arg\nmov rsi, 20        ; second arg\nmov rdx, 30        ; third arg\ncall sum\n; rax = 60\n\nsum:\n    push rbp\n    mov rbp, rsp\n    ; rdi = a, rsi = b, rdx = c\n    mov rax, rdi\n    add rax, rsi\n    add rax, rdx\n    pop rbp\n    ret`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 59: Functions & CALL/RET\n; Write and call your own function\n\nsection .text\nglobal _start\n\n_start:\n    mov rdi, 7\n    mov rsi, 3\n    call my_add\n    ; result now in rax\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall\n\n; Function: my_add(a, b) → a + b\nmy_add:\n    push rbp\n    mov rbp, rsp\n    mov rax, rdi    ; first arg\n    add rax, rsi    ; add second arg\n    pop rbp\n    ret`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d59-q1", type: "quiz", title: "CALL behaviour",
        description: "What CALL does internally",
        question: "What does CALL push onto the stack?",
        options: [
          { id: "a", text: "The current value of RAX", correct: false },
          { id: "b", text: "The address of the next instruction after CALL", correct: true },
          { id: "c", text: "The target function's address", correct: false },
          { id: "d", text: "The value of RSP", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d59-q2", type: "quiz", title: "Callee-saved",
        description: "Register preservation rules",
        question: "Which of these registers must be preserved by a callee function?",
        options: [
          { id: "a", text: "RAX, RCX, RDX", correct: false },
          { id: "b", text: "RBX, RBP, R12-R15", correct: true },
          { id: "c", text: "RDI, RSI, RDX", correct: false },
          { id: "d", text: "R8, R9, R10, R11", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d59-c1", type: "code", title: "Function Chain",
        description: "Write two functions where one calls the other, following the System V ABI",
        starterCode: `section .text\nglobal _start\n\n_start:\n    ; Call double_then_add(5, 3)\n    ; should return (5*2) + (3*2) = 16\n    mov rdi, 5\n    mov rsi, 3\n    call double_then_add\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall\n\n; double_then_add(a, b) = double(a) + double(b)\ndouble_then_add:\n    push rbp\n    mov rbp, rsp\n    push rbx\n\n    ; Save a in rbx, call double(a)\n    mov rbx, rdi\n    call double_val\n    mov rbx, rax    ; rbx holds double(a)\n\n    ; Call double(b)\n    mov rdi, rsi\n    call double_val\n\n    ; rax = double(b) + double(a)\n    add rax, rbx\n\n    pop rbx\n    pop rbp\n    ret\n\n; double_val(x) = x * 2\ndouble_val:\n    push rbp\n    mov rbp, rsp\n    add rdi, rdi    ; rdi = rdi * 2\n    mov rax, rdi\n    pop rbp\n    ret`,
        hints: ["Save callee-saved regs before calling sub-functions", "Use RBX to preserve values across nested calls"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d59-a1", title: "Math Library",
      description: "Write a small math library with multiple functions that call each other, using proper prologue/epilogue and register preservation",
      requirements: [
        "Implement functions: square(x), cube(x), sum_of_squares(a, b)",
        "cube must call square internally",
        "sum_of_squares calls square twice",
        "Use proper prologue (push rbp; mov rbp, rsp) in each function",
        "Preserve all callee-saved registers",
      ],
      starterCode: `section .text\nglobal _start\n\n_start:\n    ; Test: sum_of_squares(3, 4) = 3^2 + 4^2 = 9 + 16 = 25\n    mov rdi, 3\n    mov rsi, 4\n    call sum_of_squares\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall\n\n; square(x) = x * x\nsquare:\n    push rbp\n    mov rbp, rsp\n    mov rax, rdi\n    imul rax, rax\n    pop rbp\n    ret\n\n; cube(x) = x * x * x = square(x) * x\ncube:\n    push rbp\n    mov rbp, rsp\n    push rbx\n    mov rbx, rdi       ; save original x\n    call square        ; rax = x^2\n    imul rax, rbx      ; rax = x^2 * x = x^3\n    pop rbx\n    pop rbp\n    ret\n\n; sum_of_squares(a, b) = square(a) + square(b)\nsum_of_squares:\n    push rbp\n    mov rbp, rsp\n    push rbx\n    push r12\n    mov rbx, rdi       ; save a\n    mov r12, rsi       ; save b\n    call square        ; rax = a^2\n    mov rbx, rax       ; rbx = a^2\n    mov rdi, r12       ; arg = b\n    call square        ; rax = b^2\n    add rax, rbx       ; rax = a^2 + b^2\n    pop r12\n    pop rbx\n    pop rbp\n    ret`,
      rubric: [
        { criterion: "square function with correct prologue/epilogue", points: 15 },
        { criterion: "cube function calling square internally", points: 20 },
        { criterion: "sum_of_squares calling square twice", points: 20 },
        { criterion: "Callee-saved register preservation", points: 25 },
        { criterion: "Correct return values in RAX", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
