import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";
import CheckBoxSetResponsive from "../../components/CheckBoxSetResponsive";
import CustomizePageCards from "../../components/CustomizePageCards";
import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Product, ProviderContext } from "../../components/Provider";
import ReactModal from "react-modal";
import axios from "axios";

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

const vegetableSlicesDataset = [
  {
    id: "potato ",
    label: "Potato",
    price: 100,
    value: "potato",
  },
  {
    id: "tomato",
    label: "Tomato",
    price: 120,
    value: "tomato",
  },
  {
    id: "onion",
    label: "Onion",
    price: 130,
    value: "onion",
  },
];

const chickenDataset = [
  {
    id: "grilled",
    label: "Grilled",
    price: 200,
    value: "grilled",
  },
  {
    id: "devilled",
    label: "Devilled",
    price: 250,
    value: "devilled",
  },
  {
    id: "crisphy",
    label: "Crisphy",
    price: 300,
    value: "crisphy",
  },
];

const extraCheeseDataset = [
  {
    id: "cheddar-cheese",
    label: "Cheddar",
    price: 150,
    value: "cheddar-cheese",
  },
  {
    id: "parmesan-cheese",
    label: "Parmesan",
    price: 150,
    value: "parmesan-cheese",
  },
  {
    id: "mozzarella-cheese",
    label: "Mozzarella",
    price: 200,
    value: "mozzarella-cheese",
  },
];

const secondaryMeatMeal = [
  {
    id: "ham",
    label: "Ham",
    price: 250,
    value: "ham",
  },
  {
    id: "mutton",
    label: "Mutton",
    price: 350,
    value: "mutton",
  },
  {
    id: "beef",
    label: "Beef",
    price: 350,
    value: "beef",
  },
];

const bunSize = [
  {
    id: "small",
    label: "Small",
    price: 250,
    value: "small",
  },
  {
    id: "medium",
    label: "Medium",
    price: 350,
    value: "medium",
  },
  {
    id: "large",
    label: "Large",
    price: 450,
    value: "large",
  },
];

const addFrenchFries = [
  {
    id: "yes",
    label: "Yes",
    price: 100,
    value: "yes",
  },
  {
    id: "no",
    label: "No",
    price: 0,
    value: "no",
  },
];

