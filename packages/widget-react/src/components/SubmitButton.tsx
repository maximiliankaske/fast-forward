import * as React from "react";
import cn from "classnames";

const styles = {
  base: "w-full sm:text-lg text-theme-base bg-theme-button hover:bg-theme-button-hover rounded-md px-1 py-px",
  focus: "focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary",
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
    styles.focus,
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
