import { ArrowLeftIcon, ClipboardIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import useSWR from "swr";
import Card from "@/components/feedback/Card";
import Filter from "@/components/feedback/Filter";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import { useAuth } from "@/lib/auth";
import { updateFeedback } from "@/lib/db";
import { Feedback, FeedbackType, Project, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import Link from "@/components/ui/Link";
import toasts from "@/utils/toast";

const ProjectPage = () => {
  const [type, setType] = useState<FeedbackType>("all");
  const router = useRouter();
  const { user, loading } = useAuth();
  const projectId = router.query.projectId as string;
  const { data: projectData } = useSWR<{ project: WithId<Project> }>(
    !loading && projectId ? [`/api/projects/${projectId}`, user?.token] : null,
    fetcher
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
    <DefaultLayout className="space-y-6">
      <Heading className="text-center">{projectData?.project.name}</Heading>
      <div className="flex items-center justify-center space-x-1">
        <p className="font-semibold tracking-tight">Project ID:</p>
        <button
          className="flex items-center rounded tracking-wide text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onClipboard}
        >
          {projectId}
          <ClipboardIcon className="ml-1 h-4 w-4" />
        </button>
      </div>
      <Link href="/app" className="inline-flex items-center text-sm">
        <ArrowLeftIcon className="h-3 w-3 mr-2" />
        Back to the list
      </Link>
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
    </DefaultLayout>
  );
};

export default ProjectPage;
