import React from 'react'

const MoviePoster = ({ movie, catagorie, index }) => {
    return (
        <abbr title={movie.title} key={`${catagorie.title}_${index}`} id={`${catagorie.title}_${index}`} className=' flex flex-col items-center gap-y-5 hover:brightness-50 cursor-pointer'>

            <img src={movie.poster_path} alt={movie.title} className='max-w-[150px] xl:max-w-[250px] rounded-3xl' />

        </abbr>
    )
}

export default MoviePoster
