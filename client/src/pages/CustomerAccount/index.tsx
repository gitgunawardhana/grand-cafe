import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import * as Yup from "yup";
import profileIcon from "../../assets/icons/profileIcon.png";
import cam from "../../assets/images/CustomerAccount/vector3.svg";
import { Button } from "../../base-components/Button";
import { FormRequiredLabel } from "../../base-components/FormElements/FormRequired";
import InputField from "../../base-components/FormElements/InputElement";
import CheckBoxSetResponsive from "../../components/CheckBoxSetResponsive";
import { ProviderContext } from "../../components/Provider";
import { UserProviderContext } from "../../components/Provider/UserProvider";
import TextArea from "../../components/TextArea";
import { AlignmentTypes } from "../../constants";
import { resetPassword, updateCurrentUser } from "../../services/user";
import { convertToBase64 } from "../../utils";
import {
  addressValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  mobileNoValidation,
  passwordValidation,
} from "../../utils/validation";

export interface Order {
  _id: string;
  user: string;
  email: string;
  amount: number;
  id: string;
  orderCode: string;
  status: string;
  payment:string;
  items: Array<{
    _id: string; // Assuming each item has an _id
    name: string; // Add other properties of the item here
    quantity: number;
  }>;
}

const gender = [
  {
    id: "male",
    label: "Male",
    value: "Male",
  },
  {
    id: "female",
    label: "Female",
    value: "Female",
  },
];

const validationSchema = Yup.object().shape({
  email: emailValidation,
  mobileNo: mobileNoValidation,
  address: addressValidation,
  firstName: firstNameValidation,
  lastName: lastNameValidation,
});

const validationSchemaPassword = Yup.object().shape({
  currentPassword: passwordValidation,
  newPassword: passwordValidation,
});

// Define a TypeScript interface for your form values
interface FormValues {
  avatar: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  mobileNo: string | undefined;
  address: string | undefined;
  gender: string | undefined;
}

interface PasswordForm {
  currentPassword: string | undefined;
  newPassword: string | undefined;
}

