import { Components, Theme } from "@mui/material/styles";

export const typographyOverride: Components<Theme> = {
  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
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
      body1: {
        fontSize: 35,
        fontWeight: 700,
      },
      body2: {
        fontSize: 22,
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: 16,
      },
    },
    variants: [],
  },
};
