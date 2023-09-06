import React from "react";

import { twMerge } from "tailwind-merge";

type ButtonOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  className?: string;
  dataDropdownToggle?: string;
  as?: E;
  to?: string;
  generalStylesStatus?: boolean;
  disabled?: boolean;
};

type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>>;

export const Button = <E extends React.ElementType = "a">({
  children,
  as,
  className,
  generalStylesStatus,
  dataDropdownToggle,
  ...props
}: ButtonProps<E>) => {
  const Component = as || "button";

  // General Styles
  const generalStyles = [
    "max-w-fit transition duration-200 border shadow-sm inline-flex items-center px-4 py-4 justify-center rounded-md font-medium cursor-pointer inline-flex items-center justify-center text-base font-medium text-gradient-yellow-300 bg-gradient-yellow-300 hover:text-gradient-yellow-300 hover:bg-gradient-yellow-300", // Default
    "leading-normal shadow-[0_4px_9px_-5px] transition duration-150 ease-in-out hover:shadow-[0_4px_18px_0_rgba(96,255,83,0.2)]",

    "my-2",
  ];
  return (
    <Component
      className={twMerge([generalStylesStatus && generalStyles, className])}
      {...props}
      data-dropdown-toggle={dataDropdownToggle && dataDropdownToggle}
    >
      {children}
    </Component>
  );
};

Button.defaultProps = {
  generalStylesStatus: true,
};
