import { ArrowRightIcon } from "@heroicons/react/outline";
import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PreviousButton = ({ ...props }: Props) => {
  return (
    <button
      type="submit"
      className="rounded-full p-2 hover:bg-indigo-100 dark:hover:bg-pink-900/25"
    >
      <ArrowRightIcon className="h-7 w-7" />
    </button>
  );
};

export default PreviousButton;
