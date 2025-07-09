import { useRef, useEffect, useState } from "react";

const Overview = () => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy load video only when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto my-16 w-11/12 max-w-7xl rounded-xl bg-green-50 px-4 py-10 shadow-md">
      <h2 className="mb-6 text-center text-3xl font-bold text-accent">
        Why Choose GoDesh?
      </h2>
      <p className="mx-auto mb-10 max-w-2xl text-center text-gray-700">
        GoDesh connects you with authentic local experiences, expert guides, and
        streamlined booking for a seamless travel journey across Bangladesh.
      </p>

      <div ref={videoRef} className="overflow-hidden rounded-xl shadow-lg">
        {isVisible ? (
          <video
            className="h-auto w-full"
            autoPlay
            muted
            loop
            playsInline
            poster="/video-placeholder.jpg" // optional image placeholder
          >
            <source src="/videos/godesh-promo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="aspect-video animate-pulse rounded-xl bg-gray-200" />
        )}
      </div>
    </section>
  );
};

export default Overview;
