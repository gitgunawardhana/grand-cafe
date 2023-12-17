import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../base-components/Button";
import MuiRating from "../../components/MuiRating";
import axios from "axios";
import { Link } from "react-router-dom";


const index = () => {
  const [favourites, setFavourites] = useState([]);

  const fetchCategories = async () => {
    try {
      const email = sessionStorage.email;
      const response = await axios.post(
        "http://localhost:8000/api/favourite/viewFavourites",
        { email }
      );
      if (response.data.data) {
        setFavourites(response.data.data);
      }
      console.log("Success", favourites);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="mx-5 mb-8 mt-8 flex flex-col gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
      <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold !capitalize text-transparent md:text-3xl">
        &nbsp; &nbsp;Favourite Items</h1>
        <div className="flex">
        {favourites.map((favorite) => (
          <Card key={favorite._id} favorite={favorite} fetchCategories={fetchCategories} />
        ))}
        </div>
        
      </div>
    </div>
  );
};

export default index;

function Card({ favorite , fetchCategories }) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 800,
    },
    content: {
      top: "50%",
      left: "50%",
      width:"100%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      border: "2px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 1, 1)",
      background:
        "linear-gradient(to bottom, rgba(255, 212, 83, 0.7), rgba(255, 146, 36, 0.5))",
      zIndex: 1500,
    },
  };

  const { _id, favourite } = favorite;

  const removeFavourites = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
    try {
      const response = await axios.post(`http://localhost:8000/api/favourite/deleteFavourites/${_id}`);
  
      if (response.status === 201) {
        alert('Product removed from favorites!');
        fetchCategories();
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }
  };

  useEffect(() => {
    fetchCategories();
  }, [favorite]);

  return (
    <div
      key={_id}
      className="mb-0 max-w-sm mr-48 ml-14 overflow-hidden rounded-xl !bg-opacity-25 bg-gradient-to-b from-gradient-yellow-100-15 to-gradient-yellow-900-10 text-center shadow-lg"
    >
      <img className="w-full" src={favourite.image} alt={favourite.name} />
      <div className="mb-0 ml-5 mt-2 flex">
        <MuiRating rateValue={favourite.rate} productId={_id} active={false} />
      </div>
      <div className="px-6 pb-4 pt-2">
        <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold !capitalize text-transparent md:text-lg">
          <Link to={`/product/${encodeURIComponent(favourite.name)}`}>
            {favourite.name}
          </Link>
        </h1>
        <div>
          <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-sm font-normal text-transparent">
            Starting from
          </p>
          <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-base font-semibold text-transparent md:text-lg">
            Rs. {favourite.price}.00
          </p>
        </div>
        <div className="mt-2">
          <Button
            as={NavLink}
            to={`/product/${favourite.name}`}
            className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-transparent !bg-opacity-20 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
          >
            <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
              View Product
            </p>
          </Button>
          <br/><br/>
          <Button
            as={NavLink}
            onClick={removeFavourites}
            className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-red-800 !bg-opacity-20 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
          >
            <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
              Remove Favourites
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}
