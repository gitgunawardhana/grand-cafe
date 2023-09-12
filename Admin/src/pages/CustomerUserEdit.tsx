import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import EditCustomerUser from "../components/edit/editCustomerUser/EditCustomerUser";

import axios from "axios";
import Swal from "sweetalert2";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  address: string;
  gender: string;
  email: string;
  mobileNo: string;
}

function ProductEdit() {
  const [user, setUser] = useState<User | null>();
  const { t } = useTranslation();
  const params = useParams();
  let { customerUserId } = params;

  const fetchData = async (userId: string | undefined) => {
    // Send a DELETE request
    axios
      .get(`http://localhost:8000/api/user/get-user-by-id?userId=${userId}`)
      .then((response) => {
        // Handle success
        console.log("Fetch user successfully:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting user:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          text: "Error fetching user. Please try again later.",
          background: "#A96C07",
          color: "#fff",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  useEffect(() => {
    fetchData(customerUserId);
  }, []);

  return (
    <section>
      <h2 className="title">{t("editCustomer")}</h2>
      {user ? <EditCustomerUser user={user} /> : null}
    </section>
  );
}

export default ProductEdit;
