import { ExternalLinkIcon } from "@heroicons/react/outline";
import { PhotographIcon } from "@heroicons/react/solid";
import { formatDistance } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import parser from "ua-parser-js";
import { Feedback, WithId } from "../../types";
import Modal from "../common/Modal";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface Props {
  feedback: WithId<Feedback>;
  handleArchive: () => void;
}

const Card = ({ feedback, handleArchive }: Props) => {
  const [open, setOpen] = useState(false);
  // @ts-ignore FIXME: firebase Timestamp.toDate() not a function
  const createdAtSeconds = feedback.createdAt._seconds * 1000;
  const ua = parser(feedback.userAgent);
  return (
    <>
      <div className="border rounded-md shadow-box p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Badge className="capitalize">{feedback.type}</Badge>
          <p className="text-gray-500 text-sm">
            {formatDistance(new Date(createdAtSeconds), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <p>{feedback.text}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="uppercase font-semibold">Page</h4>
            <p className="text-gray-500">{feedback.location}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="uppercase font-semibold">User Agent</h4>
            <p className="text-gray-500">
              {`${ua.browser.name}, ${ua.os.name} ${ua.os.version}`}
            </p>
          </div>
          {feedback?.userId ? (
            <div className="col-span-2 md:col-span-1">
              <h4 className="uppercase font-semibold">User</h4>
              <p className="text-gray-500">{feedback.userId}</p>
            </div>
          ) : null}
          {feedback?.screenshotURL ? (
            <>
              <div className="col-span-2 md:col-span-1">
                <h4 className="uppercase font-semibold">Screenshot</h4>
                <div className="flex space-x-2 items-center">
                  <button onClick={() => setOpen(true)}>
                    <PhotographIcon className="text-gray-500 hover:text-gray-600 h-6 w-6" />
                  </button>
                  <a
                    href={feedback.screenshotURL}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLinkIcon className="text-gray-500 hover:text-gray-600 h-5 w-5" />
                  </a>
                </div>
              </div>
              <Modal open={open} onClose={() => setOpen(false)}>
                <div className="h-64 w-full relative">
                  <Image
                    layout="fill"
                    src={feedback.screenshotURL}
                    alt=""
                    objectFit="contain"
                  />
                </div>
              </Modal>
            </>
          ) : null}
        </div>
        <div className="flex items-center justify-end space-x-3">
          <Button onClick={handleArchive} reverse>
            {feedback.archived ? "Unarchive" : "Archive"}
          </Button>
          {feedback.userId && (
            <a href={`mailto:${feedback.userId}`}>Reply with Mail</a>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
