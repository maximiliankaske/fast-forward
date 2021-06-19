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
  const site = firebase
    .firestore()
    .collection("sites")
    .withConverter(converter<Site>())
    .doc();
  site.set(data);
  return site;
}
