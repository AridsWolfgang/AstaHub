import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Functions",
    subtitle: "Declaration, definition, and scope — reusable logic",
    tags: ["functions", "scope", "modular"],
    theory: {
      sections: [
        {
          heading: "Function Anatomy",
          content:
            "A function has a return type, a name, parameters, and a body. Functions must be declared (prototype) before they're called, or defined before use. The return type void means no value is returned.",
          codeExample: `// Declaration (prototype)\nint square(int x);\n\n// Definition\nint square(int x) {\n    return x * x;\n}\n\nint main(void) {\n    printf("%d\\n", square(5));\n    return 0;\n}`,
        },
        {
          heading: "Parameter Passing",
          content:
            "C uses pass-by-value exclusively — the function receives a copy of each argument. To modify a variable in the caller, pass a pointer. Parameters are local to the function (automatic storage).",
          codeExample: `void swap(int *a, int *b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}`,
        },
        {
          heading: "Scope and Lifetime",
          content:
            "Variables declared inside a function are local — they don't exist outside it. static local variables retain their value between calls. Global variables (declared outside any function) exist for the program's lifetime.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\n\nint main(void) {\n    printf("3 + 4 = %d\\n", add(3, 4));\n    printf("10 - 7 = %d\\n", sub(10, 7));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d6-q1", type: "quiz", title: "Pass by Value",
        description: "Understanding how arguments are passed",
        question: "In C, how are function arguments passed by default?",
        options: [
          { id: "a", text: "By reference (pointer)", correct: false },
          { id: "b", text: "By value (copy)", correct: true },
          { id: "c", text: "By name (macro)", correct: false },
          { id: "d", text: "By address only", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d6-q2", type: "quiz", title: "Function Prototypes",
        description: "Understanding declarations",
        question: "Why do we use function prototypes in C?",
        options: [
          { id: "a", text: "To define the function body", correct: false },
          { id: "b", text: "To tell the compiler about a function before its use", correct: true },
          { id: "c", text: "To allocate memory for the function", correct: false },
          { id: "d", text: "To create a function alias", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d6-c1", type: "code", title: "Math Library",
        description: "Write functions for factorial, is_prime, and gcd, then test them",
        starterCode: `#include <stdio.h>\n\nint factorial(int n) {\n    /* TODO */\n}\nint is_prime(int n) {\n    /* TODO */\n}\nint gcd(int a, int b) {\n    /* TODO */\n}\n\nint main(void) {\n    printf("5! = %d\\n", factorial(5));\n    printf("7 is prime: %d\\n", is_prime(7));\n    printf("gcd(12,18) = %d\\n", gcd(12, 18));\n    return 0;\n}`,
        expectedOutput: "5! = 120",
        hints: ["factorial: loop or recursion", "is_prime: check divisors up to sqrt", "gcd: Euclidean algorithm"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d6-a1", title: "Temperature Converter",
      description: "Write functions to convert between Celsius, Fahrenheit, and Kelvin",
      requirements: [
        "Write c_to_f(), f_to_c(), c_to_k(), k_to_c()",
        "Each function takes a double and returns a double",
        "Print a conversion table from 0°C to 100°C in 10° steps",
        "Include all three scales in the table",
      ],
      starterCode: `#include <stdio.h>\n\ndouble c_to_f(double c) { return c * 9.0/5.0 + 32; }\ndouble f_to_c(double f) { return (f - 32) * 5.0/9.0; }\n\nint main(void) {\n    /* TODO: Print conversion table */\n    return 0;\n}`,
      rubric: [
        { criterion: "All 4 conversion functions", points: 30 },
        { criterion: "Conversion table printed", points: 30 },
        { criterion: "Correct formulas", points: 20 },
        { criterion: "Formatted output", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
