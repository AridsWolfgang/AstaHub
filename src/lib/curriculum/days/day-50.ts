import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Capstone: C Systems Project",
    subtitle: "Build a complete C application from scratch",
    tags: ["capstone", "project", "portfolio"],
    theory: {
      sections: [
        {
          heading: "Capstone Project Choices",
          content:
            "Choose one capstone project to build. Each integrates multiple C concepts you've learned. The goal is a working, well-structured application with proper error handling, memory management, and documentation.",
        },
        {
          heading: "Option 1: CLI Calculator with History",
          content:
            "Build an interactive calculator that reads expressions, computes results, and maintains a command history. Must handle: +, -, *, /, parentheses, variables (x = 5; x + 3). Concepts: parsing, dynamic memory, error handling, linked lists (history).",
        },
        {
          heading: "Option 2: Mini Text Editor",
          content:
            "Build a line-oriented text editor. Commands: i (insert line), d (delete), p (print), w (write to file), q (quit). Concepts: dynamic arrays, file I/O, command parsing, string manipulation.",
          codeExample: `// Structure for the editor:\ntypedef struct {\n    char **lines;\n    int count;\n    int capacity;\n} Buffer;\n\nvoid insert_line(Buffer *buf, int pos, const char *line);\nvoid delete_line(Buffer *buf, int pos);\nvoid print_buffer(Buffer *buf);\nvoid save_to_file(Buffer *buf, const char *filename);`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n/* CAPSTONE: Mini Line Editor\n * Commands:\n *   i <line_num> <text>  - insert\n *   d <line_num>         - delete\n *   p                    - print all\n *   w <filename>         - save\n *   q                    - quit\n */\n\ntypedef struct {\n    char **lines;\n    int count;\n    int capacity;\n} Buffer;\n\nvoid init(Buffer *b) {\n    b->capacity = 10;\n    b->lines = malloc(b->capacity * sizeof(char*));\n    b->count = 0;\n}\n\nvoid insert(Buffer *b, int pos, const char *text) {\n    if (pos < 0 || pos > b->count) { printf("Invalid position\\n\"); return; }\n    if (b->count >= b->capacity) {\n        b->capacity *= 2;\n        b->lines = realloc(b->lines, b->capacity * sizeof(char*));\n    }\n    for (int i = b->count; i > pos; i--)\n        b->lines[i] = b->lines[i-1];\n    b->lines[pos] = strdup(text);\n    b->count++;\n}\n\nvoid print(Buffer *b) {\n    for (int i = 0; i < b->count; i++)\n        printf("%4d: %s\\n\", i+1, b->lines[i]);\n}\n\nvoid cleanup(Buffer *b) {\n    for (int i = 0; i < b->count; i++) free(b->lines[i]);\n    free(b->lines);\n}\n\nint main(void) {\n    Buffer buf;\n    init(&buf);\n    insert(&buf, 0, "Hello, World!\");\n    insert(&buf, 1, "This is my editor.\");\n    insert(&buf, 0, "Line inserted at top.\");\n    print(&buf);\n    cleanup(&buf);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d50-q1", type: "quiz", title: "Capstone Planning",
        description: "Understanding project planning",
        question: "What is the first step in building a capstone project?",
        options: [
          { id: "a", text: "Writing all the code at once", correct: false },
          { id: "b", text: "Planning the architecture and data structures", correct: true },
          { id: "c", text: "Optimizing for performance", correct: false },
          { id: "d", text: "Adding comments to the code", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d50-q2", type: "quiz", title: "Project Structure",
        description: "Understanding code organization",
        question: "How should a capstone C project be organized?",
        options: [
          { id: "a", text: "All code in one file for simplicity", correct: false },
          { id: "b", text: "Split into logical modules with .h and .c files", correct: true },
          { id: "c", text: "One header file and one source file only", correct: false },
          { id: "d", text: "No organization needed for small projects", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d50-c1", type: "code", title: "Capstone Prep",
        description: "Implement a simple command parser for the editor",
        starterCode: `#include <stdio.h>\n#include <string.h>\n\nvoid parse_command(const char *input) {\n    char cmd[32];\n    int arg1;\n    char arg2[256];\n\n    /* TODO: parse "i 5 hello\" or \"p\" or \"q\" */\n    if (sscanf(input, "%s %d %[^\\n]\", cmd, &arg1, arg2) >= 1) {\n        if (strcmp(cmd, \"p\") == 0)\n            printf("Command: PRINT\\n\");\n        else if (strcmp(cmd, \"q\") == 0)\n            printf("Command: QUIT\\n\");\n        else if (strcmp(cmd, \"i\") == 0)\n            printf("Command: INSERT at %d: %s\\n\", arg1, arg2);\n        else\n            printf("Unknown command: %s\\n\", cmd);\n    }\n}\n\nint main(void) {\n    parse_command("p\");\n    parse_command("i 3 hello world\");\n    parse_command("q\");\n    return 0;\n}`,
        expectedOutput: "Command: PRINT",
        hints: ["Use sscanf or strtok", "First token is the command letter"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d50-a1", title: "C Capstone Project",
      description: "Build and document a complete C project of your choice",
      requirements: [
        "Choose: CLI calculator with history, mini text editor, or custom allocator",
        "Use proper multi-file structure (.h + .c modules)",
        "Include a Makefile",
        "Handle errors gracefully (invalid input, memory failure)",
        "Write a test suite using assert",
        "Document code and provide a README",
      ],
      starterCode: `/* C Capstone Project Template\n *\n * Choose your project and implement it.\n * Structure:\n * - src/main.c        — entry point\n * - src/editor.c      — editor implementation\n * - include/editor.h  — editor interface\n * - Makefile          — build system\n * - test/test.c       — test suite\n */\n\n#include <stdio.h>\n\nint main(void) {\n    printf("=== C Capstone Project ===\\n\");\n    printf("Choose your project and begin building!\\n\");\n    return 0;\n}`,
      rubric: [
        { criterion: "Working complete application", points: 30 },
        { criterion: "Multi-file organization", points: 20 },
        { criterion: "Error handling", points: 20 },
        { criterion: "Test suite", points: 15 },
        { criterion: "Documentation", points: 15 },
      ],
      xpReward: 200,
    },
};

export default lesson;
