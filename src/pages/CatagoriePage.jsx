import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import MoviePoster from '../components/MoviePoster';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MovieCatagories } from '../MovieCatagories';
import { apiKey, apiToken } from '../env';
import CardCarousel from '../components/CardCarousel';
import HomeNav from '../components/HomeNav';
import PageChangeBtn from '../components/PageChangeBtn';

function CatagoriePage() {
    const { id } = useParams();

    const [isLoading, setLoading] = useState(false);
    const [movies, setMovies] = useState();
    const [maxPage, setMaxPage] = useState();

    const [page, setPage] = useState(1);

    const Catagorie = MovieCatagories.find(cat => cat.catagorie_path === id);

    const apiFetchUrl = `${Catagorie.catagorie_url}${apiKey}&language=en-US&page=${page}`;

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
                setMovies(resultJson.results);
                setMaxPage(resultJson.total_pages);

            } else {
                console.error('Failed to fetch movies. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            console.error('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
            window.scrollTo(0, 0);
        }
    };



    useEffect(() => {

        fetchMovies();

        console.log(page);

    }, [page]);



    return <>
        {
            isLoading ? <LoadingPage /> :
                (

                    <div className='min-h-screen text-white'>


                        <HomeNav hasBack={true} />

                        <CardCarousel apiUrl={Catagorie.catagorie_url} />

                        {/* all movies  */}

                        <div className='grid grid-cols-2 gap-5 mb-5 mt-5 px-8 lg:grid-cols-5'>
                            {
                                movies?.map((movie, index) => {

                                    return (
                                        <div key={`catagorie_${movie?.id}`} className='flex flex-col items-center gap-y-3'>
                                            <MoviePoster movie={movie} type={Catagorie.type} isLoading={isLoading} />
                                            <h1 className='text-center font-medium lg:text-lg'>{Catagorie.type === "movie" ? `${movie?.title}` : `${movie?.name}`}</h1>
                                        </div>
                                    )

                                })
                            }
                        </div>

                        <PageChangeBtn page={page} setPage={setPage} maxPage={maxPage} />

                    </div>

                )
        }
    </>
}


export default CatagoriePage
