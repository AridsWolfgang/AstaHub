import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Command Line Arguments",
    subtitle: "argc, argv — reading program input from the terminal",
    tags: ["cli", "arguments", "argc-argv"],
    theory: {
      sections: [
        {
          heading: "The main Signature",
          content:
            "int main(int argc, char *argv[]) receives command-line arguments. argc is the argument count (including the program name). argv is an array of strings. argv[0] is the program name itself.",
          codeExample: `int main(int argc, char *argv[]) {\n    printf("Program: %s\\n", argv[0]);\n    for (int i = 1; i < argc; i++) {\n        printf("arg[%d]: %s\\n", i, argv[i]);\n    }\n    return 0;\n}`,
        },
        {
          heading: "Converting Arguments",
          content:
            "All argv entries are strings. Use atoi() or strtol() for integers, atof() or strtod() for floats. strtol() offers error checking with its end pointer — prefer it over atoi() for robust code.",
          codeExample: `if (argc > 1) {\n    char *end;\n    long val = strtol(argv[1], &end, 10);\n    if (*end != '\\0') {\n        printf("Not a number: %s\\n", argv[1]);\n        return 1;\n    }\n    printf("Value: %ld\\n", val);\n}`,
        },
        {
          heading: "Flag Parsing Patterns",
          content:
            "Simple parsers loop through argv and handle flags (like --verbose, -n). For complex CLIs, consider getopt() or getopt_long(). A common pattern: skip argv[0], then iterate remaining args.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char *argv[]) {\n    printf("argc = %d\\n", argc);\n    for (int i = 0; i < argc; i++) {\n        printf("argv[%d] = %s\\n", i, argv[i]);\n    }\n    if (argc > 1) {\n        int n = atoi(argv[1]);\n        printf("First arg as int: %d\\n", n);\n    }\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d18-q1", type: "quiz", title: "argc Meaning",
        description: "Understanding argument count",
        question: "What does argc include?",
        options: [
          { id: "a", text: "Only user-provided arguments", correct: false },
          { id: "b", text: "The program name + all arguments", correct: true },
          { id: "c", text: "Environment variable count", correct: false },
          { id: "d", text: "Number of files to process", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d18-q2", type: "quiz", title: "argv[0]",
        description: "Understanding the first argument",
        question: "What does argv[0] typically contain?",
        options: [
          { id: "a", text: "The first user argument", correct: false },
          { id: "b", text: "The program name or path", correct: true },
          { id: "c", text: "NULL", correct: false },
          { id: "d", text: "The working directory", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d18-c1", type: "code", title: "Adder",
        description: "Write a program that sums all numeric command-line arguments",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char *argv[]) {\n    /* TODO: sum all numeric args and print */\n    return 0;\n}`,
        expectedOutput: "Sum:",
        hints: ["Start from argv[1]", "Use atoi() or strtol()", "Accumulate in a variable"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d18-a1", title: "CLI Calculator",
      description: "Build a calculator that reads operator and operands from command line",
      requirements: [
        "Usage: ./calc <op> <a> <b> (e.g., ./calc add 5 3)",
        "Support: add, sub, mul, div",
        "Print error for invalid operations",
        "Print error for non-numeric operands",
        "Division by zero produces a clear message",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main(int argc, char *argv[]) {\n    if (argc != 4) {\n        printf("Usage: calc <op> <a> <b>\\n");\n        return 1;\n    }\n    /* TODO: parse and compute */\n    return 0;\n}`,
      rubric: [
        { criterion: "CLI parsing correct", points: 25 },
        { criterion: "All 4 operations work", points: 25 },
        { criterion: "Error handling (invalid op, non-numeric)", points: 25 },
        { criterion: "Division by zero handling", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
