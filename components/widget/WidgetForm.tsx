import React, { FormEvent, useCallback, useRef, useState } from "react";
import Button from "../ui/Button";
import Radios from "../ui/Radios";
import { FeedbackType } from "../../types";
import Thumbnail from "./Thumbnail";
import { WidgetProps } from "./Widget";
import TextArea from "../ui/TextArea";
import { formattedMessages } from "./translations";

const WidgetForm = ({
  userId,
  projectId,
  lang: defaultLang,
  metadata,
}: WidgetProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [screenshotURL, setScreenshotURL] = useState<string>();
  const [text, setText] = useState<string>("");

  const handleReset = useCallback(() => {
    formRef.current?.reset();
    setText("");
    setScreenshotURL(undefined);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      text: { value: string };
      type: { value: FeedbackType };
    };
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          text: target.text.value,
          type: target.type.value,
          projectId,
          userAgent: window.navigator.userAgent,
          location: window.document.location.href,
          metadata,
          userId,
          screenshotURL,
          // Append to Object only if !undefined
          // ...(screenshotURL && { screenshotURL }),
          // ...(userId && { userId }),
          // ...(metadata && { metadata }),
        }),
      });
      handleReset();
    } catch {
      throw new Error("create Project failed");
    }
  };

  const messages = formattedMessages(
    defaultLang || document.documentElement.lang || "en"
  );

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
          {messages.submit.label}
        </Button>
      </div>
    </form>
  );
};

export default WidgetForm;
