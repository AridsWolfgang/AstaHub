import type { Lesson } from "../../types";
import { getLevelForDay } from "../../types";

/* ─── C++ blueprints: Days 1–40 ─── */

interface CppBlueprint {
  title: string;
  subtitle: string;
  language: "cpp";
  tags: string[];
  theoryTopics: string[];
  codeTemplate: string;
}

const CPP_CURRICULUM: CppBlueprint[] = [
  {
    title: "Hello, C++",
    subtitle: "iostream, cout, and your first program",
    language: "cpp",
    tags: ["hello-world", "iostream"],
    theoryTopics: ["Why C++", "The iostream library", "main() and the build pipeline"],
    codeTemplate: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Variables & Fundamental Types",
    subtitle: "int, double, char, bool, and initialization",
    language: "cpp",
    tags: ["types", "variables"],
    theoryTopics: ["Fundamental types", "Initialization syntax", "Type sizes"],
    codeTemplate: `#include <iostream>\n\nint main() {\n    int age = 30;\n    double pi = 3.14159;\n    char grade = 'A';\n    bool ready = true;\n    std::cout << age << " " << pi << " " << grade << " " << ready << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Constants & auto",
    subtitle: "Compile-time promises and type deduction",
    language: "cpp",
    tags: ["constants", "auto"],
    theoryTopics: ["const", "constexpr", "auto type deduction"],
    codeTemplate: `#include <iostream>\n\nint main() {\n    const int days = 40;\n    constexpr double rate = 9.8;\n    auto name = "Ada";\n    auto count = 42;\n    std::cout << days << " " << rate << " " << name << " " << count << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Operators & Arithmetic",
    subtitle: "+ - * / % and the rules that govern them",
    language: "cpp",
    tags: ["operators", "arithmetic"],
    theoryTopics: ["Arithmetic operators", "Integer division", "Precedence"],
    codeTemplate: `#include <iostream>\n\nint main() {\n    int a = 10, b = 3;\n    std::cout << a + b << " " << a - b << " " << a * b << std::endl;\n    std::cout << a / b << " " << a % b << std::endl;\n    std::cout << (a + b) * 2 << std::endl;\n    return 0;\n}`,
  },
  {
    title: "std::string",
    subtitle: "Text without the null-terminator headache",
    language: "cpp",
    tags: ["strings"],
    theoryTopics: ["std::string", "Concatenation & methods", "Reading and comparing"],
    codeTemplate: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string name = "Ada";\n    std::string greet = "Hello, " + name + "!";\n    std::cout << greet << std::endl;\n    std::cout << name.size() << " " << name[0] << " " << name.substr(1, 2) << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Input & Output",
    subtitle: "cin, cout, and formatting",
    language: "cpp",
    tags: ["io"],
    theoryTopics: ["std::cin", "std::cout formatting", "Reading whole lines"],
    codeTemplate: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string name;\n    std::cout << "What is your name? ";\n    std::getline(std::cin, name);\n    std::cout << "Hello, " << name << "!" << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Conditionals",
    subtitle: "if / else, switch, and boolean logic",
    language: "cpp",
    tags: ["control-flow"],
    theoryTopics: ["if / else if / else", "switch statements", "Comparison & logical operators"],
    codeTemplate: `#include <iostream>\n\nint main() {\n    int score = 85;\n    if (score >= 90) std::cout << "A\\n";\n    else if (score >= 80) std::cout << "B\\n";\n    else std::cout << "C\\n";\n    return 0;\n}`,
  },
  {
    title: "Loops",
    subtitle: "for, while, and do-while iteration",
    language: "cpp",
    tags: ["loops"],
    theoryTopics: ["for loops", "while & do-while", "break and continue"],
    codeTemplate: `#include <iostream>\n\nint main() {\n    for (int i = 0; i < 5; i++)\n        std::cout << i << " ";\n    std::cout << std::endl;\n    int n = 0;\n    while (n < 5) {\n        std::cout << n++ << " ";\n    }\n    std::cout << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Functions",
    subtitle: "Declarations, parameters, and return values",
    language: "cpp",
    tags: ["functions"],
    theoryTopics: ["Function declarations", "Parameters & return", "Pass by value vs reference"],
    codeTemplate: `#include <iostream>\n\nint square(int x) { return x * x; }\n\nvoid greet(const std::string& name) {\n    std::cout << "Hello, " << name << "!" << std::endl;\n}\n\nint main() {\n    std::cout << square(4) << std::endl;\n    greet("Ada");\n    return 0;\n}`,
  },
  {
    title: "Overloading & Defaults",
    subtitle: "One name, many signatures",
    language: "cpp",
    tags: ["functions"],
    theoryTopics: ["Function overloading", "Default arguments", "inline functions"],
    codeTemplate: `#include <iostream>\n\nint area(int w, int h) { return w * h; }\ndouble area(double r) { return 3.14159 * r * r; }\nint power(int base, int exp = 2) {\n    int r = 1;\n    for (int i = 0; i < exp; i++) r *= base;\n    return r;\n}\n\nint main() {\n    std::cout << area(3, 4) << " " << area(2.0) << std::endl;\n    std::cout << power(3) << " " << power(3, 3) << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Recursion",
    subtitle: "Functions that call themselves",
    language: "cpp",
    tags: ["recursion"],
    theoryTopics: ["Recursion basics", "Base cases", "Recursion vs iteration"],
    codeTemplate: `#include <iostream>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint fibonacci(int n) {\n    if (n < 2) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main() {\n    std::cout << factorial(5) << " " << fibonacci(10) << std::endl;\n    return 0;\n}`,
  },
  {
    title: "References",
    subtitle: "Aliases that read naturally",
    language: "cpp",
    tags: ["references"],
    theoryTopics: ["References", "const references", "References vs pointers"],
    codeTemplate: `#include <iostream>\n\nvoid swap(int& a, int& b) {\n    int t = a;\n    a = b;\n    b = t;\n}\n\nint main() {\n    int x = 1, y = 2;\n    swap(x, y);\n    std::cout << x << " " << y << std::endl;\n    int& ref = x;\n    ref = 99;\n    std::cout << x << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Pointers",
    subtitle: "Memory addresses and the & and * operators",
    language: "cpp",
    tags: ["pointers"],
    theoryTopics: ["Addresses & dereferencing", "nullptr", "Pointers and arrays"],
    codeTemplate: `#include <iostream>\n\nint main() {\n    int value = 42;\n    int* ptr = &value;\n    std::cout << *ptr << std::endl;\n    *ptr = 7;\n    std::cout << value << std::endl;\n    int* empty = nullptr;\n    std::cout << (empty == nullptr) << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Arrays & std::array",
    subtitle: "Fixed-size contiguous storage",
    language: "cpp",
    tags: ["arrays"],
    theoryTopics: ["C-style arrays", "std::array", "Bounds & iteration"],
    codeTemplate: `#include <iostream>\n#include <array>\n\nint main() {\n    int c_arr[5] = {1, 2, 3, 4, 5};\n    std::array<int, 5> arr = {10, 20, 30, 40, 50};\n    std::cout << c_arr[0] << " " << arr.at(4) << std::endl;\n    std::cout << arr.size() << std::endl;\n    return 0;\n}`,
  },
  {
    title: "std::vector",
    subtitle: "The growable dynamic array",
    language: "cpp",
    tags: ["vector", "containers"],
    theoryTopics: ["std::vector", "push_back and friends", "Iterators"],
    codeTemplate: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums;\n    nums.push_back(1);\n    nums.push_back(2);\n    nums.push_back(3);\n    nums.insert(nums.begin(), 0);\n    for (size_t i = 0; i < nums.size(); i++)\n        std::cout << nums[i] << " ";\n    std::cout << std::endl;\n    std::cout << nums.size() << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Range-based for",
    subtitle: "Iterate containers without index math",
    language: "cpp",
    tags: ["loops", "containers"],
    theoryTopics: ["Range-based for loops", "auto and references in loops", "When not to use it"],
    codeTemplate: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20, 30};\n    for (int n : nums) std::cout << n << " ";\n    std::cout << std::endl;\n    for (int& n : nums) n *= 2;\n    for (const int& n : nums) std::cout << n << " ";\n    std::cout << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Structs",
    subtitle: "Grouping related data",
    language: "cpp",
    tags: ["structs"],
    theoryTopics: ["Structs", "Member functions", "Default member initializers"],
    codeTemplate: `#include <iostream>\n#include <string>\n\nstruct Student {\n    std::string name;\n    int grade = 0;\n\n    void describe() const {\n        std::cout << name << " is in grade " << grade << std::endl;\n    }\n};\n\nint main() {\n    Student s{"Ada", 10};\n    s.describe();\n    return 0;\n}`,
  },
  {
    title: "Classes & Access Control",
    subtitle: "private, public, and encapsulation",
    language: "cpp",
    tags: ["oop"],
    theoryTopics: ["Classes", "Access specifiers", "Why encapsulation"],
    codeTemplate: `#include <iostream>\n#include <string>\n\nclass Account {\nprivate:\n    double balance_ = 0.0;\n\npublic:\n    void deposit(double amount) { if (amount > 0) balance_ += amount; }\n    double balance() const { return balance_; }\n};\n\nint main() {\n    Account acc;\n    acc.deposit(100);\n    std::cout << acc.balance() << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Constructors",
    subtitle: "Initializing objects correctly",
    language: "cpp",
    tags: ["oop"],
    theoryTopics: ["Constructors", "Member initializer lists", "Default & parameterized"],
    codeTemplate: `#include <iostream>\n#include <string>\n\nclass Person {\nprivate:\n    std::string name_;\n    int age_;\n\npublic:\n    Person(std::string name, int age) : name_(name), age_(age) {}\n\n    void introduce() const {\n        std::cout << name_ << ", age " << age_ << std::endl;\n    }\n};\n\nint main() {\n    Person p{"Ada", 36};\n    p.introduce();\n    return 0;\n}`,
  },
  {
    title: "Destructors & RAII",
    subtitle: "Resource Acquisition Is Initialization",
    language: "cpp",
    tags: ["oop", "raii"],
    theoryTopics: ["Destructors", "RAII", "The rule of three"],
    codeTemplate: `#include <iostream>\n\nclass Logger {\npublic:\n    Logger() { std::cout << "opened\\n"; }\n    ~Logger() { std::cout << "closed\\n"; }\n};\n\nint main() {\n    Logger log;\n    std::cout << "working\\n";\n    return 0;\n}`,
  },
  {
    title: "Inheritance",
    subtitle: "is-a relationships and code reuse",
    language: "cpp",
    tags: ["oop"],
    theoryTopics: ["Inheritance", "Access & overriding", "The is-a relationship"],
    codeTemplate: `#include <iostream>\n\nclass Animal {\npublic:\n    void breathe() const { std::cout << "breathing\\n"; }\n};\n\nclass Dog : public Animal {\npublic:\n    void bark() const { std::cout << "Woof!\\n"; }\n};\n\nint main() {\n    Dog dog;\n    dog.breathe();\n    dog.bark();\n    return 0;\n}`,
  },
  {
    title: "Polymorphism",
    subtitle: "virtual functions and the base pointer",
    language: "cpp",
    tags: ["oop", "polymorphism"],
    theoryTopics: ["Virtual functions", "override and virtual destructors", "Abstract classes"],
    codeTemplate: `#include <iostream>\n\nclass Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() {}\n};\n\nclass Circle : public Shape {\npublic:\n    explicit Circle(double r) : r_(r) {}\n    double area() const override { return 3.14159 * r_ * r_; }\n\nprivate:\n    double r_;\n};\n\nint main() {\n    Shape* shape = new Circle(2.0);\n    std::cout << shape->area() << std::endl;\n    delete shape;\n    return 0;\n}`,
  },
  {
    title: "Operator Overloading",
    subtitle: "Teach your types to use +, <<, and more",
    language: "cpp",
    tags: ["oop"],
    theoryTopics: ["operator+", "ostream operator<<", "Friend functions"],
    codeTemplate: `#include <iostream>\n\nstruct Point {\n    int x, y;\n\n    Point operator+(const Point& other) const {\n        return {x + other.x, y + other.y};\n    }\n};\n\nstd::ostream& operator<<(std::ostream& out, const Point& p) {\n    return out << "(" << p.x << ", " << p.y << ")";\n}\n\nint main() {\n    Point a{1, 2}, b{3, 4};\n    std::cout << a + b << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Smart Pointers",
    subtitle: "Ownership without manual delete",
    language: "cpp",
    tags: ["memory", "raii"],
    theoryTopics: ["std::unique_ptr", "std::shared_ptr", "When to use which"],
    codeTemplate: `#include <iostream>\n#include <memory>\n\nstruct Widget {\n    int value;\n    explicit Widget(int v) : value(v) {}\n};\n\nint main() {\n    auto owned = std::make_unique<Widget>(42);\n    std::cout << owned->value << std::endl;\n    auto shared = std::make_shared<Widget>(7);\n    std::cout << shared->value << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Function Templates",
    subtitle: "Write once, work for any type",
    language: "cpp",
    tags: ["templates", "generics"],
    theoryTopics: ["Template basics", "Type deduction", "Templates vs overloading"],
    codeTemplate: `#include <iostream>\n\ntemplate <typename T>\nT maximum(T a, T b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    std::cout << maximum(3, 7) << std::endl;\n    std::cout << maximum(2.5, 1.5) << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Class Templates",
    subtitle: "Containers parameterized by type",
    language: "cpp",
    tags: ["templates", "containers"],
    theoryTopics: ["Class templates", "std::vector under the hood", "Concepts (C++20)"],
    codeTemplate: `#include <iostream>\n\ntemplate <typename T>\nclass Box {\nprivate:\n    T value_;\n\npublic:\n    explicit Box(T value) : value_(value) {}\n    T get() const { return value_; }\n};\n\nint main() {\n    Box<int> integer_box(42);\n    Box<std::string> string_box("hello");\n    std::cout << integer_box.get() << " " << string_box.get() << std::endl;\n    return 0;\n}`,
  },
  {
    title: "STL Containers",
    subtitle: "map, set, unordered_map, and friends",
    language: "cpp",
    tags: ["containers", "stl"],
    theoryTopics: ["std::map & std::set", "std::unordered_map", "Choosing a container"],
    codeTemplate: `#include <iostream>\n#include <map>\n#include <unordered_map>\n\nint main() {\n    std::map<std::string, int> ages;\n    ages["Ada"] = 36;\n    ages["Bob"] = 28;\n    std::cout << ages["Ada"] << std::endl;\n    std::unordered_map<std::string, int> counts;\n    counts["apple"]++;\n    counts["apple"]++;\n    std::cout << counts["apple"] << std::endl;\n    return 0;\n}`,
  },
  {
    title: "STL Algorithms",
    subtitle: "sort, find, accumulate — the algorithmic toolbox",
    language: "cpp",
    tags: ["algorithms", "stl"],
    theoryTopics: ["sort & transform", "find & accumulate", "Iterators as glue"],
    codeTemplate: `#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\n\nint main() {\n    std::vector<int> nums = {5, 2, 8, 1, 9};\n    std::sort(nums.begin(), nums.end());\n    for (int n : nums) std::cout << n << " ";\n    std::cout << std::endl;\n    int total = std::accumulate(nums.begin(), nums.end(), 0);\n    std::cout << total << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Lambdas",
    subtitle: "Anonymous functions with captures",
    language: "cpp",
    tags: ["functional"],
    theoryTopics: ["Lambda syntax", "Captures", "Lambdas with algorithms"],
    codeTemplate: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4, 5};\n    auto is_even = [](int n) { return n % 2 == 0; };\n    int evens = std::count_if(nums.begin(), nums.end(), is_even);\n    std::cout << evens << std::endl;\n    int factor = 10;\n    auto scaled = [factor](int n) { return n * factor; };\n    std::cout << scaled(5) << std::endl;\n    return 0;\n}`,
  },
  {
    title: "File I/O",
    subtitle: "ofstream, ifstream, and string streams",
    language: "cpp",
    tags: ["files"],
    theoryTopics: ["ofstream / ifstream", "Reading files line by line", "String streams"],
    codeTemplate: `#include <iostream>\n#include <fstream>\n#include <string>\n\nint main() {\n    std::ofstream out("notes.txt");\n    out << "first line\\n";\n    out.close();\n    std::ifstream in("notes.txt");\n    std::string line;\n    while (std::getline(in, line)) {\n        std::cout << line << std::endl;\n    }\n    return 0;\n}`,
  },
  {
    title: "Exception Handling",
    subtitle: "try, catch, and throw — failing loudly",
    language: "cpp",
    tags: ["errors"],
    theoryTopics: ["try / catch / throw", "Standard exceptions", "Exceptions & RAII"],
    codeTemplate: `#include <iostream>\n#include <stdexcept>\n\nint divide(int a, int b) {\n    if (b == 0) throw std::runtime_error("division by zero");\n    return a / b;\n}\n\nint main() {\n    try {\n        std::cout << divide(10, 0) << std::endl;\n    } catch (const std::exception& e) {\n        std::cout << "caught: " << e.what() << std::endl;\n    }\n    return 0;\n}`,
  },
  {
    title: "Move Semantics",
    subtitle: "Transferring resources, not copying them",
    language: "cpp",
    tags: ["performance", "modern-cpp"],
    theoryTopics: ["Rvalue references", "std::move", "Move constructors"],
    codeTemplate: `#include <iostream>\n#include <utility>\n#include <string>\n\nclass Message {\npublic:\n    explicit Message(std::string text) : text_(text) {}\n    Message(Message&& other) noexcept : text_(std::move(other.text_)) {\n        std::cout << "moved\\n";\n    }\n    const std::string& text() const { return text_; }\n\nprivate:\n    std::string text_;\n};\n\nint main() {\n    Message m1("hello");\n    Message m2(std::move(m1));\n    std::cout << m2.text() << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Copy & The Rule of Five",
    subtitle: "Ownership semantics done right",
    language: "cpp",
    tags: ["performance", "modern-cpp"],
    theoryTopics: ["Copy semantics", "The rule of five", "Copy elision"],
    codeTemplate: `#include <iostream>\n\nclass Counter {\nprivate:\n    int* count_;\n\npublic:\n    Counter() : count_(new int(0)) {}\n    Counter(const Counter& other) : count_(new int(*other.count_)) {}\n    Counter& operator=(const Counter& other) {\n        if (this != &other) *count_ = *other.count_;\n        return *this;\n    }\n    Counter(Counter&& other) noexcept : count_(other.count_) {\n        other.count_ = nullptr;\n    }\n    ~Counter() { delete count_; }\n\n    void increment() { (*count_)++; }\n    int value() const { return count_ ? *count_ : -1; }\n};\n\nint main() {\n    Counter a;\n    a.increment();\n    Counter b = a;\n    b.increment();\n    std::cout << a.value() << " " << b.value() << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Namespaces & Headers",
    subtitle: "Organizing code across files",
    language: "cpp",
    tags: ["modules", "organizing"],
    theoryTopics: ["Namespaces", "Header guards", "Splitting code into files"],
    codeTemplate: `// math_utils.hpp\n#pragma once\n\nnamespace math_utils {\n    int add(int a, int b);\n}\n\n// math_utils.cpp\n// #include "math_utils.hpp"\n// int math_utils::add(int a, int b) { return a + b; }\n\n// main.cpp\n// #include "math_utils.hpp"\n// int main() { return math_utils::add(2, 3); }`,
  },
  {
    title: "enum class & Casts",
    subtitle: "Type safety at every level",
    language: "cpp",
    tags: ["types"],
    theoryTopics: ["enum class", "static_cast & dynamic_cast", "Avoiding implicit casts"],
    codeTemplate: `#include <iostream>\n\nenum class Color { Red, Green, Blue };\n\nint main() {\n    Color c = Color::Green;\n    std::cout << static_cast<int>(c) << std::endl;\n    int total = 7;\n    double ratio = static_cast<double>(total) / 2.0;\n    std::cout << ratio << std::endl;\n    return 0;\n}`,
  },
  {
    title: "constexpr & Compile-time",
    subtitle: "Computations that happen before the program runs",
    language: "cpp",
    tags: ["modern-cpp", "performance"],
    theoryTopics: ["constexpr functions", "Compile-time computation", "if constexpr"],
    codeTemplate: `#include <iostream>\n\nconstexpr int square(int n) {\n    return n * n;\n}\n\nconstexpr int factorial(int n) {\n    int result = 1;\n    for (int i = 2; i <= n; i++) result *= i;\n    return result;\n}\n\nint main() {\n    constexpr int area = square(12);\n    constexpr int fact = factorial(5);\n    std::cout << area << " " << fact << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Threads & Mutexes",
    subtitle: "Concurrency with std::thread",
    language: "cpp",
    tags: ["concurrency"],
    theoryTopics: ["std::thread", "Mutexes & locks", "Data races"],
    codeTemplate: `#include <iostream>\n#include <thread>\n#include <mutex>\n\nint main() {\n    std::mutex mtx;\n    int counter = 0;\n    std::thread worker([&]() {\n        for (int i = 0; i < 1000; i++) {\n            std::lock_guard<std::mutex> lock(mtx);\n            counter++;\n        }\n    });\n    worker.join();\n    std::cout << counter << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Iterators & Streams",
    subtitle: "The glue between containers and algorithms",
    language: "cpp",
    tags: ["stl", "iterators"],
    theoryTopics: ["Iterator categories", "ostream_iterator", "Custom iterators"],
    codeTemplate: `#include <iostream>\n#include <vector>\n#include <iterator>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums = {3, 1, 4, 1, 5};\n    std::sort(nums.begin(), nums.end());\n    std::copy(nums.begin(), nums.end(), std::ostream_iterator<int>(std::cout, " "));\n    std::cout << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Performance & Good Practice",
    subtitle: "noexcept, const correctness, and modern idioms",
    language: "cpp",
    tags: ["performance", "best-practices"],
    theoryTopics: ["Const correctness", "noexcept & move", "Modern C++ idioms"],
    codeTemplate: `#include <iostream>\n#include <vector>\n#include <string>\n\nclass Text {\npublic:\n    explicit Text(std::string body) : body_(std::move(body)) {}\n    const std::string& body() const noexcept { return body_; }\n    size_t length() const noexcept { return body_.size(); }\n\nprivate:\n    std::string body_;\n};\n\nint main() {\n    Text t("modern C++");\n    std::cout << t.body() << " " << t.length() << std::endl;\n    std::vector<int> v = {1, 2, 3};\n    v.reserve(10);\n    std::cout << v.size() << std::endl;\n    return 0;\n}`,
  },
  {
    title: "Capstone: Build Something Real",
    subtitle: "A complete C++ project end to end",
    language: "cpp",
    tags: ["capstone"],
    theoryTopics: ["Project structure", "Designing a small app", "Testing and iteration"],
    codeTemplate: `#include <iostream>\n#include <vector>\n#include <string>\n\nstruct Task {\n    std::string title;\n    bool done = false;\n};\n\nvoid list(const std::vector<Task>& tasks) {\n    for (size_t i = 0; i < tasks.size(); i++) {\n        std::cout << (tasks[i].done ? "[x] " : "[ ] ") << i << ": " << tasks[i].title << std::endl;\n    }\n}\n\nint main() {\n    std::vector<Task> tasks;\n    tasks.push_back({"learn C++", true});\n    tasks.push_back({"build a todo app"});\n    list(tasks);\n    return 0;\n}`,
  },

  /* ─── C++ blueprints: Days 41–100 (advanced arc) ─── */
  {
    title: "Vector Internals Deep",
    subtitle: "Size vs capacity, reserve, and emplace",
    language: "cpp",
    tags: ["vector", "containers", "performance"],
    theoryTopics: ["Capacity vs size", "reserve & shrink_to_fit", "Emplace & move growth"],
    codeTemplate: `#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> v;
    v.reserve(10);
    v.push_back(3);
    v.push_back(1);
    v.push_back(2);
    std::cout << v.size() << " " << (v.capacity() >= 10 ? 1 : 0) << std::endl;
    v.emplace_back(4);
    std::cout << std::accumulate(v.begin(), v.end(), 0) << std::endl;
    v.shrink_to_fit();
    std::cout << v.size() << std::endl;
    return 0;
}`,
  },
  {
    title: "std::list & Forward List",
    subtitle: "Node-based sequences, splice, and merge",
    language: "cpp",
    tags: ["list", "containers"],
    theoryTopics: ["Doubly-linked lists", "Splice & merge", "list vs vector tradeoffs"],
    codeTemplate: `#include <iostream>
#include <list>

int main() {
    std::list<int> a = {3, 1};
    std::list<int> b = {2, 4};
    a.sort();
    b.sort();
    a.merge(b);
    a.unique();
    for (int n : a) std::cout << n << " ";
    std::cout << std::endl << b.size() << std::endl;
    return 0;
}`,
  },
  {
    title: "std::deque & Queue Adapters",
    subtitle: "Double-ended growth plus stack, queue, priority_queue",
    language: "cpp",
    tags: ["deque", "containers", "adapters"],
    theoryTopics: ["Double-ended queues", "stack & queue adapters", "priority_queue"],
    codeTemplate: `#include <iostream>
#include <deque>
#include <queue>
#include <stack>

int main() {
    std::deque<int> d;
    d.push_back(2);
    d.push_front(1);
    d.push_back(3);
    std::cout << d.front() << " " << d.back() << std::endl;
    std::queue<int> q;
    q.push(10);
    q.push(20);
    std::cout << q.front() << std::endl;
    std::stack<int> s;
    s.push(7);
    s.push(8);
    std::cout << s.top() << std::endl;
    std::priority_queue<int> pq;
    pq.push(5);
    pq.push(9);
    pq.push(1);
    std::cout << pq.top() << std::endl;
    return 0;
}`,
  },
  {
    title: "Associative Containers Deep",
    subtitle: "Ordered maps and sets with custom comparators",
    language: "cpp",
    tags: ["map", "set", "containers"],
    theoryTopics: ["std::map ordering", "std::set membership", "Custom comparators"],
    codeTemplate: `#include <iostream>
#include <map>
#include <set>
#include <string>

int main() {
    std::map<std::string, int> m = {{"pear", 3}, {"apple", 5}, {"fig", 1}};
    for (const auto& kv : m) std::cout << kv.first << ":" << kv.second << " ";
    std::cout << std::endl;
    std::set<int> s = {3, 1, 3, 2};
    std::cout << s.size() << " " << s.count(3) << " " << s.count(9) << std::endl;
    std::set<int, std::greater<int> > desc;
    desc.insert(1);
    desc.insert(5);
    desc.insert(3);
    std::cout << *desc.begin() << std::endl;
    return 0;
}`,
  },
  {
    title: "Hash Containers Deep",
    subtitle: "unordered_map buckets, hashes, and rehash",
    language: "cpp",
    tags: ["hash", "containers", "performance"],
    theoryTopics: ["unordered_map buckets", "Hash functions & equality", "Load factor & rehash"],
    codeTemplate: `#include <iostream>
#include <unordered_map>
#include <string>

int main() {
    std::unordered_map<std::string, int> counts;
    std::string words[] = {"a", "b", "a", "c", "a", "b"};
    for (const auto& w : words) counts[w]++;
    std::cout << counts["a"] << " " << counts["b"] << " " << counts["c"] << std::endl;
    std::cout << counts.size() << std::endl;
    counts.reserve(100);
    std::cout << (counts.bucket_count() >= 100 ? 1 : 0) << " " << counts["a"] << std::endl;
    return 0;
}`,
  },
  {
    title: "Iterators Deep",
    subtitle: "Invalidation, reverse iterators, and stream iterators",
    language: "cpp",
    tags: ["iterators", "stl"],
    theoryTopics: ["Iterator invalidation", "Reverse & const iterators", "Stream iterators"],
    codeTemplate: `#include <iostream>
#include <vector>
#include <sstream>
#include <iterator>
#include <algorithm>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    for (auto it = v.rbegin(); it != v.rend(); ++it) std::cout << *it << " ";
    std::cout << std::endl;
    std::istringstream in("10 20 30");
    std::vector<int> w((std::istream_iterator<int>(in)), std::istream_iterator<int>());
    std::copy(w.begin(), w.end(), std::ostream_iterator<int>(std::cout, ","));
    std::cout << std::endl;
    return 0;
}`,
  },
  {
    title: "Algorithms I: Sort & Search",
    subtitle: "Predicates, binary search, bounds, and nth_element",
    language: "cpp",
    tags: ["algorithms", "stl"],
    theoryTopics: ["Sorting with predicates", "binary_search & bounds", "nth_element & partial sort"],
    codeTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9, 3};
    std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
    std::cout << v.front() << " " << v.back() << std::endl;
    std::sort(v.begin(), v.end());
    std::cout << std::binary_search(v.begin(), v.end(), 8) << std::endl;
    auto it = std::lower_bound(v.begin(), v.end(), 5);
    std::cout << *it << std::endl;
    std::nth_element(v.begin(), v.begin() + 2, v.end());
    std::cout << v[2] << std::endl;
    return 0;
}`,
  },
  {
    title: "Algorithms II: Transform & Numeric",
    subtitle: "Mapping, folding, and scanning ranges",
    language: "cpp",
    tags: ["algorithms", "stl", "numeric"],
    theoryTopics: ["transform & for_each", "accumulate with ops", "inner_product & scans"],
    codeTemplate: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    std::vector<int> doubled(v.size());
    std::transform(v.begin(), v.end(), doubled.begin(), [](int n) { return n * 2; });
    for (int n : doubled) std::cout << n << " ";
    std::cout << std::endl;
    std::cout << std::accumulate(v.begin(), v.end(), 1, [](int a, int b) { return a * b; }) << std::endl;
    std::vector<int> sums(v.size());
    std::partial_sum(v.begin(), v.end(), sums.begin());
    std::cout << sums.back() << std::endl;
    std::cout << std::inner_product(v.begin(), v.end(), doubled.begin(), 0) << std::endl;
    return 0;
}`,
  },
  {
    title: "Strings Deep",
    subtitle: "find, replace, conversions, and in-place edits",
    language: "cpp",
    tags: ["strings"],
    theoryTopics: ["find, substr & replace", "String conversions", "erase, insert & capacity"],
    codeTemplate: `#include <iostream>
#include <string>

int main() {
    std::string s = "hello world";
    std::cout << s.find("world") << std::endl;
    s.replace(6, 5, "C++");
    std::cout << s << std::endl;
    std::cout << std::stoi("42") + 8 << std::endl;
    s.insert(5, ",");
    s.erase(0, 7);
    std::cout << s << " " << !s.empty() << std::endl;
    return 0;
}`,
  },
  {
    title: "string_view & Formatting",
    subtitle: "Zero-copy reading and iomanip output control",
    language: "cpp",
    tags: ["strings", "formatting", "performance"],
    theoryTopics: ["Non-owning views", "Zero-copy tokenizing", "iomanip formatting"],
    codeTemplate: `#include <iostream>
#include <iomanip>
#include <string>

std::string head(const std::string& s) {
    size_t pos = s.find(' ');
    return pos == std::string::npos ? s : s.substr(0, pos);
}

int main() {
    std::string line = "Ada Lovelace 1815";
    std::cout << head(line) << std::endl;
    std::cout << std::fixed << std::setprecision(2) << 3.14159 << std::endl;
    std::cout << std::setw(6) << std::setfill('0') << 42 << std::endl;
    std::cout << std::boolalpha << (1 == 2) << std::endl;
    return 0;
}`,
  },
  {
    title: "iostream Deep",
    subtitle: "Stream state, manipulators, and stringstream parsing",
    language: "cpp",
    tags: ["io", "streams"],
    theoryTopics: ["Stream state & errors", "Basefield manipulators", "Parsing with stringstreams"],
    codeTemplate: `#include <iostream>
#include <sstream>
#include <string>

int main() {
    std::istringstream in("10 20 oops 30");
    int total = 0, value = 0;
    while (in >> value) total += value;
    std::cout << total << " " << in.fail() << std::endl;
    in.clear();
    std::string rest;
    in >> rest;
    std::cout << rest << std::endl;
    std::cout << std::hex << 255 << " " << std::dec << 255 << std::endl;
    return 0;
}`,
  },
  {
    title: "Filesystem Paths & Files",
    subtitle: "Path handling, read-back, and stream positions",
    language: "cpp",
    tags: ["files", "io"],
    theoryTopics: ["Path strings & joining", "File read-back", "Stream positions & sizes"],
    codeTemplate: `#include <iostream>
#include <fstream>
#include <string>

std::string join_path(const std::string& dir, const std::string& file) {
    if (!dir.empty() && dir.back() != '/') return dir + "/" + file;
    return dir + file;
}

int main() {
    std::cout << join_path("data", "scores.txt") << std::endl;
    const char* name = "asta_day52.txt";
    std::ofstream out(name);
    out << "row one\nrow two\n";
    out.close();
    std::ifstream in(name);
    std::string a, b;
    std::getline(in, a);
    std::getline(in, b);
    in.clear();
    in.seekg(0, std::ios::end);
    std::cout << a << " | " << b << std::endl;
    std::cout << in.tellg() << std::endl;
    return 0;
}`,
  },
  {
    title: "Function Templates Deep",
    subtitle: "Deduction, overloads, and enable_if constraints",
    language: "cpp",
    tags: ["templates", "generics"],
    theoryTopics: ["Deduction & explicit args", "Templates & overloads", "enable_if constraints"],
    codeTemplate: `#include <iostream>
#include <type_traits>

template <typename T>
T add(T a, T b) { return a + b; }

template <typename T>
typename std::enable_if<std::is_integral<T>::value, T>::type double_it(T v) {
    return v * 2;
}

int main() {
    std::cout << add(2, 3) << " " << add(1.5, 2.5) << std::endl;
    std::cout << add<double>(2, 3.5) << std::endl;
    std::cout << double_it(21) << std::endl;
    return 0;
}`,
  },
  {
    title: "Variadic Templates",
    subtitle: "Parameter packs and recursive expansion",
    language: "cpp",
    tags: ["templates", "variadic"],
    theoryTopics: ["Parameter packs", "Recursive expansion", "sizeof... & pack size"],
    codeTemplate: `#include <iostream>

void print_all() { std::cout << std::endl; }

template <typename First, typename... Rest>
void print_all(const First& first, const Rest&... rest) {
    std::cout << first;
    if (sizeof...(rest) > 0) std::cout << " ";
    print_all(rest...);
}

template <typename... Args>
size_t count_args(const Args&... args) { return sizeof...(args); }

int main() {
    print_all(1, "two", 3.5);
    std::cout << count_args(1, 2, 3, 4) << std::endl;
    print_all("done");
    return 0;
}`,
  },
  {
    title: "Move Semantics Deep",
    subtitle: "Move assignment and moved-from state",
    language: "cpp",
    tags: ["move", "modern-cpp", "performance"],
    theoryTopics: ["Rvalue refs revisited", "Move assignment", "Moved-from state"],
    codeTemplate: `#include <iostream>
#include <utility>
#include <string>

class Buffer {
public:
    explicit Buffer(const std::string& s) : data_(s) {}
    Buffer(Buffer&& other) noexcept : data_(std::move(other.data_)) {
        std::cout << "moved" << std::endl;
    }
    Buffer& operator=(Buffer&& other) noexcept {
        data_ = std::move(other.data_);
        std::cout << "move-assigned" << std::endl;
        return *this;
    }
    Buffer(const Buffer&) = delete;
    Buffer& operator=(const Buffer&) = delete;
    const std::string& get() const { return data_; }

private:
    std::string data_;
};

int main() {
    Buffer a("hello");
    Buffer b(std::move(a));
    Buffer c("x");
    c = std::move(b);
    std::cout << c.get() << std::endl;
    return 0;
}`,
  },
  {
    title: "Perfect Forwarding",
    subtitle: "Reference collapsing, universal refs, std::forward",
    language: "cpp",
    tags: ["templates", "move", "modern-cpp"],
    theoryTopics: ["Reference collapsing", "Universal references", "std::forward"],
    codeTemplate: `#include <iostream>
#include <utility>
#include <string>

struct Widget {
    Widget(const std::string& s) { std::cout << "lvalue:" << s << std::endl; }
    Widget(std::string&& s) { std::cout << "rvalue:" << s << std::endl; }
};

template <typename T>
Widget make_widget(T&& arg) { return Widget(std::forward<T>(arg)); }

int main() {
    std::string name = "ada";
    make_widget(name);
    make_widget(std::string("grace"));
    return 0;
}`,
  },
  {
    title: "RAII Wrappers Deep",
    subtitle: "Scope guards, C resources, and the rule of zero",
    language: "cpp",
    tags: ["raii", "resources"],
    theoryTopics: ["Scope guards", "RAII for C resources", "Rule of zero"],
    codeTemplate: `#include <iostream>
#include <cstdio>
#include <functional>

class ScopeGuard {
public:
    explicit ScopeGuard(std::function<void()> f) : f_(f) {}
    ~ScopeGuard() { f_(); }

private:
    std::function<void()> f_;
};

class FileGuard {
public:
    explicit FileGuard(const char* n, const char* m) : f_(std::fopen(n, m)) {
        std::cout << "opened" << std::endl;
    }
    ~FileGuard() {
        if (f_) {
            std::fclose(f_);
            std::cout << "closed" << std::endl;
        }
    }
    FILE* get() const { return f_; }

private:
    FILE* f_;
};

int main() {
    ScopeGuard g([]() { std::cout << "cleanup" << std::endl; });
    {
        FileGuard f("asta_day57.txt", "w");
        std::fputs("hi", f.get());
    }
    std::cout << "done" << std::endl;
    return 0;
}`,
  },
  {
    title: "unique_ptr Deep",
    subtitle: "Custom deleters, arrays, and ownership transfer",
    language: "cpp",
    tags: ["memory", "smart-pointers", "raii"],
    theoryTopics: ["Custom deleters", "unique_ptr arrays", "Ownership transfer"],
    codeTemplate: `#include <iostream>
#include <memory>

int main() {
    auto del = [](int* p) { std::cout << "deleted" << std::endl; delete p; };
    std::unique_ptr<int, decltype(del)> guarded(new int(11), del);
    std::cout << *guarded << std::endl;
    std::unique_ptr<int[]> arr(new int[3]);
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    std::cout << arr[2] << std::endl;
    std::unique_ptr<int> owner(new int(7));
    std::unique_ptr<int> moved = std::move(owner);
    std::cout << (owner ? 1 : 0) << " " << *moved << std::endl;
    return 0;
}`,
  },
  {
    title: "shared_ptr & weak_ptr Deep",
    subtitle: "Counting, cycles, and make_shared",
    language: "cpp",
    tags: ["memory", "smart-pointers"],
    theoryTopics: ["Reference counting", "weak_ptr & cycles", "make_shared efficiency"],
    codeTemplate: `#include <iostream>
#include <memory>

int main() {
    auto sp = std::make_shared<int>(99);
    std::cout << sp.use_count() << std::endl;
    {
        auto copy = sp;
        std::cout << sp.use_count() << std::endl;
        std::weak_ptr<int> wk = sp;
        if (auto locked = wk.lock()) std::cout << *locked << std::endl;
    }
    std::cout << sp.use_count() << std::endl;
    std::weak_ptr<int> dangling;
    {
        auto tmp = std::make_shared<int>(5);
        dangling = tmp;
    }
    std::cout << dangling.expired() << std::endl;
    return 0;
}`,
  },
  {
    title: "Milestone Project 1: In-Memory Index",
    subtitle: "Build a tiny search index over documents",
    language: "cpp",
    tags: ["milestone", "containers", "project"],
    theoryTopics: ["Designing the index", "Ranking results", "Testing the build"],
    codeTemplate: `#include <iostream>
#include <map>
#include <string>
#include <sstream>
#include <vector>
#include <algorithm>
#include <utility>

int main() {
    std::string docs[] = {"cpp is fast", "cpp is expressive", "fast code wins"};
    std::map<std::string, int> index;
    for (const auto& d : docs) {
        std::istringstream in(d);
        std::string w;
        while (in >> w) index[w]++;
    }
    std::cout << index["cpp"] << " " << index["fast"] << " " << index["is"] << std::endl;
    std::vector<std::pair<std::string, int> > ranked(index.begin(), index.end());
    std::sort(ranked.begin(), ranked.end(),
        [](const std::pair<std::string, int>& a, const std::pair<std::string, int>& b) {
            if (a.second != b.second) return a.second > b.second;
            return a.first < b.first;
        });
    std::cout << ranked.front().first << ":" << ranked.front().second << std::endl;
    return 0;
}`,
  },
  {
    title: "Exceptions Deep",
    subtitle: "Custom types, catch order, and unwinding",
    language: "cpp",
    tags: ["errors", "exceptions"],
    theoryTopics: ["Throw by value, catch by reference", "Custom exception types", "Unwinding order"],
    codeTemplate: `#include <iostream>
#include <stdexcept>
#include <string>

struct ParseError : std::runtime_error {
    explicit ParseError(const std::string& m) : std::runtime_error(m) {}
};

struct Tracer {
    explicit Tracer(const std::string& n) : name(n) {}
    ~Tracer() { std::cout << "~" << name << std::endl; }
    std::string name;
};

int parse(const std::string& s) {
    Tracer t("parse");
    if (s.empty()) throw ParseError("empty input");
    return static_cast<int>(s.size());
}

int main() {
    try {
        Tracer outer("main");
        std::cout << parse("hello") << std::endl;
        std::cout << parse("") << std::endl;
    } catch (const ParseError& e) {
        std::cout << "parse error: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "other: " << e.what() << std::endl;
    }
    return 0;
}`,
  },
  {
    title: "Exception Safety & noexcept",
    subtitle: "Guarantees, contracts, and copy-and-swap",
    language: "cpp",
    tags: ["errors", "exceptions", "modern-cpp"],
    theoryTopics: ["The three safety guarantees", "noexcept contracts", "Copy-and-swap"],
    codeTemplate: `#include <iostream>
#include <stdexcept>
#include <string>
#include <utility>

class Safe {
public:
    explicit Safe(const std::string& s) : data_(s) {}
    Safe& operator=(Safe other) {
        swap(other);
        return *this;
    }
    void swap(Safe& other) noexcept { data_.swap(other.data_); }
    const std::string& get() const { return data_; }

private:
    std::string data_;
};

void may_throw(bool fail) {
    if (fail) throw std::runtime_error("boom");
}

int main() {
    Safe a("alpha"), b("beta");
    a = b;
    std::cout << a.get() << std::endl;
    std::cout << noexcept(a.swap(b)) << std::endl;
    try {
        may_throw(true);
    } catch (const std::exception&) {
        std::cout << a.get() << std::endl;
    }
    return 0;
}`,
  },
  {
    title: "Lambdas Deep",
    subtitle: "Init captures, mutable, and generic lambdas",
    language: "cpp",
    tags: ["functional", "modern-cpp"],
    theoryTopics: ["Init captures", "Mutable lambdas", "Generic lambdas"],
    codeTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    int base = 100;
    auto add_base = [offset = base + 1](int x) { return x + offset; };
    std::cout << add_base(1) << std::endl;
    int total = 0;
    auto bump = [&total]() mutable { total += 5; return total; };
    bump();
    bump();
    std::cout << total << std::endl;
    std::vector<int> v = {1, 2, 3};
    std::transform(v.begin(), v.end(), v.begin(), [](auto n) { return n * n; });
    for (int n : v) std::cout << n << " ";
    std::cout << std::endl;
    return 0;
}`,
  },
  {
    title: "std::function & Callables",
    subtitle: "Type erasure, bind, and dispatch tables",
    language: "cpp",
    tags: ["functional"],
    theoryTopics: ["Type-erased wrappers", "bind & placeholders", "Dispatch tables"],
    codeTemplate: `#include <iostream>
