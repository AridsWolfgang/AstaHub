import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Dynamic Memory: realloc & calloc",
    subtitle: "Resizing and zero-initialized allocation",
    tags: ["memory", "realloc", "calloc"],
    theory: {
      sections: [
        {
          heading: "calloc — Zero-Initialized Allocation",
          content:
            "calloc(n, size) allocates n * size bytes and sets every byte to 0. Unlike malloc, which leaves memory uninitialized (potentially containing garbage), calloc gives you a clean slate. Slightly slower but safer for many use cases.",
          codeExample: `// Allocate array of 10 ints, all zero\nint *arr = calloc(10, sizeof(int));\nif (!arr) { /* handle error */ }\n// All elements are guaranteed to be 0`,
        },
        {
          heading: "realloc — Resizing",
          content:
            "realloc(ptr, newSize) resizes a previously allocated block. It may move the block to a new location, copying existing data. The returned pointer may differ from the input. If realloc fails, it returns NULL and the original block is still valid.",
          codeExample: `int *arr = malloc(5 * sizeof(int));\n// ... use arr ...\nint *tmp = realloc(arr, 10 * sizeof(int));\nif (!tmp) {\n    // realloc failed, arr is still valid\n    free(arr);\n    return 1;\n}\narr = tmp;  // safe to reassign`,
        },
        {
          heading: "Best Practices",
          content:
            "Never do ptr = realloc(ptr, newSize) directly — if realloc fails, you lose the original pointer. Always use a temporary pointer. Use calloc when you need zeroed memory, malloc when you'll initialize immediately.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = calloc(3, sizeof(int));\n    if (!arr) return 1;\n    arr[0] = 10; arr[1] = 20; arr[2] = 30;\n    int *tmp = realloc(arr, 5 * sizeof(int));\n    if (!tmp) { free(arr); return 1; }\n    arr = tmp;\n    arr[3] = 40; arr[4] = 50;\n    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);\n    free(arr);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d14-q1", type: "quiz", title: "calloc vs malloc",
        description: "Understanding allocation differences",
        question: "What is the key difference between calloc and malloc?",
        options: [
          { id: "a", text: "calloc is faster than malloc", correct: false },
          { id: "b", text: "calloc zero-initializes memory, malloc does not", correct: true },
          { id: "c", text: "calloc only works for arrays", correct: false },
          { id: "d", text: "There is no difference", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d14-q2", type: "quiz", title: "realloc Safety",
        description: "Safe realloc usage",
        question: "Why should you NOT do 'ptr = realloc(ptr, newSize)' directly?",
        options: [
          { id: "a", text: "It causes undefined behavior", correct: false },
          { id: "b", text: "If realloc fails, you lose the original pointer", correct: true },
          { id: "c", text: "The compiler will warn you", correct: false },
          { id: "d", text: "It's actually safe to do", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d14-c1", type: "code", title: "Dynamic Grow",
        description: "Start with a small array, grow it with realloc as you add elements",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int capacity = 2;\n    int *arr = malloc(capacity * sizeof(int));\n    if (!arr) return 1;\n    int count = 0;\n    /* TODO: add values 10,20,30,40,50, growing array as needed */\n    free(arr);\n    return 0;\n}`,
        expectedOutput: "10 20 30 40 50",
        hints: ["When count >= capacity, double capacity with realloc", "Use a temporary pointer for realloc"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d14-a1", title: "Dynamic String Builder",
      description: "Build a string by repeatedly doubling the buffer and appending characters",
      requirements: [
        "Start with a small buffer (4 bytes)",
        "Append characters 'A' through 'Z'",
        "Double the buffer with realloc when full",
        "Null-terminate the final string",
        "Print the result and total capacity",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int cap = 4;\n    char *buf = malloc(cap);\n    if (!buf) return 1;\n    int len = 0;\n    /* TODO: append 'A'..'Z', growing as needed */\n    buf[len] = '\\0';\n    printf("%s\\n", buf);\n    printf("Final capacity: %d\\n", cap);\n    free(buf);\n    return 0;\n}`,
      rubric: [
        { criterion: "Dynamic growth with realloc", points: 30 },
        { criterion: "All 26 letters appended", points: 20 },
        { criterion: "Safe realloc pattern", points: 25 },
        { criterion: "Null-terminated result", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
