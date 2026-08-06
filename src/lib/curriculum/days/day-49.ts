import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Inline Assembly",
    subtitle: "Embedding assembly in C with __asm__ and GCC extended asm",
    tags: ["inline-asm", "asm", "gcc"],
    theory: {
      sections: [
        {
          heading: "Basic Inline Assembly",
          content:
            "GCC's __asm__ lets you embed assembly instructions directly in C code. The basic form: __asm__(\"instruction\"). The volatile keyword tells the compiler not to optimize the asm away. Multiple instructions are separated by \\n\\t.",
          codeExample: `#include <stdio.h>\n\nint main(void) {\n    int result;\n    __asm__(\"mov $42, %0\" : \"=r\"(result));\n    printf("Result: %d\\n\", result);\n    return 0;\n}`,
        },
        {
          heading: "Extended Asm Syntax",
          content:
            "Extended asm has the format: __asm__(\"code\" : outputs : inputs : clobbers). Outputs use =r (register), inputs use r, clobbers list registers modified by the asm (cc = flags, memory = memory). This tells the compiler how to connect C variables to assembly.",
          codeExample: `int a = 10, b = 5, result;\n__asm__(\n    \"add %2, %1\\n\\t\"\n    \"mov %1, %0\"\n    : \"=r\"(result)     // output\n    : \"r\"(a), \"r\"(b)    // inputs\n    : \"cc\"              // clobbered flags\n);\nprintf("10 + 5 = %d\\n\", result);`,
        },
        {
          heading: "When to Use Inline Assembly",
          content:
            "Use inline assembly for: CPU-specific instructions (CPUID, RDTSC), performance-critical loops where the compiler generates suboptimal code, accessing special registers (CR0, MSRs), and implementing system calls without libc. Most code should stay in C.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int x = 10, y = 20, result;\n\n    __asm__(\n        \"mov %2, %0\\n\\t\"\n        \"add %1, %0\"\n        : \"=r\"(result)\n        : \"r\"(x), \"r\"(y)\n        : \"cc\"\n    );\n\n    printf("%d + %d = %d\\n\", x, y, result);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d49-q1", type: "quiz", title: "Output Constraint",
        description: "Understanding inline asm constraints",
        question: "What does the constraint \"=r\" mean in inline assembly?",
        options: [
          { id: "a", text: "Output to memory", correct: false },
          { id: "b", text: "Output to a register (write-only)", correct: true },
          { id: "c", text: "Input from a register", correct: false },
          { id: "d", text: "Read-write operand", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d49-q2", type: "quiz", title: "Clobber List",
        description: "Understanding clobbered registers",
        question: "What does \"cc\" in the clobber list mean?",
        options: [
          { id: "a", text: "The code clobber (overwrites) condition code flags", correct: true },
          { id: "b", text: "The code is conditional", correct: false },
          { id: "c", text: "The C compiler is clobbered", correct: false },
          { id: "d", text: "C code follows", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d49-c1", type: "code", title: "Inline Mul",
        description: "Write an inline assembly function to multiply two integers",
        starterCode: `#include <stdio.h>\n\nint mul_asm(int a, int b) {\n    int result;\n    /* TODO: use imul instruction in inline asm */\n    return result;\n}\n\nint main(void) {\n    printf("7 * 6 = %d\\n\", mul_asm(7, 6));\n    return 0;\n}`,
        expectedOutput: "7 * 6 = 42",
        hints: ["imul instruction: imul result, a, b", "Use \"=r\" for output, \"r\" for inputs"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d49-a1", title: "Inline ASM Library",
      description: "Create a small library of math functions using inline assembly",
      requirements: [
        "Implement add(a,b), sub(a,b), mul(a,b), div(a,b)",
        "Use inline assembly for each function",
        "Implement a rdtsc() function that reads the timestamp counter",
        "Write a C main that tests all functions",
        "Compare performance with plain C versions (print which is faster)",
      ],
      starterCode: `#include <stdio.h>\n\nint add_asm(int a, int b) {\n    int r;\n    __asm__(\"add %2, %1\\n\\tmov %1, %0\" : \"=r\"(r) : \"r\"(a), \"r\"(b) : \"cc\");\n    return r;\n}\n\nint sub_asm(int a, int b) {\n    /* TODO: implement subtraction with inline asm */\n}\n\nint mul_asm(int a, int b) {\n    /* TODO: implement multiplication with inline asm */\n}\n\nint div_asm(int a, int b) {\n    /* TODO: implement division with inline asm */\n}\n\n// Read x86 timestamp counter\nunsigned long long rdtsc(void) {\n    unsigned long long result;\n    __asm__ volatile(\"rdtsc\" : \"=A\"(result));\n    return result;\n}\n\nint main(void) {\n    printf("add_asm(10, 5) = %d\\n\", add_asm(10, 5));\n    printf("sub_asm(10, 5) = %d\\n\", sub_asm(10, 5));\n    printf("mul_asm(10, 5) = %d\\n\", mul_asm(10, 5));\n    printf("div_asm(10, 5) = %d\\n\", div_asm(10, 5));\n    printf("RDTSC: %llu\\n\", rdtsc());\n    return 0;\n}`,
      rubric: [
        { criterion: "add_asm using inline asm", points: 20 },
        { criterion: "sub_asm using inline asm", points: 20 },
        { criterion: "mul_asm using inline asm", points: 20 },
        { criterion: "div_asm using inline asm", points: 20 },
        { criterion: "rdtsc implemented", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
