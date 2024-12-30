import { inputOverride } from "./input";
import { paperOverride } from "./paper";
import { selectOverride } from "./Select";
import { typographyOverride } from "./Typography";

export const componetnsOverrides = {
  ...inputOverride,
  ...selectOverride,
  ...paperOverride,
  ...typographyOverride,
};
