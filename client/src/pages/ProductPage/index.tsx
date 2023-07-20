import ProductPageBg from "../../assets/images/ProductPageBg.svg";
import SpeciealDescount from "../../assets/images/SpeciealDescount.svg";
import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";

const Main = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-9 h-[5000px]">{HeaderSection()}</div>
        <div className="sticky top-0 col-span-3 mt-5 h-fit">
          <div className="mb-3 h-52 rounded-[15px] bg-gradient-brown-500 px-5 py-3">
            <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold text-transparent">
              Your Address
            </h1>
            <div className="flex gap-1">
              <div>
                <InputField
                  className="mx-auto !min-w-[250px] border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                  placeholder="No:21/32, Okandh..."
                />
              </div>
              <div>
                <Button className="m-0 !rounded-[10px] border-none !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 !px-5 py-2 font-semibold uppercase text-black hover:text-black">
                  Change
                </Button>
              </div>
            </div>
          </div>
          <div className="h-52 rounded-[15px] bg-gradient-yellow-300 opacity-20"></div>
        </div>
      </div>
    </>
  );
};

export default Main;

// Header Section
function HeaderSection() {
  return (
    <div
      style={{
        backgroundImage: `url(${ProductPageBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-auto"
    >
      <div className="px-6 pt-5">
        <InputField
          className="mx-auto !max-w-[500px] border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
          placeholder="WHAT DO YOU WANTS TO EAT TODAY"
        />
      </div>
      <div className="relative h-auto p-5 md:mt-10">
        <img
          src={SpeciealDescount}
          className="rounded-[8px] md:rounded-[20px]"
        />
      </div>
    </div>
  );
}
