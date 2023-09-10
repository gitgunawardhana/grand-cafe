import { useContext, useState } from "react";
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
import { updateCurrentUser } from "../../services/user";
import { convertToBase64 } from "../../utils";

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

const Main = () => {
  const { axiosJWT } = useContext(ProviderContext);
  const { user, setUser } = useContext(UserProviderContext);

  const [editProfile, setEditProfile] = useState<boolean>(false);

  const handleGenderOptionChange = (optionValue: string) => {
    setUser({ ...user, gender: optionValue });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file: File = e.target.files[0];
      try {
        const base64: string = await convertToBase64(file);
        setUser({ ...user, avatar: base64 });
      } catch (error) {
        // Handle errors, e.g., display an error message or log the error.
        console.error("Error converting file to base64:", error);
      }
    }
  };

  return (
    <>
      <div className="mt-0!m-auto ml-[100px] mr-52 flex flex-col justify-center object-cover px-12 text-center text-gradient-yellow-300 md:px-28 lg:px-32">
        <div className="col-span-2 ml-20 mt-20 justify-start text-start text-[20px] font-black text-gradient-yellow-900 sm:text-[20px] md:text-[30px] lg:text-[45px]">
          <h1>Account Settings</h1>
        </div>

        <div className="ml-20 mt-14 flex ">
          <div className="relative w-fit">
            <img
              className="h-[154px] w-[154px] rounded-full object-cover"
              src={user.avatar ? user.avatar : profileIcon}
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
              className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
              placeholder={user.firstName}
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              disabled={!editProfile}
              sepLabel="First Name"
              labelAlignment={AlignmentTypes.BLOCK}
              sepLabelClassName="text-gradient-yellow-900 font-bold"
              RequiredLabelClassName="bg-[#f59f0b5e]"
              required={editProfile}
            />
          </div>
          <div className="col-span-2 ml-20 mt-20 justify-start text-start sm:col-span-1">
            <InputField
              className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
              placeholder={user.lastName}
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              disabled={!editProfile}
              sepLabel="Last Name"
              labelAlignment={AlignmentTypes.BLOCK}
              sepLabelClassName="text-gradient-yellow-900 font-bold"
              RequiredLabelClassName="bg-[#f59f0b5e]"
              required={editProfile}
            />
          </div>
          <div className="col-span-2 ml-20 mt-20 justify-start text-start sm:col-span-1">
            <label className=" text-gradient-yellow-900">
              <div className="-translate-y-1">
                <span className="font-bold">Username </span>
                <span className="text-[10px]">(Cannot change this field)</span>
              </div>
            </label>
            <InputField
              className="mt-1 cursor-not-allowed border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
              placeholder={user.email}
              value={user.email}
              disabled
              required
            />
          </div>
          <div className="col-span-2 ml-20 mt-20 justify-start text-start sm:col-span-1">
            <InputField
              className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
              placeholder={user.email}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              disabled={!editProfile}
              sepLabel="E-mail"
              labelAlignment={AlignmentTypes.BLOCK}
              sepLabelClassName="text-gradient-yellow-900 font-bold"
              RequiredLabelClassName="bg-[#f59f0b5e]"
              required={editProfile}
            />
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
                {user.gender}
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
          </div>

          <div className="col-span-2 ml-20 mt-9 justify-start text-start sm:col-span-1">
            <InputField
              className="border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
              placeholder={user.mobileNo}
              value={user.mobileNo}
              onChange={(e) => setUser({ ...user, mobileNo: e.target.value })}
              disabled={!editProfile}
              sepLabel="Mobile Number"
              labelAlignment={AlignmentTypes.BLOCK}
              sepLabelClassName="text-gradient-yellow-900 font-bold"
              RequiredLabelClassName="bg-[#f59f0b5e]"
              required={editProfile}
            />
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
              className="w-full border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
              placeholder={user.address}
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              disabled={!editProfile}
            />
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
                    className="hover:text-none ml-0 mt-14 justify-items-start border !border-gradient-yellow-900 bg-gradient-to-b from-yellow-500 to-yellow-300 px-10 py-3 text-sm text-black hover:bg-gradient-yellow-900"
                    onClick={() => {
                      updateCurrentUser(axiosJWT, user, setUser);
                      setEditProfile(!editProfile);
                    }}
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
      </div>
    </>
  );
};

export default Main;
