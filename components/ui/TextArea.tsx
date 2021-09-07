import React, { ReactNode, TextareaHTMLAttributes } from "react";
import cn from "classnames";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: ReactNode;
  name: string;
  srOnly?: boolean;
}

const TextArea = ({
  label,
  name,
  className,
  srOnly = false,
  ...props
}: Props) => {
  console.log(srOnly);
  return (
    <div>
      <label
        htmlFor={name}
        className={cn(
          "block text-sm font-medium text-gray-700 dark:text-gray-300",
          { "sr-only": srOnly }
        )}
      >
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={name}
          name={name}
          className={cn(
            "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextArea;
