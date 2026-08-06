import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Generic Programming",
    subtitle: "void pointers, _Generic, and macro-based generics in C",
    tags: ["generic", "void*", "macros"],
    theory: {
      sections: [
        {
          heading: "void* — The Generic Pointer",
          content:
            "void* can point to any data type. Functions like qsort, memcpy, and malloc use void* to work with any type. The tradeoff: you lose type safety. The caller must ensure correct casting. memcpy(dest, src, n) copies n bytes regardless of type.",
          codeExample: `int cmp_int(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}\n\nint cmp_dbl(const void *a, const void *b) {\n    double da = *(double*)a, db = *(double*)b;\n    return (da > db) - (da < db);\n}\n\nint arr[] = {5, 2, 8, 1, 9};\nqsort(arr, 5, sizeof(int), cmp_int);`,
        },
        {
          heading: "_Generic (C11)",
          content:
            "_Generic provides compile-time type dispatch. It evaluates to a different expression based on the type of a controlling expression. Useful for type-generic macros that work like overloaded functions.",
          codeExample: `#define type_name(x) _Generic((x), \\\n    int: \"int\", \\\n    double: \"double\", \\\n    char*: \"string\", \\\n    default: \"unknown\")\n\nprintf("%s\\n\", type_name(42));     // int\nprintf("%s\\n\", type_name(3.14));   // double\nprintf("%s\\n\", type_name(\"hi\"));   // string`,
        },
        {
          heading: "Macro-Based Generics",
          content:
            "Before C11, macros were the only way to simulate generics. X-macros (listing items in a macro then expanding multiple times) enable type-generic code. Modern C prefers _Generic for type dispatch.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\n#define TYPE_NAME(x) _Generic((x), \\\n    int: \"int\", \\\n    long: \"long\", \\\n    float: \"float\", \\\n    double: \"double\", \\\n    char*: \"string\", \\\n    default: \"other\")\n\n#define MAX(a,b) ({ \\\n    __typeof__(a) _a = (a); \\\n    __typeof__(b) _b = (b); \\\n    _a > _b ? _a : _b; \\\n})\n\nint main(void) {\n    printf("42 is %s\\n\", TYPE_NAME(42));\n    printf("3.14 is %s\\n\", TYPE_NAME(3.14));\n    printf("MAX(10, 20) = %d\\n\", MAX(10, 20));\n    printf("MAX(3.14, 2.71) = %.2f\\n\", MAX(3.14, 2.71));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d44-q1", type: "quiz", title: "void* Safety",
        description: "Understanding void pointer tradeoffs",
        question: "What is the main drawback of using void* for generic functions?",
        options: [
          { id: "a", text: "It's slower than typed pointers", correct: false },
          { id: "b", text: "Loss of compile-time type checking", correct: true },
          { id: "c", text: "Cannot be dereferenced at all", correct: false },
          { id: "d", text: "Only works with integers", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d44-q2", type: "quiz", title: "_Generic Purpose",
        description: "Understanding C11 generics",
        question: "What does _Generic do in C11?",
        options: [
          { id: "a", text: "Creates a generic function", correct: false },
          { id: "b", text: "Selects an expression based on the type of its argument at compile time", correct: true },
          { id: "c", text: "Deduplicates code", correct: false },
          { id: "d", text: "Enables runtime type checking", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d44-c1", type: "code", title: "Generic Sum",
        description: "Write a macro that adds two values of any numeric type",
        starterCode: `#include <stdio.h>\n\n/* TODO: create a generic ADD macro */\n\nint main(void) {\n    printf("ADD(3, 4) = %d\\n\", ADD(3, 4));\n    printf("ADD(2.5, 3.5) = %.1f\\n\", ADD(2.5, 3.5));\n    return 0;\n}`,
        hints: ["Use __typeof__ or _Generic", "Statements in macro with ({ })"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d44-a1", title: "Generic Swap",
      description: "Implement a generic swap function using void* and a macro version",
      requirements: [
        "Implement swap(void *a, void *b, size_t size) using memcpy",
        "Implement SWAP(a, b) macro that works on any type",
        "Test swap on ints, doubles, and strings",
        "Show that the macro version is type-safe at compile time",
      ],
      starterCode: `#include <stdio.h>\n#include <string.h>\n\nvoid swap(void *a, void *b, size_t size) {\n    /* TODO: swap using a temporary buffer */\n}\n\n#define SWAP(a, b) { \\\n    /* TODO: implement as macro */ \\\n}\n\nint main(void) {\n    int x = 10, y = 20;\n    swap(&x, &y, sizeof(int));\n    printf("x=%d y=%d\\n\", x, y);\n\n    double a = 3.14, b = 2.71;\n    SWAP(a, b);\n    printf("a=%.2f b=%.2f\\n\", a, b);\n    return 0;\n}`,
      rubric: [
        { criterion: "swap() with memcpy works", points: 30 },
        { criterion: "SWAP macro works", points: 30 },
        { criterion: "Works for multiple types", points: 20 },
        { criterion: "Correct output", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
