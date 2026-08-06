import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "C to Assembly Bridge",
    subtitle: "How C code compiles down to machine instructions",
    tags: ["assembly", "compilation", "bridge"],
    theory: {
      sections: [
        {
          heading: "Viewing Compiler Output",
          content:
            "Use gcc -S to see C code compiled to assembly. gcc -O0 shows straightforward translation; -O2 shows optimized output. The -fno-asynchronous-unwind-tables flag removes .eh_frame noise. Reading assembly output teaches you what your C code really does.",
          codeExample: `# Generate assembly:\n# gcc -S -O0 -fno-asynchronous-unwind-tables program.c\n#\n# int add(int a, int b) {\n#     return a + b;\n# }\n#\n# Compiles to:\n# add:\n#     push   rbp\n#     mov    rbp, rsp\n#     mov    DWORD PTR [rbp-4], edi\n#     mov    DWORD PTR [rbp-8], esi\n#     mov    eax, DWORD PTR [rbp-4]\n#     add    eax, DWORD PTR [rbp-8]\n#     pop    rbp\n#     ret`,
        },
        {
          heading: "How C Constructs Map to ASM",
          content:
            "Variables → stack memory or registers. if/else → cmp + conditional jumps. Loops → cmp + jmp back. Arrays → base address + offset. Structs → base + member offset. Function calls → push args + call + ret.",
          codeExample: `// C: if (x > 0) y = 1; else y = -1;\n// ASM:\n//     cmp   DWORD PTR [rbp-4], 0\n//     jle   .L2\n//     mov   DWORD PTR [rbp-8], 1\n//     jmp   .L3\n// .L2:\n//     mov   DWORD PTR [rbp-8], -1\n// .L3:`,
        },
        {
          heading: "Calling Conventions (x86-64 System V ABI)",
          content:
            "First 6 integer args: RDI, RSI, RDX, RCX, R8, R9. Return value in RAX. Stack must be 16-byte aligned before call. Callee-saved registers: RBX, RBP, R12-R15. The compiler handles this automatically in C.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main(void) {\n    int x = 10, y = 20;\n    int z = add(x, y);\n    printf("Result: %d\\n\", z);\n    return 0;\n}\n\n// To see assembly:\n// gcc -S -O0 -fno-asynchronous-unwind-tables this.c\n// This shows how C maps to x86-64 instructions`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d48-q1", type: "quiz", title: "gcc -S",
        description: "Understanding how to view assembly output",
        question: "Which gcc flag generates assembly output instead of an executable?",
        options: [
          { id: "a", text: "-c", correct: false },
          { id: "b", text: "-S", correct: true },
          { id: "c", text: "-E", correct: false },
          { id: "d", text: "-o", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d48-q2", type: "quiz", title: "Return Register",
        description: "Understanding calling conventions",
        question: "Which register holds the return value in x86-64 System V ABI?",
        options: [
          { id: "a", text: "RBX", correct: false },
          { id: "b", text: "RAX", correct: true },
          { id: "c", text: "RCX", correct: false },
          { id: "d", text: "RSP", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d48-c1", type: "code", title: "ASM Prediction",
        description: "Write C code and predict what the assembly would look like",
        starterCode: `#include <stdio.h>\n\nint max(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\n\nint main(void) {\n    printf("max(10, 20) = %d\\n\", max(10, 20));\n    return 0;\n}\n\n/* TODO: In comments below, write what you expect\n   the assembly for max() to look like */\n// max:\n//     cmp   edi, esi\n//     jg    .greater\n//     mov   eax, esi\n//     ret\n// .greater:\n//     mov   eax, edi\n//     ret`,
        expectedOutput: "max(10, 20) = 20",
        hints: ["Parameters start in edi, esi", "cmp sets flags", "jg jumps if greater"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d48-a1", title: "C to ASM Reference Card",
      description: "Create a reference showing how C constructs map to x86-64 assembly",
      requirements: [
        "Show C construct → assembly pattern for: variable assignment",
        "Show: if/else, for loop, while loop",
        "Show: function call with arguments",
        "Show: array access, struct member access",
        "Show: pointer dereference",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    printf("=== C to ASM Reference ===\\n\");\n    printf("\\n1. Variable Assignment\\n\");\n    printf("C:  int x = 42;\\n\");\n    printf("ASM: mov DWORD PTR [rbp-4], 42\\n\");\n\n    printf("\\n2. If/Else\\n\");\n    printf("C:  if (x > 0) y = 1;\\n\");\n    printf("ASM: cmp [rbp-4], 0\\n\");\n    printf("     jle .L2\\n\");\n    printf("     mov [rbp-8], 1\\n\");\n    printf("     jmp .L3\\n\");\n    printf("     .L2: mov [rbp-8], -1\\n\");\n    printf("     .L3:\\n\");\n\n    /* TODO: add more mappings */\n    return 0;\n}`,
      rubric: [
        { criterion: "5+ C to ASM mappings", points: 25 },
        { criterion: "Accurate assembly patterns", points: 25 },
        { criterion: "Clear formatting", points: 25 },
        { criterion: "Comments explaining each", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
