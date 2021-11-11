import type {
  Organization,
  OrganizationInvite,
  OrganizationMember,
} from "@/types/index";
import { create, update, _delete } from "./utils";

export function createOrganization(data: Organization) {
  return create({ ref: `organizations`, id: data.name, data });
}

export function deleteOrganization(id: string) {
  return _delete({ ref: `organizations`, id });
}

export function updateOrganization(id: string, data: Partial<Organization>) {
  return update({ ref: `organizations`, id, data });
}

// userId is needed for first user to create organization with him as "owner"
export function createOrganizationMember({
  organizationId,
  userId,
  ...data
}: OrganizationMember & { organizationId: string; userId?: string }) {
  return create({
    ref: `organizations/${organizationId}/members`,
    id: userId,
    data,
  });
}

export function createOrganizationInvite({
  organizationId,
  ...data
}: OrganizationInvite & { organizationId: string }) {
  return create({ ref: `organizations/${organizationId}/invites`, data });
}

export function deleteOrganizationInvite(organizationId: string, id: string) {
  return _delete({ ref: `organizations/${organizationId}/invites`, id });
}
