import firebase from "../firebase";
import type { Project } from "@/types/index";
import { create, update, _delete } from "./utils";

export function createProject(data: Project) {
  return create({
    ref: `projects`,
    data,
  });
}

export function deleteProject(id: string) {
  return _delete({ ref: `projects`, id });
}

// TODO: HANDLE MORE
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
  return update({ ref: `projects`, id, data });
}
