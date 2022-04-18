import { FeedbackType } from ".prisma/client";

function getBadgeColor(type: FeedbackType | "ALL" | "ARCHIVE") {
  switch (type) {
    case "ALL":
      return "primary";
    case "IDEA":
      return "secondary";
    case "ISSUE":
      return "ternary";
    case "OTHER":
      return "quantery";
    default:
      return "default";
  }
}

function getIcon(type: FeedbackType | "ALL" | "ARCHIVE") {
  switch (type) {
    case "ALL":
      return "👋";
    case "IDEA":
      return "💡";
    case "ISSUE":
      return "🚧";
    case "OTHER":
      return "💬";
    case "ARCHIVE":
      return "🗃";
    default:
      return "";
  }
}

export { getBadgeColor, getIcon };
