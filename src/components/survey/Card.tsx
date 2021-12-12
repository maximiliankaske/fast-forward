import IconButton from "@/components/ui/IconButton";
import {
  HashtagIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import React from "react";
import Heading from "../ui/Heading";
import { Question, Template } from "@prisma/client";
import { deletor } from "@/utils/fetcher";
import { useRouter } from "next/router";
import toasts from "@/utils/toast";

interface Props {
  template: Template & { questions: Question[] };
}

const Card = ({ template }: Props) => {
  const router = useRouter();
  return (
    <div className="relative px-4 py-3 border border-gray-200 rounded-md dark:border-gray-800">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <Heading as="h4">{template.title}</Heading>
          {/* {template.surveyId && <Badge color="quantery">active</Badge>} */}
        </div>
        <div className="flex space-x-4">
          <IconButton
            destructive
            onClick={async () => {
              const res = confirm("Delete?");
              if (res) {
                await toasts.promise(deletor(`/api/template/${template.id}`));
                await router.push(`/app/templates`);
              }
            }}
          >
            <TrashIcon className="w-5 h-5" />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between space-x-4">
        <div className="space-x-4">
          <p className="inline-flex items-center">
            <HashtagIcon className="w-4 h-4 mr-1 text-gray-600 dark:text-gray-400" />
            {template.questions.length}
          </p>
          <p className="inline-flex items-center">
            <UserGroupIcon className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
            5/5
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
