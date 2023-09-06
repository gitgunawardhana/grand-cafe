import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button } from "../../../base-components/Button";
import { handleLogout } from "../../../services/auth";
import { ProviderContext } from "../../Provider";

interface OptionProps {
  onClick?: () => void;
  className?: string;
  icon: JSX.Element;
  label: string;
  to: string;
}

const Option = (props: OptionProps) => {
  const navigate = useNavigate();
  const { axiosJWT } = useContext(ProviderContext);
  return (
    <>
      <Button
        as={props.label !== "Sign Out" ? NavLink : undefined}
        to={`/${props.to}`}
        className={twMerge([
          "text-medium m-0 rounded-none",
          "!shadow-none",
          props.className,
        ])}
        onClick={
          props.label === "Sign Out"
            ? (e) => handleLogout(e, axiosJWT, navigate)
            : undefined
        }
      >
        <div className="group relative flex justify-start text-center">
          <div className="left-1 mr-2 justify-start">{props.icon}</div>
          <div className="justify-items-center py-1 text-center text-xs font-semibold group-hover:!text-gradient-yellow-900">
            {props.label}
          </div>
        </div>
      </Button>
    </>
  );
};

export default Option;
