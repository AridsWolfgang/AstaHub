import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "const & volatile",
    subtitle: "Type qualifiers for immutability and hardware access",
    tags: ["const", "volatile", "type-qualifiers"],
    theory: {
      sections: [
        {
          heading: "The const Qualifier",
          content:
            "const tells the compiler that a variable's value should not be modified. It enables compiler optimizations and catches accidental writes. const int *p means the pointed-to value is const; int *const p means the pointer itself is const.",
          codeExample: `const int MAX = 100;\n// MAX = 200;  // ERROR: can't modify const\n\nint x = 42;\nconst int *p = &x;  // pointer to const int\n// *p = 10;  // ERROR: can't write through p\nx = 10;             // OK: x itself is not const\n\nint *const cp = &x;  // const pointer\n// cp = &y;  // ERROR: can't change pointer\n*cp = 20;            // OK: can modify value`,
        },
        {
          heading: "const Correctness in Functions",
          content:
            "Function parameters should be const when the function doesn't modify them. This documents the contract and enables the compiler to catch bugs. Many standard library functions use const for input parameters.",
          codeExample: `void print_array(const int *arr, int n) {\n    for (int i = 0; i < n; i++)\n        printf("%d ", arr[i]);  // read-only\n}`,
        },
        {
          heading: "The volatile Qualifier",
          content:
            "volatile tells the compiler that a variable's value may change at any time without any action by the code (hardware register, signal handler, multi-threading). The compiler will not optimize away reads/writes to volatile variables.",
          codeExample: `volatile int *status_reg = (int*)0xFF00;\nwhile (*status_reg == 0) {\n    // wait for hardware — volatile prevents\n    // the compiler from caching the read\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    const double PI = 3.14159;\n    int x = 42;\n    const int *p = &x;\n    printf("PI = %f\\n", PI);\n    printf("*p = %d\\n", *p);\n    x = 100;  // OK\n    printf("*p = %d (x changed)\\n", *p);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d28-q1", type: "quiz", title: "const Pointer",
        description: "Understanding const int* vs int* const",
        question: "What does 'const int *p' mean?",
        options: [
          { id: "a", text: "The pointer cannot change", correct: false },
          { id: "b", text: "The value pointed to cannot change", correct: true },
          { id: "c", text: "Both pointer and value are const", correct: false },
          { id: "d", text: "Neither is const", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d28-q2", type: "quiz", title: "volatile Use",
        description: "Understanding volatile purpose",
        question: "When should you use the volatile qualifier?",
        options: [
          { id: "a", text: "For all global variables", correct: false },
          { id: "b", text: "For variables that can change outside program control (hardware, signals)", correct: true },
          { id: "c", text: "For constant values like PI", correct: false },
          { id: "d", text: "Never — it's obsolete", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d28-c1", type: "code", title: "Const Correctness",
        description: "Fix the code to use const correctly",
        starterCode: `#include <stdio.h>\n\n/* TODO: fix parameter to show it won't be modified */\nvoid print_msg(char *msg) {\n    printf("Message: %s\\n", msg);\n}\n\nint main(void) {\n    const char *greeting = "Hello, Systems!";\n    print_msg(greeting);  // should work without warning\n    return 0;\n}`,
        hints: ["Change 'char *msg' to 'const char *msg'"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d28-a1", title: "Const-Correct API",
      description: "Write a small API that uses const appropriately for input parameters",
      requirements: [
        "Write functions: sum_array, reverse_array, print_array",
        "print_array should take const int*",
        "sum_array should take const int*",
        "reverse_array should take int* (modifies)",
        "All functions should compile without warnings",
      ],
      starterCode: `#include <stdio.h>\n\n/* TODO: declare functions with correct const usage */\n\nint main(void) {\n    int arr[] = {10, 20, 30, 40, 50};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    /* TODO: test functions */\n    return 0;\n}`,
      rubric: [
        { criterion: "print_array uses const correctly", points: 25 },
        { criterion: "sum_array uses const correctly", points: 25 },
        { criterion: "reverse_array uses no const (int*)", points: 25 },
        { criterion: "Compiles without warnings", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
