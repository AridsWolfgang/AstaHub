import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Function Pointers",
    subtitle: "Callbacks, dispatch tables, and higher-order patterns",
    tags: ["pointers", "functions", "callbacks"],
    theory: {
      sections: [
        {
          heading: "Function Pointer Syntax",
          content:
            "A function pointer stores the address of a function. The syntax is: returnType (*name)(paramTypes). The parentheses around *name are essential — without them it becomes a function returning a pointer.",
          codeExample: `int add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\n\nint (*op)(int, int) = add;\nprintf("3+4 = %d\\n", op(3, 4));\nop = sub;\nprintf("10-7 = %d\\n", op(10, 7));`,
        },
        {
          heading: "Callbacks",
          content:
            "Passing a function pointer to another function enables callbacks — the receiving function calls back through the pointer. This is how qsort() works: you provide a comparison function, and qsort calls it.",
          codeExample: `int cmp(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}\n\nint arr[] = {5, 2, 8, 1, 9};\nqsort(arr, 5, sizeof(int), cmp);`,
        },
        {
          heading: "Function Pointer Arrays",
          content:
            "Arrays of function pointers create dispatch tables — ideal for implementing state machines, command processors, and polymorphic behavior.",
          codeExample: `void run(void) { printf("run\\n"); }\nvoid jump(void) { printf("jump\\n"); }\nvoid stop(void) { printf("stop\\n"); }\n\nvoid (*actions[3])(void) = {run, jump, stop};\nactions[0]();  // run\nactions[1]();  // jump`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint mul(int a, int b) { return a * b; }\n\nint apply(int (*f)(int,int), int x, int y) {\n    return f(x, y);\n}\n\nint main(void) {\n    printf("add: %d\\n", apply(add, 5, 3));\n    printf("mul: %d\\n", apply(mul, 5, 3));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d15-q1", type: "quiz", title: "Pointer Syntax",
        description: "Function pointer declaration",
        question: "How do you declare a pointer to a function taking int and returning int?",
        options: [
          { id: "a", text: "int *f(int);", correct: false },
          { id: "b", text: "int (*f)(int);", correct: true },
          { id: "c", text: "int f*(int);", correct: false },
          { id: "d", text: "(*int f)(int);", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d15-q2", type: "quiz", title: "qsort Callback",
        description: "Understanding comparison callbacks",
        question: "What does the comparison function for qsort return?",
        options: [
          { id: "a", text: "void", correct: false },
          { id: "b", text: "Negative if a<b, zero if equal, positive if a>b", correct: true },
          { id: "c", text: "A boolean (0 or 1)", correct: false },
          { id: "d", text: "The sorted array", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d15-c1", type: "code", title: "Calculator with Function Pointers",
        description: "Implement a calculator using an array of function pointers",
        starterCode: `#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\nint divide(int a, int b) { return b ? a / b : 0; }\n\nint main(void) {\n    /* TODO: create array of function pointers, call each with 10, 5 */\n    return 0;\n}`,
        expectedOutput: "15",
        hints: ["int (*ops[4])(int,int) = {add, sub, mul, divide};"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d15-a1", title: "Generic Map Function",
      description: "Write a map() function that applies a callback to each element of an array",
      requirements: [
        "map() takes an int array, its size, and a function pointer",
        "The callback takes an int and returns an int",
        "Apply map to square, double, and negate functions",
        "Print original and transformed arrays",
      ],
      starterCode: `#include <stdio.h>\n\nint square(int x) { return x * x; }\nint doub(int x) { return x * 2; }\nint negate(int x) { return -x; }\n\nvoid map(int *arr, int n, int (*f)(int)) {\n    /* TODO: apply f to each element */\n}\n\nint main(void) {\n    int arr[] = {1, 2, 3, 4, 5};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    /* TODO: test map with different functions */\n    return 0;\n}`,
      rubric: [
        { criterion: "map() implemented correctly", points: 30 },
        { criterion: "Callback parameter used", points: 25 },
        { criterion: "Three callbacks tested", points: 25 },
        { criterion: "Output shown", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
