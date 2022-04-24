import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../ui/Button";
import Radios from "../ui/Radios";
import { formattedMessages } from "./translations";
import LoadingIcon from "../icon/Loading";
import { CheckIcon } from "@heroicons/react/solid";
import { FeedbackType } from "@prisma/client";
import RadioCard from "../ui/RadioCard";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

// Basic WidgetForm with Screenshot button

interface Props {
  userId?: string | null;
  projectId?: string;
  lang?: string;
  metadata?: Record<string, string | null | undefined | number>;
  domain?: string;
  closePanel: () => void;
}

const WidgetForm = ({
  closePanel,
  userId,
  lang,
  projectId,
  metadata,
  domain,
}: Props) => {
  const [form, setForm] = useState<"idle" | "pending" | "error" | "success">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [screenshotURL, setScreenshotURL] = useState<string>();
  const [text, setText] = useState<string>("");
  const { mutate } = useSWR(`/api/projects/${projectId}`, fetcher);

  useEffect(() => {
    let timer: undefined | NodeJS.Timeout;
    if (form === "success") {
      timer = setTimeout(() => {
        closePanel();
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [form, closePanel]);

  useEffect(() => {
    if (text !== "" && form !== "idle") {
      setForm("idle");
    }
  }, [text, form]);

  const handleReset = useCallback(() => {
    formRef.current?.reset();
    setText("");
    setScreenshotURL(undefined);
    setForm("success");
    mutate();
  }, [mutate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm("pending");
    const target = event.target as typeof event.target & {
      text: { value: string };
      type: { value: FeedbackType };
    };
    try {
      // REMINDER: remove sendFeedbackPromiseToast later
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
      defaultChecked: true,
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
      defaultChecked: false,
      value: "OTHER",
      icon: "💬",
    },
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
      {/* <Radios label={messages.type.label} name="type" options={types} srOnly /> */}
      <div className="flex space-x-2">
        {Object.entries(types).map(([key, value]) => (
          <RadioCard
            key={key}
            name="type"
            id={value.value}
            value={value.value}
            size="sm"
            className="lowercase"
            defaultChecked={value?.defaultChecked}
          >
            {`${value.label} ${value.icon}`}
          </RadioCard>
        ))}
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
      />
      <Button
        variant="primary"
        type="submit"
        className="w-full"
        disabled={text === ""}
        size="sm"
      >
        {renderState()}
      </Button>
    </form>
  );
};

export default WidgetForm;
