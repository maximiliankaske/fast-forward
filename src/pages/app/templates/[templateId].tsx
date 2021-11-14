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

const Template: ComponentWithAuth = () => {
  const router = useRouter();
  const { templateId } = router.query;
  // access template via SSR!
  const { data: dataOrganization } = useOrganization();
  const { data } = useTemplate(templateId as string);
  const { data: dataSurveyMembers } = useSurveyMembers(
    data?.template?.surveyId as string
  );

  console.log(data?.template);

  // TODO: If no current survey is active,
  // show latest one!

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
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {data?.template &&
          dataSurveyMembers?.sessions &&
          data.template.questions.map((question) => (
            <AnswerCard
              key={question.id}
              answers={dataSurveyMembers?.sessions
                .map((session) => session.answers[question.id])
                .filter((session) => !!session)}
              {...{ question }}
            />
          ))}
      </div>
    </DefaultUserLayout>
  );
};

Template.auth = {};

export default Template;
