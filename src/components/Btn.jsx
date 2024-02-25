import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Btn(props) {

  const [btnActive , setBtnActive] = useState(false);

  return (
    <div>
        <Link to={props.link} onClick={()=> setBtnActive(!btnActive)} className={`bg-zinc-900 transition border-2 border-red-800 text-white font-medium py-2 px-3 rounded-lg  hover:bg-red-600`}>
            {props.text}
        </Link>
    </div>
  )
}

export default Btn