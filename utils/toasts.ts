import toast from "react-hot-toast";

export function feedbackErrorToast() {
  toast.error("Update Feedback failed. Please be authorized.", {
    className: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100",
  });
}
