import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import { useAuth } from "@/lib/auth";
import { WithId } from "@/types/index";
import { Template } from "@/types/templates";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Card from "@/components/survey/Card";
import useOrganization from "@/hooks/useOrganization";
import useTemplate from "@/hooks/useTemplate";

const Template: ComponentWithAuth = () => {
  const router = useRouter();
  const { loading, user } = useAuth();
  const { templateId } = router.query;
  const { data: dataOrganization } = useOrganization();
  // access template via SSR!
  const { data, mutate } = useTemplate(templateId as string);

  return (
    <DefaultUserLayout>
      <ul>
        {data?.template && dataOrganization?.organization && (
          <Card
            template={data.template}
            organization={dataOrganization.organization}
          />
        )}
      </ul>
    </DefaultUserLayout>
  );
};

Template.auth = {};

export default Template;
