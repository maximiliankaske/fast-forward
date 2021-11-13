import { db } from "../firebase-admin";
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
  FormSession,
} from "@/types/index";
import { Survey, Template } from "@/types/templates";
import { get } from "./utils";

// TODO: create wrapper functions for get<T>()

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

export async function getProject(id: string) {
  // const project = get<Project>({ ref: "projects", id });
  // return { projects };
  const project = await db.collection("projects").doc(id).get();
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

// TODO: NOT SURE WHAT THE BEST IS.
export async function getSession(organizationId: string, id: string) {
  const session = await db
    .collection("organizations")
    .doc(organizationId)
    .collection("sessions")
    .doc(id)
    .get();
  if (session.exists) {
    return {
      session: {
        id: session.id,
        ...(session.data() as FormSession),
      },
    };
  }
}

export async function getSurveys(organizationId: string) {
  const snapshot = await db
    .collection("organizations")
    .doc(organizationId)
    .collection("surveys")
    .get();

  const surveys: WithId<Survey>[] = [];

  snapshot.forEach((doc) => {
    surveys.push({ id: doc.id, ...(doc.data() as Survey) });
  });

  return { surveys };
}

export async function getSurveyMemberSession(
  organizationId: string,
  surveyId: string,
  userId: string
) {
  const member = await db
    .collection("organizations")
    .doc(organizationId)
    .collection("surveys")
    .doc(surveyId)
    .collection("members")
    .doc(userId)
    .get();
  if (member.exists) {
    return {
      member: {
        id: member.id,
        ...(member.data() as FormSession),
      },
    };
  }
}

export async function getTemplate(organizationId: string, id: string) {
  const template = await db
    .collection("organizations")
    .doc(organizationId)
    .collection("templates")
    .doc(id)
    .get();
  if (template.exists) {
    return {
      template: {
        id: template.id,
        ...(template.data() as Template),
      },
    };
  } else {
    return {};
  }
}

export async function getTemplates(organizationId: string) {
  const snapshot = await db
    .collection("organizations")
    .doc(organizationId)
    .collection("templates")
    .get();

  const templates: WithId<Template>[] = [];

  snapshot.forEach((doc) => {
    templates.push({ id: doc.id, ...(doc.data() as Template) });
  });

  return { templates };
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
