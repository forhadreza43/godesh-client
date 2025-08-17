// src/components/AnimatedSection.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedSection = ({ children, animation = "fade-up" }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let animProps;

    switch (animation) {
      case "fade-left":
        animProps = { x: -100, opacity: 0 };
        break;
      case "fade-right":
        animProps = { x: 100, opacity: 0 };
        break;
      case "fade-up":
        animProps = { y: 100, opacity: 0 };
        break;
      case "scale-in":
        animProps = { scale: 0.8, opacity: 0 };
        break;
      default:
        animProps = { y: 100, opacity: 0 };
    }

    gsap.fromTo(sectionRef.current, animProps, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none",
      },
    });
  }, [animation]);

  return (
    <section ref={sectionRef} className="my-10">
      {children}
    </section>
  );
};

export default AnimatedSection;
