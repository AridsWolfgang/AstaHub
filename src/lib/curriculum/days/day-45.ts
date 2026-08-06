import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "C Standard Library Deep Dive",
    subtitle: "stdlib, string, stdio — the tools that ship with every C compiler",
    tags: ["stdlib", "library", "qsort", "bsearch"],
    theory: {
      sections: [
        {
          heading: "qsort — Generic Sorting",
          content:
            "qsort sorts an array using a comparison function you provide. The function receives pointers to two elements and returns negative, zero, or positive. qsort uses quicksort internally (average O(n log n)).",
          codeExample: `int cmp(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}\n\nint arr[] = {5, 2, 8, 1, 9, 3};\nint n = sizeof(arr) / sizeof(arr[0]);\nqsort(arr, n, sizeof(int), cmp);\n// arr is now {1, 2, 3, 5, 8, 9}`,
        },
        {
          heading: "bsearch — Binary Search",
          content:
            "bsearch performs a binary search on a sorted array. Like qsort, it takes a comparison function and element size. Returns a pointer to the matching element or NULL. Requires the array to be sorted first (use qsort).",
          codeExample: `int key = 8;\nint *found = bsearch(&key, arr, n, sizeof(int), cmp);\nif (found) printf("Found: %d\\n\", *found);\nelse printf("Not found\\n\");`,
        },
        {
          heading: "Other Useful Functions",
          content:
            "atoi/atol/atoll — string to integer (no error checking). strtol/strtoul/strtod — robust string to number with error detection. rand/srand — pseudo-random numbers. system — run shell commands. exit/atexit — program termination and cleanup.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint cmp(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}\n\nint main(void) {\n    int arr[] = {42, 7, 19, 3, 88, 15, 64};\n    int n = sizeof(arr)/sizeof(arr[0]);\n\n    qsort(arr, n, sizeof(int), cmp);\n    printf("Sorted: \");\n    for (int i = 0; i < n; i++) printf("%d \", arr[i]);\n    printf("\\n\");\n\n    int key = 19;\n    int *r = bsearch(&key, arr, n, sizeof(int), cmp);\n    printf("Found %d: %s\\n\", key, r ? "YES" : "NO");\n\n    printf("RAND_MAX = %d\\n\", RAND_MAX);\n    printf("Random: %d\\n\", rand() % 100);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d45-q1", type: "quiz", title: "qsort Callback",
        description: "Understanding qsort's comparison function",
        question: "What should the qsort comparison function return if a > b?",
        options: [
          { id: "a", text: "1", correct: false },
          { id: "b", text: "A positive value", correct: true },
          { id: "c", text: "0", correct: false },
          { id: "d", text: "-1", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d45-q2", type: "quiz", title: "bsearch Requirement",
        description: "Understanding bsearch prerequisites",
        question: "What must be true about the array before calling bsearch?",
        options: [
          { id: "a", text: "It must be allocated with malloc", correct: false },
          { id: "b", text: "It must be sorted in ascending order", correct: true },
          { id: "c", text: "It must have unique elements", correct: false },
          { id: "d", text: "It must be global", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d45-c1", type: "code", title: "String QSort",
        description: "Sort an array of strings using qsort",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint cmp_string(const void *a, const void *b) {\n    /* TODO: compare two strings */\n}\n\nint main(void) {\n    const char *words[] = {"banana", "apple", "cherry", "date", "elderberry"};\n    int n = sizeof(words) / sizeof(words[0]);\n    qsort(words, n, sizeof(char*), cmp_string);\n    for (int i = 0; i < n; i++)\n        printf("%s\\n\", words[i]);\n    return 0;\n}`,
        expectedOutput: "apple",
        hints: ["Parameters are const char**", "Use strcmp to compare strings"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d45-a1", title: "Student Database",
      description: "Use qsort and bsearch to manage a student record database",
      requirements: [
        "Define a Student struct with name, id, gpa",
        "Create an array of at least 7 students",
        "Sort by name using qsort",
        "Sort by GPA descending using qsort",
        "Use bsearch to find a student by ID",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct { char name[32]; int id; float gpa; } Student;\n\nint cmp_name(const void *a, const void *b) {\n    return strcmp(((Student*)a)->name, ((Student*)b)->name);\n}\n\nint cmp_gpa(const void *a, const void *b) {\n    float ga = ((Student*)a)->gpa, gb = ((Student*)b)->gpa;\n    if (ga < gb) return 1;\n    if (ga > gb) return -1;\n    return 0;\n}\n\nint cmp_id(const void *a, const void *b) {\n    return ((Student*)a)->id - ((Student*)b)->id;\n}\n\nvoid print(Student s[], int n) {\n    for (int i = 0; i < n; i++)\n        printf("%-10s %3d %.2f\\n\", s[i].name, s[i].id, s[i].gpa);\n}\n\nint main(void) {\n    Student students[] = {\n        {"Alice\", 1001, 3.8},\n        {"Bob\", 1002, 3.2},\n        // TODO: add more\n    };\n    int n = sizeof(students)/sizeof(students[0]);\n    /* TODO: sort and search */\n    return 0;\n}`,
      rubric: [
        { criterion: "7+ students defined", points: 20 },
        { criterion: "Sort by name works", points: 20 },
        { criterion: "Sort by GPA works", points: 20 },
        { criterion: "bsearch by ID works", points: 20 },
        { criterion: "Output formatting", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
