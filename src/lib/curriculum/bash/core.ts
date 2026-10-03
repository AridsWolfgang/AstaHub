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
  { title: "Strict Mode Foundations", subtitle: "set -euo pipefail in every script", language: "bash", tags: ["scripting"], theoryTopics: ["set -euo pipefail", "Fail-fast scripts", "Unset variable guards"], codeTemplate: `#!/bin/bash\nset -euo pipefail\nname="Ada"\necho "Hello, \$name"\necho "strict mode on"` },
  { title: "Shebangs & Executable Scripts", subtitle: "Interpreter lines and the +x bit", language: "bash", tags: ["scripting"], theoryTopics: ["Shebang lines", "Executable bits", "env shebangs"], codeTemplate: `#!/bin/bash\necho "interpreter: bash"\necho "shebang works"` },
  { title: "Parameter Expansion I: Defaults", subtitle: "Safe defaults without branching", language: "bash", tags: ["variables"], theoryTopics: ["Default values \${var:-}", "Assignment defaults \${var:=}", "Error on unset \${var:?}"], codeTemplate: `#!/bin/bash\nunset asta_nick asta_level\necho "Hello, \${asta_nick:-World}"\nasta_level="\${asta_level:-5}"\necho "level \$asta_level"` },
  { title: "Parameter Expansion II: Patterns", subtitle: "Trim and rewrite with #, %, //", language: "bash", tags: ["variables"], theoryTopics: ["Prefix removal \${var#}", "Suffix removal \${var%}", "Pattern replacement \${var//}"], codeTemplate: `#!/bin/bash\npath="/home/ada/report.txt"\necho "\${path##*/}"\necho "\${path%.txt}"\necho "\${path//ada/ADA}"` },
  { title: "Arrays Deep", subtitle: "Slices and associative maps", language: "bash", tags: ["data"], theoryTopics: ["Array slicing", "Associative arrays", "Array iteration guards"], codeTemplate: `#!/bin/bash\nnums=(10 20 30 40 50)\necho "\${nums[@]:1:3}"\necho "\${#nums[@]}"\ndeclare -A cap=([fr]=Paris [jp]=Tokyo)\necho "\${cap[fr]}"` },
  { title: "String Ops Deep", subtitle: "Offsets, case maps, lengths", language: "bash", tags: ["strings"], theoryTopics: ["Substring extraction offsets", "Case mapping patterns", "Length checks"], codeTemplate: `#!/bin/bash\ns="hello-world"\necho "\${s:6}"\necho "\${s^^}"\necho "\${#s}"` },
  { title: "Arithmetic Deep", subtitle: "(( )), bases, and ternary", language: "bash", tags: ["operators"], theoryTopics: ["(( )) conditionals", "Bases and precedence", "Ternary in arithmetic"], codeTemplate: `#!/bin/bash\necho "\$((2 + 3 * 4))"\necho "\$((16 / 4))"\nif (( 5 > 3 )); then\n  echo "five wins"\nfi\necho "\$(( 1 > 2 ? 10 : 20 ))"` },
  { title: "[[ ]] Tests Deep", subtitle: "Globs, regex, and safety", language: "bash", tags: ["control-flow"], theoryTopics: ["[[ ]] vs [ ]", "Regex match =~", "Glob match =="], codeTemplate: `#!/bin/bash\nname="ada-42"\nif [[ "\$name" == ada-* ]]; then\n  echo "glob match"\nfi\nif [[ "\$name" =~ ^[a-z]+-[0-9]+\$ ]]; then\n  echo "regex match"\nfi\n[[ -n "\$name" ]] && echo "nonempty"` },
  { title: "Conditionals Deep", subtitle: "Guard chains with && and ||", language: "bash", tags: ["control-flow"], theoryTopics: ["&& and || guards", "Short-circuit chains", "Nested conditionals"], codeTemplate: `#!/bin/bash\nx=10\n[ "\$x" -gt 5 ] && echo "big"\n[ "\$x" -lt 5 ] || echo "not small"\ntrue && echo "chain ok"` },
  { title: "Loops Deep I", subtitle: "C-style loops and brace ranges", language: "bash", tags: ["loops"], theoryTopics: ["C-style for loops", "Brace ranges {1..n}", "Loop counters"], codeTemplate: `#!/bin/bash\nfor ((i=1; i<=3; i++)); do\n  echo "c-loop \$i"\ndone\nfor n in {1..3}; do\n  echo "range \$n"\ndone` },
  { title: "Loops Deep II", subtitle: "read loops and flow control", language: "bash", tags: ["loops"], theoryTopics: ["while read loops", "break with levels", "continue guards"], codeTemplate: `#!/bin/bash\ncount=0\nwhile read -r line; do\n  echo "got: \$line"\n  count=\$((count + 1))\ndone <<< "\$(printf 'a\\nb\\nc')"\necho "lines \$count"\nfor i in 1 2 3 4; do\n  if [ "\$i" -eq 3 ]; then\n    continue\n  fi\n  echo "kept \$i"\ndone` },
  { title: "Functions Deep", subtitle: "Arguments, locals, captured output", language: "bash", tags: ["functions"], theoryTopics: ["Function arguments $1", "local variables", "Echo-based returns"], codeTemplate: `#!/bin/bash\nadd() {\n  local a=\$1\n  local b=\$2\n  echo \$((a + b))\n}\nresult=\$(add 20 22)\necho "sum \$result"\ngreet() {\n  echo "hi \$1"\n}\ngreet Ada` },
  { title: "Scope Rules", subtitle: "local, global, and subshells", language: "bash", tags: ["functions"], theoryTopics: ["local vs global", "Exported functions", "Subshell scope"], codeTemplate: `#!/bin/bash\ng="global"\nf() {\n  local g="shadowed"\n  echo "\$g"\n}\nf\necho "\$g"\n( inner="sub"; echo "\$inner" )` },
  { title: "Traps I: EXIT", subtitle: "Cleanup that always runs", language: "bash", tags: ["process"], theoryTopics: ["trap on EXIT", "Cleanup functions", "Trap listing"], codeTemplate: `#!/bin/bash\ncleanup() {\n  echo "cleanup ran"\n}\ntrap cleanup EXIT\necho "work done"` },
  { title: "Traps II: Signals", subtitle: "INT, TERM, and resetting", language: "bash", tags: ["process"], theoryTopics: ["SIGINT handling", "SIGTERM handling", "Resetting traps"], codeTemplate: `#!/bin/bash\non_int() {\n  echo "caught INT"\n}\ntrap on_int INT\ntrap -p INT\ntrap - INT\necho "trap installed and reset"` },
  { title: "Redirection Deep", subtitle: "Merge, group, and quote heredocs", language: "bash", tags: ["io"], theoryTopics: ["Merging streams 2>&1", "stderr to stdout patterns", "Heredoc quoting"], codeTemplate: `#!/bin/bash\n{ echo "out-line"; echo "err-line" >&2; } 2>&1 | sort\ncat <<'EOF'\nliteral \$HOME kept\nEOF` },
  { title: "Pipes Deep", subtitle: "pipefail and process substitution", language: "bash", tags: ["io"], theoryTopics: ["pipefail semantics", "Process substitution <()", "Grouping with { }"], codeTemplate: `#!/bin/bash\nset -o pipefail\nprintf "b\\na\\nc\\n" | sort | head -n 1\ndiff <(printf "same\\n") <(printf "same\\n") && echo "streams equal"` },
  { title: "grep Deep I", subtitle: "Classes, anchors, extended regex", language: "bash", tags: ["text"], theoryTopics: ["Character classes", "Anchors ^$", "Extended regex -E"], codeTemplate: `#!/bin/bash\nprintf "ada-42\\nbob\\nada-7\\nzoe-100\\n" | grep -E "^ada-[0-9]+\$"` },
  { title: "grep Deep II", subtitle: "Context, invert, count", language: "bash", tags: ["text"], theoryTopics: ["Context flags -A/-B/-C", "Invert and count -v/-c", "Recursive grep -r"], codeTemplate: `#!/bin/bash\nprintf "one\\ntwo\\nthree\\nfour\\n" | grep -C1 "three"\nprintf "a\\nb\\na\\n" | grep -c "a"` },
  { title: "Milestone Project I: Log Analyzer", subtitle: "A grep-sort-awk report", language: "bash", tags: ["capstone"], theoryTopics: ["Log report design", "Pipeline composition", "Summary formatting"], codeTemplate: `#!/bin/bash\nprintf 'INFO start\\nERROR disk full\\nINFO retry\\nERROR timeout\\nINFO ok\\n' | grep ERROR | sort | uniq -c | awk '{ print \$3, \$4 }'\necho "report complete"` },
  { title: "sed I: Addresses", subtitle: "Ranges, delete, print", language: "bash", tags: ["text"], theoryTopics: ["Address ranges", "Delete command d", "Print command p"], codeTemplate: `#!/bin/bash\nprintf "one\\ntwo\\nthree\\nfour\\n" | sed -n '2,3p'\nprintf "a\\nb\\nc\\n" | sed '2d'` },
  { title: "sed II: Substitution Power", subtitle: "Global, multi-expr, backrefs", language: "bash", tags: ["text"], theoryTopics: ["Global flag g", "Multiple expressions -e", "Capture groups and backrefs"], codeTemplate: `#!/bin/bash\nprintf "foo foo\\nbar foo\\n" | sed -e 's/foo/FOO/g' -e 's/bar/BAR/'` },
  { title: "awk I: Aggregation", subtitle: "BEGIN/END and column sums", language: "bash", tags: ["text"], theoryTopics: ["BEGIN and END blocks", "Column sums", "Field separator -F"], codeTemplate: `#!/bin/bash\nprintf "10\\n20\\n30\\n" | awk '{ s += \$1 } END { print s }'\nprintf "a:b:c\\n" | awk -F: '{ print \$2 }'` },
  { title: "awk II: Filtering", subtitle: "Conditions and formatted output", language: "bash", tags: ["text"], theoryTopics: ["Pattern conditions", "String functions", "Formatted output printf"], codeTemplate: `#!/bin/bash\nprintf "ada 90\\nbob 40\\nzoe 75\\n" | awk '\$2 >= 70 { print \$1 }'\necho "filter done"` },
  { title: "find I: Search", subtitle: "Name, type, and time filters", language: "bash", tags: ["tools"], theoryTopics: ["Name patterns -name", "Type filters -type", "Time filters -mtime"], codeTemplate: `#!/bin/bash\n# find walks a real directory tree, which sandboxes cannot guarantee.\nmkdir -p demo/src\ntouch demo/src/a.txt demo/src/b.log\nfind demo -name "*.txt"\necho "find demo complete"` },
  { title: "find + xargs", subtitle: "Safe batch execution", language: "bash", tags: ["tools"], theoryTopics: ["-print0 with xargs -0", "xargs -I replacement", "Safe filenames"], codeTemplate: `#!/bin/bash\n# Filenames with spaces break naive parsing; -print0 + -0 stay safe.\nmkdir -p xdemo\nprintf "x\\n" > "xdemo/sp ace.txt"\nfind xdemo -name "*.txt" -print0 | xargs -0 -I{} echo "found {}"` },
  { title: "tar Deep", subtitle: "Create, verify, exclude", language: "bash", tags: ["tools"], theoryTopics: ["Create and verify -czvf/-tzvf", "Exclude patterns", "Incremental notes"], codeTemplate: `#!/bin/bash\n# Archives bundle real files, so this demo needs a writable filesystem.\nmkdir -p tardemo\necho data > tardemo/f.txt\ntar -czf tardemo/b.tar.gz -C tardemo f.txt\ntar -tzf tardemo/b.tar.gz` },
  { title: "Compression Compared", subtitle: "gzip, bzip2, xz trade-offs", language: "bash", tags: ["tools"], theoryTopics: ["gzip vs bzip2 vs xz", "Compression levels", "tar + compression pairs"], codeTemplate: `#!/bin/bash\n# Compression rewrites real files; ratios depend on the data.\nmkdir -p zipdemo\necho "compress me please compress me please" > zipdemo/note.txt\ngzip -k zipdemo/note.txt\nls zipdemo` },
  { title: "Permissions Deep", subtitle: "Octal, umask, special bits", language: "bash", tags: ["system"], theoryTopics: ["Octal modes", "umask", "Special bits setuid/setgid/sticky"], codeTemplate: `#!/bin/bash\n# Permission bits only mean something on a real multi-user filesystem.\ntouch permdemo.txt\nchmod 640 permdemo.txt\nls -l permdemo.txt` },
  { title: "Users & Groups", subtitle: "Identity checks inside scripts", language: "bash", tags: ["system"], theoryTopics: ["id and groups", "sudoers concepts", "User checks in scripts"], codeTemplate: `#!/bin/bash\n# Identity output depends on the runtime user, so it cannot be gated.\nid -un\ngroups\necho "identity checked"` },
  { title: "Processes I", subtitle: "Snapshots and signals", language: "bash", tags: ["process"], theoryTopics: ["ps snapshots", "pgrep patterns", "kill signals"], codeTemplate: `#!/bin/bash\n# Process tables are host-specific, and kill needs a PID you own.\nps -o pid,comm | head -n 5\necho "process snapshot taken"` },
  { title: "Jobs Deep", subtitle: "PIDs, wait, and job ids", language: "bash", tags: ["process"], theoryTopics: ["Background PIDs $!", "wait semantics", "kill %job"], codeTemplate: `#!/bin/bash\n# Job timing is scheduler-dependent, so completion order cannot be gated.\nsleep 0.2 &\necho "started \$!"\nwait\necho "all jobs reaped"` },
  { title: "cron Deep", subtitle: "The five time fields", language: "bash", tags: ["process"], theoryTopics: ["Five time fields", "Crontab editing", "Cron logging"], codeTemplate: `#!/bin/bash\n# cron needs a running daemon, which sandboxes rarely provide.\necho "0 2 * * * /home/ada/backup.sh"\necho "cron fields: minute hour dom month dow"` },
  { title: "curl I: Downloads", subtitle: "Flags, files, retries", language: "bash", tags: ["tools"], theoryTopics: ["curl flags -fsSL", "Saving with -o", "Retries and timeouts"], codeTemplate: `#!/bin/bash\n# curl needs network access and a reachable URL.\ncurl -fsSL https://example.com -o page.html\necho "download attempted"` },
  { title: "curl II: APIs", subtitle: "JSON over HTTP", language: "bash", tags: ["tools"], theoryTopics: ["JSON endpoints", "Parsing with grep/awk", "API error handling"], codeTemplate: `#!/bin/bash\n# API calls need network; parse JSON with grep/awk when jq is absent.\ncurl -fsSL https://api.example.com/status | grep -o '"ok"'\necho "api check attempted"` },
  { title: "git Deep I: Branches", subtitle: "switch, track, merge", language: "bash", tags: ["git"], theoryTopics: ["Branch workflows", "git switch", "Merge strategies"], codeTemplate: `#!/bin/bash\n# Branching needs a repository on a real filesystem.\ngit init -b main demo-repo\ngit -C demo-repo status\necho "branch demo ready"` },
  { title: "git Deep II: Stash", subtitle: "Stack discipline", language: "bash", tags: ["git"], theoryTopics: ["Stash stack", "stash pop vs apply", "Stash messages"], codeTemplate: `#!/bin/bash\n# Stash operates on a working tree, so it needs a real repository.\ngit init -b main stash-demo\necho work > stash-demo/note.txt\ngit -C stash-demo status\necho "stash demo ready"` },
  { title: "git Deep III: Rebase", subtitle: "Rebase versus merge", language: "bash", tags: ["git"], theoryTopics: ["rebase vs merge", "Interactive rebase notes", "Conflict flow"], codeTemplate: `#!/bin/bash\n# Rebase rewrites history and can stop for conflicts or an editor.\ngit init -b main rebase-demo\ngit -C rebase-demo status\necho "rebase demo ready"` },
  { title: "git Deep IV: Hooks", subtitle: "Automate with hooks", language: "bash", tags: ["git"], theoryTopics: ["pre-commit hooks", "Hook executables", "Sample hooks"], codeTemplate: `#!/bin/bash\n# Hooks are executable files inside a repository's .git directory.\ngit init -b main hooks-demo\nls hooks-demo/.git/hooks | head -n 3\necho "hooks demo ready"` },
  { title: "Milestone Project II: Backup Script", subtitle: "Stamp, archive, verify", language: "bash", tags: ["capstone"], theoryTopics: ["Backup design", "Timestamped archives", "Restore checks"], codeTemplate: `#!/bin/bash\n# Milestone: timestamped tar backup with a verify step.\nstamp=\$(date +%F)\nmkdir -p mysite\necho hello > mysite/index.html\ntar -czf "backup-\$stamp.tar.gz" mysite\ntar -tzf "backup-\$stamp.tar.gz"\necho "backup \$stamp complete"` },
  { title: "git Deep V: Remotes", subtitle: "fetch, pull, tracking", language: "bash", tags: ["git"], theoryTopics: ["fetch vs pull", "Upstream tracking -u", "Remote URLs"], codeTemplate: `#!/bin/bash\n# Remotes need a reachable server and credentials for push/pull.\ngit init -b main remote-demo\ngit -C remote-demo remote add origin https://example.com/repo.git\ngit -C remote-demo remote -v\necho "remote demo ready"` },
  { title: "git Deep VI: Workflows", subtitle: "GitHub flow and releases", language: "bash", tags: ["git"], theoryTopics: ["GitHub flow", "Feature branches", "Release branches"], codeTemplate: `#!/bin/bash\n# Workflows assume a shared remote, reviews, and CI.\ngit init -b main flow-demo\ngit -C flow-demo checkout -b feature/login\ngit -C flow-demo status\necho "workflow demo ready"` },
  { title: "Dotfiles I", subtitle: "Organize your shell config", language: "bash", tags: ["environment"], theoryTopics: ["Organizing dotfiles", "Symlink farms", "Bare-repo method notes"], codeTemplate: `#!/bin/bash\n# Dotfiles live in \$HOME, which sandboxes do not provide.\n# ln -s ~/dotfiles/.bashrc ~/.bashrc\necho "dotfiles live in the home directory"` },
  { title: "Environment II", subtitle: "PATH and per-project env", language: "bash", tags: ["environment"], theoryTopics: ["PATH management", "Per-project env files", "direnv notes"], codeTemplate: `#!/bin/bash\n# PATH and project env files depend on the user's machine.\n# export PATH="\$HOME/bin:\$PATH"\n# [ -f .env ] && set -a && . ./.env && set +a\necho "environment is per-machine"` },
  { title: "Debugging Scripts", subtitle: "Trace with set -x and PS4", language: "bash", tags: ["scripting"], theoryTopics: ["set -x tracing", "PS4 customization", "shellcheck notes"], codeTemplate: `#!/bin/bash\nexport PS4='+ debug: '\nset -x\nx=41\ny=\$((x + 1))\nset +x\necho "answer \$y"` },
  { title: "Logging Patterns", subtitle: "Levels, tee, and logger", language: "bash", tags: ["scripting"], theoryTopics: ["Log levels", "Tee patterns", "logger command notes"], codeTemplate: `#!/bin/bash\nlog() {\n  echo "[INFO] \$1"\n}\nlog "service started"\nlog "service stopped"\necho "logs shipped"` },
  { title: "CLI Parsing with getopts", subtitle: "Flags and usage text", language: "bash", tags: ["scripting"], theoryTopics: ["getopts loop", "OPTARG handling", "Usage functions"], codeTemplate: `#!/bin/bash\nusage() {\n  echo "usage: prog [-n name]"\n}\nname="World"\nwhile getopts "n:" opt; do\n  case "\$opt" in\n    n) name="\$OPTARG" ;;\n    *) usage ;;\n  esac\ndone\nshift \$((OPTIND - 1))\necho "Hello, \$name"` },
  { title: "Config Files", subtitle: "Source, parse, override", language: "bash", tags: ["scripting"], theoryTopics: ["Sourcing configs", "INI parsing with awk", "Defaults + overrides"], codeTemplate: `#!/bin/bash\nconfig="port=8080\nhost=example"\nport=\$(printf '%s\\n' "\$config" | awk -F= '\$1=="port" { print \$2 }')\nhost=\$(printf '%s\\n' "\$config" | awk -F= '\$1=="host" { print \$2 }')\necho "\$host:\$port"` },
  { title: "Parallelism", subtitle: "Fan out with xargs -P", language: "bash", tags: ["process"], theoryTopics: ["xargs -P", "wait fan-out", "Job slots"], codeTemplate: `#!/bin/bash\n# Parallel jobs race, so output order is timing-dependent.\nprintf "a\\nb\\nc\\n" | xargs -P3 -I{} echo "job {}"\necho "fan-out complete"` },
  { title: "Testing Bash", subtitle: "Assert functions and runners", language: "bash", tags: ["scripting"], theoryTopics: ["Assert functions", "Test runners (bats) notes", "Exit-code checks"], codeTemplate: `#!/bin/bash\nassert_eq() {\n  if [ "\$1" = "\$2" ]; then\n    echo "pass: \$3"\n  else\n    echo "FAIL: \$3"\n  fi\n}\nassert_eq "4" "\$((2 + 2))" "math works"\nassert_eq "hi" "\$(echo hi)" "echo works"` },
  { title: "Script Security", subtitle: "Quote input, never eval", language: "bash", tags: ["scripting"], theoryTopics: ["Quoting untrusted input", "eval dangers", "Injection demo (safe)"], codeTemplate: `#!/bin/bash\nuser='ada; echo PWNED'\necho "\$user"\necho "quoted safe"` },
  { title: "Bash Regex", subtitle: "=~ and BASH_REMATCH", language: "bash", tags: ["control-flow"], theoryTopics: ["=~ operator", "BASH_REMATCH", "Validation patterns"], codeTemplate: `#!/bin/bash\nemail="ada@example.com"\nif [[ "\$email" =~ ^[^@]+@[^@]+\\.[^@]+\$ ]]; then\n  echo "valid email"\nfi\nif [[ "v1.2.3" =~ v([0-9]+) ]]; then\n  echo "major \${BASH_REMATCH[1]}"\nfi` },
  { title: "Dates & Times", subtitle: "Formatting and epoch math", language: "bash", tags: ["tools"], theoryTopics: ["date formatting", "Epoch math", "date -d portability notes"], codeTemplate: `#!/bin/bash\ndate -u -d "@0" +%F\necho "epoch demo done"` },
  { title: "Sort, Join & Cut", subtitle: "Ordering and field extraction", language: "bash", tags: ["text"], theoryTopics: ["sort -n/-r/-u", "join two files", "cut ranges"], codeTemplate: `#!/bin/bash\nprintf "pear\\napple\\nfig\\n" | sort -u\nprintf "a:b:c\\n" | cut -d: -f2\necho "sorted and cut"` },
  { title: "System Diagnostics", subtitle: "Disk, memory, load", language: "bash", tags: ["system"], theoryTopics: ["df/du reading", "Load averages", "Log triage notes"], codeTemplate: `#!/bin/bash\n# Sizes and load are host-specific snapshots.\ndf -h . | head -n 3\ndu -sh . 2>/dev/null | head -n 1\necho "capacity snapshot taken"` },
  { title: "Scripted Setup", subtitle: "Idempotent installs", language: "bash", tags: ["system"], theoryTopics: ["apt/dnf script guards", "Idempotent installs", "Checksums notes"], codeTemplate: `#!/bin/bash\n# Installs need root, a package manager, and network.\n# command -v curl || sudo apt-get install -y curl\necho "setup needs root and network"` },
  { title: "SSH Deep", subtitle: "Keys, config, copies", language: "bash", tags: ["tools"], theoryTopics: ["Key pairs", "ssh config", "scp/rsync notes"], codeTemplate: `#!/bin/bash\n# SSH needs servers, keys, and credentials.\n# ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N ""\n# scp report.txt user@host:/srv/\necho "ssh needs keys and a server"` },
  { title: "Services & systemd", subtitle: "Units and journals", language: "bash", tags: ["system"], theoryTopics: ["systemctl units", "Service files", "Logs with journalctl"], codeTemplate: `#!/bin/bash\n# Services need systemd, root, and a real host.\n# systemctl status cron\n# journalctl -u cron --no-pager | head\necho "services need systemd and root"` },
  { title: "Milestone Project III: Project Planner", subtitle: "Checklists that run", language: "bash", tags: ["capstone"], theoryTopics: ["Project scaffolding", "Checklist scripts", "Idempotency"], codeTemplate: `#!/bin/bash\nsteps=("gather" "transform" "verify" "ship")\nfor s in "\${steps[@]}"; do\n  echo "step: \$s"\ndone\necho "plan ready"` },
  { title: "Capstone: Ship It", subtitle: "A full deploy pipeline", language: "bash", tags: ["capstone"], theoryTopics: ["Deploy pipeline", "Health checks", "Rollback plan"], codeTemplate: `#!/bin/bash\n# Capstone: a real deploy needs artifacts, servers, and secrets.\nset -euo pipefail\necho "1. build"\necho "2. test"\necho "3. package"\necho "4. ship"\necho "deploy plan complete"` },
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
  "set -euo pipefail": "`set -euo pipefail` is the strict-mode trio: `-e` exits on the first failing command, `-u` errors on unset variables, and `pipefail` makes a pipeline fail when any stage fails. Together they turn silent corruption into a loud, early failure. Put the line near the top of every non-trivial script.",
  "Fail-fast scripts": "A fail-fast script stops at the first error instead of rolling forward on broken state. Each stage checks the previous one — explicitly with `|| exit 1` or implicitly with `set -e`. Failing fast keeps a half-deployed system from getting worse.",
  "Unset variable guards": "`set -u` turns a typo like `$nmae` into an immediate error instead of an empty string. Combined with `${var:?message}` for required inputs, it catches missing configuration at startup. Guard inputs once at the top rather than debugging empty values later.",
  "Shebang lines": "The first line `#!/bin/bash` tells the kernel which interpreter runs the file when executed as `./script.sh`. Without it the kernel falls back to the invoking shell, which may lack bash features. Always declare the interpreter you actually wrote for.",
  "Executable bits": "`chmod +x script.sh` sets the execute bit that lets the kernel run a file directly. The bit is a filesystem permission, not file content — copying without preserving it silently un-runs the script. `ls -l` shows it as the `x` in `rwxr-xr-x`.",
  "env shebangs": "`#!/usr/bin/env bash` finds bash through PATH instead of a hardcoded path, so the script works wherever bash is installed. It is the portable choice across Linux, macOS, and version managers. Prefer `env` unless you must pin an exact interpreter.",
  "Default values \${var:-}": "`${var:-fallback}` expands to `fallback` when `var` is unset or empty, without changing `var`. It makes optional inputs safe in one expression: `name=${1:-World}`. Use it wherever a missing argument should mean a sensible default.",
  "Assignment defaults \${var:=}": "`${var:=fallback}` works like `:-` but also assigns the fallback to `var`, so later uses see it. It initializes configuration once at the top: `: ${port:=8080}`. Reach for `:=` when the default must stick.",
  "Error on unset \${var:?}": "`${var:?message}` aborts with `message` when `var` is unset or empty — a one-line guard for required inputs. A script run without its environment fails immediately, naming the missing variable. Required values deserve `?`, optional ones deserve `-`.",
  "Prefix removal \${var#}": "`${var#prefix}` strips the shortest matching prefix while `##` strips the longest: `${path##*/}` is the basename. It replaces external `basename` calls for simple trims. One `#` is shortest, two is longest.",
  "Suffix removal \${var%}": "`${var%suffix}` strips the shortest matching suffix while `%%` strips the longest: `${file%%.*}` drops every extension at once. It replaces string juggling for extensions and directories. One `%` is shortest, two is longest.",
  "Pattern replacement \${var//}": "`${var/old/new}` replaces the first match and `${var//old/new}` replaces every match — pure in-shell search and replace. No external process spawns, so it stays fast inside loops. For regex power across lines, graduate to `sed`.",
  "Array slicing": "`${arr[@]:offset:length}` takes a slice of an array without copying by hand: `${nums[@]:1:3}` is elements 1 through 3. Omitting `:length` takes everything from the offset on. Slices keep list processing inside the shell.",
  "Associative arrays": "`declare -A map` creates a string-keyed map: `cap[fr]=Paris` stores and `${cap[fr]}` reads. Keys are arbitrary strings rather than indices, so maps model configs and lookups. Iterate keys with `${!map[@]}`.",
  "Array iteration guards": "Iterate arrays as `for x in \"${arr[@]}\"` — quoted `[@]` keeps elements with spaces intact. Unquoted expansion re-splits on spaces and breaks filenames. The quotes are the guard; never drop them.",
  "Substring extraction offsets": "`${s:offset:length}` slices a string by position: `${s:6}` drops the first six characters. Offsets are 0-based, and negative offsets count from the end in newer bash. Position slicing complements pattern removal.",
  "Case mapping patterns": "`${s^^}` uppercases, `${s,,}` lowercases, and `${s^^[aeiou]}` converts only matching characters. The mapping is pure expansion with no `tr` subprocess. Use it for normalizing user input before comparison.",
  "Length checks": "`${#s}` is the character length of a string and the standard input validator: `[ \"${#name}\" -gt 0 ]`. Check lengths before slicing or comparing. Empty input handled early never becomes a weird bug later.",
  "(( )) conditionals": "`(( expr ))` evaluates arithmetic as a condition: true when the result is nonzero. `if (( x > 5 )); then` reads like math rather than test syntax. Inside, variables need no `$` and comparisons are C-style.",
  "Bases and precedence": "Arithmetic honors bases — `16#ff` is 255, `8#17` is 15 — and standard precedence with `*` before `+` and parentheses first. `2 + 3 * 4` is 14, not 20. Explicit parentheses beat memorized precedence.",
  "Ternary in arithmetic": "`$(( cond ? a : b ))` picks a value inline: `$(( x > 0 ? x : 0 ))` clamps negatives. It replaces a four-line if/else when only a value differs. Keep the branches simple or readability collapses.",
  "[[ ]] vs [ ]": "`[[ ]]` is bash's safer test: no word splitting, no pathname expansion, `&&` and `||` inside, plus pattern operators. `[ ]` is the portable POSIX command with quoting pitfalls. In bash scripts prefer `[[ ]]`; in `sh` scripts you must use `[ ]`.",
  "Regex match =~": "`[[ $s =~ regex ]]` tests against an extended regex with the pattern left unquoted: `[[ $v =~ ^v[0-9]+ ]]`. Captures land in `BASH_REMATCH`. Quoting the pattern turns it into a literal string — the classic gotcha.",
  "Glob match ==": "`[[ $f == *.log ]]` matches globs rather than regex: `*` means any string, `?` one character, `[abc]` one of a set. It is filename-style matching for dispatch and filtering. For full regex power, switch to `=~`.",
  "&& and || guards": "`cmd && next` runs `next` only on success while `cmd || fallback` runs only on failure — one-line branching. `[ -f file ] && echo exists` is an if without the ceremony. Guards suit single commands, not whole blocks.",
  "Short-circuit chains": "`a && b || c` runs `c` when `a` fails OR when `b` fails — it is not if/else. Chains evaluate left to right and stop at the first decisive result. For real else-branches write the `if`; reserve chains for guards.",
  "Nested conditionals": "Nesting `if` inside `if` handles multi-factor decisions, but depth beyond two gets unreadable. Flatten with `&&` in the condition or with early `exit` and `return`. Each nesting level should earn its place.",
  "C-style for loops": "`for ((i=0; i<n; i++))` loops with init, condition, and step — the precise counter loop. It shines for indices, retries with backoff, and numeric ranges. The condition is arithmetic, so `$` is optional inside.",
  "Brace ranges {1..n}": "`{1..10}` expands to ten words before the loop runs — compact for small fixed ranges. `{a..z}` and zero-padded `{01..10}` work too. For large or dynamic ranges prefer `seq` or C-style loops, since brace expansion builds the whole list upfront.",
  "Loop counters": "A counter plus a limit is the manual loop contract: initialize before, test at top, increment at bottom. Forgetting the increment is the classic infinite loop. C-style loops bundle all three so none goes missing.",
  "while read loops": "`while read -r line; do ...; done < file` processes input line by line, with `-r` protecting backslashes. It streams, so gigabyte files need no extra memory. Feed it with redirection, pipes, or herestrings.",
  "break with levels": "`break` exits one loop while `break 2` exits two nested levels at once. Numbered breaks escape nested searches without flag variables. Use sparingly — a function with `return` is usually clearer.",
  "continue guards": "`continue` skips to the next iteration, making it the guard-clause of loops: check the skip condition first and the real work stays unindented. `continue` flattens while deep nesting confuses.",
  "Function arguments $1": "Function parameters arrive as `$1`, `$2`, and `$@` — like script arguments but scoped to the call. Assign them to named locals immediately for readability. Quoted `$@` preserves multi-word arguments.",
  "local variables": "`local x=$1` confines a variable to its function; without it every variable is global. Globals leak between functions and cause action-at-a-distance bugs. Default to `local` for everything except deliberate outputs.",
  "Echo-based returns": "Functions return data by printing it for callers to capture with `$(...)`: `result=$(add 2 3)`. `return` only sets a 0–255 status for success or failure. Status is for decisions, stdout is for data.",
  "local vs global": "Undeclared variables are global in bash — visible and mutable everywhere. `local` creates function-scoped copies that vanish on return. Treat globals as shared state: minimize them and name them loudly.",
  "Exported functions": "`export -f myfunc` puts a function into the environment so subshells and `bash -c` children can call it. It is how parallel `xargs -P` workers share helpers. Export deliberately — the environment is a public channel.",
  "Subshell scope": "Parentheses `( ... )` run in a subshell whose assignments never reach the parent: `( x=1 )` leaves `$x` unchanged. Pipes also run stages in subshells, which is why `cmd | read x` loses `$x`. Use subshells for isolation, never for outputs.",
  "trap on EXIT": "`trap cleanup EXIT` runs `cleanup` whenever the shell exits — on success, on error, or on signal. It is the shell's `finally`: temp files get removed even on failure. One EXIT trap per script, set early, keeps every path clean.",
  "Cleanup functions": "A cleanup function removes temp files, kills background jobs, and restores state: `rm -f \"$tmp\"`. Keep it idempotent since it may run when little was created. Register it before creating anything it must clean.",
  "Trap listing": "`trap -p` lists installed traps and `trap -p EXIT` shows one signal's handler. Listing verifies the safety net is actually installed. Inspect traps when debugging scripts that misbehave on exit.",
  "SIGINT handling": "Ctrl+C sends SIGINT, and `trap handler INT` intercepts it for graceful shutdown instead of instant death. Handlers should clean up and usually re-exit nonzero. Never swallow SIGINT silently — users expect Ctrl+C to work.",
  "SIGTERM handling": "SIGTERM is the polite kill request from `kill` and orchestrators; `trap handler TERM` lets the script flush and exit cleanly. TERM means wrap up now, unlike KILL which cannot be caught. Handle TERM in anything long-running.",
  "Resetting traps": "`trap - SIGNAL` removes a handler and restores the default, while `trap '' SIGNAL` ignores the signal entirely. Reset temporary handlers once their protected section ends. Narrow trap windows beat script-wide interceptions.",
  "Merging streams 2>&1": "`2>&1` points stderr at wherever stdout currently goes — order matters, so `>file 2>&1` captures both in the file. It unites the streams for pipes and logs. Remember that redirections apply left to right.",
  "stderr to stdout patterns": "`cmd 2>&1 | filter` pipes errors through the filter too — the standard way to search full output. `{ cmd1; cmd2; } 2>&1` merges a whole block. Merging is for inspection; keep streams split when errors need separate handling.",
  "Heredoc quoting": "Quoting the heredoc delimiter (`<<'EOF'`) disables expansion inside, so `$HOME` stays literal. Unquoted delimiters expand variables and `$(...)`. Quote when writing code or templates; leave unquoted for configured output.",
  "pipefail semantics": "`set -o pipefail` makes a pipeline return the last nonzero status instead of only the last command's. Without it `false | true` reports success and errors hide. Enable pipefail wherever a middle stage can fail.",
  "Process substitution <()": "`<(cmd)` exposes a command's output as a readable filename: `diff <(sort a) <(sort b)`. It feeds stream output to tools that demand file arguments. `<()` reads and `>()` writes — both avoid temp files.",
  "Grouping with { }": "`{ cmd1; cmd2; } | filter` pipes a whole block's combined output through one filter. Braces group without a subshell (unlike parentheses), so variables survive. The spaces and trailing semicolon are mandatory syntax.",
  "Character classes": "`[0-9]`, `[a-z]`, and `[A-Za-z]` each match one character from a set, while `[^0-9]` negates. Classes constrain matches to exactly the alphabet you mean. POSIX classes like `[[:digit:]]` stay correct across locales.",
  "Anchors ^$": "`^` pins to line start and `$` to line end: `^error` finds lines beginning with error, `done$` lines ending with done. Anchors turn substring search into exact-position matching. Both together (`^x$`) match whole lines only.",
  "Extended regex -E": "`grep -E` enables `+`, `?`, `|`, `{n}`, and `()` grouping without backslash soup: `^(ada|bob)-[0-9]+$`. Basic regex needs escaped forms for the same. Prefer `-E` for anything beyond literals and `.*`.",
  "Context flags -A/-B/-C": "`-A3` shows 3 lines after each match, `-B3` before, and `-C3` both — the incident-response flags. Context reveals what surrounded the error without reopening the file. Start with small contexts and widen only if needed.",
  "Invert and count -v/-c": "`-v` prints non-matching lines and `-c` prints only the match count. `grep -vc ok` counts failures by exclusion. Invert-then-count answers `how many do not` in one pass.",
  "Recursive grep -r": "`grep -r pattern dir/` searches whole trees, with `--include='*.sh'` narrowing by file type. It finds every call site without a code index. Exclude noise with `--exclude-dir=node_modules`.",
  "Log report design": "A log report answers one question: counts by error, top offenders, or a timeline. Decide the output shape first — columns, ordering, and thresholds. Design the report before composing the pipeline that fills it.",
  "Pipeline composition": "Compose reports stage by stage — select (`grep`), order (`sort`), deduplicate (`uniq -c`), extract (`awk`) — verifying each stage's output before adding the next. Pipelines built incrementally stay debuggable. Each stage does exactly one job.",
  "Summary formatting": "The last stage formats for humans: `awk` picks columns, `sort -rn` ranks, and `head` trims to the top N. Raw counts become a ranked summary. Format last so upstream stages keep full fidelity.",
  "Address ranges": "sed addresses select lines: `5p` prints line 5, `1,10p` lines 1–10, and `/error/,/fixed/p` everything between two patterns. Ranges focus every command on exactly the lines it should touch. Unaddressed commands hit every line.",
  "Delete command d": "`2d` drops line 2 and `/debug/d` drops matching lines — sed's line filter. Deletion happens before printing, so dropped lines never reach output. It carves unwanted lines out of streams.",
  "Print command p": "With `-n` suppressing default output, `sed -n '5p'` prints only line 5. `p` selects while `-n` silences everything else. The pair turns sed into a precise line extractor.",
  "Global flag g": "Without `g`, `s/a/b/` replaces only the first match per line; with `g` it replaces every match. Most real substitutions want `g` — first-only is the common surprise. Read `s/x/y/` as `first x` unless `g` says otherwise.",
  "Multiple expressions -e": "`sed -e 's/a/A/g' -e 's/b/B/g'` chains edits in order, with each seeing the previous one's output. `-e` sequences transformations readably instead of semicolon soup. Order matters: later expressions match earlier replacements.",
  "Capture groups and backrefs": "Parenthesized groups capture and `\\1` replays the first capture: `s/([0-9]+)/[\\1]/` brackets numbers. Backrefs rearrange text — swapping fields, wrapping matches, normalizing formats. They turn substitution into restructuring.",
  "BEGIN and END blocks": "`BEGIN { }` runs before any input for headers and initialization, while `END { }` runs after all input for totals and summaries. The per-line block accumulates between them. Three blocks make one complete report.",
  "Column sums": "`{ s += $1 } END { print s }` sums a column across all lines — the flagship awk one-liner. Initialize in BEGIN for clarity with multiple accumulators. awk arithmetic is floating-point, unlike the shell's integers.",
  "Field separator -F": "`-F:` splits on colons, `-F,` on commas, and `-F'[ \\t]+'` on whitespace runs. The separator defines what a field is for that invocation. Match `-F` to the data format or every column index is wrong.",
  "Pattern conditions": "`$2 >= 70 { print $1 }` acts only on lines passing the test — awk's filter-then-act core. Patterns can be regexes (`/error/`), comparisons, or ranges. Conditions keep the action block small and total.",
  "String functions": "awk ships `length()`, `substr()`, `index()`, `toupper()`, and `split()` — string surgery without spawning processes. `substr($2, 1, 3)` trims fields inline. Prefer built-ins over piping fields through sed.",
  "Formatted output printf": "awk's `printf \"%-10s %5d\\n\", $1, $2` aligns columns like C — widths, padding, and decimals. Formatted output turns data dumps into readable tables. Format in awk rather than post-processing spaces.",
  "Name patterns -name": "`find dir -name '*.log'` matches basenames with globs — quote the pattern or the shell expands it first. `-iname` ignores case. Name search is the fastest way to locate files by convention.",
  "Type filters -type": "`-type f` means files only, `-type d` directories, and `-type l` symlinks — type filters remove the wrong-kind results. Combine with `-name` to say which kind of which name. Types keep destructive follow-ups aimed correctly.",
  "Time filters -mtime": "`-mtime -7` means modified within 7 days and `+30` older than 30 — find's cleanup vocabulary. Time filters drive retention scripts: find old, archive, delete. Test with `-ls` before adding `-delete`.",
  "-print0 with xargs -0": "`-print0` separates results with NUL bytes and `xargs -0` reads them — the only filename-safe channel. Newlines and spaces in names survive intact. Any `find | xargs` without `-0` is a latent bug.",
  "xargs -I replacement": "`-I{}` runs the command once per input with `{}` marking the spot: `-I{} mv {} backup/{}`. It handles commands that take exactly one filename. Default batching is faster; `-I` is more flexible.",
  "Safe filenames": "Filenames can contain spaces, newlines, quotes, and dashes — scripts must assume hostility. NUL-delimited streams plus quoted expansions survive all of them. Test filename handling with a deliberately evil name.",
  "Create and verify -czvf/-tzvf": "`tar -czvf b.tar.gz dir/` creates verbosely while `tar -tzvf b.tar.gz` lists contents before you trust the file. Create, then list, then extract — the verify step catches missing files early. The `v` makes both directions auditable.",
  "Exclude patterns": "`--exclude='*.log' --exclude=.git` keeps junk out of archives. Exclusions shrink backups and keep secrets out of shared tarballs. Exclude caches, outputs, and credentials by default.",
  "Incremental notes": "Incremental backups (`--listed-incremental=snap`) store only what changed since the last snapshot. Full plus incrementals trade restore complexity for space. Timestamp the snapshot file with the backup set.",
  "gzip vs bzip2 vs xz": "gzip is fast and universal, bzip2 compresses smaller but slower, and xz squeezes hardest at the highest CPU cost. Text compresses dramatically while already-compressed media barely shrinks. Match the tool to the bottleneck: time or space.",
  "Compression levels": "`-1` means fastest through `-9` smallest, letting you tune the trade: `-1` for hot paths, `-9` for cold archives. Defaults sit in the middle for a reason. Benchmark on your data before standardizing.",
  "tar + compression pairs": "tar bundles while compressors shrink single streams — paired as `-czf` (gzip), `-cjf` (bzip2), and `-cJf` (xz). Modern tar auto-detects on extract (`-xf`). One archive command does both jobs.",
  "Octal modes": "Permissions are three octal digits — owner, group, others — each summing r(4) w(2) x(1): `755` is `rwxr-xr-x`. Octal sets the full mode absolutely, unlike symbolic `+x` tweaks. Memorize 644 for files, 755 for dirs and scripts, 600 for secrets.",
  "umask": "`umask 022` strips write for group and others from new files, yielding 644 and 755 by default. It is a creation mask rather than retroactive — existing files keep their modes. Set umask in profiles for consistently safe defaults.",
  "Special bits setuid/setgid/sticky": "setuid (4) runs as the file owner, setgid (2) as the group, and sticky (1) on directories restricts deletion to owners (`/tmp` uses `1777`). They are powerful and dangerous — audit with `find / -perm -4000`. Prefer sudo rules over new setuid binaries.",
  "id and groups": "`id` prints uid, gid, and every group while `groups` lists group names. Scripts read them to check capability before acting. Identity explains permission denials — `groups` shows why a file is readable or not.",
  "sudoers concepts": "`/etc/sudoers` (edited via `visudo`) grants named users scoped root commands. Least privilege means `user ALL=(ALL) /usr/bin/systemctl restart app` rather than `ALL`. Scripts needing root should document and check it upfront.",
  "User checks in scripts": "Gate privileged scripts early: `[ \"$(id -u)\" -eq 0 ] || { echo need root; exit 1; }`. Failing fast beats failing halfway through system changes. Check identity before touching anything privileged.",
  "ps snapshots": "`ps -eo pid,comm` snapshots the process table — a point-in-time list rather than live state. Snapshots suit scripts while interactive `top` suits humans. PIDs recycle, so snapshot-then-signal can hit the wrong process.",
  "pgrep patterns": "`pgrep -f pattern` returns matching PIDs for scripting — cleaner than `ps | grep` pipelines that match themselves. `-x` anchors exact names. Verify matches with `pgrep -a` (showing full commands) before signaling.",
  "kill signals": "`kill PID` sends TERM (polite) while `kill -9` sends KILL (uncatchable, last resort). Always try TERM first and give the process a moment. KILL skips cleanup — corrupted state is the price of force.",
  "Background PIDs $!": "`$!` holds the last backgrounded job's PID — capture it immediately before another `&` overwrites it. The PID lets `wait` and `kill` target that exact job. Untracked background jobs become orphans.",
  "wait semantics": "`wait` reaps all background jobs while `wait $pid` reaps one and returns its status. Waiting prevents the script from exiting while work is unfinished. Check `$?` after `wait $pid` for that job's result.",
  "kill %job": "`kill %1` signals job 1 by shell job-id — an interactive convenience, since job-ids exist only in that shell. Scripts should use PIDs (`$!`) instead. Job-ids shine at the prompt; PIDs travel.",
  "Five time fields": "Crontab entries are `minute hour day-of-month month day-of-week command`: `0 2 * * *` means 2 AM daily. The two day fields OR together — the classic scheduling surprise. Comment every entry with its plain-English meaning.",
  "Crontab editing": "`crontab -e` edits your schedule, `-l` lists, and `-r` removes (dangerously, without backup). Always list before editing and keep the file in version control elsewhere. A deleted crontab has no undo.",
  "Cron logging": "cron mails output or drops it — redirect explicitly: `>> /var/log/job.log 2>&1`. Silent cron jobs fail invisibly for months. Log every run with timestamps and alert on nonzero exits.",
  "curl flags -fsSL": "`-f` fails on HTTP errors, `-sS` silences progress but shows errors, and `-L` follows redirects — `-fsSL` is the script-safe bundle. Bare `curl` reports success on 404 pages. Memorize `-fsSL` as the default for automation.",
  "Saving with -o": "`-o file` saves to a named file while `-O` uses the remote name. `-o` pairs with explicit paths in scripts for predictable locations. Check the exit status — a saved error page is still a failure.",
  "Retries and timeouts": "`--retry 3 --max-time 30 --connect-timeout 10` bounds every network call: retries for flakiness, timeouts against hangs. Unbounded network calls wedge scripts and pipelines. Every curl in automation needs a timeout.",
  "JSON endpoints": "REST endpoints return JSON over HTTP verbs: GET reads, POST creates, PUT replaces. `curl -H 'Accept: application/json'` asks explicitly. Know the verb, the path, and the expected status before scripting the call.",
  "Parsing with grep/awk": "Without `jq`, `grep -o '\"key\": *\"[^\"]*\"'` extracts simple string values. It is brittle on nested JSON but dependency-free. Prefer `jq` where installable; grep-parse only flat, predictable payloads.",
  "API error handling": "Check the HTTP status (`-w '%{http_code}'`) before parsing bodies — a 500 page is not JSON. Retry 5xx and 429 while failing fast on 4xx. Parse only after confirming 2xx.",
  "Branch workflows": "Branches isolate work: create per task, merge when done, delete after. Short-lived branches keep merges trivial while long-lived ones breed conflicts. The workflow is branch, commit, merge, delete — on repeat.",
  "git switch": "`git switch name` changes branches and `-c new` creates and switches — the modern, safe split of overloaded `checkout`. `switch` refuses when uncommitted changes would be overwritten. Prefer `switch` and `restore` over `checkout` in new muscle memory.",
  "Merge strategies": "Fast-forward replays commits linearly when possible while `--no-ff` forces a merge commit preserving the branch shape. Choose linear history or explicit merges per team convention. The strategy shapes how history reads later.",
  "Stash stack": "Stash is a stack: `stash` pushes, `list` shows, `pop` and `apply` restore, `drop` discards. Multiple stashes accumulate with `stash@{n}` addresses. Name entries (`stash push -m msg`) or the stack becomes mystery meat.",
  "stash pop vs apply": "`pop` restores and drops the entry while `apply` restores and keeps it. `pop` is the normal retrieve; `apply` is the cautious one that keeps a backup until you verify. Conflicts on restore keep the entry either way.",
  "Stash messages": "`git stash push -m 'wip: login form'` labels the entry for later identification. Messages turn `stash@{2}` from a puzzle into a plan. Unlabeled stashes rot while labeled ones get restored.",
  "rebase vs merge": "Rebase replays your commits onto the tip — linear history with rewritten hashes; merge preserves both lines with a merge commit. Rebase private branches and merge shared ones. Never rebase commits others have pulled.",
  "Interactive rebase notes": "`rebase -i` opens an editor to pick, squash, reword, and drop — history surgery for clean pull requests. Squash fixups before review, never after merge. Interactive rewrite demands a terminal and care.",
  "Conflict flow": "Conflicts pause the operation with markers in files: edit, `git add` the resolutions, then `rebase --continue` (or commit for merges). `--abort` restores the pre-operation state safely. Resolve calmly and abort freely.",
  "pre-commit hooks": "`.git/hooks/pre-commit` runs on every commit — lint, format-check, or secret-scan before history records anything. A failing hook blocks the commit with your message. Automate standards where they cannot be skipped.",
  "Hook executables": "Hooks must be executable files with no extension, named exactly (`pre-commit`, `pre-push`). Non-executable hooks are silently ignored — the classic reason a hook never ran. `chmod +x` is part of installing a hook.",
  "Sample hooks": "Git ships `.sample` templates in `.git/hooks/` — rename to activate. Samples document the arguments and exit conventions. Start from samples rather than blank files.",
  "Backup design": "A backup answers what, where, and how often: which directories, which destination, which schedule. Design retention too — how many copies, how far back. Undesigned backups are either incomplete or infinite.",
  "Timestamped archives": "Stamp filenames with dates (`backup-$(date +%F).tar.gz`) so generations never collide. Timestamps make pruning (`find -mtime +30 -delete`) and restores (`which day?`) trivial. Never overwrite yesterday's backup with today's.",
  "Restore checks": "A backup is only as good as its last tested restore — list (`-tzf`) every archive after creation and periodically extract to scratch. Unverified backups fail exactly when needed. Verify automatically, not hopefully.",
  "fetch vs pull": "`fetch` downloads remote state without touching your work while `pull` is fetch plus merge. Fetch to inspect (`log origin/main`); pull to integrate. Fetching is always safe while pulling can conflict.",
  "Upstream tracking -u": "`push -u origin main` links the local branch to its remote counterpart, so later `push` and `pull` need no arguments. Tracking is per-branch configuration, set once. Check links with `git branch -vv`.",
  "Remote URLs": "Remotes are URLs — HTTPS (token prompts) or SSH (`git@host:path`, key auth). `remote -v` shows fetch and push URLs while `remote set-url` changes them. Know which protocol your credentials match.",
  "GitHub flow": "GitHub flow runs branch off main, push, open a pull request, review, merge, delete the branch. Main stays deployable and every change is reviewed. It suits continuous delivery better than heavy release trains.",
  "Feature branches": "One branch per change, named for the work (`feature/login`, `fix/timeout`), merged via review. Small branches review fast and revert cleanly. Branch from current main to minimize conflicts.",
  "Release branches": "Release branches (`release/2.4`) freeze a version for stabilization while main moves on. Hotfixes land on the release, then merge back. They trade branch overhead for controlled rollouts.",
  "Organizing dotfiles": "Keep shell config in a version-controlled dotfiles repo rather than scattered edits. One repo, one README, install via documented steps. Organized dotfiles make every new machine feel like home in minutes.",
  "Symlink farms": "Symlink `~/.bashrc` to the repo file so edits land under version control immediately. A tiny install script creates all links idempotently. Links keep the live config and the repo the same file.",
  "Bare-repo method notes": "A bare repo with `--git-dir=$HOME/.cfg` versions home files without symlinks: `config checkout` materializes them. It scales to dozens of files with no link farm. Exotic but elegant for full-home tracking.",
  "PATH management": "PATH order decides which binary wins — prepend personal dirs and never append untrusted ones. `export PATH=\"$HOME/bin:$PATH\"` in the profile, guarded against duplication. A polluted PATH runs the wrong programs.",
  "Per-project env files": "`.env` files hold per-project secrets and settings, loaded with `set -a; . ./.env; set +a`. Never commit `.env` — commit `.env.example` instead. Project env keeps machine config out of code.",
  "direnv notes": "`direnv` auto-loads `.envrc` on entering a directory and unloads on exit — project env without manual sourcing. `.envrc` must be explicitly allowed (`direnv allow`) for safety. Automation for what sourcing does by hand.",
  "set -x tracing": "`set -x` prints each command after expansion, prefixed by PS4 — the execution X-ray. `set +x` stops it, so wrap just the suspicious section. Trace output goes to stderr, leaving stdout clean for assertions.",
  "PS4 customization": "`PS4` prefixes every trace line — `export PS4='+ ${BASH_SOURCE}:${LINENO}: '` adds file and line. Custom PS4 turns traces into located evidence. Set it once in debug helpers.",
  "shellcheck notes": "ShellCheck statically flags quoting, portability, and logic bugs without running anything. Treat its warnings as errors in CI. It catches the bugs that tracing only finds after damage.",
  "Log levels": "Levels (DEBUG, INFO, WARN, ERROR) let runners filter noise: quiet by default, verbose on demand. Prefix every line (`[INFO] message`) so `grep` filters work. Consistent levels make logs queryable.",
  "Tee patterns": "`cmd 2>&1 | tee run.log` shows output live AND saves it — the interactive-run pattern. `tee -a` appends across runs. Tee when humans watch and history matters.",
  "logger command notes": "`logger` sends lines to syslog for centralized collection — the server-side step beyond files. Tag with `-t myapp` for grep-able identity. Files for scripts, syslog for services.",
  "getopts loop": "`while getopts 'n:v' opt` parses short flags into `$opt`, with unknown flags landing in `?`. The loop is the standard flag parser — no manual `shift` chains. Declare the option string once; it documents the interface.",
  "OPTARG handling": "Options with `:` take arguments delivered in `$OPTARG`: `n) name=\"$OPTARG\"`. Missing arguments yield `?` with a diagnostic. Always quote `$OPTARG` — values contain spaces.",
  "Usage functions": "A `usage()` function prints the synopsis and exits nonzero on bad input. Every CLI needs one — it is the built-in manual. Call it for `-h`, unknown flags, and missing required args.",
  "Sourcing configs": "`. ./config.sh` (or `source`) loads `key=value` files into the current shell — the simplest config format. Sourced files run as code, so only source trusted ones. Defaults first, sourced overrides second.",
  "INI parsing with awk": "`awk -F= '$1==\"key\" {print $2}'` reads INI-style values without dependencies. It handles flat `key=value` files robustly. For sections and nesting, upgrade to a real parser.",
  "Defaults + overrides": "Layer configuration: hardcoded defaults, then config file, then environment, then flags — each overriding the last. Document the precedence so behavior is predictable. Explicit layering beats scattered conditionals.",
  "xargs -P": "`xargs -P4 -n1` runs four workers in parallel — the one-flag speedup for batch jobs. Output interleaves, so parallelize only order-independent work. Size `-P` to CPUs rather than wishful thinking.",
  "wait fan-out": "Background N jobs with `&`, then one `wait` fans out and rejoins — the built-in parallel pattern. Capture PIDs (`$!`) to report per-job status after. Fan-out for speed, `wait` for correctness.",
  "Job slots": "Unbounded `&` spawns swamp machines — cap concurrent jobs with a slot counter or `xargs -P`. Slots bound memory and file descriptors. Parallelism needs a throttle.",
  "Assert functions": "An `assert_eq expected actual name` helper turns checks into one-liners printing pass or FAIL. Tests are just scripts that exit nonzero on failure. Grow helpers (`assert_contains`, `assert_rc`) as suites grow.",
  "Test runners (bats) notes": "bats runs `@test` blocks with setup, teardown, and TAP output — real test structure for shell. `run cmd` captures status and output for assertions. Adopt bats when assert-scripts outgrow single files.",
  "Exit-code checks": "Every test ends in an exit code: 0 for all-green, nonzero with the failure printed. CI reads only the code. Print diagnostics AND exit correctly — one for humans, one for machines.",
  "Quoting untrusted input": "Quote every expansion of untrusted data — `echo \"$user\"` prints literally instead of executing. Unquoted variables split, glob, and reinterpret metacharacters. Quoting is the primary injection defense.",
  "eval dangers": "`eval` re-parses its arguments as code — `eval \"echo $user\"` executes embedded commands. There is almost always a safer construct (arrays, indirect expansion `${!var}`). Treat `eval` on external input as a vulnerability.",
  "Injection demo (safe)": "A value like `ada; echo PWNED` is harmless text when quoted and a command when evaled. Demonstrate injection with echo-only payloads, never destructive ones. Show the danger without the damage.",
  "=~ operator": "`[[ $s =~ regex ]]` matches extended regex inside `[[ ]]` with an unquoted pattern. It brings full pattern power to conditionals. Remember: a quoted pattern means a literal string.",
  "BASH_REMATCH": "After `=~` matches, `${BASH_REMATCH[0]}` is the whole match and `[1..n]` are the capture groups. Rematch data turns validation into extraction. Read captures immediately — the next `=~` overwrites them.",
  "Validation patterns": "Email, semver, and date formats each reduce to one anchored regex: `^...$` with no partial-match escape. Validate input at entry with named patterns. Reject early with a message naming the expected format.",
  "date formatting": "`date +%F_%T` stamps `2026-10-02_12:00:00` — `+` plus format codes compose any layout. `%F` gives date, `%T` time, `%s` epoch. Format explicitly since default layouts vary by locale.",
  "Epoch math": "Seconds since epoch (`date +%s`) make time arithmetic trivial subtraction: durations, ages, timeouts. Compare integers and format only for display. Epochs are the machine language of time.",
  "date -d portability notes": "GNU `date -d` parses arbitrary dates (`-d '@0'`, `-d 'last friday'`) while BSD and macOS use `-v` and `-j` instead. Date arithmetic is the least portable shell feature. Isolate date logic and test on every target OS.",
  "sort -n/-r/-u": "`-n` means numeric order (10 after 9, not after 1), `-r` reverse, `-u` unique — sort's essential flags. Combine freely: `sort -nur`. Pick flags deliberately since default sort is lexicographic bytes.",
  "join two files": "`join` merges two sorted files on a common field — the relational join for text. Both inputs must be sorted on the key first. Sorted keys in, matched rows out.",
  "cut ranges": "`cut -d: -f1,3` picks fields 1 and 3 while `-f2-` means from field 2 on. `cut` extracts when awk is overkill. Delimiter plus field list is the whole interface.",
  "df/du reading": "`df -h` shows filesystem free space while `du -sh dir` sizes a tree — capacity's two questions. `df` answers which disk is full; `du` answers which directory did it. Check `df` first, then drill with `du`.",
  "Load averages": "Load averages (1, 5, and 15 minute) measure runnable processes — compare against CPU count rather than zero. Sustained load above core count means queuing. Averages trend while per-core breakdowns (`top`) locate.",
  "Log triage notes": "Triage in order: load, disk, memory, then app logs — system before application. Each check is one command with a threshold. Document thresholds so on-call decisions stay mechanical rather than inspired.",
  "apt/dnf script guards": "Guard installs with `command -v` checks and OS detection — install only what is missing, with the right manager. `command -v curl || sudo apt-get install -y curl` is the pattern. Guards make setup rerunnable.",
  "Idempotent installs": "Rerunning setup must converge rather than duplicate: check-before-install, `--exists` flags, pinned versions. Idempotency turns setup into a safe retry. Test by running twice and diffing the result.",
  "Checksums notes": "Verify downloads with published checksums (`sha256sum -c`) before executing anything. A mismatched hash means stop rather than proceed. Checksums close the supply-chain loop for scripted installs.",
  "Key pairs": "`ssh-keygen -t ed25519` creates a key pair; the private key never leaves your machine while the public one goes to servers. Passphrases protect the private key at rest. Use one key per device, named for it.",
  "ssh config": "`~/.ssh/config` names hosts with users, keys, and ports — `ssh deploy` instead of flags. Config turns connection trivia into short names scripts can use. Keep the file `600` since it maps your access.",
  "scp/rsync notes": "`scp` copies over SSH simply while `rsync -avz` resumes, compresses, and syncs incrementally. `scp` suits one-offs; `rsync` suits trees and repeats. Both ride SSH keys, so no new credentials are needed.",
  "systemctl units": "`systemctl status`, `start`, `stop`, and `enable app` manage the `app.service` unit — the lifecycle verbs. `enable` persists across reboots while `start` is one-shot. Units are how Linux runs things while nobody watches.",
  "Service files": "Unit files declare what runs, as whom, and on what dependencies (`After=network.target`). Ship them with the app rather than as tribal knowledge. Declarative services restart predictably.",
  "Logs with journalctl": "`journalctl -u app --since '1 hour ago'` reads a service's collected output — stdout becomes queryable history. `-f` follows live like `tail`. Services log to the journal while humans read with journalctl.",
  "Project scaffolding": "Scaffolding scripts generate the standard layout — directories, configs, READMEs — so projects start consistent. Generate rather than document-and-hope. One command should yield a runnable skeleton.",
  "Checklist scripts": "Executable checklists print each step, run it, and verify — progress plus proof. Steps as array elements keep the list data-driven. A checklist script never skips step three.",
  "Idempotency": "Rerunning a planner must be safe: check state before acting, skip completed steps, and report what changed. Idempotent scripts are resumable scripts. Design every step as safe-to-repeat.",
  "Deploy pipeline": "A deploy pipeline sequences build, test, package, publish, and activate — each gated on the previous. Stages map to script functions with checks between. The pipeline is the product's front door, so guard it.",
  "Health checks": "After activating, verify: process alive, port listening, endpoint returning 200. Health checks turn `it deployed` into `it works`. Fail the deploy — and roll back — on any check.",
  "Rollback plan": "Every deploy needs a reverse: previous artifact retained, switch-back tested, database migrations reversible. Plan rollback before shipping forward. The best deploys are the boring, reversible ones.",
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
  "set -euo pipefail": {
    q: "What does set -euo pipefail do?",
    opts: [
      { id: "a", text: "Exits on errors, errors on unset vars, fails pipelines on any stage failure", correct: true },
      { id: "b", text: "Disables all error checking", correct: false },
      { id: "c", text: "Enables verbose tracing", correct: false },
      { id: "d", text: "Installs packages", correct: false },
    ],
  },
  "Fail-fast scripts": {
    q: "Why should scripts fail fast?",
    opts: [
      { id: "a", text: "To stop at the first error before damage spreads", correct: true },
      { id: "b", text: "To run faster", correct: false },
      { id: "c", text: "To skip tests", correct: false },
      { id: "d", text: "To hide errors", correct: false },
    ],
  },
  "Unset variable guards": {
    q: "What does set -u do?",
    opts: [
      { id: "a", text: "Errors when expanding an unset variable", correct: true },
      { id: "b", text: "Unsets all variables", correct: false },
      { id: "c", text: "Exports variables", correct: false },
      { id: "d", text: "Clears the screen", correct: false },
    ],
  },
  "Shebang lines": {
    q: "Where must the shebang line appear?",
    opts: [
      { id: "a", text: "As the very first line of the file", correct: true },
      { id: "b", text: "At the end of the file", correct: false },
      { id: "c", text: "Anywhere in the file", correct: false },
      { id: "d", text: "Inside a comment block", correct: false },
    ],
  },
  "Executable bits": {
    q: "How do you make script.sh directly runnable?",
    opts: [
      { id: "a", text: "chmod +x script.sh", correct: true },
      { id: "b", text: "chmod -x script.sh", correct: false },
      { id: "c", text: "run script.sh", correct: false },
      { id: "d", text: "compile script.sh", correct: false },
    ],
  },
  "env shebangs": {
    q: "Why use #!/usr/bin/env bash?",
    opts: [
      { id: "a", text: "It finds bash through PATH for portability", correct: true },
      { id: "b", text: "It runs faster", correct: false },
      { id: "c", text: "It enables networking", correct: false },
      { id: "d", text: "It skips permissions", correct: false },
    ],
  },
  "Default values \${var:-}": {
    q: "What does ${nick:-World} expand to when nick is unset?",
    opts: [
      { id: "a", text: "World", correct: true },
      { id: "b", text: "Empty string", correct: false },
      { id: "c", text: "An error", correct: false },
      { id: "d", text: "The word nick", correct: false },
    ],
  },
  "Assignment defaults \${var:=}": {
    q: "How does ${var:=x} differ from ${var:-x}?",
    opts: [
      { id: "a", text: "It also assigns x to var", correct: true },
      { id: "b", text: "It deletes var", correct: false },
      { id: "c", text: "It prints x twice", correct: false },
      { id: "d", text: "There is no difference", correct: false },
    ],
  },
  "Error on unset \${var:?}": {
    q: "What does ${token:?missing} do when token is unset?",
    opts: [
      { id: "a", text: "Aborts with the message missing", correct: true },
      { id: "b", text: "Sets token to missing", correct: false },
      { id: "c", text: "Ignores it", correct: false },
      { id: "d", text: "Prints missing and continues", correct: false },
    ],
  },
  "Prefix removal \${var#}": {
    q: "What does ${path##*/} yield for /a/b/c.txt?",
    opts: [
      { id: "a", text: "c.txt", correct: true },
      { id: "b", text: "/a/b/c.txt", correct: false },
      { id: "c", text: "c", correct: false },
      { id: "d", text: "/a/b/", correct: false },
    ],
  },
  "Suffix removal \${var%}": {
    q: "What does ${f%.txt} yield for report.txt?",
    opts: [
      { id: "a", text: "report", correct: true },
      { id: "b", text: ".txt", correct: false },
      { id: "c", text: "report.txt", correct: false },
      { id: "d", text: "Empty string", correct: false },
    ],
  },
  "Pattern replacement \${var//}": {
    q: "What does ${s//a/A} do?",
    opts: [
      { id: "a", text: "Replaces every a with A", correct: true },
      { id: "b", text: "Replaces only the first a", correct: false },
      { id: "c", text: "Deletes all a characters", correct: false },
      { id: "d", text: "Uppercases the whole string", correct: false },
    ],
  },
  "Array slicing": {
    q: "What does ${arr[@]:1:2} give?",
    opts: [
      { id: "a", text: "Two elements starting at index 1", correct: true },
      { id: "b", text: "The first two elements", correct: false },
      { id: "c", text: "Elements joined into one string", correct: false },
      { id: "d", text: "An error", correct: false },
    ],
  },
  "Associative arrays": {
    q: "How do you declare an associative array?",
    opts: [
      { id: "a", text: "declare -A map", correct: true },
      { id: "b", text: "map = {}", correct: false },
      { id: "c", text: "array -A map", correct: false },
      { id: "d", text: "assoc map", correct: false },
    ],
  },
  "Array iteration guards": {
    q: "What is the safe way to iterate an array?",
    opts: [
      { id: "a", text: "for x in \"${arr[@]}\"", correct: true },
      { id: "b", text: "for x in $arr", correct: false },
      { id: "c", text: "foreach x arr", correct: false },
      { id: "d", text: "loop arr", correct: false },
    ],
  },
  "Substring extraction offsets": {
    q: "What does ${s:6} give for s=hello-world?",
    opts: [
      { id: "a", text: "world", correct: true },
      { id: "b", text: "hello", correct: false },
      { id: "c", text: "-world", correct: false },
      { id: "d", text: "Empty string", correct: false },
    ],
  },
  "Case mapping patterns": {
    q: "What does ${s^^} do?",
    opts: [
      { id: "a", text: "Uppercases the value", correct: true },
      { id: "b", text: "Lowercases the value", correct: false },
      { id: "c", text: "Reverses the string", correct: false },
      { id: "d", text: "Trims spaces", correct: false },
    ],
  },
  "Length checks": {
    q: "How do you test a string is longer than 5 characters?",
    opts: [
      { id: "a", text: "[ \"${#s}\" -gt 5 ]", correct: true },
      { id: "b", text: "[ s > 5 ]", correct: false },
      { id: "c", text: "[ len(s) > 5 ]", correct: false },
      { id: "d", text: "[ s -gt 5 ]", correct: false },
    ],
  },
  "(( )) conditionals": {
    q: "When is (( expr )) true?",
    opts: [
      { id: "a", text: "When the result is nonzero", correct: true },
      { id: "b", text: "When the result is zero", correct: false },
      { id: "c", text: "Always", correct: false },
      { id: "d", text: "When it prints output", correct: false },
    ],
  },
  "Bases and precedence": {
    q: "What is $((2 + 3 * 4))?",
    opts: [
      { id: "a", text: "14", correct: true },
      { id: "b", text: "20", correct: false },
      { id: "c", text: "24", correct: false },
      { id: "d", text: "9", correct: false },
    ],
  },
  "Ternary in arithmetic": {
    q: "What does $((1 > 2 ? 10 : 20)) print?",
    opts: [
      { id: "a", text: "20", correct: true },
      { id: "b", text: "10", correct: false },
      { id: "c", text: "1", correct: false },
      { id: "d", text: "0", correct: false },
    ],
  },
  "[[ ]] vs [ ]": {
    q: "Which is true about [[ ]]?",
    opts: [
      { id: "a", text: "It avoids word splitting and allows pattern matching", correct: true },
      { id: "b", text: "It is POSIX sh compatible", correct: false },
      { id: "c", text: "It requires double quoting everything twice", correct: false },
      { id: "d", text: "It runs external commands", correct: false },
    ],
  },
  "Regex match =~": {
    q: "What does [[ $v =~ ^v[0-9]+ ]] test?",
    opts: [
      { id: "a", text: "Whether the value starts with v followed by digits", correct: true },
      { id: "b", text: "Exact string equality", correct: false },
      { id: "c", text: "Glob filename matching", correct: false },
      { id: "d", text: "String length", correct: false },
    ],
  },
  "Glob match ==": {
    q: "What does [[ $f == *.log ]] test?",
    opts: [
      { id: "a", text: "Whether f ends in .log via glob matching", correct: true },
      { id: "b", text: "Regex match", correct: false },
      { id: "c", text: "File existence", correct: false },
      { id: "d", text: "Exact equality only", correct: false },
    ],
  },
  "&& and || guards": {
    q: "What does [ -f x ] && echo hi do?",
    opts: [
      { id: "a", text: "Prints hi only if file x exists", correct: true },
      { id: "b", text: "Always prints hi", correct: false },
      { id: "c", text: "Creates file x", correct: false },
      { id: "d", text: "Deletes file x", correct: false },
    ],
  },
  "Short-circuit chains": {
    q: "What is the risk of a && b || c?",
    opts: [
      { id: "a", text: "c runs when b fails too, not just when a fails", correct: true },
      { id: "b", text: "It never runs c", correct: false },
      { id: "c", text: "It runs all three always", correct: false },
      { id: "d", text: "It is a syntax error", correct: false },
    ],
  },
  "Nested conditionals": {
    q: "How should deep if nesting be handled?",
    opts: [
      { id: "a", text: "Flatten with combined conditions or early exits", correct: true },
      { id: "b", text: "Nest deeper for clarity", correct: false },
      { id: "c", text: "Avoid conditions entirely", correct: false },
      { id: "d", text: "Duplicate the branches", correct: false },
    ],
  },
  "C-style for loops": {
    q: "Which loops i from 1 to 3?",
    opts: [
      { id: "a", text: "for ((i=1; i<=3; i++))", correct: true },
      { id: "b", text: "for i in 1..3", correct: false },
      { id: "c", text: "loop 1 to 3", correct: false },
      { id: "d", text: "repeat 3", correct: false },
    ],
  },
  "Brace ranges {1..n}": {
    q: "What does {1..3} expand to?",
    opts: [
      { id: "a", text: "1 2 3", correct: true },
      { id: "b", text: "1..3", correct: false },
      { id: "c", text: "123", correct: false },
      { id: "d", text: "A file list", correct: false },
    ],
  },
  "Loop counters": {
    q: "What must a manual counter loop never forget?",
    opts: [
      { id: "a", text: "Incrementing the counter", correct: true },
      { id: "b", text: "Printing the counter", correct: false },
      { id: "c", text: "Exporting the counter", correct: false },
      { id: "d", text: "Zeroing it afterwards", correct: false },
    ],
  },
  "while read loops": {
    q: "What does -r do in read -r line?",
    opts: [
      { id: "a", text: "Prevents backslash interpretation", correct: true },
      { id: "b", text: "Reads in reverse", correct: false },
      { id: "c", text: "Retries on failure", correct: false },
      { id: "d", text: "Reads raw disk blocks", correct: false },
    ],
  },
  "break with levels": {
    q: "What does break 2 do?",
    opts: [
      { id: "a", text: "Exits two enclosing loop levels", correct: true },
      { id: "b", text: "Breaks with a two-second pause", correct: false },
      { id: "c", text: "Skips two iterations", correct: false },
      { id: "d", text: "Exits the script with code 2", correct: false },
    ],
  },
  "continue guards": {
    q: "What does continue do?",
    opts: [
      { id: "a", text: "Skips to the next loop iteration", correct: true },
      { id: "b", text: "Exits the loop", correct: false },
      { id: "c", text: "Restarts the script", correct: false },
      { id: "d", text: "Pauses one second", correct: false },
    ],
  },
  "Function arguments $1": {
    q: "What is $1 inside a function?",
    opts: [
      { id: "a", text: "The function's first argument", correct: true },
      { id: "b", text: "The script's first argument", correct: false },
      { id: "c", text: "The function name", correct: false },
      { id: "d", text: "Always empty", correct: false },
    ],
  },
  "local variables": {
    q: "What does local do?",
    opts: [
      { id: "a", text: "Confines the variable to the current function", correct: true },
      { id: "b", text: "Exports it globally", correct: false },
      { id: "c", text: "Makes it readonly", correct: false },
      { id: "d", text: "Deletes it on exit", correct: false },
    ],
  },
  "Echo-based returns": {
    q: "How does a function return data (not status)?",
    opts: [
      { id: "a", text: "By printing it for command substitution", correct: true },
      { id: "b", text: "With return value", correct: false },
      { id: "c", text: "With exit data", correct: false },
      { id: "d", text: "Via a global echo flag", correct: false },
    ],
  },
  "local vs global": {
    q: "What happens to undeclared bash variables in functions?",
    opts: [
      { id: "a", text: "They are global and visible everywhere", correct: true },
      { id: "b", text: "They are function-local", correct: false },
      { id: "c", text: "They are deleted on return", correct: false },
      { id: "d", text: "They cause errors", correct: false },
    ],
  },
  "Exported functions": {
    q: "What does export -f myfunc do?",
    opts: [
      { id: "a", text: "Makes myfunc available to child bash processes", correct: true },
      { id: "b", text: "Saves myfunc to a file", correct: false },
      { id: "c", text: "Publishes myfunc online", correct: false },
      { id: "d", text: "Deletes myfunc", correct: false },
    ],
  },
  "Subshell scope": {
    q: "What happens to assignments inside ( ... )?",
    opts: [
      { id: "a", text: "They vanish when the subshell ends", correct: true },
      { id: "b", text: "They persist in the parent", correct: false },
      { id: "c", text: "They are written to disk", correct: false },
      { id: "d", text: "They become exported", correct: false },
    ],
  },
  "trap on EXIT": {
    q: "What does trap cleanup EXIT do?",
    opts: [
      { id: "a", text: "Runs cleanup whenever the shell exits", correct: true },
      { id: "b", text: "Runs cleanup once right now", correct: false },
      { id: "c", text: "Disables exiting", correct: false },
      { id: "d", text: "Cleans on startup", correct: false },
    ],
  },
  "Cleanup functions": {
    q: "What should a cleanup function remove?",
    opts: [
      { id: "a", text: "Temp files and background jobs it created", correct: true },
      { id: "b", text: "System binaries", correct: false },
      { id: "c", text: "The script itself", correct: false },
      { id: "d", text: "All environment variables", correct: false },
    ],
  },
  "Trap listing": {
    q: "How do you list installed traps?",
    opts: [
      { id: "a", text: "trap -p", correct: true },
      { id: "b", text: "trap --list-all", correct: false },
      { id: "c", text: "list traps", correct: false },
      { id: "d", text: "echo $TRAPS", correct: false },
    ],
  },
  "SIGINT handling": {
    q: "What sends SIGINT?",
    opts: [
      { id: "a", text: "Ctrl+C from the terminal", correct: true },
      { id: "b", text: "The kill -9 command", correct: false },
      { id: "c", text: "System shutdown only", correct: false },
      { id: "d", text: "A cron schedule", correct: false },
    ],
  },
  "SIGTERM handling": {
    q: "What does SIGTERM mean?",
    opts: [
      { id: "a", text: "A polite request to terminate and clean up", correct: true },
      { id: "b", text: "Instant uncatchable kill", correct: false },
      { id: "c", text: "A terminal resize", correct: false },
      { id: "d", text: "A debug breakpoint", correct: false },
    ],
  },
  "Resetting traps": {
    q: "How do you remove a trap handler?",
    opts: [
      { id: "a", text: "trap - SIGNAL", correct: true },
      { id: "b", text: "untrap SIGNAL", correct: false },
      { id: "c", text: "trap delete SIGNAL", correct: false },
      { id: "d", text: "kill the trap", correct: false },
    ],
  },
  "Merging streams 2>&1": {
    q: "What does >file 2>&1 do?",
    opts: [
      { id: "a", text: "Sends both stdout and stderr to file", correct: true },
      { id: "b", text: "Sends only stdout", correct: false },
      { id: "c", text: "Appends stderr to the screen", correct: false },
      { id: "d", text: "Deletes stderr", correct: false },
    ],
  },
  "stderr to stdout patterns": {
    q: "How do you pipe both streams through grep?",
    opts: [
      { id: "a", text: "cmd 2>&1 | grep pattern", correct: true },
      { id: "b", text: "cmd | grep pattern 2>&1", correct: false },
      { id: "c", text: "cmd >& grep pattern", correct: false },
      { id: "d", text: "grep pattern < cmd", correct: false },
    ],
  },
  "Heredoc quoting": {
    q: "What does <<'EOF' (quoted delimiter) do?",
    opts: [
      { id: "a", text: "Disables expansion inside the heredoc", correct: true },
      { id: "b", text: "Enables extra expansion", correct: false },
      { id: "c", text: "Reads from a file named EOF", correct: false },
      { id: "d", text: "Speeds up input", correct: false },
    ],
  },
  "pipefail semantics": {
    q: "What does set -o pipefail change?",
    opts: [
      { id: "a", text: "A pipeline fails if any stage fails", correct: true },
      { id: "b", text: "Pipelines run faster", correct: false },
      { id: "c", text: "Pipes become bidirectional", correct: false },
      { id: "d", text: "Nothing observable", correct: false },
    ],
  },
  "Process substitution <()": {
    q: "What does <(cmd) provide?",
    opts: [
      { id: "a", text: "The command's output as a readable filename", correct: true },
      { id: "b", text: "A new background job", correct: false },
      { id: "c", text: "A temp variable", correct: false },
      { id: "d", text: "A network socket", correct: false },
    ],
  },
  "Grouping with { }": {
    q: "What does { a; b; } | sort do?",
    opts: [
      { id: "a", text: "Pipes the combined output of a and b into sort", correct: true },
      { id: "b", text: "Sorts the command names", correct: false },
      { id: "c", text: "Runs a and b in parallel", correct: false },
      { id: "d", text: "Creates a file named { }", correct: false },
    ],
  },
  "Character classes": {
    q: "What does [0-9] match?",
    opts: [
      { id: "a", text: "One digit", correct: true },
      { id: "b", text: "The literal text 0-9", correct: false },
      { id: "c", text: "Any number of digits", correct: false },
      { id: "d", text: "Zero or nine", correct: false },
    ],
  },
  "Anchors ^$": {
    q: "What does ^error match?",
    opts: [
      { id: "a", text: "Lines starting with error", correct: true },
      { id: "b", text: "Lines containing error anywhere", correct: false },
      { id: "c", text: "Lines ending with error", correct: false },
      { id: "d", text: "Only the exact line error", correct: false },
    ],
  },
  "Extended regex -E": {
    q: "Which needs grep -E?",
    opts: [
      { id: "a", text: "Patterns using + | ? ( ) without backslashes", correct: true },
      { id: "b", text: "Plain literal search", correct: false },
      { id: "c", text: "Case-insensitive search", correct: false },
      { id: "d", text: "Recursive search", correct: false },
    ],
  },
  "Context flags -A/-B/-C": {
    q: "What does grep -C2 hit show?",
    opts: [
      { id: "a", text: "Two lines before and after each match", correct: true },
      { id: "b", text: "Only the matching lines", correct: false },
      { id: "c", text: "Two matches total", correct: false },
      { id: "d", text: "Column 2 of matches", correct: false },
    ],
  },
  "Invert and count -v/-c": {
    q: "What does grep -c ok log print?",
    opts: [
      { id: "a", text: "The number of lines containing ok", correct: true },
      { id: "b", text: "The matching lines", correct: false },
      { id: "c", text: "The file names", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Recursive grep -r": {
    q: "What does grep -r TODO src/ do?",
    opts: [
      { id: "a", text: "Searches all files under src/ for TODO", correct: true },
      { id: "b", text: "Replaces TODO in src/", correct: false },
      { id: "c", text: "Searches one file named src/", correct: false },
      { id: "d", text: "Lists files named TODO", correct: false },
    ],
  },
  "Log report design": {
    q: "What should you decide first for a log report?",
    opts: [
      { id: "a", text: "The output shape: columns, order, thresholds", correct: true },
      { id: "b", text: "The font", correct: false },
      { id: "c", text: "The log file owner", correct: false },
      { id: "d", text: "The editor", correct: false },
    ],
  },
  "Pipeline composition": {
    q: "How should report pipelines be built?",
    opts: [
      { id: "a", text: "Stage by stage, verifying each stage's output", correct: true },
      { id: "b", text: "All at once from memory", correct: false },
      { id: "c", text: "Longest command first", correct: false },
      { id: "d", text: "Without running until done", correct: false },
    ],
  },
  "Summary formatting": {
    q: "What does the last pipeline stage do?",
    opts: [
      { id: "a", text: "Formats ranked output for humans", correct: true },
      { id: "b", text: "Deletes the input", correct: false },
      { id: "c", text: "Fetches more logs", correct: false },
      { id: "d", text: "Restarts the service", correct: false },
    ],
  },
  "Address ranges": {
    q: "What does sed -n '2,3p' print?",
    opts: [
      { id: "a", text: "Lines 2 through 3", correct: true },
      { id: "b", text: "Line 23", correct: false },
      { id: "c", text: "Every 2nd and 3rd line", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Delete command d": {
    q: "What does /debug/d do?",
    opts: [
      { id: "a", text: "Deletes lines containing debug", correct: true },
      { id: "b", text: "Deletes the file", correct: false },
      { id: "c", text: "Prints debug lines", correct: false },
      { id: "d", text: "Stops sed", correct: false },
    ],
  },
  "Print command p": {
    q: "Why pair -n with p?",
    opts: [
      { id: "a", text: "-n silences default output so only p prints", correct: true },
      { id: "b", text: "It speeds up printing", correct: false },
      { id: "c", text: "It is required syntax", correct: false },
      { id: "d", text: "It numbers lines", correct: false },
    ],
  },
  "Global flag g": {
    q: "How does s/a/b/g differ from s/a/b/?",
    opts: [
      { id: "a", text: "It replaces every match per line, not just the first", correct: true },
      { id: "b", text: "It replaces across files", correct: false },
      { id: "c", text: "It ignores case", correct: false },
      { id: "d", text: "There is no difference", correct: false },
    ],
  },
  "Multiple expressions -e": {
    q: "What does sed -e A -e B do?",
    opts: [
      { id: "a", text: "Applies edit A then edit B in order", correct: true },
      { id: "b", text: "Applies only B", correct: false },
      { id: "c", text: "Runs A and B in parallel", correct: false },
      { id: "d", text: "Edits two files", correct: false },
    ],
  },
  "Capture groups and backrefs": {
    q: "What does \\1 refer to in a replacement?",
    opts: [
      { id: "a", text: "The text captured by the first group", correct: true },
      { id: "b", text: "The first line", correct: false },
      { id: "c", text: "The first file", correct: false },
      { id: "d", text: "A literal 1", correct: false },
    ],
  },
  "BEGIN and END blocks": {
    q: "When does an awk END block run?",
    opts: [
      { id: "a", text: "After all input lines are processed", correct: true },
      { id: "b", text: "Before input", correct: false },
      { id: "c", text: "Once per line", correct: false },
      { id: "d", text: "Never automatically", correct: false },
    ],
  },
  "Column sums": {
    q: "What does { s += $1 } END { print s } compute?",
    opts: [
      { id: "a", text: "The sum of column one", correct: true },
      { id: "b", text: "The line count", correct: false },
      { id: "c", text: "The average", correct: false },
      { id: "d", text: "The maximum", correct: false },
    ],
  },
  "Field separator -F": {
    q: "What does awk -F: do?",
    opts: [
      { id: "a", text: "Splits fields on colons", correct: true },
      { id: "b", text: "Prints field F", correct: false },
      { id: "c", text: "Reads a file named F", correct: false },
      { id: "d", text: "Filters lines containing F", correct: false },
    ],
  },
  "Pattern conditions": {
    q: "What does awk '$2 > 70 { print $1 }' do?",
    opts: [
      { id: "a", text: "Prints field 1 of lines where field 2 exceeds 70", correct: true },
      { id: "b", text: "Prints all lines", correct: false },
      { id: "c", text: "Sorts by field 2", correct: false },
      { id: "d", text: "Counts lines", correct: false },
    ],
  },
  "String functions": {
    q: "Which is an awk string builtin?",
    opts: [
      { id: "a", text: "substr()", correct: true },
      { id: "b", text: "slice()", correct: false },
      { id: "c", text: "replaceAll()", correct: false },
      { id: "d", text: "charAt()", correct: false },
    ],
  },
  "Formatted output printf": {
    q: "What does awk printf with %5d do?",
    opts: [
      { id: "a", text: "Prints an integer right-aligned in width 5", correct: true },
      { id: "b", text: "Prints 5 decimals", correct: false },
      { id: "c", text: "Repeats output 5 times", correct: false },
      { id: "d", text: "Exits with code 5", correct: false },
    ],
  },
  "Name patterns -name": {
    q: "Why quote '*.log' in find . -name '*.log'?",
    opts: [
      { id: "a", text: "So the shell passes the glob to find unexpanded", correct: true },
      { id: "b", text: "It is optional decoration", correct: false },
      { id: "c", text: "To enable regex mode", correct: false },
      { id: "d", text: "To search faster", correct: false },
    ],
  },
  "Type filters -type": {
    q: "What does find . -type d locate?",
    opts: [
      { id: "a", text: "Directories", correct: true },
      { id: "b", text: "Deleted files", correct: false },
      { id: "c", text: "Text files", correct: false },
      { id: "d", text: "Device nodes", correct: false },
    ],
  },
  "Time filters -mtime": {
    q: "What does -mtime -7 mean?",
    opts: [
      { id: "a", text: "Modified within the last 7 days", correct: true },
      { id: "b", text: "Modified exactly 7 days ago", correct: false },
      { id: "c", text: "Older than 7 days", correct: false },
      { id: "d", text: "Modified in July", correct: false },
    ],
  },
  "-print0 with xargs -0": {
    q: "Why use find -print0 | xargs -0?",
    opts: [
      { id: "a", text: "NUL separation survives spaces and newlines in names", correct: true },
      { id: "b", text: "It always runs faster", correct: false },
      { id: "c", text: "It compresses output", correct: false },
      { id: "d", text: "It sorts results", correct: false },
    ],
  },
  "xargs -I replacement": {
    q: "What does xargs -I{} ... {} do?",
    opts: [
      { id: "a", text: "Runs the command once per input with {} replaced", correct: true },
      { id: "b", text: "Deletes files named {}", correct: false },
      { id: "c", text: "Ignores input", correct: false },
      { id: "d", text: "Counts inputs", correct: false },
    ],
  },
  "Safe filenames": {
    q: "Which filename breaks naive `for f in $(ls)`?",
    opts: [
      { id: "a", text: "A name containing spaces", correct: true },
      { id: "b", text: "a.txt", correct: false },
      { id: "c", text: "file1", correct: false },
      { id: "d", text: "Names never break it", correct: false },
    ],
  },
  "Create and verify -czvf/-tzvf": {
    q: "After tar -czf b.tar.gz dir/, what verifies it?",
    opts: [
      { id: "a", text: "tar -tzf b.tar.gz lists the contents", correct: true },
      { id: "b", text: "Deleting dir/", correct: false },
      { id: "c", text: "Nothing is needed", correct: false },
      { id: "d", text: "Rebooting", correct: false },
    ],
  },
  "Exclude patterns": {
    q: "How do you keep *.log out of a tarball?",
    opts: [
      { id: "a", text: "tar --exclude='*.log' -czf ...", correct: true },
      { id: "b", text: "Delete logs first, always", correct: false },
      { id: "c", text: "tar cannot exclude", correct: false },
      { id: "d", text: "Rename the logs", correct: false },
    ],
  },
  "Incremental notes": {
    q: "What do incremental backups store?",
    opts: [
      { id: "a", text: "Only changes since the last snapshot", correct: true },
      { id: "b", text: "Everything every time", correct: false },
      { id: "c", text: "Only filenames", correct: false },
      { id: "d", text: "Nothing new", correct: false },
    ],
  },
  "gzip vs bzip2 vs xz": {
    q: "Which compresses fastest for hot paths?",
    opts: [
      { id: "a", text: "gzip", correct: true },
      { id: "b", text: "xz", correct: false },
      { id: "c", text: "bzip2", correct: false },
      { id: "d", text: "tar alone", correct: false },
    ],
  },
  "Compression levels": {
    q: "What does gzip -9 select?",
    opts: [
      { id: "a", text: "Best compression, slowest speed", correct: true },
      { id: "b", text: "Fastest, largest output", correct: false },
      { id: "c", text: "No compression", correct: false },
      { id: "d", text: "Nine threads", correct: false },
    ],
  },
  "tar + compression pairs": {
    q: "Which flag pairs tar with gzip?",
    opts: [
      { id: "a", text: "-z", correct: true },
      { id: "b", text: "-j", correct: false },
      { id: "c", text: "-J", correct: false },
      { id: "d", text: "-x", correct: false },
    ],
  },
  "Octal modes": {
    q: "What does chmod 755 set?",
    opts: [
      { id: "a", text: "rwxr-xr-x", correct: true },
      { id: "b", text: "rw-rw-rw-", correct: false },
      { id: "c", text: "rwx------", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "umask": {
    q: "With umask 022, what mode does a new file get?",
    opts: [
      { id: "a", text: "644", correct: true },
      { id: "b", text: "777", correct: false },
      { id: "c", text: "600", correct: false },
      { id: "d", text: "000", correct: false },
    ],
  },
  "Special bits setuid/setgid/sticky": {
    q: "What does the sticky bit do on a directory?",
    opts: [
      { id: "a", text: "Restricts deletion to each file's owner", correct: true },
      { id: "b", text: "Makes files executable", correct: false },
      { id: "c", text: "Hides the directory", correct: false },
      { id: "d", text: "Speeds up listing", correct: false },
    ],
  },
  "id and groups": {
    q: "What does id show?",
    opts: [
      { id: "a", text: "uid, gid, and group memberships", correct: true },
      { id: "b", text: "Only the username", correct: false },
      { id: "c", text: "Running processes", correct: false },
      { id: "d", text: "Disk quotas", correct: false },
    ],
  },
  "sudoers concepts": {
    q: "How should /etc/sudoers be edited?",
    opts: [
      { id: "a", text: "With visudo, which validates syntax", correct: true },
      { id: "b", text: "With any plain append", correct: false },
      { id: "c", text: "It never needs editing", correct: false },
      { id: "d", text: "By deleting it first", correct: false },
    ],
  },
  "User checks in scripts": {
    q: "How should a script requiring root start?",
    opts: [
      { id: "a", text: "Check id -u equals 0 and exit otherwise", correct: true },
      { id: "b", text: "Assume root always", correct: false },
      { id: "c", text: "Ask for root mid-run", correct: false },
      { id: "d", text: "Skip the check", correct: false },
    ],
  },
  "ps snapshots": {
    q: "What does ps show?",
    opts: [
      { id: "a", text: "A point-in-time snapshot of processes", correct: true },
      { id: "b", text: "Live updating stats", correct: false },
      { id: "c", text: "Only your shell", correct: false },
      { id: "d", text: "Future processes", correct: false },
    ],
  },
  "pgrep patterns": {
    q: "Why prefer pgrep -f over ps | grep?",
    opts: [
      { id: "a", text: "It avoids matching the grep process itself", correct: true },
      { id: "b", text: "It is older", correct: false },
      { id: "c", text: "It only uses less typing", correct: false },
      { id: "d", text: "There is no reason", correct: false },
    ],
  },
  "kill signals": {
    q: "What should you try before kill -9?",
    opts: [
      { id: "a", text: "Plain kill (SIGTERM) and a short wait", correct: true },
      { id: "b", text: "Reboot immediately", correct: false },
      { id: "c", text: "kill -9 twice", correct: false },
      { id: "d", text: "Delete the binary", correct: false },
    ],
  },
  "Background PIDs $!": {
    q: "What does $! hold after cmd &?",
    opts: [
      { id: "a", text: "The background job's PID", correct: true },
      { id: "b", text: "The exit status", correct: false },
      { id: "c", text: "The job's output", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "wait semantics": {
    q: "What does wait $pid do?",
    opts: [
      { id: "a", text: "Pauses until that job finishes, giving its status", correct: true },
      { id: "b", text: "Starts the job", correct: false },
      { id: "c", text: "Kills the job", correct: false },
      { id: "d", text: "Lists jobs", correct: false },
    ],
  },
  "kill %job": {
    q: "What does kill %1 target?",
    opts: [
      { id: "a", text: "Job number 1 in the current shell", correct: true },
      { id: "b", text: "PID 1", correct: false },
      { id: "c", text: "1% of processes", correct: false },
      { id: "d", text: "The first user", correct: false },
    ],
  },
  "Five time fields": {
    q: "In 0 2 * * *, what is the 2?",
    opts: [
      { id: "a", text: "The hour (2 AM)", correct: true },
      { id: "b", text: "The day of the month", correct: false },
      { id: "c", text: "February", correct: false },
      { id: "d", text: "Two minutes", correct: false },
    ],
  },
  "Crontab editing": {
    q: "How do you safely edit your crontab?",
    opts: [
      { id: "a", text: "crontab -e, after crontab -l to review", correct: true },
      { id: "b", text: "Edit /etc/passwd", correct: false },
      { id: "c", text: "Run crontab -r first", correct: false },
      { id: "d", text: "Kill the cron daemon", correct: false },
    ],
  },
  "Cron logging": {
    q: "Why redirect cron output to a log file?",
    opts: [
      { id: "a", text: "Otherwise failures vanish silently", correct: true },
      { id: "b", text: "It speeds up cron", correct: false },
      { id: "c", text: "Logs are mandatory syntax", correct: false },
      { id: "d", text: "To hide output", correct: false },
    ],
  },
  "curl flags -fsSL": {
    q: "What does curl -fsSL add over bare curl?",
    opts: [
      { id: "a", text: "Fail on HTTP errors, silence progress, follow redirects", correct: true },
      { id: "b", text: "Faster downloads only", correct: false },
      { id: "c", text: "FTP support", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Saving with -o": {
    q: "What does curl -o out.html URL do?",
    opts: [
      { id: "a", text: "Saves the response body to out.html", correct: true },
      { id: "b", text: "Prints headers only", correct: false },
      { id: "c", text: "Uploads out.html", correct: false },
      { id: "d", text: "Deletes the URL", correct: false },
    ],
  },
  "Retries and timeouts": {
    q: "Why set --max-time on scripted curl?",
    opts: [
      { id: "a", text: "To bound hangs so automation never wedges", correct: true },
      { id: "b", text: "To speed up servers", correct: false },
      { id: "c", text: "It is decorative", correct: false },
      { id: "d", text: "To retry forever", correct: false },
    ],
  },
  "JSON endpoints": {
    q: "What does POST to an API typically do?",
    opts: [
      { id: "a", text: "Creates a resource from the sent body", correct: true },
      { id: "b", text: "Deletes the server", correct: false },
      { id: "c", text: "Returns the API docs", correct: false },
      { id: "d", text: "Closes the connection only", correct: false },
    ],
  },
  "Parsing with grep/awk": {
    q: "When is grep-parsing JSON acceptable?",
    opts: [
      { id: "a", text: "Flat predictable payloads without jq available", correct: true },
      { id: "b", text: "Always, even for nested JSON", correct: false },
      { id: "c", text: "Never parse responses", correct: false },
      { id: "d", text: "Only for XML", correct: false },
    ],
  },
  "API error handling": {
    q: "What should you check before parsing an API body?",
    opts: [
      { id: "a", text: "The HTTP status is 2xx", correct: true },
      { id: "b", text: "The body length is odd", correct: false },
      { id: "c", text: "The time of day", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Branch workflows": {
    q: "What is the branch lifecycle?",
    opts: [
      { id: "a", text: "Create per task, merge when done, delete after", correct: true },
      { id: "b", text: "One branch forever", correct: false },
      { id: "c", text: "Branch per keystroke", correct: false },
      { id: "d", text: "Never merge", correct: false },
    ],
  },
  "git switch": {
    q: "What does git switch -c feat do?",
    opts: [
      { id: "a", text: "Creates branch feat and switches to it", correct: true },
      { id: "b", text: "Deletes feat", correct: false },
      { id: "c", text: "Merges feat", correct: false },
      { id: "d", text: "Renames main", correct: false },
    ],
  },
  "Merge strategies": {
    q: "What does --no-ff do?",
    opts: [
      { id: "a", text: "Forces a merge commit preserving branch shape", correct: true },
      { id: "b", text: "Deletes history", correct: false },
      { id: "c", text: "Always fast-forwards", correct: false },
      { id: "d", text: "Aborts merges", correct: false },
    ],
  },
  "Stash stack": {
    q: "How do you list stashes?",
    opts: [
      { id: "a", text: "git stash list", correct: true },
      { id: "b", text: "git stash show-all --print", correct: false },
      { id: "c", text: "git list", correct: false },
      { id: "d", text: "ls .stash", correct: false },
    ],
  },
  "stash pop vs apply": {
    q: "How does pop differ from apply?",
    opts: [
      { id: "a", text: "pop drops the entry after restoring; apply keeps it", correct: true },
      { id: "b", text: "There is no difference", correct: false },
      { id: "c", text: "pop deletes the repo", correct: false },
      { id: "d", text: "apply commits", correct: false },
    ],
  },
  "Stash messages": {
    q: "Why use git stash push -m msg?",
    opts: [
      { id: "a", text: "Labels the entry so it can be identified later", correct: true },
      { id: "b", text: "It commits the stash", correct: false },
      { id: "c", text: "It pushes to origin", correct: false },
      { id: "d", text: "It is always required", correct: false },
    ],
  },
  "rebase vs merge": {
    q: "When should you rebase instead of merge?",
    opts: [
      { id: "a", text: "For private branches not yet shared", correct: true },
      { id: "b", text: "For branches others already pulled", correct: false },
      { id: "c", text: "Always rewrite public history", correct: false },
      { id: "d", text: "When you want a merge commit", correct: false },
    ],
  },
  "Interactive rebase notes": {
    q: "What is rebase -i for?",
    opts: [
      { id: "a", text: "Reordering, squashing, and rewording commits via an editor", correct: true },
      { id: "b", text: "Merging remotes", correct: false },
      { id: "c", text: "Deleting the repo", correct: false },
      { id: "d", text: "Viewing logs", correct: false },
    ],
  },
  "Conflict flow": {
    q: "After resolving conflict markers, what continues a rebase?",
    opts: [
      { id: "a", text: "git add the files, then git rebase --continue", correct: true },
      { id: "b", text: "git push --force immediately", correct: false },
      { id: "c", text: "Restart the machine", correct: false },
      { id: "d", text: "git stash", correct: false },
    ],
  },
  "pre-commit hooks": {
    q: "When does pre-commit run?",
    opts: [
      { id: "a", text: "On every commit attempt, before history records it", correct: true },
      { id: "b", text: "After push", correct: false },
      { id: "c", text: "At clone time", correct: false },
      { id: "d", text: "Weekly", correct: false },
    ],
  },
  "Hook executables": {
    q: "Why must hooks be executable with exact names?",
    opts: [
      { id: "a", text: "Git runs the exact filename; non-executable hooks are silently skipped", correct: true },
      { id: "b", text: "For decoration", correct: false },
      { id: "c", text: "Names do not matter", correct: false },
      { id: "d", text: "Extensions are required", correct: false },
    ],
  },
  "Sample hooks": {
    q: "What are the .sample files in .git/hooks/?",
    opts: [
      { id: "a", text: "Documented templates to rename and activate", correct: true },
      { id: "b", text: "Backups of your code", correct: false },
      { id: "c", text: "Commit history", correct: false },
      { id: "d", text: "Remote refs", correct: false },
    ],
  },
  "Backup design": {
    q: "What questions does backup design answer?",
    opts: [
      { id: "a", text: "What, where, and how often (plus retention)", correct: true },
      { id: "b", text: "Color, font, logo", correct: false },
      { id: "c", text: "Who, why, whatever", correct: false },
      { id: "d", text: "None of them", correct: false },
    ],
  },
  "Timestamped archives": {
    q: "Why stamp backup filenames with dates?",
    opts: [
      { id: "a", text: "So generations never collide and pruning is trivial", correct: true },
      { id: "b", text: "For decoration", correct: false },
      { id: "c", text: "To slow restores", correct: false },
      { id: "d", text: "Timestamps break tar", correct: false },
    ],
  },
  "Restore checks": {
    q: "When is a backup trustworthy?",
    opts: [
      { id: "a", text: "After its restore has been tested", correct: true },
      { id: "b", text: "Immediately after creation", correct: false },
      { id: "c", text: "When it is large", correct: false },
      { id: "d", text: "Never", correct: false },
    ],
  },
  "fetch vs pull": {
    q: "How does fetch differ from pull?",
    opts: [
      { id: "a", text: "fetch downloads without touching your work; pull also merges", correct: true },
      { id: "b", text: "There is no difference", correct: false },
      { id: "c", text: "fetch uploads", correct: false },
      { id: "d", text: "pull only lists", correct: false },
    ],
  },
  "Upstream tracking -u": {
    q: "What does git push -u origin main do once?",
    opts: [
      { id: "a", text: "Links the branch so future push/pull need no args", correct: true },
      { id: "b", text: "Deletes the remote", correct: false },
      { id: "c", text: "Uploads once and unlinks", correct: false },
      { id: "d", text: "Creates a fork", correct: false },
    ],
  },
  "Remote URLs": {
    q: "Which remote URL form uses key auth?",
    opts: [
      { id: "a", text: "SSH form git@host:path", correct: true },
      { id: "b", text: "https:// with a token in history", correct: false },
      { id: "c", text: "file:///tmp", correct: false },
      { id: "d", text: "ftp://anonymous", correct: false },
    ],
  },
  "GitHub flow": {
    q: "What is the GitHub flow sequence?",
    opts: [
      { id: "a", text: "Branch, push, pull request, review, merge, delete branch", correct: true },
      { id: "b", text: "Push straight to main always", correct: false },
      { id: "c", text: "Email patches only", correct: false },
      { id: "d", text: "Fork once a year", correct: false },
    ],
  },
  "Feature branches": {
    q: "How should feature branches be sized?",
    opts: [
      { id: "a", text: "Small, one change, merged via review", correct: true },
      { id: "b", text: "Huge, months of work", correct: false },
      { id: "c", text: "One per developer forever", correct: false },
      { id: "d", text: "Never delete them", correct: false },
    ],
  },
  "Release branches": {
    q: "What are release branches for?",
    opts: [
      { id: "a", text: "Freezing a version for stabilization while main moves on", correct: true },
      { id: "b", text: "Storing release binaries in git", correct: false },
      { id: "c", text: "Deleting old code", correct: false },
      { id: "d", text: "Hiding features", correct: false },
    ],
  },
  "Organizing dotfiles": {
    q: "Where should shell config live?",
    opts: [
      { id: "a", text: "A version-controlled dotfiles repo with documented install", correct: true },
      { id: "b", text: "Only in memory", correct: false },
      { id: "c", text: "Scattered edits everywhere", correct: false },
      { id: "d", text: "In /tmp", correct: false },
    ],
  },
  "Symlink farms": {
    q: "What does symlinking ~/.bashrc into a repo achieve?",
    opts: [
      { id: "a", text: "Live config and repo stay the same versioned file", correct: true },
      { id: "b", text: "Faster shells", correct: false },
      { id: "c", text: "Encrypted config", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Bare-repo method notes": {
    q: "What is the bare-repo dotfiles method?",
    opts: [
      { id: "a", text: "A bare repo with --git-dir in $HOME, no symlinks needed", correct: true },
      { id: "b", text: "Deleting .git", correct: false },
      { id: "c", text: "A second home directory", correct: false },
      { id: "d", text: "Zipping dotfiles", correct: false },
    ],
  },
  "PATH management": {
    q: "Where should personal bin dirs go in PATH?",
    opts: [
      { id: "a", text: "Prepended, so your tools win predictably", correct: true },
      { id: "b", text: "Appended after /tmp", correct: false },
      { id: "c", text: "PATH order is irrelevant", correct: false },
      { id: "d", text: "Replace PATH entirely", correct: false },
    ],
  },
  "Per-project env files": {
    q: "What belongs in .env.example?",
    opts: [
      { id: "a", text: "Placeholder keys without real secrets", correct: true },
      { id: "b", text: "Production secrets", correct: false },
      { id: "c", text: "Binary data", correct: false },
      { id: "d", text: "Nothing at all", correct: false },
    ],
  },
  "direnv notes": {
    q: "What does direnv require before an .envrc loads?",
    opts: [
      { id: "a", text: "Explicit direnv allow", correct: true },
      { id: "b", text: "Root access", correct: false },
      { id: "c", text: "A reboot", correct: false },
      { id: "d", text: "Network access", correct: false },
    ],
  },
  "set -x tracing": {
    q: "Where does set -x output go?",
    opts: [
      { id: "a", text: "stderr, leaving stdout clean", correct: true },
      { id: "b", text: "Mixed into stdout", correct: false },
      { id: "c", text: "syslog", correct: false },
      { id: "d", text: "Nowhere", correct: false },
    ],
  },
  "PS4 customization": {
    q: "What does PS4 control?",
    opts: [
      { id: "a", text: "The prefix of every trace line", correct: true },
      { id: "b", text: "The shell prompt only", correct: false },
      { id: "c", text: "Script arguments", correct: false },
      { id: "d", text: "Exit codes", correct: false },
    ],
  },
  "shellcheck notes": {
    q: "What is ShellCheck?",
    opts: [
      { id: "a", text: "A static analyzer for shell scripts", correct: true },
      { id: "b", text: "A runtime debugger", correct: false },
      { id: "c", text: "A package manager", correct: false },
      { id: "d", text: "A shell replacement", correct: false },
    ],
  },
  "Log levels": {
    q: "Why prefix logs with [INFO]?",
    opts: [
      { id: "a", text: "So grep can filter by level", correct: true },
      { id: "b", text: "For decoration", correct: false },
      { id: "c", text: "It is required syntax", correct: false },
      { id: "d", text: "To slow logging", correct: false },
    ],
  },
  "Tee patterns": {
    q: "What does cmd | tee run.log do?",
    opts: [
      { id: "a", text: "Shows output live and saves it to run.log", correct: true },
      { id: "b", text: "Deletes run.log", correct: false },
      { id: "c", text: "Runs cmd twice", correct: false },
      { id: "d", text: "Hides output", correct: false },
    ],
  },
  "logger command notes": {
    q: "What is logger for?",
    opts: [
      { id: "a", text: "Sending lines to syslog with a tag", correct: true },
      { id: "b", text: "Creating log files", correct: false },
      { id: "c", text: "Deleting logs", correct: false },
      { id: "d", text: "Printing man pages", correct: false },
    ],
  },
  "getopts loop": {
    q: "What does while getopts 'n:' opt parse?",
    opts: [
      { id: "a", text: "Short flags, with -n taking an argument", correct: true },
      { id: "b", text: "Long flags only", correct: false },
      { id: "c", text: "Filenames", correct: false },
      { id: "d", text: "Environment variables", correct: false },
    ],
  },
  "OPTARG handling": {
    q: "Where does -n's value arrive?",
    opts: [
      { id: "a", text: "In $OPTARG during that iteration", correct: true },
      { id: "b", text: "In $OPTIND", correct: false },
      { id: "c", text: "In $0", correct: false },
      { id: "d", text: "Nowhere", correct: false },
    ],
  },
  "Usage functions": {
    q: "When should usage() be called?",
    opts: [
      { id: "a", text: "For -h, unknown flags, or missing required args", correct: true },
      { id: "b", text: "After every success", correct: false },
      { id: "c", text: "Never in scripts", correct: false },
      { id: "d", text: "Only on Fridays", correct: false },
    ],
  },
  "Sourcing configs": {
    q: "What does . ./config.sh do?",
    opts: [
      { id: "a", text: "Runs key=value assignments in the current shell", correct: true },
      { id: "b", text: "Prints the file", correct: false },
      { id: "c", text: "Starts a subshell", correct: false },
      { id: "d", text: "Deletes the file", correct: false },
    ],
  },
  "INI parsing with awk": {
    q: "What does awk -F= '$1==\"k\" {print $2}' do?",
    opts: [
      { id: "a", text: "Prints the value of key k from key=value lines", correct: true },
      { id: "b", text: "Prints all keys", correct: false },
      { id: "c", text: "Sorts the file", correct: false },
      { id: "d", text: "Counts equals signs", correct: false },
    ],
  },
  "Defaults + overrides": {
    q: "What is the standard config precedence?",
    opts: [
      { id: "a", text: "Defaults, then file, then env, then flags", correct: true },
      { id: "b", text: "Flags are weakest", correct: false },
      { id: "c", text: "Random order", correct: false },
      { id: "d", text: "File always beats flags", correct: false },
    ],
  },
  "xargs -P": {
    q: "What does xargs -P4 do?",
    opts: [
      { id: "a", text: "Runs up to four workers in parallel", correct: true },
      { id: "b", text: "Prints output four times", correct: false },
      { id: "c", text: "Uses port 4", correct: false },
      { id: "d", text: "Pauses 4 seconds", correct: false },
    ],
  },
  "wait fan-out": {
    q: "What does launching N jobs with & then wait achieve?",
    opts: [
      { id: "a", text: "Parallel fan-out with a single rejoin point", correct: true },
      { id: "b", text: "Sequential execution", correct: false },
      { id: "c", text: "Job deletion", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Job slots": {
    q: "Why cap parallel jobs?",
    opts: [
      { id: "a", text: "Unbounded jobs swamp memory and file descriptors", correct: true },
      { id: "b", text: "Slots speed up CPUs", correct: false },
      { id: "c", text: "Required by syntax", correct: false },
      { id: "d", text: "There is no reason", correct: false },
    ],
  },
  "Assert functions": {
    q: "What does assert_eq print on mismatch?",
    opts: [
      { id: "a", text: "A FAIL line naming the check", correct: true },
      { id: "b", text: "Nothing", correct: false },
      { id: "c", text: "A stack trace", correct: false },
      { id: "d", text: "The whole file", correct: false },
    ],
  },
  "Test runners (bats) notes": {
    q: "What is bats?",
    opts: [
      { id: "a", text: "A test runner with @test blocks and setup/teardown", correct: true },
      { id: "b", text: "A linter", correct: false },
      { id: "c", text: "A shell fork", correct: false },
      { id: "d", text: "A CI server", correct: false },
    ],
  },
  "Exit-code checks": {
    q: "How does CI read test results?",
    opts: [
      { id: "a", text: "Only the exit code: 0 green, nonzero red", correct: true },
      { id: "b", text: "Screenshots", correct: false },
      { id: "c", text: "Log colors", correct: false },
      { id: "d", text: "Email", correct: false },
    ],
  },
  "Quoting untrusted input": {
    q: "Why quote \"$user\"?",
    opts: [
      { id: "a", text: "So metacharacters print literally instead of executing", correct: true },
      { id: "b", text: "For speed", correct: false },
      { id: "c", text: "It encrypts the value", correct: false },
      { id: "d", text: "Quotes do nothing", correct: false },
    ],
  },
  "eval dangers": {
    q: "What is the risk of eval \"echo $user\"?",
    opts: [
      { id: "a", text: "Embedded commands in $user execute", correct: true },
      { id: "b", text: "It prints slowly", correct: false },
      { id: "c", text: "It lowercases output", correct: false },
      { id: "d", text: "There is no risk", correct: false },
    ],
  },
  "Injection demo (safe)": {
    q: "How should injection be demonstrated?",
    opts: [
      { id: "a", text: "With echo-only payloads, never destructive ones", correct: true },
      { id: "b", text: "With rm -rf payloads", correct: false },
      { id: "c", text: "On production", correct: false },
      { id: "d", text: "Without explanation", correct: false },
    ],
  },
  "=~ operator": {
    q: "What must be true of the pattern in [[ $s =~ pat ]]?",
    opts: [
      { id: "a", text: "Unquoted for regex; quoted means literal", correct: true },
      { id: "b", text: "Always quoted", correct: false },
      { id: "c", text: "Always in single quotes", correct: false },
      { id: "d", text: "Stored on disk", correct: false },
    ],
  },
  "BASH_REMATCH": {
    q: "After [[ v1.2.3 =~ v([0-9]+) ]], what is BASH_REMATCH[1]?",
    opts: [
      { id: "a", text: "1", correct: true },
      { id: "b", text: "v1", correct: false },
      { id: "c", text: "v1.2.3", correct: false },
      { id: "d", text: "Empty", correct: false },
    ],
  },
  "Validation patterns": {
    q: "What anchors a full-string validation regex?",
    opts: [
      { id: "a", text: "^ at the start and $ at the end", correct: true },
      { id: "b", text: "Quotes around it", correct: false },
      { id: "c", text: "Parentheses", correct: false },
      { id: "d", text: "Nothing is needed", correct: false },
    ],
  },
  "date formatting": {
    q: "What does date +%F print?",
    opts: [
      { id: "a", text: "The date as YYYY-MM-DD", correct: true },
      { id: "b", text: "The filename", correct: false },
      { id: "c", text: "The epoch", correct: false },
      { id: "d", text: "The timezone name", correct: false },
    ],
  },
  "Epoch math": {
    q: "Why compute with date +%s values?",
    opts: [
      { id: "a", text: "Durations become trivial integer subtraction", correct: true },
      { id: "b", text: "Epochs print prettier", correct: false },
      { id: "c", text: "It is required by law", correct: false },
      { id: "d", text: "They never change", correct: false },
    ],
  },
  "date -d portability notes": {
    q: "What is the portability issue with date -d?",
    opts: [
      { id: "a", text: "BSD/macOS date uses -v/-j instead of GNU -d", correct: true },
      { id: "b", text: "GNU date lacks -d", correct: false },
      { id: "c", text: "Epochs differ per OS", correct: false },
      { id: "d", text: "No issue exists", correct: false },
    ],
  },
  "sort -n/-r/-u": {
    q: "What does sort -n fix versus default sort?",
    opts: [
      { id: "a", text: "Orders 10 after 9 instead of after 1", correct: true },
      { id: "b", text: "Sorts faster", correct: false },
      { id: "c", text: "Ignores case", correct: false },
      { id: "d", text: "Sorts randomly", correct: false },
    ],
  },
  "join two files": {
    q: "What must be true before join runs?",
    opts: [
      { id: "a", text: "Both files sorted on the key field", correct: true },
      { id: "b", text: "Files must be empty", correct: false },
      { id: "c", text: "Keys must be secret", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "cut ranges": {
    q: "What does cut -d: -f2- print?",
    opts: [
      { id: "a", text: "Field 2 through the end of each line", correct: true },
      { id: "b", text: "Only field 2", correct: false },
      { id: "c", text: "Only the delimiter", correct: false },
      { id: "d", text: "Line numbers", correct: false },
    ],
  },
  "df/du reading": {
    q: "Which answers 'which directory filled the disk'?",
    opts: [
      { id: "a", text: "du -sh drilling into candidate trees", correct: true },
      { id: "b", text: "df alone", correct: false },
      { id: "c", text: "free", correct: false },
      { id: "d", text: "uname", correct: false },
    ],
  },
  "Load averages": {
    q: "How should load 8.0 on 4 CPUs be read?",
    opts: [
      { id: "a", text: "Overloaded: twice the runnable capacity", correct: true },
      { id: "b", text: "Idle", correct: false },
      { id: "c", text: "Normal, always", correct: false },
      { id: "d", text: "Crashed", correct: false },
    ],
  },
  "Log triage notes": {
    q: "What is the triage order?",
    opts: [
      { id: "a", text: "System load, disk, memory, then app logs", correct: true },
      { id: "b", text: "App logs first, always", correct: false },
      { id: "c", text: "Reboot first", correct: false },
      { id: "d", text: "Random order", correct: false },
    ],
  },
  "apt/dnf script guards": {
    q: "What does command -v curl || sudo apt-get install -y curl do?",
    opts: [
      { id: "a", text: "Installs curl only when missing", correct: true },
      { id: "b", text: "Always reinstalls", correct: false },
      { id: "c", text: "Removes curl", correct: false },
      { id: "d", text: "Updates everything", correct: false },
    ],
  },
  "Idempotent installs": {
    q: "What makes setup idempotent?",
    opts: [
      { id: "a", text: "Check-before-install so reruns converge", correct: true },
      { id: "b", text: "Running once only", correct: false },
      { id: "c", text: "Skipping checks", correct: false },
      { id: "d", text: "Rebooting after", correct: false },
    ],
  },
  "Checksums notes": {
    q: "What does a mismatched sha256 mean?",
    opts: [
      { id: "a", text: "Stop: the download is corrupt or tampered", correct: true },
      { id: "b", text: "Proceed anyway", correct: false },
      { id: "c", text: "Retry over plain http", correct: false },
      { id: "d", text: "Ignore hashes", correct: false },
    ],
  },
  "Key pairs": {
    q: "Where does the SSH private key live?",
    opts: [
      { id: "a", text: "Only on your machine, never shared", correct: true },
      { id: "b", text: "On every server", correct: false },
      { id: "c", text: "In the repo", correct: false },
      { id: "d", text: "In email", correct: false },
    ],
  },
  "ssh config": {
    q: "What does ~/.ssh/config provide?",
    opts: [
      { id: "a", text: "Short host names with user, key, and port", correct: true },
      { id: "b", text: "Faster encryption", correct: false },
      { id: "c", text: "New keys", correct: false },
      { id: "d", text: "Firewall rules", correct: false },
    ],
  },
  "scp/rsync notes": {
    q: "When is rsync preferred over scp?",
    opts: [
      { id: "a", text: "Trees, repeats, resume, and incremental sync", correct: true },
      { id: "b", text: "Single small files", correct: false },
      { id: "c", text: "Never", correct: false },
      { id: "d", text: "Without SSH", correct: false },
    ],
  },
  "systemctl units": {
    q: "What does systemctl enable app do?",
    opts: [
      { id: "a", text: "Starts app on boot (persists), beyond one start", correct: true },
      { id: "b", text: "Starts app once right now", correct: false },
      { id: "c", text: "Installs the app", correct: false },
      { id: "d", text: "Deletes the unit", correct: false },
    ],
  },
  "Service files": {
    q: "What does After=network.target declare?",
    opts: [
      { id: "a", text: "The service starts only after networking is up", correct: true },
      { id: "b", text: "It downloads the network", correct: false },
      { id: "c", text: "It restarts networking", correct: false },
      { id: "d", text: "Nothing", correct: false },
    ],
  },
  "Logs with journalctl": {
    q: "How do you read a service's recent logs?",
    opts: [
      { id: "a", text: "journalctl -u app --since '1 hour ago'", correct: true },
      { id: "b", text: "cat the binary", correct: false },
      { id: "c", text: "ps aux", correct: false },
      { id: "d", text: "Reboot and watch", correct: false },
    ],
  },
  "Project scaffolding": {
    q: "What does a scaffolding script produce?",
    opts: [
      { id: "a", text: "A consistent runnable project skeleton", correct: true },
      { id: "b", text: "Documentation only", correct: false },
      { id: "c", text: "A deployed app", correct: false },
      { id: "d", text: "Random files", correct: false },
    ],
  },
  "Checklist scripts": {
    q: "Why store checklist steps in an array?",
    opts: [
      { id: "a", text: "The list stays data-driven and uniform", correct: true },
      { id: "b", text: "Arrays run faster", correct: false },
      { id: "c", text: "Required syntax", correct: false },
      { id: "d", text: "To hide steps", correct: false },
    ],
  },
  "Idempotency": {
    q: "What makes a planner script resumable?",
    opts: [
      { id: "a", text: "Every step safe-to-repeat with state checks", correct: true },
      { id: "b", text: "Deleting state first", correct: false },
      { id: "c", text: "Skipping verification", correct: false },
      { id: "d", text: "Running as root", correct: false },
    ],
  },
  "Deploy pipeline": {
    q: "What gates each deploy stage?",
    opts: [
      { id: "a", text: "The previous stage's success check", correct: true },
      { id: "b", text: "The time of day", correct: false },
      { id: "c", text: "Nothing", correct: false },
      { id: "d", text: "A coin flip", correct: false },
    ],
  },
  "Health checks": {
    q: "What proves a deploy worked?",
    opts: [
      { id: "a", text: "Process alive, port open, endpoint returning 200", correct: true },
      { id: "b", text: "The script exited", correct: false },
      { id: "c", text: "Logs exist", correct: false },
      { id: "d", text: "Hope", correct: false },
    ],
  },
  "Rollback plan": {
    q: "What must exist before shipping forward?",
    opts: [
      { id: "a", text: "A tested reverse: prior artifact plus switch-back", correct: true },
      { id: "b", text: "A press release", correct: false },
      { id: "c", text: "More features", correct: false },
      { id: "d", text: "Nothing", correct: false },
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
 * flow are gated. Days touching the filesystem or home directory (5, 21,
 * 23, 24, 26–28, 35, 65–69, 76–80, 83), the environment or runtime user
 * (30, 36, 70, 84), privileges or root (37, 38, 96), the network or
 * credentials (22, 25, 74, 75, 81, 82, 97), system services or daemons
 * (20, 73, 98), timing or job control (19, 72, 89), host-specific output
 * (36, 71, 95), interactive stdin (32, 78), or a real deploy (40, 100)
 * stay ungated. */
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
  41: "strict mode on",
  42: "shebang works",
  43: "Hello, World",
  44: "report.txt",
  45: "20 30 40",
  46: "HELLO-WORLD",
  47: "five wins",
  48: "regex match",
  49: "chain ok",
  50: "c-loop 1",
  51: "lines 3",
  52: "sum 42",
  53: "shadowed",
  54: "cleanup ran",
  55: "trap installed and reset",
  56: "err-line",
  57: "streams equal",
  58: "ada-42",
  59: "three",
  60: "disk full",
  61: "three",
  62: "FOO FOO",
  63: "60",
  64: "ada",
  85: "answer 42",
  86: "service stopped",
  87: "Hello, World",
  88: "example:8080",
  90: "pass: math works",
  91: "quoted safe",
  92: "valid email",
  93: "1970-01-01",
  94: "apple",
  99: "step: gather",
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