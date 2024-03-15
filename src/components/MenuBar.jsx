import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubmitBtn from "./SubmitBtn";
import { supabase } from "../SupaBase";
import DropDown from "./DropDown";

const MenuBar = ({ isMenuActive, setMenuActive }) => {

  const [isFavOpen, setFavOpen] = useState(false);

  const MenuItems = ({ icon, text, link }) => {
    return (
      <Link
        to={link}
        className="flex items-center gap-3 p-3 hover:bg-[#7a7a7a33] rounded"
      >
        <img src={`/assets/${icon}`} alt={text} className="w-6 lg:w-8" />
        <span className="font-semibold lg:text-lg">{text}</span>
      </Link>
    );
  };

  

  const menuItemsList = [
    {
      icon: "allMovies.svg",
      text: "Movies",
      link: "/allmovies",
    },
    {
      icon: "allSeries.svg",
      text: "Series",
      link: "/allseries",
    },
  ];

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
    <>
      {/* mobile menu bar */}

      <div
        id="menu-bar-bg"
        onClick={() => setMenuActive(false)}
        className={` transition-all delay-200 fixed top-0 left-0 h-screen w-screen backdrop-blur-sm  ${
          isMenuActive
            ? "pointer-events-auto opacity-1"
            : "pointer-events-none opacity-0 "
        }`}
      >
        <div
          id="menu-bar"
          onClick={(e) => e.stopPropagation()}
          className={`transition-all delay-200 absolute top-0 left-0 h-screen w-[65vw] bg-zinc-950 divide-y-2 divide-zinc-900 ${
            isMenuActive ? "translate-x-[0px]" : "translate-x-[-100vw]"
          }`}
        >
          {/* logo  */}

          <div className="p-10 grid place-content-center">
            <img src="/assets/main_logo.svg" alt="Logo" className="w-32" />
          </div>

          {/* menu items  */}

          <ul className="p-5">
            {menuItemsList.map((item, index) => (
              <li key={index}>
                <MenuItems {...item} />
              </li>
            ))}

            <li>
              <DropDown isFavOpen={isFavOpen} setFavOpen={setFavOpen} />
            </li>
          </ul>

          {/* footer  */}

          <footer className="absolute w-full bottom-0 px-5 pb-20 pt-4">
            <div onClick={handleSignOut}>
              <SubmitBtn text="Sign Out" isLoading={false} />
            </div>
          </footer>
        </div>
      </div>

      {/* desktop menu bar  */}

      <div className="hidden lg:flex gap-3">
        <div className="hidden lg:flex items-center justify-end w-full gap-5">
          {menuItemsList.map((item, index) => (
            <MenuItems {...item} key={index} />
          ))}
        </div>

        <DropDown isFavOpen={isFavOpen} setFavOpen={setFavOpen} />
      </div>
    </>
  );
};

export default MenuBar;
