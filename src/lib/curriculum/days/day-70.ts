import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Interrupts & Exceptions",
    subtitle: "Hardware events and handlers",
    tags: ["systems"],
    theory: {
      sections: [
        {
          heading: "IDT",
          content:
            "Every interrupt or exception is dispatched through the IDT (Interrupt Descriptor Table), an array of up to 256 16-byte gate descriptors in kernel memory. Each descriptor holds the code selector and offset of the handler plus a gate type — an interrupt gate clears IF so no further interrupts nest, a trap gate does not. The lidt instruction loads the table's base and limit, and it is one of the first things a kernel does on boot. Userspace never touches the IDT directly; installing and replacing descriptors is ring-0 territory.",
        },
        {
          heading: "ISR",
          content:
            "When an interrupt fires, the CPU pushes RFLAGS, CS, and RIP, looks up the vector in the IDT, and jumps to the ISR. Some exceptions push an error code onto the stack first — a page fault does, a divide error does not — and the handler must pop it before returning. The ISR saves every register it uses, handles the event, then runs iretq to pop RIP, CS, and RFLAGS and resume the interrupted code. Software interrupts are just the int instruction; int 0x80 was the classic 32-bit Linux syscall gate before the syscall instruction took over on x86-64.",
          codeExample: `; an ISR skeleton (kernel side, illustrative)
isr_pf:                     ; page fault handler (#PF, vec 14)
    push rax
    push rcx
    mov  rax, cr2          ; faulting virtual address
    ; ... handle the fault, fix the mapping ...
    pop  rcx
    pop  rax
    add  rsp, 8            ; discard the pushed error code
    iretq                  ; resume the faulting instruction`,
        },
        {
          heading: "Exception Vectors",
          content:
            "x86-64 defines 32 fixed exception vectors: #DE divide-by-zero (0), #DB debug (1), #NMI (2), #BP breakpoint (3), #OF overflow (4), #UD invalid opcode (6), #NM (7), #DF double fault (8), #TS (10), #NP (11), #SS (12), #GP general protection fault (13), #PF page fault (14), #MF (16), #AC alignment check (17), #MC machine check (18), #XF SIMD exception (19). Vectors 0x20 and up are hardware device interrupts — timer, keyboard, disk. At ring 0 a #GP is almost always a kernel bug; a #PF means an address failed to resolve through the page tables.",
        },
      ],
    },
    playground: {
      defaultCode: `; the software interrupt path
; int 0x80 is the classic 32-bit syscall gate.
; Modern x86-64 uses the syscall instruction instead.
section .data
    msg db 'via int 0x80', 0xA
    len equ $ - msg

section .text
global _start

_start:
    ; write(1, msg, len) through the 32-bit gate
    mov eax, 4
    mov ebx, 1
    mov ecx, msg
    mov edx, len
    int 0x80
    ; exit(0)
    mov eax, 1
    xor ebx, ebx
    int 0x80`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d70-q1", type: "quiz", title: "The Table",
        description: "How the CPU finds a handler",
        question: "What does the lidt instruction do?",
        options: [
          { id: "a", text: "Loads the base and limit of the interrupt descriptor table", correct: true },
          { id: "b", text: "Initializes the local APIC timer", correct: false },
          { id: "c", text: "Disables all interrupts until iretq", correct: false },
          { id: "d", text: "Sets up the page tables for kernel memory", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d70-q2", type: "quiz", title: "Error Codes",
        description: "Which exceptions push one",
        question: "Which exceptions push an error code onto the stack before the handler runs?",
        options: [
          { id: "a", text: "All 256 vectors push one", correct: false },
          { id: "b", text: "No exceptions push error codes", correct: false },
          { id: "c", text: "Some, like #PF and #GP, push one; #DE does not", correct: true },
          { id: "d", text: "Only software interrupts from the int instruction", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d70-c1", type: "code", title: "The 32-Bit Gate",
        description: "Issue a software interrupt to perform a syscall",
        starterCode: `section .data
    msg db 'via int 0x80', 0xA
    len equ $ - msg

section .text
global _start

_start:
    ; TODO: call sys_write through the int 0x80 gate.
    ; 32-bit ABI: eax=4 (write), ebx=1 (stdout),
    ; ecx=msg, edx=len
    nop
    ; then exit with eax=1, ebx=0
    nop`,
        hints: ["int 0x80 uses the 32-bit ABI — eax=4, ebx, ecx, edx", "The CPU returns to the instruction right after int", "Exit with eax=1 and ebx=0 through the same gate"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d70-a1", title: "Interrupt Path Notes",
      description: "Write a NASM program that prints two different messages by issuing the write syscall through the int 0x80 software-interrupt gate, exits through the same gate, and documents the CPU exception vectors (divide-by-zero, page fault, general protection fault) in comments.",
      requirements: [
        "Write both messages using int 0x80 with the correct 32-bit registers",
        "Exit via int 0x80 (eax=1, ebx=0)",
        "Comment the vector numbers: #DE = 0, #PF = 14, #GP = 13",
        "Comment on why syscall replaced int 0x80 on x86-64",
        "Set up a fresh .data string for each message",
      ],
      starterCode: `section .data
    msg1 db 'first message', 0xA
    len1 equ $ - msg1
    msg2 db 'second message', 0xA
    len2 equ $ - msg2

section .text
global _start

_start:
    ; TODO: write msg1 and msg2 via int 0x80, then exit
    nop`,
      rubric: [
        { criterion: "msg1 written via int 0x80", points: 25 },
        { criterion: "msg2 written via int 0x80", points: 25 },
        { criterion: "Exit through the same gate (eax=1, ebx=0)", points: 20 },
        { criterion: "Exception vector comments (#DE, #PF, #GP)", points: 30 },
      ],
      xpReward: 100,
    },
};

export default lesson;
