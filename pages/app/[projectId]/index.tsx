import { DuplicateIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import useSWR, { mutate } from "swr";
import Card from "../../../components/feedback/Card";
import Filter from "../../../components/feedback/Filter";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import Heading from "../../../components/ui/Heading";
import { useAuth } from "../../../lib/auth";
import { updateFeedback } from "../../../lib/db";
import { Feedback, FeedbackType, Project, WithId } from "../../../types";
import fetcher from "../../../utils/fetcher";

const ProjectPage = () => {
  const [type, setType] = useState<FeedbackType>(FeedbackType.All);
  const router = useRouter();
  const { user } = useAuth();
  const { projectId } = router.query;
  const { data: projectData } = useSWR<{ project: WithId<Project> }>(
    user && projectId ? [`/api/project/${projectId}`, user.token] : null,
    fetcher
  );
  const { data } = useSWR<{ feedbacks: WithId<Feedback>[] }>(
    projectId ? `/api/feedback/${projectId}` : null,
    fetcher
  );

  const getLength = useCallback(
    (type: FeedbackType) =>
      data?.feedbacks.filter((i) => i.type === type && !i.archived).length,
    [data]
  );

  const getArchiveLength = useCallback(
    () => data?.feedbacks.filter((i) => i.archived).length,
    [data]
  );

  const handleArchive = useCallback(
    async (id: string, data: Partial<Feedback> & { projectId: string }) => {
      try {
        await updateFeedback(id, data);
        mutate(`/api/feedback/${projectId}`);
      } catch {
        throw new Error("update Feedback failed");
      }
    },
    [projectId]
  );
  return (
    <DefaultLayout>
      <Heading className="text-center">{projectData?.project.name}</Heading>
      <p className="text-gray-500 text-center my-6">
        <span className="inline-flex items-center">
          Project ID: {projectId}
          <button className="ml-2">
            <DuplicateIcon className="h-5 w-5" />
          </button>
        </span>
      </p>
      <div className="grid grid-cols-4 gap-6 mt-12">
        <div className="col-span-4 md:col-span-1">
          <Filter
            types={[
              {
                name: FeedbackType.All,
                count: data?.feedbacks.length,
              },
              {
                name: FeedbackType.Issue,
                count: getLength(FeedbackType.Issue),
              },
              { name: FeedbackType.Idea, count: getLength(FeedbackType.Idea) },
              {
                name: FeedbackType.Other,
                count: getLength(FeedbackType.Other),
              },
              { name: FeedbackType.Archive, count: getArchiveLength() },
            ]}
            value={type}
            onChange={setType}
          />
        </div>
        <div className="space-y-6 col-span-4 md:col-span-3">
          {data?.feedbacks
            .filter((f) =>
              type === FeedbackType.Archive
                ? f.archived
                : !f.archived && (type === FeedbackType.All || f.type === type)
            )
            .map((feedback) => (
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
      </div>
    </DefaultLayout>
  );
};

export default ProjectPage;