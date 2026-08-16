import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Virtualization Concepts",
    subtitle: "VMX, hypervisor basics, and hardware virtualization",
    tags: ["systems"],
    theory: {
      sections: [
        {
          heading: "VMX and Hardware Virtualization",
          content:
            "Intel VT-x (VMX) is the hardware contract that lets a hypervisor run guest operating systems with near-native performance. Before VMX, hypervisors used binary translation and trap-and-emulate, rewriting privileged instructions on the fly. VMX defines two operating modes: VMX root (the hypervisor) and VMX non-root (the guest). The CPU itself enforces privilege separation, so the guest can run ring-0 code without escaping.",
          codeExample: `; VMXON enables virtualization on a logical processor.
; The pointer must reference a 4KB-aligned VMXON region.
; Assume rax already holds a pointer to valid VMXON memory.
; CPUID.1:ECX.VMX[bit 5] must be 1, or VMXON #UDs.
mov rbx, rcx        ; rcx = &vmxon_region
vmxon [rbx]         ; enter VMX root operation
jc vmxon_failed     ; CF=1 => VMXON rejected the region
vmlaunch            ; enter the guest via VMCS (see below)`,
        },
        {
          heading: "VM Entries and Exits",
          content:
            "The VMCS (Virtual Machine Control Structure) is the per-vCPU state block that controls every VM entry and exit. vmlaunch starts a guest for the first time; vmresume re-enters an existing one. Any privileged operation in the guest — a sensitive instruction, an exception, or an EPT violation — traps out via VM exit, saving guest state and loading host state from the VMCS. Each exit is a full context switch with a defined exit reason in the VMCS EXIT_REASON field, which the hypervisor dispatches like an interrupt vector.",
        },
        {
          heading: "Extended Page Tables (EPT)",
          content:
            "EPT is the second-level address translation that virtualizes memory. The guest believes it controls its own page tables, but the CPU walks the guest PTEs first, then the EPT tables the hypervisor owns, to reach physical memory. This gives the hypervisor full control over guest memory with a single memory-faulting mechanism: an EPT violation, reported with the faulting guest physical address in the VMCS. EPT is what makes nested page tables fast — without it, every guest memory access would trap into the hypervisor.",
        },
      ],
    },
    playground: {
      defaultCode: `; Virtualization groundwork: probe for VMX support.
; CPUID.1:ECX.VMX (bit 5) reports VT-x availability.
mov rax, 1
cpuid
bt ecx, 5
jc vmx_supported
mov rdi, 0          ; exit code 0 = no VMX
jmp done
vmx_supported:
mov rdi, 1          ; exit code 1 = VMX present
done:
mov rax, 60
syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d91-q1", type: "quiz", title: "VMX Modes",
        description: "How VMX separates hypervisor from guest",
        question: "In Intel VT-x, which two operating modes does the CPU define?",
        options: [
          { id: "a", text: "Kernel mode and user mode", correct: false },
          { id: "b", text: "VMX root and VMX non-root", correct: true },
          { id: "c", text: "Ring 0 and Ring 3", correct: false },
          { id: "d", text: "Host mode and guest real mode", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d91-q2", type: "quiz", title: "EPT Purpose",
        description: "What EPT translates",
        question: "What does the Extended Page Table (EPT) translate?",
        options: [
          { id: "a", text: "Virtual addresses to physical addresses inside the guest", correct: false },
          { id: "b", text: "Guest physical addresses to host physical addresses", correct: true },
          { id: "c", text: "Logical to linear addresses in the hypervisor", correct: false },
          { id: "d", text: "I/O port numbers to memory-mapped registers", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d91-c1", type: "code", title: "VMX Probe",
        description: "Write a NASM program that uses CPUID to probe VMX support and exits 1 if present, 0 if not.",
        starterCode: `section .text
global _start

_start:
    ; TODO: Leaf 1, then test ECX bit 5 for VMX
    ; Exit code: 1 = VMX supported, 0 = not supported
    nop`,
        hints: ["Set rax=1 before cpuid", "Test ECX bit 5 with bt", "Use jc to branch on the carry flag", "Call sys_exit (rax=60) with the result in rdi"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d91-a1", title: "VMX Detection Utility",
      description: "Write a NASM program that probes for VMX, prints 'VMX SUPPORTED' or 'NO VMX', and exits with 1 or 0 accordingly. On modern hardware also verify VT-x is enabled in firmware by checking MSR IA32_FEATURE_CONTROL (0x3A) bit 0.",
      requirements: [
        "Use CPUID leaf 1 to check ECX.VMX (bit 5)",
        "Read MSR 0x3A via rdmsr to check the lock and enable bits",
        "Print 'VMX SUPPORTED' via sys_write when both checks pass",
        "Print 'NO VMX' and exit 0 when either check fails",
        "Comment every non-obvious instruction",
      ],
      starterCode: `section .data
    yes_msg db 'VMX SUPPORTED', 0xA
    yes_len equ $ - yes_msg
    no_msg  db 'NO VMX', 0xA
    no_len  equ $ - no_msg

section .text
global _start

_start:
    ; TODO: CPUID probe + MSR check, then print and exit
    nop`,
      rubric: [
        { criterion: "CPUID VMX probe correct", points: 30 },
        { criterion: "MSR IA32_FEATURE_CONTROL read and check", points: 25 },
        { criterion: "Correct output for both outcomes", points: 25 },
        { criterion: "Clean section layout and comments", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
