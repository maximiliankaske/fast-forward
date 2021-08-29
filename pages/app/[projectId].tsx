import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Heading from "../../components/ui/Heading";
import { useAuth } from "../../lib/auth";
import type { Project, WithId } from "../../types";
import fetcher from "../../utils/fetcher";

const ProjectPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { projectId } = router.query;
  const { data } = useSWR<{ project: WithId<Project> }>(
    user && projectId ? [`/api/project/${projectId}`, user.token] : null,
    fetcher
  );
  return (
    <DefaultLayout>
      <Heading>{data?.project.name}</Heading>
    </DefaultLayout>
  );
};

export default ProjectPage;
