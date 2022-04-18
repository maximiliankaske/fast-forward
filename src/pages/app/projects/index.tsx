import React from "react";
import useSWR from "swr";
import type { ComponentWithAuth } from "@/components/auth/Auth";
import Button from "@/components/ui/Button";
import fetcher, { creator } from "@/utils/fetcher";
import toasts from "@/utils/toast";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import LinkContainer from "@/components/common/LinkContainer";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { WidgetProject, Feedback } from ".prisma/client";
import { FolderAddIcon } from "@heroicons/react/outline";
import EmptyState from "@/components/common/EmptyState";
import { formatDistance } from "date-fns";

const Projects: ComponentWithAuth = ({
  fallbackData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: projects, mutate } = useSWR<
    (WidgetProject & { feedbacks: Feedback[] })[]
  >("/api/projects", fetcher, {
    fallbackData,
  });

  const words = ["pencil", "hands", "dog", "soup", "hat"];
  const emojis = ["🎨", "🧤", "👟", "🙈", "🐷", "🍄"];

  const handleCreate = async () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newProject = {
      name: `${randomWord} ${randomEmoji}`,
    };
    try {
      // FIXME: even on error, it will succeed
      await toasts.promise(creator("/api/projects", newProject));
      mutate();
    } catch {
      console.warn("Something went wrong");
    }
  };

  return (
    <DefaultUserLayout>
      {projects && projects.length > 0 ? (
        <>
          <Button onClick={handleCreate} variant="primary">
            new project
          </Button>
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
            {projects?.map((project, idx) => {
              console.log(project?.feedbacks);
              const feedbacks =
                project.feedbacks?.sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                ) || [];
              return (
                <LinkContainer
                  key={project.id}
                  href={`/app/projects/${project.id}`}
                >
                  <LinkContainer.Title>{project.name}</LinkContainer.Title>
                  <LinkContainer.Description>
                    last feedback{" "}
                    <span className="italic">
                      {feedbacks.length > 0
                        ? formatDistance(
                            new Date(feedbacks[0].createdAt),
                            new Date(),
                            {
                              addSuffix: true,
                            }
                          )
                        : "missing"}
                    </span>
                  </LinkContainer.Description>
                </LinkContainer>
              );
            })}
          </div>
        </>
      ) : (
        <EmptyState
          title={"No projects"}
          description="Get started by creating a new project."
          onClick={handleCreate}
          buttonTitle={"New Project"}
          icon={FolderAddIcon}
        />
      )}
    </DefaultUserLayout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  const projects = await prisma.widgetProject.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      feedbacks: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return {
    props: {
      fallbackData: projects,
    },
  };
}

Projects.auth = {};

export default Projects;
