import React, { useEffect, useState, useRef } from 'react';
import { apiKey, apiToken } from '../env';
import { MovieCatagories } from '../MovieCatagories';


const CardCarousel = ({ apiUrl }) => {

  const [isLoading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const [topMovies, setTopMovies] = useState([]);
  const apiFetchUrl = `${apiUrl}${apiKey}&language=en-US&page=1`;

  const Catagorie = MovieCatagories.find(cat => cat.catagorie_url === apiUrl);

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
        setTopMovies(resultJson.results.slice(0, 5));
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
    setLoading(false);

    // Initialize the intervalId variable
    let intervalId;

    // Scroll the contents to their width after every 3 seconds
    intervalId = setInterval(() => {
      carouselRef.current.scrollLeft += window.innerWidth;

      if (carouselRef?.current.scrollLeft > (3.5 * window.innerWidth)) {
        carouselRef.current.scrollLeft = 0;
      }
    }, 3000);

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);

  }, []);


  return (
    <div className='flex justify-center '>
      <div
        ref={carouselRef}
        className='w-screen xl:h-[700px]  grid grid-flow-col overflow-x-hidden snap-x scroll-smooth'
      >
        {isLoading ? (
          <div className='rounded-md w-screen h-[430px] xl:w-[80vw] img-loading bg-zinc-900'></div>
        ) : (
          topMovies?.map((movie, index) => (
            <div key={`carousel_${movie?.id}`}
              className='relative snap-start w-screen xl:object-cover rounded overflow-hidden'
            >
              <div className="carousel-bg w-screen h-full absolute bottom-0"></div>

              <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={Catagorie.type === "movie" ? `${movie?.title}` : `${movie?.name}`} className='object-cover min-h-[430px] w-screen' />

              <div className="absolute bottom-10 left-5 z-50 grid lg:gap-y-3 lg:left-20 lg:bottom-20">
                <p className='font-medium text-red-600 md:text-xl lg:text-2xl'>#Trending {index + 1}</p>
                <h1 className='font-bold text-3xl lg:text-6xl lg:bottom-20 lg:left-20 max-w-2xl'>{Catagorie.type === "movie" ? `${movie?.title}` : `${movie?.name}`}</h1>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardCarousel;
