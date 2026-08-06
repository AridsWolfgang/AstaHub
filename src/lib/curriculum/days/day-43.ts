import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Memory Pools",
    subtitle: "Custom allocators for predictable, low-overhead memory management",
    tags: ["memory", "allocator", "pool"],
    theory: {
      sections: [
        {
          heading: "Why Memory Pools?",
          content:
            "malloc/free have overhead: metadata per allocation, fragmentation, and unpredictable latency. Memory pools pre-allocate a large chunk and subdivide it. This gives deterministic allocation speed, no fragmentation, and simple deallocation (free the whole pool at once).",
          codeExample: `typedef struct {\n    char *buffer;\n    size_t size;\n    size_t offset;\n} Pool;\n\nPool *pool_create(size_t size) {\n    Pool *p = malloc(sizeof(Pool));\n    p->buffer = malloc(size);\n    p->size = size;\n    p->offset = 0;\n    return p;\n}\n\nvoid *pool_alloc(Pool *p, size_t n) {\n    if (p->offset + n > p->size) return NULL;\n    void *ptr = p->buffer + p->offset;\n    p->offset += n;\n    return ptr;\n}\n\nvoid pool_destroy(Pool *p) {\n    free(p->buffer);\n    free(p);\n}`,
        },
        {
          heading: "Arena Allocators",
          content:
            "An arena (or region-based allocator) allocates linearly from a large block. Allocations are incredibly fast — just bump a pointer. Free the entire arena at once. Used extensively in game engines, compilers, and high-frequency trading.",
        },
        {
          heading: "Pool Tradeoffs",
          content:
            "Pools excel when you allocate many same-sized objects or when allocations are temporary (one frame, one request). They don't support individual free() — only bulk reset. Choose based on your allocation pattern.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct { char *buf; size_t size, off; } Pool;\n\nPool *pool_new(size_t sz) {\n    Pool *p = malloc(sizeof(Pool));\n    p->buf = malloc(sz); p->size = sz; p->off = 0;\n    return p;\n}\n\nvoid *pool_alloc(Pool *p, size_t n) {\n    if (p->off + n > p->size) return NULL;\n    void *ptr = p->buf + p->off;\n    p->off += n;\n    return ptr;\n}\n\nvoid pool_reset(Pool *p) { p->off = 0; }\nvoid pool_free(Pool *p) { free(p->buf); free(p); }\n\nint main(void) {\n    Pool *p = pool_new(1024);\n    int *arr = pool_alloc(p, 5 * sizeof(int));\n    for (int i = 0; i < 5; i++) arr[i] = i * i;\n    char *str = pool_alloc(p, 32);\n    strcpy(str, "pool allocator\");\n    printf("arr[3]=%d, str=%s\\n\", arr[3], str);\n    pool_free(p);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d43-q1", type: "quiz", title: "Pool Advantage",
        description: "Understanding pool benefits",
        question: "What is a key advantage of memory pools over malloc?",
        options: [
          { id: "a", text: "Smaller memory usage", correct: false },
          { id: "b", text: "Faster allocation and no fragmentation", correct: true },
          { id: "c", text: "Thread safety by default", correct: false },
          { id: "d", text: "Automatic garbage collection", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d43-q2", type: "quiz", title: "Pool Limitation",
        description: "Understanding pool tradeoffs",
        question: "What is a limitation of a simple bump-allocator pool?",
        options: [
          { id: "a", text: "It is slower than malloc", correct: false },
          { id: "b", text: "You cannot free individual allocations", correct: true },
          { id: "c", text: "It only works with structs", correct: false },
          { id: "d", text: "It wastes more memory", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d43-c1", type: "code", title: "String Pool",
        description: "Use a pool to allocate multiple strings efficiently",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct { char *buf; size_t size, off; } Pool;\n\nPool *pool_new(size_t sz) {\n    Pool *p = malloc(sizeof(Pool));\n    p->buf = malloc(sz); p->size = sz; p->off = 0;\n    return p;\n}\n\nchar *pool_strdup(Pool *p, const char *s) {\n    /* TODO: allocate and copy string in pool */\n}\n\nint main(void) {\n    Pool *p = pool_new(256);\n    char *greeting = pool_strdup(p, "Hello, World!\");\n    char *name = pool_strdup(p, "Systems Programming\");\n    printf("%s - %s\\n\", greeting, name);\n    pool_free(p);  // free both at once\n    return 0;\n}`,
        expectedOutput: "Hello, World! - Systems Programming",
        hints: ["strlen(s) + 1 bytes needed", "strcpy into pool_alloc'd space"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d43-a1", title: "Object Pool",
      description: "Create a fixed-size object pool for reusing struct instances",
      requirements: [
        "Define an Object struct with some fields",
        "Create a pool that pre-allocates N Objects",
        "Implement acquire() to get an object from pool",
        "Implement release() to return it",
        "Track free/used slots with a bitmap or free list",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct { int id; char name[32]; int active; } Object;\n\ntypedef struct {\n    Object *objects;\n    int capacity;\n    int *free_list;\n    int free_count;\n} ObjectPool;\n\nObjectPool *pool_create(int capacity) {\n    ObjectPool *p = malloc(sizeof(ObjectPool));\n    p->objects = calloc(capacity, sizeof(Object));\n    p->capacity = capacity;\n    p->free_list = malloc(capacity * sizeof(int));\n    for (int i = 0; i < capacity; i++) p->free_list[i] = i;\n    p->free_count = capacity;\n    return p;\n}\n\nObject *pool_acquire(ObjectPool *p) {\n    /* TODO: return a free object or NULL */\n}\n\nvoid pool_release(ObjectPool *p, Object *obj) {\n    /* TODO: return object to pool */\n}\n\nint main(void) {\n    ObjectPool *pool = pool_create(5);\n    Object *o1 = pool_acquire(pool);\n    if (o1) { o1->id = 1; sprintf(o1->name, \"Widget\"); o1->active = 1; }\n    pool_release(pool, o1);\n    /* TODO: test acquire/release cycle */\n    return 0;\n}`,
      rubric: [
        { criterion: "acquire returns free object", points: 30 },
        { criterion: "release returns to pool", points: 30 },
        { criterion: "Handles pool exhaustion", points: 20 },
        { criterion: "No memory leaks", points: 20 },
      ],
      xpReward: 100,
    },
};

export default lesson;
