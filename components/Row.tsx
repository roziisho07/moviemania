import { Movie } from "@/typings";

import { useEffect, useState } from "react";
import Thumbnail from "./Thumbnail";

interface props {
  title: string;
  movies: Movie[];
}

// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US

function Row({ title, movies }: props) {
  return (
    <div className="gap-1 m-4">
      <h1 className="pt-4 text-slate-300 font-bold  m-1 text-2xl ">{title}</h1>

      <div className="flex flex-row w-full align-middle justify-center overflow-x-scroll overflow-y-clip">
        {movies.map((movie) => (
          <div className="flex  flex-col " key={movie.name}>
            <Thumbnail key={movie.id} movie={movie} />
            <h1 className="text-slate-300 text-center" key={movie.title}>
              {movie.title || movie.original_name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
