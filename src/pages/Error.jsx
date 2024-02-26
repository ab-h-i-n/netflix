import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='h-screen overflow-hidden'>

            <Navbar />

            {/* page contents  */}

            <div className="bg-[url(https://source.unsplash.com/1600x900/?space)] w-full h-full bg-no-repeat bg-cover ">

                {/* overlay  and contents */}

                <div className="backdrop-brightness-50 px-96  w-full h-full  text-white flex flex-col items-center justify-center gap-y-10">

                    {/* heading */}

                    <h1 className='text-8xl font-black'>Lost your way ?</h1>

                    {/* sub heading  */}

                    <p className='text-4xl font-light text-center'>Sorry, we can't find that page. You'll find lots to explore on the home page.</p>

                    {/* nerflix home button  */}

                    <Link to={'/'} className=' text-black bg-white hover:bg-slate-200 rounded py-4 px-10 font-bold text-xl'>Netflix Home</Link>

                    {/* error code  */}

                    <div className="flex items-center gap-x-5">

                        {/* line  */}

                        <div className="h-20 bg-red-600 w-[3px]"></div>

                        <p className='text-white font-extralight text-4xl' >Error Code</p>

                        <p className='text-white font-bold text-4xl' >NSES-404</p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Error
