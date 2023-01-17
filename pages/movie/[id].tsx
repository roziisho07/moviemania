import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import Image from "next/image";
import logo2 from "/images/moviemania-low-resolution-logo-white-on-transparent-background.png";

import { Trailer, Movie } from "@/typings";

import Head from "next/head";

function Video({ movie, body, error }: any) {
  const [errorMessage, setErrorMessage] = useState(error);
  const router = useRouter();
  console.log(movie);
  console.log("Body", body);

  const movieData: Movie = body;

  const { id } = router.query;
  useEffect(() => {
    if (error) setErrorMessage(error);
  }, [error]);

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  const [option1, option2, option3] = movie.results;
  let buttonOption: Trailer = option1;

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "270",
    width: "480",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div className="">
      <Head>
        <title>{option1.name}</title>
      </Head>
      <section className="flex flex-col  justify-center  items-center bg-slate-800 gap-10 h-[140vh]">
        <Image src={logo2} alt="logo" width={200} height={200} />

        <YouTube
          videoId={`${buttonOption.key}`}
          opts={opts}
          onReady={onPlayerReady}
        />
        <YouTube
          videoId={`${option2.key}`}
          opts={opts}
          onReady={onPlayerReady}
        />
        <YouTube
          videoId={`${option3.key}`}
          opts={opts}
          onReady={onPlayerReady}
        />
      </section>
      <section className="flex flex-col  justify-center  items-center bg-slate-800 gap-10 h-[80vh]">
        <div className="text-white lg:w-58 flex flex-col lg:justify-center lg:items-center w-[95vw]  lg:w-[35vw] ">
          <ul className="m-2  flex flex-col text-left">
            <h1 className="text-2xl mb-1 text-cyan-300">Facts</h1>
            <li>
              <span className="text-teal-500">Movie Name: </span>{" "}
              {movieData.name || movieData.title || movieData.original_name}
            </li>
            <li>
              <span className="text-teal-500">Status: </span> {movieData.status}
            </li>
            <li>
              {" "}
              <span className="text-teal-500">Popularity: </span>{" "}
              {movieData.popularity}
            </li>
            <li>
              {" "}
              <span className="text-teal-500">Vote Count: </span>{" "}
              {movieData.vote_count}
            </li>
            <li>
              {" "}
              <span className="text-teal-500">Vote Average: </span>{" "}
              {movieData.vote_average}
            </li>
            <li>
              {" "}
              <span className="text-teal-500">Release Date: </span>{" "}
              {movieData.release_date}
            </li>
            <li>
              {" "}
              <span className="text-teal-500">Language Original: </span>{" "}
              {movieData.original_language}
            </li>
            <li className="text-left text-ellipsis">
              {" "}
              <span className="text-teal-500">Overview: </span>{" "}
              {movieData.overview}
            </li>
          </ul>
        </div>
        <div className=" text-slate-300 text-sm pt-2 flex justify-around items-center ml-4 m-1 bottom-0 ">
          @copyrights moviemania 2023 | created by @roziisho
        </div>
      </section>
    </div>
  );
}
// 315162
export default Video;

export async function getServerSideProps({ params }: any) {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${API_KEY}&language=en-US`
    );

    const req = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&language=en-US'`
    );

    const body = await req.json();

    const data = await request.json();

    return {
      props: {
        movie: data,
        body: body,
      },
    };
  } catch (error) {
    return { props: { error: error } };
  }
}
