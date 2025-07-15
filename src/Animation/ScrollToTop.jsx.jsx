// src/components/ScrollToTop.jsx
import { useLocation } from "react-router";
import { useEffect } from "react";
import { lenis } from "./Hooks/useLenisScroll";


const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { offset: 0, duration: 1 });
    }
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
