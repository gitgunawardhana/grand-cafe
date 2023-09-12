import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Product } from "../../../pages/ProductEdit";
import Button from "../../UI/button/Button";
import Card from "../../UI/card/Card";
import Input from "../../UI/input/Input";
import classes from "./EditProduct.module.scss";

export interface Category {
  _id: string;
  category: string;
}

const EditProduct: React.FC<{ product?: Product }> = (props) => {
  const productName = props.product?.name || "";
  const productCategory = props.product?.category || "";
  const productPrice = props.product?.price || "";
  const productRate = props.product?.rate || "";
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [editedProduct, setEditedProduct] = useState({
    _id: props.product?._id || "",
    name: props.product?.name || "",
    image: props.product?.image || "",
    description: props.product?.description || "",
    price: props.product?.price || "",
    rate: props.product?.rate || 0,
    category: props.product?.category || "",
  });

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

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

    console.log(editedProduct);
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedProductData = {
        ...editedProduct,
        category: selectedCategory || editedProduct?.category,
      };

      const response = await fetch(
        `http://localhost:8000/api/products/updateProduct/${props.product?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductData),
        }
      );
      if (response.ok) {
        alert("Product updated successfully!");
        
      } else {
        alert("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
    
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
    if (props.product) {
      setEditedProduct({
        _id: props.product._id || "",
        name: props.product.name || "",
        image: props.product.image || "",
        description: props.product.description || "",
        price: props.product.price || "",
        rate: props.product.rate || 0,
        category: props.product.category || "",
      });
    }
    fetchData();
  }, [props.product]);

  const { t } = useTranslation();
  return (
    <div className={classes.edit__container}>
      <div className={classes.edit__left}>
        <Card>
          <div className={classes.img_wrapper}>
            <img
              className={classes.pic}
              src={props.product?.image}
              alt="product pic"
            />
          </div>
          <div className={classes.product__info}>
            <div>
              <div className={classes.title}>{t("proName")}</div>
              <div className={classes.value}>{productName}</div>
            </div>
            <div>
              <div className={classes.title}>{t("category")}</div>
              <div className={classes.value}>{productCategory}</div>
            </div>
            <div>
              <div className={classes.title}>{t("price")}</div>
              <div className={classes.value}>{productPrice}</div>
            </div>
            <div>
              <div className={classes.title}>{t("Rating")}</div>
              <div className={classes.value}>{productRate}</div>
            </div>
          </div>
        </Card>
      </div>

      <div className={classes.edit__right}>
        <Card>
          <div className={classes.product__edit}>
            <h3 className={classes.subTitle}>
              <Icon icon="fluent:edit-16-regular" width="24" />
              {t("edit")}
            </h3>
            <div className={classes.img_wrapper}>
              <div className={classes.upload_icon}>
                <Icon icon="akar-icons:cloud-upload" />
              </div>
              <div className={classes.file_input_control}>
                <input
                  className={classes.file_input}
                  type="file"
                  id="pic"
                  name="pic"
                  accept="image/png, image/jpeg"
                />
              </div>
              <img
                className={classes.pic}
                src={props.product?.image}
                alt="product pic"
              />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                id="name"
                type="text"
                value={editedProduct?.name || ""}
                placeholder={t("proName")}
                onChange={handleInputChange}
              />
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t("category")}
                </label>
                <select
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value={editedProduct?.category}>
                    {editedProduct?.category}
                  </option>
                  {category.map((categoryOption: any) => (
                    <option
                      key={categoryOption._id}
                      value={categoryOption.category}
                    >
                      {categoryOption.category}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <br />
              <Input
                id="price"
                type="text"
                value={editedProduct?.price || ""}
                placeholder={t("price")}
                onChange={handleInputChange}
              />
              <div className={classes.btn__wrapper}>
                <Button type="button" onClick={handleUpdateProduct}>
                  {t("update")}
                </Button>
                <Link to="/products">
                  <Button type="button">{t("cancel")}</Button>
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
