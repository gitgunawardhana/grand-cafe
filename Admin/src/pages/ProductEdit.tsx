import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import { useParams } from "react-router-dom";
import EditProduct from "../components/edit/editProduct/EditProduct";
import { IProductsTable } from "../interfaces/Itable";

import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  rate: number;
  category: string;
}

function ProductEdit() {
  const [products, setProducts] = useState<Product[]>([]);
  const { t } = useTranslation();
  const params = useParams();
  let { productId } = params;

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

  const productInfo = products.find((product) => product._id === productId);

  return (
    <section>
      <h2 className="title">{t("editProduct")}</h2>
      {productInfo ? <EditProduct product={productInfo} /> : null}
    </section>
  );
}

export default ProductEdit;
