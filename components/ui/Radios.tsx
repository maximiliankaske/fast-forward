import React, { InputHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface Props<T> {
  label: ReactNode;
  name: string;
  options: T;
  srOnly?: boolean;
}

const Radios = <
  T extends Record<
    string,
    InputHTMLAttributes<HTMLInputElement> & { label: string }
  >
>({
  label,
  options,
  name,
  srOnly = false,
}: Props<T>) => {
  return (
    <div>
      <label
        className={cn(
          "block text-sm font-medium text-gray-700 dark:text-gray-300",
          { "sr-only": srOnly }
        )}
      >
        {label}
      </label>
      <div className="flex flex-wrap">
        {Object.keys(options).map((key) => {
          const { label, value, className, ...props } = options[key];
          return (
            <div key={key} className="mt-1 mr-3">
              <input
                type={"radio"}
                name={name}
                id={key}
                // key works as value very good!
                value={value || key}
                className={cn(
                  "text-gray-900 dark:text-gray-500 mr-2",
                  className
                )}
                {...props}
              />
              <label htmlFor={key} className="text-gray-700 dark:text-gray-300">
                {label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Radios;
