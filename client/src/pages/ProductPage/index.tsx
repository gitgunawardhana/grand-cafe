import axios from "axios";
import { useContext } from "react";
import ReactModal from "react-modal";
import { NavLink } from "react-router-dom";
import BeveragesIcon from "../../assets/categoryIcon/BeveragesIcon.svg";
import BurgerIcon from "../../assets/categoryIcon/BurgerIcon.svg";
import MeatIcon from "../../assets/categoryIcon/MeatIcon.svg";
import NoodlesIcon from "../../assets/categoryIcon/NoodlesIcon.svg";
import OurSpecialsIcon from "../../assets/categoryIcon/OurSpecialsIcon.svg";
import PastaIcon from "../../assets/categoryIcon/PastaIcon.svg";
import Cart from "../../assets/icons/Cart.svg";
import DecreaseButton from "../../assets/icons/DecreaseButton.svg";
import IncreaseButton from "../../assets/icons/IncreaseButton.svg";
import Order1 from "../../assets/images/Orders/Order1.svg";
import ProductPageBg from "../../assets/images/ProductPageBg.svg";
import SpeciealDescount from "../../assets/images/SpeciealDescount.svg";
import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";
import MuiRating from "../../components/MuiRating";
import { Product, ProviderContext } from "../../components/Provider";
import TextLimit from "../../components/TextLimit";
import SearchBar from "./../../components/SearchBar/SearchBar";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

let subTotal = 0;

