import React, { FC, FormEvent } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import Button from "../components/ui/Button";
import firebase from "../lib/firebase";
import { createFeedback } from "../lib/db";
import Input from "../components/ui/Input";

const PROJECT_ID = "Ew4LeJPapRhOjmSFvI9I";

const Playground: FC = () => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      text: { value: string };
    };
    try {
      createFeedback({
        text: target.text.value,
        projectId: PROJECT_ID,
        createdAt: firebase.firestore.Timestamp.now(),
      });
      event.currentTarget.reset();
    } catch {
      throw new Error("create Project failed");
    }
  };

  return (
    <DefaultLayout>
      <form onSubmit={onSubmit}>
        <Input label="Comment" name="text" />
        <Button reverse type="submit">
          Submit
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default Playground;
