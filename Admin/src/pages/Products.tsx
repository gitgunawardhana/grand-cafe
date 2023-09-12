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

const Main = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products/product");
      const json = await res.json();
      setProducts(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Define an array of options
  const options = ["all", "burger", "rice", "ourspecial"];

  // Event handler to handle changes in the selected value
  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedValue(event.target.value);
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

  let filter: Product[];

  if (!selectedValue) {
    filter = products;
  } else if (selectedValue === "all") {
    filter = products;
  } else {
    filter = filtereProducts;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <select
            value={selectedValue}
            onChange={handleSelectChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-gray-700"
          >
            <option value="" className="text-gray-500 ">
              Select Category to filter
            </option>
            {options.map((option, index) => (
              <option
                key={index}
                value={option}
                className="text-gray-900 py-2 px-3"
              >
                {option}
              </option>
            ))}
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
            {filter.map((product: Product) => (
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
                        style={{ color: "green" }}
                        icon="fluent:edit-16-regular"
                        width="24"
                      />
                    </Link>
                  </div>
                  <div className="px-4">
                    <Icon
                      style={{ color: "red" }}
                      icon="fluent:delete-24-regular"
                      width="24"
                    />
                  </div>
                </td>
                {/* Add more cells with product data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
