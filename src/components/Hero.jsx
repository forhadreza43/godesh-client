import Navbar from "./Navbar";
import banner from '../assets/banner1.svg'
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
const Hero = () => {
  return (
    <div class="bg-gradient-to-b from-green-50 to-green-100">
      <Navbar />
      <section class="py-10 sm:py-16 lg:py-24">
        <div class="mx-auto w-11/12">
          <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 class="text-3xl font-bold text-primary sm:text-5xl lg:text-6xl">
                Never Stop
                <div class="relative inline-flex">
                  <span class="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
                  <h1 class="relative mt-5 -ml-1 text-5xl font-bold text-gray-800 sm:text-7xl lg:text-9xl">
                    Exploring
                  </h1>
                </div>
              </h1>

              <p class="mt-8 text-base sm:text-xl">
                Book tours, connect with expert guides, and explore hidden gems
                across Bangladesh. Travel smart, travel local.
              </p>

              <div class="mt-10 sm:flex sm:items-center sm:space-x-8">
                <a
                  href="#"
                  title=""
                  class="inline-flex items-center justify-center bg-orange-500 px-10 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-orange-600 focus:bg-orange-600"
                  role="button"
                >
                  {" "}
                  Start exploring{" "}
                </a>

                <a
                  href="#"
                  title=""
                  class="mt-6 inline-flex items-center text-base font-semibold transition-all duration-200 hover:opacity-80 sm:mt-0"
                >
                  <svg
                    class="mr-3 h-10 w-10"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      fill="#F97316"
                      stroke="#F97316"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Watch video
                </a>
              </div>
            </div>

            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img class="w-full" src={banner} alt="" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
