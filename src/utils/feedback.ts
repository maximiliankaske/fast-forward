import { FeedbackType } from "../types";

function getBadgeColor(type: FeedbackType) {
  switch (type) {
    case "all":
      return "primary";
    case "idea":
      return "secondary";
    case "issue":
      return "ternary";
    case "other":
      return "quantery";
    default:
      return "default";
  }
}

export { getBadgeColor };
