import React, { FC, FormEvent, useState } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import Button from "../components/ui/Button";
import firebase from "firebase/app";
import { createFeedback } from "../lib/db";
import Input from "../components/ui/Input";
import Radios from "../components/ui/Radios";
import { FeedbackType } from "../types";
import html2canvas from "html2canvas";
import Image from "next/image";
import { handleUploadState, uploadDataURL } from "../lib/storage";

const PROJECT_ID = "bSyoWqKaC9kFEFzpYFpB";

const Playground: FC = () => {
  const [thumbnail, setThumbnail] = useState<string>();
  const [uploadState, setUploadState] =
    useState<firebase.storage.UploadTaskSnapshot["state"]>();

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

  const onScreenShot = () => {
    html2canvas(document.body).then((canvas) => {
      const ref = uploadDataURL(`${canvas.toDataURL()}`);
      handleUploadState(ref, {
        onSnapshot: (snapshot) => setUploadState(snapshot.state),
        onComplete: (downloadURL) => {
          setUploadState(firebase.storage.TaskState.SUCCESS);
          setThumbnail(downloadURL);
        },
      });
    });
  };

  const renderState = () => {
    switch (uploadState) {
      case firebase.storage.TaskState.RUNNING:
        return <p>Running</p>;
      case firebase.storage.TaskState.SUCCESS:
        return <p>Success</p>;
      default:
        return <p>None</p>;
    }
  };

  return (
    <DefaultLayout>
      <div className="space-y-6">
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
          <Button reverse type="submit" data-html2canvas-ignore>
            Submit
          </Button>
        </form>
        <Button onClick={onScreenShot}>ScreenShot</Button>
        <div className="relative h-32 w-32 bg-gray-100">
          {thumbnail && (
            <Image layout="fill" src={thumbnail} alt="" objectFit="contain" />
          )}
        </div>
        {renderState()}
      </div>
    </DefaultLayout>
  );
};

export default Playground;
