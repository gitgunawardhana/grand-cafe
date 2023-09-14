import React, { useEffect, useState } from "react";
import { Product } from "../pages/ProductEdit";
import { Icon } from "@iconify/react";
import Button from "../components/UI/button/Button";
import Input from "../base-components/InputFiled";
import Modal from "react-modal";

export interface Category {
  _id: string;
  category: string;
}

function AddProduct() {
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    rate: 0.0,
    description: "",
    imageBase64: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setProductData({
      ...productData,
      [id]: value,
    });

    console.log(productData.description);
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          // Ensure reader.result is a string
          setProductData({
            ...productData,
            imageBase64: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      !productData.name ||
      !selectedCategory ||
      !productData.price ||
      !productData.description ||
      !productData.imageBase64
    ) {
      alert("Please fill in all the fields");
      return; // Exit the function early if any field is empty
    }
    // Prepare the data to be sent to the server
    const formData = {
      name: productData.name,
      category: selectedCategory,
      price: productData.price,
      rate:productData.rate,
      description: productData.description,
      image: productData.imageBase64,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/products/addProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Success");
        alert("Item added to the system.");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/category/viewcategory"
      );
      const json = await res.json();
      setCategory(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="rounded-2xl bg-gray-300 p-4 h-full">
          <h1 className="text-xl">Add Products</h1>
          <br />
          <div className="bg-white p-10 rounded-2xl shadow-2xl">
            <div className="grid grid-cols-2">
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Input
                    id="name"
                    type="text"
                    placeholder="Product Name"
                    label="Product"
                    onChange={handleInputChange}
                  />
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a category</option>
                      {category.map((category: any) => (
                        <option key={category._id} value={category.category}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                  <Input
                    id="price"
                    type="number"
                    placeholder="Price"
                    label="Price"
                    onChange={handleInputChange}
                  />
                  <Input
                    id="description"
                    type="text"
                    placeholder="Product Description"
                    label="Description"
                    onChange={handleInputChange}
                  />

                  <div className="">
                    <Button type="submit" onClick={handleSubmit}>
                      Add Product
                    </Button>

                    <Button outline={true}>Cancel</Button>
                  </div>
                </form>
              </div>
              <div>
                {/* <h3 className="">
                  <Icon icon="fluent:edit-16-regular" width="24" />
                  {t("edit")}
                </h3> */}
                <div className="grid w-full justify-center items-center">
                  <div>Upload Product Image here :</div>
                  <br />
                  <div className="">
                    <Icon icon="akar-icons:cloud-upload" />
                  </div>
                  <div className="">
                    <input
                      type="file"
                      id="pic"
                      name="pic"
                      accept="image/png, image/jpeg"
                      onChange={handleImageUpload}
                    />
                  </div>
                  {/* <img className="" src="image" alt="product pic" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
