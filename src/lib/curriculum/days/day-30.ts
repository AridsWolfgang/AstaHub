import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
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
};

export default lesson;