const Main = () => {
  const { products } = useContext(ProviderContext);
  const { productName } = useParams<{ productName?: string }>();
  const {userId, setUserId} = useContext(ProviderContext);

  if (!productName) {
    return <div>Product not found.</div>;
  }

  const selectedProduct = products.find(
    (product: Product) => product.name === decodeURIComponent(productName)
  );

  if (!selectedProduct) {
    return <div>Product not found.</div>;
  }
  const [selectedCheeseOption, setSelectedCheeseOption] = useState<string>("");
  const [selectedChickenOption, setSelectedChickenOption] =
    useState<string>("");
  const [selectedVegetableOptions, setSelectedVegetableOptions] = useState<
    string[]
  >([]);
  const [selectedMeatOption, setSelectedMeatOption] = useState<string>("");
  const [selectedBunSizeOption, setSelectedBunSizeOption] =
    useState<string>("");
  const [selectedFrenchFriesOption, setSelectedFrenchFriesOption] =
    useState<string>("");
  const [totalPrice, setTotalPrice] = useState(selectedProduct.price);
  const [selectedOptionsTotal, setSelectedOptionsTotal] = useState<number>(0);
  useEffect(() => {
    // Calculate the total price based on selected options
    let calculatedTotal = 0;

    if (selectedCheeseOption) {
      calculatedTotal += parseInt(selectedCheeseOption);
      console.log("Chicken", selectedCheeseOption);
    }

    if (selectedChickenOption) {
      calculatedTotal += parseInt(selectedChickenOption);
      console.log("Chicken", selectedChickenOption);
    }

    if (selectedVegetableOptions.length > 0) {
      const vegetableTotal = selectedVegetableOptions.reduce(
        (vegetableTotal, option) => {
          const numericValue = parseInt(option);
          if (!isNaN(numericValue)) {
            return vegetableTotal + numericValue;
          } else {
            return vegetableTotal;
          }
        },
        0
      );

      calculatedTotal += vegetableTotal;
      console.log("Veg", vegetableTotal);
    }

    if (selectedMeatOption) {
      calculatedTotal += parseInt(selectedMeatOption);
      console.log("Meat", selectedOptionsTotal);
    }

    if (selectedBunSizeOption) {
      calculatedTotal += parseInt(selectedBunSizeOption);
      console.log("Bun", selectedBunSizeOption);
      console.log("Tot", selectedOptionsTotal);
    }

    if (selectedFrenchFriesOption) {
      calculatedTotal += parseInt(selectedFrenchFriesOption);
      console.log("French", selectedFrenchFriesOption);
      console.log("Tot", selectedOptionsTotal);
    }

    setSelectedOptionsTotal(calculatedTotal);

    // Add the total price to the selected product's price
    //setTotalPrice(selectedProduct.price + selectedOptionsTotal);
    console.log("Item price", totalPrice);
    console.log("selected tot", selectedOptionsTotal);
  }, [
    selectedProduct,
    selectedCheeseOption,
    selectedChickenOption,
    selectedVegetableOptions,
    selectedMeatOption,
    selectedBunSizeOption,
    selectedFrenchFriesOption,
  ]);

  const handleCheeseOptionChange = (optionValue: string) => {
    setSelectedCheeseOption(optionValue);
  };

  const handleChickenOptionChange = (optionValue: string) => {
    setSelectedChickenOption(optionValue);
  };

  const handleVegetableOptionChange = (optionValue: string) => {
    const selectedOption = vegetableSlicesDataset.find(
      (item) => item.price === parseInt(optionValue)
    );

    if (selectedOption) {
      const updatedTotal = selectedOptionsTotal + selectedOption.price;
      setSelectedOptionsTotal(updatedTotal);

      const updatedOptions = selectedVegetableOptions.includes(optionValue)
        ? selectedVegetableOptions.filter((opt) => opt !== optionValue)
        : [...selectedVegetableOptions, optionValue];

      setSelectedVegetableOptions(updatedOptions);
    }
    console.log("not running");
  };

  const handleMeatOptionChange = (optionValue: string) => {
    setSelectedMeatOption(optionValue);
  };

  const handleBunSizeOptionChange = (optionValue: string) => {
    setSelectedBunSizeOption(optionValue);
  };

  const handleFrenchFriesOptionChange = (optionValue: string) => {
    setSelectedFrenchFriesOption(optionValue);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  let user = "";

  const email = sessionStorage.email;

  if(!email){
    user = userId;
    console.log("user w", user);
  }else {
    // If email is present, fetch user data based on email and get userCode
    const fetchAllUsers = async () => {
  try {
    // Send a request to fetch all users
    const response = await axios.get("http://localhost:8000/api/user/get-all-users");
    
    if (response.status === 200) {
      // Assuming the response contains an array of user objects
      const allUsers = response.data;
      
      // Filter users based on the session storage email
      const filteredUsers = allUsers.filter((user: { email: any; }) => user.email === sessionStorage.email);
      
      if (filteredUsers.length > 0) {
        // User with matching email found
        const userData = filteredUsers[0]; // Assuming only one user matches
        user = userData.userCode;
        console.log( "User s",user);
        setUserId(user); // Assign userCode to the user variable
      } else {
        // User with matching email not found
        console.log('User with email not found');
      }
    } else {
      console.log('Failed to fetch all users');
    }
  } catch (error) {
    console.error('Error fetching all users', error);
  } 
};

// Call the fetchAllUsers function to fetch all users and filter by email
fetchAllUsers();
  }


  const handleAddToCart = async () => {

    const customName = `${selectedProduct.name} Customized`;
    const totalP = selectedOptionsTotal + totalPrice;
    const customId = `${selectedProduct._id}cu`;

    // Send API request to add item to cart
    const response = await fetch("http://localhost:8000/api/add_cart/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: customId,
        u_id: user,
        name: customName,
        price: totalP,
        category: selectedProduct?.category,
        image: selectedProduct.image,
        quantity: count,
      }),
    });
    if (response.status === 201) {
      // Handle success
      closeModal();
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

  if (!selectedProduct) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <div className="!m-auto flex flex-col justify-center object-cover px-12 text-center text-gradient-yellow-300 md:px-28 lg:px-32">
        <div className="mb-16 mt-20 flex flex-col items-center justify-center gap-2 md:mt-40 lg:mt-40 lg:flex-row">
          <div className="order-last grid w-full gap-9 bg-main-background tracking-wide lg:order-first lg:grid-cols-2">
            <div className="col-span-2 mt-10  justify-start text-start text-[20px] font-extrabold text-gradient-yellow-900 sm:text-[25px] md:text-[30px] lg:-mt-28 lg:text-[45px]">
              <div>
                <h1>Customize Food</h1>{" "}
              </div>
            </div>

            <div className="col-span-2 justify-start text-start sm:col-span-1">
              <InputField
                className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                label="Meal Item"
                value={selectedProduct.name}
                labelClassName="!bg-main-background !text-gradient-yellow-900 text-xs p-1 pr-16"
                placeholder="Crispy Chicken"
              />
            </div>
            <div className="col-span-2 justify-start text-start sm:col-span-1">
              <CheckBoxSetResponsive
                className="border-none"
                dataset={extraCheeseDataset}
                type="radio"
                name="extra-chicken"
                selectedOption={selectedCheeseOption}
                onOptionChange={handleCheeseOptionChange}
              />
            </div>
            <div className="col-span-2 justify-start text-start ">
              <CheckBoxSetResponsive
                label="Chicken Meal"
                className="max-w-xl"
                dataset={chickenDataset}
                type="radio"
                name="chicken"
                selectedOption={selectedChickenOption}
                onOptionChange={handleChickenOptionChange}
                // onOptionChange={handleOptionChange}
              />
            </div>
            <div className="col-span-2 justify-start text-start ">
              <CheckBoxSetResponsive
                label="Vegetable Slices"
                className="max-w-xl"
                dataset={vegetableSlicesDataset}
                type="checkbox"
                name="vegetable-slices"
                selectedOption={selectedVegetableOptions}
                onOptionChange={handleVegetableOptionChange}
              />
            </div>
            <div className="col-span-2 justify-start text-start ">
              <CheckBoxSetResponsive
                className="max-w-xl"
                label="Secondary Meat Meal"
                dataset={secondaryMeatMeal}
                type="radio"
                name="secondary-meat-meal"
                selectedOption={selectedMeatOption}
                onOptionChange={handleMeatOptionChange}
              />
            </div>
            <div className="col-span-2 -mb-5 justify-start text-start ">
              <CheckBoxSetResponsive
                className="max-w-xl"
                label="Bun Size"
                dataset={bunSize}
                type="radio"
                name="bun-size"
                selectedOption={selectedBunSizeOption}
                onOptionChange={handleBunSizeOptionChange}
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
                selectedOption={selectedFrenchFriesOption}
                onOptionChange={handleFrenchFriesOptionChange}
              />
            </div>
            <div className="col-span-2 columns-2 justify-start text-start">
              <div>
                <Button 
                onClick={openModal} 
                className="!rounded-[20px] border-none !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 !px-9 font-semibold uppercase text-black hover:text-black">
                  Confirm Order
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
                      src={selectedProduct.image}
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
              <div className="text-[15px] font-extrabold text-gradient-yellow-900">
                <div>
                  Item price : {" Rs."}
                  {totalPrice} &nbsp;&nbsp; Total :{" "}
                  {totalPrice + selectedOptionsTotal}
                </div>
                <div className="pt-5">
                  Customize Price :{" Rs. "}
                  {selectedOptionsTotal}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center bg-main-background">
            <CustomizePageCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
