import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Pointers Intro",
    subtitle: "Addresses, dereferencing, and the & operator",
    tags: ["pointers", "memory", "addresses"],
    theory: {
      sections: [
        {
          heading: "What Is a Pointer?",
          content:
            "A pointer is a variable that stores a memory address. Instead of holding a value directly, it 'points to' where the value lives. Every variable has an address you can get with the & operator.",
          codeExample: `int x = 42;\nint *p = &x;  // p holds the address of x\nprintf("x = %d\\n", x);\nprintf("addr of x = %p\\n", (void*)&x);\nprintf("p points to %p, value = %d\\n", p, *p);`,
        },
        {
          heading: "Dereferencing",
          content:
            "The * operator dereferences a pointer — it accesses the value at the stored address. You can read or write through a pointer. Always ensure a pointer is valid before dereferencing; NULL pointers cause crashes.",
          codeExample: `int x = 42;\nint *p = &x;\n*p = 100;  // changes x to 100\nprintf("%d\\n", x);  // 100\nint *bad = NULL;\n// *bad = 5;  // CRASH — null pointer dereference`,
        },
        {
          heading: "Pointers to Pointers",
          content:
            "A pointer can point to another pointer: int **pp = &p;. This is useful for multi-dimensional arrays, modifying pointer arguments in functions, and dynamic data structures.",
          codeExample: `int x = 42;\nint *p = &x;\nint **pp = &p;\nprintf("%d\\n", **pp);  // 42`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int x = 42;\n    int *p = &x;\n    printf("x = %d\\n", x);\n    printf("*p = %d\\n", *p);\n    printf("&x = %p\\n", (void*)&x);\n    printf("p = %p\\n", (void*)p);\n    *p = 100;\n    printf("x after *p = 100: %d\\n", x);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d9-q1", type: "quiz", title: "Address-of Operator",
        description: "Understanding &",
        question: "What does the & operator do in C?",
        options: [
          { id: "a", text: "Dereferences a pointer", correct: false },
          { id: "b", text: "Returns the memory address of a variable", correct: true },
          { id: "c", text: "Creates a reference", correct: false },
          { id: "d", text: "Allocates memory", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d9-q2", type: "quiz", title: "Null Pointer",
        description: "Understanding null safety",
        question: "What happens when you dereference a NULL pointer?",
        options: [
          { id: "a", text: "It returns 0", correct: false },
          { id: "b", text: "Undefined behavior — likely a crash", correct: true },
          { id: "c", text: "The pointer automatically allocates memory", correct: false },
          { id: "d", text: "Nothing, it's safe", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d9-c1", type: "code", title: "Swap via Pointers",
        description: "Implement a swap function that exchanges two integers using pointers",
        starterCode: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    /* TODO: swap the values */\n}\n\nint main(void) {\n    int x = 10, y = 20;\n    printf("Before: x=%d, y=%d\\n", x, y);\n    swap(&x, &y);\n    printf("After: x=%d, y=%d\\n", x, y);\n    return 0;\n}`,
        expectedOutput: "x=20",
        hints: ["Store one value in a temp variable", "Pass addresses with &"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d9-a1", title: "Pointer Playground",
      description: "Write a program that demonstrates multiple levels of pointers and their manipulation",
      requirements: [
        "Declare an int, a pointer to it, a pointer to that pointer",
        "Modify the original int through each level",
        "Print the value and address at each level",
        "Use at least 3 levels of indirection",
        "Show that all levels point to the same value",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    int value = 42;\n    /* TODO: create pointers and manipulate */\n    return 0;\n}`,
      rubric: [
        { criterion: "3+ levels of indirection", points: 30 },
        { criterion: "Correct dereferencing", points: 30 },
        { criterion: "Address output with %p", points: 20 },
        { criterion: "Code clarity", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
