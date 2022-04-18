import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Heading from "@/components/ui/Heading";
import fetcher, { updator } from "@/utils/fetcher";
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

  const { filter = "ALL" } = router.query;

  return (
    <DefaultUserLayout
      messages={{ projectId: project?.name }}
      nextCrumb={{
        href: `/app/projects/${projectId}/settings`,
        name: "settings ⚙️",
      }}
    >
      <div className="mb-6">
        <Button onClick={onClipboard} variant="none">
          {projectId}
        </Button>
      </div>
      <div className="flex space-x-3 mb-3">
        {(["ALL", "ISSUE", "IDEA", "OTHER", "ARCHIVE"] as const).map((k) => (
          <Button
            key={k}
            variant={filter === k ? "primary" : "none"}
            className="lowercase"
            onClick={() =>
              router.replace(`/app/projects/${projectId}?filter=${k}`)
            }
          >
            {k} {getIcon(k)}
          </Button>
        ))}
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {project?.feedbacks
          ?.filter((f) => {
            if (filter === "ALL") {
              return !f.archived;
            } else if (filter === "ARCHIVE") {
              return f.archived;
            } else if (filter === f.type) {
              return true;
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
              <li key={feedback.id} className="flex py-4 space-x-3">
                <div className="flex-shrink-0">
                  <p className="p-2 text-sm rounded-full bg-gray-100">
                    {getIcon(feedback.type)}
                  </p>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between">
                    <Text className="italic">{`"${feedback.text}"`}</Text>
                    <Text variant="description" className="flex-shrink-0">
                      {formatDistance(
                        new Date(feedback.createdAt),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}
                    </Text>
                  </div>
                  <div className="grid grid-cols-3">
                    <Text className="font-medium">location</Text>
                    <Text className="col-span-2 font-light text-gray-600">
                      {feedback.location}
                    </Text>
                    <Text className="font-medium">type</Text>
                    <Text className="col-span-2 font-light text-gray-600">
                      {feedback.type}
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
                    <div className="mt-3">
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
