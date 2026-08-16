import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "String Operations",
    subtitle: "LODS, STOS, MOVS, SCAS, CMPS",
    tags: ["strings"],
    theory: {
      sections: [
        {
          heading: "String Instructions",
          content:
            "NASM exposes a family of string instructions that operate on memory through the implicit RSI and RDI pointers. MOVSB/MOVSD/MOVSQ copy a byte/dword/qword from [RSI] to [RDI]; STOSB/STOSD/STOSQ store AL/EAX/RAX into [RDI]; LODSB/LODSD/LODSQ load from [RSI] into the accumulator; SCASD compares EAX against [RDI] by subtracting internally and setting flags without storing; CMPSD compares [RSI] against [RDI] directly. Every one of these advances both pointers by the operand size, so a single execution moves one element and updates both addresses.",
        },
        {
          heading: "Direction Flag",
          content:
            "The direction flag DF in RFLAGS decides which way the pointers walk after each string instruction. When DF is clear (CLD), RSI and RDI increment by the operand size; when DF is set (STD), they decrement. This is how you build memcpy forward and memmove backward — the backward pass stops you from overwriting source bytes that haven't been copied yet when the ranges overlap. DF is never saved or restored for you, so set it explicitly with CLD or STD before a string operation and never assume it is clear.",
          codeExample: `; rep movsb: hardware memcpy — moves RCX bytes
section .data
    src db 'Hello, strings!', 0
    dst times 32 db 0

section .text
global _start

_start:
    cld                ; DF=0: walk forward
    mov rsi, src       ; source pointer
    mov rdi, dst       ; destination pointer
    mov rcx, 15        ; byte count
    rep movsb          ; copy 15 bytes in one shot

    ; sys_write(1, dst, 15)
    mov rax, 1
    mov rdi, 1
    mov rsi, dst
    mov rdx, 15
    syscall
    mov rax, 60
    xor rdi, rdi
    syscall`,
        },
        {
          heading: "REP Prefix",
          content:
            "REP makes the CPU repeat a string instruction up to RCX times, decrementing RCX after each iteration. REP MOVSB is a genuine hardware memcpy, and REP STOSB is a hardware memset. The conditional variants REPE/REPZ (repeat while equal/zero) and REPNE/REPNZ (repeat while not equal) apply to SCAS and CMPS and stop early the moment the zero flag flips — so REPNE SCASB scanning for a zero byte is a strlen, and REPE CMPSD comparing two buffers is a memcmp. When the loop exits, RCX holds the count not yet processed and the flags identify which element stopped the scan.",
        },
      ],
    },
    playground: {
      defaultCode: `; x86-64 NASM — string operations
section .data
    src db 'Hello, strings!', 0
    dst times 32 db 0

section .text
global _start

_start:
    cld
    mov rsi, src
    mov rdi, dst
    mov rcx, 15
    rep movsb

    mov rax, 1
    mov rdi, 1
    mov rsi, dst
    mov rdx, 15
    syscall
    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d62-q1", type: "quiz", title: "Implicit Pointers",
        description: "Which registers drive the string instructions",
        question: "Which registers do the string instructions use as implicit source and destination pointers?",
        options: [
          { id: "a", text: "RAX as both source and destination", correct: false },
          { id: "b", text: "RSI as source and RDI as destination", correct: true },
          { id: "c", text: "RDI as source and RSI as destination", correct: false },
          { id: "d", text: "RBX and RCX", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d62-q2", type: "quiz", title: "REPNE SCASB",
        description: "The conditional repeat prefix in action",
        question: "What does REPNE SCASB do, given AL contains the byte being searched for?",
        options: [
          { id: "a", text: "Scans memory for a byte equal to AL and stops when found", correct: true },
          { id: "b", text: "Fills RCX bytes of [RDI] with the value in AL", correct: false },
          { id: "c", text: "Copies RCX bytes from [RSI] to [RDI]", correct: false },
          { id: "d", text: "Clears the zero flag and returns", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d62-c1", type: "code", title: "Hardware Memset",
        description: "Fill a buffer with a constant byte using REP STOSB",
        starterCode: `section .data
    buf times 16 db 0

section .text
global _start

_start:
    ; TODO: fill buf with 0xFF using REP STOSB
    ; (AL = fill byte, RDI = destination, RCX = count)
    nop

    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["Store the fill byte in AL", "Point RDI at buf and set RCX to 16", "Clear DF with CLD so the pointer advances forward"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d62-a1", title: "Backward Copy",
      description: "Write a NASM program that copies an 11-byte string from src into the tail of dst in reverse order using the direction flag (DF=1) and REP MOVSB, then writes the reversed string to stdout with sys_write.",
      requirements: [
        "Set DF with STD so the copy walks backward",
        "Point RSI at the last byte of src and RDI at the last byte of the destination region",
        "Use REP MOVSB with RCX = 11",
        "Restore DF with CLD before the write syscall",
        "Write the reversed buffer with sys_write and exit cleanly",
      ],
      starterCode: `section .data
    src db 'reverse me!', 0   ; 11 bytes
    dst times 16 db 0

section .text
global _start

_start:
    ; TODO: set DF, position both pointers at the END,
    ; then REP MOVSB the 11 bytes right-to-left
    nop

    mov rax, 60
    xor rdi, rdi
    syscall`,
      rubric: [
        { criterion: "DF set (STD) and restored (CLD) correctly", points: 25 },
        { criterion: "Pointers positioned at the end of each region", points: 30 },
        { criterion: "REP MOVSB with correct byte count", points: 25 },
        { criterion: "Reversed string written to stdout", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
