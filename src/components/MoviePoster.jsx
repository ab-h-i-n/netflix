import React from 'react'
import { Link } from 'react-router-dom'

const MoviePoster = ({ movie }) => {
    return (
        <Link to={`/${movie?.title}`}>
            <abbr title={movie?.title} key={`${movie?._id}`} id={`${movie?._id}`} className=' inline-flex flex-col items-center gap-y-5 hover:brightness-50 cursor-pointer'>

                <img src={movie?.poster_path} alt={movie?.title} className='max-w-[150px] xl:max-w-[250px] rounded-3xl' />

            </abbr>
        </Link>
    )
}

export default MoviePoster
