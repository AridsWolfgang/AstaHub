import type { Lesson } from "../../types";
import { getLevelForDay } from "../../types";

/* ─── JavaScript / TypeScript blueprints: Days 1–40 ─── */

interface JsBlueprint {
  title: string;
  subtitle: string;
  language: "js";
  tags: string[];
  theoryTopics: string[];
  codeTemplate: string;
}

const JS_CURRICULUM: JsBlueprint[] = [
  { title: "Hello, JavaScript", subtitle: "Your first script and the console", language: "js", tags: ["hello-world"], theoryTopics: ["Why JavaScript", "The console", "Running scripts"], codeTemplate: `console.log("Hello, JavaScript!");` },
  { title: "Variables & Values", subtitle: "let, const, and dynamic typing", language: "js", tags: ["variables"], theoryTopics: ["let and const", "var and hoisting", "Dynamic typing"], codeTemplate: `let message = "hello";\nconst days = 40;\nvar old = true;\nconsole.log(message, days, old);` },
  { title: "Numbers & Arithmetic", subtitle: "Number, Math, and operators", language: "js", tags: ["numbers"], theoryTopics: ["The Number type", "Arithmetic operators", "NaN and Infinity"], codeTemplate: `const a = 10;\nconst b = 3;\nconsole.log(a + b, a - b, a * b);\nconsole.log(a / b, a % b);\nconsole.log(a ** 2);` },
  { title: "Strings", subtitle: "Text as an immutable sequence", language: "js", tags: ["strings"], theoryTopics: ["Quoting styles", "Template literals", "Common string methods"], codeTemplate: `const name = "Ada";\nconst greet = "Hello, " + name;\nconsole.log(greet);\nconsole.log(name[0], name[name.length - 1]);\nconsole.log(\`\${name} Lovelace\`.slice(0, 3));` },
  { title: "Booleans & Comparison", subtitle: "true, false, and equality", language: "js", tags: ["booleans"], theoryTopics: ["Truthiness", "== vs ===", "Logical operators"], codeTemplate: `const age = 18;\nconst adult = age >= 18;\nconsole.log(adult, !adult);\nconsole.log(0 == false, 0 === false);\nconsole.log(true && false, true || false);` },
  { title: "Conditionals", subtitle: "if / else if / else", language: "js", tags: ["control-flow"], theoryTopics: ["if statements", "else if chains", "The ternary operator"], codeTemplate: `const score = 85;\nlet grade;\nif (score >= 90) grade = "A";\nelse if (score >= 80) grade = "B";\nelse grade = "C";\nconsole.log(grade);\nconsole.log(score > 50 ? "pass" : "fail");` },
  { title: "Logical Operators", subtitle: "&&, ||, ! and short-circuiting", language: "js", tags: ["control-flow"], theoryTopics: ["Logical AND", "Logical OR", "Short-circuit evaluation"], codeTemplate: `const name = "";\nconsole.log(name || "anonymous");\nconsole.log(true && 42, false && 42);\nconsole.log(!0, !"hello");` },
  { title: "switch", subtitle: "Multiple dispatch made readable", language: "js", tags: ["control-flow"], theoryTopics: ["switch syntax", "break and fallthrough", "When to prefer a map"], codeTemplate: `const cmd = "start";\nlet result;\nswitch (cmd) {\n  case "stop": result = "stopping"; break;\n  case "start": result = "starting"; break;\n  default: result = "unknown";\n}\nconsole.log(result);` },
  { title: "Arrays", subtitle: "Ordered, mutable collections", language: "js", tags: ["arrays"], theoryTopics: ["Creating arrays", "Indexing and length", "push, pop, shift, unshift"], codeTemplate: `const nums = [1, 2, 3];\nnums.push(4);\nnums.unshift(0);\nconsole.log(nums);\nconsole.log(nums[2], nums.length);\nconsole.log(nums.slice(1, 3));` },
  { title: "Array Methods", subtitle: "map, filter, reduce", language: "js", tags: ["arrays"], theoryTopics: ["map", "filter", "reduce"], codeTemplate: `const nums = [1, 2, 3, 4, 5];\nconst squares = nums.map((n) => n * n);\nconst evens = nums.filter((n) => n % 2 === 0);\nconst total = nums.reduce((sum, n) => sum + n, 0);\nconsole.log(squares);\nconsole.log(evens);\nconsole.log(total);` },
  { title: "Loops", subtitle: "for, while, and for...of", language: "js", tags: ["loops"], theoryTopics: ["for loops", "while loops", "for...of and for...in"], codeTemplate: `for (let i = 0; i < 3; i++) console.log(i);\nlet n = 0;\nwhile (n < 3) { console.log("w" + n); n++; }\nfor (const x of [10, 20, 30]) console.log(x);` },
  { title: "Functions", subtitle: "Declarations, expressions, hoisting", language: "js", tags: ["functions"], theoryTopics: ["Function declarations", "Function expressions", "Return values"], codeTemplate: `function greet(name) {\n  return "Hello, " + name;\n}\nconst add = function (a, b) {\n  return a + b;\n};\nconsole.log(greet("Ada"));\nconsole.log(add(3, 4));` },
  { title: "Arrow Functions", subtitle: "Concise, lexical-this functions", language: "js", tags: ["functions"], theoryTopics: ["Arrow syntax", "Implicit returns", "Lexical this"], codeTemplate: `const square = (x) => x * x;\nconst add = (a, b) => a + b;\nconst hello = () => "hi";\nconsole.log(square(5));\nconsole.log(add(2, 3));\nconsole.log(hello());` },
  { title: "Parameters & Rest", subtitle: "Defaults, rest, and spread", language: "js", tags: ["functions"], theoryTopics: ["Default parameters", "Rest parameters", "Spread syntax"], codeTemplate: `function greet(name = "friend") {\n  return "Hello, " + name;\n}\nfunction total(...nums) {\n  return nums.reduce((s, n) => s + n, 0);\n}\nconst parts = [2, 3];\nconsole.log(greet());\nconsole.log(greet("Ada"));\nconsole.log(total(1, 2, 3, 4));\nconsole.log(Math.max(...parts));` },
  { title: "Scope & Closures", subtitle: "Block scope and captured variables", language: "js", tags: ["scope"], theoryTopics: ["Block scope", "Closures", "The module pattern"], codeTemplate: `function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = makeCounter();\nconsole.log(counter());\nconsole.log(counter());\nlet x = 10;\nif (true) {\n  let y = 5;\n  console.log(x + y);\n}` },
  { title: "Objects", subtitle: "Key-value pairs and property access", language: "js", tags: ["objects"], theoryTopics: ["Object literals", "Dot vs bracket access", "Spread and Object.assign"], codeTemplate: `const user = { name: "Ada", age: 36 };\nconsole.log(user.name);\nuser.city = "London";\nconsole.log(user["city"]);\nconst copy = { ...user };\ncopy.age = 37;\nconsole.log(user.age, copy.age);` },
  { title: "Object Methods & this", subtitle: "Methods and the this keyword", language: "js", tags: ["objects"], theoryTopics: ["Method shorthand", "What this refers to", "Arrow vs function this"], codeTemplate: `const user = {\n  name: "Ada",\n  greet() {\n    return "Hi, I am " + this.name;\n  },\n};\nconsole.log(user.greet());\nconst greet = user.greet;\nconsole.log(greet());` },
  { title: "Destructuring", subtitle: "Extract values in one line", language: "js", tags: ["objects"], theoryTopics: ["Array destructuring", "Object destructuring", "Renaming and defaults"], codeTemplate: `const [a, b] = [10, 20];\nconsole.log(a + b);\nconst user = { name: "Ada", age: 36 };\nconst { name, age } = user;\nconsole.log(name, age);\nconst { name: n, age: years } = user;\nconsole.log(n, years);` },
  { title: "JSON & Serialization", subtitle: "JSON.stringify and parse", language: "js", tags: ["json"], theoryTopics: ["JSON.stringify", "JSON.parse", "JSON as the data lingua franca"], codeTemplate: `const data = { name: "Ada", langs: ["JS", "C"] };\nconst encoded = JSON.stringify(data);\nconsole.log(encoded);\nconst back = JSON.parse(encoded);\nconsole.log(back.name);` },
  { title: "Map & Set", subtitle: "Keyed collections with fast lookups", language: "js", tags: ["collections"], theoryTopics: ["Map", "Set", "When to use them"], codeTemplate: `const scores = new Map();\nscores.set("Ada", 95);\nscores.set("Bob", 88);\nconsole.log(scores.get("Ada"));\nconsole.log(scores.has("Eve"));\nconsole.log(scores.size);\nconst seen = new Set([1, 2, 2, 3, 3, 3]);\nconsole.log([...seen]);` },
  { title: "Classes", subtitle: "constructor, methods, and fields", language: "js", tags: ["classes"], theoryTopics: ["Class syntax", "The constructor", "Instance methods"], codeTemplate: `class Student {\n  constructor(name, grade) {\n    this.name = name;\n    this.grade = grade;\n  }\n  describe() {\n    return this.name + " is in grade " + this.grade;\n  }\n}\nconst s = new Student("Ada", 10);\nconsole.log(s.describe());` },
  { title: "Inheritance & super", subtitle: "extends and calling the parent", language: "js", tags: ["classes"], theoryTopics: ["extends", "super()", "Overriding methods"], codeTemplate: `class Animal {\n  speak() { return "..."; }\n}\nclass Dog extends Animal {\n  speak() { return "Woof"; }\n}\nclass Cat extends Animal {\n  speak() { return "Meow"; }\n}\nfor (const a of [new Dog(), new Cat()]) {\n  console.log(a.speak());\n}` },
  { title: "Getters, Setters & Static", subtitle: "Accessors and class-level members", language: "js", tags: ["classes"], theoryTopics: ["get and set", "static members", "Private fields"], codeTemplate: `class Account {\n  constructor(balance = 0) { this._balance = balance; }\n  get balance() { return this._balance; }\n  deposit(amount) { this._balance += amount; }\n  static currency = "USD";\n}\nconst acc = new Account();\nacc.deposit(100);\nconsole.log(acc.balance);\nconsole.log(Account.currency);` },
  { title: "Error Handling", subtitle: "try, catch, finally, and throw", language: "js", tags: ["errors"], theoryTopics: ["throw", "try/catch", "finally and error types"], codeTemplate: `function parseAge(value) {\n  const n = Number(value);\n  if (Number.isNaN(n)) throw new Error("Not a number");\n  return n;\n}\ntry {\n  console.log(parseAge("42"));\n  console.log(parseAge("abc"));\n} catch (err) {\n  console.log("caught: " + err.message);\n} finally {\n  console.log("done");\n}` },
  { title: "The DOM", subtitle: "document and querySelector", language: "js", tags: ["web"], theoryTopics: ["The document object", "querySelector", "textContent and innerHTML"], codeTemplate: `// Runs in a browser: document is the page's DOM root.\n// const el = document.querySelector("#title");\n// el.textContent = "Hello, DOM!";\nconsole.log("select elements with document.querySelector");` },
  { title: "Events", subtitle: "addEventListener and the event object", language: "js", tags: ["web"], theoryTopics: ["addEventListener", "Event objects", "Event delegation"], codeTemplate: `// In the browser: register a handler for a click.\n// btn.addEventListener("click", (event) => {\n//   console.log("clicked", event.target);\n// });\nconsole.log("events are handled with addEventListener");` },
  { title: "Timers & Callbacks", subtitle: "setTimeout, setInterval, and async basics", language: "js", tags: ["async"], theoryTopics: ["setTimeout", "setInterval", "Callback functions"], codeTemplate: `console.log("start");\nsetTimeout(() => console.log("later"), 0);\nconsole.log("end");\n// The event loop runs the timer callback after sync code.` },
  { title: "Promises", subtitle: "resolve, reject, then, catch", language: "js", tags: ["async"], theoryTopics: ["Promise states", "then and catch", "Promise.all"], codeTemplate: `const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconst fail = Promise.reject(new Error("nope"));\nfail.catch((err) => console.log("caught: " + err.message));\ndelay(0).then(() => console.log("resolved"));\nPromise.all([Promise.resolve(1), Promise.resolve(2)])\n  .then((vals) => console.log(vals));` },
  { title: "async/await", subtitle: "Write async code like it's sync", language: "js", tags: ["async"], theoryTopics: ["async functions", "await", "try/catch with await"], codeTemplate: `const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nconst work = async () => {\n  await delay(0);\n  return 42;\n};\nconst main = async () => {\n  try {\n    console.log(await work());\n  } catch (err) {\n    console.log(err.message);\n  }\n};\nmain();` },
  { title: "fetch & HTTP", subtitle: "Requests and responses", language: "js", tags: ["web"], theoryTopics: ["fetch basics", "Response objects", "Headers and status"], codeTemplate: `// In Node or the browser, fetch returns a promise:\n// const res = await fetch("https://api.example.com/data");\n// const data = await res.json();\nconsole.log("fetch returns a Promise<Response>");` },
  { title: "Modules", subtitle: "import and export", language: "js", tags: ["modules"], theoryTopics: ["export", "import", "Default vs named"], codeTemplate: `// modules/math.mjs\nexport const add = (a, b) => a + b;\nexport default function subtract(a, b) { return a - b; }\n\n// main.mjs\n// import subtract, { add } from "./math.mjs";\n// console.log(add(2, 3));\nconsole.log("use import/export to share code");` },
  { title: "Node.js Basics", subtitle: "process, fs, and npm", language: "js", tags: ["node"], theoryTopics: ["process object", "The fs module", "npm and package.json"], codeTemplate: `const fs = require("fs");\nconst text = "first line\\n";\nfs.writeFileSync("notes.txt", text);\nconsole.log(fs.readFileSync("notes.txt", "utf8").trim());\nconsole.log("Node version: " + process.version);` },
  { title: "The Event Loop", subtitle: "Microtasks, macrotasks, and order", language: "js", tags: ["async"], theoryTopics: ["Call stack", "Microtasks vs macrotasks", "Why order matters"], codeTemplate: `console.log("1");\nPromise.resolve().then(() => console.log("2"));\nsetTimeout(() => console.log("3"), 0);\nconsole.log("4");\n// Sync first, then microtasks, then timers: 1, 4, 2, 3` },
  { title: "TypeScript: Types", subtitle: "Annotations and inference", language: "js", tags: ["typescript"], theoryTopics: ["Type annotations", "Type inference", "Primitive types"], codeTemplate: `// TypeScript adds static types on top of JavaScript.\n// const greet = (name: string): string => "Hello, " + name;\n// let count: number = 5;\nconsole.log("TypeScript is JavaScript with types");` },
  { title: "TypeScript: Interfaces", subtitle: "Shape contracts for objects", language: "js", tags: ["typescript"], theoryTopics: ["Interface syntax", "Optional properties", "Interfaces vs types"], codeTemplate: `// interface User { name: string; age?: number; }\n// const user: User = { name: "Ada" };\nconsole.log("interfaces describe object shapes");` },
  { title: "TypeScript: Unions & Narrowing", subtitle: "Multiple types, one value", language: "js", tags: ["typescript"], theoryTopics: ["Union types", "Type narrowing", "type guards"], codeTemplate: `// let value: string | number = "hi";\n// if (typeof value === "string") {\n//   console.log(value.toUpperCase());\n// }\nconsole.log("unions allow multiple possible types");` },
  { title: "TypeScript: Generics", subtitle: "Types as parameters", language: "js", tags: ["typescript"], theoryTopics: ["Generic functions", "Generic types", "Constraints"], codeTemplate: `// function identity<T>(value: T): T { return value; }\n// const s = identity("hello");\n// const n = identity(42);\nconsole.log("generics reuse logic across types");` },
  { title: "Higher-Order Functions", subtitle: "Functions that take or return functions", language: "js", tags: ["functional"], theoryTopics: ["Callbacks", "Function composition", "Currying basics"], codeTemplate: `const applyTwice = (fn, value) => fn(fn(value));\nconst double = (x) => x * 2;\nconsole.log(applyTwice(double, 3));\nconst compose = (f, g) => (x) => f(g(x));\nconst add1 = (x) => x + 1;\nconsole.log(compose(double, add1)(4));` },
  { title: "Functional Style", subtitle: "Immutability and data pipelines", language: "js", tags: ["functional"], theoryTopics: ["Immutability", "Declarative pipelines", "Avoiding side effects"], codeTemplate: `const data = [3, 1, 4, 1, 5];\nconst result = data\n  .filter((n) => n % 2 === 1)\n  .map((n) => n * 10)\n  .reduce((sum, n) => sum + n, 0);\nconsole.log(result);\nconsole.log([...data].sort((a, b) => a - b));` },
  { title: "Capstone: Build Something Real", subtitle: "A CLI tool end to end", language: "js", tags: ["capstone"], theoryTopics: ["Project structure", "Reading arguments", "Writing files"], codeTemplate: `const fs = require("fs");\nconst args = process.argv.slice(2);\nconst notes = fs.existsSync("todo.json")\n  ? JSON.parse(fs.readFileSync("todo.json", "utf8"))\n  : [];\nnotes.push({ text: args.join(" ") || "build something real", done: false });\nfs.writeFileSync("todo.json", JSON.stringify(notes, null, 2));\nconsole.log(notes.length + " notes saved");` },
];

