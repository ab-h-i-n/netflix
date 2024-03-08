import ArrowBack from '@mui/icons-material/ArrowBack'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import MoviePoster from '../components/MoviePoster';

const MoviePage = () => {

    const { id } = useParams();

    const [isLoading, setLoading] = useState(false);
    const [catagorie, setCatagorie] = useState();
    const [movie, setMovie] = useState();


    const fetchMovies = async () => {

        try {
            setLoading(true);
            const response = await fetch('https://65e48c823070132b3b24e9dc.mockapi.io/home');

            if (response.status === 200) {
                const resultJson = await response.json();

                const resultCatagorie = resultJson.find(catagorie => catagorie.movies.find(movie => movie.title === id));

                setCatagorie(resultCatagorie);

                const result = resultCatagorie.movies.find(movie => movie.title === id);

                setMovie(result);


            } else {
                console.error('Failed to fetch movies. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            console.error('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchMovies();

    }, [id]);

    return <>

        {
            isLoading ? <LoadingPage /> :

                <div className='min-h-screen text-white'>

                    {/* header  */}

                    <header className='p-5 fixed top-0 w-full z-50'>
                        <Link to={'/'}><ArrowBack style={{ fontSize: '2rem' }} /></Link>
                    </header>

                    {/* backdrop image  */}

                    <div className='relative xl:h-[700px] overflow-hidden'>
                        <h1 className='font-bold text-3xl max-w-sm lg:max-w-3xl lg:text-6xl lg:bottom-20 lg:left-20  absolute p-5 bottom-0 z-50 '>{movie?.title}</h1>
                        <div className="carousel-bg w-screen h-full absolute bottom-0 opacity-50"></div>
                        <img src={movie?.backdrop_path.includes('null') ? movie?.poster_path : movie?.backdrop_path} alt={movie?.title} className='object-cover w-full min-h-[430px] ' />
                    </div>

                    {/* details  */}

                    <div className='py-10 px-5 flex gap-x-5 lg:px-40 lg:gap-x-20'>

                        {/* poster  */}
                        <MoviePoster movie={movie} />

                        {/* data  */}

                        <div className='flex flex-col justify-center gap-y-5 '>
                            {/* Realse date  */}

                            <span className='text-red-600 font-black text-base lg:text-2xl'>Release Date : <span className='text-white font-medium text-sm lg:text-xl'>{movie?.release_date}</span></span>
                            <span className='text-red-600 font-black text-base lg:text-2xl'>Genres :
                                <div className='flex flex-col gap-y-2'>
                                    {
                                        movie?.genres.map((genre, index) => (
                                            <span key={`genre_${index}_${movie?._id}`} className='text-white font-medium text-sm lg:text-xl'>{genre}</span>
                                        ))
                                    }
                                </div>
                            </span>
                        </div>

                    </div>

                    {/* overview  */}

                    <div className='p-5 lg:px-40'>
                        <h1 className='text-red-600 font-black text-xl lg:text-4xl'>Overview</h1>

                        <p className='p-2 leading-8 text-justify lg:text-xl lg:leading-10'>{movie?.overview}</p>

                    </div>

                    {/* more like this  */}

                    <div className='p-5 lg:px-40'>
                        <h1 className='text-red-600 font-black text-xl lg:text-4xl'>More Like This</h1>

                        {/* more based on catagorie  */}

                        <div className='grid grid-cols-2 place-items-center py-5 gap-5 lg:grid-cols-5'>
                            {
                                catagorie?.movies.map((movie) => {

                                    return (
                                        <div key={`more_${movie._id}`} className=' flex flex-col items-center gap-y-3'>
                                            <MoviePoster  movie={movie} />
                                            <h1 className='text-center font-medium lg:text-lg'>{movie.title}</h1>
                                        </div>
                                    )

                                })
                            }
                        </div>

                    </div>

                </div>
        }
    </>
}

export default MoviePage
