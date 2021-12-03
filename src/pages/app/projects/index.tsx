import { PlusIcon } from "@heroicons/react/solid";
import React from "react";
import useSWR from "swr";
import ProjectEmptyState from "@/components/project/ProjectEmptyState";
import type { ComponentWithAuth } from "@/components/auth/Auth";
import Button from "@/components/ui/Button";
import fetcher, { creator } from "@/utils/fetcher";
import toasts from "@/utils/toast";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import LinkContainer from "@/components/common/LinkContainer";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { WidgetProject } from ".prisma/client";

const Projects: ComponentWithAuth = ({
  fallbackData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: entries, mutate } = useSWR<WidgetProject[]>(
    "/api/projects",
    fetcher,
    {
      fallbackData,
    }
  );

  const handleCreate = async () => {
    const newProject = {
      name: `Project #${entries ? entries.length + 1 : 1}`,
    };
    try {
      await toasts.promise(creator("/api/projects", newProject));
      mutate();
    } catch {
      console.warn("Something went wrong");
    }
  };

  return (
    <DefaultUserLayout>
      {entries && entries.length > 0 ? (
        <>
          <Button
            onClick={handleCreate}
            className="inline-flex items-center"
            reverse
          >
            <PlusIcon className="w-5 h-5 mr-1 -ml-1" aria-hidden="true" />
            New Project
          </Button>
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
            {entries?.map((project, idx) => (
              <LinkContainer
                key={project.id}
                href={`/app/projects/${project.id}`}
              >
                <LinkContainer.Title>{project.name}</LinkContainer.Title>
                <LinkContainer.Description>
                  ID: {project.id}
                </LinkContainer.Description>
              </LinkContainer>
            ))}
          </div>
        </>
      ) : (
        <ProjectEmptyState onClick={handleCreate} />
      )}
    </DefaultUserLayout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  const entries = await prisma.widgetProject.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      fallbackData: entries,
    },
  };
}

Projects.auth = {};

export default Projects;
