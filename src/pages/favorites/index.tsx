import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectFavoriteMovies, addToFavorites } from "@/store/movieSlice";
import { useDispatch } from "react-redux";
import { IMovie } from "@/types/interfaces";
import MovieItem from "@/components/MovieItem";
import Head from "next/head";

const FavoriteMovies = () => {
  const favoriteMovies = useSelector(selectFavoriteMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedFavoriteMovies = localStorage.getItem("favoriteMovies");
    if (storedFavoriteMovies) {
      const parsedFavoriteMovies = JSON.parse(storedFavoriteMovies);
      parsedFavoriteMovies.forEach((movie: IMovie) =>
        dispatch(addToFavorites(movie))
      );
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Favorite films</title>
        <meta name="description" content="List of favorite films" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-white font-bold text-center text-3xl my-5">
        Favorite Movies
      </h1>
      {favoriteMovies.length > 0 ? (
        <div className="flex flex-wrap container mx-auto gap-2 justify-center items-center pb-4">
          {favoriteMovies.map((movie: IMovie) => (
            <MovieItem
              key={movie.imdbID}
              movie={movie}
              ListType="FavoritesList"
            />
          ))}
        </div>
      ) : (
        <p className="text-white text-center font-bold">
          No favorite movies yet
        </p>
      )}
    </>
  );
};

export default FavoriteMovies;
