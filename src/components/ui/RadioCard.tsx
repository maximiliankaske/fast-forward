import * as React from "react";
import cn from "classnames";

const styles = {
  base: "inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 rounded-md cursor-pointer focus:outline-none",
  checked:
    "peer-checked:bg-gray-900 dark:peer-checked:bg-white dark:peer-checked:text-gray-900 peer-checked:text-white",
  focus: "peer-focus:ring-gray-900 peer-focus:ring-2 peer-focus:ring-offset-2",
};

export interface RadioCardProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  id: string; // needs to be required!
}

const RadioCard = ({
  children,
  className,
  id,
  containerClassName,
  type = "radio",
  ...props
}: RadioCardProps) => {
  return (
    <div className={containerClassName}>
      <input className={"sr-only peer"} {...{ type, id, ...props }} />
      <label
        htmlFor={id}
        className={cn(styles.base, styles.checked, styles.focus, className)}
      >
        {children}
      </label>
    </div>
  );
};

export default RadioCard;
