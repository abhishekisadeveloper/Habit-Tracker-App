# AGENTS.md

## Commands

```bash
npm install          # Install dependencies
npx expo start       # Start dev server (shows QR for Expo Go, options for emulator/simulator)
npm run lint        # Run ESLint
npm run android     # Open in Android emulator
npm run ios         # Open in iOS simulator
npm run web         # Open in browser
```

## Tech Stack

- **Framework**: Expo SDK 54, React Native 0.81.5
- **Routing**: expo-router 6 (file-based routing)
- **Entry**: `expo-router/entry` → `app/` directory

## Architecture

```
app/
├── _layout.tsx           # Root layout (loads Ubuntu fonts, Splash)
├── index.tsx             # Entry → redirects to auth
├── (auth)/               # Auth group
│   ├── _layout.tsx
│   └── create-account.tsx
└── (tabs)/               # Tab group (protected)
    ├── _layout.tsx
    └── index.tsx         # Home screen

components/
├── Input.tsx            # Reusable input with label
└── Button.tsx           # Reusable button

assets/fonts/             # Ubuntu (Light, Regular, Medium, Bold)
```

## Key Patterns

- **Navigation**: Stack with `useRouter` from expo-router
- **Fonts**: Loaded in root `_layout.tsx` via `useFonts`, blocks render until loaded
- **Path alias**: `@/*` → `./*` (e.g., `@/components/Button`)
- **TypeScript**: Strict mode enabled

## Next Steps (from ARCHITECTURE.md)

1. Set up authentication (login/signup)
2. Add AsyncStorage or SecureStore for user session
3. Create login screen in (auth) group
4. Add stats and profile tabs
5. Connect to backend (Supabase/Firebase)