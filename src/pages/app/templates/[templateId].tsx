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

const Template: ComponentWithAuth = () => {
  const router = useRouter();
  const { templateId } = router.query;
  // access template via SSR!
  const { data: dataOrganization } = useOrganization();
  const { data: dataOrganizationMembers } = useOrganizationMembers();
  const { data } = useTemplate(templateId as string);
  const { data: dataSurveyMembers } = useSurveyMembers(
    data?.template?.surveyId as string
  );

  console.log(dataSurveyMembers);

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
      {data?.template &&
        dataSurveyMembers?.sessions.map((session) => {
          return (
            <Answers
              key={session.id}
              session={session}
              template={data.template}
              member={dataOrganizationMembers?.members.find(
                ({ id }) => session.id === id
              )}
            />
          );
        })}
    </DefaultUserLayout>
  );
};

Template.auth = {};

export default Template;