#include <functional>
#include <map>
#include <string>

int add(int a, int b) { return a + b; }

int main() {
    std::map<std::string, std::function<int(int, int)> > ops;
    ops["add"] = add;
    ops["mul"] = [](int a, int b) { return a * b; };
    std::cout << ops["add"](3, 4) << " " << ops["mul"](3, 4) << std::endl;
    auto add5 = std::bind(add, 5, std::placeholders::_1);
    std::cout << add5(10) << std::endl;
    return 0;
}`,
  },
  {
    title: "Threads Deep",
    subtitle: "Launching, joining, and hardware concurrency",
    language: "cpp",
    tags: ["concurrency", "threads"],
    theoryTopics: ["Launching & joining", "Passing thread arguments", "Hardware concurrency"],
    codeTemplate: `#include <iostream>
#include <thread>

void greet(int id) {
    std::cout << "worker " << id << std::endl;
}

int main() {
    std::thread t1(greet, 1);
    std::thread t2(greet, 2);
    t1.join();
    t2.join();
    std::cout << "joined" << std::endl;
    return 0;
}`,
  },
  {
    title: "Mutexes & Locks Deep",
    subtitle: "lock_guard, unique_lock, and deadlock avoidance",
    language: "cpp",
    tags: ["concurrency", "threads"],
    theoryTopics: ["unique_lock control", "Lock granularity", "Deadlock avoidance"],
    codeTemplate: `#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;
int counter = 0;

void increment(int times) {
    for (int i = 0; i < times; i++) {
        std::lock_guard<std::mutex> lock(mtx);
        counter++;
    }
}

int main() {
    std::thread a(increment, 500);
    std::thread b(increment, 500);
    a.join();
    b.join();
    std::cout << counter << std::endl;
    return 0;
}`,
  },
  {
    title: "Condition Variables",
    subtitle: "wait, notify, and the producer-consumer queue",
    language: "cpp",
    tags: ["concurrency", "threads"],
    theoryTopics: ["wait & notify", "Predicate waits", "Producer-consumer queues"],
    codeTemplate: `#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>

std::mutex mtx;
std::condition_variable cv;
std::queue<int> q;
bool finished = false;

void producer() {
    for (int i = 1; i <= 3; i++) {
        std::lock_guard<std::mutex> lock(mtx);
        q.push(i);
        cv.notify_one();
    }
    std::lock_guard<std::mutex> lock(mtx);
    finished = true;
    cv.notify_all();
}

void consumer() {
    while (true) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [] { return !q.empty() || finished; });
        while (!q.empty()) {
            std::cout << q.front() << " ";
            q.pop();
        }
        if (finished && q.empty()) break;
    }
    std::cout << std::endl;
}

int main() {
    std::thread p(producer);
    std::thread c(consumer);
    p.join();
    c.join();
    return 0;
}`,
  },
  {
    title: "Atomics & Memory Order",
    subtitle: "fetch_add, compare-exchange, and lock-free checks",
    language: "cpp",
    tags: ["concurrency", "atomics"],
    theoryTopics: ["Atomic operations", "Compare-and-swap", "Lock-free checks"],
    codeTemplate: `#include <iostream>
#include <atomic>

int main() {
    std::atomic<int> counter{0};
    counter.fetch_add(5);
    counter.fetch_sub(2);
    std::cout << counter.load() << std::endl;
    int expected = 3;
    bool swapped = counter.compare_exchange_strong(expected, 10);
    std::cout << swapped << " " << counter.load() << " " << expected << std::endl;
    counter.store(0);
    std::cout << counter.is_lock_free() << std::endl;
    return 0;
}`,
  },
  {
    title: "Futures, Promises & async",
    subtitle: "async policies, promises, and shared futures",
    language: "cpp",
    tags: ["concurrency", "threads"],
    theoryTopics: ["async & launch policies", "promise & future pairs", "Shared futures"],
    codeTemplate: `#include <iostream>
#include <future>

int compute(int x) { return x * x; }

int main() {
    std::future<int> f = std::async(std::launch::async, compute, 7);
    std::promise<int> p;
    std::future<int> g = p.get_future();
    p.set_value(100);
    std::cout << f.get() << " " << g.get() << std::endl;
    std::shared_future<int> shared = std::async(std::launch::deferred, compute, 3).share();
    std::cout << shared.get() << std::endl;
    return 0;
}`,
  },
  {
    title: "Chrono: Time & Durations",
    subtitle: "Clocks, durations, and safe benchmarking",
    language: "cpp",
    tags: ["chrono", "time"],
    theoryTopics: ["Durations & time points", "Clock kinds", "Timing code safely"],
    codeTemplate: `#include <iostream>
#include <chrono>

int main() {
    using namespace std::chrono;
    auto ping = milliseconds(1500);
    auto pong = milliseconds(500);
    std::cout << duration_cast<seconds>(ping + pong).count() << std::endl;
    auto us = duration_cast<microseconds>(seconds(2));
    std::cout << us.count() << std::endl;
    steady_clock::time_point start = steady_clock::now();
    volatile long sink = 0;
    for (long i = 0; i < 1000; i++) sink += i;
    steady_clock::time_point end = steady_clock::now();
    std::cout << (end >= start) << " " << sink << std::endl;
    return 0;
}`,
  },
  {
    title: "Random Numbers",
    subtitle: "Engines, distributions, and reproducible seeds",
    language: "cpp",
    tags: ["random", "numeric"],
    theoryTopics: ["Engines & distributions", "Fixed-seed reproducibility", "Shuffling & sampling"],
    codeTemplate: `#include <iostream>
#include <random>
#include <vector>
#include <algorithm>

int main() {
    std::mt19937 rng(42);
    std::uniform_int_distribution<int> die(1, 6);
    for (int i = 0; i < 3; i++) std::cout << die(rng) << " ";
    std::cout << std::endl;
    std::vector<int> deck;
    deck.push_back(1);
    deck.push_back(2);
    deck.push_back(3);
    deck.push_back(4);
    deck.push_back(5);
    std::shuffle(deck.begin(), deck.end(), rng);
    for (size_t i = 0; i < deck.size(); i++) std::cout << deck[i] << " ";
    std::cout << std::endl;
    return 0;
}`,
  },
  {
    title: "Ranges Thinking I",
    subtitle: "Lazy pipelines built from filter and transform",
    language: "cpp",
    tags: ["ranges", "algorithms", "modern-cpp"],
    theoryTopics: ["Lazy pipeline thinking", "filter & transform helpers", "Composing stages"],
    codeTemplate: `#include <iostream>
#include <vector>

template <typename T, typename Pred>
std::vector<T> filter_vec(const std::vector<T>& in, Pred p) {
    std::vector<T> out;
    for (size_t i = 0; i < in.size(); i++)
        if (p(in[i])) out.push_back(in[i]);
    return out;
}

template <typename T, typename Fn>
std::vector<T> map_vec(const std::vector<T>& in, Fn f) {
    std::vector<T> out;
    for (size_t i = 0; i < in.size(); i++) out.push_back(f(in[i]));
    return out;
}

int main() {
    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    v.push_back(4);
    v.push_back(5);
    v.push_back(6);
    std::vector<int> evens = filter_vec(v, [](int n) { return n % 2 == 0; });
    std::vector<int> squares = map_vec(evens, [](int n) { return n * n; });
    for (size_t i = 0; i < squares.size(); i++) std::cout << squares[i] << " ";
    std::cout << std::endl;
    return 0;
}`,
  },
  {
    title: "Ranges Thinking II",
    subtitle: "Folds, sorted ranges, and pipeline helpers",
    language: "cpp",
    tags: ["ranges", "algorithms"],
    theoryTopics: ["Fold & reduce patterns", "Sorted-range utilities", "Pipeline helpers"],
    codeTemplate: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

int sum_of_doubled_evens(const std::vector<int>& in) {
    int total = 0;
    for (size_t i = 0; i < in.size(); i++)
        if (in[i] % 2 == 0) total += in[i] * 2;
    return total;
}

int main() {
    std::vector<int> v;
    v.push_back(5);
    v.push_back(2);
    v.push_back(8);
    v.push_back(1);
    v.push_back(9);
    v.push_back(4);
    std::cout << sum_of_doubled_evens(v) << std::endl;
    std::vector<int> sorted = v;
    std::sort(sorted.begin(), sorted.end());
    std::cout << sorted.front() << " " << sorted.back() << std::endl;
    std::cout << std::accumulate(v.begin(), v.end(), 0) << std::endl;
    return 0;
}`,
  },
  {
    title: "Concepts & Constraints",
    subtitle: "Constraining templates from SFINAE to concepts",
    language: "cpp",
    tags: ["templates", "concepts", "modern-cpp"],
    theoryTopics: ["Constraining with enable_if", "static_assert contracts", "From SFINAE to concepts"],
    codeTemplate: `#include <iostream>
#include <type_traits>

template <typename T>
typename std::enable_if<std::is_arithmetic<T>::value, T>::type twice(T v) {
    return v + v;
}

int main() {
    static_assert(std::is_arithmetic<int>::value, "int must be arithmetic");
    std::cout << twice(21) << " " << twice(2.5) << std::endl;
    std::cout << std::is_integral<int>::value << std::is_integral<double>::value << std::endl;
    return 0;
}`,
  },
  {
    title: "Type Traits & static_assert",
    subtitle: "Querying types and dispatching on answers",
    language: "cpp",
    tags: ["templates", "metaprogramming"],
    theoryTopics: ["is_integral & friends", "Selecting overloads", "Tag dispatch"],
    codeTemplate: `#include <iostream>
#include <type_traits>
#include <string>
#include <cstdint>

template <typename T>
typename std::enable_if<std::is_integral<T>::value, std::string>::type describe(T) {
    return "integral";
}

template <typename T>
typename std::enable_if<std::is_floating_point<T>::value, std::string>::type describe(T) {
    return "floating";
}

int main() {
    std::cout << describe(7) << " " << describe(7.5) << std::endl;
    std::cout << sizeof(int32_t) << std::endl;
    return 0;
}`,
  },
  {
    title: "Headers, TUs & ODR",
    subtitle: "Translation units and the One Definition Rule",
    language: "cpp",
    tags: ["modules", "organizing", "build"],
    theoryTopics: ["Translation units", "The One Definition Rule", "Include hygiene"],
    codeTemplate: `#include <iostream>

namespace asta {
    inline int version() { return 76; }
}

namespace {
    int helper(int x) { return x * 2; }
}

int main() {
    std::cout << asta::version() << " " << helper(21) << std::endl;
    return 0;
}`,
  },
  {
    title: "CMake & Build Systems",
    subtitle: "Targets, linking, and build types",
    language: "cpp",
    tags: ["build", "cmake", "organizing"],
    theoryTopics: ["CMakeLists structure", "Targets & linking", "Build types & flags"],
    codeTemplate: `// CMakeLists.txt
// cmake_minimum_required(VERSION 3.16)
// project(shapes)
// add_library(geometry geometry.cpp)
// add_executable(app main.cpp)
// target_link_libraries(app PRIVATE geometry)
//
// geometry.hpp
// #pragma once
// double area(double r);
//
// geometry.cpp
// #include "geometry.hpp"
// double area(double r) { return 3.14159 * r * r; }
//
// main.cpp
// #include <iostream>
// #include "geometry.hpp"
// int main() {
//     std::cout << area(2.0) << std::endl;
//     return 0;
// }`,
  },
  {
    title: "Testing with Asserts",
    subtitle: "Invariants, self-test mains, and edge cases",
    language: "cpp",
    tags: ["testing", "best-practices"],
    theoryTopics: ["assert & invariants", "Self-test mains", "Edge-case testing"],
    codeTemplate: `#include <iostream>
#include <cassert>

int clamp(int v, int lo, int hi) {
    if (v < lo) return lo;
    if (v > hi) return hi;
    return v;
}

int main() {
    assert(clamp(5, 0, 10) == 5);
    assert(clamp(-3, 0, 10) == 0);
    assert(clamp(99, 0, 10) == 10);
    assert(clamp(0, 0, 10) == 0);
    std::cout << "4 tests passed" << std::endl;
    std::cout << clamp(7, 0, 5) << std::endl;
    return 0;
}`,
  },
  {
    title: "Debugging Concepts (GDB)",
    subtitle: "Debug builds, breakpoints, and reading a crash",
    language: "cpp",
    tags: ["debugging", "tools"],
    theoryTopics: ["Debug builds (-g)", "Breakpoints & backtraces", "Reading a crash"],
    codeTemplate: `#include <iostream>
#include <vector>
#include <cassert>

int at_safe(const std::vector<int>& v, size_t i) {
    assert(i < v.size());
    return v[i];
}

int main() {
    std::vector<int> v;
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    std::cout << at_safe(v, 0) << " " << at_safe(v, v.size() - 1) << std::endl;
    std::cout << "fixed" << std::endl;
    return 0;
}`,
  },
  {
    title: "Milestone Project 2: Key-Value Store",
    subtitle: "A persistent store with round-trip verification",
    language: "cpp",
    tags: ["milestone", "files", "project"],
    theoryTopics: ["Store design & API", "File persistence", "Round-trip verification"],
    codeTemplate: `#include <iostream>
#include <fstream>
#include <map>
#include <string>

int main() {
    std::map<std::string, std::string> store;
    store["name"] = "ada";
    store["lang"] = "cpp";
    std::ofstream out("asta_day80.db");
    for (std::map<std::string, std::string>::const_iterator it = store.begin(); it != store.end(); ++it)
        out << it->first << "=" << it->second << "\n";
    out.close();
    std::map<std::string, std::string> loaded;
    std::ifstream in("asta_day80.db");
    std::string line;
    while (std::getline(in, line)) {
        size_t eq = line.find('=');
        loaded[line.substr(0, eq)] = line.substr(eq + 1);
    }
    std::cout << loaded.size() << " " << loaded["name"] << " " << loaded["lang"] << std::endl;
    std::cout << (loaded == store) << std::endl;
    return 0;
}`,
  },
  {
    title: "Sum Types by Hand",
    subtitle: "Nullable values and tagged unions without C++17",
    language: "cpp",
    tags: ["types", "modern-cpp"],
    theoryTopics: ["Nullable values without pointers", "Tagged unions", "Maybe<T> by hand"],
    codeTemplate: `#include <iostream>
#include <string>

template <typename T>
class Maybe {
public:
    Maybe() : has_(false), value_() {}
    explicit Maybe(const T& v) : has_(true), value_(v) {}
    bool has() const { return has_; }
    const T& get() const { return value_; }

private:
    bool has_;
    T value_;
};

enum class ShapeKind { Circle, Rect };

struct Shape {
    ShapeKind kind;
    double a, b;
};

double area_of(const Shape& s) {
    if (s.kind == ShapeKind::Circle) return 3.14159 * s.a * s.a;
    return s.a * s.b;
}

int main() {
    Maybe<int> empty;
    Maybe<int> answer(42);
    std::cout << empty.has() << " " << answer.get() << std::endl;
    Shape c;
    c.kind = ShapeKind::Circle;
    c.a = 2.0;
    c.b = 0.0;
    Shape r;
    r.kind = ShapeKind::Rect;
    r.a = 3.0;
    r.b = 4.0;
    std::cout << area_of(c) << " " << area_of(r) << std::endl;
    return 0;
}`,
  },
  {
    title: "Tuples & Multi-Returns",
    subtitle: "std::tuple, tie, and destructuring patterns",
    language: "cpp",
    tags: ["types", "tuples"],
    theoryTopics: ["std::tuple & tie", "Multi-value returns", "Destructuring with tie"],
    codeTemplate: `#include <iostream>
#include <tuple>
#include <string>

std::tuple<std::string, int, bool> lookup(int id) {
    if (id == 1) return std::make_tuple("ada", 36, true);
    return std::make_tuple("unknown", 0, false);
}

int main() {
    std::string name;
    int age = 0;
    bool ok = false;
    std::tie(name, age, ok) = lookup(1);
    std::cout << name << " " << age << " " << ok << std::endl;
    std::tie(name, age, ok) = lookup(9);
    std::cout << name << " " << ok << std::endl;
    return 0;
}`,
  },
  {
    title: "Spans: Non-owning Views",
    subtitle: "Pointer-plus-size and bounds-checked views",
    language: "cpp",
    tags: ["views", "memory", "modern-cpp"],
    theoryTopics: ["Pointer + size idiom", "View classes", "Bounds-checked access"],
    codeTemplate: `#include <iostream>
#include <vector>
#include <cassert>

template <typename T>
class View {
public:
    View(T* data, size_t n) : data_(data), n_(n) {}
    size_t size() const { return n_; }
    T& at(size_t i) { assert(i < n_); return data_[i]; }
    T sum() const {
        T s = 0;
        for (size_t i = 0; i < n_; i++) s += data_[i];
        return s;
    }

private:
    T* data_;
    size_t n_;
};

int sum_head(int* data, size_t n, size_t k) {
    View<int> v(data, n);
    int s = 0;
    for (size_t i = 0; i < k && i < v.size(); i++) s += v.at(i);
    return s;
}

int main() {
    std::vector<int> v;
    v.push_back(5);
    v.push_back(10);
    v.push_back(15);
    v.push_back(20);
    View<int> view(v.data(), v.size());
    std::cout << view.size() << " " << view.sum() << std::endl;
    std::cout << sum_head(v.data(), v.size(), 2) << std::endl;
    return 0;
}`,
  },
  {
    title: "Regex",
    subtitle: "Matching, groups, and iterating matches",
    language: "cpp",
    tags: ["strings", "regex"],
    theoryTopics: ["Patterns & matching", "Capture groups", "Iterating matches"],
    codeTemplate: `#include <iostream>
#include <regex>
#include <string>

int main() {
    std::regex email("(\\w+)@(\\w+)\\.(\\w+)");
    std::string addr = "ada@example.com";
    std::smatch m;
    bool hit = std::regex_match(addr, m, email);
    std::cout << hit << " " << m[1] << " " << m[2] << std::endl;
    std::string csv = "a1,b22,c333";
    std::regex num("\\d+");
    int count = 0;
    for (std::sregex_iterator it(csv.begin(), csv.end(), num), end; it != end; ++it) count++;
    std::cout << count << std::endl;
    return 0;
}`,
  },
  {
    title: "Numerics",
    subtitle: "cmath, limits, and float comparison pitfalls",
    language: "cpp",
    tags: ["numeric", "math"],
    theoryTopics: ["cmath essentials", "Numeric limits", "Float comparison pitfalls"],
    codeTemplate: `#include <iostream>
#include <cmath>
#include <limits>
#include <iomanip>

int main() {
    std::cout << std::sqrt(2.0) << std::endl;
    std::cout << std::pow(2.0, 10) << std::endl;
    std::cout << std::numeric_limits<int>::max() << std::endl;
    float f = 0.1f + 0.2f;
    std::cout << std::setprecision(10) << f << std::endl;
    std::cout << (std::abs((0.1 + 0.2) - 0.3) < 1e-9) << std::endl;
    return 0;
}`,
  },
  {
    title: "Error Handling Strategies",
    subtitle: "Codes, error_code, and result-style returns",
    language: "cpp",
    tags: ["errors", "best-practices"],
    theoryTopics: ["Error codes vs exceptions", "std::error_code", "Result-style returns"],
    codeTemplate: `#include <iostream>
#include <system_error>
#include <string>

std::error_code open_resource(bool ok) {
    if (ok) return std::error_code();
    return std::make_error_code(std::errc::no_such_file_or_directory);
}

int divide_checked(int a, int b, int& out) {
    if (b == 0) return -1;
    out = a / b;
    return 0;
}

int main() {
    std::error_code ec = open_resource(true);
    std::cout << !ec << std::endl;
    ec = open_resource(false);
    std::cout << (ec == std::errc::no_such_file_or_directory) << std::endl;
    int out = 0;
    int rc = divide_checked(10, 2, out);
    std::cout << rc << " " << out << std::endl;
    std::cout << divide_checked(10, 0, out) << std::endl;
    return 0;
}`,
  },
  {
    title: "Design Patterns I: Strategy & Observer",
    subtitle: "Polymorphic sinks and subscriber lists",
    language: "cpp",
    tags: ["patterns", "oop", "design"],
    theoryTopics: ["Strategy with polymorphism", "Observer lists", "Composition revisited"],
    codeTemplate: `#include <iostream>
#include <vector>
#include <memory>
#include <string>

struct Sink {
    virtual void write(const std::string& msg) = 0;
    virtual ~Sink() {}
};

struct ConsoleSink : Sink {
    void write(const std::string& msg) { std::cout << "console: " << msg << std::endl; }
};

struct PrefixSink : Sink {
    explicit PrefixSink(const std::string& p) : prefix_(p) {}
    void write(const std::string& msg) { std::cout << prefix_ << msg << std::endl; }
    std::string prefix_;
};

int main() {
    std::vector<std::unique_ptr<Sink> > sinks;
    sinks.push_back(std::unique_ptr<Sink>(new ConsoleSink()));
    sinks.push_back(std::unique_ptr<Sink>(new PrefixSink("[log] ")));
    for (size_t i = 0; i < sinks.size(); i++) sinks[i]->write("hello");
    return 0;
}`,
  },
  {
    title: "Design Patterns II: CRTP & Policies",
    subtitle: "Static polymorphism and policy classes",
    language: "cpp",
    tags: ["patterns", "templates", "design"],
    theoryTopics: ["Static polymorphism", "CRTP counters", "Policy classes"],
    codeTemplate: `#include <iostream>

template <typename Derived>
struct Counter {
    static int live() { return Derived::count_; }
};

struct Widget : Counter<Widget> {
    Widget() { count_++; }
    ~Widget() { count_--; }
    static int count_;
};

int Widget::count_ = 0;

template <typename T>
struct ClampPolicy {
    static T clamp(T v, T lo, T hi) { return v < lo ? lo : (v > hi ? hi : v); }
};

int main() {
    Widget a, b;
    std::cout << Widget::live() << std::endl;
    {
        Widget c;
        std::cout << Widget::live() << std::endl;
    }
    std::cout << Widget::live() << std::endl;
    std::cout << ClampPolicy<int>::clamp(99, 0, 10) << std::endl;
    return 0;
}`,
  },
  {
    title: "Performance: Measure & Optimize",
    subtitle: "Honest benchmarks, fewer copies, planned capacity",
    language: "cpp",
    tags: ["performance", "best-practices"],
    theoryTopics: ["Benchmarking honestly", "Avoiding copies", "Capacity planning"],
    codeTemplate: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> indexed;
    indexed.reserve(1000);
    for (int i = 0; i < 1000; i++) indexed.push_back(i);
    long sum = 0;
    for (size_t i = 0; i < indexed.size(); i++) sum += indexed[i];
    std::cout << indexed.size() << " " << sum << std::endl;
    std::cout << (indexed.capacity() >= 1000 ? 1 : 0) << std::endl;
    return 0;
}`,
  },
  {
    title: "Allocators & Custom Memory",
    subtitle: "Placement new, pools, and manual lifetimes",
    language: "cpp",
    tags: ["memory", "performance"],
    theoryTopics: ["Placement new", "Pool allocation", "Manual lifetimes"],
    codeTemplate: `#include <iostream>
