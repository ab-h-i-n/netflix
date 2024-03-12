import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MovieNav = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {

        navigate(-1);

    }

    return (
        <nav className={` nav w-full flex justify-between px-5 py-8 items-center bg-transparent lg:px-32 absolute top-0 z-50`}>


            {/* Back button */}
            <button onClick={handleGoBack} className='p-2 hover:bg-[#7a7a7a33] rounded-xl'>
                <img src="/assets/chevron_left.svg" alt="Back" className="w-7 lg:w-10" />
            </button>




            {/* logo */}
            <Link to="/">
                <img src="/assets/main_logo.svg" className="w-24 md:w-40" alt="logo" />
            </Link>


            {/* favorite btn  */}
            <button className='p-2 hover:bg-[#7a7a7a33] rounded-xl'>
                <img src="/assets/heart_outlined.svg" className='w-7 lg:w-10' alt="Add Favorite" />
            </button>

        </nav>
    )
}

export default MovieNav

