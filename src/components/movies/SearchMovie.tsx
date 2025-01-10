import React, { useRef } from "react";
import { RequestStatus } from "../../interfaces";
import { AnimatedPaperBox } from "../../styles/mui-styled";
import { CSSProperties } from "@mui/material/styles/createTypography";
import { Variants } from "framer-motion";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";

interface SearchMovieInputProps {
  open: boolean;
  inputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleSearch: () => void;
  status: RequestStatus;
  inputValue: string;
}

const SearchMovie: React.FC<SearchMovieInputProps> = ({
  open,
  inputChange,
  handleSearch,
  status,
  inputValue,
}) => {
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const inputBaseRef = useRef<HTMLElement | null>(null);

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (searchButtonRef.current) {
        searchButtonRef.current.click();
      }
    }
  };

  const handleAnimationComplete = () => {
    if (inputBaseRef.current) {
      inputBaseRef.current.focus();
    }
  };

  return (
    <AnimatedPaperBox
      transition={{ duration: 0.6, delay: 0.1, easings: ["easeIn", "easeOut"] }}
      variants={searchMovieVariant}
      initial="hidden"
      animate={open ? "animate" : "exit"}
      onAnimationComplete={() => handleAnimationComplete()}
      sx={{
        flexWrap: "wrap",
        gap: "10px",
      }}
      id="Search-Box"
    >
      <InputBase
        startAdornment={<SearchIcon sx={{ marginLeft: "10px" }} />}
        sx={{ ...inputBaseStyles }}
        placeholder="Search With AI"
        inputProps={{ "aria-label": "Search With AI" }}
        onChange={inputChange}
        value={inputValue}
        onKeyDown={handleKeyPress}
        inputRef={inputBaseRef}
      />

      <LoadingButton
        variant="contained"
        loading={status === "loading"}
        onClick={handleSearch}
        ref={searchButtonRef}
        sx={{ width: "150px", height: "45px" }}
      >
        Search
      </LoadingButton>
    </AnimatedPaperBox>
  );
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

const searchMovieVariant: Variants = {
  hidden: { opacity: 0, y: -100, scale: 0.8 },
  animate: { opacity: 1, y: 150, scale: 1 },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.8,
    transition: { duration: 0.6 },
  },
};

export default SearchMovie;
