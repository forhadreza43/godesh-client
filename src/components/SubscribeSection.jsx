import { Send, Mail } from "lucide-react";
import newsImage from "../assets/newsletter-image.svg";
const SubscribeSection = () => {
  return (
    <div className="mx-auto my-16 flex max-w-6xl flex-col items-center justify-between gap-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 p-8 text-white shadow-lg md:flex-row md:p-12">
      {/* Left Image */}
      <div className="flex justify-center md:w-1/2">
        <img
          src={newsImage}
          alt="Subscribe Illustration"
          className="max-w-[250px] md:max-w-xs"
        />
      </div>

      {/* Right Text & Form */}
      <div className="flex-1 space-y-6 text-center md:text-left">
        <p className="text-sm text-white/80 italic">Newsletter</p>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">
          Subscribe Now
        </h2>
        <p className="text-white/90">
          Fight School has specialized in martial arts since 1986 and has one of
          the most innovative programs in the nation.
        </p>

        {/* Email Input */}
        <form className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex w-full items-center rounded-md bg-white px-3 py-2 sm:w-auto">
            <Mail className="mr-2 text-cyan-500" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full text-sm text-gray-700 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md bg-cyan-600 px-5 py-2 font-semibold text-white hover:bg-cyan-700"
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
