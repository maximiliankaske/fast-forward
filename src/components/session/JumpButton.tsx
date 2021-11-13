import { ArrowRightIcon } from "@heroicons/react/outline";
import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const JumpButton = ({ ...props }: Props) => {
  return (
    <button
      className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 inline-flex items-center"
      {...props}
    >
      Go to last
      <ArrowRightIcon className="h-4 w-4 ml-1" />
    </button>
  );
};

export default JumpButton;
