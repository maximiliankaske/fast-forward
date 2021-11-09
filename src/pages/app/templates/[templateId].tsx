import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { useAuth } from "@/lib/auth";
import { WithId } from "@/types/index";
import { Template } from "@/types/templates";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const Template: ComponentWithAuth = () => {
  const router = useRouter();
  const { loading, user } = useAuth();
  const { templateId } = router.query;
  const { data, mutate } = useSWR<{ feedbacks: WithId<Template>[] }>(
    !loading && templateId
      ? [
          `/api/organization${user?.customClaims?.organizationId}/template/${templateId}`,
          user?.token,
        ]
      : null,
    fetcher
  );

  console.log(data);

  return <DefaultLayout></DefaultLayout>;
};

Template.auth = {};

export default Template;
