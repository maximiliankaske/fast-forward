import React, { ButtonHTMLAttributes, FC, ReactChild } from "react";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean | null;
  destructive?: boolean;
}

const IconButton: FC<Props> = ({
  children,
  className,
  active,
  destructive = false,
  ...props
}) => {
  const rootClassName = cn(
    "flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    {
      "text-gray-900 dark:text-gray-100": !active && !destructive,
      "text-indigo-500 dark:text-pink-500": active && !destructive,
      "text-red-500": destructive,
    },
    className
  );
  return (
    <button className={rootClassName} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
