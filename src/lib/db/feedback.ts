import firebase from "../firebase";
import type { Feedback } from "@/types/index";
import converter from "@/utils/converter";

export function createFeedback(data: Feedback) {
  return firebase
    .firestore()
    .collection("projects")
    .doc(data.projectId)
    .collection("feedbacks")
    .withConverter(converter<Feedback>())
    .doc()
    .set(data);
}

export function deleteFeedback(id: string, projectId: string) {
  return firebase
    .firestore()
    .collection("projects")
    .doc(projectId)
    .collection("feedbacks")
    .doc(id)
    .delete();
}

export function updateFeedback(
  id: string,
  // FIXME: find a better way to make the projectId required
  data: Partial<Feedback> & { projectId: string }
) {
  return firebase
    .firestore()
    .collection("projects")
    .doc(data.projectId)
    .collection("feedbacks")
    .doc(id)
    .update(data);
}
