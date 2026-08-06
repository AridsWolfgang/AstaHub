import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Memory Addressing Modes",
    subtitle: "Direct, indirect, indexed, and base+offset",
    tags: ["memory", "addressing", "modes"],
    theory: {
      sections: [
        {
          heading: "Direct Addressing",
          content:
            "Direct addressing uses a fixed address (or label) to access memory. The address is encoded directly in the instruction. Format: `mov rax, [address]`. Direct addressing is simple but inflexible — the address must be known at assembly time. Data section labels resolve to direct addresses after linking.",
          codeExample: `; Direct addressing:\nsection .data\n    myvar dq 12345\n\nsection .text\n_start:\n    mov rax, [myvar]      ; load from label 'myvar'\n    mov rbx, [0x601040]   ; absolute address (not recommended)\n\n; The assembler converts labels to addresses:\n; mov rax, [myvar] → mov rax, [0x601030]`,
        },
        {
          heading: "Register Indirect Addressing",
          content:
            "Register indirect addressing uses a register containing a memory address. The brackets dereference the pointer. Format: `mov rax, [rbx]` loads the value at the address stored in RBX. This is the assembly equivalent of dereferencing a pointer in C. Combined with arithmetic in the register, this enables array traversal, linked-list walking, and dynamic memory access.",
          codeExample: `; Register indirect:\nmov rbx, myvar       ; rbx = address of myvar\nmov rax, [rbx]       ; rax = value at myvar\n\n; Pointer arithmetic:\nadd rbx, 8           ; rbx points to next qword\nmov rax, [rbx]       ; load next element\n\n; Dereferencing a pointer to pointer:\nmov rbx, [ptr_to_ptr]\nmov rax, [rbx]       ; rax = **ptr_to_ptr`,
        },
        {
          heading: "Base+Index*Scale+Displacement",
          content:
            "The full addressing formula is: `[base + index*scale + displacement]`. Base holds a pointer (e.g., array start), index is a variable offset, scale multiplies (1, 2, 4, 8 for byte/size adjustment), displacement is a fixed offset. This one formula handles arrays, structs, stack frames, and more. The LEA instruction uses the same formula without accessing memory.",
          codeExample: `; Full addressing examples:\n; Array access: arr[i] where arr is 8-byte elements\nmov rcx, i             ; index\nmov rax, [arr + rcx*8] ; arr[i] — base + index*scale\n\n; Struct member access:\n; struct { int x; int y; long z; }  — 16 bytes total\nmov rax, [rbx]         ; s.x at offset 0\nmov rax, [rbx + 4]     ; s.y at offset 4\nmov rax, [rbx + 8]     ; s.z at offset 8\n\n; Stack frame access:\nmov rax, [rbp + 16]    ; first stack argument\nmov rax, [rbp - 8]     ; local variable\n\n; LEA (load effective address):\nlea rax, [array + rcx*8]  ; rax = address of arr[i], not value`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 60: Memory Addressing Modes\n; Practice all addressing forms\n\nsection .data\n    arr dq 100, 200, 300, 400, 500\n\nsection .text\nglobal _start\n\n_start:\n    ; Direct\n    mov rax, [arr]         ; arr[0] = 100\n\n    ; Register indirect\n    mov rbx, arr\n    mov rcx, [rbx]         ; arr[0] = 100\n\n    ; Base + displacement\n    mov rdx, [rbx + 8]     ; arr[1] = 200\n\n    ; Indexed with scale\n    mov rsi, 2\n    mov r8, [arr + rsi*8]  ; arr[2] = 300\n\n    ; Full form\n    mov r9, [rbx + rsi*8 + 8] ; arr[3] = 400\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d60-q1", type: "quiz", title: "Addressing Formula",
        description: "Understanding addressing components",
        question: "What is the scale factor for accessing an array of 8-byte elements?",
        options: [
          { id: "a", text: "1", correct: false },
          { id: "b", text: "2", correct: false },
          { id: "c", text: "4", correct: false },
          { id: "d", text: "8", correct: true },
        ],
        xpReward: 25,
      },
      {
        id: "d60-q2", type: "quiz", title: "LEA vs MOV",
        description: "Distinguishing address computation from data access",
        question: "What is the difference between `lea rax, [rbx+8]` and `mov rax, [rbx+8]`?",
        options: [
          { id: "a", text: "They are identical in behaviour", correct: false },
          { id: "b", text: "LEA computes address; MOV loads value at that address", correct: true },
          { id: "c", text: "LEA loads value; MOV computes address", correct: false },
          { id: "d", text: "LEA only works with labels, MOV only with registers", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d60-c1", type: "code", title: "Array Accessor",
        description: "Use indexed addressing to access and modify elements of an array",
        starterCode: `section .data\n    values dq 10, 20, 30, 40, 50\n\nsection .text\nglobal _start\n\n_start:\n    ; Access values[2] (third element = 30)\n    mov rcx, 2\n    mov rax, [values + rcx*8]\n    ; rax should be 30\n\n    ; Modify values[4] = 99\n    mov rcx, 4\n    mov qword [values + rcx*8], 99\n\n    ; Load values[4] to verify\n    mov rbx, [values + rcx*8]\n    ; rbx should be 99\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["Scale must match element size (8 for qword)", "Use qword directive for size when storing"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d60-a1", title: "Addressing Mode Calculator",
      description: "Write an assembly program that uses all five addressing modes to compute the sum of an array with a twist: access every other element",
      requirements: [
        "Direct addressing: load first element",
        "Register indirect: load through a pointer register",
        "Base+displacement: load element at fixed offset from pointer",
        "Indexed: access arr[i*2] for every other element",
        "Full form: access arr[i*2 + 1] with base, index*scale, displacement",
        "Compute and store the sum of these accessed elements",
      ],
      starterCode: `section .data\n    data dq 2, 4, 6, 8, 10, 12, 14, 16\n    count equ 4\n    result dq 0\n\nsection .text\nglobal _start\n\n_start:\n    ; Access every other element using each addressing mode\n    ; Direct:\n    mov rax, [data]           ; data[0] = 2\n    mov r8, rax\n\n    ; Register indirect:\n    mov rbx, data\n    mov rax, [rbx + 16]       ; data[2] = 6\n    add r8, rax\n\n    ; Base + displacement:\n    mov rax, [rbx + 32]       ; data[4] = 10\n    add r8, rax\n\n    ; Indexed with scale:\n    mov rcx, 3\n    mov rax, [data + rcx*8]   ; data[3] = 8\n    add r8, rax\n\n    ; Full form:\n    mov rcx, 1\n    mov rax, [rbx + rcx*8 + 24] ; data[4] = 10\n    add r8, rax\n\n    ; r8 = 2 + 6 + 10 + 8 + 10 = 36\n    mov [result], r8\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Direct addressing used correctly", points: 15 },
        { criterion: "Register indirect addressing used", points: 15 },
        { criterion: "Base+displacement addressing used", points: 20 },
        { criterion: "Indexed addressing with scale used", points: 20 },
        { criterion: "Full form addressing used", points: 15 },
        { criterion: "Correct sum computation", points: 15 },
      ],
      xpReward: 100,
    },
};

export default lesson;
