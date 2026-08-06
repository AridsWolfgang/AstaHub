import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Control Flow: Conditionals",
    subtitle: "if, else, switch — branching logic that drives decisions",
    tags: ["control-flow", "branching", "logic"],
    theory: {
      sections: [
        {
          heading: "The if/else Statement",
          content:
            "The most fundamental branching construct. if evaluates a condition — if truthy, the first block executes; otherwise, else runs. C treats zero as false, any non-zero as true.",
          codeExample: `int x = 10;\nif (x > 0) {\n    printf("positive\\n");\n} else if (x < 0) {\n    printf("negative\\n");\n} else {\n    printf("zero\\n");\n}`,
        },
        {
          heading: "Switch Statements",
          content:
            "switch dispatches on an integer expression. Each case must end with break to avoid fallthrough (though fallthrough is sometimes intentional). The default case handles unmatched values.",
          codeExample: `int cmd = 2;\nswitch (cmd) {\ncase 1: printf("start\\n"); break;\ncase 2: printf("stop\\n"); break;\ndefault: printf("unknown\\n");\n}`,
        },
        {
          heading: "Ternary Operator",
          content:
            "The ternary operator ? : is a concise if/else that returns a value. Use it for simple conditional assignments, never for complex logic.",
          codeExample: `int max = (a > b) ? a : b;\nconst char *status = (code == 0) ? "OK" : "FAIL";`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int score = 85;\n    if (score >= 90) printf("A\\n");\n    else if (score >= 80) printf("B\\n");\n    else printf("C\\n");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d4-q1", type: "quiz", title: "Truthy Values",
        description: "Understanding boolean context",
        question: "In C, which of these values is treated as 'false' in a conditional?",
        options: [
          { id: "a", text: "1", correct: false },
          { id: "b", text: "0", correct: true },
          { id: "c", text: "-1", correct: false },
          { id: "d", text: "42", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d4-q2", type: "quiz", title: "Switch Fallthrough",
        description: "Understanding break in switch",
        question: "What happens if you omit 'break' at the end of a case in a switch statement?",
        options: [
          { id: "a", text: "The program crashes", correct: false },
          { id: "b", text: "Execution falls through to the next case", correct: true },
          { id: "c", text: "The case is skipped", correct: false },
          { id: "d", text: "The compiler throws an error", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d4-c1", type: "code", title: "Grade Classifier",
        description: "Write a program that classifies a numeric grade into letter grades",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    int grade = 78;\n    /* TODO: Print A (90+), B (80-89), C (70-79), D (60-69), F (<60) */\n    return 0;\n}`,
        expectedOutput: "C",
        hints: ["Use else if chains", "Start from the highest grade downward"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d4-a1", title: "Simple Calculator",
      description: "Build a calculator that reads an operator and two operands, then prints the result",
      requirements: [
        "Support +, -, *, / operators via switch",
        "Print 'Division by zero' when dividing by 0",
        "Print 'Invalid operator' for unknown ops",
        "Use integer arithmetic",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    char op = '+';\n    int a = 10, b = 3;\n    /* TODO: switch on op and print result */\n    return 0;\n}`,
      rubric: [
        { criterion: "Correct operator dispatch", points: 30 },
        { criterion: "Division by zero handling", points: 20 },
        { criterion: "All 4 operators work", points: 30 },
        { criterion: "Code clarity", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
