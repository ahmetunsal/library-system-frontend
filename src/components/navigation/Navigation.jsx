import React, { useContext } from "react";
import { loginBtn, navList } from "../../utils/config";
import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { context } from "../../_context/GlobalContext";

const Navigation = () => {
  const { isLoggedIn } = useContext(context);

  return (
    <div className="sticky top-0 z-20 flex justify-between md:justify-between items-center px-5 py-2 bg-black text-white">
      <div className="flex">
        <h1 className="text-2xl md:text-base">KütüPNCR</h1>
      </div>
      <div className="flex md:hidden">
        <button className="text-2xl">
          <GiHamburgerMenu />
        </button>
      </div>
      <div className="hidden md:flex">
        <ul className="flex gap-5">
          {navList.map((nav, i) => {
            return (
              <li key={i} className="">
                <Link to={nav.url}>{nav.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="hidden md:flex">
        {isLoggedIn ? (
          <>
            <Link
              className="flex bg-amber-400 text-black shadow hover:shadow-[0_0_10px] shadow-amber-400 duration-150 px-6 py-2 rounded-full"
              to={"/profile"}
            >
              Profil
            </Link>
          </>
        ) : (
          <Link
            className="flex bg-amber-400 text-black shadow hover:shadow-[0_0_10px] shadow-amber-400 duration-150 px-6 py-2 rounded-full"
            to={loginBtn.url}
          >
            {loginBtn.title}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;
