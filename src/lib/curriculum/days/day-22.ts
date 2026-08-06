import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Queue Implementation",
    subtitle: "FIFO data structure — first in, first out",
    tags: ["queue", "data-structures", "FIFO"],
    theory: {
      sections: [
        {
          heading: "Queue Concepts",
          content:
            "A queue is FIFO (First In, First Out). Enqueue adds to the rear, dequeue removes from the front. Think of a line at a ticket counter — the first person in line gets served first. Queues are essential in scheduling, buffering, and BFS.",
          codeExample: `#define MAX 100\nint queue[MAX];\nint front = 0, rear = 0;\n\nvoid enqueue(int v) {\n    if (rear >= MAX) { printf("full\\n"); return; }\n    queue[rear++] = v;\n}\n\nint dequeue(void) {\n    if (front >= rear) { printf("empty\\n"); return -1; }\n    return queue[front++];\n}`,
        },
        {
          heading: "Circular Buffer",
          content:
            "A linear queue wastes space — after dequeuing, front slots are unused. A circular buffer reuses slots by wrapping indices modulo capacity. The array becomes a ring where front and rear chase each other.",
          codeExample: `#define SIZE 5\nint buf[SIZE];\nint head = 0, tail = 0, count = 0;\n\nvoid enq(int v) {\n    if (count == SIZE) { printf("full\\n"); return; }\n    buf[tail] = v;\n    tail = (tail + 1) % SIZE;\n    count++;\n}`,
        },
        {
          heading: "Queue Applications",
          content:
            "Print spooling, task scheduling (OS), breadth-first search, message passing, buffering between producers and consumers (producer-consumer pattern), and keyboard input buffering.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\n#define MAX 5\nint q[MAX], front = 0, rear = 0;\n\nvoid enq(int v) { if (rear < MAX) q[rear++] = v; else printf("q full\\n"); }\nint deq(void) { return front < rear ? q[front++] : (printf("q empty\\n"), -1); }\n\nint main(void) {\n    enq(1); enq(2); enq(3);\n    printf("deq: %d\\n", deq());\n    printf("deq: %d\\n", deq());\n    enq(4);\n    printf("deq: %d\\n", deq());\n    printf("deq: %d\\n", deq());\n    printf("deq: %d\\n", deq());  // empty\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d22-q1", type: "quiz", title: "FIFO Order",
        description: "Understanding queue order",
        question: "If you enqueue 1, 2, 3, what is the first dequeue returns?",
        options: [
          { id: "a", text: "1", correct: true },
          { id: "b", text: "3", correct: false },
          { id: "c", text: "2", correct: false },
          { id: "d", text: "Depends on implementation", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d22-q2", type: "quiz", title: "Circular Buffer",
        description: "Understanding wraparound",
        question: "Why use a circular buffer for queues?",
        options: [
          { id: "a", text: "It makes operations faster", correct: false },
          { id: "b", text: "It reuses space from dequeued slots", correct: true },
          { id: "c", text: "It supports random access", correct: false },
          { id: "d", text: "It doubles as a stack", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d22-c1", type: "code", title: "Circular Queue",
        description: "Implement a circular queue with modulo indexing",
        starterCode: `#include <stdio.h>\n\n#define SIZE 5\nint q[SIZE];\nint head = 0, tail = 0, count = 0;\n\nvoid enq(int v) {\n    if (count == SIZE) { printf("full\\n"); return; }\n    /* TODO: insert at tail, wrap around */\n}\n\nint deq(void) {\n    if (count == 0) { printf("empty\\n"); return -1; }\n    /* TODO: remove from head, wrap around */\n}\n\nint main(void) {\n    enq(10); enq(20); enq(30);\n    printf("%d\\n", deq());\n    enq(40); enq(50); enq(60);  // should wrap\n    printf("%d\\n", deq());\n    return 0;\n}`,
        expectedOutput: "10",
        hints: ["tail = (tail + 1) % SIZE", "head = (head + 1) % SIZE", "Track count for full/empty"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d22-a1", title: "Producer-Consumer Queue",
      description: "Simulate a producer-consumer system with a circular queue buffer",
      requirements: [
        "Implement a circular queue with fixed capacity",
        "Write a producer function that enqueues items 1..N",
        "Write a consumer function that dequeues and prints items",
        "Demonstrate wrap-around behavior",
        "Print queue state after each operation",
      ],
      starterCode: `#include <stdio.h>\n\n#define SIZE 3\nint q[SIZE];\nint head = 0, tail = 0, count = 0;\n\nvoid enq(int v) {\n    if (count == SIZE) { printf("BUFFER FULL - lost: %d\\n", v); return; }\n    q[tail] = v;\n    tail = (tail + 1) % SIZE;\n    count++;\n}\n\nint deq(void) {\n    if (count == 0) { printf("BUFFER EMPTY\\n\"); return -1; }\n    int v = q[head];\n    head = (head + 1) % SIZE;\n    count--;\n    return v;\n}\n\nint main(void) {\n    /* TODO: demonstrate producer-consumer */\n    return 0;\n}`,
      rubric: [
        { criterion: "Circular queue correct", points: 30 },
        { criterion: "Producer-consumer pattern", points: 25 },
        { criterion: "Wrap-around works", points: 25 },
        { criterion: "Output formatting", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
