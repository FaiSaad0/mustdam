# AI Editor Guidelines for Mustdam Bilingual Website

This document outlines the technical stack and specific rules for developing and modifying the Mustdam website codebase.

## 1. Tech Stack Summary

1.  **Framework:** React (using functional components and hooks).
2.  **Language:** TypeScript.
3.  **Build Tool:** Vite.
4.  **Styling:** Tailwind CSS (utility-first approach).
5.  **UI Library:** shadcn/ui (Pre-built components based on Radix UI).
6.  **Icons:** Lucide React.
7.  **Routing:** React Router (Standard for navigation, although the current implementation uses a single-page structure with hash links).
8.  **Backend/Data:** Supabase (dependency installed for future use).
9.  **Internationalization:** Bilingual support (English/Arabic) implemented via state management and conditional rendering (`dir="rtl"`/`dir="ltr"`).

## 2. Library and Code Usage Rules

### A. Structure and Naming Conventions
*   **Source Code:** All source code resides in the `src` folder.
*   **Pages:** Place main views/routes in `src/pages/`.
*   **Components:** Place reusable components in `src/components/`.
*   **Component Creation:** Always create a new, dedicated file for every new component or hook. Do not add new components to existing files.

### B. Styling and UI
*   **Styling:** Use Tailwind CSS exclusively for all styling. Designs must be responsive by default.
*   **UI Components:** Prioritize using components from the shadcn/ui library. If a custom component is needed, build it using Tailwind CSS.
*   **Icons:** Use icons imported from `lucide-react`.

### C. Language and Directionality
*   **Bilingual Support:** Maintain the existing bilingual structure (`en` and `ar` content objects).
*   **RTL/LTR:** Ensure proper handling of text direction using the `dir` attribute based on the current language state.

### D. Data and State
*   **State Management:** Use standard React `useState` and `useReducer` for local state management.
*   **Backend:** If database or authentication features are required, utilize the installed Supabase dependency.