import firebase from "../firebase";
import converter from "@/utils/converter";
import { Survey } from "@/types/templates";
import { FormSession } from "@/types/index";

export function createSurvey({
  organizationId,
  ...data
}: Survey & { organizationId: string }) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("surveys")
    .withConverter(converter<Survey>())
    .add(data);
}

export function updateSurvey({
  organizationId,
  id,
  ...data
}: Partial<Survey> & { organizationId: string; id: string }) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("surveys")
    .doc(id)
    .update(data);
}

export function deleteSurvey({
  organizationId,
  id,
}: {
  organizationId: string;
  id: string;
}) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("surveys")
    .doc(id)
    .delete();
}

export function createSurveyMemberSession({
  organizationId,
  surveyId,
  userId,
  ...data
}: FormSession & { organizationId: string; surveyId: string; userId: string }) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("surveys")
    .doc(surveyId)
    .collection("members")
    .withConverter(converter<FormSession>())
    .doc(userId)
    .set(data);
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
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("surveys")
    .doc(surveyId)
    .collection("members")
    .withConverter(converter<FormSession>())
    .doc(userId)
    .update(data);
}
