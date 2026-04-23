export const colors = {
  light: {
    primary: "#3842fe",
    background: "#ffffff",
    backgroundSecondary: "#f7f9fe",
    surface: "#f1f1f1",
    border: "#e4e4e4",
    textPrimary: "#1a1919",
    textSecondary: "#6b6b6b",
    placeholder: "#b7b7b8",
    inputBorder: "#ccc",
    dot: "#ff0000",
  },
  dark: {
    primary: "#3842fe",
    background: "#121212",
    surface: "#1f1f1f",
    border: "#444444",
    textPrimary: "#ffffff",
    textSecondary: "#aaaaaa",
    placeholder: "#b7b7b8",
    inputBorder: "#444444",
    dot: "#ff0000",
  },
};

export type ColorTheme = typeof colors.light;