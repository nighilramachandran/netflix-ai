import React, { useEffect, useMemo } from "react";
import MoviePlayer from "../sections/home/MoviePlayer";
import MovieCategoryList from "../sections/home/MovieCategoryList";
import { LoadingBox } from "../components/loading-box";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { MOVIE_CATERGORY } from "../utils/constants/Movies";
import { FetchAllMovieCategoriesAsync } from "../redux/movies";
import CustomeContainer from "../widgets/layouts/container/CustomeContainer";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING } = MOVIE_CATERGORY;

  const { status } = useAppSelector((state) => state.Movies);

  const moviecategoryToFetch = useMemo(
    () => [NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING],
    [NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING]
  );

  useEffect(() => {
    if (status !== "data")
      dispatch(FetchAllMovieCategoriesAsync(moviecategoryToFetch));
  }, [dispatch, moviecategoryToFetch, status]);

  return (
    <LoadingBox status={status}>
      <CustomeContainer withPadding={false}>
        <MoviePlayer />
      </CustomeContainer>
      <CustomeContainer>
        <MovieCategoryList />
      </CustomeContainer>
    </LoadingBox>
  );
};

export default Home;
