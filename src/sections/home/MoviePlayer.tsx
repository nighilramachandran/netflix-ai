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
import { Overlay } from "../../widgets/styles/Overlay";
import MovieTitle from "../../components/movies/MovieTitle";

const MoviePlayer: React.FC = () => {
  const dispatch = useAppDispatch();

  const { nowPlayingMovies, movieTrailer } = useAppSelector(
    (state) => state.Movies
  );

  const { id: movieId, original_title, overview } = nowPlayingMovies[0] || {};

  const isTitleAndOverview = original_title && overview;

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
      {isTitleAndOverview && (
        <MovieTitle title={original_title} overview={overview} />
      )}
      <StyledBox>
        <Overlay>
          {movieTrailerKey && <VedioPlayer param={movieTrailerKey} />}
        </Overlay>
      </StyledBox>
    </MoviePlayerWrapper>
  );
};

const StyledBox = styled(Box)(() => ({
  position: "absolute",
  left: 0,
  top: 0,
  height: `calc(65vh + ${HEADER_SPACINGS.H_MAIN_DESKTOP}px + 65px)`,
  minHeight: "656px",
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
}));

export default MoviePlayer;
