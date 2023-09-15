import axios, { AxiosInstance } from "axios";
import Swal from "sweetalert2";

export const getCurrentUser = async (
  axiosJWT: AxiosInstance,
  user: any,
  setState: any
) => {
  try {
    const res = await axiosJWT.get("user/get-current-user", {
      headers: {
        authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });

    setState({
      ...user,
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

export const resetPassword = async (axiosJWT: AxiosInstance, data: any) => {
  try {
    const res = await axiosJWT.post(
      "http://localhost:8000/api/user/reset-password",
      data,
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );

    Swal.fire({
      position: "center",
      icon: "success",
      text: "Success! You are now updated your password.",
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
      text: "Sorry, we couldn't update your password due to a server error. Please try again later or contact us for assistance.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

export const checkIfEmailExists = async (
  email: string,
  setIsValidEmail: any
) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/user/check-if-email-exists?email=${email}`
    );
    if (res.data.message === "User found") {
      setIsValidEmail(true);
      return true;
    } else {
      setIsValidEmail(false);
      return false;
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Sorry, we couldn't find email. Please enter valid email.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
    return false;
  }
};

export const updatePassword = async (email: string, newPassword: string) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/user/update-password`,
      { email, newPassword }
    );
    if (res.data.message === "Password reset successful") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Sorry, we couldn't reset password.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
    return false;
  }
};
