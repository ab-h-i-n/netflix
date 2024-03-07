import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function WelcomePage({ UsrForm }) {

  const { handleMailChange } = UsrForm;

  const navigate = useNavigate();

  const handleMailSubmit = (e) => {

    e.preventDefault();

    navigate('/signup');

  }

  return (
    <>

      <div className="netback ">

        <Navbar links="true"/>

        {/* WelcomePage contents   */}

        <div className="py-24  md:py-44 h-full text-white grid place-items-center gap-y-5">

          {/* heading  */}

          <h1 className="my-3 font-black text-4xl text-center md:text-5xl">Unlimited movies, TV shows and more</h1>

          {/* sub heading  */}

          <p className="text-lg md:text-2xl">Watch anywhere. Cancel anytime.</p>
   
          {/* sub sub heading  */}

          <p className={` text-lg text-center px-10 md:px-0 md:text-xl`}>Ready to watch? Enter your email to create or restart your membership.</p>

          {/* inputs  */}

          <form onSubmit={handleMailSubmit} className={`  flex flex-col items-center gap-y-5 md:flex-row md:gap-x-5`}>

            {/* email box  */}

            <input onChange={handleMailChange} className="bg-[#222222b8] py-4 px-3 rounded border border-zinc-700 w-80 md:w-96" type="email" placeholder="Email address" required />

            {/* get started button  */}

            <button type="submit" className="bg-red-600 px-4 transition-all py-3.5 rounded text-xl hover:bg-red-700">

              <p className="font-medium">Get Started {`>`}</p>

            </button>

          </form>

        </div>
      </div>

    </>
  );
}

export default WelcomePage;
