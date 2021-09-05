import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";

// Connecting your domain to Cloud Storage
// https://cloud.google.com/storage/docs/hosting-static-website-http#cname

export function uploadDataURL(v: string) {
  return firebase
    .storage()
    .ref(`/screenshots/${uuidv4()}`)
    .putString(v, "data_url");
}

// TODO: replace onComplete (downloadURL: string) => void to (ref: firebase.storage.Reference) => void

export function handleUploadState(
  uploadRef: firebase.storage.UploadTask,
  {
    onError,
    onComplete,
    onSnapshot,
  }: {
    onError?: (error: firebase.storage.FirebaseStorageError) => void;
    onComplete?: (ref: firebase.storage.Reference) => void;
    onSnapshot?: (snapshot: firebase.storage.UploadTaskSnapshot) => void;
  } = {}
) {
  uploadRef.on(
    "state_changed",
    (snapshot) => onSnapshot?.(snapshot),
    (error) => onError?.(error),
    () => onComplete?.(uploadRef.snapshot.ref)
  );
}
