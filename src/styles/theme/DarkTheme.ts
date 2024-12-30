import { ThemeOptions } from "@mui/material";
import { typographyStylesOverrides } from "../overrides/components/TypographyFontStyle";
import { typographyOverride } from "../overrides/components/Typography";
import { componetnsOverrides } from "../overrides/components";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    text: {
      primary: "#FFFFFF",
    },
    background: {
      default: "#101010",
      paper: "rgb(0 0 0 / 0.6)",
    },
    primary: {
      main: "#d6357e",
    },
  },
  typography: { ...typographyStylesOverrides, ...typographyOverride },
  components: {
    ...componetnsOverrides,
  },
};

export default darkThemeOptions;
