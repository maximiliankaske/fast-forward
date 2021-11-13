import SitesLayout from "@/components/layout/SitesLayout";
import Wrapper from "@/components/organization/Wrapper";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { createSession } from "@/lib/db";
import {
  getOrganization,
  getOrganizations,
  getSurveys,
  getTemplates,
} from "@/lib/db-admin";
import { createSurveyMemberSession } from "@/lib/db/survey";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
// TODO: change site to subdomain

const SitePage = ({
  organization,
  templates,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { name, authorId } = organization;
  const { user } = useAuth();
  const router = useRouter();

  const onClick = async (surveyId: string) => {
    // FIXME: if user already has a survey open, forward to last response
    const session = await createSurveyMemberSession({
      organizationId: organization.id,
      surveyId,
      userId: user!.uid,
      answers: {},
    });
    router.push(`/session?id=${surveyId}`);
  };

  return (
    <Wrapper {...{ organization }}>
      <SitesLayout name={organization.name}>
        <div className="space-y-4">
          <p>
            <b>Owner:</b> {authorId}
          </p>
          <p>{user?.email}</p>
          <p className="text-red-500">
            See code comment! Start here next time by checking if a survey
            already has been filled out or similar
          </p>
          <ul>
            {/* TODO: create own Component for each item and check aside if user has already started survey */}
            {templates?.map((template) => (
              <li key={template.id}>
                <button
                  onClick={() => onClick(template.surveyId!)}
                  className="inline-flex items-center"
                >
                  <p className="font-medium">{template.label}</p>
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </SitesLayout>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const { organizations } = await getOrganizations();
  const paths = [
    ...organizations.map((o) => {
      return { params: { site: o.id } };
    }),
  ];
  return {
    paths: paths,
    fallback: "blocking", // fallback blocking allows sites to be generated using ISR
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ site: string }>) {
  const { site } = params || {};
  const { organization } = (await getOrganization(site || "")) || {};
  const { templates } = await (organization?.id
    ? getTemplates(organization.id)
    : {});
  const { surveys } = await (organization?.id
    ? getSurveys(organization.id)
    : {});

  return {
    props: {
      organization: organization!,
      templates: templates?.filter((template) => template.surveyId),
      surveys: surveys?.filter((survey) => !survey.cancelled), // && dueTo < new Date
    }, // removed site: site! as organization.id === site
    revalidate: 3600, // set revalidate interval of 1h
    notFound: !organization,
  };
}

export default SitePage;
