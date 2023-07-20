import Cart from "../../assets/icons/Cart.svg";
import DecreaseButton from "../../assets/icons/DecreaseButton.svg";
import IncreaseButton from "../../assets/icons/IncreaseButton.svg";
import Order1 from "../../assets/images/Orders/Order1.svg";
import ProductPageBg from "../../assets/images/ProductPageBg.svg";
import SpeciealDescount from "../../assets/images/SpeciealDescount.svg";
import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";
import TextLimit from "../../components/TextLimit";

const Main = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-9 h-[5000px]">{HeaderSection()}</div>
        <div className="sticky top-5 col-span-3 mt-5 h-fit">
          {AddressSection()}
          {OrderMenuSection()}
        </div>
      </div>
    </>
  );
};

export default Main;

// Order menu Section
function OrderMenuSection() {
  return (
    <div>
      <div className="-mb-5 h-auto rounded-t-[15px] bg-gradient-brown-500 px-5 pb-5 pt-5">
        <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold text-transparent md:text-lg">
          Order Menu
        </h1>
        <div className="grid grid-cols-1 divide-y divide-gradient-yellow-300">
          <div>{Order()}</div>
          <div>{Order()}</div>
          <div>{Order()}</div>
          <div className="text-center">
            <h1
              style={{
                textShadow:
                  "-1px 1px 0 #ffe35299, 1px 1px 0 #ffe35299,1px -1px 0 #FF9224,-1px -1px 0 #FF9224",
              }}
              className="mt-3 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-lg tracking-widest text-transparent md:text-xl md:tracking-wider"
            >
              Total Amount
            </h1>
            <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-base font-semibold text-transparent md:text-lg">
              Rs {"2300.00"}
            </p>
          </div>
        </div>
      </div>
      <div className="!-mx-0 mt-4 flex justify-center">
        <Button className="m-0 !max-w-full !grow gap-2 !rounded-b-[20px] !rounded-t-[0px] border-none !bg-gradient-to-bl from-gradient-green-400 to-gradient-green-300 text-xs font-semibold uppercase text-black hover:text-black md:text-sm">
          <img
            src={Cart}
            alt=""
            className="h-5 w-5 overflow-hidden rounded-lg object-cover"
          />
          CHECK OUT
        </Button>
      </div>
    </div>
  );
}

// Address Section
function AddressSection() {
  return (
    <div className="mb-3 h-auto rounded-[15px] bg-gradient-brown-500 px-5 py-5">
      <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold text-transparent md:text-lg">
        Your Address
      </h1>
      <div className="grow flex-wrap gap-2 md:flex">
        <div className="mb-2 grow md:mb-0 md:h-9">
          <InputField
            className="mx-auto border !border-gradient-yellow-900 pb-2 pt-1 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25 md:pb-2 md:pt-2"
            placeholder="No:21/32, Okandh..."
          />
        </div>
        <div className="">
          <Button className="m-0 !rounded-[10px] border-none !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
            Change
          </Button>
        </div>
      </div>
      <div className="mt-4 flex justify-center text-center text-base leading-5 tracking-wide">
        <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-xs font-semibold text-transparent md:text-sm">
          Items will be delivered to the default address. You can change the
          default address here
        </p>
      </div>
      <div className="mt-4">
        <Button className="m-0 !rounded-[10px] border-none !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
          Add Details
        </Button>
      </div>
    </div>
  );
}

// Order Component
function Order() {
  return (
    <div className="my-2 flex flex-wrap justify-between gap-3">
      <div>
        <img
          src={Order1}
          alt=""
          className="h-16 w-16 overflow-hidden rounded-lg object-cover opacity-70"
        />
      </div>
      <div className="grow">
        <h2 className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-xs font-black text-transparent md:text-sm">
          <TextLimit text={"Chicken Shawarma"} limit={14} />
        </h2>
        <div className="mt-2 flex gap-1">
          <Button className="my-auto h-fit !rounded-[10px] border-none !bg-transparent !p-0 text-black hover:text-black">
            <img
              src={DecreaseButton}
              alt=""
              className="h-5 w-5 overflow-hidden rounded-lg object-cover"
            />
          </Button>
          <div className="mb-0 h-8">
            <InputField
              className="mx-auto h-8 max-w-[60px] border !border-gradient-yellow-900 pb-2 pt-2 text-center !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
              placeholder={"1x"}
            />
          </div>
          <Button className="my-auto h-fit !rounded-[10px] border-none !bg-transparent !p-0 text-black hover:text-black">
            <img
              src={IncreaseButton}
              alt=""
              className="h-5 w-5 overflow-hidden rounded-lg object-cover"
            />
          </Button>
        </div>
      </div>
      <div>
        <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-xs font-black text-transparent md:text-sm">
          Rs {"2300.00"}
        </p>
      </div>
    </div>
  );
}

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
