import React, { InputHTMLAttributes } from "react";

// TODO: Make it dynamic

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <div className="border border-gray-200 dark:border-gray-800 focus-within:border-indigo-500 dark:focus-within:border-pink-500 rounded-md">
        <input
          type="text"
          name="name"
          className="block w-full border-0 border-transparent focus:ring-0 text-lg bg-transparent"
          placeholder="A good memory..."
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
