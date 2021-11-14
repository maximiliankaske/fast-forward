import React from "react";
import templates from "@/config/templates";
import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import Thumbnail from "@/components/template/Thumbnail";
import useOrganization from "src/hooks/useOrganization";
import { updateOrganization } from "@/lib/db";
import Link from "@/components/ui/Link";
import { ArrowRightIcon } from "@heroicons/react/solid";

// THIS PAGE IS NOT PROTECTED

const Templates: ComponentWithAuth = () => {
  const { data, mutate } = useOrganization();

  const onClick = (templateId: string) => {
    if (data?.organization?.id) {
      updateOrganization(data?.organization.id, {
        activeTemplates: data.organization.activeTemplates?.includes(templateId)
          ? data.organization.activeTemplates.filter(
              (key) => key !== templateId
            )
          : [...(data.organization.activeTemplates || []), templateId],
      });
      mutate();
    }
  };

  return (
    <DefaultUserLayout>
      <div className="pb-6">
        <Link href="/app/templates" className="inline-flex items-center">
          My Templates
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <ul className="space-y-4">
        {Object.keys(templates).map((key) => {
          const template = templates[key];
          return (
            <li key={key}>
              <Thumbnail
                {...template}
                active={data?.organization?.activeTemplates?.includes(key)}
                onClick={() => onClick(key)}
              />
            </li>
          );
        })}
      </ul>
    </DefaultUserLayout>
  );
};

export default Templates;
