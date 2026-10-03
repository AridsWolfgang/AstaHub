import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CodePlayground from "@/components/CodePlayground";
import CyberPanel from "@/components/CyberPanel";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/types";

const TEMPLATES = {
  c: {
    hello: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
    pointers: `#include <stdio.h>\n\nint main(void) {\n    int x = 42;\n    int *p = &x;\n    printf("x = %d, *p = %d\\n", x, *p);\n    printf("Address: %p\\n", (void*)p);\n    return 0;\n}`,
    malloc: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = malloc(5 * sizeof(int));\n    if (!arr) return 1;\n    for (int i = 0; i < 5; i++) arr[i] = i * 10;\n    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    free(arr);\n    return 0;\n}`,
    struct: `#include <stdio.h>\n\ntypedef struct {\n    char name[32];\n    int id;\n    float gpa;\n} Student;\n\nint main(void) {\n    Student s = {"Alice", 1001, 3.85f};\n    printf("%s (ID: %d) GPA: %.2f\\n", s.name, s.id, s.gpa);\n    return 0;\n}`,
  },
  asm: {
    hello: `section .data\n    msg db 'Hello, Assembly!', 0xA\n    len equ $ - msg\n\nsection .text\nglobal _start\n\n_start:\n    mov rax, 1      ; sys_write\n    mov rdi, 1      ; stdout\n    mov rsi, msg\n    mov rdx, len\n    syscall\n    mov rax, 60     ; sys_exit\n    xor rdi, rdi\n    syscall`,
    registers: `section .text\nglobal _start\n\n_start:\n    mov rax, 10\n    mov rbx, 20\n    add rax, rbx    ; rax = 30\n    sub rax, 5      ; rax = 25\n    imul rax, 2     ; rax = 50\n    ; Inspect register values`,
    stack: `section .text\nglobal _start\n\n_start:\n    push 42\n    push 100\n    pop rax         ; rax = 100\n    pop rbx         ; rbx = 42\n    ; Stack grows downward\n    nop`,
    bitwise: `section .text\nglobal _start\n\n_start:\n    mov rax, 0b1100\n    mov rbx, 0b1010\n    and rax, rbx    ; 1000 = 8\n    mov rcx, rax\n    or  rcx, rbx    ; 1110 = 14\n    xor rcx, rbx    ; 0100 = 4\n    nop`,
  },
  python: {
    hello: `print("Hello, World!")`,
    data: `name = "Ada"\nage = 36\nlanguages = ["Python", "C", "Assembly"]\n\nprint(f"{name} is {age} years old")\nprint("Loves:", ", ".join(languages))`,
    loops: `for i in range(1, 6):\n    print("x" * i)\n\nnums = [n * n for n in range(1, 6)]\nprint(nums)`,
    functions: `def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\ndef average(*nums):\n    return sum(nums) / len(nums)\n\nprint(greet("Ada"))\nprint(average(1, 2, 3, 4))`,
    oop: `class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance\n\n    def __str__(self):\n        return f"{self.owner}: \${self.balance}"\n\nacc = BankAccount("Ada")\nacc.deposit(100)\nprint(acc)`,
  },
  cpp: {
    hello: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}`,
    vector: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums = {5, 2, 8, 1, 9};\n    std::sort(nums.begin(), nums.end());\n    for (int n : nums) std::cout << n << " ";\n    std::cout << std::endl;\n    return 0;\n}`,
    class: `#include <iostream>\n#include <string>\n\nclass Student {\npublic:\n    Student(std::string name, int grade)\n        : name_(name), grade_(grade) {}\n\n    void describe() const {\n        std::cout << name_ << ": grade " << grade_ << std::endl;\n    }\n\nprivate:\n    std::string name_;\n    int grade_;\n};\n\nint main() {\n    Student s{"Ada", 10};\n    s.describe();\n    return 0;\n}`,
    smart_ptr: `#include <iostream>\n#include <memory>\n\nint main() {\n    auto ptr = std::make_unique<int>(42);\n    std::cout << *ptr << std::endl;\n    return 0;\n}`,
    lambda: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4, 5};\n    int even = std::count_if(nums.begin(), nums.end(),\n        [](int n) { return n % 2 == 0; });\n    std::cout << even << " even numbers" << std::endl;\n    return 0;\n}`,
  },
  js: {
    hello: `console.log("Hello, JavaScript!");`,
    async: `const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\nconst main = async () => {\n  console.log("start");\n  await delay(200);\n  console.log("after await");\n};\n\nmain();`,
    arrays: `const nums = [5, 2, 8, 1, 9];\nconst sorted = [...nums].sort((a, b) => a - b);\nconst doubled = nums.map((n) => n * 2);\nconst total = nums.reduce((s, n) => s + n, 0);\nconsole.log(sorted);\nconsole.log(doubled);\nconsole.log(total);`,
    classes: `class Student {\n  constructor(name, grade) {\n    this.name = name;\n    this.grade = grade;\n  }\n  describe() {\n    return \`\${this.name} is in grade \${this.grade}\`;\n  }\n}\n\nconst s = new Student("Ada", 10);\nconsole.log(s.describe());`,
    fetch: `const getUsers = async () => {\n  try {\n    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");\n    const user = await res.json();\n    console.log(user.name);\n  } catch (err) {\n    console.log("Error:", err.message);\n  }\n};\n\ngetUsers();`,
  },
  sql: {
    hello: `CREATE TABLE users(name TEXT, age INT);\nINSERT INTO users VALUES ('Ada', 36), ('Grace', 45);\nSELECT name FROM users;`,
    joins: `CREATE TABLE users(id INT, name TEXT);\nCREATE TABLE orders(id INT, user_id INT, item TEXT);\nINSERT INTO users VALUES (1, 'Ada'), (2, 'Grace');\nINSERT INTO orders VALUES (101, 1, 'laptop'), (102, 1, 'mouse'), (103, 2, 'keyboard');\nSELECT u.name, o.item\nFROM users u\nJOIN orders o ON o.user_id = u.id\nORDER BY u.name;`,
    groupby: `CREATE TABLE sales(item TEXT, qty INT);\nINSERT INTO sales VALUES ('apple', 3), ('banana', 2), ('apple', 5);\nSELECT item, SUM(qty) AS total\nFROM sales\nGROUP BY item\nORDER BY item;`,
    update: `CREATE TABLE books(title TEXT, pages INT);\nINSERT INTO books VALUES ('SQL Book', 300), ('Data Book', 200);\nUPDATE books SET pages = pages + 50;\nSELECT title, pages FROM books;`,
  },
  bash: {
    hello: `#!/bin/bash\necho "Hello, World!"`,
    variables: `#!/bin/bash\nname="Ada"\nage=36\necho "Hello, $name"\necho "Age: $age years"`,
    loops: `#!/bin/bash\nfor i in 1 2 3; do\n    echo "day $i"\ndone\n\nsum=0\nfor n in 1 2 3 4 5; do\n    sum=$((sum + n))\ndone\necho "sum: $sum"`,
    pipes: `#!/bin/bash\nprintf "banana\\napple\\ncherry\\n" | sort\necho "---"\nprintf "one two three\\n" | wc -w`,
  },
} as const;

