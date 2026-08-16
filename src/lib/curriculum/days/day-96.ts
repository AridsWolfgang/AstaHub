import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Multi-core ASM Programming",
    subtitle: "APIC, SMP, and inter-processor interrupts",
    tags: ["systems"],
    theory: {
      sections: [
        {
          heading: "The Local APIC",
          content:
            "Every x86-64 core has a local APIC — its own interrupt controller mapped at the fixed address 0xFEE00000. The local APIC delivers interrupts to that specific core, manages the timer, and receives inter-processor interrupts (IPIs). Register 0xFEE000B0 is the End-Of-Interrupt (EOI) register: software writes 0 after handling an interrupt to tell the APIC the handler is done. The LVT (Local Vector Table) at 0xFEE00300+ programs which vectors the timer, LINT0, and LINT1 lines fire, and whether delivery is to the current or another CPU.",
          codeExample: `; Program the local APIC timer via the LVT.
; LVT timer register is at 0xFEE00320.
; Bit 17 set = periodic mode; vector 0x40 selected.
mov rax, 0x10040        ; bit 17 (periodic) | vector 0x40
mov rdx, 0xFEE00320
mov [rdx], eax
; Set the initial count register (0xFEE00380)
mov eax, 100000         ; counts down at bus clock
mov rdx, 0xFEE00380
mov [rdx], eax
; Timer now fires IRQ 0x40 on this core repeatedly.`,
        },
        {
          heading: "SMP Boot",
          content:
            "Booting multiple cores starts with the BSP (Bootstrap Processor) and wakes the APs (Application Processors). The BSP sends an INIT IPI followed by a STARTUP IPI to each AP, which then begins executing real-mode code at physical 0x8000 of a 4KB-aligned trampoline. The trampoline switches the AP to 64-bit mode, loads a per-CPU stack, and jumps to the kernel's secondary entry. Each core is identified by its APIC ID, read from the local APIC ID register at 0xFEE00020, and each needs its own stack, GDT, and TSS before touching kernel structures.",
        },
        {
          heading: "Inter-processor Interrupts",
          content:
            "IPIs are how one core tells another core to do something. Software writes the destination (I/O APIC redirect or the local APIC ICR at 0xFEE00300) with the delivery mode: fixed (vector), NMI, or INIT/STARTUP for boot. Writing the ICR with a shorthand field — self, all including self, or all excluding self — targets whole groups. A common primitive is the TLB shootdown: core A writes a vector to the others, each flushes its TLB on the IPI, and A waits on a shared flag. The flag must be observed with memory barriers; on x86 a locked instruction or mfence orders the IPI against the shared writes.",
        },
      ],
    },
    playground: {
      defaultCode: `; Send a fixed-vector IPI to all other cores via the ICR.
; ICR register at 0xFEE00300 (this is the local APIC window).
; field 31-30 destination shorthand: 11 = all except self
; field 7-0   vector: 0x40
mov eax, 0xC00040
mov edx, 0xFEE00300
mov [edx], eax
; Each target core takes vector 0x40. The sending core
; proceeds immediately; targets handle it asynchronously.`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d96-q1", type: "quiz", title: "EOI",
        description: "The APIC completion signal",
        question: "What does writing 0 to the local APIC's End-Of-Interrupt (EOI) register accomplish?",
        options: [
          { id: "a", text: "Signals the APIC that the interrupt handler is finished", correct: true },
          { id: "b", text: "Clears the entire interrupt descriptor table", correct: false },
          { id: "c", text: "Shuts down the current core", correct: false },
          { id: "d", text: "Flushes the TLB of every core", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d96-q2", type: "quiz", title: "SMP Wake-up",
        description: "How APs are brought online",
        question: "What sequence does the BSP use to bring an Application Processor online?",
        options: [
          { id: "a", text: "An INIT IPI followed by a STARTUP IPI", correct: true },
          { id: "b", text: "A single NMI with the vector pre-set", correct: false },
          { id: "c", text: "Writing directly to the AP's registers", correct: false },
          { id: "d", text: "A broadcast EOI to all cores", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d96-c1", type: "code", title: "IPI Broadcast",
        description: "Write a NASM snippet that programs the local APIC ICR to send a fixed-vector IPI to all cores except the sender.",
        starterCode: `section .text
global send_ipi

; Send vector 0x40 to all cores except self.
send_ipi:
    ; TODO: build the ICR value and store it at 0xFEE00300
    nop
    ret`,
        hints: ["Destination shorthand all-except-self is bits 31-30 = 11", "Vector goes in bits 7-0", "The ICR is a 32-bit register at 0xFEE00300", "Store with mov [0xFEE00300], eax after loading the value"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d96-a1", title: "APIC Timer Kickoff",
      description: "Write an assembly routine that initializes the local APIC timer in periodic mode with vector 0x40, programs an initial count, and installs a bare interrupt gate for that vector that writes EOI and increments a shared counter.",
      requirements: [
        "Program the LVT timer (0xFEE00320) to periodic, vector 0x40",
        "Set the initial count register (0xFEE00380)",
        "Provide a minimal handler that writes EOI and bumps a counter",
        "Install the gate into the IDT (a table of 16-byte entries)",
        "Comment the LVT field bits you set",
      ],
      starterCode: `section .data
    ticks: dq 0

section .text
global timer_init
global timer_handler

; Program LVT + initial count
timer_init:
    ; TODO: LVT timer periodic + vector 0x40,
    ;       initial count, then ret
    nop
    ret

; Interrupt handler for vector 0x40
timer_handler:
    ; TODO: write EOI, bump ticks, return
    nop
    ret`,
      rubric: [
        { criterion: "LVT timer programmed correctly", points: 30 },
        { criterion: "Initial count set", points: 15 },
        { criterion: "Handler writes EOI and bumps ticks", points: 25 },
        { criterion: "Gate installation and bit comments", points: 30 },
      ],
      xpReward: 100,
    },
};

export default lesson;
