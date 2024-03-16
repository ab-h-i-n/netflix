import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllMoviesMock = () => {

  const [movies, setMovies] = useState();

  const MoviePosterM = ({ movie }) => {
    return (
      <Link
        to={''}
      >
        <abbr
          title={ movie?.title}
          key={`${movie?.id}`}
          id={`${movie?.id}`}
          className=" inline-flex flex-col items-center gap-y-5 hover:brightness-50 cursor-pointer"
        >
          <img
            src={`${movie?.poster_path}`}
            alt={movie?.title}
            className="max-w-[150px] xl:max-w-[250px] rounded-md"
          />
        </abbr>
        {/* movie name  */}
        <h1 className="text-white text-center">{movie?.title}</h1>
      </Link>
    );
  };

  const fetchMovies = async () => {
    try {
      const responce = await fetch(
        "https://65e48c823070132b3b24e9dc.mockapi.io/movies"
      );

      const responceJSON = await responce.json();

      console.log(responceJSON);
      setMovies(responceJSON);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1  className="text-2xl p-5 font-black text-white text-center">All Movies</h1>
      <div className="grid grid-cols-2 gap-5 px-10 place-content-center lg:grid-cols-5">
      {
        movies?.map((movie)=>(
            <MoviePosterM movie={movie} />
        ))
      }
      </div>
    </div>
  );
};

export default AllMoviesMock;
