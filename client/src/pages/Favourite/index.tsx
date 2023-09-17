import React, { useContext, useState, useEffect } from "react";
import {  NavLink } from "react-router-dom";
import { Button } from "../../base-components/Button";
import MuiRating from "../../components/MuiRating";
import axios from "axios";
import { Link } from "react-router-dom";

import { Product, ProviderContext } from "../../components/Provider";


const index = () => {
    const [favourites, setFavourites] = useState<Product[]>([]); 

    const fetchCategories = async () => {
      try {
       const email = sessionStorage.email;
        const response = await axios.post(
            "http://localhost:8000/api/favourite/viewFavourites",
            { email }
          );
        if (response.data.data) {
            setFavourites(response.data.data);
         console.log("Success",favourites);
        }
        console.log("Error fetching cart data");
      } catch (error) {
        console.error("Error fetching cart data:", error);
        
      }
    };
    useEffect(() => {
        fetchCategories();
      }, []);

  return (
    <div>
      <div className="mx-5 mb-8 mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {favourites.map(
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
  )
}

export default index

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
    
  
    return (
      <div
        key={item.name}
        className="mb-0 max-w-sm overflow-hidden rounded-xl !bg-opacity-25 bg-gradient-to-b from-gradient-yellow-100-15 to-gradient-yellow-900-10 text-center shadow-lg"
      >
        <img className="w-full" src={item.image} alt={item.name} />
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




