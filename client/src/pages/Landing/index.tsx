import LandingPageBG from "../../assets/images/LandingPageBG.svg";
import LandingPageText from "../../assets/images/LandingPageText.svg";
import { Button } from "../../base-components/Button";
import LandingNavbar from "../../components/LandingNavbar/index";
const Main = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${LandingPageBG})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-screen flex-col p-5 pt-[80px] text-center text-slate-900  dark:text-slate-50"
      >
        <LandingNavbar></LandingNavbar>
        <div className="grid h-screen place-items-center">
          <div>
            {/* <h1 className="text-[75px] font-[50] tracking-[.05em]">
              <span>FOR THE LOVE OF</span>
            </h1>
            <br />
            <h1 className="text-2xl font-black tracking-[.25em]">
              <span
                style={{
                  textAlign: "center",
                  fontSize: "75px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "normal",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                DELICIOUS FOOD
              </span>
            </h1>
            <br />
            <h1 className="text-2xl font-bold">
              COME WITH FAMILY AND FEEL THE JOY OF MOUTHWATERING FOOD
            </h1> */}
            <img src={LandingPageText} />
            <Button
              as="a"
              href="/"
              className="rounded-[125.148px] border-2 border-solid border-[#ffe35299] !bg-transparent px-[25px] py-[15.141px] lg:px-[40px] lg:py-[20.141px]"
            >
              <span className="text-[18px] font-[500] uppercase tracking-[1.226px] text-[#ffe35299]">
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
