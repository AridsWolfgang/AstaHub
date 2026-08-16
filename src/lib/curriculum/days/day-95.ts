import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "UEFI Applications in ASM",
    subtitle: "Building UEFI apps from scratch",
    tags: ["boot"],
    theory: {
      sections: [
        {
          heading: "The UEFI System Table",
          content:
            "When firmware hands control to a UEFI application, RDI holds a pointer to the EFI System Table — the root of every service the firmware offers. The table's header carries its signature and revision, and its fields give you the console output table, the boot services table, and the runtime services table. From this one pointer you can print to the screen, allocate memory, and read variables. A UEFI app is a PE32+ binary with a defined entry point; on x86-64 the calling convention follows the System V AMD64 ABI, so your first move in assembly is saving RDI (the System Table pointer) before doing anything else.",
          codeExample: `; UEFI application entry (x86-64, System V ABI).
; Firmware calls us with rdi = SystemTable pointer.
; Boot services are still available (ExitBootServices not yet called).
;   ; in C this is: EFI_STATUS EfiMain(EFI_HANDLE, EFI_SYSTEM_TABLE*)
;   ; rax return 0 = EFI_SUCCESS
section .text
global EfiMain
extern uefi_print        ; helper that walks the System Table
EfiMain:
    push rbp
    mov rbp, rsp
    ; rdi already holds the SystemTable -> forward it
    call uefi_print
    xor eax, eax         ; EFI_SUCCESS
    pop rbp
    ret`,
        },
        {
          heading: "Protocols and GUIDs",
          content:
            "Everything in UEFI is a protocol: a structure of function pointers identified by a 128-bit GUID. To use a service you call LocateProtocol with a GUID and receive a pointer to an interface full of function pointers. For example, the Graphics Output Protocol (GOP) GUID 0x9042A9DE-23DC-4A38-96FB-7ADED080516A hands you the Blt function used for framebuffer drawing. Each call follows the same shape: the protocol interface pointer is passed as the first argument, so indirect calls through those function pointers are straightforward to write in assembly once you know the table offset.",
        },
        {
          heading: "Boot Flow and the UEFI Handoff",
          content:
            "UEFI loads your PE32+ image, applies relocations, and calls the entry point. From there you may use boot services until you call ExitBootServices, which hands the platform to you — after that only runtime services remain and your code owns the machine. The practical assembly-only app is minimal: print a message via the console output table, then return EFI_SUCCESS to let the firmware continue booting. A freestanding build needs no libc: gcc -ffreestanding -mno-red-zone combined with your own .text section and an EFI_NX-compatible PE header.",
        },
      ],
    },
    playground: {
      defaultCode: `; Minimal UEFI entry skeleton (x86-64, System V ABI).
; Entry: rdi = SystemTable.
section .text
global EfiMain
EfiMain:
    ; rdi = SystemTable is already set by firmware.
    ; uefi_print(rdi) would walk ConOut->OutputString.
    ; For now we just return EFI_SUCCESS.
    xor eax, eax
    ret`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d95-q1", type: "quiz", title: "Entry Handoff",
        description: "How firmware calls a UEFI app",
        question: "On x86-64, which register does UEFI firmware use to pass the System Table pointer to an application entry point?",
        options: [
          { id: "a", text: "rcx", correct: false },
          { id: "b", text: "rdi", correct: true },
          { id: "c", text: "rsp", correct: false },
          { id: "d", text: "rbx", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d95-q2", type: "quiz", title: "GUIDs",
        description: "How protocols are identified",
        question: "What identifies a UEFI protocol uniquely?",
        options: [
          { id: "a", text: "A 128-bit GUID", correct: true },
          { id: "b", text: "A 16-bit service number", correct: false },
          { id: "c", text: "The address of the protocol struct", correct: false },
          { id: "d", text: "The protocol's string name hash", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d95-c1", type: "code", title: "UEFI Entry Skeleton",
        description: "Write an assembly UEFI entry point that preserves the System Table pointer, calls a helper, and returns EFI_SUCCESS.",
        starterCode: `section .text
global EfiMain
extern helper

; Entry: rdi = SystemTable
EfiMain:
    ; TODO: set up a frame, forward the pointer, return 0
    nop
    ret`,
        hints: ["Save rdi before any call so the helper can use it", "Push rbp / mov rbp, rsp for a clean frame", "Return 0 (EFI_SUCCESS) in rax", "The System V ABI is in effect on x86-64 UEFI"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d95-a1", title: "UEFI Bootstrap Loader",
      description: "Design a minimal UEFI application in assembly that prints a banner, locates the Graphics Output Protocol by GUID, and returns a success status. Structure it as: entry point, a print helper that walks the System Table, and a protocol-lookup helper with the GUID laid out in .data.",
      requirements: [
        "Entry point saves the System Table pointer and calls the print helper",
        "Print helper dereferences ConOut->OutputString and writes a banner",
        "LocateProtocol called with the GOP GUID (bytes in .data)",
        "Return EFI_SUCCESS (0) at the end",
        "Comment the GUID layout and each indirect call target",
      ],
      starterCode: `section .data
    banner:   dw 'A',0,'S',0,'M',0,'U',0,'E',0,'F',0,'I',0, 0
    gop_guid: db 0xDE, 0xA9, 0x42, 0x90,
              db 0xDC, 0x23,
              db 0x38, 0x4A,
              db 0x96, 0xFB, 0x7A, 0xDE, 0xD0, 0x80, 0x51, 0x6A

section .text
global EfiMain
extern helper

EfiMain:
    ; TODO: save rdi, print banner, locate protocol, return 0
    nop
    ret`,
      rubric: [
        { criterion: "Entry point preserves and uses SystemTable", points: 30 },
        { criterion: "Print helper walks ConOut->OutputString", points: 25 },
        { criterion: "GOP GUID laid out correctly and located", points: 25 },
        { criterion: "Clean structure with commented indirect calls", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
