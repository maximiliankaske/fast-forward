import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  reverse?: true;
  size?: "sm" | "md";
}

const Button: FC<Props> = ({
  children,
  reverse = false,
  size = "md",
  className,
  disabled,
  ...props
}) => {
  const rootClassName = cn(
    "shadow-sm rounded-md border",
    { "bg-white text-gray-900": !reverse },
    { "hover:bg-gray-50": !reverse && !disabled },
    {
      "bg-gray-800 text-white": reverse,
    },
    { "hover:bg-gray-900": reverse && !disabled },
    { "bg-opacity-50 cursor-default": disabled },
    { "px-2 py-1": size === "md" },
    { "px-1 py-px": size === "sm" },
    className
  );
  return (
    <button className={rootClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
