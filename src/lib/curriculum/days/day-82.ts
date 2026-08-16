import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Advanced ASM Techniques",
    subtitle: "RDTSC, performance counters, and CPUID",
    tags: ["advanced"],
    theory: {
      sections: [
        {
          heading: "RDTSC",
          content:
            "The RDTSC instruction reads the 64-bit Time-Stamp Counter into EDX:EAX. On modern CPUs the counter is invariant — it ticks at a fixed nominal frequency regardless of turbo or power state — which makes it the standard source for cycle-accurate timing. Because the out-of-order core can execute RDTSC early, you must serialize before it: on x86 you use LFENCE (CPUID also works but clobbers registers). RDTSCP, on the other hand, waits for preceding loads and returns the processor core ID in ECX, making it the preferred one-shot read.",
          codeExample: `; Measure a region in cycles (x86-64 NASM)
section .text
global _start

_start:
    ; Start timestamp
    lfence                ; serialize, then read the counter
    rdtsc
    shl rdx, 32
    or  rax, rdx          ; rax = start cycles
    mov rbx, rax          ; keep start in a callee-saved reg

    ; Region under measurement: a small loop
    mov rcx, 1000
.loop:
    dec rcx
    jnz .loop

    ; End timestamp
    lfence
    rdtsc
    shl rdx, 32
    or  rax, rdx          ; rax = end cycles
    sub rax, rbx          ; rax = elapsed cycles

    mov rax, 60
    xor rdi, rdi
    syscall`,
        },
        {
          heading: "Performance Counters",
          content:
            "Beyond the TSC, every modern x86-64 core has hardware performance counters that count specific events: instructions retired, cache misses, branch mispredictions, and dozens more. The counters are Model-Specific Registers (MSRs) — IA32_PERF_GLOBAL_CTRL and the PERFEVTSEL/perfctr pairs — and they are privileged: user programs reach them only through an OS interface such as Linux perf_event_open. Reading counters with RDPMC directly is only allowed if CR4.PCE is set and the MSR select is programmed in IA32_PERF_USER_ENABLE.",
        },
        {
          heading: "CPUID",
          content:
            "CPUID is the canonical way to discover what a CPU actually supports before you use an instruction. You set a leaf in EAX, an optional subleaf in ECX, and CPUID returns vendor string, family/model, and a dense matrix of feature bits in ECX and EDX. Bits gate everything from AVX-512 and RDRAND to invariant TSC and SGX. On x86-64, CPUID is always available, and the leaf-0 vendor check is a reliable way to confirm you are not executing on a translator or emulator that lacks the real ISA.",
        },
      ],
    },
    playground: {
      defaultCode: `; x86-64 NASM syntax
section .text
global _start

_start:
    ; Read the timestamp counter once
    lfence
    rdtsc
    shl rdx, 32
    or  rax, rdx          ; rax = current cycle count

    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d82-q1", type: "quiz", title: "RDTSC",
        description: "Reading the timestamp counter accurately",
        question: "Why must you execute a serializing instruction such as LFENCE before RDTSC?",
        options: [
          { id: "a", text: "To flush the store buffer so the counter matches memory state", correct: false },
          { id: "b", text: "To stop the out-of-order core from executing RDTSC before the measured region", correct: true },
          { id: "c", text: "To prevent RDTSC from faulting on older CPUs", correct: false },
          { id: "d", text: "To switch the counter to a fixed-frequency mode", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d82-q2", type: "quiz", title: "CPUID",
        description: "Discovering CPU features",
        question: "Where does CPUID return its feature bits?",
        options: [
          { id: "a", text: "In RAX and RBX only", correct: false },
          { id: "b", text: "On the stack via a push sequence", correct: false },
          { id: "c", text: "In ECX and EDX (and EBX for leaf 0's vendor string)", correct: true },
          { id: "d", text: "In the RFLAGS register", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d82-c1", type: "code", title: "Cycle Counter",
        description: "Measure elapsed cycles around a short region",
        starterCode: `section .text
global _start

_start:
    ; TODO: serializing start read: lfence + rdtsc, combine into rbx
    ; TODO: add a small delay loop here (e.g. 1000 iterations)
    ; TODO: serializing end read: lfence + rdtsc, combine into rax
    ; TODO: subtract start from end so rax holds elapsed cycles

    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["Combine the rdtsc pair with shl rdx, 32 / or rax, rdx", "Keep the start value in rbx (callee-saved)", "Subtract start from end with sub rax, rbx"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d82-a1", title: "Cycle Meter",
      description: "Build a NASM program that measures a nop-filled delay loop with RDTSC and prints the elapsed cycle count via sys_write. Use a fixed number of iterations so the answer is comparable across runs.",
      requirements: [
        "Use lfence + rdtsc before and after the measured loop",
        "Combine the EDX:EAX pair into a single 64-bit value in RAX",
        "Measure a loop of at least 10,000 nops",
        "Print the elapsed cycles as a decimal string using sys_write (rax=1)",
        "Comment each instruction that exists only for measurement accuracy",
      ],
      starterCode: `section .data
    buf   times 32 db 0      ; scratch for decimal digits

section .text
global _start

_start:
    ; TODO: start timestamp -> rbx
    ; TODO: delay loop of 10000 nops
    ; TODO: end timestamp -> rax, subtract rbx
    ; TODO: convert rax to decimal in buf, print via sys_write
    mov rax, 60
    xor rdi, rdi
    syscall`,
      rubric: [
        { criterion: "Correct start/end RDTSC with serialization", points: 30 },
        { criterion: "Accurate elapsed-cycle computation", points: 25 },
        { criterion: "Decimal conversion and sys_write output", points: 25 },
        { criterion: "Measurement-accuracy comments", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
