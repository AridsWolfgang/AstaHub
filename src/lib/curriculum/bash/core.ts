import type { Lesson } from "../../types";
import { getLevelForDay } from "../../types";

/* ─── Bash blueprints: Days 1–40 ─── */

interface BashBlueprint {
  title: string;
  subtitle: string;
  language: "bash";
  tags: string[];
  theoryTopics: string[];
  codeTemplate: string;
}

const BASH_CURRICULUM: BashBlueprint[] = [
  { title: "Hello, Shell", subtitle: "Your first commands and the prompt", language: "bash", tags: ["shell"], theoryTopics: ["What is a shell", "echo", "Running commands"], codeTemplate: `#!/bin/bash\necho "Hello, Shell!"\necho "Welcome to the Bash track"` },
  { title: "Variables", subtitle: "Store values and read them back", language: "bash", tags: ["variables"], theoryTopics: ["Assigning variables", "Reading variables", "Quoting rules"], codeTemplate: `#!/bin/bash\nname="Ada"\ncount=10\necho "\$name"\necho "\$count"\necho "Hello, \$name"` },
  { title: "Positional Parameters", subtitle: "Script arguments from \$1 to \$#", language: "bash", tags: ["variables"], theoryTopics: ["\$1 and \$2", "\$@ and \$#", "Defaults"], codeTemplate: `#!/bin/bash\nname="\${1:-World}"\necho "Hello, \$name"\necho "args: \$#"` },
  { title: "Arithmetic", subtitle: "Integer math with \$(( ))", language: "bash", tags: ["operators"], theoryTopics: ["\$(( )) arithmetic", "Integer division", "Comparison in math"], codeTemplate: `#!/bin/bash\na=10\nb=3\nsum=\$((a + b))\ndiff=\$((a - b))\nprod=\$((a * b))\ndiv=\$((a / b))\nmod=\$((a % b))\necho "\$sum \$diff \$prod \$div \$mod"` },
  { title: "Redirection", subtitle: "Routing streams to files", language: "bash", tags: ["io"], theoryTopics: ["> and >>", "< input", "2> stderr"], codeTemplate: `#!/bin/bash\necho "hello" > /tmp/asta-notes.txt\necho "world" >> /tmp/asta-notes.txt\ncat /tmp/asta-notes.txt` },
  { title: "Pipes", subtitle: "One command's output, another's input", language: "bash", tags: ["io"], theoryTopics: ["The pipe character", "Piping into commands", "Pipelines"], codeTemplate: `#!/bin/bash\nprintf "banana\\napple\\ncherry\\n" | sort` },
  { title: "Conditionals: if / then / else", subtitle: "Branch on conditions", language: "bash", tags: ["control-flow"], theoryTopics: ["if syntax", "then and else", "fi"], codeTemplate: `#!/bin/bash\nscore=85\nif [ "\$score" -ge 90 ]; then\n  grade="A"\nelif [ "\$score" -ge 80 ]; then\n  grade="B"\nelse\n  grade="C"\nfi\necho "grade: \$grade"` },
  { title: "Test Expressions", subtitle: "Checking strings and numbers with [ ]", language: "bash", tags: ["control-flow"], theoryTopics: ["[ ] tests", "String tests", "Numeric tests"], codeTemplate: `#!/bin/bash\nname="ada"\nif [ "\$name" = "ada" ]; then\n  echo "match"\nfi\nif [ 5 -gt 3 ]; then\n  echo "5 > 3"\nfi\nif [ -n "\$name" ]; then\n  echo "not empty"\nfi` },
  { title: "Loops", subtitle: "Repeat work with for and while", language: "bash", tags: ["loops"], theoryTopics: ["for loops", "while loops", "break and continue"], codeTemplate: `#!/bin/bash\nfor i in 1 2 3; do\n  echo "item \$i"\ndone\nn=0\nwhile [ "\$n" -lt 3 ]; do\n  echo "while \$n"\n  n=\$((n + 1))\ndone` },
  { title: "Functions", subtitle: "Reusable blocks of commands", language: "bash", tags: ["functions"], theoryTopics: ["Defining functions", "Calling functions", "Return values"], codeTemplate: `#!/bin/bash\ngreet() {\n  echo "Hello, \$1"\n}\ngreet "Ada"\nsum() {\n  local x=\$1\n  local y=\$2\n  echo \$((x + y))\n}\nsum 3 4` },
  { title: "grep", subtitle: "Find lines that match a pattern", language: "bash", tags: ["text"], theoryTopics: ["Searching text", "Common flags", "grep in pipes"], codeTemplate: `#!/bin/bash\nprintf "apple\\nbanana\\navocado\\n" | grep "^a"` },
  { title: "sed", subtitle: "Edit text streams on the fly", language: "bash", tags: ["text"], theoryTopics: ["Stream editing", "Substitution", "Printing lines"], codeTemplate: `#!/bin/bash\nprintf "one\\ntwo\\nthree\\n" | sed 's/two/TWO/'` },
  { title: "awk", subtitle: "Column-aware text processing", language: "bash", tags: ["text"], theoryTopics: ["Field splitting", "Printing columns", "Simple programs"], codeTemplate: `#!/bin/bash\nprintf "Ada 36\\nBob 42\\n" | awk '{ print \$1 }'` },
  { title: "String Operators", subtitle: "Length, slices, and case", language: "bash", tags: ["strings"], theoryTopics: ["Length", "Substrings", "Case conversion"], codeTemplate: `#!/bin/bash\nname="hello"\necho "\${#name}"\necho "\${name:1:3}"\necho "\${name^^}"\necho "\${name//l/L}"` },
  { title: "Command Substitution", subtitle: "Turn command output into data", language: "bash", tags: ["expansion"], theoryTopics: ["\$( ) syntax", "Capturing output", "Nesting"], codeTemplate: `#!/bin/bash\nname=\$(echo "Ada")\necho "Hello, \$name"\nupper=\$(echo "ada" | tr 'a-z' 'A-Z')\necho "\$upper"` },
  { title: "Expansion & Globbing", subtitle: "Brace expansion, wildcards, and ~", language: "bash", tags: ["expansion"], theoryTopics: ["Brace expansion", "Wildcards", "Tilde expansion"], codeTemplate: `#!/bin/bash\necho {a,b,c}\necho {1..3}` },
  { title: "Arrays", subtitle: "Ordered lists of values", language: "bash", tags: ["data"], theoryTopics: ["Declaring arrays", "Indexing", "Length and iteration"], codeTemplate: `#!/bin/bash\nnames=("Ada" "Bob" "Eve")\necho "\${names[0]}"\necho "\${#names[@]}"\nfor n in "\${names[@]}"; do\n  echo "\$n"\ndone` },
  { title: "Exit Codes", subtitle: "0 is success, everything else is failure", language: "bash", tags: ["process"], theoryTopics: ["\$?", "exit", "Success and failure"], codeTemplate: `#!/bin/bash\ntrue\necho "\$?"\nfalse\necho "\$?"\necho "done"` },
  { title: "Background & Foreground", subtitle: "Run jobs alongside your shell", language: "bash", tags: ["process"], theoryTopics: ["& background", "wait", "Job control basics"], codeTemplate: `#!/bin/bash\nsleep 0.1 &\necho "started background job \$!"\nwait\necho "job finished"` },
  { title: "Scheduling", subtitle: "cron and at for deferred work", language: "bash", tags: ["process"], theoryTopics: ["cron concepts", "at", "Why scheduling matters"], codeTemplate: `#!/bin/bash\n# cron runs commands on a fixed schedule; at runs a command once.\n# Both require a scheduling daemon that sandboxes usually lack.\necho "cron schedules recurring jobs"` },
  { title: "Archives & Compression", subtitle: "tar and gzip for bundles", language: "bash", tags: ["tools"], theoryTopics: ["tar", "gzip and gunzip", "Archiving workflows"], codeTemplate: `#!/bin/bash\nmkdir -p /tmp/archive-demo\necho "data" > /tmp/archive-demo/file.txt\ntar -czf /tmp/archive-demo/backup.tar.gz -C /tmp/archive-demo file.txt\ntar -tzf /tmp/archive-demo/backup.tar.gz` },
  { title: "Networking Tools", subtitle: "curl, ping, and ssh", language: "bash", tags: ["tools"], theoryTopics: ["curl", "ping", "ssh"], codeTemplate: `#!/bin/bash\n# curl fetches URLs, ping probes hosts, ssh connects to servers.\n# These all need network access, which sandboxes may not provide.\necho "curl http://example.com"` },
  { title: "Git: Your First Commit", subtitle: "git init, add, and commit", language: "bash", tags: ["git"], theoryTopics: ["git init", "git add and commit", "git status"], codeTemplate: `#!/bin/bash\n# git needs a repository, your identity, and a filesystem.\ngit init\necho "hello" > README.md\ngit add README.md\ngit commit -m "first commit"` },
  { title: "Git: Branching", subtitle: "Parallel lines of work", language: "bash", tags: ["git"], theoryTopics: ["git branch", "git checkout", "Merging"], codeTemplate: `#!/bin/bash\ngit init\ngit checkout -b feature\necho "work" > new.txt\ngit add new.txt\ngit commit -m "add feature"\ngit checkout main\ngit merge feature` },
  { title: "Git: Remotes", subtitle: "Pushing and pulling to a server", language: "bash", tags: ["git"], theoryTopics: ["git remote", "git push", "git pull"], codeTemplate: `#!/bin/bash\n# Remotes require a network and a real repository URL.\ngit remote add origin https://example.com/repo.git\ngit push origin main\ngit pull origin main` },
  { title: "Git: History", subtitle: "Reading the commit log", language: "bash", tags: ["git"], theoryTopics: ["git log", "git diff", "git show"], codeTemplate: `#!/bin/bash\n# History commands read from an existing repository.\ngit log --oneline\ngit diff\ngit show HEAD` },
  { title: "Git: Working Trees", subtitle: "stash, restore, and clean", language: "bash", tags: ["git"], theoryTopics: ["git stash", "git restore", "git clean"], codeTemplate: `#!/bin/bash\necho "work in progress" > note.txt\ngit add note.txt\ngit stash\ngit stash list\ngit restore note.txt\ngit clean -f` },
  { title: "Git: .gitignore", subtitle: "Keeping junk out of the repo", language: "bash", tags: ["git"], theoryTopics: ["Ignore rules", "Patterns", "Tracking exceptions"], codeTemplate: `#!/bin/bash\n# .gitignore rules live in a file and need a repository to matter.\nprintf "node_modules/\\n*.log\\n" > .gitignore\ncat .gitignore` },
  { title: "Text Pipelines", subtitle: "Compose filters into reports", language: "bash", tags: ["text"], theoryTopics: ["Combining filters", "Sorting and counting", "Real pipelines"], codeTemplate: `#!/bin/bash\nprintf "banana\\napple\\nbanana\\ncherry\\n" | sort | uniq\nprintf "banana\\napple\\nbanana\\ncherry\\n" | wc -l` },
  { title: "Environment Variables", subtitle: "Configuration every process sees", language: "bash", tags: ["environment"], theoryTopics: ["env and export", "Common variables", "PATH"], codeTemplate: `#!/bin/bash\nexport MY_VAR="hello"\necho "\$MY_VAR"\necho "home: \$HOME"\necho "user: \$USER"` },
  { title: "case Statements", subtitle: "Dispatch on patterns", language: "bash", tags: ["control-flow"], theoryTopics: ["case syntax", "Pattern alternatives", "esac"], codeTemplate: `#!/bin/bash\ncmd="start"\ncase "\$cmd" in\n  start) echo "starting" ;;\n  stop) echo "stopping" ;;\n  *) echo "unknown" ;;\nesac` },
  { title: "select Menus", subtitle: "Interactive numbered choices", language: "bash", tags: ["interactive"], theoryTopics: ["select loops", "Menu prompts", "Handling choices"], codeTemplate: `#!/bin/bash\noptions=("start" "stop" "quit")\nselect choice in "\${options[@]}"; do\n  echo "chose: \$choice"\n  break\ndone` },
  { title: "Here Documents", subtitle: "Feed multi-line text into stdin", language: "bash", tags: ["io"], theoryTopics: ["<< heredoc", "Delimiter rules", "Quoted heredocs"], codeTemplate: `#!/bin/bash\ncat <<EOF\nline one\nline two\nEOF\ncat <<'EOF'\n\$HOME stays literal\nEOF` },
  { title: "Scripting Best Practices", subtitle: "shebang, set -e, and clarity", language: "bash", tags: ["scripting"], theoryTopics: ["shebang", "set -e", "Readable scripts"], codeTemplate: `#!/bin/bash\nset -e\nset -u\nname="Ada"\necho "Hello, \$name"\necho "script completed"` },
  { title: "Startup Files", subtitle: ".bashrc, .profile, and aliases", language: "bash", tags: ["environment"], theoryTopics: [".bashrc", ".profile", "Aliases"], codeTemplate: `#!/bin/bash\n# ~/.bashrc runs for interactive shells; ~/.profile for login shells.\nalias ll="ls -l"\necho "aliases live in startup files"` },
  { title: "System Information", subtitle: "uname, df, free, and top", language: "bash", tags: ["system"], theoryTopics: ["uname", "df and free", "top"], codeTemplate: `#!/bin/bash\n# uname, df, and free report host-specific values.\nuname -s\ndf -h .\nfree -m` },
  { title: "Users & Permissions", subtitle: "whoami, sudo, and chmod", language: "bash", tags: ["system"], theoryTopics: ["whoami and id", "sudo", "chmod basics"], codeTemplate: `#!/bin/bash\n# whoami, id, and sudo depend on the runtime user and privileges.\nwhoami\nid\nchmod 755 script.sh` },
  { title: "Package Management", subtitle: "apt, yum, and dnf", language: "bash", tags: ["system"], theoryTopics: ["apt concepts", "yum and dnf", "Why packages"], codeTemplate: `#!/bin/bash\n# apt and yum are distro-specific and need root + network.\n# apt-get update\n# yum install -y curl\necho "package managers install software"` },
  { title: "Shell Portability", subtitle: "sh vs bash, and POSIX features", language: "bash", tags: ["scripting"], theoryTopics: ["sh vs bash", "POSIX features", "Portable scripts"], codeTemplate: `#!/bin/bash\necho "works in sh and bash"\nif [ "\$(printf x | tr a-z A-Z)" = "X" ]; then\n  echo "portable test passed"\nfi` },
  { title: "Capstone: A Deploy Script", subtitle: "Plan, build, verify, ship", language: "bash", tags: ["capstone"], theoryTopics: ["Planning a script", "Steps and checks", "Making it robust"], codeTemplate: `#!/bin/bash\n# A deploy script builds, tests, and ships — needing fs and network.\necho "Building the project"\nmkdir -p /tmp/deploy-out\necho "#!/bin/bash" > /tmp/deploy-out/main.sh\necho "echo hello" >> /tmp/deploy-out/main.sh\necho "Deploy complete"` },
];