const Main = () => {
  const { axiosJWT } = useContext(ProviderContext);
  const { user, setUser } = useContext(UserProviderContext);
  const { userId, setUserId } = useContext(ProviderContext);

  if (!user) {
    // Render a loading indicator or handle the loading state in another way
    return <div>Loading...</div>;
  }
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);

  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [selectedGender, setSelectedGender] = useState<string | null>(
    user.gender ? user.gender : ""
  );

  const handleGenderOptionChange = (optionValue: string) => {
    setSelectedGender(optionValue);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file: File = e.target.files[0];
      try {
        const base64: string = await convertToBase64(file);
        setSelectedAvatar(base64);
      } catch (error) {
        // Handle errors, e.g., display an error message or log the error.
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const initialValues: FormValues = {
    avatar: user.avatar,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    mobileNo: user.mobileNo,
    address: user.address,
    gender: user.address,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: FormValues) => {
      updateCurrentUser(
        axiosJWT,
        { ...values, avatar: selectedAvatar, gender: selectedGender },
        setUser
      );
      setEditProfile(!editProfile);
      if (selectedGender === "") {
        setSelectedGender(null);
      }
    },
  });

  const initialValuesPW: PasswordForm = {
    currentPassword: "",
    newPassword: "",
  };
  const formikPW = useFormik({
    initialValues: initialValuesPW,
    validationSchema: validationSchemaPassword,
    onSubmit: (values: PasswordForm) => {
      resetPassword(axiosJWT, values);
      setEditPassword(!editPassword);
    },
  });

  const [order, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // const fetchData = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/api/order/vieworder");
  //     const json = await res.json();
  //     setOrders(json.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      // Fetch the orders from the API
      const res = await fetch("http://localhost:8000/api/order/vieworder");
      const json = await res.json();

      // Assuming you have the userId you want to filter by
      // Replace with the actual userId
      console.log("User", userId);
      // Filter the orders based on the userId
      const filteredOrders = json.data.filter(
        (order: { id: string }) => order.id === userId
      );

      // Set the filtered orders in your state
      setOrders(filteredOrders);
      console.log("Order", filteredOrders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = order.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mt-0!m-auto ml-[100px] mr-52 flex flex-col justify-center object-cover px-12 text-center text-gradient-yellow-300 md:px-28 lg:px-32">
        <div className="col-span-2 ml-20 mt-20 justify-start text-start text-[20px] font-black text-gradient-yellow-900 sm:text-[20px] md:text-[30px] lg:text-[45px]">
          <h1>Account Settings</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="ml-20 mt-14 flex ">
            <div className="relative w-fit">
              <img
                className="h-[154px] w-[154px] rounded-full object-cover"
                src={selectedAvatar || user.avatar || profileIcon}
              ></img>
              {editProfile && (
                <>
                  <InputField
                    id="profile-picture"
                    type="file"
                    accept=".jpeg, .png, .jpg"
                    className="mt-[10px] hidden border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                    onChange={(e) => handleAvatarUpload(e)}
                  />
                  <label htmlFor="profile-picture">
                    <img
                      src={cam}
                      className="absolute bottom-2 right-0 mb-0  cursor-pointer overflow-auto rounded-full bg-yellow-300 px-1 py-1 opacity-70"
                    ></img>
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="!-mt-14 mb-10 grid grid-cols-2 items-center  justify-start gap-1 pb-4 md:mt-0 lg:mt-0 lg:flex-row">
            <div className="col-span-2 ml-20 mt-20 justify-start text-start sm:col-span-1">
              <InputField
                {...formik.getFieldProps("firstName")}
                value={
                  formik.getFieldProps("firstName").value === null
                    ? user.firstName
                    : formik.getFieldProps("firstName").value
                }
                name="firstName"
                className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                placeholder={user.firstName}
                disabled={!editProfile}
                sepLabel="First Name"
                labelAlignment={AlignmentTypes.BLOCK}
                sepLabelClassName="text-gradient-yellow-900 font-bold"
                RequiredLabelClassName="bg-[#f59f0b5e]"
                required={editProfile}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="translate-y-11 text-left text-xs text-red-700">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 ml-20 mt-20 justify-start text-start sm:col-span-1">
              <InputField
                {...formik.getFieldProps("lastName")}
                value={
                  formik.getFieldProps("lastName").value === null
                    ? user.lastName
                    : formik.getFieldProps("lastName").value
                }
                name="lastName"
                className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                placeholder={user.lastName}
                disabled={!editProfile}
                sepLabel="Last Name"
                labelAlignment={AlignmentTypes.BLOCK}
                sepLabelClassName="text-gradient-yellow-900 font-bold"
                RequiredLabelClassName="bg-[#f59f0b5e]"
                required={editProfile}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="translate-y-11 text-left text-xs text-red-700">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 ml-20 mt-20 justify-start text-start sm:col-span-1">
              <label className=" text-gradient-yellow-900">
                <div className="-translate-y-1">
                  <span className="font-bold">Username </span>
                  <span className="text-[10px]">
                    (Cannot change this field)
                  </span>
                </div>
              </label>
              <InputField
                className="mt-1 cursor-not-allowed border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                placeholder={user.email}
                value={
                  formik.getFieldProps("email").value === null
                    ? user.email
                    : formik.getFieldProps("email").value
                }
                disabled
                required
              />
            </div>
            <div className="col-span-2 ml-20 mt-20 justify-start text-start sm:col-span-1">
              <InputField
                {...formik.getFieldProps("email")}
                name="email"
                className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                placeholder={user.email}
                disabled={!editProfile}
                sepLabel="E-mail"
                labelAlignment={AlignmentTypes.BLOCK}
                sepLabelClassName="text-gradient-yellow-900 font-bold"
                RequiredLabelClassName="bg-[#f59f0b5e]"
                required={editProfile}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="translate-y-11 text-left text-xs text-red-700">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="col-span-2 ml-20 mt-[90px] justify-start text-start sm:col-span-1">
              <label className="flex -translate-y-2 text-gradient-yellow-900">
                <span className="font-bold">Gender </span>
                {editProfile && (
                  <div className="ml-2 mr-2 hidden sm:flex">
                    <FormRequiredLabel className="m-auto bg-[#f59f0b5e]" />
                  </div>
                )}
                <span className="ml-2 rounded-lg bg-gradient-to-b from-yellow-500 to-yellow-300 px-4 py-1 text-xs font-bold text-black">
                  {selectedGender}
                </span>
              </label>
              <CheckBoxSetResponsive
                className="mt-2 -translate-y-2 pl-5"
                dataset={gender}
                type="radio"
                name="gender"
                onOptionChange={handleGenderOptionChange}
                disabled={!editProfile}
              />
              {selectedGender === null ? (
                <div className="text-left text-xs text-red-700">
                  Gender is required
                </div>
              ) : null}
            </div>

            <div className="col-span-2 ml-20 mt-9 justify-start text-start sm:col-span-1">
              <InputField
                {...formik.getFieldProps("mobileNo")}
                value={
                  formik.getFieldProps("mobileNo").value === null
                    ? user.mobileNo
                    : formik.getFieldProps("mobileNo").value
                }
                name="mobileNo"
                className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                placeholder={user.mobileNo}
                disabled={!editProfile}
                sepLabel="Mobile Number"
                labelAlignment={AlignmentTypes.BLOCK}
                sepLabelClassName="text-gradient-yellow-900 font-bold"
                RequiredLabelClassName="bg-[#f59f0b5e]"
                required={editProfile}
              />
              {formik.touched.mobileNo && formik.errors.mobileNo ? (
                <div className="translate-y-11 text-left text-xs text-red-700">
                  {formik.errors.mobileNo}
                </div>
              ) : null}
            </div>
            <div className="ml-20 mt-6 text-start">
              <label className="flex translate-y-1 text-gradient-yellow-900">
                <span className="font-bold">Residential Address </span>
                {editProfile && (
                  <div className="ml-2 mr-2 hidden sm:flex">
                    <FormRequiredLabel className="m-auto bg-[#f59f0b5e]" />
                  </div>
                )}
              </label>
              <TextArea
                {...formik.getFieldProps("address")}
                value={
                  formik.getFieldProps("address").value === null
                    ? user.address
                    : formik.getFieldProps("address").value
                }
                name="address"
                className="w-full border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                placeholder={user.address}
                disabled={!editProfile}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-left text-xs text-red-700">
                  {formik.errors.address}
                </div>
              ) : null}
              <div>
                {!editProfile ? (
                  <Button
                    className="hover:text-none ml-0 mt-14 justify-items-start border !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-10 py-3 text-sm text-black hover:bg-gradient-yellow-900"
                    onClick={() => setEditProfile(!editProfile)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      disabled={
                        Boolean(formik.errors.firstName) ||
                        Boolean(formik.errors.lastName) ||
                        Boolean(formik.errors.email) ||
                        !Boolean(selectedGender) ||
                        Boolean(formik.errors.mobileNo) ||
                        Boolean(formik.errors.address)
                      }
                      className={twMerge([
                        "hover:text-none ml-0 mt-14 justify-items-start border !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-10 py-3 text-sm text-black hover:bg-gradient-yellow-900",
                        formik.errors.firstName ||
                        formik.errors.lastName ||
                        formik.errors.email ||
                        !selectedGender ||
                        formik.errors.mobileNo ||
                        formik.errors.address
                          ? "cursor-not-allowed opacity-40"
                          : "cursor-pointer",
                      ])}
                    >
                      Save Changes
                    </Button>
                    <Button
                      className="hover:text-none ml-0 mt-14 justify-items-start border !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-10 py-3 text-sm text-black hover:bg-gradient-yellow-900"
                      onClick={() => {
                        setEditProfile(!editProfile);
                      }}
                    >
                      Cancel Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={formikPW.handleSubmit}>
          <div className="ml-20 mt-14 flex "></div>

          <div className="!-mt-14 mb-10 grid grid-cols-2 items-center  justify-start gap-1 pb-4 md:mt-0 lg:mt-0 lg:flex-row">
            <div className="col-span-2 ml-20 mt-20 justify-start text-start text-[20px] font-black text-gradient-yellow-900 sm:text-[20px] md:text-[20px] lg:text-[25px]">
              <h3>Change Password</h3>
            </div>
            <div className="col-span-2 ml-20 mt-20 justify-start text-start sm:col-span-1">
              <InputField
                type="password"
                {...formikPW.getFieldProps("currentPassword")}
                name="currentPassword"
                className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                placeholder="Current Password"
                disabled={!editPassword}
                sepLabel="Current Password"
                labelAlignment={AlignmentTypes.BLOCK}
                sepLabelClassName="text-gradient-yellow-900 font-bold"
                RequiredLabelClassName="bg-[#f59f0b5e]"
                required={editPassword}
              />
              {formikPW.touched.currentPassword &&
              formikPW.errors.currentPassword ? (
                <div className="translate-y-11 text-left text-xs text-red-700">
                  {formikPW.errors.currentPassword}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 ml-20 mt-20 justify-start text-start sm:col-span-1">
              <InputField
                type="password"
                {...formikPW.getFieldProps("newPassword")}
                name="newPassword"
                className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                placeholder="New Password"
                disabled={!editPassword}
                sepLabel="New Password"
                labelAlignment={AlignmentTypes.BLOCK}
                sepLabelClassName="text-gradient-yellow-900 font-bold"
                RequiredLabelClassName="bg-[#f59f0b5e]"
                required={editPassword}
              />
              {formikPW.touched.newPassword && formikPW.errors.newPassword ? (
                <div className="translate-y-11 text-left text-xs text-red-700">
                  {formikPW.errors.newPassword}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 ml-20 mt-10 justify-start text-start sm:col-span-1">
              <div>
                {!editPassword ? (
                  <Button
                    className="hover:text-none ml-0 mt-10 justify-items-start border !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-10 py-3 text-sm text-black hover:bg-gradient-yellow-900"
                    onClick={() => setEditPassword(!editPassword)}
                  >
                    Change Password
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      disabled={
                        Boolean(formikPW.errors.currentPassword) ||
                        Boolean(formikPW.errors.newPassword)
                      }
                      className={twMerge([
                        "hover:text-none ml-0 mt-14 justify-items-start border !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-10 py-3 text-sm text-black hover:bg-gradient-yellow-900",
                        formikPW.errors.currentPassword ||
                        formikPW.errors.newPassword
                          ? "cursor-not-allowed opacity-40"
                          : "cursor-pointer",
                      ])}
                    >
                      Save Changes
                    </Button>
                    <Button
                      className="hover:text-none ml-0 mt-14 justify-items-start border !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-10 py-3 text-sm text-black hover:bg-gradient-yellow-900"
                      onClick={() => {
                        setEditPassword(!editPassword);
                      }}
                    >
                      Cancel Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
        <div>
          {!editProfile ? (
            <div>
              <p className=" text-2xl font-bold tracking-wider text-gradient-yellow-900">
                Order Details
              </p>
              <br />
              <div className="flex w-full  items-stretch justify-center rounded-3xl bg-amber-200 p-10">
                <table className="w-full max-w-screen-xl rounded-xl p-8 shadow-2xl">
                  <thead>
                    <tr>
                      <th className="bg-amber-600 px-6 py-3 text-center text-xs font-semibold uppercase leading-4 tracking-wider text-gray-100">
                        Order Id
                      </th>
                      <th className="bg-amber-600 px-6 py-3 text-center text-xs font-semibold uppercase leading-4 tracking-wider text-gray-100">
                        Email
                      </th>
                      <th className="bg-amber-600 px-6 py-3 text-center text-xs font-semibold uppercase leading-4 tracking-wider text-gray-100">
                        Amount
                      </th>
                      <th className="bg-amber-600 px-6 py-3 text-center text-xs font-semibold uppercase leading-4 tracking-wider text-gray-100">
                        Items
                      </th>
                      <th className="bg-amber-600 px-6 py-3 text-center text-xs font-semibold uppercase leading-4 tracking-wider text-gray-100">
                        Payment Method
                      </th>
                      {/* Add more headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((order: Order) => (
                      <tr key={order._id} className="hover:bg-gray-50 ">
                        <td className="whitespace-nowrap px-6 py-4 text-sm leading-5 text-gray-800">
                          {order.orderCode}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm leading-5 text-gray-800">
                          {order.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm leading-5 text-gray-800">
                          Rs. {order.amount}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm leading-5 text-gray-800">
                            {order.payment === "COD" && (
                              <p className="w-2/3 rounded-2xl bg-gray-900 text-white p-1 text-xs tracking-wide text-blue-950 text-center">
                                COD
                              </p>
                            )}
                            {order.payment === "Card" && (
                             <p className="w-2/3 rounded-2xl bg-violet-800 text-white p-1 text-xs tracking-wide text-green-950 text-center">
                             CARD
                           </p>
                            )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm leading-5 text-gray-800">
                          <div className="flex items-center justify-center">
                          {order.status === "Pending" && (
                              <p className="w-2/3 rounded-2xl bg-blue-400 p-1 text-xs tracking-wide text-blue-950">
                                Pending
                              </p>
                            )}
                            {order.status === "Delivered" && (
                             <p className="w-2/3 rounded-2xl bg-green-400 p-1 text-xs tracking-wide text-green-950">
                             Delivered
                           </p>
                            )}
                            {order.status === "Cancelled" && (
                             <p className="w-2/3 rounded-2xl bg-red-500 p-1 text-xs tracking-wide text-red-950">
                             Cancelled
                           </p>
                            )}
                            {order.status === "Processing" && (
                             <p className="w-2/3 rounded-2xl bg-yellow-500 p-1 text-xs tracking-wide text-red-950">
                             Processing
                           </p>
                            )}
                          </div>
                        </td>
                        {/* Add more cells with product data as needed */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <ul className="flex">
                  {Array(Math.ceil(order.length / itemsPerPage))
                    .fill(null)
                    .map((_, index) => (
                      <li key={index}>
                        <button
                          onClick={() => paginate(index + 1)}
                          className={`${
                            currentPage === index + 1
                              ? "bg-amber-600 text-white"
                              : "bg-gray-300"
                          } mx-1 cursor-pointer rounded px-3 py-1`}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-3"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
