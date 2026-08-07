export type TrackStatus = "live" | "coming" | "planned";

export type TrackGroupId = "languages" | "sciences" | "dream";

export interface Track {
  slug: string;
  name: string;
  status: TrackStatus;
  outcome: string;
  description: string;
  href?: string;
  /** Number of days available in the live track. */
  days?: number;
}

export interface TrackGroup {
  id: TrackGroupId;
  title: string;
  tagline: string;
  tracks: Track[];
}

export const TRACK_GROUPS: TrackGroup[] = [
  {
    id: "languages",
    title: "Languages & tracks",
    tagline: "The starting family — every language runs the same hands-on engine.",
    tracks: [
      {
        slug: "c",
        name: "C",
        status: "live",
        outcome: "Memory, pointers, and systems thinking",
        description:
          "The first track, live today. A hundred days from your first variable to the metal.",
        href: "/curriculum",
        days: 100,
      },
      {
        slug: "assembly",
        name: "x86-64 Assembly",
        status: "live",
        outcome: "Read and write code that talks to the metal",
        description:
          "Registers, instructions, calling conventions — the bare metal behind everything.",
        href: "/curriculum",
      },
      {
        slug: "python",
        name: "Python",
        status: "live",
        outcome: "Automation, data, and AI",
        description:
          "The first language for automation, data, and AI — live on the same engine. Forty days from your first print to classes, decorators, and generators.",
        href: "/lesson/python/1",
        days: 40,
      },
      {
        slug: "cpp",
        name: "C++",
        status: "live",
        outcome: "Objects, templates, and the STL",
        description:
          "C with ergonomics and a standard library that scales from systems to games. Forty days from your first std::cout to classes, smart pointers, and the STL.",
        href: "/lesson/cpp/1",
        days: 40,
      },
      {
        slug: "javascript",
        name: "JavaScript / TypeScript",
        status: "planned",
        outcome: "Web and full-stack development",
        description: "From first event listener to shipping a full-stack product.",
      },
      {
        slug: "rust",
        name: "Rust",
        status: "planned",
        outcome: "Memory safety without garbage collection",
        description:
          "Ownership, borrowing, and fearless concurrency — systems programming done right.",
      },
      {
        slug: "sql",
        name: "SQL & Databases",
        status: "planned",
        outcome: "Design, query, and optimize real data systems",
        description: "From your first SELECT to schema design and query tuning.",
      },
      {
        slug: "toolkit",
        name: "Bash / Linux / Git",
        status: "planned",
        outcome: "The working toolkit every engineer needs",
        description:
          "The shell, the OS, and version control — cross-cutting skills woven through every track.",
      },
    ],
  },
  {
    id: "sciences",
    title: "The sciences",
    tagline:
      "Beyond programming — mathematics, physics, and the engineering disciplines, built on a proven engine.",
    tracks: [
      {
        slug: "mathematics",
        name: "Mathematics",
        status: "planned",
        outcome: "From arithmetic to calculus, linear algebra, and probability",
        description:
          "The mathematics that underpins computing — taught hands-on, never abstract.",
      },
      {
        slug: "physics",
        name: "Physics",
        status: "planned",
        outcome: "Mechanics, electromagnetism, thermodynamics, modern physics",
        description: "How the world actually works, from first principles to real problems.",
      },
      {
        slug: "engineering",
        name: "Electrical & Electronics Engineering",
        status: "planned",
        outcome: "Circuit theory, components, embedded systems, and hardware",
        description:
          "Circuit theory and embedded systems — the hardware side of the software tracks.",
      },
      {
        slug: "machine-learning",
        name: "Machine Learning & AI",
        status: "planned",
        outcome: "From regression to neural networks to LLM engineering",
        description: "Every concept paired with real code and real data — no black boxes.",
      },
      {
        slug: "cybersecurity",
        name: "Cybersecurity",
        status: "planned",
        outcome: "Defense and offense, practiced only in legal sandboxes",
        description:
          "Defensive and offensive techniques, taught in sandboxed labs with strict ethics gates.",
      },
      {
        slug: "web-development",
        name: "Full-Stack Web Development",
        status: "planned",
        outcome: "Frontend, backend, deployment, and the business of shipping",
        description:
          "The complete road from idea to deployed product — and how shipping software works.",
      },
      {
        slug: "operations",
        name: "Operations & Careers",
        status: "planned",
        outcome: "Version control, testing, code review, and the soft skills",
        description:
          "The skills that turn knowledge into a livelihood — testing, review, and technical writing.",
      },
    ],
  },
  {
    id: "dream",
    title: "The dream",
    tagline:
      "The long-term horizon — humanities and the arts, earned by being excellent at the technical core first.",
    tracks: [
      {
        slug: "humanities",
        name: "Humanities & the Arts",
        status: "planned",
        outcome: "The rest of human knowledge, in time",
        description:
          "After the technical core is proven — literature, history, philosophy, and the arts.",
      },
    ],
  },
];

export const TRACKS: Track[] = TRACK_GROUPS.flatMap((g) => g.tracks);

export function getTrack(slug: string): Track | undefined {
  return TRACKS.find((t) => t.slug === slug);
}

export function getTrackGroup(id: TrackGroupId): TrackGroup | undefined {
  return TRACK_GROUPS.find((g) => g.id === id);
}
