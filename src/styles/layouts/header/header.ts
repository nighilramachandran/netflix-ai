import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { HeaderStylesProps } from "../../../interfaces";
import { HEADER_SPACINGS } from "../../../utils/constants/Config";

// AppBar
export const appBarStyles: SxProps<Theme> = {
  position: "relative",
  bgcolor: "background.header",
  boxShadow: "none",
};

// Toolbar
export const headerStyles: HeaderStylesProps = {
  height: {
    xs: HEADER_SPACINGS.H_MOBILE,
    md: HEADER_SPACINGS.H_MAIN_DESKTOP,
  },
  justifyContent: "space-between",
};
