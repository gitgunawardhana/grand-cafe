import React from "react";

import classes from "./Button.module.scss";
import { Link } from "react-router-dom";

interface Props {
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  outline?: boolean;
  to?: string;
}
const Button: React.FC<Props> = (props) => {
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`${classes.btn} ${props.outline ? classes.outline : classes.button}`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className={`${classes.btn} ${props.outline ? classes.outline : classes.button}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
