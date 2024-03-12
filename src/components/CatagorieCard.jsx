import React, { useEffect, useState } from 'react';
import { apiKey, apiToken } from '../env';
import { Link, useNavigate } from 'react-router-dom';
import MoviePoster from './MoviePoster';
import LoadingPage from '../pages/LoadingPage';


const CatagorieCard = ({ apiUrl, CatagorieTitle, pagePath, type }) => {

    const navigate = useNavigate();


    const [catagorie, setCatagorie] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const apiFetchUrl = `${apiUrl}${apiKey}&language=en-US&page=1`;

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch(apiFetchUrl,
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${apiToken}`,
                        'Accept': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                const resultJson = await response.json();
                setCatagorie(resultJson.results);
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


    return (


        <div className='flex gap-y-5 flex-col max-w-screen overflow-x-hidden'>



            {/* title and see more button  */}

            {isLoading ? (
                <LoadingPage/>
            ) :
                (
                    <>
                        <div className="flex justify-between items-center w-full px-5  xl:px-20">

                            {/* catogorie titile */}

                            <h1 className='  text-xl text-white font-black lg:text-3xl max-w-[200px] xl:max-w-full'>{CatagorieTitle}</h1>

                            {/* show more button  */}

                            <button onClick={() => navigate(`/catagories/${pagePath}`)} className=' transition-all lg:text-xl p-2 rounded hover:bg-zinc-800 '>
                                <img src="/assets/chevron_right.svg" alt="Show More" className='w-5 lg:w-8' />
                            </button>

                        </div>

                        {/* movies list */}

                        <div className="scroll-hidden px-5 flex gap-x-3 overflow-x-scroll xl:px-20 xl:overflow-x-hidden xl:gap-y-10 xl:gap-x-10">

                            {catagorie?.slice(0, 6).map((movie, index) => {

                                return (
                                    <MoviePoster key={`poster_${movie.id}`} movie={movie} type={type} />
                                )


                            })}


                        </div>
                    </>
                )
            }

        </div>


    );
};

export default CatagorieCard;
