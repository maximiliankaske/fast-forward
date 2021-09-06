import { ExternalLinkIcon } from "@heroicons/react/outline";
import { PhotographIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { useState } from "react";
import parser from "ua-parser-js";
import { Feedback, WithId } from "../../types";
import Modal from "../common/Modal";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

// TODO: hard coded minutes

interface Props {
  feedback: WithId<Feedback>;
  handleArchive: () => void;
}

const Card = ({ feedback, handleArchive }: Props) => {
  const [open, setOpen] = useState(false);
  const ua = parser(feedback.userAgent);

  return (
    <>
      <div className="border rounded-md shadow-box p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Badge className="capitalize">{feedback.type}</Badge>
          <p className="text-gray-500 text-sm">39 minutes ago</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <p>{feedback.text}</p>
          </div>
          <div className="col-span-1">
            <h4 className="uppercase font-semibold">Page</h4>
            <p className="text-gray-500">{feedback.location}</p>
          </div>
          <div className="col-span-1">
            <h4 className="uppercase font-semibold">User Agent</h4>
            <p className="text-gray-500">
              {`${ua.browser.name}, ${ua.os.name} ${ua.os.version}`}
            </p>
          </div>
          {feedback?.screenshotURL ? (
            <>
              <div className="col-span-1">
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
          <Button onClick={handleArchive}>
            {feedback.archived ? "Unarchive" : "Archive"}
          </Button>
          <Button reverse>Reply with Mail</Button>
        </div>
      </div>
    </>
  );
};

export default Card;
