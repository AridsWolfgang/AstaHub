import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "ASM and C Interop",
    subtitle: "Calling C from assembly and vice versa",
    tags: ["interop"],
    theory: {
      sections: [
        {
          heading: "Calling C from ASM",
          content:
            "The System V AMD64 ABI is the contract: integer arguments go in RDI, RSI, RDX, RCX, R8, R9, and the rest on the stack, with floating-point arguments in XMM0-XMM7. Before a call, the stack must be 16-byte aligned — a quirk of the ABI that returns addresses as multiples of 16. After a call, RAX holds the return value, and you must treat RBX, RBP, and R12-R15 as preserved: the callee saves them, you own the rest. If your function passes no floating-point arguments, zero EAX to tell the variadic callee.",
          codeExample: `; Call C from NASM (System V AMD64, linked with libc)
extern printf

section .data
    fmt db "value: %lu", 10, 0

section .text
global main
main:
    push rbp
    mov rbp, rsp

    mov rdi, fmt          ; 1st arg: format string
    mov rsi, 42           ; 2nd arg: the value
    xor eax, eax          ; 0 vector registers used
    call printf

    mov eax, 0            ; return 0 from main
    pop rbp
    ret`,
        },
        {
          heading: "ASM from C",
          content:
            "The reverse direction is just as clean: declare an extern function in C, and in NASM mark the label global. There is no hidden preamble — C calls your label exactly like any function, so your assembly must honor the same ABI: read arguments from RDI/RSI, align the stack before any call you make, and preserve the callee-saved registers if you touch them. Return in RAX (and RDX:RAX for 128-bit values). A missing global directive or a mismatched signature is a silent crash, not a linker error.",
        },
        {
          heading: "Name Mangling",
          content:
            "On Linux ELF x86-64, C and assembly symbols are identical strings — a global named add_asm in NASM is the exact symbol C's extern int add_asm(int,int); binds to. The trouble starts with C++, whose compiler mangles every symbol to encode namespaces, classes, and overloads into strings like _Z3addii. You defeat this with extern \"C\" around the declaration, which forces unmangled names, or you match the mangled name by hand — a game nobody should play. When in doubt, nm on the object reveals the true symbol string.",
        },
      ],
    },
    playground: {
      defaultCode: `; A C-callable function plus an ASM driver for it
global add_asm

section .text

; int add_asm(int a, int b) -> rax
add_asm:
    lea rax, [rdi + rsi]  ; a is in rdi, b is in rsi
    ret

global _start
_start:
    mov rdi, 20
    mov rsi, 22
    call add_asm          ; rax = 42
    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d87-q1", type: "quiz", title: "System V ABI",
        description: "Where arguments go",
        question: "In the System V AMD64 calling convention, which register receives the first integer argument?",
        options: [
          { id: "a", text: "RAX", correct: false },
          { id: "b", text: "RBX", correct: false },
          { id: "c", text: "RDI", correct: true },
          { id: "d", text: "RCX", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d87-q2", type: "quiz", title: "Mangling",
        description: "Why C++ symbols get ugly",
        question: "Why does C++ mangle function names like _Z3addii?",
        options: [
          { id: "a", text: "To encrypt the code so reverse engineering is harder", correct: false },
          { id: "b", text: "To encode namespace, class, and overload information in the symbol", correct: true },
          { id: "c", text: "To reduce the size of the symbol table", correct: false },
          { id: "d", text: "To make the linker resolve faster", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d87-c1", type: "code", title: "C-Compatible Function",
        description: "Write a function C can call",
        starterCode: `; int triple(int x) — callable from C
global triple
section .text

triple:
    ; TODO: return x * 3 in rax (x arrives in rdi)
    ret

; To call from C:
;   extern int triple(int);
;   printf("%d\\n", triple(7));

global _start
_start:
    mov rdi, 7
    call triple           ; rax = 21
    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["lea rax, [rdi + rdi*2] computes 3x without imul", "The return value always goes in rax", "Do not clobber rbx/rbp/r12-r15 without saving"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d87-a1", title: "Mixed C/ASM Program",
      description: "Build a program that goes both directions: a C main() calls an assembly function that computes a sum, and an assembly routine calls a C function that prints a message. Link it all together with gcc and verify it runs.",
      requirements: [
        "C main() calls an extern asm function declared global in NASM",
        "The asm function preserves callee-saved registers it touches",
        "An asm routine calls a C function, passing its arguments in ABI order",
        "The asm caller zeroes EAX before the C call (no vector args)",
        "gcc links the whole thing; the program runs and prints correctly",
      ],
      starterCode: `/* main.c */
#include <stdio.h>

extern int asm_add(int a, int b);
extern void asm_print(void);

int main(void) {
    printf("asm_add: %d\\n", asm_add(4, 5));
    asm_print();
    return 0;
}

; math.asm
global asm_add
global asm_print
extern printf

section .data
    msg db "hello from assembly", 10, 0

section .text
asm_add:
    ; TODO: rax = rdi + rsi, then ret
    ret

asm_print:
    ; TODO: printf(msg) — set rdi, zero eax, call, then ret
    ;
; Build:
;   nasm -f elf64 math.asm -o math.o
;   gcc main.c math.o -o prog`,
      rubric: [
        { criterion: "asm_add follows the System V ABI", points: 30 },
        { criterion: "asm_print calls printf correctly", points: 25 },
        { criterion: "C and NASM link via gcc without errors", points: 25 },
        { criterion: "Callee-saved registers handled properly", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
