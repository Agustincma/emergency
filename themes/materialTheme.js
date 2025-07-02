import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

// Tema claro personalizado
export const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#F7941D", // Naranja principal
    primaryContainer: "#FFEEE0",
    secondary: "#FF4444", // Rojo para emergencias
    secondaryContainer: "#FFEBEE",
    tertiary: "#6200EE", // Púrpura Material Design
    tertiaryContainer: "#F3E5F5",
    surface: "#FFFFFF",
    surfaceVariant: "#F5F5F5",
    background: "#FAFAFA",
    error: "#B00020",
    errorContainer: "#FDEAEA",
    onPrimary: "#FFFFFF",
    onSecondary: "#FFFFFF",
    onSurface: "#000000",
    onBackground: "#000000",
    outline: "#E0E0E0",
    elevation: {
      level0: "transparent",
      level1: "#F5F5F5",
      level2: "#F0F0F0",
      level3: "#EEEEEE",
      level4: "#ECECEC",
      level5: "#E8E8E8",
    },
  },
  fonts: {
    ...MD3LightTheme.fonts,
    default: {
      fontFamily: "System",
      letterSpacing: 0,
    },
  },
};

// Tema oscuro personalizado
export const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#FFB74D", // Naranja más claro para modo oscuro
    primaryContainer: "#4A2C17",
    secondary: "#FF6B6B", // Rojo más suave para emergencias
    secondaryContainer: "#4A1A1A",
    tertiary: "#BB86FC", // Púrpura más claro
    tertiaryContainer: "#2A1A2E",
    surface: "#121212",
    surfaceVariant: "#2A2A2A",
    background: "#0A0A0A",
    error: "#CF6679",
    errorContainer: "#4A1A1A",
    onPrimary: "#000000",
    onSecondary: "#000000",
    onSurface: "#FFFFFF",
    onBackground: "#FFFFFF",
    outline: "#404040",
    elevation: {
      level0: "transparent",
      level1: "#1E1E1E",
      level2: "#232323",
      level3: "#262626",
      level4: "#292929",
      level5: "#2C2C2C",
    },
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    default: {
      fontFamily: "System",
      letterSpacing: 0,
    },
  },
};

// Configuración adicional para componentes específicos
export const themeConfig = {
  button: {
    borderRadius: 8,
    elevation: 2,
  },
  card: {
    borderRadius: 12,
    elevation: 3,
  },
  fab: {
    borderRadius: 16,
    elevation: 6,
  },
  textInput: {
    borderRadius: 8,
  },
};
