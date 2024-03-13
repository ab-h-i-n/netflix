import ArrowBack from '@mui/icons-material/ArrowBack'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import MoviePoster from '../components/MoviePoster';
import { apiKey, apiToken } from '../env';
import MovieNav from '../components/MovieNav';
import MovieDescription from '../components/MovieDescription';
import SimilarMovies from '../components/SimilarMovies';

const MoviePage = () => {


    const { id, title } = useParams();

    const [isLoading, setLoading] = useState(false);
    const [movie, setMovie] = useState();

    const [api, setApi] = useState();

    const fetchMovies = async () => {

        window.scrollTo(0, 0)
        try {
            setLoading(true);
            var apiUrl = `https://api.themoviedb.org/3/movie/${id}`;
            setApi(apiUrl);
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

                if (resultJson?.title != title) {

                    fetchSeries();

                } else {

                    setMovie(resultJson)
                }

            } else {

                fetchSeries()
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
        fetchMovies().then(() => setLoading(false))

    }, [id]);


    useEffect(()=>{

        console.log(movie);

    },[movie])

    return <>

        {
            isLoading ? <LoadingPage /> :

                <div className=' text-white'>

                    <div className='sticky top-0 z-[100]'><MovieNav /></div>

                    {/* backdrop img  */}

                    {
                        movie && (

                            <div className='relative'>

                                <div className={`backdrop-clip relative w-full xl:object-cover rounded overflow-clip `}>
                                    <div className="carousel-bg w-screen h-full absolute bottom-0 opacity-75 "></div>
                                    <img className='object-cover min-h-[430px] ' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={(movie?.title || movie?.name)} />
                                </div>

                                <button className='p-4 bg-zinc-900 rounded-full absolute bottom-[-25px] z-[50] left-[50%] translate-x-[-50%] shadow-lg shadow-black'>
                                    <img src="/assets/play_icon.svg" alt="Play" className='w-8 h-8' />
                                </button>

                            </div>

                        )
                    }

                    {/* movie details  */}

                    <div className='sticky z-[0] bg-zinc-950'>

                        <MovieDescription movie={movie} />

                    </div>

                    {/* more like this  */}

                    <div className='mt-5'>
                        <SimilarMovies api={api} />
                    </div>

                </div>
        }
    </>
}

export default MoviePage
