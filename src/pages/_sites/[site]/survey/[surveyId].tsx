import SitesLayout from "@/components/layout/SitesLayout";
import {
  getOrganization,
  getOrganizations,
  getSurveys,
  getTemplate,
} from "@/lib/db-admin";
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FormSession, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";
import { FormEvent, useEffect, useMemo, useState } from "react";
import templates from "@/config/templates";
import Heading from "@/components/ui/Heading";
import Input from "@/components/question/Input";
import Link from "@/components/ui/Link";
import Question from "@/components/question/Question";
import Rating from "@/components/question/Rating";
import { updateSurveyMemberSession } from "@/lib/db/survey";
import Steps from "@/components/session/Steps";
import JumpButton from "@/components/session/JumpButton";
import PreviousButton from "@/components/session/PreviousButton";
import NextButton from "@/components/session/NextButton";
import Form from "@/components/question/Form";

// TODO: think of a reducer `useReducer()`

const SurveyPage = ({
  organization,
  survey,
  template,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [index, setIndex] = useState<number>(0);
  const [value, setValue] = useState<number | string | undefined>();
  const router = useRouter();
  const { user } = useAuth();
  const { data, mutate } = useSWR<{
    session: WithId<FormSession> | undefined;
  }>(
    user
      ? [
          `/api/organization/${organization.name}/survey/${survey.id}`,
          user?.token,
        ]
      : null,
    fetcher
  );

  const answeredQuestionIds = useMemo(
    () => (data?.session?.answers ? Object.keys(data.session.answers) : []),
    [data?.session?.answers]
  );

  const { questions } = template;

  const question = index ? questions[index] : questions[0];

  const missingQuestionIds = useMemo(
    () =>
      answeredQuestionIds
        ? questions.reduce((acc: string[], curr) => {
            return answeredQuestionIds.includes(curr.id)
              ? [...acc]
              : [...acc, curr.id];
          }, [])
        : [],
    [answeredQuestionIds]
  );

  useEffect(() => {
    // TODO: FIXME: if all questions are answered, and I change the answer of q1 and submit, I go back to end
    setIndex(
      questions.findIndex((question) => missingQuestionIds[0] === question.id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.session?.answers]);

  useEffect(() => {
    if (index > -1 && index < questions.length && data?.session?.answers) {
      const { id } = questions[index];
      const answer = data?.session?.answers[id];
      if (answer) {
        setValue(answer);
      } else {
        setValue(undefined);
      }
    }
  }, [index, data?.session?.answers]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // TODO: check if value is !undefined or !== "" to continue
    // otherwise add error message
    event.preventDefault();
    if (question) {
      if (value) {
        await updateSurveyMemberSession({
          organizationId: organization.id,
          surveyId: survey.id, // data.id is better
          userId: user!.uid,
          answers: {
            ...data?.session?.answers,
            [question.id]: value,
          },
        });
        mutate();
      }
      setIndex((prev) => prev + 1);
    }
    // @ts-ignore
    event.target.reset();
  };

  return (
    <SitesLayout name={organization.name}>
      <div className="flex items-center justify-between">
        <Steps
          questions={questions}
          session={data?.session}
          index={index}
          setIndex={setIndex}
        />
        {index < answeredQuestionIds.length ? (
          <JumpButton onClick={() => setIndex(answeredQuestionIds.length)} />
        ) : null}
      </div>
      {question ? (
        <Form {...{ index, setIndex, value, setValue, question, onSubmit }} />
      ) : (
        <>
          <Heading as="h2">Thanks to attempt the form!</Heading>
          <Link href="/">Submit responses</Link>
        </>
      )}
    </SitesLayout>
  );
};

export async function getStaticPaths(ctx: GetStaticPathsContext) {
  const { organizations } = await getOrganizations();
  const [paths] = await Promise.all(
    organizations.map(async (o) => {
      const { surveys } = await getSurveys(o.id);
      return surveys
        .filter((s) => !s.cancelled)
        .map((s) => ({
          params: { site: o.id, surveyId: s.id },
        }));
    })
  );

  return {
    paths: paths,
    fallback: "blocking", // fallback blocking allows sites to be generated using ISR
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ site: string; surveyId: string }>) {
  const { site, surveyId } = params || {};
  const { organization } = (await getOrganization(site || "")) || {};
  const { surveys } = await (organization?.id
    ? getSurveys(organization.id)
    : {});
  const survey = surveys?.find((survey) => survey.id === surveyId);
  const { template } = await (organization?.id && survey?.id
    ? getTemplate(organization.id, survey.templateId)
    : {});

  return {
    props: {
      organization: organization!,
      survey: survey!,
      template: template!,
    },
    revalidate: 3600, // set revalidate interval of 1h
    notFound: !organization && !survey && !template,
  };
}

export default SurveyPage;
