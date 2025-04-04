import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignIn } = useClerk();

  const { isSignedIn, user } = useUser();

  return (
    <>
      <div className=" flex items-center justify-between mx-4 py-3 lg:mx-44">
        <Link to={"/"}>
          <img className=" w-32 sm:w-44" src={assets.logo} alt="" />
        </Link>

        {isSignedIn ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn({})}
            className=" bg-zinc-800  flex items-center text-white rounded-full text-sm gap-2 px-4 py-2  sm:py-3 sm:px-8"
          >
            Get Started <img src={assets.arrow_icon} alt="" />
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
