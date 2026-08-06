import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Mutexes & Synchronization",
    subtitle: "Protecting shared data from race conditions",
    tags: ["mutex", "synchronization", "threads"],
    theory: {
      sections: [
        {
          heading: "The Mutex (Mutual Exclusion)",
          content:
            "A mutex ensures only one thread executes a critical section at a time. pthread_mutex_lock() acquires the lock (blocking if another thread holds it). pthread_mutex_unlock() releases it. Every lock must have a matching unlock.",
          codeExample: `pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\nint counter = 0;\n\nvoid *worker(void *arg) {\n    for (int i = 0; i < 100000; i++) {\n        pthread_mutex_lock(&lock);\n        counter++;  // protected\n        pthread_mutex_unlock(&lock);\n    }\n    return NULL;\n}\n// Now counter is always 200000`,
        },
        {
          heading: "Deadlocks",
          content:
            "A deadlock occurs when two threads hold locks and wait for each other's locks. Prevent by: always acquire locks in the same order, use trylock with backoff, or minimize lock scope. A deadlocked program hangs forever.",
          codeExample: `// Thread A: lock(m1); lock(m2); unlock(m2); unlock(m1);\n// Thread B: lock(m2); lock(m1); unlock(m1); unlock(m2);\n// DEADLOCK! Both waiting for the other.`,
        },
        {
          heading: "Condition Variables",
          content:
            "Condition variables let threads wait for a condition to become true. pthread_cond_wait() releases the mutex and blocks. pthread_cond_signal() wakes one waiting thread. Used for producer-consumer patterns.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <pthread.h>\n\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\nint shared = 0;\n\nvoid *worker(void *arg) {\n    for (int i = 0; i < 50000; i++) {\n        pthread_mutex_lock(&lock);\n        shared++;\n        pthread_mutex_unlock(&lock);\n    }\n    return NULL;\n}\n\nint main(void) {\n    pthread_t t1, t2;\n    pthread_create(&t1, NULL, worker, NULL);\n    pthread_create(&t2, NULL, worker, NULL);\n    pthread_join(t1, NULL);\n    pthread_join(t2, NULL);\n    printf("Shared = %d (expected 100000)\\n", shared);\n    pthread_mutex_destroy(&lock);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d42-q1", type: "quiz", title: "Lock Purpose",
        description: "Understanding mutex purpose",
        question: "What problem does a mutex solve?",
        options: [
          { id: "a", text: "Memory leaks", correct: false },
          { id: "b", text: "Race conditions on shared data", correct: true },
          { id: "c", text: "Slow thread creation", correct: false },
          { id: "d", text: "File I/O errors", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d42-q2", type: "quiz", title: "Deadlock",
        description: "Understanding deadlocks",
        question: "What is a deadlock?",
        options: [
          { id: "a", text: "A thread that runs forever", correct: false },
          { id: "b", text: "Two or more threads each waiting for a lock held by the other", correct: true },
          { id: "c", text: "A mutex that cannot be locked", correct: false },
          { id: "d", text: "A program that crashes", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d42-c1", type: "code", title: "Bank Account",
        description: "Simulate a bank account with deposit/withdraw using mutex protection",
        starterCode: `#include <stdio.h>\n#include <pthread.h>\n\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\ndouble balance = 1000.0;\n\nvoid deposit(double amount) {\n    pthread_mutex_lock(&lock);\n    balance += amount;\n    pthread_mutex_unlock(&lock);\n}\n\nvoid withdraw(double amount) {\n    /* TODO: protect with mutex, check for sufficient funds */\n}\n\nint main(void) {\n    printf("Balance: %.2f\\n", balance);\n    deposit(500);\n    printf("After deposit: %.2f\\n", balance);\n    withdraw(200);\n    printf("After withdraw: %.2f\\n", balance);\n    pthread_mutex_destroy(&lock);\n    return 0;\n}`,
        expectedOutput: "Balance: 1000.00",
        hints: ["Lock before modifying balance", "Check balance >= amount before withdraw"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d42-a1", title: "Producer-Consumer with Mutex",
      description: "Implement a producer-consumer pattern with a shared buffer protected by mutex",
      requirements: [
        "Create a bounded buffer (array of 5 slots)",
        "Producer thread adds items (1..20)",
        "Consumer thread removes and prints items",
        "Use mutex to protect buffer access",
        "Track count of items in buffer",
      ],
      starterCode: `#include <stdio.h>\n#include <pthread.h>\n\n#define BUFFER_SIZE 5\nint buffer[BUFFER_SIZE];\nint count = 0;\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\n\nvoid *producer(void *arg) {\n    for (int i = 1; i <= 10; i++) {\n        /* TODO: lock, add to buffer if space, unlock */\n    }\n    return NULL;\n}\n\nvoid *consumer(void *arg) {\n    for (int i = 0; i < 10; i++) {\n        /* TODO: lock, remove from buffer if data, unlock, print */\n    }\n    return NULL;\n}\n\nint main(void) {\n    pthread_t prod, cons;\n    pthread_create(&prod, NULL, producer, NULL);\n    pthread_create(&cons, NULL, consumer, NULL);\n    pthread_join(prod, NULL);\n    pthread_join(cons, NULL);\n    pthread_mutex_destroy(&lock);\n    return 0;\n}`,
      rubric: [
        { criterion: "Mutex protects buffer access", points: 30 },
        { criterion: "Producer adds correctly", points: 25 },
        { criterion: "Consumer removes correctly", points: 25 },
        { criterion: "No race conditions", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
