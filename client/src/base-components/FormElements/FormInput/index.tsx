import { twMerge } from "tailwind-merge";

interface FormInputProps {
  id?: string;
  className?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  labelClassName?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  type?: string;
  accept?: ".jpeg" | ".png" | ".jpg" | string;
  name?: string;
  onBlur?: any;
}

const FormInput = (props: FormInputProps) => {
  return (
    <>
      <div className="w-full">
        <div className="relative">
          <input
            type={props.type ? props.type : "text"}
            id={props.id}
            className={twMerge([
              "border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500",
              props.className,
            ])}
            placeholder={props.placeholder && props.placeholder}
            onChange={props.onChange}
            value={props.value}
            disabled={props.disabled && props.disabled}
            accept={props.accept && props.accept}
            name={props.name && props.name}
            onBlur={props.onBlur && props.onBlur}
          />
          <label
            htmlFor={props.id}
            className={twMerge([
              "absolute left-1 top-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500",
              props.labelClassName,
            ])}
          >
            {props.label}
          </label>
        </div>
        {props.helperText && (
          <p
            id="floating_helper_text"
            className="mb-5 mt-2 text-xs text-gray-500 dark:text-gray-400"
          >
            {props.helperText}
          </p>
        )}
      </div>
    </>
  );
};

export default FormInput;
