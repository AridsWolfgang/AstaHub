import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Inline ASM in C",
    subtitle: "GCC extended asm syntax",
    tags: ["inline", "gcc"],
    theory: {
      sections: [
        {
          heading: "Constraints",
          content:
            "GCC's extended asm lets you embed assembly in C and hand the compiler a contract about where operands live. The syntax is __asm__(\"instructions\" : outputs : inputs : clobbers). Constraints tell the compiler what kind of operand to pick: 'r' means any general-purpose register, 'm' a memory location, 'i' an immediate integer, 'g' anything. Outputs are marked '=' (write-only) or '+' (read-write). The compiler then generates the moves that place your variables into the chosen operands before the block runs and back out after.",
          codeExample: `#include <stdio.h>

int main(void) {
    int a = 25, b = 17, sum;

    __asm__(
        "add %2, %1\\n\\t"   /* sum = a + b */
        : "=r"(sum)
        : "r"(a), "r"(b)
        : "cc"
    );

    printf("sum = %d\\n", sum);
    return 0;
}`,
        },
        {
          heading: "Clobbers",
          content:
            "The clobber list declares resources the assembly corrupts that the compiler must not assume survive. \"cc\" means the condition codes in RFLAGS were modified; \"memory\" means arbitrary memory may have changed (forcing the compiler to flush pending values); a specific register name like \"rax\" tells GCC your code scribbles on it. Getting the clobber list wrong is one of the most dangerous sharp edges in C — the compiler will happily schedule code across your asm assuming registers are unchanged, and the result is corruption that appears only on some optimization levels.",
        },
        {
          heading: "Volatility",
          content:
            "__asm__ volatile prevents the compiler from deleting or moving the block when it decides the result is unused. A volatile block must execute exactly where it appears: used for instructions with side effects the compiler cannot see, like writing a hardware register, executing a system call, or reading a timestamp with RDTSC. Plain __asm__ without volatile may be optimized away if the compiler believes its outputs are never consumed — correct when the asm is a pure function of its inputs, dangerous when it pokes the outside world.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>

int main(void) {
    int a = 25, b = 17, sum;

    __asm__(
        "add %2, %1\\n\\t"
        : "=r"(sum)
        : "r"(a), "r"(b)
        : "cc"
    );

    printf("sum = %d\\n", sum);
    return 0;
}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d71-q1", type: "quiz", title: "Constraints",
        description: "What the constraint letters mean",
        question: "In GCC inline assembly, what does the 'r' constraint tell the compiler to use?",
        options: [
          { id: "a", text: "A general-purpose register", correct: true },
          { id: "b", text: "A memory address", correct: false },
          { id: "c", text: "An immediate constant", correct: false },
          { id: "d", text: "A stack slot", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d71-q2", type: "quiz", title: "Clobbers",
        description: "Declaring what the asm destroys",
        question: "Which clobber tells GCC that the inline assembly modifies the arithmetic flags?",
        options: [
          { id: "a", text: "\"flags\"", correct: false },
          { id: "b", text: "\"cc\"", correct: true },
          { id: "c", text: "\"rflags\"", correct: false },
          { id: "d", text: "\"condition\"", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d71-c1", type: "code", title: "Inline Multiply",
        description: "Multiply two integers with a single inline asm block",
        starterCode: `#include <stdio.h>

int main(void) {
    int x = 7, y = 6, product;
    /* TODO: use inline asm to compute x * y into product */
    printf("product = %d\\n", product);
    return 0;
}`,
        hints: ["Use \"imul %2, %1\" with \"=r\"(product) and \"r\"(x), \"r\"(y)", "Remember the \"cc\" clobber", "Check the output: product should be 42"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d71-a1", title: "Inline Bit Ops Toolkit",
      description: "Write three small C functions using inline assembly: popcount (POPCNT), bit-scan-reverse (BSR), and rotate-left (ROL). Each function is a thin C wrapper around a single asm block with a correct clobber list.",
      requirements: [
        "popcount returns the number of set bits using the POPCNT instruction",
        "bit_scan_reverse returns the position of the highest set bit using BSR",
        "rotate_left rotates a 32-bit value left by a given amount using ROL",
        "Every asm block declares a correct clobber list",
        "Add a small main() that prints and validates all three",
      ],
      starterCode: `#include <stdio.h>

int popcount(unsigned x) {
    int result;
    /* TODO: popcnt x, result */
    return result;
}

int main(void) {
    printf("popcount(0xFF) = %d\\n", popcount(0xFF));
    return 0;
}`,
      rubric: [
        { criterion: "popcount via POPCNT", points: 30 },
        { criterion: "bit_scan_reverse via BSR", points: 25 },
        { criterion: "rotate_left via ROL", points: 25 },
        { criterion: "Correct clobbers + validation", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