/* ─── Hand-written topic content ─── */

const JS_TOPIC_CONTENT: Record<string, string> = {
  "Why JavaScript": "JavaScript is the language of the web: every browser runs it natively, and Node.js brought it to servers, CLIs, and tooling. Its event-driven, non-blocking model is ideal for interactive UIs and I/O-heavy backends. It is also one of the most forgiving languages to start with — you can open DevTools and run code immediately — yet it scales to entire product codebases.",
  "The console": "`console.log(value)` writes to the developer console, your primary window into a running program. `console.error` and `console.warn` mark problems, `console.table` renders arrays and objects as tables, and `console.time`/`console.timeEnd` measure how long code takes. In Node, console output is just standard output; in the browser it appears in DevTools.",
  "Running scripts": "In the browser, JavaScript runs inside a `<script>` tag or a linked `.js` file. With Node.js installed, run a file with `node program.js` or execute one-liners with `node -e \"...\"`. There is no separate compile step — the engine parses and runs the source directly. Every major browser ships DevTools with a REPL for instant experimentation.",
  "let and const": "`let` declares a block-scoped, reassignable variable; `const` declares a block-scoped constant that cannot be reassigned (its object contents can still mutate). Prefer `const` by default and switch to `let` only when a value must change. This habit signals intent and prevents whole classes of accidental reassignment bugs.",
  "var and hoisting": "`var` is the legacy declaration: it is function-scoped, hoisted to the top of its scope (initialized as undefined), and ignores block boundaries. The hoisting behavior is why `var` surprises — you can reference a variable before its line. Modern code uses `let`/`const` exclusively; understanding `var` is about reading older code and interviews.",
  "Dynamic typing": "JavaScript variables are untyped — a name can hold a number, then a string, then an object. The engine infers and converts as needed. This flexibility is fast to write but shifts responsibility to you: accidental string/number mixing (like `\"5\" + 2`) produces surprising results, so use explicit checks and, in TypeScript, static annotations.",
  "The Number type": "JavaScript has one numeric type: `Number`, an IEEE 754 double-precision float. Integers up to 2^53-1 are exact; beyond that precision degrades. `42`, `3.14`, `-7`, and `1e6` are all Numbers. The type is shared by what other languages call int and float, which keeps the model simple but demands care with large values.",
  "Arithmetic operators": "The usual operators work: `+`, `-`, `*`, `/`, `%` (remainder), and `**` (exponent). Division always yields a float (`5 / 2 === 2.5`). Operator precedence follows math conventions — multiplication before addition — and parentheses override anything. Unary `+` coerces to a number (`+\"5\" === 5`).",
  "NaN and Infinity": "`NaN` (Not a Number) is the result of invalid numeric operations like `0 / 0` or `Number(\"abc\")`. Crucial quirk: `NaN !== NaN`, so test it with `Number.isNaN(x)` instead of `x === NaN`. `Infinity` and `-Infinity` come from overflow and division by zero. Both are real values with defined behavior, not crashes.",
  "Quoting styles": "Strings can use single quotes, double quotes, or backticks — all are strings, with no semantic difference between quote styles. Pick one and stay consistent (single quotes are common in JS, double in JSON). Backticks are special: they enable template literals with interpolation and multiline text.",
  "Template literals": "Backtick strings interpolate expressions with `${expr}` and span multiple lines: `` `Hello, ${name}!` ``. This reads far better than `\"Hello, \" + name + \"!\"`. Template literals also make building URLs, SQL, and HTML far less error-prone, and you can nest tagged templates for advanced formatting.",
  "Common string methods": "Strings are immutable — every method returns a new string. `toUpperCase()`/`toLowerCase()`, `trim()`, `slice(start, end)`, `split(sep)`, `replace()`, `includes()`, `startsWith()`, `padStart()`, and `charAt(i)` cover most needs. Indexing uses zero-based positions, and `length` is a property, not a method.",
  "Truthiness": "JavaScript coerces any value to a boolean in conditions. Falsy values are: `false`, `0`, `\"\"` (empty string), `null`, `undefined`, and `NaN`. Everything else — including `[]`, `{}`, and `\"0\"` — is truthy. This implicit conversion powers concise checks like `if (items.length)` or `name || \"default\"`.",
  "== vs ===": "`===` (strict equality) compares value and type without coercion; `==` (loose equality) coerces types first, so `0 == false` is true but `0 === false` is false. Strict equality has no surprises — always prefer it. The only place `==` is idiomatic is `x == null`, which matches both `null` and `undefined`.",
  "Logical operators": "`&&` (AND), `||` (OR), and `!` (NOT) operate on truthiness. `&&` returns the first falsy operand or the last value; `||` returns the first truthy operand or the last value; `!` flips to a boolean. This is why `name || \"anonymous\"` works: OR returns the fallback when name is falsy.",
  "if statements": "`if (condition) { ... }` runs its block when the condition is truthy. The braces are optional for a single statement but always recommended for clarity. Conditions are usually comparisons or truthiness checks; the block executes exactly when the test is true.",
  "else if chains": "`else if` checks alternatives in order: the first true condition wins and the rest are skipped. There is no limit to the number of `else if`s, and a final `else` catches everything unmatched. Order the most specific conditions first — the first match is the one that runs.",
  "The ternary operator": "`condition ? a : b` is an expression that evaluates to `a` when the condition is truthy and `b` otherwise. It is ideal for short value selections (`const status = ok ? \"yes\" : \"no\";`) but hurts readability when nested or long. When in doubt, use an if/else.",
  "Logical AND": "`a && b` evaluates left to right, returning `a` if it is falsy, otherwise `b`. Used for guarding: `user && user.name` safely reads a property only when user exists. Because evaluation short-circuits, the right side never runs when the left is falsy — the foundation of optional chaining.",
  "Logical OR": "`a || b` returns the first truthy operand, else `b`. It is the classic default-value idiom: `const port = process.env.PORT || 3000;`. Because it short-circuits, `b` is not evaluated when `a` is truthy. For defaults where `0` and `\"\"` are meaningful, prefer the nullish operator `??`.",
  "Short-circuit evaluation": "Both `&&` and `||` stop evaluating as soon as the result is determined. `false && anything` is false without evaluating `anything`; `true || anything` is true immediately. This enables safe patterns (`user && user.name`) and lazy defaults, and it means side effects on the right side may never run.",
  "switch syntax": "`switch (value)` compares `value` against each `case` using strict equality. The first matching case's body runs from that point until a `break`. A `default` case handles unmatched values. Switch is most readable with three or more constant cases; for dynamic logic, if/else or a lookup object is often better.",
  "break and fallthrough": "Without `break`, execution falls through to the next case — usually a bug, occasionally a feature (grouping several cases to the same handler). Modern style adds `break` to every case and flags intentional fallthrough with a comment. `return` inside a case also exits the surrounding function.",
  "When to prefer a map": "A plain object or `Map` can replace many switches: define `const handlers = { add: () => ..., del: () => ... }` and call `handlers[cmd]()`. Lookups are O(1), there is no fallthrough to manage, and the mapping is data you can inspect and extend. Reach for a map when you have several unrelated branches.",
  "Creating arrays": "Arrays are ordered, zero-indexed collections: `[]` is empty, `[1, 2, 3]` is a literal, and `Array.from(iterable)` or `[...set]` convert other iterables. Arrays can hold mixed types, including other arrays. `length` tracks the highest index plus one, and `Array.isArray(x)` is the reliable type test.",
  "Indexing and length": "Elements are accessed by index: `arr[0]` is the first, `arr[arr.length - 1]` the last. Negative indices are NOT automatic (unlike Python) — `arr[-1]` is undefined. Out-of-range reads return `undefined` rather than throwing. `length` is writable and can be used to truncate an array.",
  "push, pop, shift, unshift": "`push(x)` appends to the end and `pop()` removes the end; `shift()` removes the front and `unshift(x)` adds to the front. All except `pop`/`shift` return the new length or removed element accordingly. Front operations are O(n) — prefer `push`/`pop` for performance and use a queue or index otherwise.",
  "map": "`arr.map(fn)` returns a NEW array where each element is replaced by `fn(element, index)`. It never mutates the original — it is the idiomatic transform. `map` is for one-to-one transformations; if you also drop elements, use `flatMap` or combine with `filter`.",
  "filter": "`arr.filter(fn)` returns a new array with only the elements for which `fn` returns truthy. It preserves order and never mutates. Chaining `filter(...).map(...)` builds declarative pipelines that read top-to-bottom like a description of the result.",
  "reduce": "`arr.reduce(fn, initial)` folds an array into a single value. The callback receives `(accumulator, element)` and returns the next accumulator; `initial` seeds it. Sums, products, counts, and group-bys are all reduce. It is the most powerful and least readable array method — reach for it last, after map/filter.",
  "for loops": "`for (let i = 0; i < n; i++)` is the classic counter loop: initialize, test, step. It is ideal when you need the index or must control the step. Today, prefer `for...of` for iterating values; reserve the index form for cases that genuinely need positions or custom stepping.",
  "while loops": "`while (condition) { ... }` repeats while the condition stays truthy, testing before each iteration. Pair with a counter or a `break`. A `do...while` runs the body once before testing — rare, but correct for 'ask at least once' flows. Watch for infinite loops: ensure the condition eventually becomes false.",
  "for...of and for...in": "`for (const x of iterable)` iterates VALUES over any iterable (arrays, strings, Maps, Sets). `for (const key in obj)` iterates enumerable KEYS, including inherited ones — almost always the wrong tool for objects; prefer `Object.keys`/`Object.entries`. Use `for...of` for arrays and `for...in` only when you truly want keys.",
  "Function declarations": "`function name(params) { ... }` defines a hoisted function — it is available before its declaration line, enabling calls earlier in the file. Declarations are the clearest form for named, reusable logic. The function's `this` and `arguments` depend on how it is called.",
  "Function expressions": "`const add = function (a, b) { ... };` assigns an anonymous function to a variable. Unlike declarations, expressions are not hoisted — the variable is undefined until the assignment runs. Use expressions when a function is created conditionally or passed inline; the assignment makes the data flow explicit.",
  "Return values": "`return` hands a value back to the caller and immediately exits the function. Without a return, a function returns `undefined`. Early returns are the cleanest guard pattern: validate input, return early on failure, then run the happy path. Return objects/tuples when you need multiple results.",
  "Arrow syntax": "`const fn = (a, b) => ...` is the concise function form. With one parameter, parens are optional (`x => x * 2`); with an expression body, the result is returned implicitly. Braces switch it to a statement body that needs an explicit `return`. Arrows are the default choice for callbacks and small helpers.",
  "Implicit returns": "An arrow with an expression body returns that expression automatically: `(x) => x * x`. This is the terse, preferred style for callbacks like `arr.map(x => x + 1)`. When the body is a block `{ ... }`, there is NO implicit return — you must write `return` yourself.",
  "Lexical this": "Arrow functions capture `this` from their enclosing scope at definition time — they have no own `this`. Regular functions bind `this` based on how they are called. This is why callbacks written as arrows inside methods see the outer object: `setTimeout(() => this.update(), 100)` keeps the method's `this`.",
  "Default parameters": "Parameters can declare defaults: `function greet(name = \"friend\")`. The default applies only when the argument is `undefined` (or omitted). Defaults are evaluated at call time, so they can reference earlier parameters: `(a, b = a * 2)`. They reduce the need for `name || \"friend\"` fallbacks.",
  "Rest parameters": "`function total(...nums)` collects remaining arguments into an array. Rest must be the last parameter. It replaces the old `arguments` object with a real array you can map/filter/reduce. Prefer explicit parameters when you know the arity; use rest for variadic helpers.",
  "Spread syntax": "`...arr` spreads an iterable into individual elements: `Math.max(...nums)`, `[...a, ...b]` concatenates, `{ ...obj }` shallow-copies, and `f(...args)` forwards arguments. Spread is the modern way to copy and combine — it is a syntax operation, not a function, so it works anywhere an array or object literal does.",
  "Block scope": "`let` and `const` are scoped to the nearest block `{ ... }` — an if, loop, or standalone block. Variables are not visible outside their block, which prevents name collisions and accidental reuse. This is a major safety improvement over `var`, which leaks out of blocks to the function scope.",
  "Closures": "A closure is a function that retains access to the variables of the scope where it was defined, even after that scope returns. Each call to a factory gets its own captured state — `makeCounter` returns a function that remembers its private `count`. Closures enable data hiding, factories, and callbacks that carry context.",
  "The module pattern": "Wrap state and functions in an IIFE (or module) and return only the public interface: the closure hides internals and exposes a minimal API. This is how you get private state in JavaScript without classes. The pattern underlies factory functions, memoization, and React hooks.",
  "Object literals": "`{ key: value }` creates an object. Keys are strings (or Symbols); values can be any type, including functions and other objects. Shorthand `{ name }` means `{ name: name }`. Objects are the universal data container in JS — records, maps, and instances all start as literals.",
  "Dot vs bracket access": "`obj.key` is the readable form but requires a valid identifier as the literal key. `obj[\"key\"]` or `obj[expression]` handles dynamic and unusual keys — `user[fieldName]`. Bracket access with a string literal is useful when keys contain spaces, dashes, or come from data.",
  "Spread and Object.assign": "`{ ...obj }` shallow-copies own enumerable properties into a new object; `Object.assign(target, ...sources)` does the same imperatively. Both are shallow — nested objects are shared, not cloned. Spread is the modern idiom for immutable updates: `{ ...user, age: 37 }` creates a new object with one field changed.",
  "Method shorthand": "`{ greet() { ... } }` is shorthand for `{ greet: function () { ... } }`. It reads like a class method and is the idiomatic way to attach behavior to an object. Inside, `this` refers to the object when the method is called as `obj.greet()`.",
  "What this refers to": "`this` is bound by the call site, not the definition: `obj.method()` gives `this = obj`; a bare `method()` (or `const f = obj.method; f()`) gives `this = undefined` in strict mode. Arrows ignore this entirely and inherit from the enclosing scope. Understanding the call site is the whole game.",
  "Arrow vs function this": "Regular functions get `this` from how they are called; arrows capture `this` from where they are defined. Inside an object method, an inner arrow keeps the method's `this`, while a regular function inside would rebind it. Choose arrows for callbacks; choose `function` when you want dynamic `this`.",
  "Array destructuring": "`const [a, b] = arr` unpacks array elements into variables by position. You can skip slots (`[a, , c]`), grab the rest (`[first, ...rest]`), and use defaults (`[x = 1]`). It makes swaps and multiple returns concise: `[a, b] = [b, a]`.",
  "Object destructuring": "`const { name, age } = obj` pulls properties into variables by key name. Rename with `{ name: n }`, default with `{ age = 18 }`, and nest for deeper paths. It is the idiomatic way to take just the fields you need from a config or API response.",
  "Renaming and defaults": "In object destructuring, `{ originalName: localName }` renames, and `= default` supplies a fallback when the value is `undefined`. Combine both: `{ age: years = 18 }`. Defaults only trigger on `undefined`, not on `null`, mirroring default parameters.",
  "JSON.stringify": "`JSON.stringify(value)` serializes a value to a JSON string. Objects, arrays, strings, numbers, booleans, and null serialize; functions, undefined, and Symbols are omitted in objects. The result is compact and portable — the standard format for APIs, storage, and config.",
  "JSON.parse": "`JSON.parse(text)` parses a JSON string back into a value. It throws on malformed input, so wrap it in try/catch when parsing untrusted data. Dates serialize as strings (no native date type in JSON), and object keys are always strings after a round trip.",
  "JSON as the data lingua franca": "JSON is text — every language can produce and consume it, which makes it the universal interchange format for web APIs, config files, and cross-language storage. JavaScript reads and writes it natively with `JSON.parse`/`JSON.stringify`, which is why it dominates frontend and Node work.",
  "Map": "`new Map()` is a keyed collection accepting ANY value as a key (objects included), preserving insertion order, with O(1) `get`/`set`/`has`/`delete` and a `.size`. Unlike plain objects, Maps are not limited to string keys and avoid prototype pollution surprises. Use a Map for dynamic keyed data.",
  "Set": "`new Set(iterable)` stores unique values with O(1) `has`/`add`/`delete`. It deduplicates automatically — `[...new Set([1,1,2])]` is `[1,2]` — and supports iteration. Sets are the fastest way to answer 'have I seen this before?' and to compute unions/intersections via filtering.",
  "When to use them": "Use `Map` when keys are dynamic, non-string, or unknown at authoring time; use `Set` for membership tests and dedup. Use a plain object for fixed-shape records with known keys. This split keeps data structures aligned with how you access them and avoids accidental `hasOwnProperty` pitfalls.",
  "Class syntax": "`class Name { ... }` is syntactic sugar over the prototype system, giving a familiar OOP shape: a `constructor` runs on `new`, and methods are shared via the prototype. Classes are first-class — they can be extended, stored, and passed around. Fields can be declared directly on the class body.",
  "The constructor": "The `constructor` method runs once when `new Name(args)` creates an instance. It typically initializes fields via `this.prop = value`. If you don't define one, a default empty constructor is used. `super(...)` inside a subclass constructor calls the parent's constructor.",
  "Instance methods": "Methods defined in the class body are shared across instances (stored on the prototype) and receive `this` bound to the instance when called as `instance.method()`. Each instance keeps its own field values; the methods are the same functions. This is memory-efficient and the idiomatic way to give instances behavior.",
  "extends": "`class Dog extends Animal` makes Dog a subclass: it inherits the parent's methods and can override them. `extends` sets up the prototype chain, so `new Dog() instanceof Animal` is true. Subclasses add or refine behavior while reusing the parent's contract.",
  "super()": "Inside a subclass constructor, you must call `super(...)` before using `this` — it invokes the parent constructor and establishes the instance. `super.method()` calls the parent's version of an overridden method, enabling 'extend then refine' patterns.",
  "Overriding methods": "Define a method with the same name as the parent to replace its behavior. Call `super.method(...)` to run the parent logic and layer on more. Overriding changes behavior for all instances of the subclass while leaving the parent intact — the foundation of polymorphism.",
  "get and set": "`get name()` and `set name(v)` define accessor properties: reading `obj.name` runs the getter, assigning runs the setter. This lets you validate or compute on access while keeping a plain property interface. Getters are also the idiomatic way to expose derived values.",
  "static members": "`static` properties and methods live on the class itself, not instances: `Account.currency`, `Math.max`. Call them via the class name. Statics are for class-level utilities and shared configuration — things that don't vary per instance.",
  "Private fields": "A `#field` is truly private to the class — inaccessible from outside, enforced by the engine. This is real encapsulation, unlike the convention of `_underscore` names. Private fields and methods let you expose a clean public API while hiding implementation details.",
  "throw": "`throw new Error(\"message\")` raises an exception and unwinds the call stack until a `try/catch` handles it. Throwing is how code signals 'this cannot continue' — invalid input, failed invariants, missing resources. The thrown value is usually an Error so it carries a stack trace and message.",
  "try/catch": "`try { risky() } catch (err) { handle(err) }` runs the risky block and, if anything throws, jumps to `catch` with the error. The program survives instead of crashing. `catch` without a parameter is legal in modern JS but usually you want the error object to report or handle it.",
  "finally and error types": "`finally { ... }` always runs — after try succeeds or catch handles — for cleanup like closing files or clearing timers. Errors are still regular values: `Error` has `.message` and `.stack`; built-in types like `TypeError`, `RangeError`, and `SyntaxError` subclass it. `instanceof` distinguishes them.",
  "The document object": "`document` is the browser's entry point to the page: it represents the DOM tree and exposes methods to find and modify elements. `document.querySelector(\"selector\")` returns the first match, `querySelectorAll` returns all, `createElement` builds new nodes, and `body`/`head` reach the top-level elements.",
  "querySelector": "`document.querySelector(\"#title\")` finds the first element matching a CSS selector — ids, classes, tags, attributes, and combinators all work. It returns `null` when nothing matches, so guard before using the result. It is the single most useful DOM lookup method.",
  "textContent and innerHTML": "`el.textContent = \"hello\"` sets plain text safely — any markup is escaped, never parsed as HTML. `el.innerHTML = \"<b>hi</b>\"` parses HTML but is an XSS risk with untrusted input. Prefer `textContent` for user data; reserve `innerHTML` for trusted, controlled strings.",
  "addEventListener": "`el.addEventListener(\"click\", handler)` registers a function to run when the named event fires on the element. Handlers receive an `event` object with `target`, `type`, and methods like `preventDefault()`. `removeEventListener` detaches it. It is the standard, non-invasive way to attach behavior.",
  "Event objects": "Every event delivers an object with properties: `type` (the event name), `target` (the element that fired it), `currentTarget` (where the listener is attached), and type-specific fields like `key` for keyboards or `clientX` for mice. `preventDefault()` cancels default behavior; `stopPropagation()` halts bubbling.",
  "Event delegation": "Attach ONE listener to a container and read `event.target` to decide what it handled: `list.addEventListener(\"click\", e => { if (e.target.matches(\".item\")) ... })`. This works for any number of children and future ones — efficient and robust. It exploits event bubbling.",
  "setTimeout": "`setTimeout(fn, ms)` schedules `fn` to run after at least `ms` milliseconds. It returns a handle you can cancel with `clearTimeout(handle)`. The delay is a minimum, not a guarantee — the event loop may be busy. Timers are the foundation of debouncing and simple scheduling.",
  "setInterval": "`setInterval(fn, ms)` runs `fn` every `ms` until cleared with `clearInterval(handle)`. Be careful: callbacks can overlap if the work takes longer than the interval. For UI and animations, `requestAnimationFrame` is often better. Intervals power clocks, polls, and periodic checks.",
  "Callback functions": "A callback is a function passed to another function to be invoked later — the core of async JS before Promises. `fs.readFile(path, cb)`, `addEventListener(type, cb)`, and `setTimeout(cb, ms)` are all callback APIs. Callbacks work but nest poorly ('callback hell'); Promises and async/await flatten the same flow.",
  "Promise states": "A Promise is pending, fulfilled, or rejected — exactly one transition, forever. `new Promise((resolve, reject) => ...)` starts it; `resolve(value)` fulfills, `reject(err)` rejects. `then` attaches fulfillment handlers, `catch` handles rejection, `finally` runs either way. A settled Promise never changes again.",
  "then and catch": "`promise.then(onOk, onErr)` runs `onOk` when fulfilled and `onErr` when rejected; `promise.catch(onErr)` only handles rejection. Both return NEW promises, so you can chain transformations. Errors in `then` handlers flow into the next `catch`. Prefer `.then().catch()` over the two-argument form for clarity.",
  "Promise.all": "`Promise.all([p1, p2])` resolves when ALL input promises resolve, with an array of results, or rejects as soon as ANY rejects. It is the standard way to run independent async work in parallel. `Promise.allSettled` waits for all regardless of outcome; `Promise.race` settles on the first to settle.",
  "async functions": "Declaring a function `async` makes it always return a Promise — even a `return 42` becomes a resolved Promise. Inside, `await` pauses until a Promise settles. Async functions turn promise chains into readable, synchronous-looking code and make errors flow into try/catch naturally.",
  "await": "`await promise` pauses the async function until the promise settles, then yields the fulfilled value (or throws the rejection into the nearest catch). It only works inside async functions. Awaiting sequential work is fine; for parallel work, `const [a, b] = await Promise.all([pa, pb])`.",
  "try/catch with await": "An `await` that rejects throws, so wrap awaited calls in try/catch to handle failures: `try { const data = await fetchJson(url) } catch { fallback() }`. This is the readable equivalent of `.catch()`. Pair it with `finally` for cleanup that must run whether it succeeded or not.",
  "fetch basics": "`fetch(url, options)` returns a Promise resolving to a Response. The Response exposes `res.ok`, `res.status`, `res.headers`, and body methods like `res.json()`, `res.text()`. Fetch is built into browsers and Node 18+, making it the default HTTP client for modern JS.",
  "Response objects": "A fetch Response wraps the server reply: `status`/`ok` tell you success, `headers` gives the response headers, and the body is consumed once via `json()`, `text()`, `arrayBuffer()`, or streams. Check `res.ok` explicitly — fetch only rejects on network errors, not on HTTP 4xx/5xx.",
  "Headers and status": "Requests set headers in the options object; responses read them from `res.headers`. Status codes follow HTTP: 2xx success, 3xx redirect, 4xx client error, 5xx server error. `res.ok` is true only for 200–299. `res.status` gives the raw number when you need to branch on specific codes.",
  "export": "`export const name = ...` and `export default value` expose code to other modules. Named exports match by name on import; a module has at most one default export. Exports make your public API explicit — only what you export is visible to importers.",
  "import": "`import { add } from \"./math.mjs\"` pulls named exports; `import subtract from \"./math.mjs\"` pulls the default; `import * as m from \"...\"` grabs everything as a namespace. Imports are static (hoisted, analyzable) and top-level. Relative paths reference local files; bare specifiers resolve to packages.",
  "Default vs named": "Named exports (`export const x`) enable multiple exports per module and tree-shaking-friendly imports (`import { x }`). The default export (`export default x`) is the module's primary value — a function or class — imported without braces. Use both deliberately: named for the API surface, default for the main export.",
  "process object": "`process` is Node's global for the running program: `process.argv` holds CLI arguments, `process.env` environment variables, `process.version` the Node version, `process.exit(code)` ends the process, and `process.cwd()` the working directory. It is the bridge between your script and the operating system.",
  "The fs module": "`fs` is Node's file-system API. Synchronous methods (`fs.readFileSync`, `writeFileSync`) block and are simple; async versions (`fs.readFile`) take callbacks or return Promises. `fs.existsSync` checks existence, `fs.mkdirSync` creates directories. In a server, prefer the async forms to avoid blocking the event loop.",
  "npm and package.json": "`npm init` creates a `package.json` declaring name, version, scripts, and dependencies. `npm install pkg` adds a dependency; `npm run <script>` runs defined scripts. package.json is the source of truth for a project's tooling — reproducible installs rely on it plus the lockfile.",
  "Call stack": "The call stack is the list of currently executing functions; JavaScript runs one thing at a time — single-threaded. When a function calls another, a frame is pushed; on return it pops. Long-running synchronous work blocks everything else. Async operations defer work until the stack clears.",
  "Microtasks vs macrotasks": "Microtasks (Promise `.then` callbacks, `queueMicrotask`) run after the current stack empties, before the next macrotask. Macrotasks (timers, I/O, events) run in later turns of the loop. This ordering is why `1, 4, 2, 3` prints from sync, microtask, timer code.",
  "Why order matters": "The event loop's ordering — sync code, then microtasks, then macrotasks — determines when callbacks run and in what sequence. Code that assumes a timer fires 'immediately' is wrong; the delay is a minimum. Understanding this ordering prevents subtle race conditions in async applications.",
  "Type annotations": "TypeScript lets you annotate variables, parameters, and returns: `const n: number = 5`, `function f(s: string): boolean`. Annotations are compile-time only — erased at runtime — and they catch bugs before the code runs. Together with inference, they document intent in the code itself.",
  "Type inference": "TypeScript infers types when you omit annotations: `let x = 5` is `number`, `const add = (a, b) => a + b` infers from parameter context. Inference keeps code concise while retaining safety. You write annotations where inference cannot decide or where they improve readability.",
  "Primitive types": "TypeScript's primitive types mirror JS: `string`, `number`, `boolean`, plus `null`, `undefined`, `bigint`, and `symbol`. `any` opts out of checking (avoid it), `unknown` is the safe 'any' (requires narrowing), `void` marks functions that return nothing, and `never` marks unreachable code.",
  "Interface syntax": "`interface User { name: string; age?: number }` describes an object's shape as a contract. Any value matching the shape is assignable — TypeScript uses structural typing, so shape, not class identity, matters. Interfaces can extend others (`interface Admin extends User`) and are the idiomatic way to type objects.",
  "Optional properties": "A `?` marks a property as optional: `age?: number` means it may be absent (its type is effectively `number | undefined`). Access optional properties carefully — read them via `?.` and check before use. Optional fields model configs and partial records well.",
  "Interfaces vs types": "Both `interface` and `type` can describe object shapes; interfaces support declaration merging and are preferred for objects and OOP; `type` aliases handle unions, intersections, primitives, and tuples. Modern guidance: use `interface` for objects you might extend, `type` for everything else.",
  "Union types": "`string | number` means a value can be one of several types. Unions model flexible inputs and are checked at compile time. To use a union value, you usually narrow it first — test `typeof`, `Array.isArray`, or a discriminant property to tell the compiler which branch you are in.",
  "Type narrowing": "Narrowing is how TypeScript refines a union to a specific type: `typeof x === \"string\"` shrinks `string | number` to `string` inside the block; `if (\"name\" in obj)` narrows objects; `if (user instanceof User)` narrows classes. Narrowing turns runtime checks into type-safe code paths.",
  "type guards": "A type guard is a function whose return type is a type predicate: `function isDog(a: Animal): a is Dog { return a.kind === \"dog\"; }`. Calling it inside an `if` narrows the value for the rest of the scope. Guards package a narrowing check for reuse across a codebase.",
  "Generic functions": "`function identity<T>(value: T): T` declares a type parameter `T` that is fixed at the call site — `identity<string>(\"hi\")` or inferred as `identity(\"hi\")`. Generics let you write logic once that is type-safe for many types, instead of duplicating or falling back to `any`.",
  "Generic types": "Generic types parameterize data structures and interfaces: `interface Box<T> { value: T }`, `type Result<T> = { ok: true; data: T } | { ok: false; error: string }`. Collections like `Array<T>` and `Promise<T>` are generic. This is how TypeScript models containers that hold any type safely.",
  "Constraints": "`function f<T extends HasLength>(x: T)` constrains a type parameter to a shape — here anything with a `.length`. Constraints let generic code safely access properties that the type parameter must have, balancing generality with the guarantee that you only use what is declared.",
  "Callbacks": "Passing a function as an argument is the fundamental composition technique: `[1,2,3].map(x => x * 2)`, `addEventListener`, `Array.prototype.sort(compareFn)`. Callbacks let higher-order functions delegate behavior, so one piece of generic machinery serves many specific uses.",
  "Function composition": "Composition chains functions so the output of one feeds the next: `compose(f, g)(x) === f(g(x))`. It models data flow as a pipeline — read, transform, aggregate. Composition is the declarative alternative to nested calls and is at the heart of functional design.",
  "Currying basics": "Currying converts a multi-argument function into a chain of single-argument functions: `add(1)(2)`. It enables partial application — pre-fill some arguments and reuse the rest — and plays well with composition. You don't need to curry everything; it shines in configurable factories and pipelines.",
  "Immutability": "Immutable data is never modified after creation; updates produce new values (`{ ...obj, x: 1 }`, `[...arr, item]`). Immutability makes state predictable, enables cheap equality checks, and avoids whole classes of aliasing bugs. JavaScript encourages it by convention since mutation is allowed.",
  "Declarative pipelines": "Chain array methods to describe WHAT you want, not HOW to build it: `data.filter(pred).map(transform).reduce(combine)`. Each step is a pure transformation; the pipeline reads top-to-bottom as a spec of the result. This is the idiomatic, testable style for data processing.",
  "Avoiding side effects": "A pure function returns the same output for the same input and touches nothing outside its scope — no globals, no I/O, no mutation of arguments. Purity makes functions predictable and testable in isolation. Keep side effects at the edges (I/O, rendering) and keep the core logic pure.",
  "Project structure": "A real project separates concerns: entry point, modules for domain logic, data access, and utilities. In Node, `main` in package.json points to the entry; scripts automate build/test/run. Clear structure makes a project navigable — one file per responsibility, imports at the top, small focused functions.",
  "Reading arguments": "`process.argv.slice(2)` captures CLI arguments as strings: `node app.js hello world` yields `[\"hello\", \"world\"]`. Parse them — options like `--port 3000`, flags, and positionals — before use. Argument parsing turns a script into a usable tool that takes inputs from the command line.",
  "Writing files": "`fs.writeFileSync(path, data)` writes text or buffers synchronously; the async `fs.writeFile` returns a Promise. Create parent directories with `fs.mkdirSync(dir, { recursive: true })`. Persisting to files is how CLI tools store state — config, logs, notes, and caches.",
};

