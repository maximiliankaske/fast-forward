import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import Link from "@/components/ui/Link";
import { ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";
import useTemplates from "src/hooks/useTemplates";
import useOrganization from "src/hooks/useOrganization";
import Card from "@/components/survey/Card";
import TemplateEmptyState from "@/components/template/TemplateEmptyState";
import { useRouter } from "next/router";
import LinkContainer from "@/components/common/LinkContainer";
import Badge from "@/components/ui/Badge";

// TODO: Starting a survey will store a survey

const Templates: ComponentWithAuth = () => {
  const router = useRouter();
  const { data: dataOrganization } = useOrganization();
  const { data } = useTemplates();

  return (
    <DefaultUserLayout>
      {(data?.templates || []).length > 0 ? (
        <>
          <div className="mb-6">
            <Link
              href="/app/all-templates"
              className="inline-flex items-center"
            >
              Duplicate Template
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
            {data?.templates.map((template, idx) => (
              <LinkContainer
                key={template.id}
                href={`/app/templates/${template.id}`}
              >
                <LinkContainer.Title className="inline-flex items-center">
                  {template.label}{" "}
                  {template.surveyId && (
                    <Badge color="quantery" className="ml-2">
                      active
                    </Badge>
                  )}
                </LinkContainer.Title>
                <LinkContainer.Description>
                  {template.description}
                </LinkContainer.Description>
              </LinkContainer>
            ))}
          </div>
        </>
      ) : (
        <TemplateEmptyState onClick={() => router.push("/app/all-templates")} />
      )}
    </DefaultUserLayout>
  );
};

Templates.auth = {};

export default Templates;
