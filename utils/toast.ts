import toast from "react-hot-toast";

const toastMessages = {
  promise: {
    default: {
      loading: "Loading...",
      success: "Success",
      error: "Something went wrong",
    },
    unauthorized: {
      loading: "Loading...",
      success: "Ok that should never happend",
      error: "You are unauthorized!",
    },
  },
  success: {
    default: "Success!",
  },
};

const promise = (
  promise: Promise<unknown>,
  message: keyof typeof toastMessages.promise = "default"
) => toast.promise(promise, toastMessages.promise[message]);

const success = (message: keyof typeof toastMessages.success = "default") =>
  toast.success(toastMessages.success[message]);

const toasts = {
  promise,
  success,
};

export default toasts;
