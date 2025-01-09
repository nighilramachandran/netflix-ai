import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { CustomModal } from "../custom-modal";
import VedioPlayer from "../player/VideoPlayer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchMovieTrailersAsync } from "../../redux/movies";

interface WatchNowButtonProps {
  movieId?: number;
}

const WatchNowButton: React.FC<WatchNowButtonProps> = ({ movieId }) => {
  const [openDialoge, setOpenDialoge] = useState<boolean>(false);

  const { movieTrailer } = useAppSelector((state) => state.Movies);
  const movieTrailerKey = movieTrailer[0]?.key;
  const dispatch = useAppDispatch();
  const handleWatch = () => {
    setOpenDialoge((prev) => !prev);
  };
  const HandleClose = () => {
    setOpenDialoge(false);
  };

  useEffect(() => {
    if (movieId) dispatch(FetchMovieTrailersAsync(movieId));
  }, [movieId, dispatch]);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        onClick={() => handleWatch()}
      >
        Watch Now
      </Button>
      <CustomModal open={openDialoge} onClose={HandleClose}>
        {movieTrailerKey && <VedioPlayer param={movieTrailerKey} />}
      </CustomModal>
    </>
  );
};

export default WatchNowButton;
