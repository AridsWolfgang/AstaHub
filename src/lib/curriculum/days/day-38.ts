import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Socket Programming Intro",
    subtitle: "Network communication — sockets, bind, listen, accept",
    tags: ["sockets", "networking", "TCP"],
    theory: {
      sections: [
        {
          heading: "Socket API Overview",
          content:
            "Sockets are the Unix/Linux API for network communication. socket() creates an endpoint. bind() assigns an address. listen() makes it a passive socket. accept() accepts incoming connections. connect() connects to a remote server. read()/write() exchange data.",
          codeExample: `// Server flow:\nint server_fd = socket(AF_INET, SOCK_STREAM, 0);\nstruct sockaddr_in addr = {0};\naddr.sin_family = AF_INET;\naddr.sin_port = htons(8080);\naddr.sin_addr.s_addr = INADDR_ANY;\n\nbind(server_fd, (struct sockaddr*)&addr, sizeof(addr));\nlisten(server_fd, 5);\nint client_fd = accept(server_fd, NULL, NULL);\n\n// Client flow:\nint sock = socket(AF_INET, SOCK_STREAM, 0);\nconnect(sock, (struct sockaddr*)&addr, sizeof(addr));`,
        },
        {
          heading: "TCP Client-Server Model",
          content:
            "TCP provides reliable, ordered, bidirectional byte streams. The server binds to a well-known port and listens. The client connects to the server's address and port. Data flows over the established connection. close() terminates.",
        },
        {
          heading: "Byte Ordering",
          content:
            "Network byte order is big-endian. htons() converts short from host to network, htonl() for long. ntohs()/ntohl() convert back. POSIX requires these conversions for portability across different CPU architectures.",
        },
      ],
    },
    playground: {
      defaultCode: `// Socket programming concepts\n// Full socket code requires POSIX/Unix headers\n// This demonstrates the conceptual flow\n#include <stdio.h>\n\nint main(void) {\n    printf("=== Socket Programming Flow ===\\n\");\n    printf("SERVER:\\n\");\n    printf("1. socket()  - create endpoint\\n\");\n    printf("2. bind()    - assign address\\n\");\n    printf("3. listen()  - wait for clients\\n\");\n    printf("4. accept()  - accept connection\\n\");\n    printf("5. read/write - exchange data\\n\");\n    printf("6. close()   - cleanup\\n\");\n    printf("\\nCLIENT:\\n\");\n    printf("1. socket()  - create endpoint\\n\");\n    printf("2. connect() - connect to server\\n\");\n    printf("3. read/write - exchange data\\n\");\n    printf("4. close()   - cleanup\\n\");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d38-q1", type: "quiz", title: "Socket Function",
        description: "Understanding socket creation",
        question: "What is the first function called to create a network socket?",
        options: [
          { id: "a", text: "bind()", correct: false },
          { id: "b", text: "socket()", correct: true },
          { id: "c", text: "listen()", correct: false },
          { id: "d", text: "accept()", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d38-q2", type: "quiz", title: "Port Numbers",
        description: "Understanding network ports",
        question: "What is htons() used for?",
        options: [
          { id: "a", text: "Converting string to int", correct: false },
          { id: "b", text: "Converting port to network byte order", correct: true },
          { id: "c", text: "Hashing the socket address", correct: false },
          { id: "d", text: "Setting socket timeout", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d38-c1", type: "code", title: "Socket Flow Simulation",
        description: "Simulate the socket API call sequence with print statements",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    /* TODO: print a simulated socket communication */\n    printf("=== Echo Server Simulation ===\\n\");\n    return 0;\n}`,
        hints: ["Show both server and client side", "Include address/port info", "Show data flow"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d38-a1", title: "Socket API Reference",
      description: "Write a program that provides a structured reference for the socket API",
      requirements: [
        "Print a formatted reference for: socket, bind, listen, accept, connect, send, recv, close",
        "For each function: signature, purpose, parameters, return value",
        "Include a diagram of the client-server flow (ASCII art)",
        "Include the TCP handshake explanation",
        "Note platform differences (Unix vs Windows)",
      ],
      starterCode: `#include <stdio.h>\n\nvoid print_api(const char *name, const char *sig, const char *purpose) {\n    printf("\\n=== %s ===\\n\", name);\n    printf("Signature: %s\\n\", sig);\n    printf("Purpose: %s\\n\", purpose);\n}\n\nint main(void) {\n    print_api("socket", "int socket(int domain, int type, int protocol)",\n             "Create an endpoint for communication\");\n    /* TODO: add more socket API entries */\n    return 0;\n}`,
      rubric: [
        { criterion: "All 8 socket functions covered", points: 30 },
        { criterion: "Client-server flow diagram", points: 25 },
        { criterion: "Accurate signatures", points: 25 },
        { criterion: "TCP handshake explanation", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
