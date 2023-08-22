import React, { useContext, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Product, ProviderContext } from "../../components/Provider";
import { Button } from "../../base-components/Button";
import MuiRating from "../../components/MuiRating";
import ReactModal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Add background overlay color and opacity
    zIndex: 800, // Higher zIndex to bring overlay to the front
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: '2px', // Remove border
    borderRadius: '10px', // Apply border radius
    boxShadow: '0 4px 6px rgba(0, 0, 1, 1)',
    background: 'linear-gradient(to bottom, rgba(255, 212, 83, 0.7), rgba(255, 146, 36, 0.5))',
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
    const [count, setCount] = useState(0);
  
    const increment = () => {
      setCount(count + 1);
    };
  
    const decrement = () => {
      if (count > 1) {
        setCount(count - 1);
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
    <div className="flex justify-center items-center ">
      <div className="grid w-full justify-center items-center md:grid-cols-2">
        <div className="flex  justify-center items-center p-12 m-6">
          <img className="w-full   cursor-pointer rounded-2xl opacity-[1] duration-300 ease-in border hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[400px] md:min-w-[230px] lg:h-[450px]" src={`data:image/jpeg;base64,${selectedProduct.image}`} alt={selectedProduct.name} />
        </div>
        <div className="flex justify-center items-center">
          <div className=" flex justify-center items-center !bg-opacity-25 bg-gradient-to-b from-gradient-yellow-100-15 to-gradient-yellow-900-10 shadow-md w-4/6 h-modal rounded-3xl p-10 m-6">
            <div className="px-6 pb-4 pt-2">
              <MuiRating rateValue={selectedProduct.rateValue} />
              <br/>
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
              </div><br/>
              <div className="mt-2">
                <Button as={NavLink}
                  to={`/customize-page/${encodeURIComponent(selectedProduct.name)}`} className="m-0 !mb-2 !mt-1 min-w-[200px] !rounded-[10px] border-none !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
                  <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                    customize
                  </p>
                </Button><br/>
                <br />
                <Button onClick={openModal} className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-transparent !bg-opacity-20 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
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
                  <div className="flex flex-col text-center justify-center items-center">
                    <h2 className="!bg-gradient-to-r from-gradient-brown-900 to-gradient-brown-400 bg-clip-text font-extrabold !capitalize text-transparent md:text-xl">Add items to the cart</h2>
                    <br/>
                    <img src={`data:image/jpeg;base64,${selectedProduct.image}`} className="rounded-2xl opacity-[1] duration-300 ease-in border hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[80px] md:min-w-[40px] lg:h-[135px]"/>
                   
                    <div className="flex items-center space-x-4 p-2">
                      <button
                        className="p-2 rounded-full border-yellow-600 !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 hover:bg-gray-300 transition duration-300"
                        onClick={decrement}
                      >
                        <span className="text-xl font-bold">-</span>
                      </button>
                      <span className="text-2xl font-semibold">{count}</span>
                      <button
                        className="p-2 rounded-full !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 hover:bg-gray-300 transition duration-300"
                        onClick={increment}
                      >
                        <span className="text-xl font-bold">+</span>
                      </button>
                    </div>
                    <Button as={NavLink}
                  to={''} className="m-0 !mb-2 !mt-1 min-w-[200px] !rounded-[10px] border-none !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
                  <p className="!bg-gradient-to-b from-gradient-brown-400 to-gradient-brown-400 bg-clip-text text-transparent">
                    Add to Cart
                  </p>
                </Button>
                <Button onClick={closeModal} className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-transparent !bg-opacity-20 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
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
