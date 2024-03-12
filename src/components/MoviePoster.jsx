import React from 'react';
import { Link } from 'react-router-dom';

const MoviePoster = ({ movie, type }) => {
    return (


        <Link
            to={type === 'movie' ? `/movies/${movie?.title}/${movie?.id}` : `/movies/${movie?.name}/${movie.id}`}
        >
            <abbr
                title={type === 'movie' ? movie?.title : movie?.name}
                key={`${movie?._id}`}
                id={`${movie?._id}`}
                className=' inline-flex flex-col items-center gap-y-5 hover:brightness-50 cursor-pointer'
            >
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt={type === 'movie' ? movie?.title : movie?.name}
                    className='max-w-[150px] xl:max-w-[250px] rounded-md'
                />
            </abbr>
        </Link>


    );
};

export default MoviePoster;
