import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Reading C in Assembly",
    subtitle: "Decompiling mental models",
    tags: ["reverse"],
    theory: {
      sections: [
        {
          heading: "if/else in ASM",
          content:
            "Compilers lower if/else to a compare followed by a conditional jump. A typical `if (x < 10) A; else B;` becomes: cmp x, 10; jge else_label; body A; jmp end; else_label: body B; end:. The condition is inverted — you jump over the then-block when it is false. Compare instructions set flags (cmp x, 10), then a condition-code jump reads them: je/jne/jl/jg/jle/jge for signed, jb/ja/jbe/jae for unsigned. The first thing to decode in any disassembly is always this cmp/jcc pair.",
        },
        {
          heading: "Loops in ASM",
          content:
            "A loop is just a backward jump. The C pattern for (i = 0; i < n; i++) compiles to: zero the counter; loop_top: cmp counter, n; jge done; body; inc counter; jmp loop_top; done:. The comparison plus the backward branch is the signature — find it and you've found a loop. At -O2 a compiler typically replaces the counter with a pointer that walks the array, hoists invariant loads out of the body, and may unroll, so the same C loop looks very different across optimization levels.",
          codeExample: `; for (i = 0; i < 5; i++) sum += i;
; C: sum == 10
    xor  eax, eax        ; i = 0
    xor  ecx, ecx        ; sum = 0
.loop:
    cmp  eax, 5
    jge  .done
    add  ecx, eax        ; sum += i
    inc  eax             ; i++
    jmp  .loop
.done:
    ; ecx holds 10`,
        },
        {
          heading: "Function Calls",
          content:
            "call pushes the return address, then the callee runs its prologue — push rbp; mov rbp, rsp; sub rsp, N — and locals live at negative offsets from RBP (or from RSP once frame-pointer omission kicks in at -O2). Argument slots you wrote land at positive offsets above RBP, and a pointer to a struct return value arrives in RDI. To reconstruct a C signature from disassembly, read the register order at the call site, then reverse the prologue to recover the locals: every push and sub tells you what stack space the original function claimed.",
        },
      ],
    },
    playground: {
      defaultCode: `; reading C: the loop lowering
; int sum = 0;
; for (int i = 1; i <= 10; i++) sum += i;
section .text
global _start

_start:
    xor  rax, rax        ; i = 1 (rax used as counter)
    mov  rbx, 1
.loop:
    cmp  rbx, 10
    jg   .done
    add  rax, rbx        ; sum += i
    inc  rbx             ; i++
    jmp  .loop
.done:
    ; rax == 55
    mov  rdi, rax
    mov  rax, 60
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d64-q1", type: "quiz", title: "The Inverted Branch",
        description: "How compilers arrange if/else",
        question: "How does a compiler arrange `if (x < 10) A; else B;` in assembly?",
        options: [
          { id: "a", text: "It jumps over the then-block when the condition is false", correct: true },
          { id: "b", text: "It always executes A then B", correct: false },
          { id: "c", text: "It uses a multiply to pick the branch", correct: false },
          { id: "d", text: "It swaps the operands of the comparison", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d64-q2", type: "quiz", title: "Loop Signature",
        description: "Spotting a loop in disassembly",
        question: "Which two instructions are the reliable signature of a loop in disassembly?",
        options: [
          { id: "a", text: "push and pop", correct: false },
          { id: "b", text: "A cmp followed by a backward conditional jump", correct: true },
          { id: "c", text: "Two unconditional jumps in sequence", correct: false },
          { id: "d", text: "movzx followed by movsx", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d64-c1", type: "code", title: "Decompile a Sum Loop",
        description: "Write the assembly for a C loop that sums 1 through 10",
        starterCode: `section .text
global _start

_start:
    ; TODO: sum 1..10 and exit with it.
    ; The answer is 55 — your exit code should be 55.
    nop
    mov rdi, rax
    mov rax, 60
    syscall`,
        hints: ["Keep a counter register and a running-total register", "Loop while counter <= 10 using cmp and jle", "Move the total into RDI before overwriting RAX with 60"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d64-a1", title: "classify() Lowered",
      description: "Translate this C function into NASM following the exact compiler lowering you learned: int classify(int x) { if (x < 0) return 1; else if (x == 0) return 0; else return 2; } Call it from _start with a value loaded from .data and exit with the returned value.",
      requirements: [
        "Use cmp/jcc with inverted conditions — jump over each branch when it is false",
        "Implement an if/else-if chain, not a jump table",
        "Return 1, 0, or 2 in RAX from the correct branch",
        "Call classify with the value loaded from a .data variable",
        "Exit with the returned value as the exit code",
      ],
      starterCode: `section .data
    x dq -3

section .text
global _start

; int classify(int x)
classify:
    ; TODO: cmp/jcc chain for the three-way test
    nop
    ret

_start:
    mov rdi, [x]
    call classify
    mov rdi, rax
    mov rax, 60
    syscall`,
      rubric: [
        { criterion: "Inverted conditions jump over the correct branch", points: 30 },
        { criterion: "Each branch returns its value in RAX", points: 30 },
        { criterion: "Call site follows the ABI", points: 20 },
        { criterion: "Clean labels and comments", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
