import First_Page from "../../assets/images/First_Page.svg";
import LandingNavbar from "../../components/LandingNavbar/index";
import { Button } from "../../base-components/Button";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Time from "../../assets/images/FirstPage/Time.png";
import Location from "../../assets/images/FirstPage/Location.png";
import Call from "../../assets/images/FirstPage/Call.png";
import Facebook from "../../assets/images/FirstPage/Facebook icon.png";
import Instagram from "../../assets/images/FirstPage/Instergram icon.png";
import Twitter from "../../assets/images/FirstPage/Mask group.png";
import Tiktok from "../../assets/images/FirstPage/tik-tok.png";

const Main = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${First_Page})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-screen flex-col p-5 pt-[80px] text-center text-slate-900  dark:text-slate-50"
      >
        <LandingNavbar />
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="grid h-screen grid-cols-3">
          <div className="grid place-items-center">
            
            <div>
              <h2 className="font-sans text-[36px] font-black uppercase text-amber-400">
                Enjoy with Street{" "}
                <span className="font-sans">
                  <br></br>Foods
                </span>
              </h2>
              <br></br>
              <p className="text-[14px] text-amber-500">
                World Best Street Food Reentrant in Sri Lanka.{" "}
                <span>
                  <br></br>Come And Enjoy With us
                </span>
              </p>
              <br></br>
              <div className="grid grid-cols-2">
                {/**Two buttons */}
              <div>
                <Button
                  as={NavLink}
                  to="/"
                  className={twMerge(
                    "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-amber-500 px-[20px] py-[10px] lg:px-[40px] lg:py-[10.141px]"
                  )}
                >
                  <span
                    className={twMerge(
                      "text-[18px] font-[500] uppercase tracking-[0px] !text-stone-900 hover:scale-110"
                    )}
                  >
                    Sign IN
                  </span>
                </Button>
                &nbsp;&nbsp;
              </div>

              <div>
                &nbsp;&nbsp;
                <Button
                  as={NavLink}
                  to="/"
                  className={twMerge(
                    "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-transparent px-[20px] py-[10px] lg:px-[40px] lg:py-[10.141px]"
                  )}
                >
                  <span
                    className={twMerge(
                      "text-[18px] font-[500] uppercase tracking-[0px] !text-yellow-300 hover:scale-110"
                    )}
                  >
                    Sign Up
                  </span>
                </Button>
              </div>
            </div>
            </div>

            
           
            {/**3 iocons */}
            <div className="flex">
              <div className="grid grid-cols-3 justify-around">
                <div className="p-10 grid items-center justify-center ">
                  <img src={Time} alt="time image" />
                  
                </div>
                <div className="p-10">
                  <img src={Location} alt="location image" />
                </div>
                <div className="p-10">
                  <img src={Call} alt="call image" />
                </div>
              </div>
            </div>
          </div>
          <div></div>
          {/** right botton icons list */}
          <div>
            <div className="flex h-full items-end justify-end">
              <div className="flex justify-center">
                <div className="grid grid-cols-4">
                  <div className="cursor-pointer p-4">
                    <img
                      src={Facebook}
                      alt="time image"
                      className="hover:scale-125"
                    />
                  </div>
                  <div className="cursor-pointer p-4">
                    <img
                      src={Instagram}
                      alt="time image"
                      className="hover:scale-125"
                    />
                  </div>
                  <div className="cursor-pointer p-4">
                    <img
                      src={Twitter}
                      alt="time image"
                      className="hover:scale-125"
                    />
                  </div>
                  <div className="cursor-pointer p-4">
                    <img
                      src={Tiktok}
                      alt="time image"
                      className="hover:scale-125"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
