// TODO: discuss `authorId => userId` change
import firebase from "firebase/app";

export type User = {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string | undefined;
  photoUrl: string | null;
  token: string;
};

export type Site = {
  authorId: string;
  url: string;
};

export type Post = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  coverImage: string;
  // FIXME: author as object and corresponding generics in ../lib/api (Record<T, string>)
  authorName: string;
  authorPicture: string;
  content: string;
  ogImageUrl: string;
};

export type Project = {
  authorId: string;
  name: string;
};

export type Feedback = {
  text: string;
  createdAt: firebase.firestore.Timestamp;
  projectId: string;
  userId?: string;
  userAgent: string;
  location: string;
  type: FeedbackType;
  archived?: boolean;
  screenshotURL?: string;
};

export enum FeedbackType {
  All = "all",
  Issue = "issue",
  Idea = "idea",
  Other = "other",
  Archive = "archive",
}

export type WithId<T> = T & { id: string };
