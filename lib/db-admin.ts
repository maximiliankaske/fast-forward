import db from "./firebase-admin";
import type { User } from "./auth";

export async function getAllUsers() {
  try {
    const snapshot = await db.collection("users").get();
    const users: ({ id: string } & User)[] = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...(doc.data() as User) });
    });
    return { users };
  } catch (error) {
    return { error };
  }
}
