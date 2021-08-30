import React from "react";
import parser from "ua-parser-js";
import { Feedback } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

// TODO: hard coded minutes

interface Props {
  feedback: Feedback;
}

const Card = ({ feedback }: Props) => {
  const ua = parser(feedback.userAgent);
  return (
    <div className="border rounded-md shadow-box p-6 space-y-3">
      <div className="flex items-center justify-between">
        <Badge>Other</Badge>
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
      </div>
      <div className="flex items-center justify-end space-x-3">
        <Button>Archive</Button>
        <Button reverse>Reply with Mail</Button>
      </div>
    </div>
  );
};

export default Card;
