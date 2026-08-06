import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Conditional Jumps",
    subtitle: "CMP, TEST, and branching",
    tags: ["control-flow", "jumps", "branching"],
    theory: {
      sections: [
        {
          heading: "The CMP Instruction and Flags",
          content:
            "CMP compares two operands by subtracting the second from the first (CMP a, b computes a - b) and sets the flags without storing the result. After CMP, you use a conditional jump to branch. CMP sets ZF (equal), CF (below/above for unsigned), SF (negative), OF (signed overflow).",
          codeExample: `; CMP and flag effects:\nmov rax, 10\ncmp rax, 10        ; ZF=1, CF=0, SF=0  (equal)\ncmp rax, 5         ; ZF=0, CF=0, SF=0  (greater)\ncmp rax, 20        ; ZF=0, CF=1, SF=1  (less, unsigned below)\n\n; Signed vs unsigned comparison matters:\nmov rax, -1\ncmp rax, 1\n; Unsigned: -1 is 0xFFFFFFFFFFFFFFFF → above\n; Signed:   -1 < 1 → less`,
        },
        {
          heading: "Conditional Jump Instructions",
          content:
            "Jumps check specific flag combinations. For signed: JE/JZ (ZF=1), JNE/JNZ (ZF=0), JG (SF=OF ∧ ZF=0), JGE (SF=OF), JL (SF≠OF), JLE (SF≠OF ∨ ZF=1). For unsigned: JA (CF=0 ∧ ZF=0), JAE (CF=0), JB (CF=1), JBE (CF=1 ∨ ZF=1). Also JP (parity), JS (sign), JO (overflow).",
          codeExample: `; Conditional jump patterns:\ncmp rax, rbx\nje  .equal          ; jump if rax == rbx\njne .not_equal      ; jump if rax != rbx\njg  .greater        ; jump if rax > rbx (signed)\njl  .lesser         ; jump if rax < rbx (signed)\nja  .above          ; jump if rax > rbx (unsigned)\njb  .below          ; jump if rax < rbx (unsigned)\njge .gequal         ; jump if rax >= rbx (signed)\njle .lequal         ; jump if rax <= rbx (signed)`,
        },
        {
          heading: "The TEST Instruction",
          content:
            "TEST performs AND between operands and sets flags without storing the result. Useful for checking if a value is zero or if specific bits are set. `test rax, rax` sets ZF if RAX is zero — more efficient than `cmp rax, 0`. TEST also clears CF and OF, sets SF and ZF.",
          codeExample: `; TEST usage patterns:\ntest rax, rax       ; check if rax is zero\njz  .zero           ; jump if ZF=1\n\n; Check specific bits:\ntest rax, 0x8       ; check if bit 3 is set\njnz .bit3_set\n\n; TEST for parity:\nmov al, 0b1010\ntest al, 1          ; ZF=0 if LSB=1\njz  .even           ; jump if LSB=0`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 56: Conditional Jumps\n; Practice branching logic\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 42\n    mov rbx, 42\n\n    cmp rax, rbx\n    je .equal\n    jne .not_equal\n\n.equal:\n    mov rcx, 1      ; they are equal\n    jmp .done\n\n.not_equal:\n    mov rcx, 0\n    jmp .done\n\n.done:\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d56-q1", type: "quiz", title: "JE vs JZ",
        description: "Understanding jump mnemonics",
        question: "What is the difference between JE and JZ?",
        options: [
          { id: "a", text: "JE is for signed, JZ for unsigned", correct: false },
          { id: "b", text: "JE checks equality, JZ checks bit 0", correct: false },
          { id: "c", text: "They are the same instruction (both check ZF=1)", correct: true },
          { id: "d", text: "JE jumps on equal values, JZ jumps on zero after ADD", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d56-q2", type: "quiz", title: "Signed vs Unsigned",
        description: "Choosing the right jump for data types",
        question: "To compare signed integers, which jump is correct for 'greater than'?",
        options: [
          { id: "a", text: "JA (jump above)", correct: false },
          { id: "b", text: "JG (jump greater)", correct: true },
          { id: "c", text: "JB (jump below)", correct: false },
          { id: "d", text: "JL (jump less)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d56-c1", type: "code", title: "Max of Two",
        description: "Write assembly that finds the maximum of two values using CMP and conditional jumps",
        starterCode: `section .data\n    a dq 45\n    b dq 78\n    result dq 0\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, [a]\n    mov rbx, [b]\n\n    ; TODO: compare rax and rbx\n    ; TODO: jump if rax >= rbx\n    ; TODO: if rbx is greater, move it to result\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["Use cmp rax, rbx", "Use jge to skip the move", "Use mov [result], rbx in the else path"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d56-a1", title: "Branching Calculator",
      description: "Write assembly that reads two numbers and a comparison type, then sets a result flag based on the comparison",
      requirements: [
        "Load two values from .data section",
        "Compare using CMP",
        "Set result to 1 if condition holds, 0 otherwise",
        "Support: equal, greater (signed), less than (signed)",
        "Use JMP to skip the else branch",
      ],
      starterCode: `section .data\n    x dq 50\n    y dq 30\n    is_equal dq 0\n    is_greater dq 0\n    is_less dq 0\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, [x]\n    mov rbx, [y]\n\n    ; Check equality\n    cmp rax, rbx\n    jne .check_greater\n    mov qword [is_equal], 1\n    jmp .done\n\n.check_greater:\n    cmp rax, rbx\n    jng .check_less\n    mov qword [is_greater], 1\n    jmp .done\n\n.check_less:\n    mov qword [is_less], 1\n\n.done:\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "CMP instruction used correctly", points: 20 },
        { criterion: "Equality check with JE/JNE", points: 20 },
        { criterion: "Signed greater-than with JG/JNG", points: 20 },
        { criterion: "Signed less-than with JL/JNL", points: 20 },
        { criterion: "JMP skip logic and clean exit", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
