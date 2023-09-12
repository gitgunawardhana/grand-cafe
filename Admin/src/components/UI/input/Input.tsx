import React, { useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./Input.module.scss";

interface Props {
  id: string;
  type: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  classes?: string;
  value?: string;
  ref?: React.Ref<HTMLInputElement>; // Change the ref type
  readonly?: boolean;
  autocomplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IImperativeHandler {
  focus: () => void;
  value?: string;
}
const Input = React.forwardRef<IImperativeHandler, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(props.value || "");

  function inputChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    // Create a new ChangeEvent-like object manually
    const changeEvent = {
      target: e.currentTarget,
    } as React.ChangeEvent<HTMLInputElement>;

    // Invoke the callback when the input value changes
    if (props.onChange) {
      props.onChange(changeEvent); // Pass the custom event object
    }
  }
  function inputFocused() {
    inputRef.current?.focus();
    inputRef.current?.setAttribute("style", "border:2px solid red");
  }

  useImperativeHandle(ref, () => {
    return {
      focus: inputFocused,
      value: props.value,
    };
  });
  const { t } = useTranslation();
  return (
    <div className={`${classes.form__control} ${props.classes}`}>
      <label htmlFor={props.id}>{t(`${props.id}`)}</label>
      <input
        ref={inputRef}
        id={props.id}
        minLength={props.minLength}
        maxLength={props.maxLength}
        type={props.type}
        placeholder={props.placeholder}
        value={value}
        readOnly={props.readonly || false}
        autoComplete={props.autocomplete || "off"}
        onChange={inputChangeHandler}
      />
    </div>
  );
});

export default Input;
