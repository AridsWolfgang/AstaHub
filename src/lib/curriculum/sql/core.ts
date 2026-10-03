import type { Lesson } from "../../types";
import { getLevelForDay } from "../../types";

/* ─── SQL blueprints: Days 1–40 ─── */

interface SqlBlueprint {
  title: string;
  subtitle: string;
  language: "sql";
  tags: string[];
  theoryTopics: string[];
  codeTemplate: string;
}

const SQL_CURRICULUM: SqlBlueprint[] = [
  { title: "What is a Database", subtitle: "Tables, rows, and your first query", language: "sql", tags: ["database"], theoryTopics: ["Tables and rows", "SQLite", "Your first query"], codeTemplate: `CREATE TABLE pets (name TEXT, age INTEGER);\nINSERT INTO pets VALUES ('Rex', 3);\nINSERT INTO pets VALUES ('Bella', 5);\nSELECT name FROM pets;` },
  { title: "SELECT Basics", subtitle: "Reading columns and aliases", language: "sql", tags: ["sql"], theoryTopics: ["SELECT syntax", "Columns and aliases", "Literals"], codeTemplate: `CREATE TABLE users (name TEXT, age INTEGER);\nINSERT INTO users VALUES ('Ada', 36);\nINSERT INTO users VALUES ('Grace', 85);\nSELECT name FROM users;` },
  { title: "Filtering", subtitle: "WHERE, comparison, and LIKE", language: "sql", tags: ["sql"], theoryTopics: ["WHERE clauses", "Comparison operators", "LIKE wildcards"], codeTemplate: `CREATE TABLE students (name TEXT, grade INTEGER);\nINSERT INTO students VALUES ('Ada', 10);\nINSERT INTO students VALUES ('Bob', 8);\nINSERT INTO students VALUES ('Cara', 11);\nSELECT name FROM students WHERE grade >= 10;` },
  { title: "ORDER BY & LIMIT", subtitle: "Sorting and taking the top rows", language: "sql", tags: ["sql"], theoryTopics: ["ORDER BY", "ASC and DESC", "LIMIT"], codeTemplate: `CREATE TABLE scores (player TEXT, score INTEGER);\nINSERT INTO scores VALUES ('Mia', 90);\nINSERT INTO scores VALUES ('Leo', 85);\nINSERT INTO scores VALUES ('Zoe', 95);\nSELECT player FROM scores ORDER BY score DESC LIMIT 1;` },
  { title: "Aggregate Functions", subtitle: "Counting and summarizing values", language: "sql", tags: ["aggregates"], theoryTopics: ["COUNT", "SUM and AVG", "MIN and MAX"], codeTemplate: `CREATE TABLE sales (amount REAL);\nINSERT INTO sales VALUES (10);\nINSERT INTO sales VALUES (20);\nINSERT INTO sales VALUES (30);\nSELECT COUNT(*) FROM sales;` },
  { title: "GROUP BY", subtitle: "Summaries per distinct value", language: "sql", tags: ["aggregates"], theoryTopics: ["Grouping rows", "Grouping with aggregates", "Multiple columns"], codeTemplate: `CREATE TABLE orders (region TEXT, amount REAL);\nINSERT INTO orders VALUES ('north', 10);\nINSERT INTO orders VALUES ('north', 20);\nINSERT INTO orders VALUES ('south', 30);\nSELECT region FROM orders GROUP BY region;` },
  { title: "HAVING", subtitle: "Filtering groups after aggregation", language: "sql", tags: ["aggregates"], theoryTopics: ["Filtering groups", "HAVING vs WHERE", "Combined queries"], codeTemplate: `CREATE TABLE teams (team TEXT, wins INTEGER);\nINSERT INTO teams VALUES ('A', 8);\nINSERT INTO teams VALUES ('B', 5);\nINSERT INTO teams VALUES ('C', 9);\nSELECT team FROM teams GROUP BY team HAVING wins > 6;` },
  { title: "Creating Tables", subtitle: "CREATE TABLE and column types", language: "sql", tags: ["schema"], theoryTopics: ["CREATE TABLE", "Common types", "INSERT sample data"], codeTemplate: `CREATE TABLE books (id INTEGER, title TEXT, year INTEGER);\nINSERT INTO books VALUES (1, 'Dune', 1965);\nINSERT INTO books VALUES (2, 'Neuromancer', 1984);\nSELECT title FROM books;` },
  { title: "INSERT", subtitle: "Adding rows to a table", language: "sql", tags: ["data"], theoryTopics: ["INSERT INTO", "Multiple rows", "Explicit columns"], codeTemplate: `CREATE TABLE colors (name TEXT);\nINSERT INTO colors VALUES ('red');\nINSERT INTO colors VALUES ('green'), ('blue');\nSELECT name FROM colors;` },
  { title: "UPDATE", subtitle: "Rewriting existing rows", language: "sql", tags: ["data"], theoryTopics: ["UPDATE syntax", "WHERE with UPDATE", "Affected rows"], codeTemplate: `CREATE TABLE stock (item TEXT, qty INTEGER);\nINSERT INTO stock VALUES ('apple', 5);\nINSERT INTO stock VALUES ('pear', 3);\nUPDATE stock SET qty = 0 WHERE item = 'pear';\nSELECT item FROM stock WHERE qty = 0;` },
  { title: "DELETE", subtitle: "Removing rows from a table", language: "sql", tags: ["data"], theoryTopics: ["DELETE syntax", "Deleting subsets", "TRUNCATE concept"], codeTemplate: `CREATE TABLE tasks (title TEXT, done INTEGER);\nINSERT INTO tasks VALUES ('write', 1);\nINSERT INTO tasks VALUES ('read', 0);\nDELETE FROM tasks WHERE done = 1;\nSELECT title FROM tasks;` },
  { title: "Constraints", subtitle: "PRIMARY KEY, UNIQUE, NOT NULL", language: "sql", tags: ["schema"], theoryTopics: ["PRIMARY KEY", "UNIQUE", "NOT NULL"], codeTemplate: `CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, name TEXT NOT NULL);\nINSERT INTO users VALUES (1, 'a@x.com', 'Ada');\nINSERT INTO users VALUES (2, 'b@x.com', 'Bob');\nSELECT name FROM users;` },
  { title: "Auto-incrementing IDs", subtitle: "Letting the database number rows", language: "sql", tags: ["schema"], theoryTopics: ["INTEGER PRIMARY KEY", "AUTOINCREMENT", "Row IDs"], codeTemplate: `CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT);\nINSERT INTO items (label) VALUES ('first');\nINSERT INTO items (label) VALUES ('second');\nSELECT id FROM items;` },
  { title: "Foreign Keys", subtitle: "Linking tables through REFERENCES", language: "sql", tags: ["schema"], theoryTopics: ["REFERENCES", "JOINs from keys", "Integrity"], codeTemplate: `CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE books (id INTEGER PRIMARY KEY, author_id INTEGER REFERENCES authors(id), title TEXT);\nINSERT INTO authors VALUES (1, 'Frank');\nINSERT INTO books VALUES (1, 1, 'Dune');\nSELECT title FROM books;` },
  { title: "INNER JOIN", subtitle: "Pairing matching rows across tables", language: "sql", tags: ["joins"], theoryTopics: ["JOIN syntax", "Matching rows", "Aliasing tables"], codeTemplate: `CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE books (author_id INTEGER, title TEXT);\nINSERT INTO authors VALUES (1, 'Frank');\nINSERT INTO authors VALUES (2, 'Isaac');\nINSERT INTO books VALUES (1, 'Dune');\nINSERT INTO books VALUES (2, 'Foundation');\nSELECT b.title FROM books b INNER JOIN authors a ON b.author_id = a.id;` },
  { title: "LEFT JOIN", subtitle: "Keeping every row of the left table", language: "sql", tags: ["joins"], theoryTopics: ["LEFT OUTER JOIN", "NULL for missing", "Counting matches"], codeTemplate: `CREATE TABLE teachers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE courses (teacher_id INTEGER, title TEXT);\nINSERT INTO teachers VALUES (1, 'Ada');\nINSERT INTO teachers VALUES (2, 'Grace');\nINSERT INTO courses VALUES (1, 'Math');\nSELECT t.name, COALESCE(c.title, 'none') FROM teachers t LEFT JOIN courses c ON c.teacher_id = t.id;` },
  { title: "CROSS JOIN & Self Join", subtitle: "Cartesian products and hierarchies", language: "sql", tags: ["joins"], theoryTopics: ["CROSS JOIN", "Self joins", "When they help"], codeTemplate: `CREATE TABLE letters (c TEXT);\nINSERT INTO letters VALUES ('A');\nINSERT INTO letters VALUES ('B');\nSELECT a.c || b.c FROM letters a CROSS JOIN letters b;` },
  { title: "UNION & UNION ALL", subtitle: "Stacking result sets", language: "sql", tags: ["sets"], theoryTopics: ["UNION", "UNION ALL", "Set logic"], codeTemplate: `CREATE TABLE east (city TEXT);\nCREATE TABLE west (city TEXT);\nINSERT INTO east VALUES ('Boston'), ('Chicago');\nINSERT INTO west VALUES ('Denver'), ('Boston');\nSELECT city FROM east UNION SELECT city FROM west;` },
  { title: "Subqueries", subtitle: "Queries nested inside queries", language: "sql", tags: ["subqueries"], theoryTopics: ["Scalar subqueries", "IN subqueries", "Correlated basics"], codeTemplate: `CREATE TABLE employees (name TEXT, salary INTEGER);\nINSERT INTO employees VALUES ('Ada', 100);\nINSERT INTO employees VALUES ('Bob', 60);\nINSERT INTO employees VALUES ('Cy', 80);\nSELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);` },
  { title: "EXISTS", subtitle: "Testing whether a subquery matches", language: "sql", tags: ["subqueries"], theoryTopics: ["EXISTS", "NOT EXISTS", "When to prefer it"], codeTemplate: `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE orders (customer_id INTEGER);\nINSERT INTO customers VALUES (1, 'Ada');\nINSERT INTO customers VALUES (2, 'Bob');\nINSERT INTO orders VALUES (1);\nSELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);` },
  { title: "CASE Expressions", subtitle: "SQL's if / else in a value", language: "sql", tags: ["sql"], theoryTopics: ["CASE WHEN", "ELSE clauses", "Value mapping"], codeTemplate: `CREATE TABLE scores (name TEXT, score INTEGER);\nINSERT INTO scores VALUES ('Ada', 95);\nINSERT INTO scores VALUES ('Bob', 55);\nSELECT name, CASE WHEN score >= 60 THEN 'pass' ELSE 'fail' END FROM scores;` },
  { title: "String Functions", subtitle: "UPPER, LOWER, LENGTH, and friends", language: "sql", tags: ["functions"], theoryTopics: ["UPPER and LOWER", "LENGTH", "SUBSTR, TRIM, REPLACE"], codeTemplate: `CREATE TABLE names (name TEXT);\nINSERT INTO names VALUES ('ada');\nINSERT INTO names VALUES ('grace');\nSELECT UPPER(name) FROM names;` },
  { title: "Math Functions", subtitle: "ROUND, ABS, and integer arithmetic", language: "sql", tags: ["functions"], theoryTopics: ["ROUND", "ABS", "Modulo and integer math"], codeTemplate: `CREATE TABLE nums (n REAL);\nINSERT INTO nums VALUES (3.7);\nINSERT INTO nums VALUES (1.2);\nSELECT ROUND(n) FROM nums;` },
  { title: "Dates & Times", subtitle: "date(), time(), and strftime", language: "sql", tags: ["functions"], theoryTopics: ["date() and time()", "Strftime", "Date arithmetic"], codeTemplate: `CREATE TABLE events (name TEXT, event_date TEXT);\nINSERT INTO events VALUES ('launch', '2024-01-01');\nINSERT INTO events VALUES ('party', '2024-01-03');\nSELECT event_date FROM events WHERE event_date < '2024-01-02';` },
  { title: "DISTINCT", subtitle: "Unique values and deduplication", language: "sql", tags: ["sql"], theoryTopics: ["SELECT DISTINCT", "Counting distinct", "Dedup vs group"], codeTemplate: `CREATE TABLE orders (item TEXT);\nINSERT INTO orders VALUES ('apple'), ('pear'), ('apple');\nSELECT DISTINCT item FROM orders;` },
  { title: "COALESCE & NULL", subtitle: "Filling in missing values", language: "sql", tags: ["sql"], theoryTopics: ["NULL semantics", "COALESCE", "IFNULL"], codeTemplate: `CREATE TABLE users (name TEXT, city TEXT);\nINSERT INTO users VALUES ('Ada', 'London');\nINSERT INTO users VALUES ('Bob', NULL);\nSELECT COALESCE(city, 'unknown') FROM users;` },
  { title: "Views", subtitle: "Saved queries that act like tables", language: "sql", tags: ["schema"], theoryTopics: ["CREATE VIEW", "Querying views", "Why views"], codeTemplate: `CREATE TABLE sales (region TEXT, amount REAL);\nINSERT INTO sales VALUES ('north', 10);\nINSERT INTO sales VALUES ('north', 20);\nINSERT INTO sales VALUES ('south', 30);\nCREATE VIEW total_by_region AS SELECT region, SUM(amount) AS total FROM sales GROUP BY region;\nSELECT region FROM total_by_region;` },
  { title: "Indexes", subtitle: "Speeding up lookups on a column", language: "sql", tags: ["performance"], theoryTopics: ["CREATE INDEX", "Why indexes help", "EXPLAIN QUERY PLAN"], codeTemplate: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);\nCREATE INDEX idx_users_name ON users (name);\nINSERT INTO users VALUES (1, 'Ada');\nINSERT INTO users VALUES (2, 'Bob');\nSELECT name FROM users WHERE name = 'Ada';` },
  { title: "Transactions", subtitle: "BEGIN, COMMIT, and ROLLBACK", language: "sql", tags: ["data"], theoryTopics: ["BEGIN and COMMIT", "ROLLBACK", "Atomicity"], codeTemplate: `CREATE TABLE account (id INTEGER PRIMARY KEY, balance INTEGER);\nINSERT INTO account VALUES (1, 100);\nBEGIN;\nUPDATE account SET balance = balance - 30 WHERE id = 1;\nCOMMIT;\nSELECT balance FROM account;` },
  { title: "Normalization 1NF & 2NF", subtitle: "Atomic cells and full keys", language: "sql", tags: ["design"], theoryTopics: ["First normal form", "Second normal form", "Redundancy"], codeTemplate: `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product TEXT);\nINSERT INTO customers VALUES (1, 'Ada');\nINSERT INTO orders VALUES (1, 1, 'Pen');\nINSERT INTO orders VALUES (2, 1, 'Book');\nSELECT name FROM customers;` },
  { title: "Normalization 3NF", subtitle: "Removing transitive dependencies", language: "sql", tags: ["design"], theoryTopics: ["Third normal form", "Transitive dependencies", "A normalized schema"], codeTemplate: `CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT, country TEXT);\nCREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author_id INTEGER);\nINSERT INTO authors VALUES (1, 'Frank', 'US');\nINSERT INTO books VALUES (1, 'Dune', 1);\nSELECT name FROM authors;` },
  { title: "Schema Design", subtitle: "Planning tables and relationships", language: "sql", tags: ["design"], theoryTopics: ["Planning tables", "Relationships", "Data types"], codeTemplate: `CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE classes (id INTEGER PRIMARY KEY, title TEXT);\nCREATE TABLE enrollments (student_id INTEGER, class_id INTEGER);\nINSERT INTO students VALUES (1, 'Ada');\nINSERT INTO classes VALUES (1, 'Math');\nINSERT INTO enrollments VALUES (1, 1);\nSELECT title FROM classes;` },
  { title: "ALTER TABLE", subtitle: "Evolving a schema safely", language: "sql", tags: ["schema"], theoryTopics: ["ADD COLUMN", "RENAME", "DROP COLUMN"], codeTemplate: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);\nINSERT INTO users VALUES (1, 'Ada');\nALTER TABLE users ADD COLUMN age INTEGER;\nUPDATE users SET age = 36 WHERE id = 1;\nSELECT name FROM users;` },
  { title: "LIKE & Wildcards", subtitle: "Pattern matching with % and _", language: "sql", tags: ["sql"], theoryTopics: ["Percent wildcards", "Underscore", "Escaping"], codeTemplate: `CREATE TABLE files (name TEXT);\nINSERT INTO files VALUES ('a.txt'), ('b.md'), ('c.txt');\nSELECT name FROM files WHERE name LIKE '%.txt';` },
  { title: "Pagination", subtitle: "LIMIT, OFFSET, and page size", language: "sql", tags: ["sql"], theoryTopics: ["LIMIT and OFFSET", "Page size", "Stable ordering"], codeTemplate: `CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT);\nINSERT INTO posts VALUES (1, 'one');\nINSERT INTO posts VALUES (2, 'two');\nINSERT INTO posts VALUES (3, 'three');\nINSERT INTO posts VALUES (4, 'four');\nSELECT title FROM posts ORDER BY id LIMIT 2 OFFSET 2;` },
  { title: "Window Functions", subtitle: "ROW_NUMBER, RANK, and OVER", language: "sql", tags: ["advanced"], theoryTopics: ["ROW_NUMBER", "RANK", "OVER and PARTITION BY"], codeTemplate: `CREATE TABLE sales (month TEXT, amount INTEGER);\nINSERT INTO sales VALUES ('jan', 100);\nINSERT INTO sales VALUES ('feb', 150);\nINSERT INTO sales VALUES ('mar', 120);\nSELECT month, ROW_NUMBER() OVER (ORDER BY amount) FROM sales;` },
  { title: "Common Table Expressions", subtitle: "Named queries with WITH", language: "sql", tags: ["advanced"], theoryTopics: ["WITH syntax", "Named queries", "Recursive CTEs"], codeTemplate: `CREATE TABLE nums (n INTEGER);\nINSERT INTO nums VALUES (1), (2), (3);\nWITH doubled AS (SELECT n * 2 AS d FROM nums) SELECT d FROM doubled WHERE d > 3;` },
  { title: "Query Tuning", subtitle: "EXPLAIN QUERY PLAN and index usage", language: "sql", tags: ["performance"], theoryTopics: ["EXPLAIN QUERY PLAN", "Index usage", "Scan vs seek"], codeTemplate: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);\nINSERT INTO users VALUES (1, 'Ada');\nINSERT INTO users VALUES (2, 'Bob');\nCREATE INDEX idx_users_name ON users (name);\nEXPLAIN QUERY PLAN SELECT name FROM users WHERE name = 'Ada';` },
  { title: "SQL vs NoSQL", subtitle: "The relational model and its trade-offs", language: "sql", tags: ["concepts"], theoryTopics: ["The relational model", "When SQL fits", "NoSQL trade-offs"], codeTemplate: `CREATE TABLE notes (id INTEGER PRIMARY KEY, body TEXT);\nINSERT INTO notes VALUES (1, 'relational data stays consistent');\nSELECT body FROM notes;` },
  { title: "Capstone: A Library Database", subtitle: "Schema, seed data, and reports", language: "sql", tags: ["capstone"], theoryTopics: ["Schema design", "Seed data", "Reporting queries"], codeTemplate: `CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT);\nCREATE TABLE loans (member_id INTEGER, book_id INTEGER);\nINSERT INTO members VALUES (1, 'Ada');\nINSERT INTO books VALUES (1, 'Dune');\nINSERT INTO loans VALUES (1, 1);\nSELECT COUNT(*) FROM loans;` },
  { title: "SELECT Expressions", subtitle: "Computed columns with math and text", language: "sql", tags: ["sql"], theoryTopics: ["Computed columns", "Arithmetic in SELECT", "String concatenation"], codeTemplate: `CREATE TABLE products (name TEXT, price REAL, qty INTEGER);\nINSERT INTO products VALUES ('pen', 1.5, 10);\nINSERT INTO products VALUES ('book', 12.0, 3);\nSELECT price * qty FROM products ORDER BY price * qty;` },
  { title: "DISTINCT Deep", subtitle: "One column, many columns, dedup choices", language: "sql", tags: ["sql"], theoryTopics: ["DISTINCT on one column", "DISTINCT on multiple columns", "DISTINCT vs GROUP BY"], codeTemplate: `CREATE TABLE visits (city TEXT, day TEXT);\nINSERT INTO visits VALUES ('Paris', 'mon'), ('Paris', 'tue'), ('Rome', 'mon');\nSELECT DISTINCT city FROM visits ORDER BY city;` },
  { title: "Aliases Mastery", subtitle: "Naming every output column", language: "sql", tags: ["sql"], theoryTopics: ["AS aliases", "Aliases in ORDER BY", "Quoted aliases"], codeTemplate: `CREATE TABLE staff (first_name TEXT, last_name TEXT);\nINSERT INTO staff VALUES ('Ada', 'Lovelace');\nINSERT INTO staff VALUES ('Grace', 'Hopper');\nSELECT first_name AS given FROM staff ORDER BY given;` },
  { title: "Boolean Logic", subtitle: "AND, OR, NOT, and precedence", language: "sql", tags: ["sql"], theoryTopics: ["AND and OR", "NOT negation", "Parentheses and precedence"], codeTemplate: `CREATE TABLE applicants (name TEXT, age INTEGER, city TEXT);\nINSERT INTO applicants VALUES ('Ada', 36, 'London');\nINSERT INTO applicants VALUES ('Bob', 17, 'London');\nINSERT INTO applicants VALUES ('Cy', 40, 'Paris');\nSELECT name FROM applicants WHERE age >= 18 AND (city = 'London' OR city = 'Paris') ORDER BY name;` },
  { title: "WHERE Deep", subtitle: "BETWEEN, IN, and IS NULL", language: "sql", tags: ["sql"], theoryTopics: ["BETWEEN ranges", "IN lists", "IS NULL tests"], codeTemplate: `CREATE TABLE inventory (item TEXT, qty INTEGER, supplier TEXT);\nINSERT INTO inventory VALUES ('pen', 5, NULL);\nINSERT INTO inventory VALUES ('book', 50, 'Acme');\nINSERT INTO inventory VALUES ('desk', 500, 'Acme');\nSELECT item FROM inventory WHERE qty BETWEEN 10 AND 100 ORDER BY item;` },
  { title: "ORDER BY Deep", subtitle: "Multi-column sorts that stay stable", language: "sql", tags: ["sql"], theoryTopics: ["Multi-column ordering", "Mixed ASC and DESC", "Stable sort keys"], codeTemplate: `CREATE TABLE leaderboard (game TEXT, score INTEGER, player TEXT);\nINSERT INTO leaderboard VALUES ('chess', 10, 'Bob');\nINSERT INTO leaderboard VALUES ('chess', 10, 'Ada');\nINSERT INTO leaderboard VALUES ('chess', 20, 'Cy');\nSELECT player FROM leaderboard ORDER BY score DESC, player ASC;` },
  { title: "Keyset Pagination", subtitle: "WHERE-based pages instead of OFFSET", language: "sql", tags: ["sql"], theoryTopics: ["OFFSET mechanics", "Keyset pagination", "Ties and deterministic pages"], codeTemplate: `CREATE TABLE logs (id INTEGER PRIMARY KEY, msg TEXT);\nINSERT INTO logs VALUES (1, 'boot'), (2, 'login'), (3, 'click'), (4, 'logout'), (5, 'halt');\nSELECT msg FROM logs WHERE id > 2 ORDER BY id LIMIT 2;` },
  { title: "GLOB & Patterns", subtitle: "Case-sensitive matching and ESCAPE", language: "sql", tags: ["sql"], theoryTopics: ["GLOB patterns", "Case sensitivity", "ESCAPE clauses"], codeTemplate: `CREATE TABLE docs (name TEXT);\nINSERT INTO docs VALUES ('Report.TXT'), ('report.txt'), ('notes.md');\nSELECT name FROM docs WHERE name GLOB '*.txt' ORDER BY name;` },
  { title: "COUNT Deep", subtitle: "Star, column, and distinct counts", language: "sql", tags: ["aggregates"], theoryTopics: ["COUNT(*) vs COUNT(column)", "COUNT(DISTINCT column)", "COUNT with filters"], codeTemplate: `CREATE TABLE signups (email TEXT, city TEXT);\nINSERT INTO signups VALUES ('a@x.com', 'London');\nINSERT INTO signups VALUES ('b@x.com', NULL);\nINSERT INTO signups VALUES ('a@x.com', 'Paris');\nSELECT COUNT(DISTINCT email) FROM signups;` },
  { title: "SUM & AVG Deep", subtitle: "NULL semantics in totals", language: "sql", tags: ["aggregates"], theoryTopics: ["SUM ignores NULLs", "AVG denominators", "Sums over filtered rows"], codeTemplate: `CREATE TABLE donations (amount INTEGER);\nINSERT INTO donations VALUES (10);\nINSERT INTO donations VALUES (NULL);\nINSERT INTO donations VALUES (30);\nSELECT SUM(amount) FROM donations;` },
  { title: "MIN, MAX & TOTAL", subtitle: "Extremes on text and numbers", language: "sql", tags: ["aggregates"], theoryTopics: ["MIN and MAX on text", "TOTAL vs SUM", "Aggregates over empty sets"], codeTemplate: `CREATE TABLE words (w TEXT);\nINSERT INTO words VALUES ('pear');\nINSERT INTO words VALUES ('apple');\nINSERT INTO words VALUES ('fig');\nSELECT MIN(w) FROM words;` },
  { title: "GROUP_CONCAT", subtitle: "Rolling many rows into one string", language: "sql", tags: ["aggregates"], theoryTopics: ["GROUP_CONCAT basics", "Custom separators", "DISTINCT inside GROUP_CONCAT"], codeTemplate: `CREATE TABLE team (name TEXT);\nINSERT INTO team VALUES ('Ada');\nINSERT INTO team VALUES ('Bob');\nINSERT INTO team VALUES ('Ada');\nSELECT GROUP_CONCAT(name, ';') FROM team;` },
  { title: "GROUP BY Deep", subtitle: "Composite keys and group order", language: "sql", tags: ["aggregates"], theoryTopics: ["Composite grouping keys", "GROUP BY with ORDER BY", "Group cardinality"], codeTemplate: `CREATE TABLE sales (year INTEGER, region TEXT, amount INTEGER);\nINSERT INTO sales VALUES (2024, 'north', 10);\nINSERT INTO sales VALUES (2024, 'south', 20);\nINSERT INTO sales VALUES (2025, 'north', 30);\nSELECT year, region FROM sales GROUP BY year, region ORDER BY year, region;` },
  { title: "HAVING Deep", subtitle: "Group filters with teeth", language: "sql", tags: ["aggregates"], theoryTopics: ["HAVING on aggregates", "HAVING without GROUP BY", "Multiple HAVING conditions"], codeTemplate: `CREATE TABLE orders (customer TEXT, amount INTEGER);\nINSERT INTO orders VALUES ('Ada', 100);\nINSERT INTO orders VALUES ('Ada', 150);\nINSERT INTO orders VALUES ('Bob', 40);\nSELECT customer FROM orders GROUP BY customer HAVING SUM(amount) > 200 ORDER BY customer;` },
  { title: "WHERE vs HAVING", subtitle: "The full filtering pipeline", language: "sql", tags: ["aggregates"], theoryTopics: ["Row filters before grouping", "Group filters after aggregation", "Combining both clauses"], codeTemplate: `CREATE TABLE events (kind TEXT, n INTEGER);\nINSERT INTO events VALUES ('click', 5);\nINSERT INTO events VALUES ('click', 50);\nINSERT INTO events VALUES ('view', 60);\nSELECT kind FROM events WHERE n > 10 GROUP BY kind HAVING COUNT(*) >= 1 ORDER BY kind;` },
  { title: "Self Joins Deep", subtitle: "Hierarchies inside one table", language: "sql", tags: ["joins"], theoryTopics: ["Employee-manager patterns", "Mandatory table aliases", "Multi-level hierarchies"], codeTemplate: `CREATE TABLE staff (id INTEGER PRIMARY KEY, name TEXT, boss INTEGER);\nINSERT INTO staff VALUES (1, 'Ada', NULL);\nINSERT INTO staff VALUES (2, 'Bob', 1);\nINSERT INTO staff VALUES (3, 'Cy', 1);\nSELECT e.name FROM staff e JOIN staff m ON e.boss = m.id WHERE m.name = 'Ada' ORDER BY e.name;` },
  { title: "RIGHT JOIN Emulation", subtitle: "SQLite has none — rewrite as LEFT JOIN", language: "sql", tags: ["joins"], theoryTopics: ["RIGHT JOIN concept", "Rewriting as LEFT JOIN", "SQLite's supported joins"], codeTemplate: `CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE books (author_id INTEGER, title TEXT);\nINSERT INTO authors VALUES (1, 'Frank');\nINSERT INTO authors VALUES (2, 'Ursula');\nINSERT INTO books VALUES (1, 'Dune');\nSELECT a.name, COALESCE(b.title, 'none') FROM authors a LEFT JOIN books b ON b.author_id = a.id ORDER BY a.name;` },
  { title: "FULL OUTER JOIN Emulation", subtitle: "Two LEFT JOINs plus UNION", language: "sql", tags: ["joins"], theoryTopics: ["FULL OUTER JOIN concept", "UNION of two LEFT JOINs", "NULL on both sides"], codeTemplate: `CREATE TABLE left_t (id INTEGER, v TEXT);\nCREATE TABLE right_t (id INTEGER, w TEXT);\nINSERT INTO left_t VALUES (1, 'L1'), (2, 'L2');\nINSERT INTO right_t VALUES (2, 'R2'), (3, 'R3');\nSELECT l.id, COALESCE(r.w, 'none') FROM left_t l LEFT JOIN right_t r ON r.id = l.id UNION SELECT r.id, r.w FROM right_t r LEFT JOIN left_t l ON l.id = r.id WHERE l.id IS NULL ORDER BY 1;` },
  { title: "Semi Joins", subtitle: "IN and EXISTS keep one side", language: "sql", tags: ["joins"], theoryTopics: ["IN as a semi join", "EXISTS short-circuits", "Semi joins vs INNER JOIN"], codeTemplate: `CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE dues (member_id INTEGER);\nINSERT INTO members VALUES (1, 'Ada'), (2, 'Bob'), (3, 'Cy');\nINSERT INTO dues VALUES (1), (3);\nSELECT name FROM members WHERE id IN (SELECT member_id FROM dues) ORDER BY name;` },
  { title: "Milestone: Shop Reports", subtitle: "E-commerce schema and revenue queries", language: "sql", tags: ["project"], theoryTopics: ["Project schema design", "Seed realistic data", "Multi-table report queries"], codeTemplate: `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL);\nCREATE TABLE purchases (customer_id INTEGER, product_id INTEGER, qty INTEGER);\nINSERT INTO customers VALUES (1, 'Ada'), (2, 'Bob');\nINSERT INTO products VALUES (1, 'pen', 2.0), (2, 'book', 10.0);\nINSERT INTO purchases VALUES (1, 1, 3), (1, 2, 1), (2, 2, 2);\nSELECT SUM(p.price * pu.qty) FROM products p JOIN purchases pu ON pu.product_id = p.id;` },
  { title: "Anti Joins", subtitle: "Rows with no match, two ways", language: "sql", tags: ["joins"], theoryTopics: ["NOT EXISTS anti join", "LEFT JOIN with IS NULL", "NOT IN and NULL pitfalls"], codeTemplate: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE banned (user_id INTEGER);\nINSERT INTO users VALUES (1, 'Ada'), (2, 'Bob'), (3, 'Cy');\nINSERT INTO banned VALUES (2);\nSELECT name FROM users u LEFT JOIN banned b ON b.user_id = u.id WHERE b.user_id IS NULL ORDER BY name;` },
  { title: "Correlated Subqueries", subtitle: "Inner queries that read the outer row", language: "sql", tags: ["subqueries"], theoryTopics: ["Per-row inner queries", "Above-average-per-group", "Correlated UPDATE patterns"], codeTemplate: `CREATE TABLE emp (name TEXT, dept TEXT, salary INTEGER);\nINSERT INTO emp VALUES ('Ada', 'eng', 100), ('Bob', 'eng', 60), ('Cy', 'ops', 70);\nSELECT name FROM emp e WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept = e.dept) ORDER BY name;` },
  { title: "Scalar & Derived Tables", subtitle: "Subqueries in SELECT and FROM", language: "sql", tags: ["subqueries"], theoryTopics: ["Scalar values in SELECT", "Derived tables in FROM", "Subqueries in ORDER BY"], codeTemplate: `CREATE TABLE films (title TEXT, year INTEGER, rating REAL);\nINSERT INTO films VALUES ('Dune', 1965, 4.8), ('Jaws', 1975, 4.2), ('Alien', 1979, 4.6);\nSELECT title FROM (SELECT title, rating FROM films WHERE year > 1970) ORDER BY rating DESC LIMIT 1;` },
  { title: "CTEs Deep", subtitle: "Chained, multiple, and readable", language: "sql", tags: ["advanced"], theoryTopics: ["Chained CTEs", "Multiple CTEs", "CTEs vs subqueries"], codeTemplate: `CREATE TABLE nums (n INTEGER);\nINSERT INTO nums VALUES (1), (2), (3), (4);\nWITH evens AS (SELECT n FROM nums WHERE n % 2 = 0), doubled AS (SELECT n * 2 AS d FROM evens) SELECT d FROM doubled ORDER BY d;` },
  { title: "Recursive CTEs I", subtitle: "Sequences from self-reference", language: "sql", tags: ["advanced"], theoryTopics: ["Anchor and recursive members", "UNION ALL recursion", "Termination conditions"], codeTemplate: `WITH RECURSIVE cnt(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM cnt WHERE n < 5) SELECT n FROM cnt WHERE n % 2 = 0 ORDER BY n;` },
  { title: "Recursive CTEs II", subtitle: "Walking trees with depth", language: "sql", tags: ["advanced"], theoryTopics: ["Walking org charts", "Depth tracking", "Path building"], codeTemplate: `CREATE TABLE nodes (id INTEGER PRIMARY KEY, parent INTEGER, name TEXT);\nINSERT INTO nodes VALUES (1, NULL, 'root'), (2, 1, 'a'), (3, 2, 'b');\nWITH RECURSIVE chain(id, name, depth) AS (SELECT id, name, 0 FROM nodes WHERE parent IS NULL UNION ALL SELECT n.id, n.name, c.depth + 1 FROM nodes n JOIN chain c ON n.parent = c.id) SELECT name FROM chain ORDER BY depth DESC LIMIT 1;` },
  { title: "Windows I: Ranking", subtitle: "ROW_NUMBER, RANK, DENSE_RANK", language: "sql", tags: ["advanced"], theoryTopics: ["ROW_NUMBER basics", "RANK with gaps", "DENSE_RANK without gaps"], codeTemplate: `CREATE TABLE racers (name TEXT, score INTEGER);\nINSERT INTO racers VALUES ('Ada', 100), ('Bob', 100), ('Cy', 80);\nSELECT name, DENSE_RANK() OVER (ORDER BY score DESC) AS r FROM racers ORDER BY r, name;` },
  { title: "Windows II: Neighbors", subtitle: "LAG, LEAD, and NTILE", language: "sql", tags: ["advanced"], theoryTopics: ["LAG previous rows", "LEAD next rows", "NTILE buckets"], codeTemplate: `CREATE TABLE temps (day TEXT, t INTEGER);\nINSERT INTO temps VALUES ('mon', 10), ('tue', 14), ('wed', 12);\nSELECT day, t - LAG(t) OVER (ORDER BY day) AS delta FROM temps ORDER BY day LIMIT 1 OFFSET 1;` },
  { title: "Windows III: Frames", subtitle: "Running totals with ROWS BETWEEN", language: "sql", tags: ["advanced"], theoryTopics: ["ROWS BETWEEN frames", "Running totals", "Moving averages"], codeTemplate: `CREATE TABLE ledger (day INTEGER, amount INTEGER);\nINSERT INTO ledger VALUES (1, 10), (2, 20), (3, 30);\nSELECT day, SUM(amount) OVER (ORDER BY day ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running FROM ledger ORDER BY day LIMIT 1;` },
  { title: "INTERSECT & EXCEPT", subtitle: "Overlap and difference of sets", language: "sql", tags: ["sets"], theoryTopics: ["INTERSECT", "EXCEPT", "Set-operator precedence"], codeTemplate: `CREATE TABLE a (x TEXT);\nCREATE TABLE b (x TEXT);\nINSERT INTO a VALUES ('p'), ('q'), ('r');\nINSERT INTO b VALUES ('q'), ('r'), ('s');\nSELECT x FROM a INTERSECT SELECT x FROM b ORDER BY x;` },
  { title: "UNION Deep", subtitle: "Dedup cost vs ALL speed", language: "sql", tags: ["sets"], theoryTopics: ["UNION dedup cost", "UNION ALL speed", "ORDER BY over unions"], codeTemplate: `CREATE TABLE east (city TEXT);\nCREATE TABLE west (city TEXT);\nINSERT INTO east VALUES ('Boston'), ('Chicago');\nINSERT INTO west VALUES ('Boston'), ('Denver');\nSELECT COUNT(*) FROM (SELECT city FROM east UNION ALL SELECT city FROM west);` },
  { title: "Views Deep", subtitle: "Joins behind a clean name", language: "sql", tags: ["schema"], theoryTopics: ["CREATE VIEW with joins", "DROP VIEW", "Views stay current"], codeTemplate: `CREATE TABLE writers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE novels (writer_id INTEGER, title TEXT);\nINSERT INTO writers VALUES (1, 'Frank');\nINSERT INTO novels VALUES (1, 'Dune'), (1, 'Messiah');\nCREATE VIEW catalog AS SELECT w.name, n.title FROM writers w JOIN novels n ON n.writer_id = w.id;\nSELECT COUNT(*) FROM catalog;` },
  { title: "Updatable Views", subtitle: "INSTEAD OF triggers route writes", language: "sql", tags: ["schema"], theoryTopics: ["Updatable view limits", "INSTEAD OF triggers", "Routing writes"], codeTemplate: `CREATE TABLE people (id INTEGER PRIMARY KEY, name TEXT);\nINSERT INTO people VALUES (1, 'Ada');\nCREATE VIEW v_people AS SELECT id, name FROM people;\nCREATE TRIGGER v_people_insert INSTEAD OF INSERT ON v_people BEGIN INSERT INTO people (id, name) VALUES (NEW.id, NEW.name); END;\nINSERT INTO v_people VALUES (2, 'Bob');\nSELECT COUNT(*) FROM people;` },
  { title: "Indexes Deep", subtitle: "Composite keys and column order", language: "sql", tags: ["performance"], theoryTopics: ["Composite indexes", "Column order", "Covering indexes"], codeTemplate: `CREATE TABLE events (id INTEGER PRIMARY KEY, kind TEXT, ts TEXT);\nCREATE INDEX idx_events_kind_ts ON events (kind, ts);\nINSERT INTO events VALUES (1, 'click', '2024-01-01'), (2, 'view', '2024-01-02'), (3, 'click', '2024-01-03');\nSELECT COUNT(*) FROM events WHERE kind = 'click';` },
  { title: "Reading Query Plans", subtitle: "EXPLAIN QUERY PLAN, SCAN vs SEARCH", language: "sql", tags: ["performance"], theoryTopics: ["EXPLAIN QUERY PLAN syntax", "SCAN vs SEARCH lines", "Version-dependent text"], codeTemplate: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);\nCREATE INDEX idx_users_name ON users (name);\nINSERT INTO users VALUES (1, 'Ada');\nINSERT INTO users VALUES (2, 'Bob');\nEXPLAIN QUERY PLAN SELECT name FROM users WHERE name = 'Ada';` },
  { title: "Tuning with Plans", subtitle: "Comparing plans before and after", language: "sql", tags: ["performance"], theoryTopics: ["Forcing index use", "Comparing plans", "When plans change"], codeTemplate: `CREATE TABLE items (id INTEGER PRIMARY KEY, sku TEXT, price REAL);\nINSERT INTO items VALUES (1, 'A1', 9.99);\nINSERT INTO items VALUES (2, 'B2', 4.50);\nCREATE INDEX idx_items_sku ON items (sku);\nEXPLAIN QUERY PLAN SELECT sku FROM items WHERE sku = 'A1';` },
  { title: "Atomic Transfers", subtitle: "Two updates, one COMMIT", language: "sql", tags: ["data"], theoryTopics: ["Multi-statement transfers", "Balance invariants", "COMMIT finality"], codeTemplate: `CREATE TABLE account (id INTEGER PRIMARY KEY, balance INTEGER);\nINSERT INTO account VALUES (1, 100), (2, 50);\nBEGIN;\nUPDATE account SET balance = balance - 30 WHERE id = 1;\nUPDATE account SET balance = balance + 30 WHERE id = 2;\nCOMMIT;\nSELECT balance FROM account WHERE id = 2;` },
  { title: "ACID & ROLLBACK", subtitle: "Aborting leaves no trace", language: "sql", tags: ["data"], theoryTopics: ["Atomicity recap", "Consistency guarantees", "Isolation in SQLite"], codeTemplate: `CREATE TABLE vault (id INTEGER PRIMARY KEY, gems INTEGER);\nINSERT INTO vault VALUES (1, 10);\nBEGIN;\nUPDATE vault SET gems = gems + 5 WHERE id = 1;\nROLLBACK;\nSELECT gems FROM vault WHERE id = 1;` },
  { title: "SAVEPOINTs", subtitle: "Partial rollback inside a transaction", language: "sql", tags: ["data"], theoryTopics: ["SAVEPOINT syntax", "ROLLBACK TO", "RELEASE"], codeTemplate: `CREATE TABLE cart (id INTEGER PRIMARY KEY, item TEXT);\nINSERT INTO cart VALUES (1, 'pen');\nSAVEPOINT sp1;\nINSERT INTO cart VALUES (2, 'book');\nROLLBACK TO sp1;\nRELEASE sp1;\nSELECT COUNT(*) FROM cart;` },
  { title: "Milestone: Bank Ledger", subtitle: "Transfers plus an audit trigger", language: "sql", tags: ["project"], theoryTopics: ["Ledger schema", "Audit trigger", "Transfer procedure"], codeTemplate: `CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner TEXT, balance INTEGER);\nCREATE TABLE audit (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT);\nCREATE TRIGGER log_big AFTER UPDATE ON accounts WHEN NEW.balance > 100 BEGIN INSERT INTO audit (note) VALUES ('big:' || NEW.owner); END;\nINSERT INTO accounts VALUES (1, 'Ada', 90), (2, 'Bob', 40);\nBEGIN;\nUPDATE accounts SET balance = balance + 30 WHERE id = 1;\nUPDATE accounts SET balance = balance - 30 WHERE id = 2;\nCOMMIT;\nSELECT COUNT(*) FROM audit;` },
  { title: "CHECK & DEFAULT", subtitle: "Rules and fallbacks in the schema", language: "sql", tags: ["schema"], theoryTopics: ["CHECK expressions", "DEFAULT values", "Constraint violations abort"], codeTemplate: `CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL CHECK (price >= 0) DEFAULT 0);\nINSERT INTO products (name) VALUES ('mystery');\nSELECT price FROM products;` },
  { title: "Foreign Key Actions", subtitle: "CASCADE and SET NULL on delete", language: "sql", tags: ["schema"], theoryTopics: ["ON DELETE CASCADE", "ON DELETE SET NULL", "PRAGMA foreign_keys"], codeTemplate: `PRAGMA foreign_keys = ON;\nCREATE TABLE teams (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE players (id INTEGER PRIMARY KEY, team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE, name TEXT);\nINSERT INTO teams VALUES (1, 'A');\nINSERT INTO players VALUES (1, 1, 'Ada'), (2, 1, 'Bob');\nDELETE FROM teams WHERE id = 1;\nSELECT COUNT(*) FROM players;` },
  { title: "Normalization Refactor", subtitle: "Splitting a flat table into 3NF", language: "sql", tags: ["design"], theoryTopics: ["Spotting repeating groups", "Splitting tables", "Joining it back"], codeTemplate: `CREATE TABLE dept (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE worker (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER REFERENCES dept(id));\nINSERT INTO dept VALUES (1, 'eng'), (2, 'ops');\nINSERT INTO worker VALUES (1, 'Ada', 1), (2, 'Bob', 2);\nSELECT w.name FROM worker w JOIN dept d ON d.id = w.dept_id WHERE d.name = 'eng';` },
  { title: "Denormalization", subtitle: "Breaking rules for read speed", language: "sql", tags: ["design"], theoryTopics: ["Read vs write trade-offs", "Cached counters", "Materialized summaries"], codeTemplate: `CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, likes INTEGER DEFAULT 0);\nCREATE TABLE likes (post_id INTEGER, who TEXT);\nINSERT INTO posts VALUES (1, 'hello', 0);\nINSERT INTO likes VALUES (1, 'Ada'), (1, 'Bob');\nUPDATE posts SET likes = (SELECT COUNT(*) FROM likes WHERE post_id = 1) WHERE id = 1;\nSELECT likes FROM posts WHERE id = 1;` },
  { title: "Triggers I: Audit", subtitle: "AFTER INSERT logs every row", language: "sql", tags: ["data"], theoryTopics: ["AFTER INSERT triggers", "NEW row values", "Audit tables"], codeTemplate: `CREATE TABLE orders (id INTEGER PRIMARY KEY, item TEXT);\nCREATE TABLE order_log (id INTEGER PRIMARY KEY AUTOINCREMENT, msg TEXT);\nCREATE TRIGGER after_order_insert AFTER INSERT ON orders BEGIN INSERT INTO order_log (msg) VALUES ('added:' || NEW.item); END;\nINSERT INTO orders VALUES (1, 'pen');\nSELECT msg FROM order_log;` },
  { title: "Triggers II: Validation", subtitle: "BEFORE INSERT guards with RAISE", language: "sql", tags: ["data"], theoryTopics: ["BEFORE INSERT guards", "RAISE(ABORT, ...)", "Enforcing rules"], codeTemplate: `CREATE TABLE ages (name TEXT, age INTEGER);\nCREATE TRIGGER check_age BEFORE INSERT ON ages WHEN NEW.age < 0 BEGIN SELECT RAISE(ABORT, 'age must be non-negative'); END;\nINSERT INTO ages VALUES ('Ada', 36);\nSELECT age FROM ages WHERE name = 'Ada';` },
  { title: "Trigger Limits", subtitle: "SQLite is FOR EACH ROW only", language: "sql", tags: ["data"], theoryTopics: ["FOR EACH ROW only", "No FOR EACH STATEMENT", "Workarounds with temp tables"], codeTemplate: `CREATE TABLE t (x INTEGER);\nCREATE TABLE t_log (n INTEGER);\nCREATE TRIGGER t_row_trigger AFTER INSERT ON t BEGIN INSERT INTO t_log VALUES (NEW.x); END;\nINSERT INTO t VALUES (1), (2);\nSELECT COUNT(*) FROM t_log;` },
  { title: "JSON I: Extraction", subtitle: "json_extract reads document fields", language: "sql", tags: ["functions"], theoryTopics: ["JSON text columns", "json_extract paths", "json_object building"], codeTemplate: `CREATE TABLE configs (id INTEGER PRIMARY KEY, data TEXT);\nINSERT INTO configs VALUES (1, '{"theme":"dark","font":14}');\nSELECT json_extract(data, '$.theme') FROM configs WHERE id = 1;` },
  { title: "JSON II: json_each", subtitle: "Unnesting arrays into rows", language: "sql", tags: ["functions"], theoryTopics: ["json_each table function", "Unnesting arrays", "Filtering extracted values"], codeTemplate: `CREATE TABLE carts (id INTEGER PRIMARY KEY, items TEXT);\nINSERT INTO carts VALUES (1, '["pen","book","pen"]');\nSELECT COUNT(*) FROM carts, json_each(carts.items) WHERE value = 'pen';` },
  { title: "FTS I: MATCH", subtitle: "Full-text search with FTS5", language: "sql", tags: ["advanced"], theoryTopics: ["FTS5 virtual tables", "MATCH queries", "Tokenization basics"], codeTemplate: `CREATE VIRTUAL TABLE docs USING fts5(title, body);\nINSERT INTO docs VALUES ('Dune', 'desert planet spice');\nINSERT INTO docs VALUES ('Jaws', 'shark ocean terror');\nSELECT title FROM docs WHERE docs MATCH 'desert';` },
  { title: "FTS II: Ranking", subtitle: "bm25 orders the matches", language: "sql", tags: ["advanced"], theoryTopics: ["bm25 ranking", "snippet highlights", "Column filters"], codeTemplate: `CREATE VIRTUAL TABLE articles USING fts5(title, body);\nINSERT INTO articles VALUES ('sql guide', 'sql indexes speed up sql queries');\nINSERT INTO articles VALUES ('sql intro', 'tables rows and columns');\nSELECT title FROM articles WHERE articles MATCH 'sql' ORDER BY bm25(articles) LIMIT 1;` },
  { title: "Analytics I: Periods", subtitle: "Running totals and windows of time", language: "sql", tags: ["advanced"], theoryTopics: ["Daily deltas with LAG", "Running totals over time", "Week-over-week compare"], codeTemplate: `CREATE TABLE revenue (day INTEGER, amount INTEGER);\nINSERT INTO revenue VALUES (1, 100), (2, 150), (3, 120);\nSELECT SUM(amount) FROM revenue WHERE day <= 2;` },
  { title: "Analytics II: Top-N", subtitle: "Best row per group with windows", language: "sql", tags: ["advanced"], theoryTopics: ["ROW_NUMBER per partition", "Top-N filter", "Ties handling"], codeTemplate: `CREATE TABLE scores (region TEXT, player TEXT, pts INTEGER);\nINSERT INTO scores VALUES ('north', 'Ada', 90), ('north', 'Bob', 70), ('south', 'Cy', 95);\nSELECT player FROM (SELECT player, ROW_NUMBER() OVER (PARTITION BY region ORDER BY pts DESC) AS rn FROM scores) WHERE rn = 1 ORDER BY player;` },
  { title: "Analytics III: Cohorts", subtitle: "Retention with a self join", language: "sql", tags: ["advanced"], theoryTopics: ["Cohort week grouping", "Retention self join", "Percent retained"], codeTemplate: `CREATE TABLE logins (user_id INTEGER, week INTEGER);\nINSERT INTO logins VALUES (1, 1), (1, 2), (2, 1), (3, 2);\nSELECT COUNT(*) FROM logins a JOIN logins b ON a.user_id = b.user_id AND b.week = a.week + 1 WHERE a.week = 1;` },
  { title: "UPSERT", subtitle: "INSERT ON CONFLICT keeps counters", language: "sql", tags: ["data"], theoryTopics: ["ON CONFLICT DO NOTHING", "ON CONFLICT DO UPDATE", "excluded row values"], codeTemplate: `CREATE TABLE counters (key TEXT PRIMARY KEY, hits INTEGER);\nINSERT INTO counters VALUES ('home', 1);\nINSERT INTO counters (key, hits) VALUES ('home', 1) ON CONFLICT(key) DO UPDATE SET hits = hits + 1;\nSELECT hits FROM counters WHERE key = 'home';` },
  { title: "Funnel Queries", subtitle: "CTEs plus windows measure drop-off", language: "sql", tags: ["advanced"], theoryTopics: ["Staged CTE pipelines", "Conversion ratios", "Funnel drop-off"], codeTemplate: `CREATE TABLE funnel (user_id INTEGER, step TEXT);\nINSERT INTO funnel VALUES (1, 'visit'), (1, 'signup'), (2, 'visit');\nWITH steps AS (SELECT step, COUNT(DISTINCT user_id) AS users FROM funnel GROUP BY step) SELECT users FROM steps WHERE step = 'signup';` },
  { title: "Data Cleaning", subtitle: "Dedup with rowid and repair NULLs", language: "sql", tags: ["data"], theoryTopics: ["Finding duplicates", "DELETE with rowid", "Filling NULLs"], codeTemplate: `CREATE TABLE contacts (name TEXT, email TEXT);\nINSERT INTO contacts VALUES ('Ada', 'a@x.com'), ('Ada', 'a@x.com'), ('Bob', NULL);\nDELETE FROM contacts WHERE rowid NOT IN (SELECT MIN(rowid) FROM contacts GROUP BY name, email);\nSELECT COUNT(*) FROM contacts;` },
  { title: "Schema Migrations", subtitle: "Evolving tables without losing data", language: "sql", tags: ["schema"], theoryTopics: ["ADD COLUMN with defaults", "Backfilling data", "Renaming tables"], codeTemplate: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);\nINSERT INTO users VALUES (1, 'Ada'), (2, 'Bob');\nALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active';\nUPDATE users SET status = 'vip' WHERE name = 'Ada';\nSELECT status FROM users WHERE name = 'Bob';` },
  { title: "Index Audit", subtitle: "Finding missing indexes in sqlite_master", language: "sql", tags: ["performance"], theoryTopics: ["sqlite_master inventory", "Missing-index smells", "Audit checklists"], codeTemplate: `CREATE TABLE fast (id INTEGER PRIMARY KEY, email TEXT);\nCREATE TABLE slow (id INTEGER PRIMARY KEY, email TEXT);\nCREATE INDEX idx_fast_email ON fast (email);\nINSERT INTO fast VALUES (1, 'a@x.com');\nINSERT INTO slow VALUES (1, 'a@x.com');\nSELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'fast' AND name NOT LIKE 'sqlite_%';` },
  { title: "Capstone: Market Database", subtitle: "Sellers, goods, sales, and a dashboard", language: "sql", tags: ["capstone"], theoryTopics: ["Capstone schema", "Seed and constraints", "Executive dashboard query"], codeTemplate: `CREATE TABLE sellers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE goods (id INTEGER PRIMARY KEY, seller_id INTEGER REFERENCES sellers(id), name TEXT, price REAL);\nCREATE TABLE sales (id INTEGER PRIMARY KEY AUTOINCREMENT, goods_id INTEGER, qty INTEGER);\nINSERT INTO sellers VALUES (1, 'Ada'), (2, 'Bob');\nINSERT INTO goods VALUES (1, 1, 'pen', 2.0), (2, 2, 'book', 10.0);\nINSERT INTO sales (goods_id, qty) VALUES (1, 5), (2, 3);\nSELECT SUM(g.price * s.qty) FROM goods g JOIN sales s ON s.goods_id = g.id;` },
];
/* ─── Hand-written topic content ─── */

