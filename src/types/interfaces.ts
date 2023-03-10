// import { ParsedUrlQuery } from "querystring";
export interface Action {
  type: string;
  payload?: any;
}

export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export interface Props {
  movies: IMovie[];
}

export interface IMovieDetailed extends IMovie {
  Plot: string;
  Actors: string;
  Genre: string;
  imdbRating: string;
  Country: string;
}
