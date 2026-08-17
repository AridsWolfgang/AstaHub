import type { Lesson } from "../../types";
import { getLevelForDay } from "../../types";

/* ─── Rust blueprints: Days 1–40 ─── */

interface RustBlueprint {
  title: string;
  subtitle: string;
  language: "rust";
  tags: string[];
  theoryTopics: string[];
  codeTemplate: string;
}

const RUST_CURRICULUM: RustBlueprint[] = [
  { title: "Hello, Rust", subtitle: "main, println!, and fn", language: "rust", tags: ["hello-world"], theoryTopics: ["fn main", "println!", "Compiling with rustc"], codeTemplate: `fn main() {\n    println!("Hello, Rust!");\n}` },
  { title: "Variables & Mutability", subtitle: "let, mut, and shadowing", language: "rust", tags: ["variables"], theoryTopics: ["let and mut", "Shadowing", "Immutability by default"], codeTemplate: `fn main() {\n    let mut x = 5;\n    println!("original {}", x);\n    x = 6;\n    println!("mutated {}", x);\n    let x = x + 1;\n    println!("shadowed {}", x);\n}` },
  { title: "Data Types", subtitle: "integers, floats, bool, char", language: "rust", tags: ["types"], theoryTopics: ["Scalar types", "Integer types", "Floats and bool"], codeTemplate: `fn main() {\n    let i: i32 = 42;\n    let u: u64 = 7;\n    let f: f64 = 3.5;\n    let b: bool = true;\n    let c: char = 'R';\n    println!("{} {} {} {} {}", i, u, f, b, c);\n}` },
  { title: "Arithmetic & Operators", subtitle: "+ - * / %", language: "rust", tags: ["operators"], theoryTopics: ["Arithmetic operators", "Integer division", "Operator precedence"], codeTemplate: `fn main() {\n    let a = 10;\n    let b = 3;\n    println!("{} {} {} {} {}", a + b, a - b, a * b, a / b, a % b);\n    println!("{}", a + b * 2);\n}` },
  { title: "Strings", subtitle: "&str vs String", language: "rust", tags: ["strings"], theoryTopics: ["&str literals", "The String type", "format! macro"], codeTemplate: `fn main() {\n    let name = "Ada";\n    let greeting = format!("Hello, {}!", name);\n    println!("{}", greeting);\n    let mut s = String::from("hello");\n    s.push_str(" world");\n    println!("{}", s);\n}` },
  { title: "Control Flow: if / else", subtitle: "if, else if, and expressions", language: "rust", tags: ["control-flow"], theoryTopics: ["if expressions", "else if chains", "Expressions, not statements"], codeTemplate: `fn main() {\n    let score = 85;\n    let grade = if score >= 90 {\n        "A"\n    } else if score >= 80 {\n        "B"\n    } else {\n        "C"\n    };\n    println!("{}", grade);\n    let status = if score > 50 { "pass" } else { "fail" };\n    println!("{}", status);\n}` },
  { title: "Loops", subtitle: "loop, while, and for", language: "rust", tags: ["loops"], theoryTopics: ["loop", "while loops", "for over ranges"], codeTemplate: `fn main() {\n    let mut n = 0;\n    loop {\n        n += 1;\n        if n == 3 {\n            break;\n        }\n    }\n    println!("{}", n);\n    let mut m = 3;\n    while m > 0 {\n        m -= 1;\n        println!("w{}", m);\n    }\n    for i in 0..3 {\n        println!("f{}", i);\n    }\n}` },
  { title: "match", subtitle: "pattern matching", language: "rust", tags: ["control-flow"], theoryTopics: ["match arms", "Exhaustiveness", "match as an expression"], codeTemplate: `fn main() {\n    let command = "start";\n    let result = match command {\n        "stop" => "stopping",\n        "start" => "starting",\n        _ => "unknown",\n    };\n    println!("{}", result);\n    let number = 5;\n    let parity = match number {\n        0 => "zero",\n        1 | 2 => "small",\n        _ => "big",\n    };\n    println!("{}", parity);\n}` },
  { title: "Ownership", subtitle: "move semantics", language: "rust", tags: ["ownership"], theoryTopics: ["The ownership rules", "Move semantics", "Copy types"], codeTemplate: `fn main() {\n    let s = String::from("hello");\n    let t = s;\n    println!("{}", t);\n    let a = 5;\n    let b = a;\n    println!("{} {}", a, b);\n}` },
  { title: "References & Borrowing", subtitle: "shared and mutable references", language: "rust", tags: ["ownership"], theoryTopics: ["References", "Mutable references", "The borrow rules"], codeTemplate: `fn main() {\n    let mut s = String::from("hello");\n    let len = s.len();\n    {\n        let r = &mut s;\n        r.push_str(" world");\n    }\n    println!("{} {}", s, len);\n    let t = &s;\n    println!("{}", t.len());\n}` },
  { title: "Slices", subtitle: "&str and &[T]", language: "rust", tags: ["ownership"], theoryTopics: ["Slice syntax", "String slices", "Array slices"], codeTemplate: `fn main() {\n    let s = String::from("hello world");\n    let first = &s[..5];\n    println!("{}", first);\n    let arr = [1, 2, 3, 4, 5];\n    let mid = &arr[1..4];\n    println!("{}", mid.len());\n    println!("{}", mid[1]);\n}` },
  { title: "Structs", subtitle: "composing named data", language: "rust", tags: ["structs"], theoryTopics: ["Defining structs", "Instantiating", "Field access"], codeTemplate: `struct User {\n    name: String,\n    age: u8,\n}\n\nfn main() {\n    let user = User {\n        name: String::from("Ada"),\n        age: 36,\n    };\n    println!("{} is {}", user.name, user.age);\n}` },
  { title: "Enums", subtitle: "Option<T>", language: "rust", tags: ["enums"], theoryTopics: ["Defining enums", "Option<T>", "Pattern matching enums"], codeTemplate: `enum Color {\n    Red,\n    Blue,\n}\n\nfn main() {\n    let color = Color::Blue;\n    let name = match color {\n        Color::Red => "red",\n        Color::Blue => "blue",\n    };\n    println!("{}", name);\n    let maybe: Option<i32> = Some(5);\n    if let Some(n) = maybe {\n        println!("{}", n);\n    }\n}` },
  { title: "if let & while let", subtitle: "concise pattern matching", language: "rust", tags: ["control-flow"], theoryTopics: ["if let", "while let", "When to prefer match"], codeTemplate: `fn main() {\n    let config = Some("dark");\n    if let Some(theme) = config {\n        println!("theme: {}", theme);\n    }\n    let mut stack = vec![1, 2, 3];\n    while let Some(top) = stack.pop() {\n        println!("{}", top);\n    }\n}` },
  { title: "Methods & impl", subtitle: "attaching behavior to types", language: "rust", tags: ["structs"], theoryTopics: ["impl blocks", "Method syntax", "Associated functions"], codeTemplate: `struct Circle {\n    radius: f64,\n}\n\nimpl Circle {\n    fn new(radius: f64) -> Circle {\n        Circle { radius }\n    }\n\n    fn area(&self) -> f64 {\n        3.14159 * self.radius * self.radius\n    }\n}\n\nfn main() {\n    let c = Circle::new(2.0);\n    println!("{}", c.area());\n}` },
  { title: "Traits", subtitle: "shared behavior across types", language: "rust", tags: ["traits"], theoryTopics: ["Defining traits", "Implementing traits", "Trait bounds"], codeTemplate: `trait Speak {\n    fn speak(&self) -> String;\n}\n\nstruct Dog;\nstruct Cat;\n\nimpl Speak for Dog {\n    fn speak(&self) -> String {\n        String::from("Woof")\n    }\n}\n\nimpl Speak for Cat {\n    fn speak(&self) -> String {\n        String::from("Meow")\n    }\n}\n\nfn main() {\n    let dog = Dog;\n    let cat = Cat;\n    println!("{}", dog.speak());\n    println!("{}", cat.speak());\n}` },
  { title: "Generics", subtitle: "type parameters and monomorphization", language: "rust", tags: ["generics"], theoryTopics: ["Generic functions", "Type parameters", "Monomorphization"], codeTemplate: `fn largest<T: PartialOrd>(list: &[T]) -> &T {\n    let mut largest = &list[0];\n    for item in list {\n        if item > largest {\n            largest = item;\n        }\n    }\n    largest\n}\n\nfn main() {\n    let numbers = [3, 7, 2, 9, 5];\n    println!("{}", largest(&numbers));\n    let words = ["pear", "apple", "grape"];\n    println!("{}", largest(&words));\n}` },
  { title: "Vectors", subtitle: "Vec<T>", language: "rust", tags: ["collections"], theoryTopics: ["Creating Vecs", "push and indexing", "Iterating"], codeTemplate: `fn main() {\n    let mut nums = vec![1, 2, 3];\n    nums.push(4);\n    println!("{}", nums[2]);\n    println!("{}", nums.len());\n    let mut total = 0;\n    for n in &nums {\n        total += n;\n    }\n    println!("{}", total);\n}` },
  { title: "HashMap", subtitle: "key-value lookups", language: "rust", tags: ["collections"], theoryTopics: ["Inserting", "Getting values", "Entry API"], codeTemplate: `use std::collections::HashMap;\n\nfn main() {\n    let mut scores = HashMap::new();\n    scores.insert("Ada", 95);\n    scores.insert("Bob", 88);\n    println!("{}", scores["Ada"]);\n    println!("{}", scores.len());\n    let eve = scores.entry("Eve").or_insert(70);\n    println!("{}", eve);\n}` },
  { title: "Option<T> Handling", subtitle: "safe handling of maybe-values", language: "rust", tags: ["errors"], theoryTopics: ["match on Option", "unwrap and expect", "unwrap_or"], codeTemplate: `fn main() {\n    let maybe: Option<i32> = Some(10);\n    let value = match maybe {\n        Some(n) => n,\n        None => 0,\n    };\n    println!("{}", value);\n    let none: Option<i32> = None;\n    println!("{}", none.unwrap_or(42));\n}` },
  { title: "Result & Error Handling", subtitle: "fallible functions and match", language: "rust", tags: ["errors"], theoryTopics: ["Result<T, E>", "Returning errors", "Handling with match"], codeTemplate: `fn divide(a: f64, b: f64) -> Result<f64, String> {\n    if b == 0.0 {\n        Err(String::from("division by zero"))\n    } else {\n        Ok(a / b)\n    }\n}\n\nfn main() {\n    match divide(10.0, 2.0) {\n        Ok(value) => println!("{}", value),\n        Err(e) => println!("error: {}", e),\n    }\n    match divide(1.0, 0.0) {\n        Ok(value) => println!("{}", value),\n        Err(e) => println!("error: {}", e),\n    }\n}` },
  { title: "Closures", subtitle: "anonymous functions that capture", language: "rust", tags: ["functional"], theoryTopics: ["Closure syntax", "Capturing", "Closures as arguments"], codeTemplate: `fn main() {\n    let add_one = |x: i32| x + 1;\n    println!("{}", add_one(5));\n    let base = 10;\n    let add_base = |x: i32| x + base;\n    println!("{}", add_base(3));\n    let nums = vec![1, 2, 3, 4];\n    let evens: Vec<i32> = nums.into_iter().filter(|n| n % 2 == 0).collect();\n    println!("{}", evens.len());\n}` },
  { title: "Iterators", subtitle: "lazy sequences and adapters", language: "rust", tags: ["functional"], theoryTopics: ["The Iterator trait", "map and filter", "collect and sum"], codeTemplate: `fn main() {\n    let nums = vec![1, 2, 3, 4, 5];\n    let squares: Vec<i32> = nums.iter().map(|n| n * n).collect();\n    println!("{:?}", squares);\n    let evens: Vec<i32> = nums.iter().filter(|n| *n % 2 == 0).copied().collect();\n    println!("{:?}", evens);\n    let total: i32 = nums.iter().sum();\n    println!("{}", total);\n}` },
  { title: "Modules & Visibility", subtitle: "organizing code with mod and pub", language: "rust", tags: ["modules"], theoryTopics: ["mod declarations", "pub visibility", "use imports"], codeTemplate: `mod math {\n    pub fn double(x: i32) -> i32 {\n        x * 2\n    }\n}\n\nfn main() {\n    use math::double;\n    println!("{}", double(21));\n}` },
  { title: "Cargo & Crates", subtitle: "the build tool and the registry", language: "rust", tags: ["tooling"], theoryTopics: ["cargo new", "Cargo.toml", "Dependencies"], codeTemplate: `fn main() {\n    println!("cargo manages build, deps, and tests");\n}` },
  { title: "Unit Testing", subtitle: "#[test], assert!, and cargo test", language: "rust", tags: ["testing"], theoryTopics: ["#[test]", "assert! macros", "cargo test"], codeTemplate: `fn main() {\n    println!("tests live in modules and run with cargo test");\n}\n\n#[test]\nfn adds_numbers() {\n    assert_eq!(2 + 2, 4);\n}` },
  { title: "Formatting Strings", subtitle: "Display, Debug, and format! specifiers", language: "rust", tags: ["strings"], theoryTopics: ["Display vs Debug", "Positional arguments", "Width and precision"], codeTemplate: `fn main() {\n    let point = (3, 5);\n    println!("{:?}", point);\n    println!("{:?}", vec![1, 2, 3]);\n    println!("{}", format!("{:>5}", 42));\n}` },
  { title: "String Methods", subtitle: "trim, split, replace, chars, bytes", language: "rust", tags: ["strings"], theoryTopics: ["to_uppercase and trim", "split and replace", "chars and bytes"], codeTemplate: `fn main() {\n    let s = String::from("  hello world  ");\n    println!("{}", s.trim());\n    println!("{}", s.trim().to_uppercase());\n    let parts: Vec<&str> = "a,b,c".split(',').collect();\n    println!("{}", parts.len());\n    println!("{}", "hello".replace("l", "L"));\n    println!("{}", "rust".chars().count());\n    println!("{}", "rust".bytes().count());\n}` },
  { title: "Tuples & Destructuring", subtitle: "fixed-size groups and pattern binding", language: "rust", tags: ["types"], theoryTopics: ["Tuple types", "Destructuring", "Tuple structs"], codeTemplate: `struct Pair(i32, i32);\n\nfn main() {\n    let point = (3, 5);\n    let (x, y) = point;\n    println!("{} {}", x, y);\n    let p = Pair(1, 2);\n    let Pair(a, b) = p;\n    println!("{} {}", a, b);\n}` },
  { title: "More Collections", subtitle: "HashSet, BTreeMap, VecDeque", language: "rust", tags: ["collections"], theoryTopics: ["HashSet", "BTreeMap", "VecDeque"], codeTemplate: `use std::collections::{BTreeMap, HashSet, VecDeque};\n\nfn main() {\n    let mut seen = HashSet::new();\n    seen.insert(1);\n    seen.insert(2);\n    seen.insert(2);\n    println!("{}", seen.len());\n    let mut map = BTreeMap::new();\n    map.insert("b", 2);\n    map.insert("a", 1);\n    for (k, v) in &map {\n        println!("{}:{}", k, v);\n    }\n    let mut q = VecDeque::new();\n    q.push_back(1);\n    q.push_front(0);\n    println!("{}", q[0]);\n}` },
  { title: "Lifetimes", subtitle: "ensuring references stay valid", language: "rust", tags: ["advanced"], theoryTopics: ["Lifetime annotations", "Elision", "The 'static lifetime"], codeTemplate: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() {\n        x\n    } else {\n        y\n    }\n}\n\nfn main() {\n    let a = String::from("longer");\n    let b = String::from("short");\n    let result = longest(&a, &b);\n    println!("{}", result);\n    let static_str: &'static str = "static";\n    println!("{}", static_str.len());\n}` },
  { title: "Box<T> — Smart Pointers", subtitle: "heap allocation and indirection", language: "rust", tags: ["advanced"], theoryTopics: ["Box basics", "Indirection", "Recursive types"], codeTemplate: `enum List {\n    Node(i32, Box<List>),\n    End,\n}\n\nfn main() {\n    let list = List::Node(1, Box::new(List::Node(2, Box::new(List::End))));\n    let mut count = 0;\n    let mut current = &list;\n    loop {\n        match current {\n            List::Node(_, next) => {\n                count += 1;\n                current = next;\n            }\n            List::End => break,\n        }\n    }\n    println!("{}", count);\n}` },
  { title: "Rc & RefCell", subtitle: "shared ownership and interior mutability", language: "rust", tags: ["advanced"], theoryTopics: ["Rc<T>", "RefCell<T>", "Interior mutability"], codeTemplate: `use std::cell::RefCell;\nuse std::rc::Rc;\n\nfn main() {\n    let value = Rc::new(RefCell::new(5));\n    let shared = Rc::clone(&value);\n    *shared.borrow_mut() += 1;\n    println!("{}", *value.borrow());\n    println!("{}", Rc::strong_count(&value));\n}` },
  { title: "Threads", subtitle: "spawning concurrent work", language: "rust", tags: ["concurrency"], theoryTopics: ["thread::spawn", "move closures", "join"], codeTemplate: `use std::thread;\n\nfn main() {\n    let handle = thread::spawn(|| {\n        let mut sum = 0;\n        for i in 1..=10 {\n            sum += i;\n        }\n        sum\n    });\n    let result = handle.join().unwrap();\n    println!("{}", result);\n}` },
  { title: "Channels", subtitle: "passing messages between threads", language: "rust", tags: ["concurrency"], theoryTopics: ["mpsc::channel", "Sender and Receiver", "Sending messages"], codeTemplate: `use std::sync::mpsc;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    let handle = std::thread::spawn(move || {\n        tx.send(String::from("ping")).unwrap();\n    });\n    let msg = rx.recv().unwrap();\n    handle.join().unwrap();\n    println!("{}", msg);\n}` },
  { title: "Shared State — Mutex", subtitle: "guarding data across threads", language: "rust", tags: ["concurrency"], theoryTopics: ["Mutex<T>", "Locking", "Arc<T>"], codeTemplate: `use std::sync::{Arc, Mutex};\n\nfn main() {\n    let counter = Arc::new(Mutex::new(0));\n    let mut handles = vec![];\n    for _ in 0..3 {\n        let counter = Arc::clone(&counter);\n        handles.push(std::thread::spawn(move || {\n            let mut num = counter.lock().unwrap();\n            *num += 1;\n        }));\n    }\n    for handle in handles {\n        handle.join().unwrap();\n    }\n    println!("{}", *counter.lock().unwrap());\n}` },
  { title: "Trait Objects", subtitle: "dynamic dispatch with dyn Trait", language: "rust", tags: ["advanced"], theoryTopics: ["dyn Trait", "Box<dyn Trait>", "Object safety"], codeTemplate: `trait Speak {\n    fn speak(&self) -> String;\n}\n\nstruct Dog;\nstruct Cat;\n\nimpl Speak for Dog {\n    fn speak(&self) -> String {\n        String::from("Woof")\n    }\n}\n\nimpl Speak for Cat {\n    fn speak(&self) -> String {\n        String::from("Meow")\n    }\n}\n\nfn main() {\n    let animals: Vec<Box<dyn Speak>> = vec![Box::new(Dog), Box::new(Cat)];\n    for animal in animals {\n        println!("{}", animal.speak());\n    }\n}` },
  { title: "Macros", subtitle: "code that writes code", language: "rust", tags: ["advanced"], theoryTopics: ["vec! and format!", "Declarative macros", "When to write one"], codeTemplate: `macro_rules! greet {\n    ($name:expr) => {\n        format!("Hello, {}!", $name)\n    };\n}\n\nfn main() {\n    let v = vec![1, 2, 3];\n    println!("{}", v.len());\n    println!("{}", format!("{} - {}", 1, 2));\n    println!("{}", greet!("Rust"));\n}` },
  { title: "Functional Style", subtitle: "chained iterators and immutable pipelines", language: "rust", tags: ["functional"], theoryTopics: ["Chained iterators", "Declarative pipelines", "Immutability"], codeTemplate: `fn main() {\n    let data = vec![3, 1, 4, 1, 5];\n    let total: i32 = data\n        .iter()\n        .filter(|n| *n % 2 == 1)\n        .map(|n| n * 10)\n        .sum();\n    println!("{}", total);\n    let mut sorted = data.clone();\n    sorted.sort();\n    println!("{:?}", sorted);\n}` },
  { title: "Capstone: A CLI Tool", subtitle: "a real command-line tool end to end", language: "rust", tags: ["capstone"], theoryTopics: ["Project structure", "Reading arguments", "cli args via std::env"], codeTemplate: `use std::env;\n\nfn main() {\n    let args: Vec<String> = env::args().skip(1).collect();\n    println!("{} args", args.len());\n}` },
];

/* ─── Hand-written topic content ─── */

const RUST_TOPIC_CONTENT: Record<string, string> = {
  "fn main": "Every Rust program starts executing in `fn main`, the mandatory entry point. It takes no arguments and returns nothing (or a `Result` when you want a process exit code). Everything you write runs from here, and it is where a `rustc`-compiled binary begins. Keeping `main` short and delegating to functions is the idiomatic structure of a Rust program.",
  "println!": "`println!` is a macro, not a function — the trailing `!` marks it. It prints a line to standard output and appends a newline, and its first argument is a format string: `{}` inserts the Display form of each following value. `print!` prints without the newline, and `eprintln!` writes to standard error. Formatting is checked at compile time, so a wrong number of placeholders is an error, not a runtime surprise.",
  "Compiling with rustc": "`rustc program.rs` compiles a single file into an executable. `rustc` alone is enough for one-file programs; real projects use `cargo`, which invokes the same compiler under the hood. Compile errors are loud and precise — they point at the exact line and often suggest the fix. The compiler is your first teacher: read its messages before you change anything.",
  "let and mut": "`let` binds a name to a value and makes it immutable by default. To allow reassignment, declare `let mut name`. `mut` is part of the binding, not the type — it records your intent that the variable will change. Rust makes you choose, so accidental mutation is caught at compile time instead of at runtime.",
  "Shadowing": "A new `let` with the same name creates a fresh binding that hides the old one for the rest of the scope. Shadowing is not mutation — the original value still exists until it goes out of scope. It is the idiomatic way to rebind a value after transforming it, and a shadowed binding can even change type (`let x = 1; let x = \"one\";`).",
  "Immutability by default": "Rust values are immutable unless you opt in with `mut`. This is a deliberate inversion of most languages: the safe default protects you from accidental writes and lets the compiler reason about data flow. When you see a non-`mut` binding, you know nothing in the block can change it — a guarantee you can rely on while reading code.",
  "Scalar types": "Rust has four scalar types: integers, floating-point numbers, booleans, and characters. A scalar holds a single value, unlike compound types like tuples and arrays. The integer family alone has many widths and signedness options, and each one is a distinct type — mixing them requires an explicit cast.",
  "Integer types": "Integers are named by width and signedness: `i8`..`i128` and the unsigned `u8`..`u128`, plus `isize`/`usize` which match the platform pointer size. The default is `i32`, which the compiler infers when a plain literal like `5` has no annotated type. Choosing a width is about range and memory — `u8` holds 0–255, `i32` holds roughly ±2.1 billion.",
  "Floats and bool": "Floating-point numbers are `f32` and `f64`; the default and most common is `f64` (double precision). `bool` is `true` or `false` — there is no truthiness and no numeric-to-boolean coercion in Rust, so conditions must already be booleans. `char` is a Unicode scalar value and is always 4 bytes, unlike a C `char`.",
  "Arithmetic operators": "The usual arithmetic operators work on numbers: `+`, `-`, `*`, `/`, and `%` for remainder. They apply to both integers and floats, and the result type follows the operands. `+` is not defined for `String` — Rust deliberately does not support `\"a\" + \"b\"`; you concatenate with `format!` or `push_str` instead.",
  "Integer division": "Dividing two integers performs integer division: `7 / 2` is `3`, with the remainder discarded. To get a fractional result you must involve a float on one side (`7.0 / 2`). Remainder is `%`: `7 % 2` is `1`. These are separate operations from `div_euclid`/`rem_euclid`, which round toward negative infinity instead of toward zero.",
  "Operator precedence": "Rust follows standard mathematical precedence: `*`, `/`, and `%` bind tighter than `+` and `-`, and parentheses override everything. So `a + b * 2` means `a + (b * 2)`. When in doubt, add parentheses — the compiler is not confused, but the next reader might be.",
  "&str literals": "A string literal like `\"hello\"` has the type `&'static str` — a reference to a fixed slice of text baked into the compiled binary. `&str` is immutable, cheap to copy, and never owns its data; it is the type of string literals, function parameters, and string slices. It is the 'view' type for text, contrasted with `String`, which owns a growable buffer.",
  "The String type": "`String` owns a growable, heap-allocated UTF-8 buffer. You create one with `String::from(\"hi\")` or `to_string()`, and grow it with `push_str` or `push`. It behaves like a `Vec<u8>` that guarantees valid UTF-8. Passing a `String` moves it; passing `&s` or `&str` borrows it without transferring ownership.",
  "format! macro": "`format!` builds a new `String` from a format string and arguments, using the same placeholders as `println!` but returning the result instead of printing it. It is the idiomatic way to compose strings and numbers into text. Like all format macros, it validates placeholders against arguments at compile time.",
  "if expressions": "In Rust, `if` is an expression that can produce a value: `let grade = if score >= 90 { \"A\" } else { \"B\" };`. Every branch must be an expression of the same type, and the block's final expression is the branch value. Because of this, Rust has no need for a separate ternary operator.",
  "else if chains": "`else if` checks alternatives in order; the first branch whose condition is true runs, and the rest are skipped. Unlike some languages, the condition does not need parentheses. When the chain grows past a couple of branches, consider `match`, which is more readable and enforces exhaustiveness.",
  "Expressions, not statements": "Almost everything in Rust is an expression with a value. A block `{ ... }` evaluates to its last expression; a function returns the final expression when there is no `return`. Statements — like `let` bindings — have the unit type `()`. This distinction is why `if` and `match` can be assigned: they are expressions.",
  "loop": "`loop { ... }` repeats forever until a `break` exits it. It is the only loop that does not check a condition, which makes it ideal for retry logic and 'until ready' patterns. `break` can even carry a value out of the loop: `let x = loop { break 5; };`. For counting or condition-driven repetition, `while` and `for` are usually clearer.",
  "while loops": "`while condition { ... }` tests its condition before every iteration and stops when it becomes false. It is the right tool when the loop count is unknown up front. Every `while` can be rewritten with `loop` plus a `break`, but the explicit condition reads better and cannot be forgotten.",
  "for over ranges": "`for i in 0..3` iterates over a range where `0..3` is exclusive at the end (0, 1, 2) and `0..=3` is inclusive. `for` also iterates over arrays, slices, and any `Iterator`. It is the most common loop in Rust and the one the compiler can optimize hardest — prefer it over manual index loops.",
  "match arms": "A `match` is a chain of arms, each with a pattern and an expression: `pattern => expression`. The first arm whose pattern matches wins. Patterns can bind values (`Some(n) => n`), match literals, ranges, and wildcards. There is no implicit fallthrough — each arm is independent, which eliminates a whole class of bugs.",
  "Exhaustiveness": "`match` requires every possible case to be covered; if an arm is missing, the program does not compile. This is enforced by the compiler, so adding a variant to an enum forces you to revisit every `match` on it. The `_` wildcard covers everything else, but relying on it hides cases — match each variant explicitly when the logic differs.",
  "match as an expression": "A `match` is an expression: the matched arm's value becomes the match's value, so you can assign it directly. This makes branching read like data flow rather than control flow. Because every arm must have the same type, the compiler keeps you honest about what each branch produces.",
  "The ownership rules": "Every Rust value has exactly one owner — the binding that holds it. When the owner goes out of scope, the value is dropped and its memory is freed immediately. There is no garbage collector and no manual free; ownership is the mechanism that makes memory safety automatic. These three rules — one owner, drop on scope exit, move on transfer — underpin the whole language.",
  "Move semantics": "Assigning a value transfers ownership: `let t = s;` moves the `String` from `s` to `t`, and `s` becomes unusable — the compiler rejects further use. This prevents double-free and dangling references at zero runtime cost. Types that implement `Copy`, like integers, are copied instead of moved, which is why `let b = a;` leaves `a` valid.",
  "Copy types": "Types whose data is trivial to duplicate — integers, floats, booleans, `char`, and tuples of them — implement `Copy`. For a `Copy` type, assignment duplicates the value, and the original stays usable. Heap-owning types like `String` and `Vec` are not `Copy`; copying them would duplicate the allocation, so they move instead. The compiler decides which you get.",
  "References": "A reference `&s` borrows a value without taking ownership. References are cheap — in machine terms they are just pointers — and borrowing keeps the value alive while the reference is in scope. Creating a reference does not move the value, so you can pass data into functions and keep using it afterward.",
  "Mutable references": "`&mut x` is a mutable reference: it lets you change the value it points at. The rule that keeps this safe: at any moment you may have either many shared references or one mutable reference, never both for the same value. This is checked at compile time, so data races are prevented before the program ever runs.",
  "The borrow rules": "Borrowing follows two rules enforced by the compiler: you can have unlimited `&T` reads, or one `&mut T` write, but not a mix for the same value at the same time, and a reference must never outlive the value it points to. Violations are compile errors, not crashes. This is the mechanism behind Rust's guarantee of memory safety without a garbage collector.",
  "Slice syntax": "A slice is a view into a contiguous sequence of elements — it has no ownership and no own storage, just a pointer plus a length. `&arr[1..4]` is a slice of elements at indices 1, 2, and 3. Slicing is range syntax on a reference, and the type is `&[T]` for arrays or `&str` for strings.",
  "String slices": "A string slice `&s[..5]` borrows a range of bytes from a `String` as a `&str`. Ranges index by byte, so cutting in the middle of a multi-byte character panics — string slicing must land on character boundaries. Slices are the zero-cost way to pass substrings around without copying.",
  "Array slices": "`&arr[1..4]` borrows part of an array as a `&[i32]` slice. Slices are dynamically sized, so they always appear behind a reference. Functions that take `&[T]` accept arrays, vectors, and other slices alike, which makes slicing the natural 'accept any sequence' interface in Rust.",
  "Defining structs": "A struct groups named fields into one type: `struct User { name: String, age: u8 }`. Each field has a name and a type. Structs are the primary way to shape related data in Rust, and unlike a tuple they give every field a meaningful name. `impl` blocks then attach behavior to the shape.",
  "Instantiating": "You create a struct value with a literal naming every field: `User { name: String::from(\"Ada\"), age: 36 }`. Field order does not matter, and every field must be provided unless the rest use `..base` to spread from another value. Instance syntax is the counterpart to the definition — one names the shape, the other fills it.",
  "Field access": "Read or write a field with dot notation: `user.name`. Field access on a struct never borrows the whole struct implicitly — it borrows exactly the field, which lets the compiler check borrowing at field granularity. `user.name = String::from(\"Bob\")` is fine only when `user` is mutable.",
  "Defining enums": "An enum lists related variants: `enum Color { Red, Blue }`. Variants can carry data — `enum Message { Text(String), Move { x: i32, y: i32 } }` — which makes enums the tool for 'this value can be one of several shapes.' The compiler tracks which variant is present, so no invalid state can be constructed.",
  "Option<T>": "`Option<T>` is an enum with two variants: `Some(T)` for a present value and `None` for its absence. Rust has no null, so 'maybe absent' is always explicit in the type — the compiler forces you to handle both cases. This is the idiomatic replacement for null pointers and sentinel values.",
  "Pattern matching enums": "`match` is the natural way to take an enum apart: each variant is one arm, and bound data is available inside its arm. The compiler verifies you covered every variant. This pairing — data shapes on the type, exhaustive handling on the match — is where Rust's safety about state really shines.",
  "if let": "`if let Some(x) = opt { ... }` runs the block only when the pattern matches, binding the value, and ignores the rest. It is the concise form of a single-armed `match` where you do not care about the `None` case. Prefer it when exactly one variant matters and the others need no handling.",
  "while let": "`while let pattern = expr { ... }` loops as long as the pattern matches, rebinding on every iteration. The classic use is draining a collection: `while let Some(top) = stack.pop() { ... }`. It is the loop form of `if let` and reads clearly when the termination condition is 'the pattern stops matching'.",
  "When to prefer match": "Use `match` when you must handle several variants and when exhaustiveness protects you; use `if let`/`while let` when one pattern is the whole story. As a rule of thumb: two or more meaningful branches → `match`; one interesting branch and a shrug for the rest → `if let`. The compiler never lets either form be incomplete.",
  "impl blocks": "`impl Type { ... }` attaches functions to a type. Inside, methods take a `self` receiver; associated functions do not. You can have multiple `impl` blocks for the same type, which lets you group related logic. `impl` is also where trait implementations are written — it is the home of behavior in Rust.",
  "Method syntax": "A method is a function with a `self` parameter — `&self`, `&mut self`, or `self` — called with dot syntax: `circle.area()`. The receiver is implicitly the value the method is invoked on. Method syntax is sugar for passing `self` as the first argument, and it makes behavior read naturally on the value it affects.",
  "Associated functions": "Functions in an `impl` block without a `self` parameter are associated functions: they belong to the type, not to instances. `String::from` and `Circle::new` are examples. They are called with `Type::name(...)`, and the constructor idiom — `new` returning a fresh instance — is an associated function.",
  "Defining traits": "A trait declares a set of method signatures that types can implement: `trait Speak { fn speak(&self) -> String; }`. It is a contract, not an implementation — each implementing type supplies its own bodies. Traits let different types share a common interface, and they are the backbone of Rust's polymorphism.",
  "Implementing traits": "`impl Speak for Dog { fn speak(&self) -> String { ... } }` gives a type the trait's behavior. The same trait can be implemented for many types, and the same type can implement many traits. Implementing a trait is how you opt a type into generics, trait objects, and standard-library abstractions like `Display` and `Iterator`.",
  "Trait bounds": "A trait bound declares what a generic parameter must be able to do: `fn largest<T: PartialOrd>` means `T` must support comparison. Bounds are checked at compile time and let generic code call trait methods on its type parameter. They are the contract that makes generic functions possible without dynamic dispatch.",
  "Generic functions": "`fn largest<T: PartialOrd>(list: &[T]) -> &T` is generic: it works for any type that satisfies the bounds. The type parameter is fixed per call site — `largest(&numbers)` with `[i32; 5]` picks `T = i32`. Generics let you write one function that serves many types while keeping full type safety.",
  "Type parameters": "A type parameter `T` is a placeholder filled in when the code is used. Rust compiles each instantiation separately — this is called monomorphization — so generic code is as fast as hand-written specialized code. The cost is compile time and binary size, not runtime speed.",
  "Monomorphization": "Monomorphization means the compiler generates a separate copy of generic code for every concrete type used: `largest::<i32>` and `largest::<&str>` are distinct functions in the binary. This is why generics are zero-cost abstractions — there is no dispatch overhead. It trades a little compile time and code size for full runtime speed.",
  "Creating Vecs": "`vec![1, 2, 3]` is the idiomatic way to create a `Vec`, and `Vec::new()` starts an empty one (often with `with_capacity` when you know the size ahead). A `Vec` owns its elements in a single heap buffer and can grow. It is the workhorse collection — ordered, indexed, and cheap to extend.",
  "push and indexing": "`nums.push(x)` appends to the end of a `Vec`; `nums[i]` reads the element at index `i`. Indexing a vector is checked: `nums[99]` on a short vector panics rather than reading out of bounds. For 'maybe there' lookups, `.get(i)` returns an `Option<&T>` instead of panicking.",
  "Iterating": "Iterate a `Vec` with `for n in &nums` (borrowing each element), `for n in &mut nums` (mutating in place), or `for n in nums` (consuming it). `iter()` and `into_iter()` make the ownership intent explicit. Iterating by reference is the most common pattern — it borrows without moving the collection.",
  "Inserting": "`scores.insert(key, value)` adds or replaces an entry in a `HashMap`. Keys must implement `Hash` and `Eq`, which `&str`, integers, and most primitives do. Insertion is O(1) on average. The `entry` API offers `or_insert`, letting you insert only when the key is missing — one lookup, no double check.",
  "Getting values": "Read from a `HashMap` with `scores.get(key)`, which returns an `Option<&V>` — `Some` when the key exists, `None` when it does not. Direct indexing `scores[key]` panics on a missing key. Prefer `.get()` when absence is possible, and combine it with `unwrap_or` for a clean default.",
  "Entry API": "`scores.entry(key)` returns a live entry you can operate on: `or_insert(default)` inserts only when missing, `and_modify(f)` changes the value when present. The entry API performs a single lookup for insert-or-update logic, so it is both faster and clearer than check-then-write. It is the idiomatic way to build counters and maps.",
  "match on Option": "`match` on an `Option<T>` handles both futures explicitly: `Some(n)` binds the value, `None` is the empty case. Because `Option` is an enum, exhaustiveness means you cannot forget the `None` branch. This is the safest, most explicit way to consume a maybe-value.",
  "unwrap and expect": "`unwrap()` extracts the value from an `Option`/`Result` and panics on `None`/`Err`. `expect(\"message\")` is the same but attaches your own panic message — prefer it when the failure is truly impossible or represents a programmer bug. Both are fine for prototyping and for values you know are present, but reach for `match`, `?`, or `unwrap_or` in real logic.",
  "unwrap_or": "`unwrap_or(default)` returns the inner value or `default` when the `Option` is `None` — a one-expression fallback. `unwrap_or_else(|_| expensive())` defers the fallback until needed. These turn a maybe-value into a value without a match, which reads well for defaults and configuration.",
  "Result<T, E>": "`Result<T, E>` is an enum with `Ok(T)` for success and `Err(E)` for failure — it models operations that can fail. Unlike `Option`, it carries the reason for failure in `E`. Returning a `Result` makes failure part of the type signature, so callers are forced to decide how to handle it.",
  "Returning errors": "A function returning `Result` signals failure by returning `Err(value)` from a branch and `Ok(value)` on success. You can also use the `?` operator to propagate an error up — it returns `Err` early and unwraps `Ok` — but only in functions whose return type is `Result` (or `Option`). Returning errors keeps failure handling explicit and visible at the call site.",
  "Handling with match": "`match result { Ok(value) => ..., Err(e) => ... }` gives both outcomes first-class handling. Because `Result` is an enum, the compiler insists both arms exist. `match` is the explicit, visible way to handle failure; `?` is the shorthand when the caller should deal with it.",
  "Closure syntax": "A closure is an anonymous function: `|x| x + 1`, with optional type annotations `|x: i32| -> i32`. Parameters sit between pipes and the body is an expression (or a block). Closures can capture variables from their environment, which distinguishes them from plain functions.",
  "Capturing": "A closure borrows the variables it uses from the enclosing scope — by immutable reference, mutable reference, or ownership, depending on how it uses them. The `move` keyword forces ownership capture, which is required when the closure outlives the scope (like a thread). Capturing happens automatically, and the compiler picks the least-restrictive mode that works.",
  "Closures as arguments": "Closures are values, so they can be passed to functions and stored. Iterator methods like `filter(|n| n % 2 == 0)` take a closure as their argument. Function parameters bound the closure's shape with `Fn`, `FnMut`, or `FnOnce` — the trait chosen determines what the closure may do.",
  "The Iterator trait": "`Iterator` is the trait behind `for` loops: it has a `next()` method that yields `Some(item)` until the sequence is exhausted, then `None`. Calling `.iter()` on a collection borrows it and yields references; `.into_iter()` consumes it. Everything that implements `Iterator` can drive a `for` loop and every adapter.",
  "map and filter": "`iter().map(f)` transforms each item with `f`; `iter().filter(p)` keeps items for which `p` is true. Both are lazy — nothing runs until the iterator is consumed. They chain with `collect` to rebuild a collection or with `sum`/`fold` to reduce. Together they replace most manual loops with a readable pipeline.",
  "collect and sum": "`collect` consumes an iterator and builds a collection, guided by the target type: `let v: Vec<i32> = iter.collect();`. `sum` folds numeric items into a total. Because adapters are lazy, `collect` is the point where the work actually happens — it is the standard finish line for iterator pipelines.",
  "mod declarations": "`mod math { ... }` declares a module, a namespace that groups items like functions, structs, and other modules. Modules are the unit of code organization in Rust: privacy is module-scoped, so items inside a module are only visible there unless made public. A module can be inline in one file or pulled from its own file by name.",
  "pub visibility": "Items are private to their module by default — only the module and its children can see them. `pub` makes an item visible outside the module, which is the seam of your public API. The default-to-private rule means the surface you expose is always deliberate.",
  "use imports": "`use path::to::item;` brings an item into scope so you can refer to it by a short name instead of a full path. `use math::double;` lets you call `double(21)` rather than `math::double(21)`. The `use` statement creates a local alias; it does not include code, it only shortens paths.",
  "cargo new": "`cargo new my_app` scaffolds a new project: a directory with `Cargo.toml`, a `src/main.rs` with a hello-world `main`, and a fresh git repo. `--lib` creates a library crate instead of a binary. From there, `cargo build`, `cargo run`, and `cargo test` drive the whole lifecycle.",
  "Cargo.toml": "`Cargo.toml` is the project manifest: it declares the package name, version, edition, and, crucially, the `[dependencies]` table. Cargo reads this file to build the project and to fetch exactly the dependency versions listed. It is the Rust equivalent of `package.json` — the single source of truth for what the project needs.",
  "Dependencies": "A dependency is another crate your project uses, declared in `Cargo.toml` and fetched from crates.io by `cargo build`. `cargo add serde` updates the manifest and lockfile for you. Dependencies are compiled in and versioned per-project, and `Cargo.lock` pins exact versions for reproducible builds.",
  "#[test]": "A function marked `#[test]` is a unit test: it runs under `cargo test`, not in normal execution. Test functions call `assert!`/`assert_eq!` and fail if any assertion fails. The `#[test]` attribute is how the test harness knows what to run — one function per test keeps failures isolated and readable.",
  "assert! macros": "`assert!(condition)` fails the test when the condition is false; `assert_eq!(a, b)` fails when `a != b`; `assert_ne!` is the opposite. All take an optional message as a second argument. Assertions are the language of tests — they encode the expected behavior and report precisely when reality disagrees.",
  "cargo test": "`cargo test` compiles and runs every `#[test]` function, reporting a line per test with a pass/fail summary. It also runs doctests. Cargo is a test runner out of the box, so there is no extra tooling to install — write tests, run `cargo test`, and get results with timing and failures.",
  "Display vs Debug": "`{}` uses the `Display` trait — a human-readable form you implement yourself for your types. `{:?}` uses `Debug`, an automatically-derivable form (`#[derive(Debug)]`) meant for diagnostics and logging. Standard collections like `Vec` implement `Debug` but not `Display`, which is why printing a vector uses `{:?}`.",
  "Positional arguments": "In a format string, `{}` placeholders are filled left to right: `format!(\"{} {}\", a, b)` puts `a` first and `b` second. Numbered placeholders `{0} {1}` let you reorder or repeat arguments. The compiler checks that argument count matches placeholders at compile time.",
  "Width and precision": "Format specifiers control layout: `{:>5}` right-aligns within five columns, `{:<5}` left-aligns, `{:05}` zero-pads, and `{:.2}` fixes decimal places. These mirror `printf`'s field syntax. Width and precision turn `format!` into a small table/column formatter without pulling in a crate.",
  "to_uppercase and trim": "`trim()` removes whitespace from both ends of a string; `to_uppercase()` (and `to_lowercase()`) return a new string with case converted. Both return owned values rather than mutating in place — strings in Rust are immutable. Chaining them, as in `s.trim().to_uppercase()`, is the idiomatic one-line cleanup of input text.",
  "split and replace": "`\"a,b,c\".split(',')` returns an iterator of substrings split on the delimiter, which you can `collect` into a `Vec<&str>`. `replace(\"old\", \"new\")` substitutes every occurrence and returns a new `String`. Both are non-mutating — the original string is untouched, and the results are separate values.",
  "chars and bytes": "`s.chars()` iterates Unicode scalar values; `s.bytes()` iterates the raw UTF-8 bytes. For ASCII text the two counts agree; for multi-byte characters they differ — `chars().count()` is the 'character' count people usually mean. Since strings are UTF-8, byte positions are not character positions.",
  "Tuple types": "A tuple groups values of possibly different types: `(3, 5)` has type `(i32, i32)`, and `(3, \"hi\")` is `(i32, &str)`. Tuples are fixed-size and have no field names — you index them `t.0`, `t.1`. They are the lightweight way to return a couple of values together without defining a struct.",
  "Destructuring": "Destructuring binds a composite value to variables by pattern: `let (x, y) = point;` unpacks a tuple in one line. The same technique works on structs, arrays, and enums. It reads like the inverse of construction and turns 'take apart' logic into a single binding.",
  "Tuple structs": "A tuple struct is a named tuple: `struct Pair(i32, i32);` gives the shape a name and a distinct type while keeping positional fields. Access fields by index or destructure with the type name: `let Pair(a, b) = p;`. Tuple structs are the middle ground between anonymous tuples and fully named structs.",
  "HashSet": "`HashSet<T>` stores unique values with O(1) membership tests. Inserting a duplicate does nothing — the set simply keeps one copy. `contains` answers 'have I seen this?' in constant time, and iteration visits elements in arbitrary order. It is the go-to tool for deduplication and set membership.",
  "BTreeMap": "`BTreeMap<K, V>` is a sorted map: iteration visits keys in sorted order, and lookups are O(log n). Unlike `HashMap` it does not hash — it compares, so keys only need `Ord`. Use it when you need sorted iteration or a range query (`range(a..b)`) on top of keyed access.",
  "VecDeque": "`VecDeque<T>` is a double-ended queue: `push_front`/`pop_front` are O(1), unlike a `Vec` where front inserts are O(n). It is the right structure for FIFO queues and work-list algorithms. `push_back` and indexing still work, so it stays familiar while front operations get cheap.",
  "Lifetime annotations": "A lifetime annotation like `'a` records how long a reference is valid relative to other references: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str` ties the return reference to both inputs. Lifetimes exist only for the borrow checker — they are erased at runtime. They describe relationships between borrows, not how fast code runs.",
  "Elision": "Rust can infer most lifetimes, so you rarely write them: a function taking `&self` and returning a reference obviously returns a reference tied to `self`, and single-input functions have only one lifetime to return. This inference is called elision. You write explicit lifetimes when the compiler cannot guess — multiple inputs with a return reference, or structs holding references.",
  "The 'static lifetime": "`'static` is the special lifetime of data that lives for the entire program — string literals and statics. A `&'static str` never dangles because it is baked into the binary. `'static` also appears as a bound (`T: 'static`) meaning 'does not borrow anything short-lived', which is why it is common in `thread::spawn` and trait objects.",
  "Box basics": "`Box<T>` allocates a value on the heap and keeps an owning pointer to it; the box drops the value when it goes out of scope. You create one with `Box::new(value)`. Boxing adds one level of indirection — the box is the only way to store a value whose size is unknown or to own data that must outlive a function.",
  "Indirection": "Indirection means referring to data through a pointer rather than embedding it. `Box<T>`, `&T`, and `&mut T` all add a layer of indirection. That layer is what lets recursive types work — a struct field can hold a `Box<List>` of known pointer size instead of a `List` of unknown size.",
  "Recursive types": "A recursive type contains itself, which would make its size infinite: `enum List { Node(i32, Box<List>), End }` must box the recursive arm. The box has a fixed size (a pointer), so the enum has a finite layout. This is the canonical Rust linked list, and the pattern generalizes to trees and graphs.",
  "Rc<T>": "`Rc<T>` is reference-counted shared ownership for single-threaded use: clone it to get another owner, and the value is freed when the last `Rc` drops. It is how Rust expresses 'many places need this value, none owns it alone.' `Rc` is not thread-safe — its thread-safe sibling is `Arc`.",
  "RefCell<T>": "`RefCell<T>` moves the borrow check from compile time to runtime: `borrow()` and `borrow_mut()` return guards that panic if the borrow rules are violated at run time. It gives interior mutability — a value that can change through a shared reference. The trade is that misuse surfaces as a panic instead of a compile error.",
  "Interior mutability": "Interior mutability is the pattern of mutating through a shared reference, using a type like `RefCell` or `Mutex` whose checks happen at runtime instead of compile time. It is necessary for `Rc` graphs, caches, and `Cell`-style counters. The compiler cannot verify the rules statically here, so the runtime guard takes over — and panics if you break them.",
  "thread::spawn": "`std::thread::spawn` starts a new OS thread running a closure, returning a `JoinHandle`. The spawned closure must be `'static` and own its captures — hence the `move` keyword. `handle.join()` blocks the caller until the thread finishes and returns its result. Spawning is cheap but not free, so threads fit coarse-grained parallelism best.",
  "move closures": "`move` forces a closure to take ownership of the variables it captures instead of borrowing them. Threads need this: the closure outlives the scope that created it, so borrowed data could dangle. With `move`, the thread owns its inputs outright. It is the standard prefix on every closure passed to `thread::spawn`.",
  "join": "`join()` blocks the calling thread until the spawned thread finishes, returning the thread's final value wrapped in a `Result`. Joining is how you collect results and how you guarantee all work completed before moving on. A thread that is never joined runs independently to completion, but joining is where errors and values come back.",
  "mpsc::channel": "`std::sync::mpsc::channel()` creates a message channel — `mpsc` means multiple producers, single consumer. It returns a `(Sender, Receiver)` pair. `Sender` clones for multiple producers; `Receiver` is single. Channels decouple threads: they communicate by sending values rather than sharing memory.",
  "Sender and Receiver": "The `Sender` sends values into the channel; the `Receiver` pulls them out. `tx.send(value)` returns a `Result` — sending fails only if the receiver is dropped. `rx.recv()` blocks until a message arrives, while `try_recv()` returns immediately with whatever is pending. Ownership of values flows across the channel, so no borrowing crosses threads.",
  "Sending messages": "Send with `tx.send(value)` and receive with `rx.recv()`. Messages move through the channel, preserving order. Channels are the idiomatic 'don't share state, share messages' tool in Rust: each thread owns its data and hands it off. They also naturally express producer/consumer and pipeline patterns.",
  "Mutex<T>": "`Mutex<T>` wraps a value so only one thread can access it at a time; the lock guarantees mutual exclusion. To touch the value you lock the mutex and get a guard that dereferences to the data. `Mutex` replaces shared mutable state across threads — the compiler forbids plain shared mutation, so the mutex is the sanctioned route.",
  "Locking": "`counter.lock()` blocks until the mutex is free, returning a `MutexGuard` that dereferences to the inner value and unlocks automatically when dropped. Holding a lock across an `await` or for a long computation risks contention and deadlock, so lock briefly and drop the guard. `unwrap()` on the lock result handles the poisoned-mutex case.",
  "Arc<T>": "`Arc<T>` is `Rc` made thread-safe: atomic reference counting for shared ownership across threads. Clone it into each thread with `Arc::clone(&counter)`, and the value lives until the last clone drops. `Arc` alone gives immutable sharing — pair it with `Mutex` for shared mutable state across threads.",
  "dyn Trait": "`dyn Trait` is a trait object: a reference to any type implementing the trait, dispatched dynamically through a vtable at runtime. `&dyn Speak` and `Box<dyn Speak>` let a collection hold mixed concrete types behind one interface. This is the opposite of generics — runtime polymorphism instead of compile-time specialization, at the cost of a pointer indirection per call.",
  "Box<dyn Trait>": "`Box<dyn Speak>` is a trait object on the heap: `Box::new(Dog)` and `Box::new(Cat)` both coerce to it. The vector `Vec<Box<dyn Speak>>` can then hold dogs and cats together and call `.speak()` on each. This is how heterogeneous collections of related types are expressed in Rust.",
  "Object safety": "Not every trait can be a trait object: it must be object-safe, meaning no generic methods and no returning `Self` by value — methods that cannot be dispatched through a vtable. Object safety is a compile-time property, and the compiler explains the violation when a `dyn Trait` fails. Keep trait objects for simple, uniform behavior.",
  "vec! and format!": "`vec![1, 2, 3]` and `format!(\"...\")` are macros — they look like functions but expand into code at compile time. `vec!` expands to an expression that builds a `Vec`, and `format!` to code that builds a `String`. The `!` is the tell: macros in Rust always carry it.",
  "Declarative macros": "`macro_rules!` defines a declarative macro by matching input patterns and expanding them into code: `macro_rules! greet { ($name:expr) => { format!(\"Hello, {}!\", $name) } }`. The macro matches the `$name:expr` fragment and splices it into the expansion. This is pattern-based metaprogramming — you describe the shape, the compiler does the substitution.",
  "When to write one": "Reach for a macro when plain code is impossible or absurdly repetitive — code that must be written many times with only names changing, or syntax that functions cannot express. Standard-library workhorses like `vec!`, `println!`, and `assert_eq!` are macros for these reasons. For ordinary one-off logic, a function is clearer: macros are harder to read, debug, and document.",
  "Chained iterators": "Chaining `.iter().filter(...).map(...).sum()` builds a pipeline where each adapter transforms the stream. The chain is lazy — filters and maps record what to do, and the terminal call (`sum`, `collect`) drives the whole thing. Chained iterators read top-to-bottom as a spec of the result and compile to tight loops.",
  "Declarative pipelines": "A declarative pipeline describes what the result should be rather than the steps to build it: `data.iter().filter(odd).map(times_ten).sum()` names the transformation, not the loop variables. This style is easier to reason about and test, and it eliminates whole categories of index and mutation bugs. It is the idiomatic way to process data in Rust.",
  "Immutability": "Rust defaults to immutable bindings and makes mutation explicit with `mut`. Functional style leans in further: derive new values from old ones rather than changing them in place, which keeps every step observable and reversible. Because the language guarantees no hidden mutation through shared references, immutable pipelines are safe by construction.",
  "Project structure": "A real Rust CLI project keeps the entry point in `src/main.rs`, moves logic into modules and a `lib.rs` when shared, and lets `Cargo.toml` declare the crate. Small binaries can live in one file; anything with real surface grows modules. The `main` function stays thin — parse input, call into logic, print results — so the tool is testable.",
  "Reading arguments": "`env::args()` returns an iterator of command-line arguments as `String`s; `skip(1)` drops the program name, leaving the real arguments. Collect into a `Vec<String>` and parse them — flags, positionals, and options — before doing work. For serious CLIs, the `clap` crate parses arguments into typed structures, but `std::env` is the from-scratch foundation.",
  "cli args via std::env": "`std::env::args()` is the standard-library entry point for command-line input. It yields every token after the program name, so `my_tool alpha beta` gives `[\"alpha\", \"beta\"]`. Argument parsing is where a script becomes a tool: validate counts, parse numbers, and produce clear errors before touching real work.",
};

/* ─── Quiz map ─── */

const RUST_QUIZ_MAP: Record<string, { q: string; opts: { id: string; text: string; correct?: boolean }[] }> = {
  "fn main": {
    q: "Where does a Rust program start executing?",
    opts: [
      { id: "a", text: "In fn main — the program entry point", correct: true },
      { id: "b", text: "At the first line of the file", correct: false },
      { id: "c", text: "In an init function from std", correct: false },
      { id: "d", text: "Anywhere marked with #[start]", correct: false },
    ],
  },
  "println!": {
    q: "What does println! do?",
    opts: [
      { id: "a", text: "Prints a line to standard output, appending a newline", correct: true },
      { id: "b", text: "Prints without a newline", correct: false },
      { id: "c", text: "Returns the printed string", correct: false },
      { id: "d", text: "Writes to a log file", correct: false },
    ],
  },
  "let and mut": {
    q: "Which variable can be reassigned?",
    opts: [
      { id: "a", text: "One declared with let mut", correct: true },
      { id: "b", text: "One declared with plain let", correct: false },
      { id: "c", text: "Any variable", correct: false },
      { id: "d", text: "Constants only", correct: false },
    ],
  },
  "Shadowing": {
    q: "What does shadowing do?",
    opts: [
      { id: "a", text: "Reuses a name with a new binding", correct: true },
      { id: "b", text: "Deletes the old variable", correct: false },
      { id: "c", text: "Changes a variable's type at runtime", correct: false },
      { id: "d", text: "Is the same as mutating", correct: false },
    ],
  },
  "Scalar types": {
    q: "Which of these is NOT a scalar type in Rust?",
    opts: [
      { id: "a", text: "String", correct: true },
      { id: "b", text: "Integer", correct: false },
      { id: "c", text: "Float", correct: false },
      { id: "d", text: "Boolean", correct: false },
    ],
  },
  "Integer types": {
    q: "Which type holds a 32-bit unsigned integer?",
    opts: [
      { id: "a", text: "u32", correct: true },
      { id: "b", text: "i32", correct: false },
      { id: "c", text: "u64", correct: false },
      { id: "d", text: "i16", correct: false },
    ],
  },
  "Arithmetic operators": {
    q: "What does % compute in Rust?",
    opts: [
      { id: "a", text: "The remainder", correct: true },
      { id: "b", text: "Division", correct: false },
      { id: "c", text: "Modulo of floats only", correct: false },
      { id: "d", text: "Bitwise AND", correct: false },
    ],
  },
  "Integer division": {
    q: "What is 7 / 2 when both operands are i32?",
    opts: [
      { id: "a", text: "3", correct: true },
      { id: "b", text: "3.5", correct: false },
      { id: "c", text: "4", correct: false },
      { id: "d", text: "A compile error", correct: false },
    ],
  },
  "&str literals": {
    q: "A string literal like \"hello\" has the type:",
    opts: [
      { id: "a", text: "&str", correct: true },
      { id: "b", text: "String", correct: false },
      { id: "c", text: "char", correct: false },
      { id: "d", text: "Vec<char>", correct: false },
    ],
  },
  "The String type": {
    q: "How do you create a growable String?",
    opts: [
      { id: "a", text: "String::from(\"hi\")", correct: true },
      { id: "b", text: "vec![\"h\", \"i\"]", correct: false },
      { id: "c", text: "\"hi\".into_pointer()", correct: false },
      { id: "d", text: "new(&str)", correct: false },
    ],
  },
  "if expressions": {
    q: "An if expression without an else evaluates to:",
    opts: [
      { id: "a", text: "() — the unit type", correct: true },
      { id: "b", text: "nil", correct: false },
      { id: "c", text: "false", correct: false },
      { id: "d", text: "A compile error", correct: false },
    ],
  },
  "else if chains": {
    q: "In an else if chain, which branch runs?",
    opts: [
      { id: "a", text: "The first whose condition is true", correct: true },
      { id: "b", text: "All matching branches", correct: false },
      { id: "c", text: "The last one", correct: false },
      { id: "d", text: "The one with the most code", correct: false },
    ],
  },
  "loop": {
    q: "What does loop { ... } do?",
    opts: [
      { id: "a", text: "Repeats forever until a break", correct: true },
      { id: "b", text: "Runs exactly once", correct: false },
      { id: "c", text: "Iterates over a range", correct: false },
      { id: "d", text: "Needs a condition to compile", correct: false },
    ],
  },
  "while loops": {
    q: "while cond { ... } tests its condition:",
    opts: [
      { id: "a", text: "Before each iteration", correct: true },
      { id: "b", text: "After each iteration", correct: false },
      { id: "c", text: "Only once", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "match arms": {
    q: "Each match arm is made of:",
    opts: [
      { id: "a", text: "A pattern and an expression", correct: true },
      { id: "b", text: "A condition and a label", correct: false },
      { id: "c", text: "A case and a break", correct: false },
      { id: "d", text: "A loop and a body", correct: false },
    ],
  },
  "Exhaustiveness": {
    q: "Why must match cover every possibility?",
    opts: [
      { id: "a", text: "The compiler enforces it — no missed cases", correct: true },
      { id: "b", text: "It runs faster", correct: false },
      { id: "c", text: "It is only a style rule", correct: false },
      { id: "d", text: "Only for enums with two variants", correct: false },
    ],
  },
  "The ownership rules": {
    q: "Each value in Rust has:",
    opts: [
      { id: "a", text: "Exactly one owner", correct: true },
      { id: "b", text: "Zero or more owners", correct: false },
      { id: "c", text: "An unlimited owner count", correct: false },
      { id: "d", text: "A runtime reference count", correct: false },
    ],
  },
  "Move semantics": {
    q: "After let t = s; with a String, what happens?",
    opts: [
      { id: "a", text: "s is moved and cannot be used again", correct: true },
      { id: "b", text: "s is copied and both work", correct: false },
      { id: "c", text: "Both bindings own the value", correct: false },
      { id: "d", text: "A compile warning only", correct: false },
    ],
  },
  "References": {
    q: "What type does &s have when s is a String?",
    opts: [
      { id: "a", text: "&String", correct: true },
      { id: "b", text: "String", correct: false },
      { id: "c", text: "&mut String", correct: false },
      { id: "d", text: "str", correct: false },
    ],
  },
  "Mutable references": {
    q: "How many mutable references to a value can exist at once?",
    opts: [
      { id: "a", text: "One", correct: true },
      { id: "b", text: "Two", correct: false },
      { id: "c", text: "As many as you want", correct: false },
      { id: "d", text: "None", correct: false },
    ],
  },
  "Slice syntax": {
    q: "What does &arr[1..4] give you?",
    opts: [
      { id: "a", text: "A view of elements at indices 1 to 3", correct: true },
      { id: "b", text: "A copy of the array", correct: false },
      { id: "c", text: "Elements at indices 1 to 4 inclusive", correct: false },
      { id: "d", text: "The whole array", correct: false },
    ],
  },
  "String slices": {
    q: "&s[..5] is a reference to:",
    opts: [
      { id: "a", text: "The first 5 bytes of s", correct: true },
      { id: "b", text: "The first 5 characters of s", correct: false },
      { id: "c", text: "The whole string", correct: false },
      { id: "d", text: "A new owned string", correct: false },
    ],
  },
  "Defining structs": {
    q: "How do you define a struct?",
    opts: [
      { id: "a", text: "struct Name { field: Type }", correct: true },
      { id: "b", text: "class Name { }", correct: false },
      { id: "c", text: "def Name:", correct: false },
      { id: "d", text: "type Name = { field: Type }", correct: false },
    ],
  },
  "Instantiating": {
    q: "How do you create a struct value?",
    opts: [
      { id: "a", text: "Name { field: value }", correct: true },
      { id: "b", text: "Name(field)", correct: false },
      { id: "c", text: "new Name(field)", correct: false },
      { id: "d", text: "Name[field]", correct: false },
    ],
  },
  "Defining enums": {
    q: "An enum can hold:",
    opts: [
      { id: "a", text: "Multiple variants, each possibly with data", correct: true },
      { id: "b", text: "Only simple constants", correct: false },
      { id: "c", text: "Only two values", correct: false },
      { id: "d", text: "Only integers", correct: false },
    ],
  },
  "Option<T>": {
    q: "What is Option<T>?",
    opts: [
      { id: "a", text: "A value that is either Some(T) or None", correct: true },
      { id: "b", text: "A nullable pointer", correct: false },
      { id: "c", text: "A default value", correct: false },
      { id: "d", text: "An error type", correct: false },
    ],
  },
  "if let": {
    q: "if let Some(x) = opt { ... } runs the block when:",
    opts: [
      { id: "a", text: "opt matches Some(x)", correct: true },
      { id: "b", text: "opt is None", correct: false },
      { id: "c", text: "x is zero", correct: false },
      { id: "d", text: "The pattern never matches", correct: false },
    ],
  },
  "while let": {
    q: "while let is especially handy for:",
    opts: [
      { id: "a", text: "Repeatedly popping from a collection", correct: true },
      { id: "b", text: "Infinite loops", correct: false },
      { id: "c", text: "Counting to a fixed bound", correct: false },
      { id: "d", text: "Iterating an array", correct: false },
    ],
  },
  "impl blocks": {
    q: "Where do methods for a type live?",
    opts: [
      { id: "a", text: "In impl blocks for the type", correct: true },
      { id: "b", text: "Inside the struct definition", correct: false },
      { id: "c", text: "In a separate trait file", correct: false },
      { id: "d", text: "Nowhere — Rust has no methods", correct: false },
    ],
  },
  "Method syntax": {
    q: "What does self refer to inside a method?",
    opts: [
      { id: "a", text: "The instance the method is called on", correct: true },
      { id: "b", text: "The module", correct: false },
      { id: "c", text: "The type itself, always", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Defining traits": {
    q: "A trait declares:",
    opts: [
      { id: "a", text: "Behavior (method signatures) types can share", correct: true },
      { id: "b", text: "A memory layout", correct: false },
      { id: "c", text: "Instance fields", correct: false },
      { id: "d", text: "Only associated constants", correct: false },
    ],
  },
  "Implementing traits": {
    q: "How do you make a type implement a trait?",
    opts: [
      { id: "a", text: "impl MyTrait for MyType { }", correct: true },
      { id: "b", text: "class MyType extends MyTrait", correct: false },
      { id: "c", text: "MyType: MyTrait", correct: false },
      { id: "d", text: "trait impl MyType", correct: false },
    ],
  },
  "Generic functions": {
    q: "fn id<T>(x: T) -> T means:",
    opts: [
      { id: "a", text: "T is a type parameter fixed at the call site", correct: true },
      { id: "b", text: "T is a runtime value", correct: false },
      { id: "c", text: "T is always i32", correct: false },
      { id: "d", text: "T is an error type", correct: false },
    ],
  },
  "Type parameters": {
    q: "Generic code with type parameter T is compiled:",
    opts: [
      { id: "a", text: "Separately for each concrete type (monomorphized)", correct: true },
      { id: "b", text: "Once, using dynamic dispatch", correct: false },
      { id: "c", text: "Only for integers", correct: false },
      { id: "d", text: "Never — it stays abstract", correct: false },
    ],
  },
  "Creating Vecs": {
    q: "vec![1, 2, 3] creates:",
    opts: [
      { id: "a", text: "A Vec<i32> with three elements", correct: true },
      { id: "b", text: "A fixed array", correct: false },
      { id: "c", text: "A range 1..3", correct: false },
      { id: "d", text: "A linked list", correct: false },
    ],
  },
  "push and indexing": {
    q: "What does nums[0] give you when nums is a Vec<i32>?",
    opts: [
      { id: "a", text: "A copy of the first element", correct: true },
      { id: "b", text: "A reference you must deref", correct: false },
      { id: "c", text: "The length", correct: false },
      { id: "d", text: "The last element", correct: false },
    ],
  },
  "Inserting": {
    q: "How do you add a key-value pair to a HashMap?",
    opts: [
      { id: "a", text: "scores.insert(key, value)", correct: true },
      { id: "b", text: "scores.add(key, value)", correct: false },
      { id: "c", text: "scores.set(key, value)", correct: false },
      { id: "d", text: "scores.push(key, value)", correct: false },
    ],
  },
  "Getting values": {
    q: "What does scores[key] do when the key is missing?",
    opts: [
      { id: "a", text: "Panics — the key must exist", correct: true },
      { id: "b", text: "Returns None", correct: false },
      { id: "c", text: "Returns 0", correct: false },
      { id: "d", text: "Inserts a default", correct: false },
    ],
  },
  "match on Option": {
    q: "match maybe { Some(n) => n, None => 0 } does:",
    opts: [
      { id: "a", text: "Extracts the value, using 0 for None", correct: true },
      { id: "b", text: "Panics on None", correct: false },
      { id: "c", text: "Returns the Option unchanged", correct: false },
      { id: "d", text: "Converts to a string", correct: false },
    ],
  },
  "unwrap and expect": {
    q: "unwrap() called on a None:",
    opts: [
      { id: "a", text: "Panics with a default message", correct: true },
      { id: "b", text: "Returns 0", correct: false },
      { id: "c", text: "Returns None", correct: false },
      { id: "d", text: "Does nothing", correct: false },
    ],
  },
  "Result<T, E>": {
    q: "Result has which variants?",
    opts: [
      { id: "a", text: "Ok(T) and Err(E)", correct: true },
      { id: "b", text: "Some and None", correct: false },
      { id: "c", text: "Success and Failure classes", correct: false },
      { id: "d", text: "Left and Right", correct: false },
    ],
  },
  "Returning errors": {
    q: "To signal failure from a function returning Result:",
    opts: [
      { id: "a", text: "Return Err(value)", correct: true },
      { id: "b", text: "Throw an exception", correct: false },
      { id: "c", text: "Return 0", correct: false },
      { id: "d", text: "Panic the program", correct: false },
    ],
  },
  "Closure syntax": {
    q: "Which of these is a valid Rust closure?",
    opts: [
      { id: "a", text: "|x| x + 1", correct: true },
      { id: "b", text: "fn(x) { x + 1 }", correct: false },
      { id: "c", text: "lambda x: x + 1", correct: false },
      { id: "d", text: "x => x + 1", correct: false },
    ],
  },
  "Capturing": {
    q: "A closure that uses base from the enclosing scope:",
    opts: [
      { id: "a", text: "Captures it by reference or value automatically", correct: true },
      { id: "b", text: "Cannot use outer variables", correct: false },
      { id: "c", text: "Always copies it", correct: false },
      { id: "d", text: "Must declare it again inside", correct: false },
    ],
  },
  "The Iterator trait": {
    q: "What does calling iter() on a Vec give you?",
    opts: [
      { id: "a", text: "An iterator yielding references to items", correct: true },
      { id: "b", text: "A copy of the vector", correct: false },
      { id: "c", text: "The first item", correct: false },
      { id: "d", text: "The vector's length", correct: false },
    ],
  },
  "map and filter": {
    q: "iter().map(f).collect() returns:",
    opts: [
      { id: "a", text: "A new collection with f applied to each item", correct: true },
      { id: "b", text: "The original collection mutated", correct: false },
      { id: "c", text: "A single reduced value", correct: false },
      { id: "d", text: "A boolean", correct: false },
    ],
  },
  "mod declarations": {
    q: "mod math { ... } declares:",
    opts: [
      { id: "a", text: "A module named math", correct: true },
      { id: "b", text: "A struct named math", correct: false },
      { id: "c", text: "An import", correct: false },
      { id: "d", text: "A macro", correct: false },
    ],
  },
  "pub visibility": {
    q: "Items are private to their module by default, meaning:",
    opts: [
      { id: "a", text: "Only the module and its children can see them", correct: true },
      { id: "b", text: "Everyone can see them", correct: false },
      { id: "c", text: "They are exported to all crates", correct: false },
      { id: "d", text: "They are removed at compile time", correct: false },
    ],
  },
  "cargo new": {
    q: "cargo new my_app creates:",
    opts: [
      { id: "a", text: "A project with Cargo.toml and src/main.rs", correct: true },
      { id: "b", text: "A single binary file", correct: false },
      { id: "c", text: "An empty folder", correct: false },
      { id: "d", text: "A library only", correct: false },
    ],
  },
  "Cargo.toml": {
    q: "Where are dependencies declared?",
    opts: [
      { id: "a", text: "In [dependencies] inside Cargo.toml", correct: true },
      { id: "b", text: "In package.json", correct: false },
      { id: "c", text: "At the top of main.rs", correct: false },
      { id: "d", text: "In the terminal command", correct: false },
    ],
  },
  "#[test]": {
    q: "A #[test] function runs:",
    opts: [
      { id: "a", text: "Under cargo test", correct: true },
      { id: "b", text: "Every time main runs", correct: false },
      { id: "c", text: "At compile time", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "assert! macros": {
    q: "assert_eq!(a, b) fails when:",
    opts: [
      { id: "a", text: "a != b", correct: true },
      { id: "b", text: "a == b", correct: false },
      { id: "c", text: "The program starts", correct: false },
      { id: "d", text: "a is true", correct: false },
    ],
  },
  "Display vs Debug": {
    q: "Which formatting trait does {:?} use?",
    opts: [
      { id: "a", text: "Debug", correct: true },
      { id: "b", text: "Display", correct: false },
      { id: "c", text: "Show", correct: false },
      { id: "d", text: "ToString", correct: false },
    ],
  },
  "Positional arguments": {
    q: "In format!(\"{} {}\", a, b):",
    opts: [
      { id: "a", text: "a fills the first {} and b the second", correct: true },
      { id: "b", text: "Both fill the first placeholder", correct: false },
      { id: "c", text: "Order is random", correct: false },
      { id: "d", text: "It does not compile", correct: false },
    ],
  },
  "to_uppercase and trim": {
    q: "What does trim() remove?",
    opts: [
      { id: "a", text: "Whitespace from both ends", correct: true },
      { id: "b", text: "Only leading spaces", correct: false },
      { id: "c", text: "All whitespace everywhere", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "split and replace": {
    q: "\"a,b,c\".split(',').collect::<Vec<_>>() gives:",
    opts: [
      { id: "a", text: "A vec of three parts", correct: true },
      { id: "b", text: "A single joined string", correct: false },
      { id: "c", text: "The original string", correct: false },
      { id: "d", text: "A count of parts", correct: false },
    ],
  },
  "Tuple types": {
    q: "What type is (3, 5)?",
    opts: [
      { id: "a", text: "(i32, i32)", correct: true },
      { id: "b", text: "An array", correct: false },
      { id: "c", text: "Vec<i32>", correct: false },
      { id: "d", text: "(3, 5)", correct: false },
    ],
  },
  "Destructuring": {
    q: "let (x, y) = point; does what?",
    opts: [
      { id: "a", text: "Binds x and y to the tuple's elements", correct: true },
      { id: "b", text: "Copies the tuple", correct: false },
      { id: "c", text: "Creates a new tuple", correct: false },
      { id: "d", text: "Errors", correct: false },
    ],
  },
  "HashSet": {
    q: "Inserting a duplicate into a HashSet:",
    opts: [
      { id: "a", text: "Does nothing — values stay unique", correct: true },
      { id: "b", text: "Replaces the existing value", correct: false },
      { id: "c", text: "Panics", correct: false },
      { id: "d", text: "Creates a second entry", correct: false },
    ],
  },
  "BTreeMap": {
    q: "Iterating a BTreeMap visits its keys:",
    opts: [
      { id: "a", text: "In sorted order", correct: true },
      { id: "b", text: "In insertion order", correct: false },
      { id: "c", text: "In random order", correct: false },
      { id: "d", text: "Always in reverse", correct: false },
    ],
  },
  "Lifetime annotations": {
    q: "A lifetime annotation like 'a tells the compiler:",
    opts: [
      { id: "a", text: "How long references are valid", correct: true },
      { id: "b", text: "How fast code runs", correct: false },
      { id: "c", text: "The value's type", correct: false },
      { id: "d", text: "How much memory to use", correct: false },
    ],
  },
  "Elision": {
    q: "When can you omit lifetime annotations?",
    opts: [
      { id: "a", text: "When the compiler can infer them", correct: true },
      { id: "b", text: "Never", correct: false },
      { id: "c", text: "Always, even when ambiguous", correct: false },
      { id: "d", text: "Only for integers", correct: false },
    ],
  },
  "Box basics": {
    q: "Box<T> stores a value:",
    opts: [
      { id: "a", text: "On the heap, with an owning pointer", correct: true },
      { id: "b", text: "On the stack always", correct: false },
      { id: "c", text: "In a register", correct: false },
      { id: "d", text: "In a global", correct: false },
    ],
  },
  "Indirection": {
    q: "Why do recursive types need Box?",
    opts: [
      { id: "a", text: "Their size would otherwise be infinite", correct: true },
      { id: "b", text: "They are too slow on the stack", correct: false },
      { id: "c", text: "The compiler prefers the heap", correct: false },
      { id: "d", text: "Enum syntax requires it", correct: false },
    ],
  },
  "Rc<T>": {
    q: "Rc<T> allows:",
    opts: [
      { id: "a", text: "Multiple owners via shared ownership", correct: true },
      { id: "b", text: "Multiple mutable owners", correct: false },
      { id: "c", text: "Thread safety", correct: false },
      { id: "d", text: "No ownership at all", correct: false },
    ],
  },
  "RefCell<T>": {
    q: "RefCell checks borrows:",
    opts: [
      { id: "a", text: "At runtime, not compile time", correct: true },
      { id: "b", text: "At compile time", correct: false },
      { id: "c", text: "Never", correct: false },
      { id: "d", text: "Only in debug builds", correct: false },
    ],
  },
  "thread::spawn": {
    q: "thread::spawn returns:",
    opts: [
      { id: "a", text: "A JoinHandle you can join", correct: true },
      { id: "b", text: "A thread id", correct: false },
      { id: "c", text: "The thread's return value directly", correct: false },
      { id: "d", text: "A channel", correct: false },
    ],
  },
  "move closures": {
    q: "The move keyword before a closure passed to spawn:",
    opts: [
      { id: "a", text: "Moves captured values into the thread", correct: true },
      { id: "b", text: "Copies all values", correct: false },
      { id: "c", text: "Prevents capture", correct: false },
      { id: "d", text: "Turns it into a function", correct: false },
    ],
  },
  "mpsc::channel": {
    q: "mpsc stands for:",
    opts: [
      { id: "a", text: "Multiple producers, single consumer", correct: true },
      { id: "b", text: "Multiple producers, multiple consumers", correct: false },
      { id: "c", text: "Single producer, single consumer", correct: false },
      { id: "d", text: "Message processing system", correct: false },
    ],
  },
  "Sender and Receiver": {
    q: "Which side pulls messages out of a channel?",
    opts: [
      { id: "a", text: "The Receiver", correct: true },
      { id: "b", text: "The Sender", correct: false },
      { id: "c", text: "Both", correct: false },
      { id: "d", text: "Neither", correct: false },
    ],
  },
  "Mutex<T>": {
    q: "Mutex ensures:",
    opts: [
      { id: "a", text: "Only one thread holds the value at a time", correct: true },
      { id: "b", text: "The value is always copied", correct: false },
      { id: "c", text: "The value is immutable", correct: false },
      { id: "d", text: "Threads never block", correct: false },
    ],
  },
  "Locking": {
    q: "What does lock() return?",
    opts: [
      { id: "a", text: "A guard that grants access to the value", correct: true },
      { id: "b", text: "The value directly", correct: false },
      { id: "c", text: "A boolean", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "dyn Trait": {
    q: "dyn Trait enables:",
    opts: [
      { id: "a", text: "Dynamic dispatch through a vtable", correct: true },
      { id: "b", text: "Compile-time monomorphization", correct: false },
      { id: "c", text: "Zero-cost iteration", correct: false },
      { id: "d", text: "Reflection", correct: false },
    ],
  },
  "Box<dyn Trait>": {
    q: "Box<dyn Speak> can hold:",
    opts: [
      { id: "a", text: "Any value implementing Speak, on the heap", correct: true },
      { id: "b", text: "Only one concrete type", correct: false },
      { id: "c", text: "A Speak instance by value", correct: false },
      { id: "d", text: "A slice", correct: false },
    ],
  },
  "vec! and format!": {
    q: "vec![1, 2, 3] is:",
    opts: [
      { id: "a", text: "A macro call that builds a Vec", correct: true },
      { id: "b", text: "A plain function call", correct: false },
      { id: "c", text: "An array literal", correct: false },
      { id: "d", text: "A loop", correct: false },
    ],
  },
  "Declarative macros": {
    q: "macro_rules! defines a macro by:",
    opts: [
      { id: "a", text: "Matching input patterns to output code", correct: true },
      { id: "b", text: "Running arbitrary Rust at compile time", correct: false },
      { id: "c", text: "Using proc_macro attributes", correct: false },
      { id: "d", text: "Calling a function", correct: false },
    ],
  },
  "Chained iterators": {
    q: "data.iter().filter(f).map(g) runs:",
    opts: [
      { id: "a", text: "Lazily, producing values on demand", correct: true },
      { id: "b", text: "Eagerly into a Vec", correct: false },
      { id: "c", text: "In parallel", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "Declarative pipelines": {
    q: "A declarative pipeline describes:",
    opts: [
      { id: "a", text: "What the result should be, not the steps", correct: true },
      { id: "b", text: "The exact machine instructions", correct: false },
      { id: "c", text: "A list of statements that mutate", correct: false },
      { id: "d", text: "An object graph", correct: false },
    ],
  },
  "Project structure": {
    q: "A typical Rust CLI project has:",
    opts: [
      { id: "a", text: "src/main.rs as the entry point", correct: true },
      { id: "b", text: "index.html as the entry", correct: false },
      { id: "c", text: "One huge file for everything", correct: false },
      { id: "d", text: "No structure", correct: false },
    ],
  },
  "Reading arguments": {
    q: "env::args() yields:",
    opts: [
      { id: "a", text: "An iterator of command-line arguments", correct: true },
      { id: "b", text: "The current working directory", correct: false },
      { id: "c", text: "The PATH variable", correct: false },
      { id: "d", text: "Environment config", correct: false },
    ],
  },
};

const RUST_EXPECTED_OUTPUT: Record<number, string> = {
  1: "Hello, Rust!",
  2: "original 5",
  3: "42 7 3.5 true R",
  4: "13 7 30 3 1",
  5: "Hello, Ada!",
  6: "B",
  7: "3",
  8: "starting",
  9: "hello",
  10: "hello world 5",
  11: "hello",
  12: "Ada is 36",
  13: "blue",
  14: "theme: dark",
  15: "12.56636",
  16: "Woof",
  17: "9",
  18: "3",
  19: "95",
  20: "10",
  21: "5",
  22: "6",
  23: "[1, 4, 9, 16, 25]",
  24: "42",
  27: "(3, 5)",
  28: "hello world",
  29: "3 5",
  30: "2",
  31: "longer",
  32: "2",
  38: "3",
  39: "100",
};

/* ─── Content generators ─── */

function generateRustTopicContent(topic: string, title: string, day: number): string {
  const cached = RUST_TOPIC_CONTENT[topic];
  if (cached) return cached;

  const level = getLevelForDay(day);
  return (
    `Day ${day} introduces "${topic}" within the context of ${title}. ` +
    `This concept is part of the Rust track at the ${level} proficiency tier. ` +
    `It builds on the language's ownership-based memory model — understand how ${topic} ` +
    `interacts with the surrounding language features, then extend the template to solidify it.`
  );
}

function generateRustExercises(day: number, blueprint: RustBlueprint): Lesson["exercises"] {
  const prefix = `rust${day}`;
  const topics = blueprint.theoryTopics;

  const quizzes: Lesson["exercises"] = [];
  const usedTopics = new Set<string>();

  for (let i = 0; i < Math.min(topics.length, 2); i++) {
    const topic = topics[i];
    const entry = RUST_QUIZ_MAP[topic];
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
      question: "Which of these is the idiomatic Rust way to handle an optional value?",
      options: [
        { id: "a", text: "match on the Option, covering Some and None", correct: true },
        { id: "b", text: "check if the value is truthy", correct: false },
        { id: "c", text: "convert it to a string and compare", correct: false },
        { id: "d", text: "cast it to 0", correct: false },
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
    expectedOutput: RUST_EXPECTED_OUTPUT[day],
    hints: [
      "Review the theory section for each topic",
      "Run the code in the playground to see the baseline",
      "Extend it: add inputs, edge cases, or a second example",
    ],
    xpReward: 50,
  });

  return quizzes;
}

function generateRustAssignment(day: number, blueprint: RustBlueprint): Lesson["assignment"] {
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

export function buildRustLesson(day: number): Lesson {
  const blueprint = RUST_CURRICULUM[day - 1];
  if (!blueprint) throw new Error(`No Rust lesson for day ${day}`);

  return {
    day,
    title: blueprint.title,
    subtitle: blueprint.subtitle,
    language: "rust",
    track: "rust",
    level: getLevelForDay(day),
    durationMinutes: 45 + (day % 3) * 15,
    xpTotal: 200,
    tags: blueprint.tags,
    theory: {
      sections: blueprint.theoryTopics.map((topic, i) => ({
        heading: topic,
        content: generateRustTopicContent(topic, blueprint.title, day),
        codeExample: i === 0 ? blueprint.codeTemplate : undefined,
      })),
    },
    playground: {
      defaultCode: blueprint.codeTemplate,
      language: "rust",
      runnable: true,
    },
    exercises: generateRustExercises(day, blueprint),
    assignment: generateRustAssignment(day, blueprint),
  };
}
