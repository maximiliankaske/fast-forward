import firebase from "../firebase";
import converter from "@/utils/converter";
import { Survey } from "@/types/templates";

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
