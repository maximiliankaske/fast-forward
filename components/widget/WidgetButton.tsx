import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const WidgetButton: FC<Props> = ({
  active,
  disabled,
  className,
  children,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-gray-300 px-2 py-1 text-sm",
        active ? "bg-gray-900 text-white shadow" : "text-gray-900",
        disabled && "bg-opacity-50 cursor-default",
        className
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default WidgetButton;
