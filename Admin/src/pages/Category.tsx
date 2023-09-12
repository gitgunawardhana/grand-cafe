import React, { useState, useEffect } from "react";
import InputField from "../base-components/InputFiled";
import Button from "../components/UI/button/Button";
import { Icon } from "@iconify/react";

export interface Category {
  _id: string;
  category: string;
}

function Category() {
  const [newCategory, setNewCategory] = useState("");
  const [category, setCategory] = useState<Category[]>([]);
  const handleCategoryChange = (e: any) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = async () => {
    try {
      // Send a POST request to your API endpoint with the newCategory value
      const response = await fetch(
        "http://localhost:8000/api/category/addcategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category: newCategory }),
        }
      );

      if (response.ok) {
        // Clear the input field after successful submission
        setNewCategory("");
        alert("Category added successfully!");
        fetchData();
      } else {
        alert("Failed to add category. Please try again.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDelete = async (CategoryId: string) => {
    // Ask the user for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category? The items which is related to this category will also delete "
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/category/deleteCategory/${CategoryId}`,
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
      <div className="grid grid-cols-2 p-10">
        <div className="bg-slate-200 p-10 rounded-2xl shadow-2xl mr-4 h-64">
          <h1>Add New Category </h1>
          <br />
          <InputField
            id="category"
            type="text"
            placeholder="Enter new category here"
            value={newCategory}
            onChange={handleCategoryChange}
          />
          <br />
          <Button type="submit" onClick={handleAddCategory}>
            Add Category
          </Button>
        </div>
        <div className="bg-slate-200 p-10 rounded-2xl shadow-2xl ml-4">
          <h1>Categories </h1>
          <br />

          <table className="p-8 w-full max-w-screen-xl rounded-xl shadow-2xl">
            <thead>
              <tr className="rounded-3xl">
                <th className="justify-center items-center px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className=" justify-center items-center px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            {category.map((option) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  {option.category}
                </td>
                <td className="flex px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800 justify-center items-center">
                <Icon
                      className="hover:scale-125 cursor-pointer"
                      style={{ color: "red" }}
                      icon="fluent:delete-24-regular"
                      width="24"
                      onClick={() => handleDelete(option._id)}
                    />
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default Category;
