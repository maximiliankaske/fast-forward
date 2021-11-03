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

// FIXME: right now is ?session=docIdx but if user starts new form, it will create new doc
// TODO: think of a reducer `useReducer()`

const pack = formsConfig["the-starter-pack"];
const { questions: questions } = pack;

const FormPage = ({
  organization,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [index, setIndex] = useState<number | undefined>();
  const [question, setQuestion] = useState<QuestionType | undefined>();
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

  console.log({ question });

  const answeredQuestionIds = data?.session?.answers
    ? Object.keys(data.session.answers)
    : undefined;

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
    console.log({ data: data?.session?.answers, missingQuestionIds });
    if (missingQuestionIds.length > 0) {
      setQuestion(questions.find(({ id }) => missingQuestionIds[0] === id));
    } else if (missingQuestionIds.length === 0) {
      setQuestion(undefined);
    }
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
    }
  };

  console.log(index);

  return (
    <SitesLayout name={organization.name}>
      {question ? (
        <>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Question{" "}
            <span className="font-bold">
              {(answeredQuestionIds?.length || 0) + 1}
            </span>{" "}
            of {questions.length}
          </p>
          <form onSubmit={onSubmit} className="space-y-12 py-8">
            <Question
              title={question.title}
              description={question.description}
            />
            <Input />
            <div className="flex items-center justify-between">
              <div>
                {answeredQuestionIds && answeredQuestionIds.length > 0 && (
                  <button
                    type="button"
                    // FIXME: Not the right way. you can only fo back one question.
                    onClick={() => {
                      setQuestion(
                        questions.find(
                          ({ id }) => answeredQuestionIds[0] === id
                        )
                      );
                      setIndex((index || 0) - 1);
                    }}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-600"
                  >
                    <ArrowLeftIcon className="h-8 w-8" />
                  </button>
                )}
              </div>
              {missingQuestionIds && (
                <button
                  type="submit"
                  className="rounded-full p-2 bg-gray-600 dark:bg-text-400 hover:bg-gray-800 dark:hover:bg-gray-600 text-white"
                >
                  <ArrowRightIcon className="h-7 w-7" />
                </button>
              )}
            </div>
          </form>
        </>
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
