import React, { useEffect, useState } from 'react'
import Tv from './Tv'

const VedioCard = () => {

    const [movieList, setMoiveList] = useState([]);

    useEffect(() => {
        fetch('https://6587d02290fa4d3dabf92599.mockapi.io/movielist')
            .then(response => response.json())
            .then(json => setMoiveList(json))
            .catch(error => console.error(error));
    }, []);



    return (
        <div>

            {
                movieList.slice(0,6).map((movie, index) => (

                    <div key={movie.id} id={movie.id} className={`gap-y-5 border-t-8 border-zinc-700 bg-zinc-950 px-20 py-10 text-white grid grid-cols-1 md:grid-cols-2 place-items-center `}>

                        <Tv src={movie.video_url} />

                        {/* heading  and description*/}

                        <div className={`grid gap-y-5  ${index % 2 === 0 ? '' : 'md:order-first'} `}>
                            {/* heading  */}

                            <h1 className='text-3xl text-center md:text-left'>{movie.heading}</h1>

                            {/* paragraph  */}

                            <p>{movie.description}</p>

                        </div>

                    </div>

                ))
            }

        </div>
    )
}

export default VedioCard
