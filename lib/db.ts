import firebase from "./firebase";
import type { User } from "./auth";

export function updateUser(uid: string, data: User) {
  return firebase.firestore().collection("users").doc(uid).update(data);
}

export function createUser(uid: string, data: User) {
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set(data, { merge: true });
}
