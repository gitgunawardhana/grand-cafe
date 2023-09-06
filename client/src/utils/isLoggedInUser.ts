import { NavigateFunction } from "react-router-dom";
import Swal from "sweetalert2";

const isLoggedInUser = (navigate: NavigateFunction, link: string) => {
  if (sessionStorage.getItem("accessToken")) {
    navigate(link);
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      text: "You need to be a registered user to use this function.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};
export { isLoggedInUser };
