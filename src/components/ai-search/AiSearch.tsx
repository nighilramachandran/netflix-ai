import React, { useState } from "react";
import { Button, InputBase, styled, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { m, Variants } from "framer-motion";

const searchBoxVariant: Variants = {
  hidden: { opacity: 0, y: -50, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.8, transition: { duration: 0.1 } },
};

const AiSearch: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggle}>
        AI Search
      </Button>

      <AnimatedSearchBox
        transition={{ duration: 0.3, delay: 0.1 }}
        variants={searchBoxVariant}
        initial="hidden"
        animate={open ? "animate" : "exit"}
      >
        <InputBase
          startAdornment={<SearchIcon sx={{ marginLeft: "10px" }} />}
          sx={{
            ml: 1,
            flex: 1,
            background: "rgb(0 0 0 / 0.76)",
            color: "#fff",
            padding: "5px",
            borderRadius: "4px",
          }}
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
  maxWidth: "500px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  position: "absolute",
  top: "50%",
  left: "33%",
  zIndex: 999,
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
}));

export default AiSearch;