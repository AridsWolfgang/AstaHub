import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Debugging with GDB",
    subtitle: "Breakpoints, watchpoints, backtraces, and memory inspection",
    tags: ["gdb", "debugging", "tooling"],
    theory: {
      sections: [
        {
          heading: "Compiling for Debugging",
          content:
            "Compile with -g flag to include debug symbols: gcc -g -O0 program.c -o program. -O0 disables optimization so variable values match source code exactly. Without -g, GDB shows raw assembly instead of source lines.",
          codeExample: `# Compile with debug info:\n# gcc -g -O0 -o program program.c\n#\n# Start GDB:\n# gdb ./program\n#\n# Common GDB commands:\n# (gdb) break main        — set breakpoint\n# (gdb) run               — start program\n# (gdb) next              — step over\n# (gdb) step              — step into\n# (gdb) print x           — print variable\n# (gdb) backtrace         — show call stack\n# (gdb) info locals       — show local vars\n# (gdb) continue          — resume execution\n# (gdb) quit              — exit`,
        },
        {
          heading: "Breakpoints and Watchpoints",
          content:
            "break sets a breakpoint at a function or line. watch monitors a variable for changes. Conditional breakpoints (break if x > 10) stop only when a condition is true. delete removes breakpoints.",
        },
        {
          heading: "Inspecting Memory and Crashes",
          content:
            "When a program crashes, GDB catches the signal. Use backtrace to see the call chain. print *ptr shows what a pointer points to. x/10x addr examines raw memory in hex. frame N switches to a different call frame.",
        },
      ],
    },
    playground: {
      defaultCode: `// GDB debugging concepts\n// Compile: gcc -g -O0 -o debug_example debug_example.c\n// Run: gdb ./debug_example\n#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main(void) {\n    int x = 5;\n    int result = factorial(x);\n    printf("factorial(%d) = %d\\n\", x, result);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d35-q1", type: "quiz", title: "GDB Flag",
        description: "Compiling for debugging",
        question: "Which compiler flag adds debug symbols for GDB?",
        options: [
          { id: "a", text: "-O2", correct: false },
          { id: "b", text: "-g", correct: true },
          { id: "c", text: "-Wall", correct: false },
          { id: "d", text: "-o", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d35-q2", type: "quiz", title: "Backtrace",
        description: "Understanding call stacks",
        question: "What GDB command shows the current call stack?",
        options: [
          { id: "a", text: "print stack", correct: false },
          { id: "b", text: "backtrace", correct: true },
          { id: "c", text: "trace", correct: false },
          { id: "d", text: "stack", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d35-c1", type: "code", title: "Bug Finding",
        description: "Find and fix the bug using debugging concepts",
        starterCode: `#include <stdio.h>\n\nint divide(int a, int b) {\n    return a / b;\n}\n\nint main(void) {\n    int nums[] = {10, 20, 0, 40, 50};\n    for (int i = 0; i < 5; i++) {\n        printf("%d / 2 = %d\\n\", nums[i], divide(nums[i], 2));\n    }\n    /* There's a hidden bug - can you spot it? */\n    return 0;\n}`,
        hints: ["Check the array values carefully", "What happens with specific inputs?"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d35-a1", title: "GDB Cheat Sheet Program",
      description: "Write a program with intentional bugs and explain how GDB would catch each",
      requirements: [
        "Write a program with 3 intentional bugs",
        "Bug 1: segmentation fault (NULL dereference)",
        "Bug 2: off-by-one array access",
        "Bug 3: uninitialized variable use",
        "Comment each bug with the GDB commands that would catch it",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    /* Bug 1: NULL dereference */\n    int *p = NULL;\n    // In GDB:\n    // This would crash with SIGSEGV\n    // backtrace shows where it happened\n    // print p shows 0x0\n\n    /* Bug 2: Off-by-one */\n    int arr[3] = {1, 2, 3};\n    // TODO: access arr[3]\n\n    /* Bug 3: Uninitialized */\n    int x;\n    // TODO: use x without initializing\n\n    return 0;\n}`,
      rubric: [
        { criterion: "NULL dereference bug", points: 25 },
        { criterion: "Off-by-one bug", points: 25 },
        { criterion: "Uninitialized variable bug", points: 25 },
        { criterion: "GDB comments explaining detection", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
