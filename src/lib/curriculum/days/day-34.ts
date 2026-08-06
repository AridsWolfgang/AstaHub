import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
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
};

export default lesson;
