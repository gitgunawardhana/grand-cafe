import React, { useImperativeHandle, useRef } from "react";
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IImperativeHandler {
  focus: () => void;
  value?: string;
}
const Input = React.forwardRef<IImperativeHandler, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [value, setValue] = useState(props.value || "");

  // function inputChangeHandler(e: React.FormEvent<HTMLInputElement>) {
  //   setValue(e.currentTarget.value);
  // }

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
        value={props.value}
        readOnly={props.readonly || false}
        onChange={props.onChange}
        autoComplete={props.autocomplete || "off"}
      />
    </div>
  );
});

export default Input;
