import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import { Template } from "@/types/templates";
import { useRouter } from "next/router";
import React from "react";
import Card from "@/components/survey/Card";
import useOrganization from "@/hooks/useOrganization";
import useTemplate from "@/hooks/useTemplate";
import useSurveyMembers from "@/hooks/useSurveyMembers";
import useOrganizationMembers from "@/hooks/useOrganizationMembers";
import Answers from "@/components/survey/Answers";
import AnswerCard from "@/components/survey/AnswerCard";
import Heading from "@/components/ui/Heading";
import useSurveys from "@/hooks/useSurveys";
import Archived from "@/components/survey/Archived";

const Template: ComponentWithAuth = () => {
  const router = useRouter();
  const { templateId } = router.query;
  // access template via SSR!
  const { data: dataOrganization } = useOrganization();
  const { data: dataSurveys } = useSurveys();
  const { data: dataTemplate } = useTemplate(templateId as string);
  const { data: dataSurveyMembers } = useSurveyMembers(
    dataTemplate?.template?.surveyId as string
  );

  // TODO: If no current survey is active,
  // show latest one!

  return (
    <DefaultUserLayout>
      <div>
        {dataTemplate?.template && dataOrganization?.organization && (
          <Card
            template={dataTemplate.template}
            organization={dataOrganization.organization}
          />
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-6 my-6">
        {dataTemplate?.template &&
          dataSurveyMembers?.sessions &&
          dataTemplate.template.questions.map((question) => (
            <AnswerCard
              key={question.id}
              answers={dataSurveyMembers?.sessions
                .map((session) => session.answers[question.id])
                .filter((session) => !!session)}
              {...{ question }}
            />
          ))}
      </div>
      <Heading as="h4">Archived</Heading>
      <div className="space-y-2 my-3">
        {dataSurveys?.surveys
          .filter((s) => s.cancelled)
          .map((s) => (
            <Archived key={s.id} survey={s} />
          ))}
      </div>
    </DefaultUserLayout>
  );
};

Template.auth = {};

export default Template;
