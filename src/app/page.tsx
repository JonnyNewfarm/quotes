"use client";

import TopFive from "@/components/TopFive";
import SmoothScroll from "@/components/SmoothScroll";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import MagneticComp from "@/components/MagneticComp";

export default function HomePage() {
  return (
    <SmoothScroll>
      <div className="w-full relative min-h-screen text-[#2b2b2b] light-color flex justify-center flex-col items-center">
        <div className="w-full h-[100vh]">
          <div className="absolute w-full h-screen top-0">
            <Image
              style={{
                maskImage:
                  "linear-gradient(to bottom, white 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, white 90%, transparent 100%)",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
              }}
              src={"/quest-bg4.jpg"}
              alt="bg"
              fill
              className="object-cover "
            />
          </div>

          <div className="flex flex-col w-full h-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.6, 1],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 0.7,
                times: [0, 0.4, 1],
                ease: "easeInOut",
              }}
              className="w-full  p-10 text-center h-full flex flex-col justify-center items-center"
            >
              <h1 className="z-50 mt-60 font-bold uppercase text-2xl md:text-4xl max-w-3xl">
                Your Words
              </h1>
              <h1 className="z-50 font-bold uppercase text-3xl md:text-5xl max-w-3xl">
                Your Weapon
              </h1>
            </motion.div>

            <motion.div className="w-full h-full font-bold lg:text-5xl md:text-2xl text-xl p-10 flex justify-between items-end  z-50">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.6, 1],
                  opacity: [0, 1, 1],
                }}
                transition={{
                  duration: 0.8,
                  times: [0, 0.4, 1],
                  ease: "easeInOut",
                }}
                className="flex w-full justify-between"
              >
                <MagneticComp>
                  <Link className="whitespace-nowrap " href={"/create"}>
                    ADD QUOTE
                  </Link>
                </MagneticComp>
                <MagneticComp>
                  <a
                    href="#top-five"
                    className="whitespace-nowrap hidden sm:block"
                  >
                    TOP FIVE
                  </a>
                </MagneticComp>
                <MagneticComp>
                  <Link href={"quotes"} className="whitespace-nowrap">
                    ALL QUOTES
                  </Link>
                </MagneticComp>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <TopFive />
      </div>
    </SmoothScroll>
  );
}
