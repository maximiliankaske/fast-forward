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
    <DefaultUserLayout messages={{ projectId: project?.name }}>
      <div className="flex justify-between items-center">
        <div>
          {project?.teamId !== session.data?.user.teamId ? (
            <Badge>team</Badge>
          ) : (
            <Link href={`/app/projects/${projectId}/settings`}>settings</Link>
          )}
        </div>
        <Button onClick={onClipboard} variant="none">
          <span className="font-extralight">id:</span> {projectId}
        </Button>
      </div>
      <div className="flex space-x-3 my-3">
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

export const getServerSideProps = async ({
  req,
  params,
}: GetServerSidePropsContext<{ projectId: string }>) => {
  const session = getSession({ req });
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
      teamId: project?.teamId,
    },
  });

  if (!member) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }

  return {
    props: {
      fallbackData: project || undefined,
    },
  };
};

ProjectPage.auth = {
  role: "member",
};

export default ProjectPage;
