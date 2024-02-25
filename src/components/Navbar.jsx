import React from "react";
import Btn from "./Btn";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className=" w-full flex justify-between px-20 pt-8 py-5 items-center bg-transparent">
      {/* logo  */}

      <Link to="/">
        <img src="/assets/main_logo.svg" className="w-36" alt="logo" />
      </Link>

      {/* links  */}

      <ul className="flex gap-x-4 items-center ">
        <li>
          <Btn text="LogIn" link="/login"/>
        </li>
        <li>
          <Btn text="Sign Up" link="/signup"/>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