const SQL_TOPIC_CONTENT: Record<string, string> = {
  "Tables and rows": "A database stores data in tables — grids of named columns and typed rows. A row is one record (a person, a book, an order); a column is one field of that record (name, price, date). Almost everything in SQL is about slicing these grids: pick rows, pick columns, or summarize them.",
  "SQLite": "SQLite is a self-contained, file-based relational engine — no server to install, no config to manage. It implements standard SQL and is the most widely deployed database in the world, powering browsers, phones, and embedded systems. For learning, its honesty is perfect: open a database, write SQL, read the output.",
  "Your first query": "The most common SQL statement is SELECT, which reads data: `SELECT name FROM pets;`. You name the columns you want and the table they come from, and SQLite returns every matching row. This is the same shape of query every later day builds on.",
  "SELECT syntax": "`SELECT column FROM table;` is the read statement: choose the columns, then the table. Select several columns separated by commas, or `SELECT *` for every column. Statements end with a semicolon and ignore case, so `select` and `SELECT` mean the same thing.",
  "Columns and aliases": "Every output column can be renamed with an alias: `SELECT name AS full_name FROM users;`. Aliases make results readable and give computed columns a name. The `AS` keyword is optional in SQLite, but writing it keeps the intent obvious.",
  "Literals": "Beyond columns, SELECT can produce constant values — numbers, strings in single quotes, and expressions. `SELECT 'Hello';` returns one row holding the text Hello; `SELECT 1 + 2;` returns 3. Literals let you test functions and arithmetic without a table.",
  "WHERE clauses": "WHERE filters rows before they reach the result: `SELECT name FROM users WHERE age > 18;`. Only rows where the condition is true survive. It is the most important clause in real queries — it turns a whole table into exactly the slice you need.",
  "Comparison operators": "SQL comparison operators are `=`, `!=`, `<`, `<=`, `>`, `>=`. Note the single `=` for equality — unlike most languages, SQL has no `==`. Numbers compare numerically and text by its collation; a WHERE is built from these operators.",
  "LIKE wildcards": "LIKE matches text patterns instead of exact values: `WHERE name LIKE 'A%'` finds names starting with A. `%` matches any run of characters, including none, and `_` matches exactly one. LIKE gives you prefix, suffix, and substring searches.",
  "ORDER BY": "ORDER BY sorts the result set: `SELECT name FROM users ORDER BY name;`. It runs after filtering, so you can sort any subset. The default order is ascending; add `DESC` to reverse it.",
  "ASC and DESC": "Every ORDER BY column can be ascending (`ASC`, the default) or descending (`DESC`). Sort by multiple columns to break ties: `ORDER BY grade DESC, name ASC`. Sorting happens last, so it never changes which rows match — only their order.",
  "LIMIT": "LIMIT caps how many rows a query returns: `SELECT * FROM big_table LIMIT 10;`. It is the simplest form of pagination and a guard against accidentally returning millions of rows. Combined with ORDER BY it gives you \"top N\" queries.",
  "COUNT": "`COUNT(*)` counts rows; `COUNT(column)` counts non-NULL values in that column. It is the fundamental \"how many\" function — total rows, matches in a filter, rows per group. COUNT returns a single number, deterministic for the same data.",
  "SUM and AVG": "`SUM(column)` adds up all values and `AVG(column)` returns their mean. Both ignore NULLs. In SQLite an aggregate over REAL data comes back as a float, so `AVG` of 10 and 20 is `15.0` — the exact printed form matters when you verify output.",
  "MIN and MAX": "`MIN(column)` and `MAX(column)` return the smallest and largest value in a column — numbers by value, text by collation order. They work on any comparable type. Like all aggregates, they collapse many rows into one number.",
  "Grouping rows": "GROUP BY collapses rows that share a column value into one group. `SELECT region FROM orders GROUP BY region;` returns one row per distinct region. Each group can then be summarized with aggregates — the heart of reporting queries.",
  "Grouping with aggregates": "Combine GROUP BY with an aggregate to summarize each group: `SELECT region, SUM(amount) FROM orders GROUP BY region;` gives one total per region. The grouping column appears once per group; the aggregate runs over the rows inside it. Any other column in the select list must also be grouped.",
  "Multiple columns": "GROUP BY accepts several columns: `GROUP BY year, month` groups by year first, then month — one group per distinct combination. This builds nested summaries, like sales per month within each year. More grouping columns means finer, more numerous groups.",
  "Filtering groups": "HAVING filters groups after aggregation, exactly as WHERE filters rows before it. `GROUP BY region HAVING SUM(amount) > 100` keeps only regions whose total exceeds 100. It can reference aggregates — something WHERE is never allowed to do.",
  "HAVING vs WHERE": "WHERE runs before grouping and can only reference raw columns; HAVING runs after grouping and can reference aggregates. Use WHERE to drop rows you do not want in any summary, and HAVING to drop summaries that miss a bar. Both can appear in one query, WHERE first.",
  "Combined queries": "A full grouping query chains clauses in a fixed order: WHERE to filter rows, GROUP BY to form groups, HAVING to filter groups, ORDER BY to sort, LIMIT to cap. `SELECT region, SUM(amount) FROM sales WHERE amount > 0 GROUP BY region HAVING SUM(amount) > 10 ORDER BY SUM(amount) DESC;` reads like a pipeline from raw data to a tidy report.",
  "CREATE TABLE": "`CREATE TABLE books (id INTEGER, title TEXT, year INTEGER);` declares a table and its columns, each with a name and a type. It is DDL — it changes the schema, not the data — and creates an empty table ready for rows.",
  "Common types": "SQLite's core types are TEXT, INTEGER, REAL, and BLOB. Unlike stricter databases it is flexible about what each column actually holds, but honoring types keeps comparisons and arithmetic predictable. INTEGER for counts and IDs, REAL for decimals, TEXT for everything else.",
  "INSERT sample data": "After CREATE TABLE you usually insert a few rows so queries have something to answer. `INSERT INTO books VALUES (1, 'Dune', 1965);` fills one row with positional values. Sample data turns abstract schema lessons into queries with real answers.",
  "INSERT INTO": "`INSERT INTO table VALUES (...)` adds a row. The values are positional — they must line up with the column order declared in CREATE TABLE. When the order matters or the table changes, name the columns explicitly instead.",
  "Multiple rows": "One INSERT can add several rows at once: `INSERT INTO colors VALUES ('red'), ('green'), ('blue');`. Each parenthesized group becomes its own row. It is the fast way to seed a table and keeps scripts short.",
  "Explicit columns": "`INSERT INTO users (name, age) VALUES ('Ada', 36);` names the target columns, so the values no longer have to match table order. Omitted columns get their default or NULL. Explicit columns make INSERTs self-documenting and resilient to schema changes.",
  "UPDATE syntax": "`UPDATE table SET column = value` rewrites values in existing rows. Without a WHERE clause it updates every row in the table — usually a mistake. Like INSERT it changes data, not structure.",
  "WHERE with UPDATE": "Always pair UPDATE with a WHERE that names the exact rows to change: `UPDATE stock SET qty = 0 WHERE item = 'pear';`. The filter runs before any value is written, so you can target one record among thousands. Test the filter as a SELECT first.",
  "Affected rows": "An UPDATE touches however many rows its WHERE matches — one, many, or zero. Zero matches is not an error; it just changes nothing. SQLite reports the affected-row count, which is how you confirm a statement did what you expected.",
  "DELETE syntax": "`DELETE FROM table;` removes every row in the table — the table itself survives. It is the data-removal counterpart to UPDATE and carries the same warning: without a WHERE, nothing survives. There is no confirmation prompt, so be deliberate.",
  "Deleting subsets": "`DELETE FROM tasks WHERE done = 1;` removes only the rows the WHERE matches. The filter is evaluated per row and only matching rows disappear. DELETE and UPDATE share the same discipline — filter first, then act.",
  "TRUNCATE concept": "Many databases have TRUNCATE, which empties a table instantly. SQLite has no TRUNCATE; `DELETE FROM table;` is the equivalent. Because SQLite logs every removed row inside a transaction, a plain DELETE on a huge table can be slower than you expect.",
  "PRIMARY KEY": "PRIMARY KEY uniquely identifies each row and forbids NULLs and duplicates. It is the anchor every other table can reference. In SQLite, `INTEGER PRIMARY KEY` is special — it aliases the built-in rowid and auto-numbers new rows.",
  "UNIQUE": "UNIQUE forbids duplicate values in a column: two users cannot share the same email. Unlike PRIMARY KEY, UNIQUE columns allow NULLs (each NULL counts as distinct). UNIQUE protects data quality at the schema level instead of trusting every INSERT.",
  "NOT NULL": "NOT NULL rejects rows that leave the column empty — every row must provide a real value. It is the right call for fields that are always meaningful. Combined with PRIMARY KEY and UNIQUE, constraints make bad data hard to insert.",
  "INTEGER PRIMARY KEY": "Declaring `id INTEGER PRIMARY KEY` makes SQLite treat the column as an alias for its internal rowid, giving auto-incrementing unique integer keys for free. It is the idiomatic primary key for a SQLite table. Other types as primary keys work but lose the rowid shortcut.",
  "AUTOINCREMENT": "AUTOINCREMENT guarantees IDs are never reused, even after rows are deleted. It is only valid on an INTEGER PRIMARY KEY. It costs a little speed and is rarely necessary — plain INTEGER PRIMARY KEY already produces fresh unique IDs, it may just reuse the largest deleted one.",
  "Row IDs": "Every SQLite table with an INTEGER PRIMARY KEY has an implicit, monotonically increasing rowid. Rows inserted without an explicit id get the next one automatically — 1, 2, 3 and so on. Deleting rows never resets the counter, so IDs stay stable as long-term references.",
  "REFERENCES": "`author_id INTEGER REFERENCES authors(id)` declares a foreign key: the column must hold an existing authors id. It expresses a relationship between tables inside the schema itself. SQLite enforces it when foreign keys are enabled, keeping references honest.",
  "JOINs from keys": "Foreign keys turn related tables into joinable data. `ON b.author_id = a.id` pairs each book with its author row using the key column. The relationship lives in the data, and JOIN makes it available in a single query.",
  "Integrity": "Constraints exist so that bad states are hard or impossible to reach. PRIMARY KEY and UNIQUE stop duplicate identity, NOT NULL stops empty essentials, and REFERENCES keeps children pointing at real parents. Integrity is the payoff of designing a schema before filling it.",
  "JOIN syntax": "A JOIN combines rows from two tables using a condition: `SELECT b.title FROM books b JOIN authors a ON b.author_id = a.id;`. The ON clause states how rows correspond. JOIN is how a normalized schema — many small tables — becomes complete, readable results.",
  "Matching rows": "JOIN only pairs rows whose ON condition is true. Books with a matching author appear; books pointing nowhere are dropped by an INNER JOIN. The join condition is the heart of the query — get it right and every result row is a real pair.",
  "Aliasing tables": "Tables can be given short aliases: `FROM books b JOIN authors a`. The alias then qualifies columns — `b.title`, `a.name` — which is mandatory when both tables share a column name and clearer anyway. Aliases keep long queries readable and are required for self-joins.",
  "LEFT OUTER JOIN": "A LEFT JOIN keeps every row of the left table even when the right table has no match; missing right-side values become NULL. It answers \"all of these, plus whatever matches\" — the classic report query for tables that may not line up.",
  "NULL for missing": "When a LEFT JOIN finds no match, the right table's columns come back as NULL — the database's way of saying \"no value here\". You usually replace them with a default: `COALESCE(c.title, 'none')`. NULL is tested with `IS NULL`, never `=`.",
  "Counting matches": "LEFT JOINs are the tool for counting related rows even when there are zero: every left row appears once, so `COUNT(right.id)` counts only real matches while a plain `COUNT(*)` would count the NULL rows too. This is how reports show \"no related records\" as zero, not silence.",
  "CROSS JOIN": "A CROSS JOIN pairs every row of one table with every row of the other — the Cartesian product. Two tables of size N and M produce N×M rows. It is rarely useful on big data but exactly right for generating combinations, grids, and test matrices.",
  "Self joins": "A self join joins a table to itself: `FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id`. Because both sides are the same table, aliases are mandatory. Self joins model hierarchies — managers, parents, replies-to — stored in a single table.",
  "When they help": "CROSS JOINs generate combinations; self joins walk hierarchies. Both shine when the answer needs every pairing (products × sizes) or a table that references itself (employee → manager). If you are computing pairs or tree paths, reach for one of these.",
  "UNION": "UNION stacks the results of two SELECTs into one list, removing duplicates. `SELECT city FROM east UNION SELECT city FROM west;` returns each city once even if it appears in both. Both SELECTs must have the same number of columns with compatible types.",
  "UNION ALL": "UNION ALL is UNION without deduplication — it keeps every row from both queries. It is faster because no duplicate check runs, and it is the right choice when duplicates are meaningful, as in logs or sales lines. UNION removes duplicates; UNION ALL preserves them.",
  "Set logic": "UNION is set logic for rows — SQL's \"or\" — merging two result sets. INTERSECT gives rows present in both; EXCEPT gives rows in the first but not the second. Together they combine queries the way sets combine, without join gymnastics.",
  "Scalar subqueries": "A subquery that returns a single value can sit inside an expression: `WHERE salary > (SELECT AVG(salary) FROM employees);`. The inner query runs first and its one value feeds the comparison. Scalar subqueries are the cleanest way to compare rows against a computed baseline.",
  "IN subqueries": "`WHERE city IN (SELECT city FROM offices)` is true when the row's value appears in the subquery's result list. It is a membership test against a dynamically computed set — cleaner than a join when you only need the existence check.",
  "Correlated basics": "A correlated subquery references the outer row: `WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department = e.department)`. It runs once per outer row, comparing each row against its own group's baseline. Powerful — but make sure it can use an index, because per-row work adds up.",
  "EXISTS": "`EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)` is true when the subquery returns at least one row. It short-circuits — the instant a row is found it stops scanning. The `SELECT 1` body is conventional; only existence matters.",
  "NOT EXISTS": "NOT EXISTS is the opposite: true when the subquery finds nothing. It is the idiomatic \"rows with no related records\" test — every customer with zero orders. Unlike `NOT IN`, it handles NULLs correctly, making it the safer anti-join.",
  "When to prefer it": "Use EXISTS for an existence check on a correlated subquery — it stops early and ignores NULLs. Use IN when the subquery result is small and uncorrelated. Use JOIN when you need the matched columns themselves, not just a yes/no.",
  "CASE WHEN": "`CASE WHEN score >= 60 THEN 'pass' ELSE 'fail' END` evaluates conditions in order and returns the first match's THEN value. It is SQL's if/else, usable anywhere an expression fits: SELECT, WHERE, ORDER BY. The result can be any type.",
  "ELSE clauses": "The ELSE clause catches values no WHEN matched; without it, unmatched rows return NULL. `CASE WHEN grade >= 90 THEN 'A' WHEN grade >= 80 THEN 'B' ELSE 'C' END` — order matters, the first true WHEN wins. ELSE is the ladder's sensible default.",
  "Value mapping": "CASE is the workhorse for turning raw values into readable labels — booleans to yes/no, scores to grades, status codes to words. The mapping lives in the query, so the same data can be presented many ways without changing it.",
  "UPPER and LOWER": "`UPPER(name)` and `LOWER(name)` convert text to all-caps or all-lowercase. They are the standard tools for case-insensitive matching and consistent display. SQLite compares text case-sensitively by default, so normalizing case before comparing is a common pattern.",
  "LENGTH": "`LENGTH(text)` returns the number of characters in a string, or bytes for a BLOB. It is the cheap way to validate input length and trim data to fit. `LENGTH('')` is 0 and `LENGTH(NULL)` is NULL.",
  "SUBSTR, TRIM, REPLACE": "`SUBSTR(text, start, count)` slices a string, `TRIM(text)` strips surrounding whitespace, and `REPLACE(text, from, to)` swaps every occurrence of one substring for another. Together they cover most text cleaning: trim the noise, slice what you need, replace what changed.",
  "ROUND": "`ROUND(number, digits)` rounds to a given number of decimals, defaulting to 0. `ROUND(3.7)` is 4.0 — SQLite keeps the result a float, so it prints as `4.0` even when the math is whole. Rounding is a display and reporting concern; keep raw values in storage.",
  "ABS": "`ABS(number)` returns the absolute value — the number with its sign removed. It is the tool for distances, deviations, and any magnitude that must not go negative. `ABS(-7)` is 7 and `ABS(7)` is still 7.",
  "Modulo and integer math": "`%` gives the remainder: `10 % 3` is 1. Combined with integer division it slices numbers into digits, tests evenness, and distributes work round-robin. SQLite prints `%` results as integers, so parity and remainder checks are exact and deterministic.",
  "date() and time()": "`date('now')` returns today's date as text, `time('now')` the current time, and `datetime('now')` both. These read the clock, so their output depends on when the query runs — never rely on them in code-challenge expected output. For deterministic work, pass fixed dates: `date('2024-01-15')`.",
  "Strftime": "`strftime(format, date)` formats a date into any shape: `strftime('%Y', '2024-01-15')` is the year, `%m` the month, `%j` the day of year. It is the reporting tool — week numbers, ISO dates, month names from a stored timestamp. The format string controls exactly what comes out.",
  "Date arithmetic": "SQLite adds and subtracts date parts: `date('2024-01-01', '+7 days')` is a week later. The modifiers are strings — days, months, years, hours — and compose: `date(start, '+1 month', '-1 day')`. Date math is how reports build ranges like \"last 30 days\".",
  "SELECT DISTINCT": "`SELECT DISTINCT column` returns one row per unique value, removing duplicates from the result. It is the fastest way to answer \"what values actually exist here?\". DISTINCT applies to the whole selected row, so multi-column DISTINCT dedupes on the combination.",
  "Counting distinct": "`COUNT(DISTINCT column)` counts how many different values a column holds — unique customers, distinct cities. It combines DISTINCT with aggregation in one expression. It is the standard distinct-count metric and stays exact on any data size.",
  "Dedup vs group": "DISTINCT removes duplicates; GROUP BY groups rows and, with an aggregate, summarizes them. DISTINCT cannot count or sum per value — GROUP BY can. When you only need the unique list, DISTINCT is simpler; when you need per-value stats, GROUP BY is the tool.",
  "NULL semantics": "NULL means \"no value\" and follows its own rules: it is not equal to anything (even another NULL), and any arithmetic or comparison involving NULL yields NULL. Test it with `IS NULL` and `IS NOT NULL`. Model NULL as \"unknown\", not \"zero\".",
  "COALESCE": "`COALESCE(a, b, c)` returns the first argument that is not NULL, and NULL if all of them are. It is the standard way to replace missing values with a default: `COALESCE(city, 'unknown')`. Fallbacks read left to right, with your last argument as the safety net.",
  "IFNULL": "`IFNULL(a, b)` is SQLite's two-argument shorthand for COALESCE: return b when a is NULL, otherwise a. It is the specific, readable tool when you have exactly one fallback. COALESCE generalizes it to any number of arguments.",
  "CREATE VIEW": "`CREATE VIEW name AS SELECT ...` saves a query under a name. Views hold no data of their own — they rerun the underlying SELECT each time they are queried. They are the \"saved query\" that hides joins and filters behind a clean, table-like name.",
  "Querying views": "You query a view exactly like a table: `SELECT region FROM total_by_region;`. Its columns come from its SELECT, and it can be joined and filtered further. Because it is just a stored query, the result is always current with the underlying data.",
  "Why views": "Views package a complicated query into a simple, stable name — one place to change the logic, many places to read it. They also constrain access: hand a user a view instead of raw tables. Views are the first abstraction a schema grows.",
  "CREATE INDEX": "`CREATE INDEX idx_name ON table (column)` builds an index for fast lookups on that column. The index is a sorted structure the engine can search in logarithmic time instead of scanning every row. Indexes never change query results — only how fast they run.",
  "Why indexes help": "Without an index, a WHERE match scans every row. With one, the engine jumps straight to the matching entries. Indexes shine on large tables with selective filters and JOIN keys; small tables and write-heavy workloads rarely need them.",
  "EXPLAIN QUERY PLAN": "`EXPLAIN QUERY PLAN SELECT ...` shows how SQLite intends to run a query — whether it will SCAN the table row by row or SEARCH via an index. It is the first tool of query tuning and answers \"is my index actually being used?\". Its exact text varies by SQLite version, so treat it as a diagnostic, not a contract.",
  "BEGIN and COMMIT": "`BEGIN;` opens a transaction and `COMMIT;` makes its changes permanent. Everything between them is one unit: either all of it is saved or none of it is. Without COMMIT, changes vanish when the session ends.",
  "ROLLBACK": "`ROLLBACK;` abandons everything since the last BEGIN, undoing the whole transaction. It is the escape hatch for mistakes — update fifty rows, spot the error, revert them all at once. ROLLBACK is why transactions make dangerous operations survivable.",
  "Atomicity": "Atomicity means a transaction is all-or-nothing: partial states are never visible, not even for a moment. Two-step operations like \"deduct from A, credit to B\" stay consistent even if the second step fails. It is the A in ACID and why transfers do not lose money.",
  "First normal form": "A table is in first normal form when every cell holds a single value and each row is unique. The rule: no comma-separated lists inside a column, no repeating groups of columns. Split each atomic fact into its own cell — that is where 1NF starts.",
  "Second normal form": "Second normal form removes partial dependencies: every non-key column must depend on the whole key, not just part of it. In a table keyed by (order_id, product_id), a product's name depends only on product_id and must move out. 1NF is about atomic cells; 2NF is about the full key.",
  "Redundancy": "Redundancy is the same fact stored in more than one place — the customer's name in every row of an orders table. It wastes space and, worse, lets facts drift apart when one copy updates and another does not. Normalization exists to eliminate redundancy, and redundancy is your signal that a design is broken.",
  "Third normal form": "Third normal form removes transitive dependencies: a non-key column must not depend on another non-key column. If department_name depends on department_id (a non-key), it moves to its own table. 3NF is the standard target — updates happen in exactly one place.",
  "Transitive dependencies": "A transitive dependency chains through another column: employee → department_id → department_name. The name is stored once per employee instead of once per department, inviting inconsistency. Removing the chain — giving department its own table — is what pushes a schema into 3NF.",
  "A normalized schema": "A normalized schema is many small, single-purpose tables joined by keys: authors, books, and a join table between them. Each fact lives once, so updates are simple and consistent. The cost is more JOINs at query time — a price that beats duplicated data.",
  "Planning tables": "Good schema design starts before the first CREATE TABLE: list the nouns (entities), their attributes, and how they relate. Every entity becomes a table, every attribute a column, every relationship a key. Sketch it on paper first; the SQL writes itself after that.",
  "Relationships": "Tables relate one-to-one, one-to-many, or many-to-many. One-to-many is a foreign key on the \"many\" side; many-to-many needs a join table with two foreign keys. Naming the relationship type before designing columns prevents classic mistakes like burying a list in a single cell.",
  "Data types": "Choose the type that matches the meaning: INTEGER for counts and IDs, REAL for continuous numbers, TEXT for names and codes, and date/time as text in SQLite. Right types keep comparisons honest and storage small. A column's type is a promise about what can go in it.",
  "ADD COLUMN": "`ALTER TABLE users ADD COLUMN age INTEGER;` adds a new column to an existing table. Existing rows get the column's default or NULL automatically. It is the safe, non-destructive way to grow a schema after data already exists.",
  "RENAME": "`ALTER TABLE books RENAME TO library_books;` renames a table; `ALTER TABLE books RENAME COLUMN title TO name;` renames a column. Renames are metadata changes that rewrite no data — fast and cheap. SQLite renames more freely than it drops, so renaming is the frequent migration move.",
  "DROP COLUMN": "`ALTER TABLE books DROP COLUMN year;` removes a column and its data. SQLite supports it from version 3.35 onward, with limits — no indexed, keyed, or check-constrained columns. Dropping is destructive and one-way, so confirm before running it.",
  "Percent wildcards": "In LIKE, `%` matches any sequence of characters, including none: `'A%'` is \"starts with A\", `'%ed'` is \"ends with ed\", `'%mid%'` is \"contains mid\". Percent is the wildcard for when the position or length is unknown.",
  "Underscore": "The `_` wildcard matches exactly one character. `LIKE 'b_t'` matches bat and bet but not boat; `LIKE '2024-__'` matches any two-digit month. Where `%` spans runs of any length, `_` pins a single position.",
  "Escaping": "To match a literal `%` or `_`, escape it with ESCAPE: `LIKE '100\\%' ESCAPE '\\'` matches the text \"100%\". The escape character is whatever you declare after ESCAPE. Escaping is how wildcard searches survive when the data itself contains wildcards.",
  "LIMIT and OFFSET": "`LIMIT n OFFSET m` returns n rows after skipping the first m — `LIMIT 10 OFFSET 20` is page 3 of 10-row pages. OFFSET is where the previous pages ended. The pair is the standard pagination mechanism.",
  "Page size": "Choose a page size that matches the UI: 10, 25, or 50 rows per page are common. Compute OFFSET as `(page - 1) * size` — page 1 is offset 0, page 2 is offset size. A consistent size keeps navigation simple: total_pages = ceil(total / size).",
  "Stable ordering": "Pagination needs a deterministic ORDER BY, or rows can shuffle between pages as the engine's natural order shifts. Ordering by the primary key or a unique column gives each row one stable slot. Without stable ordering, offset pagination can skip or duplicate rows.",
  "ROW_NUMBER": "`ROW_NUMBER() OVER (ORDER BY col)` assigns each row a sequential number within the window, starting at 1. It is the ranking function used for \"first N per group\" and precise pagination. Ties get distinct numbers — no two rows share a row_number.",
  "RANK": "`RANK() OVER (ORDER BY score)` numbers rows but gives ties the same rank and then skips: two rows tied for 1st make the next rank 3. `DENSE_RANK()` skips nothing, going 1, 1, 2. Choose RANK when tied places should leave a gap.",
  "OVER and PARTITION BY": "`OVER` defines a window of rows for the function, and `PARTITION BY` splits that window into groups: `ROW_NUMBER() OVER (PARTITION BY region ORDER BY sales DESC)` ranks sales within each region. Without PARTITION BY the window is the whole result. Window functions compute per-row values without collapsing rows the way GROUP BY does.",
  "WITH syntax": "`WITH name AS (SELECT ...) SELECT ... FROM name;` names a subquery up front so the main query reads cleanly. Multiple CTEs are comma-separated before the main SELECT. CTEs are how you give multi-step queries a name for each step.",
  "Named queries": "A CTE is a named, reusable query within a single statement — define it once, reference it several times. It reads like a pipeline of named steps and can be tested one block at a time. Unlike a view, a CTE lives only for the statement that declares it.",
  "Recursive CTEs": "A recursive CTE calls itself: `WITH RECURSIVE cnt(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM cnt WHERE n < 10) SELECT n FROM cnt;` builds 1..10. The anchor SELECT starts the recursion and the recursive SELECT adds each next level until the condition stops it. Recursive CTEs generate sequences, walk trees, and traverse graphs.",
  "Index usage": "A query benefits from an index when it filters, sorts, or joins on an indexed column — and the planner chooses it. EXPLAIN QUERY PLAN shows whether it SEARCHes the index or SCANs the whole table. Writing a filter is not enough; the index must exist and match the column used.",
  "Scan vs seek": "A full table scan reads every row; an index seek jumps to the matching subset. On a million-row table a scan is a million reads, a seek a handful. The planner picks between them, but you control the material: indexes on the columns your WHERE and JOIN actually use.",
  "The relational model": "The relational model stores facts in tables with typed columns and relates them through keys. Queries express what you want — the data to select, the conditions to filter — and the engine figures out how. It is fifty years old, battle-tested, and the default answer for structured data.",
  "When SQL fits": "SQL is the right tool when data is structured, related, and needs consistent transactions — orders, users, inventory, accounting. Its power is ad-hoc questions: join these, aggregate those, answer in one statement. If your data has relations and you care about correctness, SQL earns its keep.",
  "NoSQL trade-offs": "NoSQL databases trade relational guarantees for flexibility or scale: document stores keep whole records together, key-value stores offer speed and simplicity. You lose JOINs, referential integrity, and ad-hoc query power — or must hand-roll them. The best tooling is rarely \"SQL or not\"; it is knowing your data's shape and access patterns.",
  "Schema design": "A library database is the classic design exercise: members, books, and loans as tables, with keys tying them together. Members hold reader identity, books hold catalog identity, and loans join them with their own history. Draw the entities and relationships first, then CREATE TABLE.",
  "Seed data": "Seed data is a small, realistic set of rows inserted so queries have something real to answer. A few members, a few books, a few loans — enough to exercise every join and report. Seed data turns an empty schema into a demonstrable, testable system.",
  "Reporting queries": "The payoff of a designed schema is reporting: counts of loans, overdue books by member, popular titles. Each report is a SELECT that joins tables and aggregates them into an answer. When every report reads as a short, obvious query, the schema has done its job.",
  "Computed columns": "SELECT can output values that exist in no column — `price * qty` computes a line total per row on the fly. Computed columns turn stored facts into answers without changing the data. Any expression the database understands can become an output column.",
  "Arithmetic in SELECT": "SQL does arithmetic inside SELECT: `+ - * / %` over numeric columns and literals. `price * qty` multiplies two columns row by row; mixing INTEGER and REAL promotes the result to REAL. Arithmetic in the select list keeps derived numbers next to the rows they describe.",
  "String concatenation": "SQLite joins text with the `||` operator: `'Ada' || ' ' || 'Lovelace'` makes one full name. Concatenation builds labels, messages, and composite keys inside the query. If either side is NULL the result is NULL, so wrap nullable parts in COALESCE.",
  "DISTINCT on one column": "`SELECT DISTINCT city` collapses repeats into one row per value. It answers \"which values occur?\" without caring how many times. Single-column DISTINCT is the cheapest possible unique-list query.",
  "DISTINCT on multiple columns": "DISTINCT applies to the whole selected row: `SELECT DISTINCT city, day` dedupes on the combination. Two rows sharing a city but not a day both survive. Multi-column DISTINCT finds unique pairs, triples, and full-row duplicates.",
  "OFFSET mechanics": "`LIMIT n OFFSET m` skips the first m rows, then returns n — `LIMIT 10 OFFSET 20` is page three of ten-row pages. OFFSET counts from zero, so page p of size s starts at `(p - 1) * s`. Simple, but the database still walks every skipped row.",
  "Keyset pagination": "Keyset pagination replaces OFFSET with a filter on the last seen key: `WHERE id > 42 ORDER BY id LIMIT 10`. Each page starts exactly where the previous one ended, immune to rows inserted or deleted mid-browse. It needs a unique, ordered column — usually the primary key.",
  "Ties and deterministic pages": "OFFSET is only stable when ORDER BY is total: ties in the sort key can shuffle rows between pages. Order by a unique column (or add the primary key as the final sort key) so every row has exactly one slot. Deterministic order is what makes page two contain what page one promised.",
  "GLOB patterns": "GLOB matches text with Unix-file wildcards: `*` for any run, `?` for one character, `[abc]` for a set. Unlike LIKE it is case-sensitive — `'*.txt'` never matches `'Report.TXT'`. GLOB is the precise tool when case matters.",
  "Case sensitivity": "SQLite's LIKE is case-insensitive for ASCII by default while GLOB and `=` on text are case-sensitive. `'Report.TXT' LIKE '%.txt'` matches; the same pattern with GLOB does not. Know which comparison your query uses before trusting a filter on mixed-case data.",
  "ESCAPE clauses": "LIKE and GLOB can match their own wildcards literally with ESCAPE: `LIKE '100\\%' ESCAPE '\\'` finds the text 100%. The escape character you declare strips special meaning from the next character. Escaping keeps pattern searches correct when the data contains `%`, `_`, or `*`.",
  "COUNT(*) vs COUNT(column)": "`COUNT(*)` counts rows; `COUNT(column)` counts non-NULL values in that column. A nullable column makes the two differ — empty slots count as rows but not as values. Pick `*` for \"how many rows\" and a column for \"how many known values\".",
  "COUNT(DISTINCT column)": "`COUNT(DISTINCT email)` counts each different value once — unique users, not signups. It merges dedup and aggregation into one pass. It is the standard distinct-count metric behind \"how many unique X\" reports.",
  "COUNT with filters": "COUNT obeys WHERE and HAVING like any aggregate: `COUNT(*) ... WHERE city = 'London'` counts only matching rows. Conditional counting — `COUNT(CASE WHEN ...)` or filtered subqueries — splits one table into per-segment totals. Filters decide what gets counted, not just what gets shown.",
  "SUM ignores NULLs": "SUM and AVG skip NULLs entirely: the total of 10, NULL, 30 is 40, not NULL. Missing values contribute nothing instead of poisoning the result. If you need NULLs to count as zero, COALESCE them first — otherwise the aggregate quietly pretends they are absent.",
  "AVG denominators": "AVG divides by the count of non-NULL values, not by the row count: AVG of 10, NULL, 30 is 20, not 13.33. The denominator is \"values seen\", which surprises anyone expecting NULLs to drag the mean down. For an average over all rows, COALESCE the NULLs to zero first.",
  "Sums over filtered rows": "A WHERE before SUM restricts what is totaled: `SELECT SUM(amount) FROM revenue WHERE day <= 2` sums two days, not three. Filtering first is how period totals, per-status sums, and conditional revenue are built. The filter runs before the aggregate ever sees a row.",
  "MIN and MAX on text": "MIN and MAX work on text by collation order: MIN of pear, apple, fig is apple. On dates stored as ISO text they give earliest and latest for free. Extremes are type-agnostic — whatever ordering the type defines, MIN/MAX honor.",
  "TOTAL vs SUM": "SUM returns NULL over zero rows while TOTAL returns 0.0 — TOTAL never yields NULL, which makes it safer for arithmetic and display. Use SUM when \"no rows\" should stay unknown, TOTAL when it should read as zero.",
  "Aggregates over empty sets": "Aggregates over an empty input return NULL (or 0/0.0 for COUNT/TOTAL) with no error — `SUM` of nothing is NULL, not a crash. A query that matches zero rows still returns one summary row. Guard with COALESCE when downstream math needs a real number.",
  "GROUP_CONCAT basics": "`GROUP_CONCAT(name)` folds a group's values into one comma-separated string. It is the aggregate for lists: members per team, tags per post. Aggregation collapses rows into one value — GROUP_CONCAT just chooses text as the shape.",
  "Custom separators": "`GROUP_CONCAT(name, ';')` joins with your separator instead of a comma. Pick one that cannot appear in the data — semicolons, pipes, newlines. The separator is presentation, so choose whatever the consumer parses.",
  "DISTINCT inside GROUP_CONCAT": "`GROUP_CONCAT(DISTINCT name)` lists each value once even when it repeats across rows. Dedup inside the aggregate keeps tag lists and member lists clean. Combine with a separator for a tidy unique list in one cell.",
  "Composite grouping keys": "GROUP BY accepts several columns at once: `GROUP BY year, region` makes one group per distinct pair. Composite keys build nested summaries — sales per region within each year. Each added column multiplies the groups and sharpens the picture.",
  "GROUP BY with ORDER BY": "Grouped output has no natural order, so add ORDER BY to arrange it: `GROUP BY region ORDER BY SUM(amount) DESC` ranks groups by their totals. Sort by the grouping key for stable reports, by the aggregate for leaderboards. Ordering is cosmetic — it never changes the groups.",
  "Group cardinality": "Cardinality is how many groups a GROUP BY produces — distinct values for one column, distinct combinations for several. High-cardinality groupings (per user, per day) return many thin rows; low-cardinality ones (per region) return few thick rows. Know your cardinality before promising a dashboard it scales.",
  "HAVING on aggregates": "HAVING tests the group's summary: `HAVING SUM(amount) > 200` keeps only big spenders. It runs after grouping, so aggregates are legal where WHERE forbids them. Every HAVING condition is a bar the whole group must clear.",
  "HAVING without GROUP BY": "HAVING works without GROUP BY too — the whole result becomes one implicit group. `SELECT SUM(x) FROM t HAVING SUM(x) > 10` returns a row only when the total clears the bar. It is a compact idiom for \"answer only if the threshold holds\".",
  "Multiple HAVING conditions": "HAVING takes AND/OR like any filter: `HAVING SUM(a) > 100 AND COUNT(*) >= 3` demands both volume and size. Complex bars compose from simple ones. Each condition sees the same group summary, so they combine freely.",
  "Row filters before grouping": "WHERE runs before GROUP BY: it decides which rows may form groups at all. `WHERE n > 10` drops small events before any counting happens. Pre-filtering keeps irrelevant rows out of every summary, not just out of the display.",
  "Group filters after aggregation": "HAVING runs after GROUP BY: it judges finished groups by their summaries. WHERE picks the ingredients, HAVING picks the dishes. A query with both filters twice — once on rows, once on groups.",
  "Combining both clauses": "The full pipeline reads WHERE → GROUP BY → HAVING → ORDER BY → LIMIT: filter rows, form groups, filter groups, sort, cap. Each clause has exactly one job and one position. Writing them in pipeline order keeps even long queries readable.",
  "Employee-manager patterns": "A hierarchy table points at itself: each row's `boss` holds another row's id. Joining the table to itself on `boss = id` pairs every employee with their manager row. One table, one foreign key, and the whole org chart is queryable.",
  "Mandatory table aliases": "A self join mentions the same table twice, so aliases stop being optional: `FROM staff e JOIN staff m` gives the two roles names. Without aliases the database cannot tell employee columns from manager columns. Alias every self join — employee side and manager side.",
  "Multi-level hierarchies": "Chained self joins climb several levels: employee → manager → director is two joins on the same table. Each join ascends one rung using fresh aliases. For unknown depth, switch to a recursive CTE — fixed joins only reach as far as you write them.",
  "RIGHT JOIN concept": "RIGHT JOIN keeps every row of the right table, filling NULLs where the left has no match — the mirror of LEFT JOIN. It answers \"all of these, plus whatever matches\" from the other side. Conceptually symmetric; in practice rarely written.",
  "Rewriting as LEFT JOIN": "Every RIGHT JOIN rewrites as a LEFT JOIN with the tables swapped: `A RIGHT JOIN B` is `B LEFT JOIN A`. SQLite omits RIGHT JOIN entirely, so the rewrite is not style — it is the only spelling. Swap the tables, keep the condition, and the result is identical.",
  "SQLite's supported joins": "SQLite supports INNER, LEFT (OUTER), CROSS, and self joins — but no RIGHT or FULL OUTER JOIN syntax. Missing variants are emulated: LEFT JOIN with swapped tables, FULL OUTER with UNION. Knowing the supported set stops you writing syntax the engine will reject.",
  "FULL OUTER JOIN concept": "FULL OUTER JOIN keeps every row from both tables, NULL-filling whichever side lacks a match. It is the union of LEFT and RIGHT: matched pairs plus both kinds of orphans. The complete \"show me everything lined up\" join.",
  "UNION of two LEFT JOINs": "Emulate FULL OUTER JOIN as `left LEFT JOIN right UNION (right LEFT JOIN left WHERE left.key IS NULL)`. The first half contributes matches plus left orphans; the second adds right orphans only. UNION (not ALL) dedupes the shared middle.",
  "NULL on both sides": "In a FULL OUTER emulation each side's orphans arrive with NULLs on the other side's columns. COALESCE them for display: `COALESCE(r.w, 'none')`. NULL marks \"no counterpart here\" — the whole point of the outer join.",
  "IN as a semi join": "`WHERE id IN (SELECT ...)` returns left rows that have at least one match on the right — a semi join: it filters but never duplicates or adds columns. One left row yields at most one output row no matter how many right rows match. Semi joins test membership without joining data together.",
  "EXISTS short-circuits": "EXISTS stops scanning the instant it finds one matching row — it never counts, never collects. On a correlated subquery that early exit is a real performance win over building the full match set. Existence is cheaper than enumeration.",
  "Semi joins vs INNER JOIN": "INNER JOIN multiplies rows when several right rows match and carries right columns along; a semi join (IN/EXISTS) returns each left row at most once with left columns only. Use INNER JOIN to combine data, semi joins to filter by membership.",
  "Project schema design": "A shop database centers on customers, products, and the purchases between them: two entity tables plus a line-item table holding quantities. Prices live on products, counts on purchases — each fact in exactly one place. Design the entities before writing a single INSERT.",
  "Seed realistic data": "Seed data should exercise every relationship: two customers, two products at different prices, purchases covering single and multi-item baskets. Realistic seeds make totals hand-checkable — 3 pens at 2.0 plus a 10.0 book is 16.0 for Ada. If you cannot verify the seed by hand, it is too big.",
  "NOT EXISTS anti join": "NOT EXISTS returns left rows with zero matches on the right: `WHERE NOT EXISTS (SELECT 1 FROM banned b WHERE b.user_id = u.id)`. It reads as \"keep rows nothing points at\" and handles NULLs correctly. The anti join is the idiomatic \"unmatched rows\" query.",
  "LEFT JOIN with IS NULL": "An anti join written as `LEFT JOIN ... WHERE right.key IS NULL` keeps left rows whose join found nothing. The LEFT JOIN preserves every left row, then IS NULL discards the matched ones. Same answer as NOT EXISTS — pick whichever reads clearer in context.",
  "NOT IN and NULL pitfalls": "`NOT IN` with a NULL in the list matches nothing at all — `x NOT IN (1, NULL)` is never true, because NULL comparisons are never true. A single NULL in the subquery silently empties the result. Prefer NOT EXISTS, which has no such trap.",
  "Per-row inner queries": "A correlated subquery runs once per outer row with that row's values in scope: `WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept = e.dept)`. Each employee is compared against their own department's average, not the company-wide one. Per-row context is what makes correlation powerful — and expensive without indexes.",
  "Above-average-per-group": "The classic correlated query finds rows beating their group: above-average salary within each department. The inner query aggregates the group; the outer row tests itself against it. One statement replaces a round-trip per group.",
  "Correlated UPDATE patterns": "Correlation works in writes too: `UPDATE emp SET salary = salary * 1.1 WHERE salary < (SELECT AVG(salary) FROM ...)` raises only below-average rows. The same per-row test guards a bulk change. Always SELECT the affected rows first — updates cannot be previewed after the fact.",
  "Scalar values in SELECT": "A subquery returning one value can sit in the select list: `SELECT name, (SELECT COUNT(*) FROM orders WHERE customer_id = c.id) FROM customers c`. Each row carries its own computed number. Scalar subqueries in SELECT are per-row summaries without any GROUP BY.",
  "Derived tables in FROM": "A subquery in FROM is a derived table — a temporary result you SELECT from: `SELECT title FROM (SELECT title, rating FROM films WHERE year > 1970)`. The inner query shapes the data, the outer query finishes it. Alias the derived table when the outer query needs to reference it twice.",
  "Subqueries in ORDER BY": "ORDER BY accepts expressions, including subqueries: sort customers by their order count computed inline. It keeps one-off sort keys out of the select list. For repeated use, prefer a CTE or a joined aggregate — inline subqueries in ORDER BY are hard to read at a glance.",
  "Chained CTEs": "A CTE can reference an earlier CTE: `evens` filters the numbers, `doubled` doubles them. Each step names one transformation, and the final SELECT reads the last name. Chaining turns nested logic into a top-to-bottom pipeline.",
  "Multiple CTEs": "`WITH a AS (...), b AS (...) SELECT ...` declares several named queries up front. Later CTEs may use earlier ones, and the main query may use any of them. Multiple CTEs split a complex question into independently testable parts.",
  "CTEs vs subqueries": "CTEs and subqueries compute the same things — CTEs name each step once at the top, subqueries nest them inline. Prefer CTEs when a step is reused or the nesting runs deep; prefer subqueries for single-use one-liners. Readability, not power, decides.",
  "Anchor and recursive members": "A recursive CTE has two parts: the anchor SELECT producing the first rows, and the recursive SELECT producing each next level from the previous one. `SELECT 1 UNION ALL SELECT n + 1 FROM cnt WHERE n < 5` starts at 1 and grows. Anchor seeds, recursion extends.",
  "UNION ALL recursion": "The recursive member must use UNION ALL, not UNION: duplicates are part of the process and dedup would break or slow the iteration. Each round appends new rows until the WHERE stops producing them. UNION ALL is the engine of the loop.",
  "Termination conditions": "Without a stopping WHERE, recursion never ends — SQLite caps it at a depth limit and errors. `WHERE n < 5` bounds the sequence; parent-exists checks bound tree walks. Every recursive CTE needs a condition that eventually yields zero new rows.",
  "Walking org charts": "A recursive CTE climbs a self-referencing table: start at the root row, repeatedly join children to the chain built so far. One query returns the whole subtree no matter how deep. Fixed self joins reach a fixed depth; recursion reaches whatever exists.",
  "Depth tracking": "Carry a depth counter through the recursion: anchor at 0, add 1 per level. Depth orders the output (deepest last), limits it (`WHERE depth < 3`), and measures the tree. A counter column turns a walk into a leveled traversal.",
  "Path building": "Accumulate a path string as you recurse: `'root' || '/' || name` per level gives `root/a/b`. Paths show where each row sits in the tree at a glance. String building inside recursion is how trees become browsable breadcrumbs.",
  "ROW_NUMBER basics": "`ROW_NUMBER() OVER (ORDER BY col)` numbers rows 1..N in window order with no ties — every row gets a distinct number. It is the tool for \"first N rows\" and exact pagination. Ties break arbitrarily, so add a unique column to the ORDER BY when determinism matters.",
  "RANK with gaps": "RANK gives tied rows the same number, then skips: two rows tied at 1 make the next rank 3. Gaps reflect how many rows truly precede each row. Use RANK when \"3rd place after a two-way tie\" is the honest label.",
  "DENSE_RANK without gaps": "DENSE_RANK also ties rows equally but never skips: 1, 1, 2. Consecutive ranks suit tiering — gold, silver, bronze with no missing medals. RANK counts rows before you; DENSE_RANK counts distinct values before you.",
  "LAG previous rows": "`LAG(col) OVER (ORDER BY day)` reads the previous row's value — yesterday's temperature beside today's. Subtracting gives the delta in one pass. The first row's LAG is NULL: there is no previous row yet.",
  "LEAD next rows": "LEAD is LAG mirrored: it reads the next row's value instead of the previous one. `LEAD(t) OVER (ORDER BY day)` puts tomorrow beside today for forward-looking deltas. Together LAG and LEAD turn sequences into pairwise comparisons.",
  "NTILE buckets": "`NTILE(4) OVER (ORDER BY score)` splits rows into four near-equal buckets — quartiles from one function. Bucket numbers label each row's band without manual cutoffs. NTILE distributes rows evenly; value ranges per bucket may still differ.",
  "ROWS BETWEEN frames": "A frame narrows the window to nearby rows: `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` means \"this row plus everything before it\". Frames define running totals, moving averages, and sliding windows. The frame is the window function's sense of \"nearby\".",
  "Running totals": "SUM over an expanding frame is a running total: each row shows the sum of everything up to itself. `SUM(amount) OVER (ORDER BY day ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` accumulates day by day. One pass replaces a self join per row.",
  "Moving averages": "AVG over a bounded frame smooths noise: `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` averages each row with its two predecessors. Moving averages reveal trends that raw daily values hide. Frame size is the smoothness dial.",
  "INTERSECT": "INTERSECT returns only rows present in both SELECTs: shared cities, common members. It is set logic's \"and\" — membership in both lists at once. Like UNION, both sides need matching column counts and types.",
  "EXCEPT": "EXCEPT returns rows in the first SELECT but not the second: customers without orders, products never sold. It is set difference — \"these minus those\". EXCEPT answers absence questions no join states as directly.",
  "Set-operator precedence": "Compound SELECTs evaluate INTERSECT before UNION/EXCEPT unless parentheses say otherwise. `A UNION B INTERSECT C` means A UNION (B INTERSECT C). Parenthesize compound sets explicitly — precedence surprises are silent, returning plausible but wrong rows.",
  "UNION dedup cost": "UNION removes duplicates, which requires sorting or hashing the combined result — real work on big sets. When you know the inputs cannot overlap (or overlaps are fine), that work is pure overhead. UNION's cleanliness has a price; pay it only when dedup matters.",
  "UNION ALL speed": "UNION ALL skips the dedup pass and concatenates results directly — always at least as fast as UNION. Logs, line items, and pre-deduped inputs are UNION ALL's natural habitat. Default to ALL; switch to UNION only when duplicates would corrupt the answer.",
  "ORDER BY over unions": "In a compound SELECT, ORDER BY applies once to the whole result and column names come from the first SELECT: `... UNION ... ORDER BY 1`. You cannot sort the halves independently. One result, one ordering, decided at the end.",
  "CREATE VIEW with joins": "Views shine over joins: `CREATE VIEW catalog AS SELECT ... FROM writers JOIN novels ...` hides the pairing behind one name. Consumers SELECT from the view as if it were a table. The join logic lives in exactly one place.",
  "DROP VIEW": "`DROP VIEW name` removes a view without touching its underlying tables — data survives, only the saved query goes. Views are metadata, so dropping is instant and safe. Recreate freely when the logic changes.",
  "Views stay current": "A view reruns its query on every access, so it always reflects current tables — inserts appear immediately with no refresh step. Staleness is impossible by construction. The cost is recomputation per read, which indexes on the base tables keep cheap.",
  "Updatable view limits": "Simple views over one table accept INSERT/UPDATE directly; views with joins, aggregates, or DISTINCT are read-only. SQLite routes single-table view writes to the base table automatically. Anything more complex needs an explicit trigger.",
  "INSTEAD OF triggers": "An INSTEAD OF trigger on a view replaces the write with your logic: `INSTEAD OF INSERT ON v_people` inserts into the real table. The view becomes writable on your terms. This is how join views and filtered views gain controlled writes.",
  "Routing writes": "INSTEAD OF triggers route each write to the right base table: split a joined view's NEW row into two inserts. The trigger body is the write path — validate, split, and store. Reads stay declarative while writes follow your procedure.",
  "Composite indexes": "One index can cover several columns: `CREATE INDEX idx ON events (kind, ts)` speeds filters on kind, and on kind-plus-ts together. Multi-column indexes serve multi-column queries the way single ones serve single filters. Build them for the queries you actually run.",
  "Column order": "In a composite index, order matters: the index serves filters on its leftmost columns. `(kind, ts)` helps `WHERE kind = ?` but not `WHERE ts = ?` alone. Put the most-filtered, most-selective column first — leading columns decide what the index can answer.",
  "Covering indexes": "An index containing every column a query needs answers it without touching the table — a covering index. `SEARCH ... USING COVERING INDEX` in the plan is the tell. Covering turns lookups into pure index walks.",
  "EXPLAIN QUERY PLAN syntax": "`EXPLAIN QUERY PLAN SELECT ...` prefixes any query and returns its plan as rows: SCAN lines for full reads, SEARCH lines for index use. It never runs the query — it describes the run. Every tuning session starts here.",
  "SCAN vs SEARCH lines": "SCAN means the engine reads the whole table; SEARCH means it seeks via an index to matching rows. A selective WHERE with a SCAN plan is the classic \"missing index\" smell. The plan vocabulary is small — SCAN, SEARCH, USE TEMP B-TREE — and each word prescribes a fix.",
  "Version-dependent text": "Plan text includes node ids and index names that shift between SQLite versions — `2|0|56|SEARCH ...` numbers are not stable output. Read plans for their shape (SCAN vs SEARCH), never as exact strings. Diagnostics, not contracts: assert behavior, not plan text.",
  "Forcing index use": "To compare plans, create the index and re-run EXPLAIN: SCAN should become SEARCH on the indexed column. The before/after pair proves the index matters. If the plan does not change, the filter may not be selective enough for the planner to care.",
  "Comparing plans": "Tuning is diffing plans: capture EXPLAIN output before the change, capture it after, and read what moved. SCAN→SEARCH is a win; new USE TEMP B-TREE for sorting may need its own index. Change one thing at a time or the diff lies.",
  "When plans change": "Plans change with data size, indexes, and SQLite versions — the planner adapts. A plan that was optimal at a thousand rows may flip at a million. Re-check plans after big loads and upgrades; yesterday's SEARCH can become tomorrow's SCAN.",
  "Multi-statement transfers": "A transfer is two UPDATEs — debit one account, credit another — wrapped in BEGIN...COMMIT. Between the statements the books are briefly unbalanced; after COMMIT they balance again. The transaction boundary is what makes two statements one fact.",
  "Balance invariants": "Money logic rests on invariants: total balances never change in a transfer, no account goes negative. Transactions enforce the first; CHECK constraints enforce the second. State every invariant, then enforce each with the mechanism that fits.",
  "COMMIT finality": "COMMIT makes every statement since BEGIN permanent and visible at once — readers never see the halfway state. Until COMMIT, everything is provisional and ROLLBACK can erase it. Finality is a single statement, not a gradual process.",
  "Atomicity recap": "Atomicity guarantees all-or-nothing: a committed transaction's every statement lands; a rolled-back one's every statement vanishes. Partial application is impossible by construction. It is why the transfer either moves money or moves nothing.",
  "Consistency guarantees": "Consistency means each transaction moves the database from one valid state to another — constraints hold before and after. Atomicity protects the unit, consistency protects the rules. Together they keep invariants true across crashes and mistakes.",
  "Isolation in SQLite": "Isolation hides uncommitted work from other connections: SQLite locks the database for writers, so concurrent transactions serialize. One writer at a time is simple and correct for most apps. Readers never block, writers take turns.",
  "SAVEPOINT syntax": "`SAVEPOINT name` marks a point inside a transaction; `ROLLBACK TO name` undoes everything after it; `RELEASE name` clears the marker. Savepoints nest — inner ones roll back less. They bring partial undo to all-or-nothing transactions.",
  "ROLLBACK TO": "ROLLBACK TO rewinds to the savepoint but keeps the transaction alive — later statements can still COMMIT. It discards the mistake, not the whole unit of work. Contrast with bare ROLLBACK, which abandons everything since BEGIN.",
  "RELEASE": "RELEASE removes a savepoint, merging its work into the enclosing transaction — the statements stay, the marker goes. Releasing is bookkeeping, not committing: nothing is durable until the outer COMMIT. Forget RELEASE and the savepoint simply lingers harmlessly.",
  "Ledger schema": "A ledger needs accounts (owners and balances) plus an audit table recording notable events. Money lives in one table, history in another — balances are state, audit rows are evidence. Two tables separate \"what is true\" from \"what happened\".",
  "Audit trigger": "A trigger with a WHEN clause logs selectively: `AFTER UPDATE ... WHEN NEW.balance > 100` records only big balances. The database watches itself — every qualifying change appends evidence with no app code. WHEN keeps the audit table signal, not noise.",
  "Transfer procedure": "The transfer procedure is BEGIN, debit, credit, COMMIT — plus the trigger firing mid-flight when thresholds cross. Procedure plus automation: the statements move money, the trigger notices. Wrap both in one transaction so money and evidence stay consistent.",
  "CHECK expressions": "CHECK constrains values with a boolean expression: `price REAL CHECK (price >= 0)` rejects negative prices at INSERT and UPDATE. The rule lives in the schema, so every writer obeys it without remembering. Violations abort the statement — no bad row ever lands.",
  "DEFAULT values": "DEFAULT supplies a value when INSERT omits the column: `status TEXT DEFAULT 'active'` fills 'active' automatically. Defaults make common cases terse while staying explicit in the schema. Omitted means defaulted, never accidental.",
  "Constraint violations abort": "A CHECK or UNIQUE violation aborts the offending statement with an error — the row is not stored, and inside a transaction nothing up to that point is either (unless caught). Aborts are loud by design: bad data fails visibly instead of slipping in quietly.",
  "ON DELETE CASCADE": "ON DELETE CASCADE deletes child rows automatically when their parent is deleted: remove a team and its players vanish too. Cascades keep referential integrity without manual cleanup. Powerful and irreversible — cascade only where orphans must never survive.",
  "ON DELETE SET NULL": "ON DELETE SET NULL keeps child rows but clears their foreign key when the parent is deleted: players remain, teamless. It suits optional relationships where children outlive parents. NULL marks \"was linked, now is not\" — query it with IS NULL.",
  "PRAGMA foreign_keys": "SQLite parses foreign keys but enforces them only with `PRAGMA foreign_keys = ON` per connection. Without it, cascades sleep and orphans accumulate silently. Enable the pragma in every session that writes related tables — declarations without enforcement are comments.",
  "Spotting repeating groups": "A flat table repeats facts: department name copied onto every worker row. Repeating groups are the 1NF alarm — one column holding several values, or one fact stored many times. Spot the repetition and you have found the next table to extract.",
  "Splitting tables": "Refactoring to 3NF moves each repeated fact to its own table with a key: departments out, `dept_id` stays. Rows shrink to IDs plus their own attributes. Splitting is mechanical — one entity per table, keys between them.",
  "Joining it back": "Normalized data reassembles with JOINs: workers joined to departments read exactly like the old flat table. Storage is split, presentation is whole. If the join reads as simply as the original, the refactor succeeded.",
  "Read vs write trade-offs": "Normalization optimizes writes (one place to update); denormalization optimizes reads (no joins to assemble). Every redundant copy buys read speed with write complexity — each update must touch all copies. Choose by workload: read-heavy dashboards denormalize, write-heavy ledgers normalize.",
  "Cached counters": "A `likes` counter on posts caches `COUNT(*)` from the likes table — reads become one column instead of an aggregate. The cache must be refreshed on every like, trading write work for read speed. Counters are the most common deliberate redundancy.",
  "Materialized summaries": "Materialized summaries precompute reports into tables: nightly revenue per region, refreshed by a job. Queries read answers instead of computing them. Staleness is the price — summaries lag the source by design, so they suit reports that tolerate yesterday's numbers.",
  "AFTER INSERT triggers": "An AFTER INSERT trigger runs once per inserted row after it lands: `AFTER INSERT ON orders BEGIN INSERT INTO order_log ... END`. It observes committed facts — the row exists and its values are final. Audit logging is the canonical use: record what happened, automatically.",
  "NEW row values": "Inside a trigger, NEW holds the row being written: `NEW.item`, `NEW.id`. NEW is how triggers see the data that fired them (OLD holds the pre-image for UPDATE/DELETE). Reference NEW to log, validate, or propagate the exact values.",
  "Audit tables": "Audit tables store append-only history: who changed what, when — an id plus a message per event. Triggers fill them without app code, so no writer can forget. History tables grow forever; archive or partition when size bites.",
  "BEFORE INSERT guards": "A BEFORE INSERT trigger inspects NEW before the row lands and can reject it: negative ages never reach the table. Guards run pre-commit, so rejected rows leave no trace. Validation in the database protects every writer, including future ones.",
  "RAISE(ABORT, ...)": "`SELECT RAISE(ABORT, 'message')` inside a trigger aborts the statement with your message. ABORT undoes the statement (or the transaction, if one is open and uncaught). Custom messages turn constraint failures into actionable errors.",
  "Enforcing rules": "Triggers enforce rules constraints cannot express: cross-table checks, conditional logic, custom messages. BEFORE triggers guard, AFTER triggers record, WHEN clauses scope. Rules in the database apply to every connection — no client can bypass them.",
  "FOR EACH ROW only": "SQLite fires triggers once per affected row — FOR EACH ROW is the only granularity. Inserting two rows fires the trigger twice, logging twice. Row-level firing is simple and predictable: one row in, one trigger run.",
  "No FOR EACH STATEMENT": "Many databases offer FOR EACH STATEMENT triggers that fire once per statement regardless of row count — SQLite has no such syntax. There is nothing to write, nothing to verify, and no output to gate. This lesson stays ungated: row-level behavior is already gated on the trigger days around it.",
  "Workarounds with temp tables": "Without statement triggers, emulate them: a row trigger writes to a TEMP staging table, and a later statement processes the batch. Collect per-row, act per-statement. Two-phase handling recovers most of what statement triggers provide.",
  "JSON text columns": "SQLite stores JSON as TEXT and queries it with the JSON1 functions — no special column type needed. Documents sit beside relational columns in the same row. TEXT storage plus JSON functions gives document flexibility inside a relational engine.",
  "json_extract paths": "`json_extract(data, '$.theme')` reads a nested value by path: `$` for the document, `.field` per level, `[0]` for array slots. Paths address any scalar inside the document. Extraction turns documents back into queryable values.",
  "json_object building": "`json_object('theme', 'dark', 'font', 14)` builds a JSON document from SQL values. Construct documents from relational data for APIs and exports. Building and extracting round-trip: object in, paths out.",
  "json_each table function": "`json_each` is a table-valued function turning a JSON array into rows: `FROM carts, json_each(carts.items)` yields one row per element. Arrays become joinable relations. Unnesting bridges document storage and set logic.",
  "Unnesting arrays": "Unnested elements behave like ordinary rows: filter them, count them, join them. `WHERE value = 'pen'` counts matching elements across all documents. One array column fans out into analyzable rows.",
  "Filtering extracted values": "Filters apply to extracted values exactly like columns — equality, ranges, LIKE. Push the filter into the same query as the unnesting to count or list matches. Documents filter as fluently as tables once unnested.",
  "FTS5 virtual tables": "`CREATE VIRTUAL TABLE docs USING fts5(title, body)` builds a full-text index over text columns. Virtual tables look like tables but are backed by an inverted index. FTS5 tokenizes, stems, and ranks — everything LIKE cannot do at scale.",
  "MATCH queries": "`WHERE docs MATCH 'desert'` finds documents containing the term — fast via the index, unlike `LIKE '%desert%'`. MATCH is the full-text operator: terms, phrases in quotes, column filters. One MATCH replaces several LIKEs and runs in logarithmic time.",
  "Tokenization basics": "FTS5 splits text into tokens (words, roughly) and indexes those — searches match tokens, not substrings. 'desert' matches the word desert, not 'deserted'. Tokenizers decide case folding and stemming; the default unicode61 lowercases and splits on punctuation.",
  "bm25 ranking": "`ORDER BY bm25(table)` ranks matches by relevance: rare terms score higher, short documents score higher. Best matches surface first instead of in rowid order. Ranking turns a match list into a results page.",
  "snippet highlights": "`snippet()` returns the matching text with the term marked, for result previews. Show users why each document matched. Snippets are presentation — MATCH finds, bm25 orders, snippet explains.",
  "Column filters": "FTS MATCH can target columns: `{title} : sql` matches sql in the title only. Scoped search beats global search when fields have different meanings. Column filters combine with phrases and boolean operators in one MATCH string.",
  "Daily deltas with LAG": "Period analytics starts with deltas: today's value minus LAG's yesterday, partitioned by metric. Deltas turn levels into changes — growth, not size. One window function replaces a self join per comparison.",
  "Running totals over time": "Analytics running totals accumulate over ordered rows: revenue-so-far by day. The expanding-frame SUM answers \"how much by now\" at every point. Totals over time are the backbone of progress charts.",
  "Week-over-week compare": "Self-joining a table to itself offset by seven days compares each day to its counterpart last week. Same-weekday comparisons remove weekly seasonality. Retention, revenue, and traffic all read cleaner week-over-week than day-over-day.",
  "ROW_NUMBER per partition": "`ROW_NUMBER() OVER (PARTITION BY region ORDER BY pts DESC)` ranks within each group independently — every region gets its own 1, 2, 3. Partitioned numbering scopes competition to the group. Top-N per group starts here.",
  "Top-N filter": "Wrap the ranked query and filter `WHERE rn = 1`: one row per group, the best by your ordering. The subquery ranks, the outer query keeps winners. Top-N per group is a window plus a filter — no GROUP BY can do this shape.",
  "Ties handling": "ROW_NUMBER breaks ties arbitrarily — exactly N rows per group, but which tied row wins is luck. For fair ties, rank with RANK/DENSE_RANK and keep `rnk = 1` (possibly more than N rows), or add a unique tiebreaker to the ORDER BY. Decide what ties mean before filtering.",
  "Cohort week grouping": "Cohorts group users by their first week: `MIN(week) GROUP BY user_id` assigns each user a cohort. Grouping by start time aligns lifecycles — week-one behavior compares across cohorts fairly. Cohorts turn timestamps into generations.",
  "Retention self join": "Retention joins activity to itself offset by one period: `a.week + 1 = b.week` pairs each user's consecutive weeks. Matches are retained users; misses are churn. The self join counts loyalty directly from raw logins.",
  "Percent retained": "Retention rate divides the retained count by the cohort size: `100.0 * retained / total`. Absolute counts mislead across different-sized cohorts; percentages compare fairly. Multiply by 100.0 (not 100) to keep the decimal part.",
  "ON CONFLICT DO NOTHING": "`INSERT ... ON CONFLICT(key) DO NOTHING` skips rows that would violate a unique constraint instead of erroring. Idempotent inserts — reruns change nothing. DO NOTHING suits seeds and syncs where \"already there\" is success.",
  "ON CONFLICT DO UPDATE": "`ON CONFLICT(key) DO UPDATE SET hits = hits + 1` turns a duplicate insert into an update — the UPSERT. Counters, last-seen timestamps, and caches all update-or-insert in one statement. Atomic read-modify-write with no race between SELECT and INSERT.",
  "excluded row values": "In DO UPDATE, `excluded` refers to the row that failed to insert: `SET hits = excluded.hits` takes the proposed value. The failed insert's values stay available for merging. excluded is the \"what you tried\" row beside the \"what is there\" row.",
  "Staged CTE pipelines": "Funnel queries stage CTEs: raw events, per-step user counts, then ratios. Each CTE is one funnel stage computed cleanly. Pipelines read top-to-bottom — stages in, conversion out.",
  "Conversion ratios": "Conversion divides each step's users by the first step's: signup users over visit users. Ratios need the stage counts first — hence the CTE. One division per step turns counts into a funnel shape.",
  "Funnel drop-off": "Drop-off is where users vanish between steps: visit 2 → signup 1 means half lost. The step with the steepest fall is the product problem. Funnels locate the leak; fixing it is product work, not SQL.",
  "Finding duplicates": "Duplicates hide in plain sight: `GROUP BY name, email HAVING COUNT(*) > 1` lists every repeated combination. Detection groups by the natural key and counts. Find first — deletion without a list is guessing.",
  "DELETE with rowid": "`DELETE WHERE rowid NOT IN (SELECT MIN(rowid) ... GROUP BY key)` keeps the first copy of each duplicate and removes the rest. MIN(rowid) elects the survivor; everything else goes. One statement dedupes the whole table.",
  "Filling NULLs": "Repair NULLs with targeted UPDATEs: `SET email = 'unknown' WHERE email IS NULL` or COALESCE in views. Backfill from sources when they exist; defaults when they do not. Clean data downstream starts with no NULLs where values are required.",
  "ADD COLUMN with defaults": "Migrations add columns without losing rows: `ADD COLUMN status TEXT DEFAULT 'active'` fills every existing row at once. Additive changes are safe — old queries keep working. Defaults make the new column meaningful from the first second.",
  "Backfilling data": "After adding a column, backfill special cases: `UPDATE users SET status = 'vip' WHERE ...` corrects the rows the default mislabels. Defaults handle the many, backfills handle the few. Verify with a SELECT per affected segment.",
  "Renaming tables": "`ALTER TABLE old RENAME TO new` renames without rewriting data — instant metadata surgery. Rename during migrations to version schemas (`users_v2`) or fix naming mistakes. Dependents (views, triggers) follow the rename in modern SQLite.",
  "sqlite_master inventory": "sqlite_master lists every table, index, view, and trigger: `SELECT name FROM sqlite_master WHERE type = 'index'`. The schema is queryable — audit it like data. Inventory queries answer \"what exists\" without opening a GUI.",
  "Missing-index smells": "Tables with selective WHERE columns but no matching index are slow queries waiting to happen. Compare sqlite_master's index list against your frequent filters. Every unindexed selective filter is a future SCAN.",
  "Audit checklists": "A performance audit checklist: inventory indexes, EXPLAIN the top queries, index the SCANs, re-check plans. Checklists turn tuning from art into procedure. Run the audit after every schema or workload change.",
  "Capstone schema": "The market database unites the track: sellers own goods, goods accumulate sales — entities plus two relationship depths. Foreign keys declare the shape; AUTOINCREMENT gives sales their history. Design once, query everything.",
  "Seed and constraints": "Capstone seeds must satisfy every constraint: valid seller ids on goods, positive quantities on sales. Seeds prove the schema accepts real data. If the seed violates a rule, the rule — or the seed — is wrong; decide loudly.",
  "Executive dashboard query": "The dashboard query joins sellers to goods to sales and aggregates revenue in one statement. One query, whole business: total revenue, per-seller breakdowns, best goods. When the capstone query reads cleanly, the hundred days did their job.",
  "Multi-table report queries": "Revenue is a three-table query: purchases joined to products for prices, summed into one number. Joins assemble the facts, aggregates summarize them. Every business question — revenue, best seller, top customer — is a join plus an aggregate away.",
};
/* ─── Quiz map ─── */

