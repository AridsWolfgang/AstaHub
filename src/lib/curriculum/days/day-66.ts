import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Structs in Assembly",
    subtitle: "Accessing struct members by offset",
    tags: ["structs"],
    theory: {
      sections: [
        {
          heading: "Member Offsets",
          content:
            "A struct is just a fixed-size blob of memory; the compiler assigns each member a byte offset from the base. For struct P { char c; int i; }, c sits at offset 0 and i at offset 4. You access members in assembly by adding the constant offset to the base: mov eax, [rbx + 4] reads member i. At the machine level there are no names — only offsets — so the first step in any struct disassembly is reconstructing the layout from the constant displacements on memory operands.",
        },
        {
          heading: "Padding",
          content:
            "The compiler inserts padding so every member is naturally aligned to its own size: an int must live at an address divisible by 4, a double by 8. Field order in the source decides the layout, which is why reordering members largest-to-smallest usually shrinks the struct. Padding also extends the tail: sizeof(struct) may exceed the sum of member sizes because the struct pads at the end so arrays of it stay aligned. When you hand-lay a struct in assembly with db/dw/dd you must insert the same padding yourself.",
          codeExample: `; struct P { char c; int i; char d; }
; offsets: c=0, pad 1..3, i=4, d=8, tail pad 9..11 -> size 12
section .data
    p:  db 0x41        ; c   @ +0
        times 3 db 0   ; padding
        dd 5           ; i   @ +4
        db 0x42        ; d   @ +8

section .text
global _start

_start:
    lea rbx, [p]
    movzx eax, byte [rbx + 0]  ; p.c  (65)
    add  eax, [rbx + 4]        ; p.i  (+5)
    movzx ecx, byte [rbx + 8]  ; p.d  (66)
    add  eax, ecx              ; eax = 136
    mov edi, eax
    mov eax, 60
    syscall`,
        },
        {
          heading: "Pointer to Struct",
          content:
            "A pointer to a struct is a base address; every member is a load at base + constant. Passing a struct by pointer puts that address in RDI, and the callee reads members relative to it. Passing by value is different: the SysV ABI classifies a small struct's fields into integer registers — a two-int struct arrives in RDI and RSI — while a large one spills onto the stack. In disassembly, the pattern of constant offsets like [rdi+8] or [rax+16] is the tell: each distinct offset is a distinct member access.",
        },
      ],
    },
    playground: {
      defaultCode: `; struct access by offset
; struct P { char c; int i; char d; }  size 12
section .data
    p:  db 0x41
        times 3 db 0
        dd 5
        db 0x42

section .text
global _start

_start:
    lea rbx, [p]
    movzx eax, byte [rbx + 0]
    add  eax, [rbx + 4]
    movzx ecx, byte [rbx + 8]
    add  eax, ecx
    mov edi, eax
    mov eax, 60
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d66-q1", type: "quiz", title: "Offset Math",
        description: "Where the int lands",
        question: "For struct P { char c; int i; }, what is the byte offset of member i?",
        options: [
          { id: "a", text: "0 — it follows c immediately", correct: false },
          { id: "b", text: "1", correct: false },
          { id: "c", text: "4 — after 3 bytes of padding", correct: true },
          { id: "d", text: "8 — after a double boundary", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d66-q2", type: "quiz", title: "Why Padding",
        description: "The reason for the gaps",
        question: "Why does the compiler insert padding between struct members?",
        options: [
          { id: "a", text: "So each member is naturally aligned to its own size", correct: true },
          { id: "b", text: "To make the struct a power-of-two size", correct: false },
          { id: "c", text: "To speed up memcpy with rep movsb", correct: false },
          { id: "d", text: "To randomize the layout for security", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d66-c1", type: "code", title: "Sum the Members",
        description: "Add up a struct's members using their offsets",
        starterCode: `section .data
    ; struct P { char c; int i; char d; }
    p: db 7
       times 3 db 0
       dd 100
       db 3

section .text
global _start

_start:
    ; TODO: compute p.c + p.i + p.d and exit with it (110)
    nop
    mov rdi, rax
    mov rax, 60
    syscall`,
        hints: ["c is a byte at offset 0, i is a dword at offset 4, d is a byte at offset 8", "Load the byte members with movzx to avoid sign extension", "Add the dword with a plain add"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d66-a1", title: "Rectangle Area",
      description: "Define a Rectangle { int w; int h; } in .data, then write a NASM function area_rect that takes a pointer to it in RDI and returns w * h in RAX using member offsets, call it, and exit with the area as the exit code.",
      requirements: [
        "Declare Rectangle with correct offsets (w at 0, h at 4)",
        "area_rect reads w and h through the pointer in RDI",
        "Compute the product with imul",
        "Follow the ABI: argument in RDI, result in RAX",
        "Exit with the area as the exit code",
      ],
      starterCode: `section .data
    ; struct Rectangle { int w; int h; }
    rect: dd 6
          dd 7

section .text
global _start

; int area_rect(Rectangle *r) -> w * h
area_rect:
    ; TODO: load [rdi + 0] and [rdi + 4], multiply,
    ; and return the product in rax
    nop
    ret

_start:
    lea rdi, [rect]
    call area_rect      ; rax should be 42
    mov rdi, rax
    mov rax, 60
    syscall`,
      rubric: [
        { criterion: "Correct member offsets in the data layout", points: 30 },
        { criterion: "imul computes the product", points: 25 },
        { criterion: "ABI-correct pointer argument and return", points: 25 },
        { criterion: "Exit code wired from the result", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
