import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Arrays in Assembly",
    subtitle: "Contiguous memory traversal",
    tags: ["arrays"],
    theory: {
      sections: [
        {
          heading: "Base Address",
          content:
            "An array is a base address plus an index. arr[i] resolves to base + i * stride, and x86-64 has a dedicated addressing mode for exactly that shape: [base + index*scale + disp]. The base register holds the array's start, the index register holds i, and the scale encodes the stride. The SIB byte limits scale to 1, 2, 4, or 8, which covers every C type from char to double. In NASM that mode looks like mov eax, [rbx + rcx*4].",
        },
        {
          heading: "Stride",
          content:
            "Stride is the byte size of one element, and it drives both the scale factor and the pointer increments in a traversal loop. A char array has stride 1 (scale 1), an int array stride 4 (scale 4), a long or double array stride 8 (scale 8). When you read a disassembly and see a pointer incremented by 4 inside a loop, you are looking at an int array. Compilers eliminate the per-element multiply by folding it into the addressing mode or into pointer increments, which is why a mul instruction rarely appears in array code.",
          codeExample: `; int arr[4] = {10, 20, 30, 40};
; sum the elements into eax (answer: 100)
section .data
    arr dd 10, 20, 30, 40
    n   equ 4

section .text
global _start

_start:
    xor  eax, eax          ; sum = 0
    lea  rsi, [arr]        ; base address
    xor  ecx, ecx          ; index i
.loop:
    cmp  ecx, n
    jge  .done
    add  eax, [rsi + rcx*4] ; base + i*4
    inc  ecx
    jmp  .loop
.done:
    ; eax == 100
    mov  edi, eax
    mov  eax, 60
    syscall`,
        },
        {
          heading: "Bounds",
          content:
            "The CPU performs no bounds checking whatsoever — address anything and it will read or write whatever memory happens to be there. One out-of-bounds index can walk past the array into the stack frame, clobber a saved return address, or, in ring 0, read privileged memory. You are the bounds checker: compare your index or pointer against the element count before every dereference, and remember the limits are element counts, not byte counts. strcpy-style classic exploits exist precisely because C trusts the caller here, and assembly trusts nobody.",
        },
      ],
    },
    playground: {
      defaultCode: `; walking a dword array with base + index*scale
section .data
    arr dd 10, 20, 30, 40
    n   equ 4

section .text
global _start

_start:
    xor  eax, eax
    lea  rsi, [arr]
    xor  ecx, ecx
.loop:
    cmp  ecx, n
    jge  .done
    add  eax, [rsi + rcx*4]
    inc  ecx
    jmp  .loop
.done:
    mov  edi, eax
    mov  eax, 60
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d65-q1", type: "quiz", title: "The Addressing Mode",
        description: "How arr[i] is encoded",
        question: "For an array of int (4-byte elements), which addressing mode does the CPU use to access arr[i]?",
        options: [
          { id: "a", text: "base + index*scale, with scale = 4", correct: true },
          { id: "b", text: "base + scale*index, with scale = 8", correct: false },
          { id: "c", text: "A multiply then a single move", correct: false },
          { id: "d", text: "index alone, scale is implicit", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d65-q2", type: "quiz", title: "Who Checks Bounds",
        description: "The nature of the metal",
        question: "In assembly, what enforces array bounds?",
        options: [
          { id: "a", text: "The hardware raises #PF on any out-of-bounds index", correct: false },
          { id: "b", text: "The assembler inserts bounds checks", correct: false },
          { id: "c", text: "Nothing — bounds checking is the programmer's job", correct: true },
          { id: "d", text: "The kernel validates every memory operand", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d65-c1", type: "code", title: "Byte-Array Max",
        description: "Find the largest byte in a char array (stride 1)",
        starterCode: `section .data
    vals db 5, 12, 3, 42, 17, 8
    n    equ 6

section .text
global _start

_start:
    ; TODO: find the largest value in vals and
    ; exit with it as the exit code (42)
    nop
    mov rdi, rax
    mov rax, 60
    syscall`,
        hints: ["Elements are one byte each — index them with scale 1", "Walk with a pointer or index and a running maximum", "Keep the larger with cmov or a conditional jump"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d65-a1", title: "Reverse In Place",
      description: "Write a NASM program that reverses an 8-element dword array in place using two pointers — one at the start, one at the end — swapping elements until they cross, then exits with the new arr[0] as the exit code (8).",
      requirements: [
        "Two pointers, one at the start and one at the end of the array",
        "Swap loop using stride 4 for every access",
        "Stop when the pointers cross or meet",
        "Use a temporary register (or stack slot) for each swap",
        "Exit with arr[0] after the reversal — it must be 8",
      ],
      starterCode: `section .data
    arr dd 1, 2, 3, 4, 5, 6, 7, 8
    n   equ 8

section .text
global _start

_start:
    ; TODO: reverse arr in place with two pointers.
    ; Then load arr[0] into rax and exit with it.
    nop
    mov rdi, rax
    mov rax, 60
    syscall`,
      rubric: [
        { criterion: "Two-pointer loop that crosses correctly", points: 30 },
        { criterion: "Stride-4 access on every element", points: 25 },
        { criterion: "Swap uses a temporary correctly", points: 25 },
        { criterion: "Exit code is the reversed arr[0] (8)", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