#include <new>
#include <string>

struct Node {
    explicit Node(int v) : value(v) { std::cout << "built " << value << std::endl; }
    ~Node() { std::cout << "torn down " << value << std::endl; }
    int value;
};

int main() {
    alignas(Node) unsigned char pool[sizeof(Node)];
    Node* n = new (pool) Node(42);
    std::cout << n->value << std::endl;
    n->~Node();
    std::string* sp = new std::string("pool");
    std::cout << *sp << std::endl;
    delete sp;
    return 0;
}`,
  },
  {
    title: "Coroutines Thinking: State Machines",
    subtitle: "Generators and lazy sequences by hand",
    language: "cpp",
    tags: ["coroutines", "patterns", "modern-cpp"],
    theoryTopics: ["Generator pattern", "State machines", "Lazy sequences by hand"],
    codeTemplate: `#include <iostream>

class Counter {
public:
    Counter(int from, int to) : cur_(from), end_(to) {}
    bool done() const { return cur_ > end_; }
    int next() { return cur_++; }

private:
    int cur_, end_;
};

int main() {
    Counter gen(1, 4);
    int total = 0;
    while (!gen.done()) {
        int v = gen.next();
        std::cout << v << " ";
        total += v;
    }
    std::cout << std::endl << total << std::endl;
    return 0;
}`,
  },
  {
    title: "Modules (C++20 Preview)",
    subtitle: "Why modules replace the header model",
    language: "cpp",
    tags: ["modules", "build", "modern-cpp"],
    theoryTopics: ["Why modules", "Interface vs implementation", "Migration path"],
    codeTemplate: `// math.cppm — C++20 module interface (needs -std=c++20 and a module-aware build)
// export module math;
// export int add(int a, int b) { return a + b; }
//
// app.cpp
// import math;
// #include <iostream>
// int main() {
//     std::cout << add(2, 3) << std::endl;
//     return 0;
// }
//
// Build with a C++20 toolchain:
//   g++ -std=c++20 -fmodules-ts -c math.cppm
//   g++ -std=c++20 app.cpp math.o -o app`,
  },
  {
    title: "Tooling: Sanitizers & Warnings",
    subtitle: "-Wall, ASan, UBSan, and clean-code habits",
    language: "cpp",
    tags: ["tools", "debugging", "best-practices"],
    theoryTopics: ["Wall Wextra Werror", "ASan & UBSan", "Clean-code habits"],
    codeTemplate: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    int sum = 0;
    for (size_t i = 0; i < v.size(); i++) sum += v.at(i);
    std::cout << sum << std::endl;
    int* p = new int(7);
    std::cout << *p << std::endl;
    delete p;
    p = 0;
    std::cout << (p == 0) << std::endl;
    return 0;
}`,
  },
  {
    title: "Networking Concepts",
    subtitle: "Endpoints, parsing, and length-prefix framing",
    language: "cpp",
    tags: ["networking", "strings"],
    theoryTopics: ["Sockets overview", "Parsing endpoints", "Length-prefix framing"],
    codeTemplate: `#include <iostream>
#include <string>
#include <sstream>

bool parse_endpoint(const std::string& ep, std::string& host, int& port) {
    size_t c = ep.rfind(':');
    if (c == std::string::npos) return false;
    host = ep.substr(0, c);
    port = std::stoi(ep.substr(c + 1));
    return true;
}

std::string frame(const std::string& payload) {
    std::ostringstream out;
    out << payload.size() << ":" << payload;
    return out.str();
}

int main() {
    std::string host;
    int port = 0;
    bool ok = parse_endpoint("127.0.0.1:8080", host, port);
    std::cout << ok << " " << host << " " << port << std::endl;
    std::cout << frame("hello") << std::endl;
    std::cout << parse_endpoint("no-port-here", host, port) << std::endl;
    return 0;
}`,
  },
  {
    title: "Serialization with Streams",
    subtitle: "Text wire formats and round-trip testing",
    language: "cpp",
    tags: ["files", "streams", "testing"],
    theoryTopics: ["Text wire formats", "Escaping & delimiters", "Round-trip testing"],
    codeTemplate: `#include <iostream>
#include <sstream>
#include <string>
#include <cassert>

struct Book {
    std::string title;
    int year;
};

std::string to_line(const Book& b) {
    std::ostringstream out;
    out << b.title << "|" << b.year;
    return out.str();
}

Book from_line(const std::string& line) {
    Book b;
    size_t bar = line.find('|');
    b.title = line.substr(0, bar);
    b.year = std::stoi(line.substr(bar + 1));
    return b;
}

int main() {
    Book original;
    original.title = "Dune";
    original.year = 1965;
    std::string wire = to_line(original);
    std::cout << wire << std::endl;
    Book back = from_line(wire);
    assert(back.title == original.title && back.year == original.year);
    std::cout << "round-trip ok" << std::endl;
    return 0;
}`,
  },
  {
    title: "Undefined Behavior Deep",
    subtitle: "Uninitialized reads, overflow, and widening",
    language: "cpp",
    tags: ["correctness", "best-practices"],
    theoryTopics: ["Uninitialized reads", "Signed overflow", "Widen-before-multiply"],
    codeTemplate: `#include <iostream>
#include <vector>

int main() {
    int x = 0;
    std::cout << x << std::endl;
    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    size_t last = v.size() - 1;
    std::cout << v.at(last) << std::endl;
    int a = 1000000;
    long long wide = static_cast<long long>(a) * 1000000;
    std::cout << wide << std::endl;
    return 0;
}`,
  },
  {
    title: "Portability & Cross-Platform",
    subtitle: "Fixed-width integers and sizeof guarantees",
    language: "cpp",
    tags: ["portability", "types"],
    theoryTopics: ["Fixed-width integers", "sizeof guarantees", "Feature macros"],
    codeTemplate: `#include <iostream>
#include <cstdint>

int main() {
    int32_t a = 2000000000;
    int64_t wide = static_cast<int64_t>(a) + 2000000000;
    std::cout << wide << std::endl;
    uint8_t byte = 0xFF;
    std::cout << static_cast<int>(byte) << std::endl;
    std::cout << (sizeof(int32_t) == 4) << (sizeof(int64_t) == 8) << std::endl;
    return 0;
}`,
  },
  {
    title: "Code Review & Style",
    subtitle: "Naming, const habits, and safe refactoring",
    language: "cpp",
    tags: ["style", "best-practices"],
    theoryTopics: ["Naming & const habits", "Review checklists", "Refactoring safely"],
    codeTemplate: `#include <iostream>
#include <string>
#include <vector>

int total_scores(const std::vector<int>& scores) {
    int total = 0;
    for (size_t i = 0; i < scores.size(); i++) total += scores[i];
    return total;
}

int main() {
    std::vector<int> scores;
    scores.push_back(10);
    scores.push_back(20);
    scores.push_back(30);
    std::cout << total_scores(scores) << std::endl;
    std::cout << scores.size() << std::endl;
    return 0;
}`,
  },
  {
    title: "Capstone Prep: Architecture",
    subtitle: "From requirements to modules to interfaces",
    language: "cpp",
    tags: ["capstone", "design", "project"],
    theoryTopics: ["Requirements to modules", "Core data operations", "Interface-first design"],
    codeTemplate: `#include <iostream>
#include <string>
#include <vector>

struct Task {
    std::string title;
    bool done;
};

void add_task(std::vector<Task>& tasks, const std::string& title) {
    Task t;
    t.title = title;
    t.done = false;
    tasks.push_back(t);
}

int open_count(const std::vector<Task>& tasks) {
    int n = 0;
    for (size_t i = 0; i < tasks.size(); i++)
        if (!tasks[i].done) n++;
    return n;
}

int main() {
    std::vector<Task> tasks;
    add_task(tasks, "design module layout");
    add_task(tasks, "write interfaces");
    add_task(tasks, "implement + test");
    tasks[0].done = true;
    std::cout << tasks.size() << " " << open_count(tasks) << std::endl;
    std::cout << tasks[1].title << std::endl;
    return 0;
}`,
  },
  {
    title: "Capstone: Personal Library Manager",
    subtitle: "A complete C++ application, persistent and tested",
    language: "cpp",
    tags: ["capstone", "project"],
    theoryTopics: ["Collection design", "Persistence & tests", "Polish & next steps"],
    codeTemplate: `#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <cassert>

struct Book {
    std::string title;
    bool lent;
};

void checkout(std::vector<Book>& shelf, size_t i) {
    assert(i < shelf.size());
    shelf[i].lent = true;
}

int shelf_open(const std::vector<Book>& shelf) {
    int n = 0;
    for (size_t i = 0; i < shelf.size(); i++)
        if (!shelf[i].lent) n++;
    return n;
}

