import React from 'react'
import { movieList } from '../MovieList'

const vedioCard = () => {
    return (
        <div>
                {movieList.map((movie) => {
                        console.log(movie.heading);
                })}
        </div>
    )
}

export default vedioCard