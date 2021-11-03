import firebase from "../firebase";
import converter from "@/utils/converter";
import { FormSession } from "@/types/index";

// TODO: create Type
// FIXME: missing user in session

// IDEA save each question into seperate key because it is easier to overwrite it
// instead of an array as we have to filter through it otherwise

export function createSession({
  organizationId,
  ...data
}: FormSession & { organizationId: string; id?: string }) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("sessions")
    .withConverter(converter<FormSession>())
    .add(data);
}

export function updateSession({
  organizationId,
  id,
  ...data
}: FormSession & { organizationId: string; id: string }) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("sessions")
    .doc(id)
    .update(data);
}
