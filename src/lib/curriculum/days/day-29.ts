import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
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
};

export default lesson;
