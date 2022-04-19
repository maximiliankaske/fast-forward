import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import Heading from "@/components/ui/Heading";
import fetcher, { deletor, updator } from "@/utils/fetcher";
import Link from "@/components/ui/Link";
import toasts from "@/utils/toast";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import { Feedback, WidgetProject } from "@prisma/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";
import Button from "@/components/ui/Button";
import { getIcon } from "@/utils/feedback";
import { formatDistance } from "date-fns";
import Text from "@/components/ui/Text";
import parser from "ua-parser-js";

const ProjectPage = ({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // TODO: instead of state, use type inside url query param
  const [type, setType] = useState("ALL"); // TODO: type!
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const { data: project, mutate } = useSWR<
    WidgetProject & { feedbacks: Feedback[] }
  >(`/api/projects/${projectId}`, fetcher, { fallbackData });

  const handleArchive = async (id: string, data: Partial<Feedback>) => {
    try {
      toasts.promise(
        updator<Feedback>(`/api/feedback/${id}`, data).then(() => mutate())
      );
    } catch {
      console.warn("Probably unsufficient authorization");
    }
  };

  const onClipboard = () => {
    navigator.clipboard
      .writeText(projectId || "")
      .then(() => toasts.success("clipboard"));
  };

  return (
    <DefaultUserLayout
      messages={{ projectId: project?.name }}
      nextCrumb={{
        href: `/app/projects/${projectId}/settings`,
        name: "settings ⚙️",
      }}
    >
      <div className="mb-6 text-right">
        <Button onClick={onClipboard} variant="none">
          <span className="font-extralight">id:</span> {projectId}
        </Button>
      </div>
      <div className="flex space-x-3 mb-3">
        {(["ALL", "ISSUE", "IDEA", "OTHER", "ARCHIVE"] as const).map((k) => (
          <Button
            key={k}
            variant={type === k ? "primary" : "default"}
            className="lowercase"
            onClick={() => setType(k)}
          >
            {k} {getIcon(k)}
          </Button>
        ))}
      </div>
      <ul role="list" className="space-y-4">
        {project?.feedbacks
          ?.filter((f) => {
            if (type === "ALL") {
              return !f.archived;
            } else if (type === "ARCHIVE") {
              return f.archived;
            } else if (type === f.type) {
              return true && !f.archived;
            } else {
              return false;
            }
          })
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((feedback) => {
            const ua = parser(feedback.userAgent || "");
            return (
              <li
                key={feedback.id}
                className="px-4 py-3 space-y-3 rounded-md bg-gray-50 dark:bg-black dark:border border-gray-900"
              >
                <div className="flex justify-between">
                  <p className="p-2 text-sm rounded-full bg-gray-100 dark:bg-gray-900">
                    {getIcon(feedback.type)}
                  </p>
                  <Text variant="description">
                    {formatDistance(new Date(feedback.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </Text>
                </div>
                <Heading as="h4">{feedback.text}</Heading>
                <div className="grid grid-cols-3 text-sm">
                  <Text className="font-medium">location</Text>
                  <Text className="col-span-2 font-light text-gray-600">
                    {feedback.location}
                  </Text>
                  <Text className="font-medium">user agent</Text>
                  <Text className="col-span-2 font-light text-gray-600">
                    {`${ua.browser.name}, ${ua.os.name} ${ua.os.version}`}
                  </Text>
                  {feedback.userId ? (
                    <>
                      <Text className="font-medium">user</Text>
                      <Text className="col-span-2 font-light text-gray-600">
                        {feedback.userId}
                      </Text>
                    </>
                  ) : null}
                  {feedback.screenshotURL ? (
                    <>
                      <Text className="font-medium">screenshot</Text>
                      <Text className="col-span-2 font-light text-gray-600">
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
                    <Text
                      className="uppercase font-medium"
                      variant="description"
                    >
                      metadata
                    </Text>
                    <ul role="list">
                      {typeof feedback.metadata === "object" &&
                        !Array.isArray(feedback.metadata) &&
                        Object.keys(feedback.metadata).map((key) => (
                          <li key={key} className="grid grid-cols-3">
                            <Text className="font-medium">{key}</Text>
                            <Text className="col-span-2 font-light text-gray-600">
                              {/* @ts-ignore */}
                              {feedback.metadata![key]}
                            </Text>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : null}
                <div className="text-right">
                  <Button
                    onClick={() => {
                      const res = confirm("Really want to delete?");
                      if (res) {
                        toasts.promise(
                          deletor(`/api/feedback/${feedback.id}`).then(() =>
                            router.reload()
                          )
                        );
                      }
                    }}
                    variant="danger2"
                  >
                    delete
                  </Button>
                  <Button
                    onClick={() =>
                      handleArchive(feedback.id, {
                        archived: !feedback.archived,
                      })
                    }
                    variant="none"
                  >
                    {feedback.archived ? "unarchive" : "archive"}
                  </Button>
                </div>
              </li>
            );
          })}
      </ul>
    </DefaultUserLayout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ projectId: string }>) => {
  const entry = await prisma.widgetProject.findUnique({
    where: {
      id: params?.projectId,
    },
    include: {
      feedbacks: true,
    },
  });

  return {
    props: {
      fallbackData: entry || undefined,
    },
  };
};

export default ProjectPage;
