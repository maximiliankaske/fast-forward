import toast from "react-hot-toast";

export function feedbackErrorToast() {
  toast.error("Update Feedback failed. Please be authorized.");
}

export function sendFeedbackErrorToast() {
  toast.error("Failed to send feedback.");
}

export function sendFeedbackPromiseToast(promise: Promise<unknown>) {
  return toast.promise(promise, {
    loading: "Loading",
    success: "Got the data",
    error: "Error when fetching",
  });
}

export function feedbackResetToast() {
  toast.success("Reset Feedbacks.");
}
