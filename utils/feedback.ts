import { FeedbackType } from "../types";

function getBadgeColor(type: FeedbackType) {
  switch (type) {
    case "all":
      return "red";
    case "idea":
      return "green";
    case "issue":
      return "purple";
    case "other":
      return "blue";
    default:
      return "gray";
  }
}

export { getBadgeColor };