const SQL_QUIZ_MAP: Record<string, { q: string; opts: { id: string; text: string; correct?: boolean }[] }> = {
  "Tables and rows": {
    q: "In a relational database, a row represents:",
    opts: [
      { id: "a", text: "One record in a table", correct: true },
      { id: "b", text: "One column", correct: false },
      { id: "c", text: "One entire table", correct: false },
      { id: "d", text: "One database", correct: false },
    ],
  },
  "SQLite": {
    q: "What is SQLite?",
    opts: [
      { id: "a", text: "A self-contained, file-based relational database", correct: true },
      { id: "b", text: "A server you must install and run", correct: false },
      { id: "c", text: "A cloud-only database service", correct: false },
      { id: "d", text: "A programming language", correct: false },
    ],
  },
  "SELECT syntax": {
    q: "What does `SELECT name FROM pets;` do?",
    opts: [
      { id: "a", text: "Returns the name column from the pets table", correct: true },
      { id: "b", text: "Deletes the pets table", correct: false },
      { id: "c", text: "Creates a pets table", correct: false },
      { id: "d", text: "Adds a row to pets", correct: false },
    ],
  },
  "Columns and aliases": {
    q: "What does `SELECT name AS full_name` do?",
    opts: [
      { id: "a", text: "Renames the name column to full_name in the output", correct: true },
      { id: "b", text: "Renames the table", correct: false },
      { id: "c", text: "Filters which rows are returned", correct: false },
      { id: "d", text: "Creates a new column in the table", correct: false },
    ],
  },
  "WHERE clauses": {
    q: "What does WHERE do?",
    opts: [
      { id: "a", text: "Filters rows before they reach the result", correct: true },
      { id: "b", text: "Sorts the result", correct: false },
      { id: "c", text: "Groups the result", correct: false },
      { id: "d", text: "Renames columns", correct: false },
    ],
  },
  "Comparison operators": {
    q: "Which is SQL's equality operator?",
    opts: [
      { id: "a", text: "=", correct: true },
      { id: "b", text: "==", correct: false },
      { id: "c", text: "===", correct: false },
      { id: "d", text: "equals()", correct: false },
    ],
  },
  "ORDER BY": {
    q: "When does ORDER BY run relative to WHERE?",
    opts: [
      { id: "a", text: "After filtering", correct: true },
      { id: "b", text: "Before filtering", correct: false },
      { id: "c", text: "During INSERT", correct: false },
      { id: "d", text: "It never runs in SQLite", correct: false },
    ],
  },
  "ASC and DESC": {
    q: "What is the default ORDER BY direction?",
    opts: [
      { id: "a", text: "ASC", correct: true },
      { id: "b", text: "DESC", correct: false },
      { id: "c", text: "Random", correct: false },
      { id: "d", text: "The insertion order always", correct: false },
    ],
  },
  "LIMIT": {
    q: "LIMIT 10 caps what?",
    opts: [
      { id: "a", text: "How many rows the query returns", correct: true },
      { id: "b", text: "How many columns are selected", correct: false },
      { id: "c", text: "The size of the table", correct: false },
      { id: "d", text: "How deep the sort goes", correct: false },
    ],
  },
  "COUNT": {
    q: "COUNT(*) returns:",
    opts: [
      { id: "a", text: "The number of rows", correct: true },
      { id: "b", text: "The number of non-empty columns", correct: false },
      { id: "c", text: "The largest value", correct: false },
      { id: "d", text: "The sum of all values", correct: false },
    ],
  },
  "SUM and AVG": {
    q: "What does `SELECT SUM(amount) FROM sales;` return?",
    opts: [
      { id: "a", text: "The total of all amount values", correct: true },
      { id: "b", text: "The number of rows", correct: false },
      { id: "c", text: "The average amount", correct: false },
      { id: "d", text: "The largest amount", correct: false },
    ],
  },
  "MIN and MAX": {
    q: "MIN(column) returns:",
    opts: [
      { id: "a", text: "The smallest value in the column", correct: true },
      { id: "b", text: "The first row", correct: false },
      { id: "c", text: "The number of distinct values", correct: false },
      { id: "d", text: "A random value", correct: false },
    ],
  },
  "Grouping rows": {
    q: "GROUP BY region returns:",
    opts: [
      { id: "a", text: "One row per distinct region", correct: true },
      { id: "b", text: "All rows unchanged", correct: false },
      { id: "c", text: "One row per table", correct: false },
      { id: "d", text: "Only NULL regions", correct: false },
    ],
  },
  "Grouping with aggregates": {
    q: "What pairs naturally with GROUP BY?",
    opts: [
      { id: "a", text: "Aggregates like SUM and COUNT", correct: true },
      { id: "b", text: "LIKE", correct: false },
      { id: "c", text: "NULLIF", correct: false },
      { id: "d", text: "SUBSTR", correct: false },
    ],
  },
  "Multiple columns": {
    q: "GROUP BY year, month groups by:",
    opts: [
      { id: "a", text: "Each distinct combination of year and month", correct: true },
      { id: "b", text: "Year only", correct: false },
      { id: "c", text: "Month only", correct: false },
      { id: "d", text: "The first column of the table", correct: false },
    ],
  },
  "Filtering groups": {
    q: "Which clause filters groups after aggregation?",
    opts: [
      { id: "a", text: "HAVING", correct: true },
      { id: "b", text: "WHERE", correct: false },
      { id: "c", text: "GROUP BY", correct: false },
      { id: "d", text: "DISTINCT", correct: false },
    ],
  },
  "HAVING vs WHERE": {
    q: "What can HAVING reference that WHERE cannot?",
    opts: [
      { id: "a", text: "Aggregates", correct: true },
      { id: "b", text: "Column names", correct: false },
      { id: "c", text: "Table names", correct: false },
      { id: "d", text: "String literals", correct: false },
    ],
  },
  "Combined queries": {
    q: "In what order do clauses run in a grouping query?",
    opts: [
      { id: "a", text: "WHERE, GROUP BY, HAVING, ORDER BY", correct: true },
      { id: "b", text: "ORDER BY, WHERE, HAVING, GROUP BY", correct: false },
      { id: "c", text: "GROUP BY, WHERE, ORDER BY, HAVING", correct: false },
      { id: "d", text: "Any order produces the same result", correct: false },
    ],
  },
  "CREATE TABLE": {
    q: "CREATE TABLE does what?",
    opts: [
      { id: "a", text: "Declares a new table and its columns", correct: true },
      { id: "b", text: "Adds a row", correct: false },
      { id: "c", text: "Deletes a table", correct: false },
      { id: "d", text: "Copies a table", correct: false },
    ],
  },
  "Common types": {
    q: "Which of these is a core SQLite type?",
    opts: [
      { id: "a", text: "TEXT", correct: true },
      { id: "b", text: "Array", correct: false },
      { id: "c", text: "Object", correct: false },
      { id: "d", text: "Map", correct: false },
    ],
  },
  "INSERT INTO": {
    q: "INSERT INTO table VALUES (...):",
    opts: [
      { id: "a", text: "Adds a row to the table", correct: true },
      { id: "b", text: "Creates a table", correct: false },
      { id: "c", text: "Deletes a row", correct: false },
      { id: "d", text: "Reads a row", correct: false },
    ],
  },
  "Multiple rows": {
    q: "Which statement inserts two rows at once?",
    opts: [
      { id: "a", text: "INSERT INTO t VALUES (1), (2);", correct: true },
      { id: "b", text: "INSERT INTO t VALUES (1 2);", correct: false },
      { id: "c", text: "INSERT DOUBLE INTO t VALUES (1);", correct: false },
      { id: "d", text: "INSERT INTO t TWO (1), (2);", correct: false },
    ],
  },
  "Explicit columns": {
    q: "`INSERT INTO users (name, age) VALUES ('Ada', 36);` does what?",
    opts: [
      { id: "a", text: "Inserts a row setting only name and age", correct: true },
      { id: "b", text: "Requires every column to be filled", correct: false },
      { id: "c", text: "Fails without the id column", correct: false },
      { id: "d", text: "Creates new columns on the table", correct: false },
    ],
  },
  "UPDATE syntax": {
    q: "UPDATE table SET column = value without a WHERE:",
    opts: [
      { id: "a", text: "Updates every row in the table", correct: true },
      { id: "b", text: "Updates exactly one row", correct: false },
      { id: "c", text: "Fails with an error", correct: false },
      { id: "d", text: "Updates the schema", correct: false },
    ],
  },
  "WHERE with UPDATE": {
    q: "Why pair UPDATE with a WHERE clause?",
    opts: [
      { id: "a", text: "To target exactly which rows change", correct: true },
      { id: "b", text: "To make the update run faster", correct: false },
      { id: "c", text: "Because WHERE is required by SQLite", correct: false },
      { id: "d", text: "To sort the rows being updated", correct: false },
    ],
  },
  "Affected rows": {
    q: "If UPDATE's WHERE matches no rows:",
    opts: [
      { id: "a", text: "Nothing changes — zero rows affected", correct: true },
      { id: "b", text: "The whole table is erased", correct: false },
      { id: "c", text: "An error is thrown", correct: false },
      { id: "d", text: "A new row is created", correct: false },
    ],
  },
  "DELETE syntax": {
    q: "DELETE FROM tasks;",
    opts: [
      { id: "a", text: "Removes all rows but keeps the table", correct: true },
      { id: "b", text: "Removes the table", correct: false },
      { id: "c", text: "Removes the whole database", correct: false },
      { id: "d", text: "Keeps the rows but drops the columns", correct: false },
    ],
  },
  "Deleting subsets": {
    q: "DELETE FROM tasks WHERE done = 1;",
    opts: [
      { id: "a", text: "Removes only the rows where done is 1", correct: true },
      { id: "b", text: "Removes every row in the table", correct: false },
      { id: "c", text: "Sets done to 1 on every row", correct: false },
      { id: "d", text: "Fails if any row matches", correct: false },
    ],
  },
  "TRUNCATE concept": {
    q: "SQLite has no TRUNCATE. The equivalent is:",
    opts: [
      { id: "a", text: "DELETE FROM table;", correct: true },
      { id: "b", text: "DROP TABLE table;", correct: false },
      { id: "c", text: "CREATE TRUNCATE table;", correct: false },
      { id: "d", text: "SELECT * FROM table;", correct: false },
    ],
  },
  "PRIMARY KEY": {
    q: "A PRIMARY KEY column:",
    opts: [
      { id: "a", text: "Uniquely identifies each row and forbids NULLs", correct: true },
      { id: "b", text: "Can repeat across rows", correct: false },
      { id: "c", text: "Must be NULL", correct: false },
      { id: "d", text: "Can only hold text", correct: false },
    ],
  },
  "UNIQUE": {
    q: "A UNIQUE column:",
    opts: [
      { id: "a", text: "Forbids duplicate values", correct: true },
      { id: "b", text: "Forbids NULLs", correct: false },
      { id: "c", text: "Auto-numbers rows", correct: false },
      { id: "d", text: "Creates a view", correct: false },
    ],
  },
  "NOT NULL": {
    q: "NOT NULL means:",
    opts: [
      { id: "a", text: "The column must have a value in every row", correct: true },
      { id: "b", text: "The column cannot be indexed", correct: false },
      { id: "c", text: "The column is the primary key", correct: false },
      { id: "d", text: "The column defaults to 0", correct: false },
    ],
  },
  "INTEGER PRIMARY KEY": {
    q: "In SQLite, INTEGER PRIMARY KEY:",
    opts: [
      { id: "a", text: "Aliases the rowid and auto-increments", correct: true },
      { id: "b", text: "Must be filled manually", correct: false },
      { id: "c", text: "Only accepts text", correct: false },
      { id: "d", text: "Cannot be indexed", correct: false },
    ],
  },
  "AUTOINCREMENT": {
    q: "AUTOINCREMENT guarantees:",
    opts: [
      { id: "a", text: "IDs are never reused after deletion", correct: true },
      { id: "b", text: "IDs start at 100", correct: false },
      { id: "c", text: "Rows are kept sorted", correct: false },
      { id: "d", text: "NULLs are forbidden", correct: false },
    ],
  },
  "Row IDs": {
    q: "What id does an inserted row get with an INTEGER PRIMARY KEY?",
    opts: [
      { id: "a", text: "The next automatic integer", correct: true },
      { id: "b", text: "A random string", correct: false },
      { id: "c", text: "NULL", correct: false },
      { id: "d", text: "The row's position in the file", correct: false },
    ],
  },
  "REFERENCES": {
    q: "`author_id INTEGER REFERENCES authors(id)` declares:",
    opts: [
      { id: "a", text: "A foreign key to the authors table", correct: true },
      { id: "b", text: "A new authors table", correct: false },
      { id: "c", text: "A primary key", correct: false },
      { id: "d", text: "A unique constraint", correct: false },
    ],
  },
  "JOINs from keys": {
    q: "Foreign keys enable:",
    opts: [
      { id: "a", text: "Joining related tables on their key columns", correct: true },
      { id: "b", text: "Faster LIKE queries", correct: false },
      { id: "c", text: "Auto-incrementing ids", correct: false },
      { id: "d", text: "Renaming columns", correct: false },
    ],
  },
  "Integrity": {
    q: "Constraints exist to:",
    opts: [
      { id: "a", text: "Keep bad data out of the database", correct: true },
      { id: "b", text: "Speed up SELECT", correct: false },
      { id: "c", text: "Format query output", correct: false },
      { id: "d", text: "Name tables", correct: false },
    ],
  },
  "JOIN syntax": {
    q: "What does the ON clause of a JOIN do?",
    opts: [
      { id: "a", text: "States how rows from the two tables correspond", correct: true },
      { id: "b", text: "Sorts the joined rows", correct: false },
      { id: "c", text: "Limits the row count", correct: false },
      { id: "d", text: "Renames the output columns", correct: false },
    ],
  },
  "Matching rows": {
    q: "An INNER JOIN keeps:",
    opts: [
      { id: "a", text: "Only rows with a matching pair in both tables", correct: true },
      { id: "b", text: "Every left row even without a match", correct: false },
      { id: "c", text: "The first row of each table", correct: false },
      { id: "d", text: "Rows where the ON condition is false", correct: false },
    ],
  },

"Aliasing tables": {
    q: "Why alias tables as `FROM books b`?",
    opts: [
      { id: "a", text: "To qualify columns with a short prefix", correct: true },
      { id: "b", text: "To rename the database", correct: false },
      { id: "c", text: "To speed up queries", correct: false },
      { id: "d", text: "To avoid joining", correct: false },
    ],
  },
  "LEFT OUTER JOIN": {
    q: "A LEFT JOIN keeps:",
    opts: [
      { id: "a", text: "Every row of the left table, with NULLs where the right has no match", correct: true },
      { id: "b", text: "Only the rows that match in both tables", correct: false },
      { id: "c", text: "Only the right table's rows", correct: false },
      { id: "d", text: "Rows in neither table", correct: false },
    ],
  },
  "NULL for missing": {
    q: "When a LEFT JOIN finds no match, the right-side columns are:",
    opts: [
      { id: "a", text: "NULL", correct: true },
      { id: "b", text: "0", correct: false },
      { id: "c", text: "An empty string", correct: false },
      { id: "d", text: "The row is skipped", correct: false },
    ],
  },
  "Counting matches": {
    q: "To count real matches after a LEFT JOIN, count:",
    opts: [
      { id: "a", text: "A right-side column like COUNT(right.id)", correct: true },
      { id: "b", text: "The left table with COUNT(*)", correct: false },
      { id: "c", text: "The NULL values", correct: false },
      { id: "d", text: "Nothing — it is impossible", correct: false },
    ],
  },
  "CROSS JOIN": {
    q: "A CROSS JOIN produces:",
    opts: [
      { id: "a", text: "Every row of one table paired with every row of the other", correct: true },
      { id: "b", text: "Only the matching rows", correct: false },
      { id: "c", text: "One merged row", correct: false },
      { id: "d", text: "An error in SQLite", correct: false },
    ],
  },
  "Self joins": {
    q: "A self join requires:",
    opts: [
      { id: "a", text: "Table aliases, because the table appears twice", correct: true },
      { id: "b", text: "Two identical tables", correct: false },
      { id: "c", text: "A UNIQUE constraint", correct: false },
      { id: "d", text: "A recursive CTE", correct: false },
    ],
  },
  "When they help": {
    q: "Self joins model:",
    opts: [
      { id: "a", text: "Hierarchies like employees and managers", correct: true },
      { id: "b", text: "Cross-table totals", correct: false },
      { id: "c", text: "Page pagination", correct: false },
      { id: "d", text: "Column renaming", correct: false },
    ],
  },
  "UNION": {
    q: "UNION stacks two results and:",
    opts: [
      { id: "a", text: "Removes duplicate rows", correct: true },
      { id: "b", text: "Keeps duplicates", correct: false },
      { id: "c", text: "Joins them side by side", correct: false },
      { id: "d", text: "Sorts by primary key", correct: false },
    ],
  },
  "UNION ALL": {
    q: "UNION ALL:",
    opts: [
      { id: "a", text: "Keeps every row including duplicates", correct: true },
      { id: "b", text: "Removes duplicates", correct: false },
      { id: "c", text: "Requires identical tables", correct: false },
      { id: "d", text: "Returns only the first result", correct: false },
    ],
  },
  "Set logic": {
    q: "Which operator merges result sets like SQL's \"or\"?",
    opts: [
      { id: "a", text: "UNION", correct: true },
      { id: "b", text: "INTERSECT", correct: false },
      { id: "c", text: "EXCEPT", correct: false },
      { id: "d", text: "JOIN", correct: false },
    ],
  },
  "Scalar subqueries": {
    q: "A scalar subquery returns:",
    opts: [
      { id: "a", text: "A single value usable inside an expression", correct: true },
      { id: "b", text: "A full result set", correct: false },
      { id: "c", text: "A table name", correct: false },
      { id: "d", text: "A column list", correct: false },
    ],
  },
  "IN subqueries": {
    q: "`WHERE city IN (SELECT city FROM offices)` is:",
    opts: [
      { id: "a", text: "A membership test against a computed set", correct: true },
      { id: "b", text: "A string comparison", correct: false },
      { id: "c", text: "A table alias", correct: false },
      { id: "d", text: "An index creation", correct: false },
    ],
  },
  "Correlated basics": {
    q: "A correlated subquery:",
    opts: [
      { id: "a", text: "References the outer query's row", correct: true },
      { id: "b", text: "Runs once for the whole query", correct: false },
      { id: "c", text: "Cannot use aliases", correct: false },
      { id: "d", text: "Never uses indexes", correct: false },
    ],
  },
  "EXISTS": {
    q: "EXISTS is true when:",
    opts: [
      { id: "a", text: "The subquery returns at least one row", correct: true },
      { id: "b", text: "The subquery returns zero rows", correct: false },
      { id: "c", text: "The table exists", correct: false },
      { id: "d", text: "The column is indexed", correct: false },
    ],
  },
  "NOT EXISTS": {
    q: "NOT EXISTS is the idiomatic test for:",
    opts: [
      { id: "a", text: "Rows with no related records", correct: true },
      { id: "b", text: "Rows with many related records", correct: false },
      { id: "c", text: "Empty tables", correct: false },
      { id: "d", text: "Duplicate rows", correct: false },
    ],
  },
  "When to prefer it": {
    q: "Prefer EXISTS over NOT IN because it:",
    opts: [
      { id: "a", text: "Handles NULLs correctly and stops early", correct: true },
      { id: "b", text: "Is always shorter to write", correct: false },
      { id: "c", text: "Removes duplicates", correct: false },
      { id: "d", text: "Avoids joins entirely", correct: false },
    ],
  },
  "CASE WHEN": {
    q: "CASE returns:",
    opts: [
      { id: "a", text: "The value of the first WHEN that matches", correct: true },
      { id: "b", text: "All matching values", correct: false },
      { id: "c", text: "A boolean", correct: false },
      { id: "d", text: "The last WHEN always", correct: false },
    ],
  },
  "ELSE clauses": {
    q: "Without an ELSE, unmatched CASE rows return:",
    opts: [
      { id: "a", text: "NULL", correct: true },
      { id: "b", text: "0", correct: false },
      { id: "c", text: "The whole row", correct: false },
      { id: "d", text: "An empty string", correct: false },
    ],
  },
  "Value mapping": {
    q: "CASE is best used to:",
    opts: [
      { id: "a", text: "Map raw values to readable labels", correct: true },
      { id: "b", text: "Create tables", correct: false },
      { id: "c", text: "Join two tables", correct: false },
      { id: "d", text: "Build indexes", correct: false },
    ],
  },
  "UPPER and LOWER": {
    q: "UPPER(name) returns:",
    opts: [
      { id: "a", text: "name in all capital letters", correct: true },
      { id: "b", text: "name in lowercase", correct: false },
      { id: "c", text: "the length of name", correct: false },
      { id: "d", text: "name with spaces trimmed", correct: false },
    ],
  },
  "LENGTH": {
    q: "LENGTH('abc') returns:",
    opts: [
      { id: "a", text: "3", correct: true },
      { id: "b", text: "2", correct: false },
      { id: "c", text: "0", correct: false },
      { id: "d", text: "abc", correct: false },
    ],
  },
  "SUBSTR, TRIM, REPLACE": {
    q: "REPLACE(text, 'a', 'b') does what?",
    opts: [
      { id: "a", text: "Swaps every 'a' for 'b' in text", correct: true },
      { id: "b", text: "Deletes text", correct: false },
      { id: "c", text: "Slices a substring out of text", correct: false },
      { id: "d", text: "Uppercases text", correct: false },
    ],
  },
  "ROUND": {
    q: "ROUND(3.7) in SQLite returns:",
    opts: [
      { id: "a", text: "4.0", correct: true },
      { id: "b", text: "4", correct: false },
      { id: "c", text: "3.7", correct: false },
      { id: "d", text: "3", correct: false },
    ],
  },
  "ABS": {
    q: "ABS(-7) returns:",
    opts: [
      { id: "a", text: "7", correct: true },
      { id: "b", text: "-7", correct: false },
      { id: "c", text: "0", correct: false },
      { id: "d", text: "NULL", correct: false },
    ],
  },
  "Modulo and integer math": {
    q: "10 % 3 evaluates to:",
    opts: [
      { id: "a", text: "1", correct: true },
      { id: "b", text: "3", correct: false },
      { id: "c", text: "0", correct: false },
      { id: "d", text: "10", correct: false },
    ],
  },
  "date() and time()": {
    q: "date('now') returns:",
    opts: [
      { id: "a", text: "Today's date as text — it depends on the clock", correct: true },
      { id: "b", text: "A fixed timestamp", correct: false },
      { id: "c", text: "The current day of the week", correct: false },
      { id: "d", text: "A random date", correct: false },
    ],
  },
  "Strftime": {
    q: "strftime('%Y', '2024-01-15') returns:",
    opts: [
      { id: "a", text: "2024", correct: true },
      { id: "b", text: "01", correct: false },
      { id: "c", text: "15", correct: false },
      { id: "d", text: "2024-01", correct: false },
    ],
  },
  "Date arithmetic": {
    q: "date('2024-01-01', '+7 days') returns:",
    opts: [
      { id: "a", text: "2024-01-08", correct: true },
      { id: "b", text: "2024-01-07", correct: false },
      { id: "c", text: "2024-07-01", correct: false },
      { id: "d", text: "2024-01-14", correct: false },
    ],
  },
  "SELECT DISTINCT": {
    q: "SELECT DISTINCT item returns:",
    opts: [
      { id: "a", text: "One row per unique item value", correct: true },
      { id: "b", text: "All rows unchanged", correct: false },
      { id: "c", text: "Only the first item", correct: false },
      { id: "d", text: "A count per item", correct: false },
    ],
  },
  "Counting distinct": {
    q: "COUNT(DISTINCT column) counts:",
    opts: [
      { id: "a", text: "How many different values the column holds", correct: true },
      { id: "b", text: "How many rows there are", correct: false },
      { id: "c", text: "How many NULLs there are", correct: false },
      { id: "d", text: "The sum of the values", correct: false },
    ],
  },
  "Dedup vs group": {
    q: "When do you need GROUP BY instead of DISTINCT?",
    opts: [
      { id: "a", text: "When you want per-value summaries like counts or sums", correct: true },
      { id: "b", text: "When you want unique values", correct: false },
      { id: "c", text: "Never", correct: false },
      { id: "d", text: "When sorting", correct: false },
    ],
  },
  "NULL semantics": {
    q: "NULL compared with = is:",
    opts: [
      { id: "a", text: "Never true — even NULL = NULL is NULL", correct: true },
      { id: "b", text: "True for NULL = NULL", correct: false },
      { id: "c", text: "True when compared to 0", correct: false },
      { id: "d", text: "Always false with an error", correct: false },
    ],
  },
  "COALESCE": {
    q: "COALESCE(a, b, c) returns:",
    opts: [
      { id: "a", text: "The first argument that is not NULL", correct: true },
      { id: "b", text: "The last argument always", correct: false },
      { id: "c", text: "A random argument", correct: false },
      { id: "d", text: "The sum of the arguments", correct: false },
    ],
  },
  "IFNULL": {
    q: "IFNULL(a, b) returns:",
    opts: [
      { id: "a", text: "b when a is NULL, else a", correct: true },
      { id: "b", text: "a when b is NULL, else b", correct: false },
      { id: "c", text: "Always NULL", correct: false },
      { id: "d", text: "a + b", correct: false },
    ],
  },
  "CREATE VIEW": {
    q: "A view is:",
    opts: [
      { id: "a", text: "A named query that runs against the underlying tables", correct: true },
      { id: "b", text: "A copy of the table's data", correct: false },
      { id: "c", text: "An index", correct: false },
      { id: "d", text: "A trigger", correct: false },
    ],
  },
  "Querying views": {
    q: "How do you read from a view?",
    opts: [
      { id: "a", text: "Exactly like a table, with SELECT", correct: true },
      { id: "b", text: "With CALL", correct: false },
      { id: "c", text: "With IMPORT", correct: false },
      { id: "d", text: "Views cannot be queried", correct: false },
    ],
  },
  "Why views": {
    q: "The main benefit of a view is:",
    opts: [
      { id: "a", text: "Packaging a complex query behind a simple stable name", correct: true },
      { id: "b", text: "Faster disk reads", correct: false },
      { id: "c", text: "Automatic data copies", correct: false },
      { id: "d", text: "Constraint enforcement", correct: false },
    ],
  },
  "CREATE INDEX": {
    q: "An index:",
    opts: [
      { id: "a", text: "Speeds up lookups on a column without changing results", correct: true },
      { id: "b", text: "Changes query results", correct: false },
      { id: "c", text: "Stores a copy of the table", correct: false },
      { id: "d", text: "Is required for every query", correct: false },
    ],
  },
  "Why indexes help": {
    q: "Without an index, a WHERE match:",
    opts: [
      { id: "a", text: "Scans every row", correct: true },
      { id: "b", text: "Jumps straight to the match", correct: false },
      { id: "c", text: "Fails", correct: false },
      { id: "d", text: "Sorts the table first", correct: false },
    ],
  },
  "EXPLAIN QUERY PLAN": {
    q: "EXPLAIN QUERY PLAN reveals:",
    opts: [
      { id: "a", text: "How SQLite intends to run the query", correct: true },
      { id: "b", text: "The query's results", correct: false },
      { id: "c", text: "The table's contents", correct: false },
      { id: "d", text: "The database file size", correct: false },
    ],
  },
  "BEGIN and COMMIT": {
    q: "COMMIT makes a transaction's changes:",
    opts: [
      { id: "a", text: "Permanent", correct: true },
      { id: "b", text: "Temporary", correct: false },
      { id: "c", text: "Visible only to other users", correct: false },
      { id: "d", text: "Reversed", correct: false },
    ],
  },
  "ROLLBACK": {
    q: "ROLLBACK:",
    opts: [
      { id: "a", text: "Undoes everything since the last BEGIN", correct: true },
      { id: "b", text: "Saves the transaction", correct: false },
      { id: "c", text: "Closes the database", correct: false },
      { id: "d", text: "Deletes the table", correct: false },
    ],
  },
  "Atomicity": {
    q: "Atomicity means a transaction:",
    opts: [
      { id: "a", text: "Is all-or-nothing", correct: true },
      { id: "b", text: "Is always the fastest option", correct: false },
      { id: "c", text: "Runs in parallel", correct: false },
      { id: "d", text: "Cannot fail", correct: false },
    ],
  },
  "First normal form": {
    q: "A 1NF table:",
    opts: [
      { id: "a", text: "Has atomic values and no lists in cells", correct: true },
      { id: "b", text: "Has no primary key", correct: false },
      { id: "c", text: "Stores arrays in columns", correct: false },
      { id: "d", text: "Uses only text columns", correct: false },
    ],
  },
  "Second normal form": {
    q: "2NF removes:",
    opts: [
      { id: "a", text: "Partial dependencies on part of a composite key", correct: true },
      { id: "b", text: "All foreign keys", correct: false },
      { id: "c", text: "Transitive dependencies", correct: false },
      { id: "d", text: "Primary keys", correct: false },
    ],
  },
  "Redundancy": {
    q: "Redundancy in a table:",
    opts: [
      { id: "a", text: "Repeats the same fact in many places", correct: true },
      { id: "b", text: "Makes queries faster", correct: false },
      { id: "c", text: "Is always required", correct: false },
      { id: "d", text: "Replaces NULLs", correct: false },
    ],
  },
  "Third normal form": {
    q: "3NF removes:",
    opts: [
      { id: "a", text: "Transitive dependencies between non-key columns", correct: true },
      { id: "b", text: "All duplicates", correct: false },
      { id: "c", text: "Indexes", correct: false },
      { id: "d", text: "Foreign keys", correct: false },
    ],
  },
  "Transitive dependencies": {
    q: "A transitive dependency:",
    opts: [
      { id: "a", text: "Chains through another column, e.g. employee → dept_id → dept_name", correct: true },
      { id: "b", text: "Depends on the full key", correct: false },
      { id: "c", text: "Is always acceptable", correct: false },
      { id: "d", text: "Only occurs in NoSQL", correct: false },
    ],
  },
  "A normalized schema": {
    q: "A normalized schema:",
    opts: [
      { id: "a", text: "Stores each fact once, joined via keys", correct: true },
      { id: "b", text: "Keeps everything in one wide table", correct: false },
      { id: "c", text: "Forbids foreign keys", correct: false },
      { id: "d", text: "Uses no indexes", correct: false },
    ],
  },
  "Planning tables": {
    q: "Good schema design starts with:",
    opts: [
      { id: "a", text: "Listing entities, attributes, and relationships", correct: true },
      { id: "b", text: "Creating random tables", correct: false },
      { id: "c", text: "Adding as many columns as possible", correct: false },
      { id: "d", text: "Dropping primary keys", correct: false },
    ],
  },
  "Relationships": {
    q: "A many-to-many relationship needs:",
    opts: [
      { id: "a", text: "A join table with two foreign keys", correct: true },
      { id: "b", text: "A single foreign key on either side", correct: false },
      { id: "c", text: "No keys at all", correct: false },
      { id: "d", text: "An auto-increment column", correct: false },
    ],
  },
  "Data types": {
    q: "Which type fits a numeric count?",
    opts: [
      { id: "a", text: "INTEGER", correct: true },
      { id: "b", text: "TEXT", correct: false },
      { id: "c", text: "BLOB", correct: false },
      { id: "d", text: "Array", correct: false },
    ],
  },
  "ADD COLUMN": {
    q: "ALTER TABLE users ADD COLUMN age INTEGER;",
    opts: [
      { id: "a", text: "Adds an age column; existing rows get NULL or the default", correct: true },
      { id: "b", text: "Deletes the users table", correct: false },
      { id: "c", text: "Renames users", correct: false },
      { id: "d", text: "Adds a row", correct: false },
    ],
  },
  "RENAME": {
    q: "ALTER TABLE books RENAME TO library_books;",
    opts: [
      { id: "a", text: "Renames the table without rewriting its data", correct: true },
      { id: "b", text: "Copies the table", correct: false },
      { id: "c", text: "Deletes the table", correct: false },
      { id: "d", text: "Renames every row", correct: false },
    ],
  },
  "DROP COLUMN": {
    q: "ALTER TABLE books DROP COLUMN year;",
    opts: [
      { id: "a", text: "Removes the year column and its data", correct: true },
      { id: "b", text: "Clears all rows in the table", correct: false },
      { id: "c", text: "Renames year", correct: false },
      { id: "d", text: "Fails always in SQLite", correct: false },
    ],
  },
  "Percent wildcards": {
    q: "LIKE 'A%' matches:",
    opts: [
      { id: "a", text: "Any value starting with A", correct: true },
      { id: "b", text: "Any value ending with A", correct: false },
      { id: "c", text: "Exactly the letter A", correct: false },
      { id: "d", text: "Two-character values", correct: false },
    ],
  },
  "Underscore": {
    q: "LIKE 'b_t' matches:",
    opts: [
      { id: "a", text: "Three-character values like bat and bet", correct: true },
      { id: "b", text: "Any value containing b", correct: false },
      { id: "c", text: "Only values ending in t", correct: false },
      { id: "d", text: "Values of any length", correct: false },
    ],
  },
  "Escaping": {
    q: "To match a literal % in LIKE, use:",
    opts: [
      { id: "a", text: "ESCAPE with an escape character", correct: true },
      { id: "b", text: "A backslash automatically", correct: false },
      { id: "c", text: "The IN operator", correct: false },
      { id: "d", text: "A double percent %%", correct: false },
    ],
  },
  "LIMIT and OFFSET": {
    q: "LIMIT 10 OFFSET 20 returns:",
    opts: [
      { id: "a", text: "Rows 21 through 30", correct: true },
      { id: "b", text: "Rows 1 through 10", correct: false },
      { id: "c", text: "Rows 11 through 20", correct: false },
      { id: "d", text: "Row 20 only", correct: false },
    ],
  },
  "Page size": {
    q: "For page 3 with a page size of 10, OFFSET is:",
    opts: [
      { id: "a", text: "20", correct: true },
      { id: "b", text: "3", correct: false },
      { id: "c", text: "10", correct: false },
      { id: "d", text: "30", correct: false },
    ],
  },
  "Stable ordering": {
    q: "Pagination needs a stable ORDER BY because:",
    opts: [
      { id: "a", text: "Otherwise rows can shuffle between pages", correct: true },
      { id: "b", text: "It is faster", correct: false },
      { id: "c", text: "LIMIT requires it", correct: false },
      { id: "d", text: "Sorting is optional", correct: false },
    ],
  },
  "ROW_NUMBER": {
    q: "ROW_NUMBER() OVER (ORDER BY col):",
    opts: [
      { id: "a", text: "Numbers rows 1..N in the window order", correct: true },
      { id: "b", text: "Gives ties the same number", correct: false },
      { id: "c", text: "Sums the rows", correct: false },
      { id: "d", text: "Deduplicates rows", correct: false },
    ],
  },
  "RANK": {
    q: "With ties, RANK() skips numbers; DENSE_RANK():",
    opts: [
      { id: "a", text: "Does not skip — 1, 1, 2", correct: true },
      { id: "b", text: "Skips — 1, 1, 3", correct: false },
      { id: "c", text: "Never produces ties", correct: false },
      { id: "d", text: "Sorts descending", correct: false },
    ],
  },
  "OVER and PARTITION BY": {
    q: "PARTITION BY in OVER:",
    opts: [
      { id: "a", text: "Splits the window into per-group sub-windows", correct: true },
      { id: "b", text: "Removes duplicates", correct: false },
      { id: "c", text: "Sorts the whole table", correct: false },
      { id: "d", text: "Limits the number of rows", correct: false },
    ],
  },
  "WITH syntax": {
    q: "A CTE is:",
    opts: [
      { id: "a", text: "A named subquery usable within the statement", correct: true },
      { id: "b", text: "A permanent view", correct: false },
      { id: "c", text: "An index", correct: false },
      { id: "d", text: "A copy of a table", correct: false },
    ],
  },
  "Named queries": {
    q: "Unlike a view, a CTE:",
    opts: [
      { id: "a", text: "Lives only for the statement that declares it", correct: true },
      { id: "b", text: "Persists in the schema", correct: false },
      { id: "c", text: "Can be referenced by other sessions", correct: false },
      { id: "d", text: "Has its own file", correct: false },
    ],
  },
  "Recursive CTEs": {
    q: "A recursive CTE needs:",
    opts: [
      { id: "a", text: "An anchor SELECT plus a recursive SELECT", correct: true },
      { id: "b", text: "Only one SELECT", correct: false },
      { id: "c", text: "A PRIMARY KEY", correct: false },
      { id: "d", text: "A temporary table", correct: false },
    ],
  },
  "Index usage": {
    q: "A filter only benefits from an index if:",
    opts: [
      { id: "a", text: "The column is indexed and the planner chooses it", correct: true },
      { id: "b", text: "The table is large", correct: false },
      { id: "c", text: "You use LIMIT", correct: false },
      { id: "d", text: "You select exactly one column", correct: false },
    ],
  },
  "Scan vs seek": {
    q: "An index seek:",
    opts: [
      { id: "a", text: "Jumps directly to matching rows", correct: true },
      { id: "b", text: "Reads every row", correct: false },
      { id: "c", text: "Sorts the table", correct: false },
      { id: "d", text: "Creates a new index", correct: false },
    ],
  },
  "The relational model": {
    q: "The relational model stores data in:",
    opts: [
      { id: "a", text: "Tables with typed columns related through keys", correct: true },
      { id: "b", text: "JSON documents", correct: false },
      { id: "c", text: "Key-value pairs only", correct: false },
      { id: "d", text: "Linked lists", correct: false },
    ],
  },
  "When SQL fits": {
    q: "SQL fits best when data is:",
    opts: [
      { id: "a", text: "Structured, related, and needs consistent transactions", correct: true },
      { id: "b", text: "Unstructured text", correct: false },
      { id: "c", text: "Only ever read once", correct: false },
      { id: "d", text: "Stored in memory", correct: false },
    ],
  },
  "NoSQL trade-offs": {
    q: "Compared to SQL, document stores typically:",
    opts: [
      { id: "a", text: "Keep whole records together but lose JOINs and integrity", correct: true },
      { id: "b", text: "Offer stronger referential integrity", correct: false },
      { id: "c", text: "Cannot scale", correct: false },
      { id: "d", text: "Are always slower", correct: false },
    ],
  },
  "Schema design": {
    q: "A library database's core tables are:",
    opts: [
      { id: "a", text: "Members, books, and loans", correct: true },
      { id: "b", text: "Customers and invoices", correct: false },
      { id: "c", text: "Users and posts", correct: false },
      { id: "d", text: "Products and carts", correct: false },
    ],
  },
  "Seed data": {
    q: "Seed data is:",
    opts: [
      { id: "a", text: "A small realistic set of rows for testing queries", correct: true },
      { id: "b", text: "A backup of the database", correct: false },
      { id: "c", text: "The schema definition", correct: false },
      { id: "d", text: "A random data generator", correct: false },
    ],
  },
  "Reporting queries": {
    q: "A good schema makes reports:",
    opts: [
      { id: "a", text: "Short, obvious SELECTs that join and aggregate", correct: true },
      { id: "b", text: "Complex stored procedures", correct: false },
      { id: "c", text: "Impossible to write", correct: false },
      { id: "d", text: "Manual work", correct: false },
    ],
  },
  "Computed columns": {
    q: "SELECT price * qty outputs:",
    opts: [
      { id: "a", text: "A per-row computed value that exists in no column", correct: true },
      { id: "b", text: "A new stored column", correct: false },
      { id: "c", text: "The table's schema", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "Arithmetic in SELECT": {
    q: "In SQLite, 1.5 * 10 evaluates to:",
    opts: [
      { id: "a", text: "15.0 (REAL)", correct: true },
      { id: "b", text: "15 (INTEGER)", correct: false },
      { id: "c", text: "NULL", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "String concatenation": {
    q: "SQLite's string concatenation operator is:",
    opts: [
      { id: "a", text: "||", correct: true },
      { id: "b", text: "+", correct: false },
      { id: "c", text: "CONCAT()", correct: false },
      { id: "d", text: "&&", correct: false },
    ],
  },
  "DISTINCT on one column": {
    q: "SELECT DISTINCT city returns:",
    opts: [
      { id: "a", text: "One row per unique city", correct: true },
      { id: "b", text: "All rows unchanged", correct: false },
      { id: "c", text: "A count per city", correct: false },
      { id: "d", text: "Only the first city", correct: false },
    ],
  },
  "DISTINCT on multiple columns": {
    q: "SELECT DISTINCT city, day dedupes on:",
    opts: [
      { id: "a", text: "The combination of city and day", correct: true },
      { id: "b", text: "City only", correct: false },
      { id: "c", text: "Day only", correct: false },
      { id: "d", text: "Neither column", correct: false },
    ],
  },
  "DISTINCT vs GROUP BY": {
    q: "Prefer GROUP BY over DISTINCT when you want:",
    opts: [
      { id: "a", text: "Per-value summaries like counts or sums", correct: true },
      { id: "b", text: "Just the unique values", correct: false },
      { id: "c", text: "Faster sorting", correct: false },
      { id: "d", text: "Fewer columns", correct: false },
    ],
  },
  "AS aliases": {
    q: "SELECT first_name AS given:",
    opts: [
      { id: "a", text: "Names the output column given", correct: true },
      { id: "b", text: "Renames the table", correct: false },
      { id: "c", text: "Creates a new column in the table", correct: false },
      { id: "d", text: "Filters the rows", correct: false },
    ],
  },
  "Aliases in ORDER BY": {
    q: "Can ORDER BY use a SELECT alias?",
    opts: [
      { id: "a", text: "Yes — ORDER BY given sorts by the aliased column", correct: true },
      { id: "b", text: "No — aliases are invisible to ORDER BY", correct: false },
      { id: "c", text: "Only with GROUP BY", correct: false },
      { id: "d", text: "Only for INTEGER columns", correct: false },
    ],
  },
  "Quoted aliases": {
    q: "An alias containing a space needs:",
    opts: [
      { id: "a", text: "Double quotes: AS \"full name\"", correct: true },
      { id: "b", text: "Single quotes", correct: false },
      { id: "c", text: "No special handling", correct: false },
      { id: "d", text: "Parentheses", correct: false },
    ],
  },
  "AND and OR": {
    q: "WHERE age >= 18 AND city = 'London' keeps rows where:",
    opts: [
      { id: "a", text: "Both conditions are true", correct: true },
      { id: "b", text: "Either condition is true", correct: false },
      { id: "c", text: "Neither condition is true", correct: false },
      { id: "d", text: "The first condition is true", correct: false },
    ],
  },
  "NOT negation": {
    q: "WHERE NOT (age >= 18) keeps rows where:",
    opts: [
      { id: "a", text: "Age is below 18 (or NULL)", correct: true },
      { id: "b", text: "Age is 18 or more", correct: false },
      { id: "c", text: "Age is exactly 18", correct: false },
      { id: "d", text: "Age is NULL only", correct: false },
    ],
  },
  "Parentheses and precedence": {
    q: "Why parenthesize OR inside AND?",
    opts: [
      { id: "a", text: "AND binds tighter, so parentheses change which rows match", correct: true },
      { id: "b", text: "Parentheses are required by SQLite", correct: false },
      { id: "c", text: "They make the query run faster", correct: false },
      { id: "d", text: "They sort the result", correct: false },
    ],
  },
  "BETWEEN ranges": {
    q: "qty BETWEEN 10 AND 100 matches:",
    opts: [
      { id: "a", text: "Values from 10 to 100 inclusive", correct: true },
      { id: "b", text: "Values strictly between 10 and 100", correct: false },
      { id: "c", text: "Only 10 and 100", correct: false },
      { id: "d", text: "Values outside 10 to 100", correct: false },
    ],
  },
  "IN lists": {
    q: "WHERE city IN ('London', 'Paris') keeps rows where city is:",
    opts: [
      { id: "a", text: "Either London or Paris", correct: true },
      { id: "b", text: "Both London and Paris", correct: false },
      { id: "c", text: "Neither London nor Paris", correct: false },
      { id: "d", text: "NULL", correct: false },
    ],
  },
  "IS NULL tests": {
    q: "To find rows where supplier is missing, use:",
    opts: [
      { id: "a", text: "WHERE supplier IS NULL", correct: true },
      { id: "b", text: "WHERE supplier = NULL", correct: false },
      { id: "c", text: "WHERE supplier = 0", correct: false },
      { id: "d", text: "WHERE supplier LIKE NULL", correct: false },
    ],
  },
  "Multi-column ordering": {
    q: "ORDER BY score DESC, player ASC sorts by:",
    opts: [
      { id: "a", text: "Score descending, breaking ties by player ascending", correct: true },
      { id: "b", text: "Player first, then score", correct: false },
      { id: "c", text: "Score only", correct: false },
      { id: "d", text: "Random order within each score", correct: false },
    ],
  },
  "Mixed ASC and DESC": {
    q: "In ORDER BY a DESC, b ASC, ties in a are broken by b:",
    opts: [
      { id: "a", text: "Ascending", correct: true },
      { id: "b", text: "Descending", correct: false },
      { id: "c", text: "Randomly", correct: false },
      { id: "d", text: "They are not broken", correct: false },
    ],
  },
  "Stable sort keys": {
    q: "A stable pagination sort needs:",
    opts: [
      { id: "a", text: "A unique column in the ORDER BY so every row has one slot", correct: true },
      { id: "b", text: "No ORDER BY at all", correct: false },
      { id: "c", text: "DESC on every column", correct: false },
      { id: "d", text: "A LIMIT without OFFSET", correct: false },
    ],
  },
  "OFFSET mechanics": {
    q: "LIMIT 2 OFFSET 2 on five ordered rows returns rows:",
    opts: [
      { id: "a", text: "3 and 4", correct: true },
      { id: "b", text: "1 and 2", correct: false },
      { id: "c", text: "2 and 3", correct: false },
      { id: "d", text: "2 only", correct: false },
    ],
  },
  "Keyset pagination": {
    q: "Keyset pagination pages with:",
    opts: [
      { id: "a", text: "A WHERE filter on the last seen key instead of OFFSET", correct: true },
      { id: "b", text: "A larger OFFSET each time", correct: false },
      { id: "c", text: "No ORDER BY", correct: false },
      { id: "d", text: "A temporary table per page", correct: false },
    ],
  },
  "Ties and deterministic pages": {
    q: "OFFSET pages can skip or duplicate rows when:",
    opts: [
      { id: "a", text: "The ORDER BY has ties and no unique tiebreaker", correct: true },
      { id: "b", text: "LIMIT is used", correct: false },
      { id: "c", text: "The table has a primary key", correct: false },
      { id: "d", text: "Pages are small", correct: false },
    ],
  },
  "GLOB patterns": {
    q: "WHERE name GLOB '*.txt' matches:",
    opts: [
      { id: "a", text: "Values ending in .txt with exact case", correct: true },
      { id: "b", text: "Values ending in .TXT too", correct: false },
      { id: "c", text: "Any value containing t, x, or t", correct: false },
      { id: "d", text: "Only the literal string *.txt", correct: false },
    ],
  },
  "Case sensitivity": {
    q: "Which comparison is case-sensitive in SQLite?",
    opts: [
      { id: "a", text: "GLOB", correct: true },
      { id: "b", text: "LIKE on ASCII text", correct: false },
      { id: "c", text: "All comparisons are case-sensitive", correct: false },
      { id: "d", text: "None are", correct: false },
    ],
  },
  "ESCAPE clauses": {
    q: "ESCAPE in a LIKE pattern lets you:",
    opts: [
      { id: "a", text: "Match a literal % or _ character", correct: true },
      { id: "b", text: "Skip the WHERE clause", correct: false },
      { id: "c", text: "Escape the whole query", correct: false },
      { id: "d", text: "Sort case-insensitively", correct: false },
    ],
  },
  "COUNT(*) vs COUNT(column)": {
    q: "With a NULL in the column, COUNT(*) vs COUNT(column):",
    opts: [
      { id: "a", text: "COUNT(*) is larger — it counts the NULL row too", correct: true },
      { id: "b", text: "They are always equal", correct: false },
      { id: "c", text: "COUNT(column) is larger", correct: false },
      { id: "d", text: "Both return NULL", correct: false },
    ],
  },
  "COUNT(DISTINCT column)": {
    q: "COUNT(DISTINCT email) counts:",
    opts: [
      { id: "a", text: "Each different email once", correct: true },
      { id: "b", text: "Every row including repeats", correct: false },
      { id: "c", text: "Only NULL emails", correct: false },
      { id: "d", text: "The longest email", correct: false },
    ],
  },
  "COUNT with filters": {
    q: "To count only London signups, add:",
    opts: [
      { id: "a", text: "WHERE city = 'London'", correct: true },
      { id: "b", text: "HAVING city = 'London'", correct: false },
      { id: "c", text: "ORDER BY city", correct: false },
      { id: "d", text: "LIMIT 1", correct: false },
    ],
  },
  "SUM ignores NULLs": {
    q: "SUM of 10, NULL, 30 is:",
    opts: [
      { id: "a", text: "40", correct: true },
      { id: "b", text: "NULL", correct: false },
      { id: "c", text: "20", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "AVG denominators": {
    q: "AVG of 10, NULL, 30 divides by:",
    opts: [
      { id: "a", text: "2 — NULLs are excluded from the count", correct: true },
      { id: "b", text: "3 — all rows count", correct: false },
      { id: "c", text: "1 — only the first value", correct: false },
      { id: "d", text: "0 — it errors", correct: false },
    ],
  },
  "Sums over filtered rows": {
    q: "SUM with WHERE day <= 2 totals:",
    opts: [
      { id: "a", text: "Only rows matching the filter", correct: true },
      { id: "b", text: "All rows regardless", correct: false },
      { id: "c", text: "The first two columns", correct: false },
      { id: "d", text: "Nothing — aggregates ignore WHERE", correct: false },
    ],
  },
  "MIN and MAX on text": {
    q: "MIN of 'pear', 'apple', 'fig' is:",
    opts: [
      { id: "a", text: "apple", correct: true },
      { id: "b", text: "pear", correct: false },
      { id: "c", text: "fig", correct: false },
      { id: "d", text: "NULL", correct: false },
    ],
  },
  "TOTAL vs SUM": {
    q: "Over zero rows, TOTAL returns:",
    opts: [
      { id: "a", text: "0.0, while SUM returns NULL", correct: true },
      { id: "b", text: "NULL, while SUM returns 0.0", correct: false },
      { id: "c", text: "An error in both cases", correct: false },
      { id: "d", text: "The same as SUM", correct: false },
    ],
  },
  "Aggregates over empty sets": {
    q: "SELECT SUM(x) over zero matching rows returns:",
    opts: [
      { id: "a", text: "One row holding NULL", correct: true },
      { id: "b", text: "Zero rows", correct: false },
      { id: "c", text: "An error", correct: false },
      { id: "d", text: "One row holding 0", correct: false },
    ],
  },
  "GROUP_CONCAT basics": {
    q: "GROUP_CONCAT(name) produces:",
    opts: [
      { id: "a", text: "One comma-separated string of the group's values", correct: true },
      { id: "b", text: "One row per value", correct: false },
      { id: "c", text: "A count of the values", correct: false },
      { id: "d", text: "A sorted table", correct: false },
    ],
  },
  "Custom separators": {
    q: "GROUP_CONCAT(name, ';') joins values with:",
    opts: [
      { id: "a", text: "Semicolons", correct: true },
      { id: "b", text: "Commas", correct: false },
      { id: "c", text: "Spaces", correct: false },
      { id: "d", text: "Newlines", correct: false },
    ],
  },
  "DISTINCT inside GROUP_CONCAT": {
    q: "GROUP_CONCAT(DISTINCT name) lists:",
    opts: [
      { id: "a", text: "Each value once even if it repeats", correct: true },
      { id: "b", text: "Every occurrence including repeats", correct: false },
      { id: "c", text: "Only the first value", correct: false },
      { id: "d", text: "Values in random order", correct: false },
    ],
  },
  "Composite grouping keys": {
    q: "GROUP BY year, region creates:",
    opts: [
      { id: "a", text: "One group per distinct year-region pair", correct: true },
      { id: "b", text: "One group per year only", correct: false },
      { id: "c", text: "One group per region only", correct: false },
      { id: "d", text: "A single group", correct: false },
    ],
  },
  "GROUP BY with ORDER BY": {
    q: "ORDER BY after GROUP BY:",
    opts: [
      { id: "a", text: "Arranges the groups without changing them", correct: true },
      { id: "b", text: "Changes which rows fall in each group", correct: false },
      { id: "c", text: "Is forbidden in SQLite", correct: false },
      { id: "d", text: "Removes duplicates", correct: false },
    ],
  },
  "Group cardinality": {
    q: "Grouping sales by year and region vs by region alone gives:",
    opts: [
      { id: "a", text: "More, finer groups", correct: true },
      { id: "b", text: "Fewer, coarser groups", correct: false },
      { id: "c", text: "The same groups", correct: false },
      { id: "d", text: "No groups", correct: false },
    ],
  },
  "HAVING on aggregates": {
    q: "HAVING SUM(amount) > 200 keeps:",
    opts: [
      { id: "a", text: "Only groups whose total exceeds 200", correct: true },
      { id: "b", text: "Only rows above 200", correct: false },
      { id: "c", text: "All groups", correct: false },
      { id: "d", text: "The first 200 groups", correct: false },
    ],
  },
  "HAVING without GROUP BY": {
    q: "HAVING with no GROUP BY treats the result as:",
    opts: [
      { id: "a", text: "One implicit group", correct: true },
      { id: "b", text: "An error", correct: false },
      { id: "c", text: "One group per row", correct: false },
      { id: "d", text: "An empty result", correct: false },
    ],
  },
  "Multiple HAVING conditions": {
    q: "HAVING SUM(a) > 100 AND COUNT(*) >= 3 demands:",
    opts: [
      { id: "a", text: "Both conditions on each group", correct: true },
      { id: "b", text: "Either condition on each group", correct: false },
      { id: "c", text: "Neither condition", correct: false },
      { id: "d", text: "Exactly 3 groups", correct: false },
    ],
  },
  "Row filters before grouping": {
    q: "In WHERE → GROUP BY → HAVING, WHERE filters:",
    opts: [
      { id: "a", text: "Rows before any grouping happens", correct: true },
      { id: "b", text: "Groups after aggregation", correct: false },
      { id: "c", text: "The final display only", correct: false },
      { id: "d", text: "Nothing — it sorts", correct: false },
    ],
  },
  "Group filters after aggregation": {
    q: "HAVING can reference aggregates because it runs:",
    opts: [
      { id: "a", text: "After grouping", correct: true },
      { id: "b", text: "Before grouping", correct: false },
      { id: "c", text: "During INSERT", correct: false },
      { id: "d", text: "Instead of WHERE", correct: false },
    ],
  },
  "Combining both clauses": {
    q: "The correct clause order is:",
    opts: [
      { id: "a", text: "WHERE, GROUP BY, HAVING, ORDER BY", correct: true },
      { id: "b", text: "HAVING, WHERE, GROUP BY, ORDER BY", correct: false },
      { id: "c", text: "GROUP BY, HAVING, WHERE, ORDER BY", correct: false },
      { id: "d", text: "ORDER BY first", correct: false },
    ],
  },
  "Employee-manager patterns": {
    q: "An org chart in one table pairs employees to managers with:",
    opts: [
      { id: "a", text: "A self join on boss = id", correct: true },
      { id: "b", text: "A UNION", correct: false },
      { id: "c", text: "A second table", correct: false },
      { id: "d", text: "GROUP BY", correct: false },
    ],
  },
  "Mandatory table aliases": {
    q: "Self joins require aliases because:",
    opts: [
      { id: "a", text: "The same table appears twice and columns would be ambiguous", correct: true },
      { id: "b", text: "SQLite requires aliases on all joins", correct: false },
      { id: "c", text: "They speed up the query", correct: false },
      { id: "d", text: "They rename the database", correct: false },
    ],
  },
  "Multi-level hierarchies": {
    q: "To climb two levels (employee → manager → director) you need:",
    opts: [
      { id: "a", text: "Two self joins with fresh aliases", correct: true },
      { id: "b", text: "One self join", correct: false },
      { id: "c", text: "A UNION", correct: false },
      { id: "d", text: "GROUP BY", correct: false },
    ],
  },
  "RIGHT JOIN concept": {
    q: "A RIGHT JOIN keeps:",
    opts: [
      { id: "a", text: "Every row of the right table, NULL-filling missing left matches", correct: true },
      { id: "b", text: "Only matching rows", correct: false },
      { id: "c", text: "Every row of the left table", correct: false },
      { id: "d", text: "The first row of each table", correct: false },
    ],
  },
  "Rewriting as LEFT JOIN": {
    q: "A RIGHT JOIN in SQLite is written as:",
    opts: [
      { id: "a", text: "A LEFT JOIN with the tables swapped", correct: true },
      { id: "b", text: "An INNER JOIN", correct: false },
      { id: "c", text: "A CROSS JOIN", correct: false },
      { id: "d", text: "It cannot be expressed", correct: false },
    ],
  },
  "SQLite's supported joins": {
    q: "Which join does SQLite NOT support?",
    opts: [
      { id: "a", text: "RIGHT JOIN", correct: true },
      { id: "b", text: "LEFT JOIN", correct: false },
      { id: "c", text: "INNER JOIN", correct: false },
      { id: "d", text: "CROSS JOIN", correct: false },
    ],
  },
  "FULL OUTER JOIN concept": {
    q: "A FULL OUTER JOIN keeps:",
    opts: [
      { id: "a", text: "Every row from both tables, NULL-filling whichever side lacks a match", correct: true },
      { id: "b", text: "Only matching rows", correct: false },
      { id: "c", text: "Left rows only", correct: false },
      { id: "d", text: "Right rows only", correct: false },
    ],
  },
  "UNION of two LEFT JOINs": {
    q: "The FULL OUTER emulation UNIONs a LEFT JOIN with:",
    opts: [
      { id: "a", text: "The mirrored LEFT JOIN restricted to right-only orphans", correct: true },
      { id: "b", text: "An INNER JOIN", correct: false },
      { id: "c", text: "The same LEFT JOIN again", correct: false },
      { id: "d", text: "A CROSS JOIN", correct: false },
    ],
  },
  "NULL on both sides": {
    q: "Orphan rows in the emulation show NULLs, usually handled with:",
    opts: [
      { id: "a", text: "COALESCE to a display default", correct: true },
      { id: "b", text: "COUNT(*)", correct: false },
      { id: "c", text: "DROP TABLE", correct: false },
      { id: "d", text: "ORDER BY", correct: false },
    ],
  },
  "IN as a semi join": {
    q: "WHERE id IN (SELECT ...) returns each left row:",
    opts: [
      { id: "a", text: "At most once, no matter how many right rows match", correct: true },
      { id: "b", text: "Once per matching right row", correct: false },
      { id: "c", text: "With the right row's columns attached", correct: false },
      { id: "d", text: "Only if exactly one right row matches", correct: false },
    ],
  },
  "EXISTS short-circuits": {
    q: "EXISTS is efficient because it:",
    opts: [
      { id: "a", text: "Stops at the first matching row", correct: true },
      { id: "b", text: "Counts all matches first", correct: false },
      { id: "c", text: "Sorts the subquery", correct: false },
      { id: "d", text: "Caches the whole table", correct: false },
    ],
  },
  "Semi joins vs INNER JOIN": {
    q: "Use a semi join instead of INNER JOIN when you want to:",
    opts: [
      { id: "a", text: "Filter by membership without duplicating rows or adding columns", correct: true },
      { id: "b", text: "Combine columns from both tables", correct: false },
      { id: "c", text: "Multiply rows per match", correct: false },
      { id: "d", text: "Sort the result", correct: false },
    ],
  },
  "Project schema design": {
    q: "A shop database's core tables are:",
    opts: [
      { id: "a", text: "Customers, products, and purchases", correct: true },
      { id: "b", text: "Users and posts", correct: false },
      { id: "c", text: "Files and folders", correct: false },
      { id: "d", text: "A single wide table", correct: false },
    ],
  },
  "Seed realistic data": {
    q: "Good seed data is:",
    opts: [
      { id: "a", text: "Small, relational, and hand-verifiable", correct: true },
      { id: "b", text: "As large as possible", correct: false },
      { id: "c", text: "Random and unchecked", correct: false },
      { id: "d", text: "A production backup", correct: false },
    ],
  },
  "Multi-table report queries": {
    q: "Shop revenue is computed with:",
    opts: [
      { id: "a", text: "A join of purchases to products plus SUM", correct: true },
      { id: "b", text: "A single-table SELECT", correct: false },
      { id: "c", text: "DROP TABLE", correct: false },
      { id: "d", text: "A view with no query", correct: false },
    ],
  },
  "NOT EXISTS anti join": {
    q: "NOT EXISTS returns left rows that have:",
    opts: [
      { id: "a", text: "Zero matches on the right", correct: true },
      { id: "b", text: "At least one match on the right", correct: false },
      { id: "c", text: "Exactly one match", correct: false },
      { id: "d", text: "NULL keys", correct: false },
    ],
  },
  "LEFT JOIN with IS NULL": {
    q: "LEFT JOIN ... WHERE right.key IS NULL keeps:",
    opts: [
      { id: "a", text: "Left rows with no right match", correct: true },
      { id: "b", text: "Left rows with a match", correct: false },
      { id: "c", text: "All right rows", correct: false },
      { id: "d", text: "Nothing — it errors", correct: false },
    ],
  },
  "NOT IN and NULL pitfalls": {
    q: "A NULL inside a NOT IN list causes:",
    opts: [
      { id: "a", text: "No rows to match at all", correct: true },
      { id: "b", text: "Faster results", correct: false },
      { id: "c", text: "NULL rows to be skipped cleanly", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "Per-row inner queries": {
    q: "A correlated subquery differs by:",
    opts: [
      { id: "a", text: "Referencing the outer query's current row", correct: true },
      { id: "b", text: "Running before the outer query", correct: false },
      { id: "c", text: "Never using aliases", correct: false },
      { id: "d", text: "Returning whole tables", correct: false },
    ],
  },
  "Above-average-per-group": {
    q: "Employees above their own department average need:",
    opts: [
      { id: "a", text: "A correlated subquery averaging the matching dept", correct: true },
      { id: "b", text: "A plain GROUP BY", correct: false },
      { id: "c", text: "An index only", correct: false },
      { id: "d", text: "Two databases", correct: false },
    ],
  },
  "Correlated UPDATE patterns": {
    q: "Before running a correlated UPDATE, you should:",
    opts: [
      { id: "a", text: "SELECT the affected rows first to preview", correct: true },
      { id: "b", text: "DROP the indexes", correct: false },
      { id: "c", text: "Disable the transaction", correct: false },
      { id: "d", text: "Delete the table", correct: false },
    ],
  },
  "Scalar values in SELECT": {
    q: "A scalar subquery in the select list returns:",
    opts: [
      { id: "a", text: "One value per row", correct: true },
      { id: "b", text: "One row per table", correct: false },
      { id: "c", text: "A new table", correct: false },
      { id: "d", text: "A boolean only", correct: false },
    ],
  },
  "Derived tables in FROM": {
    q: "A subquery in FROM is called:",
    opts: [
      { id: "a", text: "A derived table", correct: true },
      { id: "b", text: "A view", correct: false },
      { id: "c", text: "An index", correct: false },
      { id: "d", text: "A trigger", correct: false },
    ],
  },
  "Subqueries in ORDER BY": {
    q: "ORDER BY with a subquery is best for:",
    opts: [
      { id: "a", text: "One-off sort keys kept out of the select list", correct: true },
      { id: "b", text: "Sorting that must be reused often", correct: false },
      { id: "c", text: "Filtering rows", correct: false },
      { id: "d", text: "Creating tables", correct: false },
    ],
  },
  "Chained CTEs": {
    q: "In WITH evens AS (...), doubled AS (SELECT ... FROM evens):",
    opts: [
      { id: "a", text: "The second CTE builds on the first", correct: true },
      { id: "b", text: "The CTEs are independent", correct: false },
      { id: "c", text: "Evens runs after doubled", correct: false },
      { id: "d", text: "Only one CTE may exist", correct: false },
    ],
  },
  "Multiple CTEs": {
    q: "Multiple CTEs are separated with:",
    opts: [
      { id: "a", text: "Commas after a single WITH", correct: true },
      { id: "b", text: "Repeated WITH keywords", correct: false },
      { id: "c", text: "Semicolons", correct: false },
      { id: "d", text: "UNION", correct: false },
    ],
  },
  "CTEs vs subqueries": {
    q: "Prefer a CTE over a nested subquery when:",
    opts: [
      { id: "a", text: "A step is reused or nesting runs deep", correct: true },
      { id: "b", text: "You need maximum speed always", correct: false },
      { id: "c", text: "The query is a one-liner", correct: false },
      { id: "d", text: "You want to create a table", correct: false },
    ],
  },
  "Anchor and recursive members": {
    q: "A recursive CTE consists of:",
    opts: [
      { id: "a", text: "An anchor SELECT plus a recursive SELECT", correct: true },
      { id: "b", text: "Two unrelated SELECTs", correct: false },
      { id: "c", text: "A PRIMARY KEY and a FOREIGN KEY", correct: false },
      { id: "d", text: "A table and an index", correct: false },
    ],
  },
  "UNION ALL recursion": {
    q: "Recursive CTEs must use UNION ALL because:",
    opts: [
      { id: "a", text: "Duplicates are part of the iteration and dedup would break it", correct: true },
      { id: "b", text: "UNION is forbidden in CTEs", correct: false },
      { id: "c", text: "It sorts the output", correct: false },
      { id: "d", text: "It limits recursion depth", correct: false },
    ],
  },
  "Termination conditions": {
    q: "Every recursive CTE needs:",
    opts: [
      { id: "a", text: "A WHERE that eventually yields zero new rows", correct: true },
      { id: "b", text: "An ORDER BY", correct: false },
      { id: "c", text: "A LIMIT 1", correct: false },
      { id: "d", text: "A PRIMARY KEY", correct: false },
    ],
  },
  "Walking org charts": {
    q: "To return a whole subtree of unknown depth, use:",
    opts: [
      { id: "a", text: "A recursive CTE", correct: true },
      { id: "b", text: "A fixed chain of self joins", correct: false },
      { id: "c", text: "GROUP BY", correct: false },
      { id: "d", text: "UNION ALL of tables", correct: false },
    ],
  },
  "Depth tracking": {
    q: "A depth counter in a recursive CTE starts at 0 in:",
    opts: [
      { id: "a", text: "The anchor member and increments per level", correct: true },
      { id: "b", text: "The recursive member only", correct: false },
      { id: "c", text: "The final SELECT", correct: false },
      { id: "d", text: "The ORDER BY clause", correct: false },
    ],
  },
  "Path building": {
    q: "Breadcrumb paths like root/a/b are built by:",
    opts: [
      { id: "a", text: "Concatenating names level by level through the recursion", correct: true },
      { id: "b", text: "GROUP_CONCAT over the whole table", correct: false },
      { id: "c", text: "ORDER BY depth", correct: false },
      { id: "d", text: "A separate table per level", correct: false },
    ],
  },
  "ROW_NUMBER basics": {
    q: "ROW_NUMBER() OVER (ORDER BY col):",
    opts: [
      { id: "a", text: "Numbers rows 1..N with no ties", correct: true },
      { id: "b", text: "Gives ties the same number", correct: false },
      { id: "c", text: "Sums the column", correct: false },
      { id: "d", text: "Counts distinct values", correct: false },
    ],
  },
  "RANK with gaps": {
    q: "Two rows tied for rank 1 make the next RANK:",
    opts: [
      { id: "a", text: "3", correct: true },
      { id: "b", text: "2", correct: false },
      { id: "c", text: "1", correct: false },
      { id: "d", text: "NULL", correct: false },
    ],
  },
  "DENSE_RANK without gaps": {
    q: "DENSE_RANK after a two-way tie for 1 gives:",
    opts: [
      { id: "a", text: "2", correct: true },
      { id: "b", text: "3", correct: false },
      { id: "c", text: "1 again", correct: false },
      { id: "d", text: "NULL", correct: false },
    ],
  },
  "LAG previous rows": {
    q: "LAG(t) OVER (ORDER BY day) on the first row returns:",
    opts: [
      { id: "a", text: "NULL — there is no previous row", correct: true },
      { id: "b", text: "The first row's own value", correct: false },
      { id: "c", text: "0", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "LEAD next rows": {
    q: "LEAD reads:",
    opts: [
      { id: "a", text: "The next row's value in the window order", correct: true },
      { id: "b", text: "The previous row's value", correct: false },
      { id: "c", text: "The maximum value", correct: false },
      { id: "d", text: "The row count", correct: false },
    ],
  },
  "NTILE buckets": {
    q: "NTILE(4) splits rows into:",
    opts: [
      { id: "a", text: "Four near-equal buckets", correct: true },
      { id: "b", text: "Four value ranges", correct: false },
      { id: "c", text: "Four tables", correct: false },
      { id: "d", text: "Four columns", correct: false },
    ],
  },
  "ROWS BETWEEN frames": {
    q: "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW means:",
    opts: [
      { id: "a", text: "This row plus everything before it", correct: true },
      { id: "b", text: "Only the current row", correct: false },
      { id: "c", text: "The whole table unordered", correct: false },
      { id: "d", text: "The rows after this one", correct: false },
    ],
  },
  "Running totals": {
    q: "A running total is SUM over:",
    opts: [
      { id: "a", text: "An expanding frame from the start to the current row", correct: true },
      { id: "b", text: "The whole table with GROUP BY", correct: false },
      { id: "c", text: "A single row", correct: false },
      { id: "d", text: "The next three rows", correct: false },
    ],
  },
  "Moving averages": {
    q: "A 3-day moving average uses the frame:",
    opts: [
      { id: "a", text: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW", correct: true },
      { id: "b", text: "ROWS BETWEEN 3 FOLLOWING AND CURRENT ROW", correct: false },
      { id: "c", text: "The entire partition", correct: false },
      { id: "d", text: "No frame at all", correct: false },
    ],
  },
  "INTERSECT": {
    q: "INTERSECT returns rows present in:",
    opts: [
      { id: "a", text: "Both SELECTs", correct: true },
      { id: "b", text: "Either SELECT", correct: false },
      { id: "c", text: "Only the first SELECT", correct: false },
      { id: "d", text: "Neither SELECT", correct: false },
    ],
  },
  "EXCEPT": {
    q: "EXCEPT returns rows in the first SELECT that are:",
    opts: [
      { id: "a", text: "Absent from the second SELECT", correct: true },
      { id: "b", text: "Present in the second SELECT", correct: false },
      { id: "c", text: "Duplicated", correct: false },
      { id: "d", text: "NULL", correct: false },
    ],
  },
  "Set-operator precedence": {
    q: "A UNION B INTERSECT C evaluates as:",
    opts: [
      { id: "a", text: "A UNION (B INTERSECT C)", correct: true },
      { id: "b", text: "(A UNION B) INTERSECT C", correct: false },
      { id: "c", text: "Left to right with no precedence", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "UNION dedup cost": {
    q: "UNION is slower than UNION ALL because it:",
    opts: [
      { id: "a", text: "Sorts or hashes to remove duplicates", correct: true },
      { id: "b", text: "Reads the tables twice", correct: false },
      { id: "c", text: "Creates indexes", correct: false },
      { id: "d", text: "Locks the tables", correct: false },
    ],
  },
  "UNION ALL speed": {
    q: "Default to UNION ALL when:",
    opts: [
      { id: "a", text: "Duplicates are impossible or acceptable", correct: true },
      { id: "b", text: "You need deduplication", correct: false },
      { id: "c", text: "Sorting is required", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "ORDER BY over unions": {
    q: "In a compound SELECT, ORDER BY:",
    opts: [
      { id: "a", text: "Applies once to the whole result at the end", correct: true },
      { id: "b", text: "Sorts each SELECT separately", correct: false },
      { id: "c", text: "Is forbidden", correct: false },
      { id: "d", text: "Uses the second SELECT's column names", correct: false },
    ],
  },
  "CREATE VIEW with joins": {
    q: "Putting a join inside a view gives consumers:",
    opts: [
      { id: "a", text: "One simple name hiding the pairing logic", correct: true },
      { id: "b", text: "A copy of the data", correct: false },
      { id: "c", text: "Faster writes", correct: false },
      { id: "d", text: "Automatic indexes", correct: false },
    ],
  },
  "DROP VIEW": {
    q: "DROP VIEW removes:",
    opts: [
      { id: "a", text: "Only the saved query — base tables keep their data", correct: true },
      { id: "b", text: "The base tables too", correct: false },
      { id: "c", text: "All indexes", correct: false },
      { id: "d", text: "The whole database", correct: false },
    ],
  },
  "Views stay current": {
    q: "A view always reflects current data because it:",
    opts: [
      { id: "a", text: "Reruns its query on every access", correct: true },
      { id: "b", text: "Caches results forever", correct: false },
      { id: "c", text: "Copies tables nightly", correct: false },
      { id: "d", text: "Locks the base tables", correct: false },
    ],
  },
  "Updatable view limits": {
    q: "SQLite auto-routes writes through a view when it is:",
    opts: [
      { id: "a", text: "A simple single-table view", correct: true },
      { id: "b", text: "A view with aggregates", correct: false },
      { id: "c", text: "A view with DISTINCT", correct: false },
      { id: "d", text: "Any view at all", correct: false },
    ],
  },
  "INSTEAD OF triggers": {
    q: "An INSTEAD OF INSERT trigger on a view:",
    opts: [
      { id: "a", text: "Replaces the insert with your own logic", correct: true },
      { id: "b", text: "Runs after the insert completes", correct: false },
      { id: "c", text: "Deletes the view", correct: false },
      { id: "d", text: "Is forbidden in SQLite", correct: false },
    ],
  },
  "Routing writes": {
    q: "To make a joined view writable, the trigger must:",
    opts: [
      { id: "a", text: "Split NEW into inserts on each base table", correct: true },
      { id: "b", text: "Insert into the view directly", correct: false },
      { id: "c", text: "Drop the join", correct: false },
      { id: "d", text: "Use GROUP BY", correct: false },
    ],
  },
  "Composite indexes": {
    q: "An index on (kind, ts) speeds filters on:",
    opts: [
      { id: "a", text: "kind, and kind-plus-ts together", correct: true },
      { id: "b", text: "ts alone", correct: false },
      { id: "c", text: "Any column of the table", correct: false },
      { id: "d", text: "No realistic filter", correct: false },
    ],
  },
  "Column order": {
    q: "In a composite index, the most important position is:",
    opts: [
      { id: "a", text: "Leftmost — it decides what the index can answer", correct: true },
      { id: "b", text: "Rightmost", correct: false },
      { id: "c", text: "The middle", correct: false },
      { id: "d", text: "Order does not matter", correct: false },
    ],
  },
  "Covering indexes": {
    q: "A covering index lets a query:",
    opts: [
      { id: "a", text: "Answer without touching the table", correct: true },
      { id: "b", text: "Skip the WHERE clause", correct: false },
      { id: "c", text: "Change its results", correct: false },
      { id: "d", text: "Run without SELECT", correct: false },
    ],
  },
  "EXPLAIN QUERY PLAN syntax": {
    q: "EXPLAIN QUERY PLAN SELECT ...:",
    opts: [
      { id: "a", text: "Describes the plan without running the query", correct: true },
      { id: "b", text: "Runs the query and shows results", correct: false },
      { id: "c", text: "Creates an index", correct: false },
      { id: "d", text: "Deletes the plan cache", correct: false },
    ],
  },
  "SCAN vs SEARCH lines": {
    q: "In a query plan, SEARCH means the engine:",
    opts: [
      { id: "a", text: "Seeks via an index to matching rows", correct: true },
      { id: "b", text: "Reads the whole table", correct: false },
      { id: "c", text: "Sorts the result", correct: false },
      { id: "d", text: "Creates a temporary table", correct: false },
    ],
  },
  "Version-dependent text": {
    q: "EXPLAIN output node ids (2|0|56|...) are:",
    opts: [
      { id: "a", text: "Unstable across SQLite versions — read the shape, not the text", correct: true },
      { id: "b", text: "Guaranteed identical everywhere", correct: false },
      { id: "c", text: "The query's results", correct: false },
      { id: "d", text: "Row counts", correct: false },
    ],
  },
  "Forcing index use": {
    q: "To prove an index matters, compare EXPLAIN output:",
    opts: [
      { id: "a", text: "Before and after creating the index", correct: true },
      { id: "b", text: "On two different databases", correct: false },
      { id: "c", text: "With different SELECT lists only", correct: false },
      { id: "d", text: "Plans never change", correct: false },
    ],
  },
  "Comparing plans": {
    q: "When tuning, change:",
    opts: [
      { id: "a", text: "One thing at a time so the plan diff is honest", correct: true },
      { id: "b", text: "Everything at once for speed", correct: false },
      { id: "c", text: "Nothing — plans are final", correct: false },
      { id: "d", text: "Only the SELECT list", correct: false },
    ],
  },
  "When plans change": {
    q: "Query plans can change with:",
    opts: [
      { id: "a", text: "Data size, indexes, and SQLite versions", correct: true },
      { id: "b", text: "Nothing — plans are frozen", correct: false },
      { id: "c", text: "Only the table name", correct: false },
      { id: "d", text: "The day of the week", correct: false },
    ],
  },
  "Multi-statement transfers": {
    q: "A money transfer wraps debit plus credit in:",
    opts: [
      { id: "a", text: "One BEGIN...COMMIT transaction", correct: true },
      { id: "b", text: "Two separate transactions", correct: false },
      { id: "c", text: "No transaction", correct: false },
      { id: "d", text: "A view", correct: false },
    ],
  },
  "Balance invariants": {
    q: "The transfer invariant is:",
    opts: [
      { id: "a", text: "Total balances never change in a transfer", correct: true },
      { id: "b", text: "Balances always grow", correct: false },
      { id: "c", text: "Each account holds the same amount", correct: false },
      { id: "d", text: "Transfers need no invariant", correct: false },
    ],
  },
  "COMMIT finality": {
    q: "Until COMMIT, a transaction's statements are:",
    opts: [
      { id: "a", text: "Provisional — ROLLBACK can still erase them", correct: true },
      { id: "b", text: "Permanent", correct: false },
      { id: "c", text: "Visible to all connections", correct: false },
      { id: "d", text: "Written to disk", correct: false },
    ],
  },
  "Atomicity recap": {
    q: "Atomicity guarantees:",
    opts: [
      { id: "a", text: "All-or-nothing application of the transaction", correct: true },
      { id: "b", text: "Maximum speed", correct: false },
      { id: "c", text: "Parallel execution", correct: false },
      { id: "d", text: "No errors ever", correct: false },
    ],
  },
  "Consistency guarantees": {
    q: "Consistency means each transaction moves the database:",
    opts: [
      { id: "a", text: "From one valid state to another", correct: true },
      { id: "b", text: "To a locked state", correct: false },
      { id: "c", text: "To an empty state", correct: false },
      { id: "d", text: "Without constraints", correct: false },
    ],
  },
  "Isolation in SQLite": {
    q: "SQLite isolates concurrent writers by:",
    opts: [
      { id: "a", text: "Serializing them — one writer at a time", correct: true },
      { id: "b", text: "Letting all write at once", correct: false },
      { id: "c", text: "Blocking all readers", correct: false },
      { id: "d", text: "Merging conflicting writes", correct: false },
    ],
  },
  "SAVEPOINT syntax": {
    q: "SAVEPOINT sp1 marks:",
    opts: [
      { id: "a", text: "A point inside a transaction you can roll back to", correct: true },
      { id: "b", text: "A backup of the database file", correct: false },
      { id: "c", text: "A new transaction", correct: false },
      { id: "d", text: "A permanent commit", correct: false },
    ],
  },
  "ROLLBACK TO": {
    q: "ROLLBACK TO sp1 differs from bare ROLLBACK by:",
    opts: [
      { id: "a", text: "Keeping the transaction alive after rewinding", correct: true },
      { id: "b", text: "Committing the transaction", correct: false },
      { id: "c", text: "Deleting the table", correct: false },
      { id: "d", text: "Doing nothing", correct: false },
    ],
  },
  "RELEASE": {
    q: "RELEASE sp1:",
    opts: [
      { id: "a", text: "Clears the marker; the work still needs COMMIT", correct: true },
      { id: "b", text: "Commits the transaction", correct: false },
      { id: "c", text: "Undoes the transaction", correct: false },
      { id: "d", text: "Deletes the savepoint's rows", correct: false },
    ],
  },
  "Ledger schema": {
    q: "A ledger separates:",
    opts: [
      { id: "a", text: "Balances (state) from audit rows (history)", correct: true },
      { id: "b", text: "Users from passwords", correct: false },
      { id: "c", text: "Tables from indexes", correct: false },
      { id: "d", text: "Nothing — one table suffices", correct: false },
    ],
  },
  "Audit trigger": {
    q: "A trigger WHEN clause:",
    opts: [
      { id: "a", text: "Fires the trigger only when the condition holds", correct: true },
      { id: "b", text: "Deletes the trigger", correct: false },
      { id: "c", text: "Runs on every statement", correct: false },
      { id: "d", text: "Sorts the audit table", correct: false },
    ],
  },
  "Transfer procedure": {
    q: "The transfer procedure plus trigger gives:",
    opts: [
      { id: "a", text: "Money movement and automatic evidence in one transaction", correct: true },
      { id: "b", text: "Faster SELECTs", correct: false },
      { id: "c", text: "Smaller tables", correct: false },
      { id: "d", text: "No need for COMMIT", correct: false },
    ],
  },
  "CHECK expressions": {
    q: "CHECK (price >= 0) rejects:",
    opts: [
      { id: "a", text: "Negative prices at INSERT and UPDATE", correct: true },
      { id: "b", text: "Zero prices", correct: false },
      { id: "c", text: "All prices", correct: false },
      { id: "d", text: "Nothing — CHECK is advisory", correct: false },
    ],
  },
  "DEFAULT values": {
    q: "With DEFAULT 'active', omitting status in INSERT stores:",
    opts: [
      { id: "a", text: "active", correct: true },
      { id: "b", text: "NULL", correct: false },
      { id: "c", text: "An error", correct: false },
      { id: "d", text: "0", correct: false },
    ],
  },
  "Constraint violations abort": {
    q: "A CHECK violation:",
    opts: [
      { id: "a", text: "Aborts the statement — the row is not stored", correct: true },
      { id: "b", text: "Stores the row anyway", correct: false },
      { id: "c", text: "Deletes the table", correct: false },
      { id: "d", text: "Is silently ignored", correct: false },
    ],
  },
  "ON DELETE CASCADE": {
    q: "ON DELETE CASCADE on players.team_id means deleting a team:",
    opts: [
      { id: "a", text: "Deletes its players too", correct: true },
      { id: "b", text: "Keeps its players with NULL team_id", correct: false },
      { id: "c", text: "Is forbidden", correct: false },
      { id: "d", text: "Does nothing", correct: false },
    ],
  },
  "ON DELETE SET NULL": {
    q: "ON DELETE SET NULL keeps child rows and:",
    opts: [
      { id: "a", text: "Clears their foreign key", correct: true },
      { id: "b", text: "Deletes them", correct: false },
      { id: "c", text: "Copies the parent", correct: false },
      { id: "d", text: "Assigns a new parent", correct: false },
    ],
  },
  "PRAGMA foreign_keys": {
    q: "SQLite enforces foreign keys only when:",
    opts: [
      { id: "a", text: "PRAGMA foreign_keys = ON is set per connection", correct: true },
      { id: "b", text: "The tables are created", correct: false },
      { id: "c", text: "Always — it is on by default", correct: false },
      { id: "d", text: "An index exists", correct: false },
    ],
  },
  "Spotting repeating groups": {
    q: "The 1NF alarm in a workers table is:",
    opts: [
      { id: "a", text: "The department name repeated on every worker row", correct: true },
      { id: "b", text: "A primary key", correct: false },
      { id: "c", text: "An index", correct: false },
      { id: "d", text: "A foreign key", correct: false },
    ],
  },
  "Splitting tables": {
    q: "Refactoring to 3NF moves each repeated fact to:",
    opts: [
      { id: "a", text: "Its own table with a key", correct: true },
      { id: "b", text: "A view", correct: false },
      { id: "c", text: "An index", correct: false },
      { id: "d", text: "A trigger", correct: false },
    ],
  },
  "Joining it back": {
    q: "After normalization, the flat view is restored with:",
    opts: [
      { id: "a", text: "JOINs", correct: true },
      { id: "b", text: "UNION", correct: false },
      { id: "c", text: "GROUP BY", correct: false },
      { id: "d", text: "It cannot be restored", correct: false },
    ],
  },
  "Read vs write trade-offs": {
    q: "Denormalization buys read speed with:",
    opts: [
      { id: "a", text: "Write complexity — every copy must update together", correct: true },
      { id: "b", text: "More disk seeks on reads", correct: false },
      { id: "c", text: "Smaller tables", correct: false },
      { id: "d", text: "Nothing — it is free", correct: false },
    ],
  },
  "Cached counters": {
    q: "A likes counter on posts turns reads into:",
    opts: [
      { id: "a", text: "One column read instead of an aggregate", correct: true },
      { id: "b", text: "A full table scan", correct: false },
      { id: "c", text: "A join", correct: false },
      { id: "d", text: "A trigger", correct: false },
    ],
  },
  "Materialized summaries": {
    q: "Materialized summaries trade freshness for:",
    opts: [
      { id: "a", text: "Instant report reads", correct: true },
      { id: "b", text: "Smaller storage", correct: false },
      { id: "c", text: "Stronger constraints", correct: false },
      { id: "d", text: "Faster writes", correct: false },
    ],
  },
  "AFTER INSERT triggers": {
    q: "An AFTER INSERT trigger observes:",
    opts: [
      { id: "a", text: "The landed row with final values", correct: true },
      { id: "b", text: "The row before it is stored", correct: false },
      { id: "c", text: "The whole table", correct: false },
      { id: "d", text: "Nothing — it runs before", correct: false },
    ],
  },
  "NEW row values": {
    q: "Inside an INSERT trigger, NEW.item is:",
    opts: [
      { id: "a", text: "The item value of the row being written", correct: true },
      { id: "b", text: "The previous item value", correct: false },
      { id: "c", text: "Always NULL", correct: false },
      { id: "d", text: "The table name", correct: false },
    ],
  },
  "Audit tables": {
    q: "Audit tables are filled by:",
    opts: [
      { id: "a", text: "Triggers, so no writer can forget", correct: true },
      { id: "b", text: "Manual inserts only", correct: false },
      { id: "c", text: "SELECT queries", correct: false },
      { id: "d", text: "Indexes", correct: false },
    ],
  },
  "BEFORE INSERT guards": {
    q: "A BEFORE INSERT guard with WHEN NEW.age < 0:",
    opts: [
      { id: "a", text: "Rejects negative ages before they land", correct: true },
      { id: "b", text: "Logs negative ages after storing them", correct: false },
      { id: "c", text: "Fixes negative ages automatically", correct: false },
      { id: "d", text: "Deletes the table", correct: false },
    ],
  },
  "RAISE(ABORT, ...)": {
    q: "RAISE(ABORT, 'message') in a trigger:",
    opts: [
      { id: "a", text: "Aborts the statement with your message", correct: true },
      { id: "b", text: "Commits the transaction", correct: false },
      { id: "c", text: "Skips the trigger", correct: false },
      { id: "d", text: "Creates an index", correct: false },
    ],
  },
  "Enforcing rules": {
    q: "Rules in the database (vs in app code) apply to:",
    opts: [
      { id: "a", text: "Every connection — no client can bypass them", correct: true },
      { id: "b", text: "Only the first connection", correct: false },
      { id: "c", text: "Reads but never writes", correct: false },
      { id: "d", text: "Nothing — they are documentation", correct: false },
    ],
  },
  "FOR EACH ROW only": {
    q: "SQLite fires a trigger:",
    opts: [
      { id: "a", text: "Once per affected row", correct: true },
      { id: "b", text: "Once per statement", correct: false },
      { id: "c", text: "Once per database", correct: false },
      { id: "d", text: "Only on SELECT", correct: false },
    ],
  },
  "No FOR EACH STATEMENT": {
    q: "SQLite statement-level triggers:",
    opts: [
      { id: "a", text: "Do not exist — there is no such syntax", correct: true },
      { id: "b", text: "Are the default", correct: false },
      { id: "c", text: "Fire on SELECT", correct: false },
      { id: "d", text: "Replace row triggers", correct: false },
    ],
  },
  "Workarounds with temp tables": {
    q: "To emulate per-statement trigger work, use:",
    opts: [
      { id: "a", text: "A row trigger staging into a TEMP table, processed later", correct: true },
      { id: "b", text: "FOR EACH STATEMENT", correct: false },
      { id: "c", text: "DROP TRIGGER", correct: false },
      { id: "d", text: "A view", correct: false },
    ],
  },
  "JSON text columns": {
    q: "SQLite stores JSON documents as:",
    opts: [
      { id: "a", text: "TEXT queried with JSON1 functions", correct: true },
      { id: "b", text: "A special JSON column type", correct: false },
      { id: "c", text: "BLOBs only", correct: false },
      { id: "d", text: "Separate files", correct: false },
    ],
  },
  "json_extract paths": {
    q: "json_extract(data, '$.theme') reads:",
    opts: [
      { id: "a", text: "The theme field of the document", correct: true },
      { id: "b", text: "The whole document", correct: false },
      { id: "c", text: "The first array element", correct: false },
      { id: "d", text: "The document's size", correct: false },
    ],
  },
  "json_object building": {
    q: "json_object('theme', 'dark') builds:",
    opts: [
      { id: "a", text: "A JSON document from SQL values", correct: true },
      { id: "b", text: "A table", correct: false },
      { id: "c", text: "An index", correct: false },
      { id: "d", text: "A string without structure", correct: false },
    ],
  },
  "json_each table function": {
    q: "json_each over an array produces:",
    opts: [
      { id: "a", text: "One row per element", correct: true },
      { id: "b", text: "One column per element", correct: false },
      { id: "c", text: "A single JSON string", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "Unnesting arrays": {
    q: "After unnesting with json_each, elements can be:",
    opts: [
      { id: "a", text: "Filtered, counted, and joined like ordinary rows", correct: true },
      { id: "b", text: "Only printed", correct: false },
      { id: "c", text: "Never filtered", correct: false },
      { id: "d", text: "Stored but not read", correct: false },
    ],
  },
  "Filtering extracted values": {
    q: "WHERE value = 'pen' after json_each counts:",
    opts: [
      { id: "a", text: "Matching elements across all documents", correct: true },
      { id: "b", text: "Whole documents only", correct: false },
      { id: "c", text: "Nothing — filters cannot apply", correct: false },
      { id: "d", text: "Tables", correct: false },
    ],
  },
  "FTS5 virtual tables": {
    q: "CREATE VIRTUAL TABLE docs USING fts5 builds:",
    opts: [
      { id: "a", text: "A full-text index over the text columns", correct: true },
      { id: "b", text: "An ordinary table", correct: false },
      { id: "c", text: "A view", correct: false },
      { id: "d", text: "A backup", correct: false },
    ],
  },
  "MATCH queries": {
    q: "WHERE docs MATCH 'desert' finds documents:",
    opts: [
      { id: "a", text: "Containing the term, via the index", correct: true },
      { id: "b", text: "By scanning every row's text", correct: false },
      { id: "c", text: "With desert in any column type", correct: false },
      { id: "d", text: "It always errors", correct: false },
    ],
  },
  "Tokenization basics": {
    q: "FTS5 searches match:",
    opts: [
      { id: "a", text: "Whole tokens, not substrings", correct: true },
      { id: "b", text: "Arbitrary substrings", correct: false },
      { id: "c", text: "Regular expressions", correct: false },
      { id: "d", text: "Only exact phrases", correct: false },
    ],
  },
  "bm25 ranking": {
    q: "ORDER BY bm25(table) ranks matches by:",
    opts: [
      { id: "a", text: "Relevance — rare terms and short documents score higher", correct: true },
      { id: "b", text: "Insertion order", correct: false },
      { id: "c", text: "Random order", correct: false },
      { id: "d", text: "Alphabetical title", correct: false },
    ],
  },
  "snippet highlights": {
    q: "snippet() is used to:",
    opts: [
      { id: "a", text: "Show the matching text with the term marked", correct: true },
      { id: "b", text: "Rank the matches", correct: false },
      { id: "c", text: "Delete matches", correct: false },
      { id: "d", text: "Create the index", correct: false },
    ],
  },
  "Column filters": {
    q: "An FTS MATCH of {title} : sql searches:",
    opts: [
      { id: "a", text: "The title column only", correct: true },
      { id: "b", text: "All columns", correct: false },
      { id: "c", text: "The rowid only", correct: false },
      { id: "d", text: "Nothing — the syntax is invalid", correct: false },
    ],
  },
  "Daily deltas with LAG": {
    q: "Period-over-period change is computed with:",
    opts: [
      { id: "a", text: "The value minus LAG's previous value", correct: true },
      { id: "b", text: "GROUP BY", correct: false },
      { id: "c", text: "COUNT(*)", correct: false },
      { id: "d", text: "UNION", correct: false },
    ],
  },
  "Running totals over time": {
    q: "Revenue-so-far by day is a running total over:",
    opts: [
      { id: "a", text: "Ordered rows with an expanding frame", correct: true },
      { id: "b", text: "Unordered rows", correct: false },
      { id: "c", text: "A single row", correct: false },
      { id: "d", text: "The schema", correct: false },
    ],
  },
  "Week-over-week compare": {
    q: "Week-over-week compares each day to:",
    opts: [
      { id: "a", text: "The same weekday last week via a self join offset by 7", correct: true },
      { id: "b", text: "Yesterday", correct: false },
      { id: "c", text: "The monthly average", correct: false },
      { id: "d", text: "A random day", correct: false },
    ],
  },
  "ROW_NUMBER per partition": {
    q: "ROW_NUMBER() OVER (PARTITION BY region ...) numbers:",
    opts: [
      { id: "a", text: "Each region's rows independently from 1", correct: true },
      { id: "b", text: "All rows globally", correct: false },
      { id: "c", text: "Only the first region", correct: false },
      { id: "d", text: "Regions instead of rows", correct: false },
    ],
  },
  "Top-N filter": {
    q: "Top-1 per group is a ranked subquery filtered with:",
    opts: [
      { id: "a", text: "WHERE rn = 1", correct: true },
      { id: "b", text: "HAVING COUNT(*) = 1", correct: false },
      { id: "c", text: "LIMIT 1 on the raw table", correct: false },
      { id: "d", text: "DISTINCT", correct: false },
    ],
  },
  "Ties handling": {
    q: "ROW_NUMBER top-N with tied scores picks:",
    opts: [
      { id: "a", text: "An arbitrary tied row — add a unique tiebreaker for fairness", correct: true },
      { id: "b", text: "All tied rows", correct: false },
      { id: "c", text: "No rows", correct: false },
      { id: "d", text: "The alphabetically first always", correct: false },
    ],
  },
  "Cohort week grouping": {
    q: "A user's cohort week is:",
    opts: [
      { id: "a", text: "MIN(week) grouped by user", correct: true },
      { id: "b", text: "MAX(week) grouped by user", correct: false },
      { id: "c", text: "COUNT(*) of logins", correct: false },
      { id: "d", text: "The current week", correct: false },
    ],
  },
  "Retention self join": {
    q: "A retention self join pairs weeks with the condition:",
    opts: [
      { id: "a", text: "b.week = a.week + 1 on the same user", correct: true },
      { id: "b", text: "b.week = a.week", correct: false },
      { id: "c", text: "Different users", correct: false },
      { id: "d", text: "No condition", correct: false },
    ],
  },
  "Percent retained": {
    q: "Retention rate is retained divided by cohort size, using 100.0 to:",
    opts: [
      { id: "a", text: "Keep the decimal part", correct: true },
      { id: "b", text: "Round to an integer", correct: false },
      { id: "c", text: "Count distinct users", correct: false },
      { id: "d", text: "Filter NULLs", correct: false },
    ],
  },
  "ON CONFLICT DO NOTHING": {
    q: "INSERT ... ON CONFLICT(key) DO NOTHING on a duplicate key:",
    opts: [
      { id: "a", text: "Skips the row instead of erroring", correct: true },
      { id: "b", text: "Deletes the existing row", correct: false },
      { id: "c", text: "Updates the existing row", correct: false },
      { id: "d", text: "Always errors", correct: false },
    ],
  },
  "ON CONFLICT DO UPDATE": {
    q: "An UPSERT counter uses DO UPDATE to:",
    opts: [
      { id: "a", text: "Increment the existing row on duplicate insert", correct: true },
      { id: "b", text: "Insert a second row", correct: false },
      { id: "c", text: "Delete the row", correct: false },
      { id: "d", text: "Lock the table", correct: false },
    ],
  },
  "excluded row values": {
    q: "In DO UPDATE, excluded refers to:",
    opts: [
      { id: "a", text: "The row that failed to insert", correct: true },
      { id: "b", text: "The existing stored row", correct: false },
      { id: "c", text: "A deleted row", correct: false },
      { id: "d", text: "Nothing — it is a keyword filler", correct: false },
    ],
  },
  "Staged CTE pipelines": {
    q: "A funnel query stages CTEs as:",
    opts: [
      { id: "a", text: "Raw events, then per-step counts, then ratios", correct: true },
      { id: "b", text: "Ratios first, then raw events", correct: false },
      { id: "c", text: "One CTE per user", correct: false },
      { id: "d", text: "Tables instead of CTEs", correct: false },
    ],
  },
  "Conversion ratios": {
    q: "Step conversion divides each step's users by:",
    opts: [
      { id: "a", text: "The first step's users", correct: true },
      { id: "b", text: "The total rows in the table", correct: false },
      { id: "c", text: "The previous step plus one", correct: false },
      { id: "d", text: "A fixed number", correct: false },
    ],
  },
  "Funnel drop-off": {
    q: "The funnel step needing product attention is the one with:",
    opts: [
      { id: "a", text: "The steepest fall between steps", correct: true },
      { id: "b", text: "The most users", correct: false },
      { id: "c", text: "The fewest users", correct: false },
      { id: "d", text: "No users", correct: false },
    ],
  },
  "Finding duplicates": {
    q: "To list repeated name-email pairs, use:",
    opts: [
      { id: "a", text: "GROUP BY name, email HAVING COUNT(*) > 1", correct: true },
      { id: "b", text: "SELECT DISTINCT", correct: false },
      { id: "c", text: "ORDER BY", correct: false },
      { id: "d", text: "LIMIT 1", correct: false },
    ],
  },
  "DELETE with rowid": {
    q: "Keeping the first copy of each duplicate deletes rows where:",
    opts: [
      { id: "a", text: "rowid is not the group's MIN(rowid)", correct: true },
      { id: "b", text: "rowid is the MIN(rowid)", correct: false },
      { id: "c", text: "rowid is NULL", correct: false },
      { id: "d", text: "All rows unconditionally", correct: false },
    ],
  },
  "Filling NULLs": {
    q: "To repair NULL emails with a default, use:",
    opts: [
      { id: "a", text: "UPDATE ... SET email = 'unknown' WHERE email IS NULL", correct: true },
      { id: "b", text: "DELETE WHERE email IS NULL always", correct: false },
      { id: "c", text: "SELECT DISTINCT", correct: false },
      { id: "d", text: "DROP COLUMN", correct: false },
    ],
  },
  "ADD COLUMN with defaults": {
    q: "ADD COLUMN status TEXT DEFAULT 'active' fills existing rows with:",
    opts: [
      { id: "a", text: "active", correct: true },
      { id: "b", text: "NULL", correct: false },
      { id: "c", text: "It leaves them empty with an error", correct: false },
      { id: "d", text: "0", correct: false },
    ],
  },
  "Backfilling data": {
    q: "After adding a defaulted column, special rows are corrected with:",
    opts: [
      { id: "a", text: "A targeted UPDATE backfill", correct: true },
      { id: "b", text: "DROP TABLE", correct: false },
      { id: "c", text: "A second ADD COLUMN", correct: false },
      { id: "d", text: "Nothing — defaults are always right", correct: false },
    ],
  },
  "Renaming tables": {
    q: "ALTER TABLE old RENAME TO new is:",
    opts: [
      { id: "a", text: "Instant metadata surgery that rewrites no data", correct: true },
      { id: "b", text: "A full data copy", correct: false },
      { id: "c", text: "Forbidden in SQLite", correct: false },
      { id: "d", text: "A row delete", correct: false },
    ],
  },
  "sqlite_master inventory": {
    q: "sqlite_master lists:",
    opts: [
      { id: "a", text: "Every table, index, view, and trigger", correct: true },
      { id: "b", text: "Table rows", correct: false },
      { id: "c", text: "Query results", correct: false },
      { id: "d", text: "User accounts", correct: false },
    ],
  },
  "Missing-index smells": {
    q: "The classic missing-index smell is:",
    opts: [
      { id: "a", text: "A selective WHERE with a SCAN plan and no matching index", correct: true },
      { id: "b", text: "A SEARCH plan", correct: false },
      { id: "c", text: "A small table", correct: false },
      { id: "d", text: "An ORDER BY", correct: false },
    ],
  },
  "Audit checklists": {
    q: "A performance audit runs:",
    opts: [
      { id: "a", text: "Inventory indexes, EXPLAIN top queries, index the SCANs, re-check", correct: true },
      { id: "b", text: "DROP all indexes first", correct: false },
      { id: "c", text: "Guessing", correct: false },
      { id: "d", text: "Only once ever", correct: false },
    ],
  },
  "Capstone schema": {
    q: "The market database links sellers, goods, and sales with:",
    opts: [
      { id: "a", text: "Foreign keys across two relationship depths", correct: true },
      { id: "b", text: "No keys at all", correct: false },
      { id: "c", text: "A single table", correct: false },
      { id: "d", text: "Text files", correct: false },
    ],
  },
  "Seed and constraints": {
    q: "If capstone seed data violates a constraint:",
    opts: [
      { id: "a", text: "The rule or the seed is wrong — decide loudly", correct: true },
      { id: "b", text: "Ignore it", correct: false },
      { id: "c", text: "Delete the schema", correct: false },
      { id: "d", text: "Disable all constraints", correct: false },
    ],
  },
  "Executive dashboard query": {
    q: "The capstone dashboard query is:",
    opts: [
      { id: "a", text: "One join-plus-aggregate statement over the whole business", correct: true },
      { id: "b", text: "A stored procedure", correct: false },
      { id: "c", text: "Manual arithmetic", correct: false },
      { id: "d", text: "A backup command", correct: false },
    ],
  },
};
/* ─── Code-challenge verification ───
 * expectedOutput gates "Mark Complete" on the code exercise. SQL runs via the
 * sqlite3 CLI: CREATE/INSERT print nothing, and each SELECT prints one row per
 * line (single-column rows print just the value, multi-column rows join values
 * with |). Every gated value below is the EXACT FIRST data line produced by the
 * day's template, verified against a live SQLite engine. Day 38 executes
 * EXPLAIN QUERY PLAN, whose text varies by SQLite version, so it stays ungated.
 * Day 24 avoids clock-reading date functions by using fixed date strings.
 * Days 41-100 follow the same contract: every deterministic template is gated
 * on its verified first output line. Ungated by design: days 75-76 (EXPLAIN
 * QUERY PLAN text varies by SQLite version — node ids and index names shift,
 * so the output is a diagnostic, not a contract) and day 87 (SQLite supports
 * only FOR EACH ROW triggers — there is no statement-level trigger syntax to
 * run and verify; row-level trigger behavior is gated on days 73, 80, 85-86).
 * All gated values for days 41-100 were verified against SQLite 3.50.4 via
 * Python's sqlite3 module (no sqlite3 CLI on the verifier machine). */
const SQL_EXPECTED_OUTPUT: Record<number, string> = {
  1: "Rex",
  2: "Ada",
  3: "Ada",
  4: "Zoe",
  5: "3",
  6: "north",
  7: "A",
  8: "Dune",
  9: "red",
  10: "pear",
  11: "read",
  12: "Ada",
  13: "1",
  14: "Dune",
  15: "Dune",
  16: "Ada|Math",
  17: "AA",
  18: "Boston",
  19: "Ada",
  20: "Ada",
  21: "Ada|pass",
  22: "ADA",
  23: "4.0",
  24: "2024-01-01",
  25: "apple",
  26: "London",
  27: "north",
  28: "Ada",
  29: "70",
  30: "Ada",
  31: "Frank",
  32: "Math",
  33: "Ada",
  34: "a.txt",
  35: "three",
  36: "jan|1",
  37: "4",
  39: "relational data stays consistent",
  40: "1",
  41: "15.0",
  42: "Paris",
  43: "Ada",
  44: "Ada",
  45: "book",
  46: "Cy",
  47: "click",
  48: "report.txt",
  49: "2",
  50: "40",
  51: "apple",
  52: "Ada;Bob;Ada",
  53: "2024|north",
  54: "Ada",
  55: "click",
  56: "Bob",
  57: "Frank|Dune",
  58: "1|none",
  59: "Ada",
  60: "36.0",
  61: "Ada",
  62: "Ada",
  63: "Alien",
  64: "4",
  65: "2",
  66: "b",
  67: "Ada|1",
  68: "tue|4",
  69: "1|10",
  70: "q",
  71: "4",
  72: "2",
  73: "2",
  74: "2",
  77: "80",
  78: "10",
  79: "1",
  80: "1",
  81: "0.0",
  82: "0",
  83: "Ada",
  84: "2",
  85: "added:pen",
  86: "36",
  88: "dark",
  89: "2",
  90: "Dune",
  91: "sql guide",
  92: "250",
  93: "Ada",
  94: "1",
  95: "2",
  96: "1",
  97: "2",
  98: "active",
  99: "idx_fast_email",
  100: "40.0",
};

/* ─── Content generators ─── */

function generateSqlTopicContent(topic: string, title: string, day: number): string {
  const cached = SQL_TOPIC_CONTENT[topic];
  if (cached) return cached;

  const level = getLevelForDay(day);
  return (
    `Day ${day} introduces "${topic}" within the context of ${title}. ` +
    `This concept is part of the SQL track at the ${level} proficiency tier. ` +
    `It builds on the relational model — understand how ${topic} ` +
    `interacts with the surrounding SQL clauses, then extend the template to solidify it.`
  );
}

function generateSqlExercises(day: number, blueprint: SqlBlueprint): Lesson["exercises"] {
  const prefix = `sql${day}`;
  const topics = blueprint.theoryTopics;

  const quizzes: Lesson["exercises"] = [];
  const usedTopics = new Set<string>();

  for (let i = 0; i < Math.min(topics.length, 2); i++) {
    const topic = topics[i];
    const entry = SQL_QUIZ_MAP[topic];
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
      question: "Which of these is the idiomatic SQL way to check whether a row exists?",
      options: [
        { id: "a", text: "`SELECT 1 FROM table WHERE condition`", correct: true },
        { id: "b", text: "`EXISTS(table).row`", correct: false },
        { id: "c", text: "`table.any(condition)`", correct: false },
        { id: "d", text: "`FIND table WHERE condition`", correct: false },
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
    expectedOutput: SQL_EXPECTED_OUTPUT[day],
    hints: [
      "Review the theory section for each topic",
      "Run the code in the playground to see the baseline",
      "Extend it: add inputs, edge cases, or a second example",
    ],
    xpReward: 50,
  });

  return quizzes;
}

function generateSqlAssignment(day: number, blueprint: SqlBlueprint): Lesson["assignment"] {
  const { title, theoryTopics } = blueprint;
  const topicBasedReqs = theoryTopics.slice(0, 3).map((t) => `Demonstrate understanding of ${t}`);

  return {
    id: `d${day}-a1`,
    title: `${title} — Assignment`,
    description: `Apply Day ${day} concepts by building a small SQL script that exercises ${theoryTopics.join(", ")}. Focus on correctness, edge cases, and readable queries.`,
    requirements: [
      ...topicBasedReqs,
      "Write clean, runnable SQL with meaningful names",
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

export function buildSqlLesson(day: number): Lesson {
  const blueprint = SQL_CURRICULUM[day - 1];
  if (!blueprint) throw new Error(`No SQL lesson for day ${day}`);

  return {
    day,
    title: blueprint.title,
    subtitle: blueprint.subtitle,
    language: "sql",
    track: "sql",
    level: getLevelForDay(day),
    durationMinutes: 45 + (day % 3) * 15,
    xpTotal: 200,
    tags: blueprint.tags,
    theory: {
      sections: blueprint.theoryTopics.map((topic, i) => ({
        heading: topic,
        content: generateSqlTopicContent(topic, blueprint.title, day),
        codeExample: i === 0 ? blueprint.codeTemplate : undefined,
      })),
    },
    playground: {
      defaultCode: blueprint.codeTemplate,
      language: "sql",
      runnable: true,
    },
    exercises: generateSqlExercises(day, blueprint),
    assignment: generateSqlAssignment(day, blueprint),
  };
}