const Main = () => {
  const { products, selectedCategory } = useContext(ProviderContext);

  const categories = [
    { title: "All Meals", value: "all", icon: OurSpecialsIcon },
    { title: "Our Specials", value: "ourspecial", icon: OurSpecialsIcon },
    { title: "Rice", value: "rice", icon: OurSpecialsIcon },
    { title: "Burger", value: "burger", icon: BurgerIcon },
    { title: "Beverages", value: "beverage", icon: BeveragesIcon },
    { title: "Noodles", value: "noodels", icon: NoodlesIcon },
    { title: "Meat", value: "meal", icon: MeatIcon },
    { title: "Pasta", value: "pasta", icon: PastaIcon },
  ];

  const filteredProducts = products.filter(
    (item: {
      _id: string;
      name: string;
      price: string;
      image: string;
      rate: number;
      category: string;
    }) => item.rate > 3.0
  );

  const filtereProducts = products.filter(
    (item: {
      _id: string;
      name: string;
      price: string;
      image: string;
      rate: number;
      category: string;
    }) => item.category == selectedCategory
  );

  let filter: Product[];

  if (!selectedCategory) {
    filter = products;
  } else if (selectedCategory == "all") {
    filter = products;
  } else {
    filter = filtereProducts;
  }

  console.log("Filter Product : ", filtereProducts);
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          {HeaderSection(products)}
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
              {filter.map(
                (product: {
                  _id: string;
                  name: string;
                  price: string;
                  image: string;
                  rate: number;
                  category: string;
                }) => Card(product)
              )}
            </div>
          </div>
          {/* Food Card Section1 - end */}
          {/* Category Section2 - start */}
          <div>
            <div className="mx-5 flex content-center justify-between">
              <div className="my-auto">
                <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text !text-sm font-extrabold uppercase text-transparent md:!text-lg">
                  popular dishes
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
              {filteredProducts
                .sort((a: any, b: any) => b.rate - a.rate)
                .slice(0, 3)
                .map((item: any) => Card(item))}
              //changed
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

function Category(item: { title: string; value: string; icon: string }) {
  const { setSelectedCategory } = useContext(ProviderContext);

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    //console.log(selectedCategory);
  };

  return (
    <div
      key={item.title}
      className="group/category-item flex justify-center px-2"
    >
      <Button
        onClick={() => handleCategoryClick(item.value)}
        className="m-0 !max-w-full !grow gap-2 border-none !bg-transparent text-xs font-semibold capitalize shadow-none hover:shadow-none md:text-sm"
      >
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
  _id: string;
  name: string;
  price: string;
  image: string;
  rate: number;
  category: string;
}) {
  const { modalIsOpen, setModalIsOpen, count, setCount } =
    useContext(ProviderContext);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Add background overlay color and opacity
      zIndex: 800, // Higher zIndex to bring overlay to the front
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      border: "2px", // Remove border
      borderRadius: "10px", // Apply border radius
      boxShadow: "0 4px 6px rgba(0, 0, 1, 1)",
      background:
        "linear-gradient(to bottom, rgba(255, 212, 83, 0.7), rgba(255, 146, 36, 0.5))",
      zIndex: 1500,
    },
  };
  const { total, setTotal } = useContext(ProviderContext);
  subTotal = total;
  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/add_cart/getCart"
      );
      if (response.data.data) {
        const totalPrice = response.data.data.reduce(
          (accumulator: number, item: CartItem) =>
            accumulator + item.quantity * item.price,
          0
        );
        setTotal(totalPrice);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleAddToCart = async () => {
    // Send API request to add item to cart
    const response = await fetch("http://localhost:8000/api/add_cart/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: count,
      }),
    });
    if (response.status === 201) {
      // Handle success
      closeModal();
      fetchCartData();
      console.log("Success");
      alert("Product added to the cart!");
    } else {
      // Handle error
      if (response.status === 400) {
        alert("Item is already in the cart. You can change quantity by cart");
        console.error("Error adding item to the cart");
      }

      console.error("Error adding item to the cart");
    }
  };

  return (
    <div
      key={item.name}
      className="mb-0 max-w-sm overflow-hidden rounded-xl !bg-opacity-25 bg-gradient-to-b from-gradient-yellow-100-15 to-gradient-yellow-900-10 text-center shadow-lg"
    >
      <img className="w-full" src={item.image} alt={item.name} />
      <div className="mb-0 ml-5 mt-2 flex">
        <MuiRating rateValue={item.rate} />
      </div>
      <div className="px-6 pb-4 pt-2">
        <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold !capitalize text-transparent md:text-lg">
          {item.name}
        </h1>
        <div>
          <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-sm font-normal text-transparent">
            Starting from
          </p>
          <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-base font-semibold  text-transparent md:text-lg">
            Rs {item.price}
          </p>
        </div>
        <div className="mt-2">
          <Button
            as={NavLink}
            to={`/customize-page/${item.name}`}
            className="m-0 !mb-2 !mt-1 min-w-[200px] !rounded-[10px] border-none !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
          >
            <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
              customize
            </p>
          </Button>
          <br />
          <Button
            onClick={openModal}
            className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-transparent !bg-opacity-20 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
          >
            <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
              Add to cart
            </p>
          </Button>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Add to Cart Modal"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="!bg-gradient-to-r from-gradient-brown-900 to-gradient-brown-400 bg-clip-text font-extrabold !capitalize text-transparent md:text-xl">
                Add items to the cart
              </h2>
              <br />
              <img
                src={item.image}
                className="rounded-2xl border opacity-[1] duration-300 ease-in hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[80px] md:min-w-[40px] lg:h-[135px]"
              />

              <div className="flex items-center space-x-4 p-2">
                <button
                  className="rounded-full border-yellow-600 !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 p-2 transition duration-300 hover:bg-gray-300"
                  onClick={decrement}
                >
                  <span className="text-xl font-bold">-</span>
                </button>
                <span className="text-2xl font-semibold">{count}</span>
                <button
                  className="rounded-full !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 p-2 transition duration-300 hover:bg-gray-300"
                  onClick={increment}
                >
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                as={NavLink}
                to={""}
                className="m-0 !mb-2 !mt-1 min-w-[200px] !rounded-[10px] border-none !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
              >
                <p className="!bg-gradient-to-b from-gradient-brown-400 to-gradient-brown-400 bg-clip-text text-transparent">
                  Add to Cart
                </p>
              </Button>
              <Button
                onClick={closeModal}
                className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-transparent !bg-opacity-20 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
              >
                <p className="!bg-gradient-to-b from-gradient-brown-400 to-gradient-brown-400 bg-clip-text text-transparent">
                  Close
                </p>
              </Button>
            </div>
          </ReactModal>
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
              Rs {subTotal}
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
          Rs {"2300"}
        </p>
      </div>
    </div>
  );
}

// Header Section
function HeaderSection(products: Product[]) {
  return (
    <div
      style={{
        backgroundImage: `url(${ProductPageBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-auto"
    >
      <SearchBar dataSet={products}></SearchBar>

      <div className="relative h-auto p-5 md:mt-10">
        <img
          src={SpeciealDescount}
          className="rounded-[8px] md:rounded-[20px]"
        />
      </div>
    </div>
  );
}
