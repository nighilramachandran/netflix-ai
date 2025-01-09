import { Box, styled } from "@mui/material";
import { m } from "framer-motion";

export const AnimatedPaperBox = styled(m(Box))(() => ({
  padding: "10px",
  width: "100%",
  position: "absolute",
  zIndex: 999,
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
