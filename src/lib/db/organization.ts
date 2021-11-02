import firebase from "../firebase";
import type {
  Organization,
  OrganizationInvite,
  OrganizationMember,
} from "@/types/index";
import converter from "@/utils/converter";

export function createOrganization(data: Organization) {
  return firebase
    .firestore()
    .collection("organizations")
    .withConverter(converter<Organization>())
    .doc(data.name)
    .set(data);
}

export function deleteOrganization(id: string) {
  return firebase.firestore().collection("organizations").doc(id).delete();
}

export function updateOrganization(id: string, data: Partial<Organization>) {
  return firebase.firestore().collection("organizations").doc(id).update(data);
}

// userId is needed for first user to create organization with him as "owner"
export function createOrganizationMember({
  organizationId,
  userId,
  ...data
}: OrganizationMember & { organizationId: string; userId?: string }) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("members")
    .withConverter(converter<OrganizationMember>())
    .doc(userId)
    .set(data);
}

export function createOrganizationInvite({
  organizationId,
  ...data
}: OrganizationInvite & { organizationId: string }) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(organizationId)
    .collection("invites")
    .withConverter(converter<OrganizationInvite>())
    .doc()
    .set(data);
}