/* ─── Quiz map ─── */

const JS_QUIZ_MAP: Record<string, { q: string; opts: { id: string; text: string; correct?: boolean }[] }> = {
  "let and const": {
    q: "Which declaration is reassignable but block-scoped?",
    opts: [
      { id: "a", text: "let", correct: true },
      { id: "b", text: "const", correct: false },
      { id: "c", text: "var", correct: false },
      { id: "d", text: "static", correct: false },
    ],
  },
  "Dynamic typing": {
    q: "What type does a JavaScript variable have?",
    opts: [
      { id: "a", text: "Whatever type the value it holds has", correct: true },
      { id: "b", text: "A fixed type declared at creation", correct: false },
      { id: "c", text: "Always number", correct: false },
      { id: "d", text: "Always string", correct: false },
    ],
  },
  "The Number type": {
    q: "JavaScript's only numeric type is:",
    opts: [
      { id: "a", text: "Number (IEEE 754 double)", correct: true },
      { id: "b", text: "int and float", correct: false },
      { id: "c", text: "BigInt only", correct: false },
      { id: "d", text: "Decimal", correct: false },
    ],
  },
  "NaN and Infinity": {
    q: "How do you test whether a value is NaN?",
    opts: [
      { id: "a", text: "Number.isNaN(x)", correct: true },
      { id: "b", text: "x === NaN", correct: false },
      { id: "c", text: "x == NaN", correct: false },
      { id: "d", text: "typeof x === \"NaN\"", correct: false },
    ],
  },
  "Template literals": {
    q: "What does `` `Hi, ${name}!` `` do?",
    opts: [
      { id: "a", text: "Interpolates the value of name", correct: true },
      { id: "b", text: "Escapes name", correct: false },
      { id: "c", text: "Returns a number", correct: false },
      { id: "d", text: "Concatenates two arrays", correct: false },
    ],
  },
  "Truthiness": {
    q: "Which of these is falsy in JavaScript?",
    opts: [
      { id: "a", text: "0", correct: true },
      { id: "b", text: "[]", correct: false },
      { id: "c", text: "\"0\"", correct: false },
      { id: "d", text: "{}", correct: false },
    ],
  },
  "== vs ===": {
    q: "Why prefer === over ==?",
    opts: [
      { id: "a", text: "It compares without type coercion", correct: true },
      { id: "b", text: "It is faster on all engines", correct: false },
      { id: "c", text: "It checks object identity", correct: false },
      { id: "d", text: "It works only with numbers", correct: false },
    ],
  },
  "switch syntax": {
    q: "switch compares its value to each case using:",
    opts: [
      { id: "a", text: "Strict equality (===)", correct: true },
      { id: "b", text: "Loose equality (==)", correct: false },
      { id: "c", text: "typeof matching", correct: false },
      { id: "d", text: "Object identity", correct: false },
    ],
  },
  "map": {
    q: "What does arr.map(fn) return?",
    opts: [
      { id: "a", text: "A new array with fn applied to each element", correct: true },
      { id: "b", text: "The original array mutated", correct: false },
      { id: "c", text: "A single reduced value", correct: false },
      { id: "d", text: "A filtered subset", correct: false },
    ],
  },
  "reduce": {
    q: "arr.reduce(fn, initial) folds the array into:",
    opts: [
      { id: "a", text: "A single value", correct: true },
      { id: "b", text: "A new array of the same length", correct: false },
      { id: "c", text: "Two arrays", correct: false },
      { id: "d", text: "A boolean", correct: false },
    ],
  },
  "for...of and for...in": {
    q: "for (const x of arr) iterates over:",
    opts: [
      { id: "a", text: "The values of arr", correct: true },
      { id: "b", text: "The keys of arr", correct: false },
      { id: "c", text: "The length of arr", correct: false },
      { id: "d", text: "Indices plus values", correct: false },
    ],
  },
  "Function declarations": {
    q: "Function declarations are hoisted, which means:",
    opts: [
      { id: "a", text: "You can call them before their declaration", correct: true },
      { id: "b", text: "They cannot be named", correct: false },
      { id: "c", text: "They run at import time", correct: false },
      { id: "d", text: "They return a Promise", correct: false },
    ],
  },
  "Arrow syntax": {
    q: "What does (x) => x * x return when given 5?",
    opts: [
      { id: "a", text: "25", correct: true },
      { id: "b", text: "10", correct: false },
      { id: "c", text: "5", correct: false },
      { id: "d", text: "undefined", correct: false },
    ],
  },
  "Lexical this": {
    q: "Where does an arrow function get its this from?",
    opts: [
      { id: "a", text: "Its enclosing scope at definition time", correct: true },
      { id: "b", text: "The object it is called on", correct: false },
      { id: "c", text: "The global object always", correct: false },
      { id: "d", text: "A runtime call-site argument", correct: false },
    ],
  },
  "Rest parameters": {
    q: "function f(...nums) — what is nums?",
    opts: [
      { id: "a", text: "An array of the remaining arguments", correct: true },
      { id: "b", text: "A string of arguments", correct: false },
      { id: "c", text: "The first argument", correct: false },
      { id: "d", text: "A Set", correct: false },
    ],
  },
  "Closures": {
    q: "A closure is a function that:",
    opts: [
      { id: "a", text: "Remembers variables from its defining scope", correct: true },
      { id: "b", text: "Runs immediately", correct: false },
      { id: "c", text: "Has no arguments", correct: false },
      { id: "d", text: "Is defined inside a class only", correct: false },
    ],
  },
  "Dot vs bracket access": {
    q: "When must you use bracket access obj[\"key\"]?",
    opts: [
      { id: "a", text: "When the key is dynamic or not a valid identifier", correct: true },
      { id: "b", text: "Always", correct: false },
      { id: "c", text: "Only for numbers", correct: false },
      { id: "d", text: "Never in modern JS", correct: false },
    ],
  },
  "What this refers to": {
    q: "In obj.method(), what is this?",
    opts: [
      { id: "a", text: "obj", correct: true },
      { id: "b", text: "The global object", correct: false },
      { id: "c", text: "undefined always", correct: false },
      { id: "d", text: "The method itself", correct: false },
    ],
  },
  "Object destructuring": {
    q: "const { name } = user assigns:",
    opts: [
      { id: "a", text: "user.name to a variable named name", correct: true },
      { id: "b", text: "The whole user object", correct: false },
      { id: "c", text: "An array of values", correct: false },
      { id: "d", text: "Nothing (syntax error)", correct: false },
    ],
  },
  "JSON.stringify": {
    q: "What does JSON.stringify({a: 1}) return?",
    opts: [
      { id: "a", text: "The string {\"a\":1}", correct: true },
      { id: "b", text: "The object {a: 1}", correct: false },
      { id: "c", text: "A Promise", correct: false },
      { id: "d", text: "A number", correct: false },
    ],
  },
  "Map": {
    q: "Which collection allows ANY value as a key?",
    opts: [
      { id: "a", text: "Map", correct: true },
      { id: "b", text: "A plain object", correct: false },
      { id: "c", text: "An array", correct: false },
      { id: "d", text: "A string", correct: false },
    ],
  },
  "Set": {
    q: "What does [...new Set([1, 1, 2])] produce?",
    opts: [
      { id: "a", text: "[1, 2]", correct: true },
      { id: "b", text: "[1, 1, 2]", correct: false },
      { id: "c", text: "[1]", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "The constructor": {
    q: "When does a class constructor run?",
    opts: [
      { id: "a", text: "When new Name() creates an instance", correct: true },
      { id: "b", text: "When the class is defined", correct: false },
      { id: "c", text: "On every method call", correct: false },
      { id: "d", text: "When the module loads", correct: false },
    ],
  },
  "super()": {
    q: "In a subclass constructor, super(...) must be called:",
    opts: [
      { id: "a", text: "Before using this", correct: true },
      { id: "b", text: "After the subclass logic", correct: false },
      { id: "c", text: "Never", correct: false },
      { id: "d", text: "Only in arrow functions", correct: false },
    ],
  },
  "static members": {
    q: "How do you access a static member?",
    opts: [
      { id: "a", text: "Via the class name (Account.currency)", correct: true },
      { id: "b", text: "Via an instance (this.currency)", correct: false },
      { id: "c", text: "Via the prototype only", correct: false },
      { id: "d", text: "Statics are not accessible", correct: false },
    ],
  },
  "throw": {
    q: "What does throw do?",
    opts: [
      { id: "a", text: "Raises an exception that unwinds the stack", correct: true },
      { id: "b", text: "Stops the program silently", correct: false },
      { id: "c", text: "Returns from the function", correct: false },
      { id: "d", text: "Logs a warning", correct: false },
    ],
  },
  "querySelector": {
    q: "What does document.querySelector(\"#title\") return?",
    opts: [
      { id: "a", text: "The first element matching the selector", correct: true },
      { id: "b", text: "An array of all matches", correct: false },
      { id: "c", text: "The document itself", correct: false },
      { id: "d", text: "A CSS stylesheet", correct: false },
    ],
  },
  "addEventListener": {
    q: "What does el.addEventListener(\"click\", handler) do?",
    opts: [
      { id: "a", text: "Runs handler whenever click fires on el", correct: true },
      { id: "b", text: "Triggers a click immediately", correct: false },
      { id: "c", text: "Replaces the element's content", correct: false },
      { id: "d", text: "Adds a CSS class", correct: false },
    ],
  },
  "setTimeout": {
    q: "setTimeout(fn, 1000) runs fn:",
    opts: [
      { id: "a", text: "After at least 1000ms", correct: true },
      { id: "b", text: "Exactly at 1000ms", correct: false },
      { id: "c", text: "Immediately", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "Promise states": {
    q: "The three states of a Promise are:",
    opts: [
      { id: "a", text: "pending, fulfilled, rejected", correct: true },
      { id: "b", text: "start, done, error", correct: false },
      { id: "c", text: "open, closed, waiting", correct: false },
      { id: "d", text: "new, run, stop", correct: false },
    ],
  },
  "Promise.all": {
    q: "Promise.all resolves when:",
    opts: [
      { id: "a", text: "All input promises resolve", correct: true },
      { id: "b", text: "Any one resolves", correct: false },
      { id: "c", text: "The first settles", correct: false },
      { id: "d", text: "It never rejects", correct: false },
    ],
  },
  "async functions": {
    q: "An async function always returns:",
    opts: [
      { id: "a", text: "A Promise", correct: true },
      { id: "b", text: "A number", correct: false },
      { id: "c", text: "A string", correct: false },
      { id: "d", text: "undefined", correct: false },
    ],
  },
  "fetch basics": {
    q: "What does fetch(url) return?",
    opts: [
      { id: "a", text: "A Promise resolving to a Response", correct: true },
      { id: "b", text: "The response body directly", correct: false },
      { id: "c", text: "A WebSocket", correct: false },
      { id: "d", text: "A string", correct: false },
    ],
  },
  "import": {
    q: "How do you import a named export?",
    opts: [
      { id: "a", text: "import { add } from \"./math.mjs\"", correct: true },
      { id: "b", text: "require(\"./math\").add", correct: false },
      { id: "c", text: "import * from \"./math\"", correct: false },
      { id: "d", text: "load(\"math\")", correct: false },
    ],
  },
  "The fs module": {
    q: "Which method reads a file synchronously in Node?",
    opts: [
      { id: "a", text: "fs.readFileSync", correct: true },
      { id: "b", text: "fs.read", correct: false },
      { id: "c", text: "fs.open", correct: false },
      { id: "d", text: "fs.write", correct: false },
    ],
  },
  "Microtasks vs macrotasks": {
    q: "After sync code, what runs first?",
    opts: [
      { id: "a", text: "Microtasks (Promise callbacks)", correct: true },
      { id: "b", text: "Macrotasks (timers)", correct: false },
      { id: "c", text: "I/O events", correct: false },
      { id: "d", text: "Garbage collection", correct: false },
    ],
  },
  "Type annotations": {
    q: "When do TypeScript type annotations run?",
    opts: [
      { id: "a", text: "Only at compile time — they are erased at runtime", correct: true },
      { id: "b", text: "At runtime for every call", correct: false },
      { id: "c", text: "Only in production", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "Interface syntax": {
    q: "TypeScript interfaces describe:",
    opts: [
      { id: "a", text: "The shape a value must have", correct: true },
      { id: "b", text: "Runtime memory layout", correct: false },
      { id: "c", text: "HTTP responses only", correct: false },
      { id: "d", text: "CSS rules", correct: false },
    ],
  },
  "Union types": {
    q: "string | number means the value can be:",
    opts: [
      { id: "a", text: "Either a string or a number", correct: true },
      { id: "b", text: "A string AND a number", correct: false },
      { id: "c", text: "Only a string", correct: false },
      { id: "d", text: "Neither", correct: false },
    ],
  },
  "Generic functions": {
    q: "What is the point of a generic function?",
    opts: [
      { id: "a", text: "One type-safe implementation for many types", correct: true },
      { id: "b", text: "It runs faster", correct: false },
      { id: "c", text: "It avoids async", correct: false },
      { id: "d", text: "It removes all errors", correct: false },
    ],
  },
  "Immutability": {
    q: "How do you update an object immutably?",
    opts: [
      { id: "a", text: "Create a new object with { ...obj, field: value }", correct: true },
      { id: "b", text: "obj.field = value", correct: false },
      { id: "c", text: "obj = null", correct: false },
      { id: "d", text: "Object.freeze(obj)", correct: false },
    ],
  },
  "Declarative pipelines": {
    q: "Which chain transforms data declaratively?",
    opts: [
      { id: "a", text: "arr.filter(p).map(t).reduce(c)", correct: true },
      { id: "b", text: "for (i = 0; ...) with mutation", correct: false },
      { id: "c", text: "while (true) with global state", correct: false },
      { id: "d", text: "eval(string)", correct: false },
    ],
  },
};

/* ─── Content generators ─── */

function generateJsTopicContent(topic: string, title: string, day: number): string {
  const cached = JS_TOPIC_CONTENT[topic];
  if (cached) return cached;

  const level = getLevelForDay(day);
  return (
    `Day ${day} introduces "${topic}" within the context of ${title}. ` +
    `This concept is part of the JavaScript / TypeScript track at the ${level} proficiency tier. ` +
    `It builds on the runtime's event-driven, prototype-based model — understand how ${topic} ` +
    `interacts with the surrounding language features, then extend the template to solidify it.`
  );
}

/* ─── Code-challenge verification ───
 * expectedOutput gates "Mark Complete" on the code exercise. JavaScript runs via
 * the real Piston backend (language "javascript"); there is no in-browser JS
 * simulator yet. Days that need a browser (25 DOM, 26 events, 31 fetch) or
 * produce environment-dependent output (32 Node version) carry an illustrative
 * baseline instead and stay ungated, as do the TypeScript days (33–37) whose
 * annotations don't execute as plain JS. The rest are verified against real
 * Node output. */
const JS_EXPECTED_OUTPUT: Record<number, string> = {
  1: "Hello, JavaScript!",
  2: "hello 40 true",
  3: "13 7 30",
  4: "Hello, Ada",
  5: "true false",
  6: "B",
  7: "anonymous",
  8: "starting",
  9: "[ 0, 1, 2, 3, 4 ]",
  10: "[ 1, 4, 9, 16, 25 ]",
  11: "0\n1\n2",
  12: "Hello, Ada",
  13: "25",
  14: "Hello, friend",
  15: "1\n2",
  16: "Ada",
  17: "Hi, I am Ada",
  18: "30",
  19: '{"name":"Ada","langs":["JS","C"]}',
  20: "95",
  21: "Ada is in grade 10",
  22: "Woof",
  23: "100",
  24: "caught: Not a number",
  27: "start\nend",
  28: "caught: nope",
  29: "42",
  30: "fetch returns a Promise<Response>",
  31: "use import/export to share code",
  38: "12\n10",
  39: "100\n[ 1, 1, 3, 4, 5 ]",
  40: "1 notes saved",
};

function generateJsExercises(day: number, blueprint: JsBlueprint): Lesson["exercises"] {
  const prefix = `js${day}`;
  const topics = blueprint.theoryTopics;

  const quizzes: Lesson["exercises"] = [];
  const usedTopics = new Set<string>();

  for (let i = 0; i < Math.min(topics.length, 2); i++) {
    const topic = topics[i];
    const entry = JS_QUIZ_MAP[topic];
    if (entry && !usedTopics.has(topic)) {
      usedTopics.add(topic);
      quizzes.push({
        id: `${prefix}-q${quizzes.length + 1}`,
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
      question: "Which of these is the idiomatic JavaScript way to check if a value exists?",
      options: [
        { id: "a", text: "`if (value)` using truthiness", correct: true },
        { id: "b", text: "`value.exists()`", correct: false },
        { id: "c", text: "`exists(value)`", correct: false },
        { id: "d", text: "`value === undefined && value === null`", correct: false },
      ],
      xpReward: 25,
    });
  }

  quizzes.push({
    id: `${prefix}-c1`,
    type: "code",
    title: "Code Challenge",
    description: `Practice ${blueprint.title} — implement the core concept`,
    starterCode: blueprint.codeTemplate,
    expectedOutput: JS_EXPECTED_OUTPUT[day],
    hints: [
      "Review the theory section for each topic",
      "Run the code in the playground to see the baseline",
      "Extend it: add inputs, edge cases, or a second example",
    ],
    xpReward: 50,
  });

  return quizzes;
}

function generateJsAssignment(day: number, blueprint: JsBlueprint): Lesson["assignment"] {
  const { title, theoryTopics } = blueprint;
  const topicBasedReqs = theoryTopics.slice(0, 3).map((t) => `Demonstrate understanding of ${t}`);

  return {
    id: `d${day}-a1`,
    title: `${title} — Assignment`,
    description: `Apply Day ${day} concepts by building a small program that exercises ${theoryTopics.join(", ")}. Focus on correctness, edge cases, and readable code.`,
    requirements: [
      ...topicBasedReqs,
      "Write clean, runnable code with meaningful names",
      "Handle at least two edge cases",
      "Verify output matches the expected behavior",
    ],
    starterCode: blueprint.codeTemplate,
    rubric: [
      { criterion: `${theoryTopics[0] ?? "Core concept"} implementation`, points: 30 },
      { criterion: `${theoryTopics[1] ?? "Supporting concept"} implementation`, points: 25 },
      { criterion: "Code quality and readability", points: 20 },
      { criterion: "Edge case handling", points: 15 },
      { criterion: "Expected output", points: 10 },
    ],
    xpReward: 100,
  };
}

export function buildJsLesson(day: number): Lesson {
  const blueprint = JS_CURRICULUM[day - 1];
  if (!blueprint) throw new Error(`No JavaScript lesson for day ${day}`);

  return {
    day,
    title: blueprint.title,
    subtitle: blueprint.subtitle,
    language: "js",
    track: "js",
    level: getLevelForDay(day),
    durationMinutes: 45 + (day % 3) * 15,
    xpTotal: 200,
    tags: blueprint.tags,
    theory: {
      sections: blueprint.theoryTopics.map((topic, i) => ({
        heading: topic,
        content: generateJsTopicContent(topic, blueprint.title, day),
        codeExample: i === 0 ? blueprint.codeTemplate : undefined,
      })),
    },
    playground: {
      defaultCode: blueprint.codeTemplate,
      language: "js",
      runnable: true,
    },
    exercises: generateJsExercises(day, blueprint),
    assignment: generateJsAssignment(day, blueprint),
  };
}
