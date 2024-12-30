import { Components, Theme } from "@mui/material/styles";

export const paperOverride: Components<Theme> = {
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: "none",
        padding: theme.spacing(2),

        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(1),
        },

        borderRadius: theme.shape.borderRadius * 4,
      }),
    },

    variants: [],
  },
};
