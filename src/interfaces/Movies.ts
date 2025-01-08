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
  dates?: Dates;
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

export interface SelectedMovieList {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: Belongstocollection;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  origin_country?: string[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: Productioncompany[];
  production_countries?: Productioncountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: Spokenlanguage[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
interface Spokenlanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
interface Productioncountry {
  iso_3166_1: string;
  name: string;
}
interface Productioncompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}
interface Genre {
  id: number;
  name: string;
}
interface Belongstocollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface MovieCasting {
  id?: number;
  cast?: CastItem[];
  crew?: CastItem[];
}
export interface CastItem {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
