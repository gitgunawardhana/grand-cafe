import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import LandingPageBG from "../../assets/images/LandingPageBG.svg";
import LandingPageText from "../../assets/images/LandingPageText.svg";
import { Button } from "../../base-components/Button";

const Main = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${LandingPageBG})`,
          backgroundSize: "cover",
        }}
        className="w-m -mt-[136px] flex h-screen flex-col p-5 pt-[80px] text-center text-gradient-yellow-300"
      >
        <div className="grid h-screen place-items-center">
          <div>
            <img src={LandingPageText} />
            <Button
              as={NavLink}
              to="/first"
              className={twMerge(
                "rounded-[125.148px] border-2 border-solid border-gradient-yellow-300 !bg-transparent px-[25px] py-[15.141px] lg:px-[40px] lg:py-[20.141px]"
              )}
            >
              <span
                className={twMerge(
                  "text-[18px] font-[500] uppercase tracking-[1.226px] !text-gradient-yellow-500"
                )}
              >
                VIEW ALL MENU
              </span>
            </Button>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
