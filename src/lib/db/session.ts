import { FormSession } from "@/types/index";
import { create, update } from "./utils";

// TODO: create Type
// FIXME: missing user in session

// IDEA save each question into seperate key because it is easier to overwrite it
// instead of an array as we have to filter through it otherwise

export function createSession({
  organizationId,
  ...data
}: FormSession & { organizationId: string; id?: string }) {
  return create({
    ref: `organizations/${organizationId}/sessions`,
    data,
  });
}

export function updateSession({
  organizationId,
  id,
  ...data
}: FormSession & { organizationId: string; id: string }) {
  return update({
    ref: `organizations/${organizationId}/sessions`,
    id,
    data,
  });
}
