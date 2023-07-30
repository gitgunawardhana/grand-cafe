import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";

interface DropdownButtonProps {
  buttonClassName?: string;
  icon?: JSX.Element;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  items?: {
    icon?: JSX.Element;
    text?: string;
    to?: string;
  }[];
  textColor?: string;
}

function DropdownButton(props: DropdownButtonProps) {
  //* Dropdown menu handler - start
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  //* Dropdown menu handler - end

  return (
    <>
      <Button
        id="dropdownDefaultButton"
        className={props.buttonClassName}
        onClick={handleToggleDropdown}
      >
        <div className="relative flex justify-start text-center">
          <div className="left-1 justify-start">{props.icon && props.icon}</div>
          <div
            className={twMerge([
              "justify-items-center text-center text-xs font-semibold hover:!text-gradient-yellow-900",
            ])}
          >
            {props.label && props.label}
          </div>
        </div>
      </Button>
      {isDropdownOpen && (
        <div
          id="dropdown"
          className={twMerge([
            "!absolute right-0 !z-50 w-fit divide-y divide-gray-100 overflow-hidden rounded-lg border-[1px] shadow-lg",
            props.className,
          ])}
        >
          <ul className="text-sm" aria-labelledby="dropdownDefaultButton">
            {props.children}
          </ul>
        </div>
      )}
    </>
  );
}

interface LIProps {
  className?: string;
  children?: React.ReactNode;
}

const LI = (props: LIProps) => {
  return (
    <li className={twMerge(["divide-gray-100", props.className])}>
      {props.children}
    </li>
  );
};

DropdownButton.LI = LI;
export default DropdownButton;
