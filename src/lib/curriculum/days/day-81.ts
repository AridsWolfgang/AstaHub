import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "C and ASM Unification",
    subtitle: "Inline assembly, GCC constraints, and the silicon master's toolkit",
    tags: ["inline", "gcc", "silicon-master"],
    theory: {
      sections: [
        {
          heading: "GCC Inline Assembly",
          content:
            "GCC's __asm__ keyword embeds assembly directly in C code. The basic format is: __asm__(\"instructions\" : outputs : inputs : clobbers). The extended syntax with constraints lets the compiler manage operand placement. Outputs use '=' (write-only) or '+' (read-write). Inputs need no prefix. The compiler generates code to move values between your inline asm operands and the locations the constraints specify.",
          codeExample: `; In C code:
; int x = 10;
; __asm__ volatile(
;     "add $5, %0"
;     : "+r"(x)       // output/input
;     :               // no pure inputs
;     : "cc"          // clobbered flags
; );
; // x is now 15`,
        },
        {
          heading: "Constraints and Clobbers",
          content:
            "Constraints tell GCC where operands can live: 'r' (register), 'm' (memory), 'i' (immediate), 'g' (any). The clobber list declares resources the asm corrupts: 'cc' (condition codes), 'memory' (unspecified memory), or specific registers. Getting constraints wrong produces incorrect code silently — one of the most dangerous sharp edges in C.",
        },
        {
          heading: "When to Drop to Assembly",
          content:
            "Inline assembly is justified in exactly three scenarios: (1) accessing CPU features the compiler doesn't expose (CPUID, RDTSC), (2) implementing optimized primitives (SIMD math, atomic ops) the compiler can't generate, and (3) interacting with hardware (special instructions, interrupt management). Everywhere else, let the compiler do its job — modern optimizers produce assembly that beats hand-tuned code on most workloads.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>

int main(void) {
    int x = 10, y = 20, result;

    __asm__(
        "imul %2, %1; mov %1, %0"
        : "=r"(result)
        : "r"(x), "r"(y)
        : "cc"
    );

    printf("x=%d, y=%d, result=%d\\n", x, y, result);
    return 0;
}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d81-q1", type: "quiz", title: "Inline ASM Format",
        description: "Understanding the extended asm syntax",
        question: "In GCC inline assembly, what does constraint 'r' mean?",
        options: [
          { id: "a", text: "A memory operand", correct: false },
          { id: "b", text: "A register operand", correct: true },
          { id: "c", text: "An immediate value", correct: false },
          { id: "d", text: "A read-only operand", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d81-q2", type: "quiz", title: "Clobbers",
        description: "Understanding the clobber list",
        question: "Which clobber tells GCC that inline assembly modifies the condition flags?",
        options: [
          { id: "a", text: "\"flags\"", correct: false },
          { id: "b", text: "\"cc\"", correct: true },
          { id: "c", text: "\"rflags\"", correct: false },
          { id: "d", text: "\"condition\"", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d81-c1", type: "code", title: "Inline Sum",
        description: "Write a C program with inline assembly that sums two integers",
        starterCode: `#include <stdio.h>

int main(void) {
    int a = 25, b = 17, sum;
    /* TODO: Use inline asm to compute a + b, store in sum */
    printf("sum = %d\\n", sum);
    return 0;
}`,
        hints: ["Use '+r' for input-output operands", "Use imul or add in the asm block", "Don't forget 'cc' clobber"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d81-a1", title: "Inline Assembly Toolkit",
      description: "Create a set of C functions that use inline assembly to implement fast bit operations: popcount, bit scan reverse, and rotate left. Each function must be no more than a few lines of C wrapping a single asm block.",
      requirements: [
        "Implement popcount using inline asm with 'popcnt' instruction",
        "Implement bit scan reverse using 'bsr'",
        "Implement rotate left (no C rotation operator available)",
        "Write a test harness that validates all three functions",
        "Include a clobber list for each function",
      ],
      starterCode: `#include <stdio.h>
#include <stdint.h>

int popcount(uint64_t x) {
    int result;
    /* TODO: popcnt x, result */
    return result;
}

int main(void) {
    printf("popcount(0xFF) = %d\\n", popcount(0xFF));
    return 0;
}`,
      rubric: [
        { criterion: "popcount implementation", points: 30 },
        { criterion: "Bit scan reverse implementation", points: 25 },
        { criterion: "Rotate left implementation", points: 25 },
        { criterion: "Test harness with validation", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