const LANG_META: Record<Language, { label: string }> = {
  c: { label: "C Language" },
  asm: { label: "x86-64 Assembly" },
  python: { label: "Python" },
  cpp: { label: "C++" },
  js: { label: "JavaScript" },
  sql: { label: "SQL" },
  bash: { label: "Bash" },
};

export default function PlaygroundPage() {
  const [lang, setLang] = useState<Language>("c");
  const [template, setTemplate] = useState("hello");
  const [code, setCode] = useState<string>(TEMPLATES.c.hello);
  const { status } = useSession();
  const guest = status !== "authenticated";

  const templates = TEMPLATES[lang];
  const templateKeys = Object.keys(templates) as (keyof typeof templates)[];

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    setTemplate("hello");
    setCode(TEMPLATES[newLang].hello);
  };

  const handleTemplateChange = (key: string) => {
    setTemplate(key);
    setCode(templates[key as keyof typeof templates]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Playground
        </h1>
        <p className="text-sm text-gray-500 font-mono">
          A free workbench for C, x86-64 Assembly, Python, C++, JavaScript, SQL, and Bash — outside the curriculum
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {(Object.keys(TEMPLATES) as Language[]).map((l) => (
          <button
            key={l}
            onClick={() => handleLangChange(l)}
            className={cn(
              "rounded-lg px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all",
              lang === l
                ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                : "text-gray-500 hover:text-white border border-transparent"
            )}
          >
            {LANG_META[l].label}
          </button>
        ))}

        <div className="h-4 w-px bg-cyber-border mx-2" />

        {templateKeys.map((key) => (
          <button
            key={key}
            onClick={() => handleTemplateChange(key)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-mono capitalize transition-all",
              template === key
                ? "bg-white/5 text-white border border-white/10"
                : "text-gray-500 hover:text-white"
            )}
          >
            {key}
          </button>
        ))}
      </div>

      <CodePlayground
        defaultCode={code}
        language={lang}
        height="500px"
      />

      {guest && (
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-serif text-2xl leading-snug text-white">
              This workbench is free — no account needed.
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
              The school gives you a path through it: day-by-day lessons, a
              coach when you&apos;re stuck, and proof of everything you built.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/signin" className="btn-primary text-sm">
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/tracks" className="btn text-sm">
              See the paths
            </Link>
          </div>
        </div>
      )}

      <CyberPanel title="Quick Reference" className="mt-6">
        <div className="grid gap-4 md:grid-cols-2 text-xs font-mono">
          {lang === "python" ? (
            <>
              <div>
                <p className="text-cyber-cyan mb-2">Core Syntax</p>
                <pre className="text-gray-400">{`print("hello")     # output
name = input()     # read input
if / elif / else   # branching
for x in range(n)  # loops
def f(a, b=1):     # functions
class Name:        # objects`}</pre>
              </div>
              <div>
                <p className="text-cyber-cyan mb-2">Run</p>
                <pre className="text-gray-400">{`python program.py
# or run interactively:
python`}</pre>
              </div>
            </>
          ) : lang === "js" ? (
            <>
              <div>
                <p className="text-cyber-cyan mb-2">Core Syntax</p>
                <pre className="text-gray-400">{`console.log(x)         // output
let / const            // variables
if / else / switch     // branching
for...of / while       // loops
const f = (a, b) => a  // arrow functions
class Name { }         // objects`}</pre>
              </div>
              <div>
                <p className="text-cyber-cyan mb-2">Run</p>
                <pre className="text-gray-400">{`node program.js
# or run interactively:
node`}</pre>
              </div>
            </>
          ) : lang === "c" ? (
            <>
              <div>
                <p className="text-cyber-cyan mb-2">Essential Headers</p>
                <pre className="text-gray-400">{`<stdio.h>  — I/O (printf, scanf)
<stdlib.h> — Memory (malloc, free)
<string.h> — Strings (strlen, strcpy)
<stdint.h> — Fixed-width types`}</pre>
              </div>
              <div>
                <p className="text-cyber-cyan mb-2">Compile & Run</p>
                <pre className="text-gray-400">{`gcc -Wall -Wextra -std=c11 -o prog prog.c
./prog
echo $?    # exit code`}</pre>
              </div>
            </>
          ) : lang === "cpp" ? (
            <>
              <div>
                <p className="text-cyber-cyan mb-2">Core Headers</p>
                <pre className="text-gray-400">{`<iostream> — cout / cin
<string>   — std::string
<vector>   — dynamic arrays
<memory>   — smart pointers
<algorithm> — sort, find, ...`}</pre>
              </div>
              <div>
                <p className="text-cyber-cyan mb-2">Compile & Run</p>
                <pre className="text-gray-400">{`g++ -std=c++20 -Wall -Wextra -o prog prog.cpp
./prog
echo $?    # exit code`}</pre>
              </div>
            </>
          ) : lang === "sql" ? (
            <>
              <div>
                <p className="text-cyber-cyan mb-2">Core Statements</p>
                <pre className="text-gray-400">{`SELECT ... FROM ... WHERE ...
CREATE TABLE ... ( ... )
INSERT INTO ... VALUES ...
UPDATE ... SET ... WHERE ...
DELETE FROM ... WHERE ...
JOIN / GROUP BY / ORDER BY`}</pre>
              </div>
              <div>
                <p className="text-cyber-cyan mb-2">Run</p>
                <pre className="text-gray-400">{`sqlite3 database.db
# paste statements, or:
sqlite3 database.db < script.sql`}</pre>
              </div>
            </>
          ) : lang === "bash" ? (
            <>
              <div>
                <p className="text-cyber-cyan mb-2">Core Concepts</p>
                <pre className="text-gray-400">{`#!/bin/bash          # shebang
echo "text"          # output
var="value"          # variables
$1 $2 $@             # arguments
if [ ... ]; then     # conditionals
for / while          # loops
cmd | grep ...       # pipes`}</pre>
              </div>
              <div>
                <p className="text-cyber-cyan mb-2">Run</p>
                <pre className="text-gray-400">{`bash script.sh
chmod +x script.sh   # make it executable
./script.sh`}</pre>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-cyber-cyan mb-2">Key Registers</p>
                <pre className="text-gray-400">{`RAX — accumulator / return
RBX — base / callee-saved
RCX — counter / 4th arg
RDX — data / 3rd arg
RDI — 1st arg / dest index
RSI — 2nd arg / source index
RSP — stack pointer
RBP — base pointer`}</pre>
              </div>
              <div>
                <p className="text-cyber-cyan mb-2">Assemble & Link</p>
                <pre className="text-gray-400">{`nasm -f elf64 program.asm
ld -o program program.o
./program`}</pre>
              </div>
            </>
          )}
        </div>
      </CyberPanel>
    </div>
  );
}
