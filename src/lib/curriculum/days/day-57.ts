import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Loops in Assembly",
    subtitle: "Loop constructs with DEC/JNZ",
    tags: ["control-flow", "loops", "iteration"],
    theory: {
      sections: [
        {
          heading: "The DEC/JNZ Loop Pattern",
          content:
            "The most basic loop in assembly uses DEC (decrement) followed by JNZ (jump if not zero). Set a counter in a register, decrement it at the end of each iteration, and jump back if it hasn't reached zero. This is equivalent to a for loop: `for (int i = n; i > 0; i--)`.",
          codeExample: `; DEC/JNZ loop:\nmov rcx, 5        ; loop counter\n.loop_start:\n    ; loop body here\n    dec rcx\n    jnz .loop_start  ; continue if rcx != 0\n; loop executed 5 times\n\n; For counting up (0 to n-1):\nmov rcx, 5\nmov rax, 0\n.loop:\n    add rax, 1\n    cmp rax, rcx\n    jl .loop       ; jump if rax < 5`,
        },
        {
          heading: "The LOOP Instruction",
          content:
            "LOOP is a specialized instruction that combines DEC RCX and JNZ. It decrements RCX and jumps to the target label if RCX is not zero. However, LOOP is slower than DEC/JNZ on modern CPUs due to microcode implementation. Modern code typically uses DEC/JNZ for performance.",
          codeExample: `; Using LOOP instruction:\nmov rcx, 5\n.loop_start:\n    ; loop body\n    loop .loop_start  ; dec rcx; jnz .loop_start\n\n; LOOPE (loop while equal) - dec RCX, jump if RCX!=0 and ZF=1\n; LOOPNE (loop while not equal) - dec RCX, jump if RCX!=0 and ZF=0\n\n; Modern equivalent (faster on most CPUs):\nmov ecx, 5\n.top:\n    ; body\n    dec ecx\n    jnz .top`,
        },
        {
          heading: "Nested Loops and Loop Patterns",
          content:
            "For nested loops, save and restore the outer counter (e.g., push/pop or use a different register). Common loop patterns: summing an array (add in loop), finding max (cmp/jg in loop), string length (scan for null byte). Always be careful with the loop bounds — off-by-one errors are easy in assembly.",
          codeExample: `; Nested loop (matrix traversal):\nmov rcx, 3         ; outer counter\n.outer:\n    mov rbx, 4       ; inner counter\n    .inner:\n        ; body uses rcx (saved) and rbx\n        dec rbx\n        jnz .inner\n    dec rcx\n    jnz .outer\n\n; Sum an array:\nmov rcx, 5\nlea rsi, [array]\nxor rax, rax\n.sum_loop:\n    add rax, [rsi]\n    add rsi, 8      ; next qword\n    dec rcx\n    jnz .sum_loop\n; rax = array sum`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 57: Loops in Assembly\n; Practice loop constructs\n\nsection .data\n    array dq 10, 20, 30, 40, 50\n    count equ 5\n\nsection .text\nglobal _start\n\n_start:\n    ; Sum the array using a loop\n    mov rcx, count\n    lea rsi, [array]\n    xor rax, rax\n\n.sum_loop:\n    add rax, [rsi]\n    add rsi, 8\n    dec rcx\n    jnz .sum_loop\n    ; rax = 150\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d57-q1", type: "quiz", title: "Loop Counter",
        description: "How loops work in assembly",
        question: "After LOOP instruction, which register is decremented?",
        options: [
          { id: "a", text: "RAX", correct: false },
          { id: "b", text: "RBX", correct: false },
          { id: "c", text: "RCX", correct: true },
          { id: "d", text: "RSP", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d57-q2", type: "quiz", title: "Loop Performance",
        description: "Understanding loop instruction performance",
        question: "Why is DEC/JNZ preferred over LOOP on modern CPUs?",
        options: [
          { id: "a", text: "LOOP can only count up, not down", correct: false },
          { id: "b", text: "DEC/JNZ is faster due to simpler microcode", correct: true },
          { id: "c", text: "LOOP destroys RCX value permanently", correct: false },
          { id: "d", text: "DEC/JNZ can only be used once per program", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d57-c1", type: "code", title: "Array Sum",
        description: "Write a loop that sums all elements of an array and stores the result",
        starterCode: `section .data\n    numbers dq 7, 14, 21, 28, 35, 42\n    count equ 6\n    total dq 0\n\nsection .text\nglobal _start\n\n_start:\n    mov rcx, count\n    lea rsi, [numbers]\n    xor rax, rax\n\n.loop:\n    ; TODO: add current element to rax\n    ; TODO: advance to next element (add rsi, 8)\n    ; TODO: decrement counter and loop\n\n    mov [total], rax\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["Use add rax, [rsi]", "Use add rsi, 8 to move to next qword", "Use dec rcx + jnz .loop"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d57-a1", title: "Loop-Based Statistics",
      description: "Write assembly that computes sum, min, and max of an array using a single pass with loops",
      requirements: [
        "Define an array of at least 8 qword values",
        "Use a DEC/JNZ loop to iterate through the array",
        "Compute the sum, minimum, and maximum in one pass",
        "Store all three results in memory",
      ],
      starterCode: `section .data\n    values dq 45, 12, 78, 33, 91, 27, 64, 50\n    count equ 8\n    sum dq 0\n    min dq 0\n    max dq 0\n\nsection .text\nglobal _start\n\n_start:\n    mov rcx, count\n    lea rsi, [values]\n    xor rax, rax          ; sum\n    mov rbx, [rsi]        ; min (initialize to first)\n    mov rdx, [rsi]        ; max (initialize to first)\n\n.loop:\n    mov r8, [rsi]\n    add rax, r8           ; accumulate sum\n\n    cmp r8, rbx\n    jge .check_max\n    mov rbx, r8           ; new min\n\n.check_max:\n    cmp r8, rdx\n    jle .next\n    mov rdx, r8           ; new max\n\n.next:\n    add rsi, 8\n    dec rcx\n    jnz .loop\n\n    mov [sum], rax\n    mov [min], rbx\n    mov [max], rdx\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "DEC/JNZ loop structure correct", points: 20 },
        { criterion: "Sum accumulation correct", points: 20 },
        { criterion: "Min computation with CMP/JGE", points: 20 },
        { criterion: "Max computation with CMP/JLE", points: 20 },
        { criterion: "Results stored in memory", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
