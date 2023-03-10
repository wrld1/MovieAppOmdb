import { IMovie } from "@/types/interfaces";
import useRemoveFromFavorites from "./useRemoveFromFavorites";
import useAddToFavorites from "./useAddToFavorites";

interface FavoriteButtonInfo {
  buttonText: string;
  popupText: string;
  onClick: () => void;
}

export function useFavoriteButtonInfo(
  movie: IMovie,
  setShowPopup: (arg: boolean) => void
): FavoriteButtonInfo {
  const { addToFavoriteMovies } = useAddToFavorites();
  const { removeFavorite } = useRemoveFromFavorites();

  if (typeof window !== "undefined") {
    const favoriteMovies = localStorage.getItem("favoriteMovies");

    if (favoriteMovies) {
      const parsedFavoriteMovies = JSON.parse(favoriteMovies);
      const isFavorite = parsedFavoriteMovies.some(
        (favMovie: IMovie) => favMovie.imdbID === movie.imdbID
      );
      if (isFavorite) {
        return {
          buttonText: "Remove from favorites",
          popupText: "This movie has been saved in favorite movies",
          onClick: () => removeFavorite(movie, setShowPopup),
        };
      } else {
        return {
          buttonText: "Add to favorites",
          popupText: "This movie has been removed from favorites",
          onClick: () => addToFavoriteMovies(movie, setShowPopup),
        };
      }
    }
  }
  return {
    buttonText: "Add to favorites",
    popupText: "This movie has been saved in favorite movies",
    onClick: () => addToFavoriteMovies(movie, setShowPopup),
  };
}
