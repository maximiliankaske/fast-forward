import firebase from "./firebase";
import type { User, Site } from "../types";
import converter from "../utils/converter";

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

export function createSite(data: Site) {
  return firebase
    .firestore()
    .collection("sites")
    .withConverter(converter<Site>())
    .doc()
    .set(data);
}

export function deleteSite(id: string) {
  return firebase.firestore().collection("sites").doc(id).delete();
}

export function updateSite(id: string, data: Partial<Site>) {
  return firebase.firestore().collection("sites").doc(id).update(data);
}
