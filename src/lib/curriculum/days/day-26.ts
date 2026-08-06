import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
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
};

export default lesson;
