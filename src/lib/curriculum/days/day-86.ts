import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Debugging ASM with GDB",
    subtitle: "Advanced debugging techniques for assembly",
    tags: ["tooling"],
    theory: {
      sections: [
        {
          heading: "Layout ASM",
          content:
            "GDB's TUI mode turns the terminal into a debugger cockpit: layout asm opens a disassembly window overlaid on the command prompt, and layout regs adds a live register pane that updates on every step. Pair it with set disassembly-flavor intel so the mnemonics read like the NASM you wrote, and use disassemble /r to see the raw bytes beside each instruction. Then x/i $rip shows the next instruction as you single-step, and info registers (or just layout regs) keeps every GPR, flag, and XMM lane in view.",
          codeExample: `; The GDB workflow for assembly
(gdb) file ./prog
(gdb) set disassembly-flavor intel
(gdb) layout asm
(gdb) layout regs
(gdb) break _start
(gdb) run
(gdb) stepi               ; execute one instruction
(gdb) info registers rax rbx rcx rdx rflags
(gdb) x/8i $rip           ; disassemble the next 8 instructions
(gdb) x/gx $rsp           ; peek at the top of the stack`,
        },
        {
          heading: "Watchpoints",
          content:
            "A watchpoint breaks whenever an address's value changes, which is exactly what you need when a register or memory slot is corrupted by code you cannot see. watch $rax fires on writes to the register, watch *(long*)0x402000 watches a memory address, and watch -l works on the current expression. Watchpoints use debug registers, of which x86-64 has four — exceed the budget and GDB falls back to slow single-stepping. Unlike a breakpoint, a watchpoint tells you not just where execution stopped but what clobbered the value.",
        },
        {
          heading: "Reverse Debugging",
          content:
            "Forward stepping makes you re-run and miss the moment; reverse debugging lets you step time itself backward. GDB's record full stores the full execution history, then reverse-stepi (rsi) and reverse-continue (rc) walk the program back instruction by instruction until you hover over the exact write that broke a register. The rr tool goes further, recording whole processes with near-zero overhead so you can replay branches, watchpoints, and syscalls across thousands of iterations. When a bug is 'obvious in hindsight,' reverse debugging finds its origin instead of its symptom.",
        },
      ],
    },
    playground: {
      defaultCode: `; Debug target: a register gets corrupted somewhere
section .data
    value dq 0

section .text
global _start

_start:
    mov rax, [value]
    inc rax
    mov [value], rax       ; watch 'value' here
    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d86-q1", type: "quiz", title: "TUI Layout",
        description: "The asm debugging view",
        question: "Which GDB command opens a live disassembly window in the terminal?",
        options: [
          { id: "a", text: "window asm", correct: false },
          { id: "b", text: "layout asm", correct: true },
          { id: "c", text: "disasm --tui", correct: false },
          { id: "d", text: "tty asm", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d86-q2", type: "quiz", title: "Watchpoints",
        description: "Hardware-assisted breakpoints",
        question: "What limits the number of memory watchpoints you can use on x86-64?",
        options: [
          { id: "a", text: "The size of the GDB history buffer", correct: false },
          { id: "b", text: "The number of debug registers (four)", correct: true },
          { id: "c", text: "The number of processor cores", correct: false },
          { id: "d", text: "There is no limit — watchpoints are unlimited", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d86-c1", type: "code", title: "Watch the Value",
        description: "Set up a program you can watch with GDB",
        starterCode: `section .data
    counter dq 0

section .text
global _start

_start:
    ; Build a loop that modifies 'counter' 100 times
    mov rcx, 100
.loop:
    ; TODO: inc qword [counter]
    ; TODO: dec rcx / jnz .loop  — the loop writes counter each pass
    nop

    mov rax, 60
    xor rdi, rdi
    syscall

; gdb session to try:
;   gdb ./prog
;   break _start
;   watch counter
;   continue        ; stops on every write to counter`,
        hints: ["inc qword [counter] makes one write per iteration", "Watch the memory slot, not a register: watch counter", "continue after the first hit to see all 100 writes"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d86-a1", title: "Register Trace",
      description: "Write a NASM program with a hand-rolled counter loop, then produce a GDB register trace: break at _start, stepi through one full iteration, watch the loop counter, and print the register state at each step.",
      requirements: [
        "NASM loop that counts from 100 down to 0 using rax",
        "Document the exact GDB commands: layout asm, layout regs, break, stepi",
        "Watch the loop counter register and capture it changing",
        "Record the flags (rflags) before and after the decrement",
        "Explain what each stepi revealed about the instruction's effects",
      ],
      starterCode: `; counter.asm
section .text
global _start

_start:
    mov rax, 100
.loop:
    dec rax
    jnz .loop
    mov rax, 60
    xor rdi, rdi
    syscall

; gdb commands to run:
;   gdb ./counter
;   break _start
;   layout regs
;   stepi          ; watch rax decrement
;   info registers rflags`,
      rubric: [
        { criterion: "Correct NASM counter loop", points: 30 },
        { criterion: "Documented GDB command sequence", points: 25 },
        { criterion: "Watchpoint on the counter captured", points: 25 },
        { criterion: "Flags traced before/after the decrement", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
