import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        const container = document.getElementById("root");
        if (container) {
            container.scrollTop = 0;
        } else {
            
        }
    }, [pathname]);

    return null;
}

export default ScrollToTop;
