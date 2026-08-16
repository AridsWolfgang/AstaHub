import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Paging & Virtual Memory",
    subtitle: "Page tables and address translation",
    tags: ["memory"],
    theory: {
      sections: [
        {
          heading: "Page Tables",
          content:
            "Paging translates every virtual address to a physical address through a hierarchy of tables in memory. x86-64 uses four levels: the PML4 table is pointed to by the CR3 register; each entry points to a page-directory-pointer table (PDPT), then a page-directory (PD), then a page-table (PT), and finally a 4 KB page. A 48-bit virtual address is sliced into five fields: four indexes into these tables plus a 12-bit offset within the page. Each table entry holds the physical address of the next level plus permission and status bits — present, read/write, user/supervisor, and accessed. Walking these tables is exactly what the CPU's MMU does on every memory access.",
          codeExample: `; x86-64 4-level page walk (48-bit addresses):
; Virtual address: [47:39] [38:30] [29:21] [20:12] [11:0]
;                   PML4idx  PDPTidx   PDidx   PTidx  offset
;
; CR3 -> PML4 base
; PML4[PML4idx] -> PDPT base
; PDPT[PDPTidx] -> PD base
; PD[PDidx]     -> PT base
; PT[PTidx]     -> Physical page
; Physical page + offset = physical address`,
        },
        {
          heading: "TLB",
          content:
            "Walking four tables for every single memory access would be catastrophically slow, so the CPU caches recently used translations in the Translation Lookaside Buffer (TLB). The TLB maps virtual pages directly to physical pages so the common case skips the page walk entirely. TLB misses — especially for code that touches many distinct pages, like scanning a large array — are a real performance cost, which is why memory layouts that maximize locality also maximize TLB hit rates. When the OS changes a page table, it must flush the relevant TLB entries (invlpg for one page, or a CR3 reload to flush everything) or stale translations will be used.",
        },
        {
          heading: "CR3 Register",
          content:
            "CR3 holds the physical address of the top-level page table (PML4 in long mode) and is the hardware switch that flips between address spaces. On a context switch the kernel loads a new CR3 so each process sees its own virtual address space; the CPU uses the loaded page tables for all subsequent translation. CR3 is a privileged register — reading or writing it requires ring 0, which is exactly how the kernel isolates one process's mappings from another's. Writing CR3 also flushes the TLB, so context switches carry a translation-cache penalty that kernel developers work hard to minimize.",
        },
      ],
    },
    playground: {
      defaultCode: `; Page table entry (PTE) bit layout (4K page):
; Bit 0:  P    present
; Bit 1:  R/W  read/write
; Bit 2:  U/S  user/supervisor
; Bit 3:  PWT  page-level write-through
; Bit 4:  PCD  cache disable
; Bit 5:  A    accessed
; Bit 6:  D    dirty
; Bit 7:  PAT  page attribute table
; Bits 8-11:   ignored (available to software)
; Bits 12-51:  physical page frame number
; Bits 52-62:  OS-reserved / NX flags
;
; A present, writable, user page:
;   frame_addr | 0x7   (P + R/W + U/S)
;
; Read current top-level table:
;   mov rax, cr3`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d77-q1", type: "quiz", title: "Page Walk Levels",
        description: "How deep is the x86-64 page table hierarchy",
        question: "How many levels of page tables does an x86-64 4 KB page walk use?",
        options: [
          { id: "a", text: "2", correct: false },
          { id: "b", text: "3", correct: false },
          { id: "c", text: "4", correct: true },
          { id: "d", text: "5", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d77-q2", type: "quiz", title: "TLB",
        description: "The translation cache",
        question: "What is the TLB?",
        options: [
          { id: "a", text: "A cache of recent virtual-to-physical translations", correct: true },
          { id: "b", text: "A hardware clock", correct: false },
          { id: "c", text: "A cache of executed instructions", correct: false },
          { id: "d", text: "The interrupt descriptor table", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d77-c1", type: "code", title: "Build a PTE",
        description: "Compute the page table entry bits for a page",
        starterCode: `; A 4 KB page starts at physical address 0x12345000.
; Build its PTE value: present + read/write + user.
;
; TODO: set rax to the PTE value
;   frame = 0x12345000
;   flags = 0x7   (P + R/W + U/S)
;   pte   = frame | flags
section .text
global _start
_start:
    mov rax, 0x12345000
    ; TODO: OR in the flags, then done
    nop`,
        hints: ["pte = frame | 0x7", "Use the OR instruction", "Result should be 0x12345007"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d77-a1", title: "Page Walker",
      description: "Write a NASM routine that simulates a page walk: given a virtual address in RAX and a PML4 base in RBX, extract the four index fields and print them (as hex) using sys_write. This trains the mental model of address slicing without needing ring 0.",
      requirements: [
        "Extract the PML4 index (bits 47:39)",
        "Extract the PDPT index (bits 38:30)",
        "Extract the PD index (bits 29:21)",
        "Extract the PT index (bits 20:12)",
        "Convert each to hex text and write them to stdout",
      ],
      starterCode: `; page_walk.asm — print the 4 index fields of a VA
section .text
global _start
_start:
    mov rax, 0x0123456789ABCDEF   ; example VA
    ; TODO: isolate and print each index
    nop
    mov rax, 60
    xor rdi, rdi
    syscall`,
      rubric: [
        { criterion: "PML4 index extracted correctly", points: 25 },
        { criterion: "PDPT and PD indexes extracted", points: 30 },
        { criterion: "PT index extracted", points: 20 },
        { criterion: "Hex output written via sys_write", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
