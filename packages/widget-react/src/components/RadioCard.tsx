import * as React from "react";
import cn from "classnames";

const styles = {
  base: "sm:text-lg text-theme-base py-1 px-2 inline-flex items-center rounded-md cursor-pointer focus:outline-none",
  checked: "peer-checked:bg-theme-inverted peer-checked:text-theme-inverted",
  hover: "peer-hover:bg-theme-button-hover",
  focus: "peer-focus:ring-2 peer-focus:ring-offset-2", // initial ring color
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
    <div className={cn("flex-shrink-0", containerClassName)}>
      <input className={"sr-only peer"} {...{ type, id, ...props }} />
      <label
        htmlFor={id}
        className={cn(
          styles.base,
          styles.checked,
          styles.hover,
          styles.focus,
          className
        )}
      >
        {children}
      </label>
    </div>
  );
};

export default RadioCard;
