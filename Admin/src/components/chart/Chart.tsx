import { useEffect, useState } from "react";

import axios from "axios";
import { useTranslation } from "react-i18next";
import data from "../../constants/data";
import Card from "../UI/card/Card";
import BarChart from "./BarChart";
import classes from "./Chart.module.scss";
import LineChart from "./LineChart";

const SaleChart = () => {
  const { t } = useTranslation();

  const [ordersCountByMonths, setOrdersCountByMonths] = useState<any>([]);
  const [ordersSalesByMonths, setOrdersSalesByMonths] = useState<any>([]);
  const [soldQuantityByCategoryData, setSoldQuantityByCategoryData] =
    useState<any>([]);

  const labels = data.revenueByMonths.labels.map((month) => t(month));

  const [orderData, setOrderData] = useState({
    labels: ordersCountByMonths?.map((order: any) => order.month),
    datasets: [
      {
        label: t("summaryOfOrders"),
        data: ordersCountByMonths?.map((order: any) => order.noOfOrders),
        backgroundColor: "rgba(255, 176, 13, 0.9)",
      },
    ],
  });

  const [salesData, setSalesData] = useState({
    labels: ordersSalesByMonths?.map((orderSale: any) => orderSale.month),
    datasets: [
      {
        label: t("Chart of Sales"),
        data: ordersSalesByMonths?.map((orderSale: any) => orderSale.noOfSales),
        backgroundColor: "rgba(255, 176, 13, 0.9)",
      },
    ],
  });

  const [userData, setUserData] = useState({
    labels: soldQuantityByCategoryData?.map(
      (soldQuantity: any) => soldQuantity.category
    ),
    datasets: [
      {
        label: t("Sales by Food Category Over Time"),
        data: soldQuantityByCategoryData?.map(
          (soldQuantity: any) => soldQuantity.soldQuantity
        ),
        borderColor: "#ee9638",
        backgroundColor: "#3c4b6d",
      },
    ],
  });

  const getOrdersCountByMonths = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/order/count-by-month"
      );
      if (response.data.data) {
        setOrdersCountByMonths(response.data.data);
        console.log("Success fetching order data");
      } else {
        console.log("Error fetching order data");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const getOrdersSalesByMonths = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/order/sales-by-month"
      );
      if (response.data.data) {
        setOrdersSalesByMonths(response.data.data);
        console.log("Success fetching order data");
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
        setSoldQuantityByCategoryData(response.data.data);
        console.log("Success fetching order data");
      } else {
        console.log("Error fetching order data");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    getOrdersCountByMonths();
    getOrdersSalesByMonths();
    getSoldQuantityByCategoryData();
  }, []);

  useEffect(() => {
    setOrderData({
      labels: ordersCountByMonths?.map((order: any) => order.month),
      datasets: [
        {
          label: t("Chart of Order"),
          data: ordersCountByMonths?.map((order: any) => order.noOfOrders),
          backgroundColor: "rgba(255, 176, 13, 0.9)",
        },
      ],
    });
  }, [ordersCountByMonths]);

  useEffect(() => {
    setSalesData({
      labels: ordersSalesByMonths?.map((orderSale: any) => orderSale.month),
      datasets: [
        {
          label: t("Chart of Sales"),
          data: ordersSalesByMonths?.map(
            (orderSale: any) => orderSale.noOfSales
          ),
          backgroundColor: "rgba(255, 176, 13, 0.9)",
        },
      ],
    });
  }, [ordersSalesByMonths]);

  useEffect(() => {
    setUserData({
      labels: soldQuantityByCategoryData?.map(
        (soldQuantity: any) => soldQuantity.category
      ),
      datasets: [
        {
          label: t("Sales by Food Category Over Time"),
          data: soldQuantityByCategoryData?.map(
            (soldQuantity: any) => soldQuantity.soldQuantity
          ),
          borderColor: "#ee9638",
          backgroundColor: "#3c4b6d",
        },
      ],
    });
  }, [soldQuantityByCategoryData]);

  return (
    <section className={classes.chart}>
      <p className="subTitle">{t("quickAnalysis")}</p>
      <div className={classes.charts__container}>
        <div className={classes.charts__wrapper}>
          <Card>
            <div className={classes.chart__wrapper}>
              <BarChart
                chartData={orderData}
                chartTitle={`${t("Chart of Order")}`}
              />
            </div>
          </Card>
          <Card>
            <div className={classes.chart__wrapper}>
              <BarChart
                chartData={salesData}
                chartTitle={`${t("Chart of Sales")}`}
              />
            </div>
          </Card>
        </div>
        <Card>
          <div className={classes.chart__wrapper}>
            <LineChart chartData={userData} />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SaleChart;
