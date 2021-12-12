import React from "react";
import Heading from "../ui/Heading";
import cn from "classnames";
import { DuplicateIcon } from "@heroicons/react/solid";
import toasts from "@/utils/toast";
import { Question, Template } from "@prisma/client";
import { creator } from "@/utils/fetcher";
import { useSession } from "next-auth/react";

type Props = Omit<Template, "id" | "organizationId"> & {
  questions: Omit<Question, "id" | "templateId">[];
};

const Thumbnail = ({ questions, title, description }: Props) => {
  const { data: session } = useSession();

  const onDuplicate = async () => {
    if (session?.user.organizationId) {
      toasts.promise(
        creator(`/api/template`, {
          description,
          title,
          organizationId: session.user.organizationId,
          questions,
        })
      );
    } else {
      // toasts.error
    }
  };

  return (
    <div className={cn("border rounded-md p-4 w-full text-left")}>
      <div className="flex justify-between">
        <Heading as="h4">{title}</Heading>
        <div className="flex space-x-1">
          <button className="p-2 -mt-2 rounded-full" onClick={onDuplicate}>
            <DuplicateIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <ul>
        {questions.map((question) => (
          <li key={question.title} className="flex max-w-xl">
            <div>
              <p className="font-medium">{question.title}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {question.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Thumbnail;
