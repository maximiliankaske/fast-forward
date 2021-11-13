import { ArrowLeftIcon } from "@heroicons/react/outline";
import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PreviousButton = ({ ...props }: Props) => {
  return (
    <button
      className="rounded-full p-2 hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
      {...props}
    >
      <ArrowLeftIcon className="h-7 w-7" />
    </button>
  );
};

export default PreviousButton;
