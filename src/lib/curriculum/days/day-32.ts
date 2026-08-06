import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Hash Table",
    subtitle: "Key-value storage with hash functions and collision handling",
    tags: ["hash-table", "data-structures", "dictionary"],
    theory: {
      sections: [
        {
          heading: "Hash Table Concepts",
          content:
            "A hash table maps keys to values using a hash function that computes an index into an array. The ideal is O(1) average lookup. Collisions happen when two keys hash to the same index — handled via chaining (linked list at each bucket) or open addressing.",
          codeExample: `#define TABLE_SIZE 100\n\ntypedef struct Entry {\n    char *key;\n    int value;\n    struct Entry *next;\n} Entry;\n\ntypedef struct {\n    Entry *buckets[TABLE_SIZE];\n} HashTable;`,
        },
        {
          heading: "Hash Function (djb2)",
          content:
            "A good hash function distributes keys uniformly. The djb2 algorithm by Dan Bernstein is simple and effective: start with 5381, multiply by 33 and add each character. For strings, this gives reasonable distribution.",
          codeExample: `unsigned long hash(const char *str) {\n    unsigned long h = 5381;\n    int c;\n    while ((c = *str++))\n        h = ((h << 5) + h) + c;  // h * 33 + c\n    return h % TABLE_SIZE;\n}`,
        },
        {
          heading: "Insert and Lookup with Chaining",
          content:
            "To insert: compute hash, append to the linked list at that bucket. To lookup: compute hash, search the linked list. To delete: find and remove from the linked list. Performance degrades when chains get long — resize the table (rehash) when load factor exceeds threshold.",
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define SIZE 10\n\ntypedef struct Entry {\n    char *key; int val;\n    struct Entry *next;\n} Entry;\n\nEntry *table[SIZE];\n\nunsigned long hash(const char *s) {\n    unsigned long h = 5381;\n    while (*s) h = ((h << 5) + h) + *s++;\n    return h % SIZE;\n}\n\nvoid put(const char *k, int v) {\n    int idx = hash(k);\n    Entry *e = malloc(sizeof(Entry));\n    e->key = strdup(k); e->val = v; e->next = table[idx];\n    table[idx] = e;\n}\n\nint get(const char *k) {\n    for (Entry *e = table[hash(k)]; e; e = e->next)\n        if (strcmp(e->key, k) == 0) return e->val;\n    return -1;\n}\n\nint main(void) {\n    put("alice", 42);\n    put("bob", 77);\n    printf("alice: %d\\n", get("alice"));\n    printf("charlie: %d\\n", get("charlie"));\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d32-q1", type: "quiz", title: "Hash Collision",
        description: "Understanding collisions",
        question: "What is a hash collision?",
        options: [
          { id: "a", text: "When the hash table is full", correct: false },
          { id: "b", text: "When two keys produce the same hash index", correct: true },
          { id: "c", text: "When the hash function fails", correct: false },
          { id: "d", text: "When a key is NULL", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d32-q2", type: "quiz", title: "Chaining",
        description: "Understanding collision resolution",
        question: "In chaining, how are collisions handled?",
        options: [
          { id: "a", text: "By moving to the next empty slot", correct: false },
          { id: "b", text: "Each bucket has a linked list of entries", correct: true },
          { id: "c", text: "By doubling the table size", correct: false },
          { id: "d", text: "By replacing the old key", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d32-c1", type: "code", title: "Hash Table Delete",
        description: "Implement delete function for the hash table",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h.h>\n\n#define SIZE 10\n\ntypedef struct Entry { char *key; int val; struct Entry *next; } Entry;\nEntry *table[SIZE];\n\nunsigned long hash(const char *s) {\n    unsigned long h = 5381;\n    while (*s) h = ((h << 5) + h) + *s++;\n    return h % SIZE;\n}\n\nvoid put(const char *k, int v) {\n    int idx = hash(k);\n    Entry *e = malloc(sizeof(Entry));\n    e->key = strdup(k); e->val = v; e->next = table[idx];\n    table[idx] = e;\n}\n\nint delete_key(const char *k) {\n    /* TODO: remove entry with key k, return 1 if found */\n}\n\nint main(void) {\n    put("a", 1); put("b", 2);\n    printf("delete a: %d\\n", delete_key("a"));\n    printf("delete a: %d\\n", delete_key("a"));  // should be 0\n    return 0;\n}`,
        hints: ["Walk the chain tracking prev pointer", "Unlink and free the matching node"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d32-a1", title: "Word Frequency Counter",
      description: "Use a hash table to count word frequencies in a text",
      requirements: [
        "Read a string of text (hardcoded or simple input)",
        "Split into words (space-delimited)",
        "Count each word's frequency using a hash table",
        "Print all words and their counts",
        "Handle at least 10 different words",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define SIZE 50\n\ntypedef struct Entry { char *word; int count; struct Entry *next; } Entry;\nEntry *table[SIZE];\n\nunsigned long hash(const char *s) {\n    unsigned long h = 5381;\n    while (*s) h = ((h << 5) + h) + *s++;\n    return h % SIZE;\n}\n\nvoid increment(const char *word) {\n    /* TODO: find or create entry, increment count */\n}\n\nvoid print_all(void) {\n    /* TODO: print all words and counts */\n}\n\nint main(void) {\n    const char *text = "the quick brown fox jumps over the lazy dog the fox";\n    /* TODO: split text, increment counts */\n    print_all();\n    return 0;\n}`,
      rubric: [
        { criterion: "Hash table insert/lookup works", points: 30 },
        { criterion: "Word splitting correct", points: 20 },
        { criterion: "Counts are accurate", points: 25 },
        { criterion: "All words printed", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
