import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import requests from "@/utils/requests";
import { Movie } from "@/typings";
import Row from "@/components/Row";
import Banner from "@/components/Banner";
import logo from "../images/logo.svg";
import logo2 from "../images/moviemania-low-resolution-logo-white-on-transparent-background.png";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  // products: Product[];
}

export default function Home({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) {
  // console.log(netflixOriginals);
  return (
    <section className="w-[full] h-[full]">
      <Head>
        <title>Movie Mania</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" bg-gray-900 h-[80rem] w-[full] overflow-x-hidden  overflow-y-scroll flex flex-col  ">
        <div className=" text-slate-300 text-2xl pt-2 flex items-center ml-4 m-1">
          <Image src={logo2} alt="logo" width={150} height={150} />
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="absolute top-100 bottom-0 h-[6rem] w-full  bg-gray-900 bg-opacity-50"></div>
          <Banner posterPath={trendingNow} />
          <Row title={"Top rated"} movies={topRated} />
          <Row title={"Trending now "} movies={trendingNow} />
          <Row title={"Romance"} movies={romanceMovies} />
          <Row title={"Netflix originals "} movies={netflixOriginals} />
          <Row title={"Comedy"} movies={comedyMovies} />
          <Row title={"Action"} movies={actionMovies} />
          <Row title={"Horror"} movies={horrorMovies} />
        </div>
        <div className=" text-white"></div>
        <div className={styles.center}></div>
      </main>
    </section>
  );
}

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
  ]);
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
    },
  };
};
