import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Memory Segmentation",
    subtitle: "Segments, GDT, and protected mode",
    tags: ["memory"],
    theory: {
      sections: [
        {
          heading: "Segments",
          content:
            "Before paging, x86 protected mode organized memory into segments, each described by a descriptor in the Global Descriptor Table (GDT). A segment is a region with a base address, a limit (its maximum size), and access rights. The segment registers — CS for code, DS for data, SS for the stack, ES/FS/GS for extras — hold selectors that index into the GDT. Every memory access pairs a segment with an offset, and the CPU checks the offset against the segment's limit and permission bits as part of the access. This was how x86 did memory protection before the modern paging model took over.",
          codeExample: `; Segment descriptor layout (64-bit, one entry)
; Bits 0-15:   limit[15:0]
; Bits 16-39:  base[23:0]
; Bits 40-43:  type (code/data, read/write, accessed)
; Bits 44-46:  DPL (ring 0-3)
; Bit  47:     P (present)
; Bits 48-51:  limit[19:16]
; Bits 52-55:  flags (G=granularity, D/B, L, AVL)
; Bits 56-63:  base[31:24]
;
; A flat code segment: 00 CF 9A 00 00 00 00 00
; A flat data segment: 00 CF 92 00 00 00 00 00`,
        },
        {
          heading: "GDT",
          content:
            "The GDT is a table of segment descriptors the CPU indexes with selectors. The first entry (index 0) must be null — it exists so a zeroed selector is guaranteed to fault. Typical operating systems define a flat code segment covering the whole address space and a flat data segment, both with a base of 0 and a limit spanning 4 GB, so that logically the OS ignores segmentation and relies on paging. The GDT is loaded with lgdt, which takes a pseudo-descriptor holding the table's size and address; once loaded, far jumps and far returns (with a new selector) switch to the new segment layout.",
        },
        {
          heading: "Protected Mode",
          content:
            "Protected mode is what real-mode becomes once the GDT is set up and the PE (Protection Enable) bit in CR0 is set. Addresses are no longer 20-bit segment:offset — they become 32-bit offsets validated against descriptors, and privilege rings (0 = kernel, 3 = user) gate which instructions and I/O ports a segment can touch. Switching from real mode requires: build the GDT, disable interrupts, load lgdt, set CR0.PE, and execute a far jump to flush the pipeline into the protected mode code segment. The 0x7C00 boot sector code that printed 'A' with BIOS interrupts cannot work after this switch — BIOS services die with real mode.",
        },
      ],
    },
    playground: {
      defaultCode: `; Flat 32-bit segment descriptors for protected mode
; GDT:
gdt_start:
    dq 0x0000000000000000          ; null descriptor
gdt_code:
    dq 0x00CF9A000000FFFF          ; 32-bit code, ring 0
gdt_data:
    dq 0x00CF92000000FFFF          ; 32-bit data, ring 0
gdt_end:

gdt_desc:
    dw gdt_end - gdt_start - 1
    dd gdt_start

; Load with:  lgdt [gdt_desc]
; Set PE:     mov eax, cr0; or eax, 1; mov cr0, eax
; Far jump:   jmp 0x08:protected_start`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d76-q1", type: "quiz", title: "Descriptor Contents",
        description: "What a segment descriptor encodes",
        question: "Which of the following is NOT stored in a segment descriptor?",
        options: [
          { id: "a", text: "Base address", correct: false },
          { id: "b", text: "Limit", correct: false },
          { id: "c", text: "Privilege level (DPL)", correct: false },
          { id: "d", text: "The page table pointer (CR3 value)", correct: true },
        ],
        xpReward: 25,
      },
      {
        id: "d76-q2", type: "quiz", title: "First GDT Entry",
        description: "The mandatory null descriptor",
        question: "Why must the first GDT entry be a null descriptor?",
        options: [
          { id: "a", text: "A zeroed selector must reliably fault", correct: true },
          { id: "b", text: "It stores the table length", correct: false },
          { id: "c", text: "It is reserved for the kernel", correct: false },
          { id: "d", text: "It is required for paging to work", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d76-c1", type: "code", title: "Flat Descriptors",
        description: "Encode a flat 32-bit code descriptor",
        starterCode: `; TODO: write the 8 bytes of a flat, ring-0,
; 32-bit code segment descriptor as a dq literal.
; Flags: present, ring 0, code, granularity 4K,
; D-bit set (32-bit), limit 0xFFFFF.
gdt_code:
    dq 0x0000000000000000   ; <- replace this
`,
        hints: ["The answer is 0x00CF9A000000FFFF", "Break it into base=0, limit=0xFFFFF, access 0x9A, flags 0xC", "Type 0x9A = present, ring 0, code, execute/read"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d76-a1", title: "GDT Builder",
      description: "Write a NASM file defining a full GDT (null, code, data), the lgdt pseudo-descriptor, and the real-mode-to-protected-mode switch sequence ending in a far jump into a 32-bit code section.",
      requirements: [
        "Define null, flat code, and flat data descriptors",
        "Define the GDT size/address pseudo-descriptor",
        "Disable interrupts and set CR0.PE",
        "Execute the far jump into the code selector",
        "Enter a [bits 32] section after the switch",
      ],
      starterCode: `; protected mode switch skeleton
[bits 16]
section .text
global _start

_start:
    cli
    ; TODO: lgdt [gdt_desc]
    ; TODO: set CR0.PE, then far jump:
    ;       jmp 0x08:protected_start

[bits 32]
protected_start:
    ; 32-bit code lives here
    nop`,
      rubric: [
        { criterion: "GDT with null/code/data descriptors", points: 30 },
        { criterion: "lgdt with correct pseudo-descriptor", points: 25 },
        { criterion: "CR0.PE set and pipeline flushed via far jump", points: 25 },
        { criterion: "32-bit section entered correctly", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
