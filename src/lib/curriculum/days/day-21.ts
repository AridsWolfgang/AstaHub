import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Stack Implementation",
    subtitle: "LIFO data structure — last in, first out",
    tags: ["stack", "data-structures", "LIFO"],
    theory: {
      sections: [
        {
          heading: "Stack Concepts",
          content:
            "A stack is a LIFO (Last In, First Out) data structure. Think of a stack of plates — you add (push) to the top and remove (pop) from the top. Stacks are fundamental in computing: the call stack, expression evaluation, and undo operations all use stacks.",
          codeExample: `#define MAX 100\nint stack[MAX];\nint top = -1;\n\nvoid push(int v) {\n    if (top >= MAX - 1) { printf("overflow\\n"); return; }\n    stack[++top] = v;\n}\n\nint pop(void) {\n    if (top < 0) { printf("underflow\\n"); return -1; }\n    return stack[top--];\n}`,
        },
        {
          heading: "Array vs Linked-List Implementation",
          content:
            "Array-based stacks are simple and fast but have a fixed capacity. Linked-list stacks grow dynamically but have extra memory overhead per node. Choose based on whether predictable capacity or unbounded growth matters more.",
        },
        {
          heading: "Common Stack Applications",
          content:
            "Expression evaluation (converting infix to postfix), backtracking (maze solving), function call/return, undo/redo in editors, and bracket matching in compilers. The entire CPU call stack is a hardware stack.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\n#define MAX 10\nint stack[MAX], top = -1;\n\nvoid push(int v) { if (top < MAX-1) stack[++top] = v; else printf("overflow\\n"); }\nint pop(void) { if (top >= 0) return stack[top--]; printf("underflow\\n"); return -1; }\n\nint main(void) {\n    push(10); push(20); push(30);\n    printf("pop: %d\\n", pop());\n    printf("pop: %d\\n", pop());\n    push(40);\n    printf("pop: %d\\n", pop());\n    printf("pop: %d\\n", pop());\n    printf("pop: %d\\n", pop());  // underflow\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d21-q1", type: "quiz", title: "LIFO Order",
        description: "Understanding stack order",
        question: "If you push 1, 2, 3 onto a stack, what is the first pop returns?",
        options: [
          { id: "a", text: "1", correct: false },
          { id: "b", text: "3", correct: true },
          { id: "c", text: "2", correct: false },
          { id: "d", text: "0", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d21-q2", type: "quiz", title: "Stack Overflow",
        description: "Understanding stack limits",
        question: "What is a stack overflow in the context of our array-based stack?",
        options: [
          { id: "a", text: "The program runs out of memory", correct: false },
          { id: "b", text: "Pushing when top >= MAX-1", correct: true },
          { id: "c", text: "Popping from an empty stack", correct: false },
          { id: "d", text: "The stack variable overflows", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d21-c1", type: "code", title: "Bracket Matcher",
        description: "Use a stack to check if parentheses are balanced",
        starterCode: `#include <stdio.h>\n#include <string.h>\n\n#define MAX 100\nchar stack[MAX];\nint top = -1;\n\nvoid push(char c) { if (top < MAX-1) stack[++top] = c; }\nchar pop(void) { return top >= 0 ? stack[top--] : '\\0'; }\n\nint is_balanced(const char *expr) {\n    /* TODO: return 1 if parentheses balanced */\n}\n\nint main(void) {\n    printf("%d\\n", is_balanced("()"));     // 1\n    printf("%d\\n", is_balanced("(()"));    // 0\n    printf("%d\\n", is_balanced("(())"));   // 1\n    return 0;\n}`,
        expectedOutput: "1",
        hints: ["Push '(' when seen", "Pop and check on ')'", "Stack must be empty at end"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d21-a1", title: "Postfix Calculator",
      description: "Implement a postfix (RPN) calculator using a stack",
      requirements: [
        "Read a postfix expression string: '3 4 + 5 *'",
        "Push numbers onto the stack",
        "On operator, pop two values, apply, push result",
        "At end, pop and print the result",
        "Handle division by zero and insufficient operands",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <ctype.h>\n#include <string.h>\n\n#define MAX 100\nint stack[MAX], top = -1;\n\nvoid push(int v) { if (top < MAX-1) stack[++top] = v; }\nint pop(void) { return top >= 0 ? stack[top--] : 0; }\n\nint eval_postfix(const char *expr) {\n    /* TODO: evaluate postfix expression */\n}\n\nint main(void) {\n    printf("3 4 + = %d\\n", eval_postfix("3 4 +"));\n    printf("3 4 + 5 * = %d\\n", eval_postfix("3 4 + 5 *"));\n    return 0;\n}`,
      rubric: [
        { criterion: "Numbers parsed and pushed", points: 25 },
        { criterion: "Operators applied correctly", points: 30 },
        { criterion: "Correct final result", points: 20 },
        { criterion: "Error handling", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
