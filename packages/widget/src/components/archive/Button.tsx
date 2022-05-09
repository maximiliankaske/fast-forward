import * as React from "react";
import cn from "classnames";

const styles = {
  base: "rounded-md border dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500 px-1 py-px border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700",
  disabled: "pointer-events-none",
};

const Button = ({
  children,
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const rootClassName = cn(
    styles.base,
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
