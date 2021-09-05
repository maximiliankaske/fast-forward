import { PhotographIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import parser from "ua-parser-js";
import { Feedback, WithId } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Thumbnail from "./Thumbnail";

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
            <div className="col-span-1">
              <h4 className="uppercase font-semibold">Screenshot</h4>
              <button onClick={() => setOpen(true)}>
                <PhotographIcon className="text-gray-500 h-6 w-6" />
              </button>
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-end space-x-3">
          <Button onClick={handleArchive}>
            {feedback.archived ? "Unarchive" : "Archive"}
          </Button>
          <Button reverse>Reply with Mail</Button>
        </div>
      </div>
      <Thumbnail open={open} onClose={() => setOpen(false)}>
        <div>HEELOO</div>
      </Thumbnail>
    </>
  );
};

export default Card;
