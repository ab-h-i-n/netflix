import React, { useState } from "react";
import VedioCard from "../components/vedioCard";
import Navbar from "../components/Navbar";
import Tv from "../components/Tv";

function Home() {

  const [active, setActive] = useState(false);
  const [netflixVer, setNetflixVer] = useState(0);

  return (
    <>
      <div className="netback ">

        <Navbar />

        {/* Home contents   */}

        <div className="py-20 h-full text-white ">
          {/* sub heaing 

            <p className={`font-light text-lg md:text-3xl flex justify-center gap-x-4`}>
              Welcome Back to <p onClick={()=>{
              setActive(!active)
              setNetflixVer(netflixVer + 1)
            }} className={` text-${ active ? 'red-500'  : 'white' } select-none cursor-pointer`}>Netflix {netflixVer}.0</p>
   
            </p> */}

          {/* heading  */}

          <h1 className="my-3 font-black text-center text-4xl md:text-6xl">
            Unlimited movies, TV shows and more
          </h1>

          {/* sub heading  */}

          <p className="font-light text-lg md:text-3xl flex justify-center gap-x-4">Watch anywhere. Cancel anytime.</p>

          {/* vedio container  */}

          <Tv src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"/>

        </div>
      </div>

      <VedioCard />
    </>
  );
}

export default Home;
