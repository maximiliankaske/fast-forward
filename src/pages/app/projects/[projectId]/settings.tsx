import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState, FormEvent } from "react";
import useSWR from "swr";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import Heading from "@/components/ui/Heading";
import { useAuth } from "@/lib/auth";
import { deleteProject, updateProject, resetProject } from "@/lib/db";
import { Project, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import Link from "@/components/ui/Link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import toasts from "@/utils/toast";
import { ComponentWithAuth } from "@/components/auth/Auth";
import Breadcrumbs from "@/components/common/Breadcrumbs";

// TODO: remove publically as state - use the data.project.private boolean
// Problem: on first render of the Switch Component - it will have no data and so the wrong value
// Create Indicator and fetch dat first

const Settings: ComponentWithAuth = () => {
  const [publically, setPublically] = useState(true);
  const [name, setName] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const { projectId } = router.query;

  const { data, mutate } = useSWR<{ project: WithId<Project> }>(
    user && projectId ? [`/api/projects/${projectId}`, user.token] : null,
    fetcher
  );

  useEffect(() => {
    if (data?.project) {
      setName(data.project.name);
      setPublically(!data.project.private);
    }
  }, [data]);

  const handleUpdateName = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        await toasts.promise(updateProject(data!.project.id, { name }));
        mutate();
      } catch {
        console.warn("Something went wrong");
      }
    },
    [mutate, data, name]
  );

  const handleUpdateAccessibility = useCallback(async () => {
    try {
      await toasts.promise(
        updateProject(data!.project.id, {
          private: publically,
        })
      );
      mutate();
    } catch {
      console.warn("Something went wrong");
    }
  }, [publically, data, mutate]);

  const handleDelete = useCallback(async () => {
    try {
      // FIXME: make sure that the page is accessed only if data exist
      await toasts.promise(deleteProject(data!.project.id));
      router.replace("/app");
    } catch {
      console.warn("Something went wrong");
    }
  }, [router, data]);

  const handleReset = useCallback(() => {
    resetProject(data!.project.id);
    toasts.success();
  }, [data]);

  // TODO: use breadcrump home / projects / settings
  return (
    <DefaultUserLayout>
      <div className="pb-12">
        <Breadcrumbs />
      </div>
      <Heading as="h2">Settings</Heading>
      <div className="space-y-8 pt-6">
        <form
          className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden"
          onSubmit={handleUpdateName}
        >
          <div className="p-5 space-y-1">
            <h2 className="text-lg leading-6 font-medium">Project settings</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Update your billing information. Please note that updating your
              location could affect your tax rates.
            </p>
            <Input
              name="name"
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="py-3 px-5 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-right">
            <Button
              type="submit"
              disabled={data?.project.name === name}
              reverse
            >
              Save
            </Button>
          </div>
        </form>
        <div className="border rounded-md border-indigo-500 dark:bg-gray-900 py-3 px-5 divide-y space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg leading-6 font-medium">
                Project Accessibility
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your project is currently set to:{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {publically
                    ? "public (everyone with the link can access it)"
                    : "private (only you have access)"}
                </span>
              </p>
            </div>
            <Switch
              checked={publically}
              onChange={handleUpdateAccessibility}
              label="Enable public project"
            />
          </div>
        </div>
        <div className="border rounded-md border-red-500 dark:bg-gray-900 py-3 px-5 divide-y divide-gray-200 dark:divide-gray-800 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg leading-6 font-medium">Reset Project</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Removes all feedbacks but keeps the configuration.
              </p>
            </div>
            <Button
              onClick={() => {
                const res = confirm("Reset Project?");
                if (res) {
                  handleReset();
                }
              }}
              deconstruct
            >
              Reset
            </Button>
          </div>
          <div className="flex justify-between items-center pt-3">
            <div>
              <h2 className="text-lg leading-6 font-medium">Delete Project</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please note that this is not reversable. Be certain.
              </p>
            </div>
            <Button
              onClick={() => {
                const res = confirm("Delete Project?");
                if (res) {
                  handleDelete();
                }
              }}
              deconstruct
              reverse
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </DefaultUserLayout>
  );
};

// Settings.auth = {};

export default Settings;
