import React from 'react'
import './SubmitBtnLoader.css'

const SubmitBtn = ({ text, isLoading }) => {
    return (
        <>
            <button
                type="submit"
                className=" w-full text-white bg-red-600 hover:bg-red-500  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                {isLoading ?
                    <span className="submitloader"></span> :
                    text
                }
            </button>
        </>
    )
}

export default SubmitBtn
