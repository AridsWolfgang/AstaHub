import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Variables & Operators",
    subtitle: "Arithmetic, logical, bitwise — speaking the machine's language",
    tags: ["operators", "bitwise", "precedence"],
    theory: {
      sections: [
        {
          heading: "Variable Declaration",
          content:
            "Variables must be declared before use in C99. Always initialize variables — reading uninitialized memory is undefined behavior.",
          codeExample: `int count = 0;\nint max;\nmax = 100;`,
        },
        {
          heading: "Bitwise Operators",
          content:
            "These operate at the bit level — essential for systems programming. & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift).",
          codeExample: `unsigned char flags = 0b00001101;\nflags |= (1 << 2);\nflags &= ~(1 << 0);`,
        },
        {
          heading: "Operator Precedence",
          content:
            "Multiplication/division before addition/subtraction. Use parentheses liberally.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    unsigned int a = 0b1100;\n    unsigned int b = 0b1010;\n    printf("a & b = %04b\\n", a & b);\n    printf("a | b = %04b\\n", a | b);\n    printf("a ^ b = %04b\\n", a ^ b);\n    printf("~a = %04b\\n", ~a & 0xF);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d3-q1", type: "quiz", title: "Bitwise XOR",
        description: "XOR properties",
        question: "What is the result of 5 ^ 5?",
        options: [
          { id: "a", text: "5", correct: false },
          { id: "b", text: "10", correct: false },
          { id: "c", text: "0", correct: true },
          { id: "d", text: "1", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d3-q2", type: "quiz", title: "Left Shift",
        description: "Shift arithmetic",
        question: "What is 1 << 3 equal to?",
        options: [
          { id: "a", text: "3", correct: false },
          { id: "b", text: "4", correct: false },
          { id: "c", text: "8", correct: true },
          { id: "d", text: "16", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d3-c1", type: "code", title: "Flag Manipulation",
        description: "Set, clear, and toggle bits in a flag byte",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    unsigned char flags = 0;\n    /* TODO: Set bit 0, set bit 3, toggle bit 1 */\n    printf("flags = 0x%02X\\n", flags);\n    return 0;\n}`,
        expectedOutput: "0x",
        hints: ["Use |= with (1 << n) to set", "Use ^= with (1 << n) to toggle"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d3-a1", title: "Permission Matrix",
      description: "Implement a permission system using bitwise flags",
      requirements: [
        "Define flags: READ=1, WRITE=2, EXEC=4",
        "Create a variable with READ|WRITE permissions",
        "Check if EXEC permission is set",
        "Add EXEC permission and print final value in hex",
      ],
      starterCode: `#include <stdio.h>\n#define READ 1\n#define WRITE 2\n#define EXEC 4\n\nint main(void) {\n    /* Your permission logic here */\n    return 0;\n}`,
      rubric: [
        { criterion: "Correct flag definitions", points: 25 },
        { criterion: "Proper bitwise operations", points: 35 },
        { criterion: "Permission check logic", points: 25 },
        { criterion: "Hex output", points: 15 },
      ],
      xpReward: 100,
    },
};

export default lesson;
