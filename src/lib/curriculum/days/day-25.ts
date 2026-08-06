import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Multi-dimensional Arrays",
    subtitle: "Matrices, nested loops, and row-major order",
    tags: ["arrays", "matrices", "2D"],
    theory: {
      sections: [
        {
          heading: "2D Array Layout",
          content:
            "A 2D array is stored in row-major order — row 0, then row 1, etc. int mat[3][4] creates 3 rows × 4 columns = 12 contiguous ints. mat[i][j] access is syntactic sugar for *(mat + i * cols + j).",
          codeExample: `int mat[2][3] = {{1,2,3},{4,5,6}};\n// Memory: [1][2][3][4][5][6]\nprintf("%d\\n", mat[1][2]);  // 6 (row 1, col 2)\nprintf("%d\\n", *(*(mat+1)+2));  // same thing`,
        },
        {
          heading: "Nested Loop Traversal",
          content:
            "Row-major traversal (outer loop = rows, inner = columns) matches memory layout and benefits from CPU cache. Column-major traversal (outer = columns) jumps across rows and is slower.",
          codeExample: `int rows = 3, cols = 4;\nint matrix[rows][cols];\n\n// Row-major (cache-friendly)\nfor (int i = 0; i < rows; i++)\n    for (int j = 0; j < cols; j++)\n        matrix[i][j] = i * cols + j;`,
        },
        {
          heading: "Dynamic 2D Arrays",
          content:
            "For variable sizes, allocate an array of pointers, each pointing to a row. Or use a flat 1D array with manual index calculation: arr[i * cols + j].",
          codeExample: `int rows = 3, cols = 4;\nint **mat = malloc(rows * sizeof(int*));\nfor (int i = 0; i < rows; i++)\n    mat[i] = malloc(cols * sizeof(int));\n// Access: mat[i][j]\n// Flat approach:\nint *flat = malloc(rows * cols * sizeof(int));\n// Access: flat[i * cols + j]`,
        },
      ],
    },
    playground: {
      defaultCode: `#include <stdio.h>\n\nint main(void) {\n    int mat[3][4] = {\n        {1, 2, 3, 4},\n        {5, 6, 7, 8},\n        {9, 10, 11, 12}\n    };\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 4; j++)\n            printf("%3d ", mat[i][j]);\n        printf("\\n");\n    }\n    return 0;\n}`,
      language: "c",
      runnable: true,
    },
    exercises: [
      {
        id: "d25-q1", type: "quiz", title: "Row-Major",
        description: "Understanding memory layout",
        question: "In C, how is a 2D array stored in memory?",
        options: [
          { id: "a", text: "Column-major order (columns contiguous)", correct: false },
          { id: "b", text: "Row-major order (rows contiguous)", correct: true },
          { id: "c", text: "As a linked list", correct: false },
          { id: "d", text: "Random order", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d25-q2", type: "quiz", title: "Matrix Access",
        description: "Understanding element access",
        question: "Given 'int m[2][3]', how do you access the element at row 1, column 2?",
        options: [
          { id: "a", text: "m[1][2]", correct: true },
          { id: "b", text: "m[2][1]", correct: false },
          { id: "c", text: "m[1,2]", correct: false },
          { id: "d", text: "m[2][2]", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d25-c1", type: "code", title: "Matrix Transpose",
        description: "Transpose a 3x3 matrix (swap rows and columns)",
        starterCode: `#include <stdio.h>\n\nint main(void) {\n    int mat[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    /* TODO: compute and print transpose */\n    return 0;\n}`,
        hints: ["Result[i][j] = mat[j][i]", "Print in the same nested loop format"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d25-a1", title: "Matrix Operations",
      description: "Implement matrix addition, multiplication, and diagonal sum",
      requirements: [
        "Implement add(m1, m2, result, rows, cols)",
        "Implement multiply(m1, m2, result, r1, c1, c2)",
        "Implement sum_diagonal(mat, n)",
        "Test with at least 3x3 matrices",
        "Print matrices in a clean format",
      ],
      starterCode: `#include <stdio.h>\n\nvoid add(int a[][3], int b[][3], int res[][3], int rows, int cols) {\n    /* TODO */\n}\n\nvoid multiply(int a[][3], int b[][3], int res[][3], int n) {\n    /* TODO */\n}\n\nint sum_diagonal(int mat[][3], int n) {\n    /* TODO */\n}\n\nvoid print(int mat[][3], int rows, int cols) {\n    for (int i = 0; i < rows; i++) {\n        for (int j = 0; j < cols; j++)\n            printf("%4d ", mat[i][j]);\n        printf("\\n\");\n    }\n}\n\nint main(void) {\n    int a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int b[3][3] = {{9,8,7},{6,5,4},{3,2,1}};\n    /* TODO: test operations */\n    return 0;\n}`,
      rubric: [
        { criterion: "Matrix addition correct", points: 25 },
        { criterion: "Matrix multiplication correct", points: 35 },
        { criterion: "Diagonal sum correct", points: 25 },
        { criterion: "Clean formatted output", points: 15 },
      ],
      xpReward: 100,
    },
};

export default lesson;
