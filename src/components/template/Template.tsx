import { Template as TemplateType } from "@/types/templates";
import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import Heading from "../ui/Heading";
import cn from "classnames";
import { CheckCircleIcon, DuplicateIcon } from "@heroicons/react/solid";
import { useAuth } from "@/lib/auth";
import { createTemplate } from "@/lib/db/template";
import toasts from "@/utils/toast";

interface Props extends TemplateType, ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const Template = ({ questions, label, active, onClick, ...props }: Props) => {
  const auth = useAuth();

  const onDuplicate = async (event: MouseEvent) => {
    if (auth.user?.customClaims?.organizationId) {
      toasts.promise(
        createTemplate({
          questions,
          label,
          organizationId: auth.user?.customClaims?.organizationId,
        })
      );
    }
  };

  return (
    <button
      className={cn(
        "border rounded-md p-4 w-full text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-black dark:focus:ring-pink-500",
        active && "border-indigo-500 dark:border-pink-500"
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex justify-between">
        <Heading as="h4">{label}</Heading>
        <div className="flex space-x-1">
          {active && (
            <CheckCircleIcon className="h-6 w-6 text-indigo-500 dark:text-pink-500" />
          )}
          <button className="rounded-full" onClick={onDuplicate}>
            <DuplicateIcon className="h-6 w-6" />
          </button>
        </div>
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
