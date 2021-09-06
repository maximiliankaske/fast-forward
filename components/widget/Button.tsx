import React, { ButtonHTMLAttributes, FC } from "react";
import { useWidget } from "./WidgetProvider";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  ...props
}) => {
  const { toggle } = useWidget();
  return (
    <button
      onClick={(event) => {
        toggle(true);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
