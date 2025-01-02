export interface Movies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ApiMovieResponse<T> {
  dates: Dates;
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface Dates {
  maximum: string;
  minimum: string;
}

export interface MovieTrailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface ApiMovieTrailerResponse<T> {
  id: number;
  results: T[];
}

export interface MovieCategories {
  category: string;
  movies: Movies[];
}

export interface MovieCategoryList {
  TOP_RATED: MovieCategoryListItem;
  POPULAR: MovieCategoryListItem;
  NOW_PLAYING: MovieCategoryListItem;
  UP_COMING: MovieCategoryListItem;
}

export interface MovieCategoryListItem {
  name: string;
  endPoint: string;
  page: string;
}
