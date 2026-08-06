import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Binary Search",
    subtitle: "Divide and conquer on sorted arrays — O(log n)",
    tags: ["algorithms", "search", "binary-search"],
    theory: {
      sections: [
        {
          heading: "How Binary Search Works",
          content:
            "Binary search finds an element in a sorted array by repeatedly dividing the search range in half. Compare the target to the middle element. If equal, done. If target is smaller, search the left half. If larger, search the right half. O(log n) time.",
          codeExample: `int bsearch(int arr[], int lo, int hi, int target) {\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}`,
        },
        {
          heading: "Why mid = lo + (hi-lo)/2?",
          content:
            "Using (lo+hi)/2 can overflow for large arrays. lo + (hi-lo)/2 computes the same value safely. Always use integer midpoint calculation carefully — this is a classic bug source.",
          codeExample: `// Unsafe: mid = (lo + hi) / 2  // overflow risk\n// Safe:   mid = lo + (hi - lo) / 2`,
        },
        {
          heading: "Binary Search Variants",
          content:
            "Lower bound (first position where target could be inserted), upper bound (last position), and binary search on rotated arrays are common interview variations. The same divide-and-conquer principle applies to finding square roots and more.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint bsearch(int arr[], int n, int target) {\n    int lo = 0, hi = n - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}\n\nint main(void) {\n    int arr[] = {2, 5, 8, 12, 19, 24, 31, 37};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    printf("Index of 19: %d\\n", bsearch(arr, n, 19));\n    printf("Index of 3: %d\\n", bsearch(arr, n, 3));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d23-q1", type: "quiz", title: "Binary Search Complexity",
        description: "Understanding time complexity",
        question: "What is the time complexity of binary search?",
        options: [
          { id: "a", text: "O(n)", correct: false },
          { id: "b", text: "O(log n)", correct: true },
          { id: "c", text: "O(n²)", correct: false },
          { id: "d", text: "O(1)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d23-q2", type: "quiz", title: "Array Requirement",
        description: "Prerequisite for binary search",
        question: "What must be true about the array for binary search to work?",
        options: [
          { id: "a", text: "It must have unique elements", correct: false },
          { id: "b", text: "It must be sorted", correct: true },
          { id: "c", text: "It must be at least 10 elements", correct: false },
          { id: "d", text: "It must be allocated with malloc", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d23-c1", type: "code", title: "Recursive Binary Search",
        description: "Implement binary search recursively",
        starterCode: `#include <stdio.h>\n\nint bsearch_rec(int arr[], int lo, int hi, int target) {\n    /* TODO: recursive binary search */\n}\n\nint main(void) {\n    int arr[] = {1, 3, 5, 7, 9, 11, 13};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    printf("7 at %d\\n", bsearch_rec(arr, 0, n-1, 7));\n    printf("4 at %d\\n", bsearch_rec(arr, 0, n-1, 4));\n    return 0;\n}`,
        expectedOutput: "7 at 3",
        hints: ["Base case: lo > hi", "Same mid formula", "Recurse on left or right half"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d23-a1", title: "First and Last Position",
      description: "Find the first and last occurrence of a target in a sorted array with duplicates",
      requirements: [
        "Implement find_first() — first index where target appears",
        "Implement find_last() — last index where target appears",
        "Return {-1, -1} if target not found",
        "Both must be O(log n)",
        "Test with array containing duplicates",
      ],
      starterCode: `#include <stdio.h>\n\nint find_first(int arr[], int n, int target) {\n    /* TODO: binary search for first occurrence */\n}\n\nint find_last(int arr[], int n, int target) {\n    /* TODO: binary search for last occurrence */\n}\n\nint main(void) {\n    int arr[] = {1, 2, 3, 3, 3, 3, 4, 5, 6};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    printf("First 3: %d\\n", find_first(arr, n, 3));\n    printf("Last 3: %d\\n", find_last(arr, n, 3));\n    printf("First 7: %d\\n", find_first(arr, n, 7));\n    return 0;\n}`,
      rubric: [
        { criterion: "find_first correct", points: 30 },
        { criterion: "find_last correct", points: 30 },
        { criterion: "Both O(log n)", points: 20 },
        { criterion: "Works with duplicates", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
