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
          height: window.innerHeight - 176,
        });
      } else if (window.innerWidth > 640) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight - 172,
        });
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight - 176,
        });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // set initial window size

    return () => window.removeEventListener("resize", handleResize);
  }, []);
};

export default getWindowSize;
