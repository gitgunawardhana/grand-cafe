import { twMerge } from "tailwind-merge";
import DropdownButton from "../../base-components/DropdownButton";
import LucideIcon from "../../base-components/LucideIcon";
import { CSSClasses } from "../../constants";
import Option from "./Option";

interface ProfileOptionsProps {
  className?: string;
}

const ProfileOptions = (props: ProfileOptionsProps) => {
  const Profile = (
    <LucideIcon
      icon="UserCircle"
      size={40}
      strokeWidth={1}
      className={twMerge(["mx-auto block text-gradient-yellow-500"])}
    />
  );

  const profileOptionList = [
    {
      icon: (
        <LucideIcon
          icon="LogIn"
          size={18}
          className={twMerge([
            "mx-auto block !text-gradient-yellow-500 group-hover:!text-gradient-yellow-900",
          ])}
        />
      ),
      text: "Sign In",
      to: "sign-in",
    },
    {
      icon: (
        <LucideIcon
          icon="LogOut"
          size={18}
          className={twMerge([
            "mx-auto block !text-gradient-yellow-500 group-hover:!text-gradient-yellow-900",
          ])}
        />
      ),
      text: "Sign Up",
      to: "sign-up",
    },
  ];
  return (
    <>
      <div className={twMerge(["relative z-50 w-fit p-0", props.className])}>
        <DropdownButton
          icon={Profile}
          items={profileOptionList}
          className={twMerge(
            "border-2 border-gradient-yellow-300 !backdrop-blur-md"
          )}
          buttonClassName={twMerge([
            "!m-0 !p-0 !static",
            "!shadow-none",
            CSSClasses.NAVBARICON,
          ])}
        >
          {profileOptionList?.map((item) => (
            <DropdownButton.LI
              key={item.text}
              className="z-50 w-fit justify-start text-left hover:!bg-yellow-200 hover:!bg-opacity-5"
            >
              <Option
                onClick={() => {}}
                to={item.to}
                className="group h-[40px] w-28 border-none !bg-transparent !text-gradient-yellow-500"
                icon={item.icon}
                label={item.text}
              />
            </DropdownButton.LI>
          ))}
        </DropdownButton>
      </div>
    </>
  );
};

export default ProfileOptions;
