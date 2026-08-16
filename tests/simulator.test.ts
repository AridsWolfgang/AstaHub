import { describe, it, expect } from "vitest";
import { simulateAnsi } from "../src/lib/simulator";

function runC(code: string): string {
  return simulateAnsi(code, "c");
}

function runPy(code: string): string {
  return simulateAnsi(code, "python");
}

function runAsm(code: string): string {
  return simulateAnsi(code, "asm");
}

/** Body lines only — strips the header/footer comment block so assertions aren't
 *  polluted by the "ASTA Runner" banner (which can contain letters like "A"). */
function body(out: string): string[] {
  return out
    .split("\n")
    .filter((l) => !l.startsWith("//") && l.trim() !== "")
    .map((l) => l.trim());
}

describe("C simulator", () => {
  it("executes for loops and prints iteration output", () => {
    const out = runC(`for (int i = 0; i < 5; i++)
    printf("%d ", i);
printf("\\n");
return 0;`);
    expect(body(out)).toEqual(["0", "1", "2", "3", "4"]);
  });

  it("sums a loop into a variable (sum = 15)", () => {
    const out = runC(`int sum = 0;
for (int i = 1; i <= 5; i++)
    sum += i;
printf("%d\\n", sum);
return 0;`);
    expect(out).toContain("15");
  });

  it("handles if / else-if / else chains", () => {
    const out = runC(`int score = 85;
if (score >= 90) printf("A");
else if (score >= 80) printf("B");
else printf("C");
printf("\\n");
return 0;`);
    expect(body(out)).toEqual(["B"]);
  });

  it("handles braced if/else with } else {", () => {
    const out = runC(`int x = 10;
if (x > 5) {
    printf("big");
} else {
    printf("small");
}
printf("\\n");
return 0;`);
    expect(body(out)).toEqual(["big"]);
  });

  it("reads arrays with indexing", () => {
    const out = runC(`int arr[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++)
    printf("%d ", arr[i]);
printf("\\n");
return 0;`);
    expect(body(out)).toEqual(["1", "2", "3", "4", "5"]);
  });

  it("dereferences pointers and pointer arithmetic", () => {
    const out = runC(`int arr[] = {10, 20, 30};
int *p = arr;
printf("%d %d %d\\n", *p, *(p+1), *(p+2));
return 0;`);
    expect(out).toContain("10 20 30");
  });

  it("evaluates bitwise operators", () => {
    const out = runC(`unsigned a = 5, b = 3;
printf("a & b = %u\\n", a & b);
printf("a | b = %u\\n", a | b);
return 0;`);
    expect(out).toContain("a & b = 1");
    expect(out).toContain("a | b = 7");
  });

  it("handles pre/post increment and compound assignment in expressions", () => {
    const out = runC(`int x = 5;
int y = ++x;
int z = x--;
printf("%d %d %d\\n", x, y, z);
return 0;`);
    expect(out).toContain("5 6 6");
  });

  it("handles while loops", () => {
    const out = runC(`int i = 3;
while (i > 0) {
    printf("%d ", i);
    i--;
}
printf("\\n");
return 0;`);
    expect(body(out)).toEqual(["3", "2", "1"]);
  });
});

describe("Python simulator", () => {
  it("executes print and arithmetic", () => {
    const out = runPy(`print("hello")
print(1 + 1)`);
    expect(out).toContain("hello");
    expect(out).toContain("2");
  });

  it("computes factorial via recursion-free loop (120)", () => {
    const out = runPy(`result = 1
for i in range(1, 6):
    result = result * i
print(result)`);
    expect(out).toContain("120");
  });

  it("handles if/elif/else chains without running multiple branches", () => {
    const out = runPy(`x = 5
if x > 10:
    print("A")
elif x > 3:
    print("B")
else:
    print("C")`);
    expect(body(out)).toEqual(["B"]);
  });

  it("supports list indexing and slicing", () => {
    const out = runPy(`nums = [1, 2, 3, 4, 5]
print(nums[0])
print(nums[1:4])
print(nums[:3])`);
    expect(out).toContain("1");
    expect(out).toContain("[2, 3, 4]");
    expect(out).toContain("[1, 2, 3]");
  });

  it("supports dict get and set", () => {
    const out = runPy(`d = {"name": "neo", "age": 30}
print(d["name"])
d["age"] = 31
print(d)`);
    expect(out).toContain("neo");
    expect(out).toContain("age: 31");
  });

  it("honors print end= and sep= kwargs", () => {
    const out = runPy(`for i in range(3):
    print(i, end=" ")
print()
print("a", "b", sep="-")`);
    expect(out).toContain("0 1 2");
    expect(out).toContain("a-b");
  });

  it("supports list comprehensions", () => {
    const out = runPy(`squares = [n * n for n in range(1, 6)]
print(squares)`);
    expect(out).toContain("[1, 4, 9, 16, 25]");
  });

  it("supports while loops and break", () => {
    const out = runPy(`i = 0
while True:
    i += 1
    if i == 4:
        break
    print(i)`);
    expect(out).toContain("1");
    expect(out).toContain("3");
    expect(out).not.toContain("4");
  });

  it("short-circuits and/or returning operands", () => {
    const out = runPy(`print(0 or "fallback")
print("x" and "y")`);
    expect(out).toContain("fallback");
    expect(out).toContain("y");
  });
});

describe("ASM simulator", () => {
  it("renders the hello world banner", () => {
    const out = runAsm(`section .data
    msg db 'Hello, Assembly!', 0xA
    len equ $ - msg
section .text
global _start
_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall
    mov rax, 60
    xor rdi, rdi
    syscall`);
    expect(out).toContain("Hello, Assembly!");
  });
});

describe("simulateAnsi output shape", () => {
  it("marks simulated execution and exit code 0", () => {
    const out = runC(`int main(void) {
    printf("ok\\n");
    return 0;
}`);
    expect(out).toContain("ASTA Runner");
    expect(out).toContain("exit code 0");
    expect(out).toContain("ok");
  });
});
