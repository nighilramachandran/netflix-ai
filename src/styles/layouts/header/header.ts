import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { CSSProperties } from "react";
import { HeaderStylesProps } from "../../../interfaces";
import { HEADER_SPACINGS } from "../../../utils/constants/Config";

// AppBar
export const appBarStyles: SxProps<Theme> = {
  position: "sticky",
  bgcolor: "background.default",
};

// Toolbar
export const headerStyles: HeaderStylesProps = {
  height: {
    xs: HEADER_SPACINGS.H_MOBILE,
    md: HEADER_SPACINGS.H_MAIN_DESKTOP,
  },
  justifyContent: "space-between",
};
