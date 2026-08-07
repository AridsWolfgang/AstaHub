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
        id: `${prefix}-q${i + 1}`,
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
