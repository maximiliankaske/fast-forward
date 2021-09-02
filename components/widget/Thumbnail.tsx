import React, { FC, useState } from "react";
import Button from "../ui/Button";
import firebase from "firebase/app";
import html2canvas from "html2canvas";
import Image from "next/image";
import { handleUploadState, uploadDataURL } from "../../lib/storage";
import LoadingIcon from "../icon/Loading";
import { XIcon } from "@heroicons/react/solid";

const Thumbnail: FC = () => {
  const [thumbnail, setThumbnail] = useState<string>();
  const [uploadState, setUploadState] =
    useState<firebase.storage.UploadTaskSnapshot["state"]>();

  const onScreenShot = () => {
    html2canvas(document.body).then((canvas) => {
      const ref = uploadDataURL(`${canvas.toDataURL()}`);
      handleUploadState(ref, {
        onSnapshot: (snapshot) => setUploadState(snapshot.state),
        onComplete: (downloadURL) => {
          setThumbnail(downloadURL);
          setUploadState(firebase.storage.TaskState.SUCCESS);
        },
      });
    });
  };

  const renderState = () => {
    switch (uploadState) {
      case firebase.storage.TaskState.RUNNING:
        return <LoadingIcon className="animate-spin h-5 w-5 text-gray-500" />;
      case firebase.storage.TaskState.SUCCESS:
        if (!thumbnail) return null;
        return (
          <>
            <a href={thumbnail} target="_blank" rel="noreferrer">
              <Image layout="fill" src={thumbnail} alt="" objectFit="cover" />
            </a>
            <button onClick={() => setUploadState(undefined)}>
              <XIcon className="absolute -right-2 -top-2 h-4 w-4 text-white bg-red-500 rounded-full" />
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="relative h-16 w-16 bg-gray-50 rounded-lg shadow flex items-center justify-center">
        {renderState()}
      </div>
      <Button onClick={onScreenShot}>Take ScreenShot</Button>
    </div>
  );
};

export default Thumbnail;
