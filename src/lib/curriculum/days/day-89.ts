import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Memory Barriers & Ordering",
    subtitle: "MFENCE, SFENCE, LFENCE and weak ordering",
    tags: ["concurrency"],
    theory: {
      sections: [
        {
          heading: "Memory Ordering",
          content:
            "The x86 memory model is TSO (Total Store Order): loads are never reordered with other loads, stores never with other stores, and a store becomes visible to all cores in program order. But one reordering is legal — a load may be served from a core's store buffer before an earlier store becomes visible, so a store followed by a load can appear reversed to the outside world. That single crack is where the classic deadlock between two threads comes from, and it is the reason fence instructions exist at all.",
          codeExample: `; x86-64 fence instructions (NASM)
section .data
    flag  dq 0
    data  dq 0

section .text
global _start

; Publishing thread: write data, then publish the flag
publisher:
    mov qword [data], 42
    mfence                ; order the store below against the store above
    mov qword [flag], 1
    ret

; Consumer thread: spin on the flag, then read data
consumer:
.spin:
    mov rax, [flag]
    test rax, rax
    jz .spin
    mov rax, [data]       ; sees 42 only if the fence held
    ret`,
        },
        {
          heading: "Fence Instructions",
          content:
            "MFENCE, SFENCE, and LFENCE are the explicit barriers. MFENCE orders both loads and stores — nothing crosses it in either direction. SFENCE orders stores only, which is what you use before publishing a buffer to a device or another core. LFENCE orders loads and also serializes instruction fetch, which is why it doubles as the RDTSC gate from the timing days. A compiler barrier is different: asm volatile(\"\" ::: \"memory\") stops reordering by the compiler but costs zero CPU instructions, so it is worthless against the store buffer — only a real fence flushes that.",
        },
        {
          heading: "Store Buffer",
          content:
            "A core never waits for a store to land in memory — it writes into a small store buffer and drains it later. That is the mechanical source of store-to-load reordering: a later load of a different address can pass the buffered store and be served immediately, long before the store drains. Cache coherence (MESI) guarantees that once a store becomes globally visible it is seen by every core, but it says nothing about when. Fences exist to force ordering; hardware handles visibility. Understand the split and your lock-free code stops being folklore.",
        },
      ],
    },
    playground: {
      defaultCode: `; Fence demo: publish a value with an mfence
section .data
    flag dq 0
    data dq 0

section .text
global _start

_start:
    mov qword [data], 42
    mfence
    mov qword [flag], 1
    ; consumer would now observe data == 42
    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d89-q1", type: "quiz", title: "TSO",
        description: "What x86 is allowed to reorder",
        question: "Which reordering does the x86 TSO model permit?",
        options: [
          { id: "a", text: "A load executing before an earlier store of a different address becomes visible", correct: true },
          { id: "b", text: "Two loads swapping order", correct: false },
          { id: "c", text: "Two stores becoming visible in reversed order", correct: false },
          { id: "d", text: "A store being discarded entirely", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d89-q2", type: "quiz", title: "Fences",
        description: "Which barrier for which job",
        question: "Which fence orders stores only and is used before publishing data to another core or device?",
        options: [
          { id: "a", text: "MFENCE", correct: false },
          { id: "b", text: "SFENCE", correct: true },
          { id: "c", text: "LFENCE", correct: false },
          { id: "d", text: "A compiler barrier asm volatile(\"\" ::: \"memory\")", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d89-c1", type: "code", title: "Publish Barrier",
        description: "Write a producer/consumer handshake with a fence",
        starterCode: `section .data
    flag dq 0
    data dq 0

section .text
global _start

producer:
    ; TODO: write 42 to [data], then mfence, then set [flag]=1
    ret

consumer:
    ; TODO: spin while [flag]==0, then load [data] into rax
    ret

_start:
    call producer
    call consumer
    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["Fence goes between the data store and the flag store", "Spin with test rax, rax / jz .spin", "Without mfence, the consumer could see flag=1 but stale data"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d89-a1", title: "Ordering Black Box",
      description: "Implement a complete producer/consumer handshake: the producer writes a payload, fences, then publishes a ready flag; the consumer spins on the flag and reads the payload. Annotate every ordering guarantee and explain why the same code without the fence is broken on real hardware.",
      requirements: [
        "Producer stores a payload, executes mfence, then stores a ready flag",
        "Consumer spins on the ready flag using test/jz and reads the payload",
        "A second variant uses sfence in the producer and explains its limits",
        "Comments cite which reordering each fence prevents",
        "Explain why a compiler barrier alone is insufficient here",
      ],
      starterCode: `section .data
    ready dq 0
    payload dq 0

section .text
global _start

producer:
    ; TODO: payload=42, mfence, ready=1
    ret

consumer:
    ; TODO: spin on ready, then move payload into rax
    ret

_start:
    call producer
    call consumer
    ; rax should hold 42 on correctly ordered hardware
    mov rax, 60
    xor rdi, rdi
    syscall`,
      rubric: [
        { criterion: "Producer orders payload before flag", points: 30 },
        { criterion: "Consumer spin loop correct", points: 20 },
        { criterion: "sfence variant with accurate limits", points: 25 },
        { criterion: "Ordering guarantees explained", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
