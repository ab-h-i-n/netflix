import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Btn(props) {

  const [btnActive, setBtnActive] = useState(false);

  return (
    <div>
      <Link to={props.link} onClick={() => setBtnActive(!btnActive)} className={`bg-red-600 transition text-sm text-white font-medium py-[7.5px] px-4 rounded  hover:bg-red-700`}>
        {props.text}
      </Link>
    </div>
  )
}

export default Btn