import ArrowBack from '@mui/icons-material/ArrowBack'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import MoviePoster from '../components/MoviePoster';
import { apiKey, apiToken } from '../env';
import MovieNav from '../components/MovieNav';

const MoviePage = () => {


    const { id, title } = useParams();

    const [isLoading, setLoading] = useState(false);
    const [movie, setMovie] = useState();


    var apiUrl = `https://api.themoviedb.org/3/movie/${id}`


    const fetchMovies = async () => {

        try {
            setLoading(true);
            const response = await fetch(apiUrl,
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${apiToken}`,
                        'Accept': 'application/json',
                    }
                });

            if (response.status === 200) {

                const resultJson = await response.json();

                console.log(resultJson);

                if (resultJson?.title != title) {

                    fetchSeries();

                } else {

                    setMovie(resultJson)
                }

            }else {

                fetchSeries()
            }


        } catch (error) {

            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const fetchSeries = async () => {

        try {
            setLoading(true);
            console.log("series");
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}`,
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${apiToken}`,
                        'Accept': 'application/json',
                    }
                });

            if (response.status === 200) {
                const resultJson = await response.json();
                setMovie(resultJson)

            } else {
                console.error('Failed to fetch movies. Please try again later.');
            }


        } catch (error) {
            console.error(error);
            console.error('An unexpected error occurred. Please try again later.');
        }
    };



    useEffect(() => {
        fetchMovies();
        window.scrollTo(0, 0)

    }, [id]);

    return <>

        {
            isLoading ? <LoadingPage /> :

                <div className='min-h-screen text-white'>

                    <div className='sticky top-0 z-[100]'><MovieNav /></div>

                    {/* backdrop img  */}

                    <div className='z-[0] sticky top-0 w-screen xl:object-cover rounded overflow-hidden'>
                        <div className="carousel-bg w-screen h-full absolute bottom-0 opacity-75"></div>
                        <img className='object-cover min-h-[430px] w-screen' src={`https://image.tmdb.org/t/p/original/${movie?.adult ? " " : movie?.backdrop_path}`} alt={(movie?.title || movie?.name)} />
                    </div>

                    <div className='sticky h-screen z-[50] bg-zinc-950'></div>

                </div>
        }
    </>
}

export default MoviePage
