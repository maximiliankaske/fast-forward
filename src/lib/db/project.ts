import firebase from "../firebase";
import type { Project } from "@/types/index";
import converter from "@/utils/converter";

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