/* ─── Hand-written topic content ─── */

const BASH_TOPIC_CONTENT: Record<string, string> = {
  "What is a shell": "A shell is a program that reads commands, runs them, and reports results — your interface to the operating system. It combines an interactive prompt with a scripting language, so the same commands you type can be saved in a file and reused. Bash is the most common Unix shell: free, ubiquitous, and the default on nearly every Linux distribution and macOS.",
  "echo": "`echo` prints its arguments to standard output, one per invocation, each followed by a newline. It is the shell's simplest output tool and the first thing most scripts write. `printf` is the more precise cousin when you need format control; `echo` is fine for plain messages and variable values.",
  "Running commands": "You run a command by typing its name, optionally followed by arguments and options separated by spaces. The shell finds the command in PATH, runs it, and waits for it to finish. Commands can be run directly at the prompt, embedded in scripts, or combined with pipes and redirection.",
  "Assigning variables": "Variables are assigned with `name=value` — no spaces around the `=` — and hold plain text by default. Values may be quoted to preserve spaces, and referencing them always begins with `$`. Bash variables have no types; the same variable can hold `42`, `hello`, or a path without any declaration.",
  "Reading variables": "Read a variable's value with `$name`, or `${name}` when you need to delimit it from following characters — `${name}_suffix` keeps the name whole. Quoting matters: `$name` inside double quotes expands, inside single quotes it stays literal. Variables can also be read from the user with `read`, or from the environment with `env`.",
  "Quoting rules": "Single quotes preserve every character literally; double quotes preserve spaces but still expand `$var` and command substitution. Unquoted words split on spaces and undergo globbing, which is why filenames with spaces demand quotes. The rule of thumb: double-quote every expansion unless you specifically want word splitting.",
  "$1 and $2": "Positional parameters are the arguments a script was called with: `$1` is the first, `$2` the second, and so on up to `$9` (use `${10}` beyond). They give a script its input interface — `./deploy.sh prod` makes `prod` available as `$1`. Defaults like `${1:-default}` make missing arguments safe.",
  "$@ and $#": "`$@` expands to all positional parameters as separate words — perfect for `for arg in \"$@\"`. `$#` is the count of arguments, used to validate input before acting. `$0` is the script's own name, and `$*` joins all arguments into a single word.",
  "Defaults": "Shell parameter expansion provides safe defaults without branching: `${var:-value}` uses `value` when `var` is unset or empty, `${var:=value}` also assigns it. `${var:?message}` errors out when the variable is missing — a compact guard for required inputs. These forms replace many verbose if/else checks.",
  "$(( )) arithmetic": "Integer arithmetic runs inside `$(( ... ))`, where `+`, `-`, `*`, `/`, `%`, and parentheses work as expected: `sum=$((a + b))`. Operators are C-style, including `++`, `--`, and comparisons that yield 1 or 0. Arithmetic only handles integers — for floats you reach for `bc` or `awk`.",
  "Integer division": "In `$(( ))`, division is integer division: `7 / 2` is `3`, truncating any remainder. The remainder is available with `%` (modulo), so `7 % 2` is `1`. This makes the shell a poor fit for fractional math; use `awk` or `bc` when precision matters.",
  "Comparison in math": "Inside `$(( ))`, comparison operators return 1 for true and 0 for false: `$((5 > 3))` prints 1. They compare integers only — string comparisons belong in `[ ]` or `[[ ]]` with operators like `=`, `-eq`, and `-lt`. Arithmetic comparisons shine in loops and index math.",
  "> and >>": "`>` redirects a command's standard output into a file, creating or truncating it; `>>` appends instead. Redirection is performed by the shell before the command runs, so a missing file is created on the spot. This is how scripts persist data — every `echo` can become a record.",
  "< input": "`<` feeds a file's contents into a command's standard input: `sort < names.txt` reads the file as if typed. It keeps pipelines readable by making the data source explicit on the command line. Combined with heredocs, `<` lets scripts feed data to tools that read stdin.",
  "2> stderr": "`2>` redirects standard error — the channel programs use for diagnostics — into a file, leaving stdout clean. `2>&1` merges stderr into stdout, and `&>` (or `> file 2>&1`) captures both. Splitting the streams lets scripts save output separately from errors and report failures precisely.",
  "The pipe character": "The pipe `|` connects the standard output of one command to the standard input of the next: `ls | wc -l` counts files without a temp file. Each side runs in parallel, streaming data as it becomes available. Pipes are the shell's central tool for composing small programs into larger ones.",
  "Piping into commands": "Any command that reads stdin becomes a downstream filter: `grep`, `sort`, `awk`, `sed`, `head`, `tail` all consume piped data. The command on the right processes the stream line by line without waiting for the whole input. This streaming model keeps memory flat even for huge inputs.",
  "Pipelines": "A pipeline is a chain of pipes: `cat log | grep error | sort | uniq -c`. Each stage transforms the stream, and the shell only reports the exit status of the last command. Design each stage to do one job so pipelines read like a description of the data flow.",
  "if syntax": "`if` runs a command and branches on its exit status: `if command; then ...; fi`. The condition is any command, not an expression — a test like `[ \"$x\" = \"y\" ]` is just a command that returns 0 or 1. The `; then` or a newline separates the condition from the body.",
  "then and else": "`then` opens the branch taken when the condition succeeds; `else` takes the failure path. `elif` chains additional conditions in order — the first true one wins. Every `if` must end with `fi` to close the block.",
  "fi": "`fi` closes an `if` block — it is `if` spelled backwards, part of a family of mirrored closers (`case`/`esac`). Forgetting `fi` produces a confusing syntax error pointing at the next line. The mirrored-closer convention is a quick way to spot unbalanced blocks.",
  "[ ] tests": "`[ ... ]` is a command that tests an expression and returns 0 for true, 1 for false — spaces around every token are mandatory. Numeric tests use `-eq`, `-ne`, `-lt`, `-le`, `-gt`, `-ge`; string tests use `=`, `!=`, `-z`, `-n`; file tests use `-f`, `-d`, `-e`. It is a plain command, so it can be used anywhere a command goes.",
  "String tests": "String comparisons use `=`, `!=`, `-z` (empty), and `-n` (non-empty): `[ \"$name\" = \"Ada\" ]`. Quote the operands to survive empty values, since an unquoted `$name` that expands to nothing collapses the test. For pattern matching, `[[ ]]` supports `==` with wildcards and `=~` with regexes.",
  "Numeric tests": "Numeric comparisons use the letter operators `-eq`, `-ne`, `-lt`, `-le`, `-gt`, `-ge` inside `[ ]` — never `>` or `<`, which are redirection. `[ 5 -gt 3 ]` returns true because 5 is greater than 3. Mixing a non-numeric string into a numeric test is a common source of cryptic errors.",
  "for loops": "`for var in list; do ...; done` iterates over a list of words, running the body once per item with `$var` set. The list can be literal, a variable, a glob, or command output. It is the workhorse for processing sets of files, names, or numbers.",
  "while loops": "`while command; do ...; done` repeats as long as the condition command succeeds. It is the natural form for counting (`while [ \"$n\" -lt 10 ]`), reading lines (`while read line`), and waiting. Make sure the body eventually changes the condition, or the loop runs forever.",
  "break and continue": "`break` exits the enclosing loop immediately; `continue` skips the rest of the body and starts the next iteration. They let loops short-circuit — stop early once a result is found, or skip records that fail a check. Both are idiomatic Bash control flow, not crutches.",
  "Defining functions": "Functions bundle commands under a name: `greet() { echo \"Hello\"; }` defines, `greet` calls. They bring structure, reuse, and local scope (`local` variables) to otherwise linear scripts. A function behaves like a command — it can take arguments, redirect, and be used in pipes.",
  "Calling functions": "Call a function by name, possibly with arguments: `greet \"Ada\"` makes `\"Ada\"` the function's `$1`. Functions resolve names at call time, so define them before use or the shell errors. Return control with `return` or by simply letting the last command's status stand.",
  "Return values": "Functions communicate results two ways: `return N` sets an exit status (0 success), and `echo` prints output that callers capture with `$(...)`. There is no `return a value` primitive — status for decisions, stdout for data. Capture output with `result=$(myfunc)`.",
  "Searching text": "`grep` searches text for patterns and prints matching lines: `grep error app.log`. Patterns are basic regular expressions by default — `^` anchors the start, `$` the end, `.` any character. It is the first filter to reach for when hunting lines in files or streams.",
  "Common flags": "`grep -i` ignores case, `-v` inverts to non-matching lines, `-c` counts matches, `-n` adds line numbers, and `-r` searches directories recursively. `-E` enables extended regexes with `+`, `?`, and `|` alternation. Combine flags freely: `grep -ivc` reads as `count lines that don't match, ignoring case`.",
  "grep in pipes": "`grep` is the natural downstream of a pipe: `ps aux | grep node` narrows a noisy stream to what matters. Its exit status — 0 if a line matched — also works as an `if` condition. Filter early in pipelines to shrink everything downstream processes.",
  "Stream editing": "`sed` is a non-interactive editor that transforms text streams line by line: `sed 's/old/new/'` substitutes the first match per line, `s/old/new/g` every match. It reads from a file or stdin and writes the result to stdout, leaving the original untouched. sed is the classic tool for scripted text edits.",
  "Substitution": "`sed 's/pattern/replacement/'` performs search-and-replace, where the pattern is a regex and `&` in the replacement refers to the whole match. Adding a trailing number replaces only that occurrence (`s/x/y/2`), `g` replaces all. `-i` edits files in place — back up first.",
  "Printing lines": "`sed -n '5p'` prints only line 5; `sed -n '1,3p'` prints a range, suppressing automatic output with `-n`. Line addresses can precede any command: `2d` deletes line 2, `/pattern/d` deletes matches. This turns sed into a precise line-level extractor.",
  "Field splitting": "`awk` splits each input line into fields automatically: `$1` is the first field, `$2` the second, and the separator defaults to whitespace. Field boundaries follow runs of spaces/tabs, so extra whitespace is ignored. This built-in splitting is awk's superpower over sed for columnar data.",
  "Printing columns": "`awk '{ print $2 }'` prints just the second column of every line — the quickest way to extract a field. You can reorder or combine: `awk '{ print $2, $1 }'`, or print whole lines with `$0`. Add conditions to filter: `awk '$3 > 100 { print $1 }'`.",
  "Simple programs": "An awk invocation is a tiny program: `BEGIN { ... }` runs before input, `{ ... }` per line, `END { ... }` after. It has its own variables, arithmetic, and strings — `awk '{ s += $1 } END { print s }'` sums a column. When the shell's math or field handling gets awkward, awk takes over.",
  "Length": "`${#var}` yields the length of a variable's value in characters: `name=hello; echo ${#name}` prints 5. It works on arrays too — `${#arr[@]}` is the element count. Length checks are the standard way to validate input before use.",
  "Substrings": "`${var:offset:length}` extracts a slice of a string, starting at `offset` (0-based): `${name:1:3}` takes characters 1 through 3. Omitting `:length` takes everything from the offset on. It replaces much of what other languages do with `slice` or `substr`.",
  "Case conversion": "`${var^^}` uppercases a variable and `${var,,}` lowercases it — bash's native case conversion. Patterns like `${var^^[a-e]}` scope conversion to a character class. For older shells or finer control, `tr 'a-z' 'A-Z'` is the portable alternative.",
  "$( ) syntax": "Command substitution `$(command)` runs a command and substitutes its stdout into the surrounding text: `files=$(ls)`. The `$(` opens a new quoting context, so quotes inside are nested safely. It is the modern form — backticks are deprecated and mangle quoting.",
  "Capturing output": "Assign command output to a variable with `name=$(cmd)` and it becomes data to reuse. Trailing newlines are stripped, so `$(printf \"a\\nb\\n\")` yields `a` and `b` as separate words only when unquoted. Capture early, then iterate or test the value.",
  "Nesting": "Command substitution nests: `echo $(basename $(ls))` runs the inner command first and feeds its output to the outer. Each layer opens its own quoting context, which is why `$()` beats backticks for nested work. Deep nesting still hurts readability — assign intermediates to variables.",
  "Brace expansion": "Brace expansion generates words from a pattern: `{a,b,c}` produces `a b c`, `{1..5}` produces `1 2 3 4 5`. It happens before other expansions, so you can build argument lists compactly: `mkdir dir/{src,tests}`. Unlike globs, braces match nothing — they purely generate.",
  "Wildcards": "Globs match existing files: `*` matches any string, `?` one character, `[abc]` one of a set. `*.txt` expands to every `.txt` file in the current directory — the shell does the matching. An unmatched glob stays literal, which is why quoted patterns reach `grep` intact.",
  "Tilde expansion": "`~` expands to the current user's home directory, `~user` to another user's home. It is one of the earliest expansions, so `~/bin/script` works anywhere a path does. It never touches the filesystem — it is pure substitution of a known path.",
  "Declaring arrays": "Arrays hold an ordered list: `names=(\"Ada\" \"Bob\" \"Eve\")` declares one, `names+=(X)` appends. Elements are indexed from zero, and the whole array is referenced as `\"${names[@]}\"`. Arrays replace tedious comma-string parsing for lists of files, users, or flags.",
  "Indexing": "Array elements are read with `${names[0]}`, `${names[1]}`, and so on — the braces are required. `\"${arr[@]}\"` expands to all elements as separate words, the safe form for iteration. Assign by index too: `names[2]=\"Eve\"` sets or creates a slot.",
  "Length and iteration": "`${#arr[@]}` is the element count, `${#arr[0]}` the length of one element. Iterate with `for n in \"${arr[@]}\"; do ...; done`, keeping the quotes so spaces inside elements survive. This pattern — declare, count, iterate — covers nearly every list need.",
  "$?": "`$?` holds the exit status of the last command: 0 means success, any nonzero means failure. Check it immediately after a command, before other commands overwrite it. It is the raw material for error handling — `cmd || handle`, or `if [ \"$?\" -ne 0 ]`.",
  "exit": "`exit N` ends the script immediately with status N — `exit 0` success, `exit 1` failure. A script's final exit status is whatever the last command returned, so explicit `exit` makes intent clear. Error-checking scripts lean on this to fail fast.",
  "Success and failure": "Exit status is the shell's only built-in signal of success: zero for success, nonzero for a specific failure mode (1 general, 2 usage, 127 command not found). Every command — built-in or external — returns one. `&&` runs the next command only on success; `||` only on failure.",
  "& background": "A trailing `&` runs a command in the background, returning the prompt immediately while the job runs alongside. The shell reports a job number and PID: `long_task &`. Background jobs let scripts start work and continue instead of blocking.",
  "wait": "`wait` pauses until all background jobs finish; `wait $pid` waits on one specific job. It is how scripts reap what they started, guaranteeing results before moving on. After `wait`, the last job's status is available in `$?`.",
  "Job control basics": "Jobs — foreground and background commands — are tracked by the shell with job numbers and PIDs. `jobs` lists them, `fg` brings one to the foreground, `bg` resumes one in the background, and Ctrl+Z suspends the current job. Job control is the interactive side of process management.",
  "cron concepts": "`cron` runs commands on a schedule maintained by the system daemon. Each user's crontab lists entries as five time fields (minute, hour, day-of-month, month, day-of-week) plus the command. It is how servers do recurring work — backups, cleanup, reports — without anyone present.",
  "at": "`at` runs a command once at a specified time: `echo \"backup\" | at 2am` schedules it. Unlike cron's repeating schedule, `at` is for one-shot deferred work. Its queue is managed with `atq` (list) and `atrm` (remove).",
  "Why scheduling matters": "Automation is the payoff of scripting: scheduled jobs turn repeatable manual steps into background routine. Cron handles the `every day/hour` cadence, `at` the `later today` ones. Reliable schedules need logging and error handling — a failing cron job that emails nowhere is a silent bug.",
  "tar": "`tar` bundles files and directories into a single archive: `tar -czf backup.tar.gz dir/` creates one, `tar -xzf backup.tar.gz` restores it. The flags matter: `c` create, `x` extract, `z` gzip, `f` filename, `t` list. tar preserves structure and permissions, making it the standard distribution and backup format.",
  "gzip and gunzip": "`gzip file` compresses a file in place to `file.gz`; `gunzip file.gz` restores it. gzip works on single streams, which is why it pairs with tar rather than replacing it. For speed over ratio, `gzip -1`; for best compression, `gzip -9`.",
  "Archiving workflows": "The classic workflow: create, inspect, extract. `tar -czf` builds the archive, `tar -tzf` lists contents before unpacking, `tar -xzf` restores. Automate backups with a script that stamps the filename with the date and prunes old archives.",
  "curl": "`curl` transfers data over the network: `curl URL` prints a page, `curl -o file URL` saves it, `curl -I URL` shows headers. It supports HTTP, HTTPS, FTP, and more with flags for methods (`-X`), data (`-d`), and headers (`-H`). It is the default tool for testing APIs and pulling remote assets.",
  "ping": "`ping host` probes whether a host is reachable and measures round-trip latency, sending ICMP echo requests. Each reply line shows time; failures mean the host is down, firewalled, or off-network. `ping -c 4` limits the count for a quick scripted check.",
  "ssh": "`ssh user@host` opens a secure, encrypted shell on a remote machine; `scp` and `rsync` build on the same protocol for copying files. Keys replace passwords: `ssh-keygen` creates them, `ssh-copy-id` installs one on the server. SSH is the backbone of remote administration and deployment.",
  "git init": "`git init` creates a new repository in the current directory — a `.git` folder holding all history and configuration. It is the starting point for both brand-new projects and adopting Git for an existing folder. A repo with no commits is empty; the first commit defines the starting state.",
  "git add and commit": "`git add file` stages changes into the index; `git commit -m \"message\"` records the staged snapshot permanently. Staging is a review gate — you choose exactly what the commit contains. Commits are the history: each one is a reversible checkpoint of the whole tree.",
  "git status": "`git status` reports the working tree's state: staged changes, modified-but-unstaged files, untracked files, and the current branch. It answers `what would the next commit contain?`. Checking status before committing is a reflex that prevents accidental or incomplete snapshots.",
  "git branch": "A branch is a movable pointer to a commit — `git branch feature` creates one, `git branch` lists them. Branching isolates work so experiments never disturb the main line. Branches are cheap and local, encouraging many small, focused lines of work.",
  "git checkout": "`git checkout branch` switches the working tree to another branch; `git checkout -b name` creates and switches in one step. Checkout rewrites files to match the target branch, so uncommitted changes can block or complicate it. In modern Git, `git switch` is the clearer synonym.",
  "Merging": "`git merge branch` folds a branch's commits into the current branch, preserving history with a merge commit (or fast-forwarding when possible). Conflicts arise when both sides changed the same lines — resolve them, stage, then commit. Merging is how parallel work becomes one coherent history.",
  "git remote": "A remote is a named repository elsewhere — `git remote add origin URL` attaches one, `git remote -v` lists them. The conventional name is `origin` for the primary upstream. Remotes turn local repositories into participants in shared, collaborative projects.",
  "git push": "`git push origin main` uploads local commits to a remote branch, publishing your work. The remote must accept the push — no conflicts, adequate permissions, and up to date. Push is how local effort becomes shared, reviewed, and deployed.",
  "git pull": "`git pull origin main` fetches remote changes and merges them into the current branch — it is `fetch` plus `merge`. It keeps local work in sync with collaborators. Pull before pushing to minimize merge conflicts.",
  "git log": "`git log` walks commit history newest-first: hashes, authors, dates, and messages. `git log --oneline` condenses each commit to one line, `--graph` adds the branch topology. It is the audit trail — every change recorded, searchable, and attributable.",
  "git diff": "`git diff` shows unstaged changes line by line — what has been edited since the last commit. `git diff --staged` shows the staged ones. Reading diffs before committing is the final review of exactly what will be recorded.",
  "git show": "`git show` displays a single commit's metadata and patch — who changed what, when, and how. `git show HEAD` reveals the latest commit's full diff. It is the fastest way to inspect a specific point in history without browsing the log.",
  "git stash": "`git stash` shelves uncommitted changes and restores a clean tree, letting you switch branches without losing work. `git stash pop` brings the changes back. It is a safety net for `I need to switch NOW` moments, not a replacement for commits.",
  "git restore": "`git restore file` discards unstaged changes, returning the file to the last commit — the replacement for the old `git checkout -- file`. Combined with `--staged`, it unstages without touching the working file. Restore is the controlled way to undo local edits.",
  "git clean": "`git clean` removes untracked files from the working tree; `-f` forces it, `-d` includes directories. It is destructive — there is no history for untracked files — so preview with `git clean -n` first. It pairs with `git restore` to fully reset a messy tree.",
  "Ignore rules": "`.gitignore` declares patterns for files Git should not track — build output, secrets, editor junk. Each line is a rule, and the file lives at the repository root (or in any directory). Committing a good `.gitignore` first saves you from accidentally committing artifacts.",
  "Patterns": "Ignore patterns are globs: `node_modules/` ignores a directory, `*.log` any matching file, `!keep.log` re-includes an exception. A leading `/` anchors to the repo root; a trailing `/` means a directory. Patterns apply recursively unless anchored, and later rules can override earlier ones.",
  "Tracking exceptions": "`!` negates an ignore rule, re-including something a broader pattern excluded. Order matters — re-includes must come after the rule they overturn, and you cannot re-include a file inside an ignored directory. Exceptions let you keep `.env.example` while ignoring `.env`.",
  "Combining filters": "Text pipelines compose single-purpose filters: `grep` selects lines, `sed` edits them, `awk` extracts fields, `sort` orders, `uniq` deduplicates, `head`/`tail` trim. Each stage passes a text stream to the next, and the whole chain runs in parallel. Master these tools and data wrangling becomes assembly, not programming.",
  "Sorting and counting": "`sort` orders lines alphabetically or numerically (`-n`), `uniq` collapses adjacent duplicates (sort first!), and `wc -l` counts lines. Together they answer `how many unique X` — `sort | uniq | wc -l`. `uniq -c` even prefixes each line with its count.",
  "Real pipelines": "A realistic pipeline narrows, transforms, and summarizes in one line: `cat app.log | grep -i error | awk '{print $2}' | sort | uniq -c | sort -rn`. Reading it top-to-bottom is a description of the report. Building pipelines incrementally — verify each stage's output before adding the next — avoids compounding bugs.",
  "env and export": "`export name=value` marks a variable for the environment — child processes inherit exported variables, not plain ones. `env` lists the current environment, and `env VAR=value cmd` runs a command with a one-off variable. Exporting is how configuration crosses the script boundary into other programs.",
  "Common variables": "Standard environment variables carry convention and configuration: `HOME` (home directory), `PATH` (command search path), `USER` (login name), `SHELL`, `LANG` (locale), and `PWD`. Scripts read them as `$HOME`/`$PATH` to locate files and behave per-user. They exist because every process needs shared context.",
  "PATH": "`PATH` is the colon-separated list of directories the shell searches for commands — `echo $PATH` shows it. Commands resolve left to right, so directory order sets precedence. Adding `export PATH=\"$HOME/bin:$PATH\"` in a startup file makes your tools globally callable.",
  "case syntax": "`case \"$value\" in pattern) commands ;; esac` dispatches on exact or pattern matches. Each branch is a pattern (literal, glob, or `|`-separated alternatives) followed by `;;`. The `*` branch is the default. It replaces chains of `if [ ... ]` with readable, table-like dispatch.",
  "Pattern alternatives": "Case branches accept any glob, not just literals: `a|b)` matches either word, `*.png)` any png filename, `[0-9]*)` anything starting with a digit. Patterns are checked in order, first match wins. This makes `case` a compact router for command names, file types, and small parse jobs.",
  "esac": "`esac` closes a `case` block — `case` spelled backwards, matching the shell's mirrored-closer family. Each branch ends with `;;` and the whole block with `esac`. Getting the close right is the difference between a clean dispatcher and a syntax error.",
  "select loops": "`select name in list; do ...; done` prints a numbered menu and reads the user's choice into the variable. The loop body runs once per selection until `break`. It is the shortest path to an interactive menu in a script.",
  "Menu prompts": "A `select` menu renders each option as a numbered line and prompts on stderr with `PS3` — set `PS3=\"Choose: \"` to customize. The choice is stored as the option's value, and the reply is in `REPLY`. Validate the choice before acting on it.",
  "Handling choices": "In a select loop, branch on the chosen value with `case` and `break` to exit: `case \"$choice\" in start) ... ;; quit) break ;; esac`. Guard against invalid input with a `*` branch. The menu-handler pattern — select, case, break — is how interactive scripts stay simple.",
  "<< heredoc": "A here-document feeds multi-line text into a command's stdin: `cat <<EOF ... EOF`. The delimiter (here `EOF`) marks the end, and anything between is the input. Heredocs build files, prompts, and command input without echo lines.",
  "Delimiter rules": "The ending delimiter must appear alone on its own line with nothing after it — no trailing spaces, or the heredoc never terminates. The opening delimiter is arbitrary but conventional (`EOF`, `END`), chosen to avoid collision with the content. Indentation is preserved unless you use `<<-`.",
  "Quoted heredocs": "Quoting the delimiter — `<<'EOF'` — disables expansion inside the heredoc, so `$HOME` stays literal. An unquoted delimiter expands variables and command substitution. Choose quoted heredocs when writing code or text that must not be interpreted.",
  "shebang": "The first line `#!/bin/bash` tells the kernel which interpreter to run when a script is executed as `./script.sh`. It is optional when you run `bash script.sh` explicitly, but it makes scripts self-executing. Pair it with `chmod +x script` to make the file directly runnable.",
  "set -e": "`set -e` makes the script exit immediately when any command fails — no silent errors rolling forward. `set -u` errors on unset variables, catching typos; `set -o pipefail` makes a pipeline fail if any stage fails. Together they turn a fragile script into one that fails fast and loud.",
  "Readable scripts": "Readable scripts use functions, meaningful names, consistent indentation, and short stages — a script is code, not a pile of incantations. Add `set -euo pipefail` at the top, define helpers, and keep each command's purpose visible. Debug with `set -x` (trace) when behavior surprises you.",
  ".bashrc": "`.bashrc` in your home directory runs for every interactive (non-login) bash shell — the place for aliases, prompt tweaks, and function definitions. It is read on each new terminal, so edits apply immediately to new shells. Keep it idempotent — it runs many times a day.",
  ".profile": "`.profile` (or `.bash_profile`) runs once at login for login shells — the place for environment setup like PATH additions and exported variables. Login shells read one or the other, rarely both cleanly. Rule of thumb: exports in the profile, aliases in `.bashrc`, and source `.bashrc` from the profile.",
  "Aliases": "Aliases are shorthand: `alias ll=\"ls -l\"` makes `ll` run `ls -l`; `unalias ll` removes it. They substitute text, not commands, so they work only where a simple name appears. Aliases are interactive conveniences — in scripts, use functions instead.",
  "uname": "`uname` reports system identity: `uname -s` the kernel name, `-r` the release, `-m` the machine architecture, and `-a` everything at once. Scripts use it to branch on OS or architecture — install paths and tooling differ per platform. Output like `Linux`, `Darwin`, or `MINGW64_NT-*` reveals the host.",
  "df and free": "`df -h` shows filesystem usage in human-readable units — where space is consumed and how much remains. `free -m` reports memory: total, used, and available RAM. Both are the first commands for capacity questions: `is the disk full?` and `why is it swapping?`.",
  "top": "`top` shows live processes sorted by CPU usage, updating in place. It answers `what is eating the machine?` with per-process CPU, memory, and command lines. Batch mode (`top -b -n 1`) outputs a snapshot suitable for scripts and logs.",
  "whoami and id": "`whoami` prints the current user's name; `id` prints the full identity — uid, gid, and all group memberships. Scripts use them to check privileges before acting: `[ \"$(whoami)\" = root ]`. Permissions attach to users and groups, so knowing your identity explains what you may and may not do.",
  "sudo": "`sudo command` runs a command with root privileges, requiring your password and authorization from `/etc/sudoers`. It is the controlled gate to privileged operations — package installs, system config, service management. Use the least privilege that works; scripts needing root should check and document it.",
  "chmod basics": "`chmod` changes file permissions: symbolic forms like `chmod +x script` add execute, `chmod 755 file` set octal `rwxr-xr-x`. The three digits are owner, group, others, each r(4) w(2) x(1) summed. `+x` on a script is the standard step before running it.",
  "apt concepts": "`apt` is Debian/Ubuntu's package manager: `apt update` refreshes the package index, `apt install pkg` installs, `apt upgrade` updates everything. Packages carry precompiled binaries plus dependency metadata, and apt resolves the graph. It needs root and network — the reason container images bake installs into build steps.",
  "yum and dnf": "`yum` (and its successor `dnf`) is the RPM-family package manager for RHEL, CentOS, and Fedora: `yum install pkg`, `yum update`. It mirrors apt's role on the Red Hat side of the Linux world. Knowing both means you can provision either distro family from scripts.",
  "Why packages": "Package managers solve the supply chain: signed, versioned software with dependencies resolved automatically. Installing from packages beats building from source for speed, security updates, and uninstallability. A script that provisions a machine should use the package manager, not hand-copied binaries.",
  "sh vs bash": "`sh` is the POSIX shell — the lowest common denominator — while `bash` is its far richer superset with arrays, `[[ ]]`, `${var^^}`, and `$(( ))` extras. Scripts with `#!/bin/sh` must avoid bash-only features to run on minimal systems. Bash-only scripts are fine when you control the runtime; declare the shebang accordingly.",
  "POSIX features": "POSIX defines the portable shell subset: `for`/`while`/`case`, `$@`/`$#`, `[ ]` tests, and basic expansion. Writing to it keeps scripts running on any Unix — busybox, dash, ksh, or bash. Portability costs convenience (no arrays, no `[[ ]]`); choose the strictness to match your deployment.",
  "Portable scripts": "A portable script declares `#!/bin/sh`, uses only POSIX features, quotes every expansion, and avoids platform-specific flags. Test it with `dash` or busybox, not just bash. Portability matters when a script must run on unknown or minimal hosts — deployment glue is the classic case.",
  "Planning a script": "A real script starts with a plan: what input it takes, what steps run in what order, and what failure looks like. Sketch the pipeline on paper — gather, transform, act, verify — before typing. The plan becomes the script's function boundaries and its `set -e` guardrails.",
  "Steps and checks": "Deploy-style scripts sequence discrete steps — build, test, package, publish — each with a success check before the next. Guard each stage: fail fast with a clear message and nonzero exit. Log what happened (`echo \"[ok] tests passed\"`) so the run is auditable.",
  "Making it robust": "Robustness is defense in depth: `set -euo pipefail`, defaults for missing arguments, checks for prerequisites, idempotent actions, and explicit exit codes. A robust script still works when run twice, from another directory, or by another user. It fails loudly and tells you exactly where.",
};

