import { IMovie } from "@/types/interfaces";
import { addToFavorites } from "@/store/movieSlice";
import { useDispatch } from "react-redux";

const useAddToFavorites = () => {
  const dispatch = useDispatch();

  const addToFavoriteMovies = (
    movie: IMovie,
    setShowPopup: (arg: boolean) => void
  ) => {
    const storedFavorites = localStorage.getItem("favoriteMovies");
    const favoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];

    const updatedFavorites = [...favoriteMovies, movie];

    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    dispatch(addToFavorites(movie));
    setShowPopup(true);
  };

  return { addToFavoriteMovies };
};

export default useAddToFavorites;
