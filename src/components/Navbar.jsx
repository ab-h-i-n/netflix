import React from "react";
import Btn from "./Btn";
import { Link } from "react-router-dom";

function Navbar() {

 

  return (
    <div className="nav w-full flex justify-between px-10 py-8 items-center bg-transparent md:px-48">
      {/* logo  */}

      <Link to="/">
        <img src="/assets/main_logo.svg" className="w-40" alt="logo" />
      </Link>

      {/* links  */}

      <ul className="flex gap-x-4 items-center ">
        <li>
          <Btn text="LogIn" link="/login"/>
        </li>
        <li>
          <Btn text="Sign Up" link="/signup" />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
