import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Card1 from "../../assets/images/CustomizePage/Card1.png";
import Card2 from "../../assets/images/CustomizePage/Card2.png";
import Card3 from "../../assets/images/CustomizePage/Card3.png";

const Main = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const handleHover1 = () => {
    setIsHovered2(true);
    setIsHovered3(true);
  };

  const handleLeave1 = () => {
    setIsHovered2(false);
    setIsHovered3(false);
  };

  const handleHover2 = () => {
    setIsHovered1(true);
    setIsHovered3(true);
  };

  const handleLeave2 = () => {
    setIsHovered1(false);
    setIsHovered3(false);
  };

  const handleHover3 = () => {
    setIsHovered1(true);
    setIsHovered2(true);
  };

  const handleLeave3 = () => {
    setIsHovered1(false);
    setIsHovered2(false);
  };
  return (
    <>
      <div className="mb-10 grid w-full grid-cols-3 gap-2 ">
        <div
          style={{
            backgroundImage: `url(${Card1})`,
            backgroundSize: "cover",
          }}
          className={twMerge([
            "col-span-1 h-[220px] translate-x-1/2 cursor-pointer rounded-2xl opacity-[1] duration-300 ease-in hover:border hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[400px] md:min-w-[230px] lg:h-[450px]",
            isHovered1 ? "blur-[2px]" : "",
          ])}
          onMouseEnter={handleHover1}
          onMouseLeave={handleLeave1}
        ></div>
        <div
          style={{
            backgroundImage: `url(${Card2})`,
            backgroundSize: "cover",
          }}
          className={twMerge([
            "z-10 col-span-1 h-[220px] -translate-y-10 cursor-pointer rounded-2xl opacity-[1] duration-300 ease-in hover:border hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[400px] md:min-w-[230px] md:-translate-y-24 lg:h-[450px]",
            isHovered2 ? "blur-[2px]" : "",
          ])}
          onMouseEnter={handleHover2}
          onMouseLeave={handleLeave2}
        ></div>
        <div
          style={{
            backgroundImage: `url(${Card3})`,
            backgroundSize: "cover",
          }}
          className={twMerge([
            "col-span-1 h-[220px] -translate-x-1/3 cursor-pointer rounded-2xl opacity-[1] duration-300 ease-in hover:border hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[400px] md:min-w-[230px] md:-translate-y-14 lg:h-[450px]",
            isHovered3 ? "blur-[2px]" : "",
          ])}
          onMouseEnter={handleHover3}
          onMouseLeave={handleLeave3}
        ></div>
      </div>
    </>
  );
};

export default Main;
