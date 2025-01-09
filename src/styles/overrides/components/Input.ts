import { Components, Theme } from "@mui/material/styles";

export const inputOverride: Components<Theme> = {
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderRadius: "6px",
        height: 45,
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
