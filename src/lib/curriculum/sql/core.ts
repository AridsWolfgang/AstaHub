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
};
/* ─── Code-challenge verification ───
 * expectedOutput gates "Mark Complete" on the code exercise. SQL runs via the
 * sqlite3 CLI: CREATE/INSERT print nothing, and each SELECT prints one row per
 * line (single-column rows print just the value, multi-column rows join values
 * with |). Every gated value below is the EXACT FIRST data line produced by the
 * day's template, verified against a live SQLite engine. Day 38 executes
 * EXPLAIN QUERY PLAN, whose text varies by SQLite version, so it stays ungated.
 * Day 24 avoids clock-reading date functions by using fixed date strings. */
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
