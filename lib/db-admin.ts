import { db } from "./firebase-admin";
import type { User, Site, WithId } from "../types";

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
