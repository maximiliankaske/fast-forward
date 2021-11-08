import { Template as TemplateType } from "@/types/templates";
import React, { ButtonHTMLAttributes } from "react";
import Heading from "../ui/Heading";
import cn from "classnames";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Badge from "../ui/Badge";

interface Props extends TemplateType, ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const Template = ({ questions, label, active, ...props }: Props) => {
  return (
    <button
      className={cn(
        "border rounded-md p-4 w-full text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-black dark:focus:ring-pink-500",
        active && "border-indigo-500 dark:border-pink-500"
      )}
      {...props}
    >
      <div className="flex justify-between">
        <Heading as="h4">{label}</Heading>
        {active && (
          <CheckCircleIcon className="h-6 w-6 text-indigo-500 dark:text-pink-500" />
        )}
      </div>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.title}</p>
          </li>
        ))}
      </ul>
    </button>
  );
};

export default Template;
