import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Process Management",
    subtitle: "fork, exec, wait — creating and managing processes",
    tags: ["process", "fork", "systems"],
    theory: {
      sections: [
        {
          heading: "Process Creation with fork()",
          content:
            "fork() creates a new process by duplicating the calling process. The child gets a copy of the parent's memory, file descriptors, and execution state. The only difference: fork() returns 0 to the child and the child's PID to the parent.",
          codeExample: `#include <unistd.h>\n#include <stdio.h>\n\npid_t pid = fork();\nif (pid == 0) {\n    // Child process\n    printf("Child: PID = %d\\n\", getpid());\n} else if (pid > 0) {\n    // Parent process\n    printf("Parent: child PID = %d\\n\", pid);\n} else {\n    perror("fork failed\");\n}`,
        },
        {
          heading: "Executing New Programs with exec()",
          content:
            "The exec family (execl, execv, execvp, etc.) replaces the current process with a new program. The process ID stays the same, but code, data, and stack are replaced. fork() + exec() is the Unix way to start a new program.",
          codeExample: `pid_t pid = fork();\nif (pid == 0) {\n    // Child runs a different program\n    execlp("/bin/ls", "ls", "-l", NULL);\n    perror("exec failed\");  // only reached on error\n    exit(1);\n}\n// Parent continues with original program\nwait(NULL);  // wait for child`,
        },
        {
          heading: "Waiting with wait() and waitpid()",
          content:
            "wait() blocks until any child exits. waitpid(pid, &status, options) waits for a specific child. The status encodes exit code, signal info. Use WIFEXITED, WEXITSTATUS, WIFSIGNALED macros to interpret.",
          codeExample: `int status;\npid_t child = wait(&status);\nif (WIFEXITED(status)) {\n    printf("Child %d exited with %d\\n\",\n        child, WEXITSTATUS(status));\n} else if (WIFSIGNALED(status)) {\n    printf("Child killed by signal %d\\n\",\n        WTERMSIG(status));\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint main(void) {\n    pid_t pid = fork();\n\n    if (pid == 0) {\n        printf("Child: hello from child! PID=%d\\n\", getpid());\n        return 42;\n    } else if (pid > 0) {\n        printf("Parent: child has PID %d. Waiting...\\n\", pid);\n        int status;\n        wait(&status);\n        printf("Parent: child exited with %d\\n\", WEXITSTATUS(status));\n    } else {\n        perror("fork\");\n    }\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d40-q1", type: "quiz", title: "fork Return",
        description: "Understanding fork's return values",
        question: "What does fork() return to the child process?",
        options: [
          { id: "a", text: "The parent's PID", correct: false },
          { id: "b", text: "0", correct: true },
          { id: "c", text: "The child's PID", correct: false },
          { id: "d", text: "-1 on success", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d40-q2", type: "quiz", title: "exec Behavior",
        description: "Understanding exec",
        question: "What does exec() do to the calling process?",
        options: [
          { id: "a", text: "Creates a new process", correct: false },
          { id: "b", text: "Replaces the current process with a new program", correct: true },
          { id: "c", text: "Spawns a thread", correct: false },
          { id: "d", text: "Exits the current process", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d40-c1", type: "code", title: "Fork Tree",
        description: "Create a parent and child, both print their PIDs and parent PIDs",
        starterCode: `#include <stdio.h>\n#include <unistd.h>\n\nint main(void) {\n    pid_t pid = fork();\n    if (pid < 0) { perror("fork\"); return 1; }\n\n    if (pid == 0) {\n        /* TODO: print child info */\n    } else {\n        /* TODO: print parent info */\n    }\n    return 0;\n}`,
        hints: ["Use getpid() and getppid()", "Parent prints child's PID too"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d40-a1", title: "Simple Shell",
      description: "Build a minimal shell that reads commands, forks, and executes them",
      requirements: [
        "Read a command from stdin (simulated with an array)",
        "Parse it into command and arguments",
        "fork() a child process",
        "Child execvp() the command",
        "Parent wait() for child to finish",
        "Handle 'exit' command gracefully",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <unistd.h>\n#include <sys/wait.h>\n#include <string.h>\n\nint main(void) {\n    char *commands[] = {"ls -l", "echo hello", "whoami", "pwd", "exit", NULL};\n\n    for (int i = 0; commands[i]; i++) {\n        printf("minish$ %s\\n\", commands[i]);\n        if (strcmp(commands[i], "exit") == 0) break;\n\n        /* TODO: parse command, fork, exec, wait */\n        char *args[] = {commands[i], NULL};\n        // Actually we need to split by space, but for simplicity:\n    }\n    printf("Goodbye!\\n\");\n    return 0;\n}`,
      rubric: [
        { criterion: "Commands parsed correctly", points: 20 },
        { criterion: "fork/exec/wait implemented", points: 30 },
        { criterion: "Child executes the command", points: 25 },
        { criterion: "Exit command works", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
