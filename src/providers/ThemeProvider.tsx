import { createTheme, ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";
import darkThemeOptions from "../styles/theme/DarkTheme";

// Interfaces
interface ThemeProviderProps {
  children: ReactNode;
}

// Create themes
const darkTheme = createTheme(darkThemeOptions);

const ThemeProviders: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default ThemeProviders;
