import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/button/Button";
export interface Order {
  _id: string;
  user: string;
  email: string;
  amount: number;
  status: string;
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

  const handleDelete = async (productId: string) => {
    // Ask the user for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/deleteProduct/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          // Product deleted successfully, you can redirect or show a success message
          alert("Product deleted successfully!");
          // Remove the deleted product from the state
        //   setOrders((prevProducts) =>
        //     prevProducts.filter((product) => product._id !== productId)
        //   );
        } else {
          // Handle errors, show an error message, or log the error
          alert("Failed to delete product. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        // Handle the error (e.g., show an error message to the user)
      }
    }
    fetchData();
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
        <div>
          
        </div>
      </div>
      <br />
      <div className="w-full flex justify-center items-stretch bg-gray-200 p-10 rounded-3xl">
        <table className="p-8 w-full max-w-screen-xl rounded-xl shadow-2xl">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider justify-center text-center">
                Actions
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order: Order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {order.user}    
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {order.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  Rs. {order.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {order.status}
                </td>
                <td className="flex px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800 justify-center items-center">
                  <div className="px-4">
                    <Link to={`/products/${order._id}`}>
                      <Icon
                        className="hover:scale-125 cursor-pointer"
                        style={{ color: "green" }}
                        icon="fluent:edit-16-regular"
                        width="24"
                      />
                    </Link>
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
