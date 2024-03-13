import React, { useEffect, useState } from 'react'
import { apiToken } from '../env'
import MoviePoster from './MoviePoster';

const SimilarMovies = ({ api }) => {
    const [movies, setMovies] = useState([]);
    const [type, setType] = useState("movie");

    useEffect(() => {

        if (api?.includes("movie")) {
            setType("movie");
        } else {
            setType("series");
        }

        const fetchSimilar = async () => {
            try {
                const response = await fetch(`${api}/similar`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${apiToken}`,
                        'Accept': 'application/json',
                    }
                });

                if (response.status === 200) {
                    const resultJson = await response.json();
                    setMovies(resultJson.results);
                } else {
                    console.error('Failed to fetch similar movies. Please try again later.');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSimilar();

    }, [api]);

    return (
        <div>

            {/* heading */}

            <h1 className='px-7 text-xl font-black '>More Like This</h1>

            {/* all movies */}
            <div className='grid grid-cols-2 gap-5 mb-5 mt-5 px-8 lg:grid-cols-5'>

                {movies.map((movie, index) => {

                    return movie?.backdrop_path !== null && (

                        <div key={`similar_${movie?.id}`} className='flex flex-col items-center gap-y-3'>

                            <MoviePoster movie={movie} type={type} />
                            <h1 className='text-center font-medium lg:text-lg'>{(movie?.name || movie?.title)}</h1>

                        </div>
                    )
                }
                )}

            </div>

        </div>
    );
}

export default SimilarMovies;
