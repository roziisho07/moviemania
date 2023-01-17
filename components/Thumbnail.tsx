import Image from "next/image";
import { Movie } from "@/typings";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Props {
  movie: Movie;
}
const API = process.env.NEXT_PUBLIC_API_KEY;

interface Props2 {
  videoSrc: string;
}
function Thumbnail({ movie }: Props) {
  const router = useRouter();
  const handleClick = async () => {
    router.push({
      pathname: `/movie/${movie.id}`,
    });
  };

  return (
    <div
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
    >
      <h1 key={movie.id}>{movie.title}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        fill
        alt="thumbnail"
        onClick={handleClick}
      />
    </div>
  );
}

export default Thumbnail;
