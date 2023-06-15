import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  className?: string;
  as?: E;
};

type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>>;

export const Button = <E extends React.ElementType = "a">({
  // Change the default type to "a"
  children,
  as,
  className,
  ...props
}: ButtonProps<E>) => {
  const Component = as || "button";
  // General Styles
  const generalStyles = [
    "max-w-fit transition duration-200 border shadow-sm inline-flex items-center justify-center py-3 px-4 rounded-md font-medium cursor-pointer inline-flex items-center justify-center text-base font-medium text-gray-500 bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white", // Default
    "focus:ring-4 focus:ring-primary focus:ring-opacity-20", // On focus
    "focus-visible:outline-none", // On focus visible
    "dark:focus:ring-slate-700 dark:focus:ring-opacity-50", // Dark mode
    "my-2",
  ];
  return (
    <Component className={twMerge([generalStyles, className])} {...props}>
      {children}
    </Component>
  );
};
