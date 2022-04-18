import { ExternalLinkIcon } from "@heroicons/react/outline";
import { formatDistance } from "date-fns";
import React from "react";
import parser from "ua-parser-js";
import { getBadgeColor } from "@/utils/feedback";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Feedback } from ".prisma/client";

interface Props {
  feedback: Feedback;
  handleArchive: () => void;
}

const Card = ({ feedback, handleArchive }: Props) => {
  const ua = parser(feedback.userAgent || "");

  return (
    <div className="overflow-hidden border border-gray-200 rounded-md dark:border-gray-800 shadow-box">
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Badge className="capitalize" color={getBadgeColor(feedback.type)}>
            {feedback.type}
          </Badge>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatDistance(new Date(feedback.createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <p>{feedback.text}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold uppercase">Page</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {feedback.location}
            </p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold uppercase">User Agent</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {`${ua.browser.name}, ${ua.os.name} ${ua.os.version}`}
            </p>
          </div>
          {feedback?.userId ? (
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold uppercase">User</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {feedback.userId}
              </p>
            </div>
          ) : null}
          {feedback?.screenshotURL ? (
            <>
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-semibold uppercase">Screenshot</h4>
                <a
                  href={feedback.screenshotURL}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLinkIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-500" />
                </a>
              </div>
            </>
          ) : null}
        </div>
        <div className="flex items-center justify-end space-x-3">
          <Button onClick={handleArchive} variant="primary">
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
        <div className="relative px-6 pt-4 pb-2 bg-gray-100 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
          <div className="absolute left-0 right-0 text-center -top-4">
            <Badge color="primary" className="text-base">
              Metadata
            </Badge>
          </div>
          {typeof feedback.metadata === "object" &&
            !Array.isArray(feedback.metadata) &&
            Object.keys(feedback.metadata).map((key) => (
              <div
                key={key}
                className="inline-flex mb-2 mr-2 overflow-hidden text-sm border border-gray-200 rounded dark:border-gray-800"
              >
                <span className="px-3 py-px text-white bg-gray-700">{key}</span>
                <span className="px-3 py-px text-indigo-700 bg-indigo-200">
                  {/* @ts-ignore */}
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
