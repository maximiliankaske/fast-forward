import { ExternalLinkIcon } from "@heroicons/react/outline";
import { formatDistance } from "date-fns";
import React from "react";
import parser from "ua-parser-js";
import { Feedback, WithId } from "../../types";
import { getBadgeColor } from "../../utils/feedback";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface Props {
  feedback: WithId<Feedback>;
  handleArchive: () => void;
}

const Card = ({ feedback, handleArchive }: Props) => {
  // @ts-ignore FIXME: firebase Timestamp.toDate() not a function
  const createdAtSeconds = feedback.createdAt._seconds * 1000;
  const ua = parser(feedback.userAgent);

  return (
    <div className="border rounded-md shadow-box overflow-hidden">
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Badge className="capitalize" color={getBadgeColor(feedback.type)}>
            {feedback.type}
          </Badge>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
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
            <p className="text-gray-600 dark:text-gray-400">
              {feedback.location}
            </p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="uppercase font-semibold">User Agent</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {`${ua.browser.name}, ${ua.os.name} ${ua.os.version}`}
            </p>
          </div>
          {feedback?.userId ? (
            <div className="col-span-2 md:col-span-1">
              <h4 className="uppercase font-semibold">User</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {feedback.userId}
              </p>
            </div>
          ) : null}
          {feedback?.screenshotURL ? (
            <>
              <div className="col-span-2 md:col-span-1">
                <h4 className="uppercase font-semibold">Screenshot</h4>
                <a
                  href={feedback.screenshotURL}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLinkIcon className="text-gray-600 dark:text-gray-400 hover:text-gray-500 h-5 w-5" />
                </a>
              </div>
            </>
          ) : null}
        </div>
        <div className="flex items-center justify-end space-x-3">
          <Button onClick={handleArchive} reverse>
            {feedback.archived ? "Unarchive" : "Archive"}
          </Button>
          {feedback.userId && (
            <a
              href={`mailto:${feedback.userId}`}
              className="rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reply with Mail
            </a>
          )}
        </div>
      </div>
      {feedback?.metadata ? (
        <div className="relative px-6 pt-4 pb-2 bg-gray-100 dark:bg-gray-900 border-t">
          <div className="absolute -top-4 left-0 right-0 text-center">
            <Badge color="pink" className="text-base">
              Metadata
            </Badge>
          </div>
          {Object.keys(feedback.metadata).map((key) => (
            <div
              key={key}
              className="border rounded overflow-hidden inline-flex text-sm mb-2 mr-2"
            >
              <span className="py-px px-3 bg-gray-700 text-white">{key}</span>
              <span className="py-px px-3 bg-indigo-200 text-indigo-700">
                {feedback.metadata![key]}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Card;
