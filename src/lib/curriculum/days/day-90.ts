import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Advanced SIMD",
    subtitle: "AVX-512, packed operations, and vectorization",
    tags: ["simd"],
    theory: {
      sections: [
        {
          heading: "AVX-512",
          content:
            "AVX-512 widens the SIMD lane to 512 bits: each ZMM register holds sixteen 32-bit integers or floats, eight doubles, or sixty-four bytes, processed with one instruction. The new EVEX encoding adds 32 architectural registers (ZMM0-ZMM31), 8-bit compressed displacement for compact code, and — the defining feature — eight dedicated mask registers, k0-k7. It is not universally available: consumer chips ship it disabled or omitted, so the CPUID AVX512F bit is the gate before any ZMM instruction, and the operating system must have enabled the XCR0 extended-state bits or the first instruction faults.",
          codeExample: `; AVX-512 masked vector add (x86-64 NASM)
section .data
    a: dq 1, 2, 3, 4, 5, 6, 7, 8
    b: dq 8, 7, 6, 5, 4, 3, 2, 1
section .bss
    c: resq 8

section .text
global _start

_start:
    vmovdqu64 zmm0, [a]
    vmovdqu64 zmm1, [b]

    ; Predicate mask: only the low 4 lanes take part
    mov eax, 0x0F
    kmovd k1, eax

    ; {z} zeroes masked-off lanes; without it they keep old values
    vpaddq zmm2{k1}{z}, zmm0, zmm1
    vmovdqu64 [c], zmm2

    mov rax, 60
    xor rdi, rdi
    syscall`,
        },
        {
          heading: "Mask Registers",
          content:
            "The k registers turn a SIMD operation into a data-dependent one. A mask can come from a comparison instruction like vpcmpq, which writes a k register whose bits mark the lanes that passed, or from scalar code via kmovd/kor/kand. Syntax decides the semantics: {k1} is merge-masking — masked-off lanes keep their original value — while {k1}{z} is zero-masking, which zeroes them. Masks are also the natural output format for search and classification kernels, letting you find lanes without ever branching.",
        },
        {
          heading: "Packed Ops",
          content:
            "The real power of SIMD is that a single instruction processes a whole vector: vertical ops like vpaddq add lane to lane, while horizontal reductions vpshufd+vpaddq collapse a vector into one scalar. Vectorizing a loop means discovering that adjacent iterations touch adjacent memory and are independent — then the compiler, or you, transform the scalar trip into one vector trip. When the data is sparse, gather/scatter instructions (vpgatherqq, vpscatterqq) shuffle elements in and out of memory by an index vector, at the cost of non-contiguous access.",
        },
      ],
    },
    playground: {
      defaultCode: `; AVX-512 packed add with a mask (NASM)
section .data
    a: dq 1, 2, 3, 4, 5, 6, 7, 8
    b: dq 8, 7, 6, 5, 4, 3, 2, 1
section .bss
    c: resq 8

section .text
global _start

_start:
    vmovdqu64 zmm0, [a]
    vmovdqu64 zmm1, [b]
    mov eax, 0x0F
    kmovd k1, eax
    vpaddq zmm2{k1}{z}, zmm0, zmm1
    vmovdqu64 [c], zmm2

    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d90-q1", type: "quiz", title: "AVX-512 Registers",
        description: "Register widths and count",
        question: "How wide are the AVX-512 ZMM registers and how many are architecturally available?",
        options: [
          { id: "a", text: "256 bits, 16 registers", correct: false },
          { id: "b", text: "512 bits, 32 registers", correct: true },
          { id: "c", text: "128 bits, 16 registers", correct: false },
          { id: "d", text: "1024 bits, 8 registers", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d90-q2", type: "quiz", title: "Masking",
        description: "Merge vs zero masking",
        question: "What is the difference between {k1} and {k1}{z} on an AVX-512 instruction?",
        options: [
          { id: "a", text: "{k1} halves the register width; {k1}{z} doubles it", correct: false },
          { id: "b", text: "{k1} only allows one lane; {k1}{z} all lanes", correct: false },
          { id: "c", text: "{k1} preserves masked-off lanes; {k1}{z} writes zero to them", correct: true },
          { id: "d", text: "They are identical — the braces are optional syntax", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d90-c1", type: "code", title: "Masked Vector Add",
        description: "Add the low 4 of 8 qwords with a mask",
        starterCode: `section .data
    a: dq 1, 2, 3, 4, 5, 6, 7, 8
    b: dq 8, 7, 6, 5, 4, 3, 2, 1
section .bss
    c: resq 8

section .text
global _start

_start:
    ; TODO: load a into zmm0, b into zmm1
    ; TODO: build mask k1 = 0x0F via mov eax / kmovd
    ; TODO: vpaddq zmm2{k1}{z}, zmm0, zmm1 and store to c
    nop

    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["Use vmovdqu64 zmm0, [a]", "mov eax, 0x0F then kmovd k1, eax", "Store the result with vmovdqu64 [c], zmm2"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d90-a1", title: "Masked Vector Sum",
      description: "Sum sixteen 64-bit integers with AVX-512: load both vectors, add them with a full 16-lane mask, reduce the result to a single scalar with vpshufd/vpaddq, and compare the answer against a hand-computed scalar sum.",
      requirements: [
        "Two 16-element qword arrays in .data with known values",
        "vaddq (or vpaddq) over all 16 lanes using mask k1 = 0xFFFF",
        "Horizontal reduction to a scalar in rax using shifts and vpaddq",
        "Scalar reference loop (or documented expected value) to verify",
        "Comment the mask register's role in the reduction",
      ],
      starterCode: `section .data
    a: dq 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    b: dq 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2

section .text
global _start

_start:
    ; TODO: load a/b, vpaddq with k1=0xFFFF, reduce to rax
    ; expected scalar answer: 16 * 3 = 48
    mov rax, 60
    xor rdi, rdi
    syscall`,
      rubric: [
        { criterion: "Vectors loaded into ZMM registers", points: 30 },
        { criterion: "Full-mask packed add", points: 25 },
        { criterion: "Correct horizontal reduction to scalar", points: 25 },
        { criterion: "Result verified against expected value", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
