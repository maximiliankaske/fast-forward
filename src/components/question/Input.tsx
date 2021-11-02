import React from "react";

const Input = () => {
  return (
    <div>
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <div className="border-b-[6px] border-gray-300 focus-within:border-indigo-600 rounded">
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full border-0 border-transparent focus:ring-0 text-lg px-0"
          placeholder="A new tool called Notion"
        />
      </div>
    </div>
  );
};

export default Input;
