import firebase from "../firebase";
import type { User } from "@/types/index";

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
