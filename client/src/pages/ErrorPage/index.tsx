import { NavLink, useNavigate } from "react-router-dom";
import Svg404 from "../../assets/images/404-2.png";
import Svg from "../../assets/images/PageNotFound.svg";
import { Button } from "../../base-components/Button";
function Main() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col-reverse items-center justify-center gap-16 px-4 py-24 md:gap-28 md:px-44 md:py-20 lg:flex-row lg:px-24 lg:py-24">
        <div className="relative w-full pb-12 lg:pb-0 xl:w-1/2 xl:pt-24">
          <div className="relative">
            <div className="absolute z-10">
              <div className="">
                <h1 className="my-2 text-2xl font-bold text-gradient-yellow-500">
                  Looks like you've found the doorway to the great nothing
                </h1>
                <p className="my-2 text-gradient-yellow-900">
                  Sorry about that! Please visit our homepage to get where you
                  need to go.
                </p>
                <div
                  onClick={() => navigate(-1)}
                  className="!mx-0 !my-5 !h-fit w-fit cursor-pointer !p-0"
                >
                  <Button
                    as={NavLink}
                    className="my-0 rounded border !border-gradient-yellow-500 !bg-gradient-yellow-300 px-8 py-4 text-center !text-gradient-yellow-500 sm:w-full lg:w-auto"
                  >
                    Back to Home!
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <img src={Svg404} className="opacity-[.04]" />
            </div>
          </div>
        </div>
        <div>
          <img src={Svg} width={500} className="opacity-[.7]" />
        </div>
      </div>
    </>
  );
}

export default Main;
