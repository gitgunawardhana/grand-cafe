import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IsummData } from "../../interfaces/IsummData";
import classes from "./Summary.module.scss";
import SummaryBox from "./SummaryBox";

function Summary() {
  const [ordersForCurrentMonth, setOrdersForCurrentMonth] = useState<number>();
  const [saleForCurrentMonth, setSaleForCurrentMonth] = useState<number>();
  const [mostSoldCategory, setMostSoldCategory] = useState<number>();

  const [summaryData, setSummaryData] = useState<IsummData[]>([
    {
      icon: "tdesign:money", // akar-icons:shopping-bag
      text: "thisMonthSales",
      amount: "salesAmount",
      currency: "currency",
    },
    {
      icon: "icon-park-outline:transaction-order",
      text: "thisMonthOrders",
      amount: "0", // Initialize with 0, we will update this when ordersForCurrentMonth changes
      currency: "",
    },
    {
      icon: "mdi:food-outline", // akar-icons:shopping-bag
      text: "thisMostSoldCategory",
      amount: "",
      currency: "",
    },
  ]);

  const getOrdersForCurrentMonth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/order/count-by-current-month"
      );
      if (response.data.data) {
        setOrdersForCurrentMonth(response.data.data[0].noOfOrders);
      } else {
        console.log("Error fetching order data");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const getSaleForCurrentMonth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/order/sales-by-month"
      );
      if (response.data.data) {
        setSaleForCurrentMonth(response.data.thisMonthSales);
      } else {
        console.log("Error fetching order data");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const getSoldQuantityByCategoryData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/item-sales/sold-quantity-by-category"
      );
      if (response.data.data) {
        setMostSoldCategory(response.data.mostSoldCategory);
        console.log("Success fetching order data");
      } else {
        console.log("Error fetching order data");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    getOrdersForCurrentMonth();
    getSaleForCurrentMonth();
    getSoldQuantityByCategoryData();
  }, []);

  useEffect(() => {
    setSummaryData((prevSummaryData) => {
      const updatedSummaryData = [...prevSummaryData];
      const ordersIndex = updatedSummaryData.findIndex(
        (item) => item.text === "thisMonthOrders"
      );
      if (ordersIndex !== -1) {
        updatedSummaryData[ordersIndex].amount =
          ordersForCurrentMonth?.toString() ?? "0";
      }
      return updatedSummaryData;
    });
  }, [ordersForCurrentMonth]);

  useEffect(() => {
    setSummaryData((prevSummaryData) => {
      const updatedSummaryData = [...prevSummaryData];
      const ordersIndex = updatedSummaryData.findIndex(
        (item) => item.text === "thisMonthSales"
      );
      if (ordersIndex !== -1) {
        updatedSummaryData[ordersIndex].amount =
          saleForCurrentMonth?.toString() ?? "0";
      }
      return updatedSummaryData;
    });
  }, [saleForCurrentMonth]);

  useEffect(() => {
    setSummaryData((prevSummaryData) => {
      const updatedSummaryData = [...prevSummaryData];
      const ordersIndex = updatedSummaryData.findIndex(
        (item) => item.text === "thisMostSoldCategory"
      );
      if (ordersIndex !== -1) {
        updatedSummaryData[ordersIndex].amount =
          mostSoldCategory?.toString() ?? "0";
      }
      return updatedSummaryData;
    });
  }, [mostSoldCategory]);

  const { t } = useTranslation();
  return (
    <section className={classes.summary}>
      <p className="subTitle">{t("summary")}</p>
      <div className={classes.summary__box}>
        {summaryData.map((item) => (
          <SummaryBox key={item.text} item={item} />
        ))}
      </div>
    </section>
  );
}

export default Summary;
