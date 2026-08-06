import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Pointer Arithmetic",
    subtitle: "Navigating memory with pointer math and array equivalence",
    tags: ["pointers", "arithmetic", "arrays"],
    theory: {
      sections: [
        {
          heading: "Pointer Math Basics",
          content:
            "Adding N to a pointer moves it N * sizeof(element) bytes forward, not N bytes. This is why p++ on an int pointer (4 bytes) advances the address by 4. Pointer arithmetic is scaled by the pointed-to type's size.",
          codeExample: `int arr[] = {10, 20, 30, 40};\nint *p = arr;\nprintf("%d ", *p);      // 10\np++;                     // moves by 4 bytes\nprintf("%d\\n", *p);      // 20`,
        },
        {
          heading: "Array-Pointer Equivalence",
          content:
            "An array name decays to a pointer to its first element: arr is equivalent to &arr[0]. This means arr[i] is exactly the same as *(arr + i). The subscript operator [] is syntactic sugar over pointer arithmetic.",
          codeExample: `int arr[] = {5, 10, 15};\nprintf("%d == %d\\n", arr[1], *(arr + 1));  // 10 == 10\nprintf("%d == %d\\n", 1[arr], *(1 + arr));  // 10 == 10 (yes, 1[arr] works!)`,
        },
        {
          heading: "Pointer Differences and void*",
          content:
            "Subtracting two pointers of the same type gives the number of elements between them. void* is a generic pointer that cannot be dereferenced or arithmetically manipulated directly — cast it first.",
          codeExample: `int arr[] = {2, 4, 6, 8, 10};\nint *start = arr;\nint *end = &arr[4];\nint count = end - start;  // 4 elements apart`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int arr[] = {10, 20, 30};\n    int *p = arr;\n    for (int i = 0; i < 3; i++) {\n        printf("arr[%d] = %d  *(p+%d) = %d\\n", i, arr[i], i, *(p+i));\n    }\n    printf("Proof: arr == &arr[0]? %d\\n", arr == &arr[0]);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d10-q1", type: "quiz", title: "Pointer Increment",
        description: "Understanding scaled arithmetic",
        question: "If int *p points to arr[0], and sizeof(int) is 4, what is the byte address change after p++?",
        options: [
          { id: "a", text: "1 byte", correct: false },
          { id: "b", text: "4 bytes", correct: true },
          { id: "c", text: "Depends on the value", correct: false },
          { id: "d", text: "8 bytes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d10-q2", type: "quiz", title: "Array Decay",
        description: "Understanding array-to-pointer decay",
        question: "What does 'arr' represent when passed to a function?",
        options: [
          { id: "a", text: "The entire array copy", correct: false },
          { id: "b", text: "A pointer to the first element", correct: true },
          { id: "c", text: "The size of the array", correct: false },
          { id: "d", text: "The last element", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d10-c1", type: "code", title: "Pointer Sum",
        description: "Sum array elements using pointer arithmetic instead of indexing",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    int arr[] = {2, 4, 6, 8, 10};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int sum = 0;\n    /* TODO: sum using pointer arithmetic, no [] */\n    printf("Sum = %d\\n", sum);\n    return 0;\n}`,
        expectedOutput: "Sum = 30",
        hints: ["Use int *p = arr;", "While loop with p < arr + n", "Add *p then p++"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d10-a1", title: "Array Reversal with Pointers",
      description: "Reverse an array in-place using only pointer arithmetic (no bracket indexing)",
      requirements: [
        "Use two pointers: one at start, one at end",
        "Swap elements via dereference",
        "Advance start pointer, decrement end pointer",
        "Stop when pointers meet or cross",
        "Print array before and after reversal",
      ],
      starterCode: `#include <stdio.h>\n\nvoid reverse(int *arr, int n) {\n    /* TODO: reverse using pointer arithmetic */\n}\n\nint main(void) {\n    int arr[] = {1, 2, 3, 4, 5, 6, 7};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    reverse(arr, n);\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    return 0;\n}`,
      rubric: [
        { criterion: "Uses pointer arithmetic only", points: 35 },
        { criterion: "Reversal correct", points: 35 },
        { criterion: "Prints before and after", points: 15 },
        { criterion: "Handles even and odd length", points: 15 },
      ],
      xpReward: 100,
    },
};

export default lesson;
