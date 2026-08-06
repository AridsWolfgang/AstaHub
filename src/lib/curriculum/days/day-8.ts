import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
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
};

export default lesson;
