import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CardCarousel from '../components/CardCarousel';
import LoadingPage from './LoadingPage';
import { Link } from 'react-router-dom';
import MoviePoster from '../components/MoviePoster';


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

    const topMovies = catagories[0]?.movies.slice(0, 5);

    return (
        <div className='min-h-screen text-white'>

            {/* all */}

            <div >

                <div className='bg-transparent absolute top-0 z-[100] w-full'><Navbar usrData={usrData} /></div>

                {isLoading ? <LoadingPage /> :

                    <>
                        <CardCarousel topMovies={topMovies} />

                        <div className='grid gap-y-10 my-10'>
                            {catagories?.map((catagorie, index) => (

                                <div key={`catogorie_${index}`} id={`catogorie_${index}`} className=' flex gap-y-5 flex-col max-w-screen overflow-x-hidden'>

                                    {/* title and see more button  */}

                                    <div className="flex justify-between items-center w-full px-5  xl:px-20">

                                        {/* catogorie titile */}

                                        <h1 className='  text-xl font-black lg:text-3xl max-w-[200px] xl:max-w-full'>{catagorie.title}</h1>

                                        {/* show more button  */}

                                        <Link to={`/home/catagories/${catagorie.title}`} className='transition-all  text-red-600 text-basis font-black lg:text-xl p-2 rounded hover:bg-zinc-800 '>Show More</Link>

                                    </div>

                                    {/* movies list */}

                                    <div className="px-5 flex gap-x-5 overflow-x-scroll xl:px-20 xl:overflow-x-hidden xl:gap-y-10 xl:gap-x-10">

                                        {catagorie.movies.slice(0, 6).map((movie, index) => {

                                            return (
                                                <MoviePoster movie={movie} catagorie={catagorie} index={index}/>
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
