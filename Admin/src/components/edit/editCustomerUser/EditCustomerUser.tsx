import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { User } from "../../../pages/CustomerUsers";
import { convertToBase64 } from "../../../utils/base64";
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

  const [editedUser, setEditedUser] = useState({
    _id: props.user?._id || "",
    firstName: props.user?.firstName || "",
    lastName: props.user?.lastName || "",
    email: props.user?.email || "",
    gender: props.user?.gender || "",
    mobileNo: props.user?.mobileNo || "",
    address: props.user?.address || "",
    avatar: props.user?.avatar || "",
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file: File = e.target.files[0];
      try {
        const base64: string = await convertToBase64(file);
        setEditedUser({
          ...editedUser,
          avatar: base64,
        });
      } catch (error) {
        // Handle errors, e.g., display an error message or log the error.
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEditedUser({
      ...editedUser,
      [id]: value,
    });

    console.log(editedUser);
  };

  const handleUpdateUser = async () => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to update user details?`,
        text: "You will be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        background: "#A96C07",
        color: "#fff",
        confirmButtonColor: "#198754",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:8000/api/user/update-user-by-id?userId=${props.user?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedUser),
          }
        );
        console.log(editedUser);
        if (response.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "User details updated successfully!",
            background: "#A96C07",
            color: "#fff",
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            text: "Failed to update user details. Please try again.",
            background: "#A96C07",
            color: "#fff",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Server Error. Please try again later.",
        background: "#A96C07",
        color: "#fff",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const { t } = useTranslation();

  return (
    <div className={classes.edit__container}>
      <div className={`${classes.edit__left} xl:-translate-y-[178px]`}>
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
                  id="avatar"
                  name="pic"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleAvatarUpload(e)}
                />
              </div>
              <img
                className={classes.pic}
                src={editedUser.avatar}
                alt="product pic"
              />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                id="firstName"
                type="text"
                placeholder={props.user?.firstName}
                value={editedUser?.firstName || ""}
                onChange={handleInputChange}
              />
              <Input
                id="lastName"
                type="text"
                placeholder={props.user?.lastName}
                value={editedUser?.lastName || ""}
                onChange={handleInputChange}
              />
              <Input
                id="gender"
                type="text"
                placeholder={props.user?.gender}
                value={editedUser?.gender || ""}
                onChange={handleInputChange}
              />
              <Input
                id="email"
                type="text"
                placeholder={props.user?.email}
                value={editedUser?.email || ""}
                onChange={handleInputChange}
              />
              <Input
                id="mobileNo"
                type="text"
                placeholder={props.user?.mobileNo}
                value={editedUser?.mobileNo || ""}
                onChange={handleInputChange}
              />
              <Input
                id="address"
                type="text"
                placeholder={props.user?.address}
                value={editedUser?.address || ""}
                onChange={handleInputChange}
              />
              {/* <Input
                id="Rating"
                type="number"
                placeholder={props.user?.rate.toString()}
              /> */}
              <div className={classes.btn__wrapper}>
                <Button type="button" onClick={handleUpdateUser}>
                  {t("update")}
                </Button>
                <Link to="/customers">
                  <Button type="button">{t("cancel")}</Button>
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
