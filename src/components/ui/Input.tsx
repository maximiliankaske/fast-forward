import React, { InputHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

const styles = {
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300",
  input:
    "shadow-sm focus:ring-indigo-500 focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-black focus:ring-2 focus:border-gray-300 dark:focus:border-gray-700 block w-full sm:text-sm border-gray-200 dark:border-gray-800 rounded-md text-gray-900",
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  name: string;
  srOnly?: boolean; // TODO: Make it better!
}

const Input = ({
  label,
  name,
  srOnly = false,
  className,
  type = "text",
  ...props
}: Props) => {
  return (
    <div>
      <label htmlFor={name} className={cn(styles.label, { "sr-only": srOnly })}>
        {label}
      </label>
      <div className={!srOnly ? "mt-1" : ""}>
        <input
          type={type}
          id={name}
          name={name}
          className={cn(styles.input, className)}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
