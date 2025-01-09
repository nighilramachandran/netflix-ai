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

const SearchMovie: React.FC<SearchMovieInputProps> = ({
  open,
  inputChange,
  handleSearch,
  status,
  inputValue,
}) => {
  const searchKeyRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (searchKeyRef.current) {
        searchKeyRef.current.click();
      }
    }
  };

  return (
    <AnimatedPaperBox
      transition={{ duration: 0.3, delay: 0.1 }}
      variants={searchMovieVariant}
      initial="hidden"
      animate={open ? "animate" : "exit"}
      sx={{
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <InputBase
        startAdornment={<SearchIcon sx={{ marginLeft: "10px" }} />}
        sx={{ ...inputBaseStyles }}
        placeholder="Search With AI"
        inputProps={{ "aria-label": "Search With AI" }}
        onChange={inputChange}
        value={inputValue}
        onKeyDown={handleKeyPress}
      />

      <LoadingButton
        variant="contained"
        loading={status === "loading"}
        onClick={handleSearch}
        ref={searchKeyRef}
        sx={{ width: "150px", height: "45px" }}
      >
        Search
      </LoadingButton>
    </AnimatedPaperBox>
  );
};

const searchMovieVariant: Variants = {
  hidden: { opacity: 0, y: -50, scale: 0.8 },
  animate: { opacity: 1, y: 50, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.8 },
};

export default SearchMovie;