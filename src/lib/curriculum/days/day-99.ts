import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Capstone Prep: ASM Project",
    subtitle: "Planning and scaffolding your final ASM project",
    tags: ["capstone"],
    theory: {
      sections: [
        {
          heading: "Choosing the Project",
          content:
            "A good capstone is one honest deliverable, not three half ones. Pick a project whose core is unambiguously assembly: a tiny bootloader that prints and loads a sector, a disassembler for a narrow x86-64 subset, a RISC-emulator in NASM, or a hand-written graphics or compression routine. The decision rule is that assembly must be the natural language of the problem — if C would express it more clearly, the project is wrong. Scope to something you can finish: a working core beats an ambitious demo with a broken edge case.",
        },
        {
          heading: "Architecture and Structure",
          content:
            "Structure the project like real systems code: separate entry point from library routines, keep .data and .text sections cleanly separated, and expose a handful of labels as an internal API. Define your data layout on paper first — the buffer sizes, the ABI your routines use, and how errors are reported (a status code in rax is the bare minimum). A Makefile builds each module to an object file and links them, so the project composes like a C project while staying pure assembly.",
          codeExample: `; A capstone layout that scales:
; src/entry.asm    - _start, argument parsing
; src/lib.asm      - reusable routines (print, hexdump)
; src/core.asm     - the project's algorithm
; Makefile         - asm -> .o -> final binary
;
; Internal calling convention (choose one, document it):
;   rdi = first argument, rsi = second
;   rax = return value,   rbx = error code (0 = ok)
;   All other registers are clobbered unless documented.`,
        },
        {
          heading: "Toolchain Setup",
          content:
            "The standard capstone toolchain is NASM plus ld, with gdb for debugging and objdump for verification. `nasm -f elf64 -g src/core.asm -o build/core.o` produces a debug-enabled object; `ld -o build/proj build/*.o` links it. Add `-e _start` to ld only if your entry symbol differs from the default. A debugger frontend like gdb lets you single-step through your own assembly line by line — that is the loop that separates a finished project from a rework spiral. Verify each module in isolation with a test harness before wiring it together.",
          codeExample: `# Minimal Makefile skeleton for the capstone.
#   make        -> build/proj
#   make debug  -> build/proj_dbg (debug symbols)
#   make run    -> run the program
#   make clean  -> remove build artifacts

# nasm -f elf64 -g $< -o $@        # assemble one file
# ld -o build/proj build/*.o       # link the modules
# objdump -d build/proj | less     # verify the output`,
        },
      ],
    },
    playground: {
      defaultCode: `; Capstone planning skeleton.
; Decide, then write down:
;   1. One sentence: what does it do?
;   2. The input/output format (bytes in, bytes out).
;   3. The internal calling convention.
;   4. The module list (entry, lib, core).
;   5. The test cases that prove it works.
;
; Scaffold the build first:
;   src/entry.asm   src/lib.asm   src/core.asm
;   Makefile        README.md     tests/
;
; Then write the smallest vertical slice that runs.`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d99-q1", type: "quiz", title: "Project Fit",
        description: "Choosing a capstone",
        question: "Which criterion indicates an assembly capstone project is well-chosen?",
        options: [
          { id: "a", text: "Assembly is the natural language of the core problem", correct: true },
          { id: "b", text: "It can be written more clearly in Python", correct: false },
          { id: "c", text: "It depends entirely on a large third-party library", correct: false },
          { id: "d", text: "The main deliverable is a slide deck", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d99-q2", type: "quiz", title: "Build Flow",
        description: "The capstone build pipeline",
        question: "What is the correct build flow for a multi-module NASM capstone?",
        options: [
          { id: "a", text: "Assemble each source to an object, then link the objects", correct: true },
          { id: "b", text: "Link the sources, then assemble the linked binary", correct: false },
          { id: "c", text: "Compile with gcc using the C driver", correct: false },
          { id: "d", text: "Run the assembler directly on the final binary", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d99-c1", type: "code", title: "Makefile Scaffold",
        description: "Write a Makefile that assembles two NASM modules into a single linked binary named capstone.",
        starterCode: `# TODO: complete the Makefile rules.
# Variables: AS = nasm, ASFLAGS = -f elf64 -g, LD = ld
#
# build/capstone: build/entry.o build/lib.o
# \t$(LD) -o $@ $^
#
# build/%.o: src/%.asm
# \t$(AS) $(ASFLAGS) -o $@ $<
#
# clean: remove build/
`,
        hints: ["Use $@ for the target and $< for the prerequisite", "Pattern rule build/%.o handles both modules", "Link all objects in one ld invocation", "A clean target that rm -rfs build/ finishes the file"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d99-a1", title: "Capstone Plan and Scaffold",
      description: "Produce a written plan for your capstone (one sentence goal, data format, calling convention, module list, test cases) and scaffold the project: a Makefile that builds a working 'hello world' binary from two assembly modules with debug symbols.",
      requirements: [
        "Write a plan covering goal, I/O format, and calling convention",
        "Create src/entry.asm and src/lib.asm that compile",
        "entry calls a print routine in lib and exits 0",
        "Makefile builds build/capstone with -g debug symbols",
        "Add a clean target and a run target",
      ],
      starterCode: `# Makefile for the capstone scaffold
AS      = nasm
ASFLAGS = -f elf64 -g
LD      = ld
SRCS    = entry.asm lib.asm

build/capstone: build/entry.o build/lib.o
	$(LD) -o $@ $^

build/%.o: src/%.asm
	$(AS) $(ASFLAGS) -o $@ $<

# TODO: add run: and clean: targets`,
      rubric: [
        { criterion: "Complete written project plan", points: 30 },
        { criterion: "Two modules assemble and link cleanly", points: 25 },
        { criterion: "Debug symbols enabled via -g", points: 15 },
        { criterion: "run and clean targets present", points: 15 },
        { criterion: "Entry prints via lib routine and exits 0", points: 15 },
      ],
      xpReward: 100,
    },
};

export default lesson;
