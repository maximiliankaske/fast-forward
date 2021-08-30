import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Card from "../../components/feedback/Card";
import Filter from "../../components/feedback/Filter";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Heading from "../../components/ui/Heading";
import { useAuth } from "../../lib/auth";
import { Feedback, FeedbackType, Project, WithId } from "../../types";
import fetcher from "../../utils/fetcher";

const ProjectPage = () => {
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

  return (
    <DefaultLayout>
      <Heading>{projectData?.project.name}</Heading>
      <div className="grid grid-cols-4 gap-6 mt-12">
        <div className="col-span-4 md:col-span-1">
          <Filter
            types={[
              { name: FeedbackType.All, count: 10 },
              { name: FeedbackType.Issue, count: 10 },
              { name: FeedbackType.Idea, count: 10 },
            ]}
          />
        </div>
        <div className="space-y-6 col-span-4 md:col-span-3">
          {data?.feedbacks.map((feedback) => (
            <Card key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProjectPage;
