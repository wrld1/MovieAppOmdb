import { GetServerSideProps } from "next";
import { FC, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import { IMovieDetailed } from "../../types/interfaces";

import { useFavoriteButtonInfo } from "@/hooks/useFavoriteButtonInfo";
import MovieDetailRow from "@/components/MovieDetailRow";
import Popup from "@/components/Popup";

interface MovieProps {
  movie: IMovieDetailed;
}

const MoviePage: FC<MovieProps> = ({ movie }: MovieProps) => {
  const {
    Title,
    Year,
    imdbID,
    Poster,
    Plot,
    Actors,
    Genre,
    imdbRating,
    Country,
  } = movie;

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const {
    buttonText,
    onClick: handleFavoriteClick,
    popupText,
  } = useFavoriteButtonInfo(movie, setShowPopup);

  return (
    <>
      <Head>
        <title>{Title}</title>
        <meta name="description" content={Title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-white container flex mx-auto flex-wrap justify-center xl:gap-8">
        <div className="p-6 pb-0 flex flex-col gap-6 text-3xl justify-center items-center">
          <h1 className="font-bold rounded-lg bg-gray-600 p-2 text-center text-lg md:text-3xl">
            {Title}
          </h1>
          {Poster !== "N/A" ? (
            <Image
              className="border-black rounded-lg w-72 h-auto"
              src={Poster}
              alt={Title}
              width={300}
              height={300}
            />
          ) : (
            <p>No poster available</p>
          )}
        </div>
        <div className="p-6 flex flex-col justify-center xl:w-2/5 ">
          <div className="bg-[#4B4F76] p-4 rounded-lg text-lg flex flex-col gap-2 ">
            <MovieDetailRow label="Released in" value={Year} />
            <MovieDetailRow label="Plot" value={Plot} />
            <MovieDetailRow label="Genre" value={Genre} />
            <MovieDetailRow
              label="Rating"
              value={imdbRating}
              className={
                parseInt(imdbRating) < 5
                  ? "text-red-600 font-bold"
                  : parseInt(imdbRating) < 7
                  ? "text-yellow-500 font-bold"
                  : "text-lime-500 font-bold"
              }
            />
            <MovieDetailRow label="Country" value={Country} />
            <MovieDetailRow label="Actors" value={Actors} />
            <button
              onClick={handleFavoriteClick}
              className="text-white bg-[#565fb4] hover:bg-[#5f68ac] rounded-lg px-3 font-bold  leading-10"
            >
              {buttonText}
            </button>
            {showPopup && (
              <Popup message={popupText} onClose={() => setShowPopup(false)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePage;

export const getServerSideProps: GetServerSideProps<MovieProps> = async ({
  query,
}) => {
  const { imdbID } = query;
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${imdbID}`
  );
  const { Title, Year, Poster, Plot, Actors, Genre, imdbRating, Country } =
    response.data;

  const movie: IMovieDetailed = {
    Title,
    Year,
    imdbID: response.data.imdbID,
    Poster,
    Plot,
    Actors,
    Genre,
    imdbRating,
    Country,
  };
  return {
    props: {
      movie,
    },
  };
};
