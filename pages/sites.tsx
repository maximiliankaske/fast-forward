import React, { FC } from "react";
import useSWR from "swr";
import DefaultLayout from "../components/layout/DefaultLayout";
import Button from "../components/ui/Button";
import { useAuth } from "../lib/auth";
import { createSite, deleteSite, updateSite } from "../lib/db";
import { Site, WithId } from "../types";
import fetcher from "../utils/fetcher";

const Sites: FC = () => {
  const { user } = useAuth();
  const { data, mutate } = useSWR<{ sites: WithId<Site>[] }>(
    user ? ["/api/sites", user.token] : null,
    fetcher
  );

  const handleCreateSite = async () => {
    const newSite = {
      authorId: user!.uid,
      url: `${Math.random() * 100}`,
    };
    try {
      await createSite(newSite);
      mutate();
    } catch {
      throw new Error("create Site failed");
    }
  };

  const handleUpdateSite = async (id: string) => {
    try {
      await updateSite(id, { url: `${Math.random() * 100}` });
      mutate();
    } catch {
      throw new Error("update Site failed");
    }
  };

  const handleDeleteSite = async (id: string) => {
    try {
      await deleteSite(id);
      mutate();
    } catch {
      throw new Error("delete Site failed");
    }
  };

  return (
    <DefaultLayout>
      {user && (
        <>
          <p>{user?.email}</p>
          <Button onClick={handleCreateSite}>Add random Site</Button>
          <h1>My Sites</h1>
          {data?.sites.map((i, idx) => (
            <div key={idx} className="flex space-x-3">
              <p>{i.url}</p>
              <button onClick={() => handleUpdateSite(i.id)}>update</button>
              <button onClick={() => handleDeleteSite(i.id)}>delete</button>
            </div>
          ))}
        </>
      )}
    </DefaultLayout>
  );
};

export default Sites;
