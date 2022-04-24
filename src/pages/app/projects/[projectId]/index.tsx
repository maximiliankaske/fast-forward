import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Link from "@/components/ui/Link";
import toasts from "@/utils/toast";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import { Feedback, Project } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import prisma from "@/lib/prisma";
import Button from "@/components/ui/Button";
import { getIcon } from "@/utils/feedback";
import Badge from "@/components/ui/Badge";
import { getSession, useSession } from "next-auth/react";
import cn from "classnames";
import Card from "@/components/feedback/Card";
import Banner from "@/components/common/Banner";

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

  const onClipboard = () => {
    navigator.clipboard
      .writeText(projectId || "")
      .then(() => toasts.success("clipboard"));
  };

  const ownProject = project?.teamId === session.data?.user.teamId;

  return (
    <DefaultUserLayout messages={{ projectId: project?.name }}>
      <Banner id="new-to-projects" className="mb-4">
        <Banner.Title>{`Want to try it out now?`}</Banner.Title>
        <Banner.Description>
          {`Click the 'feedback' button on the top right corner inside one of your projects to automatically send a feedback to yourself!`}
        </Banner.Description>
      </Banner>
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
            return (
              <li key={feedback.id}>
                <Card {...{ feedback }} />
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
