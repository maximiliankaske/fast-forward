import * as React from "react";
import Button from "./Button";
import { formattedMessages } from "../../utils/translations";
import LoadingIcon from "./LoadingIcon";
import { CheckIcon, CameraIcon, XIcon } from "@heroicons/react/solid";
import RadioCard from "./RadioCard";
import { toPng } from "html-to-image";
import { CloudUploadIcon } from "@heroicons/react/outline";
import { FeedbackBase, FeedbackType } from "../../types";

type FormType = "idle" | "pending" | "error" | "success";
type UploadStateType = "idle" | "pending" | "error" | "success";

interface Props extends FeedbackBase {
  close: () => void;
  onSubmit?: () => void;
}

const Form = ({
  close,
  userId,
  lang,
  projectId,
  metadata,
  domain,
  onSubmit,
}: Props) => {
  const [form, setForm] = React.useState<FormType>("idle");
  const formRef = React.useRef<HTMLFormElement>(null);
  const [uploadState, setUploadState] = React.useState<UploadStateType>("idle");
  const [screenshotURL, setScreenshotURL] = React.useState<
    string | undefined
  >();
  const [text, setText] = React.useState<string>("");

  // FIXME: update to https://fast-forward.app
  const currentDomain = domain || "https://staging.fast-forward.app";

  React.useEffect(() => {
    let timer: undefined | NodeJS.Timeout;
    if (form === "success") {
      timer = setTimeout(() => {
        close();
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [form, close]);

  React.useEffect(() => {
    if (text !== "" && form !== "idle") {
      setForm("idle");
    }
  }, [text, form]);

  const handleReset = React.useCallback(() => {
    formRef.current?.reset();
    setText("");
    setUploadState("idle");
    setScreenshotURL(undefined);
    setForm("success");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm("pending");
    const target = event.target as typeof event.target & {
      text: { value: string };
      type: { value: FeedbackType };
    };
    try {
      await fetch(`${currentDomain || ""}/api/feedback`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          text: target.text.value,
          type: target.type.value,
          projectId,
          // userAgent: window.navigator.userAgent,
          // location: window.document.location.href,
          metadata,
          userId,
          screenshotURL,
        }),
      });
      onSubmit?.();
      handleReset();
    } catch (error) {
      setForm("error");
    }
  };

  const messages = formattedMessages(
    lang || document.documentElement.lang || "en"
  );

  const renderState = () => {
    switch (form) {
      case "idle":
        return messages.submit.label;
      case "pending":
        return (
          <LoadingIcon className="w-4 h-4 mx-auto my-1 text-wGray-500 animate-spin" />
        );
      case "error":
        return "error";
      case "success":
        return <CheckIcon className="w-4 h-4 mx-auto my-1 text-wGreen-500" />;
    }
  };

  const types = {
    issue: {
      label: messages.type.options.issue.label,
      defaultChecked: false,
      value: "ISSUE",
      icon: "🚧",
    },
    idea: {
      label: messages.type.options.idea.label,
      defaultChecked: false,
      value: "IDEA",
      icon: "💡",
    },
    other: {
      label: messages.type.options.other.label,
      defaultChecked: true,
      value: "OTHER",
      icon: "💬",
    },
  };

  const resetScreenshot = () => {
    setScreenshotURL(undefined);
    setUploadState("idle");
  };

  const onScreenshot = () => {
    if (document.getElementsByTagName("body")) {
      setUploadState("pending");
      toPng(document.getElementsByTagName("body")[0], {
        filter: (node) => {
          return node.id !== "widget";
        },
      })
        .then(function (dataUrl) {
          // TODO: use correct domain name here
          fetch(`${currentDomain}/api/cloudinary`, {
            method: "POST",
            body: JSON.stringify({
              screenshot: dataUrl,
            }),
          })
            .then((res) => res.json())
            .then((json) => {
              // FIXME: missing Cloudinary types
              setScreenshotURL(json.secure_url);
              setUploadState("success");
            })
            .catch(() => {
              setUploadState("error");
            });
        })
        .catch(() => {
          setUploadState("error");
        });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-wWhite dark:bg-wBlack px-3 py-4 sm:px-4 sm:py-5 border rounded-lg border-wGray-200 shadow dark:border-wGray-800"
    >
      <div className="space-y-3 sm:space-y-4">
        <div className="flex space-x-2 sm:space-x-3">
          {Object.entries(types).map(([key, value]) => (
            <RadioCard
              key={key}
              name="type"
              id={value.value}
              value={value.value}
              defaultChecked={value?.defaultChecked}
            >
              {`${value.label} ${value.icon}`}
            </RadioCard>
          ))}
          <button
            type="button"
            onClick={close}
            className="ml-1 rounded-md text-wGray-600 dark:text-wGray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wGray-900"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <label className="sr-only" htmlFor="text">
          Message
        </label>
        <textarea
          name="text"
          className="sm:text-lg text-wBlack dark:text-wWhite px-2 py-1 resize-none shadow-sm border focus:border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-wGray-900 block w-full border-wGray-100 dark:border-gray-900 rounded-md bg-transparent"
          placeholder={messages.comment.placeholder}
          rows={3}
          value={text}
          onChange={(event) => setText(event.target.value)}
          autoFocus
        />
        <div className="flex space-x-2 items-center text-wBlack dark:text-wWhite">
          {(() => {
            switch (uploadState) {
              case "idle":
                return (
                  <button
                    type="button"
                    className="p-1 hover:bg-wGray-50 dark:hover:bg-wGray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wGray-900"
                    onClick={onScreenshot}
                  >
                    <CameraIcon className="h-6 w-6" />
                  </button>
                );
              case "pending":
                return (
                  <span className="p-1">
                    <CloudUploadIcon className="h-6 w-6" />
                  </span>
                );
              // case "error"
              case "success":
                return (
                  <div className="relative h-[28px] max-w-[28px] min-w-[28px]">
                    <a
                      href={screenshotURL}
                      target="_blank"
                      rel="noreferrer"
                      className="block h-full w-full overflow-hidden"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="" src={screenshotURL!} />
                    </a>
                    <button
                      type="button"
                      onClick={resetScreenshot}
                      className="absolute -right-1 -top-1 p-[2px] rounded-full bg-red-500 text-wWhite dark:text-wBlack"
                    >
                      <XIcon className="h-2 w-2" />
                    </button>
                  </div>
                );
              default:
                return null;
            }
          })()}
          <Button type="submit" className="w-full" disabled={text === ""}>
            {renderState()}
          </Button>
        </div>
      </div>
      <p className="text-center mt-2 -mb-2 text-[9px] leading-[9px] text-wGray-600 dark:text-wGray-400">
        powered by{" "}
        <a
          href="https://fast-forward.app"
          className="text-wPrimary-500 dark:text-wSecondary-500"
          target="_blank"
          rel="noreferrer"
        >
          fast-forward.app
        </a>
      </p>
    </form>
  );
};

export default Form;
