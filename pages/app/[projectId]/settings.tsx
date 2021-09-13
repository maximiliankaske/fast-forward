import { useRouter } from "next/router";
import React, { useCallback } from "react";
import useSWR, { mutate } from "swr";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import Button from "../../../components/ui/Button";
import Heading from "../../../components/ui/Heading";
import { useAuth } from "../../../lib/auth";
import { deleteProject, updateProject } from "../../../lib/db";
import { Project, WithId } from "../../../types";
import fetcher from "../../../utils/fetcher";
import faker from "faker";
import Input from "../../../components/ui/Input";

const Settings = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { projectId } = router.query;

  const { data } = useSWR<{ project: WithId<Project> }>(
    user && projectId ? [`/api/project/${projectId}`, user.token] : null,
    fetcher
  );

  const handleUpdate = useCallback(
    async (id: string, data: Partial<Project>) => {
      try {
        await updateProject(id, data);
        mutate([`/api/project/${projectId}`, user!.token]);
      } catch {
        throw new Error("update Project failed");
      }
    },
    [projectId, user]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteProject(id);
        router.replace("/app");
      } catch {
        throw new Error("delete Project failed");
      }
    },
    [router]
  );

  return (
    <DefaultLayout>
      <Heading>Settings</Heading>
      <div className="border rounded-md">
        <div className="py-3 px-5">
          <Input name="name" label="Name" />
        </div>
        <div className="py-3 px-5 bg-gray-50 border-t text-right">
          <Button>Save</Button>
        </div>
      </div>
      {data && (
        <div>
          <p>{data.project.name}</p>
          <Button
            onClick={() =>
              handleUpdate(data.project.id, { name: faker.name.firstName() })
            }
          >
            Random Name
          </Button>
          <Button onClick={() => handleDelete(data.project.id)}>
            Delete Project
          </Button>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Settings;
