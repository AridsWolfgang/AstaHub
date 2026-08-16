import type { Lesson } from "../../types";

const lesson: Partial<Lesson> = {
    title: "Performance Tuning & Profiling",
    subtitle: "perf, oprofile, and micro-architecture optimization",
    tags: ["optimization"],
    theory: {
      sections: [
        {
          heading: "perf and Hardware Counters",
          content:
            "perf is the Linux performance toolkit that reads the CPU's hardware counters through perf_event_open. `perf stat ./prog` summarizes cycles, instructions retired, cache misses, and branch mispredictions for the whole run; `perf record` then samples the program counter on a timer (typically 1000Hz) and `perf report` turns the histogram into a symbol-level hot-spot view. Two derived metrics matter most: IPC (instructions per cycle) tells you how full the pipeline is, and the ratio of stall cycles to instructions tells you what is starving the CPU — usually memory latency or branch mispredicts.",
          codeExample: `# Profile a binary by sampling on a timer.
perf record -F 999 ./my_program
perf report

# One-shot counters for a single run.
perf stat -e cycles,instructions,cache-misses,branch-misses ./my_program

# IPC below ~1.0 on modern x86 usually means stalls.
# cycles   instructions   IPC     cache-misses
# 2.4e9    1.2e9          0.50    3.1e8   <-- memory-bound`,
        },
        {
          heading: "Cache Misses",
          content:
            "A cache miss is the single most expensive event on modern x86: a last-level-cache miss to DRAM costs hundreds of cycles, versus a few cycles for a hit. Data structures and access order matter more than clever instructions — iterating arrays row-major instead of column-major, padding structs to cache-line (64-byte) boundaries, and processing in blocks that fit in L1 all convert misses into hits. The L1 cache is 8-way or 12-way set-associative, so the low 6 address bits select the set and the tag distinguishes lines; a strided access pattern that maps to the same set thrashes the cache even with sequential-looking code.",
          codeExample: `# Measure where your memory traffic goes.
perf stat -e cache-references,cache-misses ./hot_loop
# cache-references = reads that reached the cache hierarchy
# cache-misses     = those that missed down to a lower level

# Poor locality (strided, thrashes a set) vs good locality:
#   for (i = 0; i < N; i++) sum += a[i];       -> sequential, hits
#   for (i = 0; i < N; i++) sum += a[i * 4096]; -> one line per page, misses`,
        },
        {
          heading: "Pipeline Analysis",
          content:
            "Out-of-order cores execute instructions in data-flow order, not program order, so the pipeline's bottlenecks are measured, not guessed. A branch misprediction costs 15-25 cycles of fetch and decode bubbles, which is why branchless idioms (csel, cmov, lookups instead of if-chains) win on hot paths. Dependency chains are the other killer: an add that depends on the previous add serializes execution at the latency of the ALU, so two independent accumulators can run at twice the throughput. The fix is always the same procedure: measure with perf, identify the top symbol, and rewrite that inner loop around predictable branches, cache-friendly access, and broken dependency chains.",
          codeExample: `# Classic profile-first flow.
perf record -g ./hot_loop      # -g records the call stack
perf report                    # hottest symbol = your next target

# A dependency chain to avoid (each add waits on the last):
#   for (i = 0; i < N; i++) acc += a[i];
# vs independent chains the core can overlap:
#   for (i = 0; i < N; i += 2) { s0 += a[i]; s1 += a[i+1]; }`,
        },
      ],
    },
    playground: {
      defaultCode: `# perf workflow cheat-sheet (Linux). Run as needed:
#
# perf stat    - summary counters for one run
# perf record  - sample on a timer, writes perf.data
# perf report  - hot-spot histogram from perf.data
# perf annotate - instruction-level view of one function
#
# Key metrics:
#   instructions / cycles  = IPC (pipeline fullness)
#   cache-misses / refs    = locality quality
#   branch-misses / branches = predictor accuracy
#
# Optimize in this order: measure -> identify the hot
# symbol -> rewrite the inner loop -> re-measure.`,
      language: "asm",
      runnable: true,
    },
    exercises: [
      {
        id: "d98-q1", type: "quiz", title: "IPC",
        description: "Reading IPC numbers",
        question: "An IPC well below 1.0 on a modern out-of-order x86 core most strongly indicates what?",
        options: [
          { id: "a", text: "The pipeline is stalled on misses or dependencies", correct: true },
          { id: "b", text: "The compiler emitted too many instructions", correct: false },
          { id: "c", text: "The binary was compiled without -O2", correct: false },
          { id: "d", text: "The program uses too much stack space", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d98-q2", type: "quiz", title: "Cache Misses",
        description: "Cost and cause of cache misses",
        question: "What is the primary cost driver when a memory access misses the last-level cache?",
        options: [
          { id: "a", text: "Several hundred cycles of DRAM latency", correct: true },
          { id: "b", text: "A TLB flush on every access", correct: false },
          { id: "c", text: "The pipeline's register rename table overflow", correct: false },
          { id: "d", text: "A branch misprediction penalty", correct: false },
        ],
        xpReward: 25,
      },
      {
        id: "d98-c1", type: "code", title: "Measure Your Loop",
        description: "Write the perf command sequence you would run to count cycles, instructions, and cache misses on a binary called hot_loop, then interpret the IPC.",
        starterCode: `# Write the command you would run:
# 1. one-shot counter summary for hot_loop
# 2. sampled profile with call stacks
# 3. report view
#
# TODO: fill in the three commands and a one-line reading
# of what an IPC of 0.45 with 30% cache-miss rate means.`,
        hints: ["perf stat takes -e to pick counters", "perf record needs -g for call stacks", "perf report shows the histogram", "Low IPC + high misses = memory-bound"],
        xpReward: 50,
      },
    ],
    assignment: {
      id: "d98-a1", title: "Profile-Driven Rewrite",
      description: "Write an assembly inner loop that sums an integer array twice — once with a single accumulating dependency chain and once with two independent accumulators — and use perf to show the second version sustains a higher IPC.",
      requirements: [
        "Implement the single-accumulator sum loop",
        "Implement the two-accumulator variant",
        "Process the same array so only loop structure differs",
        "Include the perf stat command for comparison",
        "Report which variant won and why",
      ],
      starterCode: `section .text
global sum_single
global sum_two

; rdi = array, rsi = count ; return sum in rax
sum_single:
    xor rax, rax
    ; TODO: one accumulator, serial dependency chain
    ret

sum_two:
    xor rax, rax
    xor rdx, rdx
    ; TODO: two accumulators, merge at the end
    ret`,
      rubric: [
        { criterion: "Single-accumulator loop correct", points: 25 },
        { criterion: "Two-accumulator loop correct and merged", points: 30 },
        { criterion: "Both process the same array", points: 15 },
        { criterion: "perf command documented with result", points: 30 },
      ],
      xpReward: 100,
    },
};

export default lesson;
