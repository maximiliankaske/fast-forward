import React from "react";
import parser from "ua-parser-js";
import { Feedback } from "../../types";
import Badge from "../ui/Badge";

// TODO: hard coded minutes

interface Props {
  feedback: Feedback;
}

const Card = ({ feedback }: Props) => {
  const ua = parser(feedback.userAgent);
  return (
    <div className="border rounded-md shadow-box p-6">
      <div className="flex items-center justify-between pb-3">
        <Badge>Hello World</Badge>
        <p className="text-gray-500 text-sm">39 minutes ago</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 text-gray-900">
          <p>{feedback.text}</p>
        </div>
        <div className="col-span-1">
          <h4 className="uppercase font-semibold text-gray-900">Page</h4>
          <p className="text-gray-500">{feedback.location}</p>
        </div>
        <div className="col-span-1">
          <h4 className="uppercase font-semibold text-gray-900">User Agent</h4>
          <p className="text-gray-500">
            {`${ua.browser.name}, ${ua.os.name} ${ua.os.version}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
