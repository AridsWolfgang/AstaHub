import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Signals",
    subtitle: "Inter-process communication via Unix signals",
    tags: ["signals", "IPC", "systems"],
    theory: {
      sections: [
        {
          heading: "What Are Signals?",
          content:
            "Signals are asynchronous notifications sent to a process. The OS can send signals for errors (SIGSEGV — segmentation fault), termination requests (SIGINT — Ctrl+C, SIGTERM), and user-defined communication (SIGUSR1, SIGUSR2). A process can ignore, catch, or let the default action handle each signal.",
          codeExample: `#include <signal.h>\n#include <stdio.h>\n\nvoid handler(int sig) {\n    printf("Caught signal %d\\n\", sig);\n}\n\nint main(void) {\n    signal(SIGINT, handler);  // catch Ctrl+C\n    printf("Press Ctrl+C...\\n\");\n    while(1);  // wait\n    return 0;\n}`,
        },
        {
          heading: "Sending Signals",
          content:
            "raise() sends a signal to the current process. kill(pid, sig) sends to another process (if you have permission). SIGKILL (9) kills a process — it cannot be caught or ignored. SIGSTOP (19) pauses a process.",
          codeExample: `// From shell:\n// kill -SIGUSR1 1234\n// kill -9 1234    // force kill\n//\n// In code:\n// raise(SIGUSR1);       // to self\n// kill(other_pid, SIGTERM);  // to another`,
        },
        {
          heading: "Signal Safety",
          content:
            "Signal handlers should do very little — set a volatile sig_atomic_t flag and return. printf() inside a handler is unsafe (not async-signal-safe). Use write() to a file descriptor instead. Modern code uses signalfd() or sigaction() for better control.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <signal.h>\n\nvolatile sig_atomic_t flag = 0;\n\nvoid handler(int sig) {\n    flag = 1;  // safe: just set a flag\n}\n\nint main(void) {\n    signal(SIGINT, handler);\n    printf("Press Ctrl+C to set flag...\\n\");\n    while (!flag) {\n        // do work\n    }\n    printf("\\nFlag detected! Exiting gracefully.\\n\");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d39-q1", type: "quiz", title: "Uncatchable Signal",
        description: "Understanding signal limitations",
        question: "Which signal CANNOT be caught or ignored?",
        options: [
          { id: "a", text: "SIGINT", correct: false },
          { id: "b", text: "SIGTERM", correct: false },
          { id: "c", text: "SIGKILL", correct: true },
          { id: "d", text: "SIGUSR1", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d39-q2", type: "quiz", title: "Signal Handler Safety",
        description: "Understanding async-signal-safety",
        question: "Which operation is generally safe inside a signal handler?",
        options: [
          { id: "a", text: "Calling printf()", correct: false },
          { id: "b", text: "Setting a volatile sig_atomic_t flag", correct: true },
          { id: "c", text: "Calling malloc()", correct: false },
          { id: "d", text: "Calling free()", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d39-c1", type: "code", title: "Signal Handler",
        description: "Set up handlers for SIGINT and SIGTERM, print a message for each",
        starterCode: `#include <stdio.h>\n#include <signal.h>\n#include <unistd.h>\n\n/* TODO: create handlers */\n\nint main(void) {\n    /* TODO: register handlers */\n    printf("PID: %d\\n\", getpid());\n    printf("Send SIGINT or SIGTERM to quit\\n\");\n    while(1) pause();\n    return 0;\n}`,
        hints: ["signal(SIGINT, handler);", "signal(SIGTERM, handler);", "Use different messages per signal"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d39-a1", title: "Graceful Shutdown",
      description: "Write a program that handles shutdown signals gracefully, cleaning up resources",
      requirements: [
        "Allocate some resources (simulated with a counter)",
        "Handle SIGINT and SIGTERM to clean up",
        "Print a cleanup message and free simulated resources",
        "Use volatile sig_atomic_t for the shutdown flag",
        "Main loop checks the flag and exits cleanly",
      ],
      starterCode: `#include <stdio.h>\n#include <signal.h>\n\nvolatile sig_atomic_t shutdown_flag = 0;\n\nvoid handler(int sig) {\n    shutdown_flag = 1;\n}\n\nint main(void) {\n    signal(SIGINT, handler);\n    signal(SIGTERM, handler);\n\n    int resources = 100;\n    printf("Program running with %d resources...\\n\", resources);\n    printf("Press Ctrl+C to shutdown\\n\");\n\n    while (!shutdown_flag) {\n        /* simulate work */\n    }\n\n    printf("\\nShutting down...\\n\");\n    /* TODO: add cleanup code */\n    printf("Resources freed. Goodbye!\\n\");\n    return 0;\n}`,
      rubric: [
        { criterion: "SIGINT and SIGTERM handled", points: 25 },
        { criterion: "volatile sig_atomic_t used", points: 20 },
        { criterion: "Cleanup code runs on signal", points: 30 },
        { criterion: "Program exits gracefully", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
