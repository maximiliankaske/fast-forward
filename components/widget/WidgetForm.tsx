import React, { FC, FormEvent, useState } from "react";
import Button from "../ui/Button";
import firebase from "firebase/app";
import { createFeedback } from "../../lib/db";
import Input from "../ui/Input";
import Radios from "../ui/Radios";
import { FeedbackType } from "../../types";
import Thumbnail from "./Thumbnail";
import { WidgetProps } from "./Widget";

const WidgetForm = ({ userId, projectId }: WidgetProps) => {
  const [screenshotURL, setScreenshotURL] = useState<string>();

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
      event.currentTarget.reset();
    } catch {
      throw new Error("create Project failed");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Radios
        label="Type"
        name="type"
        options={{
          issue: {
            label: "Issue",
            defaultChecked: true,
          },
          idea: { label: "Idea" },
          other: { label: "Other" },
        }}
      />
      <Input label="Comment" name="text" />
      <div className="flex space-x-4">
        <Thumbnail setScreenshotURL={setScreenshotURL} />
        <Button reverse type="submit" className="flex-1">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default WidgetForm;
