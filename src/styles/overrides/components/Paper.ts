import { Components, Theme } from "@mui/material/styles";

export const paperOverride: Components<Theme> = {
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: "none",
        padding: 25,
        background: "background.paper",
        borderRadius: theme.shape.borderRadius * 4,
      }),
    },

    variants: [
      {
        props: { variant: "outlined" },
        style: () => ({
          background: "#ffffff",
        }),
      },
    ],
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        width: "100vw",
        height: "100vh",
        margin: 0,
        maxWidth: "none",
        maxHeight: "none",
        borderRadius: 0,
      },
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: () => ({
        overflow: "hidden",
      }),
    },
  },
};
