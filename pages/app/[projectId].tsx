import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Card from "../../components/feedback/Card";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Heading from "../../components/ui/Heading";
import { useAuth } from "../../lib/auth";
import type { Feedback, Project, WithId } from "../../types";
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
  console.log(data);
  return (
    <DefaultLayout>
      <Heading>{projectData?.project.name}</Heading>
      {data?.feedbacks.map((feedback) => (
        <Card key={feedback.id} feedback={feedback} />
      ))}
    </DefaultLayout>
  );
};

export default ProjectPage;
