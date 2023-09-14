import { twMerge } from "tailwind-merge";

interface Gender {
  id: string;
  label: string;
  value: string;
}

export interface CheckBoxSetResponsiveProps {
  className?: string;
  label?: string;
  id?: string;
  value?: string;
  price?: number;
  name?: string;
  selectedOption?: string | string[] | null; // Change the type to string or null
  onOptionChange?: (optionValue: string, checked: boolean) => void;
  inputClassName?: string;
  labelClassName?: string;
  type?: "radio" | "checkbox";
  dataset?:
    | {
        id: string;
        label: string;
        price: number;
        value: string;
      }[]
    | Gender[];
  checkedValue?: string;
  disabled?: boolean;
}

const Main = (props: CheckBoxSetResponsiveProps) => {
  const { dataset, type, name } = props;

  return (
    <div className="relative sm:flex">
      <p className="absolute -top-2 left-1 bg-main-background !px-[5px] text-xs font-medium text-gradient-yellow-900">
        {props.label}
      </p>
      <ul
        className={twMerge([
          "w-full items-center rounded-lg text-sm font-medium text-gray-900",
          "border border-gradient-yellow-900 sm:!flex",
          props.className && props.className,
        ])}
      >
        {dataset?.map((item, key) => (
          <li key={item.label} className="w-full">
            <div className="flex items-center pl-3">
              <input
                id={item.id}
                type={type}
                value={item.value}
                name={name}
                className={twMerge([
                  "h-4 w-4 transform-cpu bg-[#fadf85] checked:text-gradient-yellow-900 hover:scale-125 focus:ring-0 focus:ring-transparent",
                  props.inputClassName && props.inputClassName,
                ])}
                onChange={(e) => {
                  if (props.onOptionChange) {
                    props.onOptionChange(
                      String(
                        "price" in item ? `${item.price}` : `${item.value}`
                      ),
                      e.target.checked
                    );
                  }
                }}
                disabled={props.disabled && props.disabled}
              />
              <label
                htmlFor={item.id}
                className={twMerge([
                  "w-full py-3 pl-5 text-sm font-medium text-gradient-yellow-900",
                  props.labelClassName && props.labelClassName,
                ])}
              >
                {item.label} {"price" in item && `Rs.${item.price}`}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
