import React, { type ButtonHTMLAttributes } from "react";
import classNames from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  secondary,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        "rounded-md border px-4 py-2",
        !secondary && "border-sky-600 bg-sky-600 text-white",
        secondary && "border-sky-600 bg-transparent text-sky-600",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
