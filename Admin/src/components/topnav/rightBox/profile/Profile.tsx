import { useContext } from "react";
import { useTranslation } from "react-i18next";
import LoginContext from "../../../../store/loginContext";
import classes from "./Profile.module.scss";

function Profile() {
  const { t } = useTranslation();

  const loginCtx = useContext(LoginContext);

  const user = loginCtx.loginUser;
  return (
    <div className={classes.profile}>
      <div className={classes.profile__avatar}>
        <img
          src={
            sessionStorage.getItem("avatar")
              ? sessionStorage.getItem("avatar")!
              : `https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg`
          }
          alt="avatar"
        />
      </div>
      <div className={classes.profile__info}>
        <p className={classes.profile__userName}>
          {t(
            `${sessionStorage.getItem("firstName")} ${sessionStorage.getItem(
              "lastName"
            )}`
          )}
        </p>
        <span className={classes.profile__role}>{t("admin")}</span>
      </div>
    </div>
  );
}

export default Profile;
