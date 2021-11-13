import IconButton from "@/components/ui/IconButton";
import { deleteTemplate, updateOrganization, updateTemplate } from "@/lib/db";
import { ArrowRightIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  ClockIcon,
  HashtagIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import React from "react";
import useTemplates from "src/hooks/useTemplates";
import { Organization, WithId } from "@/types/index";
import { Template } from "@/types/templates";
import { createSurvey, updateSurvey } from "@/lib/db/survey";
import useOrganization from "@/hooks/useOrganization";

interface Props {
  template: WithId<Template>;
  organization: WithId<Organization>;
}

const Card = ({ template, organization }: Props) => {
  // this will reload the other Components, that use dataTemplates
  const { mutate: mutateTemplates } = useTemplates();
  const { mutate: mutateOrganizations } = useOrganization();

  // TODO: Find a better pattern for that..
  const onSurveyStart = async () => {
    const survey = await createSurvey({
      organizationId: organization.id,
      dueTo: template.dueTo || null,
      notifications: template.notifications || null,
      templateId: template.id,
      startAt: new Date().toUTCString(),
      cancelled: false,
    });
    await updateTemplate({
      organizationId: organization.id,
      id: template.id,
      surveyId: survey.doc?.id || null,
    });
    // FIXME: organizationId inside object
    if (survey.doc?.id) {
      await updateOrganization(organization.id, {
        activeSurveys: [...(organization.activeSurveys || []), survey.doc.id],
      });
    }
    // FIXME: not idealy as the user can do actions before the mutate below has finished request
    mutateTemplates();
    mutateOrganizations();
  };

  const onSurveyStop = async () => {
    await updateSurvey({
      organizationId: organization.id,
      id: template.surveyId!,
      cancelled: true,
    });
    await updateTemplate({
      organizationId: organization.id,
      id: template.id,
      surveyId: null,
    });
    await updateOrganization(organization.id, {
      activeSurveys: organization.activeSurveys?.filter(
        (key) => key !== template.surveyId
      ),
    });
    mutateTemplates();
    mutateOrganizations();
  };

  return (
    <li
      key={template.id}
      className="relative rounded-md border border-gray-100 dark:border-gray-900 px-4 py-3"
    >
      <div className="flex justify-between items-center pb-2">
        <p className="text-lg font-semibold">
          {template.label}
          <span className="ml-2 text-sm font-extrabold">
            #{template.questions.length}
          </span>
        </p>
        <div className="flex space-x-4">
          <IconButton
            destructive
            onClick={async () => {
              await deleteTemplate({
                organizationId: organization.id,
                id: template.id,
              });
              mutateTemplates();
            }}
          >
            <TrashIcon className="h-5 w-5" />
          </IconButton>
          <IconButton
            active={template.notifications}
            onClick={async () => {
              await updateTemplate({
                id: template.id,
                organizationId: organization.id,
                notifications: !template.notifications,
              });
              mutateTemplates();
            }}
          >
            <BellIcon className="h-5 w-5" />
          </IconButton>
          <IconButton
            active={!!template.dueTo}
            onClick={async () => {
              const date = new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000 // in 7 days
              );
              const dueTo = template.dueTo ? null : date.toUTCString();
              await updateTemplate({
                organizationId: organization.id,
                id: template.id,
                dueTo,
              });
              mutateTemplates();
            }}
          >
            <ClockIcon className="h-5 w-5" />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between space-x-4">
        <div className="space-x-4">
          {/* TODO: add some easy stats */}
          <p className="inline-flex items-center">
            <HashtagIcon className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-400" />
            {template.questions.length}
          </p>
          <p className="inline-flex items-center">
            <UserGroupIcon className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
            5/5
          </p>
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
            className={"inline-flex items-center p-1"}
          >
            Start survey
            <ArrowRightIcon className="h-3 w-3 ml-1" />
          </button>
        )}
      </div>
    </li>
  );
};

export default Card;
