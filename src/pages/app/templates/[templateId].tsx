import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import { useRouter } from "next/router";
import React from "react";
import Card from "@/components/survey/Card";
import useSWR from "swr";
import { Question, Template as TemplateType } from "@prisma/client";
import fetcher from "@/utils/fetcher";

const Template: ComponentWithAuth = () => {
  const router = useRouter();
  const { templateId } = router.query;
  const { data: template, mutate } = useSWR<
    (TemplateType & { questions: Question[] }) | null
  >(`/api/template/${templateId}`, fetcher);

  return (
    <DefaultUserLayout>
      <div>{template && <Card template={template} />}</div>
    </DefaultUserLayout>
  );
};

Template.auth = {};

export default Template;
