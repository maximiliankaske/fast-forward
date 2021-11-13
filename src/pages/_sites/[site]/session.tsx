import SitesLayout from "@/components/layout/SitesLayout";
import {
  getOrganization,
  getOrganizations,
  getSurveyMemberSession,
} from "@/lib/db-admin";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FormSession, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { updateSession } from "@/lib/db";
import templates from "@/config/templates";
import Heading from "@/components/ui/Heading";
import Input from "@/components/question/Input";
import Link from "@/components/ui/Link";
import Question from "@/components/question/Question";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import cn from "classnames";
import Rating from "@/components/question/Rating";
import useOrganization from "src/hooks/useOrganization";
import useTemplates from "src/hooks/useTemplates";
import { updateSurveyMemberSession } from "@/lib/db/survey";

// FIXME: right now is ?session=docIdx but if user starts new form, it will create new doc
// TODO: think of a reducer `useReducer()`

const { questions: questions } = templates["the-starter-pack"];

const SessionPage = ({
  organization,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [index, setIndex] = useState<number>(0);
  const [value, setValue] = useState<number | string | undefined>();
  const router = useRouter();
  const { user } = useAuth();
  // FIXME: later
  const { data: dataOrganization } = useOrganization();
  const { data: dataTemplates } = useTemplates();
  const { id: surveyId } = router.query as { id: string };
  const { data, mutate } = useSWR<{
    session: WithId<FormSession> | undefined;
  }>(
    user && surveyId
      ? [
          `/api/organization/${organization.name}/survey/${surveyId}`,
          user?.token,
        ]
      : null,
    fetcher
  );

  const answeredQuestionIds = useMemo(
    () => (data?.session?.answers ? Object.keys(data.session.answers) : []),
    [data?.session?.answers]
  );

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
          surveyId: surveyId, // data.id is better
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

  console.log({ index, value });

  return (
    <SitesLayout name={organization.name}>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center h-20">
          {questions.map((question, idx) => {
            const notAnswered = idx > answeredQuestionIds.length;
            const answered = idx < answeredQuestionIds.length;
            return (
              <button
                key={question.id}
                className={cn("w-9 h-9 rounded-full", {
                  "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900":
                    (index > idx && answered) || (index < idx && !notAnswered),
                  "bg-indigo-100 text-indigo-500 dark:bg-pink-900/25 dark:text-pink-500":
                    index === idx,
                  "cursor-default text-gray-300 dark:text-gray-700":
                    notAnswered,
                })}
                disabled={notAnswered}
                onClick={() => setIndex(idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        {index < answeredQuestionIds.length ? (
          <button
            onClick={() => setIndex(answeredQuestionIds.length)}
            className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 inline-flex items-center"
          >
            Go to last
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </button>
        ) : null}
      </div>
      {question ? (
        <form onSubmit={onSubmit} className="flex flex-col space-y-12 py-8">
          <div className="flex-1 space-y-12">
            <Question
              title={question.title}
              description={question.description}
            />
            {question.type === "input" && (
              <Input
                value={value || ""}
                onChange={(event) => setValue(event.target.value)}
                required
              />
            )}
            {question.type === "rating" && (
              <div>
                <Rating value={value} onChange={setValue} />
                <p className="pt-4 text-sm text-gray-600 dark:text-gray-400">
                  *The rating goes from very bad (1) to very good (5).
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            {index > 0 ? (
              <button
                type="button"
                onClick={() => setIndex((index || 0) - 1)}
                className="rounded-full p-2 hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
              >
                <ArrowLeftIcon className="h-7 w-7" />
              </button>
            ) : (
              <div />
            )}
            <button
              type="submit"
              className="rounded-full p-2 hover:bg-indigo-100 dark:hover:bg-pink-900/25"
            >
              <ArrowRightIcon className="h-7 w-7" />
            </button>
          </div>
        </form>
      ) : (
        <>
          <Heading as="h2">Thanks to attempt the form!</Heading>
          <Link href="/">Submit responses</Link>
        </>
      )}
    </SitesLayout>
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
  return {
    props: { organization: organization! }, // site! removes undefined
    revalidate: 3600, // set revalidate interval of 1h
    notFound: !organization,
  };
}

export default SessionPage;
