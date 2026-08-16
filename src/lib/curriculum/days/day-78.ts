import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Multithreading in ASM",
    subtitle: "Thread creation at the lowest level",
    tags: ["concurrency"],
    theory: {
      sections: [
        {
          heading: "clone syscall",
          content:
            "Threads are created at the lowest level with the clone() system call, which is also what pthread_create wraps. clone() shares the address space and resources with the caller, so two threads see the same global variables and heap. On x86-64 Linux the call is syscall 56: the flags choose what to share (CLONE_VM | CLONE_FS | CLONE_FILES | CLONE_SIGHAND | CLONE_THREAD is the classic thread set), the second argument is a fresh stack for the new thread, and the function pointer is passed along. The kernel starts the new thread at a tiny stub that calls the function with its argument, then performs the exit.",
          codeExample: `; clone() — create a thread
;   syscall 56
;   rdi = flags (CLONE_VM|CLONE_FS|CLONE_FILES|CLONE_SIGHAND|CLONE_THREAD)
;   rsi = child stack (top of a region the child grows down from)
;   rdx = parent_tidptr (can be 0)
;   r10 = child_tidptr (can be 0)
;   r8  = tls pointer (can be 0)
;   child gets the function address in rbx-style handoff
;
; Returns 0 in the child, the child's tid in the parent.`,
        },
        {
          heading: "Thread Stacks",
          content:
            "Every thread needs its own stack because the stack pointer RSP is per-thread state. Typical threads get an 8 MB region from mmap; the stack grows down from the top, so you pass the top address (or near it) as clone's stack argument. A thread's stack must never collide with another thread's — that is the whole point of giving each one its own region. The kernel also lays out initial thread state on this stack: the return address the thread will jump to after the clone stub, plus the argument pointer. Getting stack sizing and alignment wrong produces corruption that only shows under load.",
        },
        {
          heading: "TLS",
          content:
            "Thread-local storage gives each thread private copies of variables that are declared thread_local. On x86-64 Linux, TLS lives at the address pointed to by the FS segment base; the syscall arch_prctl(ARCH_SET_FS, address) tells the kernel where a thread's TLS block is. Code accesses thread-local variables through FS-relative addressing — mov rax, [fs:0] fetches the thread-pointer itself. Since FS is a per-thread register, the same instruction in two threads automatically refers to two different blocks. This is how glibc implements errno as a per-thread value instead of a global.",
        },
      ],
    },
    playground: {
      defaultCode: `; Thread stack + clone conceptual layout:
;   mmap an 8 MB region for the child stack
;   child SP = top of that region (minus alignment)
;   kernel places: return address to stub, arg pointer
;
; Thread entry stub (conceptual):
;   thread_stub:
;       ; rdi = function pointer, rsi = argument
;       call rdi           ; call the real function
;       ; then sys_exit
;
; TLS note:
;   mov rax, [fs:0]        ; thread pointer
;   mov eax, [fs:8]        ; first thread_local var`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d78-q1", type: "quiz", title: "Thread Stacks",
        description: "Why each thread gets its own stack",
        question: "Why must every thread have its own stack?",
        options: [
          { id: "a", text: "RSP is per-thread state and threads run concurrently", correct: true },
          { id: "b", text: "The kernel requires 8 MB per thread", correct: false },
          { id: "c", text: "Stacks are stored in the TLB", correct: false },
          { id: "d", text: "To avoid using the heap", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d78-q2", type: "quiz", title: "TLS Mechanism",
        description: "How thread-local variables get isolated",
        question: "How does a thread-local variable stay private to its thread on x86-64?",
        options: [
          { id: "a", text: "It is addressed relative to the FS segment base", correct: true },
          { id: "b", text: "It is stored in the TLB", correct: false },
          { id: "c", text: "The compiler duplicates it in every function", correct: false },
          { id: "d", text: "It lives in a locked register", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d78-c1", type: "code", title: "Read TLS Pointer",
        description: "Load the current thread pointer via FS",
        starterCode: `section .text
global _start
_start:
    ; TODO: load the current thread pointer
    ; (the value FS is set to) into rax
    ; hint: mov rax, [fs:0]
    nop
    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["FS segment base holds the thread pointer", "mov rax, [fs:0] loads it", "No setup needed — the kernel sets FS per thread"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d78-a1", title: "Clone a Thread",
      description: "Write a NASM program that uses the clone syscall to spawn a child thread which increments a shared counter a few times, while the parent prints that it is alive — demonstrating that both threads share the same address space.",
      requirements: [
        "mmap or reserve a child stack region",
        "Set the thread flags (CLONE_VM | CLONE_FS | CLONE_FILES | CLONE_SIGHAND | CLONE_THREAD)",
        "Call syscall 56 (clone) with the stack top",
        "Child increments a shared memory counter",
        "Parent reads the counter after the child runs",
      ],
      starterCode: `; thread.asm — clone-based thread demo
section .bss
    counter resq 1

section .data
    child_stack times 8192 db 0

section .text
global _start
_start:
    ; TODO: set up flags + stack and call clone
    nop

child_fn:
    ; TODO: increment [counter]
    ; TODO: exit the thread
    nop`,
      rubric: [
        { criterion: "Child stack reserved and passed to clone", points: 25 },
        { criterion: "Correct thread-sharing flags", points: 25 },
        { criterion: "Child increments shared counter", points: 25 },
        { criterion: "Parent observes shared memory effect", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
