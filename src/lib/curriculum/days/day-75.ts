import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Bootloader Concepts",
    subtitle: "First code the CPU executes",
    tags: ["boot"],
    theory: {
      sections: [
        {
          heading: "BIOS/UEFI",
          content:
            "When the machine powers on, no operating system exists yet — firmware decides what runs. Classic BIOS finds a bootable device, loads its first 512-byte sector (the boot sector) into memory at 0x7C00, and jumps to it. UEFI is the modern successor: a mini-operating-system with its own drivers and a filesystem-aware loader that reads an EFI executable from an ESP (EFI System Partition) and calls it with a structured interface. For the low-level bootloader story, the classic BIOS + 0x7C00 model is where you learn how the CPU starts from nothing.",
        },
        {
          heading: "Real Mode",
          content:
            "On power-up an x86 CPU runs in real mode: a 16-bit compatibility mode with a 20-bit address space (1 MB) reached through segment:offset addressing. The segment register holds a base that is shifted left 4 bits and added to the offset, so 0x7C0:0x0 and 0x0000:0x7C00 refer to the same address. Interrupts are the way real-mode code calls the firmware — int 0x10 prints text to the screen, int 0x13 reads disk sectors. Code written for real mode is [BITS 16] in NASM, and you can build and test it quickly in QEMU.",
          codeExample: `; Minimal real-mode boot sector
[bits 16]
[org 0x7C00]          ; where BIOS loads us

start:
    mov ah, 0x0E       ; BIOS teletype output
    mov al, 'A'
    int 0x10           ; print 'A'

hang:
    jmp hang           ; loop forever

times 510-($-$$) db 0  ; pad to 510 bytes
dw 0xAA55              ; boot signature (bytes 511-512)`,
        },
        {
          heading: "Stage Loaders",
          content:
            "A single 512-byte sector can barely hold a hello-world, let alone an operating system. So real bootloaders are staged: stage 1 (the boot sector) is tiny and does just enough — set up a stack, enter protected or long mode, and load a larger stage 2 from disk into memory via BIOS int 0x13, then jump to it. Stage 2, which can be many kilobytes, does the real work of reading the kernel into memory and preparing the CPU. LILO and GRUB's early chainloader follow exactly this pattern; the split exists purely because of the 512-byte sector-size constraint.",
        },
      ],
    },
    playground: {
      defaultCode: `; Minimal real-mode boot sector
[bits 16]
[org 0x7C00]

start:
    mov ah, 0x0E
    mov al, 'A'
    int 0x10

hang:
    jmp hang

times 510-($-$$) db 0
dw 0xAA55`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d75-q1", type: "quiz", title: "Load Address",
        description: "Where BIOS places the boot sector",
        question: "Where does the BIOS load the first 512-byte boot sector in real mode?",
        options: [
          { id: "a", text: "0x7C00", correct: true },
          { id: "b", text: "0x0000", correct: false },
          { id: "c", text: "0x100000", correct: false },
          { id: "d", text: "0x7E00", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d75-q2", type: "quiz", title: "Boot Signature",
        description: "The magic bytes that mark a bootable sector",
        question: "What signature must the last two bytes of a boot sector contain?",
        options: [
          { id: "a", text: "0xAA55", correct: true },
          { id: "b", text: "0x55AA", correct: false },
          { id: "c", text: "0x0D0A", correct: false },
          { id: "d", text: "0xFFFFFFFF", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d75-c1", type: "code", title: "Bootable Skeleton",
        description: "Write a minimal boot sector with the correct signature",
        starterCode: `[bits 16]
[org 0x7C00]

start:
    ; TODO: print a single character with BIOS int 0x10
    ; (set ah=0x0E, al=character, then int 0x10)
    nop

hang:
    jmp hang

; TODO: pad the sector to 510 bytes
; and write the 0xAA55 boot signature`,
        hints: ["Pad with times 510-($-$$) db 0", "Append dw 0xAA55", "Set ah=0x0E and al='X' before int 0x10"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d75-a1", title: "Printing Bootloader",
      description: "Build a real-mode boot sector that prints 'ASTA' to the screen using BIOS int 0x10 teletype, assembles to exactly 512 bytes with the 0xAA55 signature, and runs under QEMU (qemu-system-x86_64 boot.img).",
      requirements: [
        "Use [bits 16] and [org 0x7C00]",
        "Print the four characters A, S, T, A via int 0x10 with ah=0x0E",
        "Assemble with nasm -f bin to boot.img",
        "Pad to 512 bytes and append the 0xAA55 signature",
        "Boot it in QEMU and confirm the output",
      ],
      starterCode: `; boot.asm — 'ASTA' bootloader
[bits 16]
[org 0x7C00]

start:
    ; TODO: loop over the message, printing each char
    jmp hang

msg db 'ASTA', 0

hang:
    jmp hang

times 510-($-$$) db 0
dw 0xAA55`,
      rubric: [
        { criterion: "Correct real-mode setup ([bits 16], [org 0x7C00])", points: 25 },
        { criterion: "Characters printed via int 0x10", points: 30 },
        { criterion: "Exact 512-byte sector with 0xAA55", points: 25 },
        { criterion: "Boots in QEMU", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
