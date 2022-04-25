import { getIcon } from "@/utils/feedback";
import fetcher, { deletor, updator } from "@/utils/fetcher";
import toasts from "@/utils/toast";
import { Feedback } from "@prisma/client";
import { formatDistance } from "date-fns";
import React from "react";
import useSWR from "swr";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Link from "../ui/Link";
import Text from "../ui/Text";
import parser from "ua-parser-js";
import cn from "classnames";

interface Props {
  feedback: Feedback;
  className?: string;
  hideUser?: boolean;
}

const Card = ({ feedback, className, hideUser = false }: Props) => {
  const { mutate } = useSWR(`/api/projects/${feedback.projectId}`, fetcher);
  const handleUpdate = async (id: string, data: Partial<Feedback>) => {
    try {
      toasts.promise(updator(`/api/feedback/${id}`, data).then(() => mutate()));
    } catch {
      console.warn("Probably unsufficient authorization");
    }
  };

  const handleDelete = (id: string) => {
    const res = confirm("Really want to delete?");
    if (res) {
      toasts.promise(deletor(`/api/feedback/${id}`).then(() => mutate()));
    }
  };

  const ua = parser(feedback.userAgent || "");

  return (
    <div
      className={cn(
        "px-4 py-3 space-y-3 rounded-md bg-gray-50 dark:bg-gray-900 dark:border border-gray-900",
        className
      )}
    >
      <div className="flex justify-between">
        <p className="p-2 text-sm rounded-full bg-gray-100 dark:bg-gray-800">
          {getIcon(feedback.type)}
        </p>
        <Text variant="description">
          {formatDistance(new Date(feedback.createdAt), new Date(), {
            addSuffix: true,
          })}
        </Text>
      </div>
      <Heading as="h4">{feedback.text}</Heading>
      <div className="grid sm:grid-cols-3 text-sm">
        <Text className="font-medium">location</Text>
        <Text className="col-span-2 font-light text-gray-600 dark:text-gray-400 truncate">
          {feedback.location?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}
        </Text>
        <Text className="font-medium">user agent</Text>
        <Text className="col-span-2 font-light text-gray-600 dark:text-gray-400 truncate">
          {`${ua.browser.name}, ${ua.os.name} ${ua.os.version}`}
        </Text>
        {feedback.userId ? (
          <>
            <Text className="font-medium">user</Text>
            <Text className="col-span-2 font-light text-gray-600 dark:text-gray-400 truncate">
              {hideUser
                ? feedback.userId.replace(
                    /(\w{2})[\w.-]+@([\w.]+\w)/,
                    "$1***@$2"
                  )
                : feedback.userId}
            </Text>
          </>
        ) : null}
        {feedback.screenshotURL ? (
          <>
            <Text className="font-medium">screenshot</Text>
            <Text className="col-span-2 font-light text-gray-600 dark:text-gray-400">
              <Link
                href={feedback.screenshotURL}
                download
                target="_blank"
                rel="noreferrer"
              >
                download
              </Link>
            </Text>
          </>
        ) : null}
      </div>
      {/* DISCUSS: metadata as details/summary */}
      {feedback?.metadata ? (
        <div>
          <Text className="uppercase font-medium" variant="description">
            metadata
          </Text>
          <ul role="list">
            {typeof feedback.metadata === "object" &&
              !Array.isArray(feedback.metadata) &&
              Object.keys(feedback.metadata).map((key) => (
                <li key={key} className="grid grid-cols-3">
                  <Text className="font-medium">{key}</Text>
                  <Text className="col-span-2 font-light text-gray-600 dark:text-gray-400">
                    {/* @ts-ignore */}
                    {feedback.metadata![key]}
                  </Text>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
      <div className="text-right space-x-3">
        <Button onClick={() => handleDelete(feedback.id)} variant="danger2">
          delete
        </Button>
        <Button
          onClick={() =>
            handleUpdate(feedback.id, {
              starred: !feedback.starred,
            })
          }
          variant="star"
        >
          {feedback.starred ? "unstar" : "star"}
        </Button>
        <Button
          onClick={() =>
            handleUpdate(feedback.id, {
              archived: !feedback.archived,
            })
          }
          variant="none"
        >
          {feedback.archived ? "unarchive" : "archive"}
        </Button>
      </div>
    </div>
  );
};

export default Card;
