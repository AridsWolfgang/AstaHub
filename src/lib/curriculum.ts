import type { Lesson } from "./types";
import { getLevelForDay } from "./types";

/* ─── Detailed lessons for Days 1–100 ─── */
const DETAILED_LESSONS: Record<number, Partial<Lesson>> = {
  1: {
    title: "The Machine Awakens",
    subtitle: "Your first C program and the compilation pipeline",
    tags: ["hello-world", "gcc", "compilation"],
    theory: {
      sections: [
        {
          heading: "Why C Still Matters",
          content:
            "C sits one abstraction layer above Assembly. Every operating system kernel, embedded firmware stack, and high-performance runtime is built on C's shoulders.",
        },
        {
          heading: "The Compilation Pipeline",
          content:
            "Source code (.c) → Preprocessor → Compiler → Assembler → Linker → Executable.",
          codeExample: `# Preprocessing: handles #include, #define\n# Compilation: C → Assembly\n# Assembly: mnemonics → machine code\n# Linking: combines object files + libraries`,
        },
        {
          heading: "Anatomy of a C Program",
          content:
            "Every C program needs a main() entry point returning int.",
          codeExample: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, silicon!\\n");\n    return 0;\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d1-q1", type: "quiz", title: "Entry Point",
        description: "Test your knowledge of program structure",
        question: "What is the required entry point function in every C program?",
        options: [
          { id: "a", text: "start()", correct: false },
          { id: "b", text: "main()", correct: true },
          { id: "c", text: "init()", correct: false },
          { id: "d", text: "run()", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d1-q2", type: "quiz", title: "Return Value",
        description: "Understanding exit codes",
        question: "What does return 0 from main() signify to the operating system?",
        options: [
          { id: "a", text: "Program crashed", correct: false },
          { id: "b", text: "Successful execution", correct: true },
          { id: "c", text: "Memory leak detected", correct: false },
          { id: "d", text: "Infinite loop", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d1-c1", type: "code", title: "Print Your Handle",
        description: "Modify the program to print your chosen hacker handle",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    /* TODO: Print "Agent: [YOUR_HANDLE]" */\n    return 0;\n}`,
        expectedOutput: "Agent:",
        hints: ["Use printf() with a format string", "Don't forget \\n for newline"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d1-a1", title: "Boot Sequence",
      description: "Write a program that prints a boot sequence banner",
      requirements: [
        "Print at least 3 lines of ASCII art or text",
        "Include your handle on the last line",
        "Use only printf() — no loops yet",
        "Return 0 on success",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    /* Your boot sequence here */\n    return 0;\n}`,
      rubric: [
        { criterion: "Compiles without errors", points: 25 },
        { criterion: "Prints multi-line output", points: 25 },
        { criterion: "Includes personal handle", points: 25 },
        { criterion: "Clean formatting", points: 25 },
      ],
      xpReward: 100,
    },
  },

  2: {
    title: "Data Types & Memory Layout",
    subtitle: "integers, floats, chars, and how the machine stores them",
    tags: ["types", "memory", "sizeof"],
    theory: {
      sections: [
        {
          heading: "Fundamental Types",
          content:
            "C gives you direct control over memory size. int (4 bytes), char (1 byte), float (4 bytes), double (8 bytes). Use sizeof() to inspect actual sizes.",
          codeExample: `int age = 25;\nchar grade = 'A';\nfloat pi = 3.14f;\ndouble e = 2.718281828;`,
        },
        {
          heading: "Signed vs Unsigned",
          content:
            "Signed types use two's complement. unsigned doubles the positive range. A signed char goes from -128 to 127; unsigned char from 0 to 255.",
        },
        {
          heading: "Type Modifiers",
          content:
            "short, long, long long modify integer sizes. const prevents modification. volatile flags values that may change unexpectedly (hardware registers).",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int n = 42;\n    char c = 'Z';\n    float f = 3.14f;\n    printf("int: %d (%zu bytes)\\n", n, sizeof(n));\n    printf("char: %c (%zu bytes)\\n", c, sizeof(c));\n    printf("float: %.2f (%zu bytes)\\n", f, sizeof(f));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d2-q1", type: "quiz", title: "sizeof",
        description: "Memory inspection",
        question: "What does the sizeof operator return?",
        options: [
          { id: "a", text: "The value stored in a variable", correct: false },
          { id: "b", text: "The size in bytes of a type or variable", correct: true },
          { id: "c", text: "The memory address", correct: false },
          { id: "d", text: "The number of bits", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d2-q2", type: "quiz", title: "Char Size",
        description: "Character storage",
        question: "How many bytes does a char typically occupy?",
        options: [
          { id: "a", text: "1 byte", correct: true },
          { id: "b", text: "2 bytes", correct: false },
          { id: "c", text: "4 bytes", correct: false },
          { id: "d", text: "8 bytes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d2-c1", type: "code", title: "Memory Report",
        description: "Print sizes of all fundamental types",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    /* TODO: Print sizeof for int, char, float, double, long */\n    return 0;\n}`,
        expectedOutput: "bytes",
        hints: ["Use printf with %zu for sizeof results", "sizeof returns size_t"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d2-a1", title: "Type Manifest",
      description: "Create a formatted table of all C fundamental types and their sizes",
      requirements: [
        "Print a header row: Type | Size (bytes)",
        "Include at least 6 different types",
        "Use sizeof for each",
        "Align output cleanly",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    printf("=== TYPE MANIFEST ===\\n");\n    /* Your table here */\n    return 0;\n}`,
      rubric: [
        { criterion: "Correct sizeof usage", points: 30 },
        { criterion: "At least 6 types listed", points: 30 },
        { criterion: "Formatted output", points: 20 },
        { criterion: "Compiles cleanly", points: 20 },
      ],
      xpReward: 100,
    },
  },

  3: {
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
  },

  4: {
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
  },

  5: {
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
  },

  6: {
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
  },

  7: {
    title: "Arrays",
    subtitle: "Contiguous memory blocks — storing sequences of data",
    tags: ["arrays", "memory", "indexing"],
    theory: {
      sections: [
        {
          heading: "Array Declaration and Initialization",
          content:
            "An array is a contiguous block of elements of the same type. Declared as type name[size];. Indexing starts at 0. Arrays can be initialized with a brace-enclosed list.",
          codeExample: `int arr[5] = {10, 20, 30, 40, 50};\nint matrix[2][3] = {{1,2,3}, {4,5,6}};\nchar name[] = "Asta";  // size inferred`,
        },
        {
          heading: "Array Indexing and Bounds",
          content:
            "Access elements with arr[index]. C does NOT perform bounds checking — accessing arr[5] on a 5-element array reads/writes memory beyond the array, causing undefined behavior. This is the source of countless bugs and security vulnerabilities.",
          codeExample: `int arr[3] = {1, 2, 3};\narr[0] = 10;     // OK\narr[3] = 42;     // BUG! out-of-bounds write`,
        },
        {
          heading: "Arrays and Loops",
          content:
            "Arrays and loops are natural partners. Use a loop index to iterate through all elements. The sizeof idiom gives the element count: sizeof(arr) / sizeof(arr[0]).",
          codeExample: `int arr[] = {5, 3, 8, 1, 9};\nint n = sizeof(arr) / sizeof(arr[0]);\nfor (int i = 0; i < n; i++) {\n    printf("%d ", arr[i]);\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int arr[5] = {1, 2, 3, 4, 5};\n    for (int i = 0; i < 5; i++)\n        printf("arr[%d] = %d\\n", i, arr[i]);\n    printf("Size: %zu elements\\n", sizeof(arr) / sizeof(arr[0]));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d7-q1", type: "quiz", title: "Zero-Based Indexing",
        description: "Understanding array indexing",
        question: "What is the index of the first element in a C array?",
        options: [
          { id: "a", text: "1", correct: false },
          { id: "b", text: "0", correct: true },
          { id: "c", text: "-1", correct: false },
          { id: "d", text: "It depends on the compiler", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d7-q2", type: "quiz", title: "Out of Bounds",
        description: "Understanding array safety",
        question: "What happens if you access arr[5] when 'int arr[5]' was declared?",
        options: [
          { id: "a", text: "The compiler catches it", correct: false },
          { id: "b", text: "It returns 0", correct: false },
          { id: "c", text: "Undefined behavior — may crash or corrupt data", correct: true },
          { id: "d", text: "The array automatically resizes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d7-c1", type: "code", title: "Array Sum and Average",
        description: "Compute the sum and average of elements in an array",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    int arr[] = {12, 45, 7, 23, 56, 89, 34};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    /* TODO: compute sum and average */\n    return 0;\n}`,
        expectedOutput: "Sum:",
        hints: ["Initialize sum = 0", "Loop through all elements", "Use double for average"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d7-a1", title: "Array Statistics",
      description: "Write a program that computes min, max, sum, and average of an array",
      requirements: [
        "Define an array of at least 10 integers",
        "Find the minimum and maximum values",
        "Compute the sum and average (as double)",
        "Print all four statistics",
        "Do not hardcode array values in the logic",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    int data[] = {45, 23, 78, 12, 90, 34, 56, 67, 89, 10};\n    int n = sizeof(data) / sizeof(data[0]);\n    /* TODO: compute and print statistics */\n    return 0;\n}`,
      rubric: [
        { criterion: "Min/max correct", points: 25 },
        { criterion: "Sum and average correct", points: 25 },
        { criterion: "Uses loop over array", points: 25 },
        { criterion: "Readable output", points: 25 },
      ],
      xpReward: 100,
    },
  },

  8: {
    title: "Strings",
    subtitle: "char arrays, null terminators, and the string.h library",
    tags: ["strings", "char", "string.h"],
    theory: {
      sections: [
        {
          heading: "Strings as char Arrays",
          content:
            "C strings are arrays of char terminated by a null character '\\0'. The null terminator marks the end — every string function relies on it. String literals like \"hello\" include the null automatically.",
          codeExample: `char str1[] = "hello"; // {'h','e','l','l','o','\\0'}\nchar str2[6] = {'w','o','r','l','d','\\0'};\nprintf("%s %s\\n", str1, str2);`,
        },
        {
          heading: "String Functions from string.h",
          content:
            "strlen(s) returns length (excluding null). strcpy(dst, src) copies. strcat(dst, src) appends. strcmp(a, b) compares lexicographically (0 if equal). Always ensure destination buffers are large enough!",
          codeExample: `#include <string.h>\nchar src[] = "systems";\nchar dst[20];\nstrcpy(dst, src);\nint len = strlen(dst);\nif (strcmp(dst, "systems") == 0) {\n    printf("match!\\n");\n}`,
        },
        {
          heading: "Buffer Overflow Dangers",
          content:
            "strcpy and strcat don't check buffer sizes. If the source exceeds the destination, you get a buffer overflow — classic security vulnerability. Always use strncpy, strncat, or snprintf for bounded operations.",
          codeExample: `char buf[5];\nstrcpy(buf, "too long!"); // OVERFLOW!\n// Safe alternative:\nstrncpy(buf, "too long!", sizeof(buf) - 1);\nbuf[sizeof(buf) - 1] = '\\0';`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char msg[] = "systems programming";\n    printf("String: %s\\n", msg);\n    printf("Length: %zu\\n", strlen(msg));\n    char copy[32];\n    strcpy(copy, msg);\n    printf("Copy: %s\\n", copy);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d8-q1", type: "quiz", title: "Null Terminator",
        description: "Understanding string termination",
        question: "What character terminates every C string?",
        options: [
          { id: "a", text: "'\\n'", correct: false },
          { id: "b", text: "'\\0'", correct: true },
          { id: "c", text: "' ' (space)", correct: false },
          { id: "d", text: "EOF", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d8-q2", type: "quiz", title: "strlen Behavior",
        description: "Understanding string length",
        question: "What does strlen() return for the string \"C\\0ASM\"?",
        options: [
          { id: "a", text: "7", correct: false },
          { id: "b", text: "1", correct: true },
          { id: "c", text: "3", correct: false },
          { id: "d", text: "Undefined behavior", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d8-c1", type: "code", title: "String Reverser",
        description: "Write a function that reverses a string in-place",
        starterCode: `#include <stdio.h>\n#include <string.h>\n\nvoid reverse(char *s) {\n    /* TODO: reverse string in-place */\n}\n\nint main(void) {\n    char text[] = "abcdef";\n    reverse(text);\n    printf("%s\\n", text);\n    return 0;\n}`,
        expectedOutput: "fedcba",
        hints: ["Use two pointers: start and end", "Swap characters and move inward", "Stop when pointers meet"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d8-a1", title: "String Utility Library",
      description: "Implement your own versions of strlen, strcpy, strcmp, and strcat",
      requirements: [
        "Implement my_strlen, my_strcpy, my_strcmp, my_strcat",
        "All functions must work with standard C strings",
        "my_strcat must ensure proper null termination",
        "Test with at least 3 different string inputs",
      ],
      starterCode: `#include <stdio.h>\n\nint my_strlen(const char *s) {\n    /* TODO */\n}\nvoid my_strcpy(char *dst, const char *src) {\n    /* TODO */\n}\nint my_strcmp(const char *a, const char *b) {\n    /* TODO */\n}\nvoid my_strcat(char *dst, const char *src) {\n    /* TODO */\n}\n\nint main(void) {\n    /* Test your implementations */\n    return 0;\n}`,
      rubric: [
        { criterion: "my_strlen correct", points: 25 },
        { criterion: "my_strcpy correct", points: 25 },
        { criterion: "my_strcmp correct", points: 25 },
        { criterion: "my_strcat correct", points: 25 },
      ],
      xpReward: 100,
    },
  },

  9: {
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
  },

  10: {
    title: "Pointer Arithmetic",
    subtitle: "Navigating memory with pointer math and array equivalence",
    tags: ["pointers", "arithmetic", "arrays"],
    theory: {
      sections: [
        {
          heading: "Pointer Math Basics",
          content:
            "Adding N to a pointer moves it N * sizeof(element) bytes forward, not N bytes. This is why p++ on an int pointer (4 bytes) advances the address by 4. Pointer arithmetic is scaled by the pointed-to type's size.",
          codeExample: `int arr[] = {10, 20, 30, 40};\nint *p = arr;\nprintf("%d ", *p);      // 10\np++;                     // moves by 4 bytes\nprintf("%d\\n", *p);      // 20`,
        },
        {
          heading: "Array-Pointer Equivalence",
          content:
            "An array name decays to a pointer to its first element: arr is equivalent to &arr[0]. This means arr[i] is exactly the same as *(arr + i). The subscript operator [] is syntactic sugar over pointer arithmetic.",
          codeExample: `int arr[] = {5, 10, 15};\nprintf("%d == %d\\n", arr[1], *(arr + 1));  // 10 == 10\nprintf("%d == %d\\n", 1[arr], *(1 + arr));  // 10 == 10 (yes, 1[arr] works!)`,
        },
        {
          heading: "Pointer Differences and void*",
          content:
            "Subtracting two pointers of the same type gives the number of elements between them. void* is a generic pointer that cannot be dereferenced or arithmetically manipulated directly — cast it first.",
          codeExample: `int arr[] = {2, 4, 6, 8, 10};\nint *start = arr;\nint *end = &arr[4];\nint count = end - start;  // 4 elements apart`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int arr[] = {10, 20, 30};\n    int *p = arr;\n    for (int i = 0; i < 3; i++) {\n        printf("arr[%d] = %d  *(p+%d) = %d\\n", i, arr[i], i, *(p+i));\n    }\n    printf("Proof: arr == &arr[0]? %d\\n", arr == &arr[0]);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d10-q1", type: "quiz", title: "Pointer Increment",
        description: "Understanding scaled arithmetic",
        question: "If int *p points to arr[0], and sizeof(int) is 4, what is the byte address change after p++?",
        options: [
          { id: "a", text: "1 byte", correct: false },
          { id: "b", text: "4 bytes", correct: true },
          { id: "c", text: "Depends on the value", correct: false },
          { id: "d", text: "8 bytes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d10-q2", type: "quiz", title: "Array Decay",
        description: "Understanding array-to-pointer decay",
        question: "What does 'arr' represent when passed to a function?",
        options: [
          { id: "a", text: "The entire array copy", correct: false },
          { id: "b", text: "A pointer to the first element", correct: true },
          { id: "c", text: "The size of the array", correct: false },
          { id: "d", text: "The last element", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d10-c1", type: "code", title: "Pointer Sum",
        description: "Sum array elements using pointer arithmetic instead of indexing",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    int arr[] = {2, 4, 6, 8, 10};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int sum = 0;\n    /* TODO: sum using pointer arithmetic, no [] */\n    printf("Sum = %d\\n", sum);\n    return 0;\n}`,
        expectedOutput: "Sum = 30",
        hints: ["Use int *p = arr;", "While loop with p < arr + n", "Add *p then p++"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d10-a1", title: "Array Reversal with Pointers",
      description: "Reverse an array in-place using only pointer arithmetic (no bracket indexing)",
      requirements: [
        "Use two pointers: one at start, one at end",
        "Swap elements via dereference",
        "Advance start pointer, decrement end pointer",
        "Stop when pointers meet or cross",
        "Print array before and after reversal",
      ],
      starterCode: `#include <stdio.h>\n\nvoid reverse(int *arr, int n) {\n    /* TODO: reverse using pointer arithmetic */\n}\n\nint main(void) {\n    int arr[] = {1, 2, 3, 4, 5, 6, 7};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    reverse(arr, n);\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    return 0;\n}`,
      rubric: [
        { criterion: "Uses pointer arithmetic only", points: 35 },
        { criterion: "Reversal correct", points: 35 },
        { criterion: "Prints before and after", points: 15 },
        { criterion: "Handles even and odd length", points: 15 },
      ],
      xpReward: 100,
    },
  },

  11: {
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
  },

  12: {
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
  },

  13: {
    title: "Dynamic Memory: malloc",
    subtitle: "Heap allocation — requesting memory at runtime",
    tags: ["memory", "malloc", "heap"],
    theory: {
      sections: [
        {
          heading: "Stack vs Heap",
          content:
            "Local variables live on the stack — automatic allocation and deallocation. The heap is for data that must outlive the function or whose size is unknown at compile time. malloc() requests heap memory; free() returns it.",
          codeExample: `// Stack (automatic)\nint local = 5;\n\n// Heap (manual)\nint *arr = malloc(10 * sizeof(int));\nif (arr == NULL) {\n    fprintf(stderr, "malloc failed\\n");\n    return 1;\n}\n// use arr...\nfree(arr);`,
        },
        {
          heading: "malloc Pitfalls",
          content:
            "Always check malloc's return value — NULL means allocation failed. Every malloc must be matched with a free. Forgetting to free causes memory leaks; freeing twice causes undefined behavior. Use valgrind to detect leaks.",
          codeExample: `int *p = malloc(sizeof(int));\nif (!p) { /* handle error */ }\n*p = 42;\nfree(p);\np = NULL;  // prevent dangling pointer`,
        },
        {
          heading: "Allocating for Arrays and Structs",
          content:
            "Use malloc(n * sizeof(Type)) for arrays. For structs, allocate sizeof(StructType). The allocated memory is uninitialized — read it only after writing.",
          codeExample: `int *arr = malloc(100 * sizeof(int));\narr[0] = 42;\n\ntypedef struct { int x, y; } Point;\nPoint *p = malloc(sizeof(Point));\np->x = 10; p->y = 20;`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n = 5;\n    int *arr = malloc(n * sizeof(int));\n    if (!arr) { printf("malloc failed\\n"); return 1; }\n    for (int i = 0; i < n; i++) arr[i] = i * 10;\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    free(arr);\n    printf("Memory freed successfully\\n");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d13-q1", type: "quiz", title: "malloc Return",
        description: "Understanding allocation failure",
        question: "What does malloc return if memory allocation fails?",
        options: [
          { id: "a", text: "0", correct: false },
          { id: "b", text: "NULL", correct: true },
          { id: "c", text: "A valid pointer to zeroed memory", correct: false },
          { id: "d", text: "It crashes the program", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d13-q2", type: "quiz", title: "Memory Leak",
        description: "Understanding leak consequences",
        question: "What is a memory leak?",
        options: [
          { id: "a", text: "Freeing memory twice", correct: false },
          { id: "b", text: "Allocating memory and losing the pointer without freeing", correct: true },
          { id: "c", text: "Accessing freed memory", correct: false },
          { id: "d", text: "Using NULL pointer", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d13-c1", type: "code", title: "Dynamic Array",
        description: "Read a number N, allocate an array of N ints, fill with squares, print",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n = 10;\n    /* TODO: allocate array, fill with i*i, print */\n    return 0;\n}`,
        expectedOutput: "0 1 4 9 16",
        hints: ["malloc(n * sizeof(int))", "Check for NULL after malloc", "free at the end"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d13-a1", title: "Dynamic Stats",
      description: "Allocate an array dynamically, fill it with user-provided values, compute stats",
      requirements: [
        "Prompt for array size and allocate dynamically",
        "Fill array with sequential values (1 to N)",
        "Compute sum, average, min, max",
        "Print all stats and free memory",
        "Handle malloc failure gracefully",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n = 20;\n    int *data = malloc(n * sizeof(int));\n    if (!data) { printf("Allocation failed\\n"); return 1; }\n    /* TODO: fill with 1..n, compute stats */\n    free(data);\n    return 0;\n}`,
      rubric: [
        { criterion: "Dynamic allocation", points: 25 },
        { criterion: "Stats correct", points: 30 },
        { criterion: "free() called", points: 15 },
        { criterion: "Error handling", points: 30 },
      ],
      xpReward: 100,
    },
  },

  14: {
    title: "Dynamic Memory: realloc & calloc",
    subtitle: "Resizing and zero-initialized allocation",
    tags: ["memory", "realloc", "calloc"],
    theory: {
      sections: [
        {
          heading: "calloc — Zero-Initialized Allocation",
          content:
            "calloc(n, size) allocates n * size bytes and sets every byte to 0. Unlike malloc, which leaves memory uninitialized (potentially containing garbage), calloc gives you a clean slate. Slightly slower but safer for many use cases.",
          codeExample: `// Allocate array of 10 ints, all zero\nint *arr = calloc(10, sizeof(int));\nif (!arr) { /* handle error */ }\n// All elements are guaranteed to be 0`,
        },
        {
          heading: "realloc — Resizing",
          content:
            "realloc(ptr, newSize) resizes a previously allocated block. It may move the block to a new location, copying existing data. The returned pointer may differ from the input. If realloc fails, it returns NULL and the original block is still valid.",
          codeExample: `int *arr = malloc(5 * sizeof(int));\n// ... use arr ...\nint *tmp = realloc(arr, 10 * sizeof(int));\nif (!tmp) {\n    // realloc failed, arr is still valid\n    free(arr);\n    return 1;\n}\narr = tmp;  // safe to reassign`,
        },
        {
          heading: "Best Practices",
          content:
            "Never do ptr = realloc(ptr, newSize) directly — if realloc fails, you lose the original pointer. Always use a temporary pointer. Use calloc when you need zeroed memory, malloc when you'll initialize immediately.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = calloc(3, sizeof(int));\n    if (!arr) return 1;\n    arr[0] = 10; arr[1] = 20; arr[2] = 30;\n    int *tmp = realloc(arr, 5 * sizeof(int));\n    if (!tmp) { free(arr); return 1; }\n    arr = tmp;\n    arr[3] = 40; arr[4] = 50;\n    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);\n    free(arr);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d14-q1", type: "quiz", title: "calloc vs malloc",
        description: "Understanding allocation differences",
        question: "What is the key difference between calloc and malloc?",
        options: [
          { id: "a", text: "calloc is faster than malloc", correct: false },
          { id: "b", text: "calloc zero-initializes memory, malloc does not", correct: true },
          { id: "c", text: "calloc only works for arrays", correct: false },
          { id: "d", text: "There is no difference", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d14-q2", type: "quiz", title: "realloc Safety",
        description: "Safe realloc usage",
        question: "Why should you NOT do 'ptr = realloc(ptr, newSize)' directly?",
        options: [
          { id: "a", text: "It causes undefined behavior", correct: false },
          { id: "b", text: "If realloc fails, you lose the original pointer", correct: true },
          { id: "c", text: "The compiler will warn you", correct: false },
          { id: "d", text: "It's actually safe to do", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d14-c1", type: "code", title: "Dynamic Grow",
        description: "Start with a small array, grow it with realloc as you add elements",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int capacity = 2;\n    int *arr = malloc(capacity * sizeof(int));\n    if (!arr) return 1;\n    int count = 0;\n    /* TODO: add values 10,20,30,40,50, growing array as needed */\n    free(arr);\n    return 0;\n}`,
        expectedOutput: "10 20 30 40 50",
        hints: ["When count >= capacity, double capacity with realloc", "Use a temporary pointer for realloc"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d14-a1", title: "Dynamic String Builder",
      description: "Build a string by repeatedly doubling the buffer and appending characters",
      requirements: [
        "Start with a small buffer (4 bytes)",
        "Append characters 'A' through 'Z'",
        "Double the buffer with realloc when full",
        "Null-terminate the final string",
        "Print the result and total capacity",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int cap = 4;\n    char *buf = malloc(cap);\n    if (!buf) return 1;\n    int len = 0;\n    /* TODO: append 'A'..'Z', growing as needed */\n    buf[len] = '\\0';\n    printf("%s\\n", buf);\n    printf("Final capacity: %d\\n", cap);\n    free(buf);\n    return 0;\n}`,
      rubric: [
        { criterion: "Dynamic growth with realloc", points: 30 },
        { criterion: "All 26 letters appended", points: 20 },
        { criterion: "Safe realloc pattern", points: 25 },
        { criterion: "Null-terminated result", points: 25 },
      ],
      xpReward: 100,
    },
  },

  15: {
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
  },

  16: {
    title: "Preprocessor",
    subtitle: "#define, macros, and conditional compilation",
    tags: ["preprocessor", "macros", "compilation"],
    theory: {
      sections: [
        {
          heading: "The Preprocessor Pipeline",
          content:
            "The preprocessor runs before the compiler. It handles #include (file insertion), #define (macro substitution), #if/#ifdef (conditional compilation), and more. All preprocessor directives start with #.",
          codeExample: `#include <stdio.h>   // insert stdio.h\n#include "myheader.h" // insert local file\n#define BUFFER_SIZE 256\n#ifndef BUFFER_SIZE\n  #define BUFFER_SIZE 128\n#endif`,
        },
        {
          heading: "Macros with Parameters",
          content:
            "Macros can take parameters but are text substitution — not functions. Parenthesize parameters to avoid precedence bugs. Multi-line macros use backslash continuation. Beware of double evaluation of arguments.",
          codeExample: `#define SQUARE(x) ((x)*(x))\n#define MAX(a,b) (((a)>(b))?(a):(b))\n#define LOG(msg) printf("[LOG] %s\\n", msg)\n\nint result = SQUARE(3+1);  // ((3+1)*(3+1)) = 16`,
        },
        {
          heading: "Conditional Compilation",
          content:
            "#if, #ifdef, #ifndef, #else, #elif, #endif control which code is compiled. Used for platform-specific code, debug builds, and header guards. #pragma once is a modern alternative to traditional include guards.",
          codeExample: `#ifdef DEBUG\n  printf("x = %d\\n", x);\n#endif\n\n#if defined(_WIN32)\n  #include <windows.h>\n#elif defined(__linux__)\n  #include <unistd.h>\n#endif`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\n#define PI 3.14159\n#define AREA(r) (PI*(r)*(r))\n#define MAX(a,b) ((a)>(b)?(a):(b))\n\nint main(void) {\n    printf("PI = %f\\n", PI);\n    printf("Area of r=5: %f\\n", AREA(5));\n    printf("MAX(10,20) = %d\\n", MAX(10, 20));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d16-q1", type: "quiz", title: "Macro Parentheses",
        description: "Understanding macro safety",
        question: "Why should macro parameters be parenthesized like '#define SQR(x) ((x)*(x))'?",
        options: [
          { id: "a", text: "To make it run faster", correct: false },
          { id: "b", text: "To prevent operator precedence bugs", correct: true },
          { id: "c", text: "Because the compiler requires it", correct: false },
          { id: "d", text: "To avoid multiple evaluation", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d16-q2", type: "quiz", title: "Include Guards",
        description: "Understanding header protection",
        question: "What is the purpose of #include guards (or #pragma once)?",
        options: [
          { id: "a", text: "To make headers compile faster", correct: false },
          { id: "b", text: "To prevent a header from being included multiple times", correct: true },
          { id: "c", text: "To secure the header file", correct: false },
          { id: "d", text: "To export functions", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d16-c1", type: "code", title: "Debug Macro",
        description: "Create a DEBUG_PRINT macro that prints only when DEBUG is defined",
        starterCode: `#include <stdio.h>\n\n/* TODO: define DEBUG_PRINT macro */\n\nint main(void) {\n    int x = 42;\n    // DEBUG_PRINT("x = %d\\n", x);  // should print if DEBUG defined\n    printf("Program running\\n");\n    return 0;\n}`,
        expectedOutput: "Program running",
        hints: ["Use #ifdef DEBUG", "Macro with variable args: #define DEBUG_PRINT(fmt, ...) printf(fmt, __VA_ARGS__)"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d16-a1", title: "Preprocessor Assert",
      description: "Implement a compile-time and runtime assert system using macros",
      requirements: [
        "Define STATIC_ASSERT(cond) that generates a compile error if false",
        "Define ASSERT(cond) that prints file/line on failure",
        "Define ASSERT_MSG(cond, msg) with custom message",
        "Use __FILE__, __LINE__, __func__ in output",
        "Test both passing and failing cases",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\n#define STATIC_ASSERT(cond) ((void)sizeof(char[1 - 2*!(cond)]))\n\n/* TODO: define ASSERT and ASSERT_MSG macros */\n\nint main(void) {\n    STATIC_ASSERT(sizeof(int) == 4);  // compiles on most platforms\n    int x = 10;\n    // ASSERT(x > 0);\n    // ASSERT_MSG(x < 100, "x too large");\n    printf("All tests passed\\n");\n    return 0;\n}`,
      rubric: [
        { criterion: "STATIC_ASSERT works", points: 25 },
        { criterion: "ASSERT prints file/line", points: 25 },
        { criterion: "ASSERT_MSG works", points: 25 },
        { criterion: "Macro hygiene (no side effects)", points: 25 },
      ],
      xpReward: 100,
    },
  },

  17: {
    title: "File I/O",
    subtitle: "Reading and writing files with the stdio library",
    tags: ["files", "I/O", "stdio"],
    theory: {
      sections: [
        {
          heading: "Opening and Closing Files",
          content:
            "fopen() opens a file and returns a FILE* pointer. Modes: \"r\" (read), \"w\" (write, truncate), \"a\" (append), \"rb\"/\"wb\" (binary). Always check if fopen returned NULL and close with fclose() when done.",
          codeExample: `FILE *f = fopen("data.txt", "w");\nif (!f) { perror("fopen"); return 1; }\nfprintf(f, "Hello, file!\\n");\nfclose(f);`,
        },
        {
          heading: "Reading and Writing Text",
          content:
            "fprintf() writes formatted text. fscanf() reads formatted input but is fragile. fgets() reads a line safely. getc()/putc() handle single characters. feof() and ferror() check stream state.",
          codeExample: `FILE *f = fopen("data.txt", "r");\nif (!f) return 1;\nchar line[256];\nwhile (fgets(line, sizeof(line), f)) {\n    printf(">> %s", line);\n}\nfclose(f);`,
        },
        {
          heading: "Binary I/O",
          content:
            "fread() and fwrite() read/write raw bytes. Essential for structured data, images, and serialization. fseek()/ftell() navigate to specific positions. Binary mode (\"rb\"/\"wb\") prevents newline translation.",
          codeExample: `int data[5] = {1,2,3,4,5};\nFILE *f = fopen("data.bin", "wb");\nfwrite(data, sizeof(int), 5, f);\nfclose(f);\n\nint readback[5];\nf = fopen("data.bin", "rb");\nfread(readback, sizeof(int), 5, f);\nfclose(f);`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    // Write\n    FILE *f = fopen("test.txt", "w");\n    if (f) {\n        fprintf(f, "Line 1: Systems Programming\\n");\n        fprintf(f, "Line 2: File I/O\\n");\n        fclose(f);\n    }\n    // Read back\n    f = fopen("test.txt", "r");\n    if (f) {\n        char line[128];\n        while (fgets(line, sizeof(line), f))\n            printf("Read: %s", line);\n        fclose(f);\n    }\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d17-q1", type: "quiz", title: "File Modes",
        description: "Understanding fopen modes",
        question: "What does fopen(\"file.txt\", \"w\") do?",
        options: [
          { id: "a", text: "Opens for reading", correct: false },
          { id: "b", text: "Opens for writing (creates or truncates)", correct: true },
          { id: "c", text: "Opens for appending", correct: false },
          { id: "d", text: "Opens in binary mode", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d17-q2", type: "quiz", title: "fgets Safety",
        description: "Understanding bounded reads",
        question: "Why is fgets(buf, size, f) safer than gets(buf)?",
        options: [
          { id: "a", text: "fgets is faster", correct: false },
          { id: "b", text: "fgets limits reads to size-1, preventing buffer overflow", correct: true },
          { id: "c", text: "fgets works with binary files", correct: false },
          { id: "d", text: "fgets doesn't include newlines", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d17-c1", type: "code", title: "File Copy",
        description: "Write a program that copies a source file to a destination file",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    FILE *src = fopen("input.txt", "r");\n    FILE *dst = fopen("output.txt", "w");\n    if (!src || !dst) { perror("fopen"); return 1; }\n    /* TODO: copy character by character */\n    fclose(src); fclose(dst);\n    return 0;\n}`,
        hints: ["Use getc() and putc() in a loop", "Stop on EOF"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d17-a1", title: "Line Counter",
      description: "Write a program that counts lines, words, and characters in a file (like wc)",
      requirements: [
        "Open a file for reading",
        "Count lines, words, and characters",
        "Print the counts in aligned format",
        "Handle the case where file doesn't exist",
      ],
      starterCode: `#include <stdio.h>\n#include <ctype.h>\n\nint main(void) {\n    const char *filename = "data.txt";\n    FILE *f = fopen(filename, "r");\n    if (!f) { perror("fopen"); return 1; }\n    /* TODO: count lines, words, chars */\n    fclose(f);\n    return 0;\n}`,
      rubric: [
        { criterion: "Character count correct", points: 20 },
        { criterion: "Line count correct", points: 20 },
        { criterion: "Word count correct", points: 30 },
        { criterion: "Formatting and error handling", points: 30 },
      ],
      xpReward: 100,
    },
  },

  18: {
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
  },

  19: {
    title: "Recursion",
    subtitle: "Functions that call themselves — divide and conquer",
    tags: ["recursion", "algorithms", "stack"],
    theory: {
      sections: [
        {
          heading: "The Anatomy of Recursion",
          content:
            "Recursion solves a problem by reducing it to smaller instances of the same problem. Every recursive function needs: a base case (stopping condition) and a recursive case that moves toward the base. Without a base case, you get infinite recursion and a stack overflow.",
          codeExample: `int factorial(int n) {\n    if (n <= 1) return 1;  // base case\n    return n * factorial(n - 1);  // recursive case\n}\n\n// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120`,
        },
        {
          heading: "The Call Stack",
          content:
            "Each recursive call pushes a new stack frame with local variables and the return address. Deep recursion can exhaust stack space. Each frame consumes memory — factorial(100000) will crash with a stack overflow.",
          codeExample: `void recurse(int depth) {\n    printf("Depth: %d [stack frame at %p]\\n", depth, &depth);\n    if (depth > 0) recurse(depth - 1);\n    printf("Returning from depth %d\\n", depth);\n}`,
        },
        {
          heading: "When to Use Recursion",
          content:
            "Recursion shines for problems with a natural recursive structure: tree traversal, divide-and-conquer (quicksort, mergesort), backtracking, and mathematical definitions (Fibonacci, GCD). For simple iteration, loops are better — they avoid stack overhead.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n\nint main(void) {\n    printf("5! = %d\\n", factorial(5));\n    printf("fib(10) = %d\\n", fibonacci(10));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d19-q1", type: "quiz", title: "Base Case",
        description: "Understanding recursion termination",
        question: "What is the base case in a recursive function?",
        options: [
          { id: "a", text: "The first call to the function", correct: false },
          { id: "b", text: "The condition that stops the recursion", correct: true },
          { id: "c", text: "The recursive call itself", correct: false },
          { id: "d", text: "The stack frame allocation", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d19-q2", type: "quiz", title: "Stack Overflow",
        description: "Understanding recursion limits",
        question: "What happens if a recursive function never reaches its base case?",
        options: [
          { id: "a", text: "The program returns 0", correct: false },
          { id: "b", text: "Stack overflow — program crashes", correct: true },
          { id: "c", text: "The function returns infinity", correct: false },
          { id: "d", text: "The compiler catches it", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d19-c1", type: "code", title: "Recursive Sum",
        description: "Write a recursive function to sum digits of a number",
        starterCode: `#include <stdio.h>\n\nint sum_digits(int n) {\n    /* TODO: recursively sum digits of n */\n}\n\nint main(void) {\n    printf("sum_digits(1234) = %d\\n", sum_digits(1234));\n    return 0;\n}`,
        expectedOutput: "sum_digits(1234) = 10",
        hints: ["base case: n < 10 returns n", "recursive: n%10 + sum_digits(n/10)"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d19-a1", title: "Towers of Hanoi",
      description: "Implement the classic Towers of Hanoi puzzle using recursion",
      requirements: [
        "Write a recursive hanoi(n, from, to, aux) function",
        "Print each move: 'Move disk X from A to B'",
        "Test with 3 disks and print the total number of moves",
        "The number of moves should be 2^n - 1",
      ],
      starterCode: `#include <stdio.h>\n\nint move_count = 0;\n\nvoid hanoi(int n, char from, char to, char aux) {\n    /* TODO: recursive hanoi */\n}\n\nint main(void) {\n    hanoi(3, 'A', 'C', 'B');\n    printf("Total moves: %d\\n", move_count);\n    return 0;\n}`,
      rubric: [
        { criterion: "Recursive hanoi works", points: 35 },
        { criterion: "Prints each move", points: 25 },
        { criterion: "Correct move count", points: 20 },
        { criterion: "Works for different N", points: 20 },
      ],
      xpReward: 100,
    },
  },

  20: {
    title: "Linked Lists",
    subtitle: "Dynamic data structures — nodes linked by pointers",
    tags: ["linked-list", "data-structures", "dynamic"],
    theory: {
      sections: [
        {
          heading: "Node Structure",
          content:
            "A linked list consists of nodes, each containing data and a pointer to the next node. The list is accessed through a head pointer. Unlike arrays, linked lists can grow and shrink dynamically without reallocation.",
          codeExample: `typedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode *head = NULL;\n\n// Create first node\nNode *first = malloc(sizeof(Node));\nfirst->data = 42;\nfirst->next = NULL;\nhead = first;`,
        },
        {
          heading: "Insertion and Traversal",
          content:
            "Insert at head: new->next = head; head = new. Traverse: start at head, follow next until NULL. Search: compare each node's data. Always handle the empty list (head == NULL) as a special case.",
          codeExample: `void push_front(Node **head, int val) {\n    Node *new = malloc(sizeof(Node));\n    new->data = val;\n    new->next = *head;\n    *head = new;\n}\n\nvoid print_list(Node *head) {\n    for (Node *cur = head; cur; cur = cur->next)\n        printf("%d -> ", cur->data);\n    printf("NULL\\n");\n}`,
        },
        {
          heading: "Deletion and Cleanup",
          content:
            "Deleting a node requires updating the previous node's next pointer. Free the node's memory after unlinking. To free the entire list, iterate and save next before freeing current.",
          codeExample: `void free_list(Node *head) {\n    while (head) {\n        Node *tmp = head;\n        head = head->next;\n        free(tmp);\n    }\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node { int data; struct Node *next; } Node;\n\nvoid print(Node *h) { for (Node *c=h; c; c=c->next) printf("%d ", c->data); printf("\\n"); }\n\nint main(void) {\n    Node *n1 = malloc(sizeof(Node)); n1->data = 10;\n    Node *n2 = malloc(sizeof(Node)); n2->data = 20;\n    Node *n3 = malloc(sizeof(Node)); n3->data = 30;\n    n1->next = n2; n2->next = n3; n3->next = NULL;\n    print(n1);\n    free(n1); free(n2); free(n3);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d20-q1", type: "quiz", title: "Node Pointer",
        description: "Understanding linked list traversal",
        question: "In a singly linked list, what does each node contain besides data?",
        options: [
          { id: "a", text: "A pointer to the previous node", correct: false },
          { id: "b", text: "A pointer to the next node", correct: true },
          { id: "c", text: "The index of the node", correct: false },
          { id: "d", text: "The size of the list", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d20-q2", type: "quiz", title: "Head Update",
        description: "Updating the head pointer",
        question: "When inserting at the front, why do we pass Node** instead of Node*?",
        options: [
          { id: "a", text: "To avoid copying the struct", correct: false },
          { id: "b", text: "To modify the caller's head pointer", correct: true },
          { id: "c", text: "To make the function faster", correct: false },
          { id: "d", text: "It's not necessary, Node* works", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d20-c1", type: "code", title: "List Length",
        description: "Write a function to count the number of nodes in a linked list",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node { int data; struct Node *next; } Node;\n\nint length(Node *head) {\n    /* TODO: count nodes */\n}\n\nint main(void) {\n    Node n1 = {1, NULL}, n2 = {2, NULL}, n3 = {3, NULL};\n    n1.next = &n2; n2.next = &n3;\n    printf("Length: %d\\n", length(&n1));\n    printf("Empty: %d\\n", length(NULL));\n    return 0;\n}`,
        expectedOutput: "Length: 3",
        hints: ["Loop while cur != NULL", "Increment counter each iteration"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d20-a1", title: "Linked List Library",
      description: "Implement a basic singly linked list with insert, delete, search, and print",
      requirements: [
        "Implement push_front, push_back, pop_front, pop_back",
        "Implement find (returns index or -1)",
        "Implement delete_by_value (removes first match)",
        "Implement print_list",
        "Free all memory at the end",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node { int data; struct Node *next; } Node;\n\nvoid push_front(Node **head, int val) {\n    /* TODO */\n}\n\nvoid push_back(Node **head, int val) {\n    /* TODO */\n}\n\nint pop_front(Node **head) {\n    /* TODO */\n}\n\nint find(Node *head, int val) {\n    /* TODO */\n}\n\nvoid delete_by_value(Node **head, int val) {\n    /* TODO */\n}\n\nvoid print(Node *head) {\n    /* TODO */\n}\n\nvoid free_list(Node *head) {\n    /* TODO */\n}\n\nint main(void) {\n    Node *list = NULL;\n    push_front(&list, 10);\n    push_front(&list, 20);\n    push_back(&list, 30);\n    print(list);\n    printf("Found 20 at: %d\\n", find(list, 20));\n    delete_by_value(&list, 20);\n    print(list);\n    free_list(list);\n    return 0;\n}`,
      rubric: [
        { criterion: "push_front/push_back work", points: 20 },
        { criterion: "pop_front works", points: 15 },
        { criterion: "find returns correct index", points: 20 },
        { criterion: "delete_by_value works", points: 20 },
        { criterion: "Memory freed correctly", points: 25 },
      ],
      xpReward: 100,
    },
  },

  21: {
    title: "Stack Implementation",
    subtitle: "LIFO data structure — last in, first out",
    tags: ["stack", "data-structures", "LIFO"],
    theory: {
      sections: [
        {
          heading: "Stack Concepts",
          content:
            "A stack is a LIFO (Last In, First Out) data structure. Think of a stack of plates — you add (push) to the top and remove (pop) from the top. Stacks are fundamental in computing: the call stack, expression evaluation, and undo operations all use stacks.",
          codeExample: `#define MAX 100\nint stack[MAX];\nint top = -1;\n\nvoid push(int v) {\n    if (top >= MAX - 1) { printf("overflow\\n"); return; }\n    stack[++top] = v;\n}\n\nint pop(void) {\n    if (top < 0) { printf("underflow\\n"); return -1; }\n    return stack[top--];\n}`,
        },
        {
          heading: "Array vs Linked-List Implementation",
          content:
            "Array-based stacks are simple and fast but have a fixed capacity. Linked-list stacks grow dynamically but have extra memory overhead per node. Choose based on whether predictable capacity or unbounded growth matters more.",
        },
        {
          heading: "Common Stack Applications",
          content:
            "Expression evaluation (converting infix to postfix), backtracking (maze solving), function call/return, undo/redo in editors, and bracket matching in compilers. The entire CPU call stack is a hardware stack.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\n#define MAX 10\nint stack[MAX], top = -1;\n\nvoid push(int v) { if (top < MAX-1) stack[++top] = v; else printf("overflow\\n"); }\nint pop(void) { if (top >= 0) return stack[top--]; printf("underflow\\n"); return -1; }\n\nint main(void) {\n    push(10); push(20); push(30);\n    printf("pop: %d\\n", pop());\n    printf("pop: %d\\n", pop());\n    push(40);\n    printf("pop: %d\\n", pop());\n    printf("pop: %d\\n", pop());\n    printf("pop: %d\\n", pop());  // underflow\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d21-q1", type: "quiz", title: "LIFO Order",
        description: "Understanding stack order",
        question: "If you push 1, 2, 3 onto a stack, what is the first pop returns?",
        options: [
          { id: "a", text: "1", correct: false },
          { id: "b", text: "3", correct: true },
          { id: "c", text: "2", correct: false },
          { id: "d", text: "0", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d21-q2", type: "quiz", title: "Stack Overflow",
        description: "Understanding stack limits",
        question: "What is a stack overflow in the context of our array-based stack?",
        options: [
          { id: "a", text: "The program runs out of memory", correct: false },
          { id: "b", text: "Pushing when top >= MAX-1", correct: true },
          { id: "c", text: "Popping from an empty stack", correct: false },
          { id: "d", text: "The stack variable overflows", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d21-c1", type: "code", title: "Bracket Matcher",
        description: "Use a stack to check if parentheses are balanced",
        starterCode: `#include <stdio.h>\n#include <string.h>\n\n#define MAX 100\nchar stack[MAX];\nint top = -1;\n\nvoid push(char c) { if (top < MAX-1) stack[++top] = c; }\nchar pop(void) { return top >= 0 ? stack[top--] : '\\0'; }\n\nint is_balanced(const char *expr) {\n    /* TODO: return 1 if parentheses balanced */\n}\n\nint main(void) {\n    printf("%d\\n", is_balanced("()"));     // 1\n    printf("%d\\n", is_balanced("(()"));    // 0\n    printf("%d\\n", is_balanced("(())"));   // 1\n    return 0;\n}`,
        expectedOutput: "1",
        hints: ["Push '(' when seen", "Pop and check on ')'", "Stack must be empty at end"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d21-a1", title: "Postfix Calculator",
      description: "Implement a postfix (RPN) calculator using a stack",
      requirements: [
        "Read a postfix expression string: '3 4 + 5 *'",
        "Push numbers onto the stack",
        "On operator, pop two values, apply, push result",
        "At end, pop and print the result",
        "Handle division by zero and insufficient operands",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <ctype.h>\n#include <string.h>\n\n#define MAX 100\nint stack[MAX], top = -1;\n\nvoid push(int v) { if (top < MAX-1) stack[++top] = v; }\nint pop(void) { return top >= 0 ? stack[top--] : 0; }\n\nint eval_postfix(const char *expr) {\n    /* TODO: evaluate postfix expression */\n}\n\nint main(void) {\n    printf("3 4 + = %d\\n", eval_postfix("3 4 +"));\n    printf("3 4 + 5 * = %d\\n", eval_postfix("3 4 + 5 *"));\n    return 0;\n}`,
      rubric: [
        { criterion: "Numbers parsed and pushed", points: 25 },
        { criterion: "Operators applied correctly", points: 30 },
        { criterion: "Correct final result", points: 20 },
        { criterion: "Error handling", points: 25 },
      ],
      xpReward: 100,
    },
  },

  22: {
    title: "Queue Implementation",
    subtitle: "FIFO data structure — first in, first out",
    tags: ["queue", "data-structures", "FIFO"],
    theory: {
      sections: [
        {
          heading: "Queue Concepts",
          content:
            "A queue is FIFO (First In, First Out). Enqueue adds to the rear, dequeue removes from the front. Think of a line at a ticket counter — the first person in line gets served first. Queues are essential in scheduling, buffering, and BFS.",
          codeExample: `#define MAX 100\nint queue[MAX];\nint front = 0, rear = 0;\n\nvoid enqueue(int v) {\n    if (rear >= MAX) { printf("full\\n"); return; }\n    queue[rear++] = v;\n}\n\nint dequeue(void) {\n    if (front >= rear) { printf("empty\\n"); return -1; }\n    return queue[front++];\n}`,
        },
        {
          heading: "Circular Buffer",
          content:
            "A linear queue wastes space — after dequeuing, front slots are unused. A circular buffer reuses slots by wrapping indices modulo capacity. The array becomes a ring where front and rear chase each other.",
          codeExample: `#define SIZE 5\nint buf[SIZE];\nint head = 0, tail = 0, count = 0;\n\nvoid enq(int v) {\n    if (count == SIZE) { printf("full\\n"); return; }\n    buf[tail] = v;\n    tail = (tail + 1) % SIZE;\n    count++;\n}`,
        },
        {
          heading: "Queue Applications",
          content:
            "Print spooling, task scheduling (OS), breadth-first search, message passing, buffering between producers and consumers (producer-consumer pattern), and keyboard input buffering.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\n#define MAX 5\nint q[MAX], front = 0, rear = 0;\n\nvoid enq(int v) { if (rear < MAX) q[rear++] = v; else printf("q full\\n"); }\nint deq(void) { return front < rear ? q[front++] : (printf("q empty\\n"), -1); }\n\nint main(void) {\n    enq(1); enq(2); enq(3);\n    printf("deq: %d\\n", deq());\n    printf("deq: %d\\n", deq());\n    enq(4);\n    printf("deq: %d\\n", deq());\n    printf("deq: %d\\n", deq());\n    printf("deq: %d\\n", deq());  // empty\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d22-q1", type: "quiz", title: "FIFO Order",
        description: "Understanding queue order",
        question: "If you enqueue 1, 2, 3, what is the first dequeue returns?",
        options: [
          { id: "a", text: "1", correct: true },
          { id: "b", text: "3", correct: false },
          { id: "c", text: "2", correct: false },
          { id: "d", text: "Depends on implementation", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d22-q2", type: "quiz", title: "Circular Buffer",
        description: "Understanding wraparound",
        question: "Why use a circular buffer for queues?",
        options: [
          { id: "a", text: "It makes operations faster", correct: false },
          { id: "b", text: "It reuses space from dequeued slots", correct: true },
          { id: "c", text: "It supports random access", correct: false },
          { id: "d", text: "It doubles as a stack", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d22-c1", type: "code", title: "Circular Queue",
        description: "Implement a circular queue with modulo indexing",
        starterCode: `#include <stdio.h>\n\n#define SIZE 5\nint q[SIZE];\nint head = 0, tail = 0, count = 0;\n\nvoid enq(int v) {\n    if (count == SIZE) { printf("full\\n"); return; }\n    /* TODO: insert at tail, wrap around */\n}\n\nint deq(void) {\n    if (count == 0) { printf("empty\\n"); return -1; }\n    /* TODO: remove from head, wrap around */\n}\n\nint main(void) {\n    enq(10); enq(20); enq(30);\n    printf("%d\\n", deq());\n    enq(40); enq(50); enq(60);  // should wrap\n    printf("%d\\n", deq());\n    return 0;\n}`,
        expectedOutput: "10",
        hints: ["tail = (tail + 1) % SIZE", "head = (head + 1) % SIZE", "Track count for full/empty"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d22-a1", title: "Producer-Consumer Queue",
      description: "Simulate a producer-consumer system with a circular queue buffer",
      requirements: [
        "Implement a circular queue with fixed capacity",
        "Write a producer function that enqueues items 1..N",
        "Write a consumer function that dequeues and prints items",
        "Demonstrate wrap-around behavior",
        "Print queue state after each operation",
      ],
      starterCode: `#include <stdio.h>\n\n#define SIZE 3\nint q[SIZE];\nint head = 0, tail = 0, count = 0;\n\nvoid enq(int v) {\n    if (count == SIZE) { printf("BUFFER FULL - lost: %d\\n", v); return; }\n    q[tail] = v;\n    tail = (tail + 1) % SIZE;\n    count++;\n}\n\nint deq(void) {\n    if (count == 0) { printf("BUFFER EMPTY\\n\"); return -1; }\n    int v = q[head];\n    head = (head + 1) % SIZE;\n    count--;\n    return v;\n}\n\nint main(void) {\n    /* TODO: demonstrate producer-consumer */\n    return 0;\n}`,
      rubric: [
        { criterion: "Circular queue correct", points: 30 },
        { criterion: "Producer-consumer pattern", points: 25 },
        { criterion: "Wrap-around works", points: 25 },
        { criterion: "Output formatting", points: 20 },
      ],
      xpReward: 100,
    },
  },

  23: {
    title: "Binary Search",
    subtitle: "Divide and conquer on sorted arrays — O(log n)",
    tags: ["algorithms", "search", "binary-search"],
    theory: {
      sections: [
        {
          heading: "How Binary Search Works",
          content:
            "Binary search finds an element in a sorted array by repeatedly dividing the search range in half. Compare the target to the middle element. If equal, done. If target is smaller, search the left half. If larger, search the right half. O(log n) time.",
          codeExample: `int bsearch(int arr[], int lo, int hi, int target) {\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}`,
        },
        {
          heading: "Why mid = lo + (hi-lo)/2?",
          content:
            "Using (lo+hi)/2 can overflow for large arrays. lo + (hi-lo)/2 computes the same value safely. Always use integer midpoint calculation carefully — this is a classic bug source.",
          codeExample: `// Unsafe: mid = (lo + hi) / 2  // overflow risk\n// Safe:   mid = lo + (hi - lo) / 2`,
        },
        {
          heading: "Binary Search Variants",
          content:
            "Lower bound (first position where target could be inserted), upper bound (last position), and binary search on rotated arrays are common interview variations. The same divide-and-conquer principle applies to finding square roots and more.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint bsearch(int arr[], int n, int target) {\n    int lo = 0, hi = n - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}\n\nint main(void) {\n    int arr[] = {2, 5, 8, 12, 19, 24, 31, 37};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    printf("Index of 19: %d\\n", bsearch(arr, n, 19));\n    printf("Index of 3: %d\\n", bsearch(arr, n, 3));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d23-q1", type: "quiz", title: "Binary Search Complexity",
        description: "Understanding time complexity",
        question: "What is the time complexity of binary search?",
        options: [
          { id: "a", text: "O(n)", correct: false },
          { id: "b", text: "O(log n)", correct: true },
          { id: "c", text: "O(n²)", correct: false },
          { id: "d", text: "O(1)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d23-q2", type: "quiz", title: "Array Requirement",
        description: "Prerequisite for binary search",
        question: "What must be true about the array for binary search to work?",
        options: [
          { id: "a", text: "It must have unique elements", correct: false },
          { id: "b", text: "It must be sorted", correct: true },
          { id: "c", text: "It must be at least 10 elements", correct: false },
          { id: "d", text: "It must be allocated with malloc", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d23-c1", type: "code", title: "Recursive Binary Search",
        description: "Implement binary search recursively",
        starterCode: `#include <stdio.h>\n\nint bsearch_rec(int arr[], int lo, int hi, int target) {\n    /* TODO: recursive binary search */\n}\n\nint main(void) {\n    int arr[] = {1, 3, 5, 7, 9, 11, 13};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    printf("7 at %d\\n", bsearch_rec(arr, 0, n-1, 7));\n    printf("4 at %d\\n", bsearch_rec(arr, 0, n-1, 4));\n    return 0;\n}`,
        expectedOutput: "7 at 3",
        hints: ["Base case: lo > hi", "Same mid formula", "Recurse on left or right half"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d23-a1", title: "First and Last Position",
      description: "Find the first and last occurrence of a target in a sorted array with duplicates",
      requirements: [
        "Implement find_first() — first index where target appears",
        "Implement find_last() — last index where target appears",
        "Return {-1, -1} if target not found",
        "Both must be O(log n)",
        "Test with array containing duplicates",
      ],
      starterCode: `#include <stdio.h>\n\nint find_first(int arr[], int n, int target) {\n    /* TODO: binary search for first occurrence */\n}\n\nint find_last(int arr[], int n, int target) {\n    /* TODO: binary search for last occurrence */\n}\n\nint main(void) {\n    int arr[] = {1, 2, 3, 3, 3, 3, 4, 5, 6};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    printf("First 3: %d\\n", find_first(arr, n, 3));\n    printf("Last 3: %d\\n", find_last(arr, n, 3));\n    printf("First 7: %d\\n", find_first(arr, n, 7));\n    return 0;\n}`,
      rubric: [
        { criterion: "find_first correct", points: 30 },
        { criterion: "find_last correct", points: 30 },
        { criterion: "Both O(log n)", points: 20 },
        { criterion: "Works with duplicates", points: 20 },
      ],
      xpReward: 100,
    },
  },

  24: {
    title: "Sorting Algorithms",
    subtitle: "Bubble, insertion, and selection — O(n²) sorts",
    tags: ["algorithms", "sorting", "O(n²)"],
    theory: {
      sections: [
        {
          heading: "Bubble Sort",
          content:
            "Repeatedly step through the array, comparing adjacent elements and swapping them if they're in the wrong order. Each pass bubbles the largest element to the end. Early termination if no swaps occur (optimized). O(n²) worst/average, O(n) best when already sorted.",
          codeExample: `void bubble(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int swapped = 0;\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n                swapped = 1;\n            }\n        }\n        if (!swapped) break;\n    }\n}`,
        },
        {
          heading: "Insertion Sort",
          content:
            "Build the sorted array one element at a time. Take each element and insert it into the correct position among the already-sorted elements. Excellent for small arrays and nearly-sorted data. O(n²) worst, O(n) best.",
          codeExample: `void insertion(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j+1] = arr[j];\n            j--;\n        }\n        arr[j+1] = key;\n    }\n}`,
        },
        {
          heading: "Selection Sort",
          content:
            "Find the minimum element and swap it to the front. Repeat for the remaining subarray. Simple but always O(n²) — even if already sorted. Makes fewer swaps than bubble sort (at most n-1).",
          codeExample: `void selection(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min = i;\n        for (int j = i+1; j < n; j++)\n            if (arr[j] < arr[min]) min = j;\n        int t = arr[i]; arr[i] = arr[min]; arr[min] = t;\n    }\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nvoid print(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n}\n\nvoid bubble(int arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n}\n\nint main(void) {\n    int a[] = {5, 2, 8, 1, 9, 3};\n    int n = sizeof(a)/sizeof(a[0]);\n    bubble(a, n);\n    print(a, n);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d24-q1", type: "quiz", title: "Bubble Best Case",
        description: "Understanding best-case performance",
        question: "What is the best-case time complexity of optimized bubble sort?",
        options: [
          { id: "a", text: "O(n)", correct: true },
          { id: "b", text: "O(n log n)", correct: false },
          { id: "c", text: "O(n²)", correct: false },
          { id: "d", text: "O(1)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d24-q2", type: "quiz", title: "Stable Sort",
        description: "Understanding sort stability",
        question: "Which of these sorts is stable (preserves relative order of equal elements)?",
        options: [
          { id: "a", text: "Selection sort", correct: false },
          { id: "b", text: "Bubble sort", correct: true },
          { id: "c", text: "Neither", correct: false },
          { id: "d", text: "Both", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d24-c1", type: "code", title: "Sort Comparison",
        description: "Implement all three sorts and count comparisons/swaps",
        starterCode: `#include <stdio.h>\n\nvoid bubble_count(int arr[], int n, int *swaps) {\n    /* TODO: count swaps during bubble sort */\n}\n\nint main(void) {\n    int arr[] = {5, 3, 8, 6, 2, 7, 1, 4};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    int swaps = 0;\n    bubble_count(arr, n, &swaps);\n    printf("Bubble swaps: %d\\n\", swaps);\n    return 0;\n}`,
        hints: ["Pass a pointer to the swap counter", "Increment on each swap"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d24-a1", title: "Sorting Benchmark",
      description: "Implement all three sorts and benchmark them on different array sizes",
      requirements: [
        "Implement bubble, insertion, and selection sort",
        "Count the number of comparisons each makes",
        "Test on small (10), medium (50), and large (100) arrays",
        "Print a comparison table of results",
        "Test on already-sorted arrays too",
      ],
      starterCode: `#include <stdio.h>\n\nint bubble(int arr[], int n) {\n    int comps = 0;\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++) {\n            comps++;\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n        }\n    return comps;\n}\n\nint insertion(int arr[], int n) {\n    /* TODO: count comparisons */\n}\n\nint selection(int arr[], int n) {\n    /* TODO: count comparisons */\n}\n\nint main(void) {\n    int arr[] = {5, 3, 8, 6, 2, 7, 1, 4};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    printf("Bubble: %d comparisons\\n", bubble(arr, n));\n    /* TODO: test other sorts */\n    return 0;\n}`,
      rubric: [
        { criterion: "All three sorts implemented", points: 30 },
        { criterion: "Comparison counting correct", points: 25 },
        { criterion: "Test on multiple array sizes", points: 25 },
        { criterion: "Results table printed", points: 20 },
      ],
      xpReward: 100,
    },
  },

  25: {
    title: "Multi-dimensional Arrays",
    subtitle: "Matrices, nested loops, and row-major order",
    tags: ["arrays", "matrices", "2D"],
    theory: {
      sections: [
        {
          heading: "2D Array Layout",
          content:
            "A 2D array is stored in row-major order — row 0, then row 1, etc. int mat[3][4] creates 3 rows × 4 columns = 12 contiguous ints. mat[i][j] access is syntactic sugar for *(mat + i * cols + j).",
          codeExample: `int mat[2][3] = {{1,2,3},{4,5,6}};\n// Memory: [1][2][3][4][5][6]\nprintf("%d\\n", mat[1][2]);  // 6 (row 1, col 2)\nprintf("%d\\n", *(*(mat+1)+2));  // same thing`,
        },
        {
          heading: "Nested Loop Traversal",
          content:
            "Row-major traversal (outer loop = rows, inner = columns) matches memory layout and benefits from CPU cache. Column-major traversal (outer = columns) jumps across rows and is slower.",
          codeExample: `int rows = 3, cols = 4;\nint matrix[rows][cols];\n\n// Row-major (cache-friendly)\nfor (int i = 0; i < rows; i++)\n    for (int j = 0; j < cols; j++)\n        matrix[i][j] = i * cols + j;`,
        },
        {
          heading: "Dynamic 2D Arrays",
          content:
            "For variable sizes, allocate an array of pointers, each pointing to a row. Or use a flat 1D array with manual index calculation: arr[i * cols + j].",
          codeExample: `int rows = 3, cols = 4;\nint **mat = malloc(rows * sizeof(int*));\nfor (int i = 0; i < rows; i++)\n    mat[i] = malloc(cols * sizeof(int));\n// Access: mat[i][j]\n// Flat approach:\nint *flat = malloc(rows * cols * sizeof(int));\n// Access: flat[i * cols + j]`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int mat[3][4] = {\n        {1, 2, 3, 4},\n        {5, 6, 7, 8},\n        {9, 10, 11, 12}\n    };\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 4; j++)\n            printf("%3d ", mat[i][j]);\n        printf("\\n");\n    }\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d25-q1", type: "quiz", title: "Row-Major",
        description: "Understanding memory layout",
        question: "In C, how is a 2D array stored in memory?",
        options: [
          { id: "a", text: "Column-major order (columns contiguous)", correct: false },
          { id: "b", text: "Row-major order (rows contiguous)", correct: true },
          { id: "c", text: "As a linked list", correct: false },
          { id: "d", text: "Random order", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d25-q2", type: "quiz", title: "Matrix Access",
        description: "Understanding element access",
        question: "Given 'int m[2][3]', how do you access the element at row 1, column 2?",
        options: [
          { id: "a", text: "m[1][2]", correct: true },
          { id: "b", text: "m[2][1]", correct: false },
          { id: "c", text: "m[1,2]", correct: false },
          { id: "d", text: "m[2][2]", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d25-c1", type: "code", title: "Matrix Transpose",
        description: "Transpose a 3x3 matrix (swap rows and columns)",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    int mat[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    /* TODO: compute and print transpose */\n    return 0;\n}`,
        hints: ["Result[i][j] = mat[j][i]", "Print in the same nested loop format"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d25-a1", title: "Matrix Operations",
      description: "Implement matrix addition, multiplication, and diagonal sum",
      requirements: [
        "Implement add(m1, m2, result, rows, cols)",
        "Implement multiply(m1, m2, result, r1, c1, c2)",
        "Implement sum_diagonal(mat, n)",
        "Test with at least 3x3 matrices",
        "Print matrices in a clean format",
      ],
      starterCode: `#include <stdio.h>\n\nvoid add(int a[][3], int b[][3], int res[][3], int rows, int cols) {\n    /* TODO */\n}\n\nvoid multiply(int a[][3], int b[][3], int res[][3], int n) {\n    /* TODO */\n}\n\nint sum_diagonal(int mat[][3], int n) {\n    /* TODO */\n}\n\nvoid print(int mat[][3], int rows, int cols) {\n    for (int i = 0; i < rows; i++) {\n        for (int j = 0; j < cols; j++)\n            printf("%4d ", mat[i][j]);\n        printf("\\n\");\n    }\n}\n\nint main(void) {\n    int a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int b[3][3] = {{9,8,7},{6,5,4},{3,2,1}};\n    /* TODO: test operations */\n    return 0;\n}`,
      rubric: [
        { criterion: "Matrix addition correct", points: 25 },
        { criterion: "Matrix multiplication correct", points: 35 },
        { criterion: "Diagonal sum correct", points: 25 },
        { criterion: "Clean formatted output", points: 15 },
      ],
      xpReward: 100,
    },
  },

  26: {
    title: "String Manipulation",
    subtitle: "Building your own string library from scratch",
    tags: ["strings", "utilities", "implementation"],
    theory: {
      sections: [
        {
          heading: "Implementing strlen",
          content:
            "strlen counts characters until the null terminator. Walk the string with a pointer or index, incrementing until '\\0' is found. Return the count.",
          codeExample: `size_t my_strlen(const char *s) {\n    const char *p = s;\n    while (*p) p++;\n    return p - s;\n}`,
        },
        {
          heading: "Implementing strcpy and strcat",
          content:
            "strcpy copies characters from src to dst until null. strcat appends by first finding the end of dst, then copying src there. Both return dst for chaining. Both are dangerous without bounds checking.",
          codeExample: `char *my_strcpy(char *dst, const char *src) {\n    char *p = dst;\n    while ((*p++ = *src++));\n    return dst;\n}\n\nchar *my_strcat(char *dst, const char *src) {\n    my_strcpy(dst + my_strlen(dst), src);\n    return dst;\n}`,
        },
        {
          heading: "Implementing strcmp",
          content:
            "strcmp compares character by character. Return the difference of the first mismatching characters (or 0 if equal). The difference is calculated as unsigned char values for portability.",
          codeExample: `int my_strcmp(const char *a, const char *b) {\n    while (*a && *a == *b) { a++; b++; }\n    return (unsigned char)*a - (unsigned char)*b;\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint my_strlen(const char *s) {\n    int len = 0;\n    while (s[len]) len++;\n    return len;\n}\n\nchar *my_strcpy(char *d, const char *s) {\n    char *p = d;\n    while ((*p++ = *s++));\n    return d;\n}\n\nint main(void) {\n    char buf[32];\n    printf("len('hello') = %d\\n", my_strlen("hello"));\n    my_strcpy(buf, "systems");\n    printf("copied: %s\\n\", buf);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d26-q1", type: "quiz", title: "strlen Walk",
        description: "Understanding how strlen works",
        question: "What condition stops the loop in our my_strlen?",
        options: [
          { id: "a", text: "When index reaches 100", correct: false },
          { id: "b", text: "When the null terminator '\\0' is found", correct: true },
          { id: "c", text: "When a newline is found", correct: false },
          { id: "d", text: "When the string length is negative", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d26-q2", type: "quiz", title: "strcmp Return",
        description: "Understanding comparison result",
        question: "What does strcmp return if the strings are identical?",
        options: [
          { id: "a", text: "1", correct: false },
          { id: "b", text: "0", correct: true },
          { id: "c", text: "-1", correct: false },
          { id: "d", text: "The length of the strings", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d26-c1", type: "code", title: "String Upper",
        description: "Implement a function that converts a string to uppercase in-place",
        starterCode: `#include <stdio.h>\n\nvoid to_upper(char *s) {\n    /* TODO: convert to uppercase */\n}\n\nint main(void) {\n    char text[] = "Hello, Systems!";\n    to_upper(text);\n    printf("%s\\n", text);\n    return 0;\n}`,
        expectedOutput: "HELLO, SYSTEMS!",
        hints: ["Check if char is between 'a' and 'z'", "Subtract 32 to convert to uppercase (ASCII)"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d26-a1", title: "String Splitter",
      description: "Implement a function that splits a string by a delimiter character",
      requirements: [
        "Implement split(str, delim) that prints each token on a new line",
        "Handle multiple delimiters in a row (skip empty tokens)",
        "Work with any delimiter character",
        "Don't modify the original string",
        "Test with comma, space, and pipe delimiters",
      ],
      starterCode: `#include <stdio.h>\n\nvoid split(const char *str, char delim) {\n    /* TODO: print each token on a new line */\n}\n\nint main(void) {\n    printf("CSV test:\\n\");\n    split("apple,banana,cherry,date", ',');\n    printf("\\nSpace test:\\n\");\n    split("hello world from C", ' ');\n    return 0;\n}`,
      rubric: [
        { criterion: "Tokens identified correctly", points: 30 },
        { criterion: "Multiple delimiters handled", points: 25 },
        { criterion: "Any delimiter works", points: 20 },
        { criterion: "Original string unchanged", points: 25 },
      ],
      xpReward: 100,
    },
  },

  27: {
    title: "Header Files & Modules",
    subtitle: "Organizing code across multiple files with headers",
    tags: ["modules", "headers", "organization"],
    theory: {
      sections: [
        {
          heading: "Why Split Code Into Files?",
          content:
            "Separating code into multiple files improves organization, compilation speed (only changed files recompile), and reusability. Header files (.h) declare interfaces; source files (.c) implement them. The linker combines compiled object files.",
          codeExample: `// math_utils.h — header (declaration)\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\nint add(int a, int b);\nint mul(int a, int b);\n#endif\n\n// math_utils.c — implementation\n#include "math_utils.h"\nint add(int a, int b) { return a + b; }\nint mul(int a, int b) { return a * b; }\n\n// main.c — uses the module\n#include "math_utils.h"\nint main(void) { return add(2, 3); }`,
        },
        {
          heading: "Include Guards",
          content:
            "Include guards prevent a header from being processed multiple times in the same compilation unit. Use #ifndef / #define / #endif or #pragma once. Without guards, circular includes and redefinitions cause compilation errors.",
          codeExample: `#ifndef MY_HEADER_H  // if not defined\n#define MY_HEADER_H  // define it\n// header content here\n#endif  // end guard`,
        },
        {
          heading: "The extern Keyword",
          content:
            "extern declares a variable or function that is defined in another file. Global variables need extern in headers and a single definition in one .c file. Functions are implicitly extern, but it's good practice to declare them in headers anyway.",
        },
      ],
    },
    playground: {
      defaultCode: `// This lesson is about multi-file organization.\n// The playground shows the concept.\n#include <stdio.h>\n\n/* Imagine this is in utils.h */\nint square(int x);\n\n/* And this is utils.c */\nint square(int x) { return x * x; }\n\nint main(void) {\n    printf("square(7) = %d\\n", square(7));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d27-q1", type: "quiz", title: "Include Guard",
        description: "Understanding header protection",
        question: "What problem do include guards solve?",
        options: [
          { id: "a", text: "Slow compilation times", correct: false },
          { id: "b", text: "Multiple inclusion of the same header in one file", correct: true },
          { id: "c", text: "Memory leaks", correct: false },
          { id: "d", text: "Linker errors", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d27-q2", type: "quiz", title: "Header vs Source",
        description: "Understanding separation of concerns",
        question: "What typically goes in a .h file vs a .c file?",
        options: [
          { id: "a", text: ".h has implementations, .c has declarations", correct: false },
          { id: "b", text: ".h has declarations, .c has implementations", correct: true },
          { id: "c", text: ".h has main(), .c has everything else", correct: false },
          { id: "d", text: "Both are identical", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d27-c1", type: "code", title: "Multi-File Simulation",
        description: "Simulate a multi-file project by using #include to organize code sections",
        starterCode: `#include <stdio.h>\n\n// Simulating a header file inline\n#define MATH_UTILS_H\nint multiply(int a, int b) { return a * b; }\nint power(int base, int exp) {\n    int r = 1;\n    for (int i = 0; i < exp; i++) r *= base;\n    return r;\n}\n\nint main(void) {\n    /* TODO: use the math utilities */\n    return 0;\n}`,
        hints: ["Call multiply and power", "Print their results"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d27-a1", title: "Module Design",
      description: "Design a set of header files and implementations for a calculator library",
      requirements: [
        "Design a 'calc.h' header with function declarations",
        "Implement add, sub, mul, div, pow, sqrt (simulated)",
        "Use include guards in the header",
        "Show how the module would be used via main",
        "Document the interface with comments",
      ],
      starterCode: `#include <stdio.h>\n\n// calc.h simulation\n#ifndef CALC_H\n#define CALC_H\n/* TODO: declare calculator functions */\n#endif\n\n// calc.c simulation\n/* TODO: implement calculator functions */\n\nint main(void) {\n    /* TODO: test calculator */\n    return 0;\n}`,
      rubric: [
        { criterion: "Header with declarations", points: 25 },
        { criterion: "Include guard present", points: 20 },
        { criterion: "All functions implemented", points: 30 },
        { criterion: "Documentation/comments", points: 25 },
      ],
      xpReward: 100,
    },
  },

  28: {
    title: "const & volatile",
    subtitle: "Type qualifiers for immutability and hardware access",
    tags: ["const", "volatile", "type-qualifiers"],
    theory: {
      sections: [
        {
          heading: "The const Qualifier",
          content:
            "const tells the compiler that a variable's value should not be modified. It enables compiler optimizations and catches accidental writes. const int *p means the pointed-to value is const; int *const p means the pointer itself is const.",
          codeExample: `const int MAX = 100;\n// MAX = 200;  // ERROR: can't modify const\n\nint x = 42;\nconst int *p = &x;  // pointer to const int\n// *p = 10;  // ERROR: can't write through p\nx = 10;             // OK: x itself is not const\n\nint *const cp = &x;  // const pointer\n// cp = &y;  // ERROR: can't change pointer\n*cp = 20;            // OK: can modify value`,
        },
        {
          heading: "const Correctness in Functions",
          content:
            "Function parameters should be const when the function doesn't modify them. This documents the contract and enables the compiler to catch bugs. Many standard library functions use const for input parameters.",
          codeExample: `void print_array(const int *arr, int n) {\n    for (int i = 0; i < n; i++)\n        printf("%d ", arr[i]);  // read-only\n}`,
        },
        {
          heading: "The volatile Qualifier",
          content:
            "volatile tells the compiler that a variable's value may change at any time without any action by the code (hardware register, signal handler, multi-threading). The compiler will not optimize away reads/writes to volatile variables.",
          codeExample: `volatile int *status_reg = (int*)0xFF00;\nwhile (*status_reg == 0) {\n    // wait for hardware — volatile prevents\n    // the compiler from caching the read\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    const double PI = 3.14159;\n    int x = 42;\n    const int *p = &x;\n    printf("PI = %f\\n", PI);\n    printf("*p = %d\\n", *p);\n    x = 100;  // OK\n    printf("*p = %d (x changed)\\n", *p);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d28-q1", type: "quiz", title: "const Pointer",
        description: "Understanding const int* vs int* const",
        question: "What does 'const int *p' mean?",
        options: [
          { id: "a", text: "The pointer cannot change", correct: false },
          { id: "b", text: "The value pointed to cannot change", correct: true },
          { id: "c", text: "Both pointer and value are const", correct: false },
          { id: "d", text: "Neither is const", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d28-q2", type: "quiz", title: "volatile Use",
        description: "Understanding volatile purpose",
        question: "When should you use the volatile qualifier?",
        options: [
          { id: "a", text: "For all global variables", correct: false },
          { id: "b", text: "For variables that can change outside program control (hardware, signals)", correct: true },
          { id: "c", text: "For constant values like PI", correct: false },
          { id: "d", text: "Never — it's obsolete", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d28-c1", type: "code", title: "Const Correctness",
        description: "Fix the code to use const correctly",
        starterCode: `#include <stdio.h>\n\n/* TODO: fix parameter to show it won't be modified */\nvoid print_msg(char *msg) {\n    printf("Message: %s\\n", msg);\n}\n\nint main(void) {\n    const char *greeting = "Hello, Systems!";\n    print_msg(greeting);  // should work without warning\n    return 0;\n}`,
        hints: ["Change 'char *msg' to 'const char *msg'"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d28-a1", title: "Const-Correct API",
      description: "Write a small API that uses const appropriately for input parameters",
      requirements: [
        "Write functions: sum_array, reverse_array, print_array",
        "print_array should take const int*",
        "sum_array should take const int*",
        "reverse_array should take int* (modifies)",
        "All functions should compile without warnings",
      ],
      starterCode: `#include <stdio.h>\n\n/* TODO: declare functions with correct const usage */\n\nint main(void) {\n    int arr[] = {10, 20, 30, 40, 50};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    /* TODO: test functions */\n    return 0;\n}`,
      rubric: [
        { criterion: "print_array uses const correctly", points: 25 },
        { criterion: "sum_array uses const correctly", points: 25 },
        { criterion: "reverse_array uses no const (int*)", points: 25 },
        { criterion: "Compiles without warnings", points: 25 },
      ],
      xpReward: 100,
    },
  },

  29: {
    title: "Bit Fields",
    subtitle: "Packing data at the bit level for flags and registers",
    tags: ["bit-fields", "packing", "embedded"],
    theory: {
      sections: [
        {
          heading: "What Are Bit Fields?",
          content:
            "Bit fields allow packing multiple values into a single integer by specifying the exact number of bits each member uses. Declared as type member : bits;. Bit fields are essential when memory is tight or you need to match hardware register layouts.",
          codeExample: `typedef struct {\n    unsigned int active : 1;   // 1 bit\n    unsigned int ready : 1;    // 1 bit\n    unsigned int error : 1;    // 1 bit\n    unsigned int count : 5;    // 5 bits\n} Status;\n\nStatus s = {1, 0, 0, 15};\nprintf("active: %d, count: %d\\n", s.active, s.count);\nprintf("sizeof(Status) = %zu\\n", sizeof(Status));`,
        },
        {
          heading: "Hardware Register Mapping",
          content:
            "In embedded systems, bit fields map directly to hardware registers. Each bit controls a specific function (enable/disable, mode selection, status flags). Bit fields make register manipulation readable.",
          codeExample: `// Hypothetical device control register\nstruct ControlReg {\n    unsigned int power   : 1;  // bit 0\n    unsigned int mode    : 2;  // bits 1-2\n    unsigned int reset   : 1;  // bit 3\n    unsigned int irq_en  : 1;  // bit 4\n    unsigned int : 27;         // padding to 32 bits\n};`,
        },
        {
          heading: "Packing Order and Portability",
          content:
            "Bit field ordering is implementation-defined (MSB vs LSB). They cannot be used with unions portably across compilers. For maximum portability, use explicit bitwise operations instead of bit fields. But for internal use, bit fields are cleaner.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\ntypedef struct {\n    unsigned int r : 5;  // 5 bits (0-31)\n    unsigned int g : 6;  // 6 bits (0-63)\n    unsigned int b : 5;  // 5 bits (0-31)\n} RGB565;\n\nint main(void) {\n    RGB565 pixel = {16, 32, 16};\n    printf("R=%u G=%u B=%u\\n\", pixel.r, pixel.g, pixel.b);\n    printf("sizeof = %zu bytes\\n\", sizeof(RGB565));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d29-q1", type: "quiz", title: "Bit Field Size",
        description: "Understanding bit field allocation",
        question: "What does 'unsigned int flags : 3;' mean?",
        options: [
          { id: "a", text: "flags is 3 bytes wide", correct: false },
          { id: "b", text: "flags uses exactly 3 bits of storage", correct: true },
          { id: "c", text: "flags can hold values 0-7", correct: true },
          { id: "d", text: "Both b and c", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d29-q2", type: "quiz", title: "Bit Field Range",
        description: "Understanding value ranges",
        question: "What range of values can a 3-bit unsigned bit field hold?",
        options: [
          { id: "a", text: "0 to 3", correct: false },
          { id: "b", text: "0 to 7", correct: true },
          { id: "c", text: "-4 to 3", correct: false },
          { id: "d", text: "0 to 255", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d29-c1", type: "code", title: "IP Header Flags",
        description: "Create bit fields representing IPv4 header flags",
        starterCode: `#include <stdio.h>\n\ntypedef struct {\n    /* TODO: define bit fields for IP flags */\n    // version: 4 bits\n    // ihl: 4 bits\n    // dscp: 6 bits\n    // ecn: 2 bits\n    // total_length: 16 bits\n} IPv4Header;\n\nint main(void) {\n    IPv4Header h = {4, 5, 0, 0, 40};\n    printf("Version: %u, IHL: %u, Length: %u\\n\", h.version, h.ihl, h.total_length);\n    printf("sizeof = %zu bytes\\n\", sizeof(IPv4Header));\n    return 0;\n}`,
        hints: ["Sum of bit field widths should match real IP header bits"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d29-a1", title: "Pixel Format Converter",
      description: "Use bit fields to convert between RGB888 and RGB565 pixel formats",
      requirements: [
        "Define RGB565 struct (R:5, G:6, B:5)",
        "Define RGB888 struct (R:8, G:8, B:8)",
        "Write to_rgb565(r, g, b) that packs into uint16_t",
        "Write from_rgb565(pixel) that unpacks to RGB888",
        "Test with several color values",
      ],
      starterCode: `#include <stdio.h>\n#include <stdint.h>\n\ntypedef struct { unsigned int r:5, g:6, b:5; } RGB565;\ntypedef struct { uint8_t r, g, b; } RGB888;\n\nuint16_t pack_rgb565(uint8_t r, uint8_t g, uint8_t b) {\n    /* TODO: pack 8-bit values into 16-bit RGB565 */\n}\n\nRGB888 unpack_rgb565(uint16_t pixel) {\n    /* TODO: unpack 16-bit RGB565 to 8-bit RGB888 */\n}\n\nint main(void) {\n    /* TODO: test pack and unpack */\n    return 0;\n}`,
      rubric: [
        { criterion: "RGB565 struct correct", points: 20 },
        { criterion: "pack_rgb565 correct", points: 30 },
        { criterion: "unpack_rgb565 correct", points: 30 },
        { criterion: "Test cases shown", points: 20 },
      ],
      xpReward: 100,
    },
  },

  30: {
    title: "Error Handling",
    subtitle: "errno, perror, and defensive coding patterns",
    tags: ["errors", "errno", "defensive"],
    theory: {
      sections: [
        {
          heading: "Return Code Pattern",
          content:
            "The most common C error handling pattern: functions return a value indicating success/failure. Return 0 or a positive value for success, negative or NULL for failure. The caller must always check return values — especially for I/O, memory allocation, and system calls.",
          codeExample: `FILE *f = fopen("config.txt", "r");\nif (!f) {\n    fprintf(stderr, "Failed to open config.txt\\n");\n    return 1;\n}`,
        },
        {
          heading: "errno and perror",
          content:
            "When a system call fails, it sets the global errno variable to an error code. perror() prints a descriptive message. strerror() converts errno to a string. Include <errno.h> and <string.h> for these functions.",
          codeExample: `#include <errno.h>\n#include <string.h>\n\nFILE *f = fopen("/nonexistent", "r");\nif (!f) {\n    perror("fopen failed");\n    // Output: fopen failed: No such file or directory\n    printf("errno = %d: %s\\n", errno, strerror(errno));\n}`,
        },
        {
          heading: "Defensive Programming",
          content:
            "Check all function return values. Validate input parameters at function entry (assert or if-guard). Initialize all variables. Use size-bounded functions (strncpy vs strcpy, snprintf vs sprintf). Handle all error paths — especially in memory-constrained environments.",
          codeExample: `int divide(int a, int b, int *result) {\n    if (b == 0) return -1;  // error\n    if (!result) return -2;  // null pointer\n    *result = a / b;\n    return 0;  // success\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <errno.h>\n#include <string.h>\n\nint safe_divide(int a, int b, int *res) {\n    if (b == 0) return -1;\n    if (!res) return -2;\n    *res = a / b;\n    return 0;\n}\n\nint main(void) {\n    int result;\n    if (safe_divide(10, 0, &result) != 0)\n        printf("Error: division by zero\\n\");\n    if (safe_divide(10, 3, &result) == 0)\n        printf("10/3 = %d\\n\", result);\n    // errno example\n    FILE *f = fopen("/no/such/file", "r");\n    if (!f) perror("fopen");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d30-q1", type: "quiz", title: "errno",
        description: "Understanding error reporting",
        question: "What does perror() do?",
        options: [
          { id: "a", text: "Returns the error code", correct: false },
          { id: "b", text: "Prints a descriptive error message to stderr", correct: true },
          { id: "c", text: "Clears the error state", correct: false },
          { id: "d", text: "Terminates the program", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d30-q2", type: "quiz", title: "Defensive Check",
        description: "Understanding defensive programming",
        question: "What should you always do after calling malloc?",
        options: [
          { id: "a", text: "Nothing — it always succeeds", correct: false },
          { id: "b", text: "Check if the returned pointer is NULL", correct: true },
          { id: "c", text: "Cast the result to int*", correct: false },
          { id: "d", text: "Call free() immediately", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d30-c1", type: "code", title: "Robust Input",
        description: "Write a function that reads an integer from user input with error handling",
        starterCode: `#include <stdio.h>\n#include <errno.h>\n#include <limits.h>\n\nint read_int(const char *prompt, int *value) {\n    /* TODO: prompt, read, validate, return 0 on success */\n}\n\nint main(void) {\n    int val;\n    if (read_int("Enter a number: ", &val) == 0)\n        printf("Got: %d\\n\", val);\n    else\n        printf("Invalid input\\n\");\n    return 0;\n}`,
        hints: ["Use fgets + strtol", "Check strtol's end pointer", "Check for overflow with ERANGE"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d30-a1", title: "Safe File Reader",
      description: "Build a robust file reader that handles all error conditions gracefully",
      requirements: [
        "Read a file line by line and print line numbers",
        "Handle: file not found, permission denied, empty file",
        "Use perror() or strerror() for system errors",
        "Don't assume any maximum line length",
        "Print meaningful error messages for each failure mode",
      ],
      starterCode: `#include <stdio.h>\n#include <errno.h>\n#include <string.h>\n\nint read_file(const char *filename) {\n    FILE *f = fopen(filename, "r\");\n    if (!f) {\n        perror("Error opening file\");\n        return -1;\n    }\n    /* TODO: read and print with line numbers */\n    if (ferror(f)) {\n        perror("Error reading file\");\n        fclose(f);\n        return -1;\n    }\n    fclose(f);\n    return 0;\n}\n\nint main(void) {\n    read_file("test.txt\");\n    return 0;\n}`,
      rubric: [
        { criterion: "Handles missing file", points: 20 },
        { criterion: "Reads and prints with line numbers", points: 25 },
        { criterion: "Uses perror/strerror", points: 20 },
        { criterion: "Handles empty file", points: 15 },
        { criterion: "Clean error messages", points: 20 },
      ],
      xpReward: 100,
    },
  },

  31: {
    title: "Memory Alignment",
    subtitle: "Padding, packing, and cache line optimization",
    tags: ["memory", "alignment", "padding"],
    theory: {
      sections: [
        {
          heading: "Why Alignment Matters",
          content:
            "CPUs read memory most efficiently when values are aligned to their natural boundary (4-byte int on 4-byte boundary). Misaligned access may be slower (x86) or crash (ARM, SPARC). The compiler adds padding between struct members to maintain alignment.",
          codeExample: `// Without padding: char(1) + int(4) = 5 bytes\n// With padding:    char(1) + pad(3) + int(4) = 8 bytes\ntypedef struct {\n    char a;    // offset 0\n    // 3 bytes padding\n    int b;     // offset 4\n    char c;    // offset 8\n    // 3 bytes padding\n} S;          // sizeof(S) = 12, not 6!`,
        },
        {
          heading: "Using offsetof and #pragma pack",
          content:
            "offsetof(type, member) from <stddef.h> shows the byte offset of a member. #pragma pack(1) forces 1-byte alignment (no padding), useful for network protocols and file formats that need compact layout.",
          codeExample: `#include <stddef.h>\n#include <stdio.h>\n\ntypedef struct { char a; int b; } S;\nprintf("a at %zu, b at %zu, size %zu\\n",\n    offsetof(S, a), offsetof(S, b), sizeof(S));\n\n#pragma pack(1)\ntypedef struct { char a; int b; } Packed;\nprintf("Packed size: %zu\\n\", sizeof(Packed));`,
        },
        {
          heading: "Cache Line Awareness",
          content:
            "Modern CPUs load data in cache lines (typically 64 bytes). Adjacent data in the same cache line is fast; jumping across lines causes a cache miss. Arrange structs with frequently-accessed members together for performance.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stddef.h>\n\ntypedef struct { char a; int b; char c; } Normal;\n#pragma pack(1)\ntypedef struct { char a; int b; char c; } Packed;\n\nint main(void) {\n    printf("Normal:  offset a=%zu b=%zu c=%zu size=%zu\\n",\n        offsetof(Normal,a), offsetof(Normal,b), offsetof(Normal,c), sizeof(Normal));\n    printf("Packed:  offset a=%zu b=%zu c=%zu size=%zu\\n",\n        offsetof(Packed,a), offsetof(Packed,b), offsetof(Packed,c), sizeof(Packed));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d31-q1", type: "quiz", title: "Padding Purpose",
        description: "Understanding why padding exists",
        question: "Why does the compiler add padding between struct members?",
        options: [
          { id: "a", text: "To waste memory for security", correct: false },
          { id: "b", text: "To align members to their natural boundaries for efficient access", correct: true },
          { id: "c", text: "To make the struct look larger", correct: false },
          { id: "d", text: "To store metadata", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d31-q2", type: "quiz", title: "Pragma Pack",
        description: "Understanding packing",
        question: "What does '#pragma pack(1)' do?",
        options: [
          { id: "a", text: "Packs structs tighter by removing all padding", correct: true },
          { id: "b", text: "Adds more padding for safety", correct: false },
          { id: "c", text: "Makes the struct 1 byte total", correct: false },
          { id: "d", text: "Packs the struct into a union", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d31-c1", type: "code", title: "Struct Optimizer",
        description: "Reorder struct members to minimize padding",
        starterCode: `#include <stdio.h>\n#include <stddef.h>\n\n/* TODO: reorder these members to minimize size */\ntypedef struct {\n    char c1;\n    int i1;\n    char c2;\n    double d1;\n    char c3;\n} BadOrder;\n\nint main(void) {\n    printf("sizeof(BadOrder) = %zu\\n\", sizeof(BadOrder));\n    return 0;\n}`,
        hints: ["Group same-size members together", "Place larger members first", "Put all chars together"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d31-a1", title: "Alignment Analyzer",
      description: "Write a program that analyzes and reports struct alignment",
      requirements: [
        "Define 3 structs with different member orders",
        "Print offset of each member using offsetof",
        "Print total sizeof each struct",
        "Suggest an optimal reordering",
        "Show the effect of #pragma pack(1)",
      ],
      starterCode: `#include <stdio.h>\n#include <stddef.h>\n\nvoid analyze(const char *name, size_t size, size_t offsets[], const char *members[], int count) {\n    printf("=== %s (size: %zu) ===\\n", name, size);\n    for (int i = 0; i < count; i++)\n        printf("  %s at %zu\\n", members[i], offsets[i]);\n}\n\nint main(void) {\n    /* TODO: define structs and analyze */\n    return 0;\n}`,
      rubric: [
        { criterion: "3 structs defined", points: 20 },
        { criterion: "offsetof used correctly", points: 25 },
        { criterion: "sizeof printed", points: 15 },
        { criterion: "Optimal reordering suggested", points: 20 },
        { criterion: "pragma pack demonstrated", points: 20 },
      ],
      xpReward: 100,
    },
  },

  32: {
    title: "Hash Table",
    subtitle: "Key-value storage with hash functions and collision handling",
    tags: ["hash-table", "data-structures", "dictionary"],
    theory: {
      sections: [
        {
          heading: "Hash Table Concepts",
          content:
            "A hash table maps keys to values using a hash function that computes an index into an array. The ideal is O(1) average lookup. Collisions happen when two keys hash to the same index — handled via chaining (linked list at each bucket) or open addressing.",
          codeExample: `#define TABLE_SIZE 100\n\ntypedef struct Entry {\n    char *key;\n    int value;\n    struct Entry *next;\n} Entry;\n\ntypedef struct {\n    Entry *buckets[TABLE_SIZE];\n} HashTable;`,
        },
        {
          heading: "Hash Function (djb2)",
          content:
            "A good hash function distributes keys uniformly. The djb2 algorithm by Dan Bernstein is simple and effective: start with 5381, multiply by 33 and add each character. For strings, this gives reasonable distribution.",
          codeExample: `unsigned long hash(const char *str) {\n    unsigned long h = 5381;\n    int c;\n    while ((c = *str++))\n        h = ((h << 5) + h) + c;  // h * 33 + c\n    return h % TABLE_SIZE;\n}`,
        },
        {
          heading: "Insert and Lookup with Chaining",
          content:
            "To insert: compute hash, append to the linked list at that bucket. To lookup: compute hash, search the linked list. To delete: find and remove from the linked list. Performance degrades when chains get long — resize the table (rehash) when load factor exceeds threshold.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define SIZE 10\n\ntypedef struct Entry {\n    char *key; int val;\n    struct Entry *next;\n} Entry;\n\nEntry *table[SIZE];\n\nunsigned long hash(const char *s) {\n    unsigned long h = 5381;\n    while (*s) h = ((h << 5) + h) + *s++;\n    return h % SIZE;\n}\n\nvoid put(const char *k, int v) {\n    int idx = hash(k);\n    Entry *e = malloc(sizeof(Entry));\n    e->key = strdup(k); e->val = v; e->next = table[idx];\n    table[idx] = e;\n}\n\nint get(const char *k) {\n    for (Entry *e = table[hash(k)]; e; e = e->next)\n        if (strcmp(e->key, k) == 0) return e->val;\n    return -1;\n}\n\nint main(void) {\n    put("alice", 42);\n    put("bob", 77);\n    printf("alice: %d\\n", get("alice"));\n    printf("charlie: %d\\n", get("charlie"));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d32-q1", type: "quiz", title: "Hash Collision",
        description: "Understanding collisions",
        question: "What is a hash collision?",
        options: [
          { id: "a", text: "When the hash table is full", correct: false },
          { id: "b", text: "When two keys produce the same hash index", correct: true },
          { id: "c", text: "When the hash function fails", correct: false },
          { id: "d", text: "When a key is NULL", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d32-q2", type: "quiz", title: "Chaining",
        description: "Understanding collision resolution",
        question: "In chaining, how are collisions handled?",
        options: [
          { id: "a", text: "By moving to the next empty slot", correct: false },
          { id: "b", text: "Each bucket has a linked list of entries", correct: true },
          { id: "c", text: "By doubling the table size", correct: false },
          { id: "d", text: "By replacing the old key", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d32-c1", type: "code", title: "Hash Table Delete",
        description: "Implement delete function for the hash table",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h.h>\n\n#define SIZE 10\n\ntypedef struct Entry { char *key; int val; struct Entry *next; } Entry;\nEntry *table[SIZE];\n\nunsigned long hash(const char *s) {\n    unsigned long h = 5381;\n    while (*s) h = ((h << 5) + h) + *s++;\n    return h % SIZE;\n}\n\nvoid put(const char *k, int v) {\n    int idx = hash(k);\n    Entry *e = malloc(sizeof(Entry));\n    e->key = strdup(k); e->val = v; e->next = table[idx];\n    table[idx] = e;\n}\n\nint delete_key(const char *k) {\n    /* TODO: remove entry with key k, return 1 if found */\n}\n\nint main(void) {\n    put("a", 1); put("b", 2);\n    printf("delete a: %d\\n", delete_key("a"));\n    printf("delete a: %d\\n", delete_key("a"));  // should be 0\n    return 0;\n}`,
        hints: ["Walk the chain tracking prev pointer", "Unlink and free the matching node"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d32-a1", title: "Word Frequency Counter",
      description: "Use a hash table to count word frequencies in a text",
      requirements: [
        "Read a string of text (hardcoded or simple input)",
        "Split into words (space-delimited)",
        "Count each word's frequency using a hash table",
        "Print all words and their counts",
        "Handle at least 10 different words",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define SIZE 50\n\ntypedef struct Entry { char *word; int count; struct Entry *next; } Entry;\nEntry *table[SIZE];\n\nunsigned long hash(const char *s) {\n    unsigned long h = 5381;\n    while (*s) h = ((h << 5) + h) + *s++;\n    return h % SIZE;\n}\n\nvoid increment(const char *word) {\n    /* TODO: find or create entry, increment count */\n}\n\nvoid print_all(void) {\n    /* TODO: print all words and counts */\n}\n\nint main(void) {\n    const char *text = "the quick brown fox jumps over the lazy dog the fox";\n    /* TODO: split text, increment counts */\n    print_all();\n    return 0;\n}`,
      rubric: [
        { criterion: "Hash table insert/lookup works", points: 30 },
        { criterion: "Word splitting correct", points: 20 },
        { criterion: "Counts are accurate", points: 25 },
        { criterion: "All words printed", points: 25 },
      ],
      xpReward: 100,
    },
  },

  33: {
    title: "Binary Trees",
    subtitle: "Hierarchical data structures for fast search and traversal",
    tags: ["trees", "data-structures", "binary-tree"],
    theory: {
      sections: [
        {
          heading: "Tree Structure",
          content:
            "A binary tree consists of nodes with a value, a left child, and a right child. Each node has at most two children. The top node is the root. Nodes with no children are leaves. Binary trees enable O(log n) search when balanced.",
          codeExample: `typedef struct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n} TreeNode;\n\nTreeNode *create(int val) {\n    TreeNode *n = malloc(sizeof(TreeNode));\n    n->val = val;\n    n->left = n->right = NULL;\n    return n;\n}`,
        },
        {
          heading: "Inorder, Preorder, Postorder",
          content:
            "Inorder (left, root, right) gives sorted order for BSTs. Preorder (root, left, right) copies tree structure. Postorder (left, right, root) deletes children before parent. Each traversal has distinct use cases.",
          codeExample: `void inorder(TreeNode *n) {\n    if (!n) return;\n    inorder(n->left);\n    printf("%d ", n->val);\n    inorder(n->right);\n}\n\nvoid preorder(TreeNode *n) {\n    if (!n) return;\n    printf("%d ", n->val);\n    preorder(n->left);\n    preorder(n->right);\n}`,
        },
        {
          heading: "Binary Search Trees (BST)",
          content:
            "A BST maintains the invariant: all left descendants are less than the node, all right descendants are greater. This enables efficient search, insertion, and deletion. Without balancing, a BST can degenerate to O(n).",
          codeExample: `TreeNode *insert(TreeNode *root, int val) {\n    if (!root) return create(val);\n    if (val < root->val)\n        root->left = insert(root->left, val);\n    else if (val > root->val)\n        root->right = insert(root->right, val);\n    return root;\n}\n\nint search(TreeNode *root, int val) {\n    if (!root) return 0;\n    if (val == root->val) return 1;\n    return val < root->val\n        ? search(root->left, val)\n        : search(root->right, val);\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TN { int val; struct TN *left, *right; } TN;\n\nTN *create(int v) { TN *n = malloc(sizeof(TN)); n->val = v; n->left = n->right = NULL; return n; }\n\nTN *insert(TN *r, int v) {\n    if (!r) return create(v);\n    if (v < r->val) r->left = insert(r->left, v);\n    else r->right = insert(r->right, v);\n    return r;\n}\n\nvoid inorder(TN *r) { if (!r) return; inorder(r->left); printf("%d ", r->val); inorder(r->right); }\n\nint main(void) {\n    TN *root = NULL;\n    root = insert(root, 5);\n    insert(root, 3); insert(root, 7);\n    insert(root, 2); insert(root, 4);\n    inorder(root); printf("\\n");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d33-q1", type: "quiz", title: "BST Property",
        description: "Understanding BST invariant",
        question: "In a BST, where do values greater than the root go?",
        options: [
          { id: "a", text: "Left subtree", correct: false },
          { id: "b", text: "Right subtree", correct: true },
          { id: "c", text: "Same node", correct: false },
          { id: "d", text: "Anywhere", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d33-q2", type: "quiz", title: "Tree Height",
        description: "Understanding tree balance",
        question: "What is the worst-case time complexity of search in an unbalanced BST?",
        options: [
          { id: "a", text: "O(log n)", correct: false },
          { id: "b", text: "O(n)", correct: true },
          { id: "c", text: "O(1)", correct: false },
          { id: "d", text: "O(n²)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d33-c1", type: "code", title: "Tree Height",
        description: "Write a recursive function to compute tree height",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TN { int val; struct TN *left, *right; } TN;\n\nTN *create(int v) { TN *n = malloc(sizeof(TN)); n->val = v; n->left = n->right = NULL; return n; }\n\nint height(TN *root) {\n    /* TODO: compute tree height */\n}\n\nint main(void) {\n    TN *r = create(1);\n    r->left = create(2); r->right = create(3);\n    r->left->left = create(4);\n    printf("Height: %d\\n\", height(r));\n    return 0;\n}`,
        expectedOutput: "Height: 3",
        hints: ["Base case: NULL -> -1", "Return 1 + max(left, right)"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d33-a1", title: "BST Implementation",
      description: "Implement a full BST with insert, search, delete, min, max, and traversal",
      requirements: [
        "Implement insert, search, find_min, find_max",
        "Implement inorder (sorted) traversal",
        "Implement delete (handle 0, 1, 2 child cases)",
        "Implement free_tree to clean up memory",
        "Test with at least 10 nodes",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TN { int val; struct TN *left, *right; } TN;\n\nTN *insert(TN *r, int v) {\n    if (!r) { TN *n = malloc(sizeof(TN)); n->val = v; n->left = n->right = NULL; return n; }\n    if (v < r->val) r->left = insert(r->left, v);\n    else r->right = insert(r->right, v);\n    return r;\n}\n\n/* TODO: implement search, min, max, delete, free */\nvoid inorder(TN *r) { if (r) { inorder(r->left); printf("%d ", r->val); inorder(r->right); } }\n\nint main(void) {\n    TN *root = NULL;\n    int vals[] = {8, 3, 10, 1, 6, 14, 4, 7, 13};\n    for (int i = 0; i < 9; i++) root = insert(root, vals[i]);\n    inorder(root); printf("\\n\");\n    /* TODO: test other operations */\n    return 0;\n}`,
      rubric: [
        { criterion: "Insert works", points: 20 },
        { criterion: "Search works", points: 20 },
        { criterion: "Delete works (all cases)", points: 30 },
        { criterion: "Min/max and traversal work", points: 15 },
        { criterion: "Memory freed", points: 15 },
      ],
      xpReward: 100,
    },
  },

  34: {
    title: "Makefile Basics",
    subtitle: "Automating builds with make and dependency tracking",
    tags: ["make", "build", "automation"],
    theory: {
      sections: [
        {
          heading: "Why Make?",
          content:
            "Make automates compilation. Instead of typing gcc commands, you define targets, dependencies, and recipes in a Makefile. Make rebuilds only what's changed by comparing timestamps. Essential for any multi-file C project.",
          codeExample: `# Simple Makefile\nCC = gcc\nCFLAGS = -Wall -Wextra -std=c11\n\nmain: main.o utils.o\n\t$(CC) $(CFLAGS) -o main main.o utils.o\n\nmain.o: main.c utils.h\n\t$(CC) $(CFLAGS) -c main.c\n\nutils.o: utils.c utils.h\n\t$(CC) $(CFLAGS) -c utils.c\n\n.PHONY: clean\nclean:\n\trm -f *.o main`,
        },
        {
          heading: "Makefile Syntax",
          content:
            "A rule has three parts: target (what to build), prerequisites (what it depends on), and recipe (commands to build it). The recipe lines must start with a TAB character (not spaces!). Variables (CC, CFLAGS) reduce duplication.",
        },
        {
          heading: "Pattern Rules and Automatic Variables",
          content:
            "Pattern rules use % as a wildcard: %.o: %.c. Automatic variables like $@ (target), $< (first prerequisite), $^ (all prerequisites) simplify recipes. A well-written Makefile uses pattern rules to avoid repetitive rules for each file.",
          codeExample: `CC = gcc\nCFLAGS = -Wall -Wextra\n\n%.o: %.c $(HEADERS)\n\t$(CC) $(CFLAGS) -c $< -o $@\n\nmain: main.o utils.o\n\t$(CC) $(CFLAGS) $^ -o $@`,
        },
      ],
    },
    playground: {
      defaultCode: `// Makefiles are build configuration files.\n// This playground shows a simulated build.\n#include <stdio.h>\n\nint main(void) {\n    printf("Makefiles automate compilation\\n\");\n    printf("Targets: what to build\\n\");\n    printf("Prerequisites: what's needed\\n\");\n    printf("Recipes: how to build it\\n\");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d34-q1", type: "quiz", title: "Make Target",
        description: "Understanding make targets",
        question: "In 'target: prereq\\n\\tcommand', what is 'target'?",
        options: [
          { id: "a", text: "A shell command to run", correct: false },
          { id: "b", text: "The file to build (or phony name)", correct: true },
          { id: "c", text: "A variable", correct: false },
          { id: "d", text: "A comment", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d34-q2", type: "quiz", title: "Make Tab",
        description: "Understanding recipe syntax",
        question: "What character must prefix recipe lines in a Makefile?",
        options: [
          { id: "a", text: "Spaces (4 spaces)", correct: false },
          { id: "b", text: "TAB character", correct: true },
          { id: "c", text: "> (greater-than)", correct: false },
          { id: "d", text: "No prefix needed", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d34-c1", type: "code", title: "Makefile Simulation",
        description: "Write a C program that simulates a multi-file build process",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    printf("=== Makefile Simulation ===\\n\");\n    /* TODO: print what each make target would do */\n    // Target: main\n    //   depends on: main.o, utils.o\n    //   command: gcc -o main main.o utils.o\n    return 0;\n}`,
        hints: ["Print a structured build log", "Show dependency chain"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d34-a1", title: "Makefile Generator",
      description: "Write a C program that generates a Makefile for a given set of source files",
      requirements: [
        "Take an array of source file names (.c)",
        "Derive .o filenames from source names",
        "Generate a Makefile with pattern rules",
        "Include CC, CFLAGS variables",
        "Add a clean target",
      ],
      starterCode: `#include <stdio.h>\n\nvoid generate_makefile(const char *sources[], int count) {\n    printf("# Generated Makefile\\n\");\n    printf("CC = gcc\\n\");\n    printf("CFLAGS = -Wall -Wextra -std=c11\\n\\n\");\n    /* TODO: generate rules */\n}\n\nint main(void) {\n    const char *srcs[] = {"main.c", "utils.c", "parser.c"};\n    generate_makefile(srcs, 3);\n    return 0;\n}`,
      rubric: [
        { criterion: "CC/CFLAGS variables", points: 15 },
        { criterion: "Pattern rule for .c -> .o", points: 30 },
        { criterion: "Link target with all .o files", points: 25 },
        { criterion: "Clean target", points: 15 },
        { criterion: "Derives .o names from .c names", points: 15 },
      ],
      xpReward: 100,
    },
  },

  35: {
    title: "Debugging with GDB",
    subtitle: "Breakpoints, watchpoints, backtraces, and memory inspection",
    tags: ["gdb", "debugging", "tooling"],
    theory: {
      sections: [
        {
          heading: "Compiling for Debugging",
          content:
            "Compile with -g flag to include debug symbols: gcc -g -O0 program.c -o program. -O0 disables optimization so variable values match source code exactly. Without -g, GDB shows raw assembly instead of source lines.",
          codeExample: `# Compile with debug info:\n# gcc -g -O0 -o program program.c\n#\n# Start GDB:\n# gdb ./program\n#\n# Common GDB commands:\n# (gdb) break main        — set breakpoint\n# (gdb) run               — start program\n# (gdb) next              — step over\n# (gdb) step              — step into\n# (gdb) print x           — print variable\n# (gdb) backtrace         — show call stack\n# (gdb) info locals       — show local vars\n# (gdb) continue          — resume execution\n# (gdb) quit              — exit`,
        },
        {
          heading: "Breakpoints and Watchpoints",
          content:
            "break sets a breakpoint at a function or line. watch monitors a variable for changes. Conditional breakpoints (break if x > 10) stop only when a condition is true. delete removes breakpoints.",
        },
        {
          heading: "Inspecting Memory and Crashes",
          content:
            "When a program crashes, GDB catches the signal. Use backtrace to see the call chain. print *ptr shows what a pointer points to. x/10x addr examines raw memory in hex. frame N switches to a different call frame.",
        },
      ],
    },
    playground: {
      defaultCode: `// GDB debugging concepts\n// Compile: gcc -g -O0 -o debug_example debug_example.c\n// Run: gdb ./debug_example\n#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main(void) {\n    int x = 5;\n    int result = factorial(x);\n    printf("factorial(%d) = %d\\n\", x, result);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d35-q1", type: "quiz", title: "GDB Flag",
        description: "Compiling for debugging",
        question: "Which compiler flag adds debug symbols for GDB?",
        options: [
          { id: "a", text: "-O2", correct: false },
          { id: "b", text: "-g", correct: true },
          { id: "c", text: "-Wall", correct: false },
          { id: "d", text: "-o", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d35-q2", type: "quiz", title: "Backtrace",
        description: "Understanding call stacks",
        question: "What GDB command shows the current call stack?",
        options: [
          { id: "a", text: "print stack", correct: false },
          { id: "b", text: "backtrace", correct: true },
          { id: "c", text: "trace", correct: false },
          { id: "d", text: "stack", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d35-c1", type: "code", title: "Bug Finding",
        description: "Find and fix the bug using debugging concepts",
        starterCode: `#include <stdio.h>\n\nint divide(int a, int b) {\n    return a / b;\n}\n\nint main(void) {\n    int nums[] = {10, 20, 0, 40, 50};\n    for (int i = 0; i < 5; i++) {\n        printf("%d / 2 = %d\\n\", nums[i], divide(nums[i], 2));\n    }\n    /* There's a hidden bug - can you spot it? */\n    return 0;\n}`,
        hints: ["Check the array values carefully", "What happens with specific inputs?"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d35-a1", title: "GDB Cheat Sheet Program",
      description: "Write a program with intentional bugs and explain how GDB would catch each",
      requirements: [
        "Write a program with 3 intentional bugs",
        "Bug 1: segmentation fault (NULL dereference)",
        "Bug 2: off-by-one array access",
        "Bug 3: uninitialized variable use",
        "Comment each bug with the GDB commands that would catch it",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    /* Bug 1: NULL dereference */\n    int *p = NULL;\n    // In GDB:\n    // This would crash with SIGSEGV\n    // backtrace shows where it happened\n    // print p shows 0x0\n\n    /* Bug 2: Off-by-one */\n    int arr[3] = {1, 2, 3};\n    // TODO: access arr[3]\n\n    /* Bug 3: Uninitialized */\n    int x;\n    // TODO: use x without initializing\n\n    return 0;\n}`,
      rubric: [
        { criterion: "NULL dereference bug", points: 25 },
        { criterion: "Off-by-one bug", points: 25 },
        { criterion: "Uninitialized variable bug", points: 25 },
        { criterion: "GDB comments explaining detection", points: 25 },
      ],
      xpReward: 100,
    },
  },

  36: {
    title: "Valgrind & Memory Tools",
    subtitle: "Detecting leaks, invalid access, and undefined behavior",
    tags: ["valgrind", "memory", "debugging"],
    theory: {
      sections: [
        {
          heading: "What Valgrind Detects",
          content:
            "Valgrind's Memcheck tool detects: memory leaks (malloc without free), use-after-free, invalid read/write (buffer overflows), mismatched allocation/deallocation, and uninitialized memory reads. It runs your program in a synthetic CPU to track every memory access.",
          codeExample: `# Compile with debug symbols:\n# gcc -g -O0 program.c -o program\n#\n# Run under Valgrind:\n# valgrind --leak-check=full ./program\n#\n# Example output:\n# ==12345== HEAP SUMMARY:\n# ==12345==     in use at exit: 40 bytes in 1 blocks\n# ==12345==   total heap usage: 1 allocs, 0 frees\n# ==12345== LEAK SUMMARY:\n# ==12345==    definitely lost: 40 bytes in 1 blocks`,
        },
        {
          heading: "Common Valgrind Errors",
          content:
            "Invalid write of size 4: writing past the end of an array. Conditional jump depends on uninitialized value: using an uninitialized variable. Definitely lost: memory not freed. Use-after-free: accessing freed heap memory.",
        },
        {
          heading: "Other Memory Tools",
          content:
            "AddressSanitizer (-fsanitize=address) is a compiler-based alternative that's faster than Valgrind. LeakSanitizer finds leaks. UBSan detects undefined behavior. These work at compile time rather than runtime emulation.",
        },
      ],
    },
    playground: {
      defaultCode: `// Valgrind detects memory errors at runtime.\n// This example has intentional bugs for Valgrind to catch.\n#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // Bug 1: Memory leak\n    int *leak = malloc(sizeof(int));\n    *leak = 42;\n    // forgot to free(leak)\n\n    // Bug 2: Invalid write\n    int arr[3];\n    arr[3] = 100;  // out of bounds!\n\n    // Bug 3: Uninitialized\n    int x;\n    if (x > 0) printf("%d\\n\", x);\n\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d36-q1", type: "quiz", title: "Valgrind Detection",
        description: "What Valgrind catches",
        question: "Which of these does Valgrind NOT detect by default?",
        options: [
          { id: "a", text: "Memory leaks", correct: false },
          { id: "b", text: "Buffer overflows", correct: false },
          { id: "c", text: "Logic errors that produce wrong output", correct: true },
          { id: "d", text: "Use-after-free", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d36-q2", type: "quiz", title: "Definitely Lost",
        description: "Understanding Valgrind's leak categories",
        question: "What does 'definitely lost' mean in Valgrind output?",
        options: [
          { id: "a", text: "Memory was freed correctly", correct: false },
          { id: "b", text: "Memory was allocated but never freed, and no pointer to it remains", correct: true },
          { id: "c", text: "The program lost a file handle", correct: false },
          { id: "d", text: "Stack memory was corrupted", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d36-c1", type: "code", title: "Leak Fixer",
        description: "Fix the memory leaks in this program",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nchar *duplicate(const char *s) {\n    char *copy = malloc(strlen(s) + 1);\n    strcpy(copy, s);\n    return copy;\n}\n\nint main(void) {\n    char *names[3];\n    names[0] = duplicate("Alice");\n    names[1] = duplicate("Bob");\n    names[2] = duplicate("Charlie");\n\n    for (int i = 0; i < 3; i++)\n        printf("%s\\n\", names[i]);\n\n    /* TODO: free all allocated memory */\n    return 0;\n}`,
        hints: ["Free each element in a loop", "Don't forget to free after printing"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d36-a1", title: "Memory Bug Hunt",
      description: "Write a program with 4 different memory bugs and document how Valgrind would catch each",
      requirements: [
        "Include: memory leak (malloc without free)",
        "Include: invalid write (buffer overflow)",
        "Include: use-after-free",
        "Include: uninitialized variable read",
        "Comment each bug with expected Valgrind output",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // Bug 1: Memory leak\n    int *p = malloc(sizeof(int));\n    *p = 42;\n    // No free!\n\n    // Bug 2: Out-of-bounds write\n    int arr[3];\n    for (int i = 0; i <= 3; i++)  // off-by-one\n        arr[i] = i * 10;\n\n    // Bug 3: Use after free\n    int *q = malloc(sizeof(int));\n    free(q);\n    *q = 100;  // using freed memory\n\n    // Bug 4: Uninitialized read\n    int x;\n    if (x > 0) printf("positive\\n\");\n\n    return 0;\n}`,
      rubric: [
        { criterion: "Memory leak bug present", points: 20 },
        { criterion: "Buffer overflow bug present", points: 20 },
        { criterion: "Use-after-free bug present", points: 20 },
        { criterion: "Uninitialized read bug present", points: 20 },
        { criterion: "Clear comments/documentation", points: 20 },
      ],
      xpReward: 100,
    },
  },

  37: {
    title: "Multi-file Projects",
    subtitle: "Building modular C applications with multiple source files",
    tags: ["projects", "modular", "organization"],
    theory: {
      sections: [
        {
          heading: "Project Organization",
          content:
            "A well-organized C project separates concerns into modules. Typically: src/ for source files, include/ for headers, tests/ for test files. Each module has a .h (interface) and .c (implementation). A Makefile ties everything together.",
          codeExample: `# Project structure:\n# project/\n# ├── include/\n# │   └── calc.h\n# ├── src/\n# │   ├── main.c\n# │   ├── calc.c\n# │   └── utils.c\n# ├── Makefile\n# └── README\n#\n# Compile:\n# gcc -Iinclude -c src/main.c -o obj/main.o\n# gcc -Iinclude -c src/calc.c -o obj/calc.o\n# gcc obj/*.o -o bin/program`,
        },
        {
          heading: "Static Libraries (.a)",
          content:
            "A static library archives multiple .o files into one .a file. ar rcs libcalc.a calc.o utils.o creates the library. Link with -L. -lcalc. Static libraries are copied into the final executable at link time.",
        },
        {
          heading: "Header Dependencies",
          content:
            "Each .c file includes its own header (for type checking) and any other headers it needs. Headers include only what's necessary — minimize transitive includes. Use forward declarations for structs when possible to reduce coupling.",
        },
      ],
    },
    playground: {
      defaultCode: `// Multi-file project simulation\n#include <stdio.h>\n\n// Simulating calc.h\nint add(int a, int b);\nint mul(int a, int b);\n\n// Simulating calc.c\nint add(int a, int b) { return a + b; }\nint mul(int a, int b) { return a * b; }\n\n// Simulating main.c\nint main(void) {\n    printf("add(3,4) = %d\\n\", add(3,4));\n    printf("mul(3,4) = %d\\n\", mul(3,4));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d37-q1", type: "quiz", title: "Module Pattern",
        description: "Understanding modular organization",
        question: "In a C project, what goes in a .h file?",
        options: [
          { id: "a", text: "Implementation details", correct: false },
          { id: "b", text: "Declarations (function prototypes, type definitions)", correct: true },
          { id: "c", text: "The main() function", correct: false },
          { id: "d", text: "Makefile rules", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d37-q2", type: "quiz", title: "Static Library",
        description: "Understanding library creation",
        question: "What command creates a static library from object files?",
        options: [
          { id: "a", text: "gcc -shared -o lib.a files.o", correct: false },
          { id: "b", text: "ar rcs lib.a files.o", correct: true },
          { id: "c", text: "ld -o lib.a files.o", correct: false },
          { id: "d", text: "make lib.a", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d37-c1", type: "code", title: "Module Simulation",
        description: "Simulate a multi-file project with #include and modular functions",
        starterCode: `#include <stdio.h>\n\n// Simulate stack.h\ntypedef struct { int data[100]; int top; } Stack;\nvoid push(Stack *s, int v);\nint pop(Stack *s);\n\n// Simulate stack.c\nvoid push(Stack *s, int v) { s->data[++s->top] = v; }\nint pop(Stack *s) { return s->data[s->top--]; }\n\nint main(void) {\n    /* TODO: use the stack module */\n    return 0;\n}`,
        hints: ["Initialize stack.top = -1", "Push some values, then pop and print them"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d37-a1", title: "Module Library",
      description: "Design a small library with 3 modules and show how they connect",
      requirements: [
        "Design modules: math_utils (add, sub, mul, div), string_utils (reverse, upper), file_utils (read_line, write_line)",
        "Show header file contents with include guards",
        "Show implementation file contents",
        "Show main.c using all modules",
        "Show a Makefile to build everything",
      ],
      starterCode: `#include <stdio.h>\n\n// math_utils.h simulation\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\n/* TODO: declare math functions */\n#endif\n\n// string_utils.h simulation\n#ifndef STRING_UTILS_H\n#define STRING_UTILS_H\n/* TODO: declare string functions */\n#endif\n\n// main.c simulation\nint main(void) {\n    /* TODO: use functions from both modules */\n    return 0;\n}`,
      rubric: [
        { criterion: "3 modules designed", points: 25 },
        { criterion: "Include guards present", points: 20 },
        { criterion: "Headers declare, implementations define", points: 25 },
        { criterion: "Makefile included", points: 30 },
      ],
      xpReward: 100,
    },
  },

  38: {
    title: "Socket Programming Intro",
    subtitle: "Network communication — sockets, bind, listen, accept",
    tags: ["sockets", "networking", "TCP"],
    theory: {
      sections: [
        {
          heading: "Socket API Overview",
          content:
            "Sockets are the Unix/Linux API for network communication. socket() creates an endpoint. bind() assigns an address. listen() makes it a passive socket. accept() accepts incoming connections. connect() connects to a remote server. read()/write() exchange data.",
          codeExample: `// Server flow:\nint server_fd = socket(AF_INET, SOCK_STREAM, 0);\nstruct sockaddr_in addr = {0};\naddr.sin_family = AF_INET;\naddr.sin_port = htons(8080);\naddr.sin_addr.s_addr = INADDR_ANY;\n\nbind(server_fd, (struct sockaddr*)&addr, sizeof(addr));\nlisten(server_fd, 5);\nint client_fd = accept(server_fd, NULL, NULL);\n\n// Client flow:\nint sock = socket(AF_INET, SOCK_STREAM, 0);\nconnect(sock, (struct sockaddr*)&addr, sizeof(addr));`,
        },
        {
          heading: "TCP Client-Server Model",
          content:
            "TCP provides reliable, ordered, bidirectional byte streams. The server binds to a well-known port and listens. The client connects to the server's address and port. Data flows over the established connection. close() terminates.",
        },
        {
          heading: "Byte Ordering",
          content:
            "Network byte order is big-endian. htons() converts short from host to network, htonl() for long. ntohs()/ntohl() convert back. POSIX requires these conversions for portability across different CPU architectures.",
        },
      ],
    },
    playground: {
      defaultCode: `// Socket programming concepts\n// Full socket code requires POSIX/Unix headers\n// This demonstrates the conceptual flow\n#include <stdio.h>\n\nint main(void) {\n    printf("=== Socket Programming Flow ===\\n\");\n    printf("SERVER:\\n\");\n    printf("1. socket()  - create endpoint\\n\");\n    printf("2. bind()    - assign address\\n\");\n    printf("3. listen()  - wait for clients\\n\");\n    printf("4. accept()  - accept connection\\n\");\n    printf("5. read/write - exchange data\\n\");\n    printf("6. close()   - cleanup\\n\");\n    printf("\\nCLIENT:\\n\");\n    printf("1. socket()  - create endpoint\\n\");\n    printf("2. connect() - connect to server\\n\");\n    printf("3. read/write - exchange data\\n\");\n    printf("4. close()   - cleanup\\n\");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d38-q1", type: "quiz", title: "Socket Function",
        description: "Understanding socket creation",
        question: "What is the first function called to create a network socket?",
        options: [
          { id: "a", text: "bind()", correct: false },
          { id: "b", text: "socket()", correct: true },
          { id: "c", text: "listen()", correct: false },
          { id: "d", text: "accept()", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d38-q2", type: "quiz", title: "Port Numbers",
        description: "Understanding network ports",
        question: "What is htons() used for?",
        options: [
          { id: "a", text: "Converting string to int", correct: false },
          { id: "b", text: "Converting port to network byte order", correct: true },
          { id: "c", text: "Hashing the socket address", correct: false },
          { id: "d", text: "Setting socket timeout", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d38-c1", type: "code", title: "Socket Flow Simulation",
        description: "Simulate the socket API call sequence with print statements",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    /* TODO: print a simulated socket communication */\n    printf("=== Echo Server Simulation ===\\n\");\n    return 0;\n}`,
        hints: ["Show both server and client side", "Include address/port info", "Show data flow"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d38-a1", title: "Socket API Reference",
      description: "Write a program that provides a structured reference for the socket API",
      requirements: [
        "Print a formatted reference for: socket, bind, listen, accept, connect, send, recv, close",
        "For each function: signature, purpose, parameters, return value",
        "Include a diagram of the client-server flow (ASCII art)",
        "Include the TCP handshake explanation",
        "Note platform differences (Unix vs Windows)",
      ],
      starterCode: `#include <stdio.h>\n\nvoid print_api(const char *name, const char *sig, const char *purpose) {\n    printf("\\n=== %s ===\\n\", name);\n    printf("Signature: %s\\n\", sig);\n    printf("Purpose: %s\\n\", purpose);\n}\n\nint main(void) {\n    print_api("socket", "int socket(int domain, int type, int protocol)",\n             "Create an endpoint for communication\");\n    /* TODO: add more socket API entries */\n    return 0;\n}`,
      rubric: [
        { criterion: "All 8 socket functions covered", points: 30 },
        { criterion: "Client-server flow diagram", points: 25 },
        { criterion: "Accurate signatures", points: 25 },
        { criterion: "TCP handshake explanation", points: 20 },
      ],
      xpReward: 100,
    },
  },

  39: {
    title: "Signals",
    subtitle: "Inter-process communication via Unix signals",
    tags: ["signals", "IPC", "systems"],
    theory: {
      sections: [
        {
          heading: "What Are Signals?",
          content:
            "Signals are asynchronous notifications sent to a process. The OS can send signals for errors (SIGSEGV — segmentation fault), termination requests (SIGINT — Ctrl+C, SIGTERM), and user-defined communication (SIGUSR1, SIGUSR2). A process can ignore, catch, or let the default action handle each signal.",
          codeExample: `#include <signal.h>\n#include <stdio.h>\n\nvoid handler(int sig) {\n    printf("Caught signal %d\\n\", sig);\n}\n\nint main(void) {\n    signal(SIGINT, handler);  // catch Ctrl+C\n    printf("Press Ctrl+C...\\n\");\n    while(1);  // wait\n    return 0;\n}`,
        },
        {
          heading: "Sending Signals",
          content:
            "raise() sends a signal to the current process. kill(pid, sig) sends to another process (if you have permission). SIGKILL (9) kills a process — it cannot be caught or ignored. SIGSTOP (19) pauses a process.",
          codeExample: `// From shell:\n// kill -SIGUSR1 1234\n// kill -9 1234    // force kill\n//\n// In code:\n// raise(SIGUSR1);       // to self\n// kill(other_pid, SIGTERM);  // to another`,
        },
        {
          heading: "Signal Safety",
          content:
            "Signal handlers should do very little — set a volatile sig_atomic_t flag and return. printf() inside a handler is unsafe (not async-signal-safe). Use write() to a file descriptor instead. Modern code uses signalfd() or sigaction() for better control.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <signal.h>\n\nvolatile sig_atomic_t flag = 0;\n\nvoid handler(int sig) {\n    flag = 1;  // safe: just set a flag\n}\n\nint main(void) {\n    signal(SIGINT, handler);\n    printf("Press Ctrl+C to set flag...\\n\");\n    while (!flag) {\n        // do work\n    }\n    printf("\\nFlag detected! Exiting gracefully.\\n\");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d39-q1", type: "quiz", title: "Uncatchable Signal",
        description: "Understanding signal limitations",
        question: "Which signal CANNOT be caught or ignored?",
        options: [
          { id: "a", text: "SIGINT", correct: false },
          { id: "b", text: "SIGTERM", correct: false },
          { id: "c", text: "SIGKILL", correct: true },
          { id: "d", text: "SIGUSR1", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d39-q2", type: "quiz", title: "Signal Handler Safety",
        description: "Understanding async-signal-safety",
        question: "Which operation is generally safe inside a signal handler?",
        options: [
          { id: "a", text: "Calling printf()", correct: false },
          { id: "b", text: "Setting a volatile sig_atomic_t flag", correct: true },
          { id: "c", text: "Calling malloc()", correct: false },
          { id: "d", text: "Calling free()", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d39-c1", type: "code", title: "Signal Handler",
        description: "Set up handlers for SIGINT and SIGTERM, print a message for each",
        starterCode: `#include <stdio.h>\n#include <signal.h>\n#include <unistd.h>\n\n/* TODO: create handlers */\n\nint main(void) {\n    /* TODO: register handlers */\n    printf("PID: %d\\n\", getpid());\n    printf("Send SIGINT or SIGTERM to quit\\n\");\n    while(1) pause();\n    return 0;\n}`,
        hints: ["signal(SIGINT, handler);", "signal(SIGTERM, handler);", "Use different messages per signal"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d39-a1", title: "Graceful Shutdown",
      description: "Write a program that handles shutdown signals gracefully, cleaning up resources",
      requirements: [
        "Allocate some resources (simulated with a counter)",
        "Handle SIGINT and SIGTERM to clean up",
        "Print a cleanup message and free simulated resources",
        "Use volatile sig_atomic_t for the shutdown flag",
        "Main loop checks the flag and exits cleanly",
      ],
      starterCode: `#include <stdio.h>\n#include <signal.h>\n\nvolatile sig_atomic_t shutdown_flag = 0;\n\nvoid handler(int sig) {\n    shutdown_flag = 1;\n}\n\nint main(void) {\n    signal(SIGINT, handler);\n    signal(SIGTERM, handler);\n\n    int resources = 100;\n    printf("Program running with %d resources...\\n\", resources);\n    printf("Press Ctrl+C to shutdown\\n\");\n\n    while (!shutdown_flag) {\n        /* simulate work */\n    }\n\n    printf("\\nShutting down...\\n\");\n    /* TODO: add cleanup code */\n    printf("Resources freed. Goodbye!\\n\");\n    return 0;\n}`,
      rubric: [
        { criterion: "SIGINT and SIGTERM handled", points: 25 },
        { criterion: "volatile sig_atomic_t used", points: 20 },
        { criterion: "Cleanup code runs on signal", points: 30 },
        { criterion: "Program exits gracefully", points: 25 },
      ],
      xpReward: 100,
    },
  },

  40: {
    title: "Process Management",
    subtitle: "fork, exec, wait — creating and managing processes",
    tags: ["process", "fork", "systems"],
    theory: {
      sections: [
        {
          heading: "Process Creation with fork()",
          content:
            "fork() creates a new process by duplicating the calling process. The child gets a copy of the parent's memory, file descriptors, and execution state. The only difference: fork() returns 0 to the child and the child's PID to the parent.",
          codeExample: `#include <unistd.h>\n#include <stdio.h>\n\npid_t pid = fork();\nif (pid == 0) {\n    // Child process\n    printf("Child: PID = %d\\n\", getpid());\n} else if (pid > 0) {\n    // Parent process\n    printf("Parent: child PID = %d\\n\", pid);\n} else {\n    perror("fork failed\");\n}`,
        },
        {
          heading: "Executing New Programs with exec()",
          content:
            "The exec family (execl, execv, execvp, etc.) replaces the current process with a new program. The process ID stays the same, but code, data, and stack are replaced. fork() + exec() is the Unix way to start a new program.",
          codeExample: `pid_t pid = fork();\nif (pid == 0) {\n    // Child runs a different program\n    execlp("/bin/ls", "ls", "-l", NULL);\n    perror("exec failed\");  // only reached on error\n    exit(1);\n}\n// Parent continues with original program\nwait(NULL);  // wait for child`,
        },
        {
          heading: "Waiting with wait() and waitpid()",
          content:
            "wait() blocks until any child exits. waitpid(pid, &status, options) waits for a specific child. The status encodes exit code, signal info. Use WIFEXITED, WEXITSTATUS, WIFSIGNALED macros to interpret.",
          codeExample: `int status;\npid_t child = wait(&status);\nif (WIFEXITED(status)) {\n    printf("Child %d exited with %d\\n\",\n        child, WEXITSTATUS(status));\n} else if (WIFSIGNALED(status)) {\n    printf("Child killed by signal %d\\n\",\n        WTERMSIG(status));\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint main(void) {\n    pid_t pid = fork();\n\n    if (pid == 0) {\n        printf("Child: hello from child! PID=%d\\n\", getpid());\n        return 42;\n    } else if (pid > 0) {\n        printf("Parent: child has PID %d. Waiting...\\n\", pid);\n        int status;\n        wait(&status);\n        printf("Parent: child exited with %d\\n\", WEXITSTATUS(status));\n    } else {\n        perror("fork\");\n    }\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d40-q1", type: "quiz", title: "fork Return",
        description: "Understanding fork's return values",
        question: "What does fork() return to the child process?",
        options: [
          { id: "a", text: "The parent's PID", correct: false },
          { id: "b", text: "0", correct: true },
          { id: "c", text: "The child's PID", correct: false },
          { id: "d", text: "-1 on success", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d40-q2", type: "quiz", title: "exec Behavior",
        description: "Understanding exec",
        question: "What does exec() do to the calling process?",
        options: [
          { id: "a", text: "Creates a new process", correct: false },
          { id: "b", text: "Replaces the current process with a new program", correct: true },
          { id: "c", text: "Spawns a thread", correct: false },
          { id: "d", text: "Exits the current process", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d40-c1", type: "code", title: "Fork Tree",
        description: "Create a parent and child, both print their PIDs and parent PIDs",
        starterCode: `#include <stdio.h>\n#include <unistd.h>\n\nint main(void) {\n    pid_t pid = fork();\n    if (pid < 0) { perror("fork\"); return 1; }\n\n    if (pid == 0) {\n        /* TODO: print child info */\n    } else {\n        /* TODO: print parent info */\n    }\n    return 0;\n}`,
        hints: ["Use getpid() and getppid()", "Parent prints child's PID too"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d40-a1", title: "Simple Shell",
      description: "Build a minimal shell that reads commands, forks, and executes them",
      requirements: [
        "Read a command from stdin (simulated with an array)",
        "Parse it into command and arguments",
        "fork() a child process",
        "Child execvp() the command",
        "Parent wait() for child to finish",
        "Handle 'exit' command gracefully",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <unistd.h>\n#include <sys/wait.h>\n#include <string.h>\n\nint main(void) {\n    char *commands[] = {"ls -l", "echo hello", "whoami", "pwd", "exit", NULL};\n\n    for (int i = 0; commands[i]; i++) {\n        printf("minish$ %s\\n\", commands[i]);\n        if (strcmp(commands[i], "exit") == 0) break;\n\n        /* TODO: parse command, fork, exec, wait */\n        char *args[] = {commands[i], NULL};\n        // Actually we need to split by space, but for simplicity:\n    }\n    printf("Goodbye!\\n\");\n    return 0;\n}`,
      rubric: [
        { criterion: "Commands parsed correctly", points: 20 },
        { criterion: "fork/exec/wait implemented", points: 30 },
        { criterion: "Child executes the command", points: 25 },
        { criterion: "Exit command works", points: 25 },
      ],
      xpReward: 100,
    },
  },

  41: {
    title: "Threads Intro",
    subtitle: "Concurrent execution with POSIX threads (pthreads)",
    tags: ["threads", "concurrency", "pthreads"],
    theory: {
      sections: [
        {
          heading: "What Are Threads?",
          content:
            "Threads are lightweight processes that share the same memory space within a process. Multiple threads can run concurrently (or in parallel on multi-core CPUs). pthreads (POSIX threads) is the standard C threading API on Unix-like systems.",
          codeExample: `#include <pthread.h>\n#include <stdio.h>\n\nvoid *worker(void *arg) {\n    int id = *(int*)arg;\n    printf("Thread %d running\\n", id);\n    return NULL;\n}\n\nint main(void) {\n    pthread_t t1, t2;\n    int id1 = 1, id2 = 2;\n    pthread_create(&t1, NULL, worker, &id1);\n    pthread_create(&t2, NULL, worker, &id2);\n    pthread_join(t1, NULL);\n    pthread_join(t2, NULL);\n    printf("Both threads done\\n");\n    return 0;\n}`,
        },
        {
          heading: "pthread_create and pthread_join",
          content:
            "pthread_create(&thread, attr, start_routine, arg) spawns a thread. The new thread executes start_routine with arg. pthread_join(thread, &retval) waits for the thread to finish and captures its return value. Without join, the program might exit before threads finish.",
        },
        {
          heading: "Race Conditions",
          content:
            "When multiple threads access shared data without synchronization, the result depends on timing — a race condition. The classic example: two threads incrementing a shared counter. Without protection, the final value is unpredictable.",
          codeExample: `int counter = 0;\n\nvoid *increment(void *arg) {\n    for (int i = 0; i < 100000; i++)\n        counter++;  // RACE CONDITION!\n    return NULL;\n}\n// Expected: 200000, Actual: varies`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <pthread.h>\n\nvoid *say_hello(void *arg) {\n    const char *name = (const char*)arg;\n    for (int i = 0; i < 3; i++)\n        printf("Hello from %s (%d)\\n", name, i);\n    return NULL;\n}\n\nint main(void) {\n    pthread_t t1, t2;\n    pthread_create(&t1, NULL, say_hello, "Thread A");\n    pthread_create(&t2, NULL, say_hello, "Thread B");\n    pthread_join(t1, NULL);\n    pthread_join(t2, NULL);\n    printf("All threads finished\\n");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d41-q1", type: "quiz", title: "Thread Memory",
        description: "Understanding thread memory sharing",
        question: "Do threads in the same process share memory?",
        options: [
          { id: "a", text: "No, each thread has its own memory", correct: false },
          { id: "b", text: "Yes, threads share the same address space", correct: true },
          { id: "c", text: "Only global variables are shared", correct: false },
          { id: "d", text: "Threads cannot access each other's data", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d41-q2", type: "quiz", title: "pthread_join",
        description: "Understanding thread synchronization",
        question: "What does pthread_join() do?",
        options: [
          { id: "a", text: "Creates a new thread", correct: false },
          { id: "b", text: "Waits for a thread to finish", correct: true },
          { id: "c", text: "Terminates a thread", correct: false },
          { id: "d", text: "Detaches a thread", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d41-c1", type: "code", title: "Parallel Sum",
        description: "Split an array across 2 threads and compute partial sums",
        starterCode: `#include <stdio.h>\n#include <pthread.h>\n\ntypedef struct {\n    int *arr;\n    int start;\n    int end;\n    int result;\n} Range;\n\nvoid *sum_range(void *arg) {\n    Range *r = (Range*)arg;\n    r->result = 0;\n    /* TODO: sum arr[start] to arr[end-1] */\n    return NULL;\n}\n\nint main(void) {\n    int data[] = {1,2,3,4,5,6,7,8,9,10};\n    Range r1 = {data, 0, 5, 0};\n    Range r2 = {data, 5, 10, 0};\n    pthread_t t1, t2;\n    pthread_create(&t1, NULL, sum_range, &r1);\n    pthread_create(&t2, NULL, sum_range, &r2);\n    pthread_join(t1, NULL);\n    pthread_join(t2, NULL);\n    printf("Sum = %d\\n", r1.result + r2.result);\n    return 0;\n}`,
        expectedOutput: "Sum = 55",
        hints: ["Loop from r->start to r->end", "Accumulate in r->result"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d41-a1", title: "Parallel Array Processor",
      description: "Create a program that processes an array with 4 threads",
      requirements: [
        "Split an array of 100 elements across 4 threads",
        "Each thread computes the sum of its chunk",
        "Main thread combines partial sums",
        "Print each thread's partial sum",
        "Compare with single-threaded sum for correctness",
      ],
      starterCode: `#include <stdio.h>\n#include <pthread.h>\n\n#define ARRAY_SIZE 100\n#define NUM_THREADS 4\n\ntypedef struct { int *arr; int start; int end; int result; } Chunk;\n\nvoid *compute(void *arg) {\n    Chunk *c = (Chunk*)arg;\n    c->result = 0;\n    for (int i = c->start; i < c->end; i++)\n        c->result += c->arr[i];\n    return NULL;\n}\n\nint main(void) {\n    int arr[ARRAY_SIZE];\n    for (int i = 0; i < ARRAY_SIZE; i++) arr[i] = i + 1;\n    /* TODO: create 4 threads, each processing a chunk */\n    return 0;\n}`,
      rubric: [
        { criterion: "4 threads created correctly", points: 25 },
        { criterion: "Array split evenly", points: 20 },
        { criterion: "Partial sums correct", points: 25 },
        { criterion: "Total matches expected", points: 30 },
      ],
      xpReward: 100,
    },
  },

  42: {
    title: "Mutexes & Synchronization",
    subtitle: "Protecting shared data from race conditions",
    tags: ["mutex", "synchronization", "threads"],
    theory: {
      sections: [
        {
          heading: "The Mutex (Mutual Exclusion)",
          content:
            "A mutex ensures only one thread executes a critical section at a time. pthread_mutex_lock() acquires the lock (blocking if another thread holds it). pthread_mutex_unlock() releases it. Every lock must have a matching unlock.",
          codeExample: `pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\nint counter = 0;\n\nvoid *worker(void *arg) {\n    for (int i = 0; i < 100000; i++) {\n        pthread_mutex_lock(&lock);\n        counter++;  // protected\n        pthread_mutex_unlock(&lock);\n    }\n    return NULL;\n}\n// Now counter is always 200000`,
        },
        {
          heading: "Deadlocks",
          content:
            "A deadlock occurs when two threads hold locks and wait for each other's locks. Prevent by: always acquire locks in the same order, use trylock with backoff, or minimize lock scope. A deadlocked program hangs forever.",
          codeExample: `// Thread A: lock(m1); lock(m2); unlock(m2); unlock(m1);\n// Thread B: lock(m2); lock(m1); unlock(m1); unlock(m2);\n// DEADLOCK! Both waiting for the other.`,
        },
        {
          heading: "Condition Variables",
          content:
            "Condition variables let threads wait for a condition to become true. pthread_cond_wait() releases the mutex and blocks. pthread_cond_signal() wakes one waiting thread. Used for producer-consumer patterns.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <pthread.h>\n\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\nint shared = 0;\n\nvoid *worker(void *arg) {\n    for (int i = 0; i < 50000; i++) {\n        pthread_mutex_lock(&lock);\n        shared++;\n        pthread_mutex_unlock(&lock);\n    }\n    return NULL;\n}\n\nint main(void) {\n    pthread_t t1, t2;\n    pthread_create(&t1, NULL, worker, NULL);\n    pthread_create(&t2, NULL, worker, NULL);\n    pthread_join(t1, NULL);\n    pthread_join(t2, NULL);\n    printf("Shared = %d (expected 100000)\\n", shared);\n    pthread_mutex_destroy(&lock);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d42-q1", type: "quiz", title: "Lock Purpose",
        description: "Understanding mutex purpose",
        question: "What problem does a mutex solve?",
        options: [
          { id: "a", text: "Memory leaks", correct: false },
          { id: "b", text: "Race conditions on shared data", correct: true },
          { id: "c", text: "Slow thread creation", correct: false },
          { id: "d", text: "File I/O errors", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d42-q2", type: "quiz", title: "Deadlock",
        description: "Understanding deadlocks",
        question: "What is a deadlock?",
        options: [
          { id: "a", text: "A thread that runs forever", correct: false },
          { id: "b", text: "Two or more threads each waiting for a lock held by the other", correct: true },
          { id: "c", text: "A mutex that cannot be locked", correct: false },
          { id: "d", text: "A program that crashes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d42-c1", type: "code", title: "Bank Account",
        description: "Simulate a bank account with deposit/withdraw using mutex protection",
        starterCode: `#include <stdio.h>\n#include <pthread.h>\n\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\ndouble balance = 1000.0;\n\nvoid deposit(double amount) {\n    pthread_mutex_lock(&lock);\n    balance += amount;\n    pthread_mutex_unlock(&lock);\n}\n\nvoid withdraw(double amount) {\n    /* TODO: protect with mutex, check for sufficient funds */\n}\n\nint main(void) {\n    printf("Balance: %.2f\\n", balance);\n    deposit(500);\n    printf("After deposit: %.2f\\n", balance);\n    withdraw(200);\n    printf("After withdraw: %.2f\\n", balance);\n    pthread_mutex_destroy(&lock);\n    return 0;\n}`,
        expectedOutput: "Balance: 1000.00",
        hints: ["Lock before modifying balance", "Check balance >= amount before withdraw"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d42-a1", title: "Producer-Consumer with Mutex",
      description: "Implement a producer-consumer pattern with a shared buffer protected by mutex",
      requirements: [
        "Create a bounded buffer (array of 5 slots)",
        "Producer thread adds items (1..20)",
        "Consumer thread removes and prints items",
        "Use mutex to protect buffer access",
        "Track count of items in buffer",
      ],
      starterCode: `#include <stdio.h>\n#include <pthread.h>\n\n#define BUFFER_SIZE 5\nint buffer[BUFFER_SIZE];\nint count = 0;\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\n\nvoid *producer(void *arg) {\n    for (int i = 1; i <= 10; i++) {\n        /* TODO: lock, add to buffer if space, unlock */\n    }\n    return NULL;\n}\n\nvoid *consumer(void *arg) {\n    for (int i = 0; i < 10; i++) {\n        /* TODO: lock, remove from buffer if data, unlock, print */\n    }\n    return NULL;\n}\n\nint main(void) {\n    pthread_t prod, cons;\n    pthread_create(&prod, NULL, producer, NULL);\n    pthread_create(&cons, NULL, consumer, NULL);\n    pthread_join(prod, NULL);\n    pthread_join(cons, NULL);\n    pthread_mutex_destroy(&lock);\n    return 0;\n}`,
      rubric: [
        { criterion: "Mutex protects buffer access", points: 30 },
        { criterion: "Producer adds correctly", points: 25 },
        { criterion: "Consumer removes correctly", points: 25 },
        { criterion: "No race conditions", points: 20 },
      ],
      xpReward: 100,
    },
  },

  43: {
    title: "Memory Pools",
    subtitle: "Custom allocators for predictable, low-overhead memory management",
    tags: ["memory", "allocator", "pool"],
    theory: {
      sections: [
        {
          heading: "Why Memory Pools?",
          content:
            "malloc/free have overhead: metadata per allocation, fragmentation, and unpredictable latency. Memory pools pre-allocate a large chunk and subdivide it. This gives deterministic allocation speed, no fragmentation, and simple deallocation (free the whole pool at once).",
          codeExample: `typedef struct {\n    char *buffer;\n    size_t size;\n    size_t offset;\n} Pool;\n\nPool *pool_create(size_t size) {\n    Pool *p = malloc(sizeof(Pool));\n    p->buffer = malloc(size);\n    p->size = size;\n    p->offset = 0;\n    return p;\n}\n\nvoid *pool_alloc(Pool *p, size_t n) {\n    if (p->offset + n > p->size) return NULL;\n    void *ptr = p->buffer + p->offset;\n    p->offset += n;\n    return ptr;\n}\n\nvoid pool_destroy(Pool *p) {\n    free(p->buffer);\n    free(p);\n}`,
        },
        {
          heading: "Arena Allocators",
          content:
            "An arena (or region-based allocator) allocates linearly from a large block. Allocations are incredibly fast — just bump a pointer. Free the entire arena at once. Used extensively in game engines, compilers, and high-frequency trading.",
        },
        {
          heading: "Pool Tradeoffs",
          content:
            "Pools excel when you allocate many same-sized objects or when allocations are temporary (one frame, one request). They don't support individual free() — only bulk reset. Choose based on your allocation pattern.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct { char *buf; size_t size, off; } Pool;\n\nPool *pool_new(size_t sz) {\n    Pool *p = malloc(sizeof(Pool));\n    p->buf = malloc(sz); p->size = sz; p->off = 0;\n    return p;\n}\n\nvoid *pool_alloc(Pool *p, size_t n) {\n    if (p->off + n > p->size) return NULL;\n    void *ptr = p->buf + p->off;\n    p->off += n;\n    return ptr;\n}\n\nvoid pool_reset(Pool *p) { p->off = 0; }\nvoid pool_free(Pool *p) { free(p->buf); free(p); }\n\nint main(void) {\n    Pool *p = pool_new(1024);\n    int *arr = pool_alloc(p, 5 * sizeof(int));\n    for (int i = 0; i < 5; i++) arr[i] = i * i;\n    char *str = pool_alloc(p, 32);\n    strcpy(str, "pool allocator\");\n    printf("arr[3]=%d, str=%s\\n\", arr[3], str);\n    pool_free(p);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d43-q1", type: "quiz", title: "Pool Advantage",
        description: "Understanding pool benefits",
        question: "What is a key advantage of memory pools over malloc?",
        options: [
          { id: "a", text: "Smaller memory usage", correct: false },
          { id: "b", text: "Faster allocation and no fragmentation", correct: true },
          { id: "c", text: "Thread safety by default", correct: false },
          { id: "d", text: "Automatic garbage collection", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d43-q2", type: "quiz", title: "Pool Limitation",
        description: "Understanding pool tradeoffs",
        question: "What is a limitation of a simple bump-allocator pool?",
        options: [
          { id: "a", text: "It is slower than malloc", correct: false },
          { id: "b", text: "You cannot free individual allocations", correct: true },
          { id: "c", text: "It only works with structs", correct: false },
          { id: "d", text: "It wastes more memory", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d43-c1", type: "code", title: "String Pool",
        description: "Use a pool to allocate multiple strings efficiently",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct { char *buf; size_t size, off; } Pool;\n\nPool *pool_new(size_t sz) {\n    Pool *p = malloc(sizeof(Pool));\n    p->buf = malloc(sz); p->size = sz; p->off = 0;\n    return p;\n}\n\nchar *pool_strdup(Pool *p, const char *s) {\n    /* TODO: allocate and copy string in pool */\n}\n\nint main(void) {\n    Pool *p = pool_new(256);\n    char *greeting = pool_strdup(p, "Hello, World!\");\n    char *name = pool_strdup(p, "Systems Programming\");\n    printf("%s - %s\\n\", greeting, name);\n    pool_free(p);  // free both at once\n    return 0;\n}`,
        expectedOutput: "Hello, World! - Systems Programming",
        hints: ["strlen(s) + 1 bytes needed", "strcpy into pool_alloc'd space"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d43-a1", title: "Object Pool",
      description: "Create a fixed-size object pool for reusing struct instances",
      requirements: [
        "Define an Object struct with some fields",
        "Create a pool that pre-allocates N Objects",
        "Implement acquire() to get an object from pool",
        "Implement release() to return it",
        "Track free/used slots with a bitmap or free list",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct { int id; char name[32]; int active; } Object;\n\ntypedef struct {\n    Object *objects;\n    int capacity;\n    int *free_list;\n    int free_count;\n} ObjectPool;\n\nObjectPool *pool_create(int capacity) {\n    ObjectPool *p = malloc(sizeof(ObjectPool));\n    p->objects = calloc(capacity, sizeof(Object));\n    p->capacity = capacity;\n    p->free_list = malloc(capacity * sizeof(int));\n    for (int i = 0; i < capacity; i++) p->free_list[i] = i;\n    p->free_count = capacity;\n    return p;\n}\n\nObject *pool_acquire(ObjectPool *p) {\n    /* TODO: return a free object or NULL */\n}\n\nvoid pool_release(ObjectPool *p, Object *obj) {\n    /* TODO: return object to pool */\n}\n\nint main(void) {\n    ObjectPool *pool = pool_create(5);\n    Object *o1 = pool_acquire(pool);\n    if (o1) { o1->id = 1; sprintf(o1->name, \"Widget\"); o1->active = 1; }\n    pool_release(pool, o1);\n    /* TODO: test acquire/release cycle */\n    return 0;\n}`,
      rubric: [
        { criterion: "acquire returns free object", points: 30 },
        { criterion: "release returns to pool", points: 30 },
        { criterion: "Handles pool exhaustion", points: 20 },
        { criterion: "No memory leaks", points: 20 },
      ],
      xpReward: 100,
    },
  },

  44: {
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
  },

  45: {
    title: "C Standard Library Deep Dive",
    subtitle: "stdlib, string, stdio — the tools that ship with every C compiler",
    tags: ["stdlib", "library", "qsort", "bsearch"],
    theory: {
      sections: [
        {
          heading: "qsort — Generic Sorting",
          content:
            "qsort sorts an array using a comparison function you provide. The function receives pointers to two elements and returns negative, zero, or positive. qsort uses quicksort internally (average O(n log n)).",
          codeExample: `int cmp(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}\n\nint arr[] = {5, 2, 8, 1, 9, 3};\nint n = sizeof(arr) / sizeof(arr[0]);\nqsort(arr, n, sizeof(int), cmp);\n// arr is now {1, 2, 3, 5, 8, 9}`,
        },
        {
          heading: "bsearch — Binary Search",
          content:
            "bsearch performs a binary search on a sorted array. Like qsort, it takes a comparison function and element size. Returns a pointer to the matching element or NULL. Requires the array to be sorted first (use qsort).",
          codeExample: `int key = 8;\nint *found = bsearch(&key, arr, n, sizeof(int), cmp);\nif (found) printf("Found: %d\\n\", *found);\nelse printf("Not found\\n\");`,
        },
        {
          heading: "Other Useful Functions",
          content:
            "atoi/atol/atoll — string to integer (no error checking). strtol/strtoul/strtod — robust string to number with error detection. rand/srand — pseudo-random numbers. system — run shell commands. exit/atexit — program termination and cleanup.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint cmp(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}\n\nint main(void) {\n    int arr[] = {42, 7, 19, 3, 88, 15, 64};\n    int n = sizeof(arr)/sizeof(arr[0]);\n\n    qsort(arr, n, sizeof(int), cmp);\n    printf("Sorted: \");\n    for (int i = 0; i < n; i++) printf("%d \", arr[i]);\n    printf("\\n\");\n\n    int key = 19;\n    int *r = bsearch(&key, arr, n, sizeof(int), cmp);\n    printf("Found %d: %s\\n\", key, r ? "YES" : "NO");\n\n    printf("RAND_MAX = %d\\n\", RAND_MAX);\n    printf("Random: %d\\n\", rand() % 100);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d45-q1", type: "quiz", title: "qsort Callback",
        description: "Understanding qsort's comparison function",
        question: "What should the qsort comparison function return if a > b?",
        options: [
          { id: "a", text: "1", correct: false },
          { id: "b", text: "A positive value", correct: true },
          { id: "c", text: "0", correct: false },
          { id: "d", text: "-1", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d45-q2", type: "quiz", title: "bsearch Requirement",
        description: "Understanding bsearch prerequisites",
        question: "What must be true about the array before calling bsearch?",
        options: [
          { id: "a", text: "It must be allocated with malloc", correct: false },
          { id: "b", text: "It must be sorted in ascending order", correct: true },
          { id: "c", text: "It must have unique elements", correct: false },
          { id: "d", text: "It must be global", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d45-c1", type: "code", title: "String QSort",
        description: "Sort an array of strings using qsort",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint cmp_string(const void *a, const void *b) {\n    /* TODO: compare two strings */\n}\n\nint main(void) {\n    const char *words[] = {"banana", "apple", "cherry", "date", "elderberry"};\n    int n = sizeof(words) / sizeof(words[0]);\n    qsort(words, n, sizeof(char*), cmp_string);\n    for (int i = 0; i < n; i++)\n        printf("%s\\n\", words[i]);\n    return 0;\n}`,
        expectedOutput: "apple",
        hints: ["Parameters are const char**", "Use strcmp to compare strings"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d45-a1", title: "Student Database",
      description: "Use qsort and bsearch to manage a student record database",
      requirements: [
        "Define a Student struct with name, id, gpa",
        "Create an array of at least 7 students",
        "Sort by name using qsort",
        "Sort by GPA descending using qsort",
        "Use bsearch to find a student by ID",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct { char name[32]; int id; float gpa; } Student;\n\nint cmp_name(const void *a, const void *b) {\n    return strcmp(((Student*)a)->name, ((Student*)b)->name);\n}\n\nint cmp_gpa(const void *a, const void *b) {\n    float ga = ((Student*)a)->gpa, gb = ((Student*)b)->gpa;\n    if (ga < gb) return 1;\n    if (ga > gb) return -1;\n    return 0;\n}\n\nint cmp_id(const void *a, const void *b) {\n    return ((Student*)a)->id - ((Student*)b)->id;\n}\n\nvoid print(Student s[], int n) {\n    for (int i = 0; i < n; i++)\n        printf("%-10s %3d %.2f\\n\", s[i].name, s[i].id, s[i].gpa);\n}\n\nint main(void) {\n    Student students[] = {\n        {"Alice\", 1001, 3.8},\n        {"Bob\", 1002, 3.2},\n        // TODO: add more\n    };\n    int n = sizeof(students)/sizeof(students[0]);\n    /* TODO: sort and search */\n    return 0;\n}`,
      rubric: [
        { criterion: "7+ students defined", points: 20 },
        { criterion: "Sort by name works", points: 20 },
        { criterion: "Sort by GPA works", points: 20 },
        { criterion: "bsearch by ID works", points: 20 },
        { criterion: "Output formatting", points: 20 },
      ],
      xpReward: 100,
    },
  },

  46: {
    title: "Embedded C Patterns",
    subtitle: "Register access, MMIO, and volatile hardware interaction",
    tags: ["embedded", "registers", "hardware"],
    theory: {
      sections: [
        {
          heading: "Memory-Mapped I/O (MMIO)",
          content:
            "In embedded systems, peripherals are controlled by reading/writing memory-mapped registers at specific addresses. A volatile pointer to a fixed address reads/writes the hardware register directly. The volatile qualifier prevents the compiler from optimizing away essential accesses.",
          codeExample: `#define GPIO_BASE 0x40000000\n#define GPIO_ODR  (*(volatile uint32_t*)(GPIO_BASE + 0x14))\n#define GPIO_IDR  (*(volatile uint32_t*)(GPIO_BASE + 0x10))\n\n// Turn on all output pins\nGPIO_ODR = 0xFF;\n\n// Read input pins\nuint32_t inputs = GPIO_IDR;`,
        },
        {
          heading: "Bit Manipulation for Registers",
          content:
            "Hardware registers control specific features via individual bits. Set bits with |=, clear with &= ~, toggle with ^=. Named bit-mask macros make code readable. Register maps from datasheets specify each bit's function.",
          codeExample: `// Register bit definitions\n#define REG_ENABLE   (1 << 0)\n#define REG_MODE_MSK (3 << 1)\n#define REG_MODE_0   (0 << 1)\n#define REG_MODE_1   (1 << 1)\n#define REG_IRQ_EN   (1 << 3)\n\n// Configure a control register\nvolatile uint32_t *ctrl = (uint32_t*)0x40001000;\n*ctrl |= REG_ENABLE;       // enable module\n*ctrl &= ~REG_MODE_MSK;    // clear mode bits\n*ctrl |= REG_MODE_1;       // set mode 1`,
        },
        {
          heading: "Interrupt Handlers in C",
          content:
            "Interrupt Service Routines (ISRs) are special C functions that handle hardware interrupts. They must be short and fast. Use the interrupt attribute if your compiler supports it. Shared variables between ISR and main code must be volatile.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdint.h>\n\n// Simulated MMIO registers\nvolatile uint32_t simulated_reg = 0;\n\n#define CONTROL_REG (*(volatile uint32_t*)0xDEAD0000)\n#define STATUS_REG  (*(volatile uint32_t*)0xDEAD0004)\n\nint main(void) {\n    // We'll use the simulated var instead of real MMIO\n    volatile uint32_t *ctrl = &simulated_reg;\n\n    #define ENABLE  (1 << 0)\n    #define MODE_0  (0 << 1)\n    #define MODE_1  (1 << 1)\n    #define RESET   (1 << 4)\n\n    *ctrl |= ENABLE;\n    printf("After enable: 0x%08X\\n\", *ctrl);\n    *ctrl |= MODE_1;\n    printf("After mode: 0x%08X\\n\", *ctrl);\n    *ctrl |= RESET;\n    printf("After reset: 0x%08X\\n\", *ctrl);\n\n    // Check if reset bit is set\n    if (*ctrl & RESET) printf("Reset active\\n\");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d46-q1", type: "quiz", title: "volatile in Embedded",
        description: "Understanding volatile in hardware access",
        question: "Why is volatile used for hardware registers?",
        options: [
          { id: "a", text: "To make the code run faster", correct: false },
          { id: "b", text: "To prevent the compiler from optimizing away reads/writes", correct: true },
          { id: "c", text: "To protect against race conditions", correct: false },
          { id: "d", text: "To allocate memory", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d46-q2", type: "quiz", title: "Register Address",
        description: "Understanding MMIO addressing",
        question: "How do you access a hardware register at address 0x5000?",
        options: [
          { id: "a", text: "int *p = 0x5000;", correct: false },
          { id: "b", text: "volatile uint32_t *p = (uint32_t*)0x5000;", correct: true },
          { id: "c", text: "register int *p = 0x5000;", correct: false },
          { id: "d", text: "mmap(0x5000, ...);", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d46-c1", type: "code", title: "LED Pattern",
        description: "Simulate an LED pattern by manipulating a control register",
        starterCode: `#include <stdio.h>\n#include <stdint.h>\n\nvolatile uint32_t led_register = 0;\n\n#define LED_RED    (1 << 0)\n#define LED_GREEN  (1 << 1)\n#define LED_BLUE   (1 << 2)\n\nvoid led_on(uint32_t led) {\n    /* TODO: turn on the LED */\n}\n\nvoid led_off(uint32_t led) {\n    /* TODO: turn off the LED */\n}\n\nvoid led_toggle(uint32_t led) {\n    /* TODO: toggle the LED */\n}\n\nvoid led_show(void) {\n    printf("LEDs: 0x%02X\\n\", led_register);\n}\n\nint main(void) {\n    led_on(LED_RED | LED_GREEN);\n    led_show();\n    led_toggle(LED_RED);\n    led_show();\n    led_off(LED_GREEN);\n    led_show();\n    return 0;\n}`,
        expectedOutput: "LEDs: 0x03",
        hints: ["led_on: led_register |= led", "led_off: led_register &= ~led", "led_toggle: led_register ^= led"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d46-a1", title: "Simulated Device Driver",
      description: "Write a simulated device driver with init, read, write, and control operations",
      requirements: [
        "Define register map: CONTROL, STATUS, DATA, CONFIG",
        "Implement device_init() — set up default config",
        "Implement device_write(data) — write to data reg",
        "Implement device_read() — read from data reg",
        "Implement device_reset() — set reset bit in control",
      ],
      starterCode: `#include <stdio.h>\n#include <stdint.h>\n\n// Simulated device state\nvolatile struct {\n    uint32_t control;\n    uint32_t status;\n    uint32_t data;\n    uint32_t config;\n} device = {0, 0, 0, 0};\n\n// Control bits\n#define CTRL_ENABLE  (1 << 0)\n#define CTRL_RESET   (1 << 1)\n#define CTRL_IRQ_EN  (1 << 2)\n\n// Status bits\n#define STAT_READY   (1 << 0)\n#define STAT_BUSY    (1 << 1)\n#define STAT_ERROR   (1 << 2)\n\nvoid device_init(void) {\n    device.control = 0;\n    device.status = STAT_READY;\n    device.config = 0x80;\n    printf("Device initialized\\n\");\n}\n\nint device_write(uint32_t data) {\n    if (!(device.control & CTRL_ENABLE)) return -1;\n    /* TODO: write data and set busy status */\n}\n\nuint32_t device_read(void) {\n    /* TODO: read and return data */\n}\n\nvoid device_reset(void) {\n    /* TODO: assert reset, then clear it */\n}\n\nint main(void) {\n    device_init();\n    device.control |= CTRL_ENABLE;\n    device_write(0xDEAD);\n    printf("Read: 0x%04X\\n\", device_read());\n    device_reset();\n    return 0;\n}`,
      rubric: [
        { criterion: "Register map defined", points: 20 },
        { criterion: "device_init works", points: 20 },
        { criterion: "device_write works", points: 20 },
        { criterion: "device_read works", points: 20 },
        { criterion: "device_reset works", points: 20 },
      ],
      xpReward: 100,
    },
  },

  47: {
    title: "Unit Testing in C",
    subtitle: "Testing frameworks, assertions, and test-driven development",
    tags: ["testing", "unit-tests", "assert"],
    theory: {
      sections: [
        {
          heading: "Why Unit Test C Code?",
          content:
            "C code runs close to the hardware — bugs can cause crashes, memory corruption, or security vulnerabilities. Unit tests catch regressions early. The assert.h header provides compile-time and runtime assertions. For comprehensive testing, frameworks like Unity or CMocka are used.",
          codeExample: `#include <assert.h>\n\nint add(int a, int b) { return a + b; }\n\nint main(void) {\n    assert(add(2, 3) == 5);\n    assert(add(-1, 1) == 0);\n    assert(add(0, 0) == 0);\n    printf("All tests passed!\\n\");\n    return 0;\n}`,
        },
        {
          heading: "Test Structure with Unity",
          content:
            "Unity is a lightweight C test framework. Tests are grouped in test files. Each test function contains assertions. setUp and tearDown run before/after each test. A test runner calls all tests and reports results.",
          codeExample: `// Example Unity test:\n#include "unity.h\"\n\nvoid test_add_positive(void) {\n    TEST_ASSERT_EQUAL_INT(5, add(2, 3));\n}\n\nvoid test_add_negative(void) {\n    TEST_ASSERT_EQUAL_INT(-2, add(1, -3));\n}\n\nint main(void) {\n    UNITY_BEGIN();\n    RUN_TEST(test_add_positive);\n    RUN_TEST(test_add_negative);\n    return UNITY_END();\n}`,
        },
        {
          heading: "Test Coverage Considerations",
          content:
            "Good tests cover: normal cases, edge cases (empty, zero, NULL), error paths, and boundary conditions (MAX_INT, array bounds). Test-driven development (TDD) writes the test before the implementation.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <assert.h>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nvoid test_factorial(void) {\n    assert(factorial(0) == 1);\n    assert(factorial(1) == 1);\n    assert(factorial(5) == 120);\n    assert(factorial(10) == 3628800);\n}\n\nint main(void) {\n    test_factorial();\n    printf("All factorial tests passed!\\n\");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d47-q1", type: "quiz", title: "Assert Purpose",
        description: "Understanding assertions",
        question: "What does assert(expr) do when expr is false?",
        options: [
          { id: "a", text: "Returns -1", correct: false },
          { id: "b", text: "Aborts the program with a diagnostic message", correct: true },
          { id: "c", text: "Prints a warning and continues", correct: false },
          { id: "d", text: "Ignores the assertion", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d47-q2", type: "quiz", title: "Test Coverage",
        description: "Understanding test coverage",
        question: "What is an edge case in testing?",
        options: [
          { id: "a", text: "The most common use case", correct: false },
          { id: "b", text: "Testing at boundaries or extreme conditions", correct: true },
          { id: "c", text: "A test that always passes", correct: false },
          { id: "d", text: "A failing test", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d47-c1", type: "code", title: "Test a Function",
        description: "Write tests for a divide function that handles division by zero",
        starterCode: `#include <stdio.h>\n#include <assert.h>\n\nint divide(int a, int b, int *result) {\n    if (b == 0) return -1;  // error: division by zero\n    if (!result) return -2;  // error: null pointer\n    *result = a / b;\n    return 0;  // success\n}\n\nvoid test_divide_normal(void) {\n    int result;\n    assert(divide(10, 2, &result) == 0);\n    assert(result == 5);\n}\n\nvoid test_divide_by_zero(void) {\n    int result;\n    assert(divide(10, 0, &result) == -1);\n}\n\n/* TODO: add tests for null pointer and negative division */\n\nint main(void) {\n    test_divide_normal();\n    test_divide_by_zero();\n    printf("All tests passed!\\n\");\n    return 0;\n}`,
        hints: ["Add test for NULL result pointer", "Add test for negative numbers"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d47-a1", title: "Test Suite for String Library",
      description: "Write a comprehensive test suite for a custom string library",
      requirements: [
        "Create test functions for my_strlen, my_strcpy, my_strcmp",
        "Test normal cases, empty strings, NULL inputs",
        "Test boundary conditions (max lengths)",
        "Use assert for all checks",
        "Print pass/fail summary at the end",
      ],
      starterCode: `#include <stdio.h>\n#include <assert.h>\n\nint my_strlen(const char *s) {\n    if (!s) return -1;\n    int len = 0;\n    while (s[len]) len++;\n    return len;\n}\n\nvoid test_strlen_normal(void) {\n    assert(my_strlen("hello") == 5);\n    assert(my_strlen("") == 0);\n    assert(my_strlen("a") == 1);\n}\n\nvoid test_strlen_null(void) {\n    assert(my_strlen(NULL) == -1);\n}\n\n/* TODO: add more test functions for strcpy and strcmp */\n\nint main(void) {\n    test_strlen_normal();\n    test_strlen_null();\n    printf("All string tests passed!\\n\");\n    return 0;\n}`,
      rubric: [
        { criterion: "Tests for my_strlen", points: 25 },
        { criterion: "Tests for my_strcpy", points: 25 },
        { criterion: "Tests for my_strcmp", points: 25 },
        { criterion: "Boundary/edge cases covered", points: 25 },
      ],
      xpReward: 100,
    },
  },

  48: {
    title: "C to Assembly Bridge",
    subtitle: "How C code compiles down to machine instructions",
    tags: ["assembly", "compilation", "bridge"],
    theory: {
      sections: [
        {
          heading: "Viewing Compiler Output",
          content:
            "Use gcc -S to see C code compiled to assembly. gcc -O0 shows straightforward translation; -O2 shows optimized output. The -fno-asynchronous-unwind-tables flag removes .eh_frame noise. Reading assembly output teaches you what your C code really does.",
          codeExample: `# Generate assembly:\n# gcc -S -O0 -fno-asynchronous-unwind-tables program.c\n#\n# int add(int a, int b) {\n#     return a + b;\n# }\n#\n# Compiles to:\n# add:\n#     push   rbp\n#     mov    rbp, rsp\n#     mov    DWORD PTR [rbp-4], edi\n#     mov    DWORD PTR [rbp-8], esi\n#     mov    eax, DWORD PTR [rbp-4]\n#     add    eax, DWORD PTR [rbp-8]\n#     pop    rbp\n#     ret`,
        },
        {
          heading: "How C Constructs Map to ASM",
          content:
            "Variables → stack memory or registers. if/else → cmp + conditional jumps. Loops → cmp + jmp back. Arrays → base address + offset. Structs → base + member offset. Function calls → push args + call + ret.",
          codeExample: `// C: if (x > 0) y = 1; else y = -1;\n// ASM:\n//     cmp   DWORD PTR [rbp-4], 0\n//     jle   .L2\n//     mov   DWORD PTR [rbp-8], 1\n//     jmp   .L3\n// .L2:\n//     mov   DWORD PTR [rbp-8], -1\n// .L3:`,
        },
        {
          heading: "Calling Conventions (x86-64 System V ABI)",
          content:
            "First 6 integer args: RDI, RSI, RDX, RCX, R8, R9. Return value in RAX. Stack must be 16-byte aligned before call. Callee-saved registers: RBX, RBP, R12-R15. The compiler handles this automatically in C.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main(void) {\n    int x = 10, y = 20;\n    int z = add(x, y);\n    printf("Result: %d\\n\", z);\n    return 0;\n}\n\n// To see assembly:\n// gcc -S -O0 -fno-asynchronous-unwind-tables this.c\n// This shows how C maps to x86-64 instructions`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d48-q1", type: "quiz", title: "gcc -S",
        description: "Understanding how to view assembly output",
        question: "Which gcc flag generates assembly output instead of an executable?",
        options: [
          { id: "a", text: "-c", correct: false },
          { id: "b", text: "-S", correct: true },
          { id: "c", text: "-E", correct: false },
          { id: "d", text: "-o", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d48-q2", type: "quiz", title: "Return Register",
        description: "Understanding calling conventions",
        question: "Which register holds the return value in x86-64 System V ABI?",
        options: [
          { id: "a", text: "RBX", correct: false },
          { id: "b", text: "RAX", correct: true },
          { id: "c", text: "RCX", correct: false },
          { id: "d", text: "RSP", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d48-c1", type: "code", title: "ASM Prediction",
        description: "Write C code and predict what the assembly would look like",
        starterCode: `#include <stdio.h>\n\nint max(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\n\nint main(void) {\n    printf("max(10, 20) = %d\\n\", max(10, 20));\n    return 0;\n}\n\n/* TODO: In comments below, write what you expect\n   the assembly for max() to look like */\n// max:\n//     cmp   edi, esi\n//     jg    .greater\n//     mov   eax, esi\n//     ret\n// .greater:\n//     mov   eax, edi\n//     ret`,
        expectedOutput: "max(10, 20) = 20",
        hints: ["Parameters start in edi, esi", "cmp sets flags", "jg jumps if greater"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d48-a1", title: "C to ASM Reference Card",
      description: "Create a reference showing how C constructs map to x86-64 assembly",
      requirements: [
        "Show C construct → assembly pattern for: variable assignment",
        "Show: if/else, for loop, while loop",
        "Show: function call with arguments",
        "Show: array access, struct member access",
        "Show: pointer dereference",
      ],
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    printf("=== C to ASM Reference ===\\n\");\n    printf("\\n1. Variable Assignment\\n\");\n    printf("C:  int x = 42;\\n\");\n    printf("ASM: mov DWORD PTR [rbp-4], 42\\n\");\n\n    printf("\\n2. If/Else\\n\");\n    printf("C:  if (x > 0) y = 1;\\n\");\n    printf("ASM: cmp [rbp-4], 0\\n\");\n    printf("     jle .L2\\n\");\n    printf("     mov [rbp-8], 1\\n\");\n    printf("     jmp .L3\\n\");\n    printf("     .L2: mov [rbp-8], -1\\n\");\n    printf("     .L3:\\n\");\n\n    /* TODO: add more mappings */\n    return 0;\n}`,
      rubric: [
        { criterion: "5+ C to ASM mappings", points: 25 },
        { criterion: "Accurate assembly patterns", points: 25 },
        { criterion: "Clear formatting", points: 25 },
        { criterion: "Comments explaining each", points: 25 },
      ],
      xpReward: 100,
    },
  },

  49: {
    title: "Inline Assembly",
    subtitle: "Embedding assembly in C with __asm__ and GCC extended asm",
    tags: ["inline-asm", "asm", "gcc"],
    theory: {
      sections: [
        {
          heading: "Basic Inline Assembly",
          content:
            "GCC's __asm__ lets you embed assembly instructions directly in C code. The basic form: __asm__(\"instruction\"). The volatile keyword tells the compiler not to optimize the asm away. Multiple instructions are separated by \\n\\t.",
          codeExample: `#include <stdio.h>\n\nint main(void) {\n    int result;\n    __asm__(\"mov $42, %0\" : \"=r\"(result));\n    printf("Result: %d\\n\", result);\n    return 0;\n}`,
        },
        {
          heading: "Extended Asm Syntax",
          content:
            "Extended asm has the format: __asm__(\"code\" : outputs : inputs : clobbers). Outputs use =r (register), inputs use r, clobbers list registers modified by the asm (cc = flags, memory = memory). This tells the compiler how to connect C variables to assembly.",
          codeExample: `int a = 10, b = 5, result;\n__asm__(\n    \"add %2, %1\\n\\t\"\n    \"mov %1, %0\"\n    : \"=r\"(result)     // output\n    : \"r\"(a), \"r\"(b)    // inputs\n    : \"cc\"              // clobbered flags\n);\nprintf("10 + 5 = %d\\n\", result);`,
        },
        {
          heading: "When to Use Inline Assembly",
          content:
            "Use inline assembly for: CPU-specific instructions (CPUID, RDTSC), performance-critical loops where the compiler generates suboptimal code, accessing special registers (CR0, MSRs), and implementing system calls without libc. Most code should stay in C.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int x = 10, y = 20, result;\n\n    __asm__(\n        \"mov %2, %0\\n\\t\"\n        \"add %1, %0\"\n        : \"=r\"(result)\n        : \"r\"(x), \"r\"(y)\n        : \"cc\"\n    );\n\n    printf("%d + %d = %d\\n\", x, y, result);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d49-q1", type: "quiz", title: "Output Constraint",
        description: "Understanding inline asm constraints",
        question: "What does the constraint \"=r\" mean in inline assembly?",
        options: [
          { id: "a", text: "Output to memory", correct: false },
          { id: "b", text: "Output to a register (write-only)", correct: true },
          { id: "c", text: "Input from a register", correct: false },
          { id: "d", text: "Read-write operand", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d49-q2", type: "quiz", title: "Clobber List",
        description: "Understanding clobbered registers",
        question: "What does \"cc\" in the clobber list mean?",
        options: [
          { id: "a", text: "The code clobber (overwrites) condition code flags", correct: true },
          { id: "b", text: "The code is conditional", correct: false },
          { id: "c", text: "The C compiler is clobbered", correct: false },
          { id: "d", text: "C code follows", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d49-c1", type: "code", title: "Inline Mul",
        description: "Write an inline assembly function to multiply two integers",
        starterCode: `#include <stdio.h>\n\nint mul_asm(int a, int b) {\n    int result;\n    /* TODO: use imul instruction in inline asm */\n    return result;\n}\n\nint main(void) {\n    printf("7 * 6 = %d\\n\", mul_asm(7, 6));\n    return 0;\n}`,
        expectedOutput: "7 * 6 = 42",
        hints: ["imul instruction: imul result, a, b", "Use \"=r\" for output, \"r\" for inputs"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d49-a1", title: "Inline ASM Library",
      description: "Create a small library of math functions using inline assembly",
      requirements: [
        "Implement add(a,b), sub(a,b), mul(a,b), div(a,b)",
        "Use inline assembly for each function",
        "Implement a rdtsc() function that reads the timestamp counter",
        "Write a C main that tests all functions",
        "Compare performance with plain C versions (print which is faster)",
      ],
      starterCode: `#include <stdio.h>\n\nint add_asm(int a, int b) {\n    int r;\n    __asm__(\"add %2, %1\\n\\tmov %1, %0\" : \"=r\"(r) : \"r\"(a), \"r\"(b) : \"cc\");\n    return r;\n}\n\nint sub_asm(int a, int b) {\n    /* TODO: implement subtraction with inline asm */\n}\n\nint mul_asm(int a, int b) {\n    /* TODO: implement multiplication with inline asm */\n}\n\nint div_asm(int a, int b) {\n    /* TODO: implement division with inline asm */\n}\n\n// Read x86 timestamp counter\nunsigned long long rdtsc(void) {\n    unsigned long long result;\n    __asm__ volatile(\"rdtsc\" : \"=A\"(result));\n    return result;\n}\n\nint main(void) {\n    printf("add_asm(10, 5) = %d\\n\", add_asm(10, 5));\n    printf("sub_asm(10, 5) = %d\\n\", sub_asm(10, 5));\n    printf("mul_asm(10, 5) = %d\\n\", mul_asm(10, 5));\n    printf("div_asm(10, 5) = %d\\n\", div_asm(10, 5));\n    printf("RDTSC: %llu\\n\", rdtsc());\n    return 0;\n}`,
      rubric: [
        { criterion: "add_asm using inline asm", points: 20 },
        { criterion: "sub_asm using inline asm", points: 20 },
        { criterion: "mul_asm using inline asm", points: 20 },
        { criterion: "div_asm using inline asm", points: 20 },
        { criterion: "rdtsc implemented", points: 20 },
      ],
      xpReward: 100,
    },
  },

  50: {
    title: "Capstone: C Systems Project",
    subtitle: "Build a complete C application from scratch",
    tags: ["capstone", "project", "portfolio"],
    theory: {
      sections: [
        {
          heading: "Capstone Project Choices",
          content:
            "Choose one capstone project to build. Each integrates multiple C concepts you've learned. The goal is a working, well-structured application with proper error handling, memory management, and documentation.",
        },
        {
          heading: "Option 1: CLI Calculator with History",
          content:
            "Build an interactive calculator that reads expressions, computes results, and maintains a command history. Must handle: +, -, *, /, parentheses, variables (x = 5; x + 3). Concepts: parsing, dynamic memory, error handling, linked lists (history).",
        },
        {
          heading: "Option 2: Mini Text Editor",
          content:
            "Build a line-oriented text editor. Commands: i (insert line), d (delete), p (print), w (write to file), q (quit). Concepts: dynamic arrays, file I/O, command parsing, string manipulation.",
          codeExample: `// Structure for the editor:\ntypedef struct {\n    char **lines;\n    int count;\n    int capacity;\n} Buffer;\n\nvoid insert_line(Buffer *buf, int pos, const char *line);\nvoid delete_line(Buffer *buf, int pos);\nvoid print_buffer(Buffer *buf);\nvoid save_to_file(Buffer *buf, const char *filename);`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n/* CAPSTONE: Mini Line Editor\n * Commands:\n *   i <line_num> <text>  - insert\n *   d <line_num>         - delete\n *   p                    - print all\n *   w <filename>         - save\n *   q                    - quit\n */\n\ntypedef struct {\n    char **lines;\n    int count;\n    int capacity;\n} Buffer;\n\nvoid init(Buffer *b) {\n    b->capacity = 10;\n    b->lines = malloc(b->capacity * sizeof(char*));\n    b->count = 0;\n}\n\nvoid insert(Buffer *b, int pos, const char *text) {\n    if (pos < 0 || pos > b->count) { printf("Invalid position\\n\"); return; }\n    if (b->count >= b->capacity) {\n        b->capacity *= 2;\n        b->lines = realloc(b->lines, b->capacity * sizeof(char*));\n    }\n    for (int i = b->count; i > pos; i--)\n        b->lines[i] = b->lines[i-1];\n    b->lines[pos] = strdup(text);\n    b->count++;\n}\n\nvoid print(Buffer *b) {\n    for (int i = 0; i < b->count; i++)\n        printf("%4d: %s\\n\", i+1, b->lines[i]);\n}\n\nvoid cleanup(Buffer *b) {\n    for (int i = 0; i < b->count; i++) free(b->lines[i]);\n    free(b->lines);\n}\n\nint main(void) {\n    Buffer buf;\n    init(&buf);\n    insert(&buf, 0, "Hello, World!\");\n    insert(&buf, 1, "This is my editor.\");\n    insert(&buf, 0, "Line inserted at top.\");\n    print(&buf);\n    cleanup(&buf);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d50-q1", type: "quiz", title: "Capstone Planning",
        description: "Understanding project planning",
        question: "What is the first step in building a capstone project?",
        options: [
          { id: "a", text: "Writing all the code at once", correct: false },
          { id: "b", text: "Planning the architecture and data structures", correct: true },
          { id: "c", text: "Optimizing for performance", correct: false },
          { id: "d", text: "Adding comments to the code", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d50-q2", type: "quiz", title: "Project Structure",
        description: "Understanding code organization",
        question: "How should a capstone C project be organized?",
        options: [
          { id: "a", text: "All code in one file for simplicity", correct: false },
          { id: "b", text: "Split into logical modules with .h and .c files", correct: true },
          { id: "c", text: "One header file and one source file only", correct: false },
          { id: "d", text: "No organization needed for small projects", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d50-c1", type: "code", title: "Capstone Prep",
        description: "Implement a simple command parser for the editor",
        starterCode: `#include <stdio.h>\n#include <string.h>\n\nvoid parse_command(const char *input) {\n    char cmd[32];\n    int arg1;\n    char arg2[256];\n\n    /* TODO: parse "i 5 hello\" or \"p\" or \"q\" */\n    if (sscanf(input, "%s %d %[^\\n]\", cmd, &arg1, arg2) >= 1) {\n        if (strcmp(cmd, \"p\") == 0)\n            printf("Command: PRINT\\n\");\n        else if (strcmp(cmd, \"q\") == 0)\n            printf("Command: QUIT\\n\");\n        else if (strcmp(cmd, \"i\") == 0)\n            printf("Command: INSERT at %d: %s\\n\", arg1, arg2);\n        else\n            printf("Unknown command: %s\\n\", cmd);\n    }\n}\n\nint main(void) {\n    parse_command("p\");\n    parse_command("i 3 hello world\");\n    parse_command("q\");\n    return 0;\n}`,
        expectedOutput: "Command: PRINT",
        hints: ["Use sscanf or strtok", "First token is the command letter"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d50-a1", title: "C Capstone Project",
      description: "Build and document a complete C project of your choice",
      requirements: [
        "Choose: CLI calculator with history, mini text editor, or custom allocator",
        "Use proper multi-file structure (.h + .c modules)",
        "Include a Makefile",
        "Handle errors gracefully (invalid input, memory failure)",
        "Write a test suite using assert",
        "Document code and provide a README",
      ],
      starterCode: `/* C Capstone Project Template\n *\n * Choose your project and implement it.\n * Structure:\n * - src/main.c        — entry point\n * - src/editor.c      — editor implementation\n * - include/editor.h  — editor interface\n * - Makefile          — build system\n * - test/test.c       — test suite\n */\n\n#include <stdio.h>\n\nint main(void) {\n    printf("=== C Capstone Project ===\\n\");\n    printf("Choose your project and begin building!\\n\");\n    return 0;\n}`,
      rubric: [
        { criterion: "Working complete application", points: 30 },
        { criterion: "Multi-file organization", points: 20 },
        { criterion: "Error handling", points: 20 },
        { criterion: "Test suite", points: 15 },
        { criterion: "Documentation", points: 15 },
      ],
      xpReward: 200,
    },
  },

  51: {
    title: "Assembly Genesis",
    subtitle: "What is Assembly and why learn it?",
    tags: ["intro", "asm", "registers"],
    theory: {
      sections: [
        {
          heading: "Why Assembly in 2026?",
          content:
            "Assembly language is the human-readable representation of machine code. Every high-level language compiler ultimately produces assembly or direct machine code. Understanding assembly gives you insight into CPU behaviour, calling conventions, memory layout, and low-level debugging. It's essential for reverse engineering, embedded systems, OS development, and performance tuning.",
        },
        {
          heading: "Mnemonics vs Machine Code",
          content:
            "Each assembly instruction (mnemonic) corresponds to one or more bytes of machine code. For example, `mov rax, 42` encodes to `48 C7 C0 2A 00 00 00`. The assembler (NASM, GAS, MASM) translates mnemonics into binary. The disassembler does the reverse. Every CPU architecture has its own Instruction Set Architecture (ISA).",
          codeExample: `; Assembly → Machine code examples:\n; mov rax, 42    →  48 C7 C0 2A 00 00 00\n; add rax, rbx   →  48 01 D8\n; syscall        →  0F 05\n; ret            →  C3`,
        },
        {
          heading: "NASM Syntax Basics",
          content:
            "NASM (Netwide Assembler) uses Intel syntax: `opcode destination, source`. Sections organise the program: `.data` for initialized data, `.bss` for uninitialized data, `.text` for code. The `global _start` directive makes the entry point visible to the linker.",
          codeExample: `; Minimal NASM program:\nsection .data\n    msg db 'Hello, ASM!', 0xA\n    len equ $ - msg\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 1       ; sys_write\n    mov rdi, 1       ; stdout\n    mov rsi, msg     ; buffer\n    mov rdx, len     ; length\n    syscall\n    mov rax, 60      ; sys_exit\n    xor rdi, rdi     ; exit code 0\n    syscall`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 51: Assembly Genesis\n; Try running your first assembly program\n\nsection .data\n    msg db 'Hello from Assembly!', 0xA\n    len equ $ - msg\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 1      ; syscall: write\n    mov rdi, 1      ; fd: stdout\n    mov rsi, msg    ; buf\n    mov rdx, len    ; count\n    syscall\n    mov rax, 60     ; syscall: exit\n    xor rdi, rdi    ; status: 0\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d51-q1", type: "quiz", title: "What is Assembly?",
        description: "Test your understanding of assembly language",
        question: "What does an assembler do?",
        options: [
          { id: "a", text: "Executes machine code directly", correct: false },
          { id: "b", text: "Translates mnemonics to machine code", correct: true },
          { id: "c", text: "Compiles C code to assembly", correct: false },
          { id: "d", text: "Links object files into executables", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d51-q2", type: "quiz", title: "NASM Sections",
        description: "Understanding program sections",
        question: "Which NASM section contains the executable code?",
        options: [
          { id: "a", text: ".data", correct: false },
          { id: "b", text: ".bss", correct: false },
          { id: "c", text: ".text", correct: true },
          { id: "d", text: ".rodata", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d51-c1", type: "code", title: "Custom Greeting",
        description: "Modify the hello program to print your own message",
        starterCode: `section .data\n    msg db 'YOUR_NAME_HERE', 0xA\n    len equ $ - msg\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, msg\n    mov rdx, len\n    syscall\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        expectedOutput: "YOUR_NAME_HERE",
        hints: ["Change the text in the db directive", "Update len if you change the message length"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d51-a1", title: "Hello Explorer",
      description: "Write a program that prints a multi-line intro banner in assembly",
      requirements: [
        "Print at least 3 lines of text using separate sys_write calls",
        "Each line must use a different message buffer",
        "Use equ for length calculation",
        "Exit with code 0",
      ],
      starterCode: `section .data\n    line1 db 'Welcome to Assembly!', 0xA\n    len1 equ $ - line1\n    line2 db 'You are now thinking in mnemonics.', 0xA\n    len2 equ $ - line2\n    line3 db 'Level: ASM Initiate', 0xA\n    len3 equ $ - line3\n\nsection .text\nglobal _start\n\n_start:\n    ; Print line1\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, line1\n    mov rdx, len1\n    syscall\n    ; Print line2\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, line2\n    mov rdx, len2\n    syscall\n    ; Print line3\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, line3\n    mov rdx, len3\n    syscall\n    ; Exit\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Three separate print operations", points: 30 },
        { criterion: "Correct sys_write setup", points: 25 },
        { criterion: "Length calculation accuracy", points: 15 },
        { criterion: "Proper exit handling", points: 15 },
        { criterion: "Code readability and comments", points: 15 },
      ],
      xpReward: 100,
    },
  },

  52: {
    title: "CPU Architecture",
    subtitle: "Registers, ALU, and the fetch-decode-execute cycle",
    tags: ["architecture", "registers", "cpu"],
    theory: {
      sections: [
        {
          heading: "The Fetch-Decode-Execute Cycle",
          content:
            "Every CPU runs in an infinite loop: fetch the next instruction from memory (RIP register holds the address), decode it (control unit interprets opcode and operands), execute it (ALU performs arithmetic, memory unit reads/writes, or control flow changes). This is the von Neumann architecture foundation.",
        },
        {
          heading: "x86-64 General Purpose Registers",
          content:
            "x86-64 has 16 general-purpose registers (GPRs), each 64 bits wide. RAX (accumulator), RBX (base), RCX (counter), RDX (data), RSI (source index), RDI (dest index), RBP (base pointer), RSP (stack pointer), and R8–R15 (extended). You can access sub-registers: EAX (32-bit), AX (16-bit), AL (low 8-bit), AH (high 8-bit).",
          codeExample: `; Register size access patterns:\nmov rax, 0x1234567890ABCDEF  ; full 64-bit\nmov eax, 0xDEADBEEF          ; lower 32 bits, zero-extends\nmov ax, 0xCAFE               ; lower 16 bits\nmov al, 0x42                 ; lower 8 bits\nmov ah, 0xFF                 ; bits 15:8\n; After mov eax instruction: RAX = 0x00000000DEADBEEF`,
        },
        {
          heading: "The ALU and Flags Register",
          content:
            "The Arithmetic Logic Unit performs math and bitwise operations. Results set flags in RFLAGS: ZF (zero), CF (carry), SF (sign), OF (overflow), PF (parity), AF (adjust). Conditional jumps (JE, JG, JL) read these flags to make decisions.",
          codeExample: `; How flags are set:\nmov rax, 0x7FFFFFFFFFFFFFFF  ; max positive\nadd rax, 1                   ; overflow! OF=1, SF=1, ZF=0\n; After addition:\n; jo overflow_handler        ; jump if OF=1\n; js negative_result         ; jump if SF=1`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 52: CPU Architecture\n; Experiment with registers and flags\n\nsection .text\nglobal _start\n\n_start:\n    ; Try different register sizes\n    mov rax, 0x1234567890ABCDEF\n    mov rbx, 0\n    mov ecx, 0xDEAD\n\n    ; Check flags via arithmetic\n    mov rax, 100\n    add rax, 50      ; rax = 150\n    sub rax, 200     ; rax = -50, SF=1, OF=0\n\n    ; Exit\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d52-q1", type: "quiz", title: "Register Basics",
        description: "Test your register knowledge",
        question: "How many general-purpose registers does x86-64 have?",
        options: [
          { id: "a", text: "8", correct: false },
          { id: "b", text: "16", correct: true },
          { id: "c", text: "32", correct: false },
          { id: "d", text: "4", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d52-q2", type: "quiz", title: "Flags Register",
        description: "Understanding condition flags",
        question: "Which flag is set when a subtraction produces a result of zero?",
        options: [
          { id: "a", text: "CF (Carry Flag)", correct: false },
          { id: "b", text: "OF (Overflow Flag)", correct: false },
          { id: "c", text: "ZF (Zero Flag)", correct: true },
          { id: "d", text: "SF (Sign Flag)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d52-c1", type: "code", title: "Register Explorer",
        description: "Write code that sets up registers with specific values and performs arithmetic",
        starterCode: `section .text\nglobal _start\n\n_start:\n    ; Set RAX = 500, RBX = 200\n    ; Then compute RAX = RAX - RBX\n    ; Then compute RBX = RAX + 100\n    mov rax, 500\n    mov rbx, 200\n    ; TODO: subtract rbx from rax\n    ; TODO: add 100 to rbx\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["Use sub for subtraction", "Use add for addition", "Instructions go in order"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d52-a1", title: "Register Calculator",
      description: "Write an assembly program that performs a sequence of arithmetic operations across multiple registers",
      requirements: [
        "Use at least 4 different registers (RAX, RBX, RCX, RDX)",
        "Perform addition, subtraction, and multiplication",
        "Move results between registers",
        "Exit cleanly with code 0",
      ],
      starterCode: `section .text\nglobal _start\n\n_start:\n    ; Multi-register calculation:\n    ; (a + b) * c - d\n    mov rax, 15     ; a\n    mov rbx, 25     ; b\n    mov rcx, 4      ; c\n    mov rdx, 30     ; d\n\n    ; TODO: rax = rax + rbx\n    ; TODO: rax = rax * rcx (hint: mul rcx stores result in rdx:rax)\n    ; TODO: sub something to get final result\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Four registers used correctly", points: 20 },
        { criterion: "Addition implementation", points: 20 },
        { criterion: "Subtraction implementation", points: 20 },
        { criterion: "Multiplication implementation", points: 25 },
        { criterion: "Clean exit", points: 15 },
      ],
      xpReward: 100,
    },
  },

  53: {
    title: "MOV & Data Movement",
    subtitle: "Loading, storing, and transferring data",
    tags: ["instructions", "mov", "data-movement"],
    theory: {
      sections: [
        {
          heading: "The MOV Instruction Family",
          content:
            "MOV is the most common instruction. Syntax: `mov destination, source`. Both operands must be the same size. You cannot MOV from memory to memory directly — use a register as intermediary. MOV does not affect flags.",
          codeExample: `; MOV variants:\nmov rax, 42         ; immediate → register\nmov rbx, rax        ; register → register\nmov rax, [addr]     ; memory → register\nmov [addr], rax     ; register → memory\n; mov [x], [y]      ; INVALID — use mov rax, [y]; mov [x], rax`,
        },
        {
          heading: "Immediate Values and Sign Extension",
          content:
            "Immediates are constants embedded in the instruction. Moving a 32-bit immediate into a 64-bit register zero-extends it. For signed values, use MOVSX (sign-extend) or MOVZX (zero-extend). Smaller immediates produce shorter instruction encodings.",
          codeExample: `; Immediate sizes:\nmov rax, 42       ; 7 bytes: 48 C7 C0 2A 00 00 00\nmov eax, 42       ; 5 bytes: B8 2A 00 00 00 (zero-extends)\nmov al, 42        ; 2 bytes: B0 2A\n\n; Sign extension:\nmovsx rax, byte [var]   ; sign-extend byte to 64-bit\nmovzx rax, byte [var]   ; zero-extend byte to 64-bit`,
        },
        {
          heading: "Memory Addressing Forms",
          content:
            "The source or destination can reference memory using various forms: `[address]` (direct), `[reg]` (register indirect), `[reg + offset]` (base+displacement), `[reg + reg*scale]` (indexed), `[reg + reg*scale + offset]` (full). Scale can be 1, 2, 4, or 8.",
          codeExample: `; Memory addressing examples:\nmov rax, [0x601040]          ; direct\nmov rax, [rbx]               ; register indirect\nmov rax, [rbx + 16]          ; base + displacement\nmov rax, [rbx + rcx*8]       ; base + index*scale\nmov rax, [rbx + rcx*4 + 32]  ; full form\n\n; LEA computes address without accessing memory:\nlea rax, [rbx + rcx*4]      ; rax = rbx + rcx*4`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 53: MOV & Data Movement\n; Practice with different MOV forms\n\nsection .data\n    val dq 12345\n    arr dq 10, 20, 30, 40\n\nsection .text\nglobal _start\n\n_start:\n    ; Immediate to register\n    mov rax, 100\n\n    ; Register to register\n    mov rbx, rax\n\n    ; Memory to register\n    mov rcx, [val]\n\n    ; Register to memory\n    mov [val], rcx\n\n    ; LEA (load effective address)\n    lea rdx, [arr]\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d53-q1", type: "quiz", title: "MOV Rules",
        description: "Understanding MOV constraints",
        question: "Which of these MOV operations is valid?",
        options: [
          { id: "a", text: "mov [x], [y] — memory to memory", correct: false },
          { id: "b", text: "mov rax, rbx — register to register", correct: true },
          { id: "c", text: "mov 42, rax — immediate as destination", correct: false },
          { id: "d", text: "mov [x], 42 — mismatched sizes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d53-q2", type: "quiz", title: "Addressing Modes",
        description: "How memory addresses work",
        question: "What does LEA do?",
        options: [
          { id: "a", text: "Loads data from memory into a register", correct: false },
          { id: "b", text: "Computes the effective address without accessing memory", correct: true },
          { id: "c", text: "Loads the address of a label into a register", correct: false },
          { id: "d", text: "Loads the flags register", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d53-c1", type: "code", title: "Data Mover",
        description: "Use MOV and LEA to transfer values between registers and memory",
        starterCode: `section .data\n    src dq 999\n    dest dq 0\n\nsection .text\nglobal _start\n\n_start:\n    ; TODO: Load [src] into RAX\n    ; TODO: Store RAX into [dest]\n    ; TODO: Load address of dest into RBX using LEA\n    ; TODO: Load value at [rbx] into RCX\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: [
          "Use mov rax, [src] to load from memory",
          "Use lea rbx, [dest] for address",
          "Use mov rcx, [rbx] for indirect load",
        ],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d53-a1", title: "Memory Copy Routine",
      description: "Write assembly code that copies an 8-byte value from one memory location to another using a register intermediary, then loads its address via LEA",
      requirements: [
        "Define two qword variables in .data section",
        "Copy value from source to destination using a register",
        "Use LEA to get address of destination into a register",
        "Load the copied value indirectly through the LEA register",
      ],
      starterCode: `section .data\n    source dq 0xDEADBEEFCAFE\n    dest   dq 0\n\nsection .text\nglobal _start\n\n_start:\n    ; Step 1: Load source value\n    mov rax, [source]\n\n    ; Step 2: Store into destination\n    mov [dest], rax\n\n    ; Step 3: Get address of dest using LEA\n    lea rbx, [dest]\n\n    ; Step 4: Load indirectly\n    mov rcx, [rbx]\n\n    ; Exit\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Memory load using [src]", points: 20 },
        { criterion: "Memory store using [dest]", points: 20 },
        { criterion: "LEA used for address computation", points: 25 },
        { criterion: "Indirect load through LEA result", points: 20 },
        { criterion: "Clean exit", points: 15 },
      ],
      xpReward: 100,
    },
  },

  54: {
    title: "Arithmetic Instructions",
    subtitle: "ADD, SUB, MUL, DIV on registers",
    tags: ["instructions", "arithmetic", "math"],
    theory: {
      sections: [
        {
          heading: "Addition and Subtraction",
          content:
            "ADD and SUB work identically to their high-level counterparts. `add dest, src` computes dest += src. `sub dest, src` computes dest -= src. Both operands must be the same size. ADD and SUB set OF, SF, ZF, AF, CF, PF flags. For extended precision, use ADC (add with carry) and SBB (subtract with borrow).",
          codeExample: `; Basic arithmetic:\nmov rax, 100\nadd rax, 50      ; rax = 150\nsub rax, 30      ; rax = 120\n\n; With carry for 128-bit arithmetic:\nmov rax, 0xFFFFFFFFFFFFFFFF\nmov rdx, 0\nadd rax, 1       ; rax = 0, CF = 1\nadc rdx, 0       ; rdx = 1 (carry propagated)\n; Result: rdx:rax = 0x10000000000000000`,
        },
        {
          heading: "Multiplication: MUL and IMUL",
          content:
            "MUL is unsigned multiply. A single operand multiplies RAX by that operand, storing the 128-bit result in RDX:RAX. IMUL is signed multiply and has more forms: two-operand (dest *= src) and three-operand (dest = src1 * src2). MUL sets CF and OF if the result doesn't fit in the lower half.",
          codeExample: `; MUL — single operand (rax *= src, result in rdx:rax)\nmov rax, 1000\nmov rbx, 2000\nmul rbx          ; rdx:rax = 1000 * 2000 = 2,000,000\n\n; IMUL — two operand (dest *= src)\nmov rax, -50\nimul rax, 30     ; rax = -1500\n\n; IMUL — three operand (dest = src1 * src2)\nimul rbx, rax, 100  ; rbx = rax * 100`,
        },
        {
          heading: "Division: DIV and IDIV",
          content:
            "DIV is unsigned division. For 64-bit, dividend is RDX:RAX, divisor is the operand. Quotient goes to RAX, remainder to RDX. IDIV is signed division. Division by zero triggers interrupt 0 (divide error). Use CMP and JE to guard against it.",
          codeExample: `; Unsigned division:\nmov rax, 100       ; low 64 bits of dividend\nxor rdx, rdx       ; high 64 bits = 0\nmov rbx, 7\ndiv rbx            ; rax = 14 (quotient), rdx = 2 (remainder)\n\n; Signed division:\nmov rax, -100\ncqo                ; sign-extend RAX to RDX:RAX\nmov rbx, 7\nidiv rbx           ; rax = -14, rdx = -2\n\n; Guard against division by zero:\ncmp rbx, 0\nje .error\ndiv rbx`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 54: Arithmetic Instructions\n; Experiment with math operations\n\nsection .text\nglobal _start\n\n_start:\n    ; Addition\n    mov rax, 50\n    add rax, 30      ; rax = 80\n\n    ; Subtraction\n    sub rax, 20      ; rax = 60\n\n    ; Multiplication (single-operand)\n    mov rbx, 4\n    mul rbx          ; rdx:rax = 60 * 4 = 240\n\n    ; Division\n    xor rdx, rdx\n    mov rbx, 5\n    div rbx          ; rax = 240/5 = 48, rdx = 0\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d54-q1", type: "quiz", title: "MUL Behavior",
        description: "Understanding multiplication results",
        question: "Where does MUL store the high 64 bits of a 128-bit result?",
        options: [
          { id: "a", text: "RAX", correct: false },
          { id: "b", text: "RBX", correct: false },
          { id: "c", text: "RDX", correct: true },
          { id: "d", text: "RSP", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d54-q2", type: "quiz", title: "Division Safety",
        description: "Safe division practices",
        question: "What should you check before executing DIV?",
        options: [
          { id: "a", text: "That the dividend is even", correct: false },
          { id: "b", text: "That the divisor is not zero", correct: true },
          { id: "c", text: "That RAX is aligned to 16 bytes", correct: false },
          { id: "d", text: "That RSP points to valid stack", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d54-c1", type: "code", title: "Arithmetic Sequence",
        description: "Compute a multi-step arithmetic expression using ADD, SUB, MUL, DIV",
        starterCode: `section .text\nglobal _start\n\n_start:\n    ; Compute: ((100 + 50) * 2) / 3\n    ; Step 1: rax = 100 + 50\n    mov rax, 100\n    add rax, 50\n\n    ; Step 2: multiply rax by 2\n    mov rbx, 2\n    mul rbx\n\n    ; Step 3: divide by 3  (rdx:rax / rcx)\n    mov rcx, 3\n    xor rdx, rdx\n    div rcx\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: [
          "MUL works on rax with the operand as multiplier",
          "DIV divides rdx:rax by operand",
          "Zero rdx before DIV with xor rdx, rdx",
        ],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d54-a1", title: "Expression Evaluator",
      description: "Write assembly that evaluates a compound expression using all four arithmetic operations",
      requirements: [
        "Use ADD, SUB, MUL (or IMUL), DIV (or IDIV)",
        "Compute a result from at least 4 input values stored in registers",
        "Handle both positive and negative intermediate results",
        "Store the final result in RAX",
      ],
      starterCode: `section .text\nglobal _start\n\n_start:\n    ; Compute: ((a + b) * c) - (d / e)\n    mov rax, 20     ; a\n    mov rbx, 30     ; b\n    mov rcx, 4      ; c\n    mov rdx, 100    ; d\n    mov r8, 5       ; e\n\n    ; rax = a + b\n    add rax, rbx\n\n    ; rax = (a+b) * c\n    mul rcx\n\n    ; Save intermediate in r9\n    mov r9, rax\n\n    ; rax = d / e\n    mov rax, rdx\n    xor rdx, rdx\n    div r8\n\n    ; r9 - rax\n    sub r9, rax\n    mov rax, r9\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Addition and subtraction correct", points: 20 },
        { criterion: "Multiplication correct", points: 20 },
        { criterion: "Division correct (including zeroing RDX)", points: 25 },
        { criterion: "Intermediate values preserved correctly", points: 20 },
        { criterion: "Final result in RAX", points: 15 },
      ],
      xpReward: 100,
    },
  },

  55: {
    title: "Logical & Bitwise Ops",
    subtitle: "AND, OR, XOR, NOT, shifts in ASM",
    tags: ["instructions", "bitwise", "logic"],
    theory: {
      sections: [
        {
          heading: "Bitwise Logic: AND, OR, XOR, NOT",
          content:
            "These instructions operate bit-by-bit on the operands. AND sets each bit to 1 only if both bits are 1. OR sets each bit to 1 if either bit is 1. XOR sets each bit to 1 if one bit is 1 and the other is 0. NOT flips every bit. All except NOT set SF, ZF, PF (CF and OF are cleared). XOR is commonly used to zero a register — `xor rax, rax` is more efficient than `mov rax, 0`.",
          codeExample: `; Bitwise logic:\nmov rax, 0b1100\nmov rbx, 0b1010\nand rax, rbx      ; rax = 0b1000 (8)\nor  rax, rbx      ; rax = 0b1110 (14)\nxor rax, rbx      ; rax = 0b0100 (4)\nnot rax           ; rax = 0b1111...1011\n\n; Idiomatic zeroing:\nxor rax, rax      ; preferred over mov rax, 0\n; Smaller encoding, no false dependency on previous RAX value`,
        },
        {
          heading: "Shift Operations: SHL, SHR, SAL, SAR",
          content:
            "SHL (shift left) and SHR (shift right) are logical shifts that fill with zeros. SAL (shift arithmetic left) is identical to SHL. SAR (shift arithmetic right) preserves the sign bit. The shift count can be an immediate or CL register. Shifts set CF and PF, and affect ZF and SF based on the result.",
          codeExample: `; Shift operations:\nmov rax, 0b1001\nshl rax, 2        ; rax = 0b100100 = 36\nshr rax, 1        ; rax = 0b010010 = 18\n\n; Arithmetic right shift preserves sign:\nmov rax, -100     ; 0xFFFFFFFFFFFFFF9C\nsar rax, 2        ; rax = -25 (sign bit replicated)\nshr rax, 2        ; rax = huge positive (zero fill)\n\n; Shift by CL register:\nmov cl, 3\nshl rax, cl       ; shift rax left by 3`,
        },
        {
          heading: "Rotate Instructions: ROL, ROR, RCL, RCR",
          content:
            "Rotations shift bits in a circular fashion. ROL rotates left — the leftmost bit goes to the rightmost position and also into CF. ROR rotates right. RCL and RCR rotate through carry (9-bit rotation including CF). Useful for cryptography, checksums, and bit manipulation.",
          codeExample: `; Rotate examples:\nmov rax, 0b1001\nrol rax, 1        ; rax = 0b0011 (bit 3 wraps to bit 0)\nror rax, 2        ; rax = 0b1100\n\n; Rotate through carry:\nclc               ; clear carry\nrcl rax, 1        ; rotate 9 bits: CF + RAX\n\n; Bit test and set:\nbt  rax, 3        ; test bit 3 → CF\nbts rax, 2        ; test and set bit 2 → CF, then set\nbtr rax, 1        ; test and clear bit 1\nbtc rax, 0        ; test and complement bit 0`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 55: Logical & Bitwise Ops\n; Experiment with bit manipulation\n\nsection .text\nglobal _start\n\n_start:\n    ; AND, OR, XOR examples\n    mov rax, 0xFF00\n    mov rbx, 0x0F0F\n    and rax, rbx      ; rax = 0x0F00\n    xor rax, rbx      ; flip bits\n    not rax           ; invert all\n\n    ; Shifts\n    mov rax, 0b1010\n    shl rax, 3        ; 0b1010000\n    shr rax, 2        ; 0b0010100\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d55-q1", type: "quiz", title: "Zeroing Idiom",
        description: "Why XOR is preferred for zeroing",
        question: "Why is `xor rax, rax` preferred over `mov rax, 0`?",
        options: [
          { id: "a", text: "It's easier to read", correct: false },
          { id: "b", text: "Smaller encoding and avoids false dependencies", correct: true },
          { id: "c", text: "XOR is the only way to zero a register", correct: false },
          { id: "d", text: "MOV doesn't work with immediate 0", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d55-q2", type: "quiz", title: "SAR vs SHR",
        description: "Understanding arithmetic vs logical shifts",
        question: "What is the difference between SAR and SHR?",
        options: [
          { id: "a", text: "SAR shifts left, SHR shifts right", correct: false },
          { id: "b", text: "They are identical instructions", correct: false },
          { id: "c", text: "SAR preserves the sign bit, SHR fills with zeros", correct: true },
          { id: "d", text: "SAR uses CL, SHR uses an immediate", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d55-c1", type: "code", title: "Bit Mask Builder",
        description: "Use AND, OR, SHL, and SHR to construct and manipulate bit masks",
        starterCode: `section .text\nglobal _start\n\n_start:\n    ; Create mask: bits 3-6 set, rest clear = 0b01111000\n    ; Step 1: start with 1, shift left\n    mov rax, 1\n    shl rax, 3        ; bit 3 set\n    ; Step 2: set bits 4, 5, 6\n    mov rbx, 1\n    shl rbx, 4\n    or rax, rbx\n    shl rbx, 1        ; becomes bit 5\n    or rax, rbx\n    shl rbx, 1        ; becomes bit 6\n    or rax, rbx\n    ; rax = 0b01111000\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["Use SHL to position bits", "Use OR to combine masks", "Use NOT to invert"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d55-a1", title: "Bitwise Utility",
      description: "Write assembly that implements a set of bit manipulation utilities: set bit N, clear bit N, toggle bit N, and test bit N",
      requirements: [
        "Set bit 3 of a value using OR with a mask",
        "Clear bit 5 of a value using AND with an inverted mask",
        "Toggle bit 2 using XOR with a mask",
        "Test bit 7 using BT or AND",
        "Use SHL to create masks dynamically",
      ],
      starterCode: `section .data\n    value dq 0b10101010\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, [value]\n\n    ; Set bit 3: rax = rax | (1 << 3)\n    mov rbx, 1\n    shl rbx, 3\n    or rax, rbx\n\n    ; Clear bit 5: rax = rax & ~(1 << 5)\n    mov rcx, 1\n    shl rcx, 5\n    not rcx\n    and rax, rcx\n\n    ; Toggle bit 2: rax = rax ^ (1 << 2)\n    mov rdx, 1\n    shl rdx, 2\n    xor rax, rdx\n\n    ; Test bit 7:\n    bt rax, 7\n    ; CF now reflects bit 7\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Set bit using OR + SHL mask", points: 20 },
        { criterion: "Clear bit using AND + NOT mask", points: 20 },
        { criterion: "Toggle bit using XOR", points: 20 },
        { criterion: "Bit test using BT", points: 20 },
        { criterion: "Dynamic mask generation with SHL", points: 20 },
      ],
      xpReward: 100,
    },
  },

  56: {
    title: "Conditional Jumps",
    subtitle: "CMP, TEST, and branching",
    tags: ["control-flow", "jumps", "branching"],
    theory: {
      sections: [
        {
          heading: "The CMP Instruction and Flags",
          content:
            "CMP compares two operands by subtracting the second from the first (CMP a, b computes a - b) and sets the flags without storing the result. After CMP, you use a conditional jump to branch. CMP sets ZF (equal), CF (below/above for unsigned), SF (negative), OF (signed overflow).",
          codeExample: `; CMP and flag effects:\nmov rax, 10\ncmp rax, 10        ; ZF=1, CF=0, SF=0  (equal)\ncmp rax, 5         ; ZF=0, CF=0, SF=0  (greater)\ncmp rax, 20        ; ZF=0, CF=1, SF=1  (less, unsigned below)\n\n; Signed vs unsigned comparison matters:\nmov rax, -1\ncmp rax, 1\n; Unsigned: -1 is 0xFFFFFFFFFFFFFFFF → above\n; Signed:   -1 < 1 → less`,
        },
        {
          heading: "Conditional Jump Instructions",
          content:
            "Jumps check specific flag combinations. For signed: JE/JZ (ZF=1), JNE/JNZ (ZF=0), JG (SF=OF ∧ ZF=0), JGE (SF=OF), JL (SF≠OF), JLE (SF≠OF ∨ ZF=1). For unsigned: JA (CF=0 ∧ ZF=0), JAE (CF=0), JB (CF=1), JBE (CF=1 ∨ ZF=1). Also JP (parity), JS (sign), JO (overflow).",
          codeExample: `; Conditional jump patterns:\ncmp rax, rbx\nje  .equal          ; jump if rax == rbx\njne .not_equal      ; jump if rax != rbx\njg  .greater        ; jump if rax > rbx (signed)\njl  .lesser         ; jump if rax < rbx (signed)\nja  .above          ; jump if rax > rbx (unsigned)\njb  .below          ; jump if rax < rbx (unsigned)\njge .gequal         ; jump if rax >= rbx (signed)\njle .lequal         ; jump if rax <= rbx (signed)`,
        },
        {
          heading: "The TEST Instruction",
          content:
            "TEST performs AND between operands and sets flags without storing the result. Useful for checking if a value is zero or if specific bits are set. `test rax, rax` sets ZF if RAX is zero — more efficient than `cmp rax, 0`. TEST also clears CF and OF, sets SF and ZF.",
          codeExample: `; TEST usage patterns:\ntest rax, rax       ; check if rax is zero\njz  .zero           ; jump if ZF=1\n\n; Check specific bits:\ntest rax, 0x8       ; check if bit 3 is set\njnz .bit3_set\n\n; TEST for parity:\nmov al, 0b1010\ntest al, 1          ; ZF=0 if LSB=1\njz  .even           ; jump if LSB=0`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 56: Conditional Jumps\n; Practice branching logic\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 42\n    mov rbx, 42\n\n    cmp rax, rbx\n    je .equal\n    jne .not_equal\n\n.equal:\n    mov rcx, 1      ; they are equal\n    jmp .done\n\n.not_equal:\n    mov rcx, 0\n    jmp .done\n\n.done:\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d56-q1", type: "quiz", title: "JE vs JZ",
        description: "Understanding jump mnemonics",
        question: "What is the difference between JE and JZ?",
        options: [
          { id: "a", text: "JE is for signed, JZ for unsigned", correct: false },
          { id: "b", text: "JE checks equality, JZ checks bit 0", correct: false },
          { id: "c", text: "They are the same instruction (both check ZF=1)", correct: true },
          { id: "d", text: "JE jumps on equal values, JZ jumps on zero after ADD", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d56-q2", type: "quiz", title: "Signed vs Unsigned",
        description: "Choosing the right jump for data types",
        question: "To compare signed integers, which jump is correct for 'greater than'?",
        options: [
          { id: "a", text: "JA (jump above)", correct: false },
          { id: "b", text: "JG (jump greater)", correct: true },
          { id: "c", text: "JB (jump below)", correct: false },
          { id: "d", text: "JL (jump less)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d56-c1", type: "code", title: "Max of Two",
        description: "Write assembly that finds the maximum of two values using CMP and conditional jumps",
        starterCode: `section .data\n    a dq 45\n    b dq 78\n    result dq 0\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, [a]\n    mov rbx, [b]\n\n    ; TODO: compare rax and rbx\n    ; TODO: jump if rax >= rbx\n    ; TODO: if rbx is greater, move it to result\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["Use cmp rax, rbx", "Use jge to skip the move", "Use mov [result], rbx in the else path"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d56-a1", title: "Branching Calculator",
      description: "Write assembly that reads two numbers and a comparison type, then sets a result flag based on the comparison",
      requirements: [
        "Load two values from .data section",
        "Compare using CMP",
        "Set result to 1 if condition holds, 0 otherwise",
        "Support: equal, greater (signed), less than (signed)",
        "Use JMP to skip the else branch",
      ],
      starterCode: `section .data\n    x dq 50\n    y dq 30\n    is_equal dq 0\n    is_greater dq 0\n    is_less dq 0\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, [x]\n    mov rbx, [y]\n\n    ; Check equality\n    cmp rax, rbx\n    jne .check_greater\n    mov qword [is_equal], 1\n    jmp .done\n\n.check_greater:\n    cmp rax, rbx\n    jng .check_less\n    mov qword [is_greater], 1\n    jmp .done\n\n.check_less:\n    mov qword [is_less], 1\n\n.done:\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "CMP instruction used correctly", points: 20 },
        { criterion: "Equality check with JE/JNE", points: 20 },
        { criterion: "Signed greater-than with JG/JNG", points: 20 },
        { criterion: "Signed less-than with JL/JNL", points: 20 },
        { criterion: "JMP skip logic and clean exit", points: 20 },
      ],
      xpReward: 100,
    },
  },

  57: {
    title: "Loops in Assembly",
    subtitle: "Loop constructs with DEC/JNZ",
    tags: ["control-flow", "loops", "iteration"],
    theory: {
      sections: [
        {
          heading: "The DEC/JNZ Loop Pattern",
          content:
            "The most basic loop in assembly uses DEC (decrement) followed by JNZ (jump if not zero). Set a counter in a register, decrement it at the end of each iteration, and jump back if it hasn't reached zero. This is equivalent to a for loop: `for (int i = n; i > 0; i--)`.",
          codeExample: `; DEC/JNZ loop:\nmov rcx, 5        ; loop counter\n.loop_start:\n    ; loop body here\n    dec rcx\n    jnz .loop_start  ; continue if rcx != 0\n; loop executed 5 times\n\n; For counting up (0 to n-1):\nmov rcx, 5\nmov rax, 0\n.loop:\n    add rax, 1\n    cmp rax, rcx\n    jl .loop       ; jump if rax < 5`,
        },
        {
          heading: "The LOOP Instruction",
          content:
            "LOOP is a specialized instruction that combines DEC RCX and JNZ. It decrements RCX and jumps to the target label if RCX is not zero. However, LOOP is slower than DEC/JNZ on modern CPUs due to microcode implementation. Modern code typically uses DEC/JNZ for performance.",
          codeExample: `; Using LOOP instruction:\nmov rcx, 5\n.loop_start:\n    ; loop body\n    loop .loop_start  ; dec rcx; jnz .loop_start\n\n; LOOPE (loop while equal) - dec RCX, jump if RCX!=0 and ZF=1\n; LOOPNE (loop while not equal) - dec RCX, jump if RCX!=0 and ZF=0\n\n; Modern equivalent (faster on most CPUs):\nmov ecx, 5\n.top:\n    ; body\n    dec ecx\n    jnz .top`,
        },
        {
          heading: "Nested Loops and Loop Patterns",
          content:
            "For nested loops, save and restore the outer counter (e.g., push/pop or use a different register). Common loop patterns: summing an array (add in loop), finding max (cmp/jg in loop), string length (scan for null byte). Always be careful with the loop bounds — off-by-one errors are easy in assembly.",
          codeExample: `; Nested loop (matrix traversal):\nmov rcx, 3         ; outer counter\n.outer:\n    mov rbx, 4       ; inner counter\n    .inner:\n        ; body uses rcx (saved) and rbx\n        dec rbx\n        jnz .inner\n    dec rcx\n    jnz .outer\n\n; Sum an array:\nmov rcx, 5\nlea rsi, [array]\nxor rax, rax\n.sum_loop:\n    add rax, [rsi]\n    add rsi, 8      ; next qword\n    dec rcx\n    jnz .sum_loop\n; rax = array sum`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 57: Loops in Assembly\n; Practice loop constructs\n\nsection .data\n    array dq 10, 20, 30, 40, 50\n    count equ 5\n\nsection .text\nglobal _start\n\n_start:\n    ; Sum the array using a loop\n    mov rcx, count\n    lea rsi, [array]\n    xor rax, rax\n\n.sum_loop:\n    add rax, [rsi]\n    add rsi, 8\n    dec rcx\n    jnz .sum_loop\n    ; rax = 150\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d57-q1", type: "quiz", title: "Loop Counter",
        description: "How loops work in assembly",
        question: "After LOOP instruction, which register is decremented?",
        options: [
          { id: "a", text: "RAX", correct: false },
          { id: "b", text: "RBX", correct: false },
          { id: "c", text: "RCX", correct: true },
          { id: "d", text: "RSP", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d57-q2", type: "quiz", title: "Loop Performance",
        description: "Understanding loop instruction performance",
        question: "Why is DEC/JNZ preferred over LOOP on modern CPUs?",
        options: [
          { id: "a", text: "LOOP can only count up, not down", correct: false },
          { id: "b", text: "DEC/JNZ is faster due to simpler microcode", correct: true },
          { id: "c", text: "LOOP destroys RCX value permanently", correct: false },
          { id: "d", text: "DEC/JNZ can only be used once per program", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d57-c1", type: "code", title: "Array Sum",
        description: "Write a loop that sums all elements of an array and stores the result",
        starterCode: `section .data\n    numbers dq 7, 14, 21, 28, 35, 42\n    count equ 6\n    total dq 0\n\nsection .text\nglobal _start\n\n_start:\n    mov rcx, count\n    lea rsi, [numbers]\n    xor rax, rax\n\n.loop:\n    ; TODO: add current element to rax\n    ; TODO: advance to next element (add rsi, 8)\n    ; TODO: decrement counter and loop\n\n    mov [total], rax\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["Use add rax, [rsi]", "Use add rsi, 8 to move to next qword", "Use dec rcx + jnz .loop"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d57-a1", title: "Loop-Based Statistics",
      description: "Write assembly that computes sum, min, and max of an array using a single pass with loops",
      requirements: [
        "Define an array of at least 8 qword values",
        "Use a DEC/JNZ loop to iterate through the array",
        "Compute the sum, minimum, and maximum in one pass",
        "Store all three results in memory",
      ],
      starterCode: `section .data\n    values dq 45, 12, 78, 33, 91, 27, 64, 50\n    count equ 8\n    sum dq 0\n    min dq 0\n    max dq 0\n\nsection .text\nglobal _start\n\n_start:\n    mov rcx, count\n    lea rsi, [values]\n    xor rax, rax          ; sum\n    mov rbx, [rsi]        ; min (initialize to first)\n    mov rdx, [rsi]        ; max (initialize to first)\n\n.loop:\n    mov r8, [rsi]\n    add rax, r8           ; accumulate sum\n\n    cmp r8, rbx\n    jge .check_max\n    mov rbx, r8           ; new min\n\n.check_max:\n    cmp r8, rdx\n    jle .next\n    mov rdx, r8           ; new max\n\n.next:\n    add rsi, 8\n    dec rcx\n    jnz .loop\n\n    mov [sum], rax\n    mov [min], rbx\n    mov [max], rdx\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "DEC/JNZ loop structure correct", points: 20 },
        { criterion: "Sum accumulation correct", points: 20 },
        { criterion: "Min computation with CMP/JGE", points: 20 },
        { criterion: "Max computation with CMP/JLE", points: 20 },
        { criterion: "Results stored in memory", points: 20 },
      ],
      xpReward: 100,
    },
  },

  58: {
    title: "The Stack",
    subtitle: "PUSH, POP, and stack frame management",
    tags: ["stack", "memory", "rsp"],
    theory: {
      sections: [
        {
          heading: "Stack Fundamentals",
          content:
            "The stack is a Last-In-First-Out (LIFO) data structure that grows downward in memory (toward lower addresses). RSP (Stack Pointer) always points to the top of the stack. PUSH decrements RSP by 8 and stores a value at the new RSP. POP loads a value from RSP and increments RSP by 8. The stack is used for local variables, function arguments, return addresses, and register preservation.",
          codeExample: `; Stack operations:\npush rax           ; RSP -= 8; [RSP] = RAX\npush rbx           ; RSP -= 8; [RSP] = RBX\npush rcx           ; RSP -= 8; [RSP] = RCX\npop rcx            ; RCX = [RSP]; RSP += 8\npop rbx            ; RBX = [RSP]; RSP += 8\npop rax            ; RAX = [RSP]; RSP += 8\n; Stack restored to original state`,
        },
        {
          heading: "The Stack Frame (RBP)",
          content:
            "RBP (Base Pointer) is used to create a stable reference point for accessing function parameters and local variables. The prologue saves the old RBP and sets RBP = RSP. Parameters and locals are accessed at fixed offsets from RBP: arguments at positive offsets (e.g., [rbp+16]), locals at negative offsets (e.g., [rbp-8]). This lets RSP change during function execution while RBP stays fixed.",
          codeExample: `; Function prologue (standard):\nmypush rbp          ; save caller's base pointer\nmov rbp, rsp        ; set our frame pointer\nsub rsp, 32         ; allocate 32 bytes for locals\n\n; Accessing parameters (passed on stack):\nmov rax, [rbp+16]   ; first stack arg\nmov rbx, [rbp+24]   ; second stack arg\n\n; Accessing local variables:\nmov [rbp-8], rax    ; local var at offset -8\n\n; Epilogue:\nmov rsp, rbp        ; restore RSP\npop rbp             ; restore caller's RBP\nret`,
        },
        {
          heading: "Stack Alignment and the Red Zone",
          content:
            "The System V AMD64 ABI requires the stack to be 16-byte aligned before a CALL instruction. PUSH pushes 8 bytes, so an odd number of PUSHes before a CALL misaligns the stack. The red zone is a 128-byte area below RSP that can be used without moving RSP (in leaf functions only — functions that don't call other functions). Signal handlers and debuggers may overwrite the red zone, so it must be used with care.",
          codeExample: `; Stack alignment:\n; Before CALL: RSP must be 16-byte aligned\n; CALL pushes 8 bytes (return address), so inside function RSP ≡ 8 (mod 16)\n; Function then pushes RBP (8 more bytes) → RSP ≡ 0 (mod 16)\n\n; Red zone (leaf functions only):\nmy_leaf_func:\n    mov [rsp-8], rax     ; use red zone — no RSP adjustment needed\n    ; compute...\n    mov rax, [rsp-8]\n    ret\n    ; No sub rsp needed because we used red zone`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 58: The Stack\n; Push and pop values\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 100\n    mov rbx, 200\n    mov rcx, 300\n\n    push rax        ; save values\n    push rbx\n    push rcx\n\n    ; ... do work that might use rax, rbx, rcx\n    xor rax, rax\n    xor rbx, rbx\n    xor rcx, rcx\n\n    pop rcx         ; restore in reverse order\n    pop rbx\n    pop rax\n    ; rax=100, rbx=200, rcx=300 restored\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d58-q1", type: "quiz", title: "Stack Direction",
        description: "Understanding stack growth",
        question: "In what direction does the x86-64 stack grow?",
        options: [
          { id: "a", text: "Toward higher addresses (upward)", correct: false },
          { id: "b", text: "Toward lower addresses (downward)", correct: true },
          { id: "c", text: "Randomly based on ASLR", correct: false },
          { id: "d", text: "It doesn't grow — it's a fixed size", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d58-q2", type: "quiz", title: "PUSH/POP Order",
        description: "LIFO behaviour",
        question: "If you PUSH rax, PUSH rbx, then POP rcx, what value does rcx get?",
        options: [
          { id: "a", text: "The value that was in rax", correct: false },
          { id: "b", text: "The value that was in rbx", correct: true },
          { id: "c", text: "The value of RSP before the first PUSH", correct: false },
          { id: "d", text: "Zero (stack is cleared on POP)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d58-c1", type: "code", title: "Stack Swap",
        description: "Use PUSH and POP to swap the values of two registers",
        starterCode: `section .text\nglobal _start\n\n_start:\n    mov rax, 0xAAA\n    mov rbx, 0xBBB\n\n    ; TODO: swap rax and rbx using the stack\n    ; push rax, push rbx, then pop in right order\n\n    ; After swap: rax should be 0xBBB, rbx should be 0xAAA\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["push rax; push rbx; pop rax; pop rbx gives wrong swap", "Think LIFO: push both then pop in reverse"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d58-a1", title: "Stack-Based Calculator",
      description: "Write assembly that uses the stack to preserve registers while computing a multi-step expression",
      requirements: [
        "Compute (a + b) * (c - d) where all values start in registers",
        "Use PUSH/POP to save and restore intermediate results",
        "Push at least 3 values onto the stack during computation",
        "Restore all registers to their original values by the end",
      ],
      starterCode: `section .text\nglobal _start\n\n_start:\n    mov rax, 10     ; a\n    mov rbx, 20     ; b\n    mov rcx, 30     ; c\n    mov rdx, 5      ; d\n\n    ; Stack-based calculator:\n    ; (a + b) * (c - d)\n\n    push rax        ; preserve original a\n    push rbx        ; preserve original b\n\n    add rax, rbx    ; rax = a + b\n    push rax        ; save (a+b) on stack\n\n    mov rax, rcx\n    sub rax, rdx    ; rax = c - d\n\n    pop rbx         ; rbx = (a+b)\n    mul rbx         ; rdx:rax = (a+b)*(c-d)\n\n    ; rax now holds the result\n    ; restore original values from stack\n    pop rbx         ; restore rbx\n    pop rax         ; restore rax\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "PUSH used to preserve values", points: 20 },
        { criterion: "POP used to restore values", points: 20 },
        { criterion: "Intermediate result saved on stack", points: 20 },
        { criterion: "Computation produces correct result", points: 20 },
        { criterion: "Registers restored to original values", points: 20 },
      ],
      xpReward: 100,
    },
  },

  59: {
    title: "Functions & CALL/RET",
    subtitle: "Calling conventions and stack frames",
    tags: ["functions", "call", "ret", "abi"],
    theory: {
      sections: [
        {
          heading: "CALL and RET",
          content:
            "CALL pushes the return address (address of the next instruction) onto the stack and jumps to the target label. RET pops the return address and jumps to it. This allows functions to return to the caller. The pair CALL/RET is the fundamental mechanism for code reuse in assembly. CALL is equivalent to `push return_addr; jmp target`.",
          codeExample: `; CALL/RET mechanism:\n_start:\n    call my_func    ; push address of 'next', jmp my_func\nnext:               ; execution resumes here after RET\n    mov rax, 60\n    xor rdi, rdi\n    syscall\n\nmy_func:\n    ; function body\n    ret             ; pop address from stack, jmp there\n\n; Manual equivalent of CALL:\n; lea rax, [next]\n; push rax\n; jmp my_func`,
        },
        {
          heading: "Function Prologue and Epilogue",
          content:
            "The standard prologue saves the old RBP and sets up the new frame: `push rbp; mov rbp, rsp`. Then RSP is decremented to allocate local variables. The epilogue reverses this: `mov rsp, rbp; pop rbp; ret`. Parameters passed on the stack are at [rbp+16], [rbp+24], etc. Locals are at [rbp-8], [rbp-16], etc.",
          codeExample: `; Complete function frame:\nmy_function:\n    ; Prologue\n    push rbp\n    mov rbp, rsp\n    sub rsp, 32     ; allocate 32 bytes for locals\n\n    ; Save callee-saved registers\n    push rbx\n    push r12\n\n    ; Function body...\n    ; [rbp+16] = first stack arg\n    ; [rbp-8]  = local var\n\n    ; Epilogue\n    pop r12\n    pop rbx\n    mov rsp, rbp\n    pop rbp\n    ret`,
        },
        {
          heading: "System V AMD64 Calling Convention",
          content:
            "The System V ABI is used on Linux/macOS x86-64. Integer/pointer arguments go in: RDI, RSI, RDX, RCX, R8, R9 (left to right). Additional arguments go on the stack (right to left). RAX holds the return value. Caller-saved registers (RAX, RCX, RDX, RSI, RDI, R8-R11) may be clobbered by the callee. Callee-saved registers (RBX, RBP, R12-R15) must be preserved. The stack must be 16-byte aligned before CALL.",
          codeExample: `; Calling a function with 3 args:\n; int sum(int a, int b, int c) { return a + b + c; }\n\nmov rdi, 10        ; first arg\nmov rsi, 20        ; second arg\nmov rdx, 30        ; third arg\ncall sum\n; rax = 60\n\nsum:\n    push rbp\n    mov rbp, rsp\n    ; rdi = a, rsi = b, rdx = c\n    mov rax, rdi\n    add rax, rsi\n    add rax, rdx\n    pop rbp\n    ret`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 59: Functions & CALL/RET\n; Write and call your own function\n\nsection .text\nglobal _start\n\n_start:\n    mov rdi, 7\n    mov rsi, 3\n    call my_add\n    ; result now in rax\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall\n\n; Function: my_add(a, b) → a + b\nmy_add:\n    push rbp\n    mov rbp, rsp\n    mov rax, rdi    ; first arg\n    add rax, rsi    ; add second arg\n    pop rbp\n    ret`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d59-q1", type: "quiz", title: "CALL behaviour",
        description: "What CALL does internally",
        question: "What does CALL push onto the stack?",
        options: [
          { id: "a", text: "The current value of RAX", correct: false },
          { id: "b", text: "The address of the next instruction after CALL", correct: true },
          { id: "c", text: "The target function's address", correct: false },
          { id: "d", text: "The value of RSP", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d59-q2", type: "quiz", title: "Callee-saved",
        description: "Register preservation rules",
        question: "Which of these registers must be preserved by a callee function?",
        options: [
          { id: "a", text: "RAX, RCX, RDX", correct: false },
          { id: "b", text: "RBX, RBP, R12-R15", correct: true },
          { id: "c", text: "RDI, RSI, RDX", correct: false },
          { id: "d", text: "R8, R9, R10, R11", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d59-c1", type: "code", title: "Function Chain",
        description: "Write two functions where one calls the other, following the System V ABI",
        starterCode: `section .text\nglobal _start\n\n_start:\n    ; Call double_then_add(5, 3)\n    ; should return (5*2) + (3*2) = 16\n    mov rdi, 5\n    mov rsi, 3\n    call double_then_add\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall\n\n; double_then_add(a, b) = double(a) + double(b)\ndouble_then_add:\n    push rbp\n    mov rbp, rsp\n    push rbx\n\n    ; Save a in rbx, call double(a)\n    mov rbx, rdi\n    call double_val\n    mov rbx, rax    ; rbx holds double(a)\n\n    ; Call double(b)\n    mov rdi, rsi\n    call double_val\n\n    ; rax = double(b) + double(a)\n    add rax, rbx\n\n    pop rbx\n    pop rbp\n    ret\n\n; double_val(x) = x * 2\ndouble_val:\n    push rbp\n    mov rbp, rsp\n    add rdi, rdi    ; rdi = rdi * 2\n    mov rax, rdi\n    pop rbp\n    ret`,
        hints: ["Save callee-saved regs before calling sub-functions", "Use RBX to preserve values across nested calls"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d59-a1", title: "Math Library",
      description: "Write a small math library with multiple functions that call each other, using proper prologue/epilogue and register preservation",
      requirements: [
        "Implement functions: square(x), cube(x), sum_of_squares(a, b)",
        "cube must call square internally",
        "sum_of_squares calls square twice",
        "Use proper prologue (push rbp; mov rbp, rsp) in each function",
        "Preserve all callee-saved registers",
      ],
      starterCode: `section .text\nglobal _start\n\n_start:\n    ; Test: sum_of_squares(3, 4) = 3^2 + 4^2 = 9 + 16 = 25\n    mov rdi, 3\n    mov rsi, 4\n    call sum_of_squares\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall\n\n; square(x) = x * x\nsquare:\n    push rbp\n    mov rbp, rsp\n    mov rax, rdi\n    imul rax, rax\n    pop rbp\n    ret\n\n; cube(x) = x * x * x = square(x) * x\ncube:\n    push rbp\n    mov rbp, rsp\n    push rbx\n    mov rbx, rdi       ; save original x\n    call square        ; rax = x^2\n    imul rax, rbx      ; rax = x^2 * x = x^3\n    pop rbx\n    pop rbp\n    ret\n\n; sum_of_squares(a, b) = square(a) + square(b)\nsum_of_squares:\n    push rbp\n    mov rbp, rsp\n    push rbx\n    push r12\n    mov rbx, rdi       ; save a\n    mov r12, rsi       ; save b\n    call square        ; rax = a^2\n    mov rbx, rax       ; rbx = a^2\n    mov rdi, r12       ; arg = b\n    call square        ; rax = b^2\n    add rax, rbx       ; rax = a^2 + b^2\n    pop r12\n    pop rbx\n    pop rbp\n    ret`,
      rubric: [
        { criterion: "square function with correct prologue/epilogue", points: 15 },
        { criterion: "cube function calling square internally", points: 20 },
        { criterion: "sum_of_squares calling square twice", points: 20 },
        { criterion: "Callee-saved register preservation", points: 25 },
        { criterion: "Correct return values in RAX", points: 20 },
      ],
      xpReward: 100,
    },
  },

  60: {
    title: "Memory Addressing Modes",
    subtitle: "Direct, indirect, indexed, and base+offset",
    tags: ["memory", "addressing", "modes"],
    theory: {
      sections: [
        {
          heading: "Direct Addressing",
          content:
            "Direct addressing uses a fixed address (or label) to access memory. The address is encoded directly in the instruction. Format: `mov rax, [address]`. Direct addressing is simple but inflexible — the address must be known at assembly time. Data section labels resolve to direct addresses after linking.",
          codeExample: `; Direct addressing:\nsection .data\n    myvar dq 12345\n\nsection .text\n_start:\n    mov rax, [myvar]      ; load from label 'myvar'\n    mov rbx, [0x601040]   ; absolute address (not recommended)\n\n; The assembler converts labels to addresses:\n; mov rax, [myvar] → mov rax, [0x601030]`,
        },
        {
          heading: "Register Indirect Addressing",
          content:
            "Register indirect addressing uses a register containing a memory address. The brackets dereference the pointer. Format: `mov rax, [rbx]` loads the value at the address stored in RBX. This is the assembly equivalent of dereferencing a pointer in C. Combined with arithmetic in the register, this enables array traversal, linked-list walking, and dynamic memory access.",
          codeExample: `; Register indirect:\nmov rbx, myvar       ; rbx = address of myvar\nmov rax, [rbx]       ; rax = value at myvar\n\n; Pointer arithmetic:\nadd rbx, 8           ; rbx points to next qword\nmov rax, [rbx]       ; load next element\n\n; Dereferencing a pointer to pointer:\nmov rbx, [ptr_to_ptr]\nmov rax, [rbx]       ; rax = **ptr_to_ptr`,
        },
        {
          heading: "Base+Index*Scale+Displacement",
          content:
            "The full addressing formula is: `[base + index*scale + displacement]`. Base holds a pointer (e.g., array start), index is a variable offset, scale multiplies (1, 2, 4, 8 for byte/size adjustment), displacement is a fixed offset. This one formula handles arrays, structs, stack frames, and more. The LEA instruction uses the same formula without accessing memory.",
          codeExample: `; Full addressing examples:\n; Array access: arr[i] where arr is 8-byte elements\nmov rcx, i             ; index\nmov rax, [arr + rcx*8] ; arr[i] — base + index*scale\n\n; Struct member access:\n; struct { int x; int y; long z; }  — 16 bytes total\nmov rax, [rbx]         ; s.x at offset 0\nmov rax, [rbx + 4]     ; s.y at offset 4\nmov rax, [rbx + 8]     ; s.z at offset 8\n\n; Stack frame access:\nmov rax, [rbp + 16]    ; first stack argument\nmov rax, [rbp - 8]     ; local variable\n\n; LEA (load effective address):\nlea rax, [array + rcx*8]  ; rax = address of arr[i], not value`,
        },
      ],
    },
    playground: {
      defaultCode: `; Day 60: Memory Addressing Modes\n; Practice all addressing forms\n\nsection .data\n    arr dq 100, 200, 300, 400, 500\n\nsection .text\nglobal _start\n\n_start:\n    ; Direct\n    mov rax, [arr]         ; arr[0] = 100\n\n    ; Register indirect\n    mov rbx, arr\n    mov rcx, [rbx]         ; arr[0] = 100\n\n    ; Base + displacement\n    mov rdx, [rbx + 8]     ; arr[1] = 200\n\n    ; Indexed with scale\n    mov rsi, 2\n    mov r8, [arr + rsi*8]  ; arr[2] = 300\n\n    ; Full form\n    mov r9, [rbx + rsi*8 + 8] ; arr[3] = 400\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d60-q1", type: "quiz", title: "Addressing Formula",
        description: "Understanding addressing components",
        question: "What is the scale factor for accessing an array of 8-byte elements?",
        options: [
          { id: "a", text: "1", correct: false },
          { id: "b", text: "2", correct: false },
          { id: "c", text: "4", correct: false },
          { id: "d", text: "8", correct: true },
        ],
        xpReward: 25,
      },
      {
        id: "d60-q2", type: "quiz", title: "LEA vs MOV",
        description: "Distinguishing address computation from data access",
        question: "What is the difference between `lea rax, [rbx+8]` and `mov rax, [rbx+8]`?",
        options: [
          { id: "a", text: "They are identical in behaviour", correct: false },
          { id: "b", text: "LEA computes address; MOV loads value at that address", correct: true },
          { id: "c", text: "LEA loads value; MOV computes address", correct: false },
          { id: "d", text: "LEA only works with labels, MOV only with registers", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d60-c1", type: "code", title: "Array Accessor",
        description: "Use indexed addressing to access and modify elements of an array",
        starterCode: `section .data\n    values dq 10, 20, 30, 40, 50\n\nsection .text\nglobal _start\n\n_start:\n    ; Access values[2] (third element = 30)\n    mov rcx, 2\n    mov rax, [values + rcx*8]\n    ; rax should be 30\n\n    ; Modify values[4] = 99\n    mov rcx, 4\n    mov qword [values + rcx*8], 99\n\n    ; Load values[4] to verify\n    mov rbx, [values + rcx*8]\n    ; rbx should be 99\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
        hints: ["Scale must match element size (8 for qword)", "Use qword directive for size when storing"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d60-a1", title: "Addressing Mode Calculator",
      description: "Write an assembly program that uses all five addressing modes to compute the sum of an array with a twist: access every other element",
      requirements: [
        "Direct addressing: load first element",
        "Register indirect: load through a pointer register",
        "Base+displacement: load element at fixed offset from pointer",
        "Indexed: access arr[i*2] for every other element",
        "Full form: access arr[i*2 + 1] with base, index*scale, displacement",
        "Compute and store the sum of these accessed elements",
      ],
      starterCode: `section .data\n    data dq 2, 4, 6, 8, 10, 12, 14, 16\n    count equ 4\n    result dq 0\n\nsection .text\nglobal _start\n\n_start:\n    ; Access every other element using each addressing mode\n    ; Direct:\n    mov rax, [data]           ; data[0] = 2\n    mov r8, rax\n\n    ; Register indirect:\n    mov rbx, data\n    mov rax, [rbx + 16]       ; data[2] = 6\n    add r8, rax\n\n    ; Base + displacement:\n    mov rax, [rbx + 32]       ; data[4] = 10\n    add r8, rax\n\n    ; Indexed with scale:\n    mov rcx, 3\n    mov rax, [data + rcx*8]   ; data[3] = 8\n    add r8, rax\n\n    ; Full form:\n    mov rcx, 1\n    mov rax, [rbx + rcx*8 + 24] ; data[4] = 10\n    add r8, rax\n\n    ; r8 = 2 + 6 + 10 + 8 + 10 = 36\n    mov [result], r8\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`,
      rubric: [
        { criterion: "Direct addressing used correctly", points: 15 },
        { criterion: "Register indirect addressing used", points: 15 },
        { criterion: "Base+displacement addressing used", points: 20 },
        { criterion: "Indexed addressing with scale used", points: 20 },
        { criterion: "Full form addressing used", points: 15 },
        { criterion: "Correct sum computation", points: 15 },
      ],
      xpReward: 100,
    },
  },
};
interface DayBlueprint {
  title: string;
  subtitle: string;
  language: "c" | "asm";
  tags: string[];
  theoryTopics: string[];
  codeTemplate: string;
}

const C_CURRICULUM: DayBlueprint[] = [
  { title: "The Machine Awakens", subtitle: "Hello World & compilation pipeline", language: "c", tags: ["hello-world"], theoryTopics: ["Why C", "Compilation", "main()"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}` },
  { title: "Data Types & Memory Layout", subtitle: "Fundamental types and sizeof", language: "c", tags: ["types"], theoryTopics: ["int", "char", "float", "sizeof"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    printf("int: %zu bytes\\n", sizeof(int));\n    return 0;\n}` },
  { title: "Variables & Operators", subtitle: "Arithmetic and bitwise ops", language: "c", tags: ["operators"], theoryTopics: ["Variables", "Bitwise", "Precedence"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    unsigned a = 5, b = 3;\n    printf("a & b = %u\\n", a & b);\n    return 0;\n}` },
  { title: "Control Flow: Conditionals", subtitle: "if, else, switch — branching logic", language: "c", tags: ["control-flow"], theoryTopics: ["if/else", "switch", "ternary"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int score = 85;\n    if (score >= 90) printf("A\\n");\n    else if (score >= 80) printf("B\\n");\n    else printf("C\\n");\n    return 0;\n}` },
  { title: "Control Flow: Loops", subtitle: "for, while, do-while iteration", language: "c", tags: ["loops"], theoryTopics: ["for", "while", "do-while", "break/continue"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    for (int i = 0; i < 5; i++)\n        printf("%d ", i);\n    printf("\\n");\n    return 0;\n}` },
  { title: "Functions", subtitle: "Declaration, definition, and scope", language: "c", tags: ["functions"], theoryTopics: ["Prototypes", "Parameters", "Return values"], codeTemplate: `#include <stdio.h>\n\nint square(int x) { return x * x; }\n\nint main(void) {\n    printf("4^2 = %d\\n", square(4));\n    return 0;\n}` },
  { title: "Arrays", subtitle: "Contiguous memory blocks", language: "c", tags: ["arrays"], theoryTopics: ["Declaration", "Indexing", "Bounds"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int arr[5] = {1, 2, 3, 4, 5};\n    for (int i = 0; i < 5; i++)\n        printf("%d ", arr[i]);\n    printf("\\n");\n    return 0;\n}` },
  { title: "Strings", subtitle: "char arrays and string.h", language: "c", tags: ["strings"], theoryTopics: ["Null terminator", "strlen", "strcpy"], codeTemplate: `#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char msg[] = "systems";\n    printf("Length: %zu\\n", strlen(msg));\n    return 0;\n}` },
  { title: "Pointers Intro", subtitle: "Addresses, dereferencing, the & operator", language: "c", tags: ["pointers"], theoryTopics: ["Address-of", "Dereference", "NULL"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int x = 42;\n    int *p = &x;\n    printf("x=%d, *p=%d, addr=%p\\n", x, *p, (void*)p);\n    return 0;\n}` },
  { title: "Pointer Arithmetic", subtitle: "Navigating memory with pointers", language: "c", tags: ["pointers"], theoryTopics: ["Increment", "Array-pointer equivalence", "void*"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int arr[] = {10, 20, 30};\n    int *p = arr;\n    printf("%d %d %d\\n", *p, *(p+1), *(p+2));\n    return 0;\n}` },
  { title: "Structs", subtitle: "Grouping data into custom types", language: "c", tags: ["structs"], theoryTopics: ["Definition", "Members", "typedef"], codeTemplate: `#include <stdio.h>\n\ntypedef struct { char name[32]; int age; } Person;\n\nint main(void) {\n    Person p = {"Neo", 30};\n    printf("%s, age %d\\n", p.name, p.age);\n    return 0;\n}` },
  { title: "Enums & Unions", subtitle: "Named constants and shared memory", language: "c", tags: ["enums"], theoryTopics: ["enum", "union", "Memory overlay"], codeTemplate: `#include <stdio.h>\n\ntypedef enum { RED, GREEN, BLUE } Color;\n\nint main(void) {\n    Color c = GREEN;\n    printf("Color value: %d\\n", c);\n    return 0;\n}` },
  { title: "Dynamic Memory: malloc", subtitle: "Heap allocation fundamentals", language: "c", tags: ["memory"], theoryTopics: ["malloc", "free", "Heap vs Stack"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = malloc(5 * sizeof(int));\n    if (arr) { arr[0] = 42; printf("%d\\n", arr[0]); free(arr); }\n    return 0;\n}` },
  { title: "Dynamic Memory: realloc & calloc", subtitle: "Resizing and zero-initialization", language: "c", tags: ["memory"], theoryTopics: ["calloc", "realloc", "Memory leaks"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *p = calloc(3, sizeof(int));\n    p = realloc(p, 5 * sizeof(int));\n    free(p);\n    return 0;\n}` },
  { title: "Function Pointers", subtitle: "Callbacks and dispatch tables", language: "c", tags: ["pointers"], theoryTopics: ["Syntax", "Callbacks", "qsort"], codeTemplate: `#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\n\nint main(void) {\n    int (*op)(int, int) = add;\n    printf("3+4 = %d\\n", op(3, 4));\n    return 0;\n}` },
  { title: "Preprocessor", subtitle: "#define, macros, and conditional compilation", language: "c", tags: ["preprocessor"], theoryTopics: ["#define", "Macros", "#ifdef"], codeTemplate: `#include <stdio.h>\n\n#define MAX(a,b) ((a)>(b)?(a):(b))\n\nint main(void) {\n    printf("MAX(3,7) = %d\\n", MAX(3, 7));\n    return 0;\n}` },
  { title: "File I/O", subtitle: "Reading and writing files with stdio", language: "c", tags: ["files"], theoryTopics: ["fopen", "fread", "fwrite", "fclose"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    FILE *f = fopen("test.txt", "w");\n    if (f) { fprintf(f, "data\\n"); fclose(f); }\n    return 0;\n}` },
  { title: "Command Line Arguments", subtitle: "argc, argv, and program interfaces", language: "c", tags: ["cli"], theoryTopics: ["argc/argv", "Parsing", "getopt"], codeTemplate: `#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n    for (int i = 0; i < argc; i++)\n        printf("arg[%d]: %s\\n", i, argv[i]);\n    return 0;\n}` },
  { title: "Recursion", subtitle: "Functions calling themselves", language: "c", tags: ["recursion"], theoryTopics: ["Base case", "Stack frames", "Tail recursion"], codeTemplate: `#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main(void) {\n    printf("5! = %d\\n", factorial(5));\n    return 0;\n}` },
  { title: "Linked Lists", subtitle: "Dynamic data structures in C", language: "c", tags: ["data-structures"], theoryTopics: ["Node struct", "Insert", "Traverse"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node { int data; struct Node *next; } Node;\n\nint main(void) {\n    Node n1 = {42, NULL};\n    printf("Data: %d\\n", n1.data);\n    return 0;\n}` },
  { title: "Stack Implementation", subtitle: "LIFO data structure from scratch", language: "c", tags: ["data-structures"], theoryTopics: ["Push", "Pop", "Overflow"], codeTemplate: `#include <stdio.h>\n\n#define MAX 100\nint stack[MAX], top = -1;\n\nvoid push(int v) { stack[++top] = v; }\nint pop(void) { return stack[top--]; }\n\nint main(void) {\n    push(10); push(20);\n    printf("Popped: %d\\n", pop());\n    return 0;\n}` },
  { title: "Queue Implementation", subtitle: "FIFO data structure from scratch", language: "c", tags: ["data-structures"], theoryTopics: ["Enqueue", "Dequeue", "Circular buffer"], codeTemplate: `#include <stdio.h>\n\n#define MAX 100\nint queue[MAX], front = 0, rear = -1;\n\nvoid enqueue(int v) { queue[++rear] = v; }\nint dequeue(void) { return queue[front++]; }\n\nint main(void) {\n    enqueue(1); enqueue(2);\n    printf("Dequeued: %d\\n", dequeue());\n    return 0;\n}` },
  { title: "Binary Search", subtitle: "Divide and conquer on sorted arrays", language: "c", tags: ["algorithms"], theoryTopics: ["O(log n)", "Implementation", "Edge cases"], codeTemplate: `#include <stdio.h>\n\nint bsearch(int arr[], int n, int target) {\n    int lo = 0, hi = n - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;\n    }\n    return -1;\n}\n\nint main(void) {\n    int a[] = {1,3,5,7,9};\n    printf("Index: %d\\n", bsearch(a, 5, 7));\n    return 0;\n}` },
  { title: "Sorting Algorithms", subtitle: "Bubble, insertion, and selection sort", language: "c", tags: ["algorithms"], theoryTopics: ["O(n²) sorts", "Stability", "When to use"], codeTemplate: `#include <stdio.h>\n\nvoid bubble_sort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n}\n\nint main(void) {\n    int a[] = {5,2,8,1,9};\n    bubble_sort(a, 5);\n    for (int i = 0; i < 5; i++) printf("%d ", a[i]);\n    return 0;\n}` },
  { title: "Multi-dimensional Arrays", subtitle: "Matrices and nested loops", language: "c", tags: ["arrays"], theoryTopics: ["2D arrays", "Row-major order", "Matrix ops"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int mat[2][3] = {{1,2,3},{4,5,6}};\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++)\n            printf("%d ", mat[i][j]);\n        printf("\\n");\n    }\n    return 0;\n}` },
  { title: "String Manipulation", subtitle: "Building string utilities from scratch", language: "c", tags: ["strings"], theoryTopics: ["my_strlen", "my_strcpy", "my_strcmp"], codeTemplate: `#include <stdio.h>\n\nint my_strlen(const char *s) {\n    int len = 0;\n    while (s[len]) len++;\n    return len;\n}\n\nint main(void) {\n    printf("len = %d\\n", my_strlen("hello"));\n    return 0;\n}` },
  { title: "Header Files & Modules", subtitle: "Organizing code across files", language: "c", tags: ["modules"], theoryTopics: [".h files", "Include guards", "extern"], codeTemplate: `/* math_utils.h */\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\nint add(int a, int b);\n#endif\n\n/* Usage in main.c */\n#include "math_utils.h"`,
  },
  { title: "const & volatile", subtitle: "Immutability and compiler hints", language: "c", tags: ["advanced"], theoryTopics: ["const pointers", "volatile", "restrict"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    const int MAX = 100;\n    int x = 10;\n    const int *p = &x;\n    printf("MAX=%d, *p=%d\\n", MAX, *p);\n    return 0;\n}` },
  { title: "Bit Fields", subtitle: "Packing data at the bit level", language: "c", tags: ["advanced"], theoryTopics: ["struct bit fields", "Flags", "Hardware registers"], codeTemplate: `#include <stdio.h>\n\ntypedef struct {\n    unsigned int flag1 : 1;\n    unsigned int flag2 : 1;\n    unsigned int value : 6;\n} Flags;\n\nint main(void) {\n    Flags f = {1, 0, 42};\n    printf("value=%u\\n", f.value);\n    return 0;\n}` },
  { title: "Error Handling", subtitle: "errno, perror, and defensive coding", language: "c", tags: ["errors"], theoryTopics: ["errno", "perror", "Return codes"], codeTemplate: `#include <stdio.h>\n#include <errno.h>\n#include <string.h>\n\nint main(void) {\n    FILE *f = fopen("/nonexistent", "r");\n    if (!f) perror("fopen failed");\n    return 0;\n}` },
  { title: "Memory Alignment", subtitle: "Padding, packing, and cache lines", language: "c", tags: ["memory"], theoryTopics: ["Alignment rules", "Padding", "offsetof"], codeTemplate: `#include <stdio.h>\n#include <stddef.h>\n\ntypedef struct { char a; int b; char c; } S;\n\nint main(void) {\n    printf("sizeof(S) = %zu\\n", sizeof(S));\n    printf("offset b = %zu\\n", offsetof(S, b));\n    return 0;\n}` },
  { title: "Hash Table", subtitle: "Key-value storage with hashing", language: "c", tags: ["data-structures"], theoryTopics: ["Hash function", "Collisions", "Chaining"], codeTemplate: `#include <stdio.h>\n\nunsigned hash(const char *key) {\n    unsigned h = 5381;\n    while (*key) h = ((h << 5) + h) + *key++;\n    return h;\n}\n\nint main(void) {\n    printf("hash \\"test\\" = %u\\n", hash("test"));\n    return 0;\n}` },
  { title: "Binary Trees", subtitle: "Tree nodes and traversal", language: "c", tags: ["data-structures"], theoryTopics: ["Node struct", "Inorder", "Preorder"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TreeNode {\n    int val;\n    struct TreeNode *left, *right;\n} TreeNode;\n\nvoid inorder(TreeNode *n) {\n    if (!n) return;\n    inorder(n->left);\n    printf("%d ", n->val);\n    inorder(n->right);\n}\n\nint main(void) { return 0; }` },
  { title: "Makefile Basics", subtitle: "Automating builds with make", language: "c", tags: ["tooling"], theoryTopics: ["Targets", "Dependencies", "Variables"], codeTemplate: `# Makefile example\nCC = gcc\nCFLAGS = -Wall -Wextra -std=c11\n\nmain: main.o utils.o\n\t$(CC) $(CFLAGS) -o main main.o utils.o\n\nmain.o: main.c\n\t$(CC) $(CFLAGS) -c main.c` },
  { title: "Debugging with GDB", subtitle: "Breakpoints, watchpoints, backtraces", language: "c", tags: ["tooling"], theoryTopics: ["break", "step", "print", "backtrace"], codeTemplate: `# Compile with debug symbols:\n# gcc -g -O0 -o program program.c\n#\n# GDB commands:\n# (gdb) break main\n# (gdb) run\n# (gdb) next\n# (gdb) print variable\n# (gdb) backtrace` },
  { title: "Valgrind & Memory Tools", subtitle: "Detecting leaks and invalid access", language: "c", tags: ["tooling"], theoryTopics: ["memcheck", "Leak detection", "Invalid reads"], codeTemplate: `# Run with Valgrind:\n# valgrind --leak-check=full ./program\n#\n# Common issues detected:\n# - Memory leaks (malloc without free)\n# - Use after free\n# - Invalid reads/writes` },
  { title: "Multi-file Projects", subtitle: "Building a modular C application", language: "c", tags: ["projects"], theoryTopics: ["Project structure", "Static libraries", "Linking"], codeTemplate: `# Project layout:\n# src/main.c\n# src/utils.c\n# include/utils.h\n# Makefile\n#\n# gcc -Iinclude -c src/*.c\n# gcc -o app *.o` },
  { title: "Socket Programming Intro", subtitle: "Network communication in C", language: "c", tags: ["networking"], theoryTopics: ["socket()", "bind()", "connect()"], codeTemplate: `#include <stdio.h>\n/* #include <sys/socket.h> */\n/* Network programming requires platform-specific headers */\n\nint main(void) {\n    printf("Socket programming - Day 37\\n");\n    printf("Sockets enable TCP/UDP communication\\n");\n    return 0;\n}` },
  { title: "Signals", subtitle: "Inter-process communication via signals", language: "c", tags: ["systems"], theoryTopics: ["signal()", "SIGINT", "SIGSEGV"], codeTemplate: `#include <stdio.h>\n#include <signal.h>\n\nvoid handler(int sig) {\n    printf("Caught signal %d\\n", sig);\n}\n\nint main(void) {\n    signal(SIGINT, handler);\n    printf("Press Ctrl+C...\\n");\n    while(1);\n    return 0;\n}` },
  { title: "Process Management", subtitle: "fork, exec, wait — spawning processes", language: "c", tags: ["systems"], theoryTopics: ["fork()", "exec()", "wait()"], codeTemplate: `#include <stdio.h>\n/* Unix process management */\n\nint main(void) {\n    printf("Process management fundamentals\\n");\n    printf("fork() creates a child process\\n");\n    return 0;\n}` },
  { title: "Threads Intro", subtitle: "Concurrent execution with pthreads", language: "c", tags: ["concurrency"], theoryTopics: ["pthread_create", "Mutex", "Race conditions"], codeTemplate: `#include <stdio.h>\n/* #include <pthread.h> */\n\nint main(void) {\n    printf("Thread programming with pthreads\\n");\n    return 0;\n}` },
  { title: "Mutexes & Synchronization", subtitle: "Protecting shared resources", language: "c", tags: ["concurrency"], theoryTopics: ["pthread_mutex", "Deadlock", "Condition vars"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    printf("Mutex: mutual exclusion lock\\n");\n    printf("Prevents race conditions on shared data\\n");\n    return 0;\n}` },
  { title: "Memory Pools", subtitle: "Custom allocators for performance", language: "c", tags: ["memory"], theoryTopics: ["Pool design", "Arena allocators", "Fragmentation"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\n/* Simple memory pool concept */\ntypedef struct {\n    char *buffer;\n    size_t size, offset;\n} Pool;\n\nint main(void) {\n    printf("Memory pools reduce malloc overhead\\n");\n    return 0;\n}` },
  { title: "Generic Programming", subtitle: "void* and macro-based generics", language: "c", tags: ["advanced"], theoryTopics: ["void pointers", "_Generic", "Macro tricks"], codeTemplate: `#include <stdio.h>\n\n#define MAX_OF(a, b) ({ \\\n    typeof(a) _a = (a); \\\n    typeof(b) _b = (b); \\\n    _a > _b ? _a : _b; \\\n})\n\nint main(void) {\n    printf("max = %d\\n", MAX_OF(3, 7));\n    return 0;\n}` },
  { title: "C Standard Library Deep Dive", subtitle: "stdlib, string, stdio internals", language: "c", tags: ["stdlib"], theoryTopics: ["qsort", "bsearch", "atexit"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\nint cmp(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}\n\nint main(void) {\n    int arr[] = {5,2,8,1};\n    qsort(arr, 4, sizeof(int), cmp);\n    for (int i = 0; i < 4; i++) printf("%d ", arr[i]);\n    return 0;\n}` },
  { title: "Embedded C Patterns", subtitle: "Register access and volatile hardware", language: "c", tags: ["embedded"], theoryTopics: ["MMIO", "Register maps", "Interrupts"], codeTemplate: `#include <stdint.h>\n\n/* Memory-mapped I/O example */\n#define GPIO_BASE 0x40000000\n#define GPIO_ODR  (*(volatile uint32_t*)(GPIO_BASE + 0x14))\n\nint main(void) {\n    GPIO_ODR = 0xFF;\n    return 0;\n}` },
  { title: "Unit Testing in C", subtitle: "Testing frameworks and TDD", language: "c", tags: ["testing"], theoryTopics: ["Unity", "CMocka", "Test structure"], codeTemplate: `#include <stdio.h>\n#include <assert.h>\n\nint add(int a, int b) { return a + b; }\n\nint main(void) {\n    assert(add(2, 3) == 5);\n    assert(add(-1, 1) == 0);\n    printf("All tests passed!\\n");\n    return 0;\n}` },
  { title: "C to Assembly Bridge", subtitle: "How C compiles to machine code", language: "c", tags: ["asm-bridge"], theoryTopics: ["gcc -S", "Reading ASM output", "Calling conventions"], codeTemplate: `# Generate assembly from C:\n# gcc -S -O0 -fno-asynchronous-unwind-tables program.c\n#\n# int add(int a, int b) { return a + b; }\n# compiles to something like:\n# add:\n#     mov  eax, edi\n#     add  eax, esi\n#     ret` },
  { title: "Inline Assembly", subtitle: "Embedding ASM in C with __asm__", language: "c", tags: ["asm-bridge"], theoryTopics: ["__asm__ keyword", "Constraints", "Volatility"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int result;\n    __asm__("mov $42, %0" : "=r"(result));\n    printf("ASM result: %d\\n", result);\n    return 0;\n}` },
  { title: "Capstone: C Systems Project", subtitle: "Build a complete C application", language: "c", tags: ["capstone"], theoryTopics: ["Project planning", "Architecture", "Review"], codeTemplate: `#include <stdio.h>\n\n/* Capstone Project Ideas:\n * - CLI calculator with history\n * - Text editor (mini-vim)\n * - Memory allocator\n * - HTTP server\n * - Shell interpreter\n */\n\nint main(void) {\n    printf("C Capstone - Choose your weapon!\\n");\n    return 0;\n}` },
];

const ASM_CURRICULUM: DayBlueprint[] = [
  { title: "Assembly Genesis", subtitle: "What is Assembly and why learn it?", language: "asm", tags: ["intro"], theoryTopics: ["Machine code", "Mnemonics", "ISA"], codeTemplate: `; x86-64 NASM syntax\nsection .data\n    msg db 'Hello, registers!', 0\n\nsection .text\nglobal _start\n\n_start:\n    ; System call: write(1, msg, len)\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, msg\n    mov rdx, 18\n    syscall\n    mov rax, 60\n    xor rdi, rdi\n    syscall` },
  { title: "CPU Architecture", subtitle: "Registers, ALU, and the fetch-decode-execute cycle", language: "asm", tags: ["architecture"], theoryTopics: ["Registers", "ALU", "Pipeline"], codeTemplate: `; x86-64 General Purpose Registers (64-bit):\n; RAX - accumulator    RBX - base\n; RCX - counter        RDX - data\n; RSI - source index   RDI - dest index\n; RBP - base pointer   RSP - stack pointer\n; R8-R15 - extended registers\n\nsection .text\nglobal _start\n_start:\n    mov rax, 42    ; Load immediate into RAX\n    mov rbx, rax   ; Copy RAX to RBX\n    ; rax = 42, rbx = 42` },
  { title: "MOV & Data Movement", subtitle: "Loading, storing, and transferring data", language: "asm", tags: ["instructions"], theoryTopics: ["MOV", "Immediate values", "Register sizes"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rax, 255       ; 64-bit\n    mov eax, 255       ; lower 32 bits (zero-extends)\n    mov ax, 255        ; lower 16 bits\n    mov al, 255        ; lower 8 bits\n    mov ah, 0          ; upper 8 bits of AX\n    ; Each size clears upper bits (except AH path)` },
  { title: "Arithmetic Instructions", subtitle: "ADD, SUB, MUL, DIV on registers", language: "asm", tags: ["instructions"], theoryTopics: ["ADD/SUB", "MUL/DIV", "Overflow flags"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rax, 10\n    add rax, 5      ; rax = 15\n    sub rax, 3      ; rax = 12\n    imul rax, 2     ; rax = 24\n    mov rbx, 4\n    idiv rbx        ; rax = 6 (quotient), rdx = remainder\n    ; CF and OF flags set on overflow` },
  { title: "Logical & Bitwise Ops", subtitle: "AND, OR, XOR, NOT, shifts in ASM", language: "asm", tags: ["instructions"], theoryTopics: ["AND/OR/XOR", "SHL/SHR", "Flags"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rax, 0b1100\n    mov rbx, 0b1010\n    and rax, rbx    ; rax = 1000 (8)\n    or  rax, rbx    ; rax = 1110 (14)\n    xor rax, rbx    ; rax = 0100 (4)\n    not rax         ; flip all bits\n    shl rax, 2      ; shift left 2\n    shr rax, 1      ; shift right 1` },
  { title: "Conditional Jumps", subtitle: "CMP, TEST, and branching", language: "asm", tags: ["control-flow"], theoryTopics: ["CMP", "Flags register", "JE/JNE/JG/JL"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rax, 10\n    mov rbx, 20\n    cmp rax, rbx    ; sets flags: rax - rbx\n    jg  greater     ; jump if rax > rbx (signed)\n    jl  lesser\n    jmp done\ngreater:\n    ; rax is greater\n    jmp done\nlesser:\n    ; rax is lesser\ndone:\n    nop` },
  { title: "Loops in Assembly", subtitle: "Loop constructs with DEC/JNZ", language: "asm", tags: ["control-flow"], theoryTopics: ["Loop label", "DEC/JNZ", "LOOP instruction"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rcx, 5      ; counter\nloop_start:\n    ; body of loop here\n    dec rcx\n    jnz loop_start  ; jump if not zero\n    ; loop done\n    nop` },
  { title: "The Stack", subtitle: "PUSH, POP, and stack frame management", language: "asm", tags: ["stack"], theoryTopics: ["Stack grows down", "PUSH/POP", "RSP/RBP"], codeTemplate: `section .text\nglobal _start\n_start:\n    push rax        ; save rax on stack\n    push rbx        ; save rbx\n    mov rax, 42     ; use rax freely\n    pop rbx         ; restore rbx\n    pop rax         ; restore rax\n    ; Stack: grows toward lower addresses\n    ; RSP points to top of stack` },
  { title: "Functions & CALL/RET", subtitle: "Calling conventions and stack frames", language: "asm", tags: ["functions"], theoryTopics: ["CALL/RET", "Prologue/Epilogue", "System V ABI"], codeTemplate: `section .text\nglobal _start\n\nmy_add:\n    push rbp\n    mov rbp, rsp\n    mov rax, [rbp+16]  ; first arg\n    add rax, [rbp+24]  ; second arg\n    pop rbp\n    ret\n\n_start:\n    ; call my_add with args\n    nop` },
  { title: "Memory Addressing Modes", subtitle: "Direct, indirect, indexed, and base+offset", language: "asm", tags: ["memory"], theoryTopics: ["Direct", "Indirect", "Base+index*scale"], codeTemplate: `section .data\n    arr dd 10, 20, 30, 40\n\nsection .text\nglobal _start\n_start:\n    mov rax, [arr]          ; direct: arr[0]\n    mov rbx, arr\n    mov rcx, [rbx + 8]      ; indirect: arr[2]\n    mov rdx, [rbx + rcx*4]  ; indexed\n    ; Effective address = base + index*scale + disp` },
  { title: "System Calls", subtitle: "Invoking the OS kernel directly", language: "asm", tags: ["syscalls"], theoryTopics: ["syscall instruction", "Linux x64 ABI", "errno"], codeTemplate: `section .data\n    msg db 'Direct kernel call', 0xA\n    len equ $ - msg\n\nsection .text\nglobal _start\n_start:\n    mov rax, 1      ; sys_write\n    mov rdi, 1      ; stdout\n    mov rsi, msg\n    mov rdx, len\n    syscall\n    mov rax, 60     ; sys_exit\n    xor rdi, rdi\n    syscall` },
  { title: "String Operations", subtitle: "LODS, STOS, MOVS, SCAS, CMPS", language: "asm", tags: ["strings"], theoryTopics: ["String instructions", "Direction flag", "REP prefix"], codeTemplate: `section .data\n    src db 'Hello', 0\n    dst times 6 db 0\n\nsection .text\nglobal _start\n_start:\n    cld             ; clear direction (forward)\n    mov rsi, src    ; source\n    mov rdi, dst    ; destination\n    mov rcx, 5\n    rep movsb       ; move rcx bytes from [rsi] to [rdi]\n    nop` },
  { title: "x86-64 Calling Convention", subtitle: "System V AMD64 ABI in detail", language: "asm", tags: ["abi"], theoryTopics: ["Register args", "Stack alignment", "Red zone"], codeTemplate: `; System V AMD64 ABI:\n; Args: RDI, RSI, RDX, RCX, R8, R9 (then stack)\n; Return: RAX (and RDX for 128-bit)\n; Caller-saved: RAX, RCX, RDX, RSI, RDI, R8-R11\n; Callee-saved: RBX, RBP, R12-R15\n; Stack must be 16-byte aligned before CALL\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Reading C in Assembly", subtitle: "Decompiling mental models", language: "asm", tags: ["reverse"], theoryTopics: ["if/else in ASM", "Loops in ASM", "Function calls"], codeTemplate: `; C: if (x > 0) { y = x; } else { y = -x; }\n;\n; Assembly equivalent:\n;     mov  eax, [x]\n;     test eax, eax\n;     jle  .else\n;     mov  [y], eax\n;     jmp  .done\n; .else:\n;     neg  eax\n;     mov  [y], eax\n; .done:` },
  { title: "Arrays in Assembly", subtitle: "Contiguous memory traversal", language: "asm", tags: ["arrays"], theoryTopics: ["Base address", "Stride", "Bounds"], codeTemplate: `section .data\n    numbers dd 1, 2, 3, 4, 5\n    count equ 5\n\nsection .text\nglobal _start\n_start:\n    mov rcx, count\n    mov rsi, numbers\n    xor rax, rax        ; sum = 0\nsum_loop:\n    add eax, [rsi]\n    add rsi, 4          ; next int (4 bytes)\n    loop sum_loop\n    ; rax = sum of array` },
  { title: "Structs in Assembly", subtitle: "Accessing struct members by offset", language: "asm", tags: ["structs"], theoryTopics: ["Member offsets", "Padding", "Pointer to struct"], codeTemplate: `; struct Point { int x; int y; };  // 8 bytes\n;\n; Access point.x:  mov eax, [point]\n; Access point.y:  mov eax, [point + 4]\n; Via pointer:     mov eax, [rbx]      ; p->x\n;                  mov eax, [rbx + 4]  ; p->y\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Bit Manipulation in ASM", subtitle: "BT, BTS, BTR, BTC instructions", language: "asm", tags: ["bitwise"], theoryTopics: ["Bit test", "Set/clear/toggle", "Masks"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rax, 0b1010\n    bt  rax, 1      ; test bit 1 (CF = 1 if set)\n    bts rax, 0      ; set bit 0\n    btr rax, 3      ; clear bit 3\n    btc rax, 2      ; complement bit 2\n    ; rax modified in place` },
  { title: "Floating Point", subtitle: "SSE/AVX registers and float ops", language: "asm", tags: ["float"], theoryTopics: ["XMM registers", "movss/addss", "cvt"], codeTemplate: `section .text\nglobal _start\n_start:\n    ; SSE single-precision floats\n    ; movss xmm0, [a]    ; load float\n    ; addss xmm0, [b]    ; xmm0 += b\n    ; movss [result], xmm0\n    nop\n    ; XMM0-XMM15: 128-bit SIMD registers` },
  { title: "SIMD Intro", subtitle: "Vector operations with SSE/AVX", language: "asm", tags: ["simd"], theoryTopics: ["Parallel ops", "128/256-bit", "Use cases"], codeTemplate: `section .text\nglobal _start\n_start:\n    ; Process 4 floats at once:\n    ; movaps xmm0, [array1]\n    ; addps  xmm0, [array2]  ; 4 parallel adds\n    ; movaps [result], xmm0\n    nop` },
  { title: "Interrupts & Exceptions", subtitle: "Hardware events and handlers", language: "asm", tags: ["systems"], theoryTopics: ["IDT", "ISR", "Exception vectors"], codeTemplate: `; Interrupt Descriptor Table (IDT)\n; Each entry: handler address + segment + flags\n;\n; Common exceptions:\n; 0  - Division by zero\n; 6  - Invalid opcode\n; 13 - General protection fault\n; 14 - Page fault\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Inline ASM in C", subtitle: "GCC extended asm syntax", language: "asm", tags: ["inline"], theoryTopics: ["Constraints", "Clobbers", "Volatility"], codeTemplate: `; In C code:\n; int x = 10;\n; __asm__ volatile(\n;     "add $5, %0"\n;     : "+r"(x)       // output/input\n;     :               // no pure inputs\n;     : "cc"          // clobbered flags\n; );\n; // x is now 15` },
  { title: "Optimizing Assembly", subtitle: "Instruction selection and pipelining", language: "asm", tags: ["optimization"], theoryTopics: ["Pipeline stalls", "Branch prediction", "Loop unrolling"], codeTemplate: `section .text\nglobal _start\n_start:\n    ; Prefer LEA over ADD for addr calc\n    ; lea rax, [rbx + rcx*4 + 8]\n    ; Avoid partial register stalls\n    ; Use XOR for zero: xor eax, eax (not mov eax, 0)\n    nop` },
  { title: "Reverse Engineering", subtitle: "Reading disassembly like a book", language: "asm", tags: ["reverse"], theoryTopics: ["objdump", "Ghidra", "Pattern recognition"], codeTemplate: `# Tools for reverse engineering:\n# objdump -d ./program    ; disassemble\n# gdb                     ; live debugging\n# Ghidra / IDA Pro         ; decompilers\n#\n# Look for:\n# - Function prologues (push rbp; mov rbp, rsp)\n# - String references\n# - System call patterns` },
  { title: "Shellcode Basics", subtitle: "Position-independent machine code", language: "asm", tags: ["security"], theoryTopics: ["PIC", "No null bytes", "Payload structure"], codeTemplate: `; Shellcode requirements:\n; - Position independent (no hardcoded addresses)\n; - No null bytes (0x00) for string-based exploits\n; - Self-contained (resolves own addresses)\n;\n; Classic execve("/bin/sh") shellcode concept:\n; - Set up registers for sys_execve\n; - Point to "/bin/sh" string\n; - syscall` },
  { title: "Bootloader Concepts", subtitle: "First code the CPU executes", language: "asm", tags: ["boot"], theoryTopics: ["BIOS/UEFI", "Real mode", "Stage loaders"], codeTemplate: `; Boot process:\n; 1. CPU resets, CS:IP = FFFF:0000\n; 2. BIOS runs POST, finds boot device\n; 3. Loads 512-byte MBR to 0x7C00\n; 4. MBR jumps to bootloader\n; 5. Bootloader loads kernel\n;\n; [BITS 16]  ; Real mode\n; org 0x7C00\n; boot:\n;     jmp start` },
  { title: "Memory Segmentation", subtitle: "Segments, GDT, and protected mode", language: "asm", tags: ["memory"], theoryTopics: ["GDT", "Segments", "Protected mode"], codeTemplate: `; Global Descriptor Table (GDT):\n; Defines memory segments with permissions\n;\n; Segment descriptor (8 bytes):\n; - Base address (32-bit)\n; - Limit (20-bit)\n; - Access byte (P, DPL, S, Type)\n; - Flags (G, D/B, L, AVL)\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Paging & Virtual Memory", subtitle: "Page tables and address translation", language: "asm", tags: ["memory"], theoryTopics: ["Page tables", "TLB", "CR3 register"], codeTemplate: `; x86-64 4-level paging:\n; CR3 -> PML4 -> PDPT -> PD -> PT -> Physical page\n;\n; Virtual address (48-bit):\n; [47:39] PML4 index\n; [38:30] PDPT index\n; [29:21] PD index\n; [20:12] PT index\n; [11:0]  Page offset\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Multithreading in ASM", subtitle: "Thread creation at the lowest level", language: "asm", tags: ["concurrency"], theoryTopics: ["clone syscall", "Thread stacks", "TLS"], codeTemplate: `; Linux clone() for threads:\n; clone(flags, child_stack, ...)\n; CLONE_VM | CLONE_FS | CLONE_FILES | CLONE_SIGHAND\n;\n; Each thread needs its own stack\n; Thread-local storage via FS/GS segments\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Device Drivers Concept", subtitle: "Talking to hardware from ASM", language: "asm", tags: ["drivers"], theoryTopics: ["Port I/O", "MMIO", "Interrupt handlers"], codeTemplate: `; Two ways to access hardware:\n;\n; 1. Port I/O (x86 IN/OUT instructions):\n;    in  al, 0x60    ; read keyboard scancode\n;    out 0x80, al    ; write to diagnostic port\n;\n; 2. Memory-mapped I/O:\n;    mov eax, [0xB8000]  ; VGA text buffer\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Crypto Primitives in ASM", subtitle: "Hand-optimized XOR and AES-NI", language: "asm", tags: ["crypto"], theoryTopics: ["XOR loops", "AES-NI", "Timing attacks"], codeTemplate: `section .text\nglobal _start\n_start:\n    ; Simple XOR cipher:\n    ; mov rcx, length\n    ; mov rsi, plaintext\n    ; mov rdi, ciphertext\n    ; mov al, key_byte\n    ; xor_loop:\n    ;     lodsb\n    ;     xor al, key_byte\n    ;     stosb\n    ;     loop xor_loop\n    nop` },
  { title: "Capstone: ASM Systems Project", subtitle: "Bare-metal or low-level project", language: "asm", tags: ["capstone"], theoryTopics: ["Project ideas", "Integration", "Documentation"], codeTemplate: `; Capstone Project Ideas:\n; - Bootable OS kernel (protected mode)\n; - Keylogger (hooking keyboard interrupt)\n; - Custom malloc in pure ASM\n; - Game engine render loop\n; - Network packet sniffer\n\nsection .text\nglobal _start\n_start:\n    ; Your silicon masterpiece begins here\n    nop` },
  { title: "Advanced ASM Techniques", subtitle: "RDTSC, performance counters, and CPUID", language: "asm", tags: ["advanced"], theoryTopics: ["RDTSC", "Performance counters", "CPUID"], codeTemplate: `section .text\nglobal _start\n_start:\n    ; RDTSC — Read Time-Stamp Counter\n    ; rdtsc  ; returns EDX:EAX (64-bit TSC value)\n    ;\n    ; CPUID — Query CPU features\n    ; mov rax, 0  ; basic info\n    ; cpuid\n    ;\n    ; RDPMC — Read Performance Monitor Counter\n    ; mov rcx, 0  ; counter index\n    ; rdpmc\n    nop` },
  { title: "Exception Handling in ASM", subtitle: "SEH, error handling, and fault recovery", language: "asm", tags: ["systems"], theoryTopics: ["Structured Exception Handling", "Fault handlers", "Recovery"], codeTemplate: `; Windows SEH (x64):\n; Each function has an unwind table entry\n; .xdata section defines exception handlers\n;\n; Linux signal handling:\n; sigaction() with SA_SIGINFO\n; Handler gets siginfo_t and ucontext_t\n; Can modify RIP in ucontext to resume\n;\n; Minimal fault handler concept:\n;     ; Set up signal handler for SIGSEGV\n;     ; Access invalid memory\n;     ; Handler fixes mapping, returns\n;     ; Execution continues seamlessly\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Position-Independent Code", subtitle: "PIC, GOT, PLT, and shared libraries", language: "asm", tags: ["linking"], theoryTopics: ["PIC", "GOT", "PLT"], codeTemplate: `; Position-Independent Code (PIC):\n; Uses relative addressing instead of absolute\n;\n; GOT (Global Offset Table):\n;     ; Addresses of global symbols\n;     ; Updated by dynamic linker at runtime\n;\n; PLT (Procedure Linkage Table):\n;     ; Lazy binding stubs for function calls\n;     ; First call goes to dynamic linker\n;     ; Subsequent calls go directly\n;\n; Getting current IP (x86-64):\n;     lea rax, [rip]  ; RIP-relative addressing\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Linker Scripts & ELF Format", subtitle: "Controlling memory layout and sections", language: "asm", tags: ["linking"], theoryTopics: ["ELF sections", "Linker scripts", "Symbol resolution"], codeTemplate: `; ELF sections:\n; .text  — executable code\n; .data  — initialized data\n; .bss   — zero-initialized data\n; .rodata — read-only data\n;\n; Linker script example:\n; SECTIONS {\n;   . = 0x100000;     /* load address */\n;   .text : { *(.text) }\n;   .data : { *(.data) }\n;   .bss  : { *(.bss)  }\n; }\n;\n; View ELF sections:\n; readelf -S program\n; objdump -d program\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Debugging ASM with GDB", subtitle: "Advanced debugging techniques for assembly", language: "asm", tags: ["tooling"], theoryTopics: ["Layout asm", "Watchpoints", "Reverse debugging"], codeTemplate: `; GDB commands for assembly:\n; (gdb) layout asm        ; show disassembly\n; (gdb) layout regs       ; show registers side-by-side\n; (gdb) si                ; step one instruction\n; (gdb) ni                ; step over call\n; (gdb) info registers    ; all registers\n; (gdb) x/10gx $rsp      ; examine stack memory\n; (gdb) watch *0x601040  ; hardware watchpoint\n; (gdb) reverse-stepi     ; step backward (with record)\n;\n; Record and replay:\n; (gdb) record\n; (gdb) continue\n; (gdb) reverse-stepi` },
  { title: "ASM and C Interop", subtitle: "Calling C from assembly and vice versa", language: "asm", tags: ["interop"], theoryTopics: ["Calling C from ASM", "ASM from C", "Name mangling"], codeTemplate: `; Calling C function from ASM:\n; extern int c_function(int a, int b);\n;\n; mov rdi, 10      ; first arg\n; mov rsi, 20      ; second arg\n; call c_function  ; result in rax\n;\n; Calling ASM from C:\n; extern int asm_func(int a, int b);\n;\n; Assembly implementation:\n; asm_func:\n;     push rbp\n;     mov rbp, rsp\n;     mov rax, rdi\n;     add rax, rsi\n;     pop rbp\n;     ret\n;\n; Compile & link:\n; gcc -o prog main.c asm_func.S\n\nsection .text\nglobal asm_func\nasm_func:\n    push rbp\n    mov rbp, rsp\n    mov rax, rdi\n    add rax, rsi\n    pop rbp\n    ret` },
  { title: "Race Conditions in ASM", subtitle: "Lock prefix, atomic operations, and synchronization", language: "asm", tags: ["concurrency"], theoryTopics: ["LOCK prefix", "CMPXCHG", "Atomic ops"], codeTemplate: `; Atomic operations with LOCK prefix:\n; lock inc qword [counter]  ; atomic increment\n; lock xadd rax, [counter]  ; atomic exchange and add\n; lock cmpxchg [ptr], rbx   ; atomic compare-and-swap\n;\n; CMPXCHG — compare and exchange:\n;     ; Compare RAX with destination\n;     ; If equal: store RBX to destination, set ZF\n;     ; If not equal: load destination into RAX, clear ZF\n;\n; Memory ordering:\n; mfence  ; full memory barrier\n; sfence  ; store barrier\n; lfence  ; load barrier\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Memory Barriers & Ordering", subtitle: "MFENCE, SFENCE, LFENCE and weak ordering", language: "asm", tags: ["concurrency"], theoryTopics: ["Memory ordering", "Fence instructions", "Store buffer"], codeTemplate: `; x86 memory ordering model: TSO (Total Store Order)\n; Stores are not immediately visible to other cores\n;\n; Fence instructions:\n; mfence  ; ensures all previous memory accesses\n;         ; complete before subsequent ones\n; sfence  ; ensures all previous stores are globally visible\n; lfence  ; ensures all previous loads are complete\n;\n; Use cases:\n; - Producer-consumer: sfence between write and flag set\n; - Lock-free data structures: mfence for full ordering\n; - Device I/O: sfence to guarantee MMIO writes\n;\n; Alternative: locked instructions imply full barrier\n; lock xchg [mem], reg  ; implicit mfence\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Advanced SIMD", subtitle: "AVX-512, packed operations, and vectorization", language: "asm", tags: ["simd"], theoryTopics: ["AVX-512", "Mask registers", "Packed ops"], codeTemplate: `; AVX-512 features:\n; - 32 vector registers ZMM0-ZMM31 (512-bit)\n; - 8 mask registers k0-k7\n; - Embedded rounding and exception suppression\n; - Scatter/gather operations\n;\n; Basic AVX-512 operation:\n; ; vaddps zmm0 {k1}, zmm1, zmm2  ; masked add\n; ; vmovaps [rdi] {k2}, zmm0       ; masked store\n;\n; Mask registers control per-element operation:\n; ; ktestq k1, k2    ; test mask bits\n; ; kortestq k1, k2  ; OR test masks\n;\n; Gather: vgatherdps zmm0 {k1}, [rdi + zmm1*4]\n; Scatter: vscatterdps [rdi + zmm0*4] {k1}, zmm1\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Virtualization Concepts", subtitle: "VMX, hypervisor basics, and hardware virtualization", language: "asm", tags: ["systems"], theoryTopics: ["VMX", "VM entries/exits", "EPT"], codeTemplate: `; Intel VMX (Virtual Machine Extensions):\n; VMXON — enter VMX operation\n; VMLAUNCH — start VM entry\n; VMRESUME — resume VM entry\n; VMREAD/VMWRITE — access VMCS fields\n; VMXOFF — leave VMX operation\n;\n; VMCS (Virtual Machine Control Structure):\n; Controls CPU state between host and guest\n; Fields: guest state, host state, execution controls\n;\n; EPT (Extended Page Tables):\n; Second-level address translation\n; Guest physical → host physical\n;\n; Minimal hypervisor flow:\n; 1. Check VMX support via CPUID\n; 2. Initialize VMCS\n; 3. VMLAUNCH to enter guest\n; 4. Handle VM exits in host\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Security Vulnerabilities", subtitle: "Buffer overflow, ROP, and defensive techniques", language: "asm", tags: ["security"], theoryTopics: ["Stack overflow", "ROP gadgets", "NX/DEP/ASLR"], codeTemplate: `; Buffer overflow exploitation:\n; Overwrite return address on stack to redirect execution\n;\n; ROP (Return-Oriented Programming):\n; Chain existing code snippets (gadgets) ending in RET\n; Bypasses NX (non-executable stack)\n;\n; Defenses:\n; - Stack canaries: check value before RET\n; - ASLR: randomize addresses\n; - NX: mark stack as non-executable\n; - Shadow stack: separate return address storage\n;\n; CFG (Control Flow Guard):\n; Validates indirect call targets\n; Prevents hijacking of function pointers\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "ASM Code Obfuscation", subtitle: "Polymorphic, metamorphic, and self-modifying code", language: "asm", tags: ["security"], theoryTopics: ["Polymorphic code", "Self-modifying", "Anti-analysis"], codeTemplate: `; Self-modifying code (SMC):\n;     ; Write new instructions to .text at runtime\n;     ; Requires writable .text section\n;     ; mov byte [label+1], 0x90  ; patch NOP\n; label:\n;     mov rax, 0\n;\n; Polymorphic engine concept:\n;     ; Decryptor stub\n;     ; 1. Decrypt main body using XOR key\n;     ; 2. Transfer control to decrypted code\n;     ; 3. Each generation uses different decryptor\n;\n; Anti-debugging tricks:\n;     ; ptrace check, timing checks, SEH abuse\n;     ; IsDebuggerPresent (Windows)\n;     ; INT 3 detection\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Real-time Systems in ASM", subtitle: "Interrupt latency, deadlines, and deterministic code", language: "asm", tags: ["embedded"], theoryTopics: ["Interrupt latency", "Determinism", "RTOS concepts"], codeTemplate: `; Real-time considerations in assembly:\n; - Predictable instruction timing (no cache misses)\n; - Lock memory/cache for critical sections\n; - Disable interrupts during atomic ops\n;\n; Critical section:\n;     cli           ; clear interrupt flag\n;     ; ... atomic work ...\n;     sti           ; set interrupt flag\n;\n; Interrupt Service Routine (ISR) timing:\n; - Save all registers used\n; - Minimal processing in ISR\n; - Use deferral mechanism for complex work\n; - Restore registers, iret/iretq\n;\n; Worst-case execution time (WCET):\n; - Analyze all code paths\n; - Account for pipeline hazards\n; - Measure with cycle counters (RDTSC)\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "UEFI Applications in ASM", subtitle: "Building UEFI apps from scratch", language: "asm", tags: ["boot"], theoryTopics: ["UEFI protocol", "GUID", "System table"], codeTemplate: `; UEFI application entry point:\n; efi_main(EFI_HANDLE ImageHandle,\n;          EFI_SYSTEM_TABLE *SystemTable);\n;\n; Calling UEFI protocols:\n; ; Output string via Simple Text Output:\n; ; mov rax, [SystemTable]\n; ; mov rax, [rax + EFI_SYSTEM_TABLE.ConOut]\n; ; mov rcx, [rax + SIMPLE_TEXT_OUTPUT.OutputString]\n; ; call rcx  ; OutputString(ConOut, L\"Hello\")\n;\n; UEFI calling convention: Microsoft x64\n; Args: RCX, RDX, R8, R9, stack\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Multi-core ASM Programming", subtitle: "APIC, SMP, and inter-processor interrupts", language: "asm", tags: ["systems"], theoryTopics: ["APIC", "SMP boot", "IPI"], codeTemplate: `; SMP (Symmetric Multiprocessing):\n; BSP (Bootstrap Processor) boots first\n; Sends IPI to wake APs (Application Processors)\n;\n; Local APIC (Advanced Programmable Interrupt Controller):\n; ; Read LAPIC ID:\n; ; mov rax, 1\n; ; cpuid\n; ; EBX bits 31:24 = initial APIC ID\n;\n; Inter-Processor Interrupt (IPI):\n; ; Write to ICR (Interrupt Command Register):\n; ; mov dword [APIC_BASE + 0x300], 0x40C4F\n; ; Vector 0x4F, fixed, edge, assert, all including self\n;\n; Atomic per-core data:\n; ; Use GS segment for per-CPU storage\n; ; mov rax, [gs:0]  ; current CPU ID\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "ASM on ARM64", subtitle: "AArch64 architecture comparison with x86-64", language: "asm", tags: ["architecture"], theoryTopics: ["ARM registers", "Conditional execution", "Load/store"], codeTemplate: `; ARM64 (AArch64) vs x86-64:\n; - 31 general-purpose registers X0-X30 (64-bit)\n; - X30 = link register (LR), replaces RET address\n; - X29 = frame pointer (FP)\n; - SP = stack pointer\n; - PC not directly accessible\n;\n; ARM64 instructions:\n;     mov x0, #42        ; load immediate\n;     add x0, x1, x2     ; x0 = x1 + x2\n;     ldr x0, [x1]       ; load from memory\n;     str x0, [x1]       ; store to memory\n;     bl my_func         ; branch and link (call)\n;     ret                ; return (br x30)\n;\n; Conditional execution:\n;     cmp x0, x1\n;     b.gt greater        ; branch if greater than\n;     b.lt lesser         ; branch if less than\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Performance Tuning & Profiling", subtitle: "perf, oprofile, and micro-architecture optimization", language: "asm", tags: ["optimization"], theoryTopics: ["perf tool", "Cache misses", "Pipeline analysis"], codeTemplate: `; Performance analysis tools:\n; # perf stat ./program\n; # perf record ./program; perf report\n; # perf top\n;\n; Key metrics:\n; - IPC (Instructions Per Cycle)\n; - Cache miss rate (L1, L2, LLC)\n; - Branch mispredictions\n; - TLB misses\n;\n; Optimization targets:\n; 1. Reduce instruction count\n; 2. Improve cache locality\n; 3. Eliminate branches\n; 4. Avoid false sharing\n; 5. Minimize TLB pressure\n;\n; Assembly micro-optimizations:\n; ; Use XOR over MOV for zeroing\n; ; Align loop entry points (16-byte)\n; ; Prefer register args over stack\n; ; Inline small functions\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Capstone Prep: ASM Project", subtitle: "Planning and scaffolding your final ASM project", language: "asm", tags: ["capstone"], theoryTopics: ["Project planning", "Architecture", "Toolchain setup"], codeTemplate: `; Capstone Project Plan\n; =====================\n;\n; Choose one:\n; 1. Bootable kernel (real or protected mode)\n; 2. Custom encryption/compression tool\n; 3. Retro game for boot sector\n; 4. ELF packer/protector\n; 5. Performance-critical library function\n;\n; Deliverables:\n; - Working code with Makefile\n; - README with architecture overview\n; - Comments explaining key sections\n; - Test cases demonstrating correctness\n;\n; Setup checklist:\n; [ ] NASM/YASM assembler\n; [ ] QEMU for boot tests\n; [ ] GDB + .gdbinit\n; [ ] Version control\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Capstone: ASM Final Project", subtitle: "Complete, document, and present your assembly project", language: "asm", tags: ["capstone"], theoryTopics: ["Implementation", "Testing", "Documentation"], codeTemplate: `; ASM Capstone — Final Project\n; ============================\n;\n; Complete your chosen project.\n; Ensure:\n; - Clean compilation with no errors\n; - Handles edge cases gracefully\n; - Well-commented code\n; - Performance considerations addressed\n;\n; Submission checklist:\n; [ ] Code compiles and runs\n; [ ] README with build instructions\n; [ ] Architecture diagram or explanation\n; [ ] Test results with sample output\n; [ ] Self-assessment: what did you learn?\n;\n; "The metal speaks to those who listen."\n\nsection .text\nglobal _start\n_start:\n    ; Your silicon masterpiece begins here\n    nop` },
];

function generateDefaultExercises(day: number, lang: "c" | "asm"): Lesson["exercises"] {
  const prefix = `d${day}`;
  return [
    {
      id: `${prefix}-q1`,
      type: "quiz" as const,
      title: "Concept Check",
      description: `Verify your understanding of Day ${day} concepts`,
      question: lang === "c"
        ? "Which header provides printf() and other I/O functions?"
        : "Which register typically holds the return value in x86-64 System V ABI?",
      options: lang === "c"
        ? [
            { id: "a", text: "<stdlib.h>", correct: false },
            { id: "b", text: "<stdio.h>", correct: true },
            { id: "c", text: "<string.h>", correct: false },
            { id: "d", text: "<math.h>", correct: false },
          ]
        : [
            { id: "a", text: "RBX", correct: false },
            { id: "b", text: "RAX", correct: true },
            { id: "c", text: "RCX", correct: false },
            { id: "d", text: "RSP", correct: false },
          ],
      xpReward: 25,
    },
    {
      id: `${prefix}-q2`,
      type: "quiz" as const,
      title: "Deep Dive",
      description: "Advanced concept verification",
      question: lang === "c"
        ? "What is undefined behavior in C?"
        : "What does the CMP instruction do?",
      options: lang === "c"
        ? [
            { id: "a", text: "A compiler warning", correct: false },
            { id: "b", text: "Behavior not specified by the C standard — anything can happen", correct: true },
            { id: "c", text: "A runtime error that always crashes", correct: false },
            { id: "d", text: "Code that won't compile", correct: false },
          ]
        : [
            { id: "a", text: "Copies one register to another", correct: false },
            { id: "b", text: "Subtracts second operand from first, sets flags without storing", correct: true },
            { id: "c", text: "Compares and stores result in RAX", correct: false },
            { id: "d", text: "Multiplies two values", correct: false },
          ],
      xpReward: 25,
    },
    {
      id: `${prefix}-c1`,
      type: "code" as const,
      title: "Code Challenge",
      description: `Apply Day ${day} concepts in the playground`,
      starterCode: lang === "c"
        ? `#include <stdio.h>\n\nint main(void) {\n    /* TODO: Implement today's concept */\n    return 0;\n}`
        : `section .text\nglobal _start\n\n_start:\n    ; TODO: Implement today's concept\n    nop`,
      hints: ["Review the theory section", "Use the playground to experiment", "Check expected output carefully"],
      xpReward: 50,
    },
  ];
}

function generateDefaultAssignment(day: number, title: string, lang: "c" | "asm"): Lesson["assignment"] {
  return {
    id: `d${day}-a1`,
    title: `${title} — Assignment`,
    description: `Complete this assignment to master Day ${day} concepts. Apply everything you've learned in theory and exercises.`,
    requirements: [
      "Write clean, compilable code",
      "Include meaningful comments",
      "Handle edge cases",
      "Test with multiple inputs",
    ],
    starterCode: lang === "c"
      ? `#include <stdio.h>\n\nint main(void) {\n    /* Assignment: ${title} */\n    return 0;\n}`
      : `section .text\nglobal _start\n\n_start:\n    ; Assignment: ${title}\n    nop`,
    rubric: [
      { criterion: "Correct implementation", points: 40 },
      { criterion: "Code quality and comments", points: 30 },
      { criterion: "Edge case handling", points: 20 },
      { criterion: "Output correctness", points: 10 },
    ],
    xpReward: 100,
  };
}

function buildLesson(day: number): Lesson {
  const detailed = DETAILED_LESSONS[day];
  const isC = day <= 50;
  const blueprint = isC ? C_CURRICULUM[day - 1] : ASM_CURRICULUM[day - 51];
  const lang = isC ? "c" : "asm";

  if (detailed && detailed.title) {
    return {
      day,
      title: detailed.title!,
      subtitle: detailed.subtitle!,
      language: lang,
      level: getLevelForDay(day),
      durationMinutes: 45 + (day % 3) * 15,
      xpTotal: 200,
      tags: detailed.tags ?? blueprint.tags,
      theory: detailed.theory!,
      playground: detailed.playground!,
      exercises: detailed.exercises!,
      assignment: detailed.assignment,
    };
  }

  return {
    day,
    title: blueprint.title,
    subtitle: blueprint.subtitle,
    language: lang,
    level: getLevelForDay(day),
    durationMinutes: 45 + (day % 3) * 15,
    xpTotal: 200,
    tags: blueprint.tags,
    theory: {
      sections: blueprint.theoryTopics.map((topic, i) => ({
        heading: topic,
        content: `Day ${day}: ${topic} — a core concept in ${lang === "c" ? "C systems programming" : "x86-64 Assembly"}. Master this to advance your ${getLevelForDay(day)} tier skills.`,
        codeExample: i === 0 ? blueprint.codeTemplate : undefined,
      })),
    },
    playground: {
      defaultCode: blueprint.codeTemplate,
      language: lang,
      runnable: true,
    },
    exercises: generateDefaultExercises(day, lang),
    assignment: generateDefaultAssignment(day, blueprint.title, lang),
  };
}

export const CURRICULUM: Lesson[] = Array.from({ length: 100 }, (_, i) => buildLesson(i + 1));

export function getLesson(day: number): Lesson | undefined {
  return CURRICULUM.find((l) => l.day === day);
}

export function getLessonsByLevel(level: string): Lesson[] {
  return CURRICULUM.filter((l) => l.level === level);
}

export function getLessonsByLanguage(lang: "c" | "asm"): Lesson[] {
  return CURRICULUM.filter((l) => l.language === lang);
}
