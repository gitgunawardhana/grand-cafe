import React, { useEffect, useState } from "react";
import classes from "../components/tables/customTable/CustomTable.module.scss";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Button from "../components/UI/button/Button";
export interface Inventory {
  _id: string;
  item: string;
  description: string;
  unit_price: number;
  quantity: number;
}



const Main = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/inventory/viewinventory");
      const json = await res.json();
      setInventory(json.data);
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
          `http://localhost:8000/api/inventory/deleteInventory/${productId}`,
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

  let filter: Inventory[];

filter = inventory;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filter.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          
        </div>
        <div>
          <Button to="/addinventory">Add New Item</Button>
        </div>
      </div>
      <br />
      <div className="w-full flex justify-center items-stretch bg-gray-200 p-10 rounded-3xl">
        <table className="p-8 w-full max-w-screen-xl rounded-xl shadow-2xl">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Item 
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Unit Price 
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Total Amount 
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider justify-center text-center">
                Actions
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item: Inventory) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {item.item}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  Rs. {item.unit_price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {item.unit_price*item.quantity}
                </td>
                <td className="flex px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800 justify-center items-center">
                  <div className="px-4">
                    <Link to={`/inventory/${item._id}`}>
                      <Icon
                        className="hover:scale-125 cursor-pointer"
                        style={{ color: "green" }}
                        icon="fluent:edit-16-regular"
                        width="24"
                      />
                    </Link>
                  </div>
                  <div className="px-4">
                    <Icon
                      className="hover:scale-125 cursor-pointer"
                      style={{ color: "red" }}
                      icon="fluent:delete-24-regular"
                      width="24"
                      onClick={() => handleDelete(item._id)}
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
          {Array(Math.ceil(filter.length / itemsPerPage))
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
