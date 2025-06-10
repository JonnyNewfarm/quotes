import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full uppercase fixed top-0  z-50 p-5 flex justify-between  text-[12px] gap-x-3 md:px-16   md:text-2xl py-7 items-center">
      <Link className="whitespace-nowrap font-semibold" href={"/"}>
        Quote Battle
      </Link>

      <Link className="whitespace-nowrap" href={"/"}>
        Home
      </Link>
      <Link className="whitespace-nowrap" href={"/create"}>
        Add Quote
      </Link>
      <Link className="whitespace-nowrap" href={"/quotes"}>
        All Quotes
      </Link>
    </div>
  );
};

export default Navbar;
