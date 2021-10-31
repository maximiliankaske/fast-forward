import firebase from "../firebase";
import type { Organization, OrganizationMember } from "@/types/index";
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

export function createOrganizationMember(
  data: OrganizationMember & { organizationId: string }
) {
  return firebase
    .firestore()
    .collection("organizations")
    .doc(data.organizationId)
    .collection("members")
    .withConverter(converter<OrganizationMember>())
    .doc()
    .set(data);
}
