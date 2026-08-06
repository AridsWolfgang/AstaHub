import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Arithmetic Instructions",
    subtitle: "ADD, SUB, MUL, DIV on registers",
    tags: ["instructions", "arithmetic", "math"],
    theory: {
      sections: [
        {
          heading: "Addition and Subtraction",
          content:
            "ADD and SUB work identically to their high-level counterparts. `add dest, src` computes dest += src. `sub dest, src` computes dest -= src. Both operands must be the same size. ADD and SUB set OF, SF, ZF, AF, CF, PF flags. For extended precision, use ADC (add with carry) and SBB (subtract with borrow).",
          codeExample: `; Basic arithmetic:\nmov rax, 100\nadd rax, 50      ; rax = 150\nsub rax, 30      ; rax = 120\n\n; With carry for 128-bit arithmetic:\nmov rax, 0xFFFFFFFFFFFFFFFF\nmov rdx, 0\nadd rax, 1       ; rax = 0, CF = 1\nadc rdx, 0       ; rdx = 1 (carry propagated)\n; Result: rdx:rax = 0x10000000000000000`,
        },
        {
          heading: "Multiplication: MUL and IMUL",
          content:
            "MUL is unsigned multiply. A single operand multiplies RAX by that operand, storing the 128-bit result in RDX:RAX. IMUL is signed multiply and has more forms: two-operand (dest *= src) and three-operand (dest = src1 * src2). MUL sets CF and OF if the result doesn't fit in the lower half.",
          codeExample: `; MUL — single operand (rax *= src, result in rdx:rax)\nmov rax, 1000\nmov rbx, 2000\nmul rbx          ; rdx:rax = 1000 * 2000 = 2,000,000\n\n; IMUL — two operand (dest *= src)\nmov rax, -50\nimul rax, 30     ; rax = -1500\n\n; IMUL — three operand (dest = src1 * src2)\nimul rbx, rax, 100  ; rbx = rax * 100`,
        },
        {
          heading: "Division: DIV and IDIV",
          content:
            "DIV is unsigned division. For 64-bit, dividend is RDX:RAX, divisor is the operand. Quotient goes to RAX, remainder to RDX. IDIV is signed division. Division by zero triggers interrupt 0 (divide error). Use CMP and JE to guard against it.",
          codeExample: `; Unsigned division:\nmov rax, 100       ; low 64 bits of dividend\nxor rdx, rdx       ; high 64 bits = 0\nmov rbx, 7\ndiv rbx            ; rax = 14 (quotient), rdx = 2 (remainder)\n\n; Signed division:\nmov rax, -100\ncqo                ; sign-extend RAX to RDX:RAX\nmov rbx, 7\nidiv rbx           ; rax = -14, rdx = -2\n\n; Guard against division by zero:\ncmp rbx, 0\nje .error\ndiv rbx`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 54: Arithmetic Instructions\n; Experiment with math operations\n\nsection .text\nglobal _start\n\n_start:\n    ; Addition\n    mov rax, 50\n    add rax, 30      ; rax = 80\n\n    ; Subtraction\n    sub rax, 20      ; rax = 60\n\n    ; Multiplication (single-operand)\n    mov rbx, 4\n    mul rbx          ; rdx:rax = 60 * 4 = 240\n\n    ; Division\n    xor rdx, rdx\n    mov rbx, 5\n    div rbx          ; rax = 240/5 = 48, rdx = 0\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d54-q1", type: "quiz", title: "MUL Behavior",
        description: "Understanding multiplication results",
        question: "Where does MUL store the high 64 bits of a 128-bit result?",
        options: [
          { id: "a", text: "RAX", correct: false },
          { id: "b", text: "RBX", correct: false },
          { id: "c", text: "RDX", correct: true },
          { id: "d", text: "RSP", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d54-q2", type: "quiz", title: "Division Safety",
        description: "Safe division practices",
        question: "What should you check before executing DIV?",
        options: [
          { id: "a", text: "That the dividend is even", correct: false },
          { id: "b", text: "That the divisor is not zero", correct: true },
          { id: "c", text: "That RAX is aligned to 16 bytes", correct: false },
          { id: "d", text: "That RSP points to valid stack", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d54-c1", type: "code", title: "Arithmetic Sequence",
        description: "Compute a multi-step arithmetic expression using ADD, SUB, MUL, DIV",
        starterCode: `section .text\nglobal _start\n\n_start:\n    ; Compute: ((100 + 50) * 2) / 3\n    ; Step 1: rax = 100 + 50\n    mov rax, 100\n    add rax, 50\n\n    ; Step 2: multiply rax by 2\n    mov rbx, 2\n    mul rbx\n\n    ; Step 3: divide by 3  (rdx:rax / rcx)\n    mov rcx, 3\n    xor rdx, rdx\n    div rcx\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: [
          "MUL works on rax with the operand as multiplier",
          "DIV divides rdx:rax by operand",
          "Zero rdx before DIV with xor rdx, rdx",
        ],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d54-a1", title: "Expression Evaluator",
      description: "Write assembly that evaluates a compound expression using all four arithmetic operations",
      requirements: [
        "Use ADD, SUB, MUL (or IMUL), DIV (or IDIV)",
        "Compute a result from at least 4 input values stored in registers",
        "Handle both positive and negative intermediate results",
        "Store the final result in RAX",
      ],
      starterCode: `section .text\nglobal _start\n\n_start:\n    ; Compute: ((a + b) * c) - (d / e)\n    mov rax, 20     ; a\n    mov rbx, 30     ; b\n    mov rcx, 4      ; c\n    mov rdx, 100    ; d\n    mov r8, 5       ; e\n\n    ; rax = a + b\n    add rax, rbx\n\n    ; rax = (a+b) * c\n    mul rcx\n\n    ; Save intermediate in r9\n    mov r9, rax\n\n    ; rax = d / e\n    mov rax, rdx\n    xor rdx, rdx\n    div r8\n\n    ; r9 - rax\n    sub r9, rax\n    mov rax, r9\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Addition and subtraction correct", points: 20 },
        { criterion: "Multiplication correct", points: 20 },
        { criterion: "Division correct (including zeroing RDX)", points: 25 },
        { criterion: "Intermediate values preserved correctly", points: 20 },
        { criterion: "Final result in RAX", points: 15 },
      ],
      xpReward: 100,
    },
};

export default lesson;
