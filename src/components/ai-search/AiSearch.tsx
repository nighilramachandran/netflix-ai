import React, { useEffect, useState } from "react";
import { Button, InputBase, styled, Box, Backdrop } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AnimatePresence, m, Variants } from "framer-motion";
import { useLocation } from "react-router-dom";
import { CSSProperties } from "@mui/material/styles/createTypography";
import { useAppSelector } from "../../redux/hooks";
import MoviesList from "../movies/MoviesList";
import { PromtedMovieImageCache } from "../../utils/helpers/cache/CacheImage";
import { LoadingBox } from "../loading-box";
import { LoadingButton } from "@mui/lab";
import { RequestStatus } from "../../interfaces";

const searchMovieVariant: Variants = {
  hidden: { opacity: 0, y: -50, scale: 0.8 },
  animate: { opacity: 1, y: 50, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.8 },
};
const showPromptedMovieVariant: Variants = {
  hidden: { opacity: 0, y: -50, scale: 0.8 },
  animate: { opacity: 1, y: 80, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.8, transition: { delay: 0.3 } },
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

interface AiSearchProps {
  setPromt: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const AiSearch: React.FC<AiSearchProps> = ({ setPromt, handleSearch }) => {
  const [open, setOpen] = useState(false);
  const [isSearchinNow, setisSearchinNow] = useState<boolean>(false);
  const location = useLocation();

  const { status, promptedMovies } = useAppSelector((state) => state.AI);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPromt(e.target.value);
  };

  const handleSearchEvent = () => {
    setisSearchinNow(true);
    handleSearch && handleSearch();
  };

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (status === "data") {
      setisSearchinNow(false);
    }
  }, [status]);

  return (
    <>
      <Button variant="contained" onClick={() => handleToggle()}>
        AI Search
      </Button>

      {open && (
        <StyledBackdrop
          open={open}
          onClick={() => handleClose()}
        ></StyledBackdrop>
      )}

      <SearchMovie
        open={open}
        inputChange={handleInputChange}
        handleSearch={handleSearchEvent}
        status={status}
      />

      {status === "data" && (
        <AnimatePresence>
          <AnimatedPaperBox
            transition={{ duration: 0.5, ease: "backInOut" }}
            variants={showPromptedMovieVariant}
            initial="hidden"
            animate={open ? "animate" : "exit"}
            sx={{ top: "80%" }}
          >
            <MoviesList
              list={promptedMovies}
              cacheMap={PromtedMovieImageCache}
            />
          </AnimatedPaperBox>
        </AnimatePresence>
      )}

      {isSearchinNow && (
        <LoadingBox
          status={status}
          sx={{
            position: "absolute",
            zIndex: 1000,
            top: "280%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        ></LoadingBox>
      )}
    </>
  );
};

interface SearchMovieInputProps {
  open: boolean;
  inputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleSearch: () => void;
  status: RequestStatus;
}

const SearchMovie: React.FC<SearchMovieInputProps> = ({
  open,
  inputChange,
  handleSearch,
  status,
}) => {
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
      />

      <LoadingButton
        variant="contained"
        loading={status === "loading"}
        onClick={handleSearch}
      >
        Search
      </LoadingButton>
    </AnimatedPaperBox>
  );
};

const AnimatedPaperBox = styled(m(Box))(() => ({
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

const StyledBackdrop = styled(m(Backdrop))(({ theme }) => ({
  zIndex: 998,
  color: "#fff",
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}));

export default AiSearch;
