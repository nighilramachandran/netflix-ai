import React, { useEffect, useState } from "react";
import { Button, InputBase, styled, Box, Backdrop } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { m, Variants } from "framer-motion";
import { useLocation } from "react-router-dom";
import { CSSProperties } from "@mui/material/styles/createTypography";

const searchBoxVariant: Variants = {
  hidden: { opacity: 0, y: -50, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.8, transition: { duration: 0.1 } },
};

const inputBaseStyles: CSSProperties = {
  ml: 1,
  flex: 1,
  background: "rgb(0 0 0 / 0.76)",
  color: "#fff",
  padding: "5px",
  borderRadius: "4px",
  minWidth: "190px",
  margin: 0,
};

const AiSearch: React.FC = () => {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <Button variant="contained" onClick={handleToggle}>
        AI Search
      </Button>

      {open && (
        <StyledBackdrop
          open={open}
          onClick={() => handleClose()}
        ></StyledBackdrop>
      )}

      <AnimatedSearchBox
        transition={{ duration: 0.3, delay: 0.1 }}
        variants={searchBoxVariant}
        initial="hidden"
        animate={open ? "animate" : "exit"}
        onClick={(event) => event.stopPropagation()}
      >
        <InputBase
          startAdornment={<SearchIcon sx={{ marginLeft: "10px" }} />}
          sx={{ ...inputBaseStyles }}
          placeholder="Search With AI"
          inputProps={{ "aria-label": "Search With AI" }}
        />
        <Button variant="contained">Search</Button>
      </AnimatedSearchBox>
    </>
  );
};

const AnimatedSearchBox = styled(m(Box))(() => ({
  padding: "10px",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  position: "absolute",
  top: "50%",
  zIndex: 1000,
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
}));

const StyledBackdrop = styled(m(Backdrop))(({ theme }) => ({
  zIndex: 999,
  color: "#fff",
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}));

export default AiSearch;
