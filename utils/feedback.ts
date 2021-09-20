import { FeedbackType } from "../types";

function getBadgeColor(type: FeedbackType) {
  switch (type) {
    case FeedbackType.All:
      return "red";
    case FeedbackType.Idea:
      return "green";
    case FeedbackType.Issue:
      return "purple";
    case FeedbackType.Other:
      return "blue";
    default:
      return "gray";
  }
}

export { getBadgeColor };
