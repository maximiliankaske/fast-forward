import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState, FormEvent } from "react";
import useSWR, { mutate } from "swr";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import Heading from "../../../components/ui/Heading";
import { useAuth } from "../../../lib/auth";
import { deleteProject, updateProject } from "../../../lib/db";
import { Project, WithId } from "../../../types";
import fetcher from "../../../utils/fetcher";
import { feedbackErrorToast } from "../../../utils/toasts";
import Link from "../../../components/ui/Link";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Switch from "../../../components/ui/Switch";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";

const Settings = () => {
  const [publically, setPublically] = useState(true);
  const [name, setName] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const { projectId } = router.query;

  const { data } = useSWR<{ project: WithId<Project> }>(
    user && projectId ? [`/api/project/${projectId}`, user.token] : null,
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
        // FIXME: make sure that the page is accessed only if data exist
        await updateProject(data!.project.id, { name });
        mutate([`/api/project/${projectId}`, user!.token]);
      } catch {
        feedbackErrorToast();
      }
    },
    [projectId, user, data, name]
  );

  const handleUpdateAccessibility = useCallback(async () => {
    try {
      await updateProject(data!.project.id, {
        private: publically,
      });
      mutate([`/api/project/${projectId}`, user!.token]);
    } catch {
      feedbackErrorToast();
    }
  }, [publically, data, projectId, user]);

  const handleDelete = useCallback(async () => {
    try {
      // FIXME: make sure that the page is accessed only if data exist
      await deleteProject(data!.project.id);
      router.replace("/app");
    } catch {
      feedbackErrorToast();
    }
  }, [router, data]);

  return (
    <DefaultLayout>
      <Heading as="h2">Settings</Heading>
      <Link href="/app" className="inline-flex items-center text-sm mt-4 mb-8">
        <ArrowLeftIcon className="h-3 w-3 mr-2" />
        Back to the list
      </Link>
      <div className="space-y-8">
        <form
          className="border rounded-md overflow-hidden"
          onSubmit={handleUpdateName}
        >
          <div className="p-5 space-y-1">
            <h2 className="text-lg leading-6 font-medium">Project settings</h2>
            <p className="text-sm text-gray-500">
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
          <div className="py-3 px-5 bg-gray-50 dark:bg-gray-900 border-t text-right">
            <Button
              type="submit"
              disabled={data?.project.name === name}
              reverse
            >
              Save
            </Button>
          </div>
        </form>
        {/* TODO: Missing functionality */}
        <div className="border rounded-md overflow-hidden">
          <div className="p-5 space-y-1">
            <h2 className="text-lg leading-6 font-medium">
              Team settings (alpha)
            </h2>
            <p className="text-sm text-gray-500">
              Add team members to access the project.
            </p>
            <div>
              <div className="flex justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden bg-gray-100">
                    {user?.photoUrl && (
                      <Image src={user.photoUrl} alt="profile" layout="fill" />
                    )}
                  </div>
                  <p className="truncate">{user?.email}</p>
                </div>
                <Badge>Member</Badge>
              </div>
            </div>
          </div>
          <div className="py-3 px-5 bg-gray-50 dark:bg-gray-900 border-t flex justify-between items-end">
            <Input
              label="Email"
              name="email"
              placeholder="collegue@company.com"
              className="w-56 sm:w-72 text-sm"
              srOnly
            />
            <Button reverse>Save</Button>
          </div>
        </div>
        <div className="border rounded-md border-indigo-500 dark:bg-gray-900">
          <div className="py-3 px-5 flex justify-between items-center">
            <div>
              <h2 className="text-lg leading-6 font-medium">
                Project Accessibility
              </h2>
              <p className="text-sm text-gray-500">
                Your project is currently set to:{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {publically
                    ? "public (everyone with the link can access it)"
                    : "private (only member have access)"}
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
        <div className="border rounded-md border-red-500 dark:bg-gray-900">
          <div className="py-3 px-5 flex justify-between items-center">
            <div>
              <h2 className="text-lg leading-6 font-medium">Delete Project</h2>
              <p className="text-sm text-gray-500">
                Please note that this is not reversable. Be certain.
              </p>
            </div>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
              reverse
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
