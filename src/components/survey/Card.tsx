import IconButton from "@/components/ui/IconButton";
import { deleteTemplate, updateTemplate } from "@/lib/db";
import { ArrowRightIcon, XIcon } from "@heroicons/react/solid";
import { BellIcon, ClockIcon } from "@heroicons/react/outline";
import React from "react";
import useTemplates from "src/hooks/useTemplates";
import { WithId } from "@/types/index";
import { Template } from "@/types/templates";
import { createSurvey, updateSurvey } from "@/lib/db/survey";

interface Props {
  template: WithId<Template>;
  organizationId: string;
}

const Card = ({ template, organizationId }: Props) => {
  // this will reload the other Components, that use dataTemplates
  const { mutate: mutateTemplates } = useTemplates();

  // TODO: Find a better pattern for that..
  const onSurveyStart = async () => {
    const survey = await createSurvey({
      organizationId,
      dueTo: template.dueTo || null,
      notifications: template.notifications || null,
      templateId: template.id,
      startAt: new Date().toUTCString(),
      cancelled: false,
    });
    await updateTemplate({
      organizationId,
      id: template.id,
      surveyId: survey.doc?.id || null,
    });
    mutateTemplates();
  };

  const onSurveyStop = async () => {
    await updateSurvey({
      organizationId,
      id: template.surveyId!,
      cancelled: true,
    });
    await updateTemplate({
      organizationId,
      id: template.id,
      surveyId: null,
    });
    mutateTemplates();
  };

  return (
    <li
      key={template.id}
      className="relative rounded-md border border-gray-100 dark:border-gray-900"
    >
      {!template.surveyId ? (
        <div className="absolute -right-2 -top-2">
          <button
            className="bg-red-500 p-1 rounded-full"
            onClick={async () => {
              await deleteTemplate({ organizationId, id: template.id });
              mutateTemplates();
            }}
          >
            <XIcon className="h-3 w-3 text-white dark:text-black" />
          </button>
        </div>
      ) : null}
      <div className="flex items-center justify-between px-3 py-3">
        <p className="text-lg font-semibold">
          {template.label}
          <span className="ml-2 text-sm font-extrabold">
            #{template.questions.length}
          </span>
        </p>
      </div>
      <div className="px-3 py-4 bg-gray-100 dark:bg-gray-900 w-full">
        <div className="flex flex-row items-center justify-between space-x-4">
          <div className="flex-1 flex space-x-4">
            <IconButton
              className="h-[30px] w-[30px]"
              active={template.notifications}
              onClick={async () => {
                await updateTemplate({
                  id: template.id,
                  organizationId,
                  notifications: !template.notifications,
                });
                mutateTemplates();
              }}
            >
              <BellIcon className="h-6 w-6" />
            </IconButton>
            <IconButton
              active={!!template.dueTo}
              className="h-[30px] w-[30px]"
              onClick={async () => {
                const date = new Date(
                  Date.now() + 7 * 24 * 60 * 60 * 1000 // in 7 days
                );
                const dueTo = template.dueTo ? null : date.toUTCString();
                await updateTemplate({
                  organizationId,
                  id: template.id,
                  dueTo,
                });
                mutateTemplates();
              }}
            >
              <ClockIcon className="h-6 w-6" />
            </IconButton>
          </div>
          {template.surveyId ? (
            <button
              onClick={onSurveyStop}
              className="text-red-500 dark:text-red-500 p-1"
            >
              Stop survey
            </button>
          ) : (
            <button
              onClick={onSurveyStart}
              className={"inline-flex items-center text-sm p-1"}
            >
              Start survey
              <ArrowRightIcon className="h-3 w-3 ml-1" />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default Card;
