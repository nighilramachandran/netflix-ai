declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {}
  interface TypeText {
    dark: string;
  }
  interface TypeBackground {
    header: string;
    secondary: string;
    paper: string;
  }
}

export * from "./DarkTheme";
