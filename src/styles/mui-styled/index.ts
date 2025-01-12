import { Backdrop, Box, styled } from "@mui/material";
import { m } from "framer-motion";

export const AnimatedPaperBox = styled(m.create(Box))(() => ({
  padding: "10px",
  width: "100%",
  position: "absolute",
  zIndex: 999,
  left: 0,
  top: "-100px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledBackdrop = styled(m.create(Backdrop))(() => ({
  zIndex: 998,
  color: "#fff",
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}));
