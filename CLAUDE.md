# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Project Architecture

This is a React + TypeScript + Vite project that implements an interactive San Francisco transit personality quiz. The app maps user responses to MBTI personality types and then to specific SF transit routes/systems.

### Core Architecture

**State Management**: Uses Jotai for atomic state management
- `atoms.ts` - Contains all global state atoms including current question, MBTI scores, and UI color atoms
- `currentStateAtom` - Tracks current question number and collected MBTI responses
- Color atoms automatically derive background/text colors based on current question

**Question Flow**:
- `QuestionManager.tsx` - Main controller component that renders appropriate question or results
- `AllQuestions.tsx` - Contains all 17 individual question components
- `Intro.tsx` - Landing page component
- `Results.tsx` - Final results page with image generation and sharing

**Question System**:
- 17 total questions (Question1 through Question17)
- Each question response maps to MBTI personality dimensions (I/E, S/N, T/F, J/P)
- Questions have different visual themes controlled by `QUESTION_METADATA` in `consts.ts`

**Results System**:
- Calculates MBTI personality from user responses
- Maps personality types to SF transit routes (e.g., INTJ → "the-n", ESFP → "1")
- Generates shareable PNG images using html-to-image library
- Results images stored in `public/results/[route-name]/` folders

### Key Components

- **Image Management**: `imagePreloading.ts` handles preloading of result images
- **Animations**: Uses Framer Motion for transitions and micro-interactions
- **Hooks**: `hooks.ts` contains custom hooks like `useAnimatedValue`
- **Styling**: Component-specific CSS files, uses CSS-in-JS for dynamic theming

### File Structure Notes

- `src/assets/` - Static assets including fonts, images, and SVG components
- `public/results/` - Result images organized by transit route folders
- Each result folder contains: `content.png`, `ticket.png`, `title.png`
- `complicated-svgs/` - Complex animated SVG components

### Development Notes

- Mobile-first design with responsive breakpoints
- Optimized for mobile Safari with special handling for image saving
- Uses localStorage for state persistence between sessions
- No test framework configured - this is a simple interactive web app