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
        "rounded-sm border px-4 py-2",
        !secondary && "border-slate-500 bg-slate-500",
        secondary && "border-slate-500 bg-transparent",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
