import React from "react";
import { twMerge } from "tailwind-merge";

// Define the props for the button
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
}

// Define the Button component
const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type = "button",
  primary,
  secondary,
  disabled,
}) => {
  // Define button styles based on props
  const buttonStyles = [
    "px-4 py-2 rounded focus:outline-none",
    primary
      ? "bg-blue-500 hover:bg-blue-600 text-white"
      : secondary
      ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
      : "bg-indigo-500 hover:bg-indigo-600 text-white",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className || "",
  ];

  return (
    <button
      type={type}
      className={twMerge(buttonStyles)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
