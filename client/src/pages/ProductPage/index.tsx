import BeveragesIcon from "../../assets/categoryIcon/BeveragesIcon.svg";
import BurgerIcon from "../../assets/categoryIcon/BurgerIcon.svg";
import MeatIcon from "../../assets/categoryIcon/MeatIcon.svg";
import NoodlesIcon from "../../assets/categoryIcon/NoodlesIcon.svg";
import OurSpecialsIcon from "../../assets/categoryIcon/OurSpecialsIcon.svg";
import PastaIcon from "../../assets/categoryIcon/PastaIcon.svg";
import Cart from "../../assets/icons/Cart.svg";
import DecreaseButton from "../../assets/icons/DecreaseButton.svg";
import IncreaseButton from "../../assets/icons/IncreaseButton.svg";
import Food1 from "../../assets/images/Foods/Food1.svg";
import Food2 from "../../assets/images/Foods/Food2.svg";
import Food3 from "../../assets/images/Foods/Food3.svg";
import Food4 from "../../assets/images/Foods/Food4.svg";
import Food5 from "../../assets/images/Foods/Food5.svg";
import Food6 from "../../assets/images/Foods/Food6.svg";
import Food7 from "../../assets/images/Foods/Food7.svg";
import Food8 from "../../assets/images/Foods/Food8.svg";
import Food9 from "../../assets/images/Foods/Food9.svg";
import Order1 from "../../assets/images/Orders/Order1.svg";
import ProductPageBg from "../../assets/images/ProductPageBg.svg";
import SpeciealDescount from "../../assets/images/SpeciealDescount.svg";
import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";
import MuiRating from "../../components/MuiRating";
import TextLimit from "../../components/TextLimit";

const Main = () => {
  const foods = [
    {
      title: "Skewer (Beef or Chicken)",
      starting_from: "1200.00",
      image: Food2,
      rateValue: 3.5,
    },
    {
      title: "Grilled chicken",
      starting_from: "1350.00",
      image: Food3,
      rateValue: 5,
    },
    {
      title: "oxtail soup",
      starting_from: "1050.00",
      image: Food4,
      rateValue: 4.5,
    },
    {
      title: "benachin",
      starting_from: "1300.00",
      image: Food5,
      rateValue: 5,
    },
    {
      title: "Sawarma",
      starting_from: "1350.00",
      image: Food6,
      rateValue: 3.5,
    },
    {
      title: "beef Dishes",
      starting_from: "1850.00",
      image: Food1,
      rateValue: 4.5,
    },
  ];

  const popularDashers = [
    {
      title: "Special chicken Rice",
      starting_from: "1300.00",
      image: Food7,
      rateValue: 4.9,
    },
    {
      title: "burger  with French fries",
      starting_from: "1350.00",
      image: Food8,
      rateValue: 4.2,
    },
    {
      title: "our Special",
      starting_from: "2200.00",
      image: Food9,
      rateValue: 5,
    },
  ];

  const categories = [
    { title: "Our Specials", icon: OurSpecialsIcon },
    { title: "Burger", icon: BurgerIcon },
    { title: "Beverages", icon: BeveragesIcon },
    { title: "Noodles", icon: NoodlesIcon },
    { title: "Meat", icon: MeatIcon },
    { title: "Pasta", icon: PastaIcon },
  ];
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          {HeaderSection()}
          {/* Category Section1 - start */}
          <div>
            <div className="mx-5 flex content-center justify-between">
              <div className="my-auto">
                <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text !text-sm font-extrabold uppercase text-transparent md:!text-lg">
                  Categories
                </h1>
              </div>
              <div className="my-auto min-[1650px]:mr-6">
                <Button className="m-0 !mb-2 !mt-1 !rounded-[10px] border-none !bg-gradient-brown-400 !px-5 !py-2 !text-xs font-semibold capitalize text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
                  <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                    see more
                  </p>
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-2 divide-x divide-gradient-yellow-300 lg:grid-cols-6">
              {categories.map((item) => Category(item))}
            </div>
          </div>
          {/* Category Section1 - end */}
          {/* Food Card Section1 - start */}
          <div>
            <div className="mx-5 mb-8 mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {foods.map((item) => Card(item))}
            </div>
          </div>
          {/* Food Card Section1 - end */}
          {/* Category Section2 - start */}
          <div>
            <div className="mx-5 flex content-center justify-between">
              <div className="my-auto">
                <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text !text-sm font-extrabold uppercase text-transparent md:!text-lg">
                  popular dashers
                </h1>
              </div>
              <div className="my-auto min-[1650px]:mr-6">
                <Button className="m-0 !mb-2 !mt-1 !rounded-[10px] border-none !bg-gradient-brown-400 !px-5 !py-2 !text-xs font-semibold capitalize text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
                  <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                    see more
                  </p>
                </Button>
              </div>
            </div>
          </div>
          {/* Category Section2 - end */}
          {/* Food Card Section2 - start */}
          <div>
            <div className="mx-5 mb-8 mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {popularDashers.map((item) => Card(item))}
            </div>
          </div>
          {/* Food Card Section2 - end */}
        </div>
        <div className="sticky top-5 col-span-3 mt-5 h-fit">
          {AddressSection()}
          {OrderMenuSection()}
        </div>
      </div>
    </>
  );
};

export default Main;

function Category(item: { title: string; icon: string }) {
  return (
    <div
      key={item.title}
      className="group/category-item flex justify-center px-2"
    >
      <Button className="m-0 !max-w-full !grow gap-2 border-none !bg-transparent text-xs font-semibold capitalize shadow-none hover:shadow-none md:text-sm">
        <img
          src={item.icon}
          alt=""
          className="h-5 w-5 overflow-hidden rounded-lg object-cover transition-transform duration-300 group-hover/category-item:rotate-12 group-hover/category-item:scale-125"
        />
        <p className="my-auto !bg-gradient-to-tl from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent transition-transform duration-500 group-hover/category-item:scale-110 group-hover/category-item:from-gradient-yellow-900 group-hover/category-item:to-gradient-yellow-500">
          {item.title}
        </p>
      </Button>
    </div>
  );
}

// Food Card
function Card(item: {
  title: string;
  starting_from: string;
  image: string;
  rateValue: number;
}) {
  return (
    <div
      key={item.title}
      className="mb-0 max-w-sm overflow-hidden rounded-xl !bg-opacity-25 bg-gradient-to-b from-gradient-yellow-100-15 to-gradient-yellow-900-10 text-center shadow-lg"
    >
      <img className="w-full" src={item.image} alt={item.title} />
      <div className="mb-0 ml-5 mt-2 flex">
        <MuiRating rateValue={item.rateValue} />
      </div>
      <div className="px-6 pb-4 pt-2">
        <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold !capitalize text-transparent md:text-lg">
          {item.title}
        </h1>
        <div>
          <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-sm font-normal text-transparent">
            Starting from
          </p>
          <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-base font-semibold  text-transparent md:text-lg">
            Rs {item.starting_from}
          </p>
        </div>
        <div className="mt-2">
          <Button className="m-0 !mb-2 !mt-1 min-w-[200px] !rounded-[10px] border-none !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
            <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
              customize
            </p>
          </Button>
          <br />
          <Button className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-transparent !bg-opacity-20 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
            <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
              Add to cart
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}

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