int main() {
    std::vector<Book> shelf;
    Book b1;
    b1.title = "Dune";
    b1.lent = false;
    shelf.push_back(b1);
    Book b2;
    b2.title = "Ender's Game";
    b2.lent = false;
    shelf.push_back(b2);
    Book b3;
    b3.title = "Foundation";
    b3.lent = false;
    shelf.push_back(b3);
    checkout(shelf, 1);
    std::cout << shelf.size() << " " << shelf_open(shelf) << std::endl;
    std::ofstream out("asta_library.txt");
    for (size_t i = 0; i < shelf.size(); i++)
        out << shelf[i].title << "|" << shelf[i].lent << "\n";
    out.close();
    std::cout << "saved" << std::endl;
    return 0;
}`,
  },
];

/* ─── Hand-written topic content ─── */

const CPP_TOPIC_CONTENT: Record<string, string> = {
  "Why C++": "C++ is C with ergonomics — and then a lot more. It keeps C's speed and direct control over memory, while adding classes, templates, and a standard library that turn 'the hard way' into 'the normal way'. Today it powers game engines, browsers, operating systems, trading systems, and most of the software between you and the silicon. Learning C++ after C is the fastest route to 'I can build anything that needs to go fast'.",
  "The iostream library": "`<iostream>` provides `std::cout`, `std::cin`, and `std::cerr` for input and output. Output uses the shift operator: `std::cout << \"value: \" << 42;` — each `<<` pushes the next piece onto the stream. This is type-safe by design: the stream knows how to print ints, doubles, strings, and any type you teach it with `operator<<`. Unlike printf, there is no format string to get wrong.",
  "main() and the build pipeline": "Every C++ program starts at `main()`, which returns an int status code — 0 means success, anything else signals an error to the operating system. The pipeline is: compiler turns each .cpp file into object code, then a linker fuses them (plus the standard library) into one executable. Header files carry declarations so the compiler knows what to expect; definitions live in .cpp files.",
  "Fundamental types": "C++ inherits C's fundamental types — `int`, `double`, `float`, `char`, `bool`, plus the fixed-width `<cstdint>` types like `int32_t`. A `bool` prints as 0 or 1. Types have defined minimum sizes but not always exact ones; `int` is typically 4 bytes, `double` 8. The type you choose decides range, memory cost, and how the value behaves in arithmetic.",
  "Initialization syntax": "C++ offers several ways to initialize a variable: `int a = 5;`, `int b(5);`, and the brace form `int c{5};`. Brace initialization is the modern default — it is uniform across types and refuses narrowing conversions (like shoving a double into an int) that the older forms silently allow. Prefer `int c{5};`; it turns a whole class of bugs into compile errors.",
  "Type sizes": "`sizeof(type)` reports a type's size in bytes. `sizeof(int)` is usually 4, `sizeof(char)` is always 1 by definition. `sizeof` is a compile-time constant — no runtime cost. Knowing sizes matters when you manage memory, marshal data to disk, or just want to guess how many cache lines an object touches.",
  "const": "`const` promises a value will not change after initialization — and the compiler enforces the promise. It costs nothing and documents intent, and it enables the optimizer to assume stability. `const` references (like `const std::string&`) are the idiomatic way to pass large objects to functions without copying and without risking mutation.",
  "constexpr": "`constexpr` goes one step further than `const`: the value must be computable at compile time, so it can live in read-only memory and cost literally nothing at runtime. `constexpr` variables are evaluated by the compiler; `constexpr` functions can run at compile time when called with constant arguments, and at runtime otherwise. It is how C++ does compile-time programming.",
  "auto type deduction": "`auto` tells the compiler to deduce the type from the initializer: `auto x = 42;` deduces `int`, `auto s = std::string(\"hi\");` deduces `std::string`. It is not dynamic typing — the type is fixed at compile time, you just don't write it. Use `auto` for complex types (iterators, lambdas, template results) and spell out simple ones when it aids readability.",
  "Arithmetic operators": "The usual `+`, `-`, `*`, `/`, `%` work as in C. `%` (modulo) only applies to integers and returns the remainder. Assignment operators (`+=`, `-=`, `*=`, `/=`), increment (`++`), and decrement (`--`) are all inherited from C. Division is the one that surprises: two ints always divide as integers — see 'Integer division'.",
  "Integer division": "When both operands are integers, `/` truncates toward zero: `7 / 2 == 3`, `-7 / 2 == -3`. If either operand is floating point, you get true division: `7.0 / 2 == 3.5`. If you want a fractional result, make at least one operand a double — a cast works, but changing the literal is cleaner. Truncation is silently destructive, so notice when it bites.",
  "Precedence": "Operators apply in a fixed order: `*` and `/` bind tighter than `+` and `-`, assignment looser still. When in doubt, parenthesize — clarity beats cleverness, and compilers optimize either way. One classic trap: `a + b << 1` means `(a + b) << 1`, because `+` binds tighter than the shift. Parentheses make the intent visible to the reader, not just the compiler.",
  "std::string": "`std::string` is C++'s text type: a growable buffer of characters with value semantics. You concatenate with `+`, compare with `==`, get the length with `.size()`, index with `[]`, and slice with `.substr()`. It manages its own memory — no manual allocation, no null terminator, no strcpy. It is the default answer to 'text' in C++.",
  "Concatenation & methods": "`s1 + s2` builds a new string; `s1 += \"!\";` appends in place. Handy methods: `size()`/`length()` (same thing), `substr(pos, len)`, `find(sub)`, `replace`, `compare`, and `c_str()` when a C function insists on a `const char*`. `empty()` beats `size() == 0`. Strings are mutable sequences, so almost everything you'd do to a vector, you can do to a string.",
  "Reading and comparing": "`s1 == s2` compares contents, not addresses — a pleasant break from C, where `==` on char arrays compares pointers. Lexicographic ordering comes free with `<`. Strings grow to fit what you store, so reading text (from cin, files, or other strings) is safe and convenient.",
  "std::cin": "`std::cin >> x` reads one whitespace-delimited token and converts it to the type of `x`. It skips leading whitespace and stops at the next space or newline — so it is wrong for reading a name with spaces. That is what `std::getline(std::cin, line)` is for. Check the stream state: after a failed read (like typing letters for an int), the stream goes into an error state you must clear.",
  "std::cout formatting": "`std::cout << value` prints anything with an `operator<<`. Control formatting with manipulators: `std::fixed` and `std::setprecision(2)` for decimals, `std::setw(n)` for column width, `std::boolalpha` to print `true`/`false` instead of 1/0. These stream out in order, so `std::cout << std::fixed << std::setprecision(2) << 3.14159;` prints `3.14`.",
  "Reading whole lines": "`std::getline(std::cin, line)` reads everything up to the newline into a std::string — spaces included. A classic gotcha: `cin >> x` leaves the newline behind, so a subsequent getline reads an empty line. Clear the leftover with `std::cin.ignore()` after mixing the two. This small detail trips up virtually every beginner.",
  "if / else if / else": "Identical to C: `if (cond) { } else if (cond) { } else { }`. Braces are optional around a single statement but always safer. The condition must be something convertible to bool — an int works (nonzero is true), a pointer works (`nullptr` is false), and since C++20 you can declare the test variable in the condition: `if (auto it = find(...); it != end)`.",
  "switch statements": "`switch` dispatches on an integer or enum value and jumps directly to the matching case — faster and clearer than a long if-chain when the choice is one value among many. Every case needs a `break` (or `return`) or it falls through to the next case. `default:` handles unmatched values. Prefer `switch` over repeated `else if (x == n)` for readability.",
  "Comparison & logical operators": "`==`, `!=`, `<`, `<=`, `>`, `>=` return bools. Combine with `&&`, `||`, `!`, which short-circuit: `a && b` stops evaluating if `a` is false. Beware the classic slip `if (x = 5)` — assignment, always true, and often a silent bug; the compiler warning exists precisely because of it.",
  "for loops": "`for (init; condition; step)` is the classic loop: initialize a counter, check a condition, advance. The three parts are optional — `for (;;)` is an infinite loop. Declare the loop variable inside the init (`for (int i = 0; ...)`) to keep its scope tight. For iterating containers, prefer the range-based for from Day 16 — it removes the index math entirely.",
  "while & do-while": "`while (cond)` checks before every iteration — zero iterations is legal. `do { } while (cond)` checks after, so the body always runs at least once — right for menus and 'repeat until valid' input loops. Any for-loop can be rewritten as a while and vice versa; choose whichever reads closer to the logic.",
  "break and continue": "`break` exits the innermost loop immediately; `continue` skips to the next iteration (re-checking the condition). Use `break` to leave search loops the moment the target is found, `continue` to filter — handle only interesting items, skip the rest. Both keep loop bodies flat and avoid deeply nested flags.",
  "Function declarations": "A function needs a declaration before you call it: the return type, name, and parameter list. Define it once — either directly, or declare it in a header and define it in a .cpp. `void` means no return value. Parameters with default values (`int f(int x, int y = 5)`) let callers omit trailing arguments. Declarations let the compiler check every call against the signature.",
  "Parameters & return": "Parameters are copied into the function unless you pass by reference or pointer. Return values come back by value (copy) — the compiler usually elides the copy. For large objects, pass `const std::string&` to avoid copies; use plain values for small built-ins. `return` hands a value back and immediately exits.",
  "Pass by value vs reference": "Pass by value copies the argument; pass by reference (`int& x`) aliases the caller's variable, and `const int& x` aliases it read-only. By-value is right for small, cheap types; references are right when you must modify the caller's variable or avoid a big copy. Default rule: pass built-ins by value, pass objects by `const&`, return by value.",
  "Function overloading": "C++ lets multiple functions share a name if their parameter lists differ in type or count — the compiler picks the right one by the arguments you pass. `area(int, int)` and `area(double)` can coexist. This is compile-time dispatch: no runtime cost, just a name reused meaningfully. Keep overloads consistent in intent — same concept, different input types.",
  "Default arguments": "`int power(int base, int exp = 2)` lets callers write `power(3)` or `power(3, 4)`. Defaults must trail every non-defaulted parameter. The default is baked in at the call site — it is shorthand, not a second function. Defaults plus overloading cover most 'same idea, different amounts of input' cases without duplicating logic.",
  "inline functions": "`inline` hints the compiler to expand the function body at each call site instead of jumping to it — removing call overhead for tiny, hot functions. In practice the compiler decides on its own (it usually inlines better than you). The real use of `inline` today is allowing function definitions in headers without duplicate-symbol linker errors.",
  "Recursion basics": "A recursive function calls itself to solve a smaller version of the same problem. Each call gets its own parameters and locals on the call stack. Two pieces make it work: the base case (when to stop) and the recursive step (getting smaller). Factorial, tree traversal, and divide-and-conquer are naturally recursive — the code mirrors the problem's structure.",
  "Base cases": "The base case is the branch that returns without recursing — the smallest problem you can answer directly. It is what stops the recursion; without it the stack overflows. The recursive step must move toward the base case on every call. A missing or unreachable base case is the classic cause of infinite recursion — and a crash, not a hang.",
  "Recursion vs iteration": "Anything recursive can be written with a loop and a stack; anything iterative can be written recursively. Iteration usually wins on performance and stack safety; recursion wins on clarity for naturally nested structures. Compilers can even turn tail-recursive calls into loops. Choose recursion where the recursive shape is the honest shape — otherwise, loop.",
  "References": "A reference is an alias — another name for an existing object. `int& ref = x;` and `ref` is x from then on; assigning to `ref` changes `x`. References cannot be reseated (they always refer to the object they were bound to) and are never null. They are the ergonomic successor to pointers for parameter passing — see 'References vs pointers'.",
  "const references": "`const std::string& s` binds to a string without copying and without allowing mutation. This is the workhorse signature of modern C++: big objects travel through function calls for free and safely. A `const&` can bind to temporaries too, extending their lifetime to the end of the expression — which is why `\"literal\"` works when passed to a `const std::string&`.",
  "References vs pointers": "Both refer to something else, but references are safer and pointers are more flexible. References: always valid, can't be reseated, no `->` syntax, no null-checks. Pointers: can be null (and reassigned, and made into pointers-to-pointers), and are required for polymorphism and dynamic allocation. Default to references; reach for pointers when you need null, reseating, or arrays.",
  "Addresses & dereferencing": "`&x` is the address of `x`; a pointer variable stores one. `*ptr` dereferences — it follows the pointer to the object it points to. `ptr->member` is shorthand for `(*ptr).member`. A pointer is just an integer-sized value holding a memory address; dereferencing an invalid or null pointer is undefined behavior and the classic crash.",
  "nullptr": "`nullptr` is the typed, modern way to say 'points at nothing'. It converts to any pointer type (and smart pointers) but never to an int, so it cannot be silently mixed into arithmetic like the old `NULL`. Always initialize pointers to `nullptr` when you don't have a target yet, and check for null before dereferencing when there is any chance the pointer may be empty.",
  "Pointers and arrays": "An array name decays to a pointer to its first element, so `arr` and `&arr[0]` are the same address. Pointer arithmetic follows the type: `ptr + 1` steps one element (4 bytes for an int), not one byte. This is why arrays and pointers feel interchangeable in C-style code — but `std::array` and `std::vector` give you the same power with bounds safety.",
  "C-style arrays": "`int arr[5];` allocates 5 contiguous ints. The cost: the size is part of the type and decays to a pointer when passed to functions, so you lose the length and get no bounds checking — `arr[7]` compiles and corrupts memory. C-style arrays still appear everywhere (string literals, C APIs), but prefer `std::array` for fixed-size and `std::vector` for dynamic.",
  "std::array": "`std::array<int, 5>` wraps a C array with a real type: it knows its size (`.size()`), supports iterators and range-for, and `.at(i)` throws on out-of-bounds instead of corrupting memory. No heap allocation — it lives entirely on the stack. This is the type to use for fixed-size collections of known-at-compile-time length.",
  "Bounds & iteration": "The most common array bug is indexing past the end — silent in C-style arrays, a thrown `std::out_of_range` with `.at()`, and UB with `[]`. Iteration idioms that avoid the whole class: range-based for, iterators, or `std::array`/`std::vector` with `.size()` and `.at()`. Modern C++ makes out-of-bounds the exception rather than the default.",
  "std::vector": "`std::vector<T>` is the workhorse dynamic array: contiguous storage, O(1) index access, amortized O(1) push_back, and automatic growth — it reallocates and copies/moves its elements when it runs out of room. It is safe (bounds via `.at()`, knows its size) and flexible. Reach for vector first whenever you need a sequence whose size changes.",
  "push_back and friends": "`push_back(x)` appends; `pop_back()` removes the last; `insert(it, x)` and `erase(it)` work at any position (O(n) — shuffling elements); `resize(n)` grows or shrinks; `reserve(n)` preallocates capacity to avoid repeated reallocations when you know the size ahead. `size()` is the number of elements, `capacity()` the allocated space. `front()`/`back()` reach the ends.",
  "Iterators": "An iterator is a generalization of a pointer that 'points into' a container. `begin()` returns one at the first element, `end()` one past the last. Algorithms consume ranges as `[begin, end)`: `std::sort(v.begin(), v.end())`. Iterators unify containers and algorithms — the same sorting code works on vectors, strings, arrays, and deques. `auto it = v.begin();` reads as 'the position in v'.",
  "Range-based for loops": "`for (int n : nums)` visits every element of a container without index math or iterators. Use a plain value to copy, `int& n` to modify, `const int& n` for read-only on big elements. It is sugar over iterators — the compiler rewrites it to a begin/end loop. This is the default way to iterate in modern C++; reach for indices only when you truly need positions.",
  "auto and references in loops": "In a range-for, `for (auto n : nums)` copies each element; `for (auto& n : nums)` mutates the originals; `for (const auto& n : nums)` reads large elements without copying. The copy version is the silent perf trap with vectors of big objects. Pairing `auto` with the right reference form is the single most common correctness/performance decision in loops.",
  "When not to use it": "Range-for has no index — you can't know which position you're at or skip positions. It also invalidates if you modify the container while iterating (inserting/erasing inside the loop is undefined behavior). For those cases use a classic for-loop with an index, or algorithm + iterator. Range-for shines for pure 'visit every element' reads and simple mutations.",
  "Structs": "A struct groups related data into one type: `struct Point { int x, y; };`. Unlike C, C++ structs can also have member functions and access specifiers — they differ from classes only in that members are public by default. Use structs for passive data bags (points, configs, records) and classes when you need invariants and encapsulation.",
  "Member functions": "A function declared inside a struct/class becomes a method — it is called as `obj.method()` and can read the object's members. Mark it `const` (like `void describe() const`) if it doesn't mutate the object; that's the modern default and it's required to call methods on const objects. Member functions are how a data type gets behavior.",
  "Default member initializers": "`int grade = 0;` inside the struct gives every instance that starting value — applied before constructors run. This kills the 'forgot to initialize' bug class: any member with a default is guaranteed initialized even if you forget it in a constructor. Use them for every member you can; reserve the constructor for values that differ per object.",
  "Classes": "A class is a user-defined type with data and behavior, plus control over access (see 'Access specifiers'). The idea is encapsulation: an object owns its state and exposes a controlled interface. C++ classes give you constructors, destructors, inheritance, and polymorphism — the full object-oriented toolkit on top of C's data model.",
  "Access specifiers": "`private`, `protected`, and `public` control who can touch members. Private members are only reachable from inside the class — this is how invariants stay intact (nobody can set your balance to -50). Public is the interface. `protected` hands access to derived classes only. Default is `private` for classes, `public` for structs.",
  "Why encapsulation": "Encapsulation means the object's internals are an implementation detail, changeable without breaking callers. Balance as a private field with deposit/withdraw methods can enforce 'no negative balance' in one place instead of in every call site. It is not about hiding data from people — it is about making illegal states unrepresentable.",
  "Constructors": "A constructor runs automatically when an object is created, guaranteeing every object starts in a valid state. It shares the class name and has no return type. Constructors can be overloaded (`Person()`, `Person(name, age)`) and defaulted with `= default` when you want the compiler's trivial version. This is the first thing a class does — make it set up the invariant.",
  "Member initializer lists": "`: name_(name), age_(age)` after the constructor signature initializes members directly, before the constructor body runs. Members are initialized in declaration order, not list order. Prefer the initializer list over assignments in the body — it avoids default-constructing then overwriting, and it's required for `const` and reference members.",
  "Default & parameterized": "A default constructor takes no arguments; a parameterized one takes some. `Person p;` calls the default; `Person p{\"Ada\", 36};` calls the parameterized. A class with no constructors at all gets an implicit default (and its members get default-constructed). Define a default constructor explicitly when one exists but you also want a parameterized one.",
  "Destructors": "A destructor runs automatically when an object dies — when a stack object goes out of scope, or `delete` is called on a heap object. Its job: release what the object owns (files, memory, locks). Declared `~ClassName()`. Relying on destructors to clean up is the heart of RAII — see Day 20.",
  "RAII": "Resource Acquisition Is Initialization: acquire resources in the constructor, release them in the destructor. The compiler guarantees the destructor runs when the object's scope ends — even on exceptions. So a mutex lock, file handle, or heap allocation becomes a local variable that cleans itself up. `std::lock_guard`, `std::fstream`, and smart pointers are RAII in action. It is the most important idiom in C++.",
  "The rule of three": "If a class manages a resource (heap memory, a file, a handle), it almost certainly needs three things: a destructor (to release), a copy constructor, and a copy assignment operator. Failing to write all three leaks, double-frees, or shares state you thought was copied. The modern fix is often simpler: use RAII types like std::string and smart pointers so the rule collapses to 'no custom code needed'.",
  "Inheritance": "`class Dog : public Animal` makes Dog a kind of Animal: it inherits Animal's public interface and can add its own. Inheritance models 'is-a' and lets code written for the base work on all derived types. `public` inheritance is the normal kind; `private`/`protected` are implementation details you rarely need. Use it to share behavior, not to share code — see polymorphism for the payoff.",
  "Access & overriding": "A derived class can add members and redefine inherited ones. Overriding a member function: declare it with the same signature; use `override` to tell the compiler to verify. Private base members stay private to the base — the derived class can't touch them, only the base's protected/public API. Design the base's interface around what derived types should expose.",
  "The is-a relationship": "Inheritance says Dog is-a Animal: a Dog can be used wherever an Animal is expected. A pointer to Animal can hold a Dog. This substitution is only safe if everything the base promises, every derived type honors — which is exactly what virtual functions enforce. If you can't honestly say X is-a Y, prefer composition (X has-a Y) instead.",
  "Virtual functions": "Declaring a function `virtual` in the base means the call is dispatched to the most-derived version at runtime — `shape->area()` runs the Circle's area, not the base's, even through an Animal pointer. This is dynamic polymorphism, the core of object-oriented C++. It costs one pointer-sized table lookup per virtual call — small, and worth it.",
  "override and virtual destructors": "Mark overriding functions `override` so the compiler checks you really are overriding (catching typos and signature mismatches). If a class has virtual functions, its destructor must be virtual too — otherwise deleting a derived object through a base pointer runs only the base destructor and leaks the derived part. Rule: polymorphic base ⇒ virtual destructor.",
  "Abstract classes": "A class with at least one pure virtual function (`= 0`) is abstract — you cannot instantiate it, only derive from it. It is a contract: 'anything that is a Shape must provide area().' Derived classes that implement every pure virtual become concrete. Abstract classes are how you design interfaces and families of interchangeable types in C++.",
  "operator+": "`a + b` calls `a.operator+(b)` (or a free `operator+(a, b)`). Defining these lets your type participate in normal arithmetic syntax. Keep them faithful: `+` returns a new combined value, doesn't mutate its operands. The habit of 'make operators behave exactly like the built-in ones' prevents a world of surprise.",
  "ostream operator<<": "`std::ostream& operator<<(std::ostream& out, const Point& p)` teaches cout (and every ostream) to print your type. It returns the stream so `<<` chains. Defining `operator<<` makes debugging dramatically easier — `std::cout << point` just works, and so does putting your object in log output.",
  "Friend functions": "`friend` lets a free function or class reach private members. It is used when the natural operator can't be a member — like `operator<<`, whose left operand is the stream. Friendship is granted, not taken: the class explicitly lists its friends. Use sparingly; it's a targeted hole in encapsulation, not an invitation.",
  "std::unique_ptr": "`std::unique_ptr<T>` owns a heap object exclusively — no copies, single owner. When the pointer dies (scope end, exception), it deletes the object automatically. Created with `std::make_unique<T>(args)`. Move it to transfer ownership; the 'one owner at a time' rule makes ownership flow explicit and leaks impossible. This is the default smart pointer.",
  "std::shared_ptr": "`std::shared_ptr<T>` shares ownership: the object lives until the last shared_ptr to it dies. Reference counting makes it cheap-ish but not free (atomic increments), and cycles leak — a shared_ptr cycle never frees. Use `std::make_shared<T>(args)` and share only when ownership genuinely is shared. Otherwise prefer unique_ptr: it's zero-overhead and the intent is clearer.",
  "When to use which": "Reach for `unique_ptr` by default — exclusive ownership, zero overhead, no surprise lifetimes. `shared_ptr` only when multiple owners genuinely share an object (caches, graphs, observers). `weak_ptr` observes a shared object without extending its life, breaking cycles. Raw pointers/`new` are for non-owning views and legacy code. The ownership type should be visible in the signature.",
  "Template basics": "A template is a recipe the compiler fills in: `template <typename T> T maximum(T a, T b)` generates a concrete function per type you call it with. It is compile-time polymorphism — no runtime cost, full type safety, and it works on any type that satisfies the operations used. Write the logic once, get a specialized version for int, double, string, and anything else that supports `>`.",
  "Type deduction": "When you call `maximum(3, 7)`, the compiler deduces `T = int` from the arguments. Deduction can fail when arguments disagree — `maximum(3, 2.5)` has no single T — and you can pin the type explicitly: `maximum<double>(3, 2.5)`. Understanding what the compiler can deduce for you (and what it can't) is the difference between templates that 'just work' and walls of errors.",
  "Templates vs overloading": "Overloading picks among named functions by signature; templates generate one function per type. Overloading is for different behaviors on different types; templates are for identical behavior across types. They compose: a template provides the general case, and a specific overload for one type can specialize behavior. Modern C++ leans on templates + concepts for generic code.",
  "Class templates": "`template <typename T> class Box` defines a type family — `Box<int>`, `Box<std::string>` are distinct concrete classes generated on demand. The standard containers are all class templates: `std::vector<T>`, `std::map<K, V>`. Member functions are defined inside the class (implicitly inline) or with `template <typename T> ... Box<T>::` syntax outside. This is how generic, reusable data structures are built.",
  "std::vector under the hood": "A vector is a pointer to a heap buffer, plus size and capacity. On push_back past capacity, it allocates a bigger buffer, moves (or copies) the elements over, and frees the old one — which is why capacity is important: reserve avoids repeated move storms. Because storage is contiguous, `&v[0]` is a plain C array you can hand to C APIs. Know this and vector's behavior stops being magic.",
  "Concepts (C++20)": "Concepts let templates say what they require: `template <typename T> requires std::integral<T>` or the shorthand `template <std::integral T>`. Instead of a wall of cryptic errors when deduction fails, you get a clear message: 'the constraints were not satisfied.' Concepts turn generic programming from guesswork into contracts — the reason C++20 templates are finally approachable.",
  "std::map & std::set": "`std::map<K, V>` is a sorted key→value tree; `std::set<T>` is its value-only cousin. Lookup, insertion, and removal are O(log n). Iteration visits keys in sorted order. Both are ordered — that ordering is the feature. If you never need sorted traversal, the hash-based `unordered_map`/`unordered_set` give O(1) lookups instead.",
  "std::unordered_map": "`std::unordered_map<K, V>` is a hash table: average O(1) lookup, insertion, and removal. Use it for the classic 'count occurrences', 'group by key', 'cached lookup' patterns. It is unordered — iteration order is arbitrary. `operator[]` inserts a default value when the key is missing (a trap); use `.find()` or `.contains()` (C++20) when you only want to look up.",
  "Choosing a container": "Default to `std::vector` for sequences. Sorted keys or range queries → `std::map`/`std::set`. Hash lookups by key → `unordered_map`/`unordered_set`. Need queue behavior → `deque`. Need fast insertion in the middle → `list` (rarely worth it). The choice is about what you do most: index, search by key, or traverse in order. Pick the container whose strengths match the workload.",
  "sort & transform": "`std::sort(begin, end)` sorts in place (O(n log n)); add a comparator `std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; })` for descending or custom order. `std::transform` maps a function over a range into another: `std::transform(a.begin(), a.end(), out.begin(), [](int n) { return n * 2; })`. These two cover the majority of 'reorder' and 'reshape' work.",
  "find & accumulate": "`std::find(begin, end, value)` returns an iterator to the first match — or `end()` if absent, so always compare the result to `end()`. `std::accumulate(begin, end, init)` folds a range down to one value, optionally with a binary op: `std::accumulate(begin, end, 0, [](int s, int n) { return s + n; })`. Together with count_if and sort they cover most 'search and summarize' needs.",
  "Iterators as glue": "Algorithms never touch containers directly — they take iterator pairs. That is why `std::sort` works on vectors, arrays, strings, and deques alike, and why you can sort a file stream's worth of data with `istream_iterator`. Iterators are the interface contract that makes the STL composable: any container + any algorithm, as long as the iterators satisfy the algorithm's requirements.",
  "Lambda syntax": "`[captures](params) -> return { body }` — square brackets, parentheses, optional return type, body. `[](int n) { return n * 2; }` is a nameless function object created inline. Lambdas are the modern replacement for functors: pass them to algorithms, store them in `std::function`, call them wherever a callable is wanted.",
  "Captures": "`[]` captures nothing; `[x]` copies x; `[&x]` references x; `[=]` copies everything used; `[&]` references everything. Prefer explicit captures — they document what the lambda depends on. A captured value is fixed at lambda creation time, so `[count]` is a snapshot while `[&count]` sees later changes. Choose `[&]` for objects you'd hate to copy, `[=]` for cheap snapshots.",
  "Lambdas with algorithms": "The pairing that defines modern C++: `std::count_if(nums.begin(), nums.end(), [](int n) { return n % 2 == 0; })`. The lambda is the algorithm's custom step — the predicate, the comparator, the transform. No separate functor class, no function pointer ceremony; the logic lives right next to the algorithm that uses it. This is the idiom that made the STL pleasant.",
  "ofstream / ifstream": "`std::ofstream out(\"file.txt\")` opens a file for writing (creating/truncating), `std::ifstream in(\"file.txt\")` for reading. Check the stream after opening: `if (!out) { /* failed */ }`. RAII closes the file when the stream goes out of scope. Add `std::ios::app` to append instead of truncate. Reading and writing files is barely more work than cout/cin.",
  "Reading files line by line": "`while (std::getline(in, line))` reads one line per iteration and stops cleanly at EOF — the loop test is the stream's boolean state. This handles files of any size. For tokenized data, `in >> value` skips whitespace and parses each field. Always check open success before assuming the file exists; a missing file is a silent empty loop otherwise.",
  "String streams": "`std::stringstream` treats a string as a stream: `ss << 42 << \" apples\";` then `ss.str()` returns the built text, or `ss >> num` parses from it. It is the conversion tool — format a number into a padded string, parse a comma-separated line, build a log message. `std::to_string` covers simple cases; stringstreams handle the complex formatting.",
  "try / catch / throw": "`throw` raises an exception (usually `throw std::runtime_error(\"...\")`); `try { risky(); } catch (const std::exception& e) { /* handle */ }` catches it. Exceptions unwind the stack, running destructors — so RAII objects clean themselves up along the way. Catch by const reference, catch specific types first, and only catch what you can actually handle.",
  "Standard exceptions": "`<stdexcept>` provides `runtime_error`, `logic_error`, `out_of_range`, `invalid_argument`, `overflow_error`, and friends — all derived from `std::exception`, whose virtual `what()` returns the message. Containers throw `std::out_of_range` on `.at()` and bad allocations throw `std::bad_alloc`. Catching `const std::exception& e` handles every standard error uniformly.",
  "Exceptions & RAII": "Exceptions and RAII are a matched pair. When an exception unwinds the stack, every local object's destructor runs — mutex locks release, files close, memory frees. This is why exception-safe code writes naturally in C++: you just create RAII objects and let the stack do the cleanup. A lock_guard that unlocks on exception is automatic; a manual unlock path that forgets is a deadlock.",
  "Rvalue references": "`T&&` binds to rvalues — temporaries and the results of expressions — that are about to die. It exists so you can detect 'this is a temporary, steal its resources'. `std::move(x)` casts x to an rvalue reference, announcing 'you may move from me'. This is the language feature underneath all move semantics and perfect forwarding.",
  "std::move": "`std::move(obj)` is a cast, not a function that moves — it marks the object as 'about to die' so a move constructor or move assignment can steal its resources (e.g., take the string's heap buffer) instead of copying. After a move, the source is valid but unspecified — often empty. Use it when you truly no longer need the source's contents, especially in `return`, `push_back`, and swaps.",
  "Move constructors": "`Message(Message&& other) noexcept : text_(std::move(other.text_)) {}` — a constructor that takes an rvalue reference and steals instead of copies. `noexcept` matters: containers only move when the move can't throw, or they fall back to copying. Move constructors are why `std::vector<std::string>` grows cheaply — strings move by swapping a few pointers. Value semantics + moves = copies only when you ask.",
  "Copy semantics": "By default, copying a class copies each member — the 'shallow copy'. For classes owning resources that is wrong: copying a pointer member shares the pointed-to object, so two copies both try to free it (double free) or mutate each other's data. Correct copy semantics are either deep copies (copy the pointee) or deleted copies (`= delete`) for non-copyable types. Choose deliberately.",
  "The rule of five": "If a class manages a resource, implement (or explicitly delete) all five special members: destructor, copy constructor, copy assignment, move constructor, move assignment. Forgetting one often compiles and silently misbehaves later. But the best 'rule of five' is having nothing to write: use std::string, std::vector, smart pointers as members, and the compiler's defaults become exactly right.",
  "Copy elision": "The compiler is allowed — and modern compilers do it — to skip copies entirely when an object is returned or passed by value, constructing the result directly in the caller's slot. Even before C++17 guaranteed it in certain cases, returning a local 'just works' with zero copying. This is why 'return by value' is the correct default in C++: it is fast, simple, and the compiler handles the copy-avoidance.",
  "Namespaces": "A namespace is a named scope that keeps symbols from colliding: `std::` prefixes the standard library; `math_utils::add` is distinct from `ui::add`. Put your code in a namespace (`namespace asta { ... }`). The `using` directives (`using namespace std;`) leak names and are best avoided in headers and big files; qualified names are longer but unambiguous.",
  "Header guards": "Headers can be included many times through a chain of includes, and a symbol defined twice is an error. `#pragma once` (supported by every real compiler) or the classic `#ifndef X / #define X / #endif` pattern makes a header include-safe. Headers should hold declarations, not definitions — put function bodies in .cpp files unless they're templates, inline, or trivial.",
  "Splitting code into files": "A project is a set of .cpp translation units plus headers. Each .cpp is compiled separately to an object file; the linker resolves symbols. A header declares the interface (class definitions, function signatures); the .cpp defines it. Templates and inline functions must be visible in headers (that's why they live there). This split is what lets 10,000-line projects compile in seconds when you touch one file.",
  "enum class": "`enum class Color { Red, Green, Blue };` is the scoped, typed enum: members are `Color::Red`, never leak into the enclosing scope, and don't silently convert to int. The unscoped `enum` lets `Red` leak and be treated as an int — a constant source of subtle bugs. Rule: use `enum class`, always. Cast with `static_cast<int>(c)` when you truly need the underlying value.",
  "static_cast & dynamic_cast": "`static_cast<T>(x)` performs compile-time conversions — int to double, enum to int, derived to base. It never checks at runtime. `dynamic_cast<T>(x)` on polymorphic types checks the actual type at runtime and returns null (pointer form) or throws `std::bad_cast` (reference form) on mismatch. Prefer `static_cast` for known-safe conversions; reach for `dynamic_cast` when downcasting genuinely-varied types.",
  "Avoiding implicit casts": "Implicit conversions (int→double is fine; double→int silently truncates) are a top source of surprises. `narrow_cast` aside, prefer explicit casts for anything lossy. Brace initialization rejects narrowing, so `int x{3.7}` is a compile error while `int x = 3.7` silently truncates. Make lossy conversions loud; reserve implicit ones for exact, widening, harmless cases.",
  "constexpr functions": "A `constexpr` function can be evaluated at compile time when called with constant arguments: `constexpr int square(int n) { return n * n; }` and `constexpr int x = square(12);` computes at build time. Pre-C++14 they had to be one-liners; since C++14 they can contain loops. Compile-time math means zero runtime cost and no risk of runtime failure — the compiler validates it fully.",
  "Compile-time computation": "constexpr variables and functions let you compute tables, constants, and even whole algorithms before the program ships. `static_assert` verifies compile-time facts (`static_assert(sizeof(int) == 4)`), turning assumptions into build errors. This is C++'s answer to 'compute it once, at build time' — the compiler becomes part of your test suite.",
  "if constexpr": "`if constexpr (condition)` discards the dead branch at compile time — the other branch isn't even compiled. This is how templates branch on type properties: `if constexpr (std::is_integral_v<T>)` picks the integer path, `else` the float path, with no runtime check and no warnings about unreachable code. It is the core tool of modern generic programming.",
  "std::thread": "`std::thread t(worker);` starts `worker` on a new OS thread; `t.join()` waits for it and cleans up (a thread must be joined or detached before destruction, or it terminates the program). Threads share the process's memory, which is power and danger: two threads writing the same variable is a data race. `std::thread` gives you concurrency with C++ ergonomics — but see 'Data races'.",
  "Mutexes & locks": "A `std::mutex` serializes access to shared state: threads lock it before touching the shared data, unlock after. `std::lock_guard<std::mutex> lock(mtx)` locks on construction and unlocks on destruction — RAII means the lock always releases, even on exceptions. For finer control use `std::unique_lock`. Every piece of shared, mutable state should have a mutex, and every access should go through it.",
  "Data races": "A data race is two threads accessing the same memory, at least one writing, without synchronization — and it is undefined behavior: torn reads, crashes, impossible values. The compiler and CPU are free to do anything. Preventing races means using mutexes/atomics or keeping state thread-local. Memory models make this subtle; the practical rule is: don't let threads touch the same non-atomic variable unsynchronized.",
  "Iterator categories": "Iterators come in strengths: input/output (single-pass, like streams), forward (multi-pass, like lists), bidirectional (can go back), and random-access (jump any distance, like vector). Algorithms declare which category they need — `std::sort` requires random-access, `std::advance` works with any. The category tells you which containers can feed which algorithms, and why list can't be sorted with std::sort.",
  "ostream_iterator": "`std::ostream_iterator<int>(std::cout, \" \")` is an iterator that writes to an ostream when you assign to it — so `std::copy(v.begin(), v.end(), out)` prints every element space-separated in one line. It is the cleanest way to dump a range to output. Insert the same iterator into a loop to stream values one at a time. A neat demonstration that iterators abstract *output*, not just containers.",
  "Custom iterators": "You can make your own type iterable by providing `begin()` and `end()`, and you can build full iterator types for custom containers — which makes them work with every STL algorithm. A minimal forward iterator needs `operator*`, `operator++`, and `operator!=`. Before writing one, check whether `std::vector` or an `std::span` covers the need — custom iterators are advanced territory, and the standard library covers most cases first.",
  "Const correctness": "Mark everything `const` that can be: `const` variables, `const` parameters, `const&` big parameters, `const` member functions. It makes intent explicit, lets the compiler optimize, prevents accidental mutation, and makes code reviewable. The compiler enforces your promises — a const method that mutates won't compile. It's the cheapest, most effective correctness tool in the language.",
  "noexcept & move": "Declaring `noexcept` promises a function won't throw — a checked, valuable guarantee. Containers rely on it: they move elements only if the move is `noexcept`, otherwise they copy (safer but slower). Reserve `noexcept` for functions that genuinely can't fail — moves, swaps, destructors, accessors. An exception escaping a noexcept function calls `std::terminate`, so don't lie about it.",
  "Modern C++ idioms": "The modern defaults: brace initialization, `auto` for complex types, range-for, `const&` parameters, `std::array`/`std::vector` over raw arrays, smart pointers over `new`/`delete`, lambdas over hand-rolled functors, `enum class`, and RAII everywhere. Each one removes a class of bugs while often making the code shorter. Write C++ as it is today, not as it was in 1998 — the language got dramatically safer.",
  "Project structure": "A small C++ project: an entry .cpp with `main()`, headers declaring interfaces, .cpp files defining them, a build system (CMake or a Makefile), and tests. Keep the data model (structs/classes), the logic (free functions), and the I/O separate so the core is testable. Compile flags to always use: `-Wall -Wextra -Werror`. Structure is what turns a script into software you can extend.",
  "Designing a small app": "Start from the data model: what does the app know about? (A Task has a title and a done flag.) Then the operations: what can you do? (add, list, mark done.) Then the I/O shell around it. Keep the core logic free of cin/cout so it's testable. A tiny app built this way scales cleanly into a real one — same shape, more parts.",
  "Testing and iteration": "Verify behavior with assertions (`assert(area(3, 4) == 12)`) or a framework (GoogleTest, Catch2, doctest): feed known inputs, assert known outputs, cover edge cases. Fixing a bug means adding the failing case first, then making it pass. A program you can test is a program you can trust — tests are the difference between 'it worked once' and 'it always works'.",
  "Capacity vs size": "`size()` is how many elements a vector holds; `capacity()` is how many it has room for. Pushing past capacity triggers a reallocation — a new, bigger buffer, every element moved over, the old buffer freed. That growth is amortized O(1), but each reallocation is a spike. Knowing the two numbers apart is the first step to controlling vector performance instead of hoping for it.",
  "reserve & shrink_to_fit": "`reserve(n)` preallocates room for n elements so later push_backs never reallocate — essential when you know the final size up front. `shrink_to_fit()` is the reverse request: give back spare capacity after the vector is built (non-binding, but honored in practice). Together they bracket a vector's memory life: reserve before the hot loop, shrink after the build phase, and the heap stays calm.",
  "Emplace & move growth": "`emplace_back(args)` constructs the element directly inside the vector from constructor arguments — no temporary, no copy, no move. `push_back(T(...))` builds a temporary then moves it in. For cheap types the difference is noise; for strings, vectors, and big objects it removes real work. And when growth does happen, elements move (not copy) if the move is `noexcept` — another reason to mark moves correctly.",
  "Doubly-linked lists": "`std::list` is a doubly-linked list: every element lives in its own node with pointers to both neighbors. Insertion and removal at a known position are O(1) — no shifting, ever — and iterators stay valid across both. The price is cache hostility (nodes scatter across the heap) and per-element pointer overhead. Lists win when you splice and rearrange far more than you index.",
  "Splice & merge": "`splice` moves nodes between lists (or within one) in O(1) — no copies, no allocations, just pointer rewiring. `merge` fuses two sorted lists in linear time, emptying the source. These are operations vectors cannot match: try moving 10,000 elements between vectors without copying. When your workload is rearranging rather than indexing, splice is the superpower.",
  "list vs vector tradeoffs": "Default to vector: contiguous memory wins nearly every benchmark through cache locality. Reach for list only when you can name the reason — stable iterators across mutation, O(1) splice/merge, or constant-time insert/erase in the middle with no invalidation. Measure before switching: a vector's memmove is shockingly fast, and most 'list would be better' intuitions lose to it.",
  "Double-ended queues": "`std::deque` grows at both ends in O(1) — push_front is as cheap as push_back — while still offering indexed access. It is implemented as chunks (pages) of elements plus an index, so unlike vector it never reallocates the whole buffer. Use it for queues, sliding windows, and any sequence that grows left as well as right.",
  "stack & queue adapters": "`std::stack` and `std::queue` are not containers — they are adapters that restrict a container's interface to LIFO (`push/top/pop`) or FIFO (`push/front/pop`) discipline. The underlying container defaults to deque and can be swapped (vector for stack, list for queue). Adapters enforce usage patterns: when only the top should be visible, make only the top visible.",
  "priority_queue": "`std::priority_queue` always serves the largest element first (a max-heap by default; pass `std::greater` for min-first). Push and pop are O(log n), top is O(1). It backs schedulers, Dijkstra's algorithm, event simulation, and every 'serve the most important first' workload. If you need ordering by priority rather than arrival, this is the adapter.",
  "std::map ordering": "`std::map` keeps keys in sorted order at all times (a balanced tree underneath), so iteration visits entries smallest-first for free. Lookup, insert, and erase are O(log n). That standing order powers range queries: `lower_bound`/`upper_bound` find 'everything between A and B' without scanning. When traversal order matters, the tree earns its logarithmic cost.",
  "std::set membership": "`std::set` is a map without values — a sorted collection of unique keys with O(log n) insert, erase, and `count`/`find` membership tests. Duplicates are silently refused. It is the right 'have I seen this?' structure when you also want sorted traversal; for pure membership with no ordering need, the hash-based `unordered_set` is faster.",
  "Custom comparators": "Ordered containers accept a comparator type: `std::set<int, std::greater<int>>` sorts descending, and a lambda or functor can order by any criterion (length, timestamp, priority). The comparator defines a strict weak ordering — inconsistent comparisons corrupt the tree. Custom order turns the container into a purpose-built structure: leaderboards, schedulers, and priority sets fall out naturally.",
  "unordered_map buckets": "An `unordered_map` is an array of buckets; each key hashes to a bucket, and collisions chain inside it. Average operations are O(1) as long as buckets outnumber elements. When iteration order looks 'random', that is the hash at work — never depend on it. Understanding buckets explains every hash-table behavior: fast hits, rehash pauses, and pathological slowdowns on bad hashes.",
  "Hash functions & equality": "Hashed containers need two things per key: a hash (`std::hash`, specialized for your type) and equality (`operator==`) to resolve collisions. Equal keys must hash equally — break that contract and lookups silently fail. Custom types need both defined. A bad hash (everything collides) degrades the table to a linked list; a good one spreads keys uniformly and keeps O(1) honest.",
  "Load factor & rehash": "Load factor is elements divided by buckets; when it passes `max_load_factor` (1.0 by default), the table rehashes — allocates a bigger bucket array and redistributes everything, an O(n) pause. `reserve(n)` pre-sizes the table to skip repeated rehashes during bulk inserts. Like vector capacity, hash capacity rewards planning ahead.",
  "Iterator invalidation": "Some operations invalidate iterators: vector reallocation kills them all, `erase` kills the erased one (and after it, for vectors), while list/node operations invalidate almost nothing. Using an invalidated iterator is undefined behavior — often a crash far from the cause. Rules of thumb: treat vector iterators as disposable across growth, and always take `erase`'s return value as the new position.",
  "Reverse & const iterators": "`rbegin()`/`rend()` walk a range backwards with the same `*`/`++` interface — `++` on a reverse iterator steps toward the front. `cbegin()`/`cend()` promise read-only access even on a non-const container. Const iterators document 'I only read' and let the compiler enforce it. Together they cover backward scans and read-only passes without index arithmetic.",
  "Stream iterators": "`istream_iterator` turns a stream into an input range — a vector constructed from two of them reads the whole stream in one declaration. `ostream_iterator` turns an output stream into a sink for `std::copy`. Streams and algorithms compose through these adapters: parsing becomes construction, printing becomes a copy.",
  "Sorting with predicates": "The third argument to `std::sort` is the ordering rule — a lambda like `[](int a, int b) { return a > b; }` sorts descending, and richer predicates sort structs by any field. Sort is O(n log n) and not stable (equal elements may reorder); `std::stable_sort` preserves original order of equals at extra memory cost. Custom predicates turn one algorithm into every ordering you need.",
  "binary_search & bounds": "On a sorted range, `std::binary_search` answers 'present?' in O(log n), while `lower_bound`/`upper_bound` return the position where a value starts/ends — the basis of counting occurrences (`equal_range`) and inserting in order. All three assume sorted input; on unsorted data they silently lie. Sort once, then binary-search forever.",
  "nth_element & partial sort": "`nth_element(first, nth, last)` partitions so the nth position holds the element that belongs there — perfect for medians and top-k without a full sort (average O(n)). Only the nth slot is guaranteed; the rest is partitioned, not sorted. When you need 'the 5 best' rather than 'everything ranked', this skips most of the work.",
  "transform & for_each": "`std::transform` maps a function over a range into an output range — the vectorized 'apply to all'. `std::for_each` runs a side effect per element (logging, accumulating into a capture, invoking methods). Transform produces values; for_each performs actions. Between them, most explicit element-wise loops become one declarative line.",
  "accumulate with ops": "`std::accumulate` folds a range into one value with any binary operation: sum, product, concatenation, min/max, or a custom lambda. The initial value sets the type — `0` means int, `0.0` means double, and mismatching it is a classic truncation trap. Folding turns 'summarize this range' into a single expression.",
  "inner_product & scans": "`std::inner_product` computes sum(a[i]*b[i]) with optional custom ops — dot products, weighted sums, similarity scores in one call. `std::partial_sum` emits every running prefix (cumulative totals, running balances). These are the numeric algorithms beyond min/max: pairwise combination and prefix accumulation, both O(n) and both clearer than hand loops.",
  "find, substr & replace": "`find` locates substrings (returning `npos` on failure — always compare against it), `substr(pos, len)` slices, and `replace(pos, len, text)` swaps a span for new content. Chained, they implement search-and-replace, redaction, and templating on plain strings. Bounds come from the string itself, so these never overrun — check `npos` and the rest is safe.",
  "String conversions": "`std::stoi`/`std::stod` parse numbers from strings (throwing on bad input), `std::to_string` goes the other way. For controlled formatting, stringstreams beat both. Conversions sit at every program boundary — config files, user input, network text — so know their failure modes: exceptions on garbage, truncation on overflow.",
  "erase, insert & capacity": "Strings mutate like vectors: `insert(pos, text)`, `erase(pos, len)`, `push_back(c)`, `pop_back()`, plus `reserve`/`shrink_to_fit` for capacity control. Repeated middle edits are O(n) each — fine occasionally, ruinous in a loop (build in a second string instead). `empty()` beats `size() == 0`, and `clear()` resets without freeing.",
  "Non-owning views": "A view is a pointer-plus-length over someone else's characters — no allocation, no copy, no ownership. `std::string_view` (C++17) is the standard one; until then, `const std::string&` parameters and `const char*` plus length pairs play the role. Views make parsing cheap: tokenize a megabyte string with zero copies. The contract is lifetime — the viewed text must outlive every view of it.",
  "Zero-copy tokenizing": "Tokenizing without copying means recording positions, not extracting substrings: find each delimiter with `find`, note the span, advance. Only materialize a `std::string` when a token must be stored or mutated. This turns parsing from O(n) allocations into O(1) — the single biggest string-performance win available, and the pattern `string_view` exists to bless.",
  "iomanip formatting": "Manipulators compose left to right: `fixed` plus `setprecision(2)` for money, `setw(n)` plus `setfill('0')` for padded IDs, `hex`/`dec` for bases, `boolalpha` for true/false. They are sticky (precision, fill) or one-shot (setw) — know which, or formatting leaks between outputs. Streams format anything printable; manipulators make it presentable.",
  "Stream state & errors": "Every stream carries state bits: `good`, `fail` (bad input), `eof` (end reached), `bad` (unrecoverable). A failed extraction sets `failbit` and leaves the variable untouched — check the stream, not the variable. `clear()` resets the bits, `ignore()` discards the offending input. Robust input loops test the stream every iteration; anything else loops forever on garbage.",
  "Basefield manipulators": "`std::hex`, `std::dec`, `std::oct` switch the integer base (sticky until changed), `std::showbase` adds the `0x` prefix, `std::uppercase` capitalizes hex digits. Debugging dumps, bit patterns, and protocol work all read through base manipulators. Reset to `dec` when done — a lingering `hex` flag corrupts every number printed after it.",
  "Parsing with stringstreams": "`std::istringstream` turns a string into a readable stream, so `>>` parsing, `getline` splitting, and failure detection all work on in-memory text. It is the workhorse of line-oriented formats: read a line from the file, wrap it in a stringstream, extract fields with type checking. Parse failures become stream state instead of crashes.",
  "Path strings & joining": "Before `<filesystem>` (C++17), paths are strings you join carefully: exactly one separator, no doubled slashes, no missing ones. A two-line `join_path` helper beats ad-hoc concatenation everywhere. Normalize early (one separator style), validate existence at open time, and keep directory vs file concepts explicit in variable names.",
  "File read-back": "The honest file loop is `while (std::getline(in, line))` — the stream test handles EOF and errors uniformly, for files of any size. Write with `ofstream`, flush/close before reading back, and always verify the open succeeded: a missing file otherwise produces a silent empty loop. Read-back testing (write, then read and compare) catches encoding and newline bugs immediately.",
  "Stream positions & sizes": "`tellg`/`seekg` report and move the read position; seeking to end then `tellg` measures a file's size in one step. Positions are the basis of random access in files: indexes, headers, and fixed-record layouts all seek instead of re-reading. Remember text vs binary mode — newline translation makes positions approximate on Windows unless you open with `std::ios::binary`.",
  "Deduction & explicit args": "The compiler deduces template arguments from call arguments — `add(2, 3)` makes `T = int` — but mixed types (`add(2, 3.5)`) have no single T and fail, which is when you pin it explicitly: `add<double>(2, 3.5)`. Explicit arguments also select among overloads and force conversions. Deduction covers the common case; explicit args handle the ambiguous ones.",
  "Templates & overloads": "Templates and overloads coexist: a non-template overload wins ties, and specific overloads carve exceptions out of a generic template. Overload resolution ranks exact matches first, then promotions, then conversions, then templates. Use templates for uniform logic across types and overloads for the types that need special behavior — the combination reads as one coherent interface.",
  "enable_if constraints": "`std::enable_if` removes a template from overload resolution unless a condition holds — `enable_if<is_integral<T>::value>` means 'integers only'. Violations become 'no matching function' instead of pages of body errors. It is verbose (the direct ancestor of C++20 concepts), but it turns unconstrained templates into checked contracts with C++11 tools.",
  "Parameter packs": "`typename... Args` declares a pack — zero or more types captured as one name. `sizeof...(Args)` counts them, and expanding with `Args...` stamps the pattern once per element. Packs power `emplace`, `make_shared`, tuples, and binding: one template that accepts any arity. A pack must be the last template parameter, and every expansion follows the pattern on its left.",
  "Recursive expansion": "The classic pack technique is head-plus-recursion: handle the first argument, recurse on the rest, with a zero-argument base case stopping the chain. Each recursion level is a separate function instantiation — the compiler unrolls your logic at build time. Trace it once by hand (3 args becomes 4 calls) and the pattern clicks permanently.",
  "sizeof... & pack size": "`sizeof...(pack)` is a compile-time constant — usable in `static_assert`, array bounds, and conditions. It lets templates branch on arity: empty packs, singletons, and multi-argument cases each get correct handling. Combined with recursion, it also guards the base case explicitly instead of relying on overload resolution alone.",
  "Rvalue refs revisited": "`T&&` binds to temporaries and moved-from values — things safe to cannibalize. Inside a function, a named rvalue reference is itself an lvalue (it has a name), which is why moving from it requires `std::move` again. This single rule explains most move bugs: names are lvalues, always, and only casts make them movable.",
  "Move assignment": "Move assignment steals the source's resources then leaves it valid-but-unspecified — typically empty. Guard self-move, free current resources first (or swap), mark it `noexcept` so containers trust it. Together with the move constructor it completes value semantics: objects transfer cheaply and copies happen only when requested.",
  "Moved-from state": "After `std::move`, the source is valid but unspecified — you may destroy it or assign to it, but not read from it. Standard types land empty; custom types should too (clear the pointer, reset the handle). Never branch on a moved-from value's contents. The discipline is simple: move means 'I am done with this object'.",
  "Reference collapsing": "References to references collapse by one rule: `&` wins — every combination involving `&` becomes `&`; only `&&` plus `&&` stays `&&`. This is what makes perfect forwarding possible: the template parameter `T` itself encodes the caller's value category, and collapsing preserves it through the wrapper. Four combinations, one rule, enormous consequences.",
  "Universal references": "`T&&` in a deduced context is a universal reference — it binds lvalues as `T&` and rvalues as `T`. It is greedy (it matches nearly anything, often hijacking overloads) and must be constrained or ordered carefully. Recognize the shape: `T&&` with a deduced `T` is forwarding; with a concrete type it is a plain rvalue reference.",
  "std::forward": "`std::forward<T>(arg)` casts back to the caller's original value category — lvalues stay lvalues (copied), rvalues stay rvalues (moved). `std::move` unconditionally casts to rvalue; `std::forward` conditionally preserves. Forwarding wrappers (`make_unique`, `emplace`, factories) exist because of this one function: it carries intent through layers without loss.",
  "Scope guards": "A scope guard runs a lambda at scope exit — unlock, rollback, log, decrement — whatever must happen even on early return or exception. A ten-line RAII class replaces every manual cleanup path and cannot be forgotten on a new branch. Guards are RAII distilled: the destructor is the guarantee, the lambda is the policy.",
  "RAII for C resources": "C APIs return raw handles (`FILE*`, sockets, descriptors) with manual close functions — wrap each in a class whose constructor acquires and destructor releases, and C resources gain C++ safety. Custom deleters on `unique_ptr` do this in one line for single-handle cases. Every `fopen` deserves an owner; owners make leaks structurally impossible.",
  "Rule of zero": "The best resource management is none: compose your class from RAII members (`std::string`, `std::vector`, smart pointers) and the compiler-generated destructor, copy, and move are all correct automatically. Custom special members exist only for classes that directly own raw resources. If you are writing a destructor, first ask whether a member could own it instead.",
  "Custom deleters": "`unique_ptr` accepts a deleter — a function reference or a logging lambda — so any cleanup function becomes RAII. Stateful deleters grow the pointer's size; stateless ones stay pointer-sized. Deleters turn 'remember to call X' into 'impossible to forget X'.",
  "unique_ptr arrays": "`unique_ptr<int[]>` manages dynamic arrays with `operator[]` and array `delete[]` — no size tracking, no bounds checking, just ownership. Prefer `std::vector` whenever the size varies or must be known; the array form fits fixed buffers handed to C APIs. It is ownership without overhead: exactly one pointer, automatic release.",
  "Ownership transfer": "`unique_ptr` cannot be copied, only moved — ownership visibly flows from producer to consumer through `std::move`, returns, and sink parameters. Factories return `unique_ptr` (transfer out), consumers take it by value (transfer in) or by reference (borrow). The type system tracks the owner at all times; leaks and double-frees become compile errors.",
  "Reference counting": "A `shared_ptr` keeps a control block with a use count; each copy increments (atomically — thread-safe but not free), each death decrements, and zero destroys the object. `use_count()` exposes the number for debugging, never for logic (it races). Counting automates shared lifetimes at one atomic increment per copy — cheap, but not zero.",
  "weak_ptr & cycles": "A `weak_ptr` observes a `shared_ptr` without owning — `lock()` returns a temporary `shared_ptr` if the object lives, empty if not; `expired()` reports death. Its great use is breaking cycles: parent owns child via `shared_ptr`, child points back via `weak_ptr`, and the graph frees correctly. Caches and observers are the other classic weak-pointer roles.",
  "make_shared efficiency": "`make_shared` allocates the object and its control block in one block — one allocation instead of two, better locality, exception-safe. The tradeoff is lifetime coupling: the object's memory lasts until the last weak_ptr dies too (the whole block is one allocation). Default to `make_shared`/`make_unique`; use raw `new` only with custom deleters.",
  "Designing the index": "An index maps terms to information — here, words to counts, later words to document lists. `std::map` gives sorted terms for free; the pipeline is tokenize, normalize, count, rank. Design the query before the structure: 'top terms' needs counts, 'which documents' needs posting lists. One clean data model carries the whole milestone.",
  "Ranking results": "Ranking turns counts into answers: sort by score descending with a deterministic tiebreak (alphabetical here, document order in real engines). Comparators with explicit tiebreaks are stable across runs and platforms — `std::sort` alone is not stable for equal keys. Deterministic ranking is testable ranking.",
  "Testing the build": "Milestone code earns its keep with checks: known documents produce known counts, ranking matches hand-computed order, edge cases (empty input, unknown terms) behave sanely. Hardcode the tiny corpus (three sentences, countable by eye) so every assertion is verifiable without running anything. If you can check it by eye, you can assert it in code.",
  "Throw by value, catch by reference": "Throw exception objects by value (`throw ParseError(...)`) so the runtime can copy them safely during unwinding; catch by `const` reference (`catch (const ParseError& e)`) to avoid slicing and extra copies. Catching by value slices derived types down to the base — your custom message survives, but the custom type does not. Value-throw, reference-catch is the rule with no exceptions.",
  "Custom exception types": "Derive from `std::runtime_error` (or `logic_error`) and inherit its `what()` message machinery — one small struct buys you a catchable, printable, distinct failure mode. Distinct types let callers handle 'parse failed' differently from 'file missing' instead of string-matching messages. Keep them tiny: a constructor forwarding the message is usually the whole class.",
  "Unwinding order": "When an exception flies, destructors run in reverse construction order — last built, first destroyed — inner scopes before outer ones. That ordering is why RAII cleanup composes: every local owner releases exactly its own resource on the way out. Trace one throw through two nested tracers and you will never fear unwinding again.",
  "The three safety guarantees": "Exception safety comes in levels: no-throw (never fails — swaps, moves, destructors), strong (failure leaves state unchanged — transactions), and basic (failure leaves everything valid but possibly different — no leaks, no corruption). Aim for strong on mutating operations (copy-and-swap gives it free) and demand no-throw from cleanup paths. Name the guarantee before you write the function.",
  "noexcept contracts": "Marking a function `noexcept` promises it never throws — the compiler enforces nothing, but callers optimize on it (containers move instead of copy) and the runtime calls `terminate` if you lie. Reserve it for operations that truly cannot fail: moves, swaps, destructors, accessors. `noexcept(expr)` as an operator also lets templates query the guarantee and adapt.",
  "Copy-and-swap": "Implement assignment as copy-then-swap: take the new value by value (copying once), swap internals with `*this` (no-throw), let the parameter's destructor discard the old state. Self-assignment becomes harmless, exceptions strike before any mutation (strong guarantee), and the code is three lines. It is the standard shape of correct assignment.",
  "Init captures": "C++14 generalized captures move values into lambdas: `[v = std::move(big)]` takes ownership, `[x = compute()]` binds a computed name. This fills the gap `[=]` and `[&]` leave — owning captures without copying. Move-only types (`unique_ptr`) become capturable for the first time, which is exactly what async and deferred work need.",
  "Mutable lambdas": "A lambda's `operator()` is `const` by default, so value-captures cannot be modified inside — add `mutable` to allow it (`[n]() mutable { return ++n; }`). Each mutable lambda carries its own evolving state, making it a pocket-sized functor. References need no `mutable` (they alias the outside variable); only by-value captures do.",
  "Generic lambdas": "C++14 `auto` parameters (`[](auto n) { return n * n; }`) turn a lambda into a template — one callable that squares ints, doubles, and anything supporting `*`. Combined with algorithms, generic lambdas replace whole families of functor structs. Keep the body valid for every intended type; the compiler instantiates per call, errors included.",
  "Type-erased wrappers": "`std::function<R(Args...)>` stores any callable with a matching signature — free functions, lambdas, bound expressions, functors — behind one uniform type. The cost is indirection (a virtual call plus possible heap allocation), so use it at boundaries (callbacks, dispatch tables, plugins), not in inner loops. Type erasure trades a little speed for total decoupling.",
  "bind & placeholders": "`std::bind(f, arg1, _1)` freezes some arguments and leaves placeholders for the rest, producing a new callable — partial application for C++. Lambdas mostly supersede it (clearer, faster), but `bind` still shines adapting legacy signatures and member functions (`bind(&C::m, &obj, _1)`). Read it as 'call this later, with these filled in'.",
  "Dispatch tables": "A `std::map<std::string, std::function<...>>` turns string commands into behavior — no if-chain, no switch, and new commands register in one line. Parsers, menus, test runners, and plugin systems all reduce to 'look up the name, call the function'. Tables make behavior data: extensible without touching the dispatch logic.",
  "Launching & joining": "`std::thread t(f, args)` starts `f` on a new OS thread while the caller continues; `t.join()` waits and reaps it. Every joinable thread must be joined or detached before destruction — otherwise `std::terminate` fires. Arguments are copied into the thread by default (`std::ref` shares); the function signature decides the rest. Launch, then always account for the thread.",
  "Passing thread arguments": "Thread arguments are decay-copied into thread storage — references need `std::ref`, move-only types move in. Passing a pointer to a local that dies before `join` is the classic lifetime bug; join before the data's scope ends. Design thread entry points around values (copies) or clearly-owned data, and lifetimes stop being scary.",
  "Hardware concurrency": "`std::thread::hardware_concurrency()` reports the implementation's thread hint (usually core count) — the sane default for pool sizing and partitioning work. It may return 0 when unknown, so have a fallback (2 or 4). Size compute pools to cores, I/O pools larger (threads block), and never hardcode counts into portable code.",
  "unique_lock control": "`std::unique_lock` is the maneuverable lock: construct deferred (`std::defer_lock`), lock/unlock manually, adopt an held lock, transfer ownership by move. Condition variables require it (they unlock while waiting). `lock_guard` is the simple scope lock; `unique_lock` is the instrument — heavier, but capable of every locking dance.",
  "Lock granularity": "Hold locks for the shortest time that stays correct: lock, copy/touch the shared state, unlock, then compute on the copy. Coarse locks (whole function) are safe but serialize everything; fine locks (per-field) parallelize but invite deadlocks and complexity. Shrink the critical section until contention drops — then stop, before correctness suffers.",
  "Deadlock avoidance": "Deadlocks need four conditions at once; breaking any one prevents them — in practice, that means one global lock order (always acquire A before B) or atomic multi-lock (`std::lock`/`scoped_lock` acquires all-or-nothing). Lock hierarchies assign every mutex a level and forbid upward acquisition. Order, or atomize: pick one discipline and enforce it everywhere.",
  "wait & notify": "A condition variable sleeps until another thread signals: `wait` atomically unlocks the mutex and parks; `notify_one`/`notify_all` wake sleepers. The waiter always re-locks before returning, so the shared state is safe to inspect. Waiting without a mutex, or notifying without holding shared-state discipline, are the two canonical misuses.",
  "Predicate waits": "Always wait with a predicate — `cv.wait(lock, [] { return ready; })` — because wakeups can be spurious (the OS may wake you for nothing) and notifications can arrive before you sleep. The predicate loop turns both hazards into harmless re-checks. 'Wait until X' must mean 'loop until X', every time, no exceptions.",
  "Producer-consumer queues": "The pattern that justifies condition variables: producers push items and notify; the consumer waits on 'non-empty or finished', drains the queue, and exits when finished and empty. One mutex guards queue plus flag; the flag separates 'nothing yet' from 'nothing ever again'. Master this queue and you own half of concurrent programming.",
  "Atomic operations": "`std::atomic<T>` makes single operations indivisible: `load`, `store`, `fetch_add`, `fetch_sub`, `exchange` — no torn reads, no mutex for simple counters and flags. Each operation is one indivisible step, but sequences of them are not automatically atomic (check-then-act still races). Atomics replace locks for single variables, not for protocols.",
  "Compare-and-swap": "CAS (`compare_exchange_strong/weak`) is the atomic if-and-set: 'if the value is still X, make it Y, and tell me whether you did'. It retries in a loop (`weak` may spuriously fail — loop it; `strong` in one shot) and underlies every lock-free structure. Understand CAS and lock-free queues, stacks, and reference counts become readable.",
  "Lock-free checks": "`is_lock_free()` reports whether an atomic runs on hardware instructions (true for ints/pointers on mainstream CPUs) rather than a hidden mutex. Lock-free means progress without blocking — signal handlers and real-time paths depend on it. Query it with `static_assert`/`assert` where it matters; assume atomics are cheap, verify they are lock-free.",
  "async & launch policies": "`std::async` runs a function and hands you a `future` for its result: `launch::async` forces a new thread, `launch::deferred` lazily runs on first `get`/`wait`, the default lets the runtime choose. Futures also transport exceptions — a throw in the worker rethrows in the getter. Async is the simplestcorrect 'run this elsewhere' tool; reach for threads only when you need their control.",
  "promise & future pairs": "A `promise`/`future` pair is a one-shot thread-safe channel: the producer `set_value`s (or `set_exception`s), the consumer `get`s exactly once. Unlike `async`, you control both ends — hand the future across queues, fulfill from callbacks, bridge threads to event loops. One value, one handoff, fully synchronized.",
  "Shared futures": "`std::shared_future` (from `future.share()`) lets many consumers wait on one result — every `get()` returns the same value, and copies are cheap. Broadcast completion ('config loaded', 'shutdown requested') without inventing your own fan-out. Single-producer, multi-consumer, zero extra machinery.",
  "Durations & time points": "`std::chrono` separates durations (60 seconds) from time points (3:05pm) — arithmetic on durations is unit-safe (`milliseconds + seconds` just works), and subtracting time points yields a duration. `duration_cast` converts explicitly (truncating, loudly). Unit-safe time math eliminates an entire class of factor-of-1000 bugs at compile time.",
  "Clock kinds": "`system_clock` tracks wall time (adjustable — NTP can move it backwards), `steady_clock` never goes backwards (the stopwatch for measuring), `high_resolution_clock` is the finest available (often an alias). Measuring intervals demands `steady_clock`; timestamps for humans want `system_clock`. Mixing them up produces negative durations and Heisenbugs.",
  "Timing code safely": "Benchmark with `steady_clock`, repeat enough iterations to drown noise, print only fixed derived facts (never raw timings in tests — they flake). Warm up caches, disable nothing you ship with, and compare relatively (A vs B) rather than absolutely. Timing that prints wall-clock numbers into assertions is a flaky test waiting to happen.",
  "Engines & distributions": "Randomness splits in two: engines (`mt19937`) produce uniform bits from a seed; distributions (`uniform_int_distribution`, `normal_distribution`) shape bits into the wanted statistics. Never modulo an engine (`rand() % 6` biases) — distributions remove bias correctly. Seed the engine once, draw through distributions forever.",
  "Fixed-seed reproducibility": "A fixed seed (`mt19937 rng(42)`) replays the identical sequence on every platform and run — specified by the standard, not luck. Deterministic randomness makes tests repeatable, demos stable, and bugs debuggable. Seed from `random_device` (or time) only for production runs; fixed seeds everywhere else.",
  "Shuffling & sampling": "`std::shuffle` (Fisher-Yates, uniform) permutes with an engine you provide — correct shuffling in one call, no hand-rolled bias. Reservoir sampling streams a fixed-size sample from unbounded input. Both beat ad-hoc 'pick random indexes' schemes that skew or duplicate. Randomize with library algorithms, not arithmetic.",
  "Lazy pipeline thinking": "A pipeline is stages — source, filters, transforms, sink — where each stage sees only its input. Thinking lazily (pull items through on demand) composes better than eager temporaries (a full vector per stage). C++20 ranges make laziness first-class; the mental model works in any version: small stages, clean seams, data flowing one way.",
  "filter & transform helpers": "Two tiny templates carry the pipeline idea anywhere: `filter_vec` keeps matching elements, `map_vec` applies a function to each. Written once against predicates and callables, they work on every element type. These twelve lines are the seed of the ranges worldview — and fully portable C++11.",
  "Composing stages": "Stages compose by nesting — `map(filter(data, p), f)` — or by named variables per stage (clearer to debug, inspectable mid-pipe). Each stage is independently testable: feed it a fixed vector, assert the fixed output. Composition turns data processing into plumbing: small verified pieces joined into trustworthy wholes.",
  "Fold & reduce patterns": "Folding collapses a range to one value with an accumulator — sums, products, counts, extrema, even string joins. Write the loop once per shape (filter-then-fold covers most reporting), and prefer `accumulate` over hand loops when the operation is standard. Folds are where pipelines end: many values in, one answer out.",
  "Sorted-range utilities": "Sorted ranges unlock binary search, `equal_range` counting, `merge` of two runs, and `set_*` algorithms (union/intersection/difference) — a whole algebra that unsorted data cannot use. Keep data sorted when queries outnumber mutations; the query side becomes logarithmic and the code reads like set theory.",
  "Pipeline helpers": "Name your recurring shapes — `sum_of_doubled_evens`, `top_k`, `group_by` — as small functions over vectors, each with a fixed-input test. Helpers accumulate into a personal ranges library that ports forward when you adopt C++20. The habit matters more than the header: think in stages, verify each stage.",
  "Constraining with enable_if": "`enable_if<condition<T>::value, T>` keeps a template viable only when the condition holds — integers pass, strings vanish from overload resolution. Failures read as 'no matching function' at the call site instead of novel-length errors from inside the body. Verbose, but it is a real contract enforced by the compiler.",
  "static_assert contracts": "`static_assert(condition, message)` freezes facts at compile time — type sizes, trait expectations, API assumptions. Failed assertions stop the build with your message, exactly where the assumption lives. Sprinkle them at template boundaries and portability seams: the compiler becomes a test suite that runs on every build.",
  "From SFINAE to concepts": "SFINAE (`enable_if`) says 'remove me if unusable' in template-metaprogramming dialect; C++20 concepts say the same thing in plain language (`requires integral<T>`). The ideas transfer directly: constrain early, fail clearly, document requirements. Learn SFINAE's shape today and concepts will feel like the same thought, finally legible.",
  "is_integral & friends": "`<type_traits>` answers questions about types at compile time: `is_integral`, `is_floating_point`, `is_pointer`, `is_class`, `is_same` — each a `::value` boolean. Branch templates on the answers instead of guessing: integer paths vs float paths, pointer handling vs value handling. Traits turn 'what is T?' from folklore into queryable fact.",
  "Selecting overloads": "Overload sets chosen by traits give each category its own implementation — one `describe` for integrals, one for floats — with the compiler routing every call. `enable_if` on the return type is the classic switch. Separate implementations beat tag-switching inside one body: each stays simple, total coverage stays complete.",
  "Tag dispatch": "An older twin of `enable_if`: pass a tag type (`true_type`/`false_type` from a trait) to select overloads — `impl(x, is_integral<T>())`. Tags compose through hierarchies (iterator categories dispatch this way inside the STL itself). Read any STL implementation and you are reading tag dispatch in the wild.",
  "Translation units": "Each .cpp file plus its included headers is one translation unit, compiled independently to an object file; the linker merges them. What happens in one TU is invisible to others except through declarations. This isolation is why touching one file recompiles one unit — and why headers must carry everything the compiler needs to check cross-TU calls.",
  "The One Definition Rule": "The ODR says: one definition per entity per program (inline functions, templates, and `constexpr` excepted — they may repeat identically). Violations (a function defined differently in two files) are ill-formed-no-diagnostic-required: the program links, then misbehaves mysteriously. Headers declare, one .cpp defines, `inline` marks the deliberate exceptions.",
  "Include hygiene": "Include what you use, guard everything (`#pragma once`), never `using namespace` in a header, prefer forward declarations to shrink coupling. Include order (own header first) exposes missing dependencies immediately. Hygiene keeps builds fast and errors local: a header that compiles standalone never surprises its includers.",
  "CMakeLists structure": "A minimal CMake project declares the version floor, the project name, library targets, executable targets, and the links between them. Targets own their sources and requirements; `target_link_libraries` wires dependencies. Structure mirrors architecture: one target per component, executables thin, logic in libraries.",
  "Targets & linking": "`add_library` builds a reusable component, `add_executable` a program, `target_link_libraries` connects them (PRIVATE by default — implementation detail, not interface). Modern CMake thinks in targets with attached include paths and flags, not global variables. Get targets right and transitive dependencies resolve themselves.",
  "Build types & flags": "`CMAKE_BUILD_TYPE` selects optimization and debug info (Debug `-g`, Release `-O3 -DNDEBUG`, RelWithDebInfo both); always develop with `-Wall -Wextra -Werror`. Flags belong on targets (`target_compile_options`), not globals. Reproducible builds pin the type, the flags, and the compiler — 'works on my machine' starts with the build definition.",
  "assert & invariants": "`assert` documents what must be true — preconditions, postconditions, loop invariants — and aborts loudly (in debug) when violated. It costs nothing in release (`NDEBUG` removes it). Invariants turn assumptions into executable checks: every assert is a bug that reports itself instead of corrupting state silently.",
  "Self-test mains": "A `main()` that runs fixed checks and prints PASS turns any program into its own test harness — no framework needed. Hardcode inputs, assert outputs, cover the edges you fear. Self-tests run everywhere (including judges and Piston) and graduate naturally into framework tests when the project grows.",
  "Edge-case testing": "Bugs live at boundaries: empty inputs, single elements, off-by-one indexes, zero/negative values, maximum sizes. Test the zero, the one, and the many; the first, the last, and the missing. A function correct at its edges is usually correct everywhere — and the test list doubles as executable documentation.",
  "Debug builds (-g)": "Compile debugging sessions with `-g` (symbols mapping machine code to source lines) and no optimization (`-O0` keeps variables visible). Debug and release are different builds for different jobs — never profile a `-O0` binary, never debug `-O3` disassembly by choice. The flag is small; the visibility difference is total.",
  "Breakpoints & backtraces": "A breakpoint freezes execution at a line (`break main`), a backtrace (`bt`) shows how you got there frame by frame, `print`/`p` inspects any visible variable. The loop is universal: reproduce, break near the crash, walk up the stack, inspect the wrong value, ask why. Five GDB commands solve most bugs.",
  "Reading a crash": "A crash report is a story: the signal (SEGV = bad memory), the faulting frame (what it tried), the backtrace (how it got there), the locals (what was wrong). Read bottom-up for the path, top-down for the cause. Assertions convert mystery crashes into signed confessions — `assert(i < size)` names the culprit before GDB must.",
  "Store design & API": "A store needs few operations done well: put, get, remove, list, persist. `std::map` gives ordered keys and O(log n) everything; the API hides the container so it can change. Design for the caller: easy correct use (references, const lookups), hard misuse (no raw internals leaking). Small API, total coverage.",
  "File persistence": "Persistence is serialization plus discipline: one record per line, a delimiter that cannot appear unescaped in data, write-then-rename for crash safety, load validating every line. Text formats stay debuggable (read the file, see the bug); checksums catch corruption. The file is a contract between today's run and tomorrow's.",
  "Round-trip verification": "Write, read back, compare with `operator==` — the round-trip test proves persistence correct in three lines. It catches delimiter collisions, truncation, encoding slips, and ordering bugs uniformly. Every serialization format deserves one; run it on every save path, with empty and maximal stores included.",
  "Nullable values without pointers": "Not every 'maybe missing' needs a pointer: an empty state plus a value covers 'found or not' with zero allocation and no null dereference. `std::optional` (C++17) standardizes this; a two-member struct (`bool` plus value) teaches it anywhere. Nullable-without-nullptr removes a whole crash category while staying trivially copyable.",
  "Tagged unions": "A tagged union pairs a discriminator enum with storage for each alternative — exactly one live at a time, the tag saying which. `std::variant` (C++17) automates this; a struct with a kind tag and fields does it portably. Tags make 'which is it?' explicit and checkable, where bare `void*` or parallel variables stay error-prone.",
  "Maybe<T> by hand": "A ten-line `Maybe<T>` (default-empty, value-constructed, `has()`/`get()`) teaches more than using `optional` first: construction states, const access, and why `get` on empty must assert. Hand-rolling once makes the standard version obvious forever. Small generic types are also the gentlest introduction to writing templates yourself.",
  "std::tuple & tie": "`std::tuple` bundles heterogeneous values (`tuple<string, int, bool>`) when a struct is overkill; `std::tie(a, b, c) = ...` unpacks into existing variables. Tuples compare lexicographically for free, which powers multi-key sorting. Reach for tuple for anonymous groups, structs for named concepts — the line is whether the fields deserve names.",
  "Multi-value returns": "Functions that compute several related results should return them together — a tuple, a small struct, or (rarely) out-parameters. Returning the bundle beats 'return one, stash the rest in globals' on every axis: testability, thread-safety, clarity. C++17 structured bindings unpack at the call site; `tie` does it in C++11 with one extra line.",
  "Destructuring with tie": "`std::tie(a, b) = pair` assigns each element to its variable in order, ignoring with `std::ignore` where wanted. It turns multi-returns into named locals at the call site — no `.first`/`.second` archaeology. Tie-based unpacking is the portable destructuring pattern; learn it and structured bindings later feel like syntax sugar (they are).",
  "Pointer + size idiom": "C APIs and buffers speak pointer-plus-size (`data`, `n`) — the minimal non-owning range. Every span-like abstraction starts here: store both, check `i < n` on access, never let the pointer outlive the buffer. The idiom is the contract underneath `string_view`, `span`, and every safe wrapper: bounds live with the pointer, not in comments.",
  "View classes": "A view class wraps pointer-plus-size with methods (`size()`, `at()`, iterators, `subview`) — a few lines that convert raw buffers into checkable ranges. Templated on element type, it serves vectors, arrays, and C buffers uniformly. Views compose with algorithms; raw pointers do not. Write one view class and you will reuse it for years.",
  "Bounds-checked access": "`at(i)` asserts (or throws) on out-of-range; `operator[]` trusts you. During development, route every access through the checked form — the failures point at the bug instead of corrupting state. Checks compile away where you prove safety later, but the habit of 'checked first' pays for itself the first time it fires.",
  "Patterns & matching": "A regex is a pattern for a set of strings: literals match themselves, `\\d` matches digits, `+`/`*` repeat, parentheses group. `regex_match` demands the whole input match; `regex_search` accepts a substring. Start with matching before groups or iteration — most validation tasks ('is this an email-ish string?') end at this step.",
  "Capture groups": "Parentheses both group and capture: match `m[0]` is the whole hit, `m[1]`, `m[2]` the groups in order. Captures turn 'does it match?' into 'what are the parts?' — user from email, area code from phone. Name the group order in a comment; numbered groups are powerful but unreadable without one.",
  "Iterating matches": "`sregex_iterator` walks every non-overlapping match in a string — tokenizers, finders, and counters in three lines. Each dereference is a full `smatch` with groups. Prefer iterators over manual `find`-loops for pattern scanning: the engine handles positions, overlaps, and termination correctly by construction.",
  "cmath essentials": "`<cmath>` covers the working set: `sqrt`, `pow`, `abs` (overloaded — never the C `abs` on doubles), `sin`/`cos`/`exp`/`log`, `floor`/`ceil`/`round`, `fmod` for float modulo. Double versions are the default; `float`/`long double` overloads exist. Numerics start here — reach past it only for linear algebra libraries.",
  "Numeric limits": "`std::numeric_limits<T>` publishes every type's extremes — `max()`, `min()`, `lowest()`, `epsilon()`, `infinity()`, `is_signed`. Sentinel values, overflow guards, and parsers all read through limits instead of magic constants. `max()` plus one is the overflow test; `epsilon()` is the comparison tolerance. Never hardcode what the type can tell you.",
  "Float comparison pitfalls": "Floats approximate: `0.1 + 0.2 != 0.3` in binary, so compare with tolerance (`abs(a-b) < eps`), never `==`. Epsilon scales with magnitude — use relative tolerance for large values, absolute near zero. Sorting and hashing on raw floats inherit the fuzz; quantize or key on integers where exactness matters.",
  "Error codes vs exceptions": "Two honest strategies: exceptions for rare, caller-can't-fix failures (unwinding to someone who can); codes/enums for expected, caller-handles-now outcomes (parse results, validation). Exceptions cross layers automatically; codes stay visible in signatures. Mixing them thoughtfully (codes at boundaries, exceptions inside) beats either alone.",
  "std::error_code": "`std::error_code` pairs a value with a category — portable, comparable, printable errors without exceptions. `std::errc` covers the POSIX set (no-such-file, permission-denied); custom categories extend it. Functions return codes (or take `error_code&` out-params) where failure is routine and throwing would be noise.",
  "Result-style returns": "Return success-or-failure as data: an int status with an out-param, a `bool` plus value, or a small result struct. Callers handle the outcome at the call site — no hidden control flow, no unwinding surprises. Result returns shine in parsers, validators, and hot paths; they make every failure mode a visible branch.",
  "Strategy with polymorphism": "Strategy encapsulates interchangeable behaviors behind one interface — here, log sinks behind `Sink::write`. The context holds base pointers; swapping strategies changes behavior without touching the context. New strategies add classes, never edits. When a switch statement keeps growing new cases, it wants to be a strategy hierarchy.",
  "Observer lists": "Observers subscribe to notifications: a vector of listeners (or sinks, or callbacks), each invoked on events. Registration and dispatch stay decoupled — subjects never know who listens. Logging, UI updates, and event buses are all observer lists. Keep the list's lifetime strictly inside the subject's, and reentrancy (listeners that unsubscribe mid-notify) in mind.",
  "Composition revisited": "Both patterns favor has-a over is-a: the logger has sinks, the subject has observers. Composition keeps hierarchies flat and behaviors swappable at runtime — inheritance can do neither. When tempted to subclass for reuse, first ask whether holding the thing (and delegating) expresses the relationship better.",
  "Static polymorphism": "Templates resolve 'which behavior?' at compile time — no vtables, no indirection, full inlining. CRTP (`Derived : Base<Derived>`) is the flagship: the base calls into the derived statically. Static polymorphism is faster and stricter (mismatches fail at build); dynamic polymorphism is flexible at runtime. Choose by when the choice must be made.",
  "CRTP counters": "A CRTP base (`Counter<Derived>`) accessing `Derived::count_` injects per-class static state and behavior without a single virtual call. Each instantiation is a distinct base with its own statics — mixin-style reuse resolved entirely at compile time. Counters, clonables, and comparable-mixins all follow this exact shape.",
  "Policy classes": "Policies are template parameters that select behavior — a `ClampPolicy`, an allocation policy, a threading policy — composed at instantiation (`Widget<SingleThreaded>`). Alexandrescu's policy-based design builds classes by inheriting policies. Policies make orthogonal choices combinable without combinatorial class explosions.",
  "Benchmarking honestly": "Honest benchmarks fix the workload, warm up, repeat enough to drown noise, and compare configurations relatively (A vs B, same machine, same flags). Never benchmark `-O0`, never trust one run, never print timings into assertions. A benchmark that cannot be rerun to the same conclusion is anecdote, not data.",
  "Avoiding copies": "Copies hide in signatures (by-value parameters), loops (copying iteration), and returns (pre-elision thinking). The fixes compose: `const&` parameters, reference iteration, move-aware types, `reserve` before fills, `emplace` at construction. Profile first (copies you cannot see, you cannot bill), then remove the counted ones.",
  "Capacity planning": "`reserve` before bulk inserts, `shrink_to_fit` after build phases, bucket `reserve` on hash tables — capacity calls placed from measured sizes. Planning turns O(n) reallocations into one allocation and removes latency spikes from hot paths. Measure the steady-state size once, encode it as a reserve, and the growth tax disappears.",
  "Placement new": "Placement new (`new (buffer) T(args)`) constructs an object in memory you already own — pools, arenas, shared segments — separating allocation from construction. You then own destruction too: call `p->~T()` explicitly. It is the primitive beneath every pool, arena, and custom container: construct anywhere, destroy deliberately.",
  "Pool allocation": "A pool preallocates a slab and hands out fixed chunks — O(1) allocation, near-zero fragmentation, cache-friendly reuse for same-size objects (nodes, particles, messages). Freed chunks return to a free list instead of the OS. Pools trade generality for speed exactly where allocation dominates profiles.",
  "Manual lifetimes": "Separating storage from lifetime (raw buffer, then construct, use, destroy) is full manual control — and full manual responsibility. Every constructed object must be destroyed exactly once, even on exception paths. Encapsulate the protocol in a pool or arena class immediately; raw manual lifetimes loose in application code are bugs waiting for stress.",
  "Generator pattern": "A generator produces a sequence on demand — `next()` plus `done()` — holding its position between calls. Consumers pull values without materializing the whole series (infinite sequences become representable). Coroutines automate this; a two-int class teaches it. Any lazy series (ranges, pages, IDs) starts as this shape.",
  "State machines": "Generators are tiny state machines: state (`cur_`, `end_`) plus transitions (`next()`, `done()`). Explicit states replace hidden control flow — paused loops, resumed scans, multi-phase parses all become data plus rules. When a function's 'where was I?' gets complicated, promote the position to state and the function to a machine.",
  "Lazy sequences by hand": "Hand-rolled laziness (counters, cursors, paged readers) computes each element only when pulled — constant memory for unbounded series. The pattern scales: replace the counter with a file cursor, a network pager, a search frontier. Coroutines will later write this pattern for you; understanding it first makes them obvious.",
  "Why modules": "Headers recompile every includer (`<vector>` parsed thousands of times per build); modules compile once and import as binary interface. Macros stop leaking across boundaries, order stops mattering, and builds get dramatically faster. Modules fix the oldest scalability bug in C++ — the textual inclusion model itself.",
  "Interface vs implementation": "A module interface unit (`export module X`) declares what callers may use; implementation units define it invisibly. Unlike headers, non-exported module code is unreachable by construction — true encapsulation at build granularity. Design interfaces as exported lists; everything else is private by default, finally.",
  "Migration path": "Adopt modules incrementally: new components as modules first, legacy headers wrapped (`import` where clean, `#include` where tangled), global-module fragments bridging old and new. Mixed builds are the norm for years — compilers support both simultaneously. Migrate the hottest headers (most-included) for the biggest build-time wins.",
  "Wall Wextra Werror": "`-Wall -Wextra` enables the warning set that catches real bugs (sign compares, unused results, suspicious logic); `-Werror` promotes them to build failures so they cannot accumulate. A warning-free build is a maintained invariant, not a one-time cleanup. Add the flags on day one of every project — retrofitting them onto old code is archaeology.",
  "ASan & UBSan": "AddressSanitizer (`-fsanitize=address`) catches use-after-free, overflows, double-free at runtime; UBSan (`-fsanitize=undefined`) catches overflow, misaligned and null dereferences. They slow execution ~2x to verify correctness — run tests under both, ship without them. Sanitizers find the bugs that pass every code review.",
  "Clean-code habits": "The habits that keep sanitizers quiet: initialize everything, check bounds with `at()` in development, free what you own (or better, own nothing raw), compile warning-free, test edges. Clean code is not aesthetic — it is the set of practices that makes entire bug classes unreachable. Tools verify; habits prevent.",
  "Sockets overview": "Sockets are file-descriptor-like endpoints (`socket`, `bind`, `listen`, `accept`, `connect`) over which bytes stream; TCP adds reliability and order, UDP raw datagrams. Portable C++ uses OS APIs or libraries (Asio, sockets) — the standard has no networking yet. Understand the call sequence conceptually first; the code follows the same shape on every platform.",
  "Parsing endpoints": "Before connecting anywhere, programs parse 'host:port' text — split on the last colon (IPv6 contains colons), validate the port range, resolve the host separately. Endpoint parsing is pure string work, testable without any network. Every client and server shares this front door; get it strict early.",
  "Length-prefix framing": "TCP is a byte stream, not messages — framing restores boundaries: prefix each payload with its length (`5:hello`), read length, then exactly that many bytes. Framing turns 'a stream of bytes' into 'a sequence of messages' with ten lines of code. Delimiters work too, but lengths handle binary payloads that delimiters cannot.",
  "Text wire formats": "Text serialization (`title|year`, one record per line) stays human-readable and debuggable — `cat` the file, see the state. Fields join with a delimiter, records with newlines, and the whole format fits in a comment. Reach for text until measurements demand binary; debuggability is a feature with real value.",
  "Escaping & delimiters": "Delimiters collide with data (a `|` inside a title) — escape them (`\\|`), quote fields, or forbid the character at input time. The rule is total: every writer must escape, every reader must unescape, and tests must include hostile data. Most 'simple format' bugs are escaping bugs wearing a disguise.",
  "Round-trip testing": "Serialize, parse back, assert equality with the original — the round-trip test validates both directions at once. Include empty strings, delimiter-hostile data, boundary numbers, and maximal records. A format with a passing round-trip suite is a format you can trust; without one, every save is a hope.",
  "Uninitialized reads": "Reading an uninitialized variable is undefined behavior — not 'random value', but a license for the optimizer to do anything (including deleting your null checks). Initialize at declaration, always (`int x = 0`), and let `-Wmaybe-uninitialized` audit the rest. Zero-initialization is free; UB is not.",
  "Signed overflow": "Signed integer overflow is undefined (the optimizer assumes it never happens — and optimizes accordingly), while unsigned wraps modulo 2^n. Overflow checks belong before the operation (`if (a > max - b)`), not after. When wraparound is the intent, say so with unsigned types; when it is not, check first.",
  "Widen-before-multiply": "Widen operands before operating, not after: `static_cast<long long>(a) * b` computes in 64 bits, while `(long long)(a * b)` overflows in 32 first and widens garbage. The cast must precede the arithmetic it protects. Fixed-width types (`int64_t`) make the width explicit and portable — `long` is 32 bits on Windows, 64 on Linux.",
  "Fixed-width integers": "`<cstdint>` types (`int32_t`, `uint64_t`) guarantee width everywhere — file formats, protocols, and IPC depend on it. Plain `int`/`long` vary by platform (`long` is the famous 32-vs-64 split). Use fixed widths at every boundary, plain types for local arithmetic, and convert explicitly between them.",
  "sizeof guarantees": "`sizeof(char)` is 1 by definition; fixed-width types guarantee their sizes; everything else is implementation-defined (query, never assume). `static_assert(sizeof(int32_t) == 4)` freezes assumptions into build errors. Portability bugs are assumptions about sizes that held on exactly one machine.",
  "Feature macros": "`__cplusplus` reports the standard version (201402 for C++14, 202003 for C++20), platform macros (`_WIN32`, `__linux__`) select platform code, and `__has_include` probes for headers. Guard version-specific code with macros so one codebase compiles on old and new toolchains. Detect, do not assume.",
  "Naming & const habits": "Names carry meaning (`total_scores`, not `f`; `open_count`, not `n` across scopes), `const` marks everything unchanging (variables, parameters, methods). Reviewers read names first and const-ness second — both answer 'what is this and may it change?' without reading the body. Good names plus const-correctness halve review time.",
  "Review checklists": "Review against a list, not vibes: ownership (who frees?), bounds (who checks?), errors (every failure handled?), const (mutable only with reason?), tests (edges covered?). Checklists make reviews repeatable and teachable — juniors review like seniors when the questions are written down. Keep the list short enough to actually use.",
  "Refactoring safely": "Safe refactoring is behavior-preserving by construction: cover with tests first, change in small steps, rerun after each, keep interfaces stable while restructuring internals. Rename, extract function, replace implementation — each a reversible step with a green test run between. Refactor with the net (tests) up, never without it.",
  "Requirements to modules": "Architecture starts from requirements: list what the program must do, group related duties into modules (data, logic, I/O, persistence), and define each module's interface before its implementation. Modules with narrow interfaces and no cycles survive contact with real features. The diagram precedes the code — an hour of design saves a week of untangling.",
  "Core data operations": "Every application's core is data plus operations: enumerate the entities (Task: title, done), then the verbs (add, complete, list, count). Implement the verbs as free functions over plain structs — testable without I/O, reusable from any UI. If the core works in a test harness, every interface on top is just presentation.",
  "Interface-first design": "Write the interface (function signatures, struct shapes) before the implementation — callers review what they will use, tests target what is promised. Interfaces change expensively once callers exist, so settle them early while change is cheap. Code to the interface from both sides: implementation below, tests and UI above.",
  "Collection design": "A collection owns its elements and answers domain questions: add, remove, find, count-by-state. Keep storage private (`std::vector` inside), expose behavior (checkout, open-count) rather than iterators-into-internals. The struct-plus-functions shape scales from three books to three million — same questions, bigger storage.",
  "Persistence & tests": "Capstone persistence means the round-trip suite passes on real files: save a known shelf, reload, assert equality; test empty shelves, lent states, and hostile titles. Assertions inside the program (`assert(i < size)`) guard invariants at runtime. A capstone that cannot lose data (tested) beats a clever one that can.",
  "Polish & next steps": "Polish is the last 10% that reads as 90%: clear output, handled edge cases, a README of how to build and run, honest known-limitations. Next steps point outward — concurrency for the server version, a real database for storage, C++20 modules for the build. Finished plus documented beats brilliant plus abandoned.",

};

