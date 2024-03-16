import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuBar from "./MenuBar";
import { supabase } from "../SupaBase";
import SubmitBtn from "./SubmitBtn";
import ProfileBtn from "./ProfileBtn";

const HomeNav = ({ hasBack }) => {
  const navigate = useNavigate();
  const [isMenuActive, setMenuActive] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuActive]);


  const handleSignOut = () => {
    supabase.auth
      .signOut()
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.log("Error signing out", error);
      });
  };

  return (
    <nav
      className={` nav w-full flex justify-between px-5 py-8 items-center bg-transparent lg:px-32 `}
    >
      {hasBack ? (
        // Back button
        <button
          onClick={handleGoBack}
          className="p-2 hover:bg-[#7a7a7a33] rounded-xl"
        >
          <img
            src="/assets/chevron_left.svg"
            alt="Back"
            className="w-7 lg:w-10"
          />
        </button>
      ) : (
        // Hamburger button
        <button
          onClick={() => setMenuActive(true)}
          className="p-2 hover:bg-[#7a7a7a33] rounded-xl lg:hidden"
        >
          <img
            src="/assets/hamburger_icon.svg"
            alt="Hamburger"
            className="w-7 lg:w-10"
          />
        </button>
      )}

      {/* logo */}
      <Link to="/">
        <img src="/assets/main_logo.svg" className="w-24 md:w-40" alt="logo" />
      </Link>

      <div className="flex gap-x-10 items-center">
        {/* menu  */}

        <MenuBar isMenuActive={isMenuActive} setMenuActive={setMenuActive} />

        {/* search btn  */}
        <button className="p-2 hover:bg-[#7a7a7a33] rounded-xl">
          <img
            src="/assets/search_icon.svg"
            className="w-7 lg:w-10"
            alt="Search"
          />
        </button>

        {/* sign out button  */}

        <div onClick={handleSignOut} className="hidden lg:block">
          <SubmitBtn isLoading={false} text={"Sign Out"} />
        </div>

        {/* pofile button  */}

        <ProfileBtn/>

      </div>
    </nav>
  );
};

export default HomeNav;
