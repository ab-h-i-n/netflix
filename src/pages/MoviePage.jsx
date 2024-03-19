import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { apiKey, apiToken } from "../env";
import MovieNav from "../components/MovieNav";
import MovieDescription from "../components/MovieDescription";
import SimilarMovies from "../components/SimilarMovies";
import TrailerCard from "../components/TrailerCard";
import ReviewBox from "../components/ReviewBox";

const MoviePage = () => {
  const { id, title } = useParams();
  const [type, setType] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [movie, setMovie] = useState();
  const [playState, setPlayState] = useState(false);
  const [api, setApi] = useState();

  const fetchMovies = async () => {
    window.scrollTo(0, 0);
    try {
      setLoading(true);
      var apiUrl = `https://api.themoviedb.org/3/movie/${id}`;
      setApi(apiUrl);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const resultJson = await response.json();

        if (resultJson?.title != title) {
          fetchSeries();
        } else {
          setType("movie");
          setMovie(resultJson);
        }
      } else {
        fetchSeries();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSeries = async () => {
    try {
      setLoading(true);
      console.log("series");
      var apiUrl = `https://api.themoviedb.org/3/tv/${id}`;
      setApi(apiUrl);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const resultJson = await response.json();
        setMovie(resultJson);
        setType("tv");
      } else {
        console.error("Failed to fetch movies. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      console.error("An unexpected error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    fetchMovies().then(() => setLoading(false));
  }, [id]);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className=" text-white">
          <div className="sticky top-0 z-[100]">
            <MovieNav />
          </div>

          <div className="relative">
            {/* trailer  */}

            <div className="backdrop-clip bottom-[3px] absolute z-[50] ">
              <TrailerCard playState={playState} type={type} />
            </div>

            {/* backdrop img  */}

            {movie && (
              <div className="relative">
                <div
                  className={`backdrop-clip relative w-full lg:max-h-[600px] lg:object-cover rounded overflow-clip `}
                >
                  <div className="carousel-bg w-screen h-full absolute bottom-0 opacity-60 "></div>
                  <img
                    className="object-cover min-h-[430px] w-full"
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    alt={movie?.title || movie?.name}
                  />
                </div>

                {/* play button  */}

                <button
                  onClick={() => setPlayState(!playState)}
                  className="p-4 bg-zinc-900 hover:bg-zinc-800 rounded-full absolute bottom-[-25px] lg:bottom-[-50px] z-[50] left-[50%] translate-x-[-50%] shadow-lg shadow-black"
                >
                  <img
                    src={`/assets/${
                      playState ? "pause_icon.svg" : "play_icon.svg"
                    }`}
                    alt="Play"
                    className="w-8 lg:w-20"
                  />
                </button>
              </div>
            )}
          </div>

          {/* movie details  */}

          <div className="sticky z-[0] bg-zinc-950">
            <MovieDescription movie={movie} />
          </div>

          {/* movie reviews  */}

          <ReviewBox />

          {/* more like this  */}

          <div className="mt-5 lg:mt-8">
            <SimilarMovies api={api} />
          </div>
        </div>
      )}
    </>
  );
};

export default MoviePage;
