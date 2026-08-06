import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Header Files & Modules",
    subtitle: "Organizing code across multiple files with headers",
    tags: ["modules", "headers", "organization"],
    theory: {
      sections: [
        {
          heading: "Why Split Code Into Files?",
          content:
            "Separating code into multiple files improves organization, compilation speed (only changed files recompile), and reusability. Header files (.h) declare interfaces; source files (.c) implement them. The linker combines compiled object files.",
          codeExample: `// math_utils.h — header (declaration)\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\nint add(int a, int b);\nint mul(int a, int b);\n#endif\n\n// math_utils.c — implementation\n#include "math_utils.h"\nint add(int a, int b) { return a + b; }\nint mul(int a, int b) { return a * b; }\n\n// main.c — uses the module\n#include "math_utils.h"\nint main(void) { return add(2, 3); }`,
        },
        {
          heading: "Include Guards",
          content:
            "Include guards prevent a header from being processed multiple times in the same compilation unit. Use #ifndef / #define / #endif or #pragma once. Without guards, circular includes and redefinitions cause compilation errors.",
          codeExample: `#ifndef MY_HEADER_H  // if not defined\n#define MY_HEADER_H  // define it\n// header content here\n#endif  // end guard`,
        },
        {
          heading: "The extern Keyword",
          content:
            "extern declares a variable or function that is defined in another file. Global variables need extern in headers and a single definition in one .c file. Functions are implicitly extern, but it's good practice to declare them in headers anyway.",
        },
      ],
    },
    playground: {
      defaultCode: `// This lesson is about multi-file organization.\n// The playground shows the concept.\n#include <stdio.h>\n\n/* Imagine this is in utils.h */\nint square(int x);\n\n/* And this is utils.c */\nint square(int x) { return x * x; }\n\nint main(void) {\n    printf("square(7) = %d\\n", square(7));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d27-q1", type: "quiz", title: "Include Guard",
        description: "Understanding header protection",
        question: "What problem do include guards solve?",
        options: [
          { id: "a", text: "Slow compilation times", correct: false },
          { id: "b", text: "Multiple inclusion of the same header in one file", correct: true },
          { id: "c", text: "Memory leaks", correct: false },
          { id: "d", text: "Linker errors", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d27-q2", type: "quiz", title: "Header vs Source",
        description: "Understanding separation of concerns",
        question: "What typically goes in a .h file vs a .c file?",
        options: [
          { id: "a", text: ".h has implementations, .c has declarations", correct: false },
          { id: "b", text: ".h has declarations, .c has implementations", correct: true },
          { id: "c", text: ".h has main(), .c has everything else", correct: false },
          { id: "d", text: "Both are identical", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d27-c1", type: "code", title: "Multi-File Simulation",
        description: "Simulate a multi-file project by using #include to organize code sections",
        starterCode: `#include <stdio.h>\n\n// Simulating a header file inline\n#define MATH_UTILS_H\nint multiply(int a, int b) { return a * b; }\nint power(int base, int exp) {\n    int r = 1;\n    for (int i = 0; i < exp; i++) r *= base;\n    return r;\n}\n\nint main(void) {\n    /* TODO: use the math utilities */\n    return 0;\n}`,
        hints: ["Call multiply and power", "Print their results"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d27-a1", title: "Module Design",
      description: "Design a set of header files and implementations for a calculator library",
      requirements: [
        "Design a 'calc.h' header with function declarations",
        "Implement add, sub, mul, div, pow, sqrt (simulated)",
        "Use include guards in the header",
        "Show how the module would be used via main",
        "Document the interface with comments",
      ],
      starterCode: `#include <stdio.h>\n\n// calc.h simulation\n#ifndef CALC_H\n#define CALC_H\n/* TODO: declare calculator functions */\n#endif\n\n// calc.c simulation\n/* TODO: implement calculator functions */\n\nint main(void) {\n    /* TODO: test calculator */\n    return 0;\n}`,
      rubric: [
        { criterion: "Header with declarations", points: 25 },
        { criterion: "Include guard present", points: 20 },
        { criterion: "All functions implemented", points: 30 },
        { criterion: "Documentation/comments", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
