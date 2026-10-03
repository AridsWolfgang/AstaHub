import type { Lesson } from "../../types";
import { getLevelForDay } from "../../types";

/* ─── JavaScript / TypeScript blueprints: Days 1–100 ─── */

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
  { title: "Prototypes & the Prototype Chain", subtitle: "How inheritance really works", language: "js", tags: ["prototypes"], theoryTopics: ["The prototype chain", "__proto__ vs prototype", "hasOwnProperty and shadowing"], codeTemplate: `function Animal(name) { this.name = name; }\nAnimal.prototype.speak = function () { return this.name + " speaks"; };\nconst dog = new Animal("Rex");\nconsole.log(dog.speak());\nconsole.log(dog.hasOwnProperty("name"));\nconsole.log(dog.hasOwnProperty("speak"));` },
  { title: "Object.create & Descriptors", subtitle: "Fine-grained control over properties", language: "js", tags: ["objects"], theoryTopics: ["Object.create", "Property descriptors", "Object.freeze and seal"], codeTemplate: `const proto = { greet() { return "hi " + this.name; } };\nconst user = Object.create(proto);\nuser.name = "Ada";\nObject.defineProperty(user, "id", { value: 7, enumerable: false });\nconsole.log(user.greet());\nconsole.log(Object.keys(user).join(","));\nconsole.log(user.id);` },
  { title: "Symbols & Unique Keys", subtitle: "Collision-free property keys", language: "js", tags: ["symbols"], theoryTopics: ["The Symbol type", "Well-known symbols", "Global symbol registry"], codeTemplate: `const id = Symbol("id");\nconst user = { name: "Ada", [id]: 42 };\nconsole.log(typeof id);\nconsole.log(user[id]);\nconsole.log(Object.keys(user).join(","));` },
  { title: "Iterators & Generators", subtitle: "Lazy sequences with yield", language: "js", tags: ["generators"], theoryTopics: ["The iterator protocol", "Generator functions", "yield and next"], codeTemplate: `function* range(n) { for (let i = 0; i < n; i++) yield i * 10; }\nconst out = [];\nfor (const v of range(4)) out.push(v);\nconsole.log(out.join(","));\nconsole.log([...range(2)].length);` },
  { title: "Private State, Deep", subtitle: "True privacy with #fields and closures", language: "js", tags: ["classes"], theoryTopics: ["Private class fields", "WeakMap privacy pattern", "Closures vs #fields"], codeTemplate: `class Vault {\n  #pin;\n  constructor(pin) { this.#pin = pin; }\n  check(guess) { return guess === this.#pin; }\n}\nconst v = new Vault(1234);\nconsole.log(v.check(1234));\nconsole.log(v.check(0));\nconsole.log(typeof v.pin);` },
  { title: "Mixins & Composition", subtitle: "Share behavior without inheritance", language: "js", tags: ["classes"], theoryTopics: ["Mixin functions", "Composition over inheritance", "Object.assign behaviors"], codeTemplate: `const Swimmer = { swim() { return this.name + " swims"; } };\nconst Flyer = { fly() { return this.name + " flies"; } };\nclass Duck {\n  constructor(name) { this.name = name; Object.assign(this, Swimmer, Flyer); }\n}\nconst d = new Duck("Daffy");\nconsole.log(d.swim());\nconsole.log(d.fly());` },
  { title: "Classes Deep: Chains & Statics", subtitle: "Multi-level inheritance that stays sane", language: "js", tags: ["classes"], theoryTopics: ["Static initialization blocks", "Multi-level inheritance", "instanceof chains"], codeTemplate: `class A { static kind = "a"; }\nclass B extends A { static kind = "b"; }\nclass C extends B {}\nconst c = new C();\nconsole.log(c instanceof C);\nconsole.log(c instanceof A);\nconsole.log(C.kind);` },
  { title: "Proxy & Reflect", subtitle: "Intercept and customize object behavior", language: "js", tags: ["metaprogramming"], theoryTopics: ["Proxy traps", "The Reflect API", "Validation via proxies"], codeTemplate: `const target = { age: 36 };\nconst guarded = new Proxy(target, {\n  set(obj, key, value) {\n    if (key === "age" && value < 0) throw new Error("bad age");\n    return Reflect.set(obj, key, value);\n  },\n});\nguarded.age = 37;\nconsole.log(guarded.age);\ntry { guarded.age = -1; } catch (e) { console.log("blocked"); }\nconsole.log(target.age);` },
  { title: "WeakMap, WeakSet & Memory", subtitle: "References that do not prevent cleanup", language: "js", tags: ["memory"], theoryTopics: ["WeakMap semantics", "WeakSet membership", "Garbage collection basics"], codeTemplate: `const cache = new WeakMap();\nconst key = { id: 1 };\ncache.set(key, "cached value");\nconsole.log(cache.get(key));\nconsole.log(cache.has(key));\nconsole.log(cache.has({ id: 1 }));` },
  { title: "Deep Copy & Structured Clone", subtitle: "Copy values without shared mutation", language: "js", tags: ["objects"], theoryTopics: ["Shallow vs deep copy", "structuredClone", "JSON copy limits"], codeTemplate: `const original = { name: "Ada", tags: ["js", "c"], when: new Date("2026-10-02T00:00:00Z") };\nconst copy = structuredClone(original);\ncopy.tags.push("asm");\nconsole.log(original.tags.length);\nconsole.log(copy.tags.length);\nconsole.log(copy.when instanceof Date);` },
  { title: "ESM vs CommonJS, Deep", subtitle: "Two module systems, one language", language: "js", tags: ["modules"], theoryTopics: ["ESM import/export recap", "CommonJS require/module.exports", "Interop and file extensions"], codeTemplate: `// ESM (math.mjs): export const add = (a, b) => a + b;\n// CJS (math.cjs): module.exports.add = (a, b) => a + b;\n// Use .mjs for ESM, .cjs for CJS; "type": "module" flips .js to ESM.\nconsole.log("esm uses import, cjs uses require");` },
  { title: "Node path & os Scripting", subtitle: "Filenames and machine facts", language: "js", tags: ["node"], theoryTopics: ["The path module", "The os module", "__dirname and cwd"], codeTemplate: `const path = require("path");\nconst os = require("os");\nconsole.log(path.join("a", "b", "c"));\nconsole.log(path.extname("archive.tar.gz"));\nconsole.log(typeof os.homedir());` },
  { title: "Node fs, Deep", subtitle: "Read, write, append, and list", language: "js", tags: ["node"], theoryTopics: ["writeFileSync and appendFileSync", "mkdirSync recursive", "readdirSync and statSync"], codeTemplate: `const fs = require("fs");\nconst os = require("os");\nconst path = require("path");\nconst dir = fs.mkdtempSync(path.join(os.tmpdir(), "asta-"));\nfs.writeFileSync(path.join(dir, "a.txt"), "hello");\nfs.appendFileSync(path.join(dir, "a.txt"), " world");\nconsole.log(fs.readFileSync(path.join(dir, "a.txt"), "utf8"));\nconsole.log(fs.readdirSync(dir).join(","));\nfs.rmSync(dir, { recursive: true });\nconsole.log("cleaned");` },
  { title: "Buffers & Streams", subtitle: "Binary data and flowing pipelines", language: "js", tags: ["node"], theoryTopics: ["Buffer basics", "Readable and writable streams", "pipe and pipeline"], codeTemplate: `const { Transform } = require("stream");\nconst upper = new Transform({\n  transform(chunk, enc, cb) { cb(null, chunk.toString().toUpperCase()); },\n});\nlet out = "";\nupper.on("data", (c) => { out += c; });\nupper.on("end", () => console.log(out));\nupper.write("hello ");\nupper.write("streams");\nupper.end();\nconsole.log(Buffer.from("abc").length);` },
  { title: "Child Processes", subtitle: "Run other programs from Node", language: "js", tags: ["node"], theoryTopics: ["execFileSync basics", "spawn vs exec", "Communicating via stdio"], codeTemplate: `const { execFileSync } = require("child_process");\nconst out = execFileSync(process.execPath, ["-e", "console.log(6 * 7)"]);\nconsole.log(out.toString().trim());\nconsole.log("child ran");` },
  { title: "npm Scripts & package.json", subtitle: "Automate with scripts", language: "js", tags: ["tooling"], theoryTopics: ["The scripts field", "pre/post hooks", "npx and local binaries"], codeTemplate: `const pkg = { scripts: { test: "node --test", lint: "eslint .", start: "node app.js" } };\nconsole.log(Object.keys(pkg.scripts).join(","));\nconsole.log(pkg.scripts.test);` },
  { title: "Lint, Format & Typecheck", subtitle: "Tooling that reads your code", language: "js", tags: ["tooling"], theoryTopics: ["ESLint rules", "Prettier formatting", "Typecheck in CI"], codeTemplate: `const issues = [\n  { rule: "no-unused-vars", file: "app.js" },\n  { rule: "eqeqeq", file: "util.js" },\n];\nconsole.log(issues.length + " issues");\nconsole.log(issues.map((i) => i.rule).join(","));` },
  { title: "Env Config & dotenv Patterns", subtitle: "Settings without hard-coding", language: "js", tags: ["node"], theoryTopics: ["process.env", "dotenv conventions", "Config validation"], codeTemplate: `const fakeEnv = { PORT: "3000" };\nconst port = Number(fakeEnv.PORT || 8080);\nconst host = fakeEnv.HOST || "localhost";\nconsole.log(host + ":" + port);\nconsole.log(Number.isInteger(port));` },
  { title: "CLI Arguments & stdin", subtitle: "Read input from users and pipes", language: "js", tags: ["node"], theoryTopics: ["Parsing process.argv", "Flags vs positionals", "Reading stdin"], codeTemplate: `const argv = ["node", "app.js", "--port", "3000", "serve"];\nconst args = argv.slice(2);\nconst portFlag = args.indexOf("--port");\nconsole.log(args[args.length - 1]);\nconsole.log(portFlag === -1 ? "no port" : args[portFlag + 1]);` },
  { title: "Milestone Project 1: File Organizer CLI", subtitle: "Group files by extension", language: "js", tags: ["capstone"], theoryTopics: ["Scanning a directory", "Grouping by extension", "Designing CLI output"], codeTemplate: `const fs = require("fs");\nconst os = require("os");\nconst path = require("path");\nconst dir = fs.mkdtempSync(path.join(os.tmpdir(), "organize-"));\nfor (const f of ["a.js", "b.js", "c.md", "d.txt"]) fs.writeFileSync(path.join(dir, f), "x");\nconst groups = {};\nfor (const f of fs.readdirSync(dir)) {\n  const ext = path.extname(f) || "none";\n  groups[ext] = (groups[ext] || 0) + 1;\n}\nconsole.log(Object.keys(groups).sort().map((e) => e + ":" + groups[e]).join(" "));\nfs.rmSync(dir, { recursive: true });\nconsole.log("organized");` },
  { title: "Node http Servers", subtitle: "Serve text over localhost", language: "js", tags: ["node"], theoryTopics: ["createServer", "req and res objects", "Listening on a port"], codeTemplate: `const http = require("http");\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "content-type": "text/plain" });\n  res.end("hello http");\n});\nserver.listen(0, "127.0.0.1", async () => {\n  const port = server.address().port;\n  const res = await fetch("http://127.0.0.1:" + port + "/");\n  console.log(await res.text());\n  server.close();\n});` },
  { title: "Routing & Middleware Concepts", subtitle: "Dispatch requests by method and path", language: "js", tags: ["node"], theoryTopics: ["URL routing tables", "Middleware chains", "Method dispatch"], codeTemplate: `const routes = { "GET /users": "list users", "POST /users": "create user" };\nfunction handle(method, path) {\n  return routes[method + " " + path] || "404 not found";\n}\nconsole.log(handle("GET", "/users"));\nconsole.log(handle("DELETE", "/users"));` },
  { title: "JSON REST API Design", subtitle: "Resources, verbs, and status codes", language: "js", tags: ["api"], theoryTopics: ["Resources and status codes", "JSON request bodies", "REST conventions"], codeTemplate: `async function main() {\n  const body = JSON.stringify({ id: 1, name: "Ada" });\n  const res = new Response(body, { status: 201, headers: { "content-type": "application/json" } });\n  console.log(res.status);\n  const data = await res.json();\n  console.log(data.id + ":" + data.name);\n}\nmain();` },
  { title: "fetch Deep: GET & Query Params", subtitle: "Build URLs and read responses", language: "js", tags: ["api"], theoryTopics: ["URL and URLSearchParams", "data: URL fetching", "Checking res.ok"], codeTemplate: `async function main() {\n  const url = new URL("https://api.example.com/users?role=admin&page=2");\n  console.log(url.searchParams.get("role"));\n  const res = await fetch('data:application/json,{"items":[1,2,3]}');\n  console.log(res.ok);\n  const data = await res.json();\n  console.log(data.items.length);\n}\nmain();` },
  { title: "fetch Deep: Writes & Headers", subtitle: "POST, PUT, DELETE with JSON bodies", language: "js", tags: ["api"], theoryTopics: ["Request methods", "Sending JSON bodies", "Status code handling"], codeTemplate: `async function main() {\n  const req = new Request("https://api.example.com/users/1", {\n    method: "PUT",\n    headers: { "content-type": "application/json" },\n    body: JSON.stringify({ name: "Ada" }),\n  });\n  console.log(req.method);\n  console.log(req.headers.get("content-type"));\n  console.log((await req.json()).name);\n}\nmain();` },
  { title: "Async Patterns: all/race/allSettled", subtitle: "Coordinate parallel promises", language: "js", tags: ["async"], theoryTopics: ["Promise.all recap", "Promise.race", "Promise.allSettled"], codeTemplate: `async function main() {\n  const slow = (v, ms) => new Promise((r) => setTimeout(() => r(v), ms));\n  console.log((await Promise.all([slow(1, 20), slow(2, 0)])).join(","));\n  console.log(await Promise.race([slow("a", 20), slow("b", 0)]));\n  const settled = await Promise.allSettled([Promise.resolve(1), Promise.reject(new Error("x"))]);\n  console.log(settled.map((s) => s.status).join(","));\n}\nmain();` },
  { title: "Event Loop Deep: Queues & Order", subtitle: "nextTick, microtasks, and timers", language: "js", tags: ["async"], theoryTopics: ["queueMicrotask", "process.nextTick", "Microtask draining"], codeTemplate: `console.log("a");\nqueueMicrotask(() => console.log("b"));\nprocess.nextTick(() => console.log("c"));\nPromise.resolve().then(() => console.log("d"));\nconsole.log("e");` },
  { title: "Timers Deep: Debounce & Throttle", subtitle: "Control how often work runs", language: "js", tags: ["async"], theoryTopics: ["setTimeout vs setInterval", "Debounce pattern", "Throttle pattern"], codeTemplate: `async function main() {\n  let calls = 0;\n  const debounced = (() => {\n    let t;\n    return () => { clearTimeout(t); t = setTimeout(() => { calls++; }, 5); };\n  })();\n  debounced(); debounced(); debounced();\n  await new Promise((r) => setTimeout(r, 20));\n  console.log("calls:" + calls);\n}\nmain();` },
  { title: "Errors Deep: Custom Classes", subtitle: "Subclass Error with status and cause", language: "js", tags: ["errors"], theoryTopics: ["Subclassing Error", "cause property", "instanceof checks"], codeTemplate: `class HttpError extends Error {\n  constructor(status, message) {\n    super(message);\n    this.status = status;\n    this.name = "HttpError";\n  }\n}\ntry {\n  throw new HttpError(404, "missing");\n} catch (err) {\n  console.log(err.name + " " + err.status);\n  console.log(err instanceof Error);\n  console.log(err.message);\n}` },
  { title: "Debugging Techniques", subtitle: "Stacks, traces, and inspectors", language: "js", tags: ["errors"], theoryTopics: ["Reading stack traces", "console tracing", "node --inspect concept"], codeTemplate: `function inner() { return new Error("boom").stack.split("\\n")[0]; }\nfunction outer() { return inner(); }\nconsole.log(outer());\nconsole.log(new Error("boom").message);` },
  { title: "Regex Basics", subtitle: "Patterns for test, exec, and match", language: "js", tags: ["regex"], theoryTopics: ["Regex literals", "test and exec", "Character classes"], codeTemplate: `const re = /\\b[A-Za-z]+@[A-Za-z]+\\.[a-z]{2,}\\b/;\nconsole.log(re.test("contact ada@example.com today"));\nconsole.log("abc123".match(/\\d+/)[0]);\nconsole.log("aaa".replace(/a/g, "b"));` },
  { title: "Regex Groups & Replace", subtitle: "Capture, name, and transform", language: "js", tags: ["regex"], theoryTopics: ["Capture groups", "Named groups", "Replace with functions"], codeTemplate: `const m = "2026-10-02".match(/(?<y>\\d{4})-(?<m>\\d{2})-(?<d>\\d{2})/);\nconsole.log(m.groups.y + "/" + m.groups.m);\nconsole.log("ada lovelace".replace(/(\\w+)\\s(\\w+)/, "$2, $1"));` },
  { title: "Dates & Times, Deep", subtitle: "Timestamps, arithmetic, and UTC", language: "js", tags: ["dates"], theoryTopics: ["The Date object", "Timestamps and arithmetic", "UTC vs local"], codeTemplate: `const d = new Date("2026-10-02T12:00:00Z");\nconsole.log(d.getUTCFullYear());\nconsole.log(d.getUTCMonth() + 1);\nconsole.log(d.toISOString().slice(0, 10));` },
  { title: "Intl: Locales & Formatting", subtitle: "Numbers, dates, and lists for humans", language: "js", tags: ["intl"], theoryTopics: ["Intl.NumberFormat", "Intl.DateTimeFormat", "List and relative formats"], codeTemplate: `console.log(new Intl.NumberFormat("en-US").format(1234567.89));\nconst d = new Date("2026-10-02T12:00:00Z");\nconsole.log(new Intl.DateTimeFormat("en-US", { timeZone: "UTC", dateStyle: "short" }).format(d));\nconsole.log(new Intl.ListFormat("en", { type: "conjunction" }).format(["a", "b", "c"]));` },
  { title: "Equality Deep: SameValue", subtitle: "When === is not enough", language: "js", tags: ["equality"], theoryTopics: ["=== vs Object.is", "NaN equality", "-0 vs +0"], codeTemplate: `console.log(Object.is(NaN, NaN));\nconsole.log(Object.is(-0, 0));\nconsole.log([NaN].includes(NaN));\nconsole.log(Object.is("a", "a"));` },
  { title: "node:test & assert Basics", subtitle: "Prove code correct with the stdlib", language: "js", tags: ["testing"], theoryTopics: ["node:assert/strict", "node:test runner", "Assertions as specs"], codeTemplate: `const assert = require("node:assert/strict");\nassert.equal(1 + 1, 2);\nassert.deepEqual([1, 2].map((x) => x * 2), [2, 4]);\nassert.throws(() => { throw new Error("x"); });\nconsole.log("3 assertions passed");` },
  { title: "Testing: Structure & Fakes", subtitle: "Arrange, act, assert with tables", language: "js", tags: ["testing"], theoryTopics: ["Arrange-act-assert", "Fake timers and stubs", "Table-driven tests"], codeTemplate: `const cases = [[1, 2, 3], [0, 0, 0], [-1, 1, 0]];\nlet passed = 0;\nfor (const [a, b, want] of cases) {\n  if (a + b === want) passed++;\n}\nconsole.log(passed + "/" + cases.length + " passed");` },
  { title: "TypeScript Deep: Narrowing", subtitle: "Refine unions with checks and guards", language: "js", tags: ["typescript"], theoryTopics: ["Narrowing with typeof", "Discriminated unions", "Type predicate functions"], codeTemplate: `// function isString(v: unknown): v is string { return typeof v === "string"; }\n// let id: string | number = "abc123";\n// if (typeof id === "string") { console.log(id.toUpperCase()); }\nconsole.log("narrowing refines unions to one type");` },
  { title: "TypeScript Deep: Utility Types", subtitle: "Partial, Pick, Omit, and friends", language: "js", tags: ["typescript"], theoryTopics: ["Partial, Pick and Omit", "Generic utility patterns", "ReturnType and Parameters"], codeTemplate: `// type User = { name: string; age: number; email: string };\n// type Preview = Pick<User, "name" | "email">;\n// type Draft = Partial<User>; type NoEmail = Omit<User, "email">;\nconsole.log("utility types transform existing types");` },
  { title: "Milestone Project 2: Notes API", subtitle: "An in-memory REST resource", language: "js", tags: ["capstone"], theoryTopics: ["In-memory resource store", "Route handlers", "Status codes by outcome"], codeTemplate: `const notes = new Map();\nlet nextId = 1;\nconst create = (text) => { const n = { id: nextId++, text }; notes.set(n.id, n); return { status: 201, body: n }; };\nconst list = () => ({ status: 200, body: [...notes.values()] });\nconsole.log(create("buy milk").status);\nconsole.log(create("read docs").status);\nconsole.log(list().body.length);` },
  { title: "TypeScript: Mapped & Conditional Types", subtitle: "Compute new types from old ones", language: "js", tags: ["typescript"], theoryTopics: ["Generic constraints recap", "Mapped types", "Conditional types"], codeTemplate: `// type Readonly2<T> = { readonly [K in keyof T]: T[K] };\n// type IsString<T> = T extends string ? true : false;\n// type Flags = { [K in "a" | "b"]: boolean };\nconsole.log("mapped types build new shapes from old ones");` },
  { title: "TypeScript: .d.ts & Declarations", subtitle: "Ship types without source", language: "js", tags: ["typescript"], theoryTopics: ["Declaration files", "Ambient modules", "Publishing types"], codeTemplate: `// ambient.d.ts: declare module "legacy-lib" { export function run(): void; }\n// tsc emits .d.ts beside .js so others get types without source.\nconsole.log("declaration files carry types without source");` },
  { title: "TypeScript: Strict Null Checks", subtitle: "Make null and undefined explicit", language: "js", tags: ["typescript"], theoryTopics: ["strictNullChecks", "unknown vs any", "never for impossible branches"], codeTemplate: `// let name: string | undefined;\n// if (name !== undefined) { console.log(name.length); }\n// unknown needs narrowing; never marks impossible branches.\nconsole.log("strict mode forces you to handle null");` },
  { title: "DOM Deep: Forms & Validation", subtitle: "Handle submits in the browser", language: "js", tags: ["web"], theoryTopics: ["Form elements", "submit handling", "Constraint validation API"], codeTemplate: `// const form = document.querySelector("#signup");\n// form.addEventListener("submit", (e) => {\n//   e.preventDefault();\n// });\nconsole.log("validate forms with submit handlers");` },
  { title: "DOM Deep: Rendering Lists", subtitle: "Build elements without frameworks", language: "js", tags: ["web"], theoryTopics: ["createElement patterns", "Efficient list rendering", "Event delegation for lists"], codeTemplate: `// const ul = document.querySelector("#items");\n// for (const item of ["a", "b"]) {\n//   const li = document.createElement("li");\n//   li.textContent = item; ul.appendChild(li);\n// }\nconsole.log("build dom nodes with createElement");` },
  { title: "Browser Storage", subtitle: "localStorage, session, and cookies", language: "js", tags: ["web"], theoryTopics: ["localStorage", "sessionStorage", "Cookies vs storage"], codeTemplate: `// localStorage.setItem("theme", "dark");\n// const theme = localStorage.getItem("theme") ?? "light";\n// sessionStorage and cookies follow the same string-only rule.\nconsole.log("storage persists strings across visits");` },
  { title: "Web Workers & Background Work", subtitle: "Offload work from the main thread", language: "js", tags: ["web"], theoryTopics: ["Worker basics", "postMessage protocol", "When to offload work"], codeTemplate: `// const worker = new Worker("work.js");\n// worker.postMessage({ n: 40 });\n// worker.onmessage = (e) => console.log(e.data);\nconsole.log("workers run scripts off the main thread");` },
  { title: "Async Generators & Streaming", subtitle: "Yield promises over time", language: "js", tags: ["async"], theoryTopics: ["Async iterators", "for await...of", "Backpressure basics"], codeTemplate: `async function main() {\n  async function* stream(n) {\n    for (let i = 0; i < n; i++) yield i * 2;\n  }\n  const out = [];\n  for await (const v of stream(4)) out.push(v);\n  console.log(out.join(","));\n}\nmain();` },
  { title: "EventEmitter Patterns", subtitle: "Node's observer bus", language: "js", tags: ["node"], theoryTopics: ["on and emit", "once", "Removing listeners"], codeTemplate: `const { EventEmitter } = require("events");\nconst bus = new EventEmitter();\nconst seen = [];\nbus.on("msg", (m) => seen.push("got:" + m));\nbus.once("bye", () => seen.push("bye once"));\nbus.emit("msg", "hi");\nbus.emit("bye");\nbus.emit("bye");\nconsole.log(seen.join(" | "));` },
  { title: "URL & Query Handling", subtitle: "Parse, edit, and resolve URLs", language: "js", tags: ["web"], theoryTopics: ["URL parsing", "URLSearchParams editing", "Relative resolution"], codeTemplate: `const u = new URL("/users?page=2", "https://example.com");\nconsole.log(u.hostname);\nconsole.log(u.searchParams.get("page"));\nu.searchParams.set("page", "3");\nconsole.log(u.pathname + u.search);` },
  { title: "JSON Validation Patterns", subtitle: "Reject bad shapes with clear errors", language: "js", tags: ["api"], theoryTopics: ["Shape validation", "Required fields", "Error messages"], codeTemplate: `function validateUser(v) {\n  const errors = [];\n  if (typeof v.name !== "string") errors.push("name must be a string");\n  if (typeof v.age !== "number") errors.push("age must be a number");\n  return errors;\n}\nconsole.log(validateUser({ name: "Ada", age: 36 }).length);\nconsole.log(validateUser({ name: "Ada" }).join("; "));` },
  { title: "Hashing & Tokens with crypto", subtitle: "SHA-256, HMAC, and random ids", language: "js", tags: ["node"], theoryTopics: ["SHA-256 hashing", "HMAC signatures", "Random ids"], codeTemplate: `const crypto = require("crypto");\nconst hash = crypto.createHash("sha256").update("asta").digest("hex");\nconsole.log(hash.slice(0, 8));\nconst sig = crypto.createHmac("sha256", "key").update("msg").digest("hex");\nconsole.log(sig.length);` },
  { title: "Security: Sanitization", subtitle: "Escape HTML and distrust input", language: "js", tags: ["security"], theoryTopics: ["XSS basics", "Escaping HTML", "Never trust input"], codeTemplate: `function escapeHtml(s) {\n  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));\n}\nconsole.log(escapeHtml('<script>alert("x")</script>'));` },
  { title: "Performance: Counting Operations", subtitle: "Reason about cost without a stopwatch", language: "js", tags: ["performance"], theoryTopics: ["Big-O intuition", "Counting steps", "Benchmarks vs counts"], codeTemplate: `let linear = 0, quadratic = 0;\nconst n = 100;\nfor (let i = 0; i < n; i++) linear++;\nfor (let i = 0; i < n; i++) for (let j = 0; j < n; j++) quadratic++;\nconsole.log("linear:" + linear);\nconsole.log("quadratic:" + quadratic);` },
  { title: "Milestone Project 3: Utility Library", subtitle: "Write and self-test chunk and groupBy", language: "js", tags: ["capstone"], theoryTopics: ["chunk and groupBy", "Testing your own lib", "API design"], codeTemplate: `const chunk = (arr, size) => {\n  const out = [];\n  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));\n  return out;\n};\nconsole.log(JSON.stringify(chunk([1, 2, 3, 4, 5], 2)));\nconsole.log(chunk([1, 2, 3, 4, 5], 2).length);` },
  { title: "Packaging & Publishing", subtitle: "Manifests, exports, and semver", language: "js", tags: ["tooling"], theoryTopics: ["package.json metadata", "Exports map", "Versioning semver"], codeTemplate: `const manifest = { name: "@asta/utils", version: "1.2.3", exports: { ".": "./index.js" } };\nconst [major, minor, patch] = manifest.version.split(".").map(Number);\nconsole.log(manifest.name);\nconsole.log(major + "." + minor + "." + patch);` },
  { title: "Documentation & JSDoc", subtitle: "Types and docs from comments", language: "js", tags: ["tooling"], theoryTopics: ["JSDoc annotations", "README structure", "Examples as docs"], codeTemplate: `/** Adds two numbers. */\nfunction add(a, b) { return a + b; }\nconsole.log(add(2, 3));\nconsole.log(add.length);` },
  { title: "Refactoring Patterns", subtitle: "Extract, rename, and deduplicate", language: "js", tags: ["quality"], theoryTopics: ["Extract function", "Rename for clarity", "Remove duplication"], codeTemplate: `const users = [{ name: "Ada", admin: true }, { name: "Bob", admin: false }];\nconst admins = users.filter((u) => u.admin).map((u) => u.name);\nconsole.log(admins.join(","));\nconsole.log(users.length);` },
  { title: "AbortController & Timeouts", subtitle: "Cancel async work cleanly", language: "js", tags: ["async"], theoryTopics: ["Abort signals", "fetch with timeout", "Cleanup on abort"], codeTemplate: `async function main() {\n  const controller = new AbortController();\n  const slow = new Promise((resolve, reject) => {\n    const t = setTimeout(() => resolve("too late"), 50);\n    controller.signal.addEventListener("abort", () => { clearTimeout(t); reject(new Error("aborted")); });\n  });\n  const p = slow.catch((e) => e.message);\n  controller.abort();\n  console.log(await p);\n}\nmain();` },
  { title: "Capstone: Ship a Mini Service", subtitle: "Route, self-test, and document a notes service", language: "js", tags: ["capstone"], theoryTopics: ["Wiring routes to a store", "Self-test script", "README and next steps"], codeTemplate: `const db = new Map();\nlet id = 1;\nconst api = {\n  create(text) {\n    if (typeof text !== "string" || !text.trim()) return { status: 400 };\n    const note = { id: id++, text };\n    db.set(note.id, note);\n    return { status: 201, body: note };\n  },\n  list() { return { status: 200, body: [...db.values()] }; },\n};\nconsole.log(api.create("  ").status);\nconsole.log(api.create("ship it").status);\nconsole.log(api.list().body.length);\nconsole.log("capstone ready");` },
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
  "The prototype chain": "Every object has an internal link to another object — its prototype. Property reads walk this chain until they find the key or reach null. Methods defined on a shared prototype are therefore available to all instances without being copied.",
  "__proto__ vs prototype": "`__proto__` is the actual link from an instance to its prototype (prefer `Object.getPrototypeOf`). `prototype` is the template object stored on constructor functions that new instances link to. One is the pointer, the other is the target — confusing them is the classic prototype pitfall.",
  "hasOwnProperty and shadowing": "`obj.hasOwnProperty(key)` tells you whether a property lives on the object itself rather than somewhere up the chain. Assigning `obj.key = v` creates an own property that shadows any inherited one. Use this distinction to avoid acting on inherited helpers during enumeration.",
  "Object.create": "`Object.create(proto)` builds a new object with `proto` as its prototype — inheritance without a constructor call. It is the most direct expression of prototypal inheritance and the basis of many factory patterns. Pass `null` to get a dictionary with no inherited keys at all.",
  "Property descriptors": "Every property has hidden flags: `writable`, `enumerable`, and `configurable`, plus `value` or a getter/setter pair. `Object.defineProperty` sets them explicitly and `Object.getOwnPropertyDescriptor` reads them. Descriptors are how libraries build read-only or hidden fields.",
  "Object.freeze and seal": "`Object.freeze(obj)` makes an object fully immutable — no adds, deletes, or writes, one level deep. `Object.seal(obj)` is weaker: values can change but the key set is fixed. Both are one-way operations used to lock configuration and public constants.",
  "The Symbol type": "`Symbol(description)` creates a guaranteed-unique primitive, ideal for property keys that can never collide. Symbols are skipped by `Object.keys`, `JSON.stringify`, and spread enumeration, which makes them perfect for metadata and framework internals.",
  "Well-known symbols": "Built-ins like `Symbol.iterator`, `Symbol.toPrimitive`, and `Symbol.hasInstance` let your objects hook into language behavior — iteration, coercion, and `instanceof`. Implementing `[Symbol.iterator]` is what makes a custom collection work with `for...of` and spread.",
  "Global symbol registry": "`Symbol.for(key)` returns a symbol shared process-wide for the same key, unlike `Symbol(key)` which is always fresh. `Symbol.keyFor(sym)` reverses the lookup. The registry is how independent modules agree on a common extension point.",
  "The iterator protocol": "An iterator is any object with a `next()` method returning `{ value, done }`. An iterable provides one via `[Symbol.iterator]()`. Arrays, strings, Maps, and Sets are iterable out of the box, and the protocol is what `for...of` and spread consume.",
  "Generator functions": "`function* gen()` returns a generator that pauses at each `yield` and resumes on `next()`. Generators produce lazy, potentially infinite sequences with almost no memory. They turn pull-based iteration into plain sequential code.",
  "yield and next": "`yield value` emits one item and suspends; `gen.next(input)` resumes and feeds `input` back as the yield expression's result. The final `return` sets `done: true`. This two-way channel powers coroutines, not just sequences.",
  "Private class fields": "A `#name` field is enforced-private by the engine: unreadable and unwritable outside the class body, with no reflection escape hatch. Unlike `_underscore` conventions, `#` privacy cannot be bypassed. Use it for invariants the outside world must never touch.",
  "WeakMap privacy pattern": "Before `#` fields, privacy was done with a module-level `WeakMap` keyed by instance: `privates.get(this)`. Entries vanish when the instance is collected, so there is no leak. You will still meet this pattern in older libraries.",
  "Closures vs #fields": "Closures hide state per factory call and work with plain functions; `#` fields hide state per class instance with engine enforcement. Prefer `#` fields inside classes and closures inside factory functions — each is idiomatic in its own shape.",
  "Mixin functions": "A mixin stamps shared methods onto a target, typically with `Object.assign(Target.prototype, MixinA, MixinB)`. Mixins compose behavior from small flat objects instead of deep hierarchies. They are the pragmatic choice when inheritance would force an awkward taxonomy.",
  "Composition over inheritance": "Favor building objects from collaborating parts over extending long ancestor chains. Composition keeps each piece small, testable, and replaceable; inheritance bakes in a rigid taxonomy. When two subclasses need the same behavior but different parents, compose instead of duplicating.",
  "Object.assign behaviors": "`Object.assign(target, ...sources)` copies own enumerable string- and symbol-keyed properties, left to right, with later sources winning. It is shallow — nested objects are shared by reference — and it invokes setters on the target. Spread `{...a, ...b}` is the literal equivalent.",
  "Static initialization blocks": "`static { ... }` runs once when the class is defined, after static fields initialize, with full access to private statics. It replaces awkward immediately-invoked setup after the class. Use it for caches, registries, and validation that needs statements rather than single expressions.",
  "Multi-level inheritance": "Chains like `C extends B extends A` accumulate behavior layer by layer, each calling `super` up one level. Keep chains shallow — depth beyond two or three becomes hard to reason about. Every level should add one coherent responsibility.",
  "instanceof chains": "`x instanceof C` walks the whole prototype chain, so a subclass instance is also an `instanceof` every ancestor. A custom `Symbol.hasInstance` can override this test. Remember `instanceof` fails across realms such as iframes — prefer duck-typing there.",
  "Proxy traps": "A `Proxy` wraps a target with handler methods — `get`, `set`, `has`, `deleteProperty`, `apply` — that intercept the corresponding operations. Traps must respect engine invariants, for example a `get` trap cannot hide a non-configurable property. This is metaprogramming with guardrails.",
  "The Reflect API": "`Reflect.get(obj, key)`, `Reflect.set`, `Reflect.has`, and friends mirror the default semantics of each operation as plain functions. Inside proxy traps they forward to the target cleanly. `Reflect` is also the toolkit for writing generic, trap-safe helpers.",
  "Validation via proxies": "A `set` trap can reject bad values before they land: check ranges, shapes, or permissions, then throw on violation. The object stays valid by construction instead of by convention. Pair the check with `Reflect.set` for the actual write once it passes.",
  "WeakMap semantics": "A `WeakMap` keys entries by object identity and holds those keys weakly — when a key has no other references, its entry can be collected. Keys must be objects and the map is not iterable, so collection timing is unobservable. It is a cache that cleans itself.",
  "WeakSet membership": "A `WeakSet` stores objects you can test with `has`, adding with `add` and removing with `delete`. Like `WeakMap` it is non-iterable and self-cleaning. Use it to tag instances — seen, active, dirty — without preventing their collection.",
  "Garbage collection basics": "The engine reclaims memory unreachable from roots such as globals, the stack, and closures via mark-and-sweep. You never free memory manually — you drop references. Long-lived collections holding objects you no longer need are the classic leak; prefer weak collections there.",
  "Shallow vs deep copy": "Spread and `Object.assign` copy one level — nested objects stay shared, so mutating the copy's nested field mutates the original. A deep copy duplicates every level. Choose shallow for flat updates and deep when nested independence is required.",
  "structuredClone": "`structuredClone(value)` deep-copies most built-in types — objects, arrays, Maps, Sets, Dates, typed arrays — preserving prototypes like `Date`. It throws on functions and DOM nodes. For plain data it is the standard dependency-free deep copy.",
  "JSON copy limits": "`JSON.parse(JSON.stringify(x))` deep-copies JSON-safe data but drops functions, `undefined`, and Symbols, and converts Dates to strings and Maps to empty objects. Use it only when you know the shape is plain. `structuredClone` is almost always the better choice.",
  "ESM import/export recap": "ESM is static: `import` and `export` are hoisted and analyzable, which enables tree-shaking. Named exports match by name and one default export per module is allowed. Static structure is what lets bundlers drop code you never import.",
  "CommonJS require/module.exports": "CJS is dynamic: `require(id)` runs the module and returns `module.exports`, cached after the first load. `exports` starts as an alias for that object — reassign `module.exports` to replace it entirely. Dynamic `require` enables conditional loading that ESM forbids.",
  "Interop and file extensions": "Use `.mjs` for ESM and `.cjs` for CommonJS explicitly; `.js` follows the nearest `package.json` `type` field. ESM can import CJS defaults and CJS can load ESM via asynchronous `import()`. Match the extension to the system to avoid loader surprises.",
  "The path module": "`path.join` concatenates segments with the platform separator, `path.resolve` anchors to an absolute path, and `extname`/`basename`/`dirname` dissect filenames. Always build paths with `path` instead of string concatenation — separators differ between Windows and POSIX.",
  "The os module": "`os.homedir()`, `os.tmpdir()`, `os.platform()`, and `os.cpus()` expose machine facts portably. `os.tmpdir()` is the safe scratch location for scripts. Reading these beats hard-coding environment assumptions.",
  "__dirname and cwd": "`__dirname` is the directory of the current module file; `process.cwd()` is where the process was launched. They differ when a script is invoked from elsewhere. Resolve asset paths against `__dirname`, never against the launch directory.",
  "writeFileSync and appendFileSync": "`fs.writeFileSync(path, data)` creates or truncates a file; `fs.appendFileSync(path, data)` adds to the end, creating it if missing. Sync writes are simple and correct for CLIs and setup scripts. In servers, prefer the promise variants to avoid blocking the loop.",
  "mkdirSync recursive": "`fs.mkdirSync(dir, { recursive: true })` creates nested directories like `mkdir -p`, succeeding silently when they exist. Always create parent directories before writing files into them. Pair with `path.dirname` to derive the parent from a file path.",
  "readdirSync and statSync": "`fs.readdirSync(dir)` lists entry names; `fs.statSync(p)` reports size, times, and `isDirectory()`/`isFile()`. Together they implement directory scans, size summaries, and file-type grouping. For large trees, use the async or directory-handle variants.",
  "Buffer basics": "`Buffer.from(string)` encodes text to bytes and `buf.toString()` decodes back. Buffers are fixed-size byte arrays for binary protocols, hashes, and file I/O. `Buffer.length` counts bytes while `string.length` counts characters — they differ for multibyte text.",
  "Readable and writable streams": "Streams process data in chunks: readables emit `data` and `end`, writables accept `write()` and `end()`. They handle files and sockets larger than memory with a constant footprint. Events plus backpressure signals are the whole interface.",
  "pipe and pipeline": "`readable.pipe(writable)` forwards chunks with backpressure; `stream.pipeline(...)` wires several stages with unified error handling and cleanup. Prefer `pipeline` — bare `pipe` silently drops errors. Transforms in the middle map data as it flows.",
  "execFileSync basics": "`execFileSync(file, args)` runs a program and returns its stdout as a buffer, throwing on non-zero exit. It takes an argument array with no shell involved, so there is no injection risk from arguments. Use it for deterministic helper invocations in scripts.",
  "spawn vs exec": "`spawn` streams output incrementally for long-running processes; `exec` and `execFile` buffer it all for short ones. Sync variants block until exit and suit CLIs. Choose streaming when output is large or the process stays alive.",
  "Communicating via stdio": "A child's `stdin`, `stdout`, and `stderr` are pipes you write to and read from: send input, collect output, log errors separately. `stdio: 'inherit'` shares the parent console for interactive tools. Structured parent-child protocols usually speak JSON over these pipes.",
  "The scripts field": "`package.json` `scripts` maps names to shell commands: `npm run build` executes the entry. Scripts compose with `&&`, share `node_modules/.bin` on PATH, and document the project's workflows. They are the project's task runner with zero dependencies.",
  "pre/post hooks": "npm auto-runs `pre<name>` before and `post<name>` after `npm run <name>` — `pretest` can lint before tests run. Hooks chain standard workflows without wrapper scripts. Keep them fast, since they gate the main script.",
  "npx and local binaries": "`npx tool` runs the project's local `node_modules/.bin` version, installing a temporary copy only if absent. Never rely on global installs in shared projects. `npx` guarantees every contributor runs the same binary.",
  "ESLint rules": "ESLint flags bug-prone patterns such as `no-unused-vars`, `eqeqeq`, and `no-eval`, and enforces style consistently. Rules are configured per project in a flat config file. Linting catches an entire class of mistakes that tests miss.",
  "Prettier formatting": "Prettier rewrites code to one canonical style — quotes, commas, line width — ending formatting debates. It runs on save or as a check in CI. Formatting is separate from linting: Prettier owns layout, ESLint owns correctness.",
  "Typecheck in CI": "Running `tsc --noEmit` in CI rejects code that does not typecheck before it merges. Fast automated gates beat review comments. A green check means the change at least compiles and passes the project's static rules.",
  "process.env": "`process.env.NAME` reads environment variables as strings, or `undefined` when absent. Twelve-factor apps configure ports, keys, and URLs this way instead of hard-coding. Values are always strings — convert numbers and booleans explicitly.",
  "dotenv conventions": "A `.env` file holds `KEY=value` pairs loaded into `process.env` at startup by the `dotenv` package in development. Never commit real secrets — commit `.env.example` instead. Production injects real variables through the platform, not the file.",
  "Config validation": "Parse and validate configuration at startup: coerce types, apply defaults, and throw on missing required keys. Failing fast with a clear message beats a cryptic crash mid-run. A single `loadConfig()` function keeps every assumption in one place.",
  "Parsing process.argv": "`process.argv.slice(2)` yields the user's arguments as strings. Libraries like `yargs` turn them into options, flags, and help text. Even hand-rolled parsing should separate flags such as `--port` from positionals such as `serve`.",
  "Flags vs positionals": "Flags are named (`--port 3000`, `--verbose`); positionals are bare (`serve`, `file.txt`). Flags configure how, positionals say what. Parse flags into an options object and validate positionals before acting.",
  "Reading stdin": "Piped input arrives on `process.stdin` — read it fully for filters or line-by-line for interactive prompts. A CLI that accepts both argv and stdin composes with every other tool. Check `process.stdin.isTTY` to detect interactive use.",
  "Scanning a directory": "`fs.readdirSync` plus `path.extname` turns a folder into a file list you can group, count, or move. Skip hidden files and subdirectories deliberately. Scanning is the read half of every organizer, migrator, and static-site generator.",
  "Grouping by extension": "Tally files into buckets keyed by `path.extname(name)` with a fallback for extensionless files. Counts per bucket summarize a directory at a glance. The same grouping pattern powers reports, organizers, and cleanup tools.",
  "Designing CLI output": "Print one result per line for piping, a summary count for humans, and non-zero exit codes on failure. Machine-readable first lines plus a human summary satisfy both audiences. Predictable output is what makes a CLI scriptable.",
  "createServer": "`http.createServer(handler)` builds a server whose handler receives `(req, res)` per request. The handler reads the method and URL, then writes a status, headers, and body. One function is the entire request lifecycle.",
  "req and res objects": "`req` describes the incoming message — method, URL, and headers — while `res` builds the reply with `writeHead` and `end`. Read the request completely before responding to it. Small handlers that do one route each stay readable as the server grows.",
  "Listening on a port": "`server.listen(port, host)` binds the server; port `0` asks the OS for a free ephemeral port, read back via `server.address().port`. Bind to `127.0.0.1` for local-only development. Always `close()` the server in scripts so the process can exit.",
  "URL routing tables": "A routing table maps `METHOD + path` strings to handler functions, replacing nested ifs with a lookup. Misses fall through to a 404 handler. Tables are data — you can log them, test them, and generate docs from them.",
  "Middleware chains": "Middleware is a pipeline of functions where each step can preprocess, then call `next()` to continue or respond early. Logging, auth, and parsing each become one composable unit. Order matters: registration order is execution order.",
  "Method dispatch": "Dispatching on the HTTP method gives each verb one job: GET reads, POST creates, PUT replaces, DELETE removes. Unknown method/route pairs return 404 or 405. Explicit dispatch keeps side effects exactly where the method promises them.",
  "Resources and status codes": "Model nouns as resources (`/notes/3`) and report outcomes with status codes: 200 for reads, 201 for creates, 400 for bad input, 404 for missing. Codes let clients branch without parsing bodies. Consistent codes are the API's contract.",
  "JSON request bodies": "Clients send JSON with a `content-type: application/json` header; servers parse it with `JSON.parse` or `req.json()`. Always validate the parsed shape before using it. A body that fails validation is a 400, never a crash.",
  "REST conventions": "REST uses resources, standard verbs, and stateless requests: every call carries its own context and GETs have no side effects. Plural nouns, stable ids, and predictable routes make an API learnable. Conventions turn endpoints into a language clients can guess.",
  "URL and URLSearchParams": "`new URL(str, base)` parses a URL into `hostname`, `pathname`, and `searchParams`; `searchParams.get/set` reads and edits query values with proper encoding. Never build query strings by hand — encoding edge cases will bite. Parse once, then work with the object.",
  "data: URL fetching": "`fetch` accepts `data:` URLs, which embed the response body inline — perfect for deterministic demos and tests with no network. The same `Response` API (`ok`, `status`, `json()`) applies. Use them whenever a test needs a response but not a server.",
  "Checking res.ok": "Fetch resolves on any HTTP response — even 404 and 500 — and rejects only on network failure. Check `res.ok` (true for 200–299) before trusting the body. Explicit status checks turn silent wrong-data bugs into loud handled errors.",
  "Request methods": "`new Request(url, { method, headers, body })` stages the verb, headers, and payload before sending. GET and HEAD carry no body; POST, PUT, PATCH, and DELETE do. Naming the method explicitly documents the intent of every call.",
  "Sending JSON bodies": "Serialize payloads with `JSON.stringify` and label them `content-type: application/json` so the receiver parses correctly. Keep bodies small and shaped like the resource. The server should echo back the created representation with a 201.",
  "Status code handling": "Branch on status families: 2xx success, 4xx caller error, 5xx server error. Retry 5xx and network failures with backoff; surface 4xx to the user as fixable input problems. Status-driven handling is what separates robust clients from hopeful ones.",
  "Promise.all recap": "`Promise.all` runs independent promises concurrently and resolves with results in input order. One rejection rejects the whole batch. It is the default tool for parallel fetches — measure speedups against sequential awaits to feel the difference.",
  "Promise.race": "`Promise.race` settles with the first promise to settle, ignoring the rest. It implements timeouts: race the real work against a rejecting timer. Remember the losers still run — race does not cancel them.",
  "Promise.allSettled": "`Promise.allSettled` waits for every promise and reports each as `{ status: 'fulfilled', value }` or `{ status: 'rejected', reason }`. It is the right choice for bulk work where partial failure is acceptable. Tally the statuses to summarize the batch.",
  "queueMicrotask": "`queueMicrotask(fn)` schedules `fn` right after the current synchronous work, before timers and I/O. It is the explicit way to defer without a timer. Use it for follow-up bookkeeping that must run before the event loop moves on.",
  "process.nextTick": "`process.nextTick(fn)` runs before the microtask queue drains — the earliest deferral available in Node. It is powerful and easy to starve I/O with, so prefer `queueMicrotask` unless ordering truly demands nextTick. Framework internals use it; application code rarely should.",
  "Microtask draining": "After each synchronous turn, the engine empties the microtask queue (promise callbacks, `queueMicrotask`) before taking the next macrotask (timers, I/O). Chained microtasks can therefore delay timers indefinitely. Understanding the drain order predicts exact log sequences.",
  "setTimeout vs setInterval": "`setTimeout` fires once after at least the delay; `setInterval` repeats until cleared. Both take minimum delays, not guarantees, and both return handles for cancellation. Prefer recursive `setTimeout` over `setInterval` when the work itself takes variable time.",
  "Debounce pattern": "Debouncing resets a timer on every call and only fires after calls stop for the wait period — ideal for search-as-you-type. One trailing execution replaces many redundant ones. Keep the timer handle in a closure so each debounced function is independent.",
  "Throttle pattern": "Throttling allows at most one execution per window — ideal for scroll and resize handlers. Leading-edge fires immediately then locks; trailing-edge fires the last call after the window. Pick the edge that matches the UX: immediate feedback or final state.",
  "Subclassing Error": "`class HttpError extends Error` adds fields like `status` while keeping `message` and `stack`. Always call `super(message)` first and set `this.name` to the class name. Typed errors let callers branch with `instanceof` instead of string-matching messages.",
  "cause property": "`throw new Error('failed', { cause: original })` chains errors so the root problem travels with the wrapper. Loggers print the chain; debuggers follow it. Causes turn 'something broke' into 'this broke because that broke'.",
  "instanceof checks": "`err instanceof HttpError` tests the error's class through the prototype chain, surviving minification better than name strings. Order catch branches from most specific to most general. Unknown shapes fall through to a generic handler.",
  "Reading stack traces": "A stack trace lists frames from the throw site outward: first line is the message, following lines are `at fn (file:line:col)`. Read top-down to find your code below library frames. The first frame naming your file is usually where the fix belongs.",
  "console tracing": "Beyond `log`, reach for `console.table` for arrays, `console.dir(obj, { depth: null })` for deep inspection, and `console.trace()` to print the current stack on demand. Timed pairs (`time`/`timeEnd`) localize slowness. Tracing beats guessing.",
  "node --inspect concept": "`node --inspect` exposes the process to Chrome DevTools for breakpoints, stepping, and heap snapshots. Pair it with `debugger` statements as programmatic breakpoints. Inspectors turn invisible async flows into visible paused frames.",
  "Regex literals": "`/pattern/flags` compiles a regular expression inline; flags like `g` (global), `i` (case-insensitive), and `m` (multiline) change matching. Literals are the clearest form for static patterns. Build dynamic patterns with `new RegExp(string)` instead.",
  "test and exec": "`re.test(str)` returns a boolean — the fastest existence check. `re.exec(str)` returns match details (groups, index) or null, advancing `lastIndex` on global regexes. Use `test` for branching and `exec` when you need the captured pieces.",
  "Character classes": "`[A-Za-z]`, `\\d` (digits), `\\w` (word chars), and `\\s` (whitespace) match sets of characters; `[^...]` negates and `+`/`*`/`?`/`{n,m}` set counts. Classes plus quantifiers describe most real-world formats. Anchor with `^` and `$` when the whole string must match.",
  "Capture groups": "`(a)(b)` captures substrings accessible as `match[1]`, `match[2]`; `(?:...)` groups without capturing. Groups split a match into meaningful parts. Prefer non-capturing groups when you only need precedence, not the pieces.",
  "Named groups": "`(?<year>\\d{4})` labels a group, readable via `match.groups.year` instead of numeric indices. Names document intent at the pattern site. They make long patterns with several groups maintainable.",
  "Replace with functions": "`str.replace(re, (match, g1) => ...)` computes each replacement from the match, enabling swaps, lookups, and case transforms. Function replacers beat `$1` templates when logic is involved. Return the exact string to splice in.",
  "The Date object": "`new Date(isoString)` parses timestamps; getters like `getUTCFullYear()` read fields. Dates are milliseconds since the epoch under the hood. Construct from ISO strings and read with UTC methods for deterministic behavior.",
  "Timestamps and arithmetic": "`date.getTime()` is epoch milliseconds, so subtracting dates yields durations and adding offsets shifts them. Durations in ms convert cleanly to seconds, minutes, and days. Arithmetic on numbers is exact; formatting is where locales enter.",
  "UTC vs local": "UTC methods (`getUTCHours`) ignore the machine timezone; local methods (`getHours`) follow it. Servers and stored data should speak UTC; display converts to the viewer's zone. Mixing the two is the classic off-by-hours bug.",
  "Intl.NumberFormat": "`new Intl.NumberFormat('en-US').format(1234567.89)` renders locale-correct grouping and decimals. Options control currency, units, and fraction digits. Never hand-format numbers for display — locales disagree on separators.",
  "Intl.DateTimeFormat": "`new Intl.DateTimeFormat(locale, { timeZone, dateStyle })` renders dates per locale with an explicit zone. Fix `timeZone: 'UTC'` for deterministic output. Dates are the hardest display problem; `Intl` solves it once for every locale.",
  "List and relative formats": "`Intl.ListFormat` joins items with locale conjunctions ('a, b, and c'); `Intl.RelativeTimeFormat` renders '3 days ago'. Human phrasing varies by language — these APIs carry the grammar. Display strings should always flow through them.",
  "=== vs Object.is": "`Object.is(a, b)` is SameValue equality: like `===` except `NaN` equals `NaN` and `-0` differs from `+0`. Reach for it in numeric code and value comparisons where those edges matter. For everything else, `===` reads better.",
  "NaN equality": "`NaN` is the only value unequal to itself, so `x === NaN` is always false. Test with `Number.isNaN(x)` and find with `Array.prototype.includes`, both of which use SameValueZero. Any computation that can produce `NaN` needs an explicit check.",
  "-0 vs +0": "IEEE floats distinguish `-0` from `+0`: they compare equal with `===` but divide differently (`1/-0` is `-Infinity`). `Object.is` tells them apart. You will rarely care — except in numeric libraries, where this edge is load-bearing.",
  "node:assert/strict": "`require('node:assert/strict')` gives `equal`, `deepEqual`, and `throws` with strict semantics and no coercion. Failed assertions throw with diffs. The stdlib assert module is a complete test foundation with zero dependencies.",
  "node:test runner": "`node --test` discovers and runs test files, reporting TAP with pass/fail counts and durations. Tests are just functions using `assert` — no framework to install. The built-in runner is the fastest path from 'no tests' to 'tested'.",
  "Assertions as specs": "Each assertion states one fact the code must uphold: inputs map to outputs, errors throw, shapes hold. A failing assertion names the broken contract. Write assertions as executable specifications, not afterthoughts.",
  "Arrange-act-assert": "Structure every test in three phases: arrange inputs, act by calling the code, assert the outcome. The pattern makes tests scannable and failures localizable. One behavior per test keeps the signal clean.",
  "Fake timers and stubs": "Replace time and I/O with fakes — fixed clocks, stub functions recording calls — so tests are instant and deterministic. Inject dependencies instead of importing them directly. Deterministic tests run the same way a thousand times in a row.",
  "Table-driven tests": "List input/expected pairs in an array and loop one shared assertion over them. New cases become one-line additions. Tables turn edge-case coverage from a chore into data entry.",
  "Narrowing with typeof": "`if (typeof v === 'string')` shrinks `string | number` to `string` for the rest of the block — TypeScript tracks the check. `typeof`, `instanceof`, and truthiness checks are the everyday narrowing tools. Narrow before you use; the compiler verifies the order.",
  "Discriminated unions": "A shared literal field like `{ kind: 'circle' } | { kind: 'square' }` lets `switch (shape.kind)` narrow each branch exactly. The discriminant is both runtime data and a compile-time tag. This is the idiomatic way to model variants.",
  "Type predicate functions": "`function isFish(p): p is Fish` packages a check into a reusable guard the compiler trusts. Callers get narrowing wherever the predicate is used. Predicates turn repeated inline checks into named, tested concepts.",
  "Partial, Pick and Omit": "`Partial<T>` makes all fields optional, `Pick<T, K>` selects a subset, and `Omit<T, K>` drops keys — all computed from one source type. Derive variants instead of redeclaring shapes. One canonical type plus utilities beats five hand-synced interfaces.",
  "Generic utility patterns": "Utilities like `Readonly<T>`, `Record<K, V>`, and `ReturnType<F>` are generic transformations you apply to your own types. Learn to read `T[K]` and `keyof T` — they are the vocabulary of type-level programming. Compose utilities rather than writing bespoke mapped types first.",
  "ReturnType and Parameters": "`ReturnType<typeof fn>` extracts a function's return type and `Parameters<typeof fn>` its parameter tuple, so wrappers stay in sync with the wrapped function. Refactoring the implementation updates all derived types automatically. Never restate what the compiler can derive.",
  "In-memory resource store": "A `Map` keyed by auto-incremented id is a complete persistence stand-in: create, read, list, and delete in a dozen lines. It separates storage logic from HTTP so each is testable alone. Swap it for a database later without changing the API shape.",
  "Route handlers": "Each handler takes parsed input, calls the store, and returns `{ status, body }` — pure logic with no socket code. Handlers are unit-testable functions. Thin HTTP glue adapts them to any server.",
  "Status codes by outcome": "Map results to codes at one boundary: 201 with the created body, 200 with listings, 400 for invalid input, 404 for missing ids. Clients learn one rule instead of per-endpoint quirks. Codes are the machine-readable half of your API docs.",
  "Generic constraints recap": "`function f<T extends { length: number }>(x: T)` constrains a type parameter so the body can safely use `.length`. Constraints balance generality with guarantees. Use the weakest constraint that supports the operations you need.",
  "Mapped types": "`{ [K in keyof T]: T[K] }` rebuilds a type key by key, optionally adding `readonly` or `?` modifiers. Mapped types turn repetitive interface variants into one-liners. They are loops for the type system.",
  "Conditional types": "`T extends string ? A : B` selects a type by testing assignability — logic Gates for types. Combined with `infer`, conditionals unwrap promises, arrays, and function signatures. They are the engine inside most advanced utilities.",
  "Declaration files": "A `.d.ts` file carries types with no runtime code, describing a module's public shape. Hand-written declarations cover untyped libraries; generated ones ship beside compiled output. Types travel separately from implementation.",
  "Ambient modules": "`declare module 'legacy-lib' { ... }` tells TypeScript the shape of code it cannot see — plain JS, CDN globals, or native addons. Ambient declarations are promises you must keep accurate. Wrong declarations fail silently at the type level and loudly at runtime.",
  "Publishing types": "Ship generated `.d.ts` beside compiled `.js` (or inline them with `types` in `package.json`) so consumers get checking without configuration. Test the packaged types by importing the built output. Types are part of the release, not an afterthought.",
  "strictNullChecks": "With `strictNullChecks`, `null` and `undefined` are distinct types that must be handled — no silent billion-dollar mistakes. Optional chaining (`?.`) and explicit guards satisfy the checker. Strictness moves null crashes from production to compile time.",
  "unknown vs any": "`any` disables checking entirely; `unknown` is the safe counterpart that forces narrowing before use. Prefer `unknown` for untrusted input like parsed JSON. The extra check is one line and the safety is total.",
  "never for impossible branches": "`never` marks code that cannot run — exhaustive switch defaults, functions that always throw. Assigning to `never` in a default branch makes unhandled variants a compile error. Exhaustiveness turns forgotten cases into build failures.",
  "Form elements": "Inputs, selects, textareas, and buttons expose their state as properties (`input.value`, `checkbox.checked`) — read them, never scrape text. Name fields so `FormData` serializes them predictably. The form element is the single source of truth for its data.",
  "submit handling": "Listen for `submit` on the form (not `click` on the button), call `preventDefault()`, then read and validate. Submit covers Enter-key and button paths uniformly. Handle asynchronously and disable the button while pending to prevent double posts.",
  "Constraint validation API": "Built-in attributes (`required`, `pattern`, `minlength`) plus `input.checkValidity()` and `setCustomValidity(msg)` give native validation with localized bubbles. Use the platform's checks before custom logic. Custom messages should name the fix, not just the failure.",
  "createElement patterns": "`document.createElement(tag)` plus `textContent` assignment builds nodes safely — no HTML parsing, no injection. Set attributes via properties or `setAttribute`, then `appendChild` once. Created nodes are inert until inserted, so batch construction off-DOM.",
  "Efficient list rendering": "Render lists by building a `DocumentFragment` of nodes and appending once, keyed to stable ids for updates. One insertion means one layout pass. For large lists, render windows of visible rows instead of the whole dataset.",
  "Event delegation for lists": "One listener on the container plus `event.target.closest('li')` handles every row — present and future — with a single subscription. Delegation replaces per-row listeners and survives re-renders. Read data from `dataset` attributes on the matched row.",
  "localStorage": "`localStorage` persists string key/value pairs across sessions on one origin, with a ~5MB quota. It is synchronous, so keep values small and access infrequent. Store tokens and preferences, never large datasets.",
  "sessionStorage": "`sessionStorage` shares the `localStorage` API but dies with the tab — ideal for per-tab drafts and wizard state. Opening the same page twice gives independent stores. Choose session scope when sharing across tabs would corrupt state.",
  "Cookies vs storage": "Cookies travel with every HTTP request (good for session ids, bad for bulk) and support expiry and `HttpOnly` flags; web storage stays client-side with larger quotas. Auth tokens that the server must see belong in cookies; UI state belongs in storage.",
  "Worker basics": "`new Worker('work.js')` runs a script on a separate thread with no DOM access. Workers suit parsing, crypto, and image processing that would jank the UI. Spawning costs milliseconds — reuse one worker rather than creating many.",
  "postMessage protocol": "Main thread and worker exchange data with `postMessage` and `onmessage`, transferring or cloning structured data. Design small message shapes (`{ type, payload }`) like an API. Never share mutable objects — messages are the only bridge.",
  "When to offload work": "Offload tasks that block frames: over ~50ms of compute, large parses, or bulk transforms. Keep DOM reads/writes on the main thread and ship pure data to the worker. Measure frame drops before and after to prove the win.",
  "Async iterators": "An async iterator's `next()` returns a promise of `{ value, done }`, and `[Symbol.asyncIterator]()` supplies one. It models paged APIs, streams, and event sequences uniformly. Consumers pull at their own pace with backpressure built in.",
  "for await...of": "`for await (const x of source)` consumes async iterables with familiar loop syntax, awaiting each step. Errors throw into the loop for `try/catch` handling. It flattens callback-and-promise streaming code into readable lines.",
  "Backpressure basics": "Backpressure is the consumer telling the producer to slow down — pausing reads, awaiting writes, bounding queues. Without it, fast producers exhaust memory. Every stream API has a signal for it; ignoring the signal is the classic streaming bug.",
  "on and emit": "`emitter.on(event, fn)` subscribes and `emitter.emit(event, ...args)` synchronously invokes all listeners in registration order. The emitter decouples producers from consumers — neither imports the other. It is the observer pattern in the stdlib.",
  "once": "`emitter.once(event, fn)` auto-unsubscribes after the first invocation — perfect for ready/connected signals. One-shot semantics prevent duplicate handling. Use `once` whenever a second firing would be a bug.",
  "Removing listeners": "`emitter.off(event, fn)` (alias `removeListener`) detaches a subscription; forgetting to detach in long-lived processes leaks memory and causes duplicate work. Pair every `on` in setup code with an `off` in teardown. The `newListener` introspection APIs audit subscriptions.",
  "URL parsing": "`new URL(input, base)` splits an address into protocol, host, port, path, and query — throwing on invalid input. Relative inputs resolve against the base. Parse first and branch on fields instead of regexing raw strings.",
  "URLSearchParams editing": "`searchParams.set/append/delete` mutate the query with correct encoding, and `toString()` serializes it back. Multi-value keys need `getAll`. Treat the query as a map, never as string surgery.",
  "Relative resolution": "Resolving `'/users?page=2'` against `'https://example.com'` yields a full URL — the same algorithm browsers and `fetch` use. Build links and redirects from bases plus relative parts. Resolution keeps environments (dev, staging, prod) interchangeable.",
  "Shape validation": "Check that input has the expected fields with the expected types before using it, collecting every violation. Validation at the boundary keeps core logic total — no defensive checks scattered everywhere. A validator returns errors, never throws for bad input.",
  "Required fields": "Distinguish missing (`undefined`) from present-but-invalid: report 'required' for the former and type errors for the latter. Optional fields need defaults documented alongside. Explicit required lists make APIs self-describing.",
  "Error messages": "Validation messages should name the field, the rule, and the received value: `age must be a number, got string`. Machines get codes, humans get sentences. Good messages turn support tickets into self-service fixes.",
  "SHA-256 hashing": "`crypto.createHash('sha256').update(data).digest('hex')` fingerprints content deterministically — same input, same 64 hex chars. Hashes verify integrity and deduplicate content. They are one-way: the digest never reveals the input.",
  "HMAC signatures": "`crypto.createHmac('sha256', secret).update(msg).digest('hex')` proves both integrity and authenticity — only key holders can mint valid tags. Webhooks and tokens rely on HMAC. Compare tags with `timingSafeEqual` to avoid side-channel leaks.",
  "Random ids": "`crypto.randomUUID()` mints collision-proof v4 ids; `crypto.randomBytes(n)` supplies raw entropy for tokens. Never use `Math.random` for secrets — it is predictable. System entropy is the only acceptable dice for security.",
  "XSS basics": "Cross-site scripting injects attacker markup into pages that then run with your origin's privileges. Any unescaped user string rendered as HTML is a vector. The defense is escaping on output, not filtering on input.",
  "Escaping HTML": "Replace `&`, `<`, `>`, quotes with entities (`&amp;`, `&lt;`, ...) before interpolating strings into HTML. Escape at the rendering boundary, exactly once. `textContent` assignment escapes by construction — prefer it over `innerHTML` for user data.",
  "Never trust input": "Validate and escape on the server regardless of client checks — requests can be forged. Treat every header, param, and body as hostile until proven shaped. Defense in depth means each layer assumes the previous one was bypassed.",
  "Big-O intuition": "Big-O describes growth: O(1) constant, O(n) linear, O(n^2) quadratic, O(log n) halving. Double the input and watch the work: unchanged, doubled, quadrupled. Naming the growth class predicts behavior long before benchmarking.",
  "Counting steps": "Instrument loops with counters to measure exact operation counts for a given input size. Counts are deterministic — unlike wall-clock timings — so they belong in tests and gates. A count that quadruples when n doubles proves quadratic behavior.",
  "Benchmarks vs counts": "Benchmarks measure wall time (noisy, machine-dependent); counts measure work (stable, portable). Use counts to assert complexity in tests and benchmarks to compare implementations on one machine. Never gate correctness on timings.",
  "chunk and groupBy": "`chunk(arr, size)` slices arrays into fixed pages; `groupBy` buckets items by a key function. Both are pure, total, and trivially testable. Small collection utilities compose into reports, pagination, and histograms.",
  "Testing your own lib": "Test utilities with table-driven cases: empty input, single page, exact multiples, remainders. Libraries earn trust through edge coverage, not happy paths. Every exported function gets a spec describing its contract.",
  "API design": "Name functions for what they return, keep signatures positional-minimal, and return new values instead of mutating. Consistent naming (`chunk`, `groupBy`, `unique`) makes a library guessable. Design the README examples first, then implement to match.",
  "package.json metadata": "`name`, `version`, `description`, `exports`, and `files` declare identity, entry points, and published contents. Registries render metadata as the package page. Accurate metadata is how strangers evaluate your library in thirty seconds.",
  "Exports map": "The `exports` field maps subpaths (`'.'`, `'./utils'`) to files, hiding internals from importers. Only exported paths are importable — everything else is private by construction. Maps also select per-condition entries (node vs browser).",
  "Versioning semver": "`MAJOR.MINOR.PATCH` signals compatibility: breaking, feature, fix. Consumers pin ranges trusting the contract. Automate releases from conventional commits so versions stay honest.",
  "JSDoc annotations": "`@param {type} name` and `@returns {type}` document contracts where TypeScript is absent, and editors surface them as hover help. Types plus prose beat either alone. Documented functions get used correctly the first time.",
  "README structure": "A README needs: what, install, quick example, API list, and license — in that order. Examples must be copy-paste runnable. Structure respects the reader's time: thirty seconds to value, five minutes to depth.",
  "Examples as docs": "Runnable examples are tests for understanding: they compile in the reader's head and run in their terminal. Every feature gets one minimal snippet. If the example needs explaining, simplify the feature.",
  "Extract function": "Name a block and give it parameters: the call site states intent while the body holds mechanism. Extract when a comment would explain what code does. Small named functions are the cheapest documentation.",
  "Rename for clarity": "Names should state role and unit: `pendingNotes`, `timeoutMs`, `isActive`. Rename the moment a name misleads — IDEs make it safe. Clarity compounds: each good name makes the next reader faster.",
  "Remove duplication": "Merge near-identical blocks behind one parameterized function, keeping a single source of truth. Duplication doubles every future fix. Three copies is the classic threshold — two may be coincidence, three is a pattern.",
  "Abort signals": "An `AbortController`'s `signal` notifies async work to stop: listeners clean up timers and reject pending promises. Signals compose — one controller can cancel a whole operation tree. Cancellation is cooperative: code must listen to be stoppable.",
  "fetch with timeout": "Race `fetch` against a timer that aborts the controller, so hung servers cannot hang your program. Timeouts need values per call site — payments wait longer than autocomplete. Always clear the timer on success to avoid stray aborts.",
  "Cleanup on abort": "Abort handlers must clear timers, close streams, and release handles — otherwise cancellation leaks the resources it was meant to save. Register cleanup with the signal, not after it. Test abort paths as deliberately as success paths.",
  "Wiring routes to a store": "Connect each route handler to store operations: validate input, call the store, map the result to a status. The wiring layer is thin by design — logic lives in handlers and storage. Thin wiring is trivially reviewable.",
  "Self-test script": "A script that exercises every route and asserts statuses turns the capstone into a verified build, not a demo. Run it before every commit. Self-tests are the project's immune system.",
  "README and next steps": "Document what was built, how to run it, what the endpoints do, and what comes next: persistence, auth, deployment. Honest next steps turn a finished project into a roadmap. Shipping includes the story of what ships.",
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
  "The prototype chain": {
    q: "Where does a failed own-property lookup go next?",
    opts: [
      { id: "a", text: "Up the prototype chain", correct: true },
      { id: "b", text: "To the global object", correct: false },
      { id: "c", text: "It throws immediately", correct: false },
      { id: "d", text: "To the event loop", correct: false },
    ],
  },
  "__proto__ vs prototype": {
    q: "What is __proto__ on an instance?",
    opts: [
      { id: "a", text: "The constructor's source text", correct: false },
      { id: "b", text: "The instance's link to its prototype", correct: true },
      { id: "c", text: "A static class method", correct: false },
      { id: "d", text: "The module exports object", correct: false },
    ],
  },
  "hasOwnProperty and shadowing": {
    q: "What does assigning obj.key = v do when key is inherited?",
    opts: [
      { id: "a", text: "Deletes the inherited property", correct: false },
      { id: "b", text: "Throws a TypeError", correct: false },
      { id: "c", text: "Creates an own property that shadows it", correct: true },
      { id: "d", text: "Mutates the prototype directly", correct: false },
    ],
  },
  "Object.create": {
    q: "What does Object.create(proto) return?",
    opts: [
      { id: "a", text: "A copy of proto's source code", correct: false },
      { id: "b", text: "The proto object itself", correct: false },
      { id: "c", text: "A JSON string", correct: false },
      { id: "d", text: "A new object with proto as prototype", correct: true },
    ],
  },
  "Property descriptors": {
    q: "Which flags does a property descriptor control?",
    opts: [
      { id: "a", text: "writable, enumerable, configurable", correct: true },
      { id: "b", text: "public, private, protected", correct: false },
      { id: "c", text: "sync, async, await", correct: false },
      { id: "d", text: "read, write, execute", correct: false },
    ],
  },
  "Object.freeze and seal": {
    q: "What does Object.freeze(obj) prevent?",
    opts: [
      { id: "a", text: "Reading any property", correct: false },
      { id: "b", text: "Adds, deletes, and writes to properties", correct: true },
      { id: "c", text: "Passing obj to functions", correct: false },
      { id: "d", text: "Logging obj to the console", correct: false },
    ],
  },
  "The Symbol type": {
    q: "What makes Symbol useful as a property key?",
    opts: [
      { id: "a", text: "It is always a string", correct: false },
      { id: "b", text: "It serializes to JSON", correct: false },
      { id: "c", text: "Every Symbol is guaranteed unique", correct: true },
      { id: "d", text: "It is faster than strings", correct: false },
    ],
  },
  "Well-known symbols": {
    q: "What does implementing [Symbol.iterator] enable?",
    opts: [
      { id: "a", text: "JSON serialization", correct: false },
      { id: "b", text: "Automatic type coercion", correct: false },
      { id: "c", text: "Garbage collection", correct: false },
      { id: "d", text: "Use with for...of and spread", correct: true },
    ],
  },
  "Global symbol registry": {
    q: "How does Symbol.for(key) differ from Symbol(key)?",
    opts: [
      { id: "a", text: "Symbol.for returns a shared symbol per key", correct: true },
      { id: "b", text: "Symbol.for returns a string", correct: false },
      { id: "c", text: "Symbol.for throws on reuse", correct: false },
      { id: "d", text: "There is no difference", correct: false },
    ],
  },
  "The iterator protocol": {
    q: "What shape must an iterator's next() return?",
    opts: [
      { id: "a", text: "A Promise", correct: false },
      { id: "b", text: "{ value, done }", correct: true },
      { id: "c", text: "A string", correct: false },
      { id: "d", text: "An array", correct: false },
    ],
  },
  "Generator functions": {
    q: "What does calling a function* return?",
    opts: [
      { id: "a", text: "A paused generator object", correct: true },
      { id: "b", text: "The final return value", correct: false },
      { id: "c", text: "A Promise", correct: false },
      { id: "d", text: "An array of yields", correct: false },
    ],
  },
  "yield and next": {
    q: "What does gen.next(input) do with input?",
    opts: [
      { id: "a", text: "Ignores it completely", correct: false },
      { id: "b", text: "Uses it as the next yield count", correct: false },
      { id: "c", text: "Feeds it back as the paused yield's result", correct: true },
      { id: "d", text: "Restarts the generator", correct: false },
    ],
  },
  "Private class fields": {
    q: "How is a #field different from a _conventional one?",
    opts: [
      { id: "a", text: "It is faster to access", correct: false },
      { id: "b", text: "It is serialized to JSON", correct: false },
      { id: "c", text: "It is inherited by subclasses", correct: false },
      { id: "d", text: "The engine enforces access from outside", correct: true },
    ],
  },
  "WeakMap privacy pattern": {
    q: "Why does the WeakMap privacy pattern not leak memory?",
    opts: [
      { id: "a", text: "Entries vanish when the key instance is collected", correct: true },
      { id: "b", text: "WeakMaps store only strings", correct: false },
      { id: "c", text: "WeakMaps auto-delete after one read", correct: false },
      { id: "d", text: "The pattern uses global variables", correct: false },
    ],
  },
  "Closures vs #fields": {
    q: "When do you prefer a closure over a #field for privacy?",
    opts: [
      { id: "a", text: "Inside factory functions rather than classes", correct: true },
      { id: "b", text: "When you need JSON serialization", correct: false },
      { id: "c", text: "When subclasses must access it", correct: false },
      { id: "d", text: "Never — closures are obsolete", correct: false },
    ],
  },
  "Mixin functions": {
    q: "What does a mixin do?",
    opts: [
      { id: "a", text: "Creates a subclass automatically", correct: false },
      { id: "b", text: "Stamps shared methods onto a target", correct: true },
      { id: "c", text: "Freezes an object", correct: false },
      { id: "d", text: "Merges two arrays", correct: false },
    ],
  },
  "Composition over inheritance": {
    q: "Why prefer composition to deep inheritance?",
    opts: [
      { id: "a", text: "It runs faster on all engines", correct: false },
      { id: "b", text: "It avoids the need for classes", correct: false },
      { id: "c", text: "Parts stay small, testable, and replaceable", correct: true },
      { id: "d", text: "It uses less syntax", correct: false },
    ],
  },
  "Object.assign behaviors": {
    q: "Is Object.assign(target, src) deep or shallow?",
    opts: [
      { id: "a", text: "Deep — nested objects are cloned", correct: false },
      { id: "b", text: "It does not copy at all", correct: false },
      { id: "c", text: "It only copies functions", correct: false },
      { id: "d", text: "Shallow — nested objects are shared", correct: true },
    ],
  },
  "Static initialization blocks": {
    q: "When does a static { } block run?",
    opts: [
      { id: "a", text: "Once when the class is defined", correct: true },
      { id: "b", text: "On every instantiation", correct: false },
      { id: "c", text: "On every method call", correct: false },
      { id: "d", text: "When the module is imported twice", correct: false },
    ],
  },
  "Multi-level inheritance": {
    q: "In C extends B extends A, what should each level add?",
    opts: [
      { id: "a", text: "A full copy of the parent's methods", correct: false },
      { id: "b", text: "One coherent responsibility", correct: true },
      { id: "c", text: "A new constructor only", correct: false },
      { id: "d", text: "Nothing — levels are decorative", correct: false },
    ],
  },
  "instanceof chains": {
    q: "If C extends B, what is new C() instanceof B?",
    opts: [
      { id: "a", text: "true — the chain is walked", correct: true },
      { id: "b", text: "false — only the direct class matches", correct: false },
      { id: "c", text: "It throws a TypeError", correct: false },
      { id: "d", text: "undefined", correct: false },
    ],
  },
  "Proxy traps": {
    q: "What is a Proxy get trap?",
    opts: [
      { id: "a", text: "A function intercepting property reads", correct: true },
      { id: "b", text: "A network request hook", correct: false },
      { id: "c", text: "A garbage collector callback", correct: false },
      { id: "d", text: "A test assertion", correct: false },
    ],
  },
  "The Reflect API": {
    q: "Why use Reflect.set inside a set trap?",
    opts: [
      { id: "a", text: "It skips validation", correct: false },
      { id: "b", text: "It forwards to default semantics cleanly", correct: true },
      { id: "c", text: "It makes the write async", correct: false },
      { id: "d", text: "It deletes the property", correct: false },
    ],
  },
  "Validation via proxies": {
    q: "Where should a validating proxy reject a bad value?",
    opts: [
      { id: "a", text: "In the set trap, before the write lands", correct: true },
      { id: "b", text: "After the program exits", correct: false },
      { id: "c", text: "In a separate process", correct: false },
      { id: "d", text: "Nowhere — proxies cannot validate", correct: false },
    ],
  },
  "WeakMap semantics": {
    q: "What can be a WeakMap key?",
    opts: [
      { id: "a", text: "Only objects", correct: true },
      { id: "b", text: "Only strings", correct: false },
      { id: "c", text: "Only numbers", correct: false },
      { id: "d", text: "Any value including null", correct: false },
    ],
  },
  "WeakSet membership": {
    q: "What is a WeakSet good for?",
    opts: [
      { id: "a", text: "Sorting numbers", correct: false },
      { id: "b", text: "Tagging instances without preventing collection", correct: true },
      { id: "c", text: "Storing JSON strings", correct: false },
      { id: "d", text: "Replacing arrays everywhere", correct: false },
    ],
  },
  "Garbage collection basics": {
    q: "How do you free memory in JavaScript?",
    opts: [
      { id: "a", text: "Call free(obj)", correct: false },
      { id: "b", text: "Delete the variable keyword", correct: false },
      { id: "c", text: "Drop references so the collector reclaims it", correct: true },
      { id: "d", text: "Restart the process", correct: false },
    ],
  },
  "Shallow vs deep copy": {
    q: "After const b = {...a}, mutating b.nested.x affects a because:",
    opts: [
      { id: "a", text: "Spread is shallow — nested objects are shared", correct: true },
      { id: "b", text: "Spread copies nothing", correct: false },
      { id: "c", text: "Objects are immutable", correct: false },
      { id: "d", text: "The engine links the variables", correct: false },
    ],
  },
  "structuredClone": {
    q: "What does structuredClone preserve that JSON copy does not?",
    opts: [
      { id: "a", text: "Functions", correct: false },
      { id: "b", text: "Prototypes like Date", correct: true },
      { id: "c", text: "DOM nodes", correct: false },
      { id: "d", text: "Circular JSON strings", correct: false },
    ],
  },
  "JSON copy limits": {
    q: "What happens to a Date in JSON.parse(JSON.stringify(x))?",
    opts: [
      { id: "a", text: "It stays a Date", correct: false },
      { id: "b", text: "It throws", correct: false },
      { id: "c", text: "It becomes a string", correct: true },
      { id: "d", text: "It becomes null", correct: false },
    ],
  },
  "ESM import/export recap": {
    q: "Why can bundlers tree-shake ESM?",
    opts: [
      { id: "a", text: "Imports are static and analyzable", correct: true },
      { id: "b", text: "ESM runs faster", correct: false },
      { id: "c", text: "ESM has no exports", correct: false },
      { id: "d", text: "Bundlers ignore ESM", correct: false },
    ],
  },
  "CommonJS require/module.exports": {
    q: "What does require(id) return on second call?",
    opts: [
      { id: "a", text: "It re-runs the module", correct: false },
      { id: "b", text: "The cached module.exports", correct: true },
      { id: "c", text: "A Promise", correct: false },
      { id: "d", text: "undefined", correct: false },
    ],
  },
  "Interop and file extensions": {
    q: "What decides whether .js is ESM or CJS?",
    opts: [
      { id: "a", text: "The nearest package.json type field", correct: true },
      { id: "b", text: "The file size", correct: false },
      { id: "c", text: "The Node version", correct: false },
      { id: "d", text: "The operating system", correct: false },
    ],
  },
  "The path module": {
    q: "Why build paths with path.join instead of concatenation?",
    opts: [
      { id: "a", text: "It is shorter to type", correct: false },
      { id: "b", text: "Separators differ between Windows and POSIX", correct: true },
      { id: "c", text: "Concatenation is deprecated", correct: false },
      { id: "d", text: "join validates file contents", correct: false },
    ],
  },
  "The os module": {
    q: "Where should scripts put scratch files?",
    opts: [
      { id: "a", text: "In os.tmpdir()", correct: true },
      { id: "b", text: "In the source directory", correct: false },
      { id: "c", text: "In the user's home root", correct: false },
      { id: "d", text: "In /etc", correct: false },
    ],
  },
  "__dirname and cwd": {
    q: "How do __dirname and process.cwd() differ?",
    opts: [
      { id: "a", text: "They are always identical", correct: false },
      { id: "b", text: "__dirname is the module's dir; cwd is the launch dir", correct: true },
      { id: "c", text: "cwd is the module's dir", correct: false },
      { id: "d", text: "__dirname changes per call", correct: false },
    ],
  },
  "writeFileSync and appendFileSync": {
    q: "Which call adds to a file without truncating it?",
    opts: [
      { id: "a", text: "fs.writeFileSync", correct: false },
      { id: "b", text: "fs.appendFileSync", correct: true },
      { id: "c", text: "fs.readFileSync", correct: false },
      { id: "d", text: "fs.unlinkSync", correct: false },
    ],
  },
  "mkdirSync recursive": {
    q: "What does { recursive: true } do for mkdirSync?",
    opts: [
      { id: "a", text: "Deletes existing directories", correct: false },
      { id: "b", text: "Creates nested dirs, succeeding if they exist", correct: true },
      { id: "c", text: "Makes the call async", correct: false },
      { id: "d", text: "Logs each directory", correct: false },
    ],
  },
  "readdirSync and statSync": {
    q: "How do you tell a directory from a file?",
    opts: [
      { id: "a", text: "readdirSync returns types directly", correct: false },
      { id: "b", text: "fs.statSync(p).isDirectory()", correct: true },
      { id: "c", text: "Check the name length", correct: false },
      { id: "d", text: "Try reading it as text", correct: false },
    ],
  },
  "Buffer basics": {
    q: "What does Buffer.from('abc').length count?",
    opts: [
      { id: "a", text: "Characters", correct: false },
      { id: "b", text: "Bytes", correct: true },
      { id: "c", text: "Lines", correct: false },
      { id: "d", text: "Words", correct: false },
    ],
  },
  "Readable and writable streams": {
    q: "Why use streams for large files?",
    opts: [
      { id: "a", text: "They are faster per byte", correct: false },
      { id: "b", text: "They process chunks with constant footprint", correct: true },
      { id: "c", text: "They skip encoding", correct: false },
      { id: "d", text: "They avoid callbacks", correct: false },
    ],
  },
  "pipe and pipeline": {
    q: "Why prefer stream.pipeline over readable.pipe?",
    opts: [
      { id: "a", text: "It is shorter", correct: false },
      { id: "b", text: "Unified error handling and cleanup", correct: true },
      { id: "c", text: "It runs in parallel", correct: false },
      { id: "d", text: "It needs no imports", correct: false },
    ],
  },
  "execFileSync basics": {
    q: "Why is execFileSync safer than exec with user input?",
    opts: [
      { id: "a", text: "It runs faster", correct: false },
      { id: "b", text: "No shell is involved — args cannot inject", correct: true },
      { id: "c", text: "It returns a Promise", correct: false },
      { id: "d", text: "It skips exit codes", correct: false },
    ],
  },
  "spawn vs exec": {
    q: "When should you choose spawn over exec?",
    opts: [
      { id: "a", text: "When output is large or the process is long-lived", correct: true },
      { id: "b", text: "Always — exec is removed", correct: false },
      { id: "c", text: "When you need sync behavior", correct: false },
      { id: "d", text: "When there is no output", correct: false },
    ],
  },
  "Communicating via stdio": {
    q: "What does stdio: 'inherit' do for a child?",
    opts: [
      { id: "a", text: "Shares the parent console for interactive use", correct: true },
      { id: "b", text: "Hides all output", correct: false },
      { id: "c", text: "Converts output to JSON", correct: false },
      { id: "d", text: "Kills the child on exit", correct: false },
    ],
  },
  "The scripts field": {
    q: "What does npm run build do?",
    opts: [
      { id: "a", text: "Installs dependencies", correct: false },
      { id: "b", text: "Executes the build script entry", correct: true },
      { id: "c", text: "Publishes the package", correct: false },
      { id: "d", text: "Deletes node_modules", correct: false },
    ],
  },
  "pre/post hooks": {
    q: "When does npm run pretest?",
    opts: [
      { id: "a", text: "After npm test finishes", correct: false },
      { id: "b", text: "Automatically before npm test", correct: true },
      { id: "c", text: "Only when called manually", correct: false },
      { id: "d", text: "Never — hooks were removed", correct: false },
    ],
  },
  "npx and local binaries": {
    q: "Why run tools with npx in a project?",
    opts: [
      { id: "a", text: "It pins the tool to the project's local version", correct: true },
      { id: "b", text: "It upgrades Node automatically", correct: false },
      { id: "c", text: "It skips package.json", correct: false },
      { id: "d", text: "It runs tools remotely", correct: false },
    ],
  },
  "ESLint rules": {
    q: "What does the eqeqeq rule enforce?",
    opts: [
      { id: "a", text: "Triple-equals instead of double-equals", correct: true },
      { id: "b", text: "Three-space indentation", correct: false },
      { id: "c", text: "Three tests per file", correct: false },
      { id: "d", text: "Triple-quoted strings", correct: false },
    ],
  },
  "Prettier formatting": {
    q: "What does Prettier own vs ESLint?",
    opts: [
      { id: "a", text: "Prettier owns layout; ESLint owns correctness", correct: true },
      { id: "b", text: "Prettier owns testing", correct: false },
      { id: "c", text: "ESLint owns layout", correct: false },
      { id: "d", text: "They do the same thing", correct: false },
    ],
  },
  "Typecheck in CI": {
    q: "What does tsc --noEmit in CI guarantee?",
    opts: [
      { id: "a", text: "The code typechecks before merging", correct: true },
      { id: "b", text: "Tests all pass", correct: false },
      { id: "c", text: "The app is fast", correct: false },
      { id: "d", text: "No runtime errors ever", correct: false },
    ],
  },
  "process.env": {
    q: "What type is every process.env value?",
    opts: [
      { id: "a", text: "Always a string (or undefined)", correct: true },
      { id: "b", text: "Inferred from content", correct: false },
      { id: "c", text: "Always a number", correct: false },
      { id: "d", text: "Always an object", correct: false },
    ],
  },
  "dotenv conventions": {
    q: "What do you commit instead of a real .env file?",
    opts: [
      { id: "a", text: "The production secrets", correct: false },
      { id: "b", text: ".env.example with placeholder values", correct: true },
      { id: "c", text: "Nothing at all", correct: false },
      { id: "d", text: "A screenshot of the values", correct: false },
    ],
  },
  "Config validation": {
    q: "When should invalid configuration fail?",
    opts: [
      { id: "a", text: "At startup, fast, with a clear message", correct: true },
      { id: "b", text: "Mid-run with a cryptic crash", correct: false },
      { id: "c", text: "Never — defaults cover everything", correct: false },
      { id: "d", text: "Only in production", correct: false },
    ],
  },
  "Parsing process.argv": {
    q: "Why slice(2) process.argv?",
    opts: [
      { id: "a", text: "To drop the node binary and script path", correct: true },
      { id: "b", text: "To sort the arguments", correct: false },
      { id: "c", text: "To remove duplicates", correct: false },
      { id: "d", text: "To parse JSON", correct: false },
    ],
  },
  "Flags vs positionals": {
    q: "In tool --port 3000 serve, what is serve?",
    opts: [
      { id: "a", text: "A flag", correct: false },
      { id: "b", text: "A positional", correct: true },
      { id: "c", text: "An environment variable", correct: false },
      { id: "d", text: "A comment", correct: false },
    ],
  },
  "Reading stdin": {
    q: "How does a CLI detect piped vs interactive input?",
    opts: [
      { id: "a", text: "process.stdin.isTTY", correct: true },
      { id: "b", text: "process.argv.length", correct: false },
      { id: "c", text: "console.log", correct: false },
      { id: "d", text: "It cannot detect this", correct: false },
    ],
  },
  "Scanning a directory": {
    q: "Which pair turns a folder into a typed file list?",
    opts: [
      { id: "a", text: "fs.readdirSync plus path.extname", correct: true },
      { id: "b", text: "console.log plus JSON.stringify", correct: false },
      { id: "c", text: "require plus import", correct: false },
      { id: "d", text: "setTimeout plus setInterval", correct: false },
    ],
  },
  "Grouping by extension": {
    q: "What key groups extensionless files?",
    opts: [
      { id: "a", text: "A fallback like 'none'", correct: true },
      { id: "b", text: "undefined as an object key", correct: false },
      { id: "c", text: "They are skipped silently", correct: false },
      { id: "d", text: "The filename itself", correct: false },
    ],
  },
  "Designing CLI output": {
    q: "What exit code signals CLI failure?",
    opts: [
      { id: "a", text: "0", correct: false },
      { id: "b", text: "Any non-zero code", correct: true },
      { id: "c", text: "200", correct: false },
      { id: "d", text: "Exit codes are unused", correct: false },
    ],
  },
  "createServer": {
    q: "What does http.createServer(handler) give the handler?",
    opts: [
      { id: "a", text: "(req, res) per request", correct: true },
      { id: "b", text: "A database connection", correct: false },
      { id: "c", text: "A Promise", correct: false },
      { id: "d", text: "A file descriptor", correct: false },
    ],
  },
  "req and res objects": {
    q: "Which object builds the server reply?",
    opts: [
      { id: "a", text: "req", correct: false },
      { id: "b", text: "res — via writeHead and end", correct: true },
      { id: "c", text: "server", correct: false },
      { id: "d", text: "process", correct: false },
    ],
  },
  "Listening on a port": {
    q: "What does server.listen(0, ...) do?",
    opts: [
      { id: "a", text: "Listens on port 0 literally", correct: false },
      { id: "b", text: "Disables networking", correct: false },
      { id: "c", text: "Asks the OS for a free ephemeral port", correct: true },
      { id: "d", text: "Throws an error", correct: false },
    ],
  },
  "URL routing tables": {
    q: "What is the main benefit of a routing table?",
    opts: [
      { id: "a", text: "Faster TCP handshakes", correct: false },
      { id: "b", text: "Routes become testable data instead of nested ifs", correct: true },
      { id: "c", text: "Automatic database migrations", correct: false },
      { id: "d", text: "Built-in authentication", correct: false },
    ],
  },
  "Middleware chains": {
    q: "What does calling next() do in middleware?",
    opts: [
      { id: "a", text: "Skips to the error handler", correct: false },
      { id: "b", text: "Restarts the server", correct: false },
      { id: "c", text: "Continues to the next step in the pipeline", correct: true },
      { id: "d", text: "Closes the connection", correct: false },
    ],
  },
  "Method dispatch": {
    q: "Which verb should only read, never change state?",
    opts: [
      { id: "a", text: "POST", correct: false },
      { id: "b", text: "DELETE", correct: false },
      { id: "c", text: "PUT", correct: false },
      { id: "d", text: "GET", correct: true },
    ],
  },
  "Resources and status codes": {
    q: "Which status means a resource was created?",
    opts: [
      { id: "a", text: "200", correct: false },
      { id: "b", text: "201", correct: true },
      { id: "c", text: "404", correct: false },
      { id: "d", text: "500", correct: false },
    ],
  },
  "JSON request bodies": {
    q: "What header must accompany a JSON request body?",
    opts: [
      { id: "a", text: "content-type: application/json", correct: true },
      { id: "b", text: "accept: text/html", correct: false },
      { id: "c", text: "No header is needed", correct: false },
      { id: "d", text: "encoding: utf-16", correct: false },
    ],
  },
  "REST conventions": {
    q: "What makes an API REST-like?",
    opts: [
      { id: "a", text: "Resources, standard verbs, stateless requests", correct: true },
      { id: "b", text: "One endpoint for everything", correct: false },
      { id: "c", text: "State stored on the server session", correct: false },
      { id: "d", text: "XML-only bodies", correct: false },
    ],
  },
  "URL and URLSearchParams": {
    q: "How do you read ?role=admin from a URL?",
    opts: [
      { id: "a", text: "url.searchParams.get('role')", correct: true },
      { id: "b", text: "url.role", correct: false },
      { id: "c", text: "url.split('=')[0]", correct: false },
      { id: "d", text: "JSON.parse(url)", correct: false },
    ],
  },
  "data: URL fetching": {
    q: "Why use a data: URL with fetch in tests?",
    opts: [
      { id: "a", text: "It is faster than HTTP/2", correct: false },
      { id: "b", text: "Deterministic responses with no network", correct: true },
      { id: "c", text: "It bypasses CORS", correct: false },
      { id: "d", text: "It enables caching", correct: false },
    ],
  },
  "Checking res.ok": {
    q: "When is fetch's res.ok true?",
    opts: [
      { id: "a", text: "On every response", correct: false },
      { id: "b", text: "Only for status 200-299", correct: true },
      { id: "c", text: "Only for redirects", correct: false },
      { id: "d", text: "Never in Node", correct: false },
    ],
  },
  "Request methods": {
    q: "Which verbs may carry a request body?",
    opts: [
      { id: "a", text: "GET and HEAD", correct: false },
      { id: "b", text: "POST, PUT, PATCH, DELETE", correct: true },
      { id: "c", text: "OPTIONS only", correct: false },
      { id: "d", text: "No verb may carry a body", correct: false },
    ],
  },
  "Sending JSON bodies": {
    q: "How do you send an object as a fetch body?",
    opts: [
      { id: "a", text: "Pass the object directly", correct: false },
      { id: "b", text: "JSON.stringify it and set the content-type", correct: true },
      { id: "c", text: "Use toString()", correct: false },
      { id: "d", text: "Bodies must be numbers", correct: false },
    ],
  },
  "Status code handling": {
    q: "How should a client treat a 5xx response?",
    opts: [
      { id: "a", text: "Blame the user's input", correct: false },
      { id: "b", text: "Retry with backoff — the server failed", correct: true },
      { id: "c", text: "Ignore it silently", correct: false },
      { id: "d", text: "Cache it forever", correct: false },
    ],
  },
  "Promise.all recap": {
    q: "What rejects a Promise.all batch?",
    opts: [
      { id: "a", text: "Any single rejection", correct: true },
      { id: "b", text: "Only all rejecting", correct: false },
      { id: "c", text: "A timeout of 1ms", correct: false },
      { id: "d", text: "Nothing — all never rejects", correct: false },
    ],
  },
  "Promise.race": {
    q: "What does Promise.race do to losing promises?",
    opts: [
      { id: "a", text: "Cancels them", correct: false },
      { id: "b", text: "Nothing — they keep running", correct: true },
      { id: "c", text: "Rejects them", correct: false },
      { id: "d", text: "Restarts them", correct: false },
    ],
  },
  "Promise.allSettled": {
    q: "What does allSettled report per input?",
    opts: [
      { id: "a", text: "Only the values", correct: false },
      { id: "b", text: "{ status, value|reason } for each", correct: true },
      { id: "c", text: "A single boolean", correct: false },
      { id: "d", text: "The fastest result", correct: false },
    ],
  },
  "queueMicrotask": {
    q: "When does a queueMicrotask callback run?",
    opts: [
      { id: "a", text: "After the current sync work, before timers", correct: true },
      { id: "b", text: "After all timers fire", correct: false },
      { id: "c", text: "On the next tick of the clock", correct: false },
      { id: "d", text: "Immediately, synchronously", correct: false },
    ],
  },
  "process.nextTick": {
    q: "How does process.nextTick differ from queueMicrotask?",
    opts: [
      { id: "a", text: "It runs even earlier, before the microtask queue", correct: true },
      { id: "b", text: "It runs on another thread", correct: false },
      { id: "c", text: "It takes no callback", correct: false },
      { id: "d", text: "They are identical aliases", correct: false },
    ],
  },
  "Microtask draining": {
    q: "What happens after each synchronous turn?",
    opts: [
      { id: "a", text: "Timers fire first", correct: false },
      { id: "b", text: "The microtask queue is emptied before macrotasks", correct: true },
      { id: "c", text: "The process exits", correct: false },
      { id: "d", text: "Nothing — queues are manual", correct: false },
    ],
  },
  "setTimeout vs setInterval": {
    q: "When is recursive setTimeout better than setInterval?",
    opts: [
      { id: "a", text: "When work takes variable time and must not overlap", correct: true },
      { id: "b", text: "Never — interval is always better", correct: false },
      { id: "c", text: "When you need zero delay", correct: false },
      { id: "d", text: "When callbacks must overlap", correct: false },
    ],
  },
  "Debounce pattern": {
    q: "What does a debounced function do under rapid calls?",
    opts: [
      { id: "a", text: "Runs on every call", correct: false },
      { id: "b", text: "Runs once after calls stop for the wait", correct: true },
      { id: "c", text: "Throws on the second call", correct: false },
      { id: "d", text: "Queues all calls forever", correct: false },
    ],
  },
  "Throttle pattern": {
    q: "What does throttling guarantee?",
    opts: [
      { id: "a", text: "At most one execution per window", correct: true },
      { id: "b", text: "Exactly one execution ever", correct: false },
      { id: "c", text: "Zero executions", correct: false },
      { id: "d", text: "Faster execution", correct: false },
    ],
  },
  "Subclassing Error": {
    q: "What must an Error subclass constructor call first?",
    opts: [
      { id: "a", text: "super(message)", correct: true },
      { id: "b", text: "this.status = 0", correct: false },
      { id: "c", text: "console.log", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "cause property": {
    q: "What is the cause option in new Error(msg, { cause })?",
    opts: [
      { id: "a", text: "The function that threw", correct: false },
      { id: "b", text: "The chained root error", correct: true },
      { id: "c", text: "The HTTP status", correct: false },
      { id: "d", text: "A retry count", correct: false },
    ],
  },
  "instanceof checks": {
    q: "Why branch on err instanceof HttpError?",
    opts: [
      { id: "a", text: "It is shorter than err.message", correct: false },
      { id: "b", text: "It tests the class robustly instead of string-matching", correct: true },
      { id: "c", text: "It catches all errors", correct: false },
      { id: "d", text: "It prevents throwing", correct: false },
    ],
  },
  "Reading stack traces": {
    q: "Where is the fix usually in a stack trace?",
    opts: [
      { id: "a", text: "The last frame", correct: false },
      { id: "b", text: "The first frame naming your file", correct: true },
      { id: "c", text: "In node internals", correct: false },
      { id: "d", text: "Traces never show locations", correct: false },
    ],
  },
  "console tracing": {
    q: "Which console method prints the current stack on demand?",
    opts: [
      { id: "a", text: "console.log", correct: false },
      { id: "b", text: "console.trace()", correct: true },
      { id: "c", text: "console.clear", correct: false },
      { id: "d", text: "console.count", correct: false },
    ],
  },
  "node --inspect concept": {
    q: "What does node --inspect enable?",
    opts: [
      { id: "a", text: "Faster execution", correct: false },
      { id: "b", text: "DevTools breakpoints and stepping", correct: true },
      { id: "c", text: "Automatic bug fixes", correct: false },
      { id: "d", text: "Type checking", correct: false },
    ],
  },
  "Regex literals": {
    q: "What does the g flag do on /pattern/g?",
    opts: [
      { id: "a", text: "Global matching — find all matches", correct: true },
      { id: "b", text: "Greedy disabling", correct: false },
      { id: "c", text: "Graph matching", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "test and exec": {
    q: "When do you use re.test vs re.exec?",
    opts: [
      { id: "a", text: "test for booleans, exec for match details", correct: true },
      { id: "b", text: "They are interchangeable", correct: false },
      { id: "c", text: "exec is faster for booleans", correct: false },
      { id: "d", text: "test returns groups", correct: false },
    ],
  },
  "Character classes": {
    q: "What does \\d match?",
    opts: [
      { id: "a", text: "Any digit", correct: true },
      { id: "b", text: "Any letter", correct: false },
      { id: "c", text: "A literal d", correct: false },
      { id: "d", text: "Whitespace", correct: false },
    ],
  },
  "Capture groups": {
    q: "What does (?:...) do differently from (...)?",
    opts: [
      { id: "a", text: "It matches lazily", correct: false },
      { id: "b", text: "It groups without capturing", correct: true },
      { id: "c", text: "It matches anything", correct: false },
      { id: "d", text: "It is a syntax error", correct: false },
    ],
  },
  "Named groups": {
    q: "How do you read a (?<year>...) group?",
    opts: [
      { id: "a", text: "match[0]", correct: false },
      { id: "b", text: "match.groups.year", correct: true },
      { id: "c", text: "match.year", correct: false },
      { id: "d", text: "year(match)", correct: false },
    ],
  },
  "Replace with functions": {
    q: "When is a replacer function better than a $1 template?",
    opts: [
      { id: "a", text: "When the replacement needs computed logic", correct: true },
      { id: "b", text: "Never — templates do everything", correct: false },
      { id: "c", text: "When the string is short", correct: false },
      { id: "d", text: "Functions are not allowed in replace", correct: false },
    ],
  },
  "The Date object": {
    q: "How should you construct a deterministic Date?",
    opts: [
      { id: "a", text: "new Date() with no args", correct: false },
      { id: "b", text: "From an ISO string with UTC getters", correct: true },
      { id: "c", text: "From locale date strings", correct: false },
      { id: "d", text: "Date.now() only", correct: false },
    ],
  },
  "Timestamps and arithmetic": {
    q: "What does date.getTime() return?",
    opts: [
      { id: "a", text: "Seconds since midnight", correct: false },
      { id: "b", text: "Epoch milliseconds", correct: true },
      { id: "c", text: "A formatted string", correct: false },
      { id: "d", text: "The timezone offset", correct: false },
    ],
  },
  "UTC vs local": {
    q: "Where should servers and stored data agree?",
    opts: [
      { id: "a", text: "On UTC, converting only for display", correct: true },
      { id: "b", text: "On the server's local zone", correct: false },
      { id: "c", text: "On the client's local zone", correct: false },
      { id: "d", text: "Timezones do not matter", correct: false },
    ],
  },
  "Intl.NumberFormat": {
    q: "Why use Intl.NumberFormat instead of manual commas?",
    opts: [
      { id: "a", text: "Locales disagree on separators", correct: true },
      { id: "b", text: "It is faster to type", correct: false },
      { id: "c", text: "Manual commas are illegal", correct: false },
      { id: "d", text: "Numbers need no formatting", correct: false },
    ],
  },
  "Intl.DateTimeFormat": {
    q: "How do you make Intl date output deterministic?",
    opts: [
      { id: "a", text: "Omit the locale", correct: false },
      { id: "b", text: "Fix timeZone: 'UTC' with an explicit locale", correct: true },
      { id: "c", text: "Use local getters", correct: false },
      { id: "d", text: "Dates are always deterministic", correct: false },
    ],
  },
  "List and relative formats": {
    q: "What does new Intl.ListFormat('en', {type:'conjunction'}) produce for ['a','b','c']?",
    opts: [
      { id: "a", text: "a, b, and c", correct: true },
      { id: "b", text: "a b c", correct: false },
      { id: "c", text: "[a, b, c]", correct: false },
      { id: "d", text: "abc", correct: false },
    ],
  },
  "=== vs Object.is": {
    q: "How does Object.is differ from ===?",
    opts: [
      { id: "a", text: "NaN equals NaN and -0 differs from +0", correct: true },
      { id: "b", text: "It coerces types", correct: false },
      { id: "c", text: "It compares object contents", correct: false },
      { id: "d", text: "No difference at all", correct: false },
    ],
  },
  "NaN equality": {
    q: "How do you reliably test for NaN?",
    opts: [
      { id: "a", text: "x === NaN", correct: false },
      { id: "b", text: "Number.isNaN(x)", correct: true },
      { id: "c", text: "typeof x === 'NaN'", correct: false },
      { id: "d", text: "x == null", correct: false },
    ],
  },
  "-0 vs +0": {
    q: "How can you observe the difference between -0 and +0?",
    opts: [
      { id: "a", text: "1/-0 is -Infinity", correct: true },
      { id: "b", text: "-0 === +0 is false", correct: false },
      { id: "c", text: "String(-0) is '0-'", correct: false },
      { id: "d", text: "You cannot observe it", correct: false },
    ],
  },
  "node:assert/strict": {
    q: "What happens when a strict assertion fails?",
    opts: [
      { id: "a", text: "It logs a warning", correct: false },
      { id: "b", text: "It throws with a diff", correct: true },
      { id: "c", text: "It returns false", correct: false },
      { id: "d", text: "It exits zero", correct: false },
    ],
  },
  "node:test runner": {
    q: "How do you run the built-in test runner?",
    opts: [
      { id: "a", text: "node --test", correct: true },
      { id: "b", text: "node --lint", correct: false },
      { id: "c", text: "npm publish", correct: false },
      { id: "d", text: "node --inspect", correct: false },
    ],
  },
  "Assertions as specs": {
    q: "What does each assertion state?",
    opts: [
      { id: "a", text: "One fact the code must uphold", correct: true },
      { id: "b", text: "A performance budget", correct: false },
      { id: "c", text: "A style preference", correct: false },
      { id: "d", text: "Nothing — assertions are comments", correct: false },
    ],
  },
  "Arrange-act-assert": {
    q: "What is the 'act' phase of a test?",
    opts: [
      { id: "a", text: "Setting up inputs", correct: false },
      { id: "b", text: "Calling the code under test", correct: true },
      { id: "c", text: "Checking the outcome", correct: false },
      { id: "d", text: "Deleting fixtures", correct: false },
    ],
  },
  "Fake timers and stubs": {
    q: "Why inject fake timers into tests?",
    opts: [
      { id: "a", text: "To make tests instant and deterministic", correct: true },
      { id: "b", text: "To test the timer library", correct: false },
      { id: "c", text: "To slow tests down", correct: false },
      { id: "d", text: "Fakes are never used", correct: false },
    ],
  },
  "Table-driven tests": {
    q: "What is the payoff of table-driven tests?",
    opts: [
      { id: "a", text: "New cases become one-line additions", correct: true },
      { id: "b", text: "Fewer assertions run", correct: false },
      { id: "c", text: "No loops allowed", correct: false },
      { id: "d", text: "Tables replace source code", correct: false },
    ],
  },
  "Narrowing with typeof": {
    q: "What does if (typeof v === 'string') do to string | number?",
    opts: [
      { id: "a", text: "Narrows v to string in the block", correct: true },
      { id: "b", text: "Converts v to string", correct: false },
      { id: "c", text: "Throws on numbers", correct: false },
      { id: "d", text: "Nothing at compile time", correct: false },
    ],
  },
  "Discriminated unions": {
    q: "What is a discriminant in a union?",
    opts: [
      { id: "a", text: "A shared literal field identifying the variant", correct: true },
      { id: "b", text: "A private class field", correct: false },
      { id: "c", text: "A runtime error", correct: false },
      { id: "d", text: "A generic constraint", correct: false },
    ],
  },
  "Type predicate functions": {
    q: "What does function isFish(p): p is Fish give callers?",
    opts: [
      { id: "a", text: "A runtime fish object", correct: false },
      { id: "b", text: "Narrowing wherever the predicate is used", correct: true },
      { id: "c", text: "A new class", correct: false },
      { id: "d", text: "Nothing — predicates are docs", correct: false },
    ],
  },
  "Partial, Pick and Omit": {
    q: "What does Pick<User, 'name'> produce?",
    opts: [
      { id: "a", text: "A type with only the name field", correct: true },
      { id: "b", text: "A type without the name field", correct: false },
      { id: "c", text: "The full User type", correct: false },
      { id: "d", text: "A runtime object", correct: false },
    ],
  },
  "Generic utility patterns": {
    q: "What should you compose before writing bespoke mapped types?",
    opts: [
      { id: "a", text: "Existing utilities like Record and ReturnType", correct: true },
      { id: "b", text: "More any annotations", correct: false },
      { id: "c", text: "Longer interfaces", correct: false },
      { id: "d", text: "Runtime validators", correct: false },
    ],
  },
  "ReturnType and Parameters": {
    q: "Why derive types with ReturnType<typeof fn>?",
    opts: [
      { id: "a", text: "Wrappers stay in sync when fn changes", correct: true },
      { id: "b", text: "It makes fn run faster", correct: false },
      { id: "c", text: "It documents runtime behavior", correct: false },
      { id: "d", text: "It is required syntax", correct: false },
    ],
  },
  "In-memory resource store": {
    q: "Why start a REST API with a Map store?",
    opts: [
      { id: "a", text: "Maps are persistent", correct: false },
      { id: "b", text: "Storage separates from HTTP and stays testable", correct: true },
      { id: "c", text: "Databases are unavailable", correct: false },
      { id: "d", text: "Maps validate input", correct: false },
    ],
  },
  "Route handlers": {
    q: "What should a route handler return?",
    opts: [
      { id: "a", text: "{ status, body } from pure logic", correct: true },
      { id: "b", text: "A raw socket", correct: false },
      { id: "c", text: "An HTML page always", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Status codes by outcome": {
    q: "What code does valid creation return?",
    opts: [
      { id: "a", text: "200", correct: false },
      { id: "b", text: "201 with the created body", correct: true },
      { id: "c", text: "302", correct: false },
      { id: "d", text: "400", correct: false },
    ],
  },
  "Generic constraints recap": {
    q: "What does <T extends { length: number }> guarantee?",
    opts: [
      { id: "a", text: "T is exactly Array", correct: false },
      { id: "b", text: "The body can safely use .length", correct: true },
      { id: "c", text: "T is a number", correct: false },
      { id: "d", text: "Nothing — constraints are hints", correct: false },
    ],
  },
  "Mapped types": {
    q: "What does { [K in keyof T]: T[K] } do?",
    opts: [
      { id: "a", text: "Rebuilds a type key by key", correct: true },
      { id: "b", text: "Deletes the type", correct: false },
      { id: "c", text: "Creates a runtime loop", correct: false },
      { id: "d", text: "Merges two arrays", correct: false },
    ],
  },
  "Conditional types": {
    q: "What does T extends string ? A : B select?",
    opts: [
      { id: "a", text: "Always A", correct: false },
      { id: "b", text: "A type based on assignability", correct: true },
      { id: "c", text: "A runtime value", correct: false },
      { id: "d", text: "A random branch", correct: false },
    ],
  },
  "Declaration files": {
    q: "What does a .d.ts file contain?",
    opts: [
      { id: "a", text: "Executable JavaScript", correct: false },
      { id: "b", text: "Types with no runtime code", correct: true },
      { id: "c", text: "Test fixtures", correct: false },
      { id: "d", text: "CSS rules", correct: false },
    ],
  },
  "Ambient modules": {
    q: "What does declare module 'x' promise?",
    opts: [
      { id: "a", text: "The shape of unseen code, kept accurate by you", correct: true },
      { id: "b", text: "Automatic installation of x", correct: false },
      { id: "c", text: "Runtime type enforcement", correct: false },
      { id: "d", text: "Nothing — it is a comment", correct: false },
    ],
  },
  "Publishing types": {
    q: "How do consumers get your library's types?",
    opts: [
      { id: "a", text: "They guess them", correct: false },
      { id: "b", text: "Ship .d.ts beside .js via the types field", correct: true },
      { id: "c", text: "Types cannot be published", correct: false },
      { id: "d", text: "Email the author", correct: false },
    ],
  },
  "strictNullChecks": {
    q: "What does strictNullChecks move to compile time?",
    opts: [
      { id: "a", text: "Null crashes", correct: true },
      { id: "b", text: "Network errors", correct: false },
      { id: "c", text: "Syntax errors", correct: false },
      { id: "d", text: "Test failures", correct: false },
    ],
  },
  "unknown vs any": {
    q: "Why prefer unknown over any for parsed JSON?",
    opts: [
      { id: "a", text: "It parses faster", correct: false },
      { id: "b", text: "It forces narrowing before use", correct: true },
      { id: "c", text: "They are identical", correct: false },
      { id: "d", text: "any is a syntax error", correct: false },
    ],
  },
  "never for impossible branches": {
    q: "What does assigning to never in a default branch prove?",
    opts: [
      { id: "a", text: "The switch is fast", correct: false },
      { id: "b", text: "All variants were handled — else a compile error", correct: true },
      { id: "c", text: "The code is unreachable at runtime", correct: false },
      { id: "d", text: "Nothing useful", correct: false },
    ],
  },
  "Form elements": {
    q: "How do you read a checkbox state?",
    opts: [
      { id: "a", text: "checkbox.checked", correct: true },
      { id: "b", text: "checkbox.textContent", correct: false },
      { id: "c", text: "checkbox.innerHTML", correct: false },
      { id: "d", text: "document.title", correct: false },
    ],
  },
  "submit handling": {
    q: "Why listen for submit on the form, not click on the button?",
    opts: [
      { id: "a", text: "Click is deprecated", correct: false },
      { id: "b", text: "Submit covers Enter-key and button paths uniformly", correct: true },
      { id: "c", text: "Forms have no buttons", correct: false },
      { id: "d", text: "Click never fires", correct: false },
    ],
  },
  "Constraint validation API": {
    q: "What does input.checkValidity() use?",
    opts: [
      { id: "a", text: "Built-in attributes like required and pattern", correct: true },
      { id: "b", text: "Your test suite", correct: false },
      { id: "c", text: "The server response", correct: false },
      { id: "d", text: "Random sampling", correct: false },
    ],
  },
  "createElement patterns": {
    q: "Why set textContent instead of innerHTML for user data?",
    opts: [
      { id: "a", text: "It is faster to type", correct: false },
      { id: "b", text: "No HTML parsing means no injection", correct: true },
      { id: "c", text: "innerHTML is read-only", correct: false },
      { id: "d", text: "textContent supports markup", correct: false },
    ],
  },
  "Efficient list rendering": {
    q: "Why append a DocumentFragment once instead of nodes one by one?",
    opts: [
      { id: "a", text: "One insertion means one layout pass", correct: true },
      { id: "b", text: "Fragments skip JavaScript", correct: false },
      { id: "c", text: "Nodes cannot be appended singly", correct: false },
      { id: "d", text: "It changes the styling", correct: false },
    ],
  },
  "Event delegation for lists": {
    q: "How does one container listener handle future rows?",
    opts: [
      { id: "a", text: "Via event bubbling plus closest() matching", correct: true },
      { id: "b", text: "It cannot — rows need own listeners", correct: false },
      { id: "c", text: "By polling the DOM", correct: false },
      { id: "d", text: "By reloading the page", correct: false },
    ],
  },
  "localStorage": {
    q: "What are localStorage limits?",
    opts: [
      { id: "a", text: "Unlimited binary storage", correct: false },
      { id: "b", text: "~5MB of synchronous strings per origin", correct: true },
      { id: "c", text: "Session-only numbers", correct: false },
      { id: "d", text: "Server-side sessions", correct: false },
    ],
  },
  "sessionStorage": {
    q: "How does sessionStorage differ from localStorage?",
    opts: [
      { id: "a", text: "It dies with the tab", correct: true },
      { id: "b", text: "It stores objects natively", correct: false },
      { id: "c", text: "It syncs across devices", correct: false },
      { id: "d", text: "It is asynchronous", correct: false },
    ],
  },
  "Cookies vs storage": {
    q: "What belongs in cookies rather than web storage?",
    opts: [
      { id: "a", text: "Large datasets", correct: false },
      { id: "b", text: "UI theme state", correct: false },
      { id: "c", text: "Auth tokens the server must see", correct: true },
      { id: "d", text: "Cached images", correct: false },
    ],
  },
  "Worker basics": {
    q: "What can a Web Worker NOT access?",
    opts: [
      { id: "a", text: "The DOM", correct: true },
      { id: "b", text: "postMessage", correct: false },
      { id: "c", text: "fetch", correct: false },
      { id: "d", text: "Timers", correct: false },
    ],
  },
  "postMessage protocol": {
    q: "How do main thread and worker share data?",
    opts: [
      { id: "a", text: "Shared mutable objects", correct: false },
      { id: "b", text: "Small { type, payload } messages", correct: true },
      { id: "c", text: "Global variables", correct: false },
      { id: "d", text: "They cannot communicate", correct: false },
    ],
  },
  "When to offload work": {
    q: "When is a worker worth it?",
    opts: [
      { id: "a", text: "For any one-line computation", correct: false },
      { id: "b", text: "For work blocking frames, over ~50ms of compute", correct: true },
      { id: "c", text: "For DOM updates", correct: false },
      { id: "d", text: "Never — workers are slow", correct: false },
    ],
  },
  "Async iterators": {
    q: "What does an async iterator's next() return?",
    opts: [
      { id: "a", text: "A promise of { value, done }", correct: true },
      { id: "b", text: "A plain value", correct: false },
      { id: "c", text: "An event emitter", correct: false },
      { id: "d", text: "A stream handle", correct: false },
    ],
  },
  "for await...of": {
    q: "What does for await...of flatten?",
    opts: [
      { id: "a", text: "Callback-and-promise streaming code into lines", correct: true },
      { id: "b", text: "CSS animations", correct: false },
      { id: "c", text: "SQL queries", correct: false },
      { id: "d", text: "Binary buffers", correct: false },
    ],
  },
  "Backpressure basics": {
    q: "What is backpressure?",
    opts: [
      { id: "a", text: "Network latency", correct: false },
      { id: "b", text: "The consumer telling the producer to slow down", correct: true },
      { id: "c", text: "A compression algorithm", correct: false },
      { id: "d", text: "An error type", correct: false },
    ],
  },
  "on and emit": {
    q: "In what order does emit invoke listeners?",
    opts: [
      { id: "a", text: "Registration order, synchronously", correct: true },
      { id: "b", text: "Reverse order", correct: false },
      { id: "c", text: "Random order", correct: false },
      { id: "d", text: "Asynchronously next tick", correct: false },
    ],
  },
  "once": {
    q: "When do you use emitter.once instead of on?",
    opts: [
      { id: "a", text: "When a second firing would be a bug", correct: true },
      { id: "b", text: "When you need more performance", correct: false },
      { id: "c", text: "When there are no listeners", correct: false },
      { id: "d", text: "They are identical", correct: false },
    ],
  },
  "Removing listeners": {
    q: "Why pair every long-lived on with an off?",
    opts: [
      { id: "a", text: "To avoid leaks and duplicate work", correct: true },
      { id: "b", text: "Listeners expire automatically", correct: false },
      { id: "c", text: "off speeds up emit", correct: false },
      { id: "d", text: "It is required by law", correct: false },
    ],
  },
  "URL parsing": {
    q: "Why parse URLs instead of regexing raw strings?",
    opts: [
      { id: "a", text: "Regex is faster", correct: false },
      { id: "b", text: "Parsed fields handle encoding and edge cases", correct: true },
      { id: "c", text: "URL is deprecated", correct: false },
      { id: "d", text: "Parsing is slower but trendy", correct: false },
    ],
  },
  "URLSearchParams editing": {
    q: "How do you read a multi-value query key?",
    opts: [
      { id: "a", text: "searchParams.getAll(key)", correct: true },
      { id: "b", text: "searchParams.get(key) returns all", correct: false },
      { id: "c", text: "Split pathname manually", correct: false },
      { id: "d", text: "Multi-value keys are impossible", correct: false },
    ],
  },
  "Relative resolution": {
    q: "What does new URL('/u?page=2', base) do?",
    opts: [
      { id: "a", text: "Throws — paths must be absolute", correct: false },
      { id: "b", text: "Resolves the relative part against base", correct: true },
      { id: "c", text: "Ignores the base", correct: false },
      { id: "d", text: "Returns a string", correct: false },
    ],
  },
  "Shape validation": {
    q: "Where should input shape be validated?",
    opts: [
      { id: "a", text: "Scattered through core logic", correct: false },
      { id: "b", text: "At the boundary, before core logic runs", correct: true },
      { id: "c", text: "After writing to the database", correct: false },
      { id: "d", text: "Never — trust all input", correct: false },
    ],
  },
  "Required fields": {
    q: "How do you report a missing vs mistyped field?",
    opts: [
      { id: "a", text: "Same generic error for both", correct: false },
      { id: "b", text: "'required' for missing, type error for mistyped", correct: true },
      { id: "c", text: "Throw for both", correct: false },
      { id: "d", text: "Ignore missing fields", correct: false },
    ],
  },
  "Error messages": {
    q: "What makes a good validation message?",
    opts: [
      { id: "a", text: "Field, rule, and received value", correct: true },
      { id: "b", text: "'Error' with no details", correct: false },
      { id: "c", text: "A stack trace", correct: false },
      { id: "d", text: "An HTTP status alone", correct: false },
    ],
  },
  "SHA-256 hashing": {
    q: "What does identical input produce in SHA-256?",
    opts: [
      { id: "a", text: "Identical 64-hex digests", correct: true },
      { id: "b", text: "Random output each time", correct: false },
      { id: "c", text: "The input reversed", correct: false },
      { id: "d", text: "A shorter input", correct: false },
    ],
  },
  "HMAC signatures": {
    q: "What does HMAC prove beyond plain hashing?",
    opts: [
      { id: "a", text: "Faster computation", correct: false },
      { id: "b", text: "Authenticity — only key holders mint valid tags", correct: true },
      { id: "c", text: "Reversibility", correct: false },
      { id: "d", text: "Compression", correct: false },
    ],
  },
  "Random ids": {
    q: "Why use crypto.randomUUID() over Math.random for tokens?",
    opts: [
      { id: "a", text: "Math.random is predictable — unsuitable for secrets", correct: true },
      { id: "b", text: "Math.random is slower", correct: false },
      { id: "c", text: "UUIDs are shorter", correct: false },
      { id: "d", text: "No reason", correct: false },
    ],
  },
  "XSS basics": {
    q: "What is the defense against XSS in rendered strings?",
    opts: [
      { id: "a", text: "Filtering input length", correct: false },
      { id: "b", text: "Escaping on output", correct: true },
      { id: "c", text: "Using HTTP only", correct: false },
      { id: "d", text: "Disabling JavaScript", correct: false },
    ],
  },
  "Escaping HTML": {
    q: "Which assignment escapes user data by construction?",
    opts: [
      { id: "a", text: "el.innerHTML = data", correct: false },
      { id: "b", text: "el.textContent = data", correct: true },
      { id: "c", text: "el.outerHTML = data", correct: false },
      { id: "d", text: "document.write(data)", correct: false },
    ],
  },
  "Never trust input": {
    q: "Why validate on the server when the client already checks?",
    opts: [
      { id: "a", text: "Clients are slow", correct: false },
      { id: "b", text: "Requests can be forged — every layer checks", correct: true },
      { id: "c", text: "Servers enjoy extra work", correct: false },
      { id: "d", text: "Client checks are illegal", correct: false },
    ],
  },
  "Big-O intuition": {
    q: "If doubling input quadruples work, the complexity is:",
    opts: [
      { id: "a", text: "O(n)", correct: false },
      { id: "b", text: "O(n^2)", correct: true },
      { id: "c", text: "O(1)", correct: false },
      { id: "d", text: "O(log n)", correct: false },
    ],
  },
  "Counting steps": {
    q: "Why do operation counts belong in tests but timings do not?",
    opts: [
      { id: "a", text: "Counts are deterministic; timings are noisy", correct: true },
      { id: "b", text: "Counts run faster", correct: false },
      { id: "c", text: "Timings are always zero", correct: false },
      { id: "d", text: "Tests cannot count", correct: false },
    ],
  },
  "Benchmarks vs counts": {
    q: "When do you benchmark instead of counting?",
    opts: [
      { id: "a", text: "To assert correctness", correct: false },
      { id: "b", text: "To compare implementations on one machine", correct: true },
      { id: "c", text: "Never — benchmarks are useless", correct: false },
      { id: "d", text: "To test edge cases", correct: false },
    ],
  },
  "chunk and groupBy": {
    q: "What does chunk([1,2,3,4,5], 2) return?",
    opts: [
      { id: "a", text: "[[1,2],[3,4],[5]]", correct: true },
      { id: "b", text: "[1,2,3,4,5]", correct: false },
      { id: "c", text: "[[1],[2],[3],[4],[5]]", correct: false },
      { id: "d", text: "5", correct: false },
    ],
  },
  "Testing your own lib": {
    q: "Which chunk cases must a test cover?",
    opts: [
      { id: "a", text: "Only the happy path", correct: false },
      { id: "b", text: "Empty, single page, exact multiples, remainders", correct: true },
      { id: "c", text: "Only remainders", correct: false },
      { id: "d", text: "Libraries need no tests", correct: false },
    ],
  },
  "API design": {
    q: "What should you design before implementing a utility?",
    opts: [
      { id: "a", text: "The README examples", correct: true },
      { id: "b", text: "The minified bundle", correct: false },
      { id: "c", text: "The logo", correct: false },
      { id: "d", text: "The changelog", correct: false },
    ],
  },
  "package.json metadata": {
    q: "Which fields declare a package's entry points?",
    opts: [
      { id: "a", text: "exports and files", correct: true },
      { id: "b", text: "author and license", correct: false },
      { id: "c", text: "scripts only", correct: false },
      { id: "d", text: "dependencies only", correct: false },
    ],
  },
  "Exports map": {
    q: "What does the exports map hide from importers?",
    opts: [
      { id: "a", text: "Nothing — all files are importable", correct: false },
      { id: "b", text: "Everything not listed as a subpath", correct: true },
      { id: "c", text: "Only TypeScript files", correct: false },
      { id: "d", text: "Only test files", correct: false },
    ],
  },
  "Versioning semver": {
    q: "What does a MAJOR bump signal?",
    opts: [
      { id: "a", text: "A bug fix", correct: false },
      { id: "b", text: "A breaking change", correct: true },
      { id: "c", text: "A new feature, backwards compatible", correct: false },
      { id: "d", text: "A rename", correct: false },
    ],
  },
  "JSDoc annotations": {
    q: "What do @param and @returns give editors?",
    opts: [
      { id: "a", text: "Hover help from contracts", correct: true },
      { id: "b", text: "Runtime checks", correct: false },
      { id: "c", text: "Faster code", correct: false },
      { id: "d", text: "Automatic tests", correct: false },
    ],
  },
  "README structure": {
    q: "What order should a README follow?",
    opts: [
      { id: "a", text: "License first", correct: false },
      { id: "b", text: "What, install, example, API, license", correct: true },
      { id: "c", text: "Changelog first", correct: false },
      { id: "d", text: "Any random order", correct: false },
    ],
  },
  "Examples as docs": {
    q: "What must every runnable example be?",
    opts: [
      { id: "a", text: "Copy-paste runnable", correct: true },
      { id: "b", text: "Pseudocode", correct: false },
      { id: "c", text: "At least 100 lines", correct: false },
      { id: "d", text: "Written in another language", correct: false },
    ],
  },
  "Extract function": {
    q: "When should you extract a function?",
    opts: [
      { id: "a", text: "When a comment would explain what code does", correct: true },
      { id: "b", text: "Only above 100 lines", correct: false },
      { id: "c", text: "Never — inline everything", correct: false },
      { id: "d", text: "Only for async code", correct: false },
    ],
  },
  "Rename for clarity": {
    q: "What makes pendingNotes better than data?",
    opts: [
      { id: "a", text: "Length", correct: false },
      { id: "b", text: "It states role — each good name speeds readers", correct: true },
      { id: "c", text: "CamelCase", correct: false },
      { id: "d", text: "Nothing — shorter is better", correct: false },
    ],
  },
  "Remove duplication": {
    q: "How many copies make an extraction pattern?",
    opts: [
      { id: "a", text: "Three — two may be coincidence", correct: true },
      { id: "b", text: "One", correct: false },
      { id: "c", text: "Ten", correct: false },
      { id: "d", text: "Zero", correct: false },
    ],
  },
  "Abort signals": {
    q: "Why is cancellation cooperative in JS?",
    opts: [
      { id: "a", text: "Code must listen on the signal to stop", correct: true },
      { id: "b", text: "The engine force-kills tasks", correct: false },
      { id: "c", text: "Signals do not exist", correct: false },
      { id: "d", text: "Abort is synchronous", correct: false },
    ],
  },
  "fetch with timeout": {
    q: "How do you time out a fetch?",
    opts: [
      { id: "a", text: "Race it against a timer that aborts the controller", correct: true },
      { id: "b", text: "Set fetch.timeout property", correct: false },
      { id: "c", text: "Use a synchronous fetch", correct: false },
      { id: "d", text: "Timeouts are impossible", correct: false },
    ],
  },
  "Cleanup on abort": {
    q: "What must abort handlers release?",
    opts: [
      { id: "a", text: "Nothing — abort frees everything", correct: false },
      { id: "b", text: "Timers, streams, and handles, or cancellation leaks", correct: true },
      { id: "c", text: "Only log messages", correct: false },
      { id: "d", text: "The controller itself", correct: false },
    ],
  },
  "Wiring routes to a store": {
    q: "Where should request-handling logic live?",
    opts: [
      { id: "a", text: "All inline in the server callback", correct: false },
      { id: "b", text: "In handlers and storage; wiring stays thin", correct: true },
      { id: "c", text: "In the database", correct: false },
      { id: "d", text: "In the README", correct: false },
    ],
  },
  "Self-test script": {
    q: "What turns a capstone demo into a verified build?",
    opts: [
      { id: "a", text: "A script asserting every route's statuses", correct: true },
      { id: "b", text: "A longer README", correct: false },
      { id: "c", text: "More dependencies", correct: false },
      { id: "d", text: "A demo video", correct: false },
    ],
  },
  "README and next steps": {
    q: "What closes a shipped project's README?",
    opts: [
      { id: "a", text: "Honest next steps: persistence, auth, deployment", correct: true },
      { id: "b", text: "A claim of perfection", correct: false },
      { id: "c", text: "The full source dump", correct: false },
      { id: "d", text: "Nothing", correct: false },
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
 * simulator yet. Days whose templates need a browser (25 DOM, 26 events,
 * 84–87 DOM/storage/workers) or print environment-dependent output (32 Node
 * version) carry no gate, as do the TypeScript days (33–37, 78, 79, 81–83)
 * whose annotations don't execute as plain JS. Everything else is verified
 * against real Node output. */
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
  41: "Rex speaks",
  42: "hi Ada",
  43: "symbol\n42",
  44: "0,10,20,30",
  45: "true\nfalse",
  46: "Daffy swims",
  47: "true\ntrue",
  48: "37\nblocked",
  49: "cached value",
  50: "2\n3",
  51: "esm uses import, cjs uses require",
  52: ".gz\nstring",
  53: "hello world",
  54: "HELLO STREAMS",
  55: "42\nchild ran",
  56: "test,lint,start",
  57: "2 issues",
  58: "localhost:3000",
  59: "serve\n3000",
  60: ".js:2 .md:1 .txt:1",
  61: "hello http",
  62: "list users",
  63: "201\n1:Ada",
  64: "admin\ntrue\n3",
  65: "PUT\napplication/json",
  66: "1,2\nb",
  67: "a\ne\nc\nb\nd",
  68: "calls:1",
  69: "HttpError 404",
  70: "Error: boom",
  71: "true\n123",
  72: "2026/10",
  73: "2026\n10",
  74: "1,234,567.89",
  75: "true\nfalse\ntrue",
  76: "3 assertions passed",
  77: "3/3 passed",
  80: "201\n201\n2",
  88: "0,2,4,6",
  89: "got:hi | bye once",
  90: "example.com\n2",
  91: "0\nage must be a number",
  92: "c4ac6278\n64",
  93: "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
  94: "linear:100\nquadratic:10000",
  95: "[[1,2],[3,4],[5]]",
  96: "@asta/utils\n1.2.3",
  97: "5\n2",
  98: "Ada\n2",
  99: "aborted",
  100: "400\n201\n1",
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
