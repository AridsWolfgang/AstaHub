import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "ASM on ARM64",
    subtitle: "AArch64 architecture comparison with x86-64",
    tags: ["architecture"],
    theory: {
      sections: [
        {
          heading: "Registers and the ABI",
          content:
            "AArch64 provides 31 general-purpose registers, x0 through x30, plus the stack pointer sp and program counter pc. x0-x7 pass arguments and return values — the calling convention maps cleanly to the register file with no special-case register splitting. x30 is the link register: bl stores the return address there instead of pushing it, making leaf functions trivially cheap. Unlike x86-64, instructions are all exactly 32 bits, with a conditional-execution design that is per-instruction rather than a global flag register.",
          codeExample: `; AArch64 leaf function: x0 = a, x1 = b, return x0 = a + b
; Build with: aarch64-linux-gnu-as -o add.o add.s
;            aarch64-linux-gnu-ld -o add add.o
.text
.global add_two
add_two:
    add x0, x0, x1    ; x0 = x0 + x1, return value in x0
    ret               ; pc = x30 (link register), no stack used`,
        },
        {
          heading: "Conditional Execution",
          content:
            "AArch64 conditions are evaluated from the NZCV condition flags, set by compare and arithmetic instructions. Every instruction can carry a condition suffix: csel (select), cset, cinc, csel, and branch families like b.eq, b.gt, b.cs. The 32-bit encode of instructions is why AArch64 tends to have more instructions than x86-64 for the same task — each one does less — but their fixed width makes decode and pipelining simpler. Because x86-64 code runs on a variable-length decoder and AArch64 on a fixed-width one, hand-tuned loops often behave very differently in branch prediction and decode throughput.",
          codeExample: `; Conditional select: x0 = (x1 > x2) ? 10 : 20
.text
.global pick
pick:
    cmp x1, x2        ; set flags from x1 - x2
    csel x0, x10, x20, gt   ; x0 = 10 if x1 > x2, else 20
    ret`,
        },
        {
          heading: "Load/Store and Addressing",
          content:
            "AArch64 is a strict load/store machine: arithmetic only touches registers, and memory is moved through ldr/str. Addressing modes are rich but regular — base register plus offset, pre-indexed, post-indexed, or PC-relative adr/adrp for position-independent access to globals. Scaled offsets are encoded in the instruction itself, so ldr x0, [x1, #32] needs no extra add. This regularity is why AArch64 code is usually easier to reason about than x86-64's ModRM/SIB encodings, even though it takes more instructions to express the same C.",
          codeExample: `; Load a global and store a constant back, PC-relative.
.data
counter: .quad 0
.text
.global bump
bump:
    adrp x1, counter      ; page of counter
    add  x1, x1, :lo12:counter  ; low 12 bits of the address
    ldr  x2, [x1]         ; load counter
    add  x2, x2, #1       ; increment
    str  x2, [x1]         ; store back
    ret`,
        },
      ],
    },
    playground: {
      defaultCode: `; AArch64 hello, assembled with aarch64-linux-gnu toolchain.
; System call: write(1, msg, 15)
.text
.global _start
_start:
    mov x0, #1         ; fd = stdout
    adrp x1, msg
    add  x1, x1, :lo12:msg
    mov x2, #15        ; length
    mov x8, #64        ; sys_write on AArch64 Linux
    svc #0             ; supervisor call
    mov x0, #0         ; exit code 0
    mov x8, #93        ; sys_exit
    svc #0
.data
msg: .ascii "Hello, ARM64!\\n"`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d97-q1", type: "quiz", title: "Register Role",
        description: "AArch64 register file basics",
        question: "In the AArch64 calling convention, which register holds the return address after a bl (branch-and-link) instruction?",
        options: [
          { id: "a", text: "x30, the link register", correct: true },
          { id: "b", text: "sp, the stack pointer", correct: false },
          { id: "c", text: "x0, the first argument register", correct: false },
          { id: "d", text: "x19, a callee-saved register", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d97-q2", type: "quiz", title: "Instruction Width",
        description: "AArch64 encoding model",
        question: "How are AArch64 instructions encoded in terms of width?",
        options: [
          { id: "a", text: "Fixed 32-bit, all instructions the same width", correct: true },
          { id: "b", text: "Variable length like x86-64", correct: false },
          { id: "c", text: "Always 64 bits", correct: false },
          { id: "d", text: "16 or 32 bits depending on the class", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d97-c1", type: "code", title: "Conditional Select",
        description: "Write an AArch64 function that returns 7 if x1 > x2, otherwise 42, using csel.",
        starterCode: `// AArch64 (A64) syntax — assemble with the aarch64 toolchain.
.text
.global pick7

// entry: x1, x2 ; return x0
pick7:
    // TODO: compare, then conditional select 7 or 42
    nop
    ret`,
        hints: ["cmp x1, x2 sets the flags", "csel takes two source registers and a condition", "Use the gt condition to select 7", "x0 carries the return value"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d97-a1", title: "AArch64 String Length",
      description: "Write an AArch64 function that computes the length of a NUL-terminated string (like strlen) using load/store instructions and returns the count in x0.",
      requirements: [
        "Load bytes one at a time with ldrb",
        "Scan until a zero byte is found",
        "Return the length in x0 (not counting the NUL)",
        "Do not use sp — a leaf function needs no stack frame",
        "Comment the load/store addressing you chose",
      ],
      starterCode: `// AArch64 (A64) syntax.
.text
.global strlen64

// entry: x0 = string pointer ; return x0 = length
strlen64:
    // TODO: scan for the NUL byte, count preceding bytes
    nop
    ret`,
      rubric: [
        { criterion: "Correct ldrb-based scan loop", points: 30 },
        { criterion: "Stops exactly at the NUL byte", points: 25 },
        { criterion: "Length returned in x0", points: 20 },
        { criterion: "Leaf function with no stack use", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
