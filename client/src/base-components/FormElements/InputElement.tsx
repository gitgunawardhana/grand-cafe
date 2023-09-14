import { twMerge } from "tailwind-merge";
import { AlignmentTypes } from "../../constants";
import FormInput from "./FormInput";
import FormLabel from "./FormLabel";
import { FormRequiredIcon, FormRequiredLabel } from "./FormRequired";

interface InputFieldProps {
  id?: string;
  className?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  required?: boolean;
  RequiredLabelClassName?: string;
  labelClassName?: string;
  sepLabelClassName?: string;
  label?: string;
  helperText?: string;
  sepLabel?: string;
  labelAlignment?: AlignmentTypes;
  type?: string;
  disabled?: boolean;
  accept?: ".jpeg" | ".png" | ".jpg" | string;
  name?: string;
  onBlur?: any;
}

const InputField = (props: InputFieldProps) => {
  return (
    <>
      <div
        className={
          props.sepLabel
            ? `grid sm:grid-cols-5 ${
                props.labelAlignment === AlignmentTypes.BLOCK
                  ? "flow-cols-grid grid-cols-12"
                  : "grid-flow-row grid-cols-1"
              }`
            : ""
        }
      >
        <div
          className={`${
            props.labelAlignment === AlignmentTypes.BLOCK
              ? "col-span-12 mb-2"
              : "col-span-2"
          }
          grid`}
        >
          {props.sepLabel ? (
            <FormLabel
              htmlFor={props.id}
              className="m-0 mb-2 flex h-full max-h-[38px] items-center sm:mb-0"
            >
              <div className="text-left">
                <div className="flex flex-wrap items-center justify-start">
                  <p
                    className={twMerge([
                      "mr-2 font-medium",
                      props.sepLabelClassName && props.sepLabelClassName,
                    ])}
                  >
                    {props.sepLabel}
                  </p>
                  <div
                    className={`${
                      props.required ? "mr-2" : "mr-0"
                    } hidden sm:flex`}
                  >
                    {props.required ? (
                      <FormRequiredLabel
                        className={
                          props.RequiredLabelClassName &&
                          props.RequiredLabelClassName
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={`${
                      props.required ? "mr-2 sm:mr-0" : "mr-0"
                    } sm:hidden`}
                  >
                    {props.required ? <FormRequiredIcon /> : ""}
                  </div>
                </div>
              </div>
            </FormLabel>
          ) : (
            ""
          )}
        </div>
        <div
          className={`${
            props.labelAlignment === AlignmentTypes.BLOCK
              ? "col-span-12"
              : "col-span-3"
          } grid
          md:h-1`}
        >
          <FormInput
            id={props.id && props.id}
            className={props.className && props.className}
            placeholder={props.placeholder && props.placeholder}
            onChange={props.onChange}
            value={props.value}
            labelClassName={props.labelClassName && props.labelClassName}
            label={props.label && props.label}
            helperText={props.helperText && props.helperText}
            disabled={props.disabled && props.disabled}
            type={props.type && props.type}
            accept={props.accept && props.accept}
            name={props.name && props.name}
            onBlur={props.onBlur && props.onBlur}
          />
        </div>
      </div>
    </>
  );
};

InputField.defaultProps = {
  type: "text",
};

export default InputField;
