import type { Feedback } from "@/types/index";
import { create, update, _delete } from "./utils";

export function createFeedback(data: Feedback) {
  return create({ ref: `projects/${data.projectId}/feedbacks`, data });
}

export function deleteFeedback(id: string, projectId: string) {
  return _delete({
    ref: `projects/${projectId}/feedbacks`,
    id,
  });
}

export function updateFeedback(
  id: string,
  // FIXME: find a better way to make the projectId required
  data: Partial<Feedback> & { projectId: string }
) {
  return update({
    ref: `projects/${data.projectId}/feedback`,
    id,
    data,
  });
}
