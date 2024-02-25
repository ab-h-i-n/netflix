import React from 'react'

const Tv = (props) => {
  return (
    <>
      <div className={`grid place-items-center mt-10`}>
            <div className="bg-zinc-900 p-5 rounded-3xl">
              <video
                autoPlay
                loop
                muted
                className=" h-[140px] md:h-[300px] w-full rounded-xl"
              >
                <source
                  src={props.src}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="bg-zinc-900 mt-5 w-36 h-7 rounded-3xl"></div>
          </div>
    </>
  )
}

export default Tv