/* ─── Quiz map ─── */

const BASH_QUIZ_MAP: Record<string, { q: string; opts: { id: string; text: string; correct?: boolean }[] }> = {
  "What is a shell": {
    q: "What is a shell?",
    opts: [
      { id: "a", text: "A program that reads and runs your commands", correct: true },
      { id: "b", text: "A hardware component", correct: false },
      { id: "c", text: "A text editor", correct: false },
      { id: "d", text: "A compiler", correct: false },
    ],
  },
  "echo": {
    q: "What does echo \"hello\" print?",
    opts: [
      { id: "a", text: "hello", correct: true },
      { id: "b", text: "The command name echo", correct: false },
      { id: "c", text: "Nothing", correct: false },
      { id: "d", text: "An error message", correct: false },
    ],
  },
  "Assigning variables": {
    q: "Which assignment is valid in Bash?",
    opts: [
      { id: "a", text: "name=Ada", correct: true },
      { id: "b", text: "name = Ada", correct: false },
      { id: "c", text: "name: Ada", correct: false },
      { id: "d", text: "set name Ada", correct: false },
    ],
  },
  "Reading variables": {
    q: "How do you read the value of a variable named name?",
    opts: [
      { id: "a", text: "\"$name\"", correct: true },
      { id: "b", text: "name()", correct: false },
      { id: "c", text: "read(name)", correct: false },
      { id: "d", text: "@name", correct: false },
    ],
  },
  "$1 and $2": {
    q: "What is $1 inside a script?",
    opts: [
      { id: "a", text: "The first argument passed to the script", correct: true },
      { id: "b", text: "The script name", correct: false },
      { id: "c", text: "The current directory", correct: false },
      { id: "d", text: "Always empty", correct: false },
    ],
  },
  "$@ and $#": {
    q: "What does $# hold?",
    opts: [
      { id: "a", text: "The number of arguments", correct: true },
      { id: "b", text: "The last argument", correct: false },
      { id: "c", text: "The script name", correct: false },
      { id: "d", text: "The exit status", correct: false },
    ],
  },
  "$(( )) arithmetic": {
    q: "Which syntax performs integer arithmetic in Bash?",
    opts: [
      { id: "a", text: "$(( ... ))", correct: true },
      { id: "b", text: "( ... )", correct: false },
      { id: "c", text: "[ ... ]", correct: false },
      { id: "d", text: "calc( ... )", correct: false },
    ],
  },
  "Integer division": {
    q: "What is $((7 / 2))?",
    opts: [
      { id: "a", text: "3", correct: true },
      { id: "b", text: "3.5", correct: false },
      { id: "c", text: "4", correct: false },
      { id: "d", text: "2", correct: false },
    ],
  },
  "> and >>": {
    q: "What does > do to an existing file?",
    opts: [
      { id: "a", text: "Truncates and overwrites it", correct: true },
      { id: "b", text: "Appends to it", correct: false },
      { id: "c", text: "Deletes it", correct: false },
      { id: "d", text: "Reads it", correct: false },
    ],
  },
  "< input": {
    q: "What does < do?",
    opts: [
      { id: "a", text: "Feeds a file into a command's stdin", correct: true },
      { id: "b", text: "Writes a file", correct: false },
      { id: "c", text: "Compares two files", correct: false },
      { id: "d", text: "Redirects errors", correct: false },
    ],
  },
  "The pipe character": {
    q: "What connects command A's stdout to command B's stdin?",
    opts: [
      { id: "a", text: "The pipe |", correct: true },
      { id: "b", text: "The ampersand &", correct: false },
      { id: "c", text: "The semicolon ;", correct: false },
      { id: "d", text: "The greater-than >", correct: false },
    ],
  },
  "Piping into commands": {
    q: "Which command typically consumes piped input?",
    opts: [
      { id: "a", text: "grep", correct: true },
      { id: "b", text: "cd", correct: false },
      { id: "c", text: "rm", correct: false },
      { id: "d", text: "alias", correct: false },
    ],
  },
  "if syntax": {
    q: "Which structure is a valid if?",
    opts: [
      { id: "a", text: "if [ cond ]; then ...; fi", correct: true },
      { id: "b", text: "if (cond) { ... }", correct: false },
      { id: "c", text: "when cond do ...", correct: false },
      { id: "d", text: "if cond { ... }", correct: false },
    ],
  },
  "then and else": {
    q: "When does the else branch run?",
    opts: [
      { id: "a", text: "When the if condition fails", correct: true },
      { id: "b", text: "When it succeeds", correct: false },
      { id: "c", text: "Always", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "[ ] tests": {
    q: "What does [ ] actually do?",
    opts: [
      { id: "a", text: "It runs a test command returning 0 or 1", correct: true },
      { id: "b", text: "It defines an array", correct: false },
      { id: "c", text: "It comments a line", correct: false },
      { id: "d", text: "It redirects output", correct: false },
    ],
  },
  "String tests": {
    q: "Which test checks that a variable is non-empty?",
    opts: [
      { id: "a", text: "[ -n \"$var\" ]", correct: true },
      { id: "b", text: "[ -z \"$var\" ]", correct: false },
      { id: "c", text: "[ \"$var\" -eq \"\" ]", correct: false },
      { id: "d", text: "[ empty \"$var\" ]", correct: false },
    ],
  },
  "for loops": {
    q: "What does `for x in 1 2 3; do ...; done` iterate over?",
    opts: [
      { id: "a", text: "The words 1 2 3", correct: true },
      { id: "b", text: "The files in /", correct: false },
      { id: "c", text: "Numbers 1 through 3 via arithmetic", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "while loops": {
    q: "When does a while loop keep running?",
    opts: [
      { id: "a", text: "While its condition command succeeds", correct: true },
      { id: "b", text: "Until it reaches 10 lines", correct: false },
      { id: "c", text: "Forever always", correct: false },
      { id: "d", text: "Only once", correct: false },
    ],
  },
  "Defining functions": {
    q: "Which defines a function named greet?",
    opts: [
      { id: "a", text: "greet() { echo hi; }", correct: true },
      { id: "b", text: "function = greet", correct: false },
      { id: "c", text: "def greet():", correct: false },
      { id: "d", text: "greet => { echo hi; }", correct: false },
    ],
  },
  "Calling functions": {
    q: "How do you call a function greet with the argument Ada?",
    opts: [
      { id: "a", text: "greet \"Ada\"", correct: true },
      { id: "b", text: "$greet(Ada)", correct: false },
      { id: "c", text: "call greet Ada", correct: false },
      { id: "d", text: "run.greet Ada", correct: false },
    ],
  },
  "Searching text": {
    q: "What does grep print?",
    opts: [
      { id: "a", text: "Lines matching the pattern", correct: true },
      { id: "b", text: "Every line always", correct: false },
      { id: "c", text: "Only the first word", correct: false },
      { id: "d", text: "A count of files", correct: false },
    ],
  },
  "Common flags": {
    q: "Which flag makes grep ignore case?",
    opts: [
      { id: "a", text: "-i", correct: true },
      { id: "b", text: "-v", correct: false },
      { id: "c", text: "-c", correct: false },
      { id: "d", text: "-n", correct: false },
    ],
  },
  "Stream editing": {
    q: "What is sed's typical job?",
    opts: [
      { id: "a", text: "Transform text streams line by line", correct: true },
      { id: "b", text: "Edit binary files", correct: false },
      { id: "c", text: "Compress data", correct: false },
      { id: "d", text: "Run network requests", correct: false },
    ],
  },
  "Substitution": {
    q: "What does sed 's/a/b/g' do?",
    opts: [
      { id: "a", text: "Replaces every a with b per line", correct: true },
      { id: "b", text: "Replaces the first b with a", correct: false },
      { id: "c", text: "Deletes lines containing a", correct: false },
      { id: "d", text: "Sorts the lines", correct: false },
    ],
  },
  "Field splitting": {
    q: "In awk, what is $2?",
    opts: [
      { id: "a", text: "The second whitespace-separated field of a line", correct: true },
      { id: "b", text: "The whole line", correct: false },
      { id: "c", text: "The file name", correct: false },
      { id: "d", text: "The line count", correct: false },
    ],
  },
  "Printing columns": {
    q: "Which prints only the first column of each line?",
    opts: [
      { id: "a", text: "awk '{ print $1 }'", correct: true },
      { id: "b", text: "awk '{ print }'", correct: false },
      { id: "c", text: "grep -o '^'", correct: false },
      { id: "d", text: "sed '1p'", correct: false },
    ],
  },
  "Length": {
    q: "What does ${#name} give?",
    opts: [
      { id: "a", text: "The character length of name", correct: true },
      { id: "b", text: "The first character", correct: false },
      { id: "c", text: "The array index", correct: false },
      { id: "d", text: "A syntax error", correct: false },
    ],
  },
  "Substrings": {
    q: "What does ${name:1:3} extract?",
    opts: [
      { id: "a", text: "Three characters starting at index 1", correct: true },
      { id: "b", text: "Characters 1 and 3", correct: false },
      { id: "c", text: "The first three lines", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "$( ) syntax": {
    q: "What does x=$(date) do?",
    opts: [
      { id: "a", text: "Runs date and stores its output in x", correct: true },
      { id: "b", text: "Assigns the literal text $(date)", correct: false },
      { id: "c", text: "Prints the date", correct: false },
      { id: "d", text: "Errors out", correct: false },
    ],
  },
  "Capturing output": {
    q: "How do you store a command's stdout in a variable?",
    opts: [
      { id: "a", text: "var=$(command)", correct: true },
      { id: "b", text: "var = command", correct: false },
      { id: "c", text: "var: command", correct: false },
      { id: "d", text: "capture command var", correct: false },
    ],
  },
  "Brace expansion": {
    q: "What does echo {a,b,c} print?",
    opts: [
      { id: "a", text: "a b c", correct: true },
      { id: "b", text: "{a,b,c}", correct: false },
      { id: "c", text: "abc", correct: false },
      { id: "d", text: "a,b,c", correct: false },
    ],
  },
  "Wildcards": {
    q: "What does *.txt match?",
    opts: [
      { id: "a", text: "Existing files ending in .txt", correct: true },
      { id: "b", text: "Any text file on disk", correct: false },
      { id: "c", text: "One file named *.txt", correct: false },
      { id: "d", text: "Nothing always", correct: false },
    ],
  },
  "Declaring arrays": {
    q: "Which declares an array?",
    opts: [
      { id: "a", text: "names=(\"Ada\" \"Bob\")", correct: true },
      { id: "b", text: "array names Ada Bob", correct: false },
      { id: "c", text: "names = [Ada, Bob]", correct: false },
      { id: "d", text: "declare -a names Ada", correct: false },
    ],
  },
  "Indexing": {
    q: "How do you read the first element of an array names?",
    opts: [
      { id: "a", text: "${names[0]}", correct: true },
      { id: "b", text: "$names[0]", correct: false },
      { id: "c", text: "$names(0)", correct: false },
      { id: "d", text: "names.first", correct: false },
    ],
  },
  "$?": {
    q: "What does $? hold after a command runs?",
    opts: [
      { id: "a", text: "The last command's exit status", correct: true },
      { id: "b", text: "The current PID", correct: false },
      { id: "c", text: "The last argument", correct: false },
      { id: "d", text: "The current user", correct: false },
    ],
  },
  "exit": {
    q: "What does exit 1 do?",
    opts: [
      { id: "a", text: "Ends the script with status 1", correct: true },
      { id: "b", text: "Restarts the script", correct: false },
      { id: "c", text: "Prints the number 1", correct: false },
      { id: "d", text: "Ignores errors", correct: false },
    ],
  },
  "& background": {
    q: "What does a trailing & do?",
    opts: [
      { id: "a", text: "Runs the command in the background", correct: true },
      { id: "b", text: "Runs it twice", correct: false },
      { id: "c", text: "Waits for it", correct: false },
      { id: "d", text: "Pipes its output", correct: false },
    ],
  },
  "wait": {
    q: "What does wait do?",
    opts: [
      { id: "a", text: "Pauses until background jobs finish", correct: true },
      { id: "b", text: "Sleeps for 1 second", correct: false },
      { id: "c", text: "Kills all jobs", correct: false },
      { id: "d", text: "Prints job IDs", correct: false },
    ],
  },
  "cron concepts": {
    q: "What does cron do?",
    opts: [
      { id: "a", text: "Runs commands on a fixed schedule", correct: true },
      { id: "b", text: "Compresses files", correct: false },
      { id: "c", text: "Manages users", correct: false },
      { id: "d", text: "Configures the network", correct: false },
    ],
  },
  "at": {
    q: "at is for:",
    opts: [
      { id: "a", text: "One-shot deferred commands", correct: true },
      { id: "b", text: "Repeating schedules", correct: false },
      { id: "c", text: "Rebooting servers", correct: false },
      { id: "d", text: "Text editing", correct: false },
    ],
  },
  "tar": {
    q: "Which tar flags create a gzipped archive?",
    opts: [
      { id: "a", text: "-czf", correct: true },
      { id: "b", text: "-xzf", correct: false },
      { id: "c", text: "-tf", correct: false },
      { id: "d", text: "-tv", correct: false },
    ],
  },
  "gzip and gunzip": {
    q: "What does gzip do?",
    opts: [
      { id: "a", text: "Compresses a file to .gz", correct: true },
      { id: "b", text: "Archives a directory", correct: false },
      { id: "c", text: "Encrypts a file", correct: false },
      { id: "d", text: "Prints a file", correct: false },
    ],
  },
  "curl": {
    q: "curl is used to:",
    opts: [
      { id: "a", text: "Transfer data over the network", correct: true },
      { id: "b", text: "Compress directories", correct: false },
      { id: "c", text: "Print line numbers", correct: false },
      { id: "d", text: "Compare files", correct: false },
    ],
  },
  "ping": {
    q: "What does ping measure?",
    opts: [
      { id: "a", text: "Host reachability and latency", correct: true },
      { id: "b", text: "CPU usage", correct: false },
      { id: "c", text: "Disk space", correct: false },
      { id: "d", text: "Memory usage", correct: false },
    ],
  },
  "git init": {
    q: "What does git init create?",
    opts: [
      { id: "a", text: "A new repository in the current directory", correct: true },
      { id: "b", text: "A branch named init", correct: false },
      { id: "c", text: "A commit", correct: false },
      { id: "d", text: "A remote", correct: false },
    ],
  },
  "git add and commit": {
    q: "Which pair records a snapshot?",
    opts: [
      { id: "a", text: "git add then git commit", correct: true },
      { id: "b", text: "git status then git log", correct: false },
      { id: "c", text: "git init then git push", correct: false },
      { id: "d", text: "git stash then git pop", correct: false },
    ],
  },
  "git branch": {
    q: "What is a branch?",
    opts: [
      { id: "a", text: "A movable pointer to a commit", correct: true },
      { id: "b", text: "A copy of the repository", correct: false },
      { id: "c", text: "A backup file", correct: false },
      { id: "d", text: "A remote URL", correct: false },
    ],
  },
  "git checkout": {
    q: "What does git checkout main do?",
    opts: [
      { id: "a", text: "Switches the working tree to main", correct: true },
      { id: "b", text: "Deletes main", correct: false },
      { id: "c", text: "Creates main", correct: false },
      { id: "d", text: "Merges main", correct: false },
    ],
  },
  "git remote": {
    q: "What is a remote?",
    opts: [
      { id: "a", text: "A named reference to another repository", correct: true },
      { id: "b", text: "A backup branch", correct: false },
      { id: "c", text: "A server process", correct: false },
      { id: "d", text: "A file on disk", correct: false },
    ],
  },
  "git push": {
    q: "What does git push origin main do?",
    opts: [
      { id: "a", text: "Uploads local commits to the remote branch", correct: true },
      { id: "b", text: "Downloads commits", correct: false },
      { id: "c", text: "Deletes the branch", correct: false },
      { id: "d", text: "Starts a server", correct: false },
    ],
  },
  "git log": {
    q: "What does git log show?",
    opts: [
      { id: "a", text: "Commit history, newest first", correct: true },
      { id: "b", text: "Only untracked files", correct: false },
      { id: "c", text: "Disk usage", correct: false },
      { id: "d", text: "Current changes", correct: false },
    ],
  },
  "git diff": {
    q: "What does git diff display?",
    opts: [
      { id: "a", text: "Uncommitted line-by-line changes", correct: true },
      { id: "b", text: "Commit authors", correct: false },
      { id: "c", text: "Remote URLs", correct: false },
      { id: "d", text: "Stashed entries", correct: false },
    ],
  },
  "git stash": {
    q: "What does git stash do?",
    opts: [
      { id: "a", text: "Shelves uncommitted changes", correct: true },
      { id: "b", text: "Deletes the repository", correct: false },
      { id: "c", text: "Creates a commit", correct: false },
      { id: "d", text: "Fetches from origin", correct: false },
    ],
  },
  "git restore": {
    q: "What does git restore file do?",
    opts: [
      { id: "a", text: "Discards uncommitted changes to file", correct: true },
      { id: "b", text: "Commits file", correct: false },
      { id: "c", text: "Renames file", correct: false },
      { id: "d", text: "Adds file to git", correct: false },
    ],
  },
  "Ignore rules": {
    q: "What is .gitignore for?",
    opts: [
      { id: "a", text: "Declaring files Git should not track", correct: true },
      { id: "b", text: "Ignoring commit messages", correct: false },
      { id: "c", text: "Listing remote repos", correct: false },
      { id: "d", text: "Storing credentials", correct: false },
    ],
  },
  "Patterns": {
    q: "Which pattern ignores every .log file?",
    opts: [
      { id: "a", text: "*.log", correct: true },
      { id: "b", text: "log", correct: false },
      { id: "c", text: "[log]", correct: false },
      { id: "d", text: "?log", correct: false },
    ],
  },
  "Combining filters": {
    q: "What does sort | uniq accomplish?",
    opts: [
      { id: "a", text: "Sorts then removes adjacent duplicates", correct: true },
      { id: "b", text: "Counts characters", correct: false },
      { id: "c", text: "Edits in place", correct: false },
      { id: "d", text: "Finds files", correct: false },
    ],
  },
  "Sorting and counting": {
    q: "Which counts lines?",
    opts: [
      { id: "a", text: "wc -l", correct: true },
      { id: "b", text: "grep -l", correct: false },
      { id: "c", text: "sort -c", correct: false },
      { id: "d", text: "uniq -d", correct: false },
    ],
  },
  "env and export": {
    q: "What does export do?",
    opts: [
      { id: "a", text: "Makes a variable inherited by child processes", correct: true },
      { id: "b", text: "Prints the variable", correct: false },
      { id: "c", text: "Deletes the variable", correct: false },
      { id: "d", text: "Reads a file", correct: false },
    ],
  },
  "Common variables": {
    q: "Which variable holds the command search path?",
    opts: [
      { id: "a", text: "PATH", correct: true },
      { id: "b", text: "HOME", correct: false },
      { id: "c", text: "USER", correct: false },
      { id: "d", text: "LANG", correct: false },
    ],
  },
  "case syntax": {
    q: "Which is a valid case branch?",
    opts: [
      { id: "a", text: "pattern) commands ;;", correct: true },
      { id: "b", text: "case commands)", correct: false },
      { id: "c", text: "pattern : commands", correct: false },
      { id: "d", text: "if commands", correct: false },
    ],
  },
  "Pattern alternatives": {
    q: "Which pattern matches either start or stop?",
    opts: [
      { id: "a", text: "start|stop)", correct: true },
      { id: "b", text: "start+stop)", correct: false },
      { id: "c", text: "start & stop)", correct: false },
      { id: "d", text: "start; stop)", correct: false },
    ],
  },
  "select loops": {
    q: "What does select present?",
    opts: [
      { id: "a", text: "A numbered menu of options", correct: true },
      { id: "b", text: "A text editor", correct: false },
      { id: "c", text: "A file picker", correct: false },
      { id: "d", text: "A login prompt", correct: false },
    ],
  },
  "Menu prompts": {
    q: "When does the select loop body run?",
    opts: [
      { id: "a", text: "Once per choice until break", correct: true },
      { id: "b", text: "Once total", correct: false },
      { id: "c", text: "Every second", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "<< heredoc": {
    q: "What does <<EOF feed?",
    opts: [
      { id: "a", text: "Multi-line text into a command's stdin", correct: true },
      { id: "b", text: "A file into a variable", correct: false },
      { id: "c", text: "Errors to a file", correct: false },
      { id: "d", text: "A network stream", correct: false },
    ],
  },
  "Delimiter rules": {
    q: "Where must the closing delimiter sit?",
    opts: [
      { id: "a", text: "Alone on its own line", correct: true },
      { id: "b", text: "Anywhere", correct: false },
      { id: "c", text: "After a semicolon", correct: false },
      { id: "d", text: "On the first line", correct: false },
    ],
  },
  "shebang": {
    q: "What does #!/bin/bash do?",
    opts: [
      { id: "a", text: "Selects the interpreter for executing the script", correct: true },
      { id: "b", text: "Comments the whole file", correct: false },
      { id: "c", text: "Sets verbose mode", correct: false },
      { id: "d", text: "Exports PATH", correct: false },
    ],
  },
  "set -e": {
    q: "What does set -e do?",
    opts: [
      { id: "a", text: "Exits on the first failing command", correct: true },
      { id: "b", text: "Echoes every command", correct: false },
      { id: "c", text: "Enables arrays", correct: false },
      { id: "d", text: "Sets a default error message", correct: false },
    ],
  },
  ".bashrc": {
    q: "When does .bashrc run?",
    opts: [
      { id: "a", text: "For every interactive bash shell", correct: true },
      { id: "b", text: "Once at system boot", correct: false },
      { id: "c", text: "For every command", correct: false },
      { id: "d", text: "Never automatically", correct: false },
    ],
  },
  ".profile": {
    q: ".profile is typically for:",
    opts: [
      { id: "a", text: "Login-shell environment setup", correct: true },
      { id: "b", text: "Per-command aliases", correct: false },
      { id: "c", text: "Compiling programs", correct: false },
      { id: "d", text: "Cron schedules", correct: false },
    ],
  },
  "uname": {
    q: "What does uname report?",
    opts: [
      { id: "a", text: "System identity like kernel and architecture", correct: true },
      { id: "b", text: "Running processes", correct: false },
      { id: "c", text: "Disk usage", correct: false },
      { id: "d", text: "User names", correct: false },
    ],
  },
  "df and free": {
    q: "Which shows filesystem usage?",
    opts: [
      { id: "a", text: "df", correct: true },
      { id: "b", text: "free", correct: false },
      { id: "c", text: "top", correct: false },
      { id: "d", text: "ps", correct: false },
    ],
  },
  "whoami and id": {
    q: "What does whoami print?",
    opts: [
      { id: "a", text: "The current user's name", correct: true },
      { id: "b", text: "The hostname", correct: false },
      { id: "c", text: "The PID", correct: false },
      { id: "d", text: "The date", correct: false },
    ],
  },
  "sudo": {
    q: "sudo runs a command:",
    opts: [
      { id: "a", text: "With root privileges after authorization", correct: true },
      { id: "b", text: "In the background", correct: false },
      { id: "c", text: "Without any checks", correct: false },
      { id: "d", text: "Only as the current user", correct: false },
    ],
  },
  "apt concepts": {
    q: "apt is used to:",
    opts: [
      { id: "a", text: "Install and manage packages", correct: true },
      { id: "b", text: "Edit configuration files", correct: false },
      { id: "c", text: "Schedule jobs", correct: false },
      { id: "d", text: "Compile kernels", correct: false },
    ],
  },
  "yum and dnf": {
    q: "yum and dnf belong to which family?",
    opts: [
      { id: "a", text: "RPM-based distros", correct: true },
      { id: "b", text: "Debian-based distros", correct: false },
      { id: "c", text: "macOS", correct: false },
      { id: "d", text: "Windows", correct: false },
    ],
  },
  "sh vs bash": {
    q: "Which is the minimal portable shell?",
    opts: [
      { id: "a", text: "sh (POSIX)", correct: true },
      { id: "b", text: "bash", correct: false },
      { id: "c", text: "zsh", correct: false },
      { id: "d", text: "fish", correct: false },
    ],
  },
  "POSIX features": {
    q: "Which is a bash-only feature?",
    opts: [
      { id: "a", text: "Arrays with ${arr[@]}", correct: true },
      { id: "b", text: "for loops", correct: false },
      { id: "c", text: "while loops", correct: false },
      { id: "d", text: "case", correct: false },
    ],
  },
  "Planning a script": {
    q: "What should a plan define first?",
    opts: [
      { id: "a", text: "Inputs, steps, and failure behavior", correct: true },
      { id: "b", text: "The color scheme", correct: false },
      { id: "c", text: "The logo", correct: false },
      { id: "d", text: "The marketing copy", correct: false },
    ],
  },
  "Steps and checks": {
    q: "Why check success between steps?",
    opts: [
      { id: "a", text: "To fail fast and avoid cascading errors", correct: true },
      { id: "b", text: "To slow the script down", correct: false },
      { id: "c", text: "Because it is required", correct: false },
      { id: "d", text: "To print more logs", correct: false },
    ],
  },
};

/* ─── Content generators ─── */

function generateBashTopicContent(topic: string, title: string, day: number): string {
  const cached = BASH_TOPIC_CONTENT[topic];
  if (cached) return cached;

  const level = getLevelForDay(day);
  return (
    `Day ${day} introduces "${topic}" within the context of ${title}. ` +
    `This concept is part of the Bash track at the ${level} proficiency tier. ` +
    `It builds on the shell's compose-and-glue model — understand how ${topic} ` +
    `interacts with the surrounding tools, then extend the template to solidify it.`
  );
}

/* ─── Code-challenge verification ───
 * expectedOutput gates "Mark Complete" on the code exercise. Bash runs via
 * the real Piston backend (language "bash"), whose sandbox gives no
 * filesystem, environment, network, or cwd guarantees. Only scripts whose
 * stdout depends purely on literals, arithmetic, and literal-driven control
 * flow are gated. Days touching the filesystem (5, 21, 23–28, 35), the
 * environment (30, 36), privileges (37, 38), the network (22), timing
 * (19, 20), interactive stdin (32), or a real deploy (40) stay ungated. */
const BASH_EXPECTED_OUTPUT: Record<number, string> = {
  1: "Hello, Shell!",
  2: "Ada",
  3: "Hello, World",
  4: "13 7 30 3 1",
  6: "apple",
  7: "grade: B",
  8: "match",
  9: "item 1",
  10: "Hello, Ada",
  11: "apple",
  12: "one",
  13: "Ada",
  14: "5",
  15: "Hello, Ada",
  16: "a b c",
  17: "Ada",
  18: "0",
  29: "apple",
  31: "starting",
  33: "line one",
  34: "Hello, Ada",
  39: "works in sh and bash",
};

function generateBashExercises(day: number, blueprint: BashBlueprint): Lesson["exercises"] {
  const prefix = `bash${day}`;
  const topics = blueprint.theoryTopics;

  const quizzes: Lesson["exercises"] = [];
  const usedTopics = new Set<string>();

  for (let i = 0; i < Math.min(topics.length, 2); i++) {
    const topic = topics[i];
    const entry = BASH_QUIZ_MAP[topic];
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
      question: "Which of these is the idiomatic Bash way to test whether a variable is non-empty?",
      options: [
        { id: "a", text: "[ -n \"$var\" ]", correct: true },
        { id: "b", text: "var.exists()", correct: false },
        { id: "c", text: "exists(var)", correct: false },
        { id: "d", text: "check(var)", correct: false },
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
    expectedOutput: BASH_EXPECTED_OUTPUT[day],
    hints: [
      "Review the theory section for each topic",
      "Run the code in the playground to see the baseline",
      "Extend it: add inputs, edge cases, or a second example",
    ],
    xpReward: 50,
  });

  return quizzes;
}

function generateBashAssignment(day: number, blueprint: BashBlueprint): Lesson["assignment"] {
  const { title, theoryTopics } = blueprint;
  const topicBasedReqs = theoryTopics.slice(0, 3).map((t) => `Demonstrate understanding of ${t}`);

  return {
    id: `d${day}-a1`,
    title: `${title} — Assignment`,
    description: `Apply Day ${day} concepts by building a small script that exercises ${theoryTopics.join(", ")}. Focus on correctness, edge cases, and readable code.`,
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

export function buildBashLesson(day: number): Lesson {
  const blueprint = BASH_CURRICULUM[day - 1];
  if (!blueprint) throw new Error(`No Bash lesson for day ${day}`);

  return {
    day,
    title: blueprint.title,
    subtitle: blueprint.subtitle,
    language: "bash",
    track: "bash",
    level: getLevelForDay(day),
    durationMinutes: 45 + (day % 3) * 15,
    xpTotal: 200,
    tags: blueprint.tags,
    theory: {
      sections: blueprint.theoryTopics.map((topic, i) => ({
        heading: topic,
        content: generateBashTopicContent(topic, blueprint.title, day),
        codeExample: i === 0 ? blueprint.codeTemplate : undefined,
      })),
    },
    playground: {
      defaultCode: blueprint.codeTemplate,
      language: "bash",
      runnable: true,
    },
    exercises: generateBashExercises(day, blueprint),
    assignment: generateBashAssignment(day, blueprint),
  };
}