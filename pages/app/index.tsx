import React, { FC } from "react";
import useSWR, { mutate } from "swr";
import Thumbnail from "../../components/app/Thumbnail";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import Link from "../../components/ui/Link";
import { useAuth } from "../../lib/auth";
import { createProject, deleteProject, updateProject } from "../../lib/db";
import { Project, WithId } from "../../types";
import fetcher from "../../utils/fetcher";

const App: FC = () => {
  const { user } = useAuth();
  const { data } = useSWR<{ projects: WithId<Project>[] }>(
    user ? ["/api/projects", user.token] : null,
    fetcher
  );

  const handleCreate = async () => {
    const newSite = {
      authorId: user!.uid,
      name: `${Math.random() * 100}`,
    };
    try {
      await createProject(newSite);
      mutate(["/api/projects", user!.token]);
    } catch {
      throw new Error("create Project failed");
    }
  };

  const handleUpdateProject = async (id: string) => {
    try {
      await updateProject(id, { name: `${Math.random() * 100}` });
      mutate(["/api/projects", user!.token]);
    } catch {
      throw new Error("update Project failed");
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
      mutate(["/api/projects", user!.token]);
    } catch {
      throw new Error("delete Project failed");
    }
  };

  return (
    <DefaultLayout>
      <Heading>App</Heading>
      {user && (
        <>
          <Button onClick={handleCreate}>Add random Project</Button>
          <Heading as="h3" className="mt-6">
            My Projects
          </Heading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data?.projects.map((project, idx) => (
              <Thumbnail key={idx} {...project} />
            ))}
          </div>
          <hr className="my-10" />
          {data?.projects.map((i, idx) => (
            <div key={idx} className="flex space-x-3">
              <p>{i.name}</p>
              <button onClick={() => handleUpdateProject(i.id)}>update</button>
              <button onClick={() => handleDeleteProject(i.id)}>delete</button>
              <Link href={`/app/${i.id}`}>view</Link>
            </div>
          ))}
        </>
      )}
    </DefaultLayout>
  );
};

export default App;
