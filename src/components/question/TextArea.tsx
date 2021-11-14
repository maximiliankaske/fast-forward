import React, { TextareaHTMLAttributes } from "react";

const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div>
      <label htmlFor="text" className="sr-only">
        Name
      </label>
      <div className="border border-gray-200 dark:border-gray-800 rounded-md focus-within:border-indigo-500 dark:focus-within:border-pink-500">
        <textarea
          name="text"
          rows={4}
          className="block w-full border-0 border-transparent focus:ring-0 text-lg bg-transparent"
          placeholder="Notion is a tool that inspires me..."
          {...props}
        />
      </div>
    </div>
  );
};

export default TextArea;
