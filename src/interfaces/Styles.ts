import { CSSProperties } from "react";

export interface HeaderStylesProps extends Omit<CSSProperties, "height"> {
  height: { xs: number; md: number };
}
