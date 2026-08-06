import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Threads Intro",
    subtitle: "Concurrent execution with POSIX threads (pthreads)",
    tags: ["threads", "concurrency", "pthreads"],
    theory: {
      sections: [
        {
          heading: "What Are Threads?",
          content:
            "Threads are lightweight processes that share the same memory space within a process. Multiple threads can run concurrently (or in parallel on multi-core CPUs). pthreads (POSIX threads) is the standard C threading API on Unix-like systems.",
          codeExample: `#include <pthread.h>\n#include <stdio.h>\n\nvoid *worker(void *arg) {\n    int id = *(int*)arg;\n    printf("Thread %d running\\n", id);\n    return NULL;\n}\n\nint main(void) {\n    pthread_t t1, t2;\n    int id1 = 1, id2 = 2;\n    pthread_create(&t1, NULL, worker, &id1);\n    pthread_create(&t2, NULL, worker, &id2);\n    pthread_join(t1, NULL);\n    pthread_join(t2, NULL);\n    printf("Both threads done\\n");\n    return 0;\n}`,
        },
        {
          heading: "pthread_create and pthread_join",
          content:
            "pthread_create(&thread, attr, start_routine, arg) spawns a thread. The new thread executes start_routine with arg. pthread_join(thread, &retval) waits for the thread to finish and captures its return value. Without join, the program might exit before threads finish.",
        },
        {
          heading: "Race Conditions",
          content:
            "When multiple threads access shared data without synchronization, the result depends on timing — a race condition. The classic example: two threads incrementing a shared counter. Without protection, the final value is unpredictable.",
          codeExample: `int counter = 0;\n\nvoid *increment(void *arg) {\n    for (int i = 0; i < 100000; i++)\n        counter++;  // RACE CONDITION!\n    return NULL;\n}\n// Expected: 200000, Actual: varies`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <pthread.h>\n\nvoid *say_hello(void *arg) {\n    const char *name = (const char*)arg;\n    for (int i = 0; i < 3; i++)\n        printf("Hello from %s (%d)\\n", name, i);\n    return NULL;\n}\n\nint main(void) {\n    pthread_t t1, t2;\n    pthread_create(&t1, NULL, say_hello, "Thread A");\n    pthread_create(&t2, NULL, say_hello, "Thread B");\n    pthread_join(t1, NULL);\n    pthread_join(t2, NULL);\n    printf("All threads finished\\n");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d41-q1", type: "quiz", title: "Thread Memory",
        description: "Understanding thread memory sharing",
        question: "Do threads in the same process share memory?",
        options: [
          { id: "a", text: "No, each thread has its own memory", correct: false },
          { id: "b", text: "Yes, threads share the same address space", correct: true },
          { id: "c", text: "Only global variables are shared", correct: false },
          { id: "d", text: "Threads cannot access each other's data", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d41-q2", type: "quiz", title: "pthread_join",
        description: "Understanding thread synchronization",
        question: "What does pthread_join() do?",
        options: [
          { id: "a", text: "Creates a new thread", correct: false },
          { id: "b", text: "Waits for a thread to finish", correct: true },
          { id: "c", text: "Terminates a thread", correct: false },
          { id: "d", text: "Detaches a thread", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d41-c1", type: "code", title: "Parallel Sum",
        description: "Split an array across 2 threads and compute partial sums",
        starterCode: `#include <stdio.h>\n#include <pthread.h>\n\ntypedef struct {\n    int *arr;\n    int start;\n    int end;\n    int result;\n} Range;\n\nvoid *sum_range(void *arg) {\n    Range *r = (Range*)arg;\n    r->result = 0;\n    /* TODO: sum arr[start] to arr[end-1] */\n    return NULL;\n}\n\nint main(void) {\n    int data[] = {1,2,3,4,5,6,7,8,9,10};\n    Range r1 = {data, 0, 5, 0};\n    Range r2 = {data, 5, 10, 0};\n    pthread_t t1, t2;\n    pthread_create(&t1, NULL, sum_range, &r1);\n    pthread_create(&t2, NULL, sum_range, &r2);\n    pthread_join(t1, NULL);\n    pthread_join(t2, NULL);\n    printf("Sum = %d\\n", r1.result + r2.result);\n    return 0;\n}`,
        expectedOutput: "Sum = 55",
        hints: ["Loop from r->start to r->end", "Accumulate in r->result"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d41-a1", title: "Parallel Array Processor",
      description: "Create a program that processes an array with 4 threads",
      requirements: [
        "Split an array of 100 elements across 4 threads",
        "Each thread computes the sum of its chunk",
        "Main thread combines partial sums",
        "Print each thread's partial sum",
        "Compare with single-threaded sum for correctness",
      ],
      starterCode: `#include <stdio.h>\n#include <pthread.h>\n\n#define ARRAY_SIZE 100\n#define NUM_THREADS 4\n\ntypedef struct { int *arr; int start; int end; int result; } Chunk;\n\nvoid *compute(void *arg) {\n    Chunk *c = (Chunk*)arg;\n    c->result = 0;\n    for (int i = c->start; i < c->end; i++)\n        c->result += c->arr[i];\n    return NULL;\n}\n\nint main(void) {\n    int arr[ARRAY_SIZE];\n    for (int i = 0; i < ARRAY_SIZE; i++) arr[i] = i + 1;\n    /* TODO: create 4 threads, each processing a chunk */\n    return 0;\n}`,
      rubric: [
        { criterion: "4 threads created correctly", points: 25 },
        { criterion: "Array split evenly", points: 20 },
        { criterion: "Partial sums correct", points: 25 },
        { criterion: "Total matches expected", points: 30 },
      ],
      xpReward: 100,
    },
};

export default lesson;
