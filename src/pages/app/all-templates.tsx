import React from "react";
import templates from "@/config/templates";
import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Template from "@/components/template/Template";
import useOrganization from "src/hooks/useOrganization";
import { updateOrganization } from "@/lib/db";

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
      <ul className="space-y-4">
        {Object.keys(templates).map((key) => {
          const template = templates[key];
          return (
            <li key={key}>
              <Template
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
