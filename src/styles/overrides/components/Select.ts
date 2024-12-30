import { Components, Theme } from "@mui/material/styles";

export const selectOverride: Components<Theme> = {
  MuiSelect: {
    styleOverrides: {
      standard: ({ theme }) => ({
        ":focus": {
          backgroundColor: "transparent",
        },
      }),
      outlined: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
      }),

      select: ({ theme }) => ({
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        height: "25px",
        minWidth: "100px",
      }),
    },
    defaultProps: {
      disableUnderline: true,
      variant: "standard",
    },
    variants: [],
  },
};
