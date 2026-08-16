import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Crypto Primitives in ASM",
    subtitle: "Hand-optimized XOR and AES-NI",
    tags: ["crypto"],
    theory: {
      sections: [
        {
          heading: "XOR Loops",
          content:
            "A stream cipher built from XOR is the simplest cryptographic primitive there is: xor each plaintext byte with a keystream byte. In assembly the loop is a tight sequence — load, xor, store, advance, count down — and vectorizing it with SIMD can process 16 or 32 bytes per iteration. XOR with the same key twice returns the original data, so encryption and decryption are the same operation. The whole security of an XOR cipher rests on the keystream: it must be random, never reused, and kept secret. Assembly's contribution is making the bulk data path fast, not making the cipher itself stronger.",
          codeExample: `; XOR a 16-byte buffer with a key byte, byte by byte
section .data
    buf db '0123456789abcdef'
    len equ $ - buf
    key db 0xAA

section .text
global _start
_start:
    mov rsi, buf
    mov rcx, len
    mov al, [key]
loop_xor:
    xor [rsi], al       ; buf[i] ^= key
    inc rsi
    dec rcx
    jnz loop_xor
    nop`,
        },
        {
          heading: "AES-NI",
          content:
            "Modern x86 CPUs include the AES-NI instruction set, which accelerates the AES block cipher in hardware. The core instructions — aesenclast and aesenc (encryption), aesdeclast and aesdec (decryption), and aeskeygenassist (key expansion) — operate on full 128-bit XMM registers, doing an entire AES round in a single instruction. With AES-NI, a hand-written assembly AES is not only faster than the best C software implementation, it is also constant-time: the same instructions run regardless of the data, which defeats cache-timing side channels that plague table-based software AES. The key schedule must still be expanded, but the round transform itself becomes a handful of instructions.",
        },
        {
          heading: "Timing Attacks",
          content:
            "Cryptography in assembly must be constant-time: execution time must not depend on secret data. Classic pitfalls are data-dependent branches (if (secret_bit) do_something_slow) and data-dependent memory access (using a secret to index a table), both of which leak through measurable timing differences. Constant-time code avoids branches and table lookups on secret values entirely, using only arithmetic and bitwise operations — cmov and xor-based selection instead of jumps. AES-NI is the poster child: because every AES round is one instruction that takes the same time regardless of input, hardware AES has no data-dependent timing at all. Writing assembly is how you guarantee the timing, not just hope for it.",
        },
      ],
    },
    playground: {
      defaultCode: `; XOR cipher round — the whole primitive in 5 instructions
section .data
    buf db '0123456789abcdef'
    len equ $ - buf
    key db 0xAA

section .text
global _start
_start:
    mov rsi, buf
    mov rcx, len
    mov al, [key]
loop_xor:
    xor [rsi], al
    inc rsi
    dec rcx
    jnz loop_xor
    ; running it twice restores the original data
    nop`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d80-q1", type: "quiz", title: "XOR Property",
        description: "Why the same op decrypts",
        question: "Why does XORing data with the same key twice recover the original?",
        options: [
          { id: "a", text: "XOR is its own inverse", correct: true },
          { id: "b", text: "XOR ignores overflow", correct: false },
          { id: "c", text: "The CPU caches the result", correct: false },
          { id: "d", text: "XOR is commutative only", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d80-q2", type: "quiz", title: "Constant Time",
        description: "What constant-time crypto avoids",
        question: "Which pattern leaks secret data through timing and must be avoided?",
        options: [
          { id: "a", text: "Data-dependent branches and table lookups", correct: true },
          { id: "b", text: "Using registers for the key", correct: false },
          { id: "c", text: "Fixed-length loops", correct: false },
          { id: "d", text: "Storing the ciphertext to memory", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d80-c1", type: "code", title: "XOR a Buffer",
        description: "Encrypt a buffer by XORing each byte with a key",
        starterCode: `section .data
    buf db 'SECRET!', 0
    len equ $ - buf
    key db 0x37

section .text
global _start
_start:
    ; TODO: XOR each byte of buf with the key byte
    nop
    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["Loop with rsi over buf and rcx = len", "Load the key into al once, before the loop", "xor [rsi], al modifies the buffer in place"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d80-a1", title: "Constant-Time XOR Stream",
      description: "Write a NASM routine that XORs a 16-byte buffer with a repeating 4-byte key in constant time: no data-dependent branches, no conditional jumps keyed on the data — just a fixed-count loop that always runs the full length.",
      requirements: [
        "Use a fixed-count loop that runs exactly 16 iterations",
        "Cycle through a 4-byte key without data-dependent branches",
        "Perform the XOR with memory operands",
        "Run the routine twice and confirm the buffer is restored",
        "Comment why each choice keeps the timing constant",
      ],
      starterCode: `; const_time_xor.asm — 16-byte buffer, 4-byte key
section .data
    buf db '0123456789abcdef'
    key db 0x11, 0x22, 0x33, 0x44

section .text
global _start
_start:
    ; TODO: XOR buf with the repeating key, no data branches
    nop
    mov rax, 60
    xor rdi, rdi
    syscall`,
      rubric: [
        { criterion: "Fixed 16-iteration loop", points: 25 },
        { criterion: "4-byte key cycled without data branches", points: 30 },
        { criterion: "In-place XOR via memory operands", points: 20 },
        { criterion: "Constant-time rationale documented", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
