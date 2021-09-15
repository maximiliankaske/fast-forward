import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState, FormEvent } from "react";
import useSWR, { mutate } from "swr";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import Button from "../../../components/ui/Button";
import Heading from "../../../components/ui/Heading";
import { useAuth } from "../../../lib/auth";
import { deleteProject, updateProject } from "../../../lib/db";
import { Project, WithId } from "../../../types";
import fetcher from "../../../utils/fetcher";
import Input from "../../../components/ui/Input";
import Badge from "../../../components/ui/Badge";

const Settings = () => {
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
    }
  }, [data]);

  const handleUpdate = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        // FIXME: make sure that the page is accessed only if data exist
        await updateProject(data!.project.id, { name });
        mutate([`/api/project/${projectId}`, user!.token]);
      } catch {
        throw new Error("update Project failed");
      }
    },
    [projectId, user, data, name]
  );

  const handleDelete = useCallback(async () => {
    try {
      // FIXME: make sure that the page is accessed only if data exist
      await deleteProject(data!.project.id);
      router.replace("/app");
    } catch {
      throw new Error("delete Project failed");
    }
  }, [router, data]);

  return (
    <DefaultLayout>
      <Heading as="h2">Settings</Heading>
      <div className="space-y-8 mt-8">
        <form className="border rounded-md" onSubmit={handleUpdate}>
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
          <div className="py-3 px-5 bg-gray-50 border-t text-right">
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
        <div className="border rounded-md">
          <div className="p-5 space-y-1">
            <h2 className="text-lg leading-6 font-medium">Team settings</h2>
            <p className="text-sm text-gray-500">
              Add team members to access the project.
            </p>
            <div>
              <div className="flex justify-between mt-2">
                <p className="truncate">{user?.email}</p>
                <Badge>Member</Badge>
              </div>
            </div>
          </div>
          <div className="py-3 px-5 bg-gray-50 border-t flex justify-between items-end">
            <Input
              label="Email"
              name="email"
              placeholder="collegue@company.com"
              className="w-72 text-sm"
              srOnly
            />
            <Button reverse>Save</Button>
          </div>
        </div>
        <div className="border rounded-md border-red-500">
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
