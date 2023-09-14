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
  const [inventoryData, setInventoryData] = useState({
    item: "",
    description: "",
    unit_price: 0,
    quantity: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInventoryData({
      ...inventoryData,
      [id]: value,
    });

    console.log(inventoryData);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      !inventoryData.item ||
      !inventoryData.unit_price ||
      !inventoryData.description ||
      !inventoryData.quantity
    ) {
      alert("Please fill in all the fields");
      return; // Exit the function early if any field is empty
    }
    // Prepare the data to be sent to the server
    const formData = {
      item: inventoryData.item,
      description: inventoryData.description,
      unit_price: inventoryData.unit_price,
      quantity: inventoryData.quantity,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/inventory/addInventory",
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


  return (
    <>
      <div>
        <div className="rounded-2xl bg-gray-300 p-4 h-full">
          <h1 className="text-xl">Add Inventory</h1>
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
                    id="item"
                    type="text"
                    placeholder="Inventory Name"
                    label="Inventory Name"
                    onChange={handleInputChange}
                  />
                   <Input
                    id="description"
                    type="text"
                    placeholder="Inventory Description"
                    label="Inventory Description"
                    onChange={handleInputChange}
                  />
                  <Input
                    id="unit_price"
                    type="number"
                    placeholder="Unit Price"
                    label="Unit Price"
                    onChange={handleInputChange}
                  />
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Quantity"
                    label="Quantity"
                    onChange={handleInputChange}
                  />
                

                  <div className="">
                    <Button type="submit" onClick={handleSubmit}>
                      Add New Inventory
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
                  <div></div>
                  <br />
                  <div className="">
                    <Icon icon="akar-icons:cloud-upload" />
                  </div>
                  <div className="">
                   
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
