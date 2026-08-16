import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Exception Handling in ASM",
    subtitle: "SEH, error handling, and fault recovery",
    tags: ["systems"],
    theory: {
      sections: [
        {
          heading: "Structured Exception Handling",
          content:
            "On Linux, exceptions are delivered to user space as signals; on Windows, the kernel uses Structured Exception Handling, a linked list of frames that the runtime walks to find a handler. When a fault occurs on x86-64, the CPU pushes the return context — RIP, CS, RFLAGS, then RSP and SS on a privilege change — and, for faults with one, an error code on top. A handler receives the signal number, a pointer to the faulted context, and the address of the faulting instruction, which is exactly enough to inspect and, in principle, repair the situation.",
          codeExample: `; Fault delivery frame on x86-64 (Linux, user mode)
;
; The CPU pushes (from faulting context):
;   RIP, CS, RFLAGS        -- pushed unconditionally
;   RSP, SS                -- pushed on ring change
;   error code             -- #PF, #GP, #DE have one; #UD does not
;
; Minimal SIGSEGV handler skeleton (ucontext_t* uc is in RSI):
section .text
global segv_handler
segv_handler:
    ; rdi = signum (11), rsi = siginfo*, rdx = ucontext*
    ; Read faulted RIP from uc_mcontext.gregs[REG_RIP]
    mov rax, [rdx + 40]      ; offset of REG_RIP in gregs
    ; Here you could adjust it and return to continue
    ret
;
; Install with rt_sigaction (syscall 13) or from C.`,
        },
        {
          heading: "Fault Handlers",
          content:
            "The faults you will actually meet are the page fault (#PF, error code carries P/W/U bits), general-protection fault (#GP, illegal memory access or privilege check), and divide error (#DE, IDIV with a zero divisor). The kernel converts each into a signal — SIGSEGV, SIGBUS, or SIGFPE — delivered to a handler you register. Because a fault is synchronous, the ucontext_t gives you the exact register file and RIP, letting a handler skip the bad instruction or patch a register before the kernel resumes execution.",
        },
        {
          heading: "Recovery",
          content:
            "Recovery is the art of getting control back and continuing cleanly. The pragmatic pattern is a setjmp/longjmp-style trampoline: a handler records the context at a safe point, and when a fault arrives it resets RSP, restores registers from the saved context, and jumps back to the checkpoint instead of dying. What you cannot do is blindly retry the faulting instruction — if the cause is unmapped memory or a zero divisor, it will fault again. Real recovery either fixes the precondition (map the page, clamp the divisor) or unwinds to a known-good state.",
        },
      ],
    },
    playground: {
      defaultCode: `; x86-64 NASM syntax
section .data
    msg db 'dividing...', 0xA
    len equ $ - msg

section .text
global _start

_start:
    ; Print before we fault
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall

    ; Deliberately trigger #DE (divide error)
    xor rdx, rdx
    mov rax, 7
    mov rbx, 0
    div rbx              ; divide by zero -> SIGFPE

    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d83-q1", type: "quiz", title: "Fault Frame",
        description: "What the CPU pushes on a fault",
        question: "When a fault is delivered on x86-64, what does the CPU push after RIP, CS, and RFLAGS?",
        options: [
          { id: "a", text: "Nothing — the handler reads registers from the TSS", correct: false },
          { id: "b", text: "An error code for faults that have one, plus RSP and SS on a ring change", correct: true },
          { id: "c", text: "The full register file (all GPRs)", correct: false },
          { id: "d", text: "The IDT entry number only", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d83-q2", type: "quiz", title: "Signal Mapping",
        description: "Faults to signals",
        question: "Into which signal does the kernel convert a user-mode page fault?",
        options: [
          { id: "a", text: "SIGSEGV", correct: true },
          { id: "b", text: "SIGFPE", correct: false },
          { id: "c", text: "SIGINT", correct: false },
          { id: "d", text: "SIGPIPE", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d83-c1", type: "code", title: "Fault Factory",
        description: "Trigger a divide-by-zero fault and exit",
        starterCode: `section .data
    msg db 'faulting now', 0xA
    len equ $ - msg

section .text
global _start

_start:
    ; TODO: print msg with sys_write (rax=1, rdi=1)
    ; TODO: set rax=1, rbx=0, then execute 'div rbx' to raise #DE
    ; (the kernel will deliver SIGFPE and the program dies)

    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["Zero the divisor with xor rbx, rbx", "div rbx computes rax / rbx", "A zero divisor always raises the divide-error fault"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d83-a1", title: "Signal Catcher",
      description: "Write a NASM program that installs a SIGSEGV handler using the rt_sigaction syscall (13), then dereferences a null pointer to trigger a page fault. The handler must print a message via sys_write and exit with code 0 instead of crashing.",
      requirements: [
        "Build the sigaction struct on the stack: handler pointer, mask (all-zero sigset), and flags (SA_RESTORER with a small restorer stub)",
        "Call rt_sigaction with SIGSEGV (11), handler pointer, and 8-byte sigsetsize",
        "Trigger the fault by reading from address 0",
        "Handler prints a message and exits cleanly with sys_exit",
        "Comment the struct layout offsets you used",
      ],
      starterCode: `; sigaction struct layout (x86-64 Linux):
;   offset 0:  handler (8 bytes)
;   offset 8:  flags   (8 bytes)
;   offset 16: restorer(8 bytes)
;   offset 24: mask    (8 bytes, use 0 for a single qword)

section .data
    caught db 'caught SIGSEGV', 0xA
    clen   equ $ - caught

section .text
global _start

_start:
    ; TODO: build sigaction struct and call rt_sigaction (syscall 13)
    ; TODO: read qword [0] to force the page fault
    ; TODO: provide the handler that prints 'caught SIGSEGV' and exits

    mov rax, 60
    xor rdi, rdi
    syscall`,
      rubric: [
        { criterion: "Correct sigaction struct layout", points: 30 },
        { criterion: "rt_sigaction syscall with proper registers", points: 25 },
        { criterion: "Handler prints and exits cleanly", points: 25 },
        { criterion: "Fault actually triggered and recovered", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
