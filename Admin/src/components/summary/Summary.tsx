import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IsummData } from "../../interfaces/IsummData";
import classes from "./Summary.module.scss";
import SummaryBox from "./SummaryBox";

function Summary() {
  const [ordersForCurrentMonth, setOrdersForCurrentMonth] = useState<number>();
  const [revenueForCurrentMonth, setRevenueForCurrentMonth] =
    useState<number>();

  const [summaryData, setSummaryData] = useState<IsummData[]>([
    {
      icon: "akar-icons:shopping-bag",
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
      icon: "tdesign:money", // jam:coin
      text: "thisMonthRevenue",
      amount: "revenueAmount",
      currency: "currency",
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

  const getRevenueForCurrentMonth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/order/revenue-by-month"
      );
      if (response.data.data) {
        setRevenueForCurrentMonth(response.data.thisMonthRevenue);
      } else {
        console.log("Error fetching order data");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    getOrdersForCurrentMonth();
    getRevenueForCurrentMonth();
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
        (item) => item.text === "thisMonthRevenue"
      );
      if (ordersIndex !== -1) {
        updatedSummaryData[ordersIndex].amount =
          revenueForCurrentMonth?.toString() ?? "0";
      }
      return updatedSummaryData;
    });
  }, [revenueForCurrentMonth]);

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
