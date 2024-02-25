import React from 'react'
import { movieList } from '../MovieList'

const VedioCard = () => {
    {movieList.map((movie) => {
            console.log(movie.heading);
    })}
    return (
        <div>
            {movieList.map((movie) => (<p>{movie.heading}</p>))}
        </div>
    )
}

export default VedioCard