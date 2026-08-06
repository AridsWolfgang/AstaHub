import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Linked Lists",
    subtitle: "Dynamic data structures — nodes linked by pointers",
    tags: ["linked-list", "data-structures", "dynamic"],
    theory: {
      sections: [
        {
          heading: "Node Structure",
          content:
            "A linked list consists of nodes, each containing data and a pointer to the next node. The list is accessed through a head pointer. Unlike arrays, linked lists can grow and shrink dynamically without reallocation.",
          codeExample: `typedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode *head = NULL;\n\n// Create first node\nNode *first = malloc(sizeof(Node));\nfirst->data = 42;\nfirst->next = NULL;\nhead = first;`,
        },
        {
          heading: "Insertion and Traversal",
          content:
            "Insert at head: new->next = head; head = new. Traverse: start at head, follow next until NULL. Search: compare each node's data. Always handle the empty list (head == NULL) as a special case.",
          codeExample: `void push_front(Node **head, int val) {\n    Node *new = malloc(sizeof(Node));\n    new->data = val;\n    new->next = *head;\n    *head = new;\n}\n\nvoid print_list(Node *head) {\n    for (Node *cur = head; cur; cur = cur->next)\n        printf("%d -> ", cur->data);\n    printf("NULL\\n");\n}`,
        },
        {
          heading: "Deletion and Cleanup",
          content:
            "Deleting a node requires updating the previous node's next pointer. Free the node's memory after unlinking. To free the entire list, iterate and save next before freeing current.",
          codeExample: `void free_list(Node *head) {\n    while (head) {\n        Node *tmp = head;\n        head = head->next;\n        free(tmp);\n    }\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node { int data; struct Node *next; } Node;\n\nvoid print(Node *h) { for (Node *c=h; c; c=c->next) printf("%d ", c->data); printf("\\n"); }\n\nint main(void) {\n    Node *n1 = malloc(sizeof(Node)); n1->data = 10;\n    Node *n2 = malloc(sizeof(Node)); n2->data = 20;\n    Node *n3 = malloc(sizeof(Node)); n3->data = 30;\n    n1->next = n2; n2->next = n3; n3->next = NULL;\n    print(n1);\n    free(n1); free(n2); free(n3);\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d20-q1", type: "quiz", title: "Node Pointer",
        description: "Understanding linked list traversal",
        question: "In a singly linked list, what does each node contain besides data?",
        options: [
          { id: "a", text: "A pointer to the previous node", correct: false },
          { id: "b", text: "A pointer to the next node", correct: true },
          { id: "c", text: "The index of the node", correct: false },
          { id: "d", text: "The size of the list", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d20-q2", type: "quiz", title: "Head Update",
        description: "Updating the head pointer",
        question: "When inserting at the front, why do we pass Node** instead of Node*?",
        options: [
          { id: "a", text: "To avoid copying the struct", correct: false },
          { id: "b", text: "To modify the caller's head pointer", correct: true },
          { id: "c", text: "To make the function faster", correct: false },
          { id: "d", text: "It's not necessary, Node* works", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d20-c1", type: "code", title: "List Length",
        description: "Write a function to count the number of nodes in a linked list",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node { int data; struct Node *next; } Node;\n\nint length(Node *head) {\n    /* TODO: count nodes */\n}\n\nint main(void) {\n    Node n1 = {1, NULL}, n2 = {2, NULL}, n3 = {3, NULL};\n    n1.next = &n2; n2.next = &n3;\n    printf("Length: %d\\n", length(&n1));\n    printf("Empty: %d\\n", length(NULL));\n    return 0;\n}`,
        expectedOutput: "Length: 3",
        hints: ["Loop while cur != NULL", "Increment counter each iteration"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d20-a1", title: "Linked List Library",
      description: "Implement a basic singly linked list with insert, delete, search, and print",
      requirements: [
        "Implement push_front, push_back, pop_front, pop_back",
        "Implement find (returns index or -1)",
        "Implement delete_by_value (removes first match)",
        "Implement print_list",
        "Free all memory at the end",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node { int data; struct Node *next; } Node;\n\nvoid push_front(Node **head, int val) {\n    /* TODO */\n}\n\nvoid push_back(Node **head, int val) {\n    /* TODO */\n}\n\nint pop_front(Node **head) {\n    /* TODO */\n}\n\nint find(Node *head, int val) {\n    /* TODO */\n}\n\nvoid delete_by_value(Node **head, int val) {\n    /* TODO */\n}\n\nvoid print(Node *head) {\n    /* TODO */\n}\n\nvoid free_list(Node *head) {\n    /* TODO */\n}\n\nint main(void) {\n    Node *list = NULL;\n    push_front(&list, 10);\n    push_front(&list, 20);\n    push_back(&list, 30);\n    print(list);\n    printf("Found 20 at: %d\\n", find(list, 20));\n    delete_by_value(&list, 20);\n    print(list);\n    free_list(list);\n    return 0;\n}`,
      rubric: [
        { criterion: "push_front/push_back work", points: 20 },
        { criterion: "pop_front works", points: 15 },
        { criterion: "find returns correct index", points: 20 },
        { criterion: "delete_by_value works", points: 20 },
        { criterion: "Memory freed correctly", points: 25 },
      ],
      xpReward: 100,
    },
};

export default lesson;
