import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  reverse?: true;
}

const Button: FC<Props> = ({
  children,
  reverse = false,
  className,
  ...props
}) => {
  const rootClassName = cn(
    "shadow-sm rounded-md border px-2 py-1",
    { "text-gray-900 hover:bg-gray-50": !reverse },
    { "bg-gray-800 text-white hover:bg-gray-900": reverse },
    className
  );
  return (
    <button className={rootClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
