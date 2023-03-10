import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState, AppThunkDispatch } from "./store";
import { IMovie, Action } from "@/types/interfaces";

interface FetchMoviesParams {
  searchTerm: string;
  page: number;
}

interface MovieState {
  movies: IMovie[];
  totalResults: number;
  currentPage: number;
  status: "idle" | "loading" | "failed";
  error: string | null;
  favoriteMovies: IMovie[];
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
  currentPage: 1,
  status: "idle",
  error: null,
  favoriteMovies: [],
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ searchTerm, page }: FetchMoviesParams) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${searchTerm}&page=${page}`
    );
    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error);
    }
    return {
      movies: data.Search.map((movie: any) => ({
        Title: movie.Title,
        Year: movie.Year,
        imdbID: movie.imdbID,
        Poster: movie.Poster,
      })),
      totalResults: parseInt(data.totalResults),
    };
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<IMovie>) => {
      const existingMovie = state.favoriteMovies.find(
        (movie) => movie.imdbID === action.payload.imdbID
      );
      if (!existingMovie) {
        state.favoriteMovies.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<IMovie>) => {
      const movieIndex = state.favoriteMovies.findIndex(
        (movie) => movie.imdbID === action.payload.imdbID
      );
      if (movieIndex !== -1) {
        state.favoriteMovies.splice(movieIndex, 1);
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.totalResults = action.payload.totalResults;
        state.status = "idle";
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export const fetchMoviesByPage = (searchTerm: string, page: number) => {
  return (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ) => {
    dispatch(fetchMovies({ searchTerm, page })).then(() => {
      const state = getState();
      const currentPage = selectCurrentPage(state);
      console.log(currentPage);
    });
  };
};

export const incrementPage = (searchTerm: string) => {
  return (dispatch: AppThunkDispatch, getState: () => RootState) => {
    const currentPage = selectCurrentPage(getState());
    const totalResults = selectTotalResults(getState());
    const totalPages = Math.ceil(totalResults / 10);
    if (currentPage < totalPages) {
      dispatch(fetchMoviesByPage(searchTerm, currentPage + 1));
    }
  };
};

export const decrementPage = (searchTerm: string) => {
  return (dispatch: AppThunkDispatch, getState: () => RootState) => {
    const currentPage = selectCurrentPage(getState());
    if (currentPage > 1) {
      dispatch(fetchMoviesByPage(searchTerm, currentPage - 1));
    }
  };
};

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectTotalResults = (state: RootState) =>
  state.movies.totalResults;
export const selectCurrentPage = (state: RootState) => state.movies.currentPage;
export const selectStatus = (state: RootState) => state.movies.status;
export const selectError = (state: RootState) => state.movies.error;
export const selectFavoriteMovies = (state: RootState) =>
  state.movies.favoriteMovies;

export const { addToFavorites, removeFromFavorites, setCurrentPage } =
  movieSlice.actions;

export default movieSlice.reducer;
