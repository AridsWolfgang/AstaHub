import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Floating Point",
    subtitle: "SSE/AVX registers and float ops",
    tags: ["float"],
    theory: {
      sections: [
        {
          heading: "XMM Registers",
          content:
            "x86-64 floating point lives in the SSE registers, not the legacy x87 stack. There are sixteen XMM registers (XMM0–XMM15), each 128 bits wide; AVX renames the same hardware as 256-bit YMM registers and AVX-512 widens to 512-bit ZMM. The SysV ABI passes floating-point arguments in XMM0–XMM7 and returns them in XMM0. Memory operands for the aligned move forms must be 16-byte aligned — a misaligned movaps raises a #GP fault.",
        },
        {
          heading: "movss/addss",
          content:
            "Scalar SSE instructions operate on a single value in the low lanes of an XMM register. movss copies a 32-bit float (the low dword, zeroing the upper bits); addss, subss, mulss, divss, and sqrtss compute a scalar result into the low dword. Double precision follows the same scheme with movsd and addsd — one value per register, in the low 64 bits. This is precisely what a C compiler emits for float and double arithmetic, so reading a float calculation in disassembly is just decoding these XMM operations.",
          codeExample: `; float f = 2.5f + 1.5f  ->  4.0
section .data
    a dd 2.5
    b dd 1.5

section .text
global _start

_start:
    movss xmm0, [a]     ; load float a
    addss xmm0, [b]     ; xmm0 = a + b
    cvttss2si rax, xmm0 ; truncate 4.0 -> 4
    mov rdi, rax
    mov rax, 60
    syscall`,
        },
        {
          heading: "cvt",
          content:
            "Conversions move data between the integer and floating domains. cvtsi2ss and cvtsi2sd convert an integer register into a float or double; cvtss2si and cvtsd2si convert back, rounding to nearest; the double-t forms cvttss2si and cvttsd2si truncate toward zero instead. The conversion is a genuine instruction because the data physically crosses from GPR to XMM. Varargs complicates this: when a function uses floating-point variadic arguments, AL must hold the number of vector registers carrying them.",
        },
      ],
    },
    playground: {
      defaultCode: `; scalar SSE float arithmetic
section .data
    a dd 2.5
    b dd 1.5

section .text
global _start

_start:
    movss xmm0, [a]
    addss xmm0, [b]     ; 4.0
    cvttss2si rax, xmm0 ; truncate to 4
    mov rdi, rax
    mov rax, 60
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d68-q1", type: "quiz", title: "Float Arguments",
        description: "Where floats travel in the ABI",
        question: "Which registers carry floating-point arguments under the System V AMD64 ABI?",
        options: [
          { id: "a", text: "RAX through RDX", correct: false },
          { id: "b", text: "XMM0 through XMM7", correct: true },
          { id: "c", text: "The x87 stack top", correct: false },
          { id: "d", text: "R8 through R15", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d68-q2", type: "quiz", title: "Truncating Convert",
        description: "cvt vs cvtt",
        question: "How does cvttss2si differ from cvtss2si?",
        options: [
          { id: "a", text: "It truncates toward zero instead of rounding", correct: true },
          { id: "b", text: "It rounds to nearest instead of truncating", correct: false },
          { id: "c", text: "It converts to double instead of int", correct: false },
          { id: "d", text: "It operates on the high lane instead of the low lane", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d68-c1", type: "code", title: "Float Average",
        description: "Compute (x + y) / 2 in scalar SSE and exit with the truncated result",
        starterCode: `section .data
    x dd 10.0
    y dd 4.0

section .text
global _start

_start:
    ; TODO: compute (x + y) / 2 as a float, convert the
    ; result to int with truncation, and exit with it (7)
    nop
    mov rdi, rax
    mov rax, 60
    syscall`,
        hints: ["movss loads, addss sums, divss divides by 2.0", "A divisor literal must live in memory (NASM: dd 2.0)", "cvttss2si truncates toward zero"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d68-a1", title: "Scalar Float Pipeline",
      description: "Write a NASM program that loads three float constants from .data, computes their average in XMM0 using only scalar SSE (movss/addss/divss), converts it to an integer with cvttss2si, and exits with that value as the exit code.",
      requirements: [
        "Declare at least three float constants in .data",
        "Use only scalar SSE — movss, addss, divss",
        "Accumulate the average in XMM0",
        "Convert with cvttss2si (truncating)",
        "Exit with the truncated average as the exit code",
      ],
      starterCode: `section .data
    f1 dd 10.5
    f2 dd 20.5
    f3 dd 30.0
    three dd 3.0

section .text
global _start

_start:
    ; TODO: average f1, f2, f3 in xmm0, truncate to int,
    ; and exit with it (20)
    nop
    mov rdi, rax
    mov rax, 60
    syscall`,
      rubric: [
        { criterion: "Three floats loaded with movss", points: 25 },
        { criterion: "Sum and divide accumulate in XMM0", points: 30 },
        { criterion: "cvttss2si truncating conversion", points: 25 },
        { criterion: "Exit code wired from the result", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
