import React, { FC } from "react";

const Blockquote: FC = ({ children }) => {
  return (
    <div className="border-l-4 border-indigo-500 dark:border-pink-500 rounded px-4 py-2 font-medium text-lg bg-indigo-50 dark:bg-pink-900/40">
      {children}
    </div>
  );
};

export default Blockquote;
