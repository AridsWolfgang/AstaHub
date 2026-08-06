import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
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
};

export default lesson;
