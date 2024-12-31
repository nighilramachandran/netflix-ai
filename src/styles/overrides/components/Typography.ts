import { Components, Theme } from "@mui/material/styles";

export const typographyOverride: Components<Theme> = {
  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontWeight: "400px",
        fontSize: "12px",
      }),
      h3: {
        fontSize: 20,
      },
    },
    variants: [],
  },
};
