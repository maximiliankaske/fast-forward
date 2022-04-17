import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import useSWR from "swr";
import Card from "@/components/feedback/Card";
import Filter from "@/components/feedback/Filter";
import Heading from "@/components/ui/Heading";
import { WithId } from "@/types/index";
import fetcher, { updator } from "@/utils/fetcher";
import Link from "@/components/ui/Link";
import toasts from "@/utils/toast";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import { Feedback, FeedbackType, WidgetProject } from ".prisma/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";

const ProjectPage = ({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // TODO: instead of state, use type inside url query param
  const [type, setType] = useState<FeedbackType | "ALL" | "ARCHIVE">("ALL");
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const { data: project, mutate } = useSWR<
    WidgetProject & { feedbacks: Feedback[] }
  >(`/api/projects/${projectId}`, fetcher, { fallbackData });

  const getLength = useCallback(
    (type: FeedbackType) =>
      project?.feedbacks?.filter((i) => i.type === type && !i.archived).length,
    [project?.feedbacks]
  );

  const getArchiveLength = useCallback(
    (value: boolean = true) =>
      project?.feedbacks?.filter((i) => (value ? i.archived : !i.archived))
        .length,
    [project?.feedbacks]
  );

  const handleArchive = useCallback(
    async (id: string, data: Partial<Feedback>) => {
      try {
        // TODO: should be `feedbacks`
        toasts.promise(
          updator<Feedback>(`/api/feedback/${id}`, data).then(() => mutate())
        );
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
    return type === "ARCHIVE"
      ? feedback.archived
      : !feedback.archived && (type === "ALL" || feedback.type === type);
  };

  return (
    <DefaultUserLayout>
      <Heading>{project?.name}</Heading>
      <div className="flex items-center space-x-1">
        <button
          className="flex items-center tracking-wide text-gray-600 rounded dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onClipboard}
        >
          {projectId}
        </button>
      </div>
      <Link
        href={`/app/projects/${projectId}/settings`}
        className="inline-flex items-center text-sm"
      >
        Settings
      </Link>
      <div className="space-y-6">
        <Filter
          types={[
            {
              name: "ALL",
              count: getArchiveLength(false),
            },
            {
              name: "ISSUE",
              count: getLength("ISSUE"),
            },
            { name: "IDEA", count: getLength("IDEA") },
            {
              name: "OTHER",
              count: getLength("OTHER"),
            },
            { name: "ARCHIVE", count: getArchiveLength() },
          ]}
          activeType={type}
          onChange={setType}
        />
        {project?.feedbacks?.filter(filterByType).map((feedback) => (
          <Card
            key={feedback.id}
            feedback={feedback}
            handleArchive={() =>
              handleArchive(feedback.id, {
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
