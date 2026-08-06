import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Control Flow: Loops",
    subtitle: "for, while, do-while — making the computer repeat itself",
    tags: ["loops", "iteration", "control-flow"],
    theory: {
      sections: [
        {
          heading: "The for Loop",
          content:
            "The for loop bundles initialization, condition, and increment into one line: for (init; condition; increment). The init runs once, condition is checked each iteration, increment runs after each body.",
          codeExample: `for (int i = 0; i < 5; i++) {\n    printf("%d ", i);\n}\n// Output: 0 1 2 3 4`,
        },
        {
          heading: "The while Loop",
          content:
            "while checks the condition before each iteration. Use it when the number of iterations isn't known in advance — reading a file until EOF, for example.",
          codeExample: `int i = 0;\nwhile (i < 5) {\n    printf("%d ", i);\n    i++;\n}`,
        },
        {
          heading: "do-while and Loop Control",
          content:
            "do-while guarantees the body runs at least once. break exits the loop immediately; continue skips to the next iteration.",
          codeExample: `int i = 0;\ndo {\n    printf("%d ", i);\n    i++;\n} while (i < 5);`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    for (int i = 0; i < 5; i++)\n        printf("%d ", i);\n    printf("\\n");\n    int j = 0;\n    while (j < 5) { printf("%d ", j); j++; }\n    printf("\\n");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d5-q1", type: "quiz", title: "Loop Execution",
        description: "Understanding for loop mechanics",
        question: "How many times does the body of 'for (int i = 0; i < 3; i++)' execute?",
        options: [
          { id: "a", text: "2", correct: false },
          { id: "b", text: "3", correct: true },
          { id: "c", text: "4", correct: false },
          { id: "d", text: "Infinite", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d5-q2", type: "quiz", title: "Break Statement",
        description: "Understanding early loop termination",
        question: "What does 'break' do inside a loop?",
        options: [
          { id: "a", text: "Skips to the next iteration", correct: false },
          { id: "b", text: "Terminates the loop immediately", correct: true },
          { id: "c", text: "Restarts the loop", correct: false },
          { id: "d", text: "Exits the program", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d5-c1", type: "code", title: "FizzBuzz",
        description: "Print numbers 1-20, replacing multiples of 3 with Fizz, 5 with Buzz, both with FizzBuzz",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    /* TODO: FizzBuzz from 1 to 20 */\n    return 0;\n}`,
        expectedOutput: "Fizz",
        hints: ["Use modulo operator %", "Check 15 first (divisible by both)"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d5-a1", title: "Multiplication Table",
      description: "Print a 10x10 multiplication table with aligned columns",
      requirements: [
        "Print rows 1-10 and columns 1-10",
        "Right-align numbers for clean formatting",
        "Use nested for loops",
        "Add a header row",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    /* TODO: Print 10x10 multiplication table */\n    return 0;\n}`,
      rubric: [
        { criterion: "Nested loops used", points: 25 },
        { criterion: "All 100 values correct", points: 25 },
        { criterion: "Aligned output", points: 25 },
        { criterion: "Header row present", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
