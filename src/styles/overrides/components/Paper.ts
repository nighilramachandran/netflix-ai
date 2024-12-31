import { Components, Theme } from "@mui/material/styles";

export const paperOverride: Components<Theme> = {
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: "none",
        padding: 25,
        background: "background.paper",

        // [theme.breakpoints.down("md")]: {
        //   padding: theme.spacing(1),
        // },

        borderRadius: theme.shape.borderRadius * 4,
      }),
    },

    variants: [],
  },
};
