import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full light-color font-bold border-t border-black/20  pb-5 px-10 flex justify-between items-end h-[13vh]">
      <div>
        <h1 className="opacity-70">Created By:</h1>
        <a href="https://www.jonasnygaard.com/">Newfarm Studio</a>
      </div>

      <div className="sm:block hidden">
        <h1 className="opacity-70">Navigation:</h1>
        <Link href={"/"}>Home</Link>
      </div>

      <div>
        <h1 className="opacity-70">Navigation:</h1>
        <Link href={"/create"}>Add quote</Link>
      </div>

      <div className="sm:block hidden">
        <h1 className="opacity-70">Navigation:</h1>
        <Link href={"/quotes"}>All quotes</Link>
      </div>
    </div>
  );
};

export default Footer;
