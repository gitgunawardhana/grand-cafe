import React, { useContext, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Product, ProviderContext } from "../../components/Provider";
import { Button } from "../../base-components/Button";
import MuiRating from "../../components/MuiRating";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

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

const ProductDetails: React.FC = () => {
  // modal open close
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // counter on card
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
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
        _id : selectedProduct._id,
        name: selectedProduct.name,
        price: selectedProduct.price,
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
      if(response.status === 400){ 
        alert("Item is already in the cart. You can change quantity by cart");
        console.error("Error adding item to the cart");
      }
     
      console.error("Error adding item to the cart");
  }
  };

  const { products } = useContext(ProviderContext);
  const { productName } = useParams<{ productName?: string }>();

  if (!productName) {
    return <div>Product not found.</div>;
  }

  const selectedProduct = products.find(
    (product: Product) => product.name === decodeURIComponent(productName)
  );

  if (!selectedProduct) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="grid w-full items-center justify-center md:grid-cols-2">
        <div className="m-6  flex items-center justify-center p-12">
          <img
            className="w-full   cursor-pointer rounded-2xl border opacity-[1] duration-300 ease-in hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[400px] md:min-w-[230px] lg:h-[450px]"
            src={selectedProduct.image}
            alt={selectedProduct.name}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className=" m-6 flex h-modal w-4/6 items-center justify-center rounded-3xl !bg-opacity-25 bg-gradient-to-b from-gradient-yellow-100-15 to-gradient-yellow-900-10 p-10 shadow-md">
            <div className="px-6 pb-4 pt-2">
              <MuiRating rateValue={selectedProduct.rateValue} />
              <br />
              <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold !capitalize text-transparent md:text-lg">
                {selectedProduct.name}
              </h1>
              <div>
                <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-sm font-normal text-transparent">
                  Starting from
                </p>
                <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-base font-semibold  text-transparent md:text-lg">
                  Rs {selectedProduct.price}
                </p>
              </div>
              <br />
              <div className="mt-2">
                <Button
                  as={NavLink}
                  to={`/customize-page/${encodeURIComponent(
                    selectedProduct.name
                  )}`}
                  className="m-0 !mb-2 !mt-1 min-w-[200px] !rounded-[10px] border-none !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
                >
                  <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                    customize
                  </p>
                </Button>
                <br />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
