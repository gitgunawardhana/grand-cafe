import React, { useContext, useRef, useState } from "react";

import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import langContextObj from "../../store/langContext";
import LoginContext from "../../store/loginContext";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";
import classes from "./Login.module.scss";

function LoginBox() {
  const loginCtx = useContext(LoginContext);
  const langCtx = useContext(langContextObj);
  const userNameRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [userName, setUserName] = useState("admin@gmail.com");
  const [userPassword, setUserPassword] = useState("Admin@123");

  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/admin/auth/login",
        { email: userName, password: userPassword }
      );

      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem("firstName", res.data.firstName);
      sessionStorage.setItem("lastName", res.data.lastName);
      sessionStorage.setItem("avatar", res.data.avatar);
      sessionStorage.setItem("accessToken", res.data.accessToken);
      sessionStorage.setItem("refreshToken", res.data.refreshToken);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Success! You are now logged in.",
        background: "#A96C07",
        color: "#fff",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        loginCtx.toggleLogin();
        loginCtx.setLoginUser(res.data);
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Account not found. Please verify your credentials and try again.",
        background: "#A96C07",
        color: "#fff",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  return (
    <div
      className={`${classes.container} ${
        langCtx.lang === "fa" ? classes.rtl : ""
      }`}
      style={{
        backgroundImage: `url(${require("../../assets/images/loginBg.png")})`,
        backgroundSize: "cover",
      }}
    >
      <div className={classes.loginBox}>
        <div className={classes.logo}>
          {/* <img src={images.logo} alt="digikala" /> */}
        </div>
        {/* <h2 className={classes.title}>{t("loginPage")}</h2> */}
        <form onSubmit={loginHandler}>
          <Input
            ref={userNameRef}
            type={"text"}
            id={"email"}
            placeholder={"admin@gmail.com"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            ref={userPasswordRef}
            type={"password"}
            id={"pass"}
            placeholder={"Password"}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <span ref={errorMessageRef} className={classes.errorMessage}>
            {t("errorMessage")}
          </span>
          <Button type="submit">{t("login")}</Button>
          <Link className={classes.forgat_pass} to="/">
            {t("forgetPass")}
          </Link>
          <div className={classes.checkbox}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">{t("rememberMe")}</label>
          </div>
        </form>
      </div>

      <div className={classes.keyPic}>
        {/* <img
          src={require("../../assets/images/loginBg.png")}
          alt="illustrator key"
        /> */}
      </div>
    </div>
  );
}

export default LoginBox;
