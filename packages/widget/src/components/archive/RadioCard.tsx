import * as React from "react";
import cn from "classnames";

const styles = {
  base: "dark:text-wWhite text-wBlack py-1 px-2 inline-flex items-center border border-wGray-300 dark:border-wGray-800 hover:border-wGray-400 dark:hover:border-wGray-600 rounded-md cursor-pointer focus:outline-none",
  checked:
    "peer-checked:bg-wGray-900 dark:peer-checked:bg-wGray-800 peer-checked:text-wWhite",
  focus: "peer-focus:ring-wGray-900 peer-focus:ring-2 peer-focus:ring-offset-2",
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
