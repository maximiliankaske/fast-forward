import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import Heading from "@/components/ui/Heading";
import fetcher, { deletor, updator } from "@/utils/fetcher";
import Link from "@/components/ui/Link";
import toasts from "@/utils/toast";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import { Feedback, Project } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import prisma from "@/lib/prisma";
import Button from "@/components/ui/Button";
import { getIcon } from "@/utils/feedback";
import { formatDistance } from "date-fns";
import Text from "@/components/ui/Text";
import parser from "ua-parser-js";
import Badge from "@/components/ui/Badge";
import { getSession, useSession } from "next-auth/react";
import FloatingMenu from "@/components/navigation/FloatingMenu";
import cn from "classnames";

const ProjectPage = ({
  fallbackData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // TODO: instead of state, use type inside url query param
  const [type, setType] = useState("ALL"); // TODO: type!
  const router = useRouter();
  const session = useSession();
  const projectId = router.query.projectId as string;
  const { data: project, mutate } = useSWR<Project & { feedbacks: Feedback[] }>(
    `/api/projects/${projectId}`,
    fetcher,
    { fallbackData }
  );

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

  const onClipboard = () => {
    navigator.clipboard
      .writeText(projectId || "")
      .then(() => toasts.success("clipboard"));
  };

  const ownProject = project?.teamId === session.data?.user.teamId;

  return (
    <DefaultUserLayout messages={{ projectId: project?.name }}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
        <div className="flex items-center justify-between space-x-3">
          <div className="space-x-3">
            {!project?.private ? <Badge>public</Badge> : null}
            {!ownProject ? <Badge>team</Badge> : null}
          </div>
          {ownProject && (
            <Link href={`/app/projects/${projectId}/settings`}>settings</Link>
          )}
        </div>
        <Button onClick={onClipboard} variant="none">
          <span className="font-extralight">id:</span> {projectId}
        </Button>
      </div>
      <ul role="list" className="space-y-4 my-4">
        {project?.feedbacks
          ?.filter((f) => {
            if (type === "ALL") {
              return !f.archived;
            } else if (type === "ARCHIVE") {
              return f.archived;
            } else if (type === "STAR" && f.starred) {
              return true;
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
                <div className="grid sm:grid-cols-3 text-sm">
                  <Text className="font-medium">location</Text>
                  <Text className="col-span-2 font-light text-gray-600 dark:text-gray-400 truncate">
                    {feedback.location}
                  </Text>
                  <Text className="font-medium">user agent</Text>
                  <Text className="col-span-2 font-light text-gray-600 dark:text-gray-400 truncate">
                    {`${ua.browser.name}, ${ua.os.name} ${ua.os.version}`}
                  </Text>
                  {feedback.userId ? (
                    <>
                      <Text className="font-medium">user</Text>
                      <Text className="col-span-2 font-light text-gray-600 dark:text-gray-400 truncate">
                        {feedback.userId}
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
                  <Button
                    onClick={() => handleDelete(feedback.id)}
                    variant="danger2"
                  >
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
              </li>
            );
          })}
      </ul>
      <div className="sticky bottom-6 max-w-max mx-auto">
        <div className="my-6">
          <div className="flex justify-center space-x-2 py-6 px-5 bg-white dark:bg-black rounded-full border border-gray-200 dark:border-gray-800 shadow-md">
            {(["ALL", "ISSUE", "IDEA", "OTHER", "STAR", "ARCHIVE"] as const)
              .map((k) => ({
                label: k.toLowerCase(),
                icon: getIcon(k),
                onClick: () => setType(k),
                active: k === type,
              }))
              ?.map((value, key) => (
                <button
                  key={key}
                  onClick={value.onClick}
                  className={cn(
                    "p-3 -my-3 flex-shrink-0 rounded-full text-sm sm:text-base",
                    value.active
                      ? "bg-gray-100 dark:bg-gray-900"
                      : "hover:bg-gray-50 dark:hover:bg-gray-900"
                  )}
                >
                  {value.icon}
                  <span className="sr-only sm:not-sr-only">{` ${value.label}`}</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </DefaultUserLayout>
  );
};

export const getServerSideProps = async ({
  req,
  params,
}: GetServerSidePropsContext<{ projectId: string }>) => {
  const session = await getSession({ req });
  const project = await prisma.project.findUnique({
    where: {
      id: params?.projectId,
    },
    include: {
      feedbacks: true,
    },
  });

  const member = await prisma.member.findFirst({
    where: {
      userId: session?.user.id,
      teamId: project?.teamId,
    },
  });

  const authorized =
    !project?.private || member || session?.user.id === project?.userId;

  if (!authorized) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fallbackData: project || undefined,
    },
  };
};

// TODO: do **not** uncomment. Otherwise the page will be wrapped by <Auth/>
// ProjectPage.auth = {
//   role: "member",
// };

export default ProjectPage;
