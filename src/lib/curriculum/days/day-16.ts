import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Preprocessor",
    subtitle: "#define, macros, and conditional compilation",
    tags: ["preprocessor", "macros", "compilation"],
    theory: {
      sections: [
        {
          heading: "The Preprocessor Pipeline",
          content:
            "The preprocessor runs before the compiler. It handles #include (file insertion), #define (macro substitution), #if/#ifdef (conditional compilation), and more. All preprocessor directives start with #.",
          codeExample: `#include <stdio.h>   // insert stdio.h\n#include "myheader.h" // insert local file\n#define BUFFER_SIZE 256\n#ifndef BUFFER_SIZE\n  #define BUFFER_SIZE 128\n#endif`,
        },
        {
          heading: "Macros with Parameters",
          content:
            "Macros can take parameters but are text substitution — not functions. Parenthesize parameters to avoid precedence bugs. Multi-line macros use backslash continuation. Beware of double evaluation of arguments.",
          codeExample: `#define SQUARE(x) ((x)*(x))\n#define MAX(a,b) (((a)>(b))?(a):(b))\n#define LOG(msg) printf("[LOG] %s\\n", msg)\n\nint result = SQUARE(3+1);  // ((3+1)*(3+1)) = 16`,
        },
        {
          heading: "Conditional Compilation",
          content:
            "#if, #ifdef, #ifndef, #else, #elif, #endif control which code is compiled. Used for platform-specific code, debug builds, and header guards. #pragma once is a modern alternative to traditional include guards.",
          codeExample: `#ifdef DEBUG\n  printf("x = %d\\n", x);\n#endif\n\n#if defined(_WIN32)\n  #include <windows.h>\n#elif defined(__linux__)\n  #include <unistd.h>\n#endif`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\n#define PI 3.14159\n#define AREA(r) (PI*(r)*(r))\n#define MAX(a,b) ((a)>(b)?(a):(b))\n\nint main(void) {\n    printf("PI = %f\\n", PI);\n    printf("Area of r=5: %f\\n", AREA(5));\n    printf("MAX(10,20) = %d\\n", MAX(10, 20));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d16-q1", type: "quiz", title: "Macro Parentheses",
        description: "Understanding macro safety",
        question: "Why should macro parameters be parenthesized like '#define SQR(x) ((x)*(x))'?",
        options: [
          { id: "a", text: "To make it run faster", correct: false },
          { id: "b", text: "To prevent operator precedence bugs", correct: true },
          { id: "c", text: "Because the compiler requires it", correct: false },
          { id: "d", text: "To avoid multiple evaluation", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d16-q2", type: "quiz", title: "Include Guards",
        description: "Understanding header protection",
        question: "What is the purpose of #include guards (or #pragma once)?",
        options: [
          { id: "a", text: "To make headers compile faster", correct: false },
          { id: "b", text: "To prevent a header from being included multiple times", correct: true },
          { id: "c", text: "To secure the header file", correct: false },
          { id: "d", text: "To export functions", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d16-c1", type: "code", title: "Debug Macro",
        description: "Create a DEBUG_PRINT macro that prints only when DEBUG is defined",
        starterCode: `#include <stdio.h>\n\n/* TODO: define DEBUG_PRINT macro */\n\nint main(void) {\n    int x = 42;\n    // DEBUG_PRINT("x = %d\\n", x);  // should print if DEBUG defined\n    printf("Program running\\n");\n    return 0;\n}`,
        expectedOutput: "Program running",
        hints: ["Use #ifdef DEBUG", "Macro with variable args: #define DEBUG_PRINT(fmt, ...) printf(fmt, __VA_ARGS__)"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d16-a1", title: "Preprocessor Assert",
      description: "Implement a compile-time and runtime assert system using macros",
      requirements: [
        "Define STATIC_ASSERT(cond) that generates a compile error if false",
        "Define ASSERT(cond) that prints file/line on failure",
        "Define ASSERT_MSG(cond, msg) with custom message",
        "Use __FILE__, __LINE__, __func__ in output",
        "Test both passing and failing cases",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\n#define STATIC_ASSERT(cond) ((void)sizeof(char[1 - 2*!(cond)]))\n\n/* TODO: define ASSERT and ASSERT_MSG macros */\n\nint main(void) {\n    STATIC_ASSERT(sizeof(int) == 4);  // compiles on most platforms\n    int x = 10;\n    // ASSERT(x > 0);\n    // ASSERT_MSG(x < 100, "x too large");\n    printf("All tests passed\\n");\n    return 0;\n}`,
      rubric: [
        { criterion: "STATIC_ASSERT works", points: 25 },
        { criterion: "ASSERT prints file/line", points: 25 },
        { criterion: "ASSERT_MSG works", points: 25 },
        { criterion: "Macro hygiene (no side effects)", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
