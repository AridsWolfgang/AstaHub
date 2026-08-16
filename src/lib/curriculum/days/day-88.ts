import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Race Conditions in ASM",
    subtitle: "Lock prefix, atomic operations, and synchronization",
    tags: ["concurrency"],
    theory: {
      sections: [
        {
          heading: "LOCK Prefix",
          content:
            "A plain inc [counter] reads the value, computes the increment, and writes it back — three steps any other core can interleave, producing lost updates. The LOCK prefix makes a read-modify-write instruction atomic by locking the cache line for the whole operation, so no other core can observe a torn state. It is valid only on memory read-modify-write forms: lock inc, lock add, lock xadd, lock cmpxchg. On modern CPUs the lock is handled by the cache coherence protocol, not the bus, but the guarantee — one atomic operation, no interleaving — is absolute.",
          codeExample: `; Atomic increment on a shared counter (x86-64 NASM)
section .data
    counter dq 0

section .text
global _start

_start:
    mov rcx, 1000000
.loop:
    lock inc qword [counter]   ; atomic read-modify-write
    dec rcx
    jnz .loop

    ; A plain 'inc' would risk lost updates across cores.
    mov rax, 60
    xor rdi, rdi
    syscall`,
        },
        {
          heading: "CMPXCHG",
          content:
            "Compare-and-swap is the workhorse of lock-free programming. lock cmpxchg [dest], reg compares RAX with the destination; if they match, it stores reg into the destination and sets ZF; if not, it loads the destination into RAX and clears ZF. The compare-then-swap is a single atomic unit, so a thread can build optimistic algorithms: read a value, compute a new one, and CAS back — retrying the loop whenever the CAS fails, because someone else won the race in between.",
        },
        {
          heading: "Atomic Ops and Spinlocks",
          content:
            "Every atomic primitive is just an instruction: lock xadd does fetch-and-add, lock bts atomically sets a bit, and xchg is implicitly locked. A spinlock falls out of them directly — grab the lock with a one-instruction xchg against a zero flag and spin until it succeeds, then release with a plain store. The catch is xchg's memory ordering: the implicit lock orders everything around it, which is exactly what makes the lock release visible before the next acquire. Count the operations in a fast path: one xchg to take, one store to free.",
        },
      ],
    },
    playground: {
      defaultCode: `; Spinlock: acquire with xchg, release with a store
section .data
    lock_flag dq 0

section .text
global _start

acquire:
    mov rax, 1
.retry:
    xchg rax, [lock_flag]  ; atomically swap; rax gets old value
    test rax, rax
    jnz .retry             ; someone else held it — spin
    ret

release:
    mov qword [lock_flag], 0
    ret

_start:
    call acquire
    ; ... critical section ...
    call release
    mov rax, 60
    xor rdi, rdi
    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d88-q1", type: "quiz", title: "LOCK Prefix",
        description: "Why a plain inc is not atomic",
        question: "Why is 'inc [counter]' unsafe for multiple threads without a lock prefix?",
        options: [
          { id: "a", text: "It reads, modifies, and writes back in three separable steps a race can interleave", correct: true },
          { id: "b", text: "The CPU forbids memory operands on inc", correct: false },
          { id: "c", text: "inc only works on registers, never memory", correct: false },
          { id: "d", text: "It is atomic but only within one hyperthread", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d88-q2", type: "quiz", title: "CMPXCHG",
        description: "Compare-and-swap semantics",
        question: "What does 'lock cmpxchg [dest], reg' do when the destination does NOT equal RAX?",
        options: [
          { id: "a", text: "It stores reg into dest and sets ZF", correct: false },
          { id: "b", text: "It loads dest into RAX and clears ZF", correct: true },
          { id: "c", text: "It traps with a #GP fault", correct: false },
          { id: "d", text: "It ignores the mismatch and always writes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d88-c1", type: "code", title: "Spinlock",
        description: "Implement acquire and release for a spinlock",
        starterCode: `section .data
    lock_flag dq 0

section .text
global _start

acquire:
    ; TODO: spin: set rax=1, xchg with [lock_flag], retry while rax!=0
    ret

release:
    ; TODO: store 0 into [lock_flag]
    ret

_start:
    call acquire
    call release
    mov rax, 60
    xor rdi, rdi
    syscall`,
        hints: ["xchg is implicitly locked — no lock prefix needed", "xchg rax, [lock_flag] leaves the old value in rax", "test rax, rax / jnz .retry spins while the lock is held"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d88-a1", title: "Atomic Counter Library",
      description: "Write a NASM library providing three primitives — lock acquire, lock release, and an atomic counter increment via lock xadd — then a driver that increments the counter a million times through the lock.",
      requirements: [
        "acquire uses xchg against a zero flag and spins until success",
        "release is a plain aligned store of zero",
        "counter_increment uses lock xadd (fetch-and-add) returning the old value",
        "Driver performs 1,000,000 increments and checks the final count",
        "Comment where atomicity comes from for each primitive",
      ],
      starterCode: `; sync.asm
section .data
    lock_flag dq 0
    counter   dq 0

section .text
global acquire, release, counter_increment

acquire:
    ; TODO: xchg-based spinlock acquire
    ret

release:
    ; TODO: store 0 to lock_flag
    ret

counter_increment:
    ; TODO: lock xadd [counter], rax with rax=1; rax = old value
    ret

global _start
_start:
    ; Drive 1,000,000 increments (single-threaded here)
    mov rcx, 1000000
.loop:
    call counter_increment
    dec rcx
    jnz .loop
    mov rax, 60
    xor rdi, rdi
    syscall`,
      rubric: [
        { criterion: "Spinlock acquire via xchg", points: 30 },
        { criterion: "Release with aligned zero store", points: 20 },
        { criterion: "counter_increment via lock xadd", points: 30 },
        { criterion: "Atomicity explained in comments", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
