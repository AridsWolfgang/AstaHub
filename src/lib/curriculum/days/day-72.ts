import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Optimizing Assembly",
    subtitle: "Instruction selection and pipelining",
    tags: ["optimization"],
    theory: {
      sections: [
        {
          heading: "Pipeline Stalls",
          content:
            "Modern x86 CPUs are deeply pipelined: an instruction's fetch, decode, execute, and write-back stages overlap across many instructions in flight. A stall happens when an instruction cannot proceed because a resource it needs is busy — most often a dependency on a result that is still being computed. The classic example is using the result of a division or a load in the very next instruction. Reordering independent work so it fills the gap between a slow instruction and its consumer is the core of instruction scheduling. Adding just a few independent operations between a slow load and its use can hide the entire latency.",
        },
        {
          heading: "Branch Prediction",
          content:
            "The CPU predicts the outcome of every conditional jump and speculatively executes the guessed path. When the prediction is wrong, the entire pipeline is flushed and refilled — a misprediction costs roughly 15-20 cycles on modern cores, often more than the branch body itself. Predictable loops (running to a fixed count) are predicted almost perfectly by the branch predictor's pattern history. The lesson for assembly writers: keep branches predictable, prefer straight-line code for hot paths, and use conditional moves (CMOV) or branchless arithmetic where a rare branch would be too costly to guess.",
        },
        {
          heading: "Loop Unrolling",
          content:
            "Loop unrolling replicates the loop body several times and increments the counter by more than one each pass. This reduces the per-iteration overhead (compare + jump) and gives the scheduler more independent instructions to hide latencies with. A 4x unrolled loop does four bodies then one decrement-and-branch instead of four jumps. The trade-offs are code size, I-cache pressure, and the awkward remainder — when the trip count is not a multiple of the unroll factor you need a prologue or an epilogue to handle the leftover iterations.",
          codeExample: `; unrolled: process 4 elements per iteration
section .data
    nums dd 1, 2, 3, 4, 5, 6, 7, 8
    count equ 8

section .text
global _start
_start:
    xor eax, eax          ; sum = 0
    mov rsi, nums
    mov rcx, 2            ; count / 4
loop_4:
    add eax, [rsi]
    add eax, [rsi+4]
    add eax, [rsi+8]
    add eax, [rsi+12]
    add rsi, 16           ; advance 4 dwords
    dec rcx
    jnz loop_4
    ; rax = sum of all 8 values
    nop`,
        },
      ],
    },
    playground: {
      defaultCode: `section .data
    nums dd 1, 2, 3, 4, 5, 6, 7, 8
    count equ 8

section .text
global _start
_start:
    xor eax, eax
    mov rsi, nums
    mov rcx, 2
loop_4:
    add eax, [rsi]
    add eax, [rsi+4]
    add eax, [rsi+8]
    add eax, [rsi+12]
    add rsi, 16
    dec rcx
    jnz loop_4
    nop`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d72-q1", type: "quiz", title: "Misprediction Cost",
        description: "The price of a wrong guess",
        question: "What happens to the pipeline when a branch is mispredicted?",
        options: [
          { id: "a", text: "Nothing — the branch executes normally", correct: false },
          { id: "b", text: "The pipeline is flushed and refilled", correct: true },
          { id: "c", text: "The CPU slows its clock temporarily", correct: false },
          { id: "d", text: "Only the next instruction is skipped", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d72-q2", type: "quiz", title: "Unrolling Trade-off",
        description: "What unrolling buys and costs",
        question: "What is the main drawback of aggressive loop unrolling?",
        options: [
          { id: "a", text: "It always makes code slower", correct: false },
          { id: "b", text: "Larger code footprint and I-cache pressure", correct: true },
          { id: "c", text: "It breaks the ABI", correct: false },
          { id: "d", text: "It requires 64-bit registers", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d72-c1", type: "code", title: "Unroll a Sum",
        description: "Sum an array of 8 dwords with a 2x unrolled loop",
        starterCode: `section .data
    nums dd 10, 20, 30, 40, 50, 60, 70, 80

section .text
global _start
_start:
    ; TODO: sum all 8 values with a 2x unrolled loop
    ; (process 2 dwords per iteration, 4 iterations)
    nop
    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["Add [rsi] and [rsi+4] per iteration", "Advance rsi by 8 and loop 4 times", "The final sum is 360"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d72-a1", title: "Branchless Max",
      description: "Write a NASM routine that returns the maximum of two integers using CMOV (conditional move) instead of a branch, then a second version using an explicit jump, and reason about when each wins.",
      requirements: [
        "Implement max(a, b) with CMOVG (branchless)",
        "Implement the same function with a CMP + JG branch",
        "Both take arguments in RDI/RSI and return in RAX",
        "Comment each explaining the branch-prediction story",
        "Include a small driver that exercises both paths",
      ],
      starterCode: `; int max_cmov(int a, int b)
; a in edi, b in esi, result in eax
max_cmov:
    mov eax, edi
    cmp edi, esi
    ; TODO: cmovg eax, esi if edi > esi
    ret

section .text
global _start
_start:
    nop`,
      rubric: [
        { criterion: "Branchless max with CMOVG", points: 30 },
        { criterion: "Branched max with CMP + JG", points: 25 },
        { criterion: "Correct SysV argument/return handling", points: 25 },
        { criterion: "Clear comments on prediction trade-offs", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
