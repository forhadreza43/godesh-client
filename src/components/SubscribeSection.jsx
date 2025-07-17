import { Send, Mail } from "lucide-react";
import newsImage from "../assets/newsletter-image.svg";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
const SubscribeSection = () => {
  return (
    <div className="mx-auto my-16 flex w-11/12 max-w-6xl flex-col items-center justify-between gap-10 rounded-xl bg-gradient-to-br from-green-400 to-green-400 p-8 text-white shadow-lg md:flex-row md:p-12 py-10">
      {/* Left Image */}
      <motion.div
        className="flex justify-center md:w-1/2"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src={newsImage}
          alt="Subscribe Illustration"
          className="max-w-[250px] md:max-w-xs"
        />
      </motion.div>

      {/* Right Text & Form */}
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h2 className="text-3xl font-bold uppercase md:text-4xl">
          Subscribe Now
        </h2>

        {/* Email Input */}
        <form className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex w-full items-center rounded-md bg-white p-5 sm:w-auto">
            <Mail className="mr-2 text-green-500" size={24} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full text-sm text-gray-700 outline-none border-none"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md bg-green-600 p-5 font-semibold text-white hover:bg-green-700 cursor-pointer"
          >
            SUBSCRIBE
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeSection;
