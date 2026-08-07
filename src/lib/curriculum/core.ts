import type { Lesson } from "../types";
import { getLevelForDay } from "../types";

/* ─── Detailed lessons for Days 1–100 ─── */

interface DayBlueprint {
  title: string;
  subtitle: string;
  language: "c" | "asm";
  tags: string[];
  theoryTopics: string[];
  codeTemplate: string;
}

const C_CURRICULUM: DayBlueprint[] = [
  { title: "The Machine Awakens", subtitle: "Hello World & compilation pipeline", language: "c", tags: ["hello-world"], theoryTopics: ["Why C", "Compilation", "main()"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}` },
  { title: "Data Types & Memory Layout", subtitle: "Fundamental types and sizeof", language: "c", tags: ["types"], theoryTopics: ["int", "char", "float", "sizeof"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    printf("int: %zu bytes\\n", sizeof(int));\n    return 0;\n}` },
  { title: "Variables & Operators", subtitle: "Arithmetic and bitwise ops", language: "c", tags: ["operators"], theoryTopics: ["Variables", "Bitwise", "Precedence"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    unsigned a = 5, b = 3;\n    printf("a & b = %u\\n", a & b);\n    return 0;\n}` },
  { title: "Control Flow: Conditionals", subtitle: "if, else, switch — branching logic", language: "c", tags: ["control-flow"], theoryTopics: ["if/else", "switch", "ternary"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int score = 85;\n    if (score >= 90) printf("A\\n");\n    else if (score >= 80) printf("B\\n");\n    else printf("C\\n");\n    return 0;\n}` },
  { title: "Control Flow: Loops", subtitle: "for, while, do-while iteration", language: "c", tags: ["loops"], theoryTopics: ["for", "while", "do-while", "break/continue"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    for (int i = 0; i < 5; i++)\n        printf("%d ", i);\n    printf("\\n");\n    return 0;\n}` },
  { title: "Functions", subtitle: "Declaration, definition, and scope", language: "c", tags: ["functions"], theoryTopics: ["Prototypes", "Parameters", "Return values"], codeTemplate: `#include <stdio.h>\n\nint square(int x) { return x * x; }\n\nint main(void) {\n    printf("4^2 = %d\\n", square(4));\n    return 0;\n}` },
  { title: "Arrays", subtitle: "Contiguous memory blocks", language: "c", tags: ["arrays"], theoryTopics: ["Declaration", "Indexing", "Bounds"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int arr[5] = {1, 2, 3, 4, 5};\n    for (int i = 0; i < 5; i++)\n        printf("%d ", arr[i]);\n    printf("\\n");\n    return 0;\n}` },
  { title: "Strings", subtitle: "char arrays and string.h", language: "c", tags: ["strings"], theoryTopics: ["Null terminator", "strlen", "strcpy"], codeTemplate: `#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char msg[] = "systems";\n    printf("Length: %zu\\n", strlen(msg));\n    return 0;\n}` },
  { title: "Pointers Intro", subtitle: "Addresses, dereferencing, the & operator", language: "c", tags: ["pointers"], theoryTopics: ["Address-of", "Dereference", "NULL"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int x = 42;\n    int *p = &x;\n    printf("x=%d, *p=%d, addr=%p\\n", x, *p, (void*)p);\n    return 0;\n}` },
  { title: "Pointer Arithmetic", subtitle: "Navigating memory with pointers", language: "c", tags: ["pointers"], theoryTopics: ["Increment", "Array-pointer equivalence", "void*"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int arr[] = {10, 20, 30};\n    int *p = arr;\n    printf("%d %d %d\\n", *p, *(p+1), *(p+2));\n    return 0;\n}` },
  { title: "Structs", subtitle: "Grouping data into custom types", language: "c", tags: ["structs"], theoryTopics: ["Definition", "Members", "typedef"], codeTemplate: `#include <stdio.h>\n\ntypedef struct { char name[32]; int age; } Person;\n\nint main(void) {\n    Person p = {"Neo", 30};\n    printf("%s, age %d\\n", p.name, p.age);\n    return 0;\n}` },
  { title: "Enums & Unions", subtitle: "Named constants and shared memory", language: "c", tags: ["enums"], theoryTopics: ["enum", "union", "Memory overlay"], codeTemplate: `#include <stdio.h>\n\ntypedef enum { RED, GREEN, BLUE } Color;\n\nint main(void) {\n    Color c = GREEN;\n    printf("Color value: %d\\n", c);\n    return 0;\n}` },
  { title: "Dynamic Memory: malloc", subtitle: "Heap allocation fundamentals", language: "c", tags: ["memory"], theoryTopics: ["malloc", "free", "Heap vs Stack"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = malloc(5 * sizeof(int));\n    if (arr) { arr[0] = 42; printf("%d\\n", arr[0]); free(arr); }\n    return 0;\n}` },
  { title: "Dynamic Memory: realloc & calloc", subtitle: "Resizing and zero-initialization", language: "c", tags: ["memory"], theoryTopics: ["calloc", "realloc", "Memory leaks"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *p = calloc(3, sizeof(int));\n    p = realloc(p, 5 * sizeof(int));\n    free(p);\n    return 0;\n}` },
  { title: "Function Pointers", subtitle: "Callbacks and dispatch tables", language: "c", tags: ["pointers"], theoryTopics: ["Syntax", "Callbacks", "qsort"], codeTemplate: `#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\n\nint main(void) {\n    int (*op)(int, int) = add;\n    printf("3+4 = %d\\n", op(3, 4));\n    return 0;\n}` },
  { title: "Preprocessor", subtitle: "#define, macros, and conditional compilation", language: "c", tags: ["preprocessor"], theoryTopics: ["#define", "Macros", "#ifdef"], codeTemplate: `#include <stdio.h>\n\n#define MAX(a,b) ((a)>(b)?(a):(b))\n\nint main(void) {\n    printf("MAX(3,7) = %d\\n", MAX(3, 7));\n    return 0;\n}` },
  { title: "File I/O", subtitle: "Reading and writing files with stdio", language: "c", tags: ["files"], theoryTopics: ["fopen", "fread", "fwrite", "fclose"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    FILE *f = fopen("test.txt", "w");\n    if (f) { fprintf(f, "data\\n"); fclose(f); }\n    return 0;\n}` },
  { title: "Command Line Arguments", subtitle: "argc, argv, and program interfaces", language: "c", tags: ["cli"], theoryTopics: ["argc/argv", "Parsing", "getopt"], codeTemplate: `#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n    for (int i = 0; i < argc; i++)\n        printf("arg[%d]: %s\\n", i, argv[i]);\n    return 0;\n}` },
  { title: "Recursion", subtitle: "Functions calling themselves", language: "c", tags: ["recursion"], theoryTopics: ["Base case", "Stack frames", "Tail recursion"], codeTemplate: `#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main(void) {\n    printf("5! = %d\\n", factorial(5));\n    return 0;\n}` },
  { title: "Linked Lists", subtitle: "Dynamic data structures in C", language: "c", tags: ["data-structures"], theoryTopics: ["Node struct", "Insert", "Traverse"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node { int data; struct Node *next; } Node;\n\nint main(void) {\n    Node n1 = {42, NULL};\n    printf("Data: %d\\n", n1.data);\n    return 0;\n}` },
  { title: "Stack Implementation", subtitle: "LIFO data structure from scratch", language: "c", tags: ["data-structures"], theoryTopics: ["Push", "Pop", "Overflow"], codeTemplate: `#include <stdio.h>\n\n#define MAX 100\nint stack[MAX], top = -1;\n\nvoid push(int v) { stack[++top] = v; }\nint pop(void) { return stack[top--]; }\n\nint main(void) {\n    push(10); push(20);\n    printf("Popped: %d\\n", pop());\n    return 0;\n}` },
  { title: "Queue Implementation", subtitle: "FIFO data structure from scratch", language: "c", tags: ["data-structures"], theoryTopics: ["Enqueue", "Dequeue", "Circular buffer"], codeTemplate: `#include <stdio.h>\n\n#define MAX 100\nint queue[MAX], front = 0, rear = -1;\n\nvoid enqueue(int v) { queue[++rear] = v; }\nint dequeue(void) { return queue[front++]; }\n\nint main(void) {\n    enqueue(1); enqueue(2);\n    printf("Dequeued: %d\\n", dequeue());\n    return 0;\n}` },
  { title: "Binary Search", subtitle: "Divide and conquer on sorted arrays", language: "c", tags: ["algorithms"], theoryTopics: ["O(log n)", "Implementation", "Edge cases"], codeTemplate: `#include <stdio.h>\n\nint bsearch(int arr[], int n, int target) {\n    int lo = 0, hi = n - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;\n    }\n    return -1;\n}\n\nint main(void) {\n    int a[] = {1,3,5,7,9};\n    printf("Index: %d\\n", bsearch(a, 5, 7));\n    return 0;\n}` },
  { title: "Sorting Algorithms", subtitle: "Bubble, insertion, and selection sort", language: "c", tags: ["algorithms"], theoryTopics: ["O(n²) sorts", "Stability", "When to use"], codeTemplate: `#include <stdio.h>\n\nvoid bubble_sort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n}\n\nint main(void) {\n    int a[] = {5,2,8,1,9};\n    bubble_sort(a, 5);\n    for (int i = 0; i < 5; i++) printf("%d ", a[i]);\n    return 0;\n}` },
  { title: "Multi-dimensional Arrays", subtitle: "Matrices and nested loops", language: "c", tags: ["arrays"], theoryTopics: ["2D arrays", "Row-major order", "Matrix ops"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int mat[2][3] = {{1,2,3},{4,5,6}};\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++)\n            printf("%d ", mat[i][j]);\n        printf("\\n");\n    }\n    return 0;\n}` },
  { title: "String Manipulation", subtitle: "Building string utilities from scratch", language: "c", tags: ["strings"], theoryTopics: ["my_strlen", "my_strcpy", "my_strcmp"], codeTemplate: `#include <stdio.h>\n\nint my_strlen(const char *s) {\n    int len = 0;\n    while (s[len]) len++;\n    return len;\n}\n\nint main(void) {\n    printf("len = %d\\n", my_strlen("hello"));\n    return 0;\n}` },
  { title: "Header Files & Modules", subtitle: "Organizing code across files", language: "c", tags: ["modules"], theoryTopics: [".h files", "Include guards", "extern"], codeTemplate: `/* math_utils.h */\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\nint add(int a, int b);\n#endif\n\n/* Usage in main.c */\n#include "math_utils.h"`,
  },
  { title: "const & volatile", subtitle: "Immutability and compiler hints", language: "c", tags: ["advanced"], theoryTopics: ["const pointers", "volatile", "restrict"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    const int MAX = 100;\n    int x = 10;\n    const int *p = &x;\n    printf("MAX=%d, *p=%d\\n", MAX, *p);\n    return 0;\n}` },
  { title: "Bit Fields", subtitle: "Packing data at the bit level", language: "c", tags: ["advanced"], theoryTopics: ["struct bit fields", "Flags", "Hardware registers"], codeTemplate: `#include <stdio.h>\n\ntypedef struct {\n    unsigned int flag1 : 1;\n    unsigned int flag2 : 1;\n    unsigned int value : 6;\n} Flags;\n\nint main(void) {\n    Flags f = {1, 0, 42};\n    printf("value=%u\\n", f.value);\n    return 0;\n}` },
  { title: "Error Handling", subtitle: "errno, perror, and defensive coding", language: "c", tags: ["errors"], theoryTopics: ["errno", "perror", "Return codes"], codeTemplate: `#include <stdio.h>\n#include <errno.h>\n#include <string.h>\n\nint main(void) {\n    FILE *f = fopen("/nonexistent", "r");\n    if (!f) perror("fopen failed");\n    return 0;\n}` },
  { title: "Memory Alignment", subtitle: "Padding, packing, and cache lines", language: "c", tags: ["memory"], theoryTopics: ["Alignment rules", "Padding", "offsetof"], codeTemplate: `#include <stdio.h>\n#include <stddef.h>\n\ntypedef struct { char a; int b; char c; } S;\n\nint main(void) {\n    printf("sizeof(S) = %zu\\n", sizeof(S));\n    printf("offset b = %zu\\n", offsetof(S, b));\n    return 0;\n}` },
  { title: "Hash Table", subtitle: "Key-value storage with hashing", language: "c", tags: ["data-structures"], theoryTopics: ["Hash function", "Collisions", "Chaining"], codeTemplate: `#include <stdio.h>\n\nunsigned hash(const char *key) {\n    unsigned h = 5381;\n    while (*key) h = ((h << 5) + h) + *key++;\n    return h;\n}\n\nint main(void) {\n    printf("hash \\"test\\" = %u\\n", hash("test"));\n    return 0;\n}` },
  { title: "Binary Trees", subtitle: "Tree nodes and traversal", language: "c", tags: ["data-structures"], theoryTopics: ["Node struct", "Inorder", "Preorder"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TreeNode {\n    int val;\n    struct TreeNode *left, *right;\n} TreeNode;\n\nvoid inorder(TreeNode *n) {\n    if (!n) return;\n    inorder(n->left);\n    printf("%d ", n->val);\n    inorder(n->right);\n}\n\nint main(void) { return 0; }` },
  { title: "Makefile Basics", subtitle: "Automating builds with make", language: "c", tags: ["tooling"], theoryTopics: ["Targets", "Dependencies", "Variables"], codeTemplate: `# Makefile example\nCC = gcc\nCFLAGS = -Wall -Wextra -std=c11\n\nmain: main.o utils.o\n\t$(CC) $(CFLAGS) -o main main.o utils.o\n\nmain.o: main.c\n\t$(CC) $(CFLAGS) -c main.c` },
  { title: "Debugging with GDB", subtitle: "Breakpoints, watchpoints, backtraces", language: "c", tags: ["tooling"], theoryTopics: ["break", "step", "print", "backtrace"], codeTemplate: `# Compile with debug symbols:\n# gcc -g -O0 -o program program.c\n#\n# GDB commands:\n# (gdb) break main\n# (gdb) run\n# (gdb) next\n# (gdb) print variable\n# (gdb) backtrace` },
  { title: "Valgrind & Memory Tools", subtitle: "Detecting leaks and invalid access", language: "c", tags: ["tooling"], theoryTopics: ["memcheck", "Leak detection", "Invalid reads"], codeTemplate: `# Run with Valgrind:\n# valgrind --leak-check=full ./program\n#\n# Common issues detected:\n# - Memory leaks (malloc without free)\n# - Use after free\n# - Invalid reads/writes` },
  { title: "Multi-file Projects", subtitle: "Building a modular C application", language: "c", tags: ["projects"], theoryTopics: ["Project structure", "Static libraries", "Linking"], codeTemplate: `# Project layout:\n# src/main.c\n# src/utils.c\n# include/utils.h\n# Makefile\n#\n# gcc -Iinclude -c src/*.c\n# gcc -o app *.o` },
  { title: "Socket Programming Intro", subtitle: "Network communication in C", language: "c", tags: ["networking"], theoryTopics: ["socket()", "bind()", "connect()"], codeTemplate: `#include <stdio.h>\n/* #include <sys/socket.h> */\n/* Network programming requires platform-specific headers */\n\nint main(void) {\n    printf("Socket programming - Day 37\\n");\n    printf("Sockets enable TCP/UDP communication\\n");\n    return 0;\n}` },
  { title: "Signals", subtitle: "Inter-process communication via signals", language: "c", tags: ["systems"], theoryTopics: ["signal()", "SIGINT", "SIGSEGV"], codeTemplate: `#include <stdio.h>\n#include <signal.h>\n\nvoid handler(int sig) {\n    printf("Caught signal %d\\n", sig);\n}\n\nint main(void) {\n    signal(SIGINT, handler);\n    printf("Press Ctrl+C...\\n");\n    while(1);\n    return 0;\n}` },
  { title: "Process Management", subtitle: "fork, exec, wait — spawning processes", language: "c", tags: ["systems"], theoryTopics: ["fork()", "exec()", "wait()"], codeTemplate: `#include <stdio.h>\n/* Unix process management */\n\nint main(void) {\n    printf("Process management fundamentals\\n");\n    printf("fork() creates a child process\\n");\n    return 0;\n}` },
  { title: "Threads Intro", subtitle: "Concurrent execution with pthreads", language: "c", tags: ["concurrency"], theoryTopics: ["pthread_create", "Mutex", "Race conditions"], codeTemplate: `#include <stdio.h>\n/* #include <pthread.h> */\n\nint main(void) {\n    printf("Thread programming with pthreads\\n");\n    return 0;\n}` },
  { title: "Mutexes & Synchronization", subtitle: "Protecting shared resources", language: "c", tags: ["concurrency"], theoryTopics: ["pthread_mutex", "Deadlock", "Condition vars"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    printf("Mutex: mutual exclusion lock\\n");\n    printf("Prevents race conditions on shared data\\n");\n    return 0;\n}` },
  { title: "Memory Pools", subtitle: "Custom allocators for performance", language: "c", tags: ["memory"], theoryTopics: ["Pool design", "Arena allocators", "Fragmentation"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\n/* Simple memory pool concept */\ntypedef struct {\n    char *buffer;\n    size_t size, offset;\n} Pool;\n\nint main(void) {\n    printf("Memory pools reduce malloc overhead\\n");\n    return 0;\n}` },
  { title: "Generic Programming", subtitle: "void* and macro-based generics", language: "c", tags: ["advanced"], theoryTopics: ["void pointers", "_Generic", "Macro tricks"], codeTemplate: `#include <stdio.h>\n\n#define MAX_OF(a, b) ({ \\\n    typeof(a) _a = (a); \\\n    typeof(b) _b = (b); \\\n    _a > _b ? _a : _b; \\\n})\n\nint main(void) {\n    printf("max = %d\\n", MAX_OF(3, 7));\n    return 0;\n}` },
  { title: "C Standard Library Deep Dive", subtitle: "stdlib, string, stdio internals", language: "c", tags: ["stdlib"], theoryTopics: ["qsort", "bsearch", "atexit"], codeTemplate: `#include <stdio.h>\n#include <stdlib.h>\n\nint cmp(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}\n\nint main(void) {\n    int arr[] = {5,2,8,1};\n    qsort(arr, 4, sizeof(int), cmp);\n    for (int i = 0; i < 4; i++) printf("%d ", arr[i]);\n    return 0;\n}` },
  { title: "Embedded C Patterns", subtitle: "Register access and volatile hardware", language: "c", tags: ["embedded"], theoryTopics: ["MMIO", "Register maps", "Interrupts"], codeTemplate: `#include <stdint.h>\n\n/* Memory-mapped I/O example */\n#define GPIO_BASE 0x40000000\n#define GPIO_ODR  (*(volatile uint32_t*)(GPIO_BASE + 0x14))\n\nint main(void) {\n    GPIO_ODR = 0xFF;\n    return 0;\n}` },
  { title: "Unit Testing in C", subtitle: "Testing frameworks and TDD", language: "c", tags: ["testing"], theoryTopics: ["Unity", "CMocka", "Test structure"], codeTemplate: `#include <stdio.h>\n#include <assert.h>\n\nint add(int a, int b) { return a + b; }\n\nint main(void) {\n    assert(add(2, 3) == 5);\n    assert(add(-1, 1) == 0);\n    printf("All tests passed!\\n");\n    return 0;\n}` },
  { title: "C to Assembly Bridge", subtitle: "How C compiles to machine code", language: "c", tags: ["asm-bridge"], theoryTopics: ["gcc -S", "Reading ASM output", "Calling conventions"], codeTemplate: `# Generate assembly from C:\n# gcc -S -O0 -fno-asynchronous-unwind-tables program.c\n#\n# int add(int a, int b) { return a + b; }\n# compiles to something like:\n# add:\n#     mov  eax, edi\n#     add  eax, esi\n#     ret` },
  { title: "Inline Assembly", subtitle: "Embedding ASM in C with __asm__", language: "c", tags: ["asm-bridge"], theoryTopics: ["__asm__ keyword", "Constraints", "Volatility"], codeTemplate: `#include <stdio.h>\n\nint main(void) {\n    int result;\n    __asm__("mov $42, %0" : "=r"(result));\n    printf("ASM result: %d\\n", result);\n    return 0;\n}` },
  { title: "Capstone: C Systems Project", subtitle: "Build a complete C application", language: "c", tags: ["capstone"], theoryTopics: ["Project planning", "Architecture", "Review"], codeTemplate: `#include <stdio.h>\n\n/* Capstone Project Ideas:\n * - CLI calculator with history\n * - Text editor (mini-vim)\n * - Memory allocator\n * - HTTP server\n * - Shell interpreter\n */\n\nint main(void) {\n    printf("C Capstone - Choose your weapon!\\n");\n    return 0;\n}` },
];

const ASM_CURRICULUM: DayBlueprint[] = [
  { title: "Assembly Genesis", subtitle: "What is Assembly and why learn it?", language: "asm", tags: ["intro"], theoryTopics: ["Machine code", "Mnemonics", "ISA"], codeTemplate: `; x86-64 NASM syntax\nsection .data\n    msg db 'Hello, registers!', 0\n\nsection .text\nglobal _start\n\n_start:\n    ; System call: write(1, msg, len)\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, msg\n    mov rdx, 18\n    syscall\n    mov rax, 60\n    xor rdi, rdi\n    syscall` },
  { title: "CPU Architecture", subtitle: "Registers, ALU, and the fetch-decode-execute cycle", language: "asm", tags: ["architecture"], theoryTopics: ["Registers", "ALU", "Pipeline"], codeTemplate: `; x86-64 General Purpose Registers (64-bit):\n; RAX - accumulator    RBX - base\n; RCX - counter        RDX - data\n; RSI - source index   RDI - dest index\n; RBP - base pointer   RSP - stack pointer\n; R8-R15 - extended registers\n\nsection .text\nglobal _start\n_start:\n    mov rax, 42    ; Load immediate into RAX\n    mov rbx, rax   ; Copy RAX to RBX\n    ; rax = 42, rbx = 42` },
  { title: "MOV & Data Movement", subtitle: "Loading, storing, and transferring data", language: "asm", tags: ["instructions"], theoryTopics: ["MOV", "Immediate values", "Register sizes"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rax, 255       ; 64-bit\n    mov eax, 255       ; lower 32 bits (zero-extends)\n    mov ax, 255        ; lower 16 bits\n    mov al, 255        ; lower 8 bits\n    mov ah, 0          ; upper 8 bits of AX\n    ; Each size clears upper bits (except AH path)` },
  { title: "Arithmetic Instructions", subtitle: "ADD, SUB, MUL, DIV on registers", language: "asm", tags: ["instructions"], theoryTopics: ["ADD/SUB", "MUL/DIV", "Overflow flags"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rax, 10\n    add rax, 5      ; rax = 15\n    sub rax, 3      ; rax = 12\n    imul rax, 2     ; rax = 24\n    mov rbx, 4\n    idiv rbx        ; rax = 6 (quotient), rdx = remainder\n    ; CF and OF flags set on overflow` },
  { title: "Logical & Bitwise Ops", subtitle: "AND, OR, XOR, NOT, shifts in ASM", language: "asm", tags: ["instructions"], theoryTopics: ["AND/OR/XOR", "SHL/SHR", "Flags"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rax, 0b1100\n    mov rbx, 0b1010\n    and rax, rbx    ; rax = 1000 (8)\n    or  rax, rbx    ; rax = 1110 (14)\n    xor rax, rbx    ; rax = 0100 (4)\n    not rax         ; flip all bits\n    shl rax, 2      ; shift left 2\n    shr rax, 1      ; shift right 1` },
  { title: "Conditional Jumps", subtitle: "CMP, TEST, and branching", language: "asm", tags: ["control-flow"], theoryTopics: ["CMP", "Flags register", "JE/JNE/JG/JL"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rax, 10\n    mov rbx, 20\n    cmp rax, rbx    ; sets flags: rax - rbx\n    jg  greater     ; jump if rax > rbx (signed)\n    jl  lesser\n    jmp done\ngreater:\n    ; rax is greater\n    jmp done\nlesser:\n    ; rax is lesser\ndone:\n    nop` },
  { title: "Loops in Assembly", subtitle: "Loop constructs with DEC/JNZ", language: "asm", tags: ["control-flow"], theoryTopics: ["Loop label", "DEC/JNZ", "LOOP instruction"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rcx, 5      ; counter\nloop_start:\n    ; body of loop here\n    dec rcx\n    jnz loop_start  ; jump if not zero\n    ; loop done\n    nop` },
  { title: "The Stack", subtitle: "PUSH, POP, and stack frame management", language: "asm", tags: ["stack"], theoryTopics: ["Stack grows down", "PUSH/POP", "RSP/RBP"], codeTemplate: `section .text\nglobal _start\n_start:\n    push rax        ; save rax on stack\n    push rbx        ; save rbx\n    mov rax, 42     ; use rax freely\n    pop rbx         ; restore rbx\n    pop rax         ; restore rax\n    ; Stack: grows toward lower addresses\n    ; RSP points to top of stack` },
  { title: "Functions & CALL/RET", subtitle: "Calling conventions and stack frames", language: "asm", tags: ["functions"], theoryTopics: ["CALL/RET", "Prologue/Epilogue", "System V ABI"], codeTemplate: `section .text\nglobal _start\n\nmy_add:\n    push rbp\n    mov rbp, rsp\n    mov rax, [rbp+16]  ; first arg\n    add rax, [rbp+24]  ; second arg\n    pop rbp\n    ret\n\n_start:\n    ; call my_add with args\n    nop` },
  { title: "Memory Addressing Modes", subtitle: "Direct, indirect, indexed, and base+offset", language: "asm", tags: ["memory"], theoryTopics: ["Direct", "Indirect", "Base+index*scale"], codeTemplate: `section .data\n    arr dd 10, 20, 30, 40\n\nsection .text\nglobal _start\n_start:\n    mov rax, [arr]          ; direct: arr[0]\n    mov rbx, arr\n    mov rcx, [rbx + 8]      ; indirect: arr[2]\n    mov rdx, [rbx + rcx*4]  ; indexed\n    ; Effective address = base + index*scale + disp` },
  { title: "System Calls", subtitle: "Invoking the OS kernel directly", language: "asm", tags: ["syscalls"], theoryTopics: ["syscall instruction", "Linux x64 ABI", "errno"], codeTemplate: `section .data\n    msg db 'Direct kernel call', 0xA\n    len equ $ - msg\n\nsection .text\nglobal _start\n_start:\n    mov rax, 1      ; sys_write\n    mov rdi, 1      ; stdout\n    mov rsi, msg\n    mov rdx, len\n    syscall\n    mov rax, 60     ; sys_exit\n    xor rdi, rdi\n    syscall` },
  { title: "String Operations", subtitle: "LODS, STOS, MOVS, SCAS, CMPS", language: "asm", tags: ["strings"], theoryTopics: ["String instructions", "Direction flag", "REP prefix"], codeTemplate: `section .data\n    src db 'Hello', 0\n    dst times 6 db 0\n\nsection .text\nglobal _start\n_start:\n    cld             ; clear direction (forward)\n    mov rsi, src    ; source\n    mov rdi, dst    ; destination\n    mov rcx, 5\n    rep movsb       ; move rcx bytes from [rsi] to [rdi]\n    nop` },
  { title: "x86-64 Calling Convention", subtitle: "System V AMD64 ABI in detail", language: "asm", tags: ["abi"], theoryTopics: ["Register args", "Stack alignment", "Red zone"], codeTemplate: `; System V AMD64 ABI:\n; Args: RDI, RSI, RDX, RCX, R8, R9 (then stack)\n; Return: RAX (and RDX for 128-bit)\n; Caller-saved: RAX, RCX, RDX, RSI, RDI, R8-R11\n; Callee-saved: RBX, RBP, R12-R15\n; Stack must be 16-byte aligned before CALL\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Reading C in Assembly", subtitle: "Decompiling mental models", language: "asm", tags: ["reverse"], theoryTopics: ["if/else in ASM", "Loops in ASM", "Function calls"], codeTemplate: `; C: if (x > 0) { y = x; } else { y = -x; }\n;\n; Assembly equivalent:\n;     mov  eax, [x]\n;     test eax, eax\n;     jle  .else\n;     mov  [y], eax\n;     jmp  .done\n; .else:\n;     neg  eax\n;     mov  [y], eax\n; .done:` },
  { title: "Arrays in Assembly", subtitle: "Contiguous memory traversal", language: "asm", tags: ["arrays"], theoryTopics: ["Base address", "Stride", "Bounds"], codeTemplate: `section .data\n    numbers dd 1, 2, 3, 4, 5\n    count equ 5\n\nsection .text\nglobal _start\n_start:\n    mov rcx, count\n    mov rsi, numbers\n    xor rax, rax        ; sum = 0\nsum_loop:\n    add eax, [rsi]\n    add rsi, 4          ; next int (4 bytes)\n    loop sum_loop\n    ; rax = sum of array` },
  { title: "Structs in Assembly", subtitle: "Accessing struct members by offset", language: "asm", tags: ["structs"], theoryTopics: ["Member offsets", "Padding", "Pointer to struct"], codeTemplate: `; struct Point { int x; int y; };  // 8 bytes\n;\n; Access point.x:  mov eax, [point]\n; Access point.y:  mov eax, [point + 4]\n; Via pointer:     mov eax, [rbx]      ; p->x\n;                  mov eax, [rbx + 4]  ; p->y\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Bit Manipulation in ASM", subtitle: "BT, BTS, BTR, BTC instructions", language: "asm", tags: ["bitwise"], theoryTopics: ["Bit test", "Set/clear/toggle", "Masks"], codeTemplate: `section .text\nglobal _start\n_start:\n    mov rax, 0b1010\n    bt  rax, 1      ; test bit 1 (CF = 1 if set)\n    bts rax, 0      ; set bit 0\n    btr rax, 3      ; clear bit 3\n    btc rax, 2      ; complement bit 2\n    ; rax modified in place` },
  { title: "Floating Point", subtitle: "SSE/AVX registers and float ops", language: "asm", tags: ["float"], theoryTopics: ["XMM registers", "movss/addss", "cvt"], codeTemplate: `section .text\nglobal _start\n_start:\n    ; SSE single-precision floats\n    ; movss xmm0, [a]    ; load float\n    ; addss xmm0, [b]    ; xmm0 += b\n    ; movss [result], xmm0\n    nop\n    ; XMM0-XMM15: 128-bit SIMD registers` },
  { title: "SIMD Intro", subtitle: "Vector operations with SSE/AVX", language: "asm", tags: ["simd"], theoryTopics: ["Parallel ops", "128/256-bit", "Use cases"], codeTemplate: `section .text\nglobal _start\n_start:\n    ; Process 4 floats at once:\n    ; movaps xmm0, [array1]\n    ; addps  xmm0, [array2]  ; 4 parallel adds\n    ; movaps [result], xmm0\n    nop` },
  { title: "Interrupts & Exceptions", subtitle: "Hardware events and handlers", language: "asm", tags: ["systems"], theoryTopics: ["IDT", "ISR", "Exception vectors"], codeTemplate: `; Interrupt Descriptor Table (IDT)\n; Each entry: handler address + segment + flags\n;\n; Common exceptions:\n; 0  - Division by zero\n; 6  - Invalid opcode\n; 13 - General protection fault\n; 14 - Page fault\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Inline ASM in C", subtitle: "GCC extended asm syntax", language: "asm", tags: ["inline"], theoryTopics: ["Constraints", "Clobbers", "Volatility"], codeTemplate: `; In C code:\n; int x = 10;\n; __asm__ volatile(\n;     "add $5, %0"\n;     : "+r"(x)       // output/input\n;     :               // no pure inputs\n;     : "cc"          // clobbered flags\n; );\n; // x is now 15` },
  { title: "Optimizing Assembly", subtitle: "Instruction selection and pipelining", language: "asm", tags: ["optimization"], theoryTopics: ["Pipeline stalls", "Branch prediction", "Loop unrolling"], codeTemplate: `section .text\nglobal _start\n_start:\n    ; Prefer LEA over ADD for addr calc\n    ; lea rax, [rbx + rcx*4 + 8]\n    ; Avoid partial register stalls\n    ; Use XOR for zero: xor eax, eax (not mov eax, 0)\n    nop` },
  { title: "Reverse Engineering", subtitle: "Reading disassembly like a book", language: "asm", tags: ["reverse"], theoryTopics: ["objdump", "Ghidra", "Pattern recognition"], codeTemplate: `# Tools for reverse engineering:\n# objdump -d ./program    ; disassemble\n# gdb                     ; live debugging\n# Ghidra / IDA Pro         ; decompilers\n#\n# Look for:\n# - Function prologues (push rbp; mov rbp, rsp)\n# - String references\n# - System call patterns` },
  { title: "Shellcode Basics", subtitle: "Position-independent machine code", language: "asm", tags: ["security"], theoryTopics: ["PIC", "No null bytes", "Payload structure"], codeTemplate: `; Shellcode requirements:\n; - Position independent (no hardcoded addresses)\n; - No null bytes (0x00) for string-based exploits\n; - Self-contained (resolves own addresses)\n;\n; Classic execve("/bin/sh") shellcode concept:\n; - Set up registers for sys_execve\n; - Point to "/bin/sh" string\n; - syscall` },
  { title: "Bootloader Concepts", subtitle: "First code the CPU executes", language: "asm", tags: ["boot"], theoryTopics: ["BIOS/UEFI", "Real mode", "Stage loaders"], codeTemplate: `; Boot process:\n; 1. CPU resets, CS:IP = FFFF:0000\n; 2. BIOS runs POST, finds boot device\n; 3. Loads 512-byte MBR to 0x7C00\n; 4. MBR jumps to bootloader\n; 5. Bootloader loads kernel\n;\n; [BITS 16]  ; Real mode\n; org 0x7C00\n; boot:\n;     jmp start` },
  { title: "Memory Segmentation", subtitle: "Segments, GDT, and protected mode", language: "asm", tags: ["memory"], theoryTopics: ["GDT", "Segments", "Protected mode"], codeTemplate: `; Global Descriptor Table (GDT):\n; Defines memory segments with permissions\n;\n; Segment descriptor (8 bytes):\n; - Base address (32-bit)\n; - Limit (20-bit)\n; - Access byte (P, DPL, S, Type)\n; - Flags (G, D/B, L, AVL)\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Paging & Virtual Memory", subtitle: "Page tables and address translation", language: "asm", tags: ["memory"], theoryTopics: ["Page tables", "TLB", "CR3 register"], codeTemplate: `; x86-64 4-level paging:\n; CR3 -> PML4 -> PDPT -> PD -> PT -> Physical page\n;\n; Virtual address (48-bit):\n; [47:39] PML4 index\n; [38:30] PDPT index\n; [29:21] PD index\n; [20:12] PT index\n; [11:0]  Page offset\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Multithreading in ASM", subtitle: "Thread creation at the lowest level", language: "asm", tags: ["concurrency"], theoryTopics: ["clone syscall", "Thread stacks", "TLS"], codeTemplate: `; Linux clone() for threads:\n; clone(flags, child_stack, ...)\n; CLONE_VM | CLONE_FS | CLONE_FILES | CLONE_SIGHAND\n;\n; Each thread needs its own stack\n; Thread-local storage via FS/GS segments\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Device Drivers Concept", subtitle: "Talking to hardware from ASM", language: "asm", tags: ["drivers"], theoryTopics: ["Port I/O", "MMIO", "Interrupt handlers"], codeTemplate: `; Two ways to access hardware:\n;\n; 1. Port I/O (x86 IN/OUT instructions):\n;    in  al, 0x60    ; read keyboard scancode\n;    out 0x80, al    ; write to diagnostic port\n;\n; 2. Memory-mapped I/O:\n;    mov eax, [0xB8000]  ; VGA text buffer\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Crypto Primitives in ASM", subtitle: "Hand-optimized XOR and AES-NI", language: "asm", tags: ["crypto"], theoryTopics: ["XOR loops", "AES-NI", "Timing attacks"], codeTemplate: `section .text\nglobal _start\n_start:\n    ; Simple XOR cipher:\n    ; mov rcx, length\n    ; mov rsi, plaintext\n    ; mov rdi, ciphertext\n    ; mov al, key_byte\n    ; xor_loop:\n    ;     lodsb\n    ;     xor al, key_byte\n    ;     stosb\n    ;     loop xor_loop\n    nop` },
  { title: "Capstone: ASM Systems Project", subtitle: "Bare-metal or low-level project", language: "asm", tags: ["capstone"], theoryTopics: ["Project ideas", "Integration", "Documentation"], codeTemplate: `; Capstone Project Ideas:\n; - Bootable OS kernel (protected mode)\n; - Keylogger (hooking keyboard interrupt)\n; - Custom malloc in pure ASM\n; - Game engine render loop\n; - Network packet sniffer\n\nsection .text\nglobal _start\n_start:\n    ; Your silicon masterpiece begins here\n    nop` },
  { title: "Advanced ASM Techniques", subtitle: "RDTSC, performance counters, and CPUID", language: "asm", tags: ["advanced"], theoryTopics: ["RDTSC", "Performance counters", "CPUID"], codeTemplate: `section .text\nglobal _start\n_start:\n    ; RDTSC — Read Time-Stamp Counter\n    ; rdtsc  ; returns EDX:EAX (64-bit TSC value)\n    ;\n    ; CPUID — Query CPU features\n    ; mov rax, 0  ; basic info\n    ; cpuid\n    ;\n    ; RDPMC — Read Performance Monitor Counter\n    ; mov rcx, 0  ; counter index\n    ; rdpmc\n    nop` },
  { title: "Exception Handling in ASM", subtitle: "SEH, error handling, and fault recovery", language: "asm", tags: ["systems"], theoryTopics: ["Structured Exception Handling", "Fault handlers", "Recovery"], codeTemplate: `; Windows SEH (x64):\n; Each function has an unwind table entry\n; .xdata section defines exception handlers\n;\n; Linux signal handling:\n; sigaction() with SA_SIGINFO\n; Handler gets siginfo_t and ucontext_t\n; Can modify RIP in ucontext to resume\n;\n; Minimal fault handler concept:\n;     ; Set up signal handler for SIGSEGV\n;     ; Access invalid memory\n;     ; Handler fixes mapping, returns\n;     ; Execution continues seamlessly\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Position-Independent Code", subtitle: "PIC, GOT, PLT, and shared libraries", language: "asm", tags: ["linking"], theoryTopics: ["PIC", "GOT", "PLT"], codeTemplate: `; Position-Independent Code (PIC):\n; Uses relative addressing instead of absolute\n;\n; GOT (Global Offset Table):\n;     ; Addresses of global symbols\n;     ; Updated by dynamic linker at runtime\n;\n; PLT (Procedure Linkage Table):\n;     ; Lazy binding stubs for function calls\n;     ; First call goes to dynamic linker\n;     ; Subsequent calls go directly\n;\n; Getting current IP (x86-64):\n;     lea rax, [rip]  ; RIP-relative addressing\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Linker Scripts & ELF Format", subtitle: "Controlling memory layout and sections", language: "asm", tags: ["linking"], theoryTopics: ["ELF sections", "Linker scripts", "Symbol resolution"], codeTemplate: `; ELF sections:\n; .text  — executable code\n; .data  — initialized data\n; .bss   — zero-initialized data\n; .rodata — read-only data\n;\n; Linker script example:\n; SECTIONS {\n;   . = 0x100000;     /* load address */\n;   .text : { *(.text) }\n;   .data : { *(.data) }\n;   .bss  : { *(.bss)  }\n; }\n;\n; View ELF sections:\n; readelf -S program\n; objdump -d program\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Debugging ASM with GDB", subtitle: "Advanced debugging techniques for assembly", language: "asm", tags: ["tooling"], theoryTopics: ["Layout asm", "Watchpoints", "Reverse debugging"], codeTemplate: `; GDB commands for assembly:\n; (gdb) layout asm        ; show disassembly\n; (gdb) layout regs       ; show registers side-by-side\n; (gdb) si                ; step one instruction\n; (gdb) ni                ; step over call\n; (gdb) info registers    ; all registers\n; (gdb) x/10gx $rsp      ; examine stack memory\n; (gdb) watch *0x601040  ; hardware watchpoint\n; (gdb) reverse-stepi     ; step backward (with record)\n;\n; Record and replay:\n; (gdb) record\n; (gdb) continue\n; (gdb) reverse-stepi` },
  { title: "ASM and C Interop", subtitle: "Calling C from assembly and vice versa", language: "asm", tags: ["interop"], theoryTopics: ["Calling C from ASM", "ASM from C", "Name mangling"], codeTemplate: `; Calling C function from ASM:\n; extern int c_function(int a, int b);\n;\n; mov rdi, 10      ; first arg\n; mov rsi, 20      ; second arg\n; call c_function  ; result in rax\n;\n; Calling ASM from C:\n; extern int asm_func(int a, int b);\n;\n; Assembly implementation:\n; asm_func:\n;     push rbp\n;     mov rbp, rsp\n;     mov rax, rdi\n;     add rax, rsi\n;     pop rbp\n;     ret\n;\n; Compile & link:\n; gcc -o prog main.c asm_func.S\n\nsection .text\nglobal asm_func\nasm_func:\n    push rbp\n    mov rbp, rsp\n    mov rax, rdi\n    add rax, rsi\n    pop rbp\n    ret` },
  { title: "Race Conditions in ASM", subtitle: "Lock prefix, atomic operations, and synchronization", language: "asm", tags: ["concurrency"], theoryTopics: ["LOCK prefix", "CMPXCHG", "Atomic ops"], codeTemplate: `; Atomic operations with LOCK prefix:\n; lock inc qword [counter]  ; atomic increment\n; lock xadd rax, [counter]  ; atomic exchange and add\n; lock cmpxchg [ptr], rbx   ; atomic compare-and-swap\n;\n; CMPXCHG — compare and exchange:\n;     ; Compare RAX with destination\n;     ; If equal: store RBX to destination, set ZF\n;     ; If not equal: load destination into RAX, clear ZF\n;\n; Memory ordering:\n; mfence  ; full memory barrier\n; sfence  ; store barrier\n; lfence  ; load barrier\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Memory Barriers & Ordering", subtitle: "MFENCE, SFENCE, LFENCE and weak ordering", language: "asm", tags: ["concurrency"], theoryTopics: ["Memory ordering", "Fence instructions", "Store buffer"], codeTemplate: `; x86 memory ordering model: TSO (Total Store Order)\n; Stores are not immediately visible to other cores\n;\n; Fence instructions:\n; mfence  ; ensures all previous memory accesses\n;         ; complete before subsequent ones\n; sfence  ; ensures all previous stores are globally visible\n; lfence  ; ensures all previous loads are complete\n;\n; Use cases:\n; - Producer-consumer: sfence between write and flag set\n; - Lock-free data structures: mfence for full ordering\n; - Device I/O: sfence to guarantee MMIO writes\n;\n; Alternative: locked instructions imply full barrier\n; lock xchg [mem], reg  ; implicit mfence\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Advanced SIMD", subtitle: "AVX-512, packed operations, and vectorization", language: "asm", tags: ["simd"], theoryTopics: ["AVX-512", "Mask registers", "Packed ops"], codeTemplate: `; AVX-512 features:\n; - 32 vector registers ZMM0-ZMM31 (512-bit)\n; - 8 mask registers k0-k7\n; - Embedded rounding and exception suppression\n; - Scatter/gather operations\n;\n; Basic AVX-512 operation:\n; ; vaddps zmm0 {k1}, zmm1, zmm2  ; masked add\n; ; vmovaps [rdi] {k2}, zmm0       ; masked store\n;\n; Mask registers control per-element operation:\n; ; ktestq k1, k2    ; test mask bits\n; ; kortestq k1, k2  ; OR test masks\n;\n; Gather: vgatherdps zmm0 {k1}, [rdi + zmm1*4]\n; Scatter: vscatterdps [rdi + zmm0*4] {k1}, zmm1\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Virtualization Concepts", subtitle: "VMX, hypervisor basics, and hardware virtualization", language: "asm", tags: ["systems"], theoryTopics: ["VMX", "VM entries/exits", "EPT"], codeTemplate: `; Intel VMX (Virtual Machine Extensions):\n; VMXON — enter VMX operation\n; VMLAUNCH — start VM entry\n; VMRESUME — resume VM entry\n; VMREAD/VMWRITE — access VMCS fields\n; VMXOFF — leave VMX operation\n;\n; VMCS (Virtual Machine Control Structure):\n; Controls CPU state between host and guest\n; Fields: guest state, host state, execution controls\n;\n; EPT (Extended Page Tables):\n; Second-level address translation\n; Guest physical → host physical\n;\n; Minimal hypervisor flow:\n; 1. Check VMX support via CPUID\n; 2. Initialize VMCS\n; 3. VMLAUNCH to enter guest\n; 4. Handle VM exits in host\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Security Vulnerabilities", subtitle: "Buffer overflow, ROP, and defensive techniques", language: "asm", tags: ["security"], theoryTopics: ["Stack overflow", "ROP gadgets", "NX/DEP/ASLR"], codeTemplate: `; Buffer overflow exploitation:\n; Overwrite return address on stack to redirect execution\n;\n; ROP (Return-Oriented Programming):\n; Chain existing code snippets (gadgets) ending in RET\n; Bypasses NX (non-executable stack)\n;\n; Defenses:\n; - Stack canaries: check value before RET\n; - ASLR: randomize addresses\n; - NX: mark stack as non-executable\n; - Shadow stack: separate return address storage\n;\n; CFG (Control Flow Guard):\n; Validates indirect call targets\n; Prevents hijacking of function pointers\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "ASM Code Obfuscation", subtitle: "Polymorphic, metamorphic, and self-modifying code", language: "asm", tags: ["security"], theoryTopics: ["Polymorphic code", "Self-modifying", "Anti-analysis"], codeTemplate: `; Self-modifying code (SMC):\n;     ; Write new instructions to .text at runtime\n;     ; Requires writable .text section\n;     ; mov byte [label+1], 0x90  ; patch NOP\n; label:\n;     mov rax, 0\n;\n; Polymorphic engine concept:\n;     ; Decryptor stub\n;     ; 1. Decrypt main body using XOR key\n;     ; 2. Transfer control to decrypted code\n;     ; 3. Each generation uses different decryptor\n;\n; Anti-debugging tricks:\n;     ; ptrace check, timing checks, SEH abuse\n;     ; IsDebuggerPresent (Windows)\n;     ; INT 3 detection\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Real-time Systems in ASM", subtitle: "Interrupt latency, deadlines, and deterministic code", language: "asm", tags: ["embedded"], theoryTopics: ["Interrupt latency", "Determinism", "RTOS concepts"], codeTemplate: `; Real-time considerations in assembly:\n; - Predictable instruction timing (no cache misses)\n; - Lock memory/cache for critical sections\n; - Disable interrupts during atomic ops\n;\n; Critical section:\n;     cli           ; clear interrupt flag\n;     ; ... atomic work ...\n;     sti           ; set interrupt flag\n;\n; Interrupt Service Routine (ISR) timing:\n; - Save all registers used\n; - Minimal processing in ISR\n; - Use deferral mechanism for complex work\n; - Restore registers, iret/iretq\n;\n; Worst-case execution time (WCET):\n; - Analyze all code paths\n; - Account for pipeline hazards\n; - Measure with cycle counters (RDTSC)\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "UEFI Applications in ASM", subtitle: "Building UEFI apps from scratch", language: "asm", tags: ["boot"], theoryTopics: ["UEFI protocol", "GUID", "System table"], codeTemplate: `; UEFI application entry point:\n; efi_main(EFI_HANDLE ImageHandle,\n;          EFI_SYSTEM_TABLE *SystemTable);\n;\n; Calling UEFI protocols:\n; ; Output string via Simple Text Output:\n; ; mov rax, [SystemTable]\n; ; mov rax, [rax + EFI_SYSTEM_TABLE.ConOut]\n; ; mov rcx, [rax + SIMPLE_TEXT_OUTPUT.OutputString]\n; ; call rcx  ; OutputString(ConOut, L\"Hello\")\n;\n; UEFI calling convention: Microsoft x64\n; Args: RCX, RDX, R8, R9, stack\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Multi-core ASM Programming", subtitle: "APIC, SMP, and inter-processor interrupts", language: "asm", tags: ["systems"], theoryTopics: ["APIC", "SMP boot", "IPI"], codeTemplate: `; SMP (Symmetric Multiprocessing):\n; BSP (Bootstrap Processor) boots first\n; Sends IPI to wake APs (Application Processors)\n;\n; Local APIC (Advanced Programmable Interrupt Controller):\n; ; Read LAPIC ID:\n; ; mov rax, 1\n; ; cpuid\n; ; EBX bits 31:24 = initial APIC ID\n;\n; Inter-Processor Interrupt (IPI):\n; ; Write to ICR (Interrupt Command Register):\n; ; mov dword [APIC_BASE + 0x300], 0x40C4F\n; ; Vector 0x4F, fixed, edge, assert, all including self\n;\n; Atomic per-core data:\n; ; Use GS segment for per-CPU storage\n; ; mov rax, [gs:0]  ; current CPU ID\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "ASM on ARM64", subtitle: "AArch64 architecture comparison with x86-64", language: "asm", tags: ["architecture"], theoryTopics: ["ARM registers", "Conditional execution", "Load/store"], codeTemplate: `; ARM64 (AArch64) vs x86-64:\n; - 31 general-purpose registers X0-X30 (64-bit)\n; - X30 = link register (LR), replaces RET address\n; - X29 = frame pointer (FP)\n; - SP = stack pointer\n; - PC not directly accessible\n;\n; ARM64 instructions:\n;     mov x0, #42        ; load immediate\n;     add x0, x1, x2     ; x0 = x1 + x2\n;     ldr x0, [x1]       ; load from memory\n;     str x0, [x1]       ; store to memory\n;     bl my_func         ; branch and link (call)\n;     ret                ; return (br x30)\n;\n; Conditional execution:\n;     cmp x0, x1\n;     b.gt greater        ; branch if greater than\n;     b.lt lesser         ; branch if less than\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Performance Tuning & Profiling", subtitle: "perf, oprofile, and micro-architecture optimization", language: "asm", tags: ["optimization"], theoryTopics: ["perf tool", "Cache misses", "Pipeline analysis"], codeTemplate: `; Performance analysis tools:\n; # perf stat ./program\n; # perf record ./program; perf report\n; # perf top\n;\n; Key metrics:\n; - IPC (Instructions Per Cycle)\n; - Cache miss rate (L1, L2, LLC)\n; - Branch mispredictions\n; - TLB misses\n;\n; Optimization targets:\n; 1. Reduce instruction count\n; 2. Improve cache locality\n; 3. Eliminate branches\n; 4. Avoid false sharing\n; 5. Minimize TLB pressure\n;\n; Assembly micro-optimizations:\n; ; Use XOR over MOV for zeroing\n; ; Align loop entry points (16-byte)\n; ; Prefer register args over stack\n; ; Inline small functions\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Capstone Prep: ASM Project", subtitle: "Planning and scaffolding your final ASM project", language: "asm", tags: ["capstone"], theoryTopics: ["Project planning", "Architecture", "Toolchain setup"], codeTemplate: `; Capstone Project Plan\n; =====================\n;\n; Choose one:\n; 1. Bootable kernel (real or protected mode)\n; 2. Custom encryption/compression tool\n; 3. Retro game for boot sector\n; 4. ELF packer/protector\n; 5. Performance-critical library function\n;\n; Deliverables:\n; - Working code with Makefile\n; - README with architecture overview\n; - Comments explaining key sections\n; - Test cases demonstrating correctness\n;\n; Setup checklist:\n; [ ] NASM/YASM assembler\n; [ ] QEMU for boot tests\n; [ ] GDB + .gdbinit\n; [ ] Version control\n\nsection .text\nglobal _start\n_start:\n    nop` },
  { title: "Capstone: ASM Final Project", subtitle: "Complete, document, and present your assembly project", language: "asm", tags: ["capstone"], theoryTopics: ["Implementation", "Testing", "Documentation"], codeTemplate: `; ASM Capstone — Final Project\n; ============================\n;\n; Complete your chosen project.\n; Ensure:\n; - Clean compilation with no errors\n; - Handles edge cases gracefully\n; - Well-commented code\n; - Performance considerations addressed\n;\n; Submission checklist:\n; [ ] Code compiles and runs\n; [ ] README with build instructions\n; [ ] Architecture diagram or explanation\n; [ ] Test results with sample output\n; [ ] Self-assessment: what did you learn?\n;\n; "The metal speaks to those who listen."\n\nsection .text\nglobal _start\n_start:\n    ; Your silicon masterpiece begins here\n    nop` },
];

const TOPIC_CONTENT: Record<string, string> = {
  // Day 61-80 ASM topics
  "Machine code": "Machine code is the raw binary that the CPU executes directly. Each instruction is encoded as a sequence of bytes — opcode bytes specify the operation, while ModRM and SIB bytes encode operands and addressing modes. x86-64 uses a variable-length encoding: common instructions like `mov rax, rbx` take 3 bytes, while complex ones can stretch to 15 bytes. Disassemblers like objdump reverse this process, translating bytes back into human-readable mnemonics.",
  "Mnemonics": "Assembly mnemonics are human-readable abbreviations for machine code instructions. `mov`, `add`, `sub`, `jmp` each map to specific opcode bytes. NASM (Netwide Assembler) uses Intel syntax: `mov rax, rbx` means \"move rbx into rax.\" The assembler handles the tedious work of computing opcodes, ModRM bytes, and immediate encodings so you can reason at a higher level.",
  "ISA": "The Instruction Set Architecture (ISA) is the contract between software and hardware — the complete set of instructions a CPU can execute. x86-64 is a CISC (Complex Instruction Set Computer) ISA with over 1000 instructions, variable-length encoding, and decades of backward compatibility. Every program, regardless of language, ultimately reduces to ISA instructions executed sequentially by the CPU pipeline.",
  "Registers": "Registers are the fastest memory in the CPU — tiny storage locations etched directly into the silicon. x86-64 provides 16 general-purpose registers (RAX, RBX, RCX, RDX, RSI, RDI, RBP, RSP, R8–R15), each 64 bits wide. Unlike RAM, register access has zero latency: it takes a single clock cycle. Compilers fight over every register allocation because spilling to memory kills performance.",
  "ALU": "The Arithmetic Logic Unit (ALU) is the computational heart of the CPU — a circuit that performs arithmetic (add, subtract, multiply, divide) and logical (AND, OR, XOR, NOT, shift) operations on register values. Modern ALUs are pipelined and can often execute multiple operations per cycle. Flag registers (CF, ZF, SF, OF) are set by ALU results and used by conditional jump instructions.",
  "Pipeline": "CPU pipelining breaks instruction execution into stages: Fetch → Decode → Execute → Memory Access → Writeback. A 5-stage pipeline can have 5 instructions in flight simultaneously, each at a different stage. Hazards (data, control, structural) stall the pipeline; compilers and manual assembly scheduling reorder instructions to minimize these stalls.",
  "MOV": "The MOV instruction is the workhorse of assembly — it copies data between registers, memory, and immediates. Importantly, MOV does not modify flags. x86-64 supports MOV with various operand sizes: `mov rax, rbx` (64-bit), `mov eax, ebx` (32-bit, zero-extends), `mov ax, bx` (16-bit), `mov al, bl` (8-bit). Writing to a 32-bit register zero-extends to the full 64-bit register in x86-64.",
  "Immediate values": "Immediates are constant values embedded directly in the instruction encoding. `mov rax, 42` encodes the value 42 within the instruction bytes. x86-64 supports 8-bit (sign-extended), 16-bit, and 32-bit immediates; loading a full 64-bit immediate requires the `mov rax, imm64` mnemonic (10-byte instruction).",
  "Register sizes": "x86-64 registers support sub-register access: the lower 32 bits of RAX are EAX, lower 16 bits are AX, and AX is split into AH (high byte) and AL (low byte). Partial register writes can cause performance penalties due to false dependencies; prefer `movzx` (move with zero-extend) when combining different sizes.",
  "ADD/SUB": "ADD and SUB perform integer addition and subtraction on register or memory operands. Both set the flag register based on the result: ZF (zero), SF (sign), CF (carry/borrow), OF (overflow). ADD is the most common instruction in any program; modern x86 CPUs can execute multiple ADD instructions per cycle through pipelining.",
  "MUL/DIV": "MUL and DIV handle multiplication and division. MUL multiplies RAX by the operand, storing the 128-bit result in RDX:RAX. DIV divides RDX:RAX by the operand, storing quotient in RAX and remainder in RDX. Signed variants IMUL and IDIV handle sign extension. DIV is notoriously slow (~20–40 cycles); compilers replace division by constants with multiplication by reciprocals.",
  "Overflow flags": "The Overflow Flag (OF) is set when signed arithmetic produces a result outside the representable range. Carry Flag (CF) handles unsigned overflow. Together they let you detect and react to numeric boundaries — critical for security (integer overflow exploits) and correctness in systems code.",
  "AND/OR/XOR": "AND, OR, and XOR perform bitwise logic on register/memory operands. AND is used for masking bits, OR for setting bits, XOR for toggling. `xor eax, eax` is the canonical way to zero a register — it's smaller and faster than `mov eax, 0` (2 bytes vs 5). XOR of a value with itself always produces zero.",
  "SHL/SHR": "SHL (shift left) and SHR (shift right) move bits within a register. A left shift by N multiplies by 2^N; a right shift divides by 2^N for unsigned values. Arithmetic shifts (SAR for signed right shift) preserve the sign bit. x86-64 also supports `shld`/`shrd` for double-precision shifts across paired registers.",
  "Flags": "The RFLAGS register holds condition flags that record the outcome of arithmetic and logical operations: ZF (result zero), SF (result negative), CF (carry/borrow), OF (signed overflow), PF (parity), AF (BCD carry). These flags are read by conditional jump (Jcc), conditional move (CMOVcc), and SETcc instructions to implement branching logic.",
  "CMP": "CMP subtracts its second operand from the first and discards the result — it only updates the flags register. This is the fundamental comparison primitive in x86; all conditional jumps (JE, JNE, JG, JL, JGE, JLE) test flags set by a preceding CMP. For unsigned comparisons, use JA/JB; for signed, use JG/JL.",
  "Flags register": "The RFLAGS register is updated by most arithmetic instructions. Conditional jumps inspect specific bits: JZ/JE checks ZF=1, JNZ/JNE checks ZF=0, JG checks ZF=0 and SF=OF, JL checks SF≠OF. Understanding flag behavior is essential for writing correct control flow in assembly — one wrong assumption causes silent logic errors.",
  "JE/JNE/JG/JL": "Conditional jump instructions transfer control based on flag states. JE (jump if equal) fires when ZF=1 after CMP. JNE (not equal) when ZF=0. JG (signed greater) requires ZF=0 and SF=OF. JL (signed less) when SF≠OF. Each mnemonic has an unsigned counterpart: JA/JB for above/below.",
  "Loop label": "Loops in assembly are constructed with labels and conditional jumps, not dedicated loop syntax. A typical loop: label at the top, body instructions, decrement counter with `dec rcx`, then `jnz label`. This pattern is the assembly equivalent of C's `while (--counter) { }` and gives you complete control over loop structure.",
  "DEC/JNZ": "DEC decrements a register by 1 and sets the Zero Flag (ZF) when the result reaches zero. JNZ (jump if not zero) branches when ZF=0. The pair `dec rcx` / `jnz loop_start` creates a counting loop. Note: DEC does not set CF (carry flag), unlike SUB — an important subtlety for multi-precision arithmetic.",
  "LOOP instruction": "The LOOP instruction is a combined decrement-and-branch: it decrements RCX and jumps to the target label if RCX≠0. While convenient, LOOP is slower than separate DEC/JNZ on modern CPUs (it cannot be micro-fused as efficiently). Modern hand-tuned assembly prefers explicit DEC/JNZ for performance.",
  "Stack grows down": "The x86-64 stack grows toward lower addresses: PUSH decrements RSP then stores; POP loads then increments RSP. RSP always points to the most recently pushed item. The stack is used for local variables, function return addresses, and caller-saved register preservation. Stack overflow (growing into other memory regions) is a common bug in systems programming.",
  "PUSH/POP": "PUSH decrements RSP by 8 and stores the operand at the new RSP. POP loads the value at RSP into the operand and increments RSP by 8. In 64-bit mode, PUSH/POP operate on 64-bit values (8 bytes). These instructions implicitly update RSP and are the primary mechanism for saving/restoring state across function calls.",
  "RSP/RBP": "RSP (Stack Pointer) points to the current top of stack. RBP (Base Pointer) typically holds the previous RSP at function entry, creating a stable reference frame for locals and parameters. Modern compilers optimize with `-fomit-frame-pointer`, using RSP-relative addressing instead, freeing RBP as an extra general-purpose register.",
  "CALL/RET": "CALL pushes the return address (the instruction after CALL) onto the stack and jumps to the target function. RET pops the return address and jumps to it. This push/pop mechanism enables nested function calls — each CALL pushes a return address, forming a chain that RET unwinds in reverse order.",
  "Prologue/Epilogue": "The function prologue saves the old base pointer and establishes a new stack frame: `push rbp; mov rbp, rsp`. The epilogue reverses this: `pop rbp; ret`. This pattern creates a linked list of stack frames that debuggers walk for backtraces. Between prologue and epilogue, RBP-relative addressing accesses parameters and locals.",
  "System V ABI": "The System V AMD64 ABI is the calling convention standard on Linux, macOS, and other Unix-likes. Integer/pointer arguments go in RDI, RSI, RDX, RCX, R8, R9; float arguments in XMM0–XMM7. Return values go in RAX (and RDX for 128-bit). The stack must be 16-byte aligned before CALL. Callee-saved registers: RBX, RBP, R12–R15.",
  "Direct": "Direct addressing accesses memory at a fixed address: `mov rax, [0x601040]`. The address is encoded in the instruction itself. This is the simplest addressing mode but produces position-dependent code — the absolute address must be known at link time. Direct addressing is common for accessing global variables in non-PIC code.",
  "Indirect": "Indirect addressing uses a register to hold the memory address: `mov rax, [rbx]`. This enables pointer dereferencing, array traversal, and dynamic memory access. Combined with displacement: `mov rax, [rbx + 8]` accesses a struct field at offset 8 from the pointer in RBX.",
  "Base+index*scale": "The most powerful x86 addressing mode: `mov rax, [rbx + rcx*8 + disp]`. Base register + index register × scale factor (1, 2, 4, 8) + displacement. This single instruction encodes array indexing with element scaling — `mov eax, [arr + rdi*4]` loads arr[rdi] where each element is 4 bytes. The LEA instruction computes these addresses without accessing memory.",
  "syscall instruction": "The `syscall` instruction is the gateway from userspace to kernel on x86-64 Linux. RAX holds the syscall number, RDI/RSI/RDX/R10/R8/R9 carry arguments, and after `syscall` returns, RAX contains the return value (or negative errno on error). This is the lowest-level interface to the OS — every I/O, memory allocation, and process operation goes through it.",
  "Linux x64 ABI": "Linux x86-64 syscall convention: RAX = syscall number, RDI = arg1, RSI = arg2, RDX = arg3, R10 = arg4, R8 = arg5, R9 = arg6. The kernel preserves all registers except RCX (which gets RIP) and R11 (which gets RFLAGS). This differs from the function-call ABI — notably, RCX and R11 are clobbered by syscall itself.",
  "errno": "The kernel returns error codes as negative values in RAX. The C library wrapper functions check RAX for negative values (typically in the range -1 to -4095), negate them, store the result in errno, and return -1. In raw assembly, you can check the return value directly: `test rax, rax; js error_handler` tests for negative (error) results.",
  "String instructions": "x86 string instructions process memory with implicit source (RSI) and destination (RDI) pointers. LODSB/W/D/Q loads a byte/word/dword/qword from [RSI] into AL/AX/EAX/RAX. STOSB/W/D/Q stores from AL/AX/EAX/RAX to [RDI]. MOVSB/W/D/Q copies from [RSI] to [RDI]. Each instruction advances RSI/RDI by the operand size.",
  "Direction flag": "The Direction Flag (DF) in RFLAGS controls whether string instructions increment or decrement RSI/RDI. CLD clears DF (increment forward, default). STD sets DF (decrement backward). Setting DF is useful for reverse string operations, but forgetting to restore it causes subtle bugs in code that assumes forward direction.",
  "REP prefix": "The REP prefix repeats a string instruction RCX times. `rep movsb` copies RCX bytes from [RSI] to [RDI] — a one-instruction memcpy. REP has variants: REPE/REPZ (repeat while equal/zero) for CMPS/SCAS, REPNE/REPNZ (repeat while not equal) for SCAS. This microcoded loop often outperforms explicit DEC/JNZ for large blocks.",
  "Register args": "In the System V AMD64 ABI, the first six integer arguments are passed in registers: RDI, RSI, RDX, RCX, R8, R9. Floating-point arguments use XMM0–XMM7. Additional arguments go on the stack. Register-based argument passing is dramatically faster than the 32-bit ABI's stack-based approach — less memory traffic, simpler code.",
  "Stack alignment": "The x86-64 ABI requires the stack (RSP) to be 16-byte aligned immediately before a CALL instruction. This means at function entry, RSP is 8 mod 16 (because CALL pushed an 8-byte return address). Functions typically `push rbp` to realign to 16 bytes. SSE/AVX instructions may fault on unaligned stack access.",
  "Red zone": "The red zone is a 128-byte area below RSP that signal handlers and debuggers promise not to touch. Leaf functions (those that call no other functions) can use this space for locals without adjusting RSP — saving two instructions (push/pop of RSP adjustment). The `-mno-red-zone` flag disables this for kernel code where interrupts may overwrite it.",
  "if/else in ASM": "Conditionals in assembly compile to CMP + conditional jumps. C's `if (x > 0) { y = x; } else { y = -x; }` becomes: load x into register, CMP with 0, JLE to else branch, store x to y, JMP over else, else: negate x, store to y. The inverted condition (JLE instead of JG) is typical — assembly jumps over the if-body when the condition is false.",
  "Loops in ASM": "Loops in assembly use backward jumps: a label marks the loop top, the body executes, a DEC/JNZ pair or explicit CMP/JNE jumps back. For loops with unknown bounds, use CMP + Jcc at the top (while-loop pattern). For counted loops, use DEC/JNZ. `loop` is available but discouraged for performance.",
  "Function calls": "Calling a function in assembly means: (1) put arguments in registers (RDI, RSI, etc.), (2) ensure 16-byte stack alignment, (3) CALL which pushes return address, (4) called function's prologue saves RBP, (5) body executes, (6) epilogue undoes prologue, (7) RET pops return address. The contract is defined by the ABI.",
  "Base address": "An array in memory starts at its base address. In assembly, load the array's address into a register (e.g., `mov rsi, numbers`), then access elements by adding offset: `mov eax, [rsi + 0]` for element 0, `mov eax, [rsi + 4]` for element 1 (32-bit elements). The base address plus size × index gives element location.",
  "Stride": "Stride is the byte distance between consecutive array elements — typically sizeof(element). For int (4 bytes), stride is 4. For structs, stride includes padding to satisfy alignment requirements. Proper stride calculation is essential for correct memory access; wrong stride causes reads of misaligned or wrong data.",
  "Bounds": "Array bounds checking prevents access beyond allocated memory. In assembly, bounds checking is manual — the CPU does not check array limits. Accessing array[-1] or array[n] silently reads/writes adjacent memory, causing data corruption, security vulnerabilities (buffer overflow), or segmentation faults. The programmer must validate indices.",
  "Member offsets": "Struct members are accessed by their offset from the struct's base address. If a struct has fields at offsets 0, 4, 8, you access them as `[base + 0]`, `[base + 4]`, `[base + 8]`. The compiler computes these offsets during compilation. `offsetof(type, member)` in C reveals the assembler-level view.",
  "Padding": "The compiler adds padding between struct members to satisfy alignment requirements. A `char` followed by an `int` typically gets 3 bytes of padding, making the int accessible at a 4-byte aligned address. This trade-off between space and access speed is critical in systems where struct layouts must match hardware registers or protocol headers.",
  "Pointer to struct": "A pointer to a struct holds the struct's base address in memory. In assembly, you load this pointer into a register (`mov rbx, [ptr_var]`) and access members via displacement: `mov rax, [rbx + offset]`. Dereferencing a null or invalid pointer causes a segmentation fault — there's no safety net below C.",
  "Bit test": "The BT (Bit Test) instruction copies a specific bit from the destination operand into the Carry Flag. `bt rax, 3` checks bit 3 of RAX. BTS, BTR, BTC also modify the bit (set, reset, complement respectively). These instructions enable efficient bit-array operations, flag management, and permission checking.",
  "Set/clear/toggle": "Bit manipulation uses three patterns: set a bit with OR (`or rax, (1 << n)`), clear a bit with AND-NOT (`and rax, ~(1 << n)`), toggle a bit with XOR (`xor rax, (1 << n)`). x86 provides BTS/BTR/BTC as single-instruction alternatives. Test a bit with BT or TEST + conditional jump.",
  "Masks": "Bit masks are constants used to isolate, set, or clear specific bits. A mask like 0xF0 selects the upper nibble of a byte. Masks are combined with logical operations: `and rax, mask` isolates bits, `or rax, mask` sets bits, `xor rax, mask` flips bits. Well-designed masks eliminate branches and improve performance.",
  "XMM registers": "XMM registers (XMM0–XMM15) are 128-bit registers in the SSE extension. They hold 4 single-precision floats, 2 double-precision floats, or 16 bytes for SIMD integer operations. x86-64 guarantees SSE support; all floating-point arithmetic in modern x86-64 uses XMM registers (not the legacy x87 stack).",
  "movss/addss": "MOVSS moves a scalar single-precision float (32-bit) between XMM registers or memory. ADDSS adds two scalar floats in XMM registers. The 'ss' suffix means scalar single — it operates on the lowest 32 bits of the XMM register, leaving the upper bits unchanged. These are the assembly primitives for float arithmetic.",
  "cvt": "CVT instructions convert between integer and floating-point formats. CVTSI2SS converts a signed integer to scalar single-precision float. CVTSS2SI converts float to integer (truncation). CVTSD2SI converts double to integer. These conversions are explicit in assembly — unlike C where the compiler inserts them automatically.",
  "Parallel ops": "SIMD (Single Instruction, Multiple Data) performs the same operation on multiple data elements simultaneously. ADDPS adds 4 packed single-precision floats in parallel. A single SIMD instruction can do 4×, 8×, or even 16× the work of a scalar loop. Vectorizing compilers (GCC with -O3 -march=native) automatically generate SIMD code from loops.",
  "128/256-bit": "SSE operates on 128-bit XMM registers. AVX2 extends this to 256-bit YMM registers (YMM0–YMM15, which overlay XMM registers). AVX-512 pushes to 512-bit ZMM registers. Wider registers mean more parallelism — a 256-bit add can process 8 ints or 4 doubles in one instruction. The trade-off: wider SIMD increases power and heat.",
  "Use cases": "SIMD excels at data-parallel workloads: audio/video processing (FFT, filtering), graphics (matrix transforms, pixel operations), cryptography (AES-NI), scientific computing (matrix multiplication), and machine learning (GEMM kernels). Any hot loop operating on contiguous data without branches is a candidate for SIMD optimization.",
  "IDT": "The Interrupt Descriptor Table (IDT) maps interrupt vectors (0–255) to handler addresses. Each entry is 16 bytes: offset (handler address), segment selector, and gate type (interrupt/trap). On x86-64, the IDT is pointed to by the IDTR register (lidt instruction). Each CPU core has its own IDT.",
  "ISR": "An Interrupt Service Routine (ISR) is a special function that handles hardware interrupts or CPU exceptions. ISRs must save all registers, handle the event, acknowledge the interrupt (via the PIC or APIC), and return with IRETQ (which restores RFLAGS and RSP in addition to RIP). Kernel ISRs run in a restricted context — no sleeping, no page faults.",
  "Exception vectors": "CPU exceptions are numbered: Vector 0 (Divide Error), 6 (Invalid Opcode), 13 (General Protection Fault), 14 (Page Fault). Each has a handler in the IDT. Page faults are particularly informative — CR2 holds the faulting address, and the error code on the stack tells you access type (read/write/execute) and protection level.",
  "Constraints": "GCC inline assembly constraints describe operand locations. 'r' = any register, 'm' = memory, 'i' = immediate, 'g' = general (register/memory/immediate). Output operands use '=' (write-only) or '+' (read-write). Input operands need no prefix. Correct constraints are essential; wrong ones produce incorrect code without warning.",
  "Clobbers": "The clobber list tells GCC which registers and memory the inline assembly modifies. Common clobbers: 'cc' (condition codes/flags), 'memory' (memory beyond listed operands). Listing a clobber forces GCC to save and restore the register around the asm block. Omitting a clobber causes subtle corruption — GCC reuses the clobbered register.",
  "Volatility": "The `volatile` keyword on inline assembly tells GCC: \"don't move, duplicate, or eliminate this block.\" Without volatile, GCC may optimize away asm with no visible outputs. Use volatile when the asm has side effects (writing to hardware, triggering interrupts, altering memory not listed as outputs).",
  "Pipeline stalls": "A pipeline stall occurs when the CPU cannot execute the next instruction immediately. Load-use stalls happen when an instruction uses a value right after a load from memory. Branch mispredictions flush the entire pipeline (15+ cycle penalty). Instruction scheduling — reordering independent instructions — reduces stalls.",
  "Branch prediction": "Modern CPUs predict whether a conditional jump will be taken using history tables and pattern matching. A misprediction costs 10–20 cycles as the pipeline flushes and refills. Well-predicted branches (always taken, always not-taken, or following a regular pattern) execute as fast as no branch at all. Profile-guided optimization helps compilers generate predictable code.",
  "Loop unrolling": "Loop unrolling duplicates the loop body multiple times, reducing the number of iterations and the overhead of loop control (DEC/JNZ or CMP/JNE). The trade-off: larger code size (instruction cache pressure) vs. fewer branches (better prediction) and more instruction-level parallelism. Modern compilers unroll automatically at -O3.",
  "objdump": "objdump -d disassembles an object file, showing memory addresses, machine code bytes, and assembly mnemonics. It's the first tool for reverse engineering: `objdump -d binary | less`. Add `-M intel` for Intel syntax, `-S` to interleave source lines, `-C` to demangle C++ names.",
  "Ghidra": "Ghidra is a reverse engineering framework with a decompiler — it turns assembly back into structured C-like code. Developed by the NSA, it supports x86-64, ARM, and dozens of other architectures. Ghidra's decompiler produces readable output by recognizing calling conventions, switch constructs, and common compiler idioms.",
  "Pattern recognition": "Reverse engineers identify code patterns: function prologues (`push rbp; mov rbp, rsp`), system calls (`mov rax, NR; syscall`), switch tables (jump targets from a base address), and loop idioms (backward jumps). Recognizing these patterns lets you mentally decompile assembly faster than any automated tool.",
  "PIC": "Position-Independent Code uses relative addressing instead of absolute addresses, allowing the code to run at any memory address. In x86-64, RIP-relative addressing (`mov rax, [rip + offset]`) makes PIC natural and efficient. PIC is essential for shared libraries (loaded at arbitrary addresses) and shellcode (must run no matter where it lands in memory).",
  "No null bytes": "Shellcode must avoid null bytes (0x00) because string-based exploits (e.g., gets() buffer overflow) stop copying at the first null. Techniques: use `xor eax, eax` instead of `mov eax, 0` (no nulls), `push byte 0x90; pop rax` for small constants, and `shl`/`add` to construct larger values without embedding nulls in the instruction stream.",
  "Payload structure": "Shellcode typically has three parts: (1) the decoder stub (for encoded payloads), (2) the main body (e.g., execve /bin/sh), and (3) the trigger (e.g., overwritten return address pointing to the stub). Modern systems use NX, ASLR, and stack canaries to prevent shellcode execution — exploit development is an arms race.",
  "BIOS/UEFI": "BIOS (Legacy) initializes hardware, runs POST, and loads the first 512 bytes (MBR) from the boot device to 0x7C00. UEFI is the modern replacement: it operates in 64-bit mode, uses the EFI System Partition (FAT32), and loads PE-format executables. UEFI supports Secure Boot, network boot, and a graphical configuration interface.",
  "Real mode": "Real mode is the 16-bit x86 startup mode: segmented memory (64KB limit per segment), no memory protection, direct hardware access via IN/OUT instructions, and a 1MB addressable memory space. The CPU starts in real mode; the bootloader must switch to protected mode and then to 64-bit long mode.",
  "Stage loaders": "The MBR (stage 1) is limited to 512 bytes — too small for a full kernel. Stage loaders solve this: stage 1 loads stage 2 (typically from disk sectors), stage 2 sets up protected mode and loads the kernel. GRUB uses this pattern with stage 1 (boot.img, 512B), stage 1.5 (core.img), and stage 2.",
  "GDT": "The Global Descriptor Table (GDT) defines memory segments with base addresses, limits, and access permissions (code/data, privilege level, read/write, conforming). In 64-bit mode, segmentation is largely vestigial — the GDT is still required for transitioning to/from protected mode but base/limit are ignored.",
  "Segments": "Segmentation divides memory into segments with different access permissions. In protected mode, CS (code segment), DS (data segment), SS (stack segment), ES/FS/GS (extra segments) each reference a GDT entry. x86-64 uses FS and GS for thread-local storage; CS.D and L flags select between 32-bit compatibility mode and 64-bit long mode.",
  "Protected mode": "Protected mode is the 32-bit x86 operating mode with hardware memory protection (segment-level, then page-level), privilege rings (0 = kernel, 3 = user), and multitasking support. Switching from real to protected mode requires: (1) set up GDT, (2) set PE bit in CR0, (3) far jump to flush prefetch queue.",
  "Page tables": "x86-64 uses 4-level page tables for virtual-to-physical address translation. The CPU walks: CR3 → PML4 (512 entries) → PDPT (512) → PD (512) → PT (512) → 4KB page. Each level maps 9 bits of the virtual address. Huge pages (2MB, 1GB) reduce TLB pressure by skipping intermediate levels.",
  "TLB": "The Translation Lookaside Buffer (TLB) caches recent virtual-to-physical page mappings. A TLB miss forces a page table walk (up to 4 memory accesses) — expensive. TLB pressure is a common performance bottleneck; huge pages reduce entries needed, and explicit prefetching can warm the TLB before hot loops execute.",
  "CR3 register": "CR3 holds the physical address of the top-level page table (PML4). Each process has its own CR3 value — switching CR3 (on context switch) isolates address spaces. Reading CR3 yields the current page table base; writing it flushes the TLB (except for global pages marked with PGE in EFER).",
  "clone syscall": "The Linux clone() syscall creates threads (as opposed to fork() which creates processes). Flags control resource sharing: CLONE_VM shares memory space, CLONE_FS shares filesystem info, CLONE_FILES shares file descriptors, CLONE_SIGHAND shares signal handlers. The child gets its own stack (passed in RSP) and starts at the specified RIP.",
  "Thread stacks": "Each thread requires its own private stack, typically 1–8 MB. The stack pointer (RSP) is set before the thread starts executing. Stack overflow — one thread's stack colliding with another's or with the heap — is a common multithreading bug. Guard pages (protected memory regions at stack boundaries) detect overflow.",
  "TLS": "Thread-Local Storage (TLS) gives each thread its own copy of global/static variables. On x86-64 Linux, TLS is accessed via the FS segment base: `mov rax, [fs:0]` loads a thread-local value. The kernel sets FS.base (via WRMSR to MSR_FS_BASE) during thread creation. TLS is essential for thread-safe singletons and per-thread caches.",
  "Port I/O": "Port-mapped I/O uses dedicated x86 instructions IN/OUT to communicate with hardware devices. Ports are addressed with a 16-bit port number (0–65535). `in al, 0x60` reads the keyboard scancode; `out 0x80, al` writes to the diagnostic port. Port I/O requires privilege level 0 — userspace cannot use it directly.",
  "MMIO": "Memory-Mapped I/O maps device registers into the physical address space. Reading or writing a specific address communicates with the hardware. Example: the VGA text buffer at 0xB8000 — writing bytes there directly draws characters on screen. MMIO accesses must use `volatile` to prevent compiler optimization from removing repeated reads.",
  "Interrupt handlers": "Hardware interrupt handlers respond to device signals (keyboard press, disk completion, network packet arrival). The handler saves registers, services the device, sends EOI (End of Interrupt) to the PIC/APIC, and returns with IRETQ. Minimal handlers use bottom halves/deferred work to avoid spending too long in interrupt context.",
  "XOR loops": "XOR-based encryption loops combine a key with plaintext: `for (i = 0; i < len; i++) cipher[i] = plain[i] ^ key`. In assembly, this is LODSB + XOR with key byte + STOSB, repeated in a loop. XOR is its own inverse: `text XOR key XOR key = text`, making encryption and decryption identical operations.",
  "AES-NI": "AES-NI (AES New Instructions) is a set of x86 instructions that accelerate AES encryption in hardware. `aesenc xmm0, xmm1` performs one AES round, `aeskeygenassist` generates round keys. AES-NI is ~10x faster than pure-software AES and is resistant to timing side-channel attacks — critical for secure implementations.",
  "Timing attacks": "Timing attacks measure how long an operation takes to infer secret data. Variable-time comparisons, cache-timing differences, and data-dependent execution times leak information. Constant-time programming (no branches on secret data, no memory accesses indexed by secrets, using CMOV over conditional jumps) defeats timing attacks.",
  "RDTSC": "RDTSC (Read Time-Stamp Counter) returns the CPU's 64-bit cycle counter in EDX:EAX. It counts since processor reset. On modern out-of-order CPUs, RDTSC may execute before preceding instructions complete. The serializing variant RDTSCP (with `lfence`) ensures accurate measurement. Use for microbenchmarking and performance monitoring.",
  "Performance counters": "Hardware performance counters track microarchitectural events: cache misses, branch mispredictions, TLB misses, stalled cycles. Accessed via RDPMC (Read Performance Monitor Counter) or the `perf` tool on Linux. They reveal why code is slow beyond what profilers show — measuring actual cache misses pinpoints memory bottlenecks.",
  "CPUID": "CPUID queries CPU capabilities. With RAX=0, it returns vendor string and max leaf. RAX=1 returns family/model/stepping and feature flags (SSE, AVX, AES-NI, etc.). RAX=7 (subleaf 0) returns AVX2/AVX-512 support. Check CPUID before using ISA extensions to ensure compatibility — executing AVX-512 on an old CPU raises #UD (illegal instruction).",
  "Structured Exception Handling": "Windows SEH (Structured Exception Handling) uses per-function unwind tables stored in .xdata sections. When an exception occurs, the OS walks the call stack, finds the appropriate exception handler, and either proceeds or stops. SEH interacts with assembly via try/except blocks and custom filter expressions.",
  "Fault handlers": "Fault handlers intercept CPU exceptions like page faults (#PF) and general protection faults (#GP). In Linux, signal handlers for SIGSEGV can inspect the faulting address (via siginfo) and modify the saved context (ucontext) to alter RIP — enabling techniques like transparent page allocation and emulation.",
  "Recovery": "Fault recovery allows a program to continue after an otherwise fatal exception. Example: a signal handler for SIGSEGV allocates the faulting page, modifies the context to retry the faulting instruction, and returns — the instruction re-executes successfully. This pattern powers automatic stack growth and copy-on-write semantics.",
  "GOT": "The Global Offset Table (GOT) holds absolute addresses of global symbols for position-independent code. Each external data symbol entry in the GOT is filled by the dynamic linker at load time. Code accesses globals via GOT: `mov rax, [rip + GOT_entry]`. This indirection enables shared libraries to be loaded at any address.",
  "PLT": "The Procedure Linkage Table (PLT) enables lazy binding of function calls. The first call to a PLT entry jumps to the dynamic linker, which resolves the function address and updates the GOT. Subsequent calls go directly to the resolved function. PLT adds minimal overhead but defeats some branch prediction patterns.",
  "ELF sections": "ELF object files are divided into sections: .text (executable code), .data (initialized data), .bss (uninitialized data, zero-filled at load), .rodata (read-only data, strings), .symtab (symbol table), .rela.text (relocation entries). The linker merges sections from all input files into output segments.",
  "Linker scripts": "Linker scripts give you precise control over the output ELF layout. They specify section placement, memory regions, entry point, and alignment. Bootloaders and kernel developers use custom linker scripts to place code at specific addresses, create multiboot headers, and control symbol visibility.",
  "Symbol resolution": "The linker resolves symbols by searching all input object files and libraries. Strong symbols (non-inline functions, global variables) override weak symbols. Multiple strong definitions cause a linker error. Common symbols (tentative definitions) merge. The linker's behavior is governed by the `-fcommon`/`-fno-common` compiler flags.",
  "Layout asm": "GDB's `layout asm` splits the terminal into a disassembly window and command window. It auto-updates as you step through instructions, showing RIP, current instruction highlighted, and surrounding code. `layout regs` adds a register pane. These layouts make assembly debugging visual and significantly faster than raw disassembly.",
  "Watchpoints": "Watchpoints break execution when a memory address is read or written. `watch *0x601040` catches writes to that address; `rwatch` catches reads; `awatch` catches both. Hardware watchpoints (limited to 4 on x86) are fast — they use debug registers — while software watchpoints (single-step + check) are slower.",
  "Reverse debugging": "GDB's reverse debugging lets you step backward through execution. Use `record` to start recording, then `reverse-stepi` (step back one instruction), `reverse-next` (step back over call), `reverse-continue` (continue until reverse breakpoint). Essential for finding \"how did we get here?\" bugs.",
  "Calling C from ASM": "To call a C function from assembly: follow the System V ABI (args in RDI, RSI, RDX, RCX, R8, R9), ensure 16-byte stack alignment, then CALL. The C function expects the stack to be aligned per ABI. Return values come back in RAX (and RDX for 128-bit).",
  "ASM from C": "Calling assembly functions from C is straightforward — declare the function as extern in C, implement it in a .S file following the ABI, and link them together. The C compiler generates a CALL instruction and expects the assembly function to preserve callee-saved registers (RBX, RBP, R12–R15).",
  "Name mangling": "C does not mangle names — an ASM function called `my_func` is visible in C as `my_func`. C++ mangles names (e.g., `_Z7my_funci` for `my_func(int)`), which must be accounted for in assembly. Use `extern \"C\"` in C++ to suppress mangling for interop.",
  "LOCK prefix": "The LOCK prefix makes an instruction atomic on SMP systems: it asserts the LOCK# signal on the bus (or uses cache locking on modern CPUs). `lock inc qword [counter]` atomically increments a counter. LOCK is only valid with read-modify-write instructions (ADD, SUB, INC, DEC, XADD, CMPXCHG, AND, OR, XOR, etc.).",
  "CMPXCHG": "CMPXCHG (compare-and-exchange) is the fundamental atomic CAS primitive: compare RAX with destination, if equal store RBX to destination (set ZF), else load destination into RAX (clear ZF). `lock cmpxchg` makes it atomic across cores. CMPXCHG8B and CMPXCHG16B operate on 8/16-byte values using RDX:RAX.",
  "Atomic ops": "Atomic operations complete without interference from other threads or cores. x86 provides: atomic increment (LOCK INC/DEC), atomic exchange (LOCK XADD/XCHG), atomic CAS (LOCK CMPXCHG). Hardware atomicity is the foundation of mutexes, semaphores, lock-free data structures, and reference counting.",
  "Memory ordering": "x86 uses Total Store Order (TSO): stores are buffered and become visible to other cores in program order, but loads may bypass earlier stores (store forwarding). This means a store on another core may not be immediately visible. Fence instructions enforce ordering constraints for correct concurrent algorithms.",
  "Fence instructions": "MFENCE orders all memory operations (loads and stores) — all preceding accesses complete before subsequent ones begin. SFENCE orders only stores (completing prior stores before any following store). LFENCE orders only loads. Use SFENCE in producer-consumer patterns (write data, then write flag) and MFENCE for full barriers.",
  "Store buffer": "Each CPU core has a store buffer that holds committed stores before they drain to the cache hierarchy. The store buffer enables fast store-to-load forwarding (reading a value right after writing it). On TSO x86, stores from different cores are globally ordered but a core can see its own earlier stores before other cores do.",
  "AVX-512": "AVX-512 extends SIMD to 512-bit ZMM registers (32 in number), with 8 mask registers (k0–k7), embedded rounding, and new operations (scatter/gather, conflict detection, compress/expand). Mask registers control per-element operation — operations can selectively affect only elements where the corresponding mask bit is 1.",
  "Mask registers": "AVX-512 mask registers (k0–k7) are 16-bit (128-bit SIMD) or 64-bit (512-bit SIMD) bitmasks that control per-element operation. Operations with `{k1}` only affect elements where the mask bit is 1. `kortestq k1, k2` tests mask bits for branch decisions. Masks eliminate branches for data-dependent processing.",
  "Packed ops": "Packed SIMD operations process multiple data elements in one instruction. `vpaddd zmm0, zmm1, zmm2` adds 16 32-bit ints in parallel. `vfmadd132ps` performs 16 fused multiply-adds (a*b+c). Packed ops convert sequential loops into single instructions — the heart of vectorization. Each generation adds wider registers and more operations.",

  // Day 51-60 C bridge topics (asm-bridge area)
  "gcc -S": "Running `gcc -S` (or `clang -S`) outputs assembly instead of an object file. This is the best way to learn how C constructs compile to machine code. Use `-O0` for readable (but verbose) output, `-O2` for optimized (but complex) output, and `-fno-asynchronous-unwind-tables` to remove CFI directives.",
  "Reading ASM output": "Reading compiler-generated assembly reveals how high-level patterns translate. Look for: function labels, stack frame setup/teardown, argument register usage, the core algorithm loop, and optimization decisions (inlining, hoisting, unrolling). Compare `-O0` vs `-O2` output to see what optimizers actually do.",
  "Calling conventions": "Calling conventions define the interface between caller and callee: argument passing (registers vs stack), register preservation rules, stack alignment, and return value location. System V (Linux/macOS) and Microsoft x64 (Windows) differ in register ordering and which registers are callee-saved — important when mixing ASM with C.",
  "__asm__ keyword": "GCC's `__asm__` keyword embeds assembly directly in C code. Basic format: `__asm__(\"instructions\" : outputs : inputs : clobbers)`. The extended syntax with constraints lets the compiler manage operand placement. `__asm__ volatile` prevents the compiler from optimizing away the block — essential for side-effecting operations.",
};

function generateTopicContent(topic: string, title: string, day: number, lang: "c" | "asm"): string {
  const cached = TOPIC_CONTENT[topic];
  if (cached) return cached;

  const level = getLevelForDay(day);
  const field = lang === "c" ? "C systems programming" : "x86-64 Assembly";

  return `Day ${day} introduces "${topic}" within the broader context of ${title}. ` +
    `This concept is central to ${field} at the ${level} proficiency tier. ` +
    `Understanding it requires both theoretical knowledge and hands-on practice with the instruction set. ` +
    `Focus on how ${topic} interacts with surrounding system concepts — memory layout, register utilization, and performance characteristics. ` +
    `Experiment with the code template to see it in action, then extend it to deepen your understanding.`;
}

function generateTopicExercises(day: number, blueprint: DayBlueprint, lang: "c" | "asm"): Lesson["exercises"] {
  const prefix = `d${day}`;
  const topics = blueprint.theoryTopics;

  const quizMap: Record<string, { q: string; opts: { id: string; text: string; correct: boolean }[] }> = {
    "Machine code": {
      q: "What determines the variable-length encoding in x86-64 instructions?",
      opts: [
        { id: "a", text: "The compiler version", correct: false },
        { id: "b", text: "The opcode, ModRM, and SIB bytes", correct: true },
        { id: "c", text: "The operating system", correct: false },
        { id: "d", text: "The number of registers used", correct: false },
      ],
    },
    "Registers": {
      q: "How many general-purpose 64-bit registers does x86-64 provide?",
      opts: [
        { id: "a", text: "8", correct: false },
        { id: "b", text: "16", correct: true },
        { id: "c", text: "32", correct: false },
        { id: "d", text: "4", correct: false },
      ],
    },
    "MOV": {
      q: "Which register size write in x86-64 zero-extends to the full 64-bit register?",
      opts: [
        { id: "a", text: "8-bit (AL)", correct: false },
        { id: "b", text: "16-bit (AX)", correct: false },
        { id: "c", text: "32-bit (EAX)", correct: true },
        { id: "d", text: "All of the above", correct: false },
      ],
    },
    "ADD/SUB": {
      q: "Which flag is set when signed addition overflows?",
      opts: [
        { id: "a", text: "ZF (Zero Flag)", correct: false },
        { id: "b", text: "CF (Carry Flag)", correct: false },
        { id: "c", text: "OF (Overflow Flag)", correct: true },
        { id: "d", text: "SF (Sign Flag)", correct: false },
      ],
    },
    "AND/OR/XOR": {
      q: "Why is 'xor eax, eax' preferred over 'mov eax, 0' for zeroing a register?",
      opts: [
        { id: "a", text: "It's more readable", correct: false },
        { id: "b", text: "It's smaller and faster (no null bytes, encoding is 2 bytes)", correct: true },
        { id: "c", text: "It preserves the old value", correct: false },
        { id: "d", text: "It sets the overflow flag", correct: false },
      ],
    },
    "CMP": {
      q: "What does the CMP instruction do with its operands?",
      opts: [
        { id: "a", text: "Compares and stores the result in RAX", correct: false },
        { id: "b", text: "Subtracts the second from the first, sets flags, discards the result", correct: true },
        { id: "c", text: "Adds both operands and sets flags", correct: false },
        { id: "d", text: "Moves the larger operand to RAX", correct: false },
      ],
    },
    "PUSH/POP": {
      q: "What happens to RSP when PUSH executes in 64-bit mode?",
      opts: [
        { id: "a", text: "RSP is incremented by 16", correct: false },
        { id: "b", text: "RSP is decremented by 8", correct: true },
        { id: "c", text: "RSP is unchanged", correct: false },
        { id: "d", text: "RSP is set to the pushed value", correct: false },
      ],
    },
    "CALL/RET": {
      q: "What does CALL push onto the stack before jumping?",
      opts: [
        { id: "a", text: "The current value of RAX", correct: false },
        { id: "b", text: "The return address (instruction after CALL)", correct: true },
        { id: "c", text: "The base pointer", correct: false },
        { id: "d", text: "Nothing — it only jumps", correct: false },
      ],
    },
    "System V ABI": {
      q: "How many integer arguments are passed in registers (System V AMD64 ABI)?",
      opts: [
        { id: "a", text: "4 (RCX, RDX, R8, R9)", correct: false },
        { id: "b", text: "6 (RDI, RSI, RDX, RCX, R8, R9)", correct: true },
        { id: "c", text: "8 (RDI-R15)", correct: false },
        { id: "d", text: "3 (RAX, RBX, RCX)", correct: false },
      ],
    },
    "syscall instruction": {
      q: "Which register holds the syscall number in Linux x86-64?",
      opts: [
        { id: "a", text: "RAX", correct: true },
        { id: "b", text: "RDI", correct: false },
        { id: "c", text: "RCX", correct: false },
        { id: "d", text: "RIP", correct: false },
      ],
    },
    "String instructions": {
      q: "Which register pair is used implicitly by string instructions (MOVS, LODS, STOS)?",
      opts: [
        { id: "a", text: "RAX and RBX", correct: false },
        { id: "b", text: "RDI as source, RSI as destination", correct: false },
        { id: "c", text: "RSI as source, RDI as destination", correct: true },
        { id: "d", text: "RSP and RBP", correct: false },
      ],
    },
    "REP prefix": {
      q: "Which register serves as the counter for the REP prefix?",
      opts: [
        { id: "a", text: "RAX", correct: false },
        { id: "b", text: "RCX", correct: true },
        { id: "c", text: "RDX", correct: false },
        { id: "d", text: "R8", correct: false },
      ],
    },
    "Stack grows down": {
      q: "When you pop from the stack, RSP:",
      opts: [
        { id: "a", text: "Increments (moves to higher address)", correct: true },
        { id: "b", text: "Decrements (moves to lower address)", correct: false },
        { id: "c", text: "Stays the same", correct: false },
        { id: "d", text: "Depends on the direction flag", correct: false },
      ],
    },
    "Base+index*scale": {
      q: "What does the LEA instruction compute?",
      opts: [
        { id: "a", text: "The length of a string", correct: false },
        { id: "b", text: "An effective address without accessing memory", correct: true },
        { id: "c", text: "The value at a memory address", correct: false },
        { id: "d", text: "A logical exclusive-or", correct: false },
      ],
    },
    "XMM registers": {
      q: "How wide are x86-64 XMM registers?",
      opts: [
        { id: "a", text: "64 bits", correct: false },
        { id: "b", text: "128 bits", correct: true },
        { id: "c", text: "256 bits", correct: false },
        { id: "d", text: "512 bits", correct: false },
      ],
    },
    "IDT": {
      q: "What register points to the Interrupt Descriptor Table on x86-64?",
      opts: [
        { id: "a", text: "CR3", correct: false },
        { id: "b", text: "IDTR", correct: true },
        { id: "c", text: "GDTR", correct: false },
        { id: "d", text: "RFLAGS", correct: false },
      ],
    },
    "Constraints": {
      q: "In GCC inline assembly, what does constraint 'r' mean?",
      opts: [
        { id: "a", text: "A memory operand", correct: false },
        { id: "b", text: "A register operand", correct: true },
        { id: "c", text: "An immediate value", correct: false },
        { id: "d", text: "A read-only operand", correct: false },
      ],
    },
    "Branch prediction": {
      q: "What is the approximate cost of a branch misprediction on modern x86?",
      opts: [
        { id: "a", text: "0-2 cycles", correct: false },
        { id: "b", text: "10-20 cycles", correct: true },
        { id: "c", text: "100-200 cycles", correct: false },
        { id: "d", text: "1000+ cycles", correct: false },
      ],
    },
    "PIC": {
      q: "Why is Position-Independent Code essential for shared libraries?",
      opts: [
        { id: "a", text: "It runs faster than non-PIC code", correct: false },
        { id: "b", text: "Libraries are loaded at arbitrary addresses at runtime", correct: true },
        { id: "c", text: "It uses less memory", correct: false },
        { id: "d", text: "It supports more registers", correct: false },
      ],
    },
    "ELF sections": {
      q: "Which ELF section typically holds executable code?",
      opts: [
        { id: "a", text: ".data", correct: false },
        { id: "b", text: ".text", correct: true },
        { id: "c", text: ".bss", correct: false },
        { id: "d", text: ".rodata", correct: false },
      ],
    },
    "LOCK prefix": {
      q: "Which x86 instruction prefix makes read-modify-write operations atomic across cores?",
      opts: [
        { id: "a", text: "REP", correct: false },
        { id: "b", text: "LOCK", correct: true },
        { id: "c", text: "SEGMENT", correct: false },
        { id: "d", text: "ADDR", correct: false },
      ],
    },
    "AVX-512": {
      q: "How wide are AVX-512 ZMM registers?",
      opts: [
        { id: "a", text: "128 bits", correct: false },
        { id: "b", text: "256 bits", correct: false },
        { id: "c", text: "512 bits", correct: true },
        { id: "d", text: "1024 bits", correct: false },
      ],
    },
    "clone syscall": {
      q: "Which Linux syscall creates threads (not processes)?",
      opts: [
        { id: "a", text: "fork()", correct: false },
        { id: "b", text: "clone()", correct: true },
        { id: "c", text: "thread()", correct: false },
        { id: "d", text: "execve()", correct: false },
      ],
    },
    "Port I/O": {
      q: "Which x86 instructions perform port-mapped I/O?",
      opts: [
        { id: "a", text: "LOAD and STORE", correct: false },
        { id: "b", text: "IN and OUT", correct: true },
        { id: "c", text: "MOV to port addresses", correct: false },
        { id: "d", text: "PEEK and POKE", correct: false },
      ],
    },
    "No null bytes": {
      q: "Why must shellcode avoid null bytes (0x00)?",
      opts: [
        { id: "a", text: "Null bytes crash the CPU", correct: false },
        { id: "b", text: "String-based exploits stop copying at null bytes", correct: true },
        { id: "c", text: "The assembler rejects null bytes", correct: false },
        { id: "d", text: "Null bytes trigger anti-virus", correct: false },
      ],
    },
    "GDT": {
      q: "What does the Global Descriptor Table (GDT) define?",
      opts: [
        { id: "a", text: "A list of active processes", correct: false },
        { id: "b", text: "Memory segments with base, limit, and access permissions", correct: true },
        { id: "c", text: "The page table hierarchy", correct: false },
        { id: "d", text: "Interrupt handler addresses", correct: false },
      ],
    },
    "Page tables": {
      q: "How many levels does x86-64 paging use for standard 4KB pages?",
      opts: [
        { id: "a", text: "2 levels", correct: false },
        { id: "b", text: "3 levels", correct: false },
        { id: "c", text: "4 levels", correct: true },
        { id: "d", text: "5 levels", correct: false },
      ],
    },
    "Prologue/Epilogue": {
      q: "What is the purpose of the function prologue (push rbp; mov rbp, rsp)?",
      opts: [
        { id: "a", text: "To allocate heap memory", correct: false },
        { id: "b", text: "To create a stable stack frame for locals and backtraces", correct: true },
        { id: "c", text: "To zero-out local variables", correct: false },
        { id: "d", text: "To enable SIMD instructions", correct: false },
      ],
    },
    "Pipeline stalls": {
      q: "What causes a load-use stall in the CPU pipeline?",
      opts: [
        { id: "a", text: "A branch that is always taken", correct: false },
        { id: "b", text: "An instruction that uses a value immediately after a memory load", correct: true },
        { id: "c", text: "Too many instructions in the pipeline", correct: false },
        { id: "d", text: "A TLB cache miss", correct: false },
      ],
    },
    "RDTSC": {
      q: "What does the RDTSC instruction return?",
      opts: [
        { id: "a", text: "The current system time in nanoseconds", correct: false },
        { id: "b", text: "The CPU's 64-bit cycle counter since reset", correct: true },
        { id: "c", text: "The number of instructions executed", correct: false },
        { id: "d", text: "The current stack pointer value", correct: false },
      ],
    },
    "Fence instructions": {
      q: "Which fence instruction orders both loads and stores on x86?",
      opts: [
        { id: "a", text: "SFENCE", correct: false },
        { id: "b", text: "LFENCE", correct: false },
        { id: "c", text: "MFENCE", correct: true },
        { id: "d", text: "FFENCE", correct: false },
      ],
    },
    "Memory ordering": {
      q: "What memory ordering model does x86-64 implement?",
      opts: [
        { id: "a", text: "Weak ordering", correct: false },
        { id: "b", text: "Total Store Order (TSO)", correct: true },
        { id: "c", text: "Release Consistency", correct: false },
        { id: "d", text: "Sequential Consistency only", correct: false },
      ],
    },
  };

  const quizzes: Lesson["exercises"] = [];
  const usedTopics = new Set<string>();

  for (let i = 0; i < Math.min(topics.length, 2); i++) {
    const topic = topics[i];
    const entry = quizMap[topic];
    if (entry && !usedTopics.has(topic)) {
      usedTopics.add(topic);
      quizzes.push({
        id: `${prefix}-q${i + 1}`,
        type: "quiz",
        title: i === 0 ? "Concept Check" : "Deep Dive",
        description: `Day ${day}: ${topic}`,
        question: entry.q,
        options: entry.opts,
        xpReward: 25,
      });
    }
  }

  if (quizzes.length < 2) {
    quizzes.push({
      id: `${prefix}-q${quizzes.length + 1}`,
      type: "quiz",
      title: "Knowledge Check",
      description: `Day ${day} core concept`,
      question: lang === "c"
        ? "What does undefined behavior mean in C?"
        : "Which flag does CMP use to indicate equality?",
      options: lang === "c"
        ? [
            { id: "a", text: "A compiler warning", correct: false },
            { id: "b", text: "Behavior not specified — anything can happen", correct: true },
            { id: "c", text: "A guaranteed crash", correct: false },
            { id: "d", text: "Code that won't compile", correct: false },
          ]
        : [
            { id: "a", text: "CF (Carry Flag)", correct: false },
            { id: "b", text: "ZF (Zero Flag)", correct: true },
            { id: "c", text: "AF (Auxiliary Flag)", correct: false },
            { id: "d", text: "OF (Overflow Flag)", correct: false },
          ],
      xpReward: 25,
    });
  }

  quizzes.push({
    id: `${prefix}-c1`,
    type: "code",
    title: "Code Challenge",
    description: `Practice ${blueprint.title} — implement the core concept`,
    starterCode: blueprint.codeTemplate.includes("TODO")
      ? blueprint.codeTemplate
      : lang === "c"
        ? `#include <stdio.h>\n\nint main(void) {\n    /* TODO: Implement ${blueprint.title} concepts */\n    return 0;\n}`
        : `section .text\nglobal _start\n\n_start:\n    ; TODO: Implement ${blueprint.title}\n    nop`,
    hints: [
      "Review the theory section for each topic",
      "Use the playground to experiment with the code template",
      "Consider edge cases and boundary conditions",
    ],
    xpReward: 50,
  });

  return quizzes;
}

function generateTopicAssignment(day: number, blueprint: DayBlueprint, lang: "c" | "asm"): Lesson["assignment"] {
  const { title, theoryTopics } = blueprint;
  const topicBasedReqs: string[] = theoryTopics.slice(0, 3).map(t => `Demonstrate understanding of ${t}`);
  const expOutput = lang === "c"
    ? "Expected output matching the problem specification"
    : "Expected register values or memory state per problem spec";

  return {
    id: `d${day}-a1`,
    title: `${title} — Assignment`,
    description: `Apply Day ${day} concepts by building a solution that exercises ${theoryTopics.join(", ")}. Focus on correctness, edge cases, and clean code.`,
    requirements: [
      ...topicBasedReqs,
      "Write clean, compilable code with meaningful comments",
      "Handle at least two edge cases",
      "Verify output matches expected results",
    ],
    starterCode: blueprint.codeTemplate.includes("TODO") || blueprint.codeTemplate.includes("nop")
      ? blueprint.codeTemplate
      : lang === "c"
        ? `#include <stdio.h>\n\nint main(void) {\n    /* Assignment: ${title} */\n    return 0;\n}`
        : `section .text\nglobal _start\n\n_start:\n    ; Assignment: ${title}\n    nop`,
    rubric: [
      { criterion: `${theoryTopics[0] ?? "Core concept"} implementation`, points: 30 },
      { criterion: `${theoryTopics[1] ?? "Supporting concept"} implementation`, points: 25 },
      { criterion: "Code quality and comments", points: 20 },
      { criterion: "Edge case handling", points: 15 },
      { criterion: expOutput, points: 10 },
    ],
    xpReward: 100,
  };
}

export function buildLesson(day: number, detailed: Partial<Lesson> | undefined): Lesson {
  const isC = day <= 50;
  const blueprint = isC ? C_CURRICULUM[day - 1] : ASM_CURRICULUM[day - 51];
  const lang = isC ? "c" : "asm";

  if (detailed && detailed.title) {
    return {
      day,
      title: detailed.title!,
      subtitle: detailed.subtitle!,
      language: lang,
      track: "c",
      level: getLevelForDay(day),
      durationMinutes: 45 + (day % 3) * 15,
      xpTotal: 200,
      tags: detailed.tags ?? blueprint.tags,
      theory: detailed.theory!,
      playground: detailed.playground!,
      exercises: detailed.exercises!,
      assignment: detailed.assignment,
    };
  }

  return {
    day,
    title: blueprint.title,
    subtitle: blueprint.subtitle,
    language: lang,
    track: "c",
    level: getLevelForDay(day),
    durationMinutes: 45 + (day % 3) * 15,
    xpTotal: 200,
    tags: blueprint.tags,
    theory: {
      sections: blueprint.theoryTopics.map((topic, i) => ({
        heading: topic,
        content: generateTopicContent(topic, blueprint.title, day, lang),
        codeExample: i === 0 ? blueprint.codeTemplate : undefined,
      })),
    },
    playground: {
      defaultCode: blueprint.codeTemplate,
      language: lang,
      runnable: true,
    },
    exercises: generateTopicExercises(day, blueprint, lang),
    assignment: generateTopicAssignment(day, blueprint, lang),
  };
}

