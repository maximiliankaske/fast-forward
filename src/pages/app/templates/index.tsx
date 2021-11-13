import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import IconButton from "@/components/ui/IconButton";
import Input from "@/components/ui/Input";
import Link from "@/components/ui/Link";
import { useAuth } from "@/lib/auth";
import { deleteTemplate, updateOrganization, updateTemplate } from "@/lib/db";
import { ArrowRightIcon, XIcon } from "@heroicons/react/solid";
import { TrashIcon, BellIcon, ClockIcon } from "@heroicons/react/outline";
import React from "react";
import useTemplates from "src/hooks/useTemplates";
import useOrganization from "src/hooks/useOrganization";
import cn from "classnames";
import Card from "@/components/survey/Card";
import TempalteEmptyState from "@/components/template/TemplateEmptyState";
import { useRouter } from "next/router";

// TODO: Starting a survey will store a survey

const Templates: ComponentWithAuth = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data: dataOrganization, mutate: mutateOrganization } =
    useOrganization();
  const { data, mutate } = useTemplates();

  return (
    <DefaultLayout>
      <div className="text-right mb-8">
        <Link href="/app/all-templates" className="inline-flex items-center">
          Duplicate Template
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <ul className="space-y-6">
        {data?.templates && data?.templates.length > 0 ? (
          data?.templates.map((template) => {
            const organizationId = user!.customClaims!.organizationId;
            return <Card key={template.id} {...{ organizationId, template }} />;
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
