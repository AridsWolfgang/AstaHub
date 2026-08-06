import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Logical & Bitwise Ops",
    subtitle: "AND, OR, XOR, NOT, shifts in ASM",
    tags: ["instructions", "bitwise", "logic"],
    theory: {
      sections: [
        {
          heading: "Bitwise Logic: AND, OR, XOR, NOT",
          content:
            "These instructions operate bit-by-bit on the operands. AND sets each bit to 1 only if both bits are 1. OR sets each bit to 1 if either bit is 1. XOR sets each bit to 1 if one bit is 1 and the other is 0. NOT flips every bit. All except NOT set SF, ZF, PF (CF and OF are cleared). XOR is commonly used to zero a register — `xor rax, rax` is more efficient than `mov rax, 0`.",
          codeExample: `; Bitwise logic:\nmov rax, 0b1100\nmov rbx, 0b1010\nand rax, rbx      ; rax = 0b1000 (8)\nor  rax, rbx      ; rax = 0b1110 (14)\nxor rax, rbx      ; rax = 0b0100 (4)\nnot rax           ; rax = 0b1111...1011\n\n; Idiomatic zeroing:\nxor rax, rax      ; preferred over mov rax, 0\n; Smaller encoding, no false dependency on previous RAX value`,
        },
        {
          heading: "Shift Operations: SHL, SHR, SAL, SAR",
          content:
            "SHL (shift left) and SHR (shift right) are logical shifts that fill with zeros. SAL (shift arithmetic left) is identical to SHL. SAR (shift arithmetic right) preserves the sign bit. The shift count can be an immediate or CL register. Shifts set CF and PF, and affect ZF and SF based on the result.",
          codeExample: `; Shift operations:\nmov rax, 0b1001\nshl rax, 2        ; rax = 0b100100 = 36\nshr rax, 1        ; rax = 0b010010 = 18\n\n; Arithmetic right shift preserves sign:\nmov rax, -100     ; 0xFFFFFFFFFFFFFF9C\nsar rax, 2        ; rax = -25 (sign bit replicated)\nshr rax, 2        ; rax = huge positive (zero fill)\n\n; Shift by CL register:\nmov cl, 3\nshl rax, cl       ; shift rax left by 3`,
        },
        {
          heading: "Rotate Instructions: ROL, ROR, RCL, RCR",
          content:
            "Rotations shift bits in a circular fashion. ROL rotates left — the leftmost bit goes to the rightmost position and also into CF. ROR rotates right. RCL and RCR rotate through carry (9-bit rotation including CF). Useful for cryptography, checksums, and bit manipulation.",
          codeExample: `; Rotate examples:\nmov rax, 0b1001\nrol rax, 1        ; rax = 0b0011 (bit 3 wraps to bit 0)\nror rax, 2        ; rax = 0b1100\n\n; Rotate through carry:\nclc               ; clear carry\nrcl rax, 1        ; rotate 9 bits: CF + RAX\n\n; Bit test and set:\nbt  rax, 3        ; test bit 3 → CF\nbts rax, 2        ; test and set bit 2 → CF, then set\nbtr rax, 1        ; test and clear bit 1\nbtc rax, 0        ; test and complement bit 0`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 55: Logical & Bitwise Ops\n; Experiment with bit manipulation\n\nsection .text\nglobal _start\n\n_start:\n    ; AND, OR, XOR examples\n    mov rax, 0xFF00\n    mov rbx, 0x0F0F\n    and rax, rbx      ; rax = 0x0F00\n    xor rax, rbx      ; flip bits\n    not rax           ; invert all\n\n    ; Shifts\n    mov rax, 0b1010\n    shl rax, 3        ; 0b1010000\n    shr rax, 2        ; 0b0010100\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d55-q1", type: "quiz", title: "Zeroing Idiom",
        description: "Why XOR is preferred for zeroing",
        question: "Why is `xor rax, rax` preferred over `mov rax, 0`?",
        options: [
          { id: "a", text: "It's easier to read", correct: false },
          { id: "b", text: "Smaller encoding and avoids false dependencies", correct: true },
          { id: "c", text: "XOR is the only way to zero a register", correct: false },
          { id: "d", text: "MOV doesn't work with immediate 0", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d55-q2", type: "quiz", title: "SAR vs SHR",
        description: "Understanding arithmetic vs logical shifts",
        question: "What is the difference between SAR and SHR?",
        options: [
          { id: "a", text: "SAR shifts left, SHR shifts right", correct: false },
          { id: "b", text: "They are identical instructions", correct: false },
          { id: "c", text: "SAR preserves the sign bit, SHR fills with zeros", correct: true },
          { id: "d", text: "SAR uses CL, SHR uses an immediate", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d55-c1", type: "code", title: "Bit Mask Builder",
        description: "Use AND, OR, SHL, and SHR to construct and manipulate bit masks",
        starterCode: `section .text\nglobal _start\n\n_start:\n    ; Create mask: bits 3-6 set, rest clear = 0b01111000\n    ; Step 1: start with 1, shift left\n    mov rax, 1\n    shl rax, 3        ; bit 3 set\n    ; Step 2: set bits 4, 5, 6\n    mov rbx, 1\n    shl rbx, 4\n    or rax, rbx\n    shl rbx, 1        ; becomes bit 5\n    or rax, rbx\n    shl rbx, 1        ; becomes bit 6\n    or rax, rbx\n    ; rax = 0b01111000\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["Use SHL to position bits", "Use OR to combine masks", "Use NOT to invert"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d55-a1", title: "Bitwise Utility",
      description: "Write assembly that implements a set of bit manipulation utilities: set bit N, clear bit N, toggle bit N, and test bit N",
      requirements: [
        "Set bit 3 of a value using OR with a mask",
        "Clear bit 5 of a value using AND with an inverted mask",
        "Toggle bit 2 using XOR with a mask",
        "Test bit 7 using BT or AND",
        "Use SHL to create masks dynamically",
      ],
      starterCode: `section .data\n    value dq 0b10101010\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, [value]\n\n    ; Set bit 3: rax = rax | (1 << 3)\n    mov rbx, 1\n    shl rbx, 3\n    or rax, rbx\n\n    ; Clear bit 5: rax = rax & ~(1 << 5)\n    mov rcx, 1\n    shl rcx, 5\n    not rcx\n    and rax, rcx\n\n    ; Toggle bit 2: rax = rax ^ (1 << 2)\n    mov rdx, 1\n    shl rdx, 2\n    xor rax, rdx\n\n    ; Test bit 7:\n    bt rax, 7\n    ; CF now reflects bit 7\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Set bit using OR + SHL mask", points: 20 },
        { criterion: "Clear bit using AND + NOT mask", points: 20 },
        { criterion: "Toggle bit using XOR", points: 20 },
        { criterion: "Bit test using BT", points: 20 },
        { criterion: "Dynamic mask generation with SHL", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
