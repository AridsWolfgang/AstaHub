import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "x86-64 Calling Convention",
    subtitle: "System V AMD64 ABI in detail",
    tags: ["abi"],
    theory: {
      sections: [
        {
          heading: "Register Arguments",
          content:
            "The System V AMD64 ABI is the contract every C compiler and assembler on Linux and BSD follows. Integer and pointer arguments are passed left-to-right in RDI, RSI, RDX, RCX, R8, R9 — the first six — and anything beyond the sixth goes on the stack. Floating-point arguments use XMM0 through XMM7 instead, and a function returns its result in RAX (with RDX for 128-bit results). The syscall ABI is deliberately different: arguments land in RDI, RSI, RDX, R10, R8, R9, because the syscall instruction itself clobbers RCX.",
        },
        {
          heading: "Stack Alignment",
          content:
            "The stack must remain 16-byte aligned at every call boundary. call pushes an 8-byte return address, so the callee always enters with RSP ≡ 8 (mod 16). A function that calls others must size its own frame so that immediately before each call RSP is a multiple of 16 — otherwise the callee's aligned SSE moves fault. The canonical prologue pushes RBP (which restores alignment), copies RSP to RBP, then subtracts a multiple of 16 for locals.",
          codeExample: `; int add3(int a, int b, int c) { return a + b + c; }
; SysV: a->edi, b->esi, c->edx, result in eax
add3:
    push rbp
    mov  rbp, rsp
    add  edi, esi        ; a + b
    lea  eax, [rdi + rdx] ; (a + b) + c
    pop  rbp
    ret`,
        },
        {
          heading: "Red Zone",
          content:
            "The red zone is the 128 bytes below RSP that a leaf function may use without adjusting RSP at all. The ABI guarantees nothing will clobber that region — no signal handler, no debugger — so a leaf can spill a temporary to [rsp-8] or [rsp-120] with zero stack traffic. The privilege dies at the first call instruction: once you call another function, that function's own frame can land in your red zone, so any value stored there must be consumed before the call. This is why only true leaf functions benefit from it.",
        },
      ],
    },
    playground: {
      defaultCode: `; x86-64 NASM — SysV calling convention
section .text
global _start

; int triple(int x) -> returns 3*x in rax (leaf, uses red zone)
triple:
    lea rax, [rdi + rdi*2]   ; x + 2x = 3x
    ret

_start:
    mov rdi, 7               ; first arg in RDI
    call triple              ; rax = 21
    mov rdi, rax
    mov rax, 60              ; sys_exit(21)
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d63-q1", type: "quiz", title: "First Argument",
        description: "Where does the first integer argument land",
        question: "In the System V AMD64 ABI, which register receives the first integer or pointer argument?",
        options: [
          { id: "a", text: "RAX", correct: false },
          { id: "b", text: "RCX", correct: false },
          { id: "c", text: "RDI", correct: true },
          { id: "d", text: "R8", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d63-q2", type: "quiz", title: "The Red Zone",
        description: "When the red zone can be touched",
        question: "Who may legally use the 128-byte red zone below RSP?",
        options: [
          { id: "a", text: "Any function, at any time", correct: false },
          { id: "b", text: "Only leaf functions that never call another function", correct: true },
          { id: "c", text: "Only interrupt handlers", correct: false },
          { id: "d", text: "Only functions compiled with -O0", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d63-c1", type: "code", title: "Convention-Compliant Call",
        description: "Write a function and call it following the SysV ABI",
        starterCode: `section .text
global _start

; TODO: write double7(int x) that returns 7*x in RAX
; following the SysV ABI (arg in RDI, result in RAX)
double7:
    nop

_start:
    mov rdi, 7
    call double7        ; rax should be 49
    mov rdi, rax
    mov rax, 60         ; sys_exit(49)
    syscall`,
        hints: ["The argument arrives in RDI", "The result must be returned in RAX", "This leaf function can use the red zone instead of a prologue"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d63-a1", title: "max3 by the Book",
      description: "Implement a NASM function max3(int a, int b, int c) that follows the System V ABI exactly — arguments in RDI/RSI/RDX, full prologue and epilogue, result in RAX — then call it from _start with three literal values and exit with the returned maximum.",
      requirements: [
        "Read the three arguments from RDI, RSI, and RDX",
        "Use a full prologue (push rbp; mov rbp, rsp) and matching epilogue",
        "Return the maximum of the three in RAX",
        "Call it from _start with three literal values",
        "Exit with the function result as the exit code",
      ],
      starterCode: `section .text
global _start

; int max3(int a, int b, int c)
max3:
    push rbp
    mov  rbp, rsp
    ; TODO: pick the max of edi, esi, edx into eax
    pop  rbp
    ret

_start:
    mov rdi, 42
    mov rsi, 17
    mov rdx, 99
    call max3
    mov rdi, rax
    mov rax, 60
    syscall`,
      rubric: [
        { criterion: "Correct prologue and epilogue", points: 25 },
        { criterion: "Max logic across all three registers", points: 35 },
        { criterion: "Call site passes args per the ABI", points: 20 },
        { criterion: "Exit code wired from the return value", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
