import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IMovie } from "@/types/interfaces";
import useRemoveFromFavorites from "@/hooks/useRemoveFromFavorites";
import { useFavoriteButtonInfo } from "@/hooks/useFavoriteButtonInfo";

import Popup from "./Popup";

type ListType = "MainList" | "FavoritesList";

interface MovieProps {
  movie: IMovie;
  ListType: ListType;
}

const MovieItem: FC<MovieProps> = ({ movie, ListType }) => {
  const { imdbID, Poster, Title, Year } = movie;
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const { removeFavorite } = useRemoveFromFavorites();
  const {
    buttonText,
    onClick: handleFavoriteClick,
    popupText,
  } = useFavoriteButtonInfo(movie, setShowPopup);

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="movie flex flex-col w-40 items-center border border-black rounded-lg bg-gray-500 py-2 cursor-pointer">
        <Link href={`/movie/${imdbID}`}>
          {Poster !== "N/A" ? (
            <Image
              className="w-36 h-52 rounded-md"
              src={Poster}
              alt={Title}
              width={150}
              height={200}
            />
          ) : (
            <p className="w-36 h-52 text-white font-bold text-center">
              {`No poster available for ${Title}`}
            </p>
          )}
          <div className="break-normal text-center movie-overview">
            <p className="font-bold">{Title} </p>
            <p>{Year}</p>
          </div>
        </Link>
      </div>
      <button
        onClick={
          ListType === "MainList"
            ? handleFavoriteClick
            : () => removeFavorite(movie, setShowPopup)
        }
        className="text-white bg-[#4B4F76] hover:bg-[#4f5585] rounded-xl px-3 py-1 font-bold w-40 h-14 inline-flex items-center justify-center"
      >
        {ListType === "FavoritesList" ? "Remove from favorites" : buttonText}
      </button>
      {showPopup && (
        <Popup
          message={
            ListType === "MainList"
              ? popupText
              : `${Title} has been removed from favorites!`
          }
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default MovieItem;
