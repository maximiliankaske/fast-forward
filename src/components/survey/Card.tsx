import IconButton from "@/components/ui/IconButton";
import { deleteTemplate, updateOrganization, updateTemplate } from "@/lib/db";
import { ArrowRightIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  ClockIcon,
  HashtagIcon,
  PlayIcon,
  StopIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import React from "react";
import useTemplates from "src/hooks/useTemplates";
import { Organization, WithId } from "@/types/index";
import { Template } from "@/types/templates";
import { createSurvey, updateSurvey } from "@/lib/db/survey";
import useOrganization from "@/hooks/useOrganization";
import useTemplate from "@/hooks/useTemplate";
import { useRouter } from "next/router";
import { data } from "remark";
import Badge from "../ui/Badge";
import Heading from "../ui/Heading";

interface Props {
  template: WithId<Template>;
  organization: WithId<Organization>;
}

const Card = ({ template, organization }: Props) => {
  // this will reload the other Components, that use dataTemplates
  const router = useRouter();
  const { mutate: mutateTemplates } = useTemplates();
  const { mutate: mutateTemplate } = useTemplate(template.id);
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
    // mutateTemplates();
    mutateTemplate();
    mutateOrganizations();
  };

  // TODO: FIXME:
  // DISCUSSION: How to show archived surveys?
  // Once a survey is finished `archived: true`, it should move to an archived page
  //
  // Only stop the survey, do not move it immediatly to trash.
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
    // mutateTemplates();
    mutateTemplate();
    mutateOrganizations();
  };

  return (
    <div className="relative rounded-md border border-gray-200 dark:border-gray-800 px-4 py-3">
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center space-x-2">
          <Heading as="h4">{template.label}</Heading>
          {template.surveyId && <Badge color="quantery">active</Badge>}
        </div>
        <div className="flex space-x-4">
          <IconButton
            destructive
            onClick={async () => {
              await deleteTemplate({
                organizationId: organization.id,
                id: template.id,
              });
              mutateTemplates();
              // mutateTemplate();
              router.push("/app/templates");
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
              // mutateTemplates();
              mutateTemplate();
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
              // mutateTemplates();
              mutateTemplate();
            }}
          >
            <ClockIcon className="h-5 w-5" />
          </IconButton>
          {!template.surveyId ? (
            <IconButton onClick={onSurveyStart}>
              <PlayIcon className="h-5 w-5 text-green-500" />
            </IconButton>
          ) : (
            <IconButton onClick={onSurveyStop}>
              <StopIcon className="h-5 w-5 text-red-500" />
            </IconButton>
          )}
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
      </div>
    </div>
  );
};

export default Card;
