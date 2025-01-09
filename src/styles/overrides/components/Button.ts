import { Components, Theme } from "@mui/material/styles";

export const buttonOverride: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: () => ({
        borderRadius: "5px",
        textTransform: "initial",
      }),
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: () => ({
        "&.MuiLoadingButton-root": {
          background: "red !important",
        },
      }),
    },
  },
};
