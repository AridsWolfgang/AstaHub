import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Security Vulnerabilities",
    subtitle: "Buffer overflow, ROP, and defensive techniques",
    tags: ["security"],
    theory: {
      sections: [
        {
          heading: "Stack Overflow",
          content:
            "A stack buffer overflow happens when a function writes past a fixed-size local buffer and overwrites the saved return address on the stack. The classic exploit copies shellcode into the buffer, overwrites the return address with a pointer into that buffer, and the ret instruction transfers control there. The x86-64 stack grows downward, so buffers overflow 'up' toward the saved RBP and return address — one byte too many in the wrong place and control flow is gone. The attacker controls the stack layout exactly, which is what makes this primitive so powerful.",
          codeExample: `; A vulnerable pattern: strcpy into a small local.
;   char buf[64];
;   strcpy(buf, user_input);
;
; Stack layout (x86-64, grows downward):
;   [ buf[0..63] ]     <- rbp - 64
;   [ saved rbp   ]    <- rbp
;   [ ret addr    ]    <- rbp + 8
;   [ args / etc  ]    <- rbp + 16
;
; Overflowing buf by >64 bytes clobbers saved rbp,
; then the return address. One controlled ret is all
; the attacker needs to redirect execution.`,
        },
        {
          heading: "ROP and the Defensive Stack",
          content:
            "NX/DEP makes the stack and heap non-executable, so injecting shellcode into a buffer no longer works — the CPU faults on any instruction fetch from a non-executable page. Attackers answered with Return-Oriented Programming: chain existing code sequences called 'gadgets' that end in ret, each returning into the next. A ROP chain is a fake call stack of addresses, and every ret pops the next one. ASLR (Address Space Layout Randomization) then randomizes where those gadgets live per run, forcing attackers into leaks and heap grooming. Together NX and ASLR turn a single overflow into a multi-stage exploit instead of a one-shot injection.",
        },
        {
          heading: "Assembly's Role in Defenses",
          content:
            "Modern defenses are cheap hardware state machines: the stack canary is a random value planted before the return address and checked at function epilogue — a single-byte mismatch trips it. CFI (Control Flow Integrity) instruments every indirect branch to restrict targets to a validated set. Writing exploit analysis in assembly means you can read exactly where the canary sits, spot the exact gadget a ROP chain needs, and understand why a leak of a libc address defeats ASLR in one run. The defense-in-depth stack only works if you can reason about it at the instruction level.",
        },
      ],
    },
    playground: {
      defaultCode: `; Look for useful ROP gadgets in your own code.
; A gadget is any instruction sequence ending in ret.
; Classic example: pop rdi; ret
; Lets an attacker pass a single argument before a call.
;
;   pop rdi          ; pops the next value into rdi
;   ret              ; jumps to the next gadget / function
;
; objdump -d ./target | grep -B1 'ret'
; disassembles your binary and surfaces these chains.
; Compile with -fstack-protector-all to see the canary
; prologue appear in the same disassembly.`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d92-q1", type: "quiz", title: "Overflow Target",
        description: "What a classic stack overflow corrupts",
        question: "In a classic stack buffer overflow, what does the overwrite ultimately target?",
        options: [
          { id: "a", text: "The global offset table entry", correct: false },
          { id: "b", text: "The saved return address", correct: true },
          { id: "c", text: "The instruction cache", correct: false },
          { id: "d", text: "The stack pointer register itself", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d92-q2", type: "quiz", title: "Defense Mechanisms",
        description: "Why NX and ASLR matter",
        question: "What does ASLR (Address Space Layout Randomization) defend against?",
        options: [
          { id: "a", text: "Non-deterministic gadget addresses in ROP chains", correct: true },
          { id: "b", text: "Integer overflow in arithmetic", correct: false },
          { id: "c", text: "Timing side channels on the branch predictor", correct: false },
          { id: "d", text: "Race conditions between threads", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d92-c1", type: "code", title: "Canary Layout",
        description: "Write a NASM snippet that reserves a 64-byte stack buffer and plants a canary word between the buffer and the saved return address.",
        starterCode: `section .text
global _start

_start:
    ; TODO:
    ; 1. Store the old return address (from [rsp]) somewhere safe
    ; 2. Plant a canary value just above a 64-byte buffer
    ; 3. Later code would verify it before ret
    ; 4. Exit with sys_exit(0)
    nop`,
        hints: ["Save the return address before pushing the buffer", "Place the canary AFTER the buffer in stack growth order", "A random canary is only useful if checked before the epilogue ret"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d92-a1", title: "Vulnerability Autopsy",
      description: "Take a 16-byte stack buffer, overflow it in a controlled way, and use the disassembly to identify exactly where the canary, saved RBP, and return address sit. Then write the correct epilogue check that would have caught the overflow.",
      requirements: [
        "Create a 16-byte stack frame with a local buffer",
        "Overflow the buffer deliberately with a known pattern",
        "Comment each byte of the frame layout (buffer, canary, rbp, ret)",
        "Write the canary-check epilogue that detects the corruption",
        "Exit with a distinct code indicating whether the canary tripped",
      ],
      starterCode: `section .text
global _start

_start:
    ; Build a frame: 16-byte buffer + canary slot
    sub rsp, 24
    ; TODO: plant canary, copy into buffer, overflow it,
    ; verify canary, exit 0 (clean) or 1 (corrupted)
    add rsp, 24
    mov rdi, 0
    mov rax, 60
    syscall`,
      rubric: [
        { criterion: "Accurate frame layout with comments", points: 30 },
        { criterion: "Controlled overflow written deliberately", points: 25 },
        { criterion: "Canary check in the epilogue", points: 25 },
        { criterion: "Exit codes distinguish clean vs corrupted", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
