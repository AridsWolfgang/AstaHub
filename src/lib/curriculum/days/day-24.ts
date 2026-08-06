import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Sorting Algorithms",
    subtitle: "Bubble, insertion, and selection — O(n²) sorts",
    tags: ["algorithms", "sorting", "O(n²)"],
    theory: {
      sections: [
        {
          heading: "Bubble Sort",
          content:
            "Repeatedly step through the array, comparing adjacent elements and swapping them if they're in the wrong order. Each pass bubbles the largest element to the end. Early termination if no swaps occur (optimized). O(n²) worst/average, O(n) best when already sorted.",
          codeExample: `void bubble(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int swapped = 0;\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n                swapped = 1;\n            }\n        }\n        if (!swapped) break;\n    }\n}`,
        },
        {
          heading: "Insertion Sort",
          content:
            "Build the sorted array one element at a time. Take each element and insert it into the correct position among the already-sorted elements. Excellent for small arrays and nearly-sorted data. O(n²) worst, O(n) best.",
          codeExample: `void insertion(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j+1] = arr[j];\n            j--;\n        }\n        arr[j+1] = key;\n    }\n}`,
        },
        {
          heading: "Selection Sort",
          content:
            "Find the minimum element and swap it to the front. Repeat for the remaining subarray. Simple but always O(n²) — even if already sorted. Makes fewer swaps than bubble sort (at most n-1).",
          codeExample: `void selection(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min = i;\n        for (int j = i+1; j < n; j++)\n            if (arr[j] < arr[min]) min = j;\n        int t = arr[i]; arr[i] = arr[min]; arr[min] = t;\n    }\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nvoid print(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n}\n\nvoid bubble(int arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n}\n\nint main(void) {\n    int a[] = {5, 2, 8, 1, 9, 3};\n    int n = sizeof(a)/sizeof(a[0]);\n    bubble(a, n);\n    print(a, n);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d24-q1", type: "quiz", title: "Bubble Best Case",
        description: "Understanding best-case performance",
        question: "What is the best-case time complexity of optimized bubble sort?",
        options: [
          { id: "a", text: "O(n)", correct: true },
          { id: "b", text: "O(n log n)", correct: false },
          { id: "c", text: "O(n²)", correct: false },
          { id: "d", text: "O(1)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d24-q2", type: "quiz", title: "Stable Sort",
        description: "Understanding sort stability",
        question: "Which of these sorts is stable (preserves relative order of equal elements)?",
        options: [
          { id: "a", text: "Selection sort", correct: false },
          { id: "b", text: "Bubble sort", correct: true },
          { id: "c", text: "Neither", correct: false },
          { id: "d", text: "Both", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d24-c1", type: "code", title: "Sort Comparison",
        description: "Implement all three sorts and count comparisons/swaps",
        starterCode: `#include <stdio.h>\n\nvoid bubble_count(int arr[], int n, int *swaps) {\n    /* TODO: count swaps during bubble sort */\n}\n\nint main(void) {\n    int arr[] = {5, 3, 8, 6, 2, 7, 1, 4};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    int swaps = 0;\n    bubble_count(arr, n, &swaps);\n    printf("Bubble swaps: %d\\n\", swaps);\n    return 0;\n}`,
        hints: ["Pass a pointer to the swap counter", "Increment on each swap"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d24-a1", title: "Sorting Benchmark",
      description: "Implement all three sorts and benchmark them on different array sizes",
      requirements: [
        "Implement bubble, insertion, and selection sort",
        "Count the number of comparisons each makes",
        "Test on small (10), medium (50), and large (100) arrays",
        "Print a comparison table of results",
        "Test on already-sorted arrays too",
      ],
      starterCode: `#include <stdio.h>\n\nint bubble(int arr[], int n) {\n    int comps = 0;\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++) {\n            comps++;\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n        }\n    return comps;\n}\n\nint insertion(int arr[], int n) {\n    /* TODO: count comparisons */\n}\n\nint selection(int arr[], int n) {\n    /* TODO: count comparisons */\n}\n\nint main(void) {\n    int arr[] = {5, 3, 8, 6, 2, 7, 1, 4};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    printf("Bubble: %d comparisons\\n", bubble(arr, n));\n    /* TODO: test other sorts */\n    return 0;\n}`,
      rubric: [
        { criterion: "All three sorts implemented", points: 30 },
        { criterion: "Comparison counting correct", points: 25 },
        { criterion: "Test on multiple array sizes", points: 25 },
        { criterion: "Results table printed", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
