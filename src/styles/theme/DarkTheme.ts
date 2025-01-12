import { ThemeOptions } from "@mui/material";
import { typographyStylesOverrides } from "../overrides/components/TypographyFontStyle";
import { typographyOverride } from "../overrides/components/Typography";
import { componetnsOverrides } from "../overrides/components";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: "#bbb2b2",
      danger: "#e50a15",
    },
    background: {
      default: "#101010",
      paper: "rgb(0 0 0 / 0.6)",
      header: "transparent",
    },
    primary: {
      main: "#e50a15",
    },
  },
  typography: { ...typographyStylesOverrides, ...typographyOverride },
  components: {
    ...componetnsOverrides,
  },
};

export default darkThemeOptions;
