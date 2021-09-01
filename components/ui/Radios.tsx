import React, { InputHTMLAttributes, ReactNode } from "react";

interface Props<T> {
  label?: ReactNode;
  name: string;
  options: T;
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
}: Props<T>) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex flex-wrap">
        {Object.keys(options).map((key) => {
          const { label, value, ...props } = options[key];
          return (
            <div key={key} className="mt-1 mr-4">
              <input
                type={"radio"}
                name={name}
                id={key}
                // key works as value very good!
                value={value || key}
                className="text-gray-900 dark:text-gray-500 mr-1"
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
