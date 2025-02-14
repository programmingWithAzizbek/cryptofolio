import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="bg-header">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-6 py-3">
          <NavLink
            to={"/"}
            className={"uppercase text-button font-bold text-xl font-monserrat"}
          >
            cryptofolio
          </NavLink>
          <div className="flex items-center gap-x-4">
            <select className="outline-none text-white text-base font-normal font-roboto bg-header cursor-pointer">
              <option>USD</option>
              <option>EUR</option>
              <option>UZS</option>
            </select>
            <button className="uppercase px-a18 py-2 bg-button rounded text-header font-medium text-sm font-roboto cursor-pointer">
              watch list
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
