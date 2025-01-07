import { inputOverride } from "./Input";
import { paperOverride } from "./Paper";
import { selectOverride } from "./Select";
import { typographyOverride } from "./Typography";
import { buttonOverride } from "./Button";

export const componetnsOverrides = {
  ...inputOverride,
  ...selectOverride,
  ...paperOverride,
  ...typographyOverride,
  ...buttonOverride,
};
