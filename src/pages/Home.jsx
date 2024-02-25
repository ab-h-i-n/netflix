import React, { useState } from "react";
import VedioCard from "../components/vedioCard";

function Home() {

   const [active, setActive] = useState(false);
   const [netflixVer,setNetflixVer] = useState(0);

  return (
    <div>


      {/* Home contents   */}

      <div className="pt-6 min-h-screen text-white">
        {/*sub heaing  */}

        <p className={`font-light text-lg md:text-3xl flex justify-center gap-x-4`}>
          Welcome Back to <p onClick={()=>{
          setActive(!active)
          setNetflixVer(netflixVer + 1)
        }} className={` text-${ active ? 'red-500'  : 'white' } select-none cursor-pointer`}>Netflix {netflixVer}.0</p>
         
        </p>

        {/* heading  */}

        <h1 className="mt-3 font-black text-center text-4xl md:text-6xl">
          Unlimited movies, TV shows and more
        </h1>

        {/* vedio container  */}

        <div className="grid place-items-center mt-10">
          <div className="bg-zinc-900 p-5 rounded-3xl">
            <video
              autoPlay
              loop
              muted
              className=" h-[140px] md:h-[300px] w-full rounded-xl"
            >
              <source
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="bg-zinc-900 mt-5 w-40 h-10 rounded-3xl"></div>
        </div>

        <VedioCard />

      </div>
    </div>
  );
}

export default Home;
