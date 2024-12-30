import { Components, Theme } from "@mui/material/styles";

export const inputOverride: Components<Theme> = {
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
        borderRadius: "6px",
      }),
      multiline: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
      }),
    },
  },

  MuiTextField: {
    variants: [],
  },
};
