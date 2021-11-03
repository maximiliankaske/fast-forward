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
import formsConfig, { Question } from "@/config/forms";
import Heading from "@/components/ui/Heading";
import Form from "@/components/question/Form";
import Link from "@/components/ui/Link";

// FIXME: right now is ?session=docIdx but if user starts new form, it will create new doc
// TODO: think of a reducer `useReducer()`

const pack = formsConfig["the-starter-pack"];
const { questions: questions } = pack;

const FormPage = ({
  organization,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [question, setQuestion] = useState<Question | undefined>();
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
    if (missingQuestionIds.length > 0) {
      setQuestion(questions.find(({ id }) => missingQuestionIds[0] === id));
    } else {
      setQuestion(undefined);
    }
  }, [data?.session, data?.session?.answers, missingQuestionIds]);

  const onSubmit = async (event: FormEvent) => {
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
          <Form question={question} onSubmit={onSubmit} />
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
