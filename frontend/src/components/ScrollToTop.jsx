import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sjekk om main-container finnes
    const main = document.querySelector("main");
    if (main) {
      main.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
