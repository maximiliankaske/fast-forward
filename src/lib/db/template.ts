import { Template } from "@/types/templates";
import { create, update, _delete } from "./utils";

export function createTemplate({
  organizationId,
  ...data
}: Template & { organizationId: string }) {
  return create({
    ref: `organizations/${organizationId}/templates`,
    data,
  });
}

export function updateTemplate({
  organizationId,
  id,
  ...data
}: Partial<Template> & { organizationId: string; id: string }) {
  return update({
    ref: `organizations/${organizationId}/templates`,
    id,
    data,
  });
}

export function deleteTemplate({
  organizationId,
  id,
}: {
  organizationId: string;
  id: string;
}) {
  return _delete({
    ref: `organizations/${organizationId}/templates`,
    id,
  });
}
