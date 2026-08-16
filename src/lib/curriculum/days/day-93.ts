import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "ASM Code Obfuscation",
    subtitle: "Polymorphic, metamorphic, and self-modifying code",
    tags: ["security"],
    theory: {
      sections: [
        {
          heading: "Polymorphic Code",
          content:
            "Polymorphic code changes its surface shape on every generation while preserving behavior. The classic technique is a decryptor stub that varies its instructions — register choices, add/sub or xor encodings, dead-code insertions — so the static bytes differ each run. Signatures that match the old stub miss the new one, forcing AV engines into emulation. Because the decryptor itself must stay self-contained and position-independent, it is naturally written in raw assembly with no external references.",
          codeExample: `; A polymorphic decryptor stub (one of many shapes).
; The same payload can be encrypted with xor 0x55 or
; add 0x2A, and the decryptor can use different regs.
section .text
global _start
_start:
    lea rsi, [payload]   ; source of encrypted bytes
    mov rcx, payload_len ; byte count
loop:
    xor byte [rsi], 0x55 ; key varies between generations
    inc rsi
    dec rcx
    jnz loop
    jmp payload
payload:
    ; encrypted blob -- decoded in place, then executed`,
        },
        {
          heading: "Metamorphic Code",
          content:
            "Metamorphic code goes further than polymorphism: it rewrites the entire program body, not just a decryptor. An engine decomposes the target into an intermediate representation, applies semantic transformations — instruction substitution (mov a,b; add a,0 becomes lea a,[b]), register renaming, code transposition, garbage insertion — and reassembles. The result is a program that looks like a different program while computing the same function. Building a metamorphic engine is a compiler project in miniature, and assembly is its natural substrate.",
        },
        {
          heading: "Self-modifying Code and Anti-analysis",
          content:
            "Self-modifying code writes into its own instruction stream at runtime; on x86-64 the instruction cache and data cache must be synchronized (serializing instructions or clflush) before the modified bytes execute. Combined with timing checks, anti-debugger traps, and anti-emulation delays, these techniques break linear disassembly: a static tool sees bytes, not the actual control flow. The defense-in-depth countermeasure is also instruction-level — emulators, hardware watchpoints, and split instruction/data trace recording that reassemble execution in real time.",
        },
      ],
    },
    playground: {
      defaultCode: `; Self-modifying demonstration: patch a byte of code at runtime.
section .text
global _start
_start:
    ; Write a new opcode byte over the first instruction of 'target'
    lea rax, [target]
    mov byte [rax], 0x90   ; 0x90 = NOP, patched in at runtime
    jmp target             ; skip the ICache worry for a demo
target:
    nop
    ; On real hardware, an mfence + cpuid (or clflush)
    ; would serialize before jumping into patched code.
    mov rdi, 0
    mov rax, 60
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d93-q1", type: "quiz", title: "Polymorphism",
        description: "What polymorphism changes",
        question: "What does polymorphic code change between generations?",
        options: [
          { id: "a", text: "The program's external behavior", correct: false },
          { id: "b", text: "The byte layout of the code while keeping behavior", correct: true },
          { id: "c", text: "The CPU instruction set used", correct: false },
          { id: "d", text: "The file format entirely", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d93-q2", type: "quiz", title: "Self-modifying Cache",
        description: "The x86 requirement for executing patched code",
        question: "Why does self-modifying code on x86-64 require cache synchronization before the patched bytes execute?",
        options: [
          { id: "a", text: "The instruction cache may still hold the old bytes", correct: true },
          { id: "b", text: "The TLB is flushed on every write", correct: false },
          { id: "c", text: "The page table is read-only by default", correct: false },
          { id: "d", text: "Registers must be reloaded after any write", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d93-c1", type: "code", title: "XOR Decryptor",
        description: "Write a NASM stub that decrypts a 8-byte blob in place with a single xor key, then jumps into it.",
        starterCode: `section .data
    blob: db 0x1E, 0x2C, 0x3A, 0x0B, 0x59, 0x48, 0x73, 0x61
    blob_len equ $ - blob
    key:  db 0x55

section .text
global _start

_start:
    ; TODO: loop over blob, xor each byte with key
    nop`,
        hints: ["Set up a loop counter from blob_len", "Use xor byte [rsi], 0x55 or the key from memory", "Store the decrypted bytes back into the same blob", "Jump into blob after the loop to 'execute' the payload"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d93-a1", title: "Polymorphic Decryptor Engine",
      description: "Write an assembly program that decrypts a fixed payload blob using a key stored in a register, and make the decryptor polymorphic by choosing between an xor-based and an add-based variant at generation time (compile-time switch).",
      requirements: [
        "Implement both an xor-key and an add-key decryptor path",
        "Switch between them at build time with a single define or label choice",
        "The payload blob must be decrypted in place",
        "Print a checksum of the decrypted blob to prove both variants agree",
        "Comment on why a static signature would miss one variant",
      ],
      starterCode: `section .data
    blob: db 0x1E, 0x2C, 0x3A, 0x0B, 0x59, 0x48, 0x73, 0x61
    blob_len equ $ - blob

section .text
global _start

_start:
    ; TODO: choose variant, decrypt blob in place,
    ; compute and print a simple checksum (sum of bytes)
    nop`,
      rubric: [
        { criterion: "Both decryptor variants implemented", points: 30 },
        { criterion: "Build-time variant selection", points: 20 },
        { criterion: "Checksum proves identical behavior", points: 25 },
        { criterion: "Anti-signature reasoning in comments", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
