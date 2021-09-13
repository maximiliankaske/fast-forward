import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  reverse?: true;
}

const Button: FC<Props> = ({
  children,
  reverse = false,
  className,
  disabled,
  ...props
}) => {
  const rootClassName = cn(
    "shadow-sm rounded-md border px-2 py-1",
    { "bg-white text-gray-900": !reverse },
    { "hover:bg-gray-50": !reverse && !disabled },
    {
      "bg-gray-800 text-white": reverse,
    },
    { "hover:bg-gray-900": reverse && !disabled },
    { "bg-opacity-50 cursor-default": disabled },
    className
  );
  return (
    <button className={rootClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
