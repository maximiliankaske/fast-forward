import { db } from "./firebase-admin";
import type { User, Site, WithId, Project, Feedback } from "../types";

export async function getAllUsers() {
  try {
    const snapshot = await db.collection("users").get();
    const users: WithId<User>[] = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...(doc.data() as User) });
    });
    return { users };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(uid: string) {
  const snapshot = await db
    .collection("sites")
    .where("authorId", "==", uid)
    .get();

  const sites: WithId<Site>[] = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...(doc.data() as Site) });
  });

  return { sites };
}

export async function getUserProjects(uid: string) {
  const snapshot = await db
    .collection("projects")
    .where("authorId", "==", uid)
    .get();

  const projects: WithId<Project>[] = [];

  snapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...(doc.data() as Project) });
  });

  return { projects };
}

export async function getProject(uid: string) {
  const project = await db.collection("projects").doc(uid).get();
  return {
    project: { id: project.id, ...(project.data() as Project) },
  };
}

export async function getProjectFeedback(id: string) {
  const snapshot = await db
    .collection("projects")
    .doc(id)
    .collection("feedbacks")
    .get();

  const feedbacks: WithId<Feedback>[] = [];

  snapshot.forEach((doc) => {
    feedbacks.push({ id: doc.id, ...(doc.data() as Feedback) });
  });

  return { feedbacks };
}
