import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../ui/Button";
import Radios from "../ui/Radios";
import { FeedbackType } from "../../types";
import Thumbnail from "./Thumbnail";
import { WidgetProps } from "./Widget";
import TextArea from "../ui/TextArea";
import { formattedMessages } from "./translations";
import LoadingIcon from "../icon/Loading";
import { CheckIcon } from "@heroicons/react/solid";
import toasts from "../../utils/toast";

const WidgetForm = ({
  userId,
  projectId,
  lang: defaultLang,
  metadata,
  domain,
}: WidgetProps) => {
  const [form, setForm] = useState<"idle" | "pending" | "error" | "success">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [screenshotURL, setScreenshotURL] = useState<string>();
  const [text, setText] = useState<string>("");

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
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm("pending");
    const target = event.target as typeof event.target & {
      text: { value: string };
      type: { value: FeedbackType };
    };
    try {
      // REMINDER: remove sendFeedbackPromiseToast later
      await toasts.promise(
        fetch(`${domain || ""}/api/feedback`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            text: target.text.value,
            type: target.type.value,
            projectId,
            userAgent: window.navigator.userAgent,
            location: window.document.location.href,
            metadata,
            userId,
            screenshotURL,
          }),
        })
      );
      handleReset();
    } catch (error) {
      setForm("error");
    }
  };

  const messages = formattedMessages(
    defaultLang || document.documentElement.lang || "en"
  );

  const renderState = () => {
    switch (form) {
      case "idle":
        return messages.submit.label;
      case "pending":
        return (
          <LoadingIcon className="h-4 w-4 my-1 animate-spin text-gray-500 mx-auto" />
        );
      case "error":
        return "error";
      case "success":
        return <CheckIcon className="h-4 w-4 my-1 text-green-500 mx-auto" />;
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
      <Radios
        label={messages.type.label}
        name="type"
        options={{
          issue: {
            label: messages.type.options.issue.label,
            defaultChecked: true,
          },
          idea: { label: messages.type.options.idea.label },
          other: { label: messages.type.options.other.label },
        }}
        srOnly
      />
      <TextArea
        label={messages.comment.label}
        name="text"
        className="resize-none text-sm px-2 py-1"
        placeholder={messages.comment.placeholder}
        rows={3}
        srOnly
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <div className="flex space-x-3">
        <Thumbnail {...{ setScreenshotURL, screenshotURL }} />
        <Button
          reverse
          type="submit"
          className="flex-1"
          disabled={text === ""}
          size="sm"
        >
          {renderState()}
        </Button>
      </div>
    </form>
  );
};

export default WidgetForm;
