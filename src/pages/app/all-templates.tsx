import React from "react";
import templates from "@/config/templates";
import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Thumbnail from "@/components/template/Thumbnail";
import useOrganization from "src/hooks/useOrganization";
import { updateOrganization } from "@/lib/db";
import Link from "@/components/ui/Link";
import { ArrowRightIcon } from "@heroicons/react/solid";

// THIS PAGE IS NOT PROTECTED

const Templates: ComponentWithAuth = () => {
  const { data, mutate } = useOrganization();

  const onClick = (template: string) => {
    const { id, ...organization } = data?.organization || {};
    if (id) {
      updateOrganization(id, {
        ...organization,
        activeTemplate: template,
      });
      mutate();
    }
  };

  return (
    <DefaultLayout>
      <div className="text-right pb-6">
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
                active={key === data?.organization?.activeTemplate}
                onClick={() => onClick(key)}
              />
            </li>
          );
        })}
      </ul>
    </DefaultLayout>
  );
};

export default Templates;
