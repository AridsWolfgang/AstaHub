import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "The Machine Awakens",
    subtitle: "Your first C program and the compilation pipeline",
    tags: ["hello-world", "gcc", "compilation"],
    theory: {
      sections: [
        {
          heading: "Why C Still Matters",
          content:
            "C sits one abstraction layer above Assembly. Every operating system kernel, embedded firmware stack, and high-performance runtime is built on C's shoulders.",
        },
        {
          heading: "The Compilation Pipeline",
          content:
            "Source code (.c) → Preprocessor → Compiler → Assembler → Linker → Executable.",
          codeExample: `# Preprocessing: handles #include, #define\n# Compilation: C → Assembly\n# Assembly: mnemonics → machine code\n# Linking: combines object files + libraries`,
        },
        {
          heading: "Anatomy of a C Program",
          content:
            "Every C program needs a main() entry point returning int.",
          codeExample: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, silicon!\\n");\n    return 0;\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d1-q1", type: "quiz", title: "Entry Point",
        description: "Test your knowledge of program structure",
        question: "What is the required entry point function in every C program?",
        options: [
          { id: "a", text: "start()", correct: false },
          { id: "b", text: "main()", correct: true },
          { id: "c", text: "init()", correct: false },
          { id: "d", text: "run()", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d1-q2", type: "quiz", title: "Return Value",
        description: "Understanding exit codes",
        question: "What does return 0 from main() signify to the operating system?",
        options: [
          { id: "a", text: "Program crashed", correct: false },
          { id: "b", text: "Successful execution", correct: true },
          { id: "c", text: "Memory leak detected", correct: false },
          { id: "d", text: "Infinite loop", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d1-c1", type: "code", title: "Print Your Handle",
        description: "Modify the program to print your chosen hacker handle",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    /* TODO: Print "Agent: [YOUR_HANDLE]" */\n    return 0;\n}`,
        expectedOutput: "Agent:",
        hints: ["Use printf() with a format string", "Don't forget \\n for newline"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d1-a1", title: "Boot Sequence",
      description: "Write a program that prints a boot sequence banner",
      requirements: [
        "Print at least 3 lines of ASCII art or text",
        "Include your handle on the last line",
        "Use only printf() — no loops yet",
        "Return 0 on success",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    /* Your boot sequence here */\n    return 0;\n}`,
      rubric: [
        { criterion: "Compiles without errors", points: 25 },
        { criterion: "Prints multi-line output", points: 25 },
        { criterion: "Includes personal handle", points: 25 },
        { criterion: "Clean formatting", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
