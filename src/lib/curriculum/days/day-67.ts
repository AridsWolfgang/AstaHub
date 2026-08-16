import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Bit Manipulation in ASM",
    subtitle: "BT, BTS, BTR, BTC instructions",
    tags: ["bitwise"],
    theory: {
      sections: [
        {
          heading: "Bit Test",
          content:
            "BT copies a single bit into the carry flag without modifying the value. bt rax, 3 sets CF to bit 3 of RAX, leaving RAX untouched. The bit index can be an immediate or any register, and the first operand can be a register or memory. jc and jnc read the result. BT is the assembly equivalent of (value >> bit) & 1, and compilers emit it whenever the bit index is a runtime value, because the shift-and-mask collapses into a single instruction.",
          codeExample: `; test whether bit 3 of al is set
section .text
global _start

_start:
    mov al, 0x08
    bt  al, 3       ; CF = 1 (bit 3 is set)
    jc  .set
    mov rdi, 0
    jmp .done
.set:
    mov rdi, 1
.done:
    mov rax, 60
    syscall`,
        },
        {
          heading: "Set/Clear/Toggle",
          content:
            "BTS sets the selected bit to 1, BTR clears it to 0, and BTC flips it — and all three first copy the bit's prior value into CF, so a single instruction both reads and mutates. That read-modify-write-in-one makes the family perfect for lock-free flag words and bitmap allocators: bt tests, bts claims, btr releases, and the CF result tells you whether the bit was already taken, letting you detect a double-claim or a race without a second load.",
        },
        {
          heading: "Masks",
          content:
            "The classic alternative is mask manipulation: value & ~mask clears bits, value | mask sets them, value ^ mask toggles them. The BT family wins whenever the bit index is dynamic, because building the mask would itself cost a shift. Shift and rotate (shl, shr, rol, ror) finish the toolkit, and in two's complement a full mask of ones is just -1 — or eax, -1 — so sign-extension tricks appear constantly in optimized bit code.",
        },
      ],
    },
    playground: {
      defaultCode: `; BT / BTS / BTR / BTC on a 64-bit flag word
section .data
    flags dq 0x0000000000000100   ; bit 8 set

section .text
global _start

_start:
    ; test bit 8 (already set)
    bt  qword [flags], 8      ; CF = 1
    ; claim bit 3 (was clear) — BTS copies old value to CF
    bts qword [flags], 3      ; CF = 0, bit 3 now set
    ; release bit 8
    btr qword [flags], 8      ; CF = 1, bit 8 now clear
    ; toggle bit 5
    btc qword [flags], 5

    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d67-q1", type: "quiz", title: "BTR Semantics",
        description: "What BTR does to the target bit",
        question: "What does BTR do to the selected bit?",
        options: [
          { id: "a", text: "Copies it to CF, then clears it to 0", correct: true },
          { id: "b", text: "Copies it to CF, then sets it to 1", correct: false },
          { id: "c", text: "Copies it to CF, leaving the bit unchanged", correct: false },
          { id: "d", text: "Toggles it and stores the result back", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d67-q2", type: "quiz", title: "Read-Only Test",
        description: "The instruction that only reads",
        question: "Which instruction tests a bit without modifying the value?",
        options: [
          { id: "a", text: "BTS", correct: false },
          { id: "b", text: "BTC", correct: false },
          { id: "c", text: "BT", correct: true },
          { id: "d", text: "BTR", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d67-c1", type: "code", title: "Popcount via BT",
        description: "Count the set bits of a value using BT and a loop",
        starterCode: `section .text
global _start

_start:
    mov rax, 0b110101   ; value to inspect (4 set bits)
    ; TODO: count the set bits using BT, then exit with the
    ; count (4) as the exit code
    nop
    mov rdi, rax
    mov rax, 60
    syscall`,
        hints: ["Move the value into a scratch register so rax can become the counter", "Walk a bit-index register from 0 to 63 with BT, then JC to increment", "You need a loop over the bit index"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d67-a1", title: "Bitmap Allocator Core",
      description: "Write a NASM program that implements a tiny bitmap allocator over a 64-bit word: scan bits 0..63 with BT to find a clear bit, claim it with BTS, release it with BTR, and exit with the claimed bit index as the exit code.",
      requirements: [
        "Scan bits 0..63 with BT to find the first clear bit",
        "Claim the free bit with BTS, using CF to confirm it was free",
        "Release the bit with BTR",
        "Exit with the claimed bit index as the exit code",
        "Comment every bit instruction with its purpose",
      ],
      starterCode: `section .data
    ; allocation bitmap — bits 4 and 6 are already used
    bitmap dq 0b0000000000000000000000000000000000000000000000000000000001010000

section .text
global _start

_start:
    ; TODO: scan bitmap with BT, claim the first free bit
    ; with BTS, release it with BTR, exit with the index
    nop
    mov rdi, rax
    mov rax, 60
    syscall`,
      rubric: [
        { criterion: "BT scan loop over the bit indices", points: 30 },
        { criterion: "BTS claim with CF state checked", points: 25 },
        { criterion: "BTR release of the claimed bit", points: 20 },
        { criterion: "Correct claimed index as the exit code", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
