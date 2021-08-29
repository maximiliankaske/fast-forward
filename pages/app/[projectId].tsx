import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
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
      {data?.feedbacks.map((i) => (
        <p key={i.id}>{i.text}</p>
      ))}
    </DefaultLayout>
  );
};

export default ProjectPage;
