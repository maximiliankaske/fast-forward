import { ArrowRightIcon, PlusIcon } from "@heroicons/react/solid";
import React from "react";
import useSWR from "swr";
import EmptyState from "@/components/app/EmptyState";
import Thumbnail from "@/components/app/Thumbnail";
import type { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { useAuth } from "@/lib/auth";
import { createProject } from "@/lib/db";
import { Project, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import toasts from "@/utils/toast";
import Link from "@/components/ui/Link";

const App: ComponentWithAuth = () => {
  const { user } = useAuth();
  const { data, mutate } = useSWR<{ projects: WithId<Project>[] }>(
    user ? ["/api/projects", user.token] : null,
    fetcher
  );

  const handleCreate = async () => {
    const newProject = {
      authorId: user!.uid,
      name: `Project #${data?.projects ? data.projects.length + 1 : 1}`,
      private: true,
    };
    try {
      await toasts.promise(createProject(newProject));
      mutate();
    } catch {
      console.warn("Something went wrong");
    }
  };

  return (
    <DefaultLayout>
      <Heading as="h2">Dashboard</Heading>
      <div className="text-right">
        <Link href="/app/organization" className="inline-flex items-center">
          My Organization
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </Link>
      </div>
      {user && (
        <div className="space-y-6 mt-6">
          {data?.projects && data.projects.length > 0 ? (
            <>
              <Button
                onClick={handleCreate}
                className="inline-flex items-center"
                reverse
              >
                <PlusIcon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
                New Project
              </Button>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {data?.projects.map((project, idx) => (
                  <Thumbnail key={idx} {...project} />
                ))}
              </div>
            </>
          ) : (
            <EmptyState onClick={handleCreate} />
          )}
        </div>
      )}
    </DefaultLayout>
  );
};

App.auth = {};

export default App;
