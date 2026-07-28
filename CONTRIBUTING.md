# Contributing to ASTA.100

First off, thank you for considering contributing! This project aims to be the best interactive platform for learning C, Assembly, and low-level systems programming.

## Code of Conduct

By participating, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### 🐛 Report Bugs

Open an issue with:
- A clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 💡 Suggest Features

Open an issue with:
- What you'd like to see and why
- How it fits the 100-day curriculum model
- Any relevant examples or references

### 🧑‍💻 Submit Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run `npm run lint` to verify code quality
5. Test your changes with `npm run dev`
6. Push and open a Pull Request

## Development Setup

```bash
npm install
npm run dev
```

### Adding a New Language Track

The project is structured to support multiple languages beyond C and Assembly.
To add a new language (e.g., Rust, Zig):

1. Add the language to `src/lib/types.ts`:
   - Extend the `Language` type
2. Add curriculum data in `src/lib/curriculum.ts`:
   - Follow the `DayBlueprint` pattern
   - Add detailed lessons to `DETAILED_LESSONS`
3. Update the playground templates in `src/app/playground/page.tsx`
4. Add syntax highlighting support in `CodePlayground.tsx` for Monaco

### Curriculum Guidelines

Each lesson should include:
- **Theory**: Clear explanations with code examples (3+ sections)
- **Playground**: A runnable code template
- **Exercises**: At least 2 quiz questions + 1 code challenge
- **Assignment**: A capstone task with rubric

## Pull Request Guidelines

- Keep PRs focused on a single concern
- Update documentation if needed
- Ensure the build passes: `npm run build`
- Add tests if applicable

## Style Guide

- TypeScript strict mode enforced
- Follow existing code patterns
- Use the project's Tailwind design system (cyber-* colors, font-display/mono)
- Components should be typed with interfaces

## Questions?

Open a discussion issue. We're here to help!
