import React, { InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  name: string;
}

const Input = ({ label, name, type = "text", ...props }: Props) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          id={name}
          name={name}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
