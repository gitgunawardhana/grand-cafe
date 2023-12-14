import React, { useContext, useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Product, ProviderContext } from "../../components/Provider";
import { Button } from "../../base-components/Button";
import MuiRating from "../../components/MuiRating";
import ReactModal from "react-modal";
import InputField from "../../base-components/FormElements/InputElement";
import axios from "axios";

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
    border: "none", // Remove border
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
  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addressEntered, setAddressEntered } = useContext(ProviderContext);
  const [address, setAddress] = useState("");
  const { userId, setUserId } = useContext(ProviderContext);
  const { userAddress, setUserAddress } = useContext(ProviderContext);
  
  
  const handleAddAddress = async () => {
    setAddressEntered(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/address/addAddress",
        {
          address: address,
        }
      );
      if (response.status === 201) {
        setUserId(response.data.userCode);
        console.log("Newly created userId:", response.data.userCode);
        setAddressEntered(true);
      } else {
        console.error("Failed to create user. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/address/view/${userId}`
        );

        if (response.status === 200) {
          setUserAddress(response.data.data);
          console.log(userAddress);
        } else {
          console.log("Failed to fetch user address");
        }
      } catch (error) {
        console.error("Error fetching user address", error);
      }
    };
    console.log(userId);
    console.log("User add ", userAddress);
    fetchUserAddress();
  }, [userId]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal2 = () => {
    setModal2IsOpen(true);
  };

  const closeModal2 = () => {
    setModal2IsOpen(false);
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

  const { products } = useContext(ProviderContext);
  const { productName } = useParams<{ productName?: string }>();

  if (!productName) {
    return <div>Product not found.</div>;
  }

  const selectedProduct = products.find(
    (product: Product) => product.name === decodeURIComponent(productName)
  );

  let user = "";

  const email = sessionStorage.email;

  if (!email) {
    user = userId;
  } else {
    // If email is present, fetch user data based on email and get userCode
    const fetchAllUsers = async () => {
      try {
        // Send a request to fetch all users
        const response = await axios.get(
          "http://localhost:8000/api/user/get-all-users"
        );

        if (response.status === 200) {
          // Assuming the response contains an array of user objects
          const allUsers = response.data;

          // Filter users based on the session storage email
          const filteredUsers = allUsers.filter(
            (user: { email: any }) => user.email === sessionStorage.email
          );

          if (filteredUsers.length > 0) {
            // User with matching email found
            const userData = filteredUsers[0]; // Assuming only one user matches
            user = userData.userCode;
            console.log(user);
            setUserId(user); // Assign userCode to the user variable
          } else {
            // User with matching email not found
            console.log("User with email not found");
          }
        } else {
          console.log("Failed to fetch all users");
        }
      } catch (error) {
        console.error("Error fetching all users", error);
      }
    };

    // Call the fetchAllUsers function to fetch all users and filter by email
    fetchAllUsers();
  }

  const handleUser = async () => {
    console.log(email);
    if (!email) {
      console.log("No email");
      openModal2();
    } else {
      console.log(email);
      openModal();
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
        id: selectedProduct?._id,
        u_id: user,
        name: selectedProduct?.name,
        price: selectedProduct?.price,
        category: selectedProduct?.category,
        image: selectedProduct?.image,
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

  
  //const [isFavorite, setIsFavorite] = useState(false);

  const addToFavorites = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/favourite/addFavourites', {
        email: email, // You should replace this with your user's email or user ID
        productId: selectedProduct?._id, // Replace with the product's ID
      });
      console.log("Grand P",selectedProduct?._id)

      if (response.status === 201) {
        setIsFavorite(true);
        alert('Product added to favorites!');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  


  

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
        <div className="flex  flex-col items-center justify-center ">
          <br />
          <AddressSection selectedProduct={selectedProduct} isFavorite={isFavorite} addToFavorites={addToFavorites}  />
          //? button
          <div className=" m-6 flex h-modal w-4/6 items-center justify-center rounded-3xl !bg-opacity-25 bg-gradient-to-b from-gradient-yellow-100-15 to-gradient-yellow-900-10 p-10 shadow-md">
            <div className="px-6 pb-4 pt-2">
              <div className="flex  ">
                <div className="justify-arround flex flex-col mr-4">
                <MuiRating rateValue={selectedProduct.rate} productId={selectedProduct._id} active={true} />
                
              </div>
              <div className="my-auto">
                  
                </div>
                </div>

              <br />
              <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold !capitalize text-transparent md:text-lg">
                {selectedProduct.name}
              </h1>
              <div>
                <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-sm font-normal text-transparent">
                  Starting from
                </p>
                <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-base font-semibold  text-transparent md:text-lg">
                  Rs. {selectedProduct.price}.00
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
                  onClick={handleUser}
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
                {/* Address model */}
                <ReactModal
                  isOpen={modal2IsOpen}
                  onRequestClose={closeModal2}
                  style={customStyles}
                  contentLabel="Add to Cart Modal"
                >
                  <div className="flex flex-col items-center justify-center text-center ">
                    <h2 className="!bg-gradient-to-r from-gradient-brown-900 to-gradient-brown-400 bg-clip-text font-extrabold !capitalize text-transparent md:text-xl">
                      You have to add address to continue
                    </h2>
                    <br />

                    <div className="flex w-3/5 items-center space-x-4 p-2">
                      <div className="grow flex-wrap gap-3 md:flex">
                        <div className="mb-2 grow md:mb-0 md:h-9">
                          <InputField
                            type="text"
                            className="mx-auto border !border-gradient-yellow-900 pb-2 pt-1 !text-sm !text-black placeholder-gradient-yellow-500 !placeholder-opacity-25 md:pb-2 md:pt-2"
                            placeholder="No:21/32, Okandh..."
                            value={addressEntered ? userAddress : address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={addressEntered}
                          />
                        </div>
                        <div className="">
                          {
                            addressEntered ? (
                              <div>
                                {/* ... (other code) */}
                                <Button className="m-0 !rounded-[10px] border-none !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
                                  Change
                                </Button>
                                {/* ... (other code) */}
                              </div>
                            ) : (
                              <div>
                                {/* ... (other code) */}
                                <Button
                                  onClick={handleAddAddress}
                                  className="m-0 !rounded-[10px] border-none !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
                                >
                                  Add
                                </Button>
                                {/* ... (other code) */}
                              </div>
                            ) /* Render nothing if address is not entered */
                          }
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="flex">
                      <div>
                        <img
                          src={selectedProduct.image}
                          className="rounded-2xl border opacity-[1] duration-300 ease-in hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[80px] md:min-w-[40px] lg:h-[135px]"
                        />
                      </div>

                      <div className="flex">
                        <div className="flex items-center space-x-4 p-2">
                          <button
                            className="rounded-full border-yellow-600 !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 p-2 transition duration-300 hover:bg-gray-300"
                            onClick={decrement}
                          >
                            <span className="text-xl font-bold">-</span>
                          </button>
                          <span className="text-2xl font-semibold">
                            {count}
                          </span>
                          <button
                            className="rounded-full !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 p-2 transition duration-300 hover:bg-gray-300"
                            onClick={increment}
                          >
                            <span className="text-xl font-bold">+</span>
                          </button>
                        </div>
                        <div className="grid">
                          {/* Conditionally render the Add to Cart button */}
                          {
                            addressEntered ? (
                              <div>
                                {/* ... (other code) */}
                                <Button
                                  onClick={handleAddToCart}
                                  className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-red-900 !bg-opacity-60 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
                                >
                                  <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                                    Add to cart
                                  </p>
                                </Button>
                                {/* ... (other code) */}
                              </div>
                            ) : null /* Render nothing if address is not entered */
                          }
                          <Button
                            onClick={closeModal2}
                            className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-transparent !bg-opacity-20 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
                          >
                            <p className="!bg-gradient-to-b from-gradient-brown-400 to-gradient-brown-400 bg-clip-text text-transparent">
                              Close
                            </p>
                          </Button>
                        </div>
                      </div>
                    </div>
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

function AddressSection({
  selectedProduct,
  isFavorite,
  addToFavorites,
  
}: {
  selectedProduct: Product;
  isFavorite: boolean;
  addToFavorites: () => void;
  
}) {
  const email = sessionStorage.email;

  return (
    <div className="mb-3 h-auto w-4/6 rounded-[15px] bg-gradient-brown-500 px-5 py-5">
      <h1 className="mb-2 !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text font-extrabold text-transparent md:text-lg">
        Favourite Products
      </h1>
      {/* <div className="grow flex-wrap gap-2 md:flex">
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
      </div> */}
      <div className="mt-4 flex justify-center text-center text-base leading-5 tracking-wide">
        <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-xs font-semibold text-transparent md:text-sm">
          You can add your favourite items to the customized favourite section from here.
        </p>
      </div>
      <div className="mt-4">
      <Button 
         onClick={addToFavorites} 
        disabled={isFavorite}
        className="m-0 !rounded-[10px] border-none !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm">
          {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
        </Button>
        
      </div>
    </div>
  );
}
