import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (typeof window !== "undefined") {
  firebase.initializeApp(firebaseConfig);
  if ("measurementId" in firebaseConfig) {
    // firebase.analytics();
    // firebase.performance();
  }
}

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  firebase.firestore().useEmulator("localhost", 8080);
  firebase.functions().useEmulator("localhost", 5001);
  firebase.auth().useEmulator("http://localhost:9099");
  firebase.storage().useEmulator("localhost", 9199);
}

export default firebase;
