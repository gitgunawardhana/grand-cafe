import axios, { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  loginData: {
    email: string;
    password: string;
  },
  navigate: NavigateFunction
) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      loginData
    );

    sessionStorage.setItem("email", res.data.email);
    sessionStorage.setItem("accessToken", res.data.accessToken);
    sessionStorage.setItem("refreshToken", res.data.refreshToken);

    navigate("/home");
  } catch (err) {
    console.log(err);
  }
};

export const handleLogout = async (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
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

    navigate("/sign-in");
  } catch (err) {
    console.log(err);
  }
};
