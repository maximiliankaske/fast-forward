import firebase from "../firebase";
import converter from "@/utils/converter";
import { Template } from "@/types/templates";

export function createTemplate({
  organizationId,
  ...data
}: Template & { organizationId: string }) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("templates")
    .withConverter(converter<Template>())
    .add(data);
}

export function updateTemplate({
  organizationId,
  id,
  ...data
}: Template & { organizationId: string; id: string }) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("templates")
    .doc(id)
    .update(data);
}
