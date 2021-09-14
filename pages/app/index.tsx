import React, { FC } from "react";
import useSWR, { mutate } from "swr";
import Thumbnail from "../../components/app/Thumbnail";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import { useAuth } from "../../lib/auth";
import { createProject } from "../../lib/db";
import { Project, WithId } from "../../types";
import fetcher from "../../utils/fetcher";
import faker from "faker";

const App: FC = () => {
  const { user } = useAuth();
  const { data } = useSWR<{ projects: WithId<Project>[] }>(
    user ? ["/api/projects", user.token] : null,
    fetcher
  );

  const handleCreate = async () => {
    const newSite = {
      authorId: user!.uid,
      name: faker.name.firstName(),
    };
    try {
      await createProject(newSite);
      mutate(["/api/projects", user!.token]);
    } catch {
      throw new Error("create Project failed");
    }
  };

  return (
    <DefaultLayout>
      <Heading>App</Heading>
      {user && (
        <>
          <Button onClick={handleCreate}>Add Project</Button>
          <Heading as="h3" className="mt-6">
            My Projects
          </Heading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data?.projects.map((project, idx) => (
              <Thumbnail key={idx} {...project} />
            ))}
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default App;
