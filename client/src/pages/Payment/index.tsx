import { useContext, useEffect, useState } from "react";
import axios from "axios";
import md5 from "crypto-js/md5";
//import { ProviderContext } from '../../../../Admin/src/store/providerContext';
import { useParams } from "react-router-dom";
import { ProviderContext } from "../../components/Provider";
import { Button } from "../../base-components/Button";
import logo from "../../assets/images/logo100percentage.svg";
import { useNavigate } from "react-router-dom";
interface Order {
  user: string;
  emai: string;
  amount: number;
}

interface User {
  userCode: string;
  email: string;
  address: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
}

const Main = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    id: "",
    email: "",
    amount: 0,
  });
  const [userDetails, setUserDetails] = useState({});
  const { orderId, setOrderId } = useContext(ProviderContext);
  // Function to fetch order details
  const [netamount, setAmount] = useState({});
  const [address, setAddress] = useState("");
  const [firstName, setFName] = useState("");
  const [lastname, setLName] = useState("");
  const [mobile, setMobile] = useState("");
  const [cashOn, setCashOn] = useState<boolean>(false);
  const [cardPay, setCardPay] = useState<boolean>(false);
  const user = sessionStorage.email;
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const email = sessionStorage.email;

  const fetchOrderDetails = async (orderCode: string) => {
    try {
      console.log("Fetching order details for orderId:", orderCode);
      console.log("order cosw", orderCode);
      // Make an API request to fetch order details using the orderId
      const orderResponse = await fetch(
        `http://localhost:8000/api/order/getbyid`,
        {
          method: "POST", // Use POST method to send the orderCode in the request body
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify({ orderCode }), // Send orderCode in the request body as JSON
        }
      );

      if (orderResponse.status === 200) {
        const responseData = await orderResponse.json();
        const orderData = responseData.data;
        setOrderDetails(orderData);
        setAmount(orderData.amount);
        console.log(orderDetails);

        console.log("Order details:", orderData);
      } else {
        console.error("Error fetching order details");
      }
    } catch (error) {
      console.error("Error:", error);
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
        if (!email) {
          setFName("Guest");
          setLName("User");
        }
        {
          setFName(responseData.firstName);
          setLName(responseData.lastName);
        }

        setAddress(responseData.address);
        console.log(address);
        setMobile(responseData.mobileNo);
        setUserDetails(responseData);
        console.log("User details:", responseData);
      } else {
        console.error("Error fetching user details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAddress = async (orderCode: string) => {
    try {
      console.log("Fetching address details for orderId:", orderCode);
      const orderResponse = await fetch(
        `http://localhost:8000/api/address/getAddressByID`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderCode }),
        }
      );

      if (orderResponse.status === 200) {
        const responseData = await orderResponse.json();
        const addressData = responseData.data;
        setAddress(addressData.address);

        console.log("Address details:", addressData);
      } else {
        console.error("Error fetching order details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCashOnButtonClick = () => {
    setPaymentMethod("CashOn");
  };

  const handleCardPayButtonClick = () => {
    setPaymentMethod("CardPay");
  };

  useEffect(() => {
    fetchAddress(orderId);
    fetchOrderDetails(orderId);
    fetchUserDetails(user); // Use the orderId from context
  }, [orderId]);

  console.log("Net :", netamount);

  const handleUpdateStatus = async () => {
    try {
      const updateData = {
        orderCode: orderId,
        payment: "COD",
      };

      await axios.put(
        `http://localhost:8000/api/order/updateOrder`,
        updateData
      );

      console.log("Order status updated successfully!");
      window.alert("Order placed in COD");
      navigate(`/product-page`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const am = netamount.toString();

  let merchantSecret = "MTg1OTY5ODg4NTEyNjczMTczMjc1MTE1NDI4MjczMDQ2NTQ5NTY0";
  let merchantId = "1223708";
  let orderI = orderId;
  let amount = am || "0";
  let hashedSecret = md5(merchantSecret).toString().toUpperCase();
  let amountFormated = parseFloat(amount)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replace(",", "");
  let currency = "LKR";
  let hash = md5(merchantId + orderI + amountFormated + currency + hashedSecret)
    .toString()
    .toUpperCase();

  return (
    <div className="flex h-full flex-row">
      <div className="h-screen w-full p-36 pe-24">
        <div className="flex h-full flex-col items-center justify-center space-x-4 rounded-3xl bg-gradient-to-r from-amber-500 to-yellow-200">
          <p className="font-bold tracking-widest">Select Payment Method</p>
          {email ? (
            <Button
              className="hover:text-none ml-0 mt-10 justify-items-start border !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-10 py-3 text-sm text-black hover:bg-gradient-yellow-900"
              onClick={handleCashOnButtonClick}
            >
              Cash On Delivary
            </Button>
          ) : (
            <div>
              <br />
              <br />
              <p>COD Not available</p>
            </div>
          )}
          &nbsp;
          <Button
            className="hover:text-none ml-0 mt-10 justify-items-start border !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-10 py-3 text-sm text-black hover:bg-gradient-yellow-900"
            onClick={handleCardPayButtonClick}
          >
            Card Payment
          </Button>
        </div>
      </div>
      <div className="h-screen w-full">
        <div className="flex h-full items-center justify-center text-white ">
          {paymentMethod ? (
            <div>
              {paymentMethod === "CashOn" && (
                <div>
                  <h1 className="mb-4 text-2xl font-bold">Delivery Details</h1>
                  <br />
                  <h1 className="text-lg font-semibold">
                    Name : {firstName} {lastname}
                  </h1>
                  <br />
                  <h1 className="text-lg font-semibold">Address : {address}</h1>

                  <Button
                    className="hover:text-none ml-0 mt-10 justify-items-start border !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-10 py-3 text-sm text-black hover:bg-gradient-yellow-900"
                    onClick={handleUpdateStatus}
                  >
                    Proceed
                  </Button>
                </div>
              )}
              {paymentMethod === "CardPay" && (
                <div>
                  <form
                    method="post"
                    action="https://sandbox.payhere.lk/pay/checkout"
                  >
                    <input
                      type="hidden"
                      name="merchant_id"
                      value={merchantId}
                    />
                    <input
                      type="hidden"
                      name="return_url"
                      value="http://sample.com/return"
                    />
                    <input
                      type="hidden"
                      name="cancel_url"
                      value="http://sample.com/cancel"
                    />
                    <input
                      type="hidden"
                      name="notify_url"
                      value="http://sample.com/notify"
                    />
                    <br />
                    <br />
                    <br />
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">Order ID:</span>
                        <input
                          type="text"
                          name="order_id"
                          value={orderI}
                          className="border-none bg-transparent"
                          readOnly
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">Currency:</span>
                        <input
                          type="text"
                          name="currency"
                          value={currency}
                          className="border-none bg-transparent"
                          readOnly
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">Amount:</span>
                        <input
                          type="text"
                          name="amount"
                          value={amount}
                          className="border-none bg-transparent"
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <br />

                    <br />
                    <input type="hidden" name="first_name" value="Saman" />
                    <input type="hidden" name="last_name" value="Perera" />
                    <input
                      type="hidden"
                      name="email"
                      value="chathuradinushka97@gmail.com"
                    />
                    <input type="hidden" name="phone" value="0771234567" />
                    <input
                      type="hidden"
                      name="address"
                      value="No.1, Galle Road"
                    />
                    <input type="hidden" name="city" value="Colombo" />
                    <input type="hidden" name="country" value="Sri Lanka" />
                    <input type="hidden" name="hash" value={hash} />
                    <input
                      type="submit"
                      className="btn transform rounded-full !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-4 py-2 font-medium text-amber-950 transition-transform hover:scale-125 hover:from-yellow-500 hover:to-amber-500 hover:shadow-lg"
                      value="Proceed"
                    />
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center">
              {/* Display logo or default content */}
              <img src={logo} alt="Logo" className="h-2/4 w-2/4" />
              <p className="pt-10 text-center text-3xl font-semibold uppercase leading-relaxed  tracking-widest text-white opacity-75 shadow-md">
                Grand Cafe & Restaurant
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
