import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Dynamic Memory: malloc",
    subtitle: "Heap allocation — requesting memory at runtime",
    tags: ["memory", "malloc", "heap"],
    theory: {
      sections: [
        {
          heading: "Stack vs Heap",
          content:
            "Local variables live on the stack — automatic allocation and deallocation. The heap is for data that must outlive the function or whose size is unknown at compile time. malloc() requests heap memory; free() returns it.",
          codeExample: `// Stack (automatic)\nint local = 5;\n\n// Heap (manual)\nint *arr = malloc(10 * sizeof(int));\nif (arr == NULL) {\n    fprintf(stderr, "malloc failed\\n");\n    return 1;\n}\n// use arr...\nfree(arr);`,
        },
        {
          heading: "malloc Pitfalls",
          content:
            "Always check malloc's return value — NULL means allocation failed. Every malloc must be matched with a free. Forgetting to free causes memory leaks; freeing twice causes undefined behavior. Use valgrind to detect leaks.",
          codeExample: `int *p = malloc(sizeof(int));\nif (!p) { /* handle error */ }\n*p = 42;\nfree(p);\np = NULL;  // prevent dangling pointer`,
        },
        {
          heading: "Allocating for Arrays and Structs",
          content:
            "Use malloc(n * sizeof(Type)) for arrays. For structs, allocate sizeof(StructType). The allocated memory is uninitialized — read it only after writing.",
          codeExample: `int *arr = malloc(100 * sizeof(int));\narr[0] = 42;\n\ntypedef struct { int x, y; } Point;\nPoint *p = malloc(sizeof(Point));\np->x = 10; p->y = 20;`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n = 5;\n    int *arr = malloc(n * sizeof(int));\n    if (!arr) { printf("malloc failed\\n"); return 1; }\n    for (int i = 0; i < n; i++) arr[i] = i * 10;\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    free(arr);\n    printf("Memory freed successfully\\n");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d13-q1", type: "quiz", title: "malloc Return",
        description: "Understanding allocation failure",
        question: "What does malloc return if memory allocation fails?",
        options: [
          { id: "a", text: "0", correct: false },
          { id: "b", text: "NULL", correct: true },
          { id: "c", text: "A valid pointer to zeroed memory", correct: false },
          { id: "d", text: "It crashes the program", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d13-q2", type: "quiz", title: "Memory Leak",
        description: "Understanding leak consequences",
        question: "What is a memory leak?",
        options: [
          { id: "a", text: "Freeing memory twice", correct: false },
          { id: "b", text: "Allocating memory and losing the pointer without freeing", correct: true },
          { id: "c", text: "Accessing freed memory", correct: false },
          { id: "d", text: "Using NULL pointer", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d13-c1", type: "code", title: "Dynamic Array",
        description: "Read a number N, allocate an array of N ints, fill with squares, print",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n = 10;\n    /* TODO: allocate array, fill with i*i, print */\n    return 0;\n}`,
        expectedOutput: "0 1 4 9 16",
        hints: ["malloc(n * sizeof(int))", "Check for NULL after malloc", "free at the end"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d13-a1", title: "Dynamic Stats",
      description: "Allocate an array dynamically, fill it with user-provided values, compute stats",
      requirements: [
        "Prompt for array size and allocate dynamically",
        "Fill array with sequential values (1 to N)",
        "Compute sum, average, min, max",
        "Print all stats and free memory",
        "Handle malloc failure gracefully",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n = 20;\n    int *data = malloc(n * sizeof(int));\n    if (!data) { printf("Allocation failed\\n"); return 1; }\n    /* TODO: fill with 1..n, compute stats */\n    free(data);\n    return 0;\n}`,
      rubric: [
        { criterion: "Dynamic allocation", points: 25 },
        { criterion: "Stats correct", points: 30 },
        { criterion: "free() called", points: 15 },
        { criterion: "Error handling", points: 30 },
      ],
      xpReward: 100,
    },
};

export default lesson;
