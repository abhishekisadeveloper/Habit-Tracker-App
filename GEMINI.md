# Habit Tracker App - GEMINI Context

This document serves as the primary instructional context for Gemini CLI interactions within this project.

## Project Overview

The **Habit Tracker App** is a cross-platform mobile application built with **Expo** and **React Native**. It aims to help users build and maintain habits through a clean, intuitive interface.

### Main Technologies
- **Framework:** [Expo SDK 54](https://expo.dev)
- **Core:** React Native 0.81.5
- **Routing:** [Expo Router v6](https://docs.expo.dev/router/introduction) (File-based routing)
- **Language:** TypeScript
- **Styling:** Custom theme system with `react-native-size-matters` for responsive scaling.

### Architecture
- `app/`: Contains the application routes and layout logic using Expo Router.
  - `(auth)/`: Authentication-related screens (e.g., account creation).
  - `(tabs)/`: Main application features accessible via a bottom tab navigator.
- `components/`: Reusable, type-safe UI components (e.g., Button, Input).
- `src/theme/`: Centralized theme configuration including colors, spacing, and typography, supporting light and dark modes via a `ThemeProvider`.
- `assets/`: Static assets like fonts (Ubuntu family) and images.

---

## Building and Running

Ensure you have the latest dependencies installed:

```bash
npm install
```

### Development Commands
| Command | Description |
|---------|-------------|
| `npx expo start` | Starts the Expo development server. |
| `npm run android` | Starts the app in an Android emulator. |
| `npm run ios` | Starts the app in an iOS simulator. |
| `npm run web` | Starts the app in a web browser. |
| `npm run lint` | Runs ESLint to check for code quality issues. |

---

## Development Conventions

### 1. Routing & Navigation
- Follow **file-based routing** conventions in the `app/` directory.
- Use `useRouter` and `Link` from `expo-router` for navigation.
- Group related screens using folder groups (e.g., `(auth)`, `(tabs)`).

### 2. Components & UI
- Reusable components should be placed in `components/` with strict TypeScript typing.
- Use the custom `Input` and `Button` components for consistent UI across the app.

### 3. Theming & Styling
- **Always** use the `useTheme` hook to access theme properties:
  ```tsx
  const { colors, spacing, typography } = useTheme();
  ```
- Use `spacing` constants (e.g., `spacing.md`, `spacing.lg`) instead of hardcoded values to ensure consistency.
- Responsive scaling is handled via `react-native-size-matters`. Prefer using the `spacing` object which already incorporates these scales.

### 4. Imports
- Use path aliases for cleaner imports:
  - `@/*` maps to the root directory (e.g., `import { Button } from "@/components/Button"`).

### 5. Coding Style
- Adhere to the provided `eslint.config.js` and `tsconfig.json` configurations.
- Use functional components and React hooks.
- Maintain strict type safety for all components and utilities.

---

## Current State & Roadmap
Refer to `ARCHITECTURE.md` and `AGENTS.md` for detailed notes on recent changes and planned features, including:
- Implementing full authentication (Supabase/Firebase).
- Adding persistent storage with `AsyncStorage` or `SecureStore`.
- Expanding the `(tabs)` group with Stats and Profile screens.
