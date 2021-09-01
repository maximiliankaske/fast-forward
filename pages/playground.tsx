import React, { FC, FormEvent } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import Button from "../components/ui/Button";
import firebase from "firebase/app";
import { createFeedback } from "../lib/db";
import Input from "../components/ui/Input";
import Radios from "../components/ui/Radios";
import { FeedbackType } from "../types";

const PROJECT_ID = "bSyoWqKaC9kFEFzpYFpB";

const Playground: FC = () => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      text: { value: string };
      type: { value: FeedbackType };
    };
    try {
      createFeedback({
        text: target.text.value,
        type: target.type.value,
        projectId: PROJECT_ID,
        createdAt: firebase.firestore.Timestamp.now(),
        userAgent: window.navigator.userAgent,
        location: window.document.location.href,
      });
      event.currentTarget.reset();
    } catch {
      throw new Error("create Project failed");
    }
  };

  return (
    <DefaultLayout>
      <form onSubmit={onSubmit} className="space-y-4">
        <Radios
          label="Type"
          name="type"
          options={{
            issue: {
              label: "Issue",
              defaultChecked: true,
            },
            other: { label: "Other" },
          }}
        />
        <Input label="Comment" name="text" />
        <Button reverse type="submit">
          Submit
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default Playground;
