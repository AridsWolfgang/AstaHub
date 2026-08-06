import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "The Stack",
    subtitle: "PUSH, POP, and stack frame management",
    tags: ["stack", "memory", "rsp"],
    theory: {
      sections: [
        {
          heading: "Stack Fundamentals",
          content:
            "The stack is a Last-In-First-Out (LIFO) data structure that grows downward in memory (toward lower addresses). RSP (Stack Pointer) always points to the top of the stack. PUSH decrements RSP by 8 and stores a value at the new RSP. POP loads a value from RSP and increments RSP by 8. The stack is used for local variables, function arguments, return addresses, and register preservation.",
          codeExample: `; Stack operations:\npush rax           ; RSP -= 8; [RSP] = RAX\npush rbx           ; RSP -= 8; [RSP] = RBX\npush rcx           ; RSP -= 8; [RSP] = RCX\npop rcx            ; RCX = [RSP]; RSP += 8\npop rbx            ; RBX = [RSP]; RSP += 8\npop rax            ; RAX = [RSP]; RSP += 8\n; Stack restored to original state`,
        },
        {
          heading: "The Stack Frame (RBP)",
          content:
            "RBP (Base Pointer) is used to create a stable reference point for accessing function parameters and local variables. The prologue saves the old RBP and sets RBP = RSP. Parameters and locals are accessed at fixed offsets from RBP: arguments at positive offsets (e.g., [rbp+16]), locals at negative offsets (e.g., [rbp-8]). This lets RSP change during function execution while RBP stays fixed.",
          codeExample: `; Function prologue (standard):\nmypush rbp          ; save caller's base pointer\nmov rbp, rsp        ; set our frame pointer\nsub rsp, 32         ; allocate 32 bytes for locals\n\n; Accessing parameters (passed on stack):\nmov rax, [rbp+16]   ; first stack arg\nmov rbx, [rbp+24]   ; second stack arg\n\n; Accessing local variables:\nmov [rbp-8], rax    ; local var at offset -8\n\n; Epilogue:\nmov rsp, rbp        ; restore RSP\npop rbp             ; restore caller's RBP\nret`,
        },
        {
          heading: "Stack Alignment and the Red Zone",
          content:
            "The System V AMD64 ABI requires the stack to be 16-byte aligned before a CALL instruction. PUSH pushes 8 bytes, so an odd number of PUSHes before a CALL misaligns the stack. The red zone is a 128-byte area below RSP that can be used without moving RSP (in leaf functions only — functions that don't call other functions). Signal handlers and debuggers may overwrite the red zone, so it must be used with care.",
          codeExample: `; Stack alignment:\n; Before CALL: RSP must be 16-byte aligned\n; CALL pushes 8 bytes (return address), so inside function RSP ≡ 8 (mod 16)\n; Function then pushes RBP (8 more bytes) → RSP ≡ 0 (mod 16)\n\n; Red zone (leaf functions only):\nmy_leaf_func:\n    mov [rsp-8], rax     ; use red zone — no RSP adjustment needed\n    ; compute...\n    mov rax, [rsp-8]\n    ret\n    ; No sub rsp needed because we used red zone`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 58: The Stack\n; Push and pop values\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 100\n    mov rbx, 200\n    mov rcx, 300\n\n    push rax        ; save values\n    push rbx\n    push rcx\n\n    ; ... do work that might use rax, rbx, rcx\n    xor rax, rax\n    xor rbx, rbx\n    xor rcx, rcx\n\n    pop rcx         ; restore in reverse order\n    pop rbx\n    pop rax\n    ; rax=100, rbx=200, rcx=300 restored\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d58-q1", type: "quiz", title: "Stack Direction",
        description: "Understanding stack growth",
        question: "In what direction does the x86-64 stack grow?",
        options: [
          { id: "a", text: "Toward higher addresses (upward)", correct: false },
          { id: "b", text: "Toward lower addresses (downward)", correct: true },
          { id: "c", text: "Randomly based on ASLR", correct: false },
          { id: "d", text: "It doesn't grow — it's a fixed size", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d58-q2", type: "quiz", title: "PUSH/POP Order",
        description: "LIFO behaviour",
        question: "If you PUSH rax, PUSH rbx, then POP rcx, what value does rcx get?",
        options: [
          { id: "a", text: "The value that was in rax", correct: false },
          { id: "b", text: "The value that was in rbx", correct: true },
          { id: "c", text: "The value of RSP before the first PUSH", correct: false },
          { id: "d", text: "Zero (stack is cleared on POP)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d58-c1", type: "code", title: "Stack Swap",
        description: "Use PUSH and POP to swap the values of two registers",
        starterCode: `section .text\nglobal _start\n\n_start:\n    mov rax, 0xAAA\n    mov rbx, 0xBBB\n\n    ; TODO: swap rax and rbx using the stack\n    ; push rax, push rbx, then pop in right order\n\n    ; After swap: rax should be 0xBBB, rbx should be 0xAAA\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["push rax; push rbx; pop rax; pop rbx gives wrong swap", "Think LIFO: push both then pop in reverse"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d58-a1", title: "Stack-Based Calculator",
      description: "Write assembly that uses the stack to preserve registers while computing a multi-step expression",
      requirements: [
        "Compute (a + b) * (c - d) where all values start in registers",
        "Use PUSH/POP to save and restore intermediate results",
        "Push at least 3 values onto the stack during computation",
        "Restore all registers to their original values by the end",
      ],
      starterCode: `section .text\nglobal _start\n\n_start:\n    mov rax, 10     ; a\n    mov rbx, 20     ; b\n    mov rcx, 30     ; c\n    mov rdx, 5      ; d\n\n    ; Stack-based calculator:\n    ; (a + b) * (c - d)\n\n    push rax        ; preserve original a\n    push rbx        ; preserve original b\n\n    add rax, rbx    ; rax = a + b\n    push rax        ; save (a+b) on stack\n\n    mov rax, rcx\n    sub rax, rdx    ; rax = c - d\n\n    pop rbx         ; rbx = (a+b)\n    mul rbx         ; rdx:rax = (a+b)*(c-d)\n\n    ; rax now holds the result\n    ; restore original values from stack\n    pop rbx         ; restore rbx\n    pop rax         ; restore rax\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "PUSH used to preserve values", points: 20 },
        { criterion: "POP used to restore values", points: 20 },
        { criterion: "Intermediate result saved on stack", points: 20 },
        { criterion: "Computation produces correct result", points: 20 },
        { criterion: "Registers restored to original values", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
