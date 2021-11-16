import { Survey } from "@/types/templates";
import { FormSession } from "@/types/index";
import { create, update, _delete } from "./utils";

export function createSurvey({
  organizationId,
  ...data
}: Survey & { organizationId: string }) {
  return create({
    ref: `organizations/${organizationId}/surveys`,
    data,
  });
}

export function updateSurvey({
  organizationId,
  id,
  ...data
}: Partial<Survey> & { organizationId: string; id: string }) {
  return update({
    ref: `organizations/${organizationId}/surveys`,
    id,
    data,
  });
}

export function deleteSurvey({
  organizationId,
  id,
}: {
  organizationId: string;
  id: string;
}) {
  return _delete({
    ref: `organizations/${organizationId}/surveys`,
    id,
  });
}

export function createSurveyMemberSession({
  organizationId,
  surveyId,
  userId,
  ...data
}: FormSession & { organizationId: string; surveyId: string; userId: string }) {
  return create({
    ref: `organizations/${organizationId}/surveys/${surveyId}/members`,
    id: userId,
    data,
  });
}

export function updateSurveyMemberSession({
  organizationId,
  surveyId,
  userId,
  ...data
}: Partial<FormSession> & {
  organizationId: string;
  surveyId: string;
  userId: string;
}) {
  return update({
    ref: `organizations/${organizationId}/surveys/${surveyId}/members`,
    id: userId,
    data,
  });
}
