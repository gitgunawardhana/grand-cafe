import { useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const getWindowSize = (setWindowSize: any) => {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      } else if (window.innerWidth > 640) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // set initial window size

    return () => window.removeEventListener("resize", handleResize);
  }, []);
};

export default getWindowSize;
