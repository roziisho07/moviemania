import { Movie } from "@/typings";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  posterPath: Movie[];
}
const URL = `https://image.tmdb.org/t/p/original/`;
// const baseUrl = "`https://image.tmdb.org/t/p/w500/";
function Banner({ posterPath }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    setMovie(posterPath[Math.floor(Math.random() * posterPath.length)]);
  }, [posterPath]);

  return (
    <div className=" space-y-1  md-space-y-4 lg:justify-end lg-pb-12">
      <div className="relative flex align-middle justify-center w-full  lg:h-[full]  lg:w-full ">
        <h1
          className="text-white text-2xl absolute bottom-10 
    filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
drop-shadow-none	filter: drop-shadow(0 0 #0000);
 lg:text-7xl "
        >
          {movie?.title || movie?.name}
        </h1>
        <Image
          src={`${URL}${movie?.backdrop_path || movie?.poster_path}`}
          width={1500}
          height={1500}
          alt="poster"
        />
      </div>
      <div />
    </div>
  );
}

export default Banner;
