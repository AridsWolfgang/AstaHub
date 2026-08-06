import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Binary Trees",
    subtitle: "Hierarchical data structures for fast search and traversal",
    tags: ["trees", "data-structures", "binary-tree"],
    theory: {
      sections: [
        {
          heading: "Tree Structure",
          content:
            "A binary tree consists of nodes with a value, a left child, and a right child. Each node has at most two children. The top node is the root. Nodes with no children are leaves. Binary trees enable O(log n) search when balanced.",
          codeExample: `typedef struct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n} TreeNode;\n\nTreeNode *create(int val) {\n    TreeNode *n = malloc(sizeof(TreeNode));\n    n->val = val;\n    n->left = n->right = NULL;\n    return n;\n}`,
        },
        {
          heading: "Inorder, Preorder, Postorder",
          content:
            "Inorder (left, root, right) gives sorted order for BSTs. Preorder (root, left, right) copies tree structure. Postorder (left, right, root) deletes children before parent. Each traversal has distinct use cases.",
          codeExample: `void inorder(TreeNode *n) {\n    if (!n) return;\n    inorder(n->left);\n    printf("%d ", n->val);\n    inorder(n->right);\n}\n\nvoid preorder(TreeNode *n) {\n    if (!n) return;\n    printf("%d ", n->val);\n    preorder(n->left);\n    preorder(n->right);\n}`,
        },
        {
          heading: "Binary Search Trees (BST)",
          content:
            "A BST maintains the invariant: all left descendants are less than the node, all right descendants are greater. This enables efficient search, insertion, and deletion. Without balancing, a BST can degenerate to O(n).",
          codeExample: `TreeNode *insert(TreeNode *root, int val) {\n    if (!root) return create(val);\n    if (val < root->val)\n        root->left = insert(root->left, val);\n    else if (val > root->val)\n        root->right = insert(root->right, val);\n    return root;\n}\n\nint search(TreeNode *root, int val) {\n    if (!root) return 0;\n    if (val == root->val) return 1;\n    return val < root->val\n        ? search(root->left, val)\n        : search(root->right, val);\n}`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TN { int val; struct TN *left, *right; } TN;\n\nTN *create(int v) { TN *n = malloc(sizeof(TN)); n->val = v; n->left = n->right = NULL; return n; }\n\nTN *insert(TN *r, int v) {\n    if (!r) return create(v);\n    if (v < r->val) r->left = insert(r->left, v);\n    else r->right = insert(r->right, v);\n    return r;\n}\n\nvoid inorder(TN *r) { if (!r) return; inorder(r->left); printf("%d ", r->val); inorder(r->right); }\n\nint main(void) {\n    TN *root = NULL;\n    root = insert(root, 5);\n    insert(root, 3); insert(root, 7);\n    insert(root, 2); insert(root, 4);\n    inorder(root); printf("\\n");\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d33-q1", type: "quiz", title: "BST Property",
        description: "Understanding BST invariant",
        question: "In a BST, where do values greater than the root go?",
        options: [
          { id: "a", text: "Left subtree", correct: false },
          { id: "b", text: "Right subtree", correct: true },
          { id: "c", text: "Same node", correct: false },
          { id: "d", text: "Anywhere", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d33-q2", type: "quiz", title: "Tree Height",
        description: "Understanding tree balance",
        question: "What is the worst-case time complexity of search in an unbalanced BST?",
        options: [
          { id: "a", text: "O(log n)", correct: false },
          { id: "b", text: "O(n)", correct: true },
          { id: "c", text: "O(1)", correct: false },
          { id: "d", text: "O(n²)", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d33-c1", type: "code", title: "Tree Height",
        description: "Write a recursive function to compute tree height",
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TN { int val; struct TN *left, *right; } TN;\n\nTN *create(int v) { TN *n = malloc(sizeof(TN)); n->val = v; n->left = n->right = NULL; return n; }\n\nint height(TN *root) {\n    /* TODO: compute tree height */\n}\n\nint main(void) {\n    TN *r = create(1);\n    r->left = create(2); r->right = create(3);\n    r->left->left = create(4);\n    printf("Height: %d\\n\", height(r));\n    return 0;\n}`,
        expectedOutput: "Height: 3",
        hints: ["Base case: NULL -> -1", "Return 1 + max(left, right)"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d33-a1", title: "BST Implementation",
      description: "Implement a full BST with insert, search, delete, min, max, and traversal",
      requirements: [
        "Implement insert, search, find_min, find_max",
        "Implement inorder (sorted) traversal",
        "Implement delete (handle 0, 1, 2 child cases)",
        "Implement free_tree to clean up memory",
        "Test with at least 10 nodes",
      ],
      starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TN { int val; struct TN *left, *right; } TN;\n\nTN *insert(TN *r, int v) {\n    if (!r) { TN *n = malloc(sizeof(TN)); n->val = v; n->left = n->right = NULL; return n; }\n    if (v < r->val) r->left = insert(r->left, v);\n    else r->right = insert(r->right, v);\n    return r;\n}\n\n/* TODO: implement search, min, max, delete, free */\nvoid inorder(TN *r) { if (r) { inorder(r->left); printf("%d ", r->val); inorder(r->right); } }\n\nint main(void) {\n    TN *root = NULL;\n    int vals[] = {8, 3, 10, 1, 6, 14, 4, 7, 13};\n    for (int i = 0; i < 9; i++) root = insert(root, vals[i]);\n    inorder(root); printf("\\n\");\n    /* TODO: test other operations */\n    return 0;\n}`,
      rubric: [
        { criterion: "Insert works", points: 20 },
        { criterion: "Search works", points: 20 },
        { criterion: "Delete works (all cases)", points: 30 },
        { criterion: "Min/max and traversal work", points: 15 },
        { criterion: "Memory freed", points: 15 },
      ],
      xpReward: 100,
    },
};

export default lesson;
