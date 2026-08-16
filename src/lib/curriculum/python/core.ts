import type { Lesson } from "../../types";
import { getLevelForDay } from "../../types";

/* ─── Python blueprints: Days 1–40 ─── */

interface PyBlueprint {
  title: string;
  subtitle: string;
  language: "python";
  tags: string[];
  theoryTopics: string[];
  codeTemplate: string;
}

const PY_CURRICULUM: PyBlueprint[] = [
  { title: "Hello, Python", subtitle: "Your first script and the REPL", language: "python", tags: ["hello-world"], theoryTopics: ["Why Python", "The REPL", "Running scripts"], codeTemplate: `print("Hello, World!")` },
  { title: "Variables & Values", subtitle: "Names, values, and dynamic typing", language: "python", tags: ["variables"], theoryTopics: ["Assignment", "Dynamic typing", "Names vs values"], codeTemplate: `message = "hello"\nage = 25\npi = 3.14159\nprint(message, age, pi)` },
  { title: "Numbers & Arithmetic", subtitle: "Integers, floats, and operators", language: "python", tags: ["numbers"], theoryTopics: ["int and float", "Arithmetic operators", "Floor division & modulo"], codeTemplate: `a = 10\nb = 3\nprint(a + b, a - b, a * b)\nprint(a / b, a // b, a % b)\nprint(a ** 2)` },
  { title: "Strings", subtitle: "Text as a sequence of characters", language: "python", tags: ["strings"], theoryTopics: ["Quoting", "Concatenation", "Indexing & slicing"], codeTemplate: `name = "Ada"\ngreet = "Hello, " + name\nprint(greet)\nprint(name[0], name[-1])\nprint("Ada Lovelace"[:3])` },
  { title: "Booleans & Comparison", subtitle: "True, False, and logic", language: "python", tags: ["booleans"], theoryTopics: ["bool type", "Comparison operators", "and / or / not"], codeTemplate: `age = 18\nadult = age >= 18\nprint(adult, not adult)\nprint(True and False, True or False)` },
  { title: "Input & Output", subtitle: "print and input", language: "python", tags: ["io"], theoryTopics: ["print()", "input()", "Type conversion"], codeTemplate: `name = input("What is your name? ")\nprint("Hello, " + name + "!")` },
  { title: "Conditionals: if / elif / else", subtitle: "Branching your program", language: "python", tags: ["control-flow"], theoryTopics: ["if", "elif", "else", "Nesting"], codeTemplate: `score = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"\nprint(grade)` },
  { title: "while Loops", subtitle: "Repeat while a condition holds", language: "python", tags: ["loops"], theoryTopics: ["while", "break", "continue", "Infinite loops"], codeTemplate: `count = 0\nwhile count < 5:\n    print(count)\n    count += 1` },
  { title: "for Loops & range", subtitle: "Iterate over sequences", language: "python", tags: ["loops"], theoryTopics: ["for ... in", "range()", "Iterating strings/lists"], codeTemplate: `for i in range(5):\n    print(i, end=" ")\nprint()\nfor letter in "abc":\n    print(letter)` },
  { title: "Lists", subtitle: "Ordered, mutable collections", language: "python", tags: ["lists"], theoryTopics: ["Creating lists", "Indexing & slicing", "Methods: append, pop"], codeTemplate: `nums = [1, 2, 3]\nnums.append(4)\nnums.insert(0, 0)\nprint(nums)\nprint(nums[2:], nums[-1])` },
  { title: "Tuples", subtitle: "Immutable sequences", language: "python", tags: ["tuples"], theoryTopics: ["Tuple syntax", "Immutability", "Unpacking"], codeTemplate: `point = (3, 4)\nx, y = point\nprint(x, y)\nprint(len(point))` },
  { title: "Dictionaries", subtitle: "Key-value mappings", language: "python", tags: ["dictionaries"], theoryTopics: ["Creating dicts", "Accessing values", "Methods: keys, values, items"], codeTemplate: `user = {"name": "Ada", "age": 36}\nprint(user["name"])\nuser["city"] = "London"\nfor k, v in user.items():\n    print(k, "=", v)` },
  { title: "Sets", subtitle: "Unique, unordered membership", language: "python", tags: ["sets"], theoryTopics: ["Creating sets", "Membership test", "Union & intersection"], codeTemplate: `a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a & b, a | b, a - b)\nprint(3 in a)` },
  { title: "List Comprehensions", subtitle: "Build lists in one line", language: "python", tags: ["comprehensions"], theoryTopics: ["Basic syntax", "Conditional filters", "Nested loops"], codeTemplate: `squares = [x * x for x in range(6)]\nevens = [x for x in range(10) if x % 2 == 0]\nprint(squares)\nprint(evens)` },
  { title: "Functions", subtitle: "def, parameters, and return", language: "python", tags: ["functions"], theoryTopics: ["def statements", "Parameters", "return values"], codeTemplate: `def greet(name):\n    return "Hello, " + name\n\ndef add(a, b):\n    return a + b\n\nprint(greet("Ada"))\nprint(add(3, 4))` },
  { title: "Scope & Namespaces", subtitle: "local vs global", language: "python", tags: ["scope"], theoryTopics: ["Local scope", "Global scope", "LEGB rule"], codeTemplate: `x = 10  # global\n\ndef show():\n    y = 5  # local\n    print(x + y)\n\nshow()\nprint(x)` },
  { title: "*args & **kwargs", subtitle: "Flexible function arguments", language: "python", tags: ["functions"], theoryTopics: ["*args tuple", "**kwargs dict", "Default arguments"], codeTemplate: `def total(*nums):\n    return sum(nums)\n\ndef describe(**info):\n    for k, v in info.items():\n        print(f"{k}: {v}")\n\nprint(total(1, 2, 3))\ndescribe(name="Ada", age=36)` },
  { title: "Lambda & map/filter", subtitle: "Anonymous functions", language: "python", tags: ["functions"], theoryTopics: ["lambda", "map()", "filter()", "sorted with key"], codeTemplate: `double = lambda x: x * 2\nnums = [1, 2, 3, 4]\nprint(list(map(double, nums)))\nprint(list(filter(lambda n: n % 2 == 0, nums)))` },
  { title: "String Methods", subtitle: "The toolbox for text", language: "python", tags: ["strings"], theoryTopics: ["split and join", "strip", "find and replace", "case methods"], codeTemplate: `text = "  hello, world  "\ntext = text.strip()\nprint(text.upper())\nprint(text.replace("world", "python"))\nwords = text.split(", ")\nprint(words, " ".join(words))` },
  { title: "String Formatting", subtitle: "f-strings and friends", language: "python", tags: ["strings"], theoryTopics: ["f-strings", "format()", "Alignment & precision"], codeTemplate: `name = "Ada"\nage = 36\nprint(f"{name} is {age} years old")\nprint(f"{age:>5} | {age:.1f}")` },
  { title: "Exceptions: try / except", subtitle: "Handle errors gracefully", language: "python", tags: ["exceptions"], theoryTopics: ["try/except", "finally", "raise"], codeTemplate: `try:\n    num = int(input("Number: "))\n    print(10 / num)\nexcept ValueError:\n    print("Not a number!")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")` },
  { title: "Exception Hierarchy", subtitle: "Built-in exception types", language: "python", tags: ["exceptions"], theoryTopics: ["BaseException", "ValueError vs TypeError", "Custom exceptions"], codeTemplate: `class NegativeAgeError(Exception):\n    pass\n\ndef check_age(age):\n    if age < 0:\n        raise NegativeAgeError("Age cannot be negative")\n    return age\n\nprint(check_age(21))` },
  { title: "File I/O", subtitle: "Read and write files", language: "python", tags: ["files"], theoryTopics: ["open() modes", "The with statement", "Read/write text"], codeTemplate: `with open("notes.txt", "w") as f:\n    f.write("first line\\n")\n\nwith open("notes.txt", "r") as f:\n    content = f.read()\n    print(content)` },
  { title: "CSV & JSON", subtitle: "Structured data files", language: "python", tags: ["files"], theoryTopics: ["csv module", "json module", "Serialization"], codeTemplate: `import json\n\ndata = {"name": "Ada", "languages": ["Python", "C"]}\nencoded = json.dumps(data)\nprint(encoded)\nprint(json.loads(encoded)["name"])` },
  { title: "Modules & Imports", subtitle: "Organize and reuse code", language: "python", tags: ["modules"], theoryTopics: ["import", "from ... import", "as aliases", "__name__"], codeTemplate: `import math\nfrom random import randint\nimport datetime as dt\n\nprint(math.sqrt(16))\nprint(randint(1, 6))\nprint(dt.date.today())` },
  { title: "The Standard Library", subtitle: "Batteries included", language: "python", tags: ["stdlib"], theoryTopics: ["os and sys", "math and random", "collections", "datetime"], codeTemplate: `import os\nfrom collections import Counter\n\nprint(os.getcwd())\nprint(Counter("abracadabra"))` },
  { title: "Recursion", subtitle: "Functions that call themselves", language: "python", tags: ["recursion"], theoryTopics: ["Base case", "Recursive step", "Stack depth"], codeTemplate: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(factorial(5))\nprint(fib(10))` },
  { title: "Sorting & Searching", subtitle: "sorted, sort, and binary search", language: "python", tags: ["algorithms"], theoryTopics: ["sorted() and .sort()", "key functions", "Binary search"], codeTemplate: `nums = [5, 2, 8, 1, 9]\nnums.sort()\nprint(nums)\nprint(sorted(["banana", "apple", "cherry"]))\nprint(sorted(nums, reverse=True))` },
  { title: "Big O Basics", subtitle: "Why algorithm speed matters", language: "python", tags: ["algorithms"], theoryTopics: ["Constant vs linear", "Quadratic growth", "Choosing algorithms"], codeTemplate: `nums = list(range(10))\n# Linear: sum\nprint(sum(nums))\n# Quadratic: nested pairs\npairs = [(a, b) for a in nums for b in nums]\nprint(len(pairs))` },
  { title: "Mutability & References", subtitle: "Why lists are tricky", language: "python", tags: ["advanced"], theoryTopics: ["Mutable vs immutable", "Shared references", "copy and deepcopy"], codeTemplate: `a = [1, 2, 3]\nb = a  # same list!\nb.append(4)\nprint(a)  # also changed\n\nc = a.copy()\nc.append(5)\nprint(a, c)` },
  { title: "Default Arguments & Traps", subtitle: "The mutable default bug", language: "python", tags: ["advanced"], theoryTopics: ["Default arg evaluation", "The None pattern", "Why the bug happens"], codeTemplate: `def append_to(item, lst=None):\n    if lst is None:\n        lst = []\n    lst.append(item)\n    return lst\n\nprint(append_to(1))\nprint(append_to(2))` },
  { title: "Classes & Objects", subtitle: "Define your own types", language: "python", tags: ["oop"], theoryTopics: ["class", "__init__", "self", "Methods"], codeTemplate: `class Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n\n    def describe(self):\n        return f"{self.name} is in grade {self.grade}"\n\ns = Student("Ada", 10)\nprint(s.describe())` },
  { title: "Inheritance", subtitle: "Subclasses and super()", language: "python", tags: ["oop"], theoryTopics: ["Subclassing", "super()", "Overriding methods"], codeTemplate: `class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"\n\nclass Cat(Animal):\n    def speak(self):\n        return "Meow"\n\nfor a in (Dog(), Cat()):\n    print(a.speak())` },
  { title: "Magic Methods", subtitle: "__str__, __len__, and friends", language: "python", tags: ["oop"], theoryTopics: ["__str__ and __repr__", "__eq__", "__len__"], codeTemplate: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n\np1 = Point(1, 2)\np2 = Point(1, 2)\nprint(p1, p1 == p2)` },
  { title: "Properties & Encapsulation", subtitle: "@property and controlled access", language: "python", tags: ["oop"], theoryTopics: ["@property", "Setters", "Validation"], codeTemplate: `class Account:\n    def __init__(self, balance=0):\n        self._balance = balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Positive amounts only")\n        self._balance += amount\n\nacc = Account()\nacc.deposit(100)\nprint(acc.balance)` },
  { title: "Generators & Iterators", subtitle: "yield and lazy iteration", language: "python", tags: ["generators"], theoryTopics: ["yield", "Generator expressions", "Iterators"], codeTemplate: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor n in countdown(3):\n    print(n)\n\nsquares = (x * x for x in range(5))\nprint(list(squares))` },
  { title: "Decorators", subtitle: "Wrap functions with functions", language: "python", tags: ["decorators"], theoryTopics: ["Function wrappers", "@syntax", "Preserving metadata"], codeTemplate: `def bold(fn):\n    def wrapper():\n        return "<b>" + fn() + "</b>"\n    return wrapper\n\n@bold\ndef hello():\n    return "hello"\n\nprint(hello())` },
  { title: "Closures & Higher-Order Functions", subtitle: "Functions that remember", language: "python", tags: ["functional"], theoryTopics: ["Closures", "Functions as values", "Partial application"], codeTemplate: `def make_multiplier(factor):\n    def multiply(x):\n        return x * factor\n    return multiply\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(5), triple(5))` },
  { title: "Type Hints", subtitle: "Annotate your functions", language: "python", tags: ["typing"], theoryTopics: ["Parameter annotations", "Return types", "typing module"], codeTemplate: `from typing import List, Optional\n\ndef average(nums: List[float]) -> float:\n    return sum(nums) / len(nums)\n\ndef find(nums: List[int], target: int) -> Optional[int]:\n    return nums.index(target) if target in nums else None\n\nprint(average([1.0, 2.0, 3.0]))\nprint(find([1, 2, 3], 2))` },
  { title: "Capstone: Build Something Real", subtitle: "A CLI tool end to end", language: "python", tags: ["capstone"], theoryTopics: ["Project structure", "Real input/output", "Testing your tool"], codeTemplate: `import json\n\ndef load_notes(path="notes.json"):\n    try:\n        with open(path) as f:\n            return json.load(f)\n    except FileNotFoundError:\n        return []\n\ndef save_notes(notes, path="notes.json"):\n    with open(path, "w") as f:\n        json.dump(notes, f, indent=2)\n\nnotes = load_notes()\nnotes.append({"text": "build something real", "done": False})\nsave_notes(notes)\nprint(len(notes), "notes saved")` },
];

/* ─── Hand-written topic content ─── */

const PY_TOPIC_CONTENT: Record<string, string> = {
  "Why Python": "Python is a high-level, interpreted language designed for clarity and speed of development. Its syntax reads almost like English, which makes it the fastest route from idea to working program. Yet the same language that runs scripts on a laptop powers data pipelines, web backends, machine-learning training, and automation across the world — the same 'batteries included' philosophy makes one language enough for most of a career.",
  "The REPL": "The REPL (Read-Eval-Print Loop) is the interactive Python shell. Type `python` in a terminal and every line you enter is evaluated immediately and the result printed. It is a scratchpad for experiments: check how a function behaves, test a slice, inspect a library — before committing it to a script. Write exploratory code in the REPL, then graduate it into a .py file.",
  "Running scripts": "A Python file is just text with a `.py` extension. Run it with `python filename.py`. The interpreter reads the file top-to-bottom and executes each statement in order. Unlike compiled languages, there is no separate build step — the source file is the program. This immediacy is Python's superpower: change a line, re-run, see the result in milliseconds.",
  "Assignment": "In Python, `name = value` binds a name to a value. There is no declaration keyword — the assignment itself creates the variable. Reassigning the same name simply points it at a new value. This 'names refer to values' model is why Python feels fluid: you never fight the compiler over types or declarations.",
  "Dynamic typing": "A variable in Python has no type — the value it points to does. The same name can hold an integer, then a string, then a list, without any complaint. This flexibility speeds up development enormously but shifts responsibility to you: a value of the wrong type usually surfaces as a runtime error, so clear naming and (later) type hints keep large programs sane.",
  "Names vs values": "Think of names as sticky notes attached to values. `a = [1, 2, 3]; b = a` does NOT copy the list — it puts a second sticky note on the same list. Mutating through `b` changes what `a` sees too. Integers and strings are immutable, so this aliasing only bites with mutable collections; understand it now and later bugs vanish.",
  "int and float": "Python has two built-in numeric types: `int` (arbitrary precision integers — no overflow like C) and `float` (IEEE 754 double-precision decimals). Division `/` always returns a float; `//` (floor division) returns an int. Watch for float rounding: `0.1 + 0.2 != 0.3` exactly, because binary floats approximate decimals.",
  "Arithmetic operators": "The usual suspects: `+`, `-`, `*`, `/`, `//` (floor division), `%` (modulo), and `**` (power). Python follows standard precedence: `**` binds tightest, then `* / // %`, then `+ -`. Parentheses override anything. Modulo with negative numbers follows the sign of the divisor — `-7 % 3 == 2`.",
  "Floor division & modulo": "`a // b` divides and rounds down to the nearest integer; `a % b` returns the remainder, such that `a == (a // b) * b + a % b`. This pair is invaluable for digit extraction, cycling through indices, and converting time units. Note the 'floor' behavior: `-7 // 2 == -4`, not `-3` — it rounds toward negative infinity.",
  "Quoting": "Python strings can be wrapped in single or double quotes interchangeably — `'hello'` and \"hello\" are the same. Triple quotes (`\"\"\"...\"\"\"`) span multiple lines and are the idiomatic home of long text and docstrings. Escape sequences like `\\n` (newline) and `\\t` (tab) work inside any string.",
  "Concatenation": "`+` joins strings, `*` repeats them: `\"ab\" + \"cd\" == \"abcd\"`, `\"ha\" * 3 == \"hahaha\"`. Concatenation creates a new string every time (strings are immutable), so building text in a loop is slow — collect parts in a list and `\"\".join(...)` them once. It's the small habit that keeps code fast and clean.",
  "Indexing & slicing": "Strings are sequences: `s[0]` is the first character, `s[-1]` the last. Slices `s[start:stop:step]` cut out substrings — `s[:3]` the first three, `s[2:]` everything from index 2, `s[::-1]` the whole string reversed. Slices never error on out-of-range indices; they just return what exists. The same rules apply to lists and tuples.",
  "bool type": "Booleans in Python are `True` and `False`. Under the hood they are integers (1 and 0), but you almost never use them numerically. Any value can be tested for truth: empty containers, zero, `None`, and empty strings are falsy; everything else is truthy. This implicit truthiness powers concise conditions like `if items:`.",
  "Comparison operators": "Comparisons return booleans: `==`, `!=`, `<`, `<=`, `>`, `>=`. Python chains them naturally — `1 < x < 10` checks both bounds in one expression. `==` compares values (deep for collections), while `is` compares identity (whether two names point to the same object). Comparing `None` with `is` is the idiomatic choice.",
  "and / or / not": "`and` and `or` short-circuit: they evaluate left-to-right and stop as soon as the result is known. `a or b` returns `a` if it is truthy, else `b` — which makes `default = user_input or \"fallback\"` a neat idiom. `not` flips truthiness. Precedence: `not` > `and` > `or`.",
  "print()": "`print()` writes to standard output, one line at a time. Pass multiple arguments and they are separated by spaces: `print(1, 2, 3)`. Use `sep=\"\"` to change the separator, `end=\"\"` to suppress the newline. `print()` is your primary window into what a program is doing — the debugging tool of first resort.",
  "input()": "`input(prompt)` prints the prompt and reads a line of text from the user. It always returns a string — even if the user types a number. Convert with `int(...)` or `float(...)` when you need arithmetic, and be ready to catch `ValueError` when the user types nonsense. Interactive programs are built entirely on this function.",
  "Type conversion": "`int(\"42\")`, `float(\"3.14\")`, and `str(42)` convert between types. Conversions can fail: `int(\"abc\")` raises `ValueError`. When converting user input, wrap it in try/except or validate first. Rounding helpers: `round(3.14159, 2)`, and truncation via `int(3.99)` (always toward zero).",
  "if": "`if condition:` runs its indented block only when the condition is truthy. Python's block structure is indentation — no braces. Consistency matters: mixing tabs and spaces, or inconsistent indents, raises an `IndentationError`. The colon after the condition and a consistent 4-space indent are the syntax of control flow.",
  "elif": "`elif` chains alternatives after `if`: the first true branch wins, the rest are skipped. There is no limit to the number of `elif`s, and an `else` catches everything not matched. Think of if/elif/else as a decision ladder executed top-to-bottom — order the most specific conditions first.",
  "else": "`else` runs when no preceding `if` or `elif` condition was true. It is optional and always last. One subtlety: `else` binds to the nearest `if`, so be careful with nested conditionals — indentation makes the pairing visible, but read carefully.",
  "Nesting": "Conditionals can be nested inside conditionals, and loops inside conditions, to arbitrary depth. Every level adds indentation. Deep nesting becomes unreadable fast — prefer early `return` (in functions), or extract the inner logic into a helper. Flat code with guard clauses reads like a story.",
  "while": "`while condition:` repeats its block as long as the condition stays truthy. The condition is checked before each iteration. You control the exit: mutate a counter, break early, or let the condition naturally become false. A while loop that never exits is an infinite loop — always double-check the termination path.",
  "break": "`break` exits the innermost loop immediately, skipping the rest of the body and the loop's natural condition. It is the classic tool for 'search until found': loop forever (`while True:`), and `break` the moment the target appears. Cleaner than cramming complex exit conditions into the loop header.",
  "continue": "`continue` skips the rest of the current iteration and jumps to the next one — the loop condition is re-checked. Use it to filter inside a loop: handle only interesting items, `continue` past the rest. It is the loop-level twin of a guard clause, keeping bodies flat and readable.",
  "Infinite loops": "A loop that never terminates hangs your program. Common causes: forgetting to update the counter, comparing floats that never equal, or a condition that never becomes false. When stuck, remember `Ctrl+C` stops the interpreter. Add a safety valve while developing: a counter with a hard cap or a progress print.",
  "for ... in": "The `for` loop iterates over any iterable — string, list, tuple, dict, range, file. Each iteration assigns the next element to the loop variable. Python's `for` is a 'for-each'; there is no index-based loop syntax unless you ask for one with `enumerate()`. Iteration over the thing itself is cleaner than indexing by hand.",
  "range()": "`range(stop)` yields 0..stop-1; `range(start, stop)` starts at start; `range(start, stop, step)` adds a stride. `range` is lazy — it produces numbers one at a time rather than materializing a list, so even `range(10**9)` is cheap to create. Pair it with `len()` or `enumerate()` when you genuinely need indices.",
  "Iterating strings/lists": "Iterating a string yields its characters; a list yields its elements; a dict yields its keys. When you need both the element and its position, use `enumerate(items)` — `for i, item in enumerate(items):`. When you need two lists in lockstep, use `zip(a, b)`. The language pushes you toward readable, direct iteration.",
  "Creating lists": "`[]` makes an empty list; `[1, 2, 3]` a literal; `list(range(5))` converts any iterable. A list is an ordered, mutable sequence — you can append, insert, replace, and remove elements. Lists can hold any mix of types, including other lists. They are the default workhorse collection of the language.",
  "Indexing & slicing (lists)": "List indexing matches strings: `items[0]` first, `items[-1]` last. Slices return new lists: `items[1:3]` a two-element sublist, `items[::2]` every other element. Slicing copies — a slice is a new list, so mutations to it never touch the original. Negative indices count from the end, which reads naturally in Python.",
  "Methods: append, pop": "`append(x)` adds to the end, `pop()` removes and returns the end (use `pop(i)` for an index). `insert(i, x)`, `remove(x)`, `extend(iterable)`, `index(x)`, `count(x)`, `sort()`, `reverse()` round out the toolbox. These methods mutate the list in place and return `None` — a classic beginner confusion: `items = items.sort()` silently kills the list.",
  "Tuple syntax": "A tuple is a comma-separated sequence, usually parenthesized: `(1, 2, 3)`. A single-element tuple needs the trailing comma: `(1,)`. Tuples are immutable — once created, they cannot change. Use them for fixed records (coordinates, RGB colors, function results) where change would be a bug.",
  "Immutability": "Tuples cannot be modified after creation — no assignment to elements, no append. This is a feature: a tuple is safe to share, pass around, and use as a dictionary key. If you need to 'modify' a tuple, you build a new one. Immutable values free you from a whole class of aliasing bugs that lists invite.",
  "Unpacking": "`x, y = point` unpacks a tuple (or any iterable) into separate names. Swapping two variables is one line: `a, b = b, a`. Unpacking works in `for` loops (`for x, y in points`), function returns (`return x, y`), and with `*rest` to capture the middle: `first, *middle, last = items`.",
  "Creating dicts": "Dictionaries map unique keys to values: `{\"name\": \"Ada\"}` or `dict(name=\"Ada\")`. Keys can be any immutable type — strings, ints, tuples. Lookup is near-instant regardless of size (hash tables). A dict literal with braces is the same braces as a set — the difference is whether entries are `key: value` pairs.",
  "Accessing values": "`d[key]` fetches a value but raises `KeyError` when the key is missing. `d.get(key, default)` returns a default instead — the safer everyday choice. `d.setdefault(key, val)` returns the value, inserting the default if absent. Membership is tested with `key in d`, which is fast and readable.",
  "Methods: keys, values, items": "`d.keys()`, `d.values()`, and `d.items()` return live views over the dict. Iterate pairs with `for k, v in d.items()`. Add or update with `d[k] = v` or `d.update(other)`. `del d[k]` removes a key, `d.pop(k)` removes and returns, `d.popitem()` removes the last inserted (insertion order is preserved since Python 3.7).",
  "Creating sets": "`set()` makes an empty set; `{1, 2, 3}` a literal; `set([1, 2, 2, 3])` dedupes any iterable. Sets hold unique, unordered, hashable elements. They are the fastest way to answer 'have I seen this before?' — membership is O(1). Note the empty literal `{}` is a dict, not a set.",
  "Membership test": "`x in s` checks membership in O(1) for sets but O(n) for lists — on a large collection the difference is enormous. Sets also dedupe automatically: `len({1, 2, 2, 3}) == 3`. Use sets for uniqueness and fast lookups; use lists when order or duplicates matter.",
  "Union & intersection": "Set algebra is native: `a | b` union, `a & b` intersection, `a - b` difference, `a ^ b` symmetric difference. These express 'all of', 'both', 'only in a', and 'either but not both'. Set operations are among the most compact, correct lines you can write — a membership diagram in a single operator.",
  "Basic syntax": "A list comprehension builds a list from a loop in one expression: `[expr for item in iterable]`. It reads in English order — 'take expr, for each item in iterable'. Comprehensions are usually faster and always more readable than a manual `for` loop that calls `append`.",
  "Conditional filters": "Comprehensions accept an `if` filter: `[x for x in nums if x > 0]` keeps only positives. The filter runs before the expression is built, so the result contains exactly the matching items. Combine with a transformation for one-line pipelines that would take five lines as loops.",
  "Nested loops": "Comprehensions can nest: `[(a, b) for a in xs for b in ys]` builds the Cartesian product. Order matters — it reads left-to-right, outer to inner, exactly like nested for loops. If nesting goes beyond two levels, a generator or a plain loop will usually read better.",
  "def statements": "`def name(params):` defines a reusable block. Definitions are executed when the interpreter reaches them, so a function must be defined before it is called (in practice: define all functions at the top). The `def` creates a function object and binds it to the name — functions are values like any other, passable and storable.",
  "Parameters": "Parameters are names the function fills from call arguments. `def greet(name, greeting=\"Hi\")` mixes required and default parameters — defaults must come last. You can pass by position, by keyword (`greet(greeting=\"Yo\", name=\"Ada\")`), or both. Parameter names are local to the function; they say nothing about the caller's variables.",
  "return values": "`return` hands a value back to the caller and immediately exits the function. Without a return, a function returns `None`. Return multiple values as a tuple: `return x, y`. Early returns are a clean way to handle guards — exit the moment the input is invalid, rather than wrapping the whole body in if/else.",
  "Local scope": "Names assigned inside a function are local to that call — they vanish when the function returns. Locals do not leak out, and parameters shadow outer names. Each recursive call gets its own set of locals. This isolation is what lets functions be composed and reused without accidental interference.",
  "Global scope": "Names defined at module level are global. Functions can read globals freely but cannot assign to them without the `global` keyword — assignment creates a local instead. As a rule, prefer parameters and return values over globals: globals make behavior depend on invisible state and break testability.",
  "LEGB rule": "Name resolution walks Local, Enclosing (nested functions), Global, Builtins — in that order. First hit wins. This explains most 'unexpected name' bugs: a name that exists globally is shadowed by a local of the same name. Trace your lookups along LEGB and Python's name rules become predictable.",
  "*args tuple": "`def f(*args):` gathers any number of positional arguments into a tuple named `args`. It is the 'take however many you get' parameter. Callers can also splat a sequence: `f(*items)` spreads a list into positional arguments. Used sparingly, *args makes APIs flexible without forcing callers to wrap values.",
  "**kwargs dict": "`def f(**kwargs):` gathers extra keyword arguments into a dict. Combined with *args, a function can accept literally any call signature. Splatting a dict into a call — `f(**d)` — is the standard way to forward configuration. Powerful, but prefer explicit parameters when you know the shape; **kwargs hides it.",
  "Default arguments": "Default values are evaluated once, at definition time — which is exactly why a mutable default (`def f(lst=[])`) is a bug: every call without that argument shares the same list. The idiom is to default to `None` and build the mutable inside. Defaults should be immutable or `None`.",
  "lambda": "`lambda x: expr` is a tiny anonymous function — a name-free function with exactly one expression (no statements). Use it where a function object is needed inline: as a `key=` function, or an argument to `map`/`filter`. If a lambda grows beyond a single line, give it a name with `def` instead — clarity wins.",
  "map()": "`map(fn, iterable)` applies `fn` to every element, lazily. It returns a map object — pass it to `list()` to realize it. List comprehensions cover most map use cases (`[fn(x) for x in xs]`), and comprehensions are preferred in idiomatic Python. map shines with existing functions and generators.",
  "filter()": "`filter(pred, iterable)` keeps only elements for which `pred` is truthy. Like map it is lazy and needs `list()` to realize. A comprehension with an `if` (`[x for x in xs if pred(x)]`) is the idiomatic replacement. filter still shows up in codebases, so read it fluently: 'keep these, drop those'.",
  "sorted with key": "`sorted(items, key=fn)` sorts by the result of `fn` rather than by the items themselves — sort strings by length, dicts by a field, tuples by one column. `key` runs once per item, so it is fast. Add `reverse=True` for descending. The same `key` parameter works on `list.sort()`, which sorts in place.",
  "split and join": "`text.split(sep)` breaks a string into a list on every occurrence of `sep` (whitespace by default); `sep.join(parts)` reverses it, gluing a list back into one string. These two are the backbone of parsing and serializing text. Remember: `join` is a string method — call it on the separator, not on the list.",
  "strip": "`text.strip()` removes leading and trailing whitespace — spaces, tabs, newlines. `lstrip()` and `rstrip()` trim one side; pass a set of characters to remove specific ones (`strip(\", .\")`). Always strip before comparing user input; a trailing newline has broken more programs than almost anything else.",
  "find and replace": "`text.find(sub)` returns the first index of a substring (or -1 if absent); `text.index(sub)` raises instead. `text.replace(old, new)` swaps every occurrence. `startswith`/`endswith` test boundaries cleanly. For more complex patterns, the `re` module takes over — but plain string methods cover most real needs.",
  "case methods": "`upper()`, `lower()`, `title()`, `capitalize()`, `swapcase()` transform case. Comparisons that should ignore case: `a.lower() == b.lower()`. `casefold()` is even more aggressive for international text. Note these return new strings — originals are never mutated, since strings are immutable.",
  "f-strings": "f-strings interpolate expressions directly into strings: `f\"{name} is {age}\"`. Any expression is allowed inside the braces, including calls and arithmetic. Add format specs after a colon: `{age:>5}` right-aligns, `{pi:.2f}` rounds to two decimals. Since Python 3.6, f-strings are the default choice for building text.",
  "format()": "`\"{}\".format(value)` is the older interpolation API. Positional or named placeholders: `\"{0} and {1}\"`, `\"{name}\"`. The format spec language is the same as f-strings. Today, f-strings are preferred for readability, but you will meet `.format()` in existing code — recognize it as a sibling, not a rival.",
  "Alignment & precision": "Format specs control width, alignment, and precision: `{x:>10}` pads to 10 characters right-aligned, `{x:<10}` left, `{x:^10}` centered; `{pi:.2f}` fixes two decimals; `{n:,}` adds thousands separators; `{x:05d}` zero-pads. Combined, these turn raw numbers into tidy, human-readable output with no manual padding code.",
  "try/except": "`try:` wraps risky code; if an exception is raised, execution jumps to the matching `except` block instead of crashing. This is how Python handles anticipated failure — bad input, missing files, broken connections. Catch only the exceptions you expect and can handle; an over-broad `except:` hides real bugs.",
  "finally": "`finally:` runs no matter what — after a successful try, after an exception is handled, and even after a `return`. Use it for cleanup: closing resources, releasing locks, restoring state. The `with` statement automates most resource cleanup, but `finally` is the manual tool that never silently skips its duty.",
  "raise": "`raise` deliberately triggers an exception — either re-raises the current one (bare `raise` inside except) or throws a new one (`raise ValueError(\"...\")`). Raising with a clear message turns an otherwise silent failure into an explicit, explainable one. Prefer raising specific exceptions over generic `Exception`.",
  "BaseException": "`BaseException` is the root of all exceptions. Directly under it sit `SystemExit`, `KeyboardInterrupt`, and `Exception`. You almost always work with `Exception` subclasses — the catch-all `except Exception` skips interrupts and exits, which is the right behavior for most code. Catch `BaseException` only when you truly must.",
  "ValueError vs TypeError": "`ValueError`: the value is the wrong shape or out of range (int of a non-number, sqrt of a negative). `TypeError`: the type itself is wrong (adding a string and an int, calling a non-callable). Reading which one you got tells you what your code assumed — and what the fix should be.",
  "Custom exceptions": "Subclass `Exception` to define your domain's error vocabulary: `class OutOfStockError(Exception)`. Then `raise OutOfStockError(\"...\")` and `except OutOfStockError:` reads like English. Custom exceptions turn vague failures into named, catchable, documented states — the mark of a well-designed library.",
  "open() modes": "`open(path, mode)` opens a file. Modes: `\"r\"` read (default), `\"w\"` write (truncates!), `\"a\"` append, `\"x\"` create-exclusive, plus `\"b\"` for binary and `\"+\"` for read/write. `\"w\"` silently destroys existing content — open with care. Text mode is default; encoding is usually UTF-8.",
  "The with statement": "`with open(...) as f:` guarantees the file is closed when the block exits — even on exceptions. Never manage files with bare `open()`/`close()`; forgetting close() leaks descriptors. `with` works with any 'context manager': files, locks, database connections. It is the canonical safe way to own a resource.",
  "Read/write text": "`f.read()` reads the whole file as one string; `f.readlines()` as a list of lines; `for line in f:` streams line by line (memory-friendly for big files). Write with `f.write(text)` or `f.writelines(list)`. Remember: writes are buffered — close or flush before inspecting the file externally.",
  "csv module": "The `csv` module reads and writes comma-separated tables. `csv.reader(f)` yields rows as lists; `csv.DictReader(f)` yields dicts keyed by the header row. `csv.writer` and `csv.DictWriter` go the other way. The module handles quoting and escaping that naive `line.split(\",\")` gets wrong.",
  "json module": "`json.dumps(obj)` serializes Python to JSON text; `json.loads(text)` parses JSON back to Python. Write to files with `json.dump(obj, f)` and read with `json.load(f)`. Dicts, lists, strings, numbers, booleans, and None map directly. JSON is the lingua franca of APIs and config — every language can exchange it.",
  "Serialization": "Serialization converts in-memory objects to a portable format (JSON text, CSV rows) and back. It is how programs persist state, talk to APIs, and exchange data across languages. Python's json/csv modules cover most needs; `pickle` handles arbitrary Python objects but is unsafe to load from untrusted sources.",
  "import": "`import module` makes the whole module available as `module.name`. The first import runs the module's top-level code and caches it; subsequent imports are nearly free. Imports belong at the top of the file, alphabetized, standard library before third-party before local — a convention that keeps large files navigable.",
  "from ... import": "`from module import name` pulls specific names into the current namespace, so you call `randint(...)` without the prefix. Use it for the few things you actually use — and avoid `from module import *`, which dumps unknown names into scope and collides silently.",
  "as aliases": "`import module as short` gives a module a local alias — `import numpy as np`, `import pandas as pd`. Aliases shorten hot paths in code that uses a module heavily. Use aliases the community expects (np, pd, plt) so your code reads like everyone else's.",
  "__name__": "`__name__` is `\"__main__\"` when the file is run directly, and the module's name when imported. Guard your runnable code with `if __name__ == \"__main__\":` — the file then works both as a script and as an importable library, without executing side effects on import.",
  "os and sys": "`os` talks to the operating system: `os.getcwd()`, `os.listdir()`, `os.makedirs()`, `os.environ`. `sys` talks to the interpreter: `sys.argv` (command-line args), `sys.exit()`, `sys.path`, `sys.version`. Together they bridge your script and its environment — the first stop for 'make this a real program'.",
  "math and random": "`math` provides `sqrt`, `ceil`, `floor`, `gcd`, `pow`, constants `pi` and `e`, and trigonometry. `random` provides `random()` (0–1 float), `randint(a, b)`, `choice(seq)`, `shuffle(list)`, `sample(pop, k)`. Use `secrets` instead of `random` for anything security-related.",
  "collections": "`collections` packs specialized containers: `Counter` tallies iterables, `defaultdict` auto-initializes missing keys, `OrderedDict` (now redundant — dicts keep order), `deque` is a fast double-ended queue, and `namedtuple` builds lightweight record classes. `Counter(s).most_common(3)` is one line of genuine analytics.",
  "datetime": "`datetime` models dates and times. `datetime.date.today()`, `datetime.datetime.now()`. Format with `strftime(\"%Y-%m-%d\")`, parse with `strptime`. `timedelta` does date arithmetic — `today + timedelta(days=7)`. Time handling has sharp edges (timezones!); for serious work reach for `zoneinfo`.",
  "Base case": "Every recursive function needs a base case — a condition under which it returns directly without recursing. It is the bottom of the recursion, the answer you already know. Without one, recursion runs until the stack overflows (`RecursionError`). The base case is not an optimization; it is what makes recursion terminate.",
  "Recursive step": "The recursive step calls the function with a smaller or simpler problem, trusting the same logic to solve it. Together 'smaller input + base case' guarantee progress toward termination. Many problems — tree traversal, divide-and-conquer, backtracking — are naturally recursive; fighting that structure with loops produces worse code.",
  "Stack depth": "Each recursive call pushes a frame onto the call stack. Python caps the stack around 1000 frames by default (`sys.setrecursionlimit` can raise it but the C stack is finite). Deep recursion risks `RecursionError`; iterative solutions or tail-style rewrites handle large inputs. Use recursion where depth is naturally shallow.",
  "sorted() and .sort()": "`sorted(iterable)` returns a new sorted list, leaving the original untouched — it works on any iterable. `list.sort()` sorts the list in place and returns `None`. Both are stable (equal elements keep original order), both accept `key` and `reverse`. Prefer `sorted` when you might not want to mutate.",
  "key functions": "A key function transforms each element before comparison: `sorted(words, key=len)` sorts by length, `sorted(people, key=lambda p: p[\"age\"])` sorts dicts by a field. Key is called once per element, so it is efficient. It is the single most useful tool for getting exactly the order you want.",
  "Binary search": "Binary search finds a target in a sorted collection in O(log n) — halving the search space each step. Python's `bisect` module provides `bisect_left`/`bisect_right` for insertion points. The mental model: check the middle, discard the half that cannot contain the target, repeat. Elegant, and the foundation of countless algorithms.",
  "Constant vs linear": "A constant-time (O(1)) operation takes the same time regardless of input size — dict lookup, list indexing. A linear (O(n)) operation scales with input — summing a list, scanning a string. The difference between 1 microsecond and a million is the difference between a hash lookup and a linear scan. Know which operations are which.",
  "Quadratic growth": "Quadratic (O(n²)) algorithms — nested loops over the same data — blow up fast: 100 items is 10,000 steps, 10,000 items is 100 million. They are often the naive first answer ('compare everything with everything') and often the place real performance dies. Recognize the shape; then reach for a hash, a sort, or a better structure.",
  "Choosing algorithms": "The right algorithm beats clever code every time. A dict replaces a linear search; `sort` + `bisect` replaces repeated scans; a set replaces 'is this in the list' checks. Measure, then optimize the algorithmic bottleneck first. Big O is the vocabulary for these decisions — internalize the classic shapes and you can spot the fix.",
  "Mutable vs immutable": "Lists, dicts, and sets are mutable — they change in place. Ints, floats, strings, tuples, and frozensets are immutable — any 'change' creates a new object. Immutability makes values safe to share freely; mutability is where aliasing bugs hide. Choose the immutable form when you do not need to change it.",
  "Shared references": "`b = a` makes both names point to the same object — a shared reference, not a copy. Mutating via either name affects both. This is usually exactly right (you want a pointer, not a clone), but surprises when you expected independence. Copy explicitly — `.copy()`, `[:]`, or `copy.deepcopy` — only when you mean it.",
  "copy and deepcopy": "`lst.copy()` (or `lst[:]`) copies one level: a new list sharing the same inner objects. `copy.deepcopy(x)` recursively copies everything — safe, slow. The classic trap: copying a list of lists with `.copy()` still shares the inner lists. Ask yourself how deep your independence needs to go.",
  "Default arg evaluation": "Default arguments are evaluated once when the function is defined, not per call. A list or dict default therefore persists across calls — every invocation without the argument sees the same object, accumulating mutations. It is the most famous Python gotcha, and understanding it once kills a lifetime of confusion.",
  "The None pattern": "The idiomatic fix for mutable defaults is `def f(x, acc=None):` then `if acc is None: acc = []`. Fresh state per call, explicit, readable. 'None as sentinel' is a broad pattern — use `None` to mean 'not provided' whenever a real value (including `[]` or `{}`) is ambiguous.",
  "class": "`class Name:` opens a class definition. Classes bundle data and behavior into a single type with its own name — the blueprint from which instances are built. Inside, `def` methods describe what instances do. Python classes are ordinary objects themselves; classes are values you can pass around, just like functions.",
  "__init__": "`__init__(self, ...)` is the constructor — called automatically when you build an instance. It receives the just-created object as `self` plus your arguments, and sets up its initial state (`self.attr = value`). `__init__` always returns `None`; object creation happens before it runs.",
  "self": "`self` is the conventional name for the instance a method is called on. It is passed automatically as the first argument: `s.describe()` calls `Student.describe(s)`. You must declare `self` in every instance method and use it to store or read instance state. The name is convention — but break it and you confuse everyone.",
  "Methods": "A method is a function defined inside a class, called on an instance. Instance methods take `self` and access instance state. Methods are shared by all instances — they live on the class — but act on whichever instance called them. Bundling state and behavior is what makes a class a coherent, reusable unit.",
  "Subclassing": "`class Dog(Animal):` creates a subclass — it inherits everything from its parent, then adds or overrides. A subclass is-a its parent: a Dog can do everything an Animal can. Inheritance models 'kind of' relationships and lets you write code against the base type that works for all variants.",
  "super()": "`super()` calls the parent's implementation from within a subclass method — typically `super().__init__(...)` to reuse parent setup before adding subclass state. It is how a subclass extends rather than replaces. `super()` computes the right next class in the MRO, so it stays correct through multiple inheritance.",
  "Overriding methods": "Defining a method with the same name as the parent replaces it for this subclass. Overriding is how subclasses customize behavior while keeping the same interface — callers can treat Dog and Cat identically and get different `speak()`. A clean override keeps the same signature and returns a compatible type.",
  "__str__ and __repr__": "`__str__` returns the friendly, human-readable form — what `print(obj)` shows. `__repr__` returns the unambiguous, developer-facing form — what the REPL shows and what ideally would recreate the object (`repr(obj)`). Implement `__repr__` for every class you write; it makes debugging dramatically easier.",
  "__eq__": "`__eq__(self, other)` defines how `==` compares instances. Without it, equality is identity — two equal-valued objects are unequal. Return `True` when the meaningful fields match; handle `other` of a different type by returning `NotImplemented`. Remember to keep `__hash__` consistent when you define `__eq__`.",
  "__len__": "`__len__(self)` powers `len(obj)` and truthiness (a zero-length object is falsy). Define it when your class represents a collection. Magic methods like `__len__`, `__getitem__` (indexing), `__iter__` (iteration) are how custom classes slip into the language's native syntax.",
  "@property": "`@property` turns a method into an attribute: `obj.balance` calls `balance(self)` without parentheses. Use it to compute derived values and to expose internal state with a clean read-only interface. It looks like plain attribute access to callers, so you can start with a plain attribute and upgrade to a property later — no caller changes.",
  "Setters": "`@balance.setter` defines what happens on assignment: `obj.balance = 500` routes through the setter, where you can validate, transform, or reject. Together getter + setter give you controlled access without breaking the attribute syntax. Validation (range checks, type checks) lives in the setter, not scattered across call sites.",
  "Validation": "Validation means rejecting bad state at the boundary instead of crashing later. In a setter or constructor: check ranges (`if amount <= 0: raise ValueError`), check types, normalize input. Fail fast with a clear message — a good error at the edge is a hundred times better than a confusing one in the middle.",
  "yield": "`yield` turns a function into a generator: it pauses, hands a value out, and resumes where it left off on the next `next()`. State is preserved between yields automatically. Generators build sequences lazily — values are produced on demand, so infinite sequences are expressible and huge ones use little memory.",
  "Generator expressions": "Parentheses instead of brackets make a generator expression: `(x * x for x in range(10))`. Lazy, single-pass, memory-cheap. `sum(x*x for x in nums)` is the idiomatic way to fold a generator without building an intermediate list. Swap to a list comprehension only when you truly need to reuse the sequence.",
  "Iterators": "An iterator is an object that yields values one at a time via `next()`. Lists, strings, and dicts are iterable (you can make iterators from them) but not themselves iterators. `for` loops are syntactic sugar over the iterator protocol — `iter(x)` + `next(x)` until `StopIteration`. Generators are the easiest way to write your own.",
  "Function wrappers": "A decorator is a function that takes a function and returns a new function that wraps it. The inner `wrapper` can run code before, after, or instead of the original — logging, timing, auth checks, caching. Decorators are the Python way to extend behavior without touching the original function's body.",
  "@syntax": "`@decorator` above a function is sugar for `fn = decorator(fn)` — apply, then rebind. Stacking `@a @b` applies bottom-up. The syntax hides an ordinary function call, which is why decorators can be parameterized (`@app.route(\"/\")`) by one more level of closure. Read `@name` as 'wrap this function with name'.",
  "Closures": "A closure is a function that remembers the variables of the scope where it was defined, even after that scope has returned. `make_multiplier(2)` returns `multiply`, which still knows `factor == 2`. The returned function 'closes over' its environment — a powerful building block for counters, factories, and partial application.",
  "Functions as values": "Functions are first-class: assignable to variables, storable in lists and dicts, passable as arguments, returnable from other functions. This is what enables `key=len`, decorators, and callbacks. Where another language needs interfaces or function pointers, Python just passes the function.",
  "Partial application": "Partial application pre-fills some arguments of a function to make a specialized version: `from functools import partial; double = partial(multiply, 2)`. Closures achieve the same effect by hand. The idea — a more specific function derived from a general one — reappears in `functools.partial`, decorators, and curried-style design.",
  "Parameter annotations": "`def f(x: int) -> str:` annotates expected types. Annotations are metadata — Python ignores them at runtime (no type checking by default), but editors, linters, and tools like mypy use them. Annotated code documents itself, enables autocomplete, and catches whole bug classes statically. Start annotating new functions today.",
  "Return types": "The `-> str` after the parameter list declares what the function returns. `Optional[int]` means 'int or None'; `List[str]` a list of strings; `Callable[[int], bool]` a function from int to bool. Return annotations make a signature complete: inputs and output, readable at a glance without reading the body.",
  "typing module": "The `typing` module provides the vocabulary: `List`, `Dict`, `Tuple`, `Set`, `Optional`, `Union`, `Callable`, `Iterator`, `Any`, and newer `Self`, `TypeAlias`. With Python 3.10+, built-ins are annotated directly (`list[str]`) with no import needed. Typing turns Python's dynamism into documented, checkable contracts.",
  "Project structure": "A small project: `main.py` plus modules (`models.py`, `utils.py`, `data/`, `tests/`). Keep a clear entry point, split by responsibility, keep files focused. `if __name__ == \"__main__\":` guards the entry. Even a 40-line tool benefits from this shape — it is the seed of every maintainable Python codebase.",
  "Real input/output": "A real CLI reads input and writes output people actually use: command-line args (`sys.argv`), prompts, files, formatted output. Structure it as pure functions (compute) around a thin I/O shell (read/write) — the logic becomes testable and the I/O stays obvious. 'Input → transform → output' is the shape of almost every program.",
  "Testing your tool": "Verify behavior with `assert` checks or the `unittest`/`pytest` frameworks: feed known input, assert known output, cover the edges (empty input, missing file, bad values). A tool you cannot test is a tool you cannot trust. Tests are how 'it works on my machine' becomes 'it works.'",
};

/* ─── Python quiz map ─── */

const PY_QUIZ_MAP: Record<string, { q: string; opts: { id: string; text: string; correct: boolean }[] }> = {
  "Assignment": {
    q: "What does `name = value` do in Python?",
    opts: [
      { id: "a", text: "Declares a typed variable", correct: false },
      { id: "b", text: "Binds a name to a value", correct: true },
      { id: "c", text: "Copies the value into memory", correct: false },
      { id: "d", text: "Allocates a fixed-size slot", correct: false },
    ],
  },
  "Dynamic typing": {
    q: "What determines a variable's type in Python?",
    opts: [
      { id: "a", text: "The variable name", correct: false },
      { id: "b", text: "The value it currently points to", correct: true },
      { id: "c", text: "The declaration statement", correct: false },
      { id: "d", text: "The enclosing function", correct: false },
    ],
  },
  "int and float": {
    q: "What does `5 / 2` return in Python?",
    opts: [
      { id: "a", text: "2", correct: false },
      { id: "b", text: "2.5", correct: true },
      { id: "c", text: "2 (truncated)", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "Floor division & modulo": {
    q: "What does `7 % 3` evaluate to?",
    opts: [
      { id: "a", text: "2", correct: true },
      { id: "b", text: "1", correct: false },
      { id: "c", text: "3", correct: false },
      { id: "d", text: "2.333", correct: false },
    ],
  },
  "bool type": {
    q: "Which of these values is falsy in Python?",
    opts: [
      { id: "a", text: "[0]", correct: false },
      { id: "b", text: "0", correct: true },
      { id: "c", text: "\"False\"", correct: false },
      { id: "d", text: "0.5", correct: false },
    ],
  },
  "and / or / not": {
    q: "What does `print(True and False)` output?",
    opts: [
      { id: "a", text: "True", correct: false },
      { id: "b", text: "False", correct: true },
      { id: "c", text: "None", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "for ... in": {
    q: "What does `for c in \"abc\"` iterate over?",
    opts: [
      { id: "a", text: "The characters a, b, c", correct: true },
      { id: "b", text: "The indices 0, 1, 2", correct: false },
      { id: "c", text: "The whole string once", correct: false },
      { id: "d", text: "Nothing — strings aren't iterable", correct: false },
    ],
  },
  "range()": {
    q: "What does `range(3)` yield?",
    opts: [
      { id: "a", text: "1, 2, 3", correct: false },
      { id: "b", text: "0, 1, 2", correct: true },
      { id: "c", text: "0, 1, 2, 3", correct: false },
      { id: "d", text: "A list [0, 1, 2]", correct: false },
    ],
  },
  "Methods: append, pop": {
    q: "What does `items.append(4)` do to the list `items`?",
    opts: [
      { id: "a", text: "Adds 4 to the end, returns the list", correct: false },
      { id: "b", text: "Adds 4 to the end, returns None", correct: true },
      { id: "c", text: "Inserts 4 at the start", correct: false },
      { id: "d", text: "Raises an error", correct: false },
    ],
  },
  "Immutability": {
    q: "Which of these can be used as a dictionary key?",
    opts: [
      { id: "a", text: "A list", correct: false },
      { id: "b", text: "A tuple", correct: true },
      { id: "c", text: "A dictionary", correct: false },
      { id: "d", text: "A set", correct: false },
    ],
  },
  "Accessing values": {
    q: "What happens with `d[\"missing\"]` when the key is absent?",
    opts: [
      { id: "a", text: "Returns None", correct: false },
      { id: "b", text: "Raises KeyError", correct: true },
      { id: "c", text: "Returns an empty string", correct: false },
      { id: "d", text: "Creates the key", correct: false },
    ],
  },
  "Membership test": {
    q: "What is the time complexity of `x in set`?",
    opts: [
      { id: "a", text: "O(1)", correct: true },
      { id: "b", text: "O(n)", correct: false },
      { id: "c", text: "O(log n)", correct: false },
      { id: "d", text: "O(n log n)", correct: false },
    ],
  },
  "Basic syntax": {
    q: "What does `[x * x for x in range(3)]` produce?",
    opts: [
      { id: "a", text: "[0, 1, 4]", correct: true },
      { id: "b", text: "[1, 4, 9]", correct: false },
      { id: "c", text: "A generator", correct: false },
      { id: "d", text: "[0, 1, 2]", correct: false },
    ],
  },
  "def statements": {
    q: "What does `def f():` do when the interpreter reaches it?",
    opts: [
      { id: "a", text: "Runs the body immediately", correct: false },
      { id: "b", text: "Creates a function object and binds it to f", correct: true },
      { id: "c", text: "Compiles the body to bytecode", correct: false },
      { id: "d", text: "Registers f with the runtime", correct: false },
    ],
  },
  "return values": {
    q: "What does a function without a `return` statement return?",
    opts: [
      { id: "a", text: "0", correct: false },
      { id: "b", text: "None", correct: true },
      { id: "c", text: "An empty string", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "*args tuple": {
    q: "What type is `args` inside `def f(*args):`?",
    opts: [
      { id: "a", text: "A list", correct: false },
      { id: "b", text: "A tuple", correct: true },
      { id: "c", text: "A dict", correct: false },
      { id: "d", text: "A set", correct: false },
    ],
  },
  "lambda": {
    q: "Which is a valid lambda?",
    opts: [
      { id: "a", text: "lambda x: x * 2", correct: true },
      { id: "b", text: "lambda x: return x * 2", correct: false },
      { id: "c", text: "lambda(x) -> x * 2", correct: false },
      { id: "d", text: "def lambda(x): return x * 2", correct: false },
    ],
  },
  "split and join": {
    q: "What does `\"a,b,c\".split(\",\")` return?",
    opts: [
      { id: "a", text: "\"a\", \"b\", \"c\" as a list", correct: true },
      { id: "b", text: "[\"a,b,c\"]", correct: false },
      { id: "c", text: "\"a b c\"", correct: false },
      { id: "d", text: "A tuple", correct: false },
    ],
  },
  "f-strings": {
    q: "What does `f\"{2 + 3}\"` evaluate to?",
    opts: [
      { id: "a", text: "\"2 + 3\"", correct: false },
      { id: "b", text: "\"5\"", correct: true },
      { id: "c", text: "5 (an int)", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "try/except": {
    q: "What happens when code in a `try` block raises a handled exception?",
    opts: [
      { id: "a", text: "The program crashes immediately", correct: false },
      { id: "b", text: "Control jumps to the matching except block", correct: true },
      { id: "c", text: "The exception is ignored silently", correct: false },
      { id: "d", text: "The try block restarts", correct: false },
    ],
  },
  "ValueError vs TypeError": {
    q: "`int(\"abc\")` raises which exception?",
    opts: [
      { id: "a", text: "TypeError", correct: false },
      { id: "b", text: "ValueError", correct: true },
      { id: "c", text: "NameError", correct: false },
      { id: "d", text: "IndexError", correct: false },
    ],
  },
  "The with statement": {
    q: "What does `with open(f) as fh:` guarantee?",
    opts: [
      { id: "a", text: "The file is closed when the block exits", correct: true },
      { id: "b", text: "The file is read-only", correct: false },
      { id: "c", text: "Errors are swallowed", correct: false },
      { id: "d", text: "The file never changes", correct: false },
    ],
  },
  "json module": {
    q: "Which function serializes a Python object to a JSON string?",
    opts: [
      { id: "a", text: "json.read()", correct: false },
      { id: "b", text: "json.dumps()", correct: true },
      { id: "c", text: "json.parse()", correct: false },
      { id: "d", text: "json.encode()", correct: false },
    ],
  },
  "Default arg evaluation": {
    q: "When are default argument values evaluated?",
    opts: [
      { id: "a", text: "Once, at function definition time", correct: true },
      { id: "b", text: "On every call", correct: false },
      { id: "c", text: "At module import", correct: false },
      { id: "d", text: "Only the first call", correct: false },
    ],
  },
  "self": {
    q: "What is passed automatically as the first argument to instance methods?",
    opts: [
      { id: "a", text: "The class", correct: false },
      { id: "b", text: "The instance", correct: true },
      { id: "c", text: "The module", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "__init__": {
    q: "When is `__init__` called?",
    opts: [
      { id: "a", text: "When an instance is created", correct: true },
      { id: "b", text: "When the class is defined", correct: false },
      { id: "c", text: "On every method call", correct: false },
      { id: "d", text: "When the module loads", correct: false },
    ],
  },
  "super()": {
    q: "What does `super()` call?",
    opts: [
      { id: "a", text: "The next class in the MRO", correct: true },
      { id: "b", text: "The object constructor only", correct: false },
      { id: "c", text: "The module-level function", correct: false },
      { id: "d", text: "The first method of the class", correct: false },
    ],
  },
  "__eq__": {
    q: "Without a custom `__eq__`, how does `==` compare two objects?",
    opts: [
      { id: "a", text: "By value of all attributes", correct: false },
      { id: "b", text: "By identity (same object)", correct: true },
      { id: "c", text: "By memory address only", correct: false },
      { id: "d", text: "It raises an error", correct: false },
    ],
  },
  "yield": {
    q: "What does a function containing `yield` become?",
    opts: [
      { id: "a", text: "A generator function", correct: true },
      { id: "b", text: "A regular function", correct: false },
      { id: "c", text: "A coroutine library", correct: false },
      { id: "d", text: "A class", correct: false },
    ],
  },
  "Closures": {
    q: "What is a closure?",
    opts: [
      { id: "a", text: "A function that remembers its defining scope's variables", correct: true },
      { id: "b", text: "A function with no arguments", correct: false },
      { id: "c", text: "An anonymous function", correct: false },
      { id: "d", text: "A class with one method", correct: false },
    ],
  },
  "Parameter annotations": {
    q: "What do type annotations do at runtime?",
    opts: [
      { id: "a", text: "Enforce types strictly", correct: false },
      { id: "b", text: "Nothing — they are metadata for tools", correct: true },
      { id: "c", text: "Convert values automatically", correct: false },
      { id: "d", text: "Optimize the code", correct: false },
    ],
  },
};

/* ─── Content generators ─── */

function generatePyTopicContent(topic: string, title: string, day: number): string {
  const cached = PY_TOPIC_CONTENT[topic];
  if (cached) return cached;

  const level = getLevelForDay(day);
  return (
    `Day ${day} introduces "${topic}" within the context of ${title}. ` +
    `This concept is part of the Python track at the ${level} proficiency tier. ` +
    `Understanding it requires both theoretical knowledge and hands-on practice with the interpreter. ` +
    `Focus on how ${topic} composes with the concepts around it — data structures, control flow, and idiomatic style. ` +
    `Experiment with the code template, then extend it to deepen your understanding.`
  );
}

function generatePyExercises(day: number, blueprint: PyBlueprint): Lesson["exercises"] {
  const prefix = `py${day}`;
  const topics = blueprint.theoryTopics;

  const quizzes: Lesson["exercises"] = [];
  const usedTopics = new Set<string>();

  for (let i = 0; i < Math.min(topics.length, 2); i++) {
    const topic = topics[i];
    const entry = PY_QUIZ_MAP[topic];
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
      question: "Which of these is the Pythonic way to check if a value is present?",
      options: [
        { id: "a", text: "`for i in range(len(items)):` and compare", correct: false },
        { id: "b", text: "`value in items`", correct: true },
        { id: "c", text: "`items.contains(value)`", correct: false },
        { id: "d", text: "`items.find(value)`", correct: false },
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
    hints: [
      "Review the theory section for each topic",
      "Run the code in the playground to see the baseline",
      "Extend it: add inputs, edge cases, or a second example",
    ],
    xpReward: 50,
  });

  return quizzes;
}

function generatePyAssignment(day: number, blueprint: PyBlueprint): Lesson["assignment"] {
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

export function buildPythonLesson(day: number): Lesson {
  const blueprint = PY_CURRICULUM[day - 1];
  if (!blueprint) throw new Error(`No Python lesson for day ${day}`);

  return {
    day,
    title: blueprint.title,
    subtitle: blueprint.subtitle,
    language: "python",
    track: "python",
    level: getLevelForDay(day),
    durationMinutes: 45 + (day % 3) * 15,
    xpTotal: 200,
    tags: blueprint.tags,
    theory: {
      sections: blueprint.theoryTopics.map((topic, i) => ({
        heading: topic,
        content: generatePyTopicContent(topic, blueprint.title, day),
        codeExample: i === 0 ? blueprint.codeTemplate : undefined,
      })),
    },
    playground: {
      defaultCode: blueprint.codeTemplate,
      language: "python",
      runnable: true,
    },
    exercises: generatePyExercises(day, blueprint),
    assignment: generatePyAssignment(day, blueprint),
  };
}
