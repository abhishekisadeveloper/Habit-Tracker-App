# Habit Tracker App - Architecture Summary

## 📁 Current Folder Structure

```
app/
├── _layout.tsx                    # Root layout (fonts + Splash)
├── index.tsx                      # Entry point (redirects to auth)
├── (auth)/
│   └── create-account.tsx        # Create Account screen
└── (tabs)/
    ├── _layout.tsx               # Tab navigator
    └── index.tsx                 # Home screen
```

## 🔧 Key Implementations

### 1. Fonts (app/_layout.tsx)
- Ubuntu fonts (Light, Regular, Medium, Bold)
- Loaded once at root level

### 2. Navigation Flow
```
app/index.tsx → (auth)/create-account.tsx → (tabs)/index.tsx
```

### 3. Create Account Screen
- Name + Email inputs
- Validation: requires both fields filled
- Navigation to tabs on success

### 4. Tabs Layout
- Tab navigator with Home tab
- Uses Ionicons for icons

## 📝 Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Input | components/Input.tsx | Reusable input with label |
| Button | components/Button.tsx | Reusable button |

## 🚀 Next Steps (Backend)

1. Set up authentication (login/signup)
2. Add AsyncStorage or SecureStore for user session
3. Create login screen in (auth) group
4. Add stats and profile tabs
5. Connect to backend (Supabase/Firebase)

## 📌 Key Files Modified

- app/_layout.tsx - Root layout with fonts
- app/index.tsx - Entry redirect
- app/(auth)/create-account.tsx - Account creation with validation
- app/(tabs)/_layout.tsx - Tab navigator
- components/Input.tsx - Type-safe input component
