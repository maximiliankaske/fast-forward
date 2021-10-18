import firebase from "./firebase";
import type { User, Site, Project, Feedback } from "@/types/index";
import converter from "@/utils/converter";

export function updateUser(uid: string, data: Omit<User, "token">) {
  return firebase.firestore().collection("users").doc(uid).update(data);
}

export function createUser(uid: string, data: Omit<User, "token">) {
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set(data, { merge: true });
}

export function createProject(data: Project) {
  return firebase
    .firestore()
    .collection("projects")
    .withConverter(converter<Project>())
    .doc()
    .set(data);
}

export function deleteProject(id: string) {
  return firebase.firestore().collection("projects").doc(id).delete();
}

export function resetProject(id: string) {
  const ref = firebase
    .firestore()
    .collection("projects")
    .doc(id)
    .collection("feedbacks");
  return ref.onSnapshot((snapshot) => {
    snapshot.docs.forEach((doc) => {
      ref.doc(doc.id).delete();
    });
  });
}

export function updateProject(id: string, data: Partial<Project>) {
  return firebase.firestore().collection("projects").doc(id).update(data);
}

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

export function addNewsletterSubscription(email: string) {
  return firebase.firestore().collection("subscriptions").doc(email).set({
    email,
    createdAt: firebase.firestore.Timestamp.now(),
  });
}
