import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Data Types & Memory Layout",
    subtitle: "integers, floats, chars, and how the machine stores them",
    tags: ["types", "memory", "sizeof"],
    theory: {
      sections: [
        {
          heading: "Fundamental Types",
          content:
            "C gives you direct control over memory size. int (4 bytes), char (1 byte), float (4 bytes), double (8 bytes). Use sizeof() to inspect actual sizes.",
          codeExample: `int age = 25;\nchar grade = 'A';\nfloat pi = 3.14f;\ndouble e = 2.718281828;`,
        },
        {
          heading: "Signed vs Unsigned",
          content:
            "Signed types use two's complement. unsigned doubles the positive range. A signed char goes from -128 to 127; unsigned char from 0 to 255.",
        },
        {
          heading: "Type Modifiers",
          content:
            "short, long, long long modify integer sizes. const prevents modification. volatile flags values that may change unexpectedly (hardware registers).",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int n = 42;\n    char c = 'Z';\n    float f = 3.14f;\n    printf("int: %d (%zu bytes)\\n", n, sizeof(n));\n    printf("char: %c (%zu bytes)\\n", c, sizeof(c));\n    printf("float: %.2f (%zu bytes)\\n", f, sizeof(f));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d2-q1", type: "quiz", title: "sizeof",
        description: "Memory inspection",
        question: "What does the sizeof operator return?",
        options: [
          { id: "a", text: "The value stored in a variable", correct: false },
          { id: "b", text: "The size in bytes of a type or variable", correct: true },
          { id: "c", text: "The memory address", correct: false },
          { id: "d", text: "The number of bits", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d2-q2", type: "quiz", title: "Char Size",
        description: "Character storage",
        question: "How many bytes does a char typically occupy?",
        options: [
          { id: "a", text: "1 byte", correct: true },
          { id: "b", text: "2 bytes", correct: false },
          { id: "c", text: "4 bytes", correct: false },
          { id: "d", text: "8 bytes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d2-c1", type: "code", title: "Memory Report",
        description: "Print sizes of all fundamental types",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    /* TODO: Print sizeof for int, char, float, double, long */\n    return 0;\n}`,
        expectedOutput: "bytes",
        hints: ["Use printf with %zu for sizeof results", "sizeof returns size_t"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d2-a1", title: "Type Manifest",
      description: "Create a formatted table of all C fundamental types and their sizes",
      requirements: [
        "Print a header row: Type | Size (bytes)",
        "Include at least 6 different types",
        "Use sizeof for each",
        "Align output cleanly",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    printf("=== TYPE MANIFEST ===\\n");\n    /* Your table here */\n    return 0;\n}`,
      rubric: [
        { criterion: "Correct sizeof usage", points: 30 },
        { criterion: "At least 6 types listed", points: 30 },
        { criterion: "Formatted output", points: 20 },
        { criterion: "Compiles cleanly", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
