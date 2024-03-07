import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import MoviePoster from '../components/MoviePoster';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CatagoriePage() {
    const { id } = useParams();

    const [isLoading, setLoading] = useState(false);
    const [catagories, setCatagories] = useState();


    const fetchMovies = async () => {

        try {
            setLoading(true);
            const response = await fetch('https://65e48c823070132b3b24e9dc.mockapi.io/home');

            if (response.status === 200) {
                const resultJson = await response.json();

                const result = resultJson.find(catagorie => catagorie.title === id);

                setCatagories(result);

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

    }, []);



    return <>
        {
            isLoading ? <LoadingPage /> :
                (

                    <div className='min-h-screen text-white'>

                        <header className='fixed top-0 w-full bg-black p-5 flex gap-x-5 items-center'>
                            <Link to={'/'} ><ArrowBackIcon style={{fontSize : '2rem'}} /></Link>
                            <h1 className='text-xl font-black lg:text-2xl'>{catagories?.title}</h1>
                        </header>


                        {/* all movies  */}

                        <div className='grid grid-cols-2 gap-5 mb-5 mt-24 px-2 lg:grid-cols-5'>
                            {
                                catagories?.movies.map((movie, index) => {

                                    return (
                                        <div className='flex flex-col items-center gap-y-3'>
                                            <MoviePoster key={movie.title} movie={movie} index={index} catagorie={catagories} />
                                            <h1 className='text-center font-medium lg:text-lg'>{movie.title}</h1>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    </div>

                )
        }
    </>
}


export default CatagoriePage
