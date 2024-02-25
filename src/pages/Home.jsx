import React from "react";
import BgImg from "../components/BgImg";

function Home() {
  return (
    <div>
      <BgImg />

      {/* Home contents   */}

      <div className="pt-20 min-h-screen text-white">
        {/*sub heaing  */}

        <p className="font-light text-3xl text-center">
          Welcome Back to Netflix
        </p>

        {/* heading  */}

        <h1 className="mt-3 font-black text-center text-6xl">
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
      </div>
    </div>
  );
}

export default Home;
