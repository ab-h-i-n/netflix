import React from "react";
import Btn from "./Btn";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div className={`${props.links ? '' : 'bg-zinc-900'} nav w-full flex justify-between px-10 py-8 items-center bg-transparent md:px-48`}>
      {/* logo */}
      <Link to="/">
        <img src="/assets/main_logo.svg" className="w-32 md:w-40" alt="logo" />
      </Link>

      {/* links */}
      {props.links && (
        <ul className="flex gap-x-4 items-center">
          <li className="flex items-center relative">
            <img src="/assets/language.svg" className="w-5 absolute left-2" />
            <select
              name="lang"
              id="lang"
              className="pl-7 pr-3 py-1 text-white bg-[#000000c7] border border-zinc-700 rounded"
            >
              <option value="English">English</option>
            </select>
          </li>
          <li>
            <Btn text="Sign In" link="/login" />
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
