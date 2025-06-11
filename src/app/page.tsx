"use client";

import TopFive from "@/components/TopFive";
import SmoothScroll from "@/components/SmoothScroll";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <SmoothScroll>
      <div className="w-full relative min-h-screen text-[#2b2b2b] light-color flex justify-center flex-col items-center">
        <div className="w-full h-[100vh]">
          <div className="absolute w-full h-screen top-0">
            <Image
              src={"/quest-bg4.jpg"}
              alt="bg"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-[#2b2b2b] to-transparent z-10" />
          </div>

          <div className="flex flex-col w-full h-full">
            {/* Center Text */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.6, 1],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 0.4,
                times: [0, 0.4, 1],
                ease: "easeInOut",
              }}
              className="w-full text-white p-10 text-center h-full flex flex-col justify-center items-center"
            >
              <h1 className="z-50 mt-80 font-bold uppercase text-3xl md:text-6xl max-w-3xl">
                Your Words
              </h1>
              <h1 className="z-50 font-bold uppercase text-3xl md:text-6xl max-w-3xl">
                Your Weapon
              </h1>
              <Link
                className="z-50 mt-5 text-xl border border-white py-2 px-4"
                href={"/create"}
              >
                Add Quote
              </Link>
            </motion.div>

            {/* Bottom Mask-Reveal Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 1,
                  },
                },
              }}
              className="w-full h-full font-bold lg:text-7xl text-xl p-10 flex justify-between items-end text-white z-50"
            >
              {["QUOTE", "TOP FIVE", "BATTLE"].map((word, i) => (
                <motion.div key={i} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className={`z-50 ${
                      word === "TOP FIVE" ? "cursor-pointer" : ""
                    }`}
                  >
                    {word === "TOP FIVE" ? (
                      <a href="#top-five" className="z-50 md:text-5xl text-lg">
                        {word}
                      </a>
                    ) : (
                      word
                    )}
                  </motion.h1>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <TopFive />
      </div>
    </SmoothScroll>
  );
}
