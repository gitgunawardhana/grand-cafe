import { twMerge } from "tailwind-merge";

export interface CheckBoxProps {
  id?: string;
  label?: string;
  value?: string;
  name?: string;
  inputClassName?: string;
  labelClassName?: string;
  type?: "radio" | "checkbox";
}

const CheckBox = (props: CheckBoxProps) => {
  return (
    <>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        name={props.name}
        className={twMerge([
          "h-4 w-4 text-gradient-yellow-900 focus:ring-2 focus:ring-gradient-yellow-900",
          props.inputClassName && props.inputClassName,
        ])}
      />
      <label
        htmlFor={props.id}
        className={twMerge([
          "ml-5 w-full py-3 text-sm font-medium text-gradient-yellow-900",
          props.labelClassName && props.labelClassName,
        ])}
      >
        {props.label}
      </label>
    </>
  );
};

export default CheckBox;
