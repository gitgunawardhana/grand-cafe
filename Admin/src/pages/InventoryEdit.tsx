import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import { useParams } from "react-router-dom";
import EditInventory from "../components/edit/editInventory/EditProduct";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";

export interface Inventory {
    _id: string;
    item: string;
    description: string;
    unit_price: number;
    quantity: number;
  }
 

function InventoryEdit() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const params = useParams();
  let { InventoryId } = params;
console.log("parm id",params);
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/inventory/viewinventory");
      const json = await res.json();
      setInventory(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productInfo = inventory.find((item) => item._id === InventoryId);
console.log("Product",inventory);
  return (
    <section>
      <h2 className="title">Edit Inventory Item</h2>
      {productInfo ? <EditInventory product={productInfo} /> : null}
    </section>
  );
}

export default InventoryEdit;
