import { useDispatch } from "react-redux";
import { removeFromFavorites } from "@/store/movieSlice";
import { IMovie } from "@/types/interfaces";

const useRemoveFromFavorites = () => {
  const dispatch = useDispatch();

  const removeFavorite = (
    movie: IMovie,
    setShowPopup: (arg: boolean) => void
  ) => {
    dispatch(removeFromFavorites(movie));

    const storedFavorites = localStorage.getItem("favoriteMovies");
    let favoriteMovies: IMovie[] = [];

    if (storedFavorites) {
      favoriteMovies = JSON.parse(storedFavorites);
    }

    const updatedFavorites = favoriteMovies.filter(
      (favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID
    );

    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));

    setShowPopup(true);
  };

  return { removeFavorite };
};

export default useRemoveFromFavorites;
