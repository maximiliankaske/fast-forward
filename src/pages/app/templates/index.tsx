import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Link from "@/components/ui/Link";
import { ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";
import useTemplates from "src/hooks/useTemplates";
import useOrganization from "src/hooks/useOrganization";
import Card from "@/components/survey/Card";
import TempalteEmptyState from "@/components/template/TemplateEmptyState";
import { useRouter } from "next/router";

// TODO: Starting a survey will store a survey

const Templates: ComponentWithAuth = () => {
  const router = useRouter();
  const { data: dataOrganization } = useOrganization();
  const { data } = useTemplates();

  return (
    <DefaultLayout>
      <div className="text-right mb-8">
        <Link href="/app/all-templates" className="inline-flex items-center">
          Duplicate Template
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <ul className="space-y-6">
        {data?.templates && dataOrganization?.organization ? (
          data?.templates.map((template) => {
            return (
              <Card
                key={template.id}
                organization={dataOrganization.organization!}
                {...{ template }}
              />
            );
          })
        ) : (
          <TempalteEmptyState
            onClick={() => router.push("/app/all-templates")}
          />
        )}
      </ul>
    </DefaultLayout>
  );
};

Templates.auth = {};

export default Templates;
