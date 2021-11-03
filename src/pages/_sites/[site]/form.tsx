import SitesLayout from "@/components/layout/SitesLayout";
import { getOrganization, getOrganizations } from "@/lib/db-admin";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FormSession, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { updateSession } from "@/lib/db";
import formsConfig, { Question as QuestionType } from "@/config/forms";
import Heading from "@/components/ui/Heading";
import Input from "@/components/question/Input";
import Link from "@/components/ui/Link";
import Question from "@/components/question/Question";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import cn from "classnames";

// FIXME: right now is ?session=docIdx but if user starts new form, it will create new doc
// TODO: think of a reducer `useReducer()`

const pack = formsConfig["the-starter-pack"];
const { questions: questions } = pack;

const FormPage = ({
  organization,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [index, setIndex] = useState<number>(0);
  // const [question, setQuestion] = useState<QuestionType | undefined>();
  const router = useRouter();
  const { user } = useAuth();
  const { session } = router.query as { session: string };
  const { data, error, mutate } = useSWR<{
    session: WithId<FormSession> | undefined;
  }>(
    user && session
      ? [
          `/api/organization/${organization.name}/session/${session}`,
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
    setIndex(
      questions.findIndex((question) => missingQuestionIds[0] === question.id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.session?.answers]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // TODO: event.reset form
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
    };
    if (question) {
      if (target.name.value !== data?.session?.answers[question.id]) {
        await updateSession({
          organizationId: organization.id,
          id: session, // data.id is better
          // Ideally, we use the `answers.${question.id}`: target.name.value
          answers: {
            ...data?.session?.answers,
            [question.id]: target.name.value,
          },
        });
        mutate();
      } else {
        setIndex((prev) => prev + 1);
      }
    }
  };

  console.log(index);

  return (
    <SitesLayout name={organization.name}>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {questions.map((question, idx) => {
            const disabled = idx > index && idx > answeredQuestionIds.length;
            return (
              <button
                key={question.id}
                // Define how do show the user until which question he has answered and not.
                // [closed][closed][current][answered][open]
                // With different colors per question state.
                // Only use very flatten bordered rectangle with (background if open, primary if current, foreground if closed)
                // Let’s make it hoverable with a tooltip showing the question
                className={cn("h-2 w-16 rounded-full", {
                  "bg-gray-800":
                    index > idx && idx < answeredQuestionIds.length,
                  "bg-indigo-500 dark:bg-pink-500": index === idx,
                  "bg-white": index < idx && idx > answeredQuestionIds.length,
                  "cursor-default": disabled,
                  // "bg-gray-500": idx > index && idx > answeredQuestionIds.length,
                })}
                disabled={disabled}
                onClick={() => setIndex(idx)}
              />
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
        <form onSubmit={onSubmit} className="space-y-12 py-8">
          <Question title={question.title} description={question.description} />
          <Input />
          <div className="flex items-center justify-between">
            <div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => setIndex((index || 0) - 1)}
                  className="rounded-full p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <ArrowLeftIcon className="h-7 w-7" />
                </button>
              )}
            </div>
            {missingQuestionIds && (
              <button
                type="submit"
                className={cn("rounded-full p-2 text-white", {
                  // needs to be elaborated - not correct numbers
                  "bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700":
                    index !== questions.length - 1,
                  "bg-indigo-500 dark:bg-pink-500 hover:bg-indigo-600 dark:hover:bg-pink-600":
                    index === questions.length - 1,
                })}
              >
                <ArrowRightIcon className="h-7 w-7" />
              </button>
            )}
          </div>
        </form>
      ) : (
        <>
          <Heading>Thanks to attempt the form!</Heading>
          <Link href="/">Back</Link>
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

export default FormPage;
