import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
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
};

export default lesson;
