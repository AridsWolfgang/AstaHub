import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Device Drivers Concept",
    subtitle: "Talking to hardware from ASM",
    tags: ["drivers"],
    theory: {
      sections: [
        {
          heading: "Port I/O",
          content:
            "x86 has two ways to reach hardware: port I/O and memory-mapped I/O. Port I/O uses dedicated instructions — in and out — that talk to a separate 64 KB I/O address space. in al, dx reads a byte from the port in DX; out dx, al writes a byte. Classic devices live here: the keyboard controller at 0x60/0x64, the PIC interrupt controller at 0x20/0x21, the PC speaker and legacy timer. In and out are privileged beyond the first 0xFF ports (access requires ring 0 or an IOPL of 3), so real drivers wrap them in kernel code, but a bootloader running at ring 0 can use them freely.",
          codeExample: `; Read a byte from the keyboard status port:
;   port 0x64 (status) is read-only
section .text
global _start
_start:
    mov dx, 0x64
    in al, dx        ; al = keyboard status byte
    nop

; Write a byte to a port (legacy PIC, port 0x21):
;   mov dx, 0x21
;   mov al, 0xFF     ; mask all IRQs
;   out dx, al`,
        },
        {
          heading: "MMIO",
          content:
            "Memory-mapped I/O places hardware registers directly in the physical address space, so the CPU accesses them with ordinary loads and stores. The classic example is the VGA text buffer at 0xB8000: writing a character and attribute byte to [0xB8000 + row*160 + col*2] puts it on the screen with no special instruction. MMIO registers are often volatile and have side effects on any access, so drivers must use volatile-qualified pointers or explicit asm to stop the compiler from caching reads or eliding writes. Accessing an MMIO register through the paging tables also needs the memory-type attributes (write-combining vs. uncached) configured correctly.",
        },
        {
          heading: "Interrupt Handlers",
          content:
            "Hardware announces itself to the CPU through interrupts: the device raises a line, the PIC or APIC delivers it, and the CPU jumps to the handler registered in the IDT for that vector. A driver's interrupt handler runs in a special context — it must be fast, save every register it touches, acknowledge the device, do the minimal work (often just copy data or set a flag), and return with iretq. Long work is deferred to a bottom half. Writing an interrupt handler in assembly means you control exactly what is saved and restored, which is why low-level driver bring-up is still done in asm on embedded targets.",
        },
      ],
    },
    playground: {
      defaultCode: `; VGA text-mode MMIO: write 'X' at row 0, col 0
section .text
global _start
_start:
    mov rax, 0xB8000      ; VGA text buffer base
    mov byte [rax], 'X'   ; character
    mov byte [rax+1], 0x07 ; attribute: light gray on black
    nop

; Port I/O recap:
;   in  al, dx    ; read a byte from port dx
;   in  ax, dx    ; read a word
;   out dx, al    ; write a byte to port dx
;   out dx, ax    ; write a word`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d79-q1", type: "quiz", title: "Two I/O Spaces",
        description: "How x86 reaches hardware",
        question: "What are the two ways x86 CPUs can access hardware registers?",
        options: [
          { id: "a", text: "Port I/O (in/out) and memory-mapped I/O", correct: true },
          { id: "b", text: "DMA and PIO", correct: false },
          { id: "c", text: "syscalls and signals", correct: false },
          { id: "d", text: "Interrupts and exceptions", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d79-q2", type: "quiz", title: "VGA Buffer",
        description: "The classic MMIO example",
        question: "How does a driver write a character to the VGA text buffer?",
        options: [
          { id: "a", text: "Store the character to the buffer address, e.g. 0xB8000", correct: true },
          { id: "b", text: "Call the BIOS print interrupt", correct: false },
          { id: "c", text: "Use the out instruction to a VGA port", correct: false },
          { id: "d", text: "Send it over DMA", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d79-c1", type: "code", title: "Write to a Port",
        description: "Send a mask byte to the legacy PIC",
        starterCode: `section .text
global _start
_start:
    ; TODO: write 0xFF to the master PIC mask (port 0x21)
    ; so every IRQ line is masked
    nop
    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["Load 0xFF into al", "Load 0x21 into dx", "Use the out instruction"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d79-a1", title: "VGA Driver Skeleton",
      description: "Write a NASM routine that acts as a minimal VGA text driver: clear the screen (fill 25x80 cells with spaces), then print a short message starting at row 5, column 10 — all through direct MMIO stores to 0xB8000.",
      requirements: [
        "Clear all 80x25 cells (space + attribute 0x07)",
        "Compute the character offset: row*160 + col*2",
        "Print at least 8 characters via MMIO stores",
        "Loop over the message with a string pointer",
        "No BIOS calls — only direct memory writes",
      ],
      starterCode: `; vga.asm — minimal VGA text driver
section .data
    msg db 'ASTA DRIVER', 0

section .text
global _start
_start:
    ; TODO: fill screen with spaces
    ; TODO: print msg at row 5, col 10
    nop
    mov rax, 60
    xor rdi, rdi
    syscall`,
      rubric: [
        { criterion: "Screen cleared via MMIO fill", points: 30 },
        { criterion: "Row/col to address math correct", points: 25 },
        { criterion: "Message printed by walking pointers", points: 25 },
        { criterion: "Clean loop structure", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
