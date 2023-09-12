import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/button/Button";
export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  rate: number;
  category: string;
}

export interface Options {
  category: string;
}

const Main = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [options, setOptions] = useState<Options[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products/product");
      const json = await res.json();
      setProducts(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOptions = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/category/viewcategory"
      );
      const json = await res.json();
      setOptions(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedValue(event.target.value);
    setCurrentPage(1);
  };

  const filtereProducts = products.filter(
    (product: {
      _id: string;
      name: string;
      price: string;
      image: string;
      rate: number;
      category: string;
    }) => product.category === selectedValue
  );

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
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
          );
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

  let filter: Product[];

  if (!selectedValue) {
    filter = products;
  } else if (selectedValue === "all") {
    filter = products;
  } else {
    filter = filtereProducts;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filter.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  useEffect(() => {
    fetchOptions();
    fetchData();
    console.log(options);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <select
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
          </select>
        </div>
        <div>
          <Button to="/addproduct">Add items</Button>
        </div>
      </div>
      <br />
      <div className="w-full flex justify-center items-stretch bg-gray-200 p-10 rounded-3xl">
        <table className="p-8 w-full max-w-screen-xl rounded-xl shadow-2xl">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider justify-center text-center">
                Actions
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product: Product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  Rs {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {product.rate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {product.category}
                </td>
                <td className="flex px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800 justify-center items-center">
                  <div className="px-4">
                    <Link to={`/products/${product._id}`}>
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
                      onClick={() => handleDelete(product._id)}
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
