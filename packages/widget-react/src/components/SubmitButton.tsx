import * as React from "react";
import cn from "classnames";

const styles = {
  base: "w-full sm:text-lg text-wBlack dark:text-wWhite rounded-md border dark:border-wGray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wGray-900 px-1 py-px border-wGray-200 hover:border-wGray-300 dark:border-wGray-800 dark:hover:border-wGray-700",
  disabled: "pointer-events-none",
};

const SubmitButton = ({
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
    <button
      type="submit"
      className={rootClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
