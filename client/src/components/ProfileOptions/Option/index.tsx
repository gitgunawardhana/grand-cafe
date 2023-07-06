import { twMerge } from "tailwind-merge";
import { Button } from "../../../base-components/Button";

interface OptionProps {
  onClick?: () => void;
  className?: string;
  icon: JSX.Element;
  label: string;
  to: string;
}

const Option = (props: OptionProps) => {
  return (
    <>
      <Button
        as="a"
        href={props.to}
        onClick={props.onClick}
        className={twMerge([
          "text-medium m-0 rounded-none",
          // theme === Modes.DARK && "border-orange-600",
          props.className,
        ])}
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
