import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";
import CheckBoxSetResponsive from "../../components/CheckBoxSetResponsive";
import CustomizePageCards from "../../components/CustomizePageCards";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, ProviderContext } from "../../components/Provider";

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
    price: 100,
    value: "tomato",
  },
  {
    id: "onion",
    label: "Onion",
    price: 100,
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
    value: "chrisphy",
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


  if (!productName) {
    return <div>Product not found.</div>;
  }

  const selectedProduct = products.find(
    (product: Product) => product.name === decodeURIComponent(productName)
  );

  const [totalPrice, setTotalPrice] = useState(selectedProduct.price);
  
  // ... (other useState and useContext code)
  
  // const handleOptionChange = (optionPrice: number, isSelected: boolean) => {
  //   if (isSelected) {
  //     setTotalPrice(prevTotal => prevTotal + optionPrice);
  //   } else {
  //     setTotalPrice(prevTotal => prevTotal - optionPrice);
  //   }
  // };

 

console.log(totalPrice);

  if (!selectedProduct) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <div className="!m-auto flex flex-col justify-center object-cover px-12 text-center text-gradient-yellow-300 md:px-28 lg:px-32">
        <div className="mb-16 mt-20 flex flex-col items-center justify-center gap-2 md:mt-40 lg:mt-40 lg:flex-row">
          <div className="order-last grid w-full gap-9 bg-main-background tracking-wide lg:order-first lg:grid-cols-2">
            <div className="col-span-2 mt-10 justify-start text-start text-[20px] font-extrabold text-gradient-yellow-900 sm:text-[25px] md:text-[30px] lg:-mt-28 lg:text-[45px]">
              <h1>Customize Food</h1>
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
              />
            </div>
            <div className="col-span-2 justify-start text-start ">
              <CheckBoxSetResponsive
                label="Chicken Meal"
                className="max-w-xl"
                dataset={chickenDataset}
                type="radio"
                name="chicken"
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
              />
            </div>
            <div className="col-span-2 justify-start text-start ">
              <CheckBoxSetResponsive
                className="max-w-xl"
                label="Secondary Meat Meal"
                dataset={secondaryMeatMeal}
                type="radio"
                name="secondary-meat-meal"
              />
            </div>
            <div className="col-span-2 -mb-5 justify-start text-start ">
              <CheckBoxSetResponsive
                className="max-w-xl"
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
                Confirm Order
              </Button>
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