/* ─── C++ quiz map ─── */

const CPP_QUIZ_MAP: Record<string, { q: string; opts: { id: string; text: string; correct: boolean }[] }> = {
  "The iostream library": {
    q: "How do you print a value in C++?",
    opts: [
      { id: "a", text: "`std::cout << value;`", correct: true },
      { id: "b", text: "`printf(value)`", correct: false },
      { id: "c", text: "`print(value)`", correct: false },
      { id: "d", text: "`echo value`", correct: false },
    ],
  },
  "Fundamental types": {
    q: "Which type is used for a true/false value?",
    opts: [
      { id: "a", text: "bool", correct: true },
      { id: "b", text: "int", correct: false },
      { id: "c", text: "char", correct: false },
      { id: "d", text: "double", correct: false },
    ],
  },
  "Initialization syntax": {
    q: "Which initialization form rejects narrowing conversions?",
    opts: [
      { id: "a", text: "Brace: `int x{3.7}`", correct: true },
      { id: "b", text: "Equals: `int x = 3.7`", correct: false },
      { id: "c", text: "Paren: `int x(3.7)`", correct: false },
      { id: "d", text: "None of them", correct: false },
    ],
  },
  "constexpr": {
    q: "When is a `constexpr` variable's value computed?",
    opts: [
      { id: "a", text: "At compile time", correct: true },
      { id: "b", text: "At the first runtime use", correct: false },
      { id: "c", text: "Every time it's read", correct: false },
      { id: "d", text: "On program exit", correct: false },
    ],
  },
  "auto type deduction": {
    q: "`auto` in C++ is:",
    opts: [
      { id: "a", text: "Compile-time type deduction", correct: true },
      { id: "b", text: "Dynamic typing like Python", correct: false },
      { id: "c", text: "A void pointer", correct: false },
      { id: "d", text: "A runtime cast", correct: false },
    ],
  },
  "Integer division": {
    q: "What does `7 / 2` evaluate to in C++?",
    opts: [
      { id: "a", text: "3", correct: true },
      { id: "b", text: "3.5", correct: false },
      { id: "c", text: "3 (rounded up to 4)", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "std::string": {
    q: "How do you concatenate two std::strings?",
    opts: [
      { id: "a", text: "`s1 + s2`", correct: true },
      { id: "b", text: "`strcat(s1, s2)`", correct: false },
      { id: "c", text: "`s1.concat(s2)`", correct: false },
      { id: "d", text: "`join(s1, s2)`", correct: false },
    ],
  },
  "Reading whole lines": {
    q: "Which function reads a whole line including spaces?",
    opts: [
      { id: "a", text: "`std::getline(std::cin, line)`", correct: true },
      { id: "b", text: "`std::cin >> line`", correct: false },
      { id: "c", text: "`std::cin.read_line(line)`", correct: false },
      { id: "d", text: "`std::cin.scanf(\"%s\", line)`", correct: false },
    ],
  },
  "Comparison & logical operators": {
    q: "What's the difference between `==` and `=`?",
    opts: [
      { id: "a", text: "`==` compares, `=` assigns", correct: true },
      { id: "b", text: "`=` compares, `==` assigns", correct: false },
      { id: "c", text: "They're interchangeable", correct: false },
      { id: "d", text: "`==` is only for strings", correct: false },
    ],
  },
  "break and continue": {
    q: "What does `continue` do inside a loop?",
    opts: [
      { id: "a", text: "Skips to the next iteration", correct: true },
      { id: "b", text: "Exits the loop entirely", correct: false },
      { id: "c", text: "Restarts the program", correct: false },
      { id: "d", text: "Pauses the loop", correct: false },
    ],
  },
  "Pass by value vs reference": {
    q: "Passing a big object by `const&` is best when:",
    opts: [
      { id: "a", text: "You want to avoid copying and not modify it", correct: true },
      { id: "b", text: "You want a private copy", correct: false },
      { id: "c", text: "The object is a built-in int", correct: false },
      { id: "d", text: "You never use it", correct: false },
    ],
  },
  "Function overloading": {
    q: "What makes two functions with the same name valid?",
    opts: [
      { id: "a", text: "Different parameter lists", correct: true },
      { id: "b", text: "Different return types only", correct: false },
      { id: "c", text: "Being in different files", correct: false },
      { id: "d", text: "Having different comments", correct: false },
    ],
  },
  "Recursion basics": {
    q: "What stops infinite recursion?",
    opts: [
      { id: "a", text: "A base case that returns directly", correct: true },
      { id: "b", text: "The compiler's recursion limit", correct: false },
      { id: "c", text: "Making the function void", correct: false },
      { id: "d", text: "Nothing can", correct: false },
    ],
  },
  "References": {
    q: "A reference in C++ is:",
    opts: [
      { id: "a", text: "An alias for an existing object", correct: true },
      { id: "b", text: "A copy of an object", correct: false },
      { id: "c", text: "A pointer you can reseat", correct: false },
      { id: "d", text: "A memory allocation", correct: false },
    ],
  },
  "nullptr": {
    q: "What does `nullptr` mean?",
    opts: [
      { id: "a", text: "A typed null pointer value", correct: true },
      { id: "b", text: "Integer zero", correct: false },
      { id: "c", text: "A deleted object", correct: false },
      { id: "d", text: "An empty string", correct: false },
    ],
  },
  "std::vector": {
    q: "Which operation grows a std::vector?",
    opts: [
      { id: "a", text: "`push_back(x)`", correct: true },
      { id: "b", text: "`at(x)`", correct: false },
      { id: "c", text: "`size()`", correct: false },
      { id: "d", text: "`front()`", correct: false },
    ],
  },
  "Range-based for loops": {
    q: "Which loop visits every element of a vector without indices?",
    opts: [
      { id: "a", text: "`for (int n : nums)`", correct: true },
      { id: "b", text: "`for (int i = 0; i < n; i++)`", correct: false },
      { id: "c", text: "`while (nums)`", correct: false },
      { id: "d", text: "`loop over nums`", correct: false },
    ],
  },
  "Structs": {
    q: "A C++ struct differs from a class in that:",
    opts: [
      { id: "a", text: "Members are public by default", correct: true },
      { id: "b", text: "Structs can't have functions", correct: false },
      { id: "c", text: "Structs are heap-allocated", correct: false },
      { id: "d", text: "There is no difference", correct: false },
    ],
  },
  "Access specifiers": {
    q: "A private member can be accessed by:",
    opts: [
      { id: "a", text: "Only the class's own functions", correct: true },
      { id: "b", text: "Any function in the file", correct: false },
      { id: "c", text: "Derived classes always", correct: false },
      { id: "d", text: "Any other class", correct: false },
    ],
  },
  "Constructors": {
    q: "When does a constructor run?",
    opts: [
      { id: "a", text: "When an object is created", correct: true },
      { id: "b", text: "When the object is destroyed", correct: false },
      { id: "c", text: "When the class is defined", correct: false },
      { id: "d", text: "On every method call", correct: false },
    ],
  },
  "RAII": {
    q: "RAII means resources are released:",
    opts: [
      { id: "a", text: "Automatically in the destructor", correct: true },
      { id: "b", text: "Manually with free()", correct: false },
      { id: "c", text: "By the garbage collector", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "Inheritance": {
    q: "`class Dog : public Animal` models:",
    opts: [
      { id: "a", text: "Dog is-a Animal", correct: true },
      { id: "b", text: "Dog has-a Animal", correct: false },
      { id: "c", text: "Dog contains Animal", correct: false },
      { id: "d", text: "Dog uses Animal", correct: false },
    ],
  },
  "Virtual functions": {
    q: "What makes `shape->area()` call the Circle version?",
    opts: [
      { id: "a", text: "Declaring area() virtual in the base", correct: true },
      { id: "b", text: "Naming the method area()", correct: false },
      { id: "c", text: "Making the class abstract", correct: false },
      { id: "d", text: "Calling it from a pointer", correct: false },
    ],
  },
  "Abstract classes": {
    q: "A class with a pure virtual function:",
    opts: [
      { id: "a", text: "Cannot be instantiated directly", correct: true },
      { id: "b", text: "Must be a template", correct: false },
      { id: "c", text: "Has no constructor", correct: false },
      { id: "d", text: "Cannot be inherited from", correct: false },
    ],
  },
  "std::unique_ptr": {
    q: "How many owners can a unique_ptr have?",
    opts: [
      { id: "a", text: "Exactly one", correct: true },
      { id: "b", text: "Unlimited", correct: false },
      { id: "c", text: "Zero or more", correct: false },
      { id: "d", text: "Two", correct: false },
    ],
  },
  "Template basics": {
    q: "A function template generates:",
    opts: [
      { id: "a", text: "A specialized function per type used", correct: true },
      { id: "b", text: "One function that accepts void*", correct: false },
      { id: "c", text: "A macro at preprocess time", correct: false },
      { id: "d", text: "A runtime polymorphic call", correct: false },
    ],
  },
  "std::map & std::set": {
    q: "Lookup in std::map is:",
    opts: [
      { id: "a", text: "O(log n) with sorted order", correct: true },
      { id: "b", text: "O(1) always", correct: false },
      { id: "c", text: "O(n) linear", correct: false },
      { id: "d", text: "O(n log n)", correct: false },
    ],
  },
  "std::unordered_map": {
    q: "std::unordered_map is best when you need:",
    opts: [
      { id: "a", text: "Average O(1) lookup by key", correct: true },
      { id: "b", text: "Keys in sorted order", correct: false },
      { id: "c", text: "Index access by position", correct: false },
      { id: "d", text: "A queue", correct: false },
    ],
  },
  "find & accumulate": {
    q: "How do you know std::find found nothing?",
    opts: [
      { id: "a", text: "It returns end()", correct: true },
      { id: "b", text: "It returns nullptr", correct: false },
      { id: "c", text: "It throws", correct: false },
      { id: "d", text: "It returns -1", correct: false },
    ],
  },
  "Lambda syntax": {
    q: "Which part of a lambda declares captures?",
    opts: [
      { id: "a", text: "The square brackets `[]`", correct: true },
      { id: "b", text: "The parentheses `()`", correct: false },
      { id: "c", text: "The body `{}`", correct: false },
      { id: "d", text: "The arrow `->`", correct: false },
    ],
  },
  "ofstream / ifstream": {
    q: "How do you check a file opened successfully?",
    opts: [
      { id: "a", text: "`if (!out) { /* failed */ }`", correct: true },
      { id: "b", text: "`if (out == null)`", correct: false },
      { id: "c", text: "`if (fileExists(out))`", correct: false },
      { id: "d", text: "You can't check", correct: false },
    ],
  },
  "try / catch / throw": {
    q: "What happens as an exception unwinds the stack?",
    opts: [
      { id: "a", text: "Destructors of local objects run", correct: true },
      { id: "b", text: "All memory is freed globally", correct: false },
      { id: "c", text: "The program restarts", correct: false },
      { id: "d", text: "Nothing happens", correct: false },
    ],
  },
  "std::move": {
    q: "What does std::move(obj) do?",
    opts: [
      { id: "a", text: "Casts obj to an rvalue reference", correct: true },
      { id: "b", text: "Immediately deletes obj", correct: false },
      { id: "c", text: "Copies obj", correct: false },
      { id: "d", text: "Moves obj to another process", correct: false },
    ],
  },
  "The rule of five": {
    q: "The five special members are:",
    opts: [
      { id: "a", text: "Destructor, copy ctor/assign, move ctor/assign", correct: true },
      { id: "b", text: "Constructor, destructor, main, operator+, friend", correct: false },
      { id: "c", text: "The five container types", correct: false },
      { id: "d", text: "There are only three", correct: false },
    ],
  },
  "Namespaces": {
    q: "What is a namespace for?",
    opts: [
      { id: "a", text: "Avoiding symbol name collisions", correct: true },
      { id: "b", text: "Allocating memory", correct: false },
      { id: "c", text: "Speeding up compilation", correct: false },
      { id: "d", text: "Hiding implementation", correct: false },
    ],
  },
  "enum class": {
    q: "Why prefer `enum class` over `enum`?",
    opts: [
      { id: "a", text: "Scoped members, no implicit int conversion", correct: true },
      { id: "b", text: "It's faster at runtime", correct: false },
      { id: "c", text: "It stores less memory", correct: false },
      { id: "d", text: "It allows string values", correct: false },
    ],
  },
  "constexpr functions": {
    q: "A constexpr function called with constant arguments runs:",
    opts: [
      { id: "a", text: "At compile time", correct: true },
      { id: "b", text: "At runtime, slower", correct: false },
      { id: "c", text: "Never", correct: false },
      { id: "d", text: "On a background thread", correct: false },
    ],
  },
  "std::thread": {
    q: "What must happen to a std::thread before destruction?",
    opts: [
      { id: "a", text: "join() or detach()", correct: true },
      { id: "b", text: "delete", correct: false },
      { id: "c", text: "mutex lock", correct: false },
      { id: "d", text: "Nothing is required", correct: false },
    ],
  },
  "Mutexes & locks": {
    q: "A std::lock_guard ensures the mutex:",
    opts: [
      { id: "a", text: "Unlocks on scope exit (RAII)", correct: true },
      { id: "b", text: "Stays locked forever", correct: false },
      { id: "c", text: "Locks only on demand", correct: false },
      { id: "d", text: "Is never locked", correct: false },
    ],
  },
  "Const correctness": {
    q: "Marking a member function const means it:",
    opts: [
      { id: "a", text: "Cannot modify the object", correct: true },
      { id: "b", text: "Runs faster", correct: false },
      { id: "c", text: "Is called only by const objects", correct: false },
      { id: "d", text: "Returns void", correct: false },
    ],
  },
  "noexcept & move": {
    q: "Containers prefer to move elements when the move is:",
    opts: [
      { id: "a", text: "noexcept", correct: true },
      { id: "b", text: "virtual", correct: false },
      { id: "c", text: "inline", correct: false },
      { id: "d", text: "const", correct: false },
    ],
  },
  "std::cin": {
    q: "What does `std::cin >> x` read?",
    opts: [
      { id: "a", text: "One whitespace-delimited token", correct: true },
      { id: "b", text: "A whole line including spaces", correct: false },
      { id: "c", text: "A single character", correct: false },
      { id: "d", text: "The entire file", correct: false },
    ],
  },
  "if / else if / else": {
    q: "In an if/else-if chain, which branch runs?",
    opts: [
      { id: "a", text: "The first condition that is true", correct: true },
      { id: "b", text: "Every branch whose condition is true", correct: false },
      { id: "c", text: "The last branch, always", correct: false },
      { id: "d", text: "A random one", correct: false },
    ],
  },
  "for loops": {
    q: "`for (;;)` creates:",
    opts: [
      { id: "a", text: "An infinite loop", correct: true },
      { id: "b", text: "A syntax error", correct: false },
      { id: "c", text: "A loop that runs once", correct: false },
      { id: "d", text: "A range-based for loop", correct: false },
    ],
  },
  "Function declarations": {
    q: "Why do you need a declaration before calling a function?",
    opts: [
      { id: "a", text: "So the compiler can check every call against the signature", correct: true },
      { id: "b", text: "To allocate memory for the function", correct: false },
      { id: "c", text: "There is no reason in modern C++", correct: false },
      { id: "d", text: "To make the function inline", correct: false },
    ],
  },
  "C-style arrays": {
    q: "What's the main danger of `int arr[5]`?",
    opts: [
      { id: "a", text: "No bounds checking — `arr[7]` corrupts memory", correct: true },
      { id: "b", text: "It's always heap-allocated and slow", correct: false },
      { id: "c", text: "It can't hold integers", correct: false },
      { id: "d", text: "It's read-only", correct: false },
    ],
  },
  "operator+": {
    q: "Defining `operator+` lets your type:",
    opts: [
      { id: "a", text: "Use `a + b` syntax naturally", correct: true },
      { id: "b", text: "Only work with ints", correct: false },
      { id: "c", text: "Bypass the compiler", correct: false },
      { id: "d", text: "Be printed by cout automatically", correct: false },
    ],
  },
  "Class templates": {
    q: "`template <typename T> class Box` lets you create:",
    opts: [
      { id: "a", text: "A family of types like `Box<int>`, `Box<string>`", correct: true },
      { id: "b", text: "One type that stores void pointers", correct: false },
      { id: "c", text: "A runtime polymorphic class", correct: false },
      { id: "d", text: "A macro", correct: false },
    ],
  },
  "Iterator categories": {
    q: "Why can't std::sort sort a std::list?",
    opts: [
      { id: "a", text: "std::sort needs random-access iterators; a list's are bidirectional", correct: true },
      { id: "b", text: "Lists contain non-comparable values", correct: false },
      { id: "c", text: "sort is only for ints", correct: false },
      { id: "d", text: "Lists are always sorted", correct: false },
    ],
  },
  "Project structure": {
    q: "A good small project keeps apart:",
    opts: [
      { id: "a", text: "The data model, the logic, and the I/O", correct: true },
      { id: "b", text: "All code in one giant main()", correct: false },
      { id: "c", text: "Headers only, no .cpp files", correct: false },
      { id: "d", text: "Everything in global variables", correct: false },
    ],
  },
  "Testing and iteration": {
    q: "The first step in fixing a bug is:",
    opts: [
      { id: "a", text: "Adding a failing test that reproduces it", correct: true },
      { id: "b", text: "Deleting the code", correct: false },
      { id: "c", text: "Restarting the machine", correct: false },
      { id: "d", text: "Rewriting in another language", correct: false },
    ],
  },
  "Capacity vs size": {
    q: "A vector with size 3 and capacity 10:",
    opts: [
      { id: "a", text: "Holds 3 elements, has room for 10 without reallocating", correct: true },
      { id: "b", text: "Holds 10 elements, 3 of them empty", correct: false },
      { id: "c", text: "Will reallocate on the next push_back", correct: false },
      { id: "d", text: "Uses 3 bytes of memory", correct: false },
    ],
  },
  "reserve & shrink_to_fit": {
    q: "When should you call `reserve(n)`?",
    opts: [
      { id: "a", text: "Before bulk inserts, when you know the final size", correct: true },
      { id: "b", text: "After every push_back", correct: false },
      { id: "c", text: "Only when the vector is empty forever", correct: false },
      { id: "d", text: "Instead of using the vector", correct: false },
    ],
  },
  "Emplace & move growth": {
    q: "How does `emplace_back(args)` differ from `push_back(T(args))`?",
    opts: [
      { id: "a", text: "It constructs the element in place, skipping the temporary", correct: true },
      { id: "b", text: "It reserves capacity first", correct: false },
      { id: "c", text: "It only works for ints", correct: false },
      { id: "d", text: "There is no difference", correct: false },
    ],
  },
  "Doubly-linked lists": {
    q: "Inserting at a known position in a std::list is:",
    opts: [
      { id: "a", text: "O(1) with no iterator invalidation", correct: true },
      { id: "b", text: "O(n) like a vector", correct: false },
      { id: "c", text: "O(log n)", correct: false },
      { id: "d", text: "Impossible without copying", correct: false },
    ],
  },
  "Splice & merge": {
    q: "What does `a.splice(it, b)` do?",
    opts: [
      { id: "a", text: "Moves nodes from b into a in O(1) without copying", correct: true },
      { id: "b", text: "Copies all of b into a", correct: false },
      { id: "c", text: "Sorts both lists", correct: false },
      { id: "d", text: "Deletes b", correct: false },
    ],
  },
  "list vs vector tradeoffs": {
    q: "The default sequence container should be:",
    opts: [
      { id: "a", text: "vector, because contiguous memory wins through cache locality", correct: true },
      { id: "b", text: "list, because pointers are always faster", correct: false },
      { id: "c", text: "deque, in every case", correct: false },
      { id: "d", text: "A raw array", correct: false },
    ],
  },
  "Double-ended queues": {
    q: "What can a deque do that a vector cannot do cheaply?",
    opts: [
      { id: "a", text: "O(1) push_front", correct: true },
      { id: "b", text: "Indexed access", correct: false },
      { id: "c", text: "Iteration", correct: false },
      { id: "d", text: "Sorting", correct: false },
    ],
  },
  "stack & queue adapters": {
    q: "std::stack and std::queue are best described as:",
    opts: [
      { id: "a", text: "Adapters restricting a container to LIFO/FIFO discipline", correct: true },
      { id: "b", text: "Standalone containers with their own storage", correct: false },
      { id: "c", text: "Thread-safe queues", correct: false },
      { id: "d", text: "Sorting algorithms", correct: false },
    ],
  },
  "priority_queue": {
    q: "std::priority_queue serves elements in which order?",
    opts: [
      { id: "a", text: "Largest first (max-heap by default)", correct: true },
      { id: "b", text: "Insertion order", correct: false },
      { id: "c", text: "Smallest first by default", correct: false },
      { id: "d", text: "Random order", correct: false },
    ],
  },
  "std::map ordering": {
    q: "Iterating a std::map visits keys in:",
    opts: [
      { id: "a", text: "Sorted order", correct: true },
      { id: "b", text: "Insertion order", correct: false },
      { id: "c", text: "Hash order", correct: false },
      { id: "d", text: "Reverse insertion order", correct: false },
    ],
  },
  "std::set membership": {
    q: "Inserting a duplicate into a std::set:",
    opts: [
      { id: "a", text: "Is refused; the set keeps one copy", correct: true },
      { id: "b", text: "Adds a second copy", correct: false },
      { id: "c", text: "Throws an exception", correct: false },
      { id: "d", text: "Clears the set", correct: false },
    ],
  },
  "Custom comparators": {
    q: "A custom comparator for an ordered container must define:",
    opts: [
      { id: "a", text: "A strict weak ordering", correct: true },
      { id: "b", text: "A hash function", correct: false },
      { id: "c", text: "An equality operator only", correct: false },
      { id: "d", text: "A memory allocator", correct: false },
    ],
  },
  "unordered_map buckets": {
    q: "Iteration order of an unordered_map is:",
    opts: [
      { id: "a", text: "Unspecified — never depend on it", correct: true },
      { id: "b", text: "Sorted by key", correct: false },
      { id: "c", text: "Insertion order", correct: false },
      { id: "d", text: "Reverse sorted order", correct: false },
    ],
  },
  "Hash functions & equality": {
    q: "For hashed containers, equal keys must:",
    opts: [
      { id: "a", text: "Hash equally", correct: true },
      { id: "b", text: "Be stored in order", correct: false },
      { id: "c", text: "Be the same object", correct: false },
      { id: "d", text: "Be integers", correct: false },
    ],
  },
  "Load factor & rehash": {
    q: "What triggers an unordered_map rehash?",
    opts: [
      { id: "a", text: "Load factor passing max_load_factor", correct: true },
      { id: "b", text: "Every lookup", correct: false },
      { id: "c", text: "Calling size()", correct: false },
      { id: "d", text: "Iteration", correct: false },
    ],
  },
  "Iterator invalidation": {
    q: "After a vector reallocation, existing iterators are:",
    opts: [
      { id: "a", text: "Invalid — using them is undefined behavior", correct: true },
      { id: "b", text: "Automatically updated", correct: false },
      { id: "c", text: "Still valid for reading", correct: false },
      { id: "d", text: "Converted to indices", correct: false },
    ],
  },
  "Reverse & const iterators": {
    q: "What does `++` do on a reverse iterator?",
    opts: [
      { id: "a", text: "Steps toward the front of the range", correct: true },
      { id: "b", text: "Steps toward the back", correct: false },
      { id: "c", text: "Invalidates the iterator", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Stream iterators": {
    q: "An istream_iterator lets you:",
    opts: [
      { id: "a", text: "Treat a stream as an input range for algorithms", correct: true },
      { id: "b", text: "Write to files faster", correct: false },
      { id: "c", text: "Sort a stream in place", correct: false },
      { id: "d", text: "Seek within a stream", correct: false },
    ],
  },
  "Sorting with predicates": {
    q: "How do you sort a vector in descending order?",
    opts: [
      { id: "a", text: "Pass a greater-than lambda as the comparator", correct: true },
      { id: "b", text: "Call reverse() before sort()", correct: false },
      { id: "c", text: "std::sort always sorts descending", correct: false },
      { id: "d", text: "Negate every element first", correct: false },
    ],
  },
  "binary_search & bounds": {
    q: "std::binary_search requires its input range to be:",
    opts: [
      { id: "a", text: "Sorted", correct: true },
      { id: "b", text: "A vector (not an array)", correct: false },
      { id: "c", text: "Free of duplicates", correct: false },
      { id: "d", text: "Exactly 10 elements", correct: false },
    ],
  },
  "nth_element & partial sort": {
    q: "After nth_element(first, nth, last), what is guaranteed?",
    opts: [
      { id: "a", text: "The nth slot holds the element that belongs there", correct: true },
      { id: "b", text: "The whole range is sorted", correct: false },
      { id: "c", text: "The range is reversed", correct: false },
      { id: "d", text: "Nothing changes", correct: false },
    ],
  },
  "transform & for_each": {
    q: "transform differs from for_each in that transform:",
    opts: [
      { id: "a", text: "Writes results into an output range", correct: true },
      { id: "b", text: "Runs faster", correct: false },
      { id: "c", text: "Only works on vectors", correct: false },
      { id: "d", text: "Takes no function argument", correct: false },
    ],
  },
  "accumulate with ops": {
    q: "In `accumulate(begin, end, 0)`, the `0` determines:",
    opts: [
      { id: "a", text: "The result type of the fold", correct: true },
      { id: "b", text: "The number of elements processed", correct: false },
      { id: "c", text: "Nothing — it is ignored", correct: false },
      { id: "d", text: "The step size", correct: false },
    ],
  },
  "inner_product & scans": {
    q: "std::partial_sum produces:",
    opts: [
      { id: "a", text: "Every running prefix of the range", correct: true },
      { id: "b", text: "Only the final total", correct: false },
      { id: "c", text: "A sorted copy", correct: false },
      { id: "d", text: "The product of all elements", correct: false },
    ],
  },
  "find, substr & replace": {
    q: "What does string::find return when nothing matches?",
    opts: [
      { id: "a", text: "std::string::npos", correct: true },
      { id: "b", text: "nullptr", correct: false },
      { id: "c", text: "-1 as an int, always safe to use as index", correct: false },
      { id: "d", text: "An empty string", correct: false },
    ],
  },
  "String conversions": {
    q: "std::stoi on garbage input:",
    opts: [
      { id: "a", text: "Throws an exception", correct: true },
      { id: "b", text: "Returns 0 silently", correct: false },
      { id: "c", text: "Crashes the program", correct: false },
      { id: "d", text: "Returns the input unchanged", correct: false },
    ],
  },
  "erase, insert & capacity": {
    q: "Repeated insertions in the middle of a long string are:",
    opts: [
      { id: "a", text: "O(n) each — build in a second string instead", correct: true },
      { id: "b", text: "O(1) each", correct: false },
      { id: "c", text: "Free", correct: false },
      { id: "d", text: "Impossible", correct: false },
    ],
  },
  "Non-owning views": {
    q: "The fundamental rule of a string view is:",
    opts: [
      { id: "a", text: "The viewed text must outlive every view of it", correct: true },
      { id: "b", text: "Views own their text", correct: false },
      { id: "c", text: "Views are always null-terminated", correct: false },
      { id: "d", text: "Views copy on access", correct: false },
    ],
  },
  "Zero-copy tokenizing": {
    q: "Zero-copy tokenizing records:",
    opts: [
      { id: "a", text: "Positions, not extracted substrings", correct: true },
      { id: "b", text: "Copies of every token", correct: false },
      { id: "c", text: "The whole string twice", correct: false },
      { id: "d", text: "Nothing — it prints directly", correct: false },
    ],
  },
  "iomanip formatting": {
    q: "Which manipulator is one-shot rather than sticky?",
    opts: [
      { id: "a", text: "setw", correct: true },
      { id: "b", text: "setprecision", correct: false },
      { id: "c", text: "setfill", correct: false },
      { id: "d", text: "fixed", correct: false },
    ],
  },
  "Stream state & errors": {
    q: "After a failed extraction, you must call what before reading again?",
    opts: [
      { id: "a", text: "clear() (and usually ignore() the bad input)", correct: true },
      { id: "b", text: "close()", correct: false },
      { id: "c", text: "flush()", correct: false },
      { id: "d", text: "Nothing — streams recover automatically", correct: false },
    ],
  },
  "Basefield manipulators": {
    q: "After `std::cout << std::hex`, later integers print as:",
    opts: [
      { id: "a", text: "Hexadecimal until the base is changed back", correct: true },
      { id: "b", text: "Hexadecimal exactly once", correct: false },
      { id: "c", text: "Decimal — hex applies per value", correct: false },
      { id: "d", text: "Binary", correct: false },
    ],
  },
  "Parsing with stringstreams": {
    q: "istringstream is most useful for:",
    opts: [
      { id: "a", text: "Parsing fields out of an in-memory line with type checking", correct: true },
      { id: "b", text: "Reading from the keyboard", correct: false },
      { id: "c", text: "Writing binary files", correct: false },
      { id: "d", text: "Faster cout", correct: false },
    ],
  },
  "Path strings & joining": {
    q: "Why write a join_path helper instead of `dir + file`?",
    opts: [
      { id: "a", text: "To guarantee exactly one separator between parts", correct: true },
      { id: "b", text: "It runs faster", correct: false },
      { id: "c", text: "Strings cannot be concatenated with +", correct: false },
      { id: "d", text: "To encrypt the path", correct: false },
    ],
  },
  "File read-back": {
    q: "The correct line-reading loop is:",
    opts: [
      { id: "a", text: "`while (std::getline(in, line))`", correct: true },
      { id: "b", text: "`while (!in.eof()) { in >> line; }`", correct: false },
      { id: "c", text: "`for (line in file)`", correct: false },
      { id: "d", text: "`while (true) getline(...)`", correct: false },
    ],
  },
  "Stream positions & sizes": {
    q: "How do you measure a file's size with seekg/tellg?",
    opts: [
      { id: "a", text: "Seek to end, then tellg", correct: true },
      { id: "b", text: "tellg alone at open", correct: false },
      { id: "c", text: "seekg(0) returns the size", correct: false },
      { id: "d", text: "Streams cannot report size", correct: false },
    ],
  },
  "Deduction & explicit args": {
    q: "Why does `add(2, 3.5)` fail for `template <typename T> T add(T a, T b)`?",
    opts: [
      { id: "a", text: "No single T matches both int and double", correct: true },
      { id: "b", text: "Templates cannot take numbers", correct: false },
      { id: "c", text: "The compiler picks T = void", correct: false },
      { id: "d", text: "It does not fail", correct: false },
    ],
  },
  "Templates & overloads": {
    q: "When a non-template overload and a template both match equally well:",
    opts: [
      { id: "a", text: "The non-template overload wins", correct: true },
      { id: "b", text: "The template wins", correct: false },
      { id: "c", text: "It is a compile error", correct: false },
      { id: "d", text: "A random one is picked", correct: false },
    ],
  },
  "enable_if constraints": {
    q: "What does enable_if do to a template that violates its condition?",
    opts: [
      { id: "a", text: "Removes it from overload resolution", correct: true },
      { id: "b", text: "Deletes the function at runtime", correct: false },
      { id: "c", text: "Throws an exception", correct: false },
      { id: "d", text: "Converts the argument type", correct: false },
    ],
  },
  "Parameter packs": {
    q: "A template parameter pack must appear:",
    opts: [
      { id: "a", text: "Last in the template parameter list", correct: true },
      { id: "b", text: "First in the template parameter list", correct: false },
      { id: "c", text: "In a .cpp file only", correct: false },
      { id: "d", text: "Twice", correct: false },
    ],
  },
  "Recursive expansion": {
    q: "Variadic recursion terminates at:",
    opts: [
      { id: "a", text: "A zero-argument base-case overload", correct: true },
      { id: "b", text: "A return statement", correct: false },
      { id: "c", text: "The first argument", correct: false },
      { id: "d", text: "It never terminates by itself", correct: false },
    ],
  },
  "sizeof... & pack size": {
    q: "`sizeof...(Args)` is evaluated:",
    opts: [
      { id: "a", text: "At compile time", correct: true },
      { id: "b", text: "At runtime on each call", correct: false },
      { id: "c", text: "By the linker", correct: false },
      { id: "d", text: "Never — it is documentation", correct: false },
    ],
  },
  "Rvalue refs revisited": {
    q: "Inside a function body, a named rvalue-reference parameter is:",
    opts: [
      { id: "a", text: "An lvalue (it has a name)", correct: true },
      { id: "b", text: "An rvalue", correct: false },
      { id: "c", text: "A null pointer", correct: false },
      { id: "d", text: "Unusable", correct: false },
    ],
  },
  "Move assignment": {
    q: "A move assignment operator should be marked:",
    opts: [
      { id: "a", text: "noexcept, so containers move instead of copy", correct: true },
      { id: "b", text: "virtual", correct: false },
      { id: "c", text: "const", correct: false },
      { id: "d", text: "inline always", correct: false },
    ],
  },
  "Moved-from state": {
    q: "After `std::move(x)`, you may:",
    opts: [
      { id: "a", text: "Destroy x or assign to it — but not read from it", correct: true },
      { id: "b", text: "Keep using x normally", correct: false },
      { id: "c", text: "Assume x is zero", correct: false },
      { id: "d", text: "Delete x twice", correct: false },
    ],
  },
  "Reference collapsing": {
    q: "`&` combined with `&&` in reference collapsing yields:",
    opts: [
      { id: "a", text: "`&`", correct: true },
      { id: "b", text: "`&&`", correct: false },
      { id: "c", text: "A compile error", correct: false },
      { id: "d", text: "void", correct: false },
    ],
  },
  "Universal references": {
    q: "Which is a universal (forwarding) reference?",
    opts: [
      { id: "a", text: "`T&&` where T is a deduced template parameter", correct: true },
      { id: "b", text: "`std::string&&`", correct: false },
      { id: "c", text: "`const T&`", correct: false },
      { id: "d", text: "`T&`", correct: false },
    ],
  },
  "std::forward": {
    q: "std::forward differs from std::move in that it:",
    opts: [
      { id: "a", text: "Preserves the caller's original value category", correct: true },
      { id: "b", text: "Always copies", correct: false },
      { id: "c", text: "Works only on ints", correct: false },
      { id: "d", text: "Is faster", correct: false },
    ],
  },
  "Scope guards": {
    q: "A scope guard guarantees its action runs:",
    opts: [
      { id: "a", text: "At scope exit, even on early return or exception", correct: true },
      { id: "b", text: "Only on normal return", correct: false },
      { id: "c", text: "At program exit", correct: false },
      { id: "d", text: "Never — it is manual", correct: false },
    ],
  },
  "RAII for C resources": {
    q: "The RAII way to manage a FILE* is:",
    opts: [
      { id: "a", text: "A class that opens in the constructor and closes in the destructor", correct: true },
      { id: "b", text: "A global FILE* closed at exit", correct: false },
      { id: "c", text: "Never closing it", correct: false },
      { id: "d", text: "Closing it twice for safety", correct: false },
    ],
  },
  "Rule of zero": {
    q: "The rule of zero says:",
    opts: [
      { id: "a", text: "Compose RAII members so no custom special members are needed", correct: true },
      { id: "b", text: "Write zero member functions", correct: false },
      { id: "c", text: "Never use the standard library", correct: false },
      { id: "d", text: "Delete all five special members", correct: false },
    ],
  },
  "Custom deleters": {
    q: "A custom deleter on a unique_ptr lets you:",
    opts: [
      { id: "a", text: "Manage any resource with its own cleanup function", correct: true },
      { id: "b", text: "Share ownership", correct: false },
      { id: "c", text: "Skip destruction", correct: false },
      { id: "d", text: "Copy the pointer", correct: false },
    ],
  },
  "unique_ptr arrays": {
    q: "For a growable array whose size must be known, prefer:",
    opts: [
      { id: "a", text: "std::vector over unique_ptr<T[]>", correct: true },
      { id: "b", text: "unique_ptr<T[]> over std::vector", correct: false },
      { id: "c", text: "new[] with manual delete[]", correct: false },
      { id: "d", text: "A raw pointer", correct: false },
    ],
  },
  "Ownership transfer": {
    q: "How does unique_ptr ownership move to a new owner?",
    opts: [
      { id: "a", text: "By moving (std::move, returns, sink parameters) — never by copy", correct: true },
      { id: "b", text: "By copying the pointer", correct: false },
      { id: "c", text: "Automatically at scope exit", correct: false },
      { id: "d", text: "It cannot move", correct: false },
    ],
  },
  "Reference counting": {
    q: "A shared_ptr object is destroyed when:",
    opts: [
      { id: "a", text: "The last shared_ptr to it dies (count reaches zero)", correct: true },
      { id: "b", text: "The first copy is made", correct: false },
      { id: "c", text: "use_count() is called", correct: false },
      { id: "d", text: "The program exits", correct: false },
    ],
  },
  "weak_ptr & cycles": {
    q: "To break a shared_ptr ownership cycle, make the back-link a:",
    opts: [
      { id: "a", text: "weak_ptr", correct: true },
      { id: "b", text: "Second shared_ptr", correct: false },
      { id: "c", text: "Raw new allocation", correct: false },
      { id: "d", text: "Global variable", correct: false },
    ],
  },
  "make_shared efficiency": {
    q: "make_shared performs how many allocations for object plus control block?",
    opts: [
      { id: "a", text: "One combined allocation", correct: true },
      { id: "b", text: "Two always", correct: false },
      { id: "c", text: "Zero — it uses the stack", correct: false },
      { id: "d", text: "One per copy", correct: false },
    ],
  },
  "Designing the index": {
    q: "Design the query before the structure because:",
    opts: [
      { id: "a", text: "The questions you ask decide which structure fits", correct: true },
      { id: "b", text: "Structures cannot be changed later", correct: false },
      { id: "c", text: "Queries write themselves", correct: false },
      { id: "d", text: "It compiles faster", correct: false },
    ],
  },
  "Ranking results": {
    q: "A deterministic ranking needs:",
    opts: [
      { id: "a", text: "An explicit tiebreak in the comparator", correct: true },
      { id: "b", text: "std::sort alone, which is stable", correct: false },
      { id: "c", text: "A random shuffle first", correct: false },
      { id: "d", text: "No comparator", correct: false },
    ],
  },
  "Testing the build": {
    q: "Why hardcode a tiny 3-sentence corpus for the milestone?",
    opts: [
      { id: "a", text: "Every expected count is verifiable by eye", correct: true },
      { id: "b", text: "Big data cannot be tested", correct: false },
      { id: "c", text: "Maps only hold 3 entries", correct: false },
      { id: "d", text: "It runs faster on GPUs", correct: false },
    ],
  },
  "Throw by value, catch by reference": {
    q: "Why catch exceptions by const reference?",
    opts: [
      { id: "a", text: "To avoid slicing derived types and extra copies", correct: true },
      { id: "b", text: "It runs faster than catch by value on all compilers", correct: false },
      { id: "c", text: "References cannot be null", correct: false },
      { id: "d", text: "There is no reason", correct: false },
    ],
  },
  "Custom exception types": {
    q: "A good custom exception derives from:",
    opts: [
      { id: "a", text: "std::runtime_error (or logic_error)", correct: true },
      { id: "b", text: "std::vector", correct: false },
      { id: "c", text: "int", correct: false },
      { id: "d", text: "Nothing — standalone classes only", correct: false },
    ],
  },
  "Unwinding order": {
    q: "During stack unwinding, destructors run in:",
    opts: [
      { id: "a", text: "Reverse construction order", correct: true },
      { id: "b", text: "Construction order", correct: false },
      { id: "c", text: "Random order", correct: false },
      { id: "d", text: "Alphabetical order", correct: false },
    ],
  },
  "The three safety guarantees": {
    q: "The strong exception-safety guarantee promises:",
    opts: [
      { id: "a", text: "Failure leaves state unchanged", correct: true },
      { id: "b", text: "The function never throws", correct: false },
      { id: "c", text: "Leaks are allowed but crashes are not", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "noexcept contracts": {
    q: "If an exception escapes a noexcept function:",
    opts: [
      { id: "a", text: "std::terminate is called", correct: true },
      { id: "b", text: "It is caught automatically", correct: false },
      { id: "c", text: "The function retries", correct: false },
      { id: "d", text: "Nothing happens", correct: false },
    ],
  },
  "Copy-and-swap": {
    q: "Copy-and-swap assignment takes the parameter:",
    opts: [
      { id: "a", text: "By value, then swaps with *this", correct: true },
      { id: "b", text: "By pointer, then deletes it", correct: false },
      { id: "c", text: "By global reference", correct: false },
      { id: "d", text: "It takes no parameter", correct: false },
    ],
  },
  "Init captures": {
    q: "What does `[v = std::move(big)]` do in a lambda?",
    opts: [
      { id: "a", text: "Moves big into a new capture owned by the lambda", correct: true },
      { id: "b", text: "Copies big twice", correct: false },
      { id: "c", text: "Declares a global variable", correct: false },
      { id: "d", text: "Nothing — invalid syntax", correct: false },
    ],
  },
  "Mutable lambdas": {
    q: "A lambda needs `mutable` to:",
    opts: [
      { id: "a", text: "Modify its by-value captures inside the body", correct: true },
      { id: "b", text: "Capture anything at all", correct: false },
      { id: "c", text: "Be stored in std::function", correct: false },
      { id: "d", text: "Take parameters", correct: false },
    ],
  },
  "Generic lambdas": {
    q: "A generic lambda uses `auto` in its:",
    opts: [
      { id: "a", text: "Parameter list, making it a template-like callable", correct: true },
      { id: "b", text: "Capture list", correct: false },
      { id: "c", text: "Return type only", correct: false },
      { id: "d", text: "Body as a variable type", correct: false },
    ],
  },
  "Type-erased wrappers": {
    q: "std::function is best used at:",
    opts: [
      { id: "a", text: "Boundaries (callbacks, dispatch tables), not inner loops", correct: true },
      { id: "b", text: "Inner loops for speed", correct: false },
      { id: "c", text: "Only in headers", correct: false },
      { id: "d", text: "Only with raw function pointers", correct: false },
    ],
  },
  "bind & placeholders": {
    q: "std::bind with placeholders produces:",
    opts: [
      { id: "a", text: "A new callable with some arguments frozen", correct: true },
      { id: "b", text: "A thread", correct: false },
      { id: "c", text: "A macro", correct: false },
      { id: "d", text: "A base class", correct: false },
    ],
  },
  "Dispatch tables": {
    q: "A map from command names to std::function replaces:",
    opts: [
      { id: "a", text: "A growing if-chain or switch on names", correct: true },
      { id: "b", text: "All loops", correct: false },
      { id: "c", text: "The type system", correct: false },
      { id: "d", text: "Header files", correct: false },
    ],
  },
  "Launching & joining": {
    q: "A joinable std::thread that is destroyed without join/detach causes:",
    opts: [
      { id: "a", text: "std::terminate", correct: true },
      { id: "b", text: "An automatic join", correct: false },
      { id: "c", text: "A memory leak only", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Passing thread arguments": {
    q: "Thread arguments are stored by decay-copy, so to share a variable you pass:",
    opts: [
      { id: "a", text: "std::ref(variable)", correct: true },
      { id: "b", text: "A copy, which shares automatically", correct: false },
      { id: "c", text: "A string with its name", correct: false },
      { id: "d", text: "Nothing — threads share all locals", correct: false },
    ],
  },
  "Hardware concurrency": {
    q: "hardware_concurrency() returning 0 means:",
    opts: [
      { id: "a", text: "The value is unknown — use a fallback", correct: true },
      { id: "b", text: "The machine has no CPU", correct: false },
      { id: "c", text: "Threads are unsupported", correct: false },
      { id: "d", text: "Use infinite threads", correct: false },
    ],
  },
  "unique_lock control": {
    q: "unique_lock, unlike lock_guard, can:",
    opts: [
      { id: "a", text: "Defer, manually lock/unlock, and transfer ownership", correct: true },
      { id: "b", text: "Lock two mutexes at once by itself", correct: false },
      { id: "c", text: "Be copied freely", correct: false },
      { id: "d", text: "Unlock other threads", correct: false },
    ],
  },
  "Lock granularity": {
    q: "Good lock granularity means holding the lock:",
    opts: [
      { id: "a", text: "Only while touching shared state, then computing on copies", correct: true },
      { id: "b", text: "For the whole program run", correct: false },
      { id: "c", text: "Never — locks are obsolete", correct: false },
      { id: "d", text: "Only in main()", correct: false },
    ],
  },
  "Deadlock avoidance": {
    q: "The most practical deadlock prevention is:",
    opts: [
      { id: "a", text: "One global lock order (or atomic multi-lock)", correct: true },
      { id: "b", text: "More threads", correct: false },
      { id: "c", text: "Faster mutexes", correct: false },
      { id: "d", text: "Catching the deadlock exception", correct: false },
    ],
  },
  "wait & notify": {
    q: "condition_variable::wait atomically:",
    opts: [
      { id: "a", text: "Unlocks the mutex and parks the thread", correct: true },
      { id: "b", text: "Destroys the mutex", correct: false },
      { id: "c", text: "Locks two mutexes", correct: false },
      { id: "d", text: "Throws away the predicate", correct: false },
    ],
  },
  "Predicate waits": {
    q: "Why wait in a predicate loop instead of a bare wait?",
    opts: [
      { id: "a", text: "Spurious wakeups and early notifications must re-check the condition", correct: true },
      { id: "b", text: "Bare wait does not compile", correct: false },
      { id: "c", text: "Predicates run faster", correct: false },
      { id: "d", text: "No reason", correct: false },
    ],
  },
  "Producer-consumer queues": {
    q: "The finished flag in a producer-consumer queue separates:",
    opts: [
      { id: "a", text: "Nothing yet from nothing ever again", correct: true },
      { id: "b", text: "Producers from consumers physically", correct: false },
      { id: "c", text: "The heap from the stack", correct: false },
      { id: "d", text: "Ints from strings", correct: false },
    ],
  },
  "Atomic operations": {
    q: "std::atomic makes what indivisible?",
    opts: [
      { id: "a", text: "Single operations like load, store, fetch_add", correct: true },
      { id: "b", text: "Whole multi-step protocols automatically", correct: false },
      { id: "c", text: "Entire functions", correct: false },
      { id: "d", text: "The whole program", correct: false },
    ],
  },
  "Compare-and-swap": {
    q: "compare_exchange sets the new value:",
    opts: [
      { id: "a", text: "Only if the current value still equals expected", correct: true },
      { id: "b", text: "Unconditionally", correct: false },
      { id: "c", text: "Only on Tuesdays", correct: false },
      { id: "d", text: "Never — it only reads", correct: false },
    ],
  },
  "Lock-free checks": {
    q: "is_lock_free() tells you whether the atomic:",
    opts: [
      { id: "a", text: "Runs on hardware instructions rather than a hidden mutex", correct: true },
      { id: "b", text: "Is currently locked", correct: false },
      { id: "c", text: "Can be copied", correct: false },
      { id: "d", text: "Uses no memory", correct: false },
    ],
  },
  "async & launch policies": {
    q: "launch::deferred means the async task:",
    opts: [
      { id: "a", text: "Runs lazily on the first get/wait call", correct: true },
      { id: "b", text: "Runs on a new thread immediately", correct: false },
      { id: "c", text: "Never runs", correct: false },
      { id: "d", text: "Runs twice", correct: false },
    ],
  },
  "promise & future pairs": {
    q: "A promise/future pair delivers:",
    opts: [
      { id: "a", text: "One value (or exception) from producer to consumer", correct: true },
      { id: "b", text: "A continuous stream", correct: false },
      { id: "c", text: "Shared ownership", correct: false },
      { id: "d", text: "A thread handle", correct: false },
    ],
  },
  "Shared futures": {
    q: "shared_future allows:",
    opts: [
      { id: "a", text: "Many consumers to get() the same result", correct: true },
      { id: "b", text: "Many producers to set one value", correct: false },
      { id: "c", text: "Futures to outlive main()", correct: false },
      { id: "d", text: "Exceptions to be ignored", correct: false },
    ],
  },
  "Durations & time points": {
    q: "Subtracting two chrono time points yields a:",
    opts: [
      { id: "a", text: "Duration", correct: true },
      { id: "b", text: "Third time point", correct: false },
      { id: "c", text: "Boolean", correct: false },
      { id: "d", text: "String", correct: false },
    ],
  },
  "Clock kinds": {
    q: "For measuring how long code takes, use:",
    opts: [
      { id: "a", text: "steady_clock", correct: true },
      { id: "b", text: "system_clock", correct: false },
      { id: "c", text: "A wall calendar", correct: false },
      { id: "d", text: "time() divided by two", correct: false },
    ],
  },
  "Timing code safely": {
    q: "Raw measured timings must never be:",
    opts: [
      { id: "a", text: "Asserted equal in tests", correct: true },
      { id: "b", text: "Printed for humans", correct: false },
      { id: "c", text: "Compared relatively", correct: false },
      { id: "d", text: "Averaged", correct: false },
    ],
  },
  "Engines & distributions": {
    q: "In <random>, the engine provides _____ and the distribution provides _____.",
    opts: [
      { id: "a", text: "Uniform bits; the wanted statistical shape", correct: true },
      { id: "b", text: "The shape; the seed", correct: false },
      { id: "c", text: "True entropy; the engine", correct: false },
      { id: "d", text: "Nothing; everything", correct: false },
    ],
  },
  "Fixed-seed reproducibility": {
    q: "A fixed mt19937 seed gives:",
    opts: [
      { id: "a", text: "The identical sequence on every platform and run", correct: true },
      { id: "b", text: "True randomness", correct: false },
      { id: "c", text: "The same single number", correct: false },
      { id: "d", text: "A compile error", correct: false },
    ],
  },
  "Shuffling & sampling": {
    q: "Correct shuffling in C++ is:",
    opts: [
      { id: "a", text: "std::shuffle with an engine you provide", correct: true },
      { id: "b", text: "rand() % n swaps in a loop", correct: false },
      { id: "c", text: "std::sort with a random comparator", correct: false },
      { id: "d", text: "Impossible without extra memory", correct: false },
    ],
  },
  "Lazy pipeline thinking": {
    q: "A lazy pipeline stage computes its items:",
    opts: [
      { id: "a", text: "On demand when pulled downstream", correct: true },
      { id: "b", text: "All upfront into a temp vector", correct: false },
      { id: "c", text: "At compile time", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "filter & transform helpers": {
    q: "filter_vec plus map_vec demonstrate:",
    opts: [
      { id: "a", text: "Composable stages reusable for any element type", correct: true },
      { id: "b", text: "That templates are slow", correct: false },
      { id: "c", text: "Manual memory management", correct: false },
      { id: "d", text: "Inheritance", correct: false },
    ],
  },
  "Composing stages": {
    q: "Each pipeline stage should be:",
    opts: [
      { id: "a", text: "Independently testable with fixed input/output", correct: true },
      { id: "b", text: "Over 500 lines", correct: false },
      { id: "c", text: "Hidden from tests", correct: false },
      { id: "d", text: "Written in assembly", correct: false },
    ],
  },
  "Fold & reduce patterns": {
    q: "A fold (accumulate) turns:",
    opts: [
      { id: "a", text: "Many values into one answer", correct: true },
      { id: "b", text: "One value into many", correct: false },
      { id: "c", text: "Code into comments", correct: false },
      { id: "d", text: "Vectors into maps", correct: false },
    ],
  },
  "Sorted-range utilities": {
    q: "Keeping data sorted pays off when:",
    opts: [
      { id: "a", text: "Queries outnumber mutations", correct: true },
      { id: "b", text: "You never query it", correct: false },
      { id: "c", text: "Memory is zero", correct: false },
      { id: "d", text: "Always, unconditionally", correct: false },
    ],
  },
  "Pipeline helpers": {
    q: "Named pipeline helpers (sum_of_doubled_evens) are valuable because they:",
    opts: [
      { id: "a", text: "Name a recurring shape and stay testable", correct: true },
      { id: "b", text: "Hide bugs", correct: false },
      { id: "c", text: "Replace the standard library", correct: false },
      { id: "d", text: "Compile slowly", correct: false },
    ],
  },
  "Constraining with enable_if": {
    q: "enable_if on a template's return type:",
    opts: [
      { id: "a", text: "Keeps the overload only when the condition holds", correct: true },
      { id: "b", text: "Changes the runtime behavior", correct: false },
      { id: "c", text: "Allocates memory", correct: false },
      { id: "d", text: "Is a comment", correct: false },
    ],
  },
  "static_assert contracts": {
    q: "A failed static_assert:",
    opts: [
      { id: "a", text: "Stops the build with your message at compile time", correct: true },
      { id: "b", text: "Throws at runtime", correct: false },
      { id: "c", text: "Is a warning you can ignore", correct: false },
      { id: "d", text: "Deletes the file", correct: false },
    ],
  },
  "From SFINAE to concepts": {
    q: "C++20 concepts relate to SFINAE as:",
    opts: [
      { id: "a", text: "The same constraining idea in legible syntax", correct: true },
      { id: "b", text: "A replacement for all templates", correct: false },
      { id: "c", text: "A runtime feature", correct: false },
      { id: "d", text: "Unrelated", correct: false },
    ],
  },
  "is_integral & friends": {
    q: "std::is_integral<int>::value is:",
    opts: [
      { id: "a", text: "A compile-time true constant", correct: true },
      { id: "b", text: "Computed at runtime", correct: false },
      { id: "c", text: "False", correct: false },
      { id: "d", text: "A function pointer", correct: false },
    ],
  },
  "Selecting overloads": {
    q: "Trait-selected overloads route calls:",
    opts: [
      { id: "a", text: "At compile time to the matching implementation", correct: true },
      { id: "b", text: "At runtime via virtual dispatch", correct: false },
      { id: "c", text: "Randomly", correct: false },
      { id: "d", text: "Through exceptions", correct: false },
    ],
  },
  "Tag dispatch": {
    q: "Tag dispatch selects an overload using:",
    opts: [
      { id: "a", text: "A tag-type argument derived from a trait", correct: true },
      { id: "b", text: "A string name", correct: false },
      { id: "c", text: "A runtime flag", correct: false },
      { id: "d", text: "A goto label", correct: false },
    ],
  },
  "Translation units": {
    q: "A translation unit is:",
    opts: [
      { id: "a", text: "One .cpp plus its included headers, compiled independently", correct: true },
      { id: "b", text: "The whole program", correct: false },
      { id: "c", text: "A single function", correct: false },
      { id: "d", text: "A linker script", correct: false },
    ],
  },
  "The One Definition Rule": {
    q: "The ODR requires:",
    opts: [
      { id: "a", text: "One definition per entity per program (inline/templates excepted)", correct: true },
      { id: "b", text: "Every function defined in headers", correct: false },
      { id: "c", text: "No declarations at all", correct: false },
      { id: "d", text: "One file per program", correct: false },
    ],
  },
  "Include hygiene": {
    q: "Good header hygiene forbids:",
    opts: [
      { id: "a", text: "`using namespace` in a header", correct: true },
      { id: "b", text: "#pragma once", correct: false },
      { id: "c", text: "Forward declarations", correct: false },
      { id: "d", text: "Including what you use", correct: false },
    ],
  },
  "CMakeLists structure": {
    q: "In modern CMake, dependencies are wired with:",
    opts: [
      { id: "a", text: "target_link_libraries between targets", correct: true },
      { id: "b", text: "Global variables only", correct: false },
      { id: "c", text: "Copy-pasted source files", correct: false },
      { id: "d", text: "Environment variables", correct: false },
    ],
  },
  "Targets & linking": {
    q: "PRIVATE linkage in target_link_libraries means the dependency is:",
    opts: [
      { id: "a", text: "An implementation detail, not propagated to consumers", correct: true },
      { id: "b", text: "Shared with the whole system", correct: false },
      { id: "c", text: "Header-only", correct: false },
      { id: "d", text: "Optional at runtime", correct: false },
    ],
  },
  "Build types & flags": {
    q: "Warning flags like -Wall -Wextra -Werror belong:",
    opts: [
      { id: "a", text: "On targets from day one of the project", correct: true },
      { id: "b", text: "Nowhere — warnings are noise", correct: false },
      { id: "c", text: "Only in release builds", correct: false },
      { id: "d", text: "In comments", correct: false },
    ],
  },
  "assert & invariants": {
    q: "assert() in a release build with NDEBUG defined:",
    opts: [
      { id: "a", text: "Is removed entirely (zero cost)", correct: true },
      { id: "b", text: "Throws an exception", correct: false },
      { id: "c", text: "Runs slower", correct: false },
      { id: "d", text: "Prints a warning", correct: false },
    ],
  },
  "Self-test mains": {
    q: "A self-test main() primarily needs:",
    opts: [
      { id: "a", text: "Hardcoded inputs with asserted outputs", correct: true },
      { id: "b", text: "Network access", correct: false },
      { id: "c", text: "A GUI", correct: false },
      { id: "d", text: "Admin rights", correct: false },
    ],
  },
  "Edge-case testing": {
    q: "Bugs cluster at:",
    opts: [
      { id: "a", text: "Boundaries: empty, single, first, last, max", correct: true },
      { id: "b", text: "The middle of large inputs", correct: false },
      { id: "c", text: "Comments", correct: false },
      { id: "d", text: "Blank lines", correct: false },
    ],
  },
  "Debug builds (-g)": {
    q: "For debugging you compile with:",
    opts: [
      { id: "a", text: "-g and -O0", correct: true },
      { id: "b", text: "-O3 and stripped symbols", correct: false },
      { id: "c", text: "No flags at all", correct: false },
      { id: "d", text: "-Werror only", correct: false },
    ],
  },
  "Breakpoints & backtraces": {
    q: "In GDB, `bt` shows:",
    opts: [
      { id: "a", text: "The call stack frame by frame", correct: true },
      { id: "b", text: "Variable types", correct: false },
      { id: "c", text: "The source file list", correct: false },
      { id: "d", text: "Memory usage", correct: false },
    ],
  },
  "Reading a crash": {
    q: "A SEGV signal most likely means:",
    opts: [
      { id: "a", text: "Bad memory access (bad pointer/index)", correct: true },
      { id: "b", text: "Division by zero", correct: false },
      { id: "c", text: "A failed assert", correct: false },
      { id: "d", text: "Success", correct: false },
    ],
  },
  "Store design & API": {
    q: "A good store API exposes:",
    opts: [
      { id: "a", text: "Behavior (put/get/remove) while hiding the container", correct: true },
      { id: "b", text: "Raw internal iterators everywhere", correct: false },
      { id: "c", text: "Only a save function", correct: false },
      { id: "d", text: "Global variables", correct: false },
    ],
  },
  "File persistence": {
    q: "Crash-safe file saving uses:",
    opts: [
      { id: "a", text: "Write-temp-then-rename", correct: true },
      { id: "b", text: "Writing directly over the original", correct: false },
      { id: "c", text: "Keeping data in RAM only", correct: false },
      { id: "d", text: "Deleting before writing", correct: false },
    ],
  },
  "Round-trip verification": {
    q: "A round-trip test proves:",
    opts: [
      { id: "a", text: "Save plus load reproduces the original data", correct: true },
      { id: "b", text: "The file exists", correct: false },
      { id: "c", text: "The disk is fast", correct: false },
      { id: "d", text: "Nothing useful", correct: false },
    ],
  },
  "Nullable values without pointers": {
    q: "A Maybe<T> with has()==false means:",
    opts: [
      { id: "a", text: "No value is present — check before get()", correct: true },
      { id: "b", text: "The value is zero", correct: false },
      { id: "c", text: "The object is corrupted", correct: false },
      { id: "d", text: "get() is safe to call", correct: false },
    ],
  },
  "Tagged unions": {
    q: "In a tagged union, the discriminator tag tells you:",
    opts: [
      { id: "a", text: "Which alternative is currently live", correct: true },
      { id: "b", text: "How much memory is used", correct: false },
      { id: "c", text: "The variable name", correct: false },
      { id: "d", text: "Nothing — tags are comments", correct: false },
    ],
  },
  "Maybe<T> by hand": {
    q: "Writing Maybe<T> by hand teaches primarily:",
    opts: [
      { id: "a", text: "Construction states and const access for optional values", correct: true },
      { id: "b", text: "Inheritance", correct: false },
      { id: "c", text: "Multithreading", correct: false },
      { id: "d", text: "Network programming", correct: false },
    ],
  },
  "std::tuple & tie": {
    q: "std::tie(a, b) = some_pair:",
    opts: [
      { id: "a", text: "Unpacks the pair into existing variables a and b", correct: true },
      { id: "b", text: "Ties two threads together", correct: false },
      { id: "c", text: "Compares a and b", correct: false },
      { id: "d", text: "Creates a knot", correct: false },
    ],
  },
  "Multi-value returns": {
    q: "Returning several related results is best done via:",
    opts: [
      { id: "a", text: "A tuple or small struct", correct: true },
      { id: "b", text: "Globals plus a status code", correct: false },
      { id: "c", text: "Printing them", correct: false },
      { id: "d", text: "Exceptions for each value", correct: false },
    ],
  },
  "Destructuring with tie": {
    q: "In `tie(a, b) = f()`, an unwanted element is skipped with:",
    opts: [
      { id: "a", text: "std::ignore", correct: true },
      { id: "b", text: "nullptr", correct: false },
      { id: "c", text: "delete", correct: false },
      { id: "d", text: "An empty string", correct: false },
    ],
  },
  "Pointer + size idiom": {
    q: "The minimal safe non-owning range over a buffer is:",
    opts: [
      { id: "a", text: "Pointer plus size, with i < n checked on access", correct: true },
      { id: "b", text: "A bare pointer", correct: false },
      { id: "c", text: "A size with no pointer", correct: false },
      { id: "d", text: "A void pointer", correct: false },
    ],
  },
  "View classes": {
    q: "A view class over a buffer must never:",
    opts: [
      { id: "a", text: "Outlive the buffer it views", correct: true },
      { id: "b", text: "Be templated", correct: false },
      { id: "c", text: "Have a size() method", correct: false },
      { id: "d", text: "Be passed by reference", correct: false },
    ],
  },
  "Bounds-checked access": {
    q: "During development, element access should go through:",
    opts: [
      { id: "a", text: "The checked form (at/assert) first", correct: true },
      { id: "b", text: "Raw pointer arithmetic", correct: false },
      { id: "c", text: "reinterpret_cast", correct: false },
      { id: "d", text: "Unchecked [] always", correct: false },
    ],
  },
  "Patterns & matching": {
    q: "regex_match differs from regex_search in that it requires:",
    opts: [
      { id: "a", text: "The whole input to match", correct: true },
      { id: "b", text: "A faster engine", correct: false },
      { id: "c", text: "No pattern", correct: false },
      { id: "d", text: "Multiple strings", correct: false },
    ],
  },
  "Capture groups": {
    q: "In a regex match result, m[0] is:",
    opts: [
      { id: "a", text: "The whole match; groups start at m[1]", correct: true },
      { id: "b", text: "The first group", correct: false },
      { id: "c", text: "The pattern itself", correct: false },
      { id: "d", text: "Always empty", correct: false },
    ],
  },
  "Iterating matches": {
    q: "sregex_iterator walks:",
    opts: [
      { id: "a", text: "Every non-overlapping match in the string", correct: true },
      { id: "b", text: "Characters one by one", correct: false },
      { id: "c", text: "Only the first match repeatedly", correct: false },
      { id: "d", text: "Files on disk", correct: false },
    ],
  },
  "cmath essentials": {
    q: "For absolute value of a double, use:",
    opts: [
      { id: "a", text: "std::abs (the <cmath> overload)", correct: true },
      { id: "b", text: "The C abs() from <cstdlib>", correct: false },
      { id: "c", text: "Manual sign check only", correct: false },
      { id: "d", text: "sqrt(x*x) always", correct: false },
    ],
  },
  "Numeric limits": {
    q: "Portable code learns an int's maximum from:",
    opts: [
      { id: "a", text: "std::numeric_limits<int>::max()", correct: true },
      { id: "b", text: "Hardcoding 2147483647", correct: false },
      { id: "c", text: "INT_MAX from memory", correct: false },
      { id: "d", text: "Guessing", correct: false },
    ],
  },
  "Float comparison pitfalls": {
    q: "Floats should be compared with:",
    opts: [
      { id: "a", text: "A tolerance (abs(a-b) < eps), not ==", correct: true },
      { id: "b", text: "==, which is exact", correct: false },
      { id: "c", text: "Casting to int first always", correct: false },
      { id: "d", text: "String comparison", correct: false },
    ],
  },
  "Error codes vs exceptions": {
    q: "Use error codes (not exceptions) when failure is:",
    opts: [
      { id: "a", text: "Expected and handled by the immediate caller", correct: true },
      { id: "b", text: "Impossible", correct: false },
      { id: "c", text: "Fatal to the program", correct: false },
      { id: "d", text: "In another process", correct: false },
    ],
  },
  "std::error_code": {
    q: "std::error_code pairs a value with a:",
    opts: [
      { id: "a", text: "Category", correct: true },
      { id: "b", text: "Thread", correct: false },
      { id: "c", text: "String copy of the file", correct: false },
      { id: "d", text: "Mutex", correct: false },
    ],
  },
  "Result-style returns": {
    q: "Result-style returns (status plus out-param) make failures:",
    opts: [
      { id: "a", text: "A visible branch at the call site", correct: true },
      { id: "b", text: "Invisible", correct: false },
      { id: "c", text: "Exceptions automatically", correct: false },
      { id: "d", text: "Slower", correct: false },
    ],
  },
  "Strategy with polymorphism": {
    q: "The Strategy pattern swaps behavior by:",
    opts: [
      { id: "a", text: "Holding base pointers to interchangeable implementations", correct: true },
      { id: "b", text: "Editing the context class each time", correct: false },
      { id: "c", text: "Global flags", correct: false },
      { id: "d", text: "Recompiling with macros", correct: false },
    ],
  },
  "Observer lists": {
    q: "An observer list (subject plus listeners) must watch out for:",
    opts: [
      { id: "a", text: "Reentrancy and listener lifetimes", correct: true },
      { id: "b", text: "Spelling mistakes only", correct: false },
      { id: "c", text: "Nothing — it is trivially safe", correct: false },
      { id: "d", text: "Network latency", correct: false },
    ],
  },
  "Composition revisited": {
    q: "Prefer composition over inheritance when the relationship is:",
    opts: [
      { id: "a", text: "Has-a / uses-a rather than is-a", correct: true },
      { id: "b", text: "Always is-a", correct: false },
      { id: "c", text: "Never defined", correct: false },
      { id: "d", text: "Only for speed", correct: false },
    ],
  },
  "Static polymorphism": {
    q: "Static (template/CRTP) polymorphism resolves the call:",
    opts: [
      { id: "a", text: "At compile time with full inlining", correct: true },
      { id: "b", text: "At runtime via vtable", correct: false },
      { id: "c", text: "Over the network", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "CRTP counters": {
    q: "In `struct Widget : Counter<Widget>`, each derived type gets:",
    opts: [
      { id: "a", text: "Its own base instantiation with its own statics", correct: true },
      { id: "b", text: "A shared virtual table", correct: false },
      { id: "c", text: "No counter at all", correct: false },
      { id: "d", text: "A runtime type check", correct: false },
    ],
  },
  "Policy classes": {
    q: "Policy-based design combines behaviors by:",
    opts: [
      { id: "a", text: "Template parameters selecting orthogonal policies", correct: true },
      { id: "b", text: "Deep inheritance chains", correct: false },
      { id: "c", text: "Runtime if-statements", correct: false },
      { id: "d", text: "Copy-paste", correct: false },
    ],
  },
  "Benchmarking honestly": {
    q: "An honest benchmark never:",
    opts: [
      { id: "a", text: "Trusts a single run or an -O0 binary", correct: true },
      { id: "b", text: "Warms up caches", correct: false },
      { id: "c", text: "Compares configurations relatively", correct: false },
      { id: "d", text: "Repeats iterations", correct: false },
    ],
  },
  "Avoiding copies": {
    q: "The first step in removing hidden copies is:",
    opts: [
      { id: "a", text: "Profile to find the counted copies", correct: true },
      { id: "b", text: "Delete all const& parameters", correct: false },
      { id: "c", text: "Pass everything by value", correct: false },
      { id: "d", text: "Avoid the standard library", correct: false },
    ],
  },
  "Capacity planning": {
    q: "reserve() calls belong where the size is:",
    opts: [
      { id: "a", text: "Measured or known, encoded before the fill", correct: true },
      { id: "b", text: "Unknown and unknowable", correct: false },
      { id: "c", text: "Zero", correct: false },
      { id: "d", text: "Nowhere", correct: false },
    ],
  },
  "Placement new": {
    q: "After placement-new construction, you must:",
    opts: [
      { id: "a", text: "Call the destructor explicitly (no delete)", correct: true },
      { id: "b", text: "Call delete on the pointer", correct: false },
      { id: "c", text: "Do nothing — it self-destructs", correct: false },
      { id: "d", text: "Call free()", correct: false },
    ],
  },
  "Pool allocation": {
    q: "A fixed-chunk pool gives:",
    opts: [
      { id: "a", text: "O(1) allocation with low fragmentation for same-size objects", correct: true },
      { id: "b", text: "Slower allocation than the OS", correct: false },
      { id: "c", text: "Automatic garbage collection", correct: false },
      { id: "d", text: "Unlimited object sizes", correct: false },
    ],
  },
  "Manual lifetimes": {
    q: "Raw manual lifetimes (construct/use/destroy) belong:",
    opts: [
      { id: "a", text: "Encapsulated in a pool/arena class, never loose in app code", correct: true },
      { id: "b", text: "Everywhere for control", correct: false },
      { id: "c", text: "In headers only", correct: false },
      { id: "d", text: "Nowhere — they are illegal", correct: false },
    ],
  },
  "Generator pattern": {
    q: "A generator's next()/done() pair provides:",
    opts: [
      { id: "a", text: "On-demand values with constant memory", correct: true },
      { id: "b", text: "The whole sequence upfront", correct: false },
      { id: "c", text: "Random access", correct: false },
      { id: "d", text: "Thread safety automatically", correct: false },
    ],
  },
  "State machines": {
    q: "Promoting loop position to explicit state helps when:",
    opts: [
      { id: "a", text: "Control flow spans pauses, resumes, or phases", correct: true },
      { id: "b", text: "The loop is trivial", correct: false },
      { id: "c", text: "Never — state machines are obsolete", correct: false },
      { id: "d", text: "Only in GUIs", correct: false },
    ],
  },
  "Lazy sequences by hand": {
    q: "Hand-rolled laziness computes each element:",
    opts: [
      { id: "a", text: "Only when pulled", correct: true },
      { id: "b", text: "All upfront", correct: false },
      { id: "c", text: "Twice for safety", correct: false },
      { id: "d", text: "On another machine", correct: false },
    ],
  },
  "Why modules": {
    q: "C++20 modules fix which old scalability bug?",
    opts: [
      { id: "a", text: "Headers recompiled in every includer (textual inclusion)", correct: true },
      { id: "b", text: "Slow linking of small programs", correct: false },
      { id: "c", text: "Runtime polymorphism overhead", correct: false },
      { id: "d", text: "Integer overflow", correct: false },
    ],
  },
  "Interface vs implementation": {
    q: "In a module, non-exported code is:",
    opts: [
      { id: "a", text: "Unreachable by importers — private by construction", correct: true },
      { id: "b", text: "Still visible via headers", correct: false },
      { id: "c", text: "Exported automatically", correct: false },
      { id: "d", text: "Deleted", correct: false },
    ],
  },
  "Migration path": {
    q: "Migrate to modules starting with:",
    opts: [
      { id: "a", text: "New components, then the hottest (most-included) headers", correct: true },
      { id: "b", text: "Deleting all headers at once", correct: false },
      { id: "c", text: "The smallest leaf .cpp", correct: false },
      { id: "d", text: "Never migrate", correct: false },
    ],
  },
  "Wall Wextra Werror": {
    q: "-Werror turns warnings into:",
    opts: [
      { id: "a", text: "Build failures, so they cannot accumulate", correct: true },
      { id: "b", text: "Faster code", correct: false },
      { id: "c", text: "Runtime checks", correct: false },
      { id: "d", text: "Documentation", correct: false },
    ],
  },
  "ASan & UBSan": {
    q: "AddressSanitizer catches:",
    opts: [
      { id: "a", text: "Use-after-free, overflows, double-free at runtime", correct: true },
      { id: "b", text: "Syntax errors", correct: false },
      { id: "c", text: "Logic errors in algorithms", correct: false },
      { id: "d", text: "Typos", correct: false },
    ],
  },
  "Clean-code habits": {
    q: "Which habit makes whole bug classes unreachable?",
    opts: [
      { id: "a", text: "Initialize everything and check bounds in development", correct: true },
      { id: "b", text: "Longer variable names", correct: false },
      { id: "c", text: "More comments", correct: false },
      { id: "d", text: "Bigger functions", correct: false },
    ],
  },
  "Sockets overview": {
    q: "TCP provides, over raw bytes:",
    opts: [
      { id: "a", text: "Reliability and order", correct: true },
      { id: "b", text: "Encryption", correct: false },
      { id: "c", text: "Message boundaries", correct: false },
      { id: "d", text: "Compression", correct: false },
    ],
  },
  "Parsing endpoints": {
    q: "Split host:port on the LAST colon because:",
    opts: [
      { id: "a", text: "IPv6 addresses contain colons", correct: true },
      { id: "b", text: "Ports contain colons", correct: false },
      { id: "c", text: "It is faster", correct: false },
      { id: "d", text: "First colon is always wrong", correct: false },
    ],
  },
  "Length-prefix framing": {
    q: "Length-prefix framing restores _____ over a TCP stream.",
    opts: [
      { id: "a", text: "Message boundaries", correct: true },
      { id: "b", text: "Encryption", correct: false },
      { id: "c", text: "Ordering", correct: false },
      { id: "d", text: "Authentication", correct: false },
    ],
  },
  "Text wire formats": {
    q: "Prefer text wire formats until:",
    opts: [
      { id: "a", text: "Measurements demand binary", correct: true },
      { id: "b", text: "The file exceeds 1 byte", correct: false },
      { id: "c", text: "Never — always text", correct: false },
      { id: "d", text: "Always binary first", correct: false },
    ],
  },
  "Escaping & delimiters": {
    q: "When a delimiter can appear in data, you must:",
    opts: [
      { id: "a", text: "Escape on write and unescape on read, tested with hostile data", correct: true },
      { id: "b", text: "Hope it never happens", correct: false },
      { id: "c", text: "Change the data silently", correct: false },
      { id: "d", text: "Use a longer delimiter only", correct: false },
    ],
  },
  "Round-trip testing": {
    q: "A round-trip test (serialize, parse, compare) validates:",
    opts: [
      { id: "a", text: "Both directions at once", correct: true },
      { id: "b", text: "Only the writer", correct: false },
      { id: "c", text: "Only the reader", correct: false },
      { id: "d", text: "Disk speed", correct: false },
    ],
  },
  "Uninitialized reads": {
    q: "Reading an uninitialized variable is:",
    opts: [
      { id: "a", text: "Undefined behavior, not a random value", correct: true },
      { id: "b", text: "Always zero", correct: false },
      { id: "c", text: "A compile error", correct: false },
      { id: "d", text: "Fine in practice", correct: false },
    ],
  },
  "Signed overflow": {
    q: "Signed integer overflow in C++ is:",
    opts: [
      { id: "a", text: "Undefined behavior", correct: true },
      { id: "b", text: "Defined wraparound like unsigned", correct: false },
      { id: "c", text: "A thrown exception", correct: false },
      { id: "d", text: "Saturation", correct: false },
    ],
  },
  "Widen-before-multiply": {
    q: "To safely multiply two ints into 64 bits, you must cast:",
    opts: [
      { id: "a", text: "Before the multiplication", correct: true },
      { id: "b", text: "After the multiplication", correct: false },
      { id: "c", text: "Never — it widens automatically", correct: false },
      { id: "d", text: "Only the result variable", correct: false },
    ],
  },
  "Fixed-width integers": {
    q: "Use <cstdint> fixed-width types at:",
    opts: [
      { id: "a", text: "Every boundary: files, protocols, IPC", correct: true },
      { id: "b", text: "Nowhere", correct: false },
      { id: "c", text: "Only in templates", correct: false },
      { id: "d", text: "Only for loop counters", correct: false },
    ],
  },
  "sizeof guarantees": {
    q: "Which sizeof is guaranteed by the standard?",
    opts: [
      { id: "a", text: "sizeof(char) == 1 and fixed-width type sizes", correct: true },
      { id: "b", text: "sizeof(int) == 4", correct: false },
      { id: "c", text: "sizeof(long) == 8", correct: false },
      { id: "d", text: "sizeof(pointer) == 4", correct: false },
    ],
  },
  "Feature macros": {
    q: "__cplusplus lets one codebase:",
    opts: [
      { id: "a", text: "Detect the standard version and adapt", correct: true },
      { id: "b", text: "Run faster", correct: false },
      { id: "c", text: "Avoid all headers", correct: false },
      { id: "d", text: "Skip compilation", correct: false },
    ],
  },
  "Naming & const habits": {
    q: "const-correctness primarily answers for reviewers:",
    opts: [
      { id: "a", text: "What may change here?", correct: true },
      { id: "b", text: "How fast is this?", correct: false },
      { id: "c", text: "Who wrote this?", correct: false },
      { id: "d", text: "What is the license?", correct: false },
    ],
  },
  "Review checklists": {
    q: "Review checklists (ownership, bounds, errors, const, tests) make reviews:",
    opts: [
      { id: "a", text: "Repeatable and teachable", correct: true },
      { id: "b", text: "Slower with no benefit", correct: false },
      { id: "c", text: "Unnecessary", correct: false },
      { id: "d", text: "Fully automatic", correct: false },
    ],
  },
  "Refactoring safely": {
    q: "Safe refactoring requires before changing behavior:",
    opts: [
      { id: "a", text: "Covering tests, then small steps with reruns", correct: true },
      { id: "b", text: "Deleting the tests", correct: false },
      { id: "c", text: "Rewriting everything at once", correct: false },
      { id: "d", text: "No preparation", correct: false },
    ],
  },
  "Requirements to modules": {
    q: "Architecture should start from:",
    opts: [
      { id: "a", text: "Requirements grouped into modules with narrow interfaces", correct: true },
      { id: "b", text: "The coolest library", correct: false },
      { id: "c", text: "Random file splits", correct: false },
      { id: "d", text: "The build system", correct: false },
    ],
  },
  "Core data operations": {
    q: "An app's testable core is:",
    opts: [
      { id: "a", text: "Plain data plus free functions, free of I/O", correct: true },
      { id: "b", text: "The main() function", correct: false },
      { id: "c", text: "Global state", correct: false },
      { id: "d", text: "The UI layer", correct: false },
    ],
  },
  "Interface-first design": {
    q: "Settling interfaces early works because change is:",
    opts: [
      { id: "a", text: "Cheap before callers exist, expensive after", correct: true },
      { id: "b", text: "Always free", correct: false },
      { id: "c", text: "Impossible later", correct: false },
      { id: "d", text: "Only for juniors", correct: false },
    ],
  },
  "Collection design": {
    q: "A collection type should expose:",
    opts: [
      { id: "a", text: "Domain behavior, keeping storage private", correct: true },
      { id: "b", text: "Its internal vector publicly", correct: false },
      { id: "c", text: "Only a destructor", correct: false },
      { id: "d", text: "No operations", correct: false },
    ],
  },
  "Persistence & tests": {
    q: "Capstone persistence is proven by:",
    opts: [
      { id: "a", text: "Round-trip tests on real files, including edge cases", correct: true },
      { id: "b", text: "Saving once manually", correct: false },
      { id: "c", text: "Keeping data in RAM", correct: false },
      { id: "d", text: "Hoping", correct: false },
    ],
  },
  "Polish & next steps": {
    q: "Finished capstone polish includes:",
    opts: [
      { id: "a", text: "Clear output, handled edges, build docs, honest limitations", correct: true },
      { id: "b", text: "More features at any cost", correct: false },
      { id: "c", text: "Removing all tests", correct: false },
      { id: "d", text: "Obfuscated code", correct: false },
    ],
  },

};

/* ─── Content generators ─── */

function generateCppTopicContent(topic: string, title: string, day: number): string {
  const cached = CPP_TOPIC_CONTENT[topic];
  if (cached) return cached;

  const level = getLevelForDay(day);
  return (
    `Day ${day} introduces "${topic}" within the context of ${title}. ` +
    `This concept is part of the C++ track at the ${level} proficiency tier. ` +
    `It builds on the fundamentals you've practiced — types, control flow, and the standard library. ` +
    `Focus on how ${topic} composes with the concepts around it, then extend the code template in the playground to deepen your understanding.`
  );
}

/* ─── Code-challenge verification ───
 * expectedOutput gates "Mark Complete" on the code exercise. It is set for
 * every blueprint whose baseline produces deterministic output under the real
 * compiler (Piston is the C++ execution path — there is no in-browser C++
 * simulator yet). Day 6 needs stdin and day 34 is a multi-file stub that
 * doesn't compile standalone, so both stay ungated. Days 65/66/67/69 need a
 * threads-capable toolchain (<thread>/<mutex> don't exist on win32-threads
 * MinGW), day 77 is a CMake multi-file layout, and day 92 is C++20-module
 * syntax — all six stay ungated and run on a modern toolchain (Piston). */
const CPP_EXPECTED_OUTPUT: Record<number, string> = {
  1: "Hello, C++!",
  2: "30 3.14159 A 1",
  3: "40 9.8 Ada 42",
  4: "13 7 30",
  5: "Hello, Ada!",
  7: "B",
  8: "0 1 2 3 4",
  9: "16\nHello, Ada!",
  10: "12 12.5664",
  11: "120 55",
  12: "2 1",
  13: "42",
  14: "1 50",
  15: "0 1 2 3",
  16: "10 20 30",
  17: "Ada is in grade 10",
  18: "100",
  19: "Ada, age 36",
  20: "opened",
  21: "Woof!",
  22: "12.5664",
  23: "(4, 6)",
  24: "42",
  25: "7\n2.5",
  26: "42 hello",
  27: "36\n2",
  28: "1 2 5 8 9",
  29: "2\n50",
  30: "first line",
  31: "caught: division by zero",
  32: "moved",
  33: "1 2",
  35: "1\n3.5",
  36: "144 120",
  37: "1000",
  38: "1 1 3 4 5",
  39: "modern C++ 10",
  40: "[x] 0: learn C++",
  41: "3 1",
  42: "1 2 3 4",
  43: "1 3",
  44: "apple:5 fig:1 pear:3",
  45: "3 2 1",
  46: "4 3 2 1",
  47: "9 1",
  48: "2 4 6 8",
  49: "hello C++",
  50: "000042",
  51: "30 1",
  52: "row one | row two",
  53: "5 4",
  54: "1 two 3.5",
  55: "move-assigned",
  56: "lvalue:ada",
  57: "opened",
  58: "0 7",
  59: "99",
  60: "cpp:2",
  61: "parse error: empty input",
  62: "beta",
  63: "1 4 9",
  64: "7 12",
  68: "1 10 3",
  70: "2000000",
  71: "3 5 6",
  72: "4 16 36",
  73: "1 9",
  74: "42 5",
  75: "integral floating",
  76: "76 42",
  78: "4 tests passed",
  79: "10 30",
  80: "2 ada cpp",
  81: "0 42",
  82: "ada 36 1",
  83: "4 50",
  84: "1 ada example",
  85: "1.41421",
  86: "0 5",
  87: "[log] hello",
  88: "2\n3",
  89: "1000 499500",
  90: "built 42",
  91: "1 2 3 4",
  93: "6\n7",
  94: "5:hello",
  95: "round-trip ok",
  96: "1000000000000",
  97: "4000000000",
  98: "60",
  99: "3 2",
  100: "3 2",
};

function generateCppExercises(day: number, blueprint: CppBlueprint): Lesson["exercises"] {
  const prefix = `cpp${day}`;
  const topics = blueprint.theoryTopics;

  const quizzes: Lesson["exercises"] = [];
  const usedTopics = new Set<string>();

  for (let i = 0; i < Math.min(topics.length, 2); i++) {
    const topic = topics[i];
    const entry = CPP_QUIZ_MAP[topic];
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
      question: "Which is the idiomatic C++ way to iterate over a vector?",
      options: [
        { id: "a", text: "`for (auto& x : v)`", correct: true },
        { id: "b", text: "Manual pointer arithmetic", correct: false },
        { id: "c", text: "`while(v)`", correct: false },
        { id: "d", text: "`for_each(v)` without iterators", correct: false },
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
    expectedOutput: CPP_EXPECTED_OUTPUT[day],
    hints: [
      "Review the theory section for each topic",
      "Run the code in the playground to see the baseline",
      "Extend it: add inputs, edge cases, or a second example",
    ],
    xpReward: 50,
  });

  return quizzes;
}

function generateCppAssignment(day: number, blueprint: CppBlueprint): Lesson["assignment"] {
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

export function buildCppLesson(day: number): Lesson {
  const blueprint = CPP_CURRICULUM[day - 1];
  if (!blueprint) throw new Error(`No C++ lesson for day ${day}`);

  return {
    day,
    title: blueprint.title,
    subtitle: blueprint.subtitle,
    language: "cpp",
    track: "cpp",
    level: getLevelForDay(day),
    durationMinutes: 45 + (day % 3) * 15,
    xpTotal: 200,
    tags: blueprint.tags,
    theory: {
      sections: blueprint.theoryTopics.map((topic, i) => ({
        heading: topic,
        content: generateCppTopicContent(topic, blueprint.title, day),
        codeExample: i === 0 ? blueprint.codeTemplate : undefined,
      })),
    },
    playground: {
      defaultCode: blueprint.codeTemplate,
      language: "cpp",
      runnable: true,
    },
    exercises: generateCppExercises(day, blueprint),
    assignment: generateCppAssignment(day, blueprint),
  };
}
