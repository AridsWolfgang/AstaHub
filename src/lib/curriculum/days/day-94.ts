import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Real-time Systems in ASM",
    subtitle: "Interrupt latency, deadlines, and deterministic code",
    tags: ["embedded"],
    theory: {
      sections: [
        {
          heading: "Interrupt Latency",
          content:
            "Interrupt latency is the time from the hardware asserting an interrupt line to the first instruction of the handler running. On x86 it includes the time to complete the current instruction, the interrupt acknowledge bus cycle, and pushing the return context before the vector's entry point executes. Long instructions — string ops, division, misaligned atomics — can be made interruptible, but their worst-case latency is what a real-time engineer must budget. The handler should be tiny: save the minimum context, service the hardware, acknowledge the interrupt, and return.",
          codeExample: `; x86 IDT entry for IRQ vector 0x20.
; The gate tells the CPU where the handler lives and the
; privilege level it runs at (0 = kernel).
;   48-bit offset: low 16 + high 32
;   selector:      0x08 (kernel code segment)
;   type:          DPL=0, present, 64-bit interrupt gate
; Minimal handler discipline:
;   push the registers you touch, service HW, write EOI
;   to the local APIC (0xFEE000B0), then pop and iretq.`,
        },
        {
          heading: "Determinism",
          content:
            "Deterministic code produces the same result in the same amount of time on every invocation. That means no dynamic memory allocation (malloc can block on the heap lock), no page faults (touch all pages at init), no branchy hot loops, and no variable-cost library calls. On bare metal you disable interrupts around critical sections and rely on a monotonic cycle counter like rdtsc for timing. The tightest loops are hand-written assembly precisely because the compiler can reintroduce non-deterministic memory operations behind your back.",
          codeExample: `; Constant-time compare: every branch is eliminated.
; Time to finish is independent of where the bytes differ.
; rsi = a, rdx = b, rcx = length; result in rax (0 = equal).
section .text
global ct_cmp
ct_cmp:
    xor eax, eax          ; accumulator for mismatches
.loop:
    test rcx, rcx
    jz .done
    movzx r8d, byte [rsi]
    movzx r9d, byte [rdx]
    xor r8d, r9d          ; 0 if bytes equal
    or eax, r8d           ; fold mismatch into rax
    inc rsi
    inc rdx
    dec rcx
    jmp .loop
.done:
    ret`,
        },
        {
          heading: "RTOS Concepts",
          content:
            "A real-time kernel schedules by deadline, not fairness. The task with the earliest deadline runs first (EDF), or a fixed-priority scheme lets the highest-priority runnable task preempt immediately. On x86, preemption happens on the timer interrupt (typically PIT or the local APIC timer), and the scheduler's context switch is a save/restore of the full register set — which is pure assembly. Priority inversion, where a low-priority task holds a lock a high-priority task needs, is solved with priority inheritance or priority ceiling protocols, both of which the scheduler enforces at the interrupt level.",
        },
      ],
    },
    playground: {
      defaultCode: `; Constant-time equality check (see theory section).
; Entry: rsi = a, rdx = b, rcx = len. Returns rax.
section .text
global ct_cmp
ct_cmp:
    xor eax, eax
.loop:
    test rcx, rcx
    jz .done
    movzx r8d, byte [rsi]
    movzx r9d, byte [rdx]
    xor r8d, r9d
    or eax, r8d
    inc rsi
    inc rdx
    dec rcx
    jmp .loop
.done:
    ret`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d94-q1", type: "quiz", title: "Interrupt Latency",
        description: "What makes up interrupt latency",
        question: "Which of these contributes to worst-case x86 interrupt latency?",
        options: [
          { id: "a", text: "The time to finish the currently executing instruction", correct: true },
          { id: "b", text: "The size of the instruction cache", correct: false },
          { id: "c", text: "The operating system's scheduler tick", correct: false },
          { id: "d", text: "The speed of the DRAM refresh cycle", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d94-q2", type: "quiz", title: "Determinism",
        description: "What breaks deterministic timing",
        question: "Why does dynamic memory allocation break real-time determinism?",
        options: [
          { id: "a", text: "malloc can take an unbounded, variable amount of time", correct: true },
          { id: "b", text: "malloc always faults the page table", correct: false },
          { id: "c", text: "malloc flushes the pipeline", correct: false },
          { id: "d", text: "malloc disables interrupts permanently", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d94-c1", type: "code", title: "Constant-time Compare",
        description: "Write a NASM function that compares two buffers in constant time — no early-exit branches, result is zero only when all bytes match.",
        starterCode: `section .text
global ct_cmp

; rdi = a, rsi = b, rdx = len ; return rax (0 if equal)
ct_cmp:
    ; TODO: fold every byte difference into an accumulator
    xor eax, eax
    nop
    ret`,
        hints: ["Loop over rdx bytes with a counter", "Xor matching bytes and OR them into the accumulator", "No branch on the byte comparison — only on the loop counter"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d94-a1", title: "Deterministic Byte Stream CRC",
      description: "Write an assembly routine that computes a 16-bit checksum over a fixed-size buffer using only loop-counter branches (no data-dependent branching), so execution time is independent of the data.",
      requirements: [
        "Fold each 16-bit word into the accumulator with add or xor",
        "Loop exactly length/2 times with a counter branch only",
        "No data-dependent conditional jumps anywhere in the loop",
        "Return the checksum in rax",
        "Annotate why the routine is deterministic despite the loop",
      ],
      starterCode: `section .text
global checksum16

; rdi = buffer, rsi = length (multiple of 2)
; returns 16-bit checksum in ax
checksum16:
    xor eax, eax
    ; TODO: accumulate words, fixed loop count
    ret`,
      rubric: [
        { criterion: "Correct accumulation of words", points: 30 },
        { criterion: "Fixed loop count, no data-dependent branches", points: 30 },
        { criterion: "Correct return value in ax", points: 20 },
        { criterion: "Determinism annotated in comments", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
