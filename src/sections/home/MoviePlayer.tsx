import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";
import {
  FetchMovieCategoriesAsync,
  FetchMovieTrailersAsync,
} from "../../redux/movies";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import VedioPlayer from "../../components/player/VideoPlayer";
import { HEADER_SPACINGS } from "../../utils/constants/Config";
import { MOVIE_CATERGORY } from "../../utils/constants/Movies";

const MoviePlayer: React.FC = () => {
  const dispatch = useAppDispatch();

  const { nowPlayingMovies, movieTrailer } = useAppSelector(
    (state) => state.Movies
  );

  const movieId = nowPlayingMovies[0]?.id;
  const movieTrailerKey = movieTrailer[0]?.key;

  const { NOW_PLAYING } = MOVIE_CATERGORY;

  useEffect(() => {
    dispatch(FetchMovieCategoriesAsync(NOW_PLAYING.endPoint, NOW_PLAYING.page));
  }, [dispatch, NOW_PLAYING.endPoint, NOW_PLAYING.page]);

  useEffect(() => {
    if (movieId) {
      dispatch(FetchMovieTrailersAsync(movieId));
    }
  }, [dispatch, movieId]);
  return (
    <MoviePlayerWrapper>
      <StyledBox>
        {movieTrailerKey && <VedioPlayer param={movieTrailerKey} />}
      </StyledBox>
    </MoviePlayerWrapper>
  );
};

const StyledBox = styled(Box)(() => ({
  position: "absolute",
  left: 0,
  top: 0,
  height: `calc(65vh + ${HEADER_SPACINGS.H_MAIN_DESKTOP}px + 65px)`,
  width: "100%",
  overflow: "hidden",
  zIndex: -1,
}));

const MoviePlayerWrapper = styled(Box)(() => ({
  height: "65vh",
  width: "100%",
  top: 0,
  left: 0,
  minHeight: "542px",
  overflow: "hidden",
  // background: "white",
  // "::before": {
  //   content: '""',
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   height: "10%",
  //   zIndex: 1,
  //   background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent)",
  // },
}));
export default MoviePlayer;
