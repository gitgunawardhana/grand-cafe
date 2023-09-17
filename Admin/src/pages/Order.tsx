import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/button/Button";
import axios from "axios";


export interface Order {
  _id: string;
  user: string;
  email: string;
  amount: number;
  status: string;
  id:string;
  payment:string;
  orderCode:string;
  items: Array<{
    _id: string; // Assuming each item has an _id
    name: string; // Add other properties of the item here
    quantity: number;
  }>;
}

const Main = () => {
  const [order, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/order/vieworder");
      const json = await res.json();
      setOrders(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Make a PUT request to update the order status on the server
      const response = await axios.put(
        `http://localhost:8000/api/order/updateStatus/${orderId}`,
        { status: newStatus }
      );

      if (response.status === 200) {
        // Update the order status locally
        const updatedOrders = order.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    const confirmed = window.confirm(`Are you sure you want to update the status to "${newStatus}"?`);
    if (!confirmed) {
      return;
    }
    try {
      const updateData = {
        orderCode: orderId,
        status: newStatus, 
      };
      await axios.put(`http://localhost:8000/api/order/updateOrder`, updateData);
      console.log('Order status updated successfully!');
      window.alert("Status Updated");
      fetchData();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  




  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = order.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          {/* <select
            value={selectedValue}
            onChange={handleSelectChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-gray-700"
          >
            <option value="all" className="text-gray-500">
              All Products
            </option>

            {Array.isArray(options) &&
              options.map(
                (
                  option // Check if options is an array
                ) => (
                  <option
                    key={option.category}
                    value={option.category}
                    className="text-gray-900 py-2 px-3"
                  >
                    {option.category}
                  </option>
                )
              )}
          </select> */}
        </div>
        <div></div>
      </div>
      <br />
      <div className="w-full flex justify-center items-stretch bg-gray-200 p-10 rounded-3xl">
        <table className="p-8 w-full max-w-screen-xl rounded-xl shadow-2xl">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-amber-500 text-center text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 bg-amber-500 text-center text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-amber-500 text-center text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              {/* <th className="px-6 py-3 bg-amber-500 text-center text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Items
              </th> */}
              <th className="px-6 py-3 bg-amber-500 text-center text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 bg-amber-500 text-center text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 bg-amber-500 text-center text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider justify-center text-center">
                Actions
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order: Order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {order.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  Rs. {order.amount}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                {order.items.map((item) => (
    <div key={item._id} className="relative">
      {item.name}
    </div>
  ))}
                </td> */}
                <td className="flex px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800 justify-center items-center">
                            {order.payment === "COD" && (
                              <p className="w-2/3 rounded-2xl bg-gray-900 text-white p-1 text-xs tracking-wide text-blue-950 text-center">
                                COD
                              </p>
                            )}
                            {order.payment === "Card" && (
                             <p className="w-2/3 rounded-2xl bg-violet-800 text-white p-1 text-xs tracking-wide text-green-950 text-center">
                             CARD
                           </p>
                            )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center text-sm leading-5 text-gray-800">
                          <div className="flex items-center justify-center">
                            {order.status === "Pending" && (
                              <p className="w-2/3 rounded-2xl bg-blue-400 p-1 text-xs tracking-wide text-blue-950">
                                Pending
                              </p>
                            )}
                            {order.status === "Delivered" && (
                             <p className="w-2/3 rounded-2xl bg-green-400 p-1 text-xs tracking-wide text-green-950">
                             Delivered
                           </p>
                            )}
                            {order.status === "Cancelled" && (
                             <p className="w-2/3 rounded-2xl bg-red-500 p-1 text-xs tracking-wide text-red-950">
                             Cancelled
                           </p>
                            )}
                            {order.status === "Processing" && (
                             <p className="w-2/3 rounded-2xl bg-yellow-500 p-1 text-xs tracking-wide text-red-950">
                             Processing
                           </p>
                            )}
                          </div>
                        </td>
                <td className="flex px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800 justify-center items-center">
                  <div className="flex px-4 justify-around">
     
                     <Icon
                        className="hover:scale-125 cursor-pointer mr-4"
                        style={{ color: "blue" }}
                        icon="ic:baseline-pending-actions"
                        width="24"
                        onClick={() => handleUpdateStatus(order.orderCode, "Pending")}
                      />
                      <Icon
                        className="hover:scale-125 cursor-pointer mr-4"
                        style={{ color: "green" }}
                        icon="mdi:food-processor-outline"
                        width="24"
                        onClick={() => handleUpdateStatus(order.orderCode, "Processing")}
                      />
                      <Icon
                        className="hover:scale-125 cursor-pointer mr-4"
                        style={{ color: "black" }}
                        icon="grommet-icons:deliver"
                        width="24"
                        onClick={() => handleUpdateStatus(order.orderCode, "Delivered")}
                      />
                      <Icon
                        className="hover:scale-125 cursor-pointer mr-4"
                        style={{ color: "red" }}
                        icon="mdi:cancel-bold"
                        width="24"
                        onClick={() => handleUpdateStatus(order.orderCode, "Cancelled")}
                      />

                    
                  </div>
                </td>
                {/* Add more cells with product data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <ul className="flex">
          {Array(Math.ceil(order.length / itemsPerPage))
            .fill(null)
            .map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  } px-3 py-1 mx-1 rounded cursor-pointer`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
