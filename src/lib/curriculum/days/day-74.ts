import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Shellcode Basics",
    subtitle: "Position-independent machine code",
    tags: ["security"],
    theory: {
      sections: [
        {
          heading: "Position-Independent Code",
          content:
            "Shellcode is machine code that must run anywhere the operating system places it — no fixed addresses are known in advance, so every branch and every data reference must be position-independent. The classic technique is a call to the next instruction so the return address on the stack holds the current address, which is then popped into a register and used as a base for RIP-relative addressing. On x86-64, the lea reg, [rip+label] form makes PIC natural: the assembler computes an offset from the instruction pointer, which is valid no matter where the code is loaded.",
          codeExample: `; Position-independent syscall shellcode skeleton
; Assemble with: nasm -f bin shell.asm -o shell.bin
section .text
global _start
_start:
    xor eax, eax          ; zero eax
    mov al, 1             ; eax = 1 (sys_write)
    xor edi, edi
    inc edi               ; edi = 1 (stdout)
    lea rsi, [rel msg]    ; rip-relative address of msg
    mov edx, 14           ; length
    syscall
    xor eax, eax
    mov al, 60            ; eax = 60 (sys_exit)
    xor edi, edi
    syscall
msg:
    db 'shellcode test', 0x0A`,
        },
        {
          heading: "No Null Bytes",
          content:
            "Shellcode is often injected through string functions like strcpy that stop at the first zero byte. That means the byte 0x00 cannot appear anywhere in the payload. The standard workarounds: xor a register with itself to zero it (2 bytes, no zeros) instead of mov reg, 0, and choosing immediate constants whose encoding has no zero bytes — using al (lower byte) where possible, or building values with arithmetic. Every instruction must be audited byte-by-byte for embedded zeros, which is why xor eax, eax appears everywhere in real shellcode.",
        },
        {
          heading: "Payload Structure",
          content:
            "A practical payload is built in stages. A small first-stage stub resolves the addresses it needs at runtime (often by walking the loaded module's export table or using a fixed syscall), then decodes and transfers control to a larger second stage. This keeps the first stage free of null bytes and size-limited — a classic constraint is fitting entirely in a 256-byte buffer. Payloads also usually prepend a small decoder or alignment sled, and terminate so they can be embedded inside a longer buffer without breaking on the trailing data.",
        },
      ],
    },
    playground: {
      defaultCode: `section .text
global _start
_start:
    xor eax, eax
    mov al, 1
    xor edi, edi
    inc edi
    lea rsi, [rel msg]
    mov edx, 14
    syscall
    xor eax, eax
    mov al, 60
    xor edi, edi
    syscall
msg:
    db 'shellcode test', 0x0A`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d74-q1", type: "quiz", title: "PIC",
        description: "Why shellcode cannot use fixed addresses",
        question: "Why must shellcode be position-independent?",
        options: [
          { id: "a", text: "It may be loaded at an unknown address at runtime", correct: true },
          { id: "b", text: "Position-dependent code is always slower", correct: false },
          { id: "c", text: "The assembler requires it", correct: false },
          { id: "d", text: "The kernel only runs PIC", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d74-q2", type: "quiz", title: "Null Bytes",
        description: "The zero-byte constraint",
        question: "Why must shellcode avoid the byte 0x00?",
        options: [
          { id: "a", text: "Injection often uses string functions that stop at zero", correct: true },
          { id: "b", text: "The CPU cannot execute a zero byte", correct: false },
          { id: "c", text: "Zero bytes are illegal in .text sections", correct: false },
          { id: "d", text: "It wastes cache space", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d74-c1", type: "code", title: "Zero a Register",
        description: "Zero a register without a null byte in the encoding",
        starterCode: `section .text
global _start
_start:
    ; TODO: set rax to 0 using an instruction whose
    ; machine encoding contains NO 0x00 byte.
    ; (hint: xor rax, rax)
    nop`,
        hints: ["Use xor with a register against itself", "That encoding is 2 bytes and contains no zeros", "Do NOT use mov rax, 0"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d74-a1", title: "Null-Free Payload",
      description: "Write a NASM program that prints 'hello' via sys_write and exits, then audit the raw bytes with a hex dump (xxd or objdump -s) to confirm no 0x00 byte appears anywhere in the .text section.",
      requirements: [
        "Print 'hello' to stdout with sys_write",
        "Exit cleanly with sys_exit code 0",
        "Use only xor/inc/lea-style instructions with no zero bytes",
        "Dump the section and confirm zero 0x00 bytes",
        "Comment each instruction with its byte cost",
      ],
      starterCode: `section .text
global _start
_start:
    ; TODO: build a null-free 'hello' payload
    nop

section .data
    ; (if your data needs fixing, prefer lea [rel msg] +
    ;  strings defined in .text after a jmp — think about why)
    msg db 'hello', 0x0A`,
      rubric: [
        { criterion: "Correct sys_write + sys_exit", points: 25 },
        { criterion: "RIP-relative addressing used", points: 25 },
        { criterion: "Zero 0x00 bytes in payload", points: 30 },
        { criterion: "Byte-level audit documented", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
