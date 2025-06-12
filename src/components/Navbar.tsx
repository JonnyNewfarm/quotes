import Link from "next/link";
import React from "react";
import MagneticComp from "./MagneticComp";

const Navbar = () => {
  return (
    <div className="w-full uppercase fixed top-0 font-semibold text-[#171414]  z-50 p-5 flex justify-between  text-[12px] gap-x-3 md:px-16 md:text-xl   lg:text-2xl py-7 items-center">
      <MagneticComp>
        <Link className="whitespace-nowrap " href={"/"}>
          Quote Battle
        </Link>
      </MagneticComp>
      <MagneticComp>
        <Link className="whitespace-nowrap" href={"/"}>
          Home
        </Link>
      </MagneticComp>
      <MagneticComp>
        <Link className="whitespace-nowrap" href={"/create"}>
          Add Quote
        </Link>
      </MagneticComp>
      <MagneticComp>
        <Link className="whitespace-nowrap" href={"/quotes"}>
          All Quotes
        </Link>
      </MagneticComp>
    </div>
  );
};

export default Navbar;
