import React from 'react'
import { Link } from 'react-router-dom'


function Btn(props) {
  return (
    <div>
        <Link to={props.link} className='transition border-2 border-red-800 text-white font-medium py-2 px-3 rounded-lg  hover:bg-red-600'>
            {props.text}
        </Link>
    </div>
  )
}

export default Btn