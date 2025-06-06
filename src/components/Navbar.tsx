import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full light-color uppercase sticky top-0  z-50 p-16 flex justify-between font-bold text-sm   md:text-2xl py-7 items-center">
      <Link className="whitespace-nowrap" href={"/"}>
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
