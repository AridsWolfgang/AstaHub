import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Position-Independent Code",
    subtitle: "PIC, GOT, PLT, and shared libraries",
    tags: ["linking"],
    theory: {
      sections: [
        {
          heading: "PIC",
          content:
            "Position-independent code can be loaded at any virtual address because it never hard-codes absolute addresses. On x86-64 this is almost free: RIP-relative addressing lets any instruction reach data within a 2GB window of the current instruction pointer, so an object compiled with -fPIC references its own globals with lea rax, [rel symbol] instead of an absolute address. Without it, every reference would carry a relocation the loader must fix at runtime, and no two processes could safely share the same read-only pages.",
          codeExample: `; Absolute vs position-independent access (x86-64 NASM)
section .data
    msg db 'hello', 0xA
    len equ $ - msg

section .text
global _start

; Absolute (assumes a fixed link address — not loadable anywhere):
;   mov rax, msg

; Position-independent (works at ANY load address):
_start:
    lea rsi, [rel msg]    ; RIP-relative address of msg
    mov rax, 1
    mov rdi, 1
    mov rdx, len
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall`,
        },
        {
          heading: "GOT",
          content:
            "Data that lives in another object is beyond RIP-relative reach or subject to symbol interposition, so PIC accesses it through the Global Offset Table: a table of pointers that the dynamic loader fills in once at load time. A shared library reads a global with mov rax, [rel var@GOTPCREL], then dereferences the pointer. Because the GOT's own location is fixed relative to the code, the code itself stays position-independent while the values inside the table adapt to wherever the library was mapped.",
        },
        {
          heading: "PLT",
          content:
            "Calls to functions in other objects go through the Procedure Linkage Table. The call jumps to a PLT stub, which pushes a relocation index and jumps into the dynamic linker's resolver; the first call resolves the real function and patches the GOT entry, so every later call goes straight to the target. This lazy binding keeps startup fast. For the resolver to work, code must be compiled with -fPIC and linked against a shared object — which is why executables, by default, do not use the PLT at all.",
        },
      ],
    },
    playground: {
      defaultCode: `; Position-independent write (x86-64 NASM)
section .data
    msg db 'PIC works at any address', 0xA
    len equ $ - msg

section .text
global _start

_start:
    lea rsi, [rel msg]    ; address resolved relative to RIP
    mov rax, 1
    mov rdi, 1
    mov rdx, len
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d84-q1", type: "quiz", title: "Why PIC",
        description: "The problem PIC solves",
        question: "Why must a shared library avoid absolute addresses for its own data?",
        options: [
          { id: "a", text: "Absolute addresses are slower even when the address is known", correct: false },
          { id: "b", text: "It may be loaded at a different virtual address in each process (ASLR, shared mapping)", correct: true },
          { id: "c", text: "The linker forbids absolute addressing in all objects", correct: false },
          { id: "d", text: "x86-64 cannot encode absolute addresses at all", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d84-q2", type: "quiz", title: "Lazy Binding",
        description: "When the PLT resolves a symbol",
        question: "When is the GOT entry for a PLT stub first populated with the real function address?",
        options: [
          { id: "a", text: "At compile time by the assembler", correct: false },
          { id: "b", text: "When the object file is linked into an executable", correct: false },
          { id: "c", text: "On the first call, by the dynamic linker's resolver", correct: true },
          { id: "d", text: "Never — PLT stubs always call the resolver", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d84-c1", type: "code", title: "RIP-Relative Access",
        description: "Access your own data without absolute addresses",
        starterCode: `section .data
    msg db 'rel me', 0xA
    len equ $ - msg

section .text
global _start

_start:
    ; TODO: load the address of msg using a RIP-relative lea
    ; TODO: sys_write(1, rsi, len) then sys_exit(0)
    nop`,
        hints: ["Use lea rsi, [rel msg]", "Write via rax=1, rdi=1, rdx=len", "The whole program must contain no absolute addresses"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d84-a1", title: "PIC Audit",
      description: "Build a small PIC object that exports a global variable and a function, then verify with readelf and objdump that the .text section contains zero absolute-address relocations — only RIP-relative and GOT-based references.",
      requirements: [
        "Assemble and link a NASM object exposing a global counter and a get_counter function",
        "Access the counter through the GOT using var@GOTPCREL",
        "Use readelf -r to list relocations and confirm R_X86_64_PC32-style entries in .text",
        "Use objdump -d to confirm no movabs or absolute addressing appears",
        "Write one paragraph explaining why the code remains valid at any load address",
      ],
      starterCode: `; libcounter.asm — position-independent counter object
section .data
    global counter
counter: dq 0

section .text
    global get_counter
get_counter:
    ; TODO: mov rax, [rel counter@GOTPCREL], then mov rax, [rax]
    ret
;
; Assemble/link and audit:
;   nasm -f elf64 libcounter.asm -o libcounter.o
;   readelf -r libcounter.o
;   objdump -d libcounter.o`,
      rubric: [
        { criterion: "Global counter and function exported", points: 30 },
        { criterion: "GOT-based access via GOTPCREL", points: 25 },
        { criterion: "Relocation audit with readelf/objdump", points: 25 },
        { criterion: "Written explanation of load-address independence", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
