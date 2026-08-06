import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Structs",
    subtitle: "Grouping related data into custom composite types",
    tags: ["structs", "composition", "typedef"],
    theory: {
      sections: [
        {
          heading: "Defining a Struct",
          content:
            "A struct groups variables of different types into a single unit. Define with the struct keyword followed by member declarations. Use typedef to create a shorthand alias.",
          codeExample: `struct Point { int x; int y; };\nstruct Point p1 = {10, 20};\np1.x = 30;\n\ntypedef struct { char name[32]; int age; } Person;\nPerson p2 = {"Alice", 25};`,
        },
        {
          heading: "Accessing Members",
          content:
            "Use dot (.) for direct access and arrow (->) when accessing through a pointer. Structs can be assigned, passed to functions, and returned — though passing a pointer is more efficient for large structs.",
          codeExample: `Person p = {"Bob", 30};\nPerson *pp = &p;\nprintf("Name: %s\\n", p.name);     // dot\nprintf("Age: %d\\n", pp->age);     // arrow\nprintf("Age: %d\\n", (*pp).age);   // equivalent`,
        },
        {
          heading: "Struct Memory Layout",
          content:
            "Members are laid out in declaration order, but padding may exist between members for alignment. The struct's size may be larger than the sum of its members. Use offsetof() to inspect member offsets.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\ntypedef struct { char name[32]; int id; float gpa; } Student;\n\nint main(void) {\n    Student s = {"Alice", 1001, 3.85f};\n    Student *sp = &s;\n    printf("Name: %s\\n", sp->name);\n    printf("ID: %d\\n", sp->id);\n    printf("GPA: %.2f\\n", sp->gpa);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d11-q1", type: "quiz", title: "Arrow Operator",
        description: "Understanding struct pointer access",
        question: "What does ptr->member mean in C?",
        options: [
          { id: "a", text: "(*ptr).member", correct: true },
          { id: "b", text: "*(ptr.member)", correct: false },
          { id: "c", text: "&ptr->member", correct: false },
          { id: "d", text: "ptr.member", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d11-q2", type: "quiz", title: "Struct Padding",
        description: "Understanding struct memory layout",
        question: "Which statement about struct memory layout is true?",
        options: [
          { id: "a", text: "Members always use exactly their type size", correct: false },
          { id: "b", text: "Padding may exist between members for alignment", correct: true },
          { id: "c", text: "Members are stored in reverse order", correct: false },
          { id: "d", text: "All structs are 8 bytes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d11-c1", type: "code", title: "Book Database",
        description: "Define a Book struct and print a formatted catalog entry",
        starterCode: `#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char title[64];\n    char author[32];\n    int year;\n    float price;\n} Book;\n\nint main(void) {\n    /* TODO: create a book and print its details */\n    return 0;\n}`,
        expectedOutput: "Title:",
        hints: ["Initialize with a compound literal", "Print with printf using all fields"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d11-a1", title: "Struct Catalog",
      description: "Create an array of structs and print a formatted catalog",
      requirements: [
        "Define a Product struct with name, price, quantity",
        "Create an array of at least 5 products",
        "Print a formatted table with headers",
        "Calculate and print total inventory value",
      ],
      starterCode: `#include <stdio.h>\n\ntypedef struct {\n    char name[32];\n    float price;\n    int quantity;\n} Product;\n\nint main(void) {\n    Product catalog[] = {\n        {"Widget", 9.99, 100},\n        {"Gadget", 24.95, 50},\n        /* TODO: add more */\n    };\n    /* TODO: print catalog table */\n    return 0;\n}`,
      rubric: [
        { criterion: "Struct defined correctly", points: 20 },
        { criterion: "Array of 5+ products", points: 25 },
        { criterion: "Formatted table output", points: 30 },
        { criterion: "Total value calculated", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
