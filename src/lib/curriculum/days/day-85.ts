import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Linker Scripts & ELF Format",
    subtitle: "Controlling memory layout and sections",
    tags: ["linking"],
    theory: {
      sections: [
        {
          heading: "ELF Sections",
          content:
            "An ELF object is a set of sections: .text holds executable code, .data initialized data, .bss zero-filled data that takes no file space, and .rodata read-only constants. The section header table describes them, while the program header table groups sections into loadable segments that the kernel maps into memory. You inspect both with readelf -S and readelf -l. When you link, the linker merges same-named sections from every input object into one output section at an address it chooses.",
        },
        {
          heading: "Linker Scripts",
          content:
            "GNU ld's default script rarely suits bare-metal or exotic targets, so ld accepts your own: a linker script that fixes the entry point, declares memory regions with ORIGIN and LENGTH, and places every section at an explicit address. The SECTIONS command with an implicit location counter '.' gives you total control over layout, and symbols you define there — like _end or _stack_top — are visible to your assembly and C code. This is how kernels and embedded firmware arrange code and data at fixed addresses.",
          codeExample: `/* minimal.ld — place everything at a fixed address */
ENTRY(_start)

SECTIONS
{
    . = 0x400000;               /* location counter: first address */
    .text : { *(.text) }        /* all .text from every object   */
    .data : { *(.data) }
    .bss  : { *(.bss)  }

    _end = .;                   /* symbol: end of the image      */
}

MEMORY
{
    RAM (rwx) : ORIGIN = 0x400000, LENGTH = 1M
}`,
        },
        {
          heading: "Symbol Resolution",
          content:
            "The linker's real job is resolving symbols: every reference in one object must be bound to a definition in another. Rules are precise — a strong symbol overrides a weak one, a single strong definition wins, and an undefined symbol is an error unless it comes from a shared library. The outcome is visible in the relocations: R_X86_64_64 stores an absolute address, while R_X86_64_PC32 stores a PC-relative delta. Tools like nm and objdump -t let you read the symbol table and see what actually got bound.",
        },
      ],
    },
    playground: {
      defaultCode: `; x86-64 NASM syntax
section .data
    msg db 'linked for the metal', 0xA
    len equ $ - msg

section .text
global _start

_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
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
        id: "d85-q1", type: "quiz", title: "Linker Scripts",
        description: "What a linker script controls",
        question: "What does the SECTIONS command in a linker script define?",
        options: [
          { id: "a", text: "Which compiler optimizations are enabled", correct: false },
          { id: "b", text: "Where sections are placed in memory and at what addresses", correct: true },
          { id: "c", text: "Which instructions the assembler may emit", correct: false },
          { id: "d", text: "The runtime environment variables", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d85-q2", type: "quiz", title: "ELF Tools",
        description: "Inspecting the binary",
        question: "Which command shows the section header table of an ELF file?",
        options: [
          { id: "a", text: "readelf -S", correct: true },
          { id: "b", text: "strace -e section", correct: false },
          { id: "c", text: "ldd --sections", correct: false },
          { id: "d", text: "objdump --symbols only", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d85-c1", type: "code", title: "Custom Section",
        description: "Define a custom section and print from it",
        starterCode: `; Put a message in its own custom section
section .mymsg progbits alloc exec
    msg db 'custom section speaking', 0xA
    len equ $ - msg

section .text
global _start

_start:
    ; TODO: sys_write(1, msg, len) — msg lives in .mymsg
    ; TODO: sys_exit(0)
    nop`,
        hints: ["Write rax=1, rdi=1, rsi=msg, rdx=len", "The custom section name appears in readelf -S", "Exit with rax=60, rdi=0"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d85-a1", title: "Bare-Metal Layout",
      description: "Write a linker script that places .text at 0x8000, .data at 0x100000, and defines _end after .bss. Assemble a small NASM program, link with your script, and verify the layout with readelf.",
      requirements: [
        "Linker script with ENTRY(_start) and SECTIONS placing .text at 0x8000 and .data at 0x100000",
        "Define the _end symbol after .bss via the location counter",
        "NASM program exposes _start and a global initialized to nonzero in .data",
        "Verify with readelf -S that section addresses match the script",
        "Run nm to confirm _start and _end resolve as expected",
      ],
      starterCode: `; main.asm
section .data
    value dq 0xDEADBEEF
    global value

section .text
global _start
_start:
    mov rax, [value]       ; load from .data at 0x100000
    mov rax, 60
    xor rdi, rdi
    syscall
;
; Build:
;   nasm -f elf64 main.asm -o main.o
;   ld -T layout.ld main.o -o main
;   readelf -S main && nm main`,
      rubric: [
        { criterion: "Linker script with exact addresses", points: 30 },
        { criterion: "_end symbol defined via location counter", points: 25 },
        { criterion: "Program links and runs with the script", points: 25 },
        { criterion: "Layout verified with readelf/nm", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
