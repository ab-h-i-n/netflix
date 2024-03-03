import React, { useEffect, useState } from 'react';
import LoadingPage from '../pages/LoadingPage';

const CardCarousel = ({ topMovies }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (topMovies?.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [topMovies]);

  return (
    <div className='flex justify-center'>
      <div className='w-screen xl:w-[80vw] xl:h-[600px] bg-gradient-to-b from-[#ffffff30] to-[#000000db] xl:to-black grid grid-flow-col overflow-x-scroll  snap-x  '>
        {isLoading ? (
          <div className=' flex items-center justify-center h-[239px] w-screen xl:w-[80vw]'><span className="loader"></span> </div>
        ) : (
          topMovies.map((movies) => (
            <div key={movies.id} className=' mix-blend-overlay  snap-start w-screen xl:w-[80vw] bg-zinc-800 rounded overflow-hidden'>
              <img src={movies.backdrop_path} alt={movies.title} className='w-full ' />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardCarousel;
