import { inputOverride } from "./Input";
import { paperOverride } from "./Paper";
import { selectOverride } from "./Select";
import { typographyOverride } from "./Typography";

export const componetnsOverrides = {
  ...inputOverride,
  ...selectOverride,
  ...paperOverride,
  ...typographyOverride,
};
