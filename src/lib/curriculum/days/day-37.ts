import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Multi-file Projects",
    subtitle: "Building modular C applications with multiple source files",
    tags: ["projects", "modular", "organization"],
    theory: {
      sections: [
        {
          heading: "Project Organization",
          content:
            "A well-organized C project separates concerns into modules. Typically: src/ for source files, include/ for headers, tests/ for test files. Each module has a .h (interface) and .c (implementation). A Makefile ties everything together.",
          codeExample: `# Project structure:\n# project/\n# ├── include/\n# │   └── calc.h\n# ├── src/\n# │   ├── main.c\n# │   ├── calc.c\n# │   └── utils.c\n# ├── Makefile\n# └── README\n#\n# Compile:\n# gcc -Iinclude -c src/main.c -o obj/main.o\n# gcc -Iinclude -c src/calc.c -o obj/calc.o\n# gcc obj/*.o -o bin/program`,
        },
        {
          heading: "Static Libraries (.a)",
          content:
            "A static library archives multiple .o files into one .a file. ar rcs libcalc.a calc.o utils.o creates the library. Link with -L. -lcalc. Static libraries are copied into the final executable at link time.",
        },
        {
          heading: "Header Dependencies",
          content:
            "Each .c file includes its own header (for type checking) and any other headers it needs. Headers include only what's necessary — minimize transitive includes. Use forward declarations for structs when possible to reduce coupling.",
        },
      ],
    },
    playground: {
      defaultCode: `// Multi-file project simulation\n#include <stdio.h>\n\n// Simulating calc.h\nint add(int a, int b);\nint mul(int a, int b);\n\n// Simulating calc.c\nint add(int a, int b) { return a + b; }\nint mul(int a, int b) { return a * b; }\n\n// Simulating main.c\nint main(void) {\n    printf("add(3,4) = %d\\n\", add(3,4));\n    printf("mul(3,4) = %d\\n\", mul(3,4));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d37-q1", type: "quiz", title: "Module Pattern",
        description: "Understanding modular organization",
        question: "In a C project, what goes in a .h file?",
        options: [
          { id: "a", text: "Implementation details", correct: false },
          { id: "b", text: "Declarations (function prototypes, type definitions)", correct: true },
          { id: "c", text: "The main() function", correct: false },
          { id: "d", text: "Makefile rules", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d37-q2", type: "quiz", title: "Static Library",
        description: "Understanding library creation",
        question: "What command creates a static library from object files?",
        options: [
          { id: "a", text: "gcc -shared -o lib.a files.o", correct: false },
          { id: "b", text: "ar rcs lib.a files.o", correct: true },
          { id: "c", text: "ld -o lib.a files.o", correct: false },
          { id: "d", text: "make lib.a", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d37-c1", type: "code", title: "Module Simulation",
        description: "Simulate a multi-file project with #include and modular functions",
        starterCode: `#include <stdio.h>\n\n// Simulate stack.h\ntypedef struct { int data[100]; int top; } Stack;\nvoid push(Stack *s, int v);\nint pop(Stack *s);\n\n// Simulate stack.c\nvoid push(Stack *s, int v) { s->data[++s->top] = v; }\nint pop(Stack *s) { return s->data[s->top--]; }\n\nint main(void) {\n    /* TODO: use the stack module */\n    return 0;\n}`,
        hints: ["Initialize stack.top = -1", "Push some values, then pop and print them"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d37-a1", title: "Module Library",
      description: "Design a small library with 3 modules and show how they connect",
      requirements: [
        "Design modules: math_utils (add, sub, mul, div), string_utils (reverse, upper), file_utils (read_line, write_line)",
        "Show header file contents with include guards",
        "Show implementation file contents",
        "Show main.c using all modules",
        "Show a Makefile to build everything",
      ],
      starterCode: `#include <stdio.h>\n\n// math_utils.h simulation\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\n/* TODO: declare math functions */\n#endif\n\n// string_utils.h simulation\n#ifndef STRING_UTILS_H\n#define STRING_UTILS_H\n/* TODO: declare string functions */\n#endif\n\n// main.c simulation\nint main(void) {\n    /* TODO: use functions from both modules */\n    return 0;\n}`,
      rubric: [
        { criterion: "3 modules designed", points: 25 },
        { criterion: "Include guards present", points: 20 },
        { criterion: "Headers declare, implementations define", points: 25 },
        { criterion: "Makefile included", points: 30 },
      ],
      xpReward: 100,
    },
};

export default lesson;
