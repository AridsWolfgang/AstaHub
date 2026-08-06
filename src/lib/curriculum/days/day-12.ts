import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Enums & Unions",
    subtitle: "Named constants and memory-sharing types",
    tags: ["enums", "unions", "types"],
    theory: {
      sections: [
        {
          heading: "Enumerations",
          content:
            "enum creates a set of named integer constants. By default, values start at 0 and increment. You can assign custom values. Enums make code more readable than raw numeric constants.",
          codeExample: `typedef enum { SUNDAY, MONDAY, TUESDAY } Day;\nDay today = MONDAY;\nif (today == SUNDAY) printf("rest\\n");\n\ntypedef enum { OK = 0, ERROR = -1, TIMEOUT = 1 } Status;`,
        },
        {
          heading: "Unions",
          content:
            "A union overlays all members at the same memory address — only one member can be used at a time. The size of the union is the size of its largest member. Useful for variant data and hardware register access.",
          codeExample: `typedef union {\n    int i;\n    float f;\n    char c[4];\n} Data;\nData d;\nd.i = 42;  // store as int\nprintf("%d\\n", d.i);\nd.f = 3.14;  // overwrites, now holds float`,
        },
        {
          heading: "Union Use Cases",
          content:
            "Unions are common in parsers, network protocols, and embedded systems where a memory location may hold different types at different times. Always track which member is active with a separate tag or enum.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\ntypedef enum { RED, GREEN, BLUE } Color;\n\ntypedef union {\n    int integer;\n    float decimal;\n    char text[8];\n} Value;\n\nint main(void) {\n    Color c = GREEN;\n    printf("Color: %d\\n", c);\n    Value v;\n    v.integer = 42;\n    printf("As int: %d\\n", v.integer);\n    v.decimal = 3.14f;\n    printf("As float: %.2f (int now corrupt: %d)\\n", v.decimal, v.integer);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d12-q1", type: "quiz", title: "Enum Values",
        description: "Understanding enum numbering",
        question: "In 'enum { A, B, C }', what value does B have?",
        options: [
          { id: "a", text: "0", correct: false },
          { id: "b", text: "1", correct: true },
          { id: "c", text: "2", correct: false },
          { id: "d", text: "Undefined", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d12-q2", type: "quiz", title: "Union Size",
        description: "Understanding union memory",
        question: "What determines the size of a union?",
        options: [
          { id: "a", text: "The sum of all member sizes", correct: false },
          { id: "b", text: "The size of the largest member", correct: true },
          { id: "c", text: "The size of the first member", correct: false },
          { id: "d", text: "It's always 4 bytes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d12-c1", type: "code", title: "Tagged Union",
        description: "Create a tagged union that stores either int, float, or string",
        starterCode: `#include <stdio.h>\n#include <string.h>\n\ntypedef enum { VAL_INT, VAL_FLOAT, VAL_STR } ValType;\n\ntypedef struct {\n    ValType type;\n    /* TODO: add union of int, float, char[32] */\n} TaggedValue;\n\nint main(void) {\n    /* TODO: create and print tagged values */\n    return 0;\n}`,
        hints: ["Use a union inside the struct", "Switch on type to print correctly"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d12-a1", title: "Shape Calculator",
      description: "Use an enum for shape types and union for dimensions to compute area",
      requirements: [
        "Define an enum ShapeType { CIRCLE, RECT, TRIANGLE }",
        "Define a Shape struct with type and union of dimensions",
        "Implement area() that switches on type",
        "Create and print areas of all three shapes",
      ],
      starterCode: `#include <stdio.h>\n#include <math.h>\n\ntypedef enum { CIRCLE, RECT, TRIANGLE } ShapeType;\n\ntypedef struct {\n    ShapeType type;\n    union {\n        float radius;       // CIRCLE\n        struct { float w, h; } rect;  // RECT\n        struct { float b, h; } tri;   // TRIANGLE\n    } dims;\n} Shape;\n\ndouble area(Shape s) {\n    /* TODO: compute area based on type */\n}\n\nint main(void) {\n    /* TODO: create shapes and print areas */\n    return 0;\n}`,
      rubric: [
        { criterion: "Enum defined correctly", points: 20 },
        { criterion: "Union in struct", points: 20 },
        { criterion: "area() switch implementation", points: 30 },
        { criterion: "All three shapes tested", points: 30 },
      ],
      xpReward: 100,
    },
};

export default lesson;
