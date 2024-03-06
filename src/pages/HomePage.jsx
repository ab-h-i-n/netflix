import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CardCarousel from '../components/CardCarousel';
import LoadingPage from './LoadingPage';

const HomePage = ({ usrData }) => {
    const [catagories, setCatagories] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://65e48c823070132b3b24e9dc.mockapi.io/home');

            if (response.status === 200) {
                const resultJson = await response.json();
                setCatagories(resultJson);
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

    const topMovies = catagories[0]?.movies.slice(0,5);

    return (
        <div className='min-h-screen text-white'>

            {/* all */}

            <div className='bg-[#120f0f]'>

                <div className='bg-zinc-950'><Navbar usrData={usrData} links="true" /></div>

                {isLoading ? <LoadingPage /> :

                    <>
                        <CardCarousel topMovies={topMovies} />

                        <div className='grid gap-y-5 mt-5 xl:px-20'>
                            {catagories?.map((catagorie, index) => (

                                <div key={`catogorie_${index}`} id={`catogorie_${index}`} className='py-5 px-3 flex gap-y-5 flex-col max-w-screen overflow-x-hidden'>

                                    {/* catogorie titile */}

                                    <h1 className='w-full text-red-600 bg-zinc-950 py-3 px-5 text-xl font-black xl:text-2xl rounded'>{catagorie.title}</h1>

                                    {/* movies list */}

                                    <div className=" flex gap-x-5 overflow-x-scroll xl:grid xl:grid-cols-5 xl:overflow-x-hidden xl:gap-y-10 xl:gap-x-10">

                                        {catagorie.movies.map((movie, index) => {

                                            return (
                                                <abbr title={movie.title} key={`${catagorie.title}_${index}`} id={`${catagorie.title}_${index}`} className='flex flex-col items-center gap-y-5 hover:brightness-50 cursor-pointer'>

                                                    <img src={movie.poster_path} alt={movie.title} className='max-w-[150px] xl:max-w-[250px] rounded-3xl' />

                                                </abbr>
                                            )


                                        })}

                                    </div>

                                </div>
                            ))}
                        </div>
                    </>

                }
            </div>

        </div>
    );
};

export default HomePage;
