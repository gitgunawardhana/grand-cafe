import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";
import CheckBoxSetResponsive from "../../components/CheckBoxSetResponsive";
import CustomizePageCards from "../../components/CustomizePageCards";

const vegetableSlicesDataset = [
  {
    id: "potato-slices ",
    label: "Potato Slices",
    value: "potato-slices",
  },
  {
    id: "tomato-slices",
    label: "Tomato Slices",
    value: "tomato-slices",
  },
  {
    id: "onion-slices",
    label: "Onion  Slices",
    value: "onion-slices",
  },
];

const extraChickenDataset = [
  {
    id: "extra-chicken",
    label: "Extra Chicken",
    value: "extra-chicken",
  },
  {
    id: "normal-chicken",
    label: "Normal Chicken",
    value: "normal-chicken",
  },
];

const secondaryMeatMeal = [
  {
    id: "ham",
    label: "Ham",
    value: "ham",
  },
  {
    id: "mutton",
    label: "Mutton",
    value: "mutton",
  },
  {
    id: "none",
    label: "None",
    value: "none",
  },
];

const bunSize = [
  {
    id: "small",
    label: "Small",
    value: "small",
  },
  {
    id: "medium",
    label: "Medium",
    value: "medium",
  },
  {
    id: "large",
    label: "Large",
    value: "large",
  },
];

const addFrenchFries = [
  {
    id: "yes",
    label: "Yes",
    value: "yes",
  },
  {
    id: "no",
    label: "No",
    value: "no",
  },
];

const Main = () => {
  return (
    <>
      <div className="!m-auto flex flex-col justify-center object-cover px-12 text-center text-gradient-yellow-300 md:px-28 lg:px-32">
        <div className="mb-16 mt-20 flex flex-col items-center justify-center gap-2 md:mt-40 lg:mt-40 lg:flex-row">
          <div className="order-last grid w-full gap-9 bg-gradient-brown-900 tracking-wide lg:order-first lg:grid-cols-2">
            <div className="col-span-2 mt-10 justify-start text-start text-[20px] font-extrabold text-gradient-yellow-900 sm:text-[25px] md:text-[30px] lg:-mt-28 lg:text-[45px]">
              <h1>Customize Food</h1>
            </div>
            <div className="col-span-2 justify-start text-start sm:col-span-1">
              <InputField
                className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                label="Chicken Flavor"
                labelClassName="!bg-gradient-brown-900 !text-gradient-yellow-900 text-xs p-1 pr-16"
                placeholder="Crispy Chicken"
              />
            </div>
            <div className="col-span-2 justify-start text-start sm:col-span-1">
              <CheckBoxSetResponsive
                className="border-none"
                dataset={extraChickenDataset}
                type="radio"
                name="extra-chicken"
              />
            </div>
            <div className="col-span-2 justify-start text-start sm:col-span-1">
              <InputField
                className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                label="Cheese flavor 1"
                labelClassName="!bg-gradient-brown-900 !text-gradient-yellow-900 text-xs p-1 pr-16"
                placeholder="Cheddar cheese"
              />
            </div>
            <div className="col-span-2 justify-start text-start sm:col-span-1">
              <InputField
                className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                label="Cheese flavor 2"
                labelClassName="!bg-gradient-brown-900 !text-gradient-yellow-900 text-xs p-1 pr-16"
                placeholder="Provolone cheese"
              />
            </div>
            <div className="col-span-2 justify-start text-start md:mt-10">
              <CheckBoxSetResponsive
                label="Vegetable Slices"
                className="max-w-xl"
                dataset={vegetableSlicesDataset}
                type="checkbox"
                name="vegetable-slices"
              />
            </div>
            <div className="col-span-2 justify-start text-start">
              <CheckBoxSetResponsive
                className="max-w-sm"
                label="Secondary Meat Meal"
                dataset={secondaryMeatMeal}
                type="radio"
                name="secondary-meat-meal"
              />
            </div>
            <div className="col-span-2 -mb-5 justify-start text-start">
              <CheckBoxSetResponsive
                className="max-w-sm"
                label="Bun Size"
                dataset={bunSize}
                type="radio"
                name="bun-size"
              />
            </div>
            <div className="col-span-2 my-auto -mb-8 justify-start text-start text-sm sm:col-span-1 sm:my-auto">
              <p>Do you want to add French fries with your order ?</p>
            </div>
            <div className="col-span-2 justify-start text-start sm:col-span-1">
              <CheckBoxSetResponsive
                className="max-w-[220px] border-none"
                dataset={addFrenchFries}
                type="radio"
                name="add-french-fries"
              />
            </div>
            <div className="col-span-2 justify-start text-start">
              <Button className="!rounded-[20px] border-none !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 !px-9 font-semibold uppercase text-black hover:text-black">
                Conform Order
              </Button>
            </div>
          </div>
          <div className="flex w-full items-center justify-center bg-gradient-brown-900">
            {/* <div className="mb-10 grid w-full grid-cols-3 gap-2 ">
              <div
                style={{
                  backgroundImage: `url(${Card1})`,
                  backgroundSize: "cover",
                }}
                className={twMerge([
                  "col-span-1 h-[220px] translate-x-1/2 translate-y-6 cursor-pointer rounded-2xl opacity-[1] duration-300 ease-in hover:border hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[400px] lg:h-[450px]",
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
                  "z-10 col-span-1 h-[220px] -translate-y-10 cursor-pointer rounded-2xl opacity-[1] duration-300 ease-in hover:border hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[400px] md:-translate-y-24 lg:h-[450px]",
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
                  "col-span-1 h-[220px] -translate-x-1/3 -translate-y-6 cursor-pointer rounded-2xl opacity-[1] duration-300 ease-in hover:border hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[400px] md:-translate-y-14 lg:h-[450px]",
                  isHovered3 ? "blur-[2px]" : "",
                ])}
                onMouseEnter={handleHover3}
                onMouseLeave={handleLeave3}
              ></div>
            </div> */}
            <CustomizePageCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
