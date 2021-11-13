// TODO: discuss `authorId => userId` change
import firebase from "firebase/app";
import { Describe } from "superstruct";
import { FeedbackType } from "./superstruct";

export type OrganizationRole = "owner" | "admin" | "member";

export type User = {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string | undefined;
  photoUrl: string | null;
  token: string;
  customClaims?: {
    role: OrganizationRole;
    organizationId: string;
  } | null;
  // organizations: { name: string; role: OrganizationRole }[]
};

export type Site = {
  authorId: string;
  url: string;
};

export type Invite = {
  email: string;
  token: string;
  expired: false;
  dueTo: firebase.firestore.Timestamp;
  site: string; // organization name
};

export type Organization = {
  name: string;
  email?: string;
  authorId: string;
  // FIXME:d
  activeTemplates: string[] | null;
  activeSurveys: string[] | null;
  /**
   * members as collection
   * collection("organization").doc("userId").set({ joined: Date, role: OrganizationRole, ... })
   */
};

export type FormSession = {
  answers: Record<string, string | number>;
};

export type OrganizationMember = {
  email: string;
  role: OrganizationRole;
};

export type OrganizationInvite = OrganizationMember & {
  // dueTo: firebase.firestore.Timestamp;
};

export type Post = {
  title: string;
  section: string;
  excerpt: string;
  date: string;
  slug: string;
  coverImage: string;
  // FIXME: author as object and corresponding generics in ../lib/api (Record<T, string>)
  content: string;
};

export type Project = {
  authorId: string;
  private: boolean;
  name: string;
};

export type Feedback = {
  text: string;
  createdAt: firebase.firestore.Timestamp;
  projectId: string;
  userId?: string;
  userAgent?: string;
  location?: string;
  type: FeedbackType;
  archived?: boolean;
  screenshotURL?: string;
  metadata?: Record<string, string | number>;
};

export type FeedbackType = "all" | "issue" | "idea" | "other" | "archive";

// Check if superstruct object equals type
const type: Describe<FeedbackType> = FeedbackType;

export type WithId<T> = T & { id: string };
