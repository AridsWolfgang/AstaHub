import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Arrays",
    subtitle: "Contiguous memory blocks — storing sequences of data",
    tags: ["arrays", "memory", "indexing"],
    theory: {
      sections: [
        {
          heading: "Array Declaration and Initialization",
          content:
            "An array is a contiguous block of elements of the same type. Declared as type name[size];. Indexing starts at 0. Arrays can be initialized with a brace-enclosed list.",
          codeExample: `int arr[5] = {10, 20, 30, 40, 50};\nint matrix[2][3] = {{1,2,3}, {4,5,6}};\nchar name[] = "Asta";  // size inferred`,
        },
        {
          heading: "Array Indexing and Bounds",
          content:
            "Access elements with arr[index]. C does NOT perform bounds checking — accessing arr[5] on a 5-element array reads/writes memory beyond the array, causing undefined behavior. This is the source of countless bugs and security vulnerabilities.",
          codeExample: `int arr[3] = {1, 2, 3};\narr[0] = 10;     // OK\narr[3] = 42;     // BUG! out-of-bounds write`,
        },
        {
          heading: "Arrays and Loops",
          content:
            "Arrays and loops are natural partners. Use a loop index to iterate through all elements. The sizeof idiom gives the element count: sizeof(arr) / sizeof(arr[0]).",
          codeExample: `int arr[] = {5, 3, 8, 1, 9};\nint n = sizeof(arr) / sizeof(arr[0]);\nfor (int i = 0; i < n; i++) {\n    printf("%d ", arr[i]);\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int arr[5] = {1, 2, 3, 4, 5};\n    for (int i = 0; i < 5; i++)\n        printf("arr[%d] = %d\\n", i, arr[i]);\n    printf("Size: %zu elements\\n", sizeof(arr) / sizeof(arr[0]));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d7-q1", type: "quiz", title: "Zero-Based Indexing",
        description: "Understanding array indexing",
        question: "What is the index of the first element in a C array?",
        options: [
          { id: "a", text: "1", correct: false },
          { id: "b", text: "0", correct: true },
          { id: "c", text: "-1", correct: false },
          { id: "d", text: "It depends on the compiler", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d7-q2", type: "quiz", title: "Out of Bounds",
        description: "Understanding array safety",
        question: "What happens if you access arr[5] when 'int arr[5]' was declared?",
        options: [
          { id: "a", text: "The compiler catches it", correct: false },
          { id: "b", text: "It returns 0", correct: false },
          { id: "c", text: "Undefined behavior — may crash or corrupt data", correct: true },
          { id: "d", text: "The array automatically resizes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d7-c1", type: "code", title: "Array Sum and Average",
        description: "Compute the sum and average of elements in an array",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    int arr[] = {12, 45, 7, 23, 56, 89, 34};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    /* TODO: compute sum and average */\n    return 0;\n}`,
        expectedOutput: "Sum:",
        hints: ["Initialize sum = 0", "Loop through all elements", "Use double for average"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d7-a1", title: "Array Statistics",
      description: "Write a program that computes min, max, sum, and average of an array",
      requirements: [
        "Define an array of at least 10 integers",
        "Find the minimum and maximum values",
        "Compute the sum and average (as double)",
        "Print all four statistics",
        "Do not hardcode array values in the logic",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    int data[] = {45, 23, 78, 12, 90, 34, 56, 67, 89, 10};\n    int n = sizeof(data) / sizeof(data[0]);\n    /* TODO: compute and print statistics */\n    return 0;\n}`,
      rubric: [
        { criterion: "Min/max correct", points: 25 },
        { criterion: "Sum and average correct", points: 25 },
        { criterion: "Uses loop over array", points: 25 },
        { criterion: "Readable output", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
