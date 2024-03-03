import React, { useEffect, useState, useRef } from 'react';
import LoadingPage from '../pages/LoadingPage';

const CardCarousel = ({ topMovies }) => {
  const [isLoading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (topMovies?.length > 0) {
      setLoading(false);

      // Scroll the contents to their width after every 3 seconds
      const intervalId = setInterval(() => {

        carouselRef.current.scrollLeft += window.innerWidth;

        if (carouselRef.current.scrollLeft > (3 * window.innerWidth)) {
          carouselRef.current.scrollLeft = 0;
        }
      }, 3000);

      // Clear the interval on component unmount to avoid memory leaks
      return () => clearInterval(intervalId);

    } else {
      setLoading(true);
    }
  }, [topMovies]);

  return (
    <div className='flex justify-center'>
      <div
        ref={carouselRef}
        className='w-screen xl:w-[80vw] xl:h-[600px]  grid grid-flow-col overflow-x-hidden snap-x'
      >
        {isLoading ? (
          <div className='flex items-center justify-center h-[239px] w-screen xl:w-[80vw]'>
            <span className="loader"></span>
          </div>
        ) : (
          topMovies.map((movies) => (
            <div
              key={movies.id}
              className='bg-gradient-to-b from-[#ffffff30] to-[#000000db] xl:to-black relative snap-start w-screen xl:w-[80vw] bg-zinc-800 rounded overflow-hidden'
            >
              <img src={movies.backdrop_path} alt={movies.title} className='w-full mix-blend-overlay' />

              <h1 className='absolute bottom-10 left-5 z-50 font-bold text-3xl lg:text-6xl lg:bottom-20 lg:left-20 max-w-2xl'>{movies.title}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardCarousel;
