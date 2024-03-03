import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CardCarousel from '../components/CardCarousel';
import LoadingPage from './LoadingPage';

const HomePage = ({ usrData }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://movies-api14.p.rapidapi.com/shows', {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'f2055b719emsh7754c7e9e4be2d9p13156bjsn1f4dcd30da2a',
                    'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
                }
            });

            if (response.status === 200) {
                const resultJson = await response.json();
                setMovies(resultJson.movies);
            } else {
                setError('Failed to fetch movies. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className='min-h-screen bg-zinc-900 text-white'>
            <Navbar usrData={usrData} links="true" />

            {isLoading ? <LoadingPage /> : error ? (
                <div className="text-white text-center mt-4">{error}</div>
            ) : (
                <div className='grid grid-cols-2 gap-x-5 px-4 gap-y-5 md:grid-cols-3 md:px-10 lg:grid-cols-4 lg:px-14 xl:gap-y-20  xl:px-20 xl:grid-cols-6'>
                    {movies?.map((movie) => (
                        <div key={movie._id} id={movie._id} className='flex gap-y-5 flex-col items-center'>
                            <img src={movie.poster_path} alt={movie.title} className='h-[250px] xl:h-[300px] rounded-3xl' />
                            <h1 className='w-full text-center flex justify-center'>{movie.title}</h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
