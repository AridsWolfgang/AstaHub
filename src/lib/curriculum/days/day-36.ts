import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Valgrind & Memory Tools",
    subtitle: "Detecting leaks, invalid access, and undefined behavior",
    tags: ["valgrind", "memory", "debugging"],
    theory: {
      sections: [
        {
          heading: "What Valgrind Detects",
          content:
            "Valgrind's Memcheck tool detects: memory leaks (malloc without free), use-after-free, invalid read/write (buffer overflows), mismatched allocation/deallocation, and uninitialized memory reads. It runs your program in a synthetic CPU to track every memory access.",
          codeExample: `# Compile with debug symbols:\n# gcc -g -O0 program.c -o program\n#\n# Run under Valgrind:\n# valgrind --leak-check=full ./program\n#\n# Example output:\n# ==12345== HEAP SUMMARY:\n# ==12345==     in use at exit: 40 bytes in 1 blocks\n# ==12345==   total heap usage: 1 allocs, 0 frees\n# ==12345== LEAK SUMMARY:\n# ==12345==    definitely lost: 40 bytes in 1 blocks`,
        },
        {
          heading: "Common Valgrind Errors",
          content:
            "Invalid write of size 4: writing past the end of an array. Conditional jump depends on uninitialized value: using an uninitialized variable. Definitely lost: memory not freed. Use-after-free: accessing freed heap memory.",
        },
        {
          heading: "Other Memory Tools",
          content:
            "AddressSanitizer (-fsanitize=address) is a compiler-based alternative that's faster than Valgrind. LeakSanitizer finds leaks. UBSan detects undefined behavior. These work at compile time rather than runtime emulation.",
        },
      ],
    },
    playground: {
      defaultCode: `// Valgrind detects memory errors at runtime.\n// This example has intentional bugs for Valgrind to catch.\n#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // Bug 1: Memory leak\n    int *leak = malloc(sizeof(int));\n    *leak = 42;\n    // forgot to free(leak)\n\n    // Bug 2: Invalid write\n    int arr[3];\n    arr[3] = 100;  // out of bounds!\n\n    // Bug 3: Uninitialized\n    int x;\n    if (x > 0) printf("%d\\n\", x);\n\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d36-q1", type: "quiz", title: "Valgrind Detection",
        description: "What Valgrind catches",
        question: "Which of these does Valgrind NOT detect by default?",
        options: [
          { id: "a", text: "Memory leaks", correct: false },
          { id: "b", text: "Buffer overflows", correct: false },
          { id: "c", text: "Logic errors that produce wrong output", correct: true },
          { id: "d", text: "Use-after-free", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d36-q2", type: "quiz", title: "Definitely Lost",
        description: "Understanding Valgrind's leak categories",
        question: "What does 'definitely lost' mean in Valgrind output?",
        options: [
          { id: "a", text: "Memory was freed correctly", correct: false },
          { id: "b", text: "Memory was allocated but never freed, and no pointer to it remains", correct: true },
          { id: "c", text: "The program lost a file handle", correct: false },
          { id: "d", text: "Stack memory was corrupted", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d36-c1", type: "code", title: "Leak Fixer",
        description: "Fix the memory leaks in this program",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nchar *duplicate(const char *s) {\n    char *copy = malloc(strlen(s) + 1);\n    strcpy(copy, s);\n    return copy;\n}\n\nint main(void) {\n    char *names[3];\n    names[0] = duplicate("Alice");\n    names[1] = duplicate("Bob");\n    names[2] = duplicate("Charlie");\n\n    for (int i = 0; i < 3; i++)\n        printf("%s\\n\", names[i]);\n\n    /* TODO: free all allocated memory */\n    return 0;\n}`,
        hints: ["Free each element in a loop", "Don't forget to free after printing"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d36-a1", title: "Memory Bug Hunt",
      description: "Write a program with 4 different memory bugs and document how Valgrind would catch each",
      requirements: [
        "Include: memory leak (malloc without free)",
        "Include: invalid write (buffer overflow)",
        "Include: use-after-free",
        "Include: uninitialized variable read",
        "Comment each bug with expected Valgrind output",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // Bug 1: Memory leak\n    int *p = malloc(sizeof(int));\n    *p = 42;\n    // No free!\n\n    // Bug 2: Out-of-bounds write\n    int arr[3];\n    for (int i = 0; i <= 3; i++)  // off-by-one\n        arr[i] = i * 10;\n\n    // Bug 3: Use after free\n    int *q = malloc(sizeof(int));\n    free(q);\n    *q = 100;  // using freed memory\n\n    // Bug 4: Uninitialized read\n    int x;\n    if (x > 0) printf("positive\\n\");\n\n    return 0;\n}`,
      rubric: [
        { criterion: "Memory leak bug present", points: 20 },
        { criterion: "Buffer overflow bug present", points: 20 },
        { criterion: "Use-after-free bug present", points: 20 },
        { criterion: "Uninitialized read bug present", points: 20 },
        { criterion: "Clear comments/documentation", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
