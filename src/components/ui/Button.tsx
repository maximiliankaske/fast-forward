import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

const styles = {
  base: "rounded-md border dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500",
  variant: {
    none: "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800",
    default: "border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800",
    primary: "bg-gray-900 hover:bg-gray-800 text-white",
    danger: "text-white bg-red-500 hover:bg-red-600",
    danger2: "border-transparent dark:hover:border-red-500 text-red-500",
  },
  size: {
    sm: "px-1 py-px",
    md: "px-2 py-1",
    lg: "px-3 py-2 md:py-[6px]",
  },
  disabled: "pointer-events-none",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styles.variant;
  size?: keyof typeof styles.size;
}

const Button: FC<Props> = ({
  children,
  variant = "default",
  size = "md",
  className,
  disabled,
  ...props
}) => {
  const rootClassName = cn(
    styles.base,
    styles.variant[variant],
    styles.size[size],
    { [styles.disabled]: disabled },
    className
  );
  return (
    <button className={rootClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
