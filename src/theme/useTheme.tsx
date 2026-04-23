import { useState, createContext, useContext, ReactNode } from "react";
import { colors } from "./colors";
import { Typography } from "./typography";
import { spacing } from "./spacing";

type ColorTheme = typeof colors.light;

interface ThemeContextType {
  isDark: boolean;
  colors: ColorTheme;
  typography: typeof Typography;
  spacing: typeof spacing;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialDark?: boolean;
}

export function ThemeProvider({ children, initialDark = false }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(initialDark);

  const value: ThemeContextType = {
    isDark,
    colors: isDark ? colors.dark : colors.light,
    Typography,
    spacing,
    toggleTheme: () => setIsDark((prev) => !prev),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}