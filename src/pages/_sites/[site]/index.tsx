import SitesLayout from "@/components/layout/SitesLayout";
import Wrapper from "@/components/organization/Wrapper";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import {
  getOrganization,
  getOrganizations,
  getSurveys,
  getTemplates,
} from "@/lib/db-admin";
import { WithId, FormSession } from "@/types/index";
import { Template } from "@/types/templates";
import fetcher from "@/utils/fetcher";
import {
  CalendarIcon,
  CheckCircleIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import React, { useCallback } from "react";
import useSWR from "swr";
import Heading from "@/components/ui/Heading";

// TODO: change site to subdomain

const SitePage = ({
  organization,
  templates,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { user } = useAuth();

  return (
    <Wrapper {...{ organization }}>
      <SitesLayout name={organization.name}>
        <Heading as="h2">Open Surveys</Heading>
        <ul className="space-y-4 mt-6">
          {templates?.map((template) => (
            <Item
              key={template.id}
              template={template}
              organizationName={organization.name}
              token={user?.token}
            />
          ))}
        </ul>
      </SitesLayout>
    </Wrapper>
  );
};

// TODO: extract

interface Props {
  template: Template;
  organizationName: string;
  token?: string;
}

const Item = ({ template, token, organizationName }: Props) => {
  const { data, mutate } = useSWR<{
    session: WithId<FormSession> | undefined;
  }>(
    [
      `/api/organization/${organizationName}/survey/${template.surveyId}`,
      token,
    ],
    fetcher
  );

  const answersLength = Object.keys(data?.session?.answers || []).length;
  const questionsLength = template.questions.length;

  const renderIcon = useCallback(() => {
    if (answersLength === questionsLength) {
      return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
    } else if (answersLength === 0) {
      return <XCircleIcon className="h-6 w-6 text-red-500" />;
    } else {
      return (
        <DotsHorizontalIcon className="h-6 w-6 text-indigo-500 dark:text-pink-500" />
      );
    }
  }, [answersLength, questionsLength]);

  return (
    <li className="hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md px-2 py-1">
      <Link href={`/survey/${template.surveyId}`}>
        <a className="w-full flex justify-between items-center">
          <div>
            <p className="font-medium">{template.label}</p>
            <div className="space-x-4 text-xs text-gray-600 dark:text-gray-400 font-medium">
              <p className="inline-flex items-center">
                <HashtagIcon className="h-4 w-4 mr-1" />
                {answersLength}/{questionsLength}
              </p>
              <p className="inline-flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />5 days
              </p>
            </div>
          </div>
          <div>{renderIcon()}</div>
        </a>
      </Link>
    </li>
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
