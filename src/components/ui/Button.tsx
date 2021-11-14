import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  reverse?: boolean;
  deconstruct?: boolean;
  size?: "sm" | "md" | "lg";
}

const Button: FC<Props> = ({
  children,
  reverse = false,
  deconstruct = false,
  size = "md",
  className,
  disabled,
  ...props
}) => {
  const rootClassName = cn(
    "shadow-sm rounded-md border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500",
    deconstruct
      ? {
          "text-white bg-red-500 hover:bg-red-600": reverse,
          "text-red-500 hover:bg-red-50": !reverse,
        }
      : {
          "bg-white hover:bg-gray-50 text-gray-900": !reverse,
          "hover:bg-gray-50": !reverse && !disabled,
          "bg-gray-900 hover:bg-gray-800 text-white": reverse,
          "hover:bg-gray-900": reverse && !disabled,
          "bg-opacity-50 cursor-default": disabled,
        },
    {
      "px-2 py-1": size === "md",
      "px-1 py-px": size === "sm",
      "px-3 py-2": size === "lg",
    },
    className
  );
  return (
    <button className={rootClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
