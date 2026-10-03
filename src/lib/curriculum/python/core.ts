import type { Lesson } from "../../types";
import { getLevelForDay } from "../../types";

/* ─── Python blueprints: Days 1–100 ─── */

interface PyBlueprint {
  title: string;
  subtitle: string;
  language: "python";
  tags: string[];
  theoryTopics: string[];
  codeTemplate: string;
  /** Deterministic substring produced by a correct run of `codeTemplate` (for code-challenge gating). */
  expectedOutput?: string;
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
  { title: "Itertools I: Lazy Building Blocks", subtitle: "chain, count, cycle, and islice", language: "python", tags: ["itertools"], theoryTopics: ["Itertools overview", "Infinite iterators", "Combinatoric iterators"], codeTemplate: `import itertools\n\nprint(list(itertools.chain([1, 2], [3, 4])))\nprint(list(itertools.islice(itertools.count(10), 3)))\nprint(list(itertools.repeat("hi", 3)))` },
  { title: "functools: partial & Friends", subtitle: "Pre-fill arguments, cache results", language: "python", tags: ["functools"], theoryTopics: ["functools overview", "Partial with functools", "Caching with lru_cache"], codeTemplate: `from functools import partial, reduce\n\ndef power(base, exp):\n    return base ** exp\n\nsquare = partial(power, exp=2)\nprint(square(5))\nprint(reduce(lambda a, b: a + b, [1, 2, 3, 4]))` },
  { title: "pathlib: Paths as Objects", subtitle: "Join, inspect, and walk the filesystem", language: "python", tags: ["pathlib"], theoryTopics: ["Paths with pathlib", "Joining and resolving", "Reading the filesystem"], codeTemplate: `from pathlib import Path\n\np = Path("projects") / "asta" / "notes.txt"\nprint(p.name)\nprint(p.suffix)\nprint(p.parent)` },
  { title: "argparse: Real CLIs", subtitle: "Arguments, flags, and help text", language: "python", tags: ["argparse", "cli"], theoryTopics: ["Argument parsing", "Positional vs optional args", "Help and defaults"], codeTemplate: `import argparse\n\nparser = argparse.ArgumentParser(description="Greet someone")\nparser.add_argument("name", help="who to greet")\nparser.add_argument("--shout", action="store_true")\nargs = parser.parse_args(["Ada"])\nprint("Hello, " + args.name + "!")\nprint(args.shout)` },
  { title: "logging: Beyond print", subtitle: "Levels, formats, and loggers", language: "python", tags: ["logging"], theoryTopics: ["Logging levels", "Configuration", "Loggers vs root"], codeTemplate: `import logging\n\nlogging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")\nlogging.info("server started")\nlogging.warning("disk almost full")\nprint("logged 2 messages")` },
  { title: "Regex I: Searching Text", subtitle: "search, match, and groups", language: "python", tags: ["regex"], theoryTopics: ["Regex syntax", "search and match", "Groups"], codeTemplate: `import re\n\nm = re.search(r"(\\d+)-(\\d+)", "code 200-404")\nprint(m.group(0))\nprint(m.group(1))\nprint(m.group(2))` },
  { title: "Regex II: Transforming Text", subtitle: "findall, sub, split, and flags", language: "python", tags: ["regex"], theoryTopics: ["findall and sub", "Splitting with regex", "Flags"], codeTemplate: `import re\n\nprint(re.findall(r"\\w+@\\w+\\.com", "ada@x.com and grace@y.com"))\nprint(re.sub(r"\\s+", " ", "too   much   space"))\nprint(re.split(r"[,;]", "a,b;c"))` },
  { title: "unittest: Test Cases That Stick", subtitle: "TestCase, assertions, and discovery", language: "python", tags: ["testing"], theoryTopics: ["unittest TestCase", "Assertions", "Test discovery"], codeTemplate: `def add(a, b):\n    return a + b\n\ndef total(nums):\n    s = 0\n    for n in nums:\n        s = s + n\n    return s\n\nassert add(2, 3) == 5\nassert total([1, 2, 3]) == 6\nprint("2 tests passed")\nprint(total([4, 5, 6]))` },
  { title: "pytest: Tests as Functions", subtitle: "Plain asserts and test discovery", language: "python", tags: ["testing"], theoryTopics: ["pytest test functions", "Fixtures concept", "Running pytest"], codeTemplate: `def average(nums):\n    return sum(nums) / len(nums)\n\ndef test_average():\n    assert average([1.0, 2.0, 3.0]) == 2.0\n    return True\n\nok = test_average()\nprint(ok)\nprint("pytest style checks passed")` },
  { title: "venv & pip: Isolated Environments", subtitle: "Create, activate, and freeze", language: "python", tags: ["packaging"], theoryTopics: ["Virtual environments", "pip and requirements", "Activation"], codeTemplate: `import sys\n\nprint(sys.version_info.major)\nprint(sys.prefix)` },
  { title: "dataclasses: Data with Less Code", subtitle: "Fields, defaults, and frozen types", language: "python", tags: ["oop"], theoryTopics: ["Dataclass basics", "Fields and defaults", "Frozen dataclasses"], codeTemplate: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\np = Point(1.0, 2.0)\nprint(p)\nprint(p.x + p.y)` },
  { title: "Enums: Named Constants", subtitle: "Enum, auto(), and IntEnum", language: "python", tags: ["enums"], theoryTopics: ["Enum basics", "Values with auto()", "IntEnum"], codeTemplate: `from enum import Enum, auto\n\nclass Role(Enum):\n    ADMIN = auto()\n    MEMBER = auto()\n    GUEST = auto()\n\nprint(Role.ADMIN.name)\nprint(Role.MEMBER.value)\nprint(len(list(Role)))` },
  { title: "Context Managers: Own Resources Safely", subtitle: "with, enter/exit, and contextlib", language: "python", tags: ["context-managers"], theoryTopics: ["The with statement (deep)", "Custom context managers", "contextlib"], codeTemplate: `class Timer:\n    def __enter__(self):\n        print("start")\n        return self\n\n    def __exit__(self, *exc):\n        print("stop")\n        return False\n\nwith Timer():\n    print("working")` },
  { title: "Decorators with Arguments", subtitle: "Factories, retry, and metadata", language: "python", tags: ["decorators"], theoryTopics: ["Parameterized decorators", "Decorator factories", "Preserving metadata"], codeTemplate: `def repeat(times):\n    def decorator(fn):\n        def wrapper(*args, **kwargs):\n            result = None\n            for _ in range(times):\n                result = fn(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef hello():\n    print("hi")\n\nhello()\nprint("done")` },
  { title: "Generators Deep: Pipelines", subtitle: "yield from, infinite streams, teardown", language: "python", tags: ["generators"], theoryTopics: ["Generator pipelines", "send and yield from", "Infinite generators"], codeTemplate: `def pipeline(nums):\n    for n in nums:\n        if n % 2 == 0:\n            yield n * 10\n\ngen = pipeline(range(1, 7))\nprint(next(gen))\nprint(next(gen))\nprint(list(gen))` },
  { title: "Typing: Generics", subtitle: "TypeVar, Generic, and bounds", language: "python", tags: ["typing"], theoryTopics: ["Type variables", "Generic classes", "Bounded types"], codeTemplate: `from typing import TypeVar, Generic, List\n\nT = TypeVar("T")\n\nclass Stack(Generic[T]):\n    def __init__(self):\n        self.items: List[T] = []\n\n    def push(self, item: T):\n        self.items.append(item)\n\ns: Stack[int] = Stack()\ns.push(1)\ns.push(2)\nprint(s.items)\nprint(len(s.items))` },
  { title: "JSON APIs: Fetch & Shape Data", subtitle: "Parse responses, reach nested fields", language: "python", tags: ["json", "apis"], theoryTopics: ["JSON over HTTP", "Nested access", "Serializing payloads"], codeTemplate: `import json\n\npayload = '{"name": "Ada", "scores": [10, 20, 30]}'\nuser = json.loads(payload)\nprint(user["name"])\nprint(sum(user["scores"]))\nprint(json.dumps({"ok": True}))` },
  { title: "CSV Pipelines: Rows In, Rows Out", subtitle: "Parse, clean, and emit tables", language: "python", tags: ["csv", "data"], theoryTopics: ["Reading CSV rows", "Writing CSV output", "Cleaning pipelines"], codeTemplate: `rows = ["name,age,city", "ada,36,london", "grace,85,new york"]\nheader = rows[0].split(",")\nprint(header)\nfor line in rows[1:]:\n    fields = line.split(",")\n    print(fields[0] + " is " + fields[1])` },
  { title: "sqlite3: A Database in a File", subtitle: "Connect, insert, and query", language: "python", tags: ["sqlite", "databases"], theoryTopics: ["Connecting with sqlite3", "Parameterized queries", "Fetching rows"], codeTemplate: `import sqlite3\n\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE users (name TEXT, age INTEGER)")\ndb.execute("INSERT INTO users VALUES (?, ?)", ("Ada", 36))\nprint(db.execute("SELECT name, age FROM users").fetchall())\ndb.close()` },
  { title: "Milestone: Contact Book CLI", subtitle: "Design, persist, and polish a real tool", language: "python", tags: ["capstone", "project"], theoryTopics: ["Milestone: contacts project", "Persistence design", "Polish and test"], codeTemplate: `import json\n\ncontacts = [{"name": "Ada", "email": "ada@example.com"}]\ntext = json.dumps(contacts, indent=2)\nprint(len(contacts), "contact saved")\nprint(contacts[0]["name"])` },
  { title: "Error Hierarchies: Design Your Failures", subtitle: "Base errors, catching wide, raising from", language: "python", tags: ["exceptions"], theoryTopics: ["Exception hierarchies", "Catching base classes", "Raising from"], codeTemplate: `class AppError(Exception):\n    pass\n\nclass NotFoundError(AppError):\n    pass\n\ntry:\n    raise NotFoundError("missing user 7")\nexcept AppError as e:\n    print("caught:", e)` },
  { title: "Debugging with pdb", subtitle: "Tracebacks, breakpoints, and inspection", language: "python", tags: ["debugging"], theoryTopics: ["Reading tracebacks", "pdb commands", "Breakpoints"], codeTemplate: `def buggy_average(nums):\n    total = 0\n    for n in nums:\n        total += n\n    # breakpoint()  # pdb: (p)rint total, (n)ext, (c)ontinue\n    return total / len(nums)\n\nprint(buggy_average([10, 20, 30]))\nprint("debugged")` },
  { title: "Performance: Measure First", subtitle: "timeit, bottlenecks, and idioms", language: "python", tags: ["performance"], theoryTopics: ["Timing code", "Algorithmic bottlenecks", "Faster Python idioms"], codeTemplate: `nums = list(range(40))\nprint(sum(nums))\npairs = 0\nfor a in nums:\n    for b in nums:\n        pairs = pairs + 1\nprint(pairs)` },
  { title: "collections: Power Containers", subtitle: "Counter, defaultdict, and deque", language: "python", tags: ["stdlib"], theoryTopics: ["Counter", "defaultdict", "deque"], codeTemplate: `from collections import Counter, defaultdict, deque\n\nprint(Counter("abracadabra").most_common(2))\nd = defaultdict(list)\nd["a"].append(1)\nprint(dict(d))\nq = deque([1, 2, 3])\nq.appendleft(0)\nprint(list(q))` },
  { title: "datetime: Dates & Times", subtitle: "Dates, timedeltas, and formatting", language: "python", tags: ["datetime"], theoryTopics: ["Dates and times", "Timedeltas", "Formatting dates"], codeTemplate: `from datetime import date, timedelta\n\ntoday = date(2026, 10, 2)\nweek = today + timedelta(days=7)\nprint(today.isoformat())\nprint(week.isoformat())\nprint((week - today).days)` },
  { title: "Dicts Deep: Count & Group", subtitle: "Frequency tables and grouping loops", language: "python", tags: ["dictionaries"], theoryTopics: ["Counting patterns", "Grouping data", "Nested dicts"], codeTemplate: `text = "abracadabra"\ncounts = {}\nfor ch in text:\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts.get("a", 0))\nprint(counts.get("b", 0))\nbest = ""\nfor k in counts:\n    if counts[k] > counts.get(best, 0):\n        best = k\nprint(best)` },
  { title: "String Parsing: Clean Pipelines", subtitle: "Strip, split, and extract fields", language: "python", tags: ["strings"], theoryTopics: ["Cleaning text", "Parsing lines", "Field extraction"], codeTemplate: `raw = "  Ada Lovelace, 1815, Mathematician  "\ncleaned = raw.strip()\nparts = cleaned.split(",")\nprint(parts[0].strip())\nprint(parts[1].strip())\nprint(parts[0].strip().upper())` },
  { title: "Recursion Deep: Memoization", subtitle: "Cache subproblems, kill repetition", language: "python", tags: ["recursion"], theoryTopics: ["Memoization", "Overlapping subproblems", "Cache invalidation"], codeTemplate: `cache = {}\n\ndef fib(n):\n    if n < 2:\n        return n\n    cached = cache.get(n, -1)\n    if cached != -1:\n        return cached\n    result = fib(n - 1) + fib(n - 2)\n    cache[n] = result\n    return result\n\nprint(fib(10))\nprint(len(cache))` },
  { title: "Formatting Deep: f-strings", subtitle: "Precision, width, and expressions", language: "python", tags: ["strings"], theoryTopics: ["Precision formatting", "Alignment and width", "Expressions in f-strings"], codeTemplate: `pi = 3.14159\nprint(f"{pi:.2f}")\nprint(f"{36:>5}")\nname = "ada"\nprint(f"{name.upper()} scored {10 * 9}")` },
  { title: "Itertools II: Combos & groupby", subtitle: "permutations, groupby, and recipes", language: "python", tags: ["itertools"], theoryTopics: ["Permutations and combinations", "groupby", "Recipes"], codeTemplate: `import itertools\n\nprint(list(itertools.permutations([1, 2, 3], 2))[:2])\nprint([list(g) for _, g in itertools.groupby([1, 1, 2, 3, 3])][:2])` },
  { title: "Threading I: Birth a Thread", subtitle: "Threads, start/join, and the GIL", language: "python", tags: ["threading", "concurrency"], theoryTopics: ["Thread basics", "start and join", "The GIL (intro)"], codeTemplate: `import threading\n\ndef worker(name):\n    print("worker " + name + " running")\n\nthreads = []\nfor i in range(3):\n    t = threading.Thread(target=worker, args=("t" + str(i),))\n    threads.append(t)\n    t.start()\n\nfor t in threads:\n    t.join()\nprint("all threads finished")` },
  { title: "Threading II: Locks & Races", subtitle: "Race conditions and locks", language: "python", tags: ["threading", "locks"], theoryTopics: ["Race conditions", "Locks", "Lock discipline"], codeTemplate: `import threading\n\ncounter = 0\nlock = threading.Lock()\n\ndef add_many():\n    global counter\n    for _ in range(1000):\n        with lock:\n            counter = counter + 1\n\nthreads = [threading.Thread(target=add_many) for _ in range(4)]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(counter)` },
  { title: "Thread Pools: concurrent.futures", subtitle: "Pools, futures, and map", language: "python", tags: ["concurrency", "futures"], theoryTopics: ["Executor pools", "Submitting work", "Futures and results"], codeTemplate: `from concurrent.futures import ThreadPoolExecutor\n\ndef square(n):\n    return n * n\n\nwith ThreadPoolExecutor(max_workers=4) as pool:\n    results = list(pool.map(square, range(6)))\nprint(results)\nprint(sum(results))` },
  { title: "Multiprocessing: Escape the GIL", subtitle: "Processes, pools, and IPC", language: "python", tags: ["multiprocessing", "concurrency"], theoryTopics: ["Processes vs threads", "Process pools", "Inter-process communication"], codeTemplate: `from multiprocessing import Pool\n\ndef cube(n):\n    return n * n * n\n\nif __name__ == "__main__":\n    with Pool(2) as pool:\n        results = pool.map(cube, range(5))\n    print(results)` },
  { title: "Queues: Producer–Consumer", subtitle: "Producers, consumers, and shutdown", language: "python", tags: ["queues", "concurrency"], theoryTopics: ["Task queues", "Producer-consumer", "Graceful shutdown"], codeTemplate: `import queue\nimport threading\n\nwork = queue.Queue()\ndone = []\n\ndef consumer():\n    while True:\n        item = work.get()\n        if item is None:\n            work.task_done()\n            break\n        done.append(item * 10)\n        work.task_done()\n\nt = threading.Thread(target=consumer)\nt.start()\nfor n in range(1, 4):\n    work.put(n)\nwork.put(None)\nwork.join()\nt.join()\ndone.sort()\nprint(done)` },
  { title: "asyncio I: Coroutines", subtitle: "Coroutines and the event loop", language: "python", tags: ["asyncio", "concurrency"], theoryTopics: ["Coroutines", "The event loop", "async and await"], codeTemplate: `import asyncio\n\nasync def greet(name):\n    await asyncio.sleep(0.01)\n    return "hello " + name\n\nasync def main():\n    print(await greet("ada"))\n    print(await greet("grace"))\n\nasyncio.run(main())` },
  { title: "asyncio II: Tasks & gather", subtitle: "Tasks, gather, and structured waiting", language: "python", tags: ["asyncio", "concurrency"], theoryTopics: ["Spawning tasks", "gather", "Concurrency vs parallelism"], codeTemplate: `import asyncio\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay)\n    return name + " done"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch("a", 0.02),\n        fetch("b", 0.01),\n        fetch("c", 0.015),\n    )\n    print(list(results))\n\nasyncio.run(main())` },
  { title: "asyncio III: Timeouts", subtitle: "Timeouts, shielding, and async patterns", language: "python", tags: ["asyncio", "concurrency"], theoryTopics: ["Timeouts with wait_for", "Shielding work", "Async iteration patterns"], codeTemplate: `import asyncio\n\nasync def slow():\n    await asyncio.sleep(1)\n    return "too slow"\n\nasync def quick():\n    await asyncio.sleep(0.01)\n    return "in time"\n\nasync def main():\n    try:\n        print(await asyncio.wait_for(slow(), timeout=0.05))\n    except asyncio.TimeoutError:\n        print("timed out")\n    print(await asyncio.wait_for(quick(), timeout=1))\n\nasyncio.run(main())` },
  { title: "HTTP Clients & Web APIs", subtitle: "Fetch JSON, shape payloads, handle errors", language: "python", tags: ["http", "apis"], theoryTopics: ["HTTP client basics", "Shaping API payloads", "Status codes and errors"], codeTemplate: `import json\n\n# A saved response body (in production: bytes from urllib.request.urlopen)\npayload = '{"user": "Ada", "repos": [{"name": "asta", "stars": 42}, {"name": "notes", "stars": 7}]}'\ndata = json.loads(payload)\ntotal = 0\ntop = ""\nbest = 0\nfor repo in data["repos"]:\n    total = total + repo["stars"]\n    if repo["stars"] > best:\n        best = repo["stars"]\n        top = repo["name"]\nprint(data["user"] + " has " + str(total) + " stars")\nprint("top repo: " + top)` },
  { title: "Milestone: Concurrent Fetch CLI", subtitle: "A concurrent fetcher with a report", language: "python", tags: ["capstone", "project"], theoryTopics: ["Milestone: fetch CLI", "Result aggregation", "Exit codes and reports"], codeTemplate: `import json\n\n# Offline stand-ins for HTTP responses: each row is one fetch result\nresults = [{"url": "https://api.example.com/users", "status": 200}, {"url": "https://api.example.com/orders", "status": 200}, {"url": "https://api.example.com/missing", "status": 404}]\nok = 0\nfailed = []\nfor r in results:\n    if r["status"] == 200:\n        ok = ok + 1\n    else:\n        failed.append(r["url"])\nreport = {}\nreport["fetched"] = ok\nreport["failed"] = len(failed)\nprint(json.dumps(report))\nprint(str(ok) + " ok, " + str(len(failed)) + " failed")` },
  { title: "subprocess: Shell Out Safely", subtitle: "Run processes without shell=True", language: "python", tags: ["subprocess", "cli"], theoryTopics: ["Running processes", "Capturing output", "Shell injection safety"], codeTemplate: `import subprocess\nimport sys\n\n# Same interpreter, no shell: an argv list, never a shell string\nproc = subprocess.run(\n    [sys.executable, "--version"],\n    capture_output=True,\n    text=True,\n)\nprint("returncode:", proc.returncode)\nprint("python found:", (proc.stdout + proc.stderr).strip() != "")` },
  { title: "Packaging & pyproject", subtitle: "Metadata, structure, and backends", language: "python", tags: ["packaging"], theoryTopics: ["Project metadata", "pyproject structure", "Build backends"], codeTemplate: `lines = ["[project]", "name = fetchcli", "version = 0.1.0", "requires-python = >=3.9"]\n\nmeta = {}\nfor line in lines:\n    if "=" in line:\n        parts = line.split("=")\n        key = parts[0].strip()\n        val = parts[1].strip()\n        meta[key] = val\nprint(meta.get("name", ""))\nprint(meta.get("version", ""))\nprint(len(meta))` },
  { title: "Protocols: Structural Typing", subtitle: "Duck typing with a contract", language: "python", tags: ["typing", "protocols"], theoryTopics: ["Structural typing", "runtime_checkable protocols", "Protocols vs inheritance"], codeTemplate: `from typing import Protocol, runtime_checkable\n\n@runtime_checkable\nclass Closer(Protocol):\n    def close(self):\n        pass\n\nclass Socket:\n    def close(self):\n        return "closed"\n\nprint(isinstance(Socket(), Closer))\nprint(isinstance("nope", Closer))` },
  { title: "ABCs: Abstract Base Classes", subtitle: "Enforced interfaces via ABCMeta", language: "python", tags: ["typing", "oop"], theoryTopics: ["Abstract methods", "ABCMeta enforcement", "ABCs vs Protocols"], codeTemplate: `from abc import ABC, abstractmethod\n\nclass Store(ABC):\n    @abstractmethod\n    def save(self, record):\n        pass\n\nclass MemoryStore(Store):\n    def __init__(self):\n        self.rows = []\n\n    def save(self, record):\n        self.rows.append(record)\n        return len(self.rows)\n\nstore = MemoryStore()\nprint(store.save({"id": 1}))\ntry:\n    Store()\n    print("instantiated")\nexcept TypeError:\n    print("abstract blocked")` },
  { title: "Metaclasses: Classes from Classes", subtitle: "type(), metaclasses, and __init_subclass__", language: "python", tags: ["oop", "metaclasses"], theoryTopics: ["type() as constructor", "Custom metaclasses", "__init_subclass__"], codeTemplate: `print(type(42))\nprint(type("hi"))\nPoint = type("Point", (), {"x": 1, "y": 2})\nprint(Point.x + Point.y)\n\nclass Plugin:\n    registry = []\n\n    def __init_subclass__(cls):\n        Plugin.registry.append(cls.__name__)\n\nclass AuthPlugin(Plugin):\n    pass\n\nclass CachePlugin(Plugin):\n    pass\n\nprint(Plugin.registry)` },
  { title: "Async Context Managers", subtitle: "async with and async cleanup", language: "python", tags: ["asyncio", "context-managers"], theoryTopics: ["async with", "__aenter__ and __aexit__", "Async cleanup patterns"], codeTemplate: `import asyncio\n\nclass Connection:\n    async def __aenter__(self):\n        print("open")\n        return self\n\n    async def __aexit__(self, *exc):\n        print("close")\n        return False\n\nasync def main():\n    async with Connection():\n        print("query")\n\nasyncio.run(main())` },
  { title: "__slots__: Lean Objects", subtitle: "Lean objects and memory trade-offs", language: "python", tags: ["oop", "performance"], theoryTopics: ["__slots__ basics", "Memory trade-offs", "Slots and inheritance"], codeTemplate: `class Point:\n    __slots__ = ("x", "y")\n\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\np = Point(3, 4)\nprint(p.x + p.y)\nprint(p.__slots__)\ntry:\n    p.z = 9\n    print("extra allowed")\nexcept AttributeError:\n    print("extra blocked")` },
  { title: "weakref: References That Don't Own", subtitle: "Non-owning references and cycles", language: "python", tags: ["memory"], theoryTopics: ["Weak references", "Reference cycles", "Caches without leaks"], codeTemplate: `import weakref\n\nclass Node:\n    def __init__(self, name):\n        self.name = name\n\n    def __repr__(self):\n        return "Node(" + self.name + ")"\n\nnode = Node("root")\nref = weakref.ref(node)\nprint(ref())\nprint(ref() is node)\ndel node\nprint(ref())` },
  { title: "copy & pickle: Clone & Persist", subtitle: "Clone correctly, unpickle suspiciously", language: "python", tags: ["copy", "persistence"], theoryTopics: ["Shallow vs deep copy", "Writing a recursive clone", "Pickle safety rules"], codeTemplate: `def clone(value):\n    if type(value) == list:\n        out = []\n        for item in value:\n            out.append(clone(item))\n        return out\n    if type(value) == dict:\n        out2 = {}\n        for k in value:\n            out2[k] = clone(value[k])\n        return out2\n    return value\n\noriginal = {"a": [1, 2], "b": [3]}\ncopied = clone(original)\ncopied["a"].append(99)\nprint(original["a"])\nprint(copied["a"])\nprint(len(copied))` },
  { title: "secrets & hashlib: Tokens & Digests", subtitle: "Tokens, digests, and safe comparison", language: "python", tags: ["security", "hashing"], theoryTopics: ["Cryptographic randomness", "Hashing with hashlib", "Comparing digests safely"], codeTemplate: `import hashlib\nimport secrets\n\ntoken = secrets.token_hex(8)\nprint(len(token))\nprint(hashlib.sha256(b"asta").hexdigest()[:8])\nprint(secrets.compare_digest("abc", "abc"))` },
  { title: "inspect: Introspection", subtitle: "Signatures, objects, and live inspection", language: "python", tags: ["introspection", "debugging"], theoryTopics: ["Inspecting signatures", "Reading live objects", "Frames and stacks"], codeTemplate: `import inspect\n\ndef add(a, b=2):\n    return a + b\n\nprint(inspect.signature(add))\nprint(inspect.isfunction(add))\nprint(len(inspect.getfullargspec(add).args))` },
  { title: "Descriptors: The Attribute Protocol", subtitle: "The protocol behind @property", language: "python", tags: ["oop", "descriptors"], theoryTopics: ["The descriptor protocol", "__get__ and __set__", "How @property works"], codeTemplate: `class Positive:\n    def __get__(self, obj, objtype=None):\n        return obj.__dict__.get("value", 0)\n\n    def __set__(self, obj, value):\n        if value <= 0:\n            raise ValueError("must be positive")\n        obj.__dict__["value"] = value\n\nclass Reading:\n    amount = Positive()\n\nr = Reading()\nr.amount = 10\nprint(r.amount)\ntry:\n    r.amount = -1\n    print("accepted")\nexcept ValueError:\n    print("rejected")` },
  { title: "functools II: singledispatch", subtitle: "Dispatch, ordering, and cache discipline", language: "python", tags: ["functools"], theoryTopics: ["Single dispatch", "total_ordering", "Cache discipline"], codeTemplate: `from functools import singledispatch\n\n@singledispatch\ndef describe(value):\n    return "unknown"\n\n@describe.register(int)\ndef _int(value):\n    return "int " + str(value)\n\n@describe.register(list)\ndef _list(value):\n    return "list of " + str(len(value))\n\nprint(describe(7))\nprint(describe([1, 2, 3]))\nprint(describe("hi"))` },
  { title: "heapq & bisect: Ordered Data", subtitle: "Heaps, insertion points, and priority queues", language: "python", tags: ["algorithms", "stdlib"], theoryTopics: ["Heaps with heapq", "Bisect insertion points", "Priority queues"], codeTemplate: `import bisect\nimport heapq\n\nscores = [10, 30, 20]\nbisect.insort(scores, 25)\nprint(scores)\nprint(bisect.bisect_left(scores, 20))\n\ntasks = []\nheapq.heappush(tasks, (2, "write"))\nheapq.heappush(tasks, (1, "plan"))\nheapq.heappush(tasks, (3, "ship"))\nprint(heapq.heappop(tasks))\nprint(len(tasks))` },
  { title: "Timezones: Aware Datetimes", subtitle: "Aware datetimes and UTC-first design", language: "python", tags: ["datetime"], theoryTopics: ["Naive vs aware", "zoneinfo", "UTC-first design"], codeTemplate: `from datetime import datetime, timedelta, timezone\n\nnow = datetime(2026, 10, 2, 12, 0, tzinfo=timezone.utc)\nprint(now.isoformat())\nlater = now + timedelta(hours=5, minutes=30)\nprint(later.isoformat())\nprint(later.utcoffset())` },
  { title: "sqlite II: Transactions", subtitle: "Transactions, constraints, and row factories", language: "python", tags: ["sqlite", "databases"], theoryTopics: ["Transactions", "Constraints", "Row factories"], codeTemplate: `import sqlite3\n\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE users (name TEXT PRIMARY KEY, age INTEGER NOT NULL)")\ndb.execute("INSERT INTO users VALUES (?, ?)", ("Ada", 36))\ndb.commit()\ndb.row_factory = sqlite3.Row\nrow = db.execute("SELECT name, age FROM users WHERE name = ?", ("Ada",)).fetchone()\nprint(row["name"], row["age"])\ntry:\n    db.execute("INSERT INTO users VALUES (?, ?)", ("Ada", 37))\n    db.commit()\n    print("duplicate allowed")\nexcept sqlite3.IntegrityError:\n    print("duplicate blocked")\ndb.close()` },
  { title: "Testing II: Doubles & Mocks", subtitle: "Fakes, mocks, and interaction asserts", language: "python", tags: ["testing"], theoryTopics: ["Test doubles", "Patching with mock", "Asserting interactions"], codeTemplate: `from unittest.mock import MagicMock\n\nsent = []\n\ndef fake_send(message):\n    sent.append(message)\n    return len(message)\n\nsender = MagicMock()\nsender.send = fake_send\nprint(sender.send("hello"))\nprint(sender.send("world"))\nprint(sent)` },
  { title: "Profiling: cProfile & Hotspots", subtitle: "cProfile, pstats, and hotspot fixes", language: "python", tags: ["performance"], theoryTopics: ["Profiling with cProfile", "Reading pstats", "Hotspot fixes"], codeTemplate: `import cProfile\nimport io\nimport pstats\n\ndef work(n):\n    total = 0\n    for i in range(n):\n        total = total + i * i\n    return total\n\nbuf = io.StringIO()\nprofiler = cProfile.Profile()\nprofiler.enable()\nprint(work(1000))\nprofiler.disable()\nstats = pstats.Stats(profiler, stream=buf)\nstats.sort_stats("cumulative")\nstats.print_stats(3)\nprint("profiled")` },
  { title: "Capstone Prep: Concurrency Design", subtitle: "Choose the model before writing code", language: "python", tags: ["concurrency", "capstone"], theoryTopics: ["Choosing a concurrency model", "Fair scheduling", "Backpressure basics"], codeTemplate: `tasks = {"a": 3, "b": 2, "c": 1}\norder = []\nremaining = {}\nfor k in tasks:\n    remaining[k] = tasks[k]\nwhile len(remaining) > 0:\n    nxt = {}\n    for k in remaining:\n        remaining[k] = remaining[k] - 1\n        order.append(k)\n        if remaining[k] > 0:\n            nxt[k] = remaining[k]\n    remaining = nxt\nprint(order)\nprint(str(len(order)) + " slices")` },
  { title: "Final Capstone: Job Service", subtitle: "A job service, end to end", language: "python", tags: ["capstone", "project"], theoryTopics: ["Capstone: job service", "Graceful shutdown design", "The shipping checklist"], codeTemplate: `import json\n\njobs = [{"id": 1, "task": "fetch users", "done": True}, {"id": 2, "task": "fetch orders", "done": False}, {"id": 3, "task": "write report", "done": False}]\ntext = json.dumps(jobs)\nloaded = json.loads(text)\npending = []\nfor job in loaded:\n    if job["done"] == False:\n        pending.append(job["task"])\nprint(str(len(pending)) + " pending")\nprint(pending)\nprint("shipped")` },
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
  "Itertools overview": "`itertools` is the standard library's toolkit of lazy iterators — small, composable primitives like `chain`, `cycle`, `islice`, and `repeat`. Everything it returns is an iterator, so pipelines stay memory-flat no matter how large the data. Learn to read its recipes and you stop writing manual loops for problems the library already solved.",
  "Infinite iterators": "`count`, `cycle`, and `repeat` produce values forever — which is safe only because they are lazy. Pair them with a bounding tool like `islice` or `takewhile` to take exactly what you need. Infinite iterators model streams (ticks, retries, round-robin schedules) without materializing anything.",
  "Combinatoric iterators": "`product`, `permutations`, and `combinations` enumerate arrangements of your data. `product(A, B)` is the nested loop; `permutations(items, 2)` is ordered pairs; `combinations` drops the order. They turn brute-force search, test matrices, and scheduling puzzles into one-liners.",
  "functools overview": "`functools` collects higher-order helpers: `partial` pre-fills arguments, `reduce` folds iterables, `lru_cache` memoizes, `singledispatch` branches on type. It is the standard answer to 'I need a small function derived from a bigger one'. One import replaces whole families of hand-rolled wrappers.",
  "Partial with functools": "`partial(fn, *args, **kwargs)` freezes some arguments of a function and returns a new callable for the rest: `square = partial(power, exp=2)`. It is closures done by the library — cleaner than a one-off `def` when all you want is a specialized alias. Use it for callbacks, sorted keys, and configured handlers.",
  "Caching with lru_cache": "`@lru_cache` memoizes a pure function: repeated calls with the same arguments return the cached result instead of recomputing. Recursive definitions like Fibonacci drop from exponential to linear with one decorator. Only cache pure functions — anything depending on mutable state or I/O will serve stale answers.",
  "Paths with pathlib": "`pathlib.Path` represents filesystem paths as objects instead of raw strings: `Path(\"data\") / \"raw\" / \"a.csv\"`. No more `os.path.join` gymnastics and no separator bugs across platforms. If your code touches files, reach for `Path` first — string paths are a legacy habit.",
  "Joining and resolving": "The `/` operator joins path segments; `.resolve()` makes a path absolute and collapses `..`; `.parent`, `.name`, `.stem`, and `.suffix` dissect it. `relative_to()` expresses one path against another. These read like the filesystem itself — compare with string splitting and the win is obvious.",
  "Reading the filesystem": "`Path.iterdir()` lists a directory, `.glob(\"*.py\")` matches patterns, `.rglob(\"*\")` walks recursively, `.read_text()`/`.write_text()` move whole files in one call. Existence checks are `.exists()`, `.is_file()`, `.is_dir()`. Directory traversal that took `os.walk` boilerplate becomes a readable one-liner.",
  "Argument parsing": "`argparse` turns command-line strings into typed Python values: declare arguments once and you get parsing, `--help` text, and error messages for free. `ArgumentParser` with `add_argument` calls is the entire API surface for most tools. A script without argparse is a script only its author can run.",
  "Positional vs optional args": "Positionals (`parser.add_argument(\"name\")`) are required inputs identified by position; optionals (`--shout`, `--count 3`) are named flags with defaults. Flags use `action=\"store_true\"` for booleans; `type=int` converts and validates. Design rule: required data goes positional, tuning knobs go optional.",
  "Help and defaults": "Every argument accepts `help=` text, and `--help` renders it automatically — documentation you cannot forget to update. `default=` supplies the value when a flag is absent. Good defaults plus honest help text are what separate a usable CLI from a guessing game.",
  "Logging levels": "Logging has five levels: DEBUG (10), INFO (20), WARNING (30), ERROR (40), CRITICAL (50). Emit at the right level and operators can dial verbosity without touching code. `print` debugging is for development; levels are how a program talks to the people who run it.",
  "Configuration": "`logging.basicConfig(level=..., format=...)` configures the root logger in one call — level threshold plus a message format like `\"%(levelname)s: %(message)s\"`. Call it once at program start; everything after routes through it. For libraries, never configure — only log, and let the application decide.",
  "Loggers vs root": "`logging.getLogger(__name__)` gives each module its own named logger, so output shows where a message came from. The root logger is the default fallback — fine for scripts, too blunt for systems. Named loggers plus handlers (console, file, network) scale from a script to a service.",
  "Regex syntax": "A regex is a pattern: literals match themselves, `\\d` matches digits, `\\w` word characters, `\\s` whitespace, `.` almost anything. Quantifiers repeat: `+` (one or more), `*` (zero or more), `{2,4}` (a range). Raw strings (`r\"\\d+\"`) keep backslashes intact — always write patterns as raw strings.",
  "search and match": "`re.search` finds a pattern anywhere in the string; `re.match` anchors at the start; `re.fullmatch` requires the whole string. They return a Match object or `None` — always check before calling `.group()`. Compile hot patterns once with `re.compile` instead of re-parsing them per call.",
  "Groups": "Parentheses capture: `(\\d+)-(\\d+)` on `\"200-404\"` gives group(1)=\"200\", group(2)=\"404\", group(0) the whole match. Named groups `(?P<code>\\d+)` let you say `m.group(\"code\")`. Non-capturing `(?:...)` groups without storing — use it whenever you need grouping but not the value.",
  "findall and sub": "`re.findall` returns every non-overlapping match as a list; `re.sub(pattern, replacement, text)` rewrites them — with backreferences like `r\"\\1\"` reusing what was captured. Together they are search-and-replace for whole datasets: extract all emails, normalize all whitespace, redact all secrets.",
  "Splitting with regex": "`re.split(r\"[,;]\", \"a,b;c\")` cuts on any of several delimiters at once — something `str.split` cannot do. The pattern is a character class here, but any regex works, including multi-character separators. When real-world data mixes delimiters, regex splitting is the honest tool.",
  "Flags": "Flags change matching behavior: `re.IGNORECASE` for case-insensitive search, `re.MULTILINE` so `^`/`$` anchor per line, `re.DOTALL` so `.` crosses newlines. Pass them as `flags=` or inline (`(?i)`). Prefer explicit flags over clever patterns — readability is a feature of correct regex.",
  "unittest TestCase": "`unittest.TestCase` groups tests as methods named `test_*` inside a class; `setUp` builds fresh fixtures before each one. Assertions are methods: `assertEqual`, `assertIn`, `assertRaises`. It ships with every Python — no install, no excuses — and `python -m unittest` discovers and runs the suite.",
  "Assertions": "An assertion states what must be true: `assert add(2, 3) == 5`. In unittest they are `self.assertEqual(a, b)`; in pytest they are bare `assert`. Each assertion is executable documentation — it says what the code promises, and fails loudly the moment the promise breaks.",
  "Test discovery": "Runners find tests by convention: files named `test_*.py`, classes `Test*`, methods `test_*`. Keep tests beside the code or under `tests/`, one file per module, and discovery wires the whole suite with zero configuration. Convention over configuration is what makes a hundred tests feel like one command.",
  "pytest test functions": "pytest tests are plain functions — no classes, no boilerplate: `def test_add(): assert add(2, 3) == 5`. Any failing assert reports with a readable diff, and `pytest` alone discovers everything. The lower the ceremony, the more tests get written; that is pytest's entire philosophy.",
  "Fixtures concept": "A fixture is setup code pytest injects by name: declare `@pytest.fixture def db(): ...` and any test taking a `db` argument receives a fresh one. Fixtures compose, scope (function/module/session), and auto-teardown with `yield`. Shared setup stops being copy-pasted and starts being declared.",
  "Running pytest": "`pytest` runs the suite; `pytest -v` names each test; `pytest -k \"login\"` selects by name; `-x` stops at the first failure. Exit code 0 means green — CI systems gate on exactly that. Learn five flags and the whole workflow (write, run, filter, fix) fits in seconds.",
  "Virtual environments": "A venv is an isolated Python installation per project: `python -m venv .venv` creates it, and packages installed inside never leak into other projects. Different projects need different dependency versions — venvs make that possible instead of painful. One project, one environment, no exceptions.",
  "pip and requirements": "`pip install requests` fetches from PyPI; `pip freeze > requirements.txt` snapshots exact versions; `pip install -r requirements.txt` reproduces them elsewhere. Pin versions for anything shared — unpinned installs rot silently as upstream releases drift. Reproducible installs are a professional habit.",
  "Activation": "Activating (`.venv/bin/activate`, or the Windows `Activate.ps1`) puts the venv's interpreter first on PATH, so `python` and `pip` mean the project ones. The prompt prefix `(.venv)` confirms it. Forget to activate and you install into the wrong Python — the classic beginner packaging bug.",
  "Dataclass basics": "`@dataclass` generates `__init__`, `__repr__`, and `__eq__` from annotated fields — a `Point` with `x` and `y` needs three lines instead of fifteen. Data-carrying classes stop being boilerplate and stay readable. If a class mostly holds values, it is probably a dataclass.",
  "Fields and defaults": "`field(default_factory=list)` gives each instance its own mutable default — the dataclass answer to the mutable-default trap. `field(compare=False)` excludes bookkeeping from equality; `InitVar` takes constructor-only input. Defaults belong in the field declaration, visible and explicit.",
  "Frozen dataclasses": "`@dataclass(frozen=True)` makes instances immutable — assignment raises, hashing works, and the object is safe to share. Frozen value objects (coordinates, money, config) eliminate aliasing bugs by construction. Immutability as a default is a design choice that pays off forever.",
  "Enum basics": "An `Enum` names a fixed set of choices: `class Role(Enum): ADMIN = 1 ...` — callers pass `Role.ADMIN` instead of magic strings. Members compare by identity, iterate in definition order, and print readably. Enums turn 'any string goes' into a checked vocabulary.",
  "Values with auto()": "`auto()` assigns values automatically so you never hand-number members: `ADMIN = auto()` just works. `.name` gives the member name, `.value` the assigned value. Prefer `auto()` unless the values are a wire format — numbering by hand invites collisions.",
  "IntEnum": "`IntEnum` members ARE integers — they compare equal to ints and serialize as numbers, ideal for status codes and protocol flags. Plain `Enum` refuses accidental int comparison, which catches more bugs. Choose: IntEnum for interop with numbers, Enum for everything else.",
  "The with statement (deep)": "`with` acquires a resource, runs the block, and releases it — even on exceptions. Files, locks, and connections all speak this protocol. Any time you write manual acquire/release pairs, you have written a bug that `with` would have prevented.",
  "Custom context managers": "A class with `__enter__` (setup, returns the managed value) and `__exit__` (teardown, receives any exception) can be used with `with`. Return `True` from `__exit__` to suppress the exception, `False` to propagate. Custom managers wrap timing, transactions, and temporary state cleanly.",
  "contextlib": "`contextlib` builds managers without classes: `@contextmanager` turns a generator (`yield` between setup and teardown) into one, `closing()` wraps objects with `.close()`, `suppress()` swallows chosen exceptions. Most custom managers are five lines with contextlib instead of fifteen with a class.",
  "Parameterized decorators": "A decorator with arguments is a factory: `repeat(3)` returns the actual decorator, which wraps the function. Three nesting levels — factory, decorator, wrapper — each closing over the previous. Read them inside-out and the pattern clicks permanently.",
  "Decorator factories": "The factory level exists to capture configuration (`times`, `retries`, `timeout`) before seeing the function. `@retry(times=3)` reads as configuration, not code. Factories compose: stack `@retry` over `@timed` and behaviors layer in application order, bottom-up.",
  "Preserving metadata": "Wrappers hide the original function's name and docstring unless you copy them — `functools.wraps(fn)` on the wrapper fixes `__name__`, `__doc__`, and introspection. Without it, tracebacks and help() show `wrapper` everywhere. One line, always include it.",
  "Generator pipelines": "Chain generators stage-to-stage — read lines, filter empties, parse fields — and data flows lazily from disk to result with constant memory. Each stage is a small generator; the pipeline is just composition. This is how you process files larger than RAM.",
  "send and yield from": "`gen.send(value)` pushes a value INTO a paused generator (received as the result of `yield`); `yield from sub` delegates to a sub-generator, forwarding sends and returns. Together they build coroutines and flatten nested iteration. Most code needs neither — recognize them when libraries use them.",
  "Infinite generators": "A `while True: yield ...` generator models endless streams — sensor readings, IDs, paginated APIs. Consumers bound them with `islice` or break conditions. Laziness makes the infinite representable; the caller, not the producer, decides how much is enough.",
  "Type variables": "`T = TypeVar(\"T\")` declares a placeholder type: `def first(items: list[T]) -> T` says input and output share ONE unknown type. The checker then enforces consistency — pass `list[int]`, get `int` back. Type variables are what make generic functions precise instead of `Any`-flavored.",
  "Generic classes": "`class Stack(Generic[T])` parameterizes a whole class: `Stack[int]` is a stack of ints, checked at every `push`. The runtime ignores it all — generics are documentation the type checker enforces. Write the class once, get a family of checked types.",
  "Bounded types": "`TypeVar(\"T\", bound=Shape)` (or value-restricted `TypeVar(\"T\", int, str)`) constrains what a generic accepts — only Shapes, only ints-or-strs. Bounds say 'generic, but not THAT generic'. They are how libraries promise flexibility without surrendering safety.",
  "JSON over HTTP": "Web APIs speak JSON over HTTP: `urllib` (or `requests`) fetches bytes, `json.loads` parses them into dicts and lists. The response shape IS the API contract — print it, read it, then navigate it. Every integration you will ever build starts exactly here.",
  "Nested access": "Real payloads nest: `data[\"user\"][\"address\"][\"city\"]`. Each level can be missing, so `.get()` with defaults or small helper functions beat blind indexing. Navigate deliberately — `KeyError` in production means you assumed a shape instead of handling it.",
  "Serializing payloads": "`json.dumps(obj)` builds request bodies; `indent=2` makes them human-readable for debugging; `sort_keys=True` stabilizes output for snapshots. Only JSON-native types survive (dicts, lists, str, numbers, bool, None) — convert dates and custom objects first.",
  "Reading CSV rows": "`csv.reader` yields each row as a list of strings; `csv.DictReader` keys rows by the header — prefer it, because column positions shift but names endure. The module handles quoted commas and embedded newlines that naive `split(\",\")` corrupts. Never hand-parse CSV with real data.",
  "Writing CSV output": "`csv.writer` (or `DictWriter` with `fieldnames`) emits correctly quoted rows; always open the file with `newline=\"\"` so no blank lines sneak in on Windows. Writing is the mirror of reading: same quoting rules, same header discipline. Round-trip your files through a reader to prove them.",
  "Cleaning pipelines": "Raw tables are dirty: strip whitespace, drop empty rows, coerce types (`int(age)`), skip malformed lines with a logged warning. A cleaning stage between read and analyze turns 'garbage in' into 'known-good rows'. Count what you drop — silent data loss is the worst bug.",
  "Connecting with sqlite3": "`sqlite3.connect(path)` opens a database file (or `:memory:` for scratch); the connection is your session, cursors execute statements. Tables are created with plain SQL `CREATE TABLE`. Zero servers, zero setup — a SQL database in a single file, in the standard library.",
  "Parameterized queries": "Always bind values with `?` placeholders — `execute(\"INSERT INTO t VALUES (?, ?)\", (a, b))` — never interpolate with f-strings. Placeholders prevent SQL injection AND handle quoting for you. String-built SQL with user data is a vulnerability, not a shortcut.",
  "Fetching rows": "`fetchone()` takes a single row, `fetchall()` the rest as a list, iterating the cursor streams without loading everything. Set `row_factory = sqlite3.Row` for name-based column access. `commit()` persists writes — forget it and your inserts vanish when the connection closes.",
  "Milestone: contacts project": "The day-60 milestone: a contact-book CLI combining argparse (commands), dataclasses (records), json (persistence), and pytest-style checks. One tool, four skills, end to end. Milestones convert scattered lessons into a thing you can demo — build it completely, then polish it.",
  "Persistence design": "Decide the storage contract first: one JSON file, a list of records, load-on-start/save-on-change. Keep I/O at the edges (load/save functions) and logic pure (add/search/list on plain data). A clean persistence boundary is what lets you swap JSON for sqlite3 later without rewriting anything.",
  "Polish and test": "Finished means handled: empty database, duplicate names, missing file, bad input — each with a clear message. Add `--help` text, a README example, and three checks that prove the happy path. Polish is not decoration; it is the difference between a demo and a tool.",
  "Exception hierarchies": "Design errors as a tree: one base (`AppError(Exception)`) with specific leaves (`NotFoundError`, `ValidationError`). Callers catch the base to handle everything or a leaf for precision. A hierarchy documents every failure mode your module admits — and lets callers choose their granularity.",
  "Catching base classes": "`except AppError` catches every custom failure at once — perfect for boundary code (log it, return 500, keep serving). Catch narrow where you can recover, wide where you must not crash. The hierarchy gives you both dials; use the right one per layer.",
  "Raising from": "`raise NewError(...) from original` chains exceptions: the traceback shows both the root cause and the translation. Bare re-raising loses context; chaining preserves the full story. In layered code, translate low-level errors into domain errors — with `from`, never without.",
  "Reading tracebacks": "Tracebacks read bottom-up: the last line names the exception, the frames above show the call path, the top frame is where it started. `File \"...\", line N, in fn` pinpoints each hop. Most debugging is just careful traceback reading — the interpreter already told you everything.",
  "pdb commands": "Inside pdb: `n` (next line), `s` (step into), `c` (continue), `p expr` (print value), `l` (list source), `q` (quit). Six commands cover 90% of sessions. Print state, move forward, repeat — debugging is binary search on execution, and pdb is the instrument.",
  "Breakpoints": "`breakpoint()` drops into pdb exactly where called (Python 3.7+); conditional breakpoints (`if x < 0: breakpoint()`) fire only on suspicious state. Place them before the crash, not at it — inspect the cause, not the wreckage. Remove or guard them before committing.",
  "Timing code": "`time.perf_counter()` brackets code for wall-clock timing; `timeit` repeats snippets and reports the best of many runs, defeating noise. Measure before optimizing — intuition about bottlenecks is wrong often enough that unmeasured 'optimization' is just editing. Numbers first, changes second.",
  "Algorithmic bottlenecks": "A nested loop over the same list is quadratic — 40 items is 1,600 steps, 40,000 is 1.6 billion. The fix is almost always structural: a dict or set for membership, one pass instead of two, sort-then-scan. Profile the shape of the work before touching the code inside it.",
  "Faster Python idioms": "Built-ins beat hand loops: `sum` over accumulation, `map`/`comprehensions` over append-loops, `join` over `+` in a loop, local-variable binding in hot loops. Each is implemented in C and reads cleaner. Idiomatic Python is usually fast Python — write it that way first.",
  "Counter": "`Counter(iterable)` tallies anything hashable into `{item: count}`; `.most_common(n)` ranks them. One line replaces a manual counting loop with `dict.get` defaults. Word frequencies, vote counts, error histograms — if you are counting things, start here.",
  "defaultdict": "`defaultdict(list)` auto-creates missing values — `groups[key].append(x)` just works, no existence check. The factory (`list`, `int`, `set`) declares the shape of your accumulation. Grouping and bucketing code shrinks by half and reads like the intent.",
  "deque": "`deque` is a double-ended queue: `appendleft`/`popleft` are O(1), unlike list `insert(0)`/`pop(0)` which shift everything. Sliding windows, queues, and history buffers (with `maxlen`) are its home turf. When both ends are hot, deque wins.",
  "Dates and times": "`date(2026, 10, 2)` builds a calendar date; `datetime.now()` stamps this moment; never mix naive and aware datetimes in arithmetic. Dates are values — construct explicit ones in tests instead of depending on today. Deterministic dates make deterministic tests.",
  "Timedeltas": "`timedelta(days=7)` is a duration; add it to dates to schedule, subtract dates to measure (`(b - a).days`). Weeks, retries, expiries, and countdowns are all timedeltas. Date arithmetic beats manual day-counting the way `datetime` beats string dates.",
  "Formatting dates": "`.isoformat()` emits sortable `YYYY-MM-DD` strings; `strftime(\"%Y-%m-%d\")` formats custom layouts; `strptime` parses them back. ISO format sorts lexicographically AND chronologically — use it for filenames, logs, and storage, and parsing stays trivial.",
  "Counting patterns": "The counting loop — `counts[key] = counts.get(key, 0) + 1` — is worth memorizing: frequencies, histograms, and tallies all reduce to it. `Counter` automates it, but writing it once teaches the dict mechanics underneath. Know the manual form; use the library form.",
  "Grouping data": "Grouping inverts a list into a dict of lists: for each record, `groups[record.category].append(record)`. Reports, indexes, and partitions all start here. With `defaultdict(list)` the loop body is one line — the shape of the output dictates the shape of the code.",
  "Nested dicts": "Dicts of dicts model trees: `users[name][\"scores\"]`, config sections, JSON-shaped state. Build levels with `.setdefault()` or nested defaultdicts; access defensively with chained `.get()`. Depth is power with responsibility — two levels is structure, five is a schema begging for classes.",
  "Cleaning text": "Real text arrives dirty: `.strip()` trims padding, collapsing whitespace normalizes gaps, `.lower()` unifies case for comparison. Clean at ingestion — once, at the boundary — so downstream code never defends itself. A clean string is a contract the rest of the program can trust.",
  "Parsing lines": "Line-oriented data splits into fields: `line.split(\",\")` for CSV-ish rows, `.split()` for whitespace runs, `rsplit`/`partition` when only one cut matters. Parse into named pieces immediately (tuple unpack or dict) — indexed `parts[2]` scattered through code rots fast.",
  "Field extraction": "After splitting, validate each field: right count, right types, sane ranges — and reject the line loudly if not. Extraction without validation imports other people's bugs into your program. The parser's second job, after cutting, is judging.",
  "Memoization": "Memoization caches function results by arguments: same call, no recompute — recursion with overlapping subproblems collapses from exponential to linear. A dict keyed by arguments (or `@lru_cache`) is the whole mechanism. If subproblems repeat, memoize; the speedup is algorithmic, not incremental.",
  "Overlapping subproblems": "Naive Fibonacci recomputes `fib(3)` thousands of times on the way to `fib(30)` — the subproblem tree overlaps massively. Any recursion that re-solves the same inputs has this shape. Spotting overlap is the skill; the cache is just the fix.",
  "Cache invalidation": "Caches go stale: `lru_cache` holds results until cleared (`fn.cache_clear()`), and unbounded caches grow forever. Key on stable inputs, bound the size (`maxsize=`), and clear when the underlying data changes. 'There are only two hard things' — invalidation earns its place on the list.",
  "Precision formatting": "`f\"{pi:.2f}\"` rounds to two decimals; `:.0f` drops them; `:,.0f` adds thousands separators for humans. Money, measurements, and reports all need controlled precision — raw floats (`3.141592653589793`) are for computation, formatted ones for eyes.",
  "Alignment and width": "`f\"{name:>10}\"` right-aligns in width 10, `:<` left-aligns, `:^` centers — tables and CLI output without manual padding arithmetic. Fixed widths turn ragged values into readable columns. Format once at display time; keep the underlying data unpadded.",
  "Expressions in f-strings": "Braces accept any expression: `f\"{a + b}\"`, `f\"{name.upper()}\"`, `f\"{scores[0] * 100:.1f}%\"`. Format specs stack after a colon on the result. F-strings are tiny programs inside your strings — keep each expression to one idea and they stay readable.",
  "Permutations and combinations": "`permutations(items, k)` lists ordered arrangements; `combinations(items, k)` drops order (each set once). Counts differ wildly — 10 items taken 3 at a time is 720 ordered, 120 not. Pick the one matching your problem's notion of 'distinct', or enumerate 6x too much.",
  "groupby": "`itertools.groupby` clusters ADJACENT equal items — sort first, or groups split. It yields `(key, group)` pairs consumed lazily, one pass. Run-lengths, transitions, and pre-sorted reports fall out naturally; unsorted input is the classic groupby bug.",
  "Recipes": "The itertools docs ship battle-tested recipes: `take`, `chunked`/`batched`, `unique`, sliding `pairwise`. Copy them into a `recipes.py` and reuse forever. Standard patterns deserve standard code — written once, tested once, trusted everywhere.",
  "Thread basics": "A thread is an independent flow of execution inside one process: `threading.Thread(target=fn, args=(...))` builds one, sharing the same memory as its creator. Threads are cheap to start and ideal for I/O-bound work — waiting on networks, disks, and APIs — where the program would otherwise sit idle. The mental model is simple: one process, many call stacks, one shared heap.",
  "start and join": "`t.start()` launches the thread's target function concurrently; `t.join()` blocks the caller until that thread finishes. Start all your threads, then join all of them — the join loop is what turns 'fire and forget' into a program that actually waits for its results. Forgetting to join is how programs exit before their work is done.",
  "The GIL (intro)": "The GIL (Global Interpreter Lock) lets only one thread execute Python bytecode at a time — so threads parallelize waiting, not computing. Ten threads fetching URLs run ten times faster; ten threads crunching numbers do not. This single fact dictates the whole concurrency map: threads for I/O, processes for CPU, asyncio for many connections.",
  "Race conditions": "A race condition is when two threads mutate shared state and the outcome depends on timing: `counter = counter + 1` is secretly read-add-write, and interleaved threads silently lose updates. Races are nondeterministic — the bug appears on Fridays, never in tests. Any shared mutable state touched by threads is guilty until proven synchronized.",
  "Locks": "A `threading.Lock` serializes access: `with lock:` lets exactly one thread inside the block at a time, turning read-add-write back into an atomic step. Hold the lock for the shortest time that keeps the invariant true — compute outside, mutate inside. Locks are the simplest correct answer to shared state, and the default you must justify departing from.",
  "Lock discipline": "Every shared structure gets one lock, documented next to it; every access path takes it, with no exceptions and no clever lock-free shortcuts. Keep critical sections tiny, never call unknown code while holding a lock, and always acquire multiple locks in the same global order to dodge deadlocks. Discipline compounds — one sloppy path poisons the whole program.",
  "Executor pools": "`ThreadPoolExecutor(max_workers=4)` maintains a reusable crew of threads behind a `with` block: submit work, collect results, and the pool handles queueing, reuse, and shutdown. Pools bound concurrency — a thousand tasks share four threads instead of spawning a thousand threads. Reach for an executor before hand-rolling any thread.",
  "Submitting work": "`pool.submit(fn, arg)` returns a Future immediately while the work runs elsewhere; `pool.map(fn, items)` applies a function across items like a parallel list comprehension. Submit is for heterogeneous jobs you track individually; map is for one function over many inputs. Both keep the main thread free to coordinate instead of compute.",
  "Futures and results": "A Future is a placeholder for a value that does not exist yet: `future.result()` blocks until it does (re-raising any exception the worker hit), `future.done()` polls without blocking. Futures decouple starting work from needing its answer — launch everything, then gather. Exceptions surface at `result()` time, so always collect what you submit.",
  "Processes vs threads": "A process is a separate Python interpreter with its own memory and its own GIL — true parallelism for CPU-bound work, at the cost of heavier startup and no shared state. Threads share everything and suit I/O; processes share nothing and suit computation. Choose by bottleneck: waiting means threads, crunching means processes.",
  "Process pools": "`multiprocessing.Pool(n)` spreads function calls across worker processes: `pool.map(fn, items)` pickles arguments out, computes in parallel, and pickles results back. The `if __name__ == \"__main__\":` guard is mandatory (workers re-import your module). Pickling is the price of admission — arguments and results must serialize.",
  "Inter-process communication": "Processes talk through `Queue`, `Pipe`, or shared `Value`/`Array` — explicit channels, never shared variables. A Queue is the workhorse: producers `put`, consumers `get`, and a sentinel (`None`) signals clean shutdown. Design the message protocol first; processes that cannot speak clearly cannot cooperate at all.",
  "Task queues": "`queue.Queue` is the thread-safe handoff: any thread can `put` items in and workers `get` them out with blocking, locking, and wakeups handled internally. It decouples production rate from consumption rate — bursts absorb instead of crashing. If threads share work through anything other than a Queue, that is the bug to fix first.",
  "Producer-consumer": "Producers enqueue work items; consumers loop on `get()`, process, and call `task_done()`; the main thread waits with `join()`. Scale by adding consumer threads, not by complicating the protocol. The `None` sentinel (one per consumer) ends the loop cleanly. This single pattern runs most real-world pipelines — crawlers, render farms, log processors.",
  "Graceful shutdown": "A pipeline shuts down by draining, not by dying: stop producing, send one sentinel per consumer, `join()` the queue, then `join()` the threads. Daemon threads (`daemon=True`) are the alternative — killed abruptly at exit, fine for best-effort background work, wrong for anything that must finish. Finish your sentences before leaving the room.",
  "Coroutines": "A coroutine (`async def`) is a function that can pause at `await` and resume later — suspension points the event loop uses to run other work. Calling a coroutine returns a coroutine object; nothing executes until the loop drives it with `await` or `asyncio.run()`. Coroutines look synchronous and behave concurrently: readable code, non-blocking execution.",
  "The event loop": "The event loop is the scheduler at the heart of asyncio: one thread, thousands of paused coroutines, each resumed exactly when its awaited thing completes. `asyncio.run(main())` builds the loop, runs your entry coroutine, and closes everything down — it is the entire boilerplate for most programs. One loop per thread, created and owned explicitly.",
  "async and await": "`await` yields control until an awaitable finishes — `await asyncio.sleep(0.5)`, `await response.read()`. Only `async def` functions may contain `await`; calling async code from sync code requires a loop entry point (`asyncio.run`). The rule is absolute and simple: async calls async, and the boundary is always explicit.",
  "Spawning tasks": "`asyncio.create_task(coro())` schedules a coroutine to run NOW, concurrently with the current one — without it, awaits run sequentially. Tasks are the asyncio equivalent of starting threads: fire several, then wait for all of them. A bare coroutine that is never awaited or tasked never runs at all (and Python warns you).",
  "gather": "`await asyncio.gather(a(), b(), c())` runs coroutines concurrently and returns their results in order — the results list matches the argument order regardless of finish order. One failing child cancels the gather by default (`return_exceptions=True` collects errors instead). Gather is the workhorse combinator: launch the batch, unpack the answers.",
  "Concurrency vs parallelism": "Concurrency is dealing with many things at once (interleaved); parallelism is doing many things at once (simultaneous). asyncio gives massive concurrency on one thread — ten thousand connections, no sweat. Threads add I/O parallelism around the GIL; processes add true CPU parallelism. Name which one your bottleneck needs before picking a tool.",
  "Timeouts with wait_for": "`await asyncio.wait_for(coro(), timeout=5)` caps how long you wait — on expiry it cancels the inner task and raises `asyncio.TimeoutError`. Timeouts turn 'hangs forever on a dead server' into a catchable, plannable event. Every network await in production deserves one; unbounded waits are outage-shaped.",
  "Shielding work": "Cancellation propagates into whatever you await — unless `asyncio.shield()` guards it: the outer wait can time out while the inner operation completes safely. Shield writes, commits, and cleanup steps that must not die halfway. Think of shield as 'this part is atomic, let it land before you interrupt me'.",
  "Async iteration patterns": "Beyond gather: `async for` consumes async generators (paginated APIs, streams), `asyncio.as_completed()` yields results in finish order for fastest-first handling, and semaphores (`asyncio.Semaphore(10)`) cap how many coroutines enter a section at once. These three cover 'stream it', 'race it', and 'throttle it' — the complete async vocabulary.",
  "HTTP client basics": "`urllib.request.urlopen(url)` performs a GET with zero dependencies: read bytes, decode, `json.loads` — the full stdlib pipeline. Third-party `requests`/`httpx` add ergonomics (sessions, timeouts, retries) that production code wants. Either way the shape is identical: request out, status plus body back, parse deliberately.",
  "Shaping API payloads": "Real responses nest deeply — navigate `data[\"items\"][0][\"owner\"][\"login\"]` with `.get()` defaults or small extractor functions, never blind index chains. Aggregate immediately: sum the stars, collect the names, build YOUR record shape. The API's schema is its business; your parsed model is yours.",
  "Status codes and errors": "2xx means success, 4xx means your request was wrong (fix the call), 5xx means the server failed (retry with backoff). `raise_for_status()` (or a manual status check) converts silence into signal. Always branch on status before parsing — parsing an error page as JSON is how confusing crashes are born.",
  "Milestone: fetch CLI": "The day-80 milestone: a concurrent fetch tool combining threads (or asyncio), JSON shaping, and a machine-readable summary report. Fetch N endpoints, tolerate individual failures, print `{fetched, failed}` plus per-URL outcomes, and exit nonzero when anything failed. One tool, every concurrency lesson, working offline against recorded fixtures.",
  "Result aggregation": "Concurrent work completes out of order — aggregate into a single report: counts by status, the failed URLs, elapsed time. Build the report as data (a dict), serialize it once (`json.dumps`), and keep stdout parseable. A tool whose output a script can read is a tool that composes with everything else.",
  "Exit codes and reports": "Exit 0 means success; nonzero means failure — CI systems, shell scripts, and humans all read that single number. Print the human summary AND set the code: `sys.exit(1 if failed else 0)`. A fetcher that reports failures but exits 0 is lying to every pipeline it joins.",
  "Running processes": "`subprocess.run([\"python\", \"--version\"], capture_output=True, text=True)` runs a program and waits: an argv list, captured stdout/stderr, and a `returncode` to branch on. It replaces `os.system` entirely — structured, capturable, checkable. Running other programs is how Python scripts become glue for the whole machine.",
  "Capturing output": "`capture_output=True` plus `text=True` gives decoded `proc.stdout`/`proc.stderr` strings; `check=True` raises on nonzero exit instead of silently continuing. Parse the captured text like any other string — split lines, search, extract. A subprocess whose output you ignore is a subprocess you cannot debug.",
  "Shell injection safety": "Never pass user input through `shell=True` — a filename like `x; rm -rf ~` becomes a command. The argv-list form has no shell, so arguments are data, never code. If you must use a shell, quote with `shlex.quote`. Injection is not a theoretical risk; it is the first thing attackers try.",
  "Project metadata": "`pyproject.toml` names your project (`name`, `version`, `requires-python`, `dependencies`) in one declarative file — the identity card every installer reads. Metadata turns a folder of scripts into an installable thing with a version. Write it once, honestly; every downstream tool trusts it blindly.",
  "pyproject structure": "Three sections carry a project: `[project]` (metadata), `[build-system]` (which backend builds it), `[tool.*]` (per-tool config like pytest or ruff). One file replaced `setup.py` + `setup.cfg` + `requirements.txt` sprawl. A clean pyproject is the difference between 'works on my machine' and 'pip install works everywhere'.",
  "Build backends": "The backend (`setuptools`, `hatchling`, `flit`) turns source into a wheel when someone runs `pip install .` — `pip install -e .` links it editable for development. You rarely touch the backend directly, but declaring the right one (and build isolation) is what makes installs reproducible. Packaging is infrastructure; treat it as such.",
  "Structural typing": "Structural typing checks what an object CAN DO, not what it IS: any object with a `close()` method satisfies a `Closer` protocol, no inheritance required. It formalizes duck typing — 'if it quacks, it qualifies' — into checker-verified contracts. Structure says 'capability'; inheritance says 'lineage'.",
  "runtime_checkable protocols": "`@runtime_checkable` enables `isinstance(obj, Proto)` for method-only protocols — real runtime checks, not just static ones. Data members cannot be checked before Python 3.12, so keep runtime protocols method-shaped for portability. Static checking for design, runtime checks at boundaries: belt and suspenders.",
  "Protocols vs inheritance": "Inherit when there is shared implementation or a true is-a lineage; reach for a Protocol when unrelated classes happen to share a capability. Protocols avoid forcing everything into one hierarchy — third-party classes can satisfy your contract without ever importing you. Prefer structure at seams, inheritance inside families.",
  "Abstract methods": "`@abstractmethod` marks methods a subclass MUST implement — the class documents its contract in enforceable code. Abstract methods may still carry a default body subclasses extend via `super()`. They turn 'please override this' comments into guarantees the interpreter keeps.",
  "ABCMeta enforcement": "Subclassing `ABC` activates enforcement: instantiating a class with unimplemented abstract methods raises `TypeError` immediately. Fail at construction, not halfway through a production run. Enforcement moves interface bugs from 'mysterious crash at 3am' to 'loud error in the first test'.",
  "ABCs vs Protocols": "ABCs enforce at RUNTIME (instantiation fails without the methods) and allow shared base implementation; Protocols check STRUCTURE (statically, or via runtime_checkable) with zero coupling. New code modeling capabilities prefers Protocols; frameworks needing guaranteed behavior plus helpers prefer ABCs. Know both, reach deliberately.",
  "type() as constructor": "`type(name, bases, dict)` builds a class at runtime — `type(\"Point\", (), {\"x\": 1})` is a real class with real attributes. Every `class` statement is sugar over this call. Seeing the constructor demystifies classes: they are objects, built by calls, storable in variables, creatable in loops.",
  "Custom metaclasses": "A metaclass customizes class CREATION itself — validation, registration, or method injection applied to every class using it (`class Foo(metaclass=Meta)`). Power comes with obscurity: metaclasses confuse readers and compose poorly. Reach for `__init_subclass__` or decorators first; reserve metaclasses for framework machinery.",
  "__init_subclass__": "`__init_subclass__` runs whenever a class is SUBCLASSED — the lightweight hook for plugin registries, validation, and auto-configuration, with no metaclass required. The parent controls what every child must satisfy, in plain readable code. Most 'metaclass' tutorials should have been this method.",
  "async with": "`async with` drives `__aenter__`/`__aexit__` coroutines around a block — setup and teardown that themselves need awaiting (connections, transactions, locks). It is `with` for the async world: same guarantee (cleanup always runs), awaitable implementation. Any async resource worth holding deserves one.",
  "__aenter__ and __aexit__": "`__aenter__` awaits setup and returns the managed value; `__aexit__` awaits teardown and receives any exception (returning truthy suppresses it). Both are coroutines — the `async def` is what makes the manager async. Mirror the sync protocol exactly, just with awaits inside.",
  "Async cleanup patterns": "Async teardown must still run on cancellation and exceptions — `__aexit__` executes even when the block raises, so close/commit/release there, never after. Shield the critical inner step if cancellation could strike mid-commit. Cleanup code is the last code that runs; write it like the program's reputation depends on it.",
  "__slots__ basics": "`__slots__ = (\"x\", \"y\")` replaces each instance's dict with fixed C-level slots — dramatically less memory for millions of small objects. The price: no new attributes, ever (`p.z = 1` raises `AttributeError`). Slots are a declaration of fixed shape; use them when the shape is truly fixed.",
  "Memory trade-offs": "Slots trade flexibility for density: faster attribute access and far smaller footprint, but no dynamic attributes and no weak references by default (add `\"__weakref__\"` to keep them). Measure with `sys.getsizeof` before committing — for a handful of objects the savings are noise; for a million rows they are the program.",
  "Slots and inheritance": "Slots only pay off when EVERY class in the hierarchy defines them — one slotted child of a dict-based parent still carries a dict. Subclasses must redeclare `__slots__` (empty tuple if adding nothing). Inheritance plus slots is all-or-nothing; audit the whole chain or skip the optimization.",
  "Weak references": "`weakref.ref(obj)` points at an object WITHOUT keeping it alive — when the last strong reference dies, the referent vanishes and the weakref returns `None`. Caches, observers, and parent pointers use them to avoid leaks. Weak references observe; they never own.",
  "Reference cycles": "Two objects pointing at each other (`a.child = b; b.parent = a`) defeat reference counting — only the cyclic garbage collector reclaims them, and `__del__` once made cycles uncollectable. Break the loop with a weak parent pointer and the structure frees deterministically. Cycles are easy to draw and expensive to forget.",
  "Caches without leaks": "A cache keyed by strong references pins every value forever — `weakref.WeakValueDictionary` evicts entries automatically when nothing else uses them. Memoize with `lru_cache(maxsize=)` for bounded functions, weak values for shared object pools. A cache that never releases is a memory leak with documentation.",
  "Shallow vs deep copy": "Assignment aliases; `.copy()` clones one level (new list, same inner objects); `copy.deepcopy()` clones everything recursively. A copied list of lists still shares its inner lists — the classic half-copy bug. Ask how deep independence must go, then copy exactly that deep and no deeper.",
  "Writing a recursive clone": "A recursive clone dispatches on type — rebuild lists element-wise, dicts key-by-key, return immutables as-is — mirroring deepcopy's core in a dozen lines. Writing it once teaches what 'depth' means mechanically. Production code should still use `copy.deepcopy` (it handles cycles and exotic types); the hand version is for understanding.",
  "Pickle safety rules": "`pickle` serializes arbitrary Python objects — and unpickling EXECUTES embedded callables, so `pickle.loads` on untrusted bytes is remote code execution. Never unpickle from networks, files you did not write, or user uploads; prefer `json` for untrusted data. Pickle is for your own checkpoints, never for the world's input.",
  "Cryptographic randomness": "`random` is deterministic (seedable, reproducible — perfect for tests, fatal for secrets); `secrets` draws from the OS CSPRNG for tokens, passwords, and nonces. `secrets.token_hex(16)` makes an unguessable session id in one call. Rule of thumb: simulations use random, security uses secrets, never the reverse.",
  "Hashing with hashlib": "`hashlib.sha256(data).hexdigest()` fingerprints bytes deterministically — same input, same digest, always. Hashes verify integrity (did this file change?) and store passwords only with a salt plus a slow KDF (bcrypt/scrypt, never raw sha256). Hashing proves WHAT; it never proves WHO — that needs signatures.",
  "Comparing digests safely": "`==` on digests short-circuits at the first differing byte — timing leaks how many leading bytes match, enabling byte-by-byte forgery. `hmac.compare_digest(a, b)` compares in constant time. Anytime you compare secrets, tokens, or MACs, reach for compare_digest; plain equality is a side-channel.",
  "Inspecting signatures": "`inspect.signature(fn)` reveals parameter names, defaults, kinds (positional, keyword-only, *args), and annotations — the callable's contract as data. Frameworks, decorators, and DI containers read signatures to adapt behavior. Introspection turns 'what does this accept?' from a documentation hunt into a function call.",
  "Reading live objects": "`inspect.isfunction`, `isclass`, `ismodule`, `getmembers`, and `getdoc` answer what an object IS at runtime — the toolkit behind help(), debuggers, and serializers. `getsource` reads the actual file text when available. Read objects to understand them; write code that stays readable under this lens.",
  "Frames and stacks": "`inspect.stack()` and `currentframe()` expose the live call stack — who called whom, with which locals. Debuggers, loggers (that `%(lineno)s`), and test frameworks all ride on frames. Powerful and slow: capture frames for diagnostics, never in hot loops, and drop references promptly to avoid keeping garbage alive.",
  "The descriptor protocol": "Descriptors are objects with `__get__`/`__set__`/`__delete__` that customize attribute access on the OWNING class — `property`, `staticmethod`, `classmethod`, and slots are all descriptors. Assign a descriptor as a class attribute and every read/write routes through it. This one protocol underlies most of Python's attribute magic.",
  "__get__ and __set__": "`__get__(obj, type)` computes the read; `__set__(obj, value)` validates the write (data descriptors like property win over instance dicts; non-data ones like plain functions lose). Implement both for managed attributes with validation, only `__get__` for computed read-only views. The protocol is small; its reach is enormous.",
  "How @property works": "`@property` IS a data descriptor: the getter becomes `__get__`, the setter `__set__`, and attribute syntax routes through both. Understanding this demystifies properties — no special syntax, just the descriptor protocol applied well. When property needs reuse across classes, write the descriptor by hand instead.",
  "Single dispatch": "`@singledispatch` routes one generic function to type-specific implementations — register with `@fn.register(int)` and calls dispatch on the first argument's type. Cleaner than `isinstance` chains, extensible by third parties without editing your code. One name, many behaviors, chosen by type.",
  "total_ordering": "`@total_ordering` derives `<=`, `>`, `>=` from `__eq__` plus ONE ordering method — write two methods, get the full algebra. Fill in `__hash__` thoughtfully when instances become dict keys. Comparison boilerplate collapses to its essence: equality plus one direction.",
  "Cache discipline": "Caches (`lru_cache`, memo dicts, pools) need bounds and invalidation: `maxsize=` caps growth, `cache_clear()` resets, and mutable or time-varying inputs must bypass or key carefully. An unbounded cache on user input is a memory leak; a stale cache on live data is a correctness bug. Cache deliberately or not at all.",
  "Heaps with heapq": "`heapq` maintains a binary heap inside an ordinary list: `heappush`/`heappop` in O(log n), smallest item always at index 0. Priority queues, top-k streams, and schedulers all reduce to these two calls. The list stays a valid heap only if every mutation goes through heapq — never sort or append by hand.",
  "Bisect insertion points": "`bisect_left(sorted_list, x)` returns where `x` belongs to keep order (O(log n) search, O(n) insert); `insort` does both steps. Sorted-list-plus-bisect beats re-sorting after every insert and beats trees for small data. Keep one invariant — the list is always sorted — and the module does the rest.",
  "Priority queues": "A priority queue serves the most urgent item first: push `(priority, item)` tuples onto a heap and pop the minimum. Schedulers, pathfinding (A*), and rate limiters all run on this shape. Ties need a counter (`(prio, seq, item)`) since raw items may not compare. Urgency in, order out.",
  "Naive vs aware": "Naive datetimes have no timezone (`tzinfo=None`) — arithmetic and comparison with aware ones raises `TypeError`, and 'what moment is this?' is unanswerable. Aware datetimes carry their offset and compare correctly across zones. Mixing the two is the single most common datetime bug; pick aware and stay aware.",
  "zoneinfo": "`zoneinfo.ZoneInfo(\"America/New_York\")` attaches real IANA timezones from the system database — DST transitions handled, no third-party package. `datetime.now(ZoneInfo(...))` stamps correctly; `.astimezone()` converts. Store UTC, display local: the timezone rule that prevents an entire category of production incidents.",
  "UTC-first design": "Persist and compute in UTC; convert to local time only at the display edge. UTC has no DST, no ambiguity, and total ordering — the only sane basis for logs, expiries, and scheduling. Local time is a presentation concern wearing a data costume; keep it out of your storage.",
  "Transactions": "A transaction wraps statements in all-or-nothing: `commit()` persists, `rollback()` (or an exception with the connection as a context manager) discards. Connection-as-context-manager commits on clean exit and rolls back on error automatically. Partial writes corrupt; transactions are how databases promise wholeness.",
  "Constraints": "`PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `CHECK`, and `FOREIGN KEY` declarations make the database reject bad data — integrity enforced at the lowest possible layer. Violations raise `IntegrityError`; catch it and translate to a domain error. Constraints are executable schema documentation that never goes stale.",
  "Row factories": "`db.row_factory = sqlite3.Row` yields rows supporting BOTH `row[0]` and `row[\"name\"]` — self-documenting access without an ORM. Factories (`Row`, or a custom dict-builder) shape every fetched row identically. Name-based access survives column reordering; index-based access does not.",
  "Test doubles": "Doubles stand in for real collaborators: fakes (working in-memory versions), stubs (canned answers), mocks (recorded interactions to assert on). Use doubles to isolate the unit under test from networks, disks, and clocks. A test that needs production infrastructure is an integration test wearing a unit costume.",
  "Patching with mock": "`unittest.mock.patch(target)` swaps an object for a `MagicMock` within a `with` block or decorator, then restores it — patch WHERE IT IS LOOKED UP (`module.under.test`), not where it is defined. `return_value` scripts answers; `side_effect` scripts sequences and errors. Patch the seam, assert the interaction, restore automatically.",
  "Asserting interactions": "Mocks record everything: `call_count`, `call_args`, `assert_called_with(...)`, `assert_called_once()`. Assert BEHAVIOR that matters (was the receipt emailed?) not trivia (was logging called?). Interaction asserts prove collaboration happened; state asserts prove outcomes are right — a healthy suite uses both.",
  "Profiling with cProfile": "`cProfile` records every function call's time and count with one context (`enable()`/`disable()` or `run()`); `pstats.Stats` sorts by cumulative or internal time. Profile the REAL workload, not a microbenchmark — hotspots hide where you least expect them. Measure first is not a slogan; it is the only order that works.",
  "Reading pstats": "Read `tottime` (time IN the function, excluding callees) to find the true hotspot, `cumtime` (including callees) to find the expensive path, `ncalls` to spot accidental O(n²) repetition. A huge call count on a tiny function screams 'hoist me out of the loop'. The table tells you where the program lives — listen.",
  "Hotspot fixes": "Fix hotspots structurally first: hoist loop-invariant work, replace repeated scans with dicts/sets, batch I/O, push inner loops into built-ins or comprehensions. Micro-tweaks (local binding, avoiding dots) come last and only when measured. One algorithmic fix beats a hundred micro-optimizations — profile again to prove it.",
  "Choosing a concurrency model": "Match the tool to the bottleneck: many idle connections → asyncio; blocking I/O with simple code → threads; CPU-bound number crunching → processes; mixed → asyncio driving executors. Model the workload (counts, latencies, CPU share) BEFORE writing a line. The wrong model parallelizes the wrong thing — fast, and pointless.",
  "Fair scheduling": "Round-robin (each task gets one slice per turn) guarantees no task starves, unlike run-to-completion or priority-only schemes. Real schedulers add priorities, quanta, and work-stealing — but fairness is the baseline property. Simulate the schedule on paper first; starvation bugs are design bugs, not code bugs.",
  "Backpressure basics": "When producers outrun consumers, unbounded queues explode memory — backpressure pushes back: bounded queues (`maxsize`), blocking puts, semaphores, or dropping with metrics. Fast producers are a fact of life; the only choice is WHERE work waits. Design the waiting, or the waiting designs your outage.",
  "Capstone: job service": "The final capstone: a job service combining everything — concurrent workers pulling from a queue, JSON job records, transactions or atomic writes for results, a summary report, nonzero exit on failure, and a checklist proving graceful shutdown. Design it on day 99, build it completely, demo it like a professional.",
  "Graceful shutdown design": "Services shut down in layers: stop accepting new work, drain the queue with sentinels, join workers with a timeout, flush and close persistence, then exit. Signal handlers (`SIGTERM`/`SIGINT`) trigger the sequence; every layer gets a deadline so shutdown cannot hang either. A service that cannot stop cleanly cannot deploy safely.",
  "The shipping checklist": "Done means proven: README with run instructions, `--help` that tells the truth, pinned dependencies, tests covering happy path plus two failures, a timed demo under load, and a known-limitations section. Ship the checklist WITH the code — reviewers, employers, and future-you judge the whole package, not just the happy path.",
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
  "Itertools overview": {
    q: "What does every itertools function return?",
    opts: [
      { id: "a", text: "A materialized list", correct: false },
      { id: "b", text: "A lazy iterator", correct: true },
      { id: "c", text: "A generator function", correct: false },
      { id: "d", text: "A tuple", correct: false },
    ],
  },
  "Infinite iterators": {
    q: "How do you safely consume `itertools.count()`?",
    opts: [
      { id: "a", text: "Convert it with list() directly", correct: false },
      { id: "b", text: "Bound it with islice or a break condition", correct: true },
      { id: "c", text: "Iterate it with a plain for loop", correct: false },
      { id: "d", text: "Call next() exactly once", correct: false },
    ],
  },
  "functools overview": {
    q: "Which helper pre-fills some arguments of a function?",
    opts: [
      { id: "a", text: "functools.partial", correct: true },
      { id: "b", text: "functools.reduce", correct: false },
      { id: "c", text: "functools.total_ordering", correct: false },
      { id: "d", text: "functools.singledispatch", correct: false },
    ],
  },
  "Partial with functools": {
    q: "What does `partial(power, exp=2)` produce?",
    opts: [
      { id: "a", text: "The value power() returns for exp=2", correct: false },
      { id: "b", text: "A new callable with exp frozen to 2", correct: true },
      { id: "c", text: "A copy of the power function", correct: false },
      { id: "d", text: "An error — partial takes no kwargs", correct: false },
    ],
  },
  "Paths with pathlib": {
    q: "How do you join path segments with pathlib?",
    opts: [
      { id: "a", text: "With the `/` operator on Path objects", correct: true },
      { id: "b", text: "With the `+` operator", correct: false },
      { id: "c", text: "With os.path.join only", correct: false },
      { id: "d", text: "With string concatenation", correct: false },
    ],
  },
  "Joining and resolving": {
    q: "What does `Path(\"a\").resolve()` do?",
    opts: [
      { id: "a", text: "Deletes the path", correct: false },
      { id: "b", text: "Returns an absolute path with `..` collapsed", correct: true },
      { id: "c", text: "Checks the path exists", correct: false },
      { id: "d", text: "Lists the directory", correct: false },
    ],
  },
  "Argument parsing": {
    q: "What do you get for free by declaring arguments with argparse?",
    opts: [
      { id: "a", text: "Parsing, --help text, and error messages", correct: true },
      { id: "b", text: "Automatic logging", correct: false },
      { id: "c", text: "Shell completion scripts", correct: false },
      { id: "d", text: "A config file parser", correct: false },
    ],
  },
  "Positional vs optional args": {
    q: "Which defines a boolean flag with argparse?",
    opts: [
      { id: "a", text: "`add_argument(\"--shout\", action=\"store_true\")`", correct: true },
      { id: "b", text: "`add_argument(\"--shout\", type=bool)`", correct: false },
      { id: "c", text: "`add_argument(\"shout\")`", correct: false },
      { id: "d", text: "`add_flag(\"--shout\")`", correct: false },
    ],
  },
  "Logging levels": {
    q: "Which level indicates the most severe standard logging event?",
    opts: [
      { id: "a", text: "DEBUG", correct: false },
      { id: "b", text: "INFO", correct: false },
      { id: "c", text: "WARNING", correct: false },
      { id: "d", text: "CRITICAL", correct: true },
    ],
  },
  "Configuration": {
    q: "What does `logging.basicConfig(level=...)` configure?",
    opts: [
      { id: "a", text: "The root logger, once at program start", correct: true },
      { id: "b", text: "Every logger independently forever", correct: false },
      { id: "c", text: "Only file handlers", correct: false },
      { id: "d", text: "The logging module's version", correct: false },
    ],
  },
  "Regex syntax": {
    q: "What does the pattern `r\"\\d+\"` match?",
    opts: [
      { id: "a", text: "A literal backslash followed by d", correct: false },
      { id: "b", text: "One or more digits", correct: true },
      { id: "c", text: "One or more letters", correct: false },
      { id: "d", text: "Exactly one digit", correct: false },
    ],
  },
  "search and match": {
    q: "How do `re.search` and `re.match` differ?",
    opts: [
      { id: "a", text: "search finds the pattern anywhere; match anchors at the start", correct: true },
      { id: "b", text: "match finds the pattern anywhere; search anchors at the start", correct: false },
      { id: "c", text: "They are identical aliases", correct: false },
      { id: "d", text: "search returns groups; match returns spans", correct: false },
    ],
  },
  "findall and sub": {
    q: "What does `re.sub(r\"\\s+\", \" \", text)` do?",
    opts: [
      { id: "a", text: "Deletes all whitespace", correct: false },
      { id: "b", text: "Collapses every whitespace run to one space", correct: true },
      { id: "c", text: "Splits text on whitespace", correct: false },
      { id: "d", text: "Counts whitespace runs", correct: false },
    ],
  },
  "Splitting with regex": {
    q: "Why use `re.split` instead of `str.split`?",
    opts: [
      { id: "a", text: "It is always faster", correct: false },
      { id: "b", text: "It can split on multiple delimiters at once", correct: true },
      { id: "c", text: "It strips whitespace automatically", correct: false },
      { id: "d", text: "It returns a generator", correct: false },
    ],
  },
  "unittest TestCase": {
    q: "How are tests declared in unittest?",
    opts: [
      { id: "a", text: "As `test_*` methods on a TestCase class", correct: true },
      { id: "b", text: "As module-level assert statements", correct: false },
      { id: "c", text: "As docstrings with examples", correct: false },
      { id: "d", text: "As comments starting with TEST:", correct: false },
    ],
  },
  "Assertions": {
    q: "What is an assertion in a test?",
    opts: [
      { id: "a", text: "A comment describing intent", correct: false },
      { id: "b", text: "A statement of what must be true, failing loudly otherwise", correct: true },
      { id: "c", text: "A print of the expected value", correct: false },
      { id: "d", text: "A try/except block", correct: false },
    ],
  },
  "pytest test functions": {
    q: "What does a minimal pytest test look like?",
    opts: [
      { id: "a", text: "A class extending TestCase", correct: false },
      { id: "b", text: "A plain `test_*` function with a bare assert", correct: true },
      { id: "c", text: "A YAML file with expectations", correct: false },
      { id: "d", text: "A main() guarded script", correct: false },
    ],
  },
  "Fixtures concept": {
    q: "How does a pytest test receive a fixture?",
    opts: [
      { id: "a", text: "By naming it as a function argument", correct: true },
      { id: "b", text: "By importing it at module top", correct: false },
      { id: "c", text: "By calling setup() manually", correct: false },
      { id: "d", text: "By subclassing the fixture", correct: false },
    ],
  },
  "Virtual environments": {
    q: "Why use one virtual environment per project?",
    opts: [
      { id: "a", text: "To make Python run faster", correct: false },
      { id: "b", text: "To isolate each project's dependencies and versions", correct: true },
      { id: "c", text: "To enable syntax highlighting", correct: false },
      { id: "d", text: "To compile code ahead of time", correct: false },
    ],
  },
  "pip and requirements": {
    q: "What does `pip freeze > requirements.txt` capture?",
    opts: [
      { id: "a", text: "The Python version", correct: false },
      { id: "b", text: "Exact installed package versions for reproduction", correct: true },
      { id: "c", text: "The project source code", correct: false },
      { id: "d", text: "System environment variables", correct: false },
    ],
  },
  "Dataclass basics": {
    q: "What does `@dataclass` generate for you?",
    opts: [
      { id: "a", text: "`__init__`, `__repr__`, and `__eq__` from annotated fields", correct: true },
      { id: "b", text: "Database tables from fields", correct: false },
      { id: "c", text: "JSON schemas from fields", correct: false },
      { id: "d", text: "Only a constructor", correct: false },
    ],
  },
  "Fields and defaults": {
    q: "How should a dataclass field default to an empty list?",
    opts: [
      { id: "a", text: "`items: list = []`", correct: false },
      { id: "b", text: "`items: list = field(default_factory=list)`", correct: true },
      { id: "c", text: "`items: list = None`", correct: false },
      { id: "d", text: "Dataclasses cannot have list defaults", correct: false },
    ],
  },
  "Enum basics": {
    q: "What problem do Enums solve?",
    opts: [
      { id: "a", text: "Slow string comparison", correct: false },
      { id: "b", text: "Magic strings — replacing them with a checked vocabulary", correct: true },
      { id: "c", text: "Missing type hints", correct: false },
      { id: "d", text: "Circular imports", correct: false },
    ],
  },
  "Values with auto()": {
    q: "What is `auto()` for in an Enum?",
    opts: [
      { id: "a", text: "Automatic member numbering so you never hand-assign values", correct: true },
      { id: "b", text: "Automatic JSON serialization", correct: false },
      { id: "c", text: "Automatic test generation", correct: false },
      { id: "d", text: "Automatic documentation", correct: false },
    ],
  },
  "The with statement (deep)": {
    q: "What does a `with` block guarantee?",
    opts: [
      { id: "a", text: "The block runs in a thread", correct: false },
      { id: "b", text: "The resource is released even if the block raises", correct: true },
      { id: "c", text: "Variables stay scoped to the block", correct: false },
      { id: "d", text: "The file is locked forever", correct: false },
    ],
  },
  "Custom context managers": {
    q: "Which methods make a class usable with `with`?",
    opts: [
      { id: "a", text: "`__enter__` and `__exit__`", correct: true },
      { id: "b", text: "`__open__` and `__close__`", correct: false },
      { id: "c", text: "`setup` and `teardown`", correct: false },
      { id: "d", text: "`__init__` and `__del__`", correct: false },
    ],
  },
  "Parameterized decorators": {
    q: "What is `@repeat(3)` structurally?",
    opts: [
      { id: "a", text: "A single wrapper function", correct: false },
      { id: "b", text: "A factory call returning the actual decorator", correct: true },
      { id: "c", text: "A class instantiation", correct: false },
      { id: "d", text: "A loop over the function", correct: false },
    ],
  },
  "Decorator factories": {
    q: "What does the factory level of a decorator capture?",
    opts: [
      { id: "a", text: "The function's return value", correct: false },
      { id: "b", text: "Configuration (like times or retries) before seeing the function", correct: true },
      { id: "c", text: "The module globals", correct: false },
      { id: "d", text: "The call stack", correct: false },
    ],
  },
  "Generator pipelines": {
    q: "Why chain generators stage-to-stage for large files?",
    opts: [
      { id: "a", text: "It runs each stage in parallel", correct: false },
      { id: "b", text: "Data flows lazily with constant memory", correct: true },
      { id: "c", text: "It skips error handling", correct: false },
      { id: "d", text: "It sorts the output", correct: false },
    ],
  },
  "send and yield from": {
    q: "What does `yield from sub` do?",
    opts: [
      { id: "a", text: "Copies the sub-generator's code inline", correct: false },
      { id: "b", text: "Delegates iteration to a sub-generator, forwarding sends and returns", correct: true },
      { id: "c", text: "Closes the sub-generator", correct: false },
      { id: "d", text: "Converts yields to returns", correct: false },
    ],
  },
  "Type variables": {
    q: "What does `def first(items: list[T]) -> T` promise?",
    opts: [
      { id: "a", text: "Items must be a list of anything", correct: false },
      { id: "b", text: "Input element type and return type are the same unknown type", correct: true },
      { id: "c", text: "The function accepts only type objects", correct: false },
      { id: "d", text: "T is checked at runtime", correct: false },
    ],
  },
  "Generic classes": {
    q: "What does `class Stack(Generic[T])` give you?",
    opts: [
      { id: "a", text: "Runtime type enforcement on push", correct: false },
      { id: "b", text: "One class producing a family of checker-verified types like Stack[int]", correct: true },
      { id: "c", text: "Automatic serialization", correct: false },
      { id: "d", text: "Faster method dispatch", correct: false },
    ],
  },
  "JSON over HTTP": {
    q: "What are the two steps to consume a JSON API with the stdlib?",
    opts: [
      { id: "a", text: "Fetch bytes, then parse with json.loads into dicts and lists", correct: true },
      { id: "b", text: "Import the URL, then eval the response", correct: false },
      { id: "c", text: "Open a socket, then read lines", correct: false },
      { id: "d", text: "Download a file, then rename it", correct: false },
    ],
  },
  "Nested access": {
    q: "What is the risk of `data[\"user\"][\"address\"][\"city\"]`?",
    opts: [
      { id: "a", text: "It is too slow", correct: false },
      { id: "b", text: "Any missing level raises KeyError", correct: true },
      { id: "c", text: "It mutates the payload", correct: false },
      { id: "d", text: "It only works for JSON", correct: false },
    ],
  },
  "Reading CSV rows": {
    q: "Why prefer `csv.DictReader` over `csv.reader`?",
    opts: [
      { id: "a", text: "It reads faster", correct: false },
      { id: "b", text: "Rows keyed by header names survive column reordering", correct: true },
      { id: "c", text: "It skips the header automatically", correct: false },
      { id: "d", text: "It converts types automatically", correct: false },
    ],
  },
  "Writing CSV output": {
    q: "What must you pass when opening a file for csv.writer?",
    opts: [
      { id: "a", text: "`newline=\"\"` so no blank lines sneak in", correct: true },
      { id: "b", text: "`encoding=\"ascii\"` always", correct: false },
      { id: "c", text: "Binary mode `\"wb\"`", correct: false },
      { id: "d", text: "Nothing special", correct: false },
    ],
  },
  "Connecting with sqlite3": {
    q: "What does `sqlite3.connect(\":memory:\")` open?",
    opts: [
      { id: "a", text: "A network database server", correct: false },
      { id: "b", text: "A temporary database held in RAM", correct: true },
      { id: "c", text: "A read-only file", correct: false },
      { id: "d", text: "A connection pool", correct: false },
    ],
  },
  "Parameterized queries": {
    q: "Why bind values with `?` placeholders instead of f-strings?",
    opts: [
      { id: "a", text: "Placeholders run faster", correct: false },
      { id: "b", text: "They prevent SQL injection and handle quoting", correct: true },
      { id: "c", text: "F-strings cannot hold SQL", correct: false },
      { id: "d", text: "Placeholders add logging", correct: false },
    ],
  },
  "Milestone: contacts project": {
    q: "What does the day-60 milestone combine?",
    opts: [
      { id: "a", text: "Only argparse", correct: false },
      { id: "b", text: "argparse, dataclasses, json persistence, and checks in one CLI", correct: true },
      { id: "c", text: "Only dataclasses", correct: false },
      { id: "d", text: "A web framework", correct: false },
    ],
  },
  "Persistence design": {
    q: "Where should file I/O live in a small CLI?",
    opts: [
      { id: "a", text: "Scattered through every function", correct: false },
      { id: "b", text: "At the edges in load/save functions, with pure logic inside", correct: true },
      { id: "c", text: "Inside the data classes", correct: false },
      { id: "d", text: "In the test files", correct: false },
    ],
  },
  "Exception hierarchies": {
    q: "Why derive custom errors from one base like AppError?",
    opts: [
      { id: "a", text: "It makes tracebacks shorter", correct: false },
      { id: "b", text: "Callers can catch the base for everything or a leaf for precision", correct: true },
      { id: "c", text: "It speeds up raising", correct: false },
      { id: "d", text: "It is required by the interpreter", correct: false },
    ],
  },
  "Catching base classes": {
    q: "When should you catch a wide base exception?",
    opts: [
      { id: "a", text: "Everywhere, always", correct: false },
      { id: "b", text: "At boundaries where the program must not crash", correct: true },
      { id: "c", text: "Only in tests", correct: false },
      { id: "d", text: "Never — it is always wrong", correct: false },
    ],
  },
  "Reading tracebacks": {
    q: "How do you read a Python traceback?",
    opts: [
      { id: "a", text: "Top-down, first line first", correct: false },
      { id: "b", text: "Bottom-up: last line names the error, frames show the path", correct: true },
      { id: "c", text: "Only the middle frame matters", correct: false },
      { id: "d", text: "Alphabetically by filename", correct: false },
    ],
  },
  "pdb commands": {
    q: "In pdb, what does `n` do?",
    opts: [
      { id: "a", text: "Creates a new breakpoint", correct: false },
      { id: "b", text: "Executes the next line without stepping in", correct: true },
      { id: "c", text: "Prints all names", correct: false },
      { id: "d", text: "Quits the debugger", correct: false },
    ],
  },
  "Timing code": {
    q: "Why use timeit instead of a single perf_counter measurement?",
    opts: [
      { id: "a", text: "It uses less code", correct: false },
      { id: "b", text: "Repeated runs defeat timing noise", correct: true },
      { id: "c", text: "It works without imports", correct: false },
      { id: "d", text: "It measures memory too", correct: false },
    ],
  },
  "Algorithmic bottlenecks": {
    q: "A nested loop over the same list of n items is which complexity?",
    opts: [
      { id: "a", text: "O(1)", correct: false },
      { id: "b", text: "O(n log n)", correct: false },
      { id: "c", text: "O(n²) — quadratic", correct: true },
      { id: "d", text: "O(n)", correct: false },
    ],
  },
  "Counter": {
    q: "What does `Counter(\"aab\")` produce?",
    opts: [
      { id: "a", text: "`{\"a\": 2, \"b\": 1}`", correct: true },
      { id: "b", text: "`[\"a\", \"a\", \"b\"]`", correct: false },
      { id: "c", text: "`{\"a\", \"b\"}`", correct: false },
      { id: "d", text: "An error — strings need splitting", correct: false },
    ],
  },
  "defaultdict": {
    q: "What does `defaultdict(list)` do on a missing key?",
    opts: [
      { id: "a", text: "Raises KeyError", correct: false },
      { id: "b", text: "Creates an empty list for that key automatically", correct: true },
      { id: "c", text: "Returns None", correct: false },
      { id: "d", text: "Deletes the key", correct: false },
    ],
  },
  "Dates and times": {
    q: "Why construct explicit dates in tests instead of using today?",
    opts: [
      { id: "a", text: "Explicit dates run faster", correct: false },
      { id: "b", text: "Deterministic dates make deterministic tests", correct: true },
      { id: "c", text: "today() is deprecated", correct: false },
      { id: "d", text: "Explicit dates use less memory", correct: false },
    ],
  },
  "Timedeltas": {
    q: "What is a `timedelta`?",
    opts: [
      { id: "a", text: "A point in time", correct: false },
      { id: "b", text: "A duration added to dates or found by subtracting them", correct: true },
      { id: "c", text: "A timezone name", correct: false },
      { id: "d", text: "A timestamp in seconds", correct: false },
    ],
  },
  "Counting patterns": {
    q: "What does `counts[key] = counts.get(key, 0) + 1` compute?",
    opts: [
      { id: "a", text: "A running total of all values", correct: false },
      { id: "b", text: "A frequency tally of each key", correct: true },
      { id: "c", text: "A sorted list of keys", correct: false },
      { id: "d", text: "The maximum value", correct: false },
    ],
  },
  "Grouping data": {
    q: "Grouping a list into a dict of lists produces what shape?",
    opts: [
      { id: "a", text: "One flat sorted list", correct: false },
      { id: "b", text: "Each category key mapping to its matching records", correct: true },
      { id: "c", text: "A set of unique items", correct: false },
      { id: "d", text: "A tuple of pairs", correct: false },
    ],
  },
  "Cleaning text": {
    q: "Where should text cleaning happen?",
    opts: [
      { id: "a", text: "Once, at ingestion, so downstream code trusts the strings", correct: true },
      { id: "b", text: "Right before every comparison", correct: false },
      { id: "c", text: "Only in the UI layer", correct: false },
      { id: "d", text: "Never — keep raw data raw", correct: false },
    ],
  },
  "Parsing lines": {
    q: "After splitting a line into fields, what should you do first?",
    opts: [
      { id: "a", text: "Print the raw parts", correct: false },
      { id: "b", text: "Parse into named pieces instead of scattering indexed parts", correct: true },
      { id: "c", text: "Join them back together", correct: false },
      { id: "d", text: "Sort the fields", correct: false },
    ],
  },
  "Memoization": {
    q: "What speedup does memoization give recursion with overlapping subproblems?",
    opts: [
      { id: "a", text: "A small constant factor", correct: false },
      { id: "b", text: "Exponential collapsing to linear — same call is never recomputed", correct: true },
      { id: "c", text: "No speedup, only readability", correct: false },
      { id: "d", text: "It slows recursion down", correct: false },
    ],
  },
  "Overlapping subproblems": {
    q: "What marks a recursion as having overlapping subproblems?",
    opts: [
      { id: "a", text: "It uses more than one base case", correct: false },
      { id: "b", text: "It re-solves the same inputs many times", correct: true },
      { id: "c", text: "It recurses deeper than 100 frames", correct: false },
      { id: "d", text: "It returns a tuple", correct: false },
    ],
  },
  "Precision formatting": {
    q: "What does `f\"{3.14159:.2f}\"` produce?",
    opts: [
      { id: "a", text: "\"3.14159\"", correct: false },
      { id: "b", text: "\"3.14\"", correct: true },
      { id: "c", text: "\"3.15\"", correct: false },
      { id: "d", text: "3.14159 (a float)", correct: false },
    ],
  },
  "Alignment and width": {
    q: "What does `f\"{'hi':>5}\"` produce?",
    opts: [
      { id: "a", text: "\"hi   \"", correct: false },
      { id: "b", text: "\"   hi\"", correct: true },
      { id: "c", text: "\"hi\"", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "Permutations and combinations": {
    q: "How do permutations and combinations of 10 items taken 3 differ?",
    opts: [
      { id: "a", text: "They are the same count", correct: false },
      { id: "b", text: "720 ordered vs 120 unordered — order multiplies the count", correct: true },
      { id: "c", text: "Combinations are larger", correct: false },
      { id: "d", text: "Permutations skip duplicates", correct: false },
    ],
  },
  "groupby": {
    q: "What must you do before `itertools.groupby` clusters correctly?",
    opts: [
      { id: "a", text: "Nothing — it sorts internally", correct: false },
      { id: "b", text: "Sort the input, since it only groups adjacent equals", correct: true },
      { id: "c", text: "Convert items to strings", correct: false },
      { id: "d", text: "Dedupe the input first", correct: false },
    ],
  },
  "Thread basics": {
    q: "What does `threading.Thread(target=fn)` share with its creator?",
    opts: [
      { id: "a", text: "Nothing — it copies all memory", correct: false },
      { id: "b", text: "The same process memory", correct: true },
      { id: "c", text: "Only the function code", correct: false },
      { id: "d", text: "A separate interpreter", correct: false },
    ],
  },
  "start and join": {
    q: "What is the correct start/join pattern for worker threads?",
    opts: [
      { id: "a", text: "Join each thread before starting the next", correct: false },
      { id: "b", text: "Start all threads, then join all of them", correct: true },
      { id: "c", text: "Start threads but never join", correct: false },
      { id: "d", text: "Join before start to pre-allocate", correct: false },
    ],
  },
  "Race conditions": {
    q: "Why is `counter = counter + 1` unsafe across threads?",
    opts: [
      { id: "a", text: "It is secretly read-add-write, and interleavings lose updates", correct: true },
      { id: "b", text: "Integers are immutable", correct: false },
      { id: "c", text: "Threads cannot see globals", correct: false },
      { id: "d", text: "Addition is not defined for ints", correct: false },
    ],
  },
  "Locks": {
    q: "What does `with lock:` guarantee for the block inside?",
    opts: [
      { id: "a", text: "It runs on a separate CPU", correct: false },
      { id: "b", text: "Exactly one thread executes it at a time", correct: true },
      { id: "c", text: "Exceptions inside are swallowed", correct: false },
      { id: "d", text: "It runs faster", correct: false },
    ],
  },
  "Executor pools": {
    q: "Why use `ThreadPoolExecutor(max_workers=4)` for 1000 tasks?",
    opts: [
      { id: "a", text: "It spawns 1000 threads at once", correct: false },
      { id: "b", text: "1000 tasks share 4 reusable threads with bounded concurrency", correct: true },
      { id: "c", text: "It skips the GIL", correct: false },
      { id: "d", text: "It runs tasks in separate processes", correct: false },
    ],
  },
  "Submitting work": {
    q: "How do `submit` and `map` differ on an executor?",
    opts: [
      { id: "a", text: "submit takes one heterogeneous job and returns a Future; map applies one function over many inputs", correct: true },
      { id: "b", text: "map blocks until all results arrive", correct: false },
      { id: "c", text: "submit only works for processes", correct: false },
      { id: "d", text: "They are identical aliases", correct: false },
    ],
  },
  "Processes vs threads": {
    q: "When should you choose multiprocessing over threading?",
    opts: [
      { id: "a", text: "For I/O-bound waiting on networks", correct: false },
      { id: "b", text: "For CPU-bound computation needing true parallelism past the GIL", correct: true },
      { id: "c", text: "When you want shared mutable state", correct: false },
      { id: "d", text: "When startup speed matters most", correct: false },
    ],
  },
  "Process pools": {
    q: "What must pool arguments and results be, and what guard is mandatory?",
    opts: [
      { id: "a", text: "Any objects; no guard needed", correct: false },
      { id: "b", text: "Picklable values, with an `if __name__ == \"__main__\":` guard", correct: true },
      { id: "c", text: "Only strings; guarded by a lock", correct: false },
      { id: "d", text: "Shared memory only; no guard on Linux", correct: false },
    ],
  },
  "Task queues": {
    q: "Why hand work between threads through `queue.Queue`?",
    opts: [
      { id: "a", text: "It is faster than shared variables", correct: false },
      { id: "b", text: "It handles locking, blocking, and wakeups internally", correct: true },
      { id: "c", text: "It skips the GIL", correct: false },
      { id: "d", text: "It persists tasks to disk", correct: false },
    ],
  },
  "Producer-consumer": {
    q: "How does a consumer loop normally end?",
    opts: [
      { id: "a", text: "The queue raises StopIteration", correct: false },
      { id: "b", text: "It receives a sentinel value like None and breaks", correct: true },
      { id: "c", text: "The producer kills the thread", correct: false },
      { id: "d", text: "It exits after one item", correct: false },
    ],
  },
  "Coroutines": {
    q: "What happens when you CALL an `async def` function without awaiting it?",
    opts: [
      { id: "a", text: "It runs to completion immediately", correct: false },
      { id: "b", text: "Nothing executes — you get a coroutine object that needs driving", correct: true },
      { id: "c", text: "It spawns a thread", correct: false },
      { id: "d", text: "It raises SyntaxError", correct: false },
    ],
  },
  "The event loop": {
    q: "What does `asyncio.run(main())` do?",
    opts: [
      { id: "a", text: "Starts a thread pool", correct: false },
      { id: "b", text: "Builds a loop, runs the entry coroutine, and closes everything down", correct: true },
      { id: "c", text: "Compiles coroutines to bytecode", correct: false },
      { id: "d", text: "Runs main() in a subprocess", correct: false },
    ],
  },
  "Spawning tasks": {
    q: "Why wrap a coroutine in `asyncio.create_task()` instead of awaiting it directly?",
    opts: [
      { id: "a", text: "Direct await is a syntax error", correct: false },
      { id: "b", text: "The task starts running concurrently instead of sequentially", correct: true },
      { id: "c", text: "Tasks skip the event loop", correct: false },
      { id: "d", text: "Tasks run in separate processes", correct: false },
    ],
  },
  "gather": {
    q: "What order does `await asyncio.gather(a(), b(), c())` return results in?",
    opts: [
      { id: "a", text: "Finish order — fastest first", correct: false },
      { id: "b", text: "Argument order, regardless of finish order", correct: true },
      { id: "c", text: "Random order", correct: false },
      { id: "d", text: "Reverse argument order", correct: false },
    ],
  },
  "Timeouts with wait_for": {
    q: "What happens when `asyncio.wait_for(coro(), timeout=5)` expires?",
    opts: [
      { id: "a", text: "The coroutine keeps running silently", correct: false },
      { id: "b", text: "The inner task is cancelled and TimeoutError is raised", correct: true },
      { id: "c", text: "The event loop stops", correct: false },
      { id: "d", text: "The timeout is doubled and retried", correct: false },
    ],
  },
  "Shielding work": {
    q: "What is `asyncio.shield()` for?",
    opts: [
      { id: "a", text: "Encrypting coroutine traffic", correct: false },
      { id: "b", text: "Letting an inner operation finish safely while an outer wait can time out", correct: true },
      { id: "c", text: "Hiding tracebacks", correct: false },
      { id: "d", text: "Blocking all cancellation forever", correct: false },
    ],
  },
  "HTTP client basics": {
    q: "What is the stdlib-only pipeline for fetching JSON?",
    opts: [
      { id: "a", text: "eval() the URL directly", correct: false },
      { id: "b", text: "urlopen for bytes, decode, then json.loads", correct: true },
      { id: "c", text: "import the URL as a module", correct: false },
      { id: "d", text: "Open a raw socket and guess", correct: false },
    ],
  },
  "Shaping API payloads": {
    q: "How should you reach `data[\"items\"][0][\"owner\"][\"login\"]` in production code?",
    opts: [
      { id: "a", text: "Blind index chains — the schema never changes", correct: false },
      { id: "b", text: "With .get() defaults or small extractor functions that tolerate missing levels", correct: true },
      { id: "c", text: "With try/except: pass", correct: false },
      { id: "d", text: "By eval()ing a path string", correct: false },
    ],
  },
  "Milestone: fetch CLI": {
    q: "What does the day-80 milestone combine?",
    opts: [
      { id: "a", text: "Only JSON parsing", correct: false },
      { id: "b", text: "Concurrent fetching, JSON shaping, and a machine-readable summary report", correct: true },
      { id: "c", text: "Only thread pools", correct: false },
      { id: "d", text: "A web framework", correct: false },
    ],
  },
  "Result aggregation": {
    q: "Why build the fetch report as a data dict serialized once?",
    opts: [
      { id: "a", text: "It looks nicer in the terminal", correct: false },
      { id: "b", text: "So the output stays parseable and composes with other tools", correct: true },
      { id: "c", text: "JSON is faster than print", correct: false },
      { id: "d", text: "Dicts use less memory", correct: false },
    ],
  },
  "Running processes": {
    q: "What does `subprocess.run([\"python\", \"--version\"], capture_output=True, text=True)` give you?",
    opts: [
      { id: "a", text: "A shell string to eval later", correct: false },
      { id: "b", text: "A completed process with decoded stdout/stderr and a returncode", correct: true },
      { id: "c", text: "A background thread", correct: false },
      { id: "d", text: "The Python version as an int", correct: false },
    ],
  },
  "Capturing output": {
    q: "What does `check=True` add to `subprocess.run`?",
    opts: [
      { id: "a", text: "It checks the output spelling", correct: false },
      { id: "b", text: "It raises on nonzero exit instead of silently continuing", correct: true },
      { id: "c", text: "It captures output to a file", correct: false },
      { id: "d", text: "It runs the command twice", correct: false },
    ],
  },
  "Project metadata": {
    q: "What does the `[project]` table of pyproject.toml declare?",
    opts: [
      { id: "a", text: "The build backend's source code", correct: false },
      { id: "b", text: "Name, version, requires-python, and dependencies", correct: true },
      { id: "c", text: "Test file locations", correct: false },
      { id: "d", text: "Editor settings", correct: false },
    ],
  },
  "pyproject structure": {
    q: "Which three sections carry a Python project?",
    opts: [
      { id: "a", text: "[project], [build-system], and [tool.*]", correct: true },
      { id: "b", text: "[code], [tests], and [docs]", correct: false },
      { id: "c", text: "[setup], [install], and [run]", correct: false },
      { id: "d", text: "[main], [dev], and [prod]", correct: false },
    ],
  },
  "Structural typing": {
    q: "What does structural typing check?",
    opts: [
      { id: "a", text: "The class lineage of an object", correct: false },
      { id: "b", text: "What an object can do, not what it is", correct: true },
      { id: "c", text: "The file the class was defined in", correct: false },
      { id: "d", text: "Memory layout of the instance", correct: false },
    ],
  },
  "runtime_checkable protocols": {
    q: "What does `@runtime_checkable` enable for a Protocol?",
    opts: [
      { id: "a", text: "Faster method dispatch", correct: false },
      { id: "b", text: "isinstance() checks against method-only protocols", correct: true },
      { id: "c", text: "Automatic subclassing", correct: false },
      { id: "d", text: "Pickling of protocols", correct: false },
    ],
  },
  "Abstract methods": {
    q: "What does `@abstractmethod` require of subclasses?",
    opts: [
      { id: "a", text: "Nothing — it is documentation only", correct: false },
      { id: "b", text: "They must implement the method before the class can be instantiated", correct: true },
      { id: "c", text: "They must call super() first", correct: false },
      { id: "d", text: "They must be abstract too", correct: false },
    ],
  },
  "ABCMeta enforcement": {
    q: "When does ABC enforcement fail for a missing abstract method?",
    opts: [
      { id: "a", text: "At import time for the whole module", correct: false },
      { id: "b", text: "Immediately at instantiation with TypeError", correct: true },
      { id: "c", text: "Only when the missing method is called", correct: false },
      { id: "d", text: "Never — it only warns", correct: false },
    ],
  },
  "type() as constructor": {
    q: "What does `type(\"Point\", (), {\"x\": 1})` create?",
    opts: [
      { id: "a", text: "An instance named Point", correct: false },
      { id: "b", text: "A real class with a class attribute x", correct: true },
      { id: "c", text: "A module named Point", correct: false },
      { id: "d", text: "A type annotation", correct: false },
    ],
  },
  "Custom metaclasses": {
    q: "What does a metaclass customize?",
    opts: [
      { id: "a", text: "Instance attribute defaults", correct: false },
      { id: "b", text: "Class creation itself for every class using it", correct: true },
      { id: "c", text: "Function call speed", correct: false },
      { id: "d", text: "Module import order", correct: false },
    ],
  },
  "async with": {
    q: "When do you need `async with` instead of plain `with`?",
    opts: [
      { id: "a", text: "When the block contains any await", correct: false },
      { id: "b", text: "When setup/teardown themselves need awaiting", correct: true },
      { id: "c", text: "When the resource is a file", correct: false },
      { id: "d", text: "Always — async with replaces with", correct: false },
    ],
  },
  "__aenter__ and __aexit__": {
    q: "What do `__aenter__` and `__aexit__` do?",
    opts: [
      { id: "a", text: "They run synchronously like __enter__/__exit__", correct: false },
      { id: "b", text: "They await setup/teardown around an async with block", correct: true },
      { id: "c", text: "They start and stop the event loop", correct: false },
      { id: "d", text: "They create tasks automatically", correct: false },
    ],
  },
  "__slots__ basics": {
    q: "What is the price of `__slots__ = (\"x\", \"y\")`?",
    opts: [
      { id: "a", text: "Slower attribute access", correct: false },
      { id: "b", text: "Instances can never gain new attributes", correct: true },
      { id: "c", text: "The class cannot be subclassed", correct: false },
      { id: "d", text: "Methods stop working", correct: false },
    ],
  },
  "Memory trade-offs": {
    q: "When do `__slots__` savings actually matter?",
    opts: [
      { id: "a", text: "For a handful of objects", correct: false },
      { id: "b", text: "For millions of small objects where per-instance dicts dominate", correct: true },
      { id: "c", text: "Only for immutable objects", correct: false },
      { id: "d", text: "Only in async code", correct: false },
    ],
  },
  "Weak references": {
    q: "What happens to `weakref.ref(obj)` when the last strong reference dies?",
    opts: [
      { id: "a", text: "It keeps the object alive", correct: false },
      { id: "b", text: "It starts returning None", correct: true },
      { id: "c", text: "It raises ReferenceError on creation", correct: false },
      { id: "d", text: "It deletes the referent immediately", correct: false },
    ],
  },
  "Reference cycles": {
    q: "How do you break a parent/child reference cycle deterministically?",
    opts: [
      { id: "a", text: "Call gc.collect() after every assignment", correct: false },
      { id: "b", text: "Make the back-pointer (e.g. parent) a weak reference", correct: true },
      { id: "c", text: "Define __del__ on both classes", correct: false },
      { id: "d", text: "Store children as tuples", correct: false },
    ],
  },
  "Shallow vs deep copy": {
    q: "What does `.copy()` of a list of lists still share?",
    opts: [
      { id: "a", text: "Nothing — it is fully independent", correct: false },
      { id: "b", text: "The inner lists — only the outer list is new", correct: true },
      { id: "c", text: "The outer list object", correct: false },
      { id: "d", text: "Immutable elements only", correct: false },
    ],
  },
  "Writing a recursive clone": {
    q: "What is the core dispatch of a hand-written recursive clone?",
    opts: [
      { id: "a", text: "Rebuild lists element-wise and dicts key-by-key, return immutables as-is", correct: true },
      { id: "b", text: "Copy the top-level reference", correct: false },
      { id: "c", text: "Serialize to JSON and back", correct: false },
      { id: "d", text: "Use pickle for every level", correct: false },
    ],
  },
  "Cryptographic randomness": {
    q: "When must you use `secrets` instead of `random`?",
    opts: [
      { id: "a", text: "For reproducible test fixtures", correct: false },
      { id: "b", text: "For tokens, passwords, and nonces that must be unguessable", correct: true },
      { id: "c", text: "For shuffling a playlist", correct: false },
      { id: "d", text: "For simulations", correct: false },
    ],
  },
  "Hashing with hashlib": {
    q: "What does `hashlib.sha256(data).hexdigest()` guarantee?",
    opts: [
      { id: "a", text: "The data came from a trusted sender", correct: false },
      { id: "b", text: "The same input always yields the same fingerprint", correct: true },
      { id: "c", text: "The data is encrypted", correct: false },
      { id: "d", text: "The digest can be reversed to the input", correct: false },
    ],
  },
  "Inspecting signatures": {
    q: "What does `inspect.signature(fn)` reveal?",
    opts: [
      { id: "a", text: "The function's bytecode", correct: false },
      { id: "b", text: "Parameter names, defaults, kinds, and annotations", correct: true },
      { id: "c", text: "The callers of the function", correct: false },
      { id: "d", text: "Execution time", correct: false },
    ],
  },
  "Reading live objects": {
    q: "Which helpers answer what an object IS at runtime?",
    opts: [
      { id: "a", text: "print() and repr()", correct: false },
      { id: "b", text: "inspect.isfunction / isclass / getmembers and friends", correct: true },
      { id: "c", text: "len() and str()", correct: false },
      { id: "d", text: "id() and hash()", correct: false },
    ],
  },
  "The descriptor protocol": {
    q: "What makes an object a descriptor?",
    opts: [
      { id: "a", text: "Defining __init__ and __repr__", correct: false },
      { id: "b", text: "Defining __get__ / __set__ / __delete__ and living as a class attribute", correct: true },
      { id: "c", text: "Inheriting from object", correct: false },
      { id: "d", text: "Using @property syntax", correct: false },
    ],
  },
  "__get__ and __set__": {
    q: "How do data descriptors differ from plain attributes on reads?",
    opts: [
      { id: "a", text: "They are slower but identical", correct: false },
      { id: "b", text: "Their __get__ wins over the instance dict", correct: true },
      { id: "c", text: "They cannot be overwritten", correct: false },
      { id: "d", text: "They only work on modules", correct: false },
    ],
  },
  "Single dispatch": {
    q: "How does `@singledispatch` choose an implementation?",
    opts: [
      { id: "a", text: "By the number of arguments", correct: false },
      { id: "b", text: "By the type of the first argument", correct: true },
      { id: "c", text: "By return type annotation", correct: false },
      { id: "d", text: "Randomly at import time", correct: false },
    ],
  },
  "total_ordering": {
    q: "What must you write when using `@total_ordering`?",
    opts: [
      { id: "a", text: "All six comparison methods", correct: false },
      { id: "b", text: "__eq__ plus one ordering method — the rest is derived", correct: true },
      { id: "c", text: "Only __lt__", correct: false },
      { id: "d", text: "A custom metaclass", correct: false },
    ],
  },
  "Heaps with heapq": {
    q: "What invariant does `heapq` maintain in the list?",
    opts: [
      { id: "a", text: "The list stays fully sorted", correct: false },
      { id: "b", text: "The smallest item is always at index 0", correct: true },
      { id: "c", text: "All items are unique", correct: false },
      { id: "d", text: "The list never grows", correct: false },
    ],
  },
  "Bisect insertion points": {
    q: "What does `bisect_left(sorted_list, x)` return?",
    opts: [
      { id: "a", text: "Whether x is present", correct: false },
      { id: "b", text: "The index where x belongs to keep the order", correct: true },
      { id: "c", text: "A new sorted list", correct: false },
      { id: "d", text: "The value at position x", correct: false },
    ],
  },
  "Naive vs aware": {
    q: "What goes wrong mixing naive and aware datetimes?",
    opts: [
      { id: "a", text: "Arithmetic silently uses UTC", correct: false },
      { id: "b", text: "Comparison and arithmetic raise TypeError", correct: true },
      { id: "c", text: "Naive ones auto-convert to local time", correct: false },
      { id: "d", text: "Nothing — they mix freely", correct: false },
    ],
  },
  "zoneinfo": {
    q: "What does `ZoneInfo(\"America/New_York\")` give you over a fixed offset?",
    opts: [
      { id: "a", text: "Faster arithmetic", correct: false },
      { id: "b", text: "Real IANA rules including DST transitions", correct: true },
      { id: "c", text: "Automatic UTC conversion on print", correct: false },
      { id: "d", text: "Smaller memory use", correct: false },
    ],
  },
  "Transactions": {
    q: "What does using the sqlite3 connection as a context manager do on error?",
    opts: [
      { id: "a", text: "Commits whatever succeeded so far", correct: false },
      { id: "b", text: "Rolls back the whole transaction automatically", correct: true },
      { id: "c", text: "Retries the statements", correct: false },
      { id: "d", text: "Closes the database file", correct: false },
    ],
  },
  "Constraints": {
    q: "What happens on a duplicate PRIMARY KEY insert?",
    opts: [
      { id: "a", text: "The old row is replaced", correct: false },
      { id: "b", text: "sqlite3.IntegrityError is raised", correct: true },
      { id: "c", text: "The insert is silently skipped", correct: false },
      { id: "d", text: "A new table is created", correct: false },
    ],
  },
  "Test doubles": {
    q: "How do mocks differ from fakes and stubs?",
    opts: [
      { id: "a", text: "Mocks are slower versions of the real thing", correct: false },
      { id: "b", text: "Mocks record interactions so you can assert on collaboration", correct: true },
      { id: "c", text: "Mocks only work for async code", correct: false },
      { id: "d", text: "There is no difference", correct: false },
    ],
  },
  "Patching with mock": {
    q: "Where must `patch()` target a name?",
    opts: [
      { id: "a", text: "Where it is defined", correct: false },
      { id: "b", text: "Where it is looked up (the using module's namespace)", correct: true },
      { id: "c", text: "In sys.modules", correct: false },
      { id: "d", text: "Anywhere — patch finds it", correct: false },
    ],
  },
  "Profiling with cProfile": {
    q: "Why profile the real workload instead of a microbenchmark?",
    opts: [
      { id: "a", text: "Microbenchmarks are illegal in CI", correct: false },
      { id: "b", text: "Hotspots hide where you least expect them", correct: true },
      { id: "c", text: "cProfile cannot run small functions", correct: false },
      { id: "d", text: "Microbenchmarks are always faster", correct: false },
    ],
  },
  "Reading pstats": {
    q: "In pstats output, what does `tottime` vs `cumtime` tell you?",
    opts: [
      { id: "a", text: "They are the same number", correct: false },
      { id: "b", text: "tottime finds the true hotspot; cumtime finds the expensive path", correct: true },
      { id: "c", text: "tottime counts calls; cumtime counts time", correct: false },
      { id: "d", text: "tottime is wall time; cumtime is CPU time", correct: false },
    ],
  },
  "Choosing a concurrency model": {
    q: "Which model fits ten thousand mostly-idle connections?",
    opts: [
      { id: "a", text: "Multiprocessing — one process per connection", correct: false },
      { id: "b", text: "asyncio — massive concurrency on one thread", correct: true },
      { id: "c", text: "One thread per connection", correct: false },
      { id: "d", text: "Sequential requests", correct: false },
    ],
  },
  "Fair scheduling": {
    q: "What does round-robin scheduling guarantee?",
    opts: [
      { id: "a", text: "Shortest jobs finish first", correct: false },
      { id: "b", text: "Every task gets a slice per turn, so none starves", correct: true },
      { id: "c", text: "Highest priority always wins", correct: false },
      { id: "d", text: "Zero context-switch overhead", correct: false },
    ],
  },
  "Capstone: job service": {
    q: "What must the final capstone prove beyond working code?",
    opts: [
      { id: "a", text: "Nothing — working code is enough", correct: false },
      { id: "b", text: "Graceful shutdown, a report, nonzero exit on failure, and a demo", correct: true },
      { id: "c", text: "A web UI", correct: false },
      { id: "d", text: "100% test coverage", correct: false },
    ],
  },
  "Graceful shutdown design": {
    q: "What is the correct service shutdown order?",
    opts: [
      { id: "a", text: "Kill workers, then drain the queue", correct: false },
      { id: "b", text: "Stop intake, drain with sentinels, join workers, flush persistence, exit", correct: true },
      { id: "c", text: "Exit immediately — the OS cleans up", correct: false },
      { id: "d", text: "Flush persistence first, then keep serving", correct: false },
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

/* ─── Code-challenge verification ───
 * expectedOutput gates "Mark Complete" on the code exercise: the learner's run
 * output must contain this substring. It is only set for blueprints whose
 * baseline output is deterministic AND reproducible by the in-browser
 * simulator, so gating works in both real (Piston) and simulated mode.
 * Day 6/21 need stdin, 25/26 produce environment-dependent output, and the
 * remaining days rely on features the subset simulator can't model yet.
 * Days 41-70 follow the same rule: 48/49 (asserts are simulator no-ops, prints
 * are real), 57 (json), 58 (manual split/join CSV), 60 (count line only),
 * 63 (range/sum/nested loops), 66 (dict counting), 67 (strip/split/upper),
 * 68 (memoized recursion), and 69 (f-string precision/width) are gated.
 * The rest import real stdlib modules (itertools, functools, pathlib,
 * argparse, logging, re, dataclasses, enum, sqlite3, collections, datetime),
 * use decorators/classes/generators/typing syntax, or depend on the
 * environment (venv, pdb, sqlite output shapes) — ungated by design.
 * Days 71-100 follow the same rule: 79 (json payload shaping), 80 (json
 * report), 82 (string split/strip/replace only), 89 (recursive clone over
 * lists/dicts via type() equality — isinstance is avoided because the sim
 * answers True for every isinstance check), 99 (round-robin over dicts and
 * lists), and 100 (json round-trip plus == False filtering) are gated.
 * Gated templates keep every collection display on ONE physical line and
 * build computed dicts via item assignment: the sim executes line-by-line
 * (multi-line displays collapse) and leaves names/calls inside dict
 * displays unresolved.
 * The rest need real threads/processes/asyncio/subprocess/sqlite, import
 * stdlib modules outside the sim model (queue, concurrent.futures, abc,
 * weakref, hashlib/secrets randomness, inspect, heapq/bisect, zoneinfo,
 * unittest.mock, cProfile), define instantiable classes (protocols, ABCs,
 * metaclasses, descriptors, slots), rely on del/raise semantics, or print
 * version-dependent output (83, 85) — ungated by design. */
const PY_EXPECTED_OUTPUT: Record<number, string> = {
  1: "Hello, World!",
  2: "hello 25 3.14159",
  3: "13 7 30",
  4: "Hello, Ada",
  5: "True False",
  7: "B",
  8: "0\n1\n2\n3\n4",
  9: "0 1 2 3 4",
  10: "[0, 1, 2, 3, 4]",
  11: "3 4",
  12: "city = London",
  14: "[0, 1, 4, 9, 16, 25]",
  15: "Hello, Ada",
  16: "15\n10",
  19: "HELLO, WORLD",
  20: "Ada is 36 years old",
  22: "21",
  24: '{"name": "Ada", "languages": ["Python", "C"]}',
  27: "120",
  28: "[1, 2, 5, 8, 9]",
  30: "[1, 2, 3, 4]",
  31: "[1]",
  38: "10 15",
  40: "1 notes saved",
  48: "2 tests passed",
  49: "pytest style checks passed",
  57: "Ada",
  58: "ada is 36",
  60: "1 contact saved",
  63: "1600",
  66: "5\n2\na",
  67: "ADA LOVELACE",
  68: "55\n9",
  69: "ADA scored 90",
  79: "Ada has 49 stars",
  80: '{"fetched": 2, "failed": 1}',
  82: "fetchcli\n0.1.0",
  89: "[1, 2]",
  99: "['a', 'b', 'c', 'a', 'b', 'a']",
  100: "2 pending",
};

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
    expectedOutput: PY_EXPECTED_OUTPUT[day],
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
