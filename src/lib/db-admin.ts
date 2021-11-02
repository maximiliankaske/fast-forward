import { db } from "./firebase-admin";
import * as admin from "firebase-admin";
import type {
  User,
  Site,
  WithId,
  Project,
  Feedback,
  Organization,
  OrganizationMember,
  Invite,
  OrganizationInvite,
} from "@/types/index";

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
  if (project.exists) {
    return {
      project: { id: project.id, ...(project.data() as Project) },
    };
  } else {
    throw new Error("No project found");
  }
}

// Widget API - create feedback
export async function createFeedback(data: Omit<Feedback, "createdAt">) {
  const feedback = await db
    .collection("projects")
    .doc(data.projectId)
    .collection("feedbacks")
    .add({ ...data, createdAt: admin.firestore.Timestamp.now() });
  return { feedback: { id: feedback.id } };
}

export async function getOrganization(id: string) {
  const organization = await db.collection("organizations").doc(id).get();
  if (organization.exists) {
    return {
      organization: {
        id: organization.id,
        ...(organization.data() as Organization),
      },
    };
  }
}

export async function getOrganizations() {
  const snapshot = await db.collection("organizations").get();
  const organizations: WithId<Organization>[] = [];
  snapshot.forEach((doc) => {
    organizations.push({ id: doc.id, ...(doc.data() as Organization) });
  });

  return { organizations };
}

export async function getOrganizationMember(
  organizationId: string,
  id: string
) {
  const member = await db
    .collection("organizations")
    .doc(organizationId)
    .collection("members")
    .doc(id)
    .get();
  if (member.exists) {
    return {
      member: {
        id: member.id,
        ...(member.data() as OrganizationMember),
      },
    };
  }
}

export async function getOrganizationMembers(id: string) {
  const snapshot = await db
    .collection("organizations")
    .doc(id)
    .collection("members")
    .get();

  const members: WithId<OrganizationMember>[] = [];

  snapshot.forEach((doc) => {
    members.push({ id: doc.id, ...(doc.data() as OrganizationMember) });
  });

  return { members };
}

export async function getOrganizationInvites(id: string) {
  const snapshot = await db
    .collection("organizations")
    .doc(id)
    .collection("invites")
    .get();

  const invites: WithId<OrganizationInvite>[] = [];

  snapshot.forEach((doc) => {
    invites.push({ id: doc.id, ...(doc.data() as OrganizationInvite) });
  });

  return { invites };
}

export async function getOrganizationInvite(
  organizationId: string,
  id: string
) {
  const invite = await db
    .collection("organizations")
    .doc(organizationId)
    .collection("invites")
    .doc(id)
    .get();
  if (invite.exists) {
    return {
      invite: {
        id: invite.id,
        ...(invite.data() as OrganizationInvite),
      },
    };
  }
}

export async function getInvite(id: string) {
  const invite = await db.collection("invites").doc(id).get();
  if (invite.exists) {
    return {
      invite: {
        id: invite.id,
        ...(invite.data() as Invite),
      },
    };
  }
}

export async function getProjectFeedback(id: string) {
  const snapshot = await db
    .collection("projects")
    .doc(id)
    .collection("feedbacks")
    .orderBy("createdAt", "desc")
    .get();

  const feedbacks: WithId<Feedback>[] = [];

  snapshot.forEach((doc) => {
    feedbacks.push({ id: doc.id, ...(doc.data() as Feedback) });
  });

  return { feedbacks };
}
