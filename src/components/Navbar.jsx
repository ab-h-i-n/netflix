import React from "react";
import Btn from "./Btn";
import { Link } from "react-router-dom";
import { supabase } from "../SupaBase";

function Navbar() {

  const handleSignOut = async () => {

    await supabase.auth.signOut();


  }

  return (
    <div className={` nav w-full flex justify-between px-5 py-8 items-center bg-transparent lg:px-48`}>

      {/* logo */}
      <Link to="/">
        <img src="/assets/main_logo.svg" className="w-24 md:w-40" alt="logo" />
      </Link>

      {/* links */}

      <ul className="flex gap-x-4 items-center">


        <li className="flex items-center relative">
          <img src="/assets/language.svg" className="w-5 absolute left-2" alt="lang" />
          <select
            name="lang"
            id="lang"
            className="w-11 md:w-auto  pl-7 pr-3 py-1 text-white bg-[#000000c7] border border-zinc-700 rounded"
          >
            <option value="English">English</option>
          </select>
        </li>

        <li>
          <Btn text='Sign In' link='/login' />
        </li>

      </ul>

    </div>
  );
}

export default Navbar;
