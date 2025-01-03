import { Box, styled } from "@mui/material";

export const Overlay = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
