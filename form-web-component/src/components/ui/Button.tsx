import React from "react";
import type { ZodIssue } from "zod";

export type ButtonUIProps = {
  type?: "button" | "submit" | "reset";
  variant?: "blue" | "white" | "disabled";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: React.ReactNode;
  zodError?: ZodIssue | null;
  className?: string;
};

const baseStyles =
  "w-full px-4 py-2 rounded font-semibold transition-all duration-200 focus:outline-none cursor-pointer";

const variantStyles: Record<string, string> = {
  blue: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
  white:
    "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200",
  disabled: "bg-gray-200 text-gray-400 cursor-not-allowed",
};

export const ButtonUI: React.FC<ButtonUIProps> = ({
  type = "button",
  variant = "blue",
  onClick,
  disabled = false,
  children,
  zodError,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || variant === "disabled";
  const style =
    baseStyles +
    " " +
    (isDisabled ? variantStyles["disabled"] : variantStyles[variant]) +
    " " +
    className;

  return (
    <div className="flex flex-col items-start w-full">
      <button
        type={type}
        className={style}
        onClick={onClick}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </button>
      {zodError && (
        <span className="text-xs text-red-500 mt-1">{zodError.message}</span>
      )}
    </div>
  );
};

export default ButtonUI;
