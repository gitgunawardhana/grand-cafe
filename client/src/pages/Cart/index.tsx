import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../../base-components/Button";
import { ProviderContext } from "../../components/Provider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { total, setTotal } = useContext(ProviderContext);
  const [address, setAddress] = useState("");
  const { userId } = useContext(ProviderContext);
  const [orderCount, setOrderCount] = useState(null);
  const [discount, setDiscount] = useState(1);
  console.log("Usee iiii", userId);
  const { orderId, setOrderId } = useContext(ProviderContext);
  const user = sessionStorage.email;
  //const [redirect, setRedirect] = useState(false);
  const userCode = userId;
  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/add_cart/getCart/${userId}`
      );
      if (response.data.data) {
        setCartItems(response.data.data);
        console.log("cart 5", response.data.data);
        const totalPrice = response.data.data.reduce(
          (accumulator: number, item: CartItem) =>
            accumulator + item.quantity * item.price,
          0
        );
        setTotal(totalPrice);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:8000/api/add_cart/deleteItem/${itemId}`
        );
        console.log("Item deleted");
        fetchCartData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleEdit = async (itemId: string, newQuantity: number) => {
    try {
      if (newQuantity >= 1) {
        await axios.put(
          `http://localhost:8000/api/add_cart/updateCartItem/${itemId}`,
          {
            quantity: newQuantity,
          }
        );
        fetchCartData();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const fetchUserDetails = async (user: string) => {
    try {
      console.log("Fetching user details for userId:", user);
      const email = user;
      // Make an API request to fetch user details using the userId
      const userResponse = await fetch(
        `http://localhost:8000/api/user/get-user-email`,
        {
          method: "POST", // Use GET method to send the email as a query parameter
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify({ email }), // Sen
        }
      );

      if (userResponse.status === 200) {
        const responseData = await userResponse.json();

        setAddress(responseData.address);
        console.log(address);

        console.log("User details:", responseData);
      } else {
        console.error("Error fetching user details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAddress = async (userCode: string) => {
    try {
      console.log("Fetching address details for orderId:", userCode);
      const orderResponse = await fetch(
        `http://localhost:8000/api/address/getAddressByID`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userCode }),
        }
      );

      if (orderResponse.status === 200) {
        const responseData = await orderResponse.json();
        //console.log("Adde",add)
        setAddress(responseData.address);

        console.log("Address details:", responseData.address);
      } else {
        console.error("Error fetching order details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEvent = async () => {
    if (address) {
      handleOrder();
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "First add Address to your user account",
        background: "#991b1b",
        color: "#fff",
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

  const handleOrder = async () => {
    let email;
    if (!sessionStorage.email) {
      email = "unregistered@gmail.com";
    } else {
      email = sessionStorage.email;
    }
    console.log(email);

    //  const confirmOrder = window.confirm(
    //   "Are you sure to proceed?"
    // );

    const result = await Swal.fire({
      title: `Are you sure to proceed?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#A96C07",
      color: "#fff",
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed!",
    });

    if (result) {
      try {
        if (cartItems.length === 0) {
          //alert("Cart is empty. Add items to your cart before placing an order.");
          Swal.fire({
            position: "center",
            icon: "warning",
            text: "Cart is empty. Add items to your cart before placing an order.",
            background: "#A96C07",
            color: "#fff",
            showConfirmButton: false,
            timer: 5000,
          });
          return; // Exit the function
        }

        const orderItems = cartItems.map((cartItem) => ({
          cartItem: cartItem._id, // Assuming _id is the identifier for cart items
          quantity: cartItem.quantity,
        }));

        const response = await fetch(
          "http://localhost:8000/api/order/addOrder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: userId,
              email: email,
              amount: finalTotal,
              status: "Pending",
              items: cartItems,
              payment: "Card",
            }),
          }
        );
        if (response.status === 201 || response.status === 200) {
          // Handle success
          console.log("Success");
          //alert("Order added!");
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Order added successfully",
            background: "#A96C07",
            color: "#fff",
            showConfirmButton: false,
            timer: 5000,
          });
          const responseData = await response.json();
          console.log("Cham", responseData.orderId);
          setOrderId(responseData.orderId);
          console.log("O id", orderId);
          const clearCartResponse = await fetch(
            "http://localhost:8000/api/add_cart/clearcart",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: userId,
              }),
            }
          );
          navigate(`/payment`);

          if (clearCartResponse.status === 200) {
            // Cart data cleared successfully
            console.log("Cart data cleared");
            fetchCartData();
          } else {
            // Handle error while clearing cart data
            console.error("Error clearing cart data");
          }
        } else {
          // Handle error
          if (response.status === 400) {
            console.error("Error adding Order 1");
          }

          console.error("Error adding order 2");
        }
      } catch (error) {
        console.error("Error adding order 3:", error);
      }
    }
  };

  const fetchOrderCount = async () => {
    try {
      const email = user;
      const response = await axios.post(
        "http://localhost:8000/api/order/get-order-count",
        { email }
      );
      setOrderCount(response.data.data);
      console.log("order count", orderCount);
      if (response.data.data > 20) {
        setDiscount(0.9); // 10% discount
      } else {
        setDiscount(1); // No discount
      }
    } catch (error) {
      console.error("Error fetching order count:", error);
    }
  };

  const finalTotal = total * discount;

  useEffect(() => {
    fetchAddress(userCode);
    fetchUserDetails(user);
    console.log("add ", address);
    fetchCartData();
    fetchOrderCount();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <div className="grid grid-flow-row gap-4">
        {cartItems.map((item: CartItem) => (
          <div
            key={item._id}
            className="box-border grid grid-cols-6 items-center  justify-center rounded-xl border-2 border-solid border-gradient-yellow-900 text-white"
          >
            <div className="grid-cols-1 p-2">
              <img
                src={item.image}
                className="rounded-2xl border opacity-[1] duration-300 ease-in hover:scale-125 hover:border-gradient-yellow-900 hover:opacity-[1] md:h-[30px] md:min-w-[20px] lg:h-[80px]"
                alt={item.name}
              />
            </div>
            <div className="col-span-2 !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent ">
              <p>{item.name}</p>
            </div>
            <div className="flex !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
              {/* <p> */}
              {/* <input
                  className="text-black"
                  type="number"
                  value={item.quantity}
                  onChange={(event) => {
                    const newQuantity = parseInt(event.target.value);
                    if (!isNaN(newQuantity)) {
                      const updatedCartItems = cartItems.map((cartItem) =>
                        cartItem._id === item._id
                          ? { ...cartItem, quantity: newQuantity }
                          : cartItem
                      );
                      setCartItems(updatedCartItems);
                    }
                  }}
                />
              </p> */}
              <div className="flex !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                <div className="mr-2 flex items-center">
                  <button
                    className="rounded-l bg-transparent px-2 py-1 text-amber-500 hover:scale-150 hover:bg-opacity-20"
                    onClick={() => {
                      const newQuantity = item.quantity - 1;
                      if (newQuantity >= 1) {
                        handleEdit(item._id, newQuantity);
                        const updatedCartItems = cartItems.map((cartItem) =>
                          cartItem._id === item._id
                            ? { ...cartItem, quantity: newQuantity }
                            : cartItem
                        );
                        setCartItems(updatedCartItems);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
                <div className="flex items-center">
                  <input
                    className="w-12 rounded-md border-gradient-yellow-900 bg-transparent px-2 py-1 text-center text-amber-500"
                    value={item.quantity}
                    onChange={(event) => {
                      const newQuantity = parseInt(event.target.value);
                      if (!isNaN(newQuantity)) {
                        handleEdit(item._id, newQuantity);
                        const updatedCartItems = cartItems.map((cartItem) =>
                          cartItem._id === item._id
                            ? { ...cartItem, quantity: newQuantity }
                            : cartItem
                        );
                        setCartItems(updatedCartItems);
                      }
                    }}
                  />
                </div>
                <div className="ml-2 flex items-center">
                  <button
                    className="rounded-r bg-transparent px-2 py-1 text-amber-500 hover:scale-150 hover:bg-opacity-20"
                    onClick={() => {
                      const newQuantity = item.quantity + 1;
                      if (newQuantity >= 1) {
                        handleEdit(item._id, newQuantity);
                        const updatedCartItems = cartItems.map((cartItem) =>
                          cartItem._id === item._id
                            ? { ...cartItem, quantity: newQuantity }
                            : cartItem
                        );
                        setCartItems(updatedCartItems);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
              <p>Rs. {item.quantity * item.price}.00</p>
            </div>
            <div className="">
              <Button
                className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15  !bg-opacity-20 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
                onClick={() => handleDelete(item._id)}
              >
                <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                  Delete
                </p>
              </Button>
            </div>
          </div>
        ))}
        <div className="box-border grid grid-cols-6 items-center justify-end  rounded-xl border-2 border-solid border-gradient-yellow-900 p-2 text-white">
          <div className=" col-span-3 px-24 text-amber-400">Total Amount</div>
          {orderCount ? (
            orderCount > 20 ? (
              <>
                <div className="px-24 text-amber-400">
                  <div>Total :</div>
                  <div>Promo :</div>
                </div>
                <div className="text-[18px] text-amber-400">
                  <div>Rs. {total}.00</div>
                  <div>Rs. {finalTotal}.00</div>
                </div></>
            ) : (
              <>
                <div className="px-24 text-amber-400"></div>
                <div className="text-[18px] text-amber-400">
                  <div>Rs. {finalTotal}.00</div>
                </div>
                </>
            )
          ) : (
            <>
                <div className="px-24 text-amber-400"></div>
                <div className="text-[18px] text-amber-400">
                  <div>Rs. {finalTotal}.00</div>
                </div>
                </>
          )}

          <div className="">
            <Button
              className="m-0 min-w-[200px] !rounded-[10px] border border-gradient-yellow-100-15  bg-amber-400 !bg-opacity-80 !px-5 !py-2 text-xs font-semibold uppercase  hover:scale-110  md:!px-5 md:py-2 md:text-sm"
              onClick={() => handleEvent()}
            >
              <p className="bg-clip-text tracking-wider text-zinc-900 hover:text-amber-400">
                Proceed to checkout
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
