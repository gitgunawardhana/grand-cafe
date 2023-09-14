import { faker } from "@faker-js/faker";
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
  const [ordersRevenueByMonths, setOrdersRevenueByMonths] = useState<any>([]);

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

  const [revenueData, setRevenueData] = useState({
    labels,
    datasets: [
      {
        label: t("summaryOfRevenue"),
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 176, 13, 0.9)",
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

  const getOrdersRevenueByMonths = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/order/revenue-by-month"
      );
      if (response.data.data) {
        setOrdersRevenueByMonths(response.data.data);
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
    getOrdersRevenueByMonths();
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
    setRevenueData({
      labels: ordersRevenueByMonths?.map(
        (orderRevenue: any) => orderRevenue.month
      ),
      datasets: [
        {
          label: t("Chart of Revenue"),
          data: ordersRevenueByMonths?.map(
            (orderRevenue: any) => orderRevenue.noOfRevenue
          ),
          backgroundColor: "rgba(255, 176, 13, 0.9)",
        },
      ],
    });
  }, [ordersRevenueByMonths]);

  const [userData] = useState({
    labels,
    datasets: [
      {
        label: t("summaryOfSale"),
        data: data.revenueByMonths.data,
        borderColor: "#ee9638",
        backgroundColor: "#3c4b6d",
      },
    ],
  });

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
                chartData={revenueData}
                chartTitle={`${t("summaryOfRevenue")}`}
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
