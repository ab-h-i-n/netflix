import React from 'react'

const Tv = (props) => {
  return (
    <>
      <div className={`flex flex-col items-center mt-10`}>

        {/* tv outline  */}

        <div className="bg-gradient-to-b from-zinc-900 to-zinc-800 p-2 rounded">
          <video
            autoPlay
            loop
            muted
            className=" h-[140px] md:h-[300px] w-full rounded"
          >
            <source
              src={props.src}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* tv stand  */}

        <div className="flex flex-col items-center relative">

          {/* stand  */}

          <div className="bg-gradient-to-b from-zinc-950 to-zinc-800 h-10 w-5"></div>

          {/* base  */}

          <div className="w-40 h-5 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded shadow-xl shadow-black"></div>

          {/* tv remote  */}

          <img src="/assets/tv-remote.png" className='absolute w-32 drop-shadow-xl shadow-black translate-x-[180px] translate-y-[-65px] brightness-[80%]' />

        </div>


      </div>
    </>
  )
}

export default Tv
