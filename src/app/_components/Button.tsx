import React, { type ButtonHTMLAttributes } from "react";
import cx from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  secondary,
  ...rest
}) => {
  return (
    <button
      className={cx(
        "rounded-md border px-4 py-2",
        !secondary && "border-sky-600 bg-sky-600 text-white",
        secondary && "border-sky-600 bg-transparent text-sky-600",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
