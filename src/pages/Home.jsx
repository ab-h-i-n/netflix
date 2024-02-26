import React from "react";
import VedioCard from "../components/vedioCard";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {

  return (
    <>
      <div className="netback ">

        <Navbar links="true" />

        {/* Home contents   */}

        <div className="py-44 h-full text-white grid place-items-center gap-y-5">

          {/* heading  */}

          <h1 className="my-3 font-black text-xl md:text-5xl">Unlimited movies, TV shows and more</h1>

          {/* sub heading  */}

          <p className="text-lg md:text-2xl">Watch anywhere. Cancel anytime.</p>

          {/* sub sub heading  */}

          <p className="text-lg md:text-xl">Ready to watch? Enter your email to create or restart your membership.</p>

          {/* inputs  */}

          <form className="inputs flex gap-x-5 items-center">

            {/* email box  */}

            <input className="bg-[#222222b8] py-4 px-3 rounded border border-zinc-700 w-96"  type="email" placeholder="Email address" required />

            {/* get started button  */}

            <Link to={'/signup'} type="submit"  className="bg-red-600 px-4 transition-all py-3.5 rounded text-xl hover:bg-red-700">

                <p className="font-medium">Get Started {`>`}</p>

            </Link>

          </form>

        </div>
      </div>

      <VedioCard />
    </>
  );
}

export default Home;
