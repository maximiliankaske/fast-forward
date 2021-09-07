import React, { FC, useState } from "react";
import firebase from "firebase/app";
import html2canvas from "html2canvas";
import Image from "next/image";
import { handleUploadState, uploadDataURL } from "../../lib/storage";
import LoadingIcon from "../icon/Loading";
import { CameraIcon, XIcon } from "@heroicons/react/solid";

// TODO: Understand why error state is not set when page is offline
// html2canvas move from then to async await

interface Props {
  setScreenshotURL: (value?: string) => void;
}

const Thumbnail = ({ setScreenshotURL }: Props) => {
  const [thumbnail, setThumbnail] = useState<string>();
  const [uploadState, setUploadState] =
    useState<firebase.storage.UploadTaskSnapshot["state"]>();

  const onScreenShot = () => {
    html2canvas(document.body).then((canvas) => {
      const ref = uploadDataURL(`${canvas.toDataURL()}`);
      handleUploadState(ref, {
        onSnapshot: (snapshot) => setUploadState(snapshot.state),
        onComplete: (ref) => {
          ref.getDownloadURL().then((downloadURL) => {
            setThumbnail(downloadURL);
            setScreenshotURL(downloadURL);
          });
          setUploadState(firebase.storage.TaskState.SUCCESS);
        },
        onError: () => setUploadState(firebase.storage.TaskState.ERROR),
      });
    });
  };

  const renderState = () => {
    switch (uploadState) {
      case firebase.storage.TaskState.ERROR:
        return <XIcon className="h-5 w-5 text-white bg-red-500 rounded-full" />;
      case firebase.storage.TaskState.RUNNING:
        return <LoadingIcon className="animate-spin h-5 w-5 text-gray-500" />;
      case firebase.storage.TaskState.SUCCESS:
        if (!thumbnail) return null;
        return (
          <>
            <a href={thumbnail} target="_blank" rel="noreferrer">
              <Image layout="fill" src={thumbnail} alt="" objectFit="cover" />
            </a>
            <button
              onClick={() => {
                setUploadState(undefined);
                setScreenshotURL(undefined);
              }}
            >
              <XIcon className="absolute -right-2 -top-2 h-4 w-4 text-white bg-red-500 rounded-full" />
            </button>
          </>
        );
      case undefined:
        return (
          <button onClick={onScreenShot} className="w-full h-full">
            <CameraIcon className="h-5 w-5 text-gray-500 mx-auto" />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-10 w-10 bg-gray-100 rounded-lg shadow relative flex items-center justify-center">
      {renderState()}
    </div>
  );
};

export default Thumbnail;
