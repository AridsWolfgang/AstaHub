import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "SIMD Intro",
    subtitle: "Vector operations with SSE/AVX",
    tags: ["simd"],
    theory: {
      sections: [
        {
          heading: "Parallel Ops",
          content:
            "SIMD — Single Instruction, Multiple Data — makes one instruction operate on many values at once. Packed SSE instructions view a 128-bit XMM register as lanes: addps adds four 32-bit floats simultaneously, addpd two doubles, paddd four 32-bit integers. The AVX forms (vaddps, vpaddd) use the 256-bit YMM registers and double the lane count. Throughput is charged per instruction, so one vaddps processes eight numbers at roughly the cost of a single scalar add — eight operations for the price of one.",
          codeExample: `; vaddps: eight float adds in one instruction
section .data
    a times 8 dd 1.0
    b times 8 dd 2.0

section .text
global _start

_start:
    vmovups ymm0, [a]        ; load 8 floats
    vaddps  ymm1, ymm0, [b]  ; 8 parallel adds
    ; ymm1 now holds 3.0 in every lane
    vzeroupper               ; avoid AVX-SSE transition stall
    xor edi, edi
    mov eax, 60
    syscall`,
        },
        {
          heading: "128/256-bit",
          content:
            "SSE operates on 128 bits: 4 floats, 2 doubles, 4 int32s, or 16 bytes. AVX doubles it to 256 bits — 8 floats or 4 doubles — and AVX-512 quadruples to 512 bits with 16 floats. The register widths nest: XMM0 is the low half of YMM0, which is the low half of ZMM0. Memory moves come in aligned and unaligned flavors — movaps faults on a misaligned address while movups never does — and AVX adds vmovups for 256-bit loads.",
        },
        {
          heading: "Use Cases",
          content:
            "SIMD pays off wherever a stream of homogeneous numbers can be processed independently: image filters and audio DSP treat every pixel or sample as a lane; matrix and dot-product math repeat the same operation across rows; string scanning compares 16 or 32 bytes at once with pcmpeqb plus pmovmskb; checksums and crypto (SHA, AES-NI, CRC32) are SIMD in disguise. The decisive test is lane independence — if element i never needs element i-1's result, the loop is a SIMD candidate.",
        },
      ],
    },
    playground: {
      defaultCode: `; packed float addition with SSE
section .data
    a dd 1.0, 2.0, 3.0, 4.0
    b dd 4.0, 3.0, 2.0, 1.0

section .text
global _start

_start:
    movaps xmm0, [a]        ; load 4 floats
    addps  xmm0, [b]        ; 4 parallel adds
    cvttss2si rax, xmm0     ; low lane: 1+4 = 5
    mov rdi, rax
    mov rax, 60
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d69-q1", type: "quiz", title: "addps Throughput",
        description: "How many lanes per instruction",
        question: "How many 32-bit floats does addps process in a single instruction?",
        options: [
          { id: "a", text: "1 — it is scalar", correct: false },
          { id: "b", text: "4 — one per 32-bit lane of a 128-bit register", correct: true },
          { id: "c", text: "8 — one per lane of a 256-bit register", correct: false },
          { id: "d", text: "16 — one per lane of a 512-bit register", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d69-q2", type: "quiz", title: "Aligned Fault",
        description: "When movaps faults",
        question: "Under what condition does movaps raise a #GP fault?",
        options: [
          { id: "a", text: "When its memory operand is not 16-byte aligned", correct: true },
          { id: "b", text: "When the register is YMM instead of XMM", correct: false },
          { id: "c", text: "When the data contains a negative float", correct: false },
          { id: "d", text: "When the vector has mixed float and int lanes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d69-c1", type: "code", title: "Horizontal Sum",
        description: "Sum all four lanes of a vector into the low lane",
        starterCode: `section .data
    vals dd 1.0, 2.0, 3.0, 4.0

section .text
global _start

_start:
    ; TODO: load vals into xmm0, reduce all four lanes to
    ; a single sum (10.0) in the low lane, convert with
    ; cvttss2si, and exit with it (10)
    nop
    mov rdi, rax
    mov rax, 60
    syscall`,
        hints: ["movaps xmm0, [vals] loads all four floats", "Use pshufd to shuffle lanes so you can add low and high halves together", "cvttss2si reads only the low lane"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d69-a1", title: "Element-Wise Max",
      description: "Write a NASM program that loads two 4-float vectors from .data with aligned movaps, computes the element-wise maximum with maxps, converts the low lane to an integer with cvttss2si, and exits with that value as the exit code.",
      requirements: [
        "Two 4-float vectors declared in .data",
        "Load both with movaps (16-byte aligned operands)",
        "Compute element-wise maximum with maxps",
        "Convert the low lane result with cvttss2si",
        "Exit with the truncated value as the exit code",
      ],
      starterCode: `section .data
    a dd 1.0, 9.0, 4.0, 7.0
    b dd 5.0, 2.0, 8.0, 3.0

section .text
global _start

_start:
    ; TODO: element-wise max of a and b into xmm0,
    ; truncate the low lane to int, and exit with it (5)
    nop
    mov rdi, rax
    mov rax, 60
    syscall`,
      rubric: [
        { criterion: "Aligned movaps loads of both vectors", points: 25 },
        { criterion: "maxps element-wise comparison", points: 30 },
        { criterion: "cvttss2si truncating conversion", points: 20 },
        { criterion: "Correct exit code from the low lane", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
