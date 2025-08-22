Volunteer Registration (React + TypeScript + Vite + Tailwind)

A modern, responsive multi-step form for volunteer registrations.
Built with React 18, TypeScript, Vite, and Tailwind CSS v4.
Glass-morphism UI, accessible keyboard navigation, client-side validation, and a concise review step.

<p align="center"> <img src="public/screenshots/first-step.png" alt="Step 1 – Personal Info" width="75%" /> </p>
✨ Features

4-step wizard

Personal Info

Availability (days, time, location)

Interests & Skills (categories, selectable cards, 1–5 rating with deselect)

Review (read-only summary)

Submit on Step 3 → jumps to Step 4 as review-only

Skills rating with deselect (clicking the same star again resets to 0)

Client-side validation

Step 1: required fields + email format

Step 2: at least one day, time, and location

Responsive UI for mobile, tablet, desktop

Type-safe FormData + prop contracts


🧱 Tech Stack

React 18 + TypeScript

Vite (fast dev server + build)

Tailwind CSS v4

PostCSS (with @tailwindcss/postcss)

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
