import { AxiosInstance } from "axios";
import Swal from "sweetalert2";

export const getCurrentUser = async (
  axiosJWT: AxiosInstance,
  setState: any
) => {
  try {
    const res = await axiosJWT.get("user/get-current-user", {
      headers: {
        authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });

    setState({
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
      mobileNo: res.data.mobileNo,
      gender: res.data.gender,
      address: res.data.address,
      avatar: res.data.avatar,
    });
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Sorry, we couldn't fetch your user details due to a server error. Please try again later or contact us for assistance.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

export const updateCurrentUser = async (
  axiosJWT: AxiosInstance,
  data: any,
  setState: any
) => {
  try {
    const res = await axiosJWT.put("user/update-current-user", data, {
      headers: {
        authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });

    setState({
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
      mobileNo: res.data.mobileNo,
      gender: res.data.gender,
      address: res.data.address,
      avatar: res.data.avatar,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      text: "Success! You are now updated your profile details.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Sorry, we couldn't update your profile details due to a server error. Please try again later or contact us for assistance.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};
