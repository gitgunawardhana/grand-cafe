import axios, { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";
import Swal from "sweetalert2";

export const handleRegistration = async (
  registrationData: {
    email: string;
    password: string;
    confirmPassword: string;
  },
  navigate: NavigateFunction
) => {
  if (registrationData.password !== registrationData.confirmPassword) return;

  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/register",
      registrationData
    );
    Swal.fire({
      position: "center",
      icon: "success",
      text: "Success! You are now registered.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      navigate("/sign-in");
    }, 500);
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Registration Error! User already exists or server issue. Please try again later.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

export const handleLogin = async (
  loginData: {
    email: string;
    password: string;
  },
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      loginData
    );

    sessionStorage.setItem("email", res.data.email);
    sessionStorage.setItem("userCode", res.data.userCode);
    sessionStorage.setItem("accessToken", res.data.accessToken);
    sessionStorage.setItem("refreshToken", res.data.refreshToken);
    Swal.fire({
      position: "center",
      icon: "success",
      text: "Success! You are now logged in.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      window.location.href = "/home";
    }, 500);
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Account not found. Please verify your credentials and try again.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

export const handleLogout = async (
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
  axiosJWT: AxiosInstance,
  navigate: NavigateFunction
) => {
  e.preventDefault();
  try {
    await axiosJWT.post(
      "auth/logout",
      {
        refreshToken: sessionStorage.getItem("refreshToken"),
      },
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );

    sessionStorage.clear();

    Swal.fire({
      position: "center",
      icon: "success",
      text: "Logout successful. Have a great day!",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Oops! Something went wrong during the logout process. Please try again.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};
