import { ClipboardIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import useSWR from "swr";
import Card from "@/components/feedback/Card";
import Filter from "@/components/feedback/Filter";
import Heading from "@/components/ui/Heading";
import { useAuth } from "@/lib/auth";
import { updateFeedback } from "@/lib/db";
import { Feedback, FeedbackType, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import Link from "@/components/ui/Link";
import toasts from "@/utils/toast";
import { CogIcon } from "@heroicons/react/outline";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import { WidgetProject } from ".prisma/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";

const ProjectPage = ({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [type, setType] = useState<FeedbackType>("all");
  const router = useRouter();
  const { user, loading } = useAuth();
  const projectId = router.query.projectId as string;
  const { data: projectEntry } = useSWR<WidgetProject>(
    `/api/projects/${projectId}`,
    fetcher,
    { fallbackData }
  );

  // fetch data after loading (even though user might be unauthentificated)
  const { data, mutate } = useSWR<{ feedbacks: WithId<Feedback>[] }>(
    !loading && projectId ? [`/api/feedback/${projectId}`, user?.token] : null,
    fetcher
  );

  const getLength = useCallback(
    (type: FeedbackType) =>
      data?.feedbacks.filter((i) => i.type === type && !i.archived).length,
    [data]
  );

  const getArchiveLength = useCallback(
    (value: boolean = true) =>
      data?.feedbacks.filter((i) => (value ? i.archived : !i.archived)).length,
    [data]
  );

  // TODO: FIXME: function seems to be broken
  const handleArchive = useCallback(
    async (id: string, data: Partial<Feedback> & { projectId: string }) => {
      try {
        await toasts.promise(updateFeedback(id, data));
        mutate();
      } catch {
        console.warn("Probably unsufficient authorization");
      }
    },
    [mutate]
  );

  const onClipboard = () => {
    navigator.clipboard
      .writeText(projectId || "")
      .then(() => toasts.success("clipboard"));
  };

  const filterByType = (feedback: WithId<Feedback>) => {
    return type === "archive"
      ? feedback.archived
      : !feedback.archived && (type === "all" || feedback.type === type);
  };

  return (
    <DefaultUserLayout>
      <Heading className="text-center">{projectEntry?.name}</Heading>
      <div className="flex items-center justify-center space-x-1">
        <p className="font-semibold tracking-tight">Project ID:</p>
        <button
          className="flex items-center tracking-wide text-gray-600 rounded dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onClipboard}
        >
          {projectId}
          <ClipboardIcon className="w-4 h-4 ml-1" />
        </button>
      </div>
      <Link
        href={`/app/projects/${projectId}/settings`}
        className="inline-flex items-center text-sm"
      >
        Settings
        <CogIcon className="w-4 h-4 ml-2" />
      </Link>
      <div className="space-y-6">
        <Filter
          types={[
            {
              name: "all",
              count: getArchiveLength(false),
            },
            {
              name: "issue",
              count: getLength("issue"),
            },
            { name: "idea", count: getLength("idea") },
            {
              name: "other",
              count: getLength("other"),
            },
            { name: "archive", count: getArchiveLength() },
          ]}
          activeType={type}
          onChange={setType}
        />
        {data?.feedbacks.filter(filterByType).map((feedback) => (
          <Card
            key={feedback.id}
            feedback={feedback}
            handleArchive={() =>
              handleArchive(feedback.id, {
                projectId: feedback.projectId,
                archived: !feedback.archived,
              })
            }
          />
        ))}
      </div>
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
  });

  return {
    props: {
      fallbackData: entry || undefined,
    },
    // revalidate: 60,
  };
};

export default ProjectPage;
