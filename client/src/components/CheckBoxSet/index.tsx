import { twMerge } from "tailwind-merge";

export interface CheckBoxSetProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

const Main = (props: CheckBoxSetProps) => {
  return (
    <div className="relative">
      <p className="absolute -top-2 left-1 bg-gradient-brown-900 !px-[5px] text-xs font-medium text-gradient-yellow-900">
        {props.label}
      </p>
      <ul
        style={{ display: "block" }}
        className={twMerge([
          "w-full items-center rounded-lg text-sm font-medium text-gray-900",
          "border border-gradient-yellow-900",
          props.className && props.className,
        ])}
      >
        <li className="w-full">
          <div className="flex items-center pl-3">{props.children}</div>
        </li>
      </ul>
    </div>
  );
};

export default Main;
