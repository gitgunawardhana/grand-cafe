import { twMerge } from "tailwind-merge";

export interface CheckBoxSetResponsiveProps {
  className?: string;
  label?: string;
  id?: string;
  value?: string;
  name?: string;
  inputClassName?: string;
  labelClassName?: string;
  type?: "radio" | "checkbox";
  dataset?: {
    id: string;
    label: string;
    value: string;
  }[];
}

const Main = (props: CheckBoxSetResponsiveProps) => {
  return (
    <div className="relative sm:flex">
      <p className="absolute -top-2 left-1 bg-gradient-brown-900 !px-[5px] text-xs font-medium text-gradient-yellow-900">
        {props.label}
      </p>
      <ul
        className={twMerge([
          "w-full items-center rounded-lg text-sm font-medium text-gray-900",
          "border border-gradient-yellow-900 sm:!flex",
          props.className && props.className,
        ])}
      >
        {props.dataset?.map((item, key) => (
          <li className="w-full">
            <div className="flex items-center pl-3">
              <input
                id={item.id}
                type={props.type}
                value={item.value}
                name={props.name}
                className={twMerge([
                  "h-4 w-4 transform-cpu bg-[#fadf85] checked:text-gradient-yellow-900 hover:scale-125 focus:ring-0 focus:ring-transparent",
                  props.inputClassName && props.inputClassName,
                ])}
              />
              <label
                htmlFor={item.id}
                className={twMerge([
                  "w-full py-3 pl-5 text-sm font-medium text-gradient-yellow-900",
                  props.labelClassName && props.labelClassName,
                ])}
              >
                {item.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
