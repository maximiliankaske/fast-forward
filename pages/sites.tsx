import React, { FC } from "react";
import useSWR, { mutate } from "swr";
import DefaultLayout from "../components/layout/DefaultLayout";
import Button from "../components/ui/Button";
import { useAuth } from "../lib/auth";
import { createSite } from "../lib/db";
import { Site, WithId } from "../types";
import fetcher from "../utils/fetcher";

const Sites: FC = () => {
  const { user } = useAuth();
  const { data } = useSWR<{ sites: WithId<Site>[] }>(
    user ? ["/api/sites", user.token] : null,
    fetcher
  );

  const handleCreateSite = () => {
    const newSite = {
      authorId: user!.uid,
      url: `${Math.random() * 100} test`,
    };
    const { id } = createSite(newSite);
    mutate(
      ["/api/sites", user!.token],
      async (data: { sites: WithId<Site>[] }) => ({
        sites: [{ id, ...newSite }, ...data.sites],
      }),
      false
    );
  };

  return (
    <DefaultLayout>
      {user && (
        <>
          <p>{user?.email}</p>
          <Button onClick={handleCreateSite}>Add random Site</Button>
          <h1>My Sites</h1>
          {data?.sites.map((i, idx) => (
            <p key={idx}>{i.url}</p>
          ))}
        </>
      )}
    </DefaultLayout>
  );
};

export default Sites;
