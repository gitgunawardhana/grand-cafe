import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import CustomTable from "../components/tables/customTable/CustomTable";
import { customers, customersHeader } from "../constants/tables";
import useFetch from "../hook/useFetch";
import { IcustomersTable } from "../interfaces/Itable";
const url =
  "https://admin-panel-79c71-default-rtdb.europe-west1.firebasedatabase.app/customers.json";
function Customers() {
  const { t } = useTranslation();
  const { data, error, status } = useFetch<IcustomersTable[]>(url);
  let customerTable;

  if (status === "loading") {
    customerTable = <LoadingSpinner />;
  }

  if (error) {
    customerTable = (
      <CustomTable limit={10} headData={customersHeader} bodyData={customers} />
    );
  }

  if (status === "fetched" && data) {
    customerTable = (
      <CustomTable limit={10} headData={customersHeader} bodyData={data} />
    );
  }

  return (
    <section>
      <h2 className="title">{t("customers")}</h2>
      {customerTable}
    </section>
  );
}

export default Customers;
