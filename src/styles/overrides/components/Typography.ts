import { Components, Theme } from "@mui/material/styles";

export const typographyOverride: Components<Theme> = {
  MuiTypography: {
    styleOverrides: {
      root: () => ({
        fontWeight: "400px",
        fontSize: "12px",
      }),
      h2: {
        fontSize: 30,
        fontWeight: 600,
      },
      h3: {
        fontSize: 20,
      },
      body1: ({ theme }) => ({
        fontWeight: 700,

        [theme.breakpoints.down("md")]: {
          fontSize: "16px",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "25px",
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "35px",
        },
      }),
      body2: ({ theme }) => ({
        fontWeight: 700,

        [theme.breakpoints.down("md")]: {
          fontSize: "12px",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "18px",
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: "22px",
        },
      }),

      subtitle1: {
        fontSize: 16,
      },
    },
    variants: [
      {
        props: { className: "error" },
        style: () => ({
          fontSize: "12px",
        }),
      },
    ],
  },
};
