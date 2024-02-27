import React, { useEffect, useState } from "react";
import VedioCard from "../components/vedioCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function Home({ handleValueChange }) {

  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();
  const [usrData, setUsrData] = useState();

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    try {

      const userData = secureLocalStorage.getItem('user');
      setUsrData(userData);

      if (userData) {
        setLoggedIn(true);
      }

    } catch (error) {

      console.error("Error retrieving user data:", error);

    }
    
  }, []);

  const handleChange = (e) => {

    setNewEmail(e.target.value);

  }

  const handleSubmit = (e) => {

    handleValueChange(newEmail);

    e.preventDefault();

    navigate('/signup');

  }


  return (
    <>
      <div className="netback ">

        <Navbar links="true" />

        {/* Home contents   */}

        <div className="py-24  md:py-44 h-full text-white grid place-items-center gap-y-5">

          {/* heading  */}

          <h1 className="my-3 font-black text-4xl text-center md:text-5xl">Unlimited movies, TV shows and more</h1>

          {/* sub heading  */}

          <p className="text-lg md:text-2xl">Watch anywhere. Cancel anytime.</p>

          {/* welcomming user  */}

          <p className={`${isLoggedIn ? '' : 'hidden'} capitalize text-2xl flex gap-x-2 items-center`}>Welcome <span className="text-red-600 text-3xl">{isLoggedIn ? usrData.user.user_metadata.full_name : ''}</span></p>

          {/* sub sub heading  */}

          <p className={`${isLoggedIn ? 'hidden' : ''} text-lg text-center px-10 md:px-0 md:text-xl`}>Ready to watch? Enter your email to create or restart your membership.</p>

          {/* inputs  */}

          <form onSubmit={handleSubmit} className={` ${isLoggedIn ? 'hidden' : ''} flex flex-col items-center gap-y-5 md:flex-row md:gap-x-5`}>

            {/* email box  */}

            <input onChange={handleChange} className="bg-[#222222b8] py-4 px-3 rounded border border-zinc-700 w-80 md:w-96" type="email" placeholder="Email address" required />

            {/* get started button  */}

            <button type="submit" className="bg-red-600 px-4 transition-all py-3.5 rounded text-xl hover:bg-red-700">

              <p className="font-medium">Get Started {`>`}</p>

            </button>

          </form>

        </div>
      </div>

      <VedioCard />
    </>
  );
}

export default Home;
