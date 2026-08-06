import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
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
};

export default lesson;
