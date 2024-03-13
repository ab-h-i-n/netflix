
import React, { useEffect, useState } from 'react'


const MovieDescription = ({ movie }) => {


    const [genres, setGenres] = useState();

    const TitlenValue = ({ title, value }) => {

        return <>

            <div className='inline-flex flex-col items-center'>

                <h1 className='text-xs font-medium text-zinc-400'>{title}</h1>
                <p className='text-sm font-semibold text-zinc-100 text-center'>{value}</p>

            </div>

        </>

    }

    useEffect(() => {
        setGenres(movie?.genres);
    }, [movie])

    return (
        <div className='px-10 pt-5 grid gap-y-5'>

            {/* buttons  */}

            <div className='flex items-center justify-between'>

                {/* add to list icon  */}
                <img src="/assets/plus_icon.svg" alt="Add to List" className='w-8 ' />

                {/* share icon  */}
                <img src="/assets/share_icon.svg" alt="Share" className='w-7 ' />

            </div>

            {/* heading  */}

            <h1 className='text-center font-semibold text-xl px-[50px] uppercase'>{(movie?.title || movie?.name)}</h1>

            {/* genres  */}

            <div className='flex items-center justify-center text-xs font-medium text-zinc-400'>
                {
                    genres?.slice(0, 3).map((genre, index) => (

                        <p key={`desc_`+movie.id+genre+index} className='mr-2'>{genre?.name}{index !== genres.length - 1 && (",")}</p>

                    ))
                }
            </div>

            {/* rating  */}

            <div className='flex justify-center items-center gap-2'>
                <img src='/assets/star_icon.svg' alt="Rating" className='w-7' />
                <p className='font-medium text-lg text-red-600'>{parseFloat(movie?.vote_average.toFixed(2))}</p>
            </div>


            {/* year country and length  */}

            <div className='flex items-center justify-center gap-x-10'>

                {/* year  */}

                <TitlenValue title={"Year"} value={(movie?.release_date?.split("-")[0] || movie?.first_air_date?.split("-")[0])} />

                {/* Country  */}

                <TitlenValue title={"Country"} value={(movie?.production_countries[0].name || movie?.origin_country)} />

                {/* Length  */}

                <TitlenValue title={"Length"} value={(movie?.runtime || movie?.episode_run_time[0]) + 'Min'} />

            </div>

            {/* overview  */}

            <p className='text-justify leading-6 tracking-wide'>{movie?.overview}</p>

        </div>
    )
}

export default MovieDescription
