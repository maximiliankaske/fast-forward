import React, { FormEvent, useState } from "react";
import Button from "../ui/Button";
import firebase from "firebase/app";
import { createFeedback } from "../../lib/db";
import Radios from "../ui/Radios";
import { FeedbackType } from "../../types";
import Thumbnail from "./Thumbnail";
import { WidgetProps } from "./Widget";
import TextArea from "../ui/TextArea";
import { formattedMessages } from "./translations";

const WidgetForm = ({ userId, projectId, lang: defaultLang }: WidgetProps) => {
  const [screenshotURL, setScreenshotURL] = useState<string>();
  const [text, setText] = useState<string>("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      text: { value: string };
      type: { value: FeedbackType };
    };
    try {
      const baseFeedback = {
        text: target.text.value,
        type: target.type.value,
        projectId,
        createdAt: firebase.firestore.Timestamp.now(),
        userAgent: window.navigator.userAgent,
        location: window.document.location.href,
      };
      createFeedback({
        ...baseFeedback,
        // Append to Object only if !undefined
        ...(screenshotURL && { screenshotURL }),
        ...(userId && { userId }),
      });
      // Resets only the type, as the text is opinionated through a state
      event.currentTarget.reset();
      setText("");
      setScreenshotURL(undefined);
    } catch {
      throw new Error("create Project failed");
    }
  };

  const messages = formattedMessages(
    defaultLang || document.documentElement.lang || "en"
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
        className="resize-none text-sm"
        placeholder={messages.comment.placeholder}
        rows={3}
        srOnly
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <div className="flex space-x-4">
        <Thumbnail {...{ setScreenshotURL, screenshotURL }} />
        <Button reverse type="submit" className="flex-1" disabled={text === ""}>
          {messages.submit.label}
        </Button>
      </div>
    </form>
  );
};

export default WidgetForm;
