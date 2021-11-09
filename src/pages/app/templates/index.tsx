import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Link from "@/components/ui/Link";
import { useAuth } from "@/lib/auth";
import { WithId } from "@/types/index";
import { Template } from "@/types/templates";
import fetcher from "@/utils/fetcher";
import { ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";
import useSWR from "swr";

const Templates: ComponentWithAuth = () => {
  const { loading, user } = useAuth();
  const { data } = useSWR<{ templates: WithId<Template>[] }>(
    !loading
      ? [
          `/api/organization/${user?.customClaims?.organizationId}/template`,
          user?.token,
        ]
      : null,
    fetcher
  );

  console.log(data);

  return (
    <DefaultLayout>
      <div className="text-right">
        <Link href="app/all-templates" className="inline-flex items-center">
          Duplicate Template
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
      {data?.templates.map((template) => (
        <div key={template.id}>{template.label}</div>
      ))}
    </DefaultLayout>
  );
};

Templates.auth = {};

export default Templates;
