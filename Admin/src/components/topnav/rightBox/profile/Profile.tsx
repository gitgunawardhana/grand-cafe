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
        <img src={user.avatar} alt="avatar" />
      </div>
      <div className={classes.profile__info}>
        <p className={classes.profile__userName}>
          {t(`${user.firstName} ${user.lastName}`)}
        </p>
        <span className={classes.profile__role}>{t("admin")}</span>
      </div>
    </div>
  );
}

export default Profile;
