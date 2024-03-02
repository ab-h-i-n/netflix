import React from 'react'
import './LoadingPage.css'

const LoadingPage = () => {
    return (
        <div className='fixed top-0 z-50 w-screen h-screen flex items-center justify-center bg-zinc-900'>
            <span className="loader"></span>
        </div>
    )
}

export default LoadingPage