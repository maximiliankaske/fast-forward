import * as React from "react";
import Button from "./Button";
import { formattedMessages } from "../../utils/translations";
import LoadingIcon from "./LoadingIcon";
import { CheckIcon, CameraIcon, XIcon } from "@heroicons/react/solid";
import RadioCard from "./RadioCard";
import { toPng } from "html-to-image";
import { CloudUploadIcon } from "@heroicons/react/outline";
import { FeedbackType } from "../../types";

type FormType = "idle" | "pending" | "error" | "success";
type UploadStateType = "idle" | "pending" | "error" | "success";

interface Props {
  userId?: string | null;
  projectId: string;
  lang?: string;
  metadata?: Record<string, string | null | undefined | number>;
  domain?: string;
  close: () => void;
}

const Form = ({ close, userId, lang, projectId, metadata, domain }: Props) => {
  const [form, setForm] = React.useState<FormType>("idle");
  const formRef = React.useRef<HTMLFormElement>(null);
  const [uploadState, setUploadState] = React.useState<UploadStateType>("idle");
  const [screenshotURL, setScreenshotURL] = React.useState<
    string | undefined
  >();
  // "https://res.cloudinary.com/deh02ip3x/image/upload/v1651418026/wb7iv4svvwm4n6ndkkwj.png"
  const [text, setText] = React.useState<string>("");

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
      await fetch(`${domain || ""}/api/feedback`, {
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
          <LoadingIcon className="w-4 h-4 mx-auto my-1 text-gray-500 animate-spin" />
        );
      case "error":
        return "error";
      case "success":
        return <CheckIcon className="w-4 h-4 mx-auto my-1 text-green-500" />;
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
          fetch(`/api/cloudinary`, {
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
      className="bg-white dark:bg-black space-y-3 p-2 border rounded-md border-gray-200 shadow dark:border-gray-800"
    >
      <div className="flex space-x-2">
        {Object.entries(types).map(([key, value]) => (
          <RadioCard
            key={key}
            name="type"
            id={value.value}
            value={value.value}
            className="lowercase"
            defaultChecked={value?.defaultChecked}
          >
            {`${value.label} ${value.icon}`}
          </RadioCard>
        ))}
        <button
          type="button"
          onClick={close}
          className="text-gray-600 dark:text-gray-400"
        >
          <XIcon className="ml-1 h-4 w-4" />
        </button>
      </div>
      <label className="sr-only" htmlFor="text">
        Message
      </label>
      <textarea
        name="text"
        className="px-2 py-1 text-sm resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-100 dark:border-gray-900 rounded-md bg-transparent"
        placeholder={messages.comment.placeholder}
        rows={3}
        value={text}
        onChange={(event) => setText(event.target.value)}
        autoFocus
      />
      <div className="flex space-x-2 items-center">
        {(() => {
          switch (uploadState) {
            case "idle":
              return (
                <button
                  type="button"
                  className="p-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md"
                  onClick={onScreenshot}
                >
                  <CameraIcon className="h-5 w-5" />
                </button>
              );
            case "pending":
              return (
                <span className="p-1">
                  <CloudUploadIcon className="h-5 w-5" />
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
                    className="block h-full w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" src={screenshotURL!} />
                  </a>
                  <button
                    type="button"
                    onClick={resetScreenshot}
                    className="absolute -right-1 -top-1 p-[2px] rounded-full bg-red-500 text-white dark:text-black"
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
    </form>
  );
};

export default Form;
