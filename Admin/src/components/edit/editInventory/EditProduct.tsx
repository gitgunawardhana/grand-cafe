import React, { useEffect, useState } from "react";
import Card from "../../UI/card/Card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Inventory } from "../../../pages/InventoryEdit";
import classes from "./EditProduct.module.scss";
import { Icon } from "@iconify/react";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";


const EditProduct: React.FC<{ product?: Inventory }> = (props) => {
  
  const itemName = props.product?.item || "";
  const itemDescription = props.product?.description || "";
  const itemPrice = props.product?.unit_price || "";
  const ItemQuantity = props.product?.quantity || "";

  const [editedProduct, setEditedProduct] =  useState({
    _id: props.product?._id || "",
    item: props.product?.item || "",
    description: props.product?.description || "",
    unit_price: props.product?.unit_price || 0,
    quantity: props.product?.quantity || 0,
  });

  // const handleInputChange = (id : string , value: string) => {
  //   setEditedProduct({
  //     ...editedProduct,
  //     [id]: value,
  //   });
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEditedProduct({
      ...editedProduct,
      [id]: value,
    });

    console.log(editedProduct.item);
  };

  const handleUpdateProduct = async () => {
    try {
      
      const updatedProductData = {
        ...editedProduct,

      };

      const response = await fetch(
        `http://localhost:8000/api/inventory/updateInventory/${props.product?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductData),
        }
       
      );
      console.log(updatedProductData);
      if (response.ok) {
        alert("Product updated successfully!");
        
      } else {
        alert("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  

  useEffect(() => {
    if (props.product) {
      setEditedProduct({
        _id: props.product._id || "",
        item: props.product.item || "",
        description: props.product.description || "",
        unit_price: props.product.unit_price || 0,
        quantity: props.product.quantity || 0,
       
      });
    }
  }, [props.product]);

  
  return (
    <div className={classes.edit__container}>
      <div className={classes.edit__left}>
        <Card>
          <div className={classes.product__info}>
            <div>
              <div className={classes.title}>Item Name</div>
              <div className={classes.value}>{itemName}</div>
            </div>
            <div>
              <div className={classes.title}>Item Description</div>
              <div className={classes.value}>{itemDescription}</div>
            </div>
            <div>
              <div className={classes.title}>Unit Price</div>
              <div className={classes.value}>{itemPrice}</div>
            </div>
            <div>
              <div className={classes.title}>Quantity</div>
              <div className={classes.value}>{ItemQuantity}</div>
            </div>
          </div>
        </Card>
      </div>

      <div className={classes.edit__right}>
        <Card>
          <div className={classes.product__edit}>
            <h3 className={classes.subTitle}>
              Edit
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                id="item"
                type="text"
                value={editedProduct?.item || ""}
                placeholder={"Item Name"}
                onChange={handleInputChange}
              />
              <Input
                id="description"
                type="text"
                value={editedProduct?.description || ""}
                placeholder={"item Description"}
                onChange={handleInputChange}
              />
              <Input
                id="unit_price"
                type="number"
                value={editedProduct?.unit_price.toString() || "0"}
                placeholder={"Unit Price"}
                onChange={handleInputChange}
              />
              <Input
                id="quantity"
                type="number"
                value={editedProduct?.quantity.toString() || "0"}
                placeholder={"Quantity"}
                onChange={handleInputChange}
              />
              <div className={classes.btn__wrapper}>
                <Button type="button" onClick={handleUpdateProduct}>
                 Update
                </Button>
                <Link to="/inventory">
                  <Button type="button">Cancel</Button>
                </Link>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditProduct;
