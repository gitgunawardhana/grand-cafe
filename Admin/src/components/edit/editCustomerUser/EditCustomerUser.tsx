import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { User } from "../../../pages/CustomerUsers";
import Button from "../../UI/button/Button";
import Card from "../../UI/card/Card";
import Input from "../../UI/input/Input";
import classes from "./EditCustomerUser.module.scss";

const EditCustomerUser: React.FC<{ user?: User }> = (props) => {
  const userFirstName = props.user?.firstName || "";
  const userLastName = props.user?.lastName || "";
  const userEmail = props.user?.email || "";
  const userGender = props.user?.gender || "";
  const userMobileNo = props.user?.mobileNo || "";
  const userAddress = props.user?.address || "";

  const { t } = useTranslation();

  const [updatedUser, setUpdatedUser] = useState<User | undefined>(props.user);

  const [firstName, setFirstName] = useState(props.user?.firstName || "");
  const [lastName, setLastName] = useState(props.user?.lastName || "");
  const [gender, setGender] = useState(props.user?.gender || "");
  const [email, setEmail] = useState(props.user?.email || "");
  const [mobileNo, setMobileNo] = useState(props.user?.mobileNo || "");
  const [address, setAddress] = useState(props.user?.address || "");

  setUpdatedUser((prevUser: User | undefined) => ({
    ...prevUser,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    email: email,
    mobileNo: mobileNo,
    address: address,
  }));

  console.log("updatedUser ", firstName);

  return (
    <div className={classes.edit__container}>
      <div className={`${classes.edit__left} xl:-translate-y-[155px]`}>
        <Card>
          <div className={classes.img_wrapper}>
            <img
              className={classes.pic}
              src={props.user?.avatar}
              alt="product pic"
            />
          </div>
          <div className={classes.product__info}>
            <div>
              <div className={classes.title}>{t("Full Name")}</div>
              <div
                className={classes.value}
              >{`${userFirstName} ${userLastName}`}</div>
            </div>
            <div>
              <div className={classes.title}>{t("Gender")}</div>
              <div className={classes.value}>{userGender}</div>
            </div>
            <div>
              <div className={classes.title}>{t("Email")}</div>
              <div className={classes.value}>{userEmail}</div>
            </div>
            <div>
              <div className={classes.title}>{t("Mobile Number")}</div>
              <div className={classes.value}>{userMobileNo}</div>
            </div>
            <div>
              <div className={classes.title}>{t("Address")}</div>
              <div className={classes.value}>{userAddress}</div>
            </div>
          </div>
        </Card>
      </div>

      <div className={classes.edit__right}>
        <Card>
          <div className={classes.product__edit}>
            <h3 className={classes.subTitle}>
              <Icon icon="fluent:edit-16-regular" width="24" />
              {t("edit")}
            </h3>
            <div className={classes.img_wrapper}>
              <div className={classes.upload_icon}>
                <Icon icon="akar-icons:cloud-upload" />
              </div>
              <div className={classes.file_input_control}>
                <input
                  className={classes.file_input}
                  type="file"
                  id="pic"
                  name="pic"
                  accept="image/png, image/jpeg"
                />
              </div>
              <img
                className={classes.pic}
                src={props.user?.avatar}
                alt="product pic"
              />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                id="First Name"
                type="text"
                placeholder={props.user?.firstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                id="Last Name"
                type="text"
                placeholder={props.user?.lastName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                id="Gender"
                type="text"
                placeholder={props.user?.gender}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <Input
                id="Email"
                type="text"
                placeholder={props.user?.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="Mobile No"
                type="text"
                placeholder={props.user?.mobileNo}
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
              <Input
                id="Address"
                type="text"
                placeholder={props.user?.address}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {/* <Input
                id="Rating"
                type="number"
                placeholder={props.user?.rate.toString()}
              /> */}
              <div className={classes.btn__wrapper}>
                <Link to="/products">
                  <Button type="submit">{t("upload")}</Button>
                </Link>
                <Link to="/products">
                  <Button outline={true}>{t("cancel")}</Button>
                </Link>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditCustomerUser;
