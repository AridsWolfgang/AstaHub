import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
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
};

export default lesson;
