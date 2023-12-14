import axios from "axios";
import { useContext, useState, useEffect } from "react";
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
import Order2 from "../../assets/images/Orders/hotdog.jpeg";
import Order3 from "../../assets/images/Orders/sandwich.jpeg";
import ProductPageBg from "../../assets/images/ProductPageBg.svg";
import SpeciealDescount from "../../assets/images/SpeciealDescount.svg";
import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";
import MuiRating from "../../components/MuiRating";
import { Product, ProviderContext } from "../../components/Provider";
import TextLimit from "../../components/TextLimit";
import SearchBar from "./../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface Category {
  _id: string;
  category: string;
}

// interface ItemSales {
//   itemId: string;
//   category: string;
// }

let subTotal = 0;

const Main = () => {
  const { products, selectedCategory } = useContext(ProviderContext);

  const [categories, setCategories] = useState<Category[]>([]); 

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/category/viewcategory"
      );
      if (response.data.data) {
        setCategories([{ _id: 'all', category: 'All' }, ...response.data.data]);
       console.log("Success");
      }
      console.log("Error fetching cart data");
    } catch (error) {
      console.error("Error fetching cart data:", error);
      
    }
  };

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
  } else if (selectedCategory == "All") {
    filter = products;
  } else {
    filter = filtereProducts;
  }
  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);
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
                .map((product: any) => Card(product))}
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

function Category(item: { category: string; }) {
  const { setSelectedCategory } = useContext(ProviderContext);

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    //console.log(selectedCategory);
  };

  return (
    <div
      key={item.category}
      className="group/category-item flex justify-center px-2"
    >
      <Button
        onClick={() => handleCategoryClick(item.category)}
        className="m-0 !max-w-full !grow gap-2 border-none !bg-transparent text-xs font-semibold capitalize shadow-none hover:shadow-none md:text-sm"
      >
        <p className="my-auto !bg-gradient-to-tl from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent transition-transform duration-500 group-hover/category-item:scale-110 group-hover/category-item:from-gradient-yellow-900 group-hover/category-item:to-gradient-yellow-500">
          {item.category}
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

  return (
    <div
      key={item.name}
      className="mb-0 max-w-sm overflow-hidden rounded-xl !bg-opacity-25 bg-gradient-to-b from-gradient-yellow-100-15 to-gradient-yellow-900-10 text-center shadow-lg"
    >
      <img  style={{
      height: '250px',  // Set a constant height for non-web view
      width: '100%',    // Let the width adjust accordingly
      '@media (min-width: 768px)': {
        height: '150px', // Adjust the height for web view (example value)
      },
    }}
    className="w-full" src={item.image} alt={item.name} />
      <div className="mb-0 ml-5 mt-2 flex">
        <MuiRating rateValue={item.rate} productId={item._id} active={false} />
      </div>
      <div className="px-6 pb-4 pt-2">
        <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold !capitalize text-transparent md:text-lg">
        <Link to={`/product/${encodeURIComponent(item.name)}`}>{item.name}</Link>
        </h1>
        <div>
          <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-sm font-normal text-transparent">
            Starting from
          </p>
          <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-base font-semibold  text-transparent md:text-lg">
            Rs. {item.price}.00
          </p>
        </div>
        <div className="mt-2">

          {item.category=="Burger" || item.category === "Shawarma" || item.category === "Hotdog" || item.category === "Submarine" ?(<Button
            as={NavLink}
            to={`/customize-page/${item.name}`}
            className="m-0 !mb-2 !mt-1 min-w-[200px] !rounded-[10px] border-none !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
          >
            <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
              customize
            </p>
          </Button>):(
          <div>

          </div>)}
          
          <br />
          <Button
            as={NavLink}
            to={`/product/${item.name}`}
            className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-transparent !bg-opacity-20 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
          >
            <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
              View Product
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
          Hot items
        </h1>
        <div className="grid grid-cols-1 divide-y divide-gradient-yellow-300">
          <div>{Order("Shawarma",1250,Order1)}</div>
          <div>{Order("Hot Dog",950,Order2)}</div>
          <div>{Order("Sandwiches",450,Order3)}</div>
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
        <Button 
        to="/cart"
        className="m-0 !max-w-full !grow gap-2 !rounded-b-[20px] !rounded-t-[0px] border-none !bg-gradient-to-bl from-gradient-green-400 to-gradient-green-300 text-xs font-semibold uppercase text-black hover:text-black md:text-sm">
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
function Order(name:string, price:number,image:string) {

  // const [items, setItems] = useState();
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8000/api/get-items/get-item-sales"
  //     );
  //     if (response.data.data) {
  //       setItems(response.data.data);
  //      console.log("Success");
  //     }
  //     console.log("Error fetching cart data");
  //   } catch (error) {
  //     console.error("Error fetching cart data:", error);
      
  //   }
  // };

  // const filteredProducts = items.filter(
  //   (item: {
  //     _id: string;
  //     name: string;
  //     price: string;
  //     image: string;
  //     rate: number;
  //     category: string;
  //   }) => item.rate > 3.0
  // );


  return (
    <div className="my-2 flex flex-wrap justify-between gap-3">
      <div>
        <img
          src={image}
          alt=""
          className="h-16 w-16 overflow-hidden rounded-lg object-cover opacity-70"
        />
      </div>
      <div className="grow">
        <h2 className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-xs font-black text-transparent md:text-sm">
          <TextLimit text={name} limit={14} />
        </h2>
      </div>
      <div>
        <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-xs font-black text-transparent md:text-sm">
          Rs {price}
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
