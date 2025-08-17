import overview from "../assets/overview.svg";
import overviewl from "../assets/overview-left.png";
import overviewr from "../assets/overview-right.svg";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import AnimatedSection from "../Animation/AnimatedSection";
const Overview = () => {
  return (
    <section className="my-16 rounded-xl py-10">
      <div className="mx-auto flex flex-col items-center gap-6 md:flex-row">
        {/* Overview Image */}
        <div className="relative h-[250px] w-full flex-1 rounded-xl sm:h-[300px] md:h-[400px]">
          <img
            src={overviewl}
            alt="Overview Background"
            className="h-full w-full rounded-xl object-cover"
          />

          {/* Animated image — hidden on small screens */}
          <motion.div
            className="absolute top-0 right-0 z-10 -translate-y-[10%] lg:-translate-x-[20%] lg:translate-y-[10%]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={overview}
              alt="Overlay Animation"
              className="w-full scale-60 lg:scale-120"
            />
          </motion.div>
        </div>

        {/* Embedded Video with Aspect Ratio */}
        <div className="relative mx-auto aspect-video w-full flex-1 overflow-hidden rounded-xl">
          <img
            src={overviewr}
            alt="Overview Background"
            className="h-full w-full rounded-xl object-cover"
          />

          <iframe
            className="absolute top-0 h-full w-11/12 translate-x-[4%] rounded-xl lg:translate-0"
            src="https://www.youtube.com/embed/E0dK9ZHTSj8?autoplay=1&mute=1&controls=1&loop=1&playlist=E0dK9ZHTSj8"
            title="Aerial view of Bangladesh"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Overview;
