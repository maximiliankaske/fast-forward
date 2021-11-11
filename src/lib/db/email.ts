import firebase from "../firebase";

export function addNewsletterSubscription(email: string) {
  return firebase.firestore().collection("subscriptions").doc(email).set({
    email,
    createdAt: firebase.firestore.Timestamp.now(),
  });
}
