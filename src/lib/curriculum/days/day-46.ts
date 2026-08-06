import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
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
};

export default lesson;
