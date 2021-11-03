import SitesLayout from "@/components/layout/SitesLayout";
import { getOrganization, getOrganizations } from "@/lib/db-admin";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FormSession, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";
import { FormEvent, useEffect, useState } from "react";
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

  console.log(data?.session);

  const answeredQuestionIds = data?.session?.answers
    ? Object.keys(data.session.answers)
    : undefined;

  const missingQuestionIds =
    answeredQuestionIds &&
    questions.reduce((acc: string[], curr) => {
      return answeredQuestionIds.includes(curr.id)
        ? [...acc]
        : [...acc, curr.id];
    }, []);

  const currentQuestion = answeredQuestionIds
    ? questions.find(({ id }) => {
        return !answeredQuestionIds.includes(id);
      })
    : undefined;

  // useEffect(() => {
  //   if (answeredQuestionIds) {
  //     setQuestion(
  //       questions.find(({ id }) => {
  //         return !answeredQuestionIds.includes(id);
  //       })
  //     );
  //   }
  // }, [answeredQuestionIds]);

  const onSubmit = (event: FormEvent) => {
    // TODO: event.reset form
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
    };
    if (currentQuestion) {
      updateSession({
        organizationId: organization.id,
        id: session, // data.id is better
        // Ideally, we use the `answers.${currentQuestion.id}`: target.name.value
        answers: {
          ...data?.session?.answers,
          [currentQuestion.id]: target.name.value,
        },
      });
      mutate();
    }
  };

  console.log({ currentQuestion, answeredQuestionIds, missingQuestionIds });

  return (
    <SitesLayout name={organization.name}>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Question{" "}
        <span className="font-bold">
          {(answeredQuestionIds?.length || 0) + 1}
        </span>{" "}
        of {questions.length}
      </p>
      {question ? (
        <Form question={question} onSubmit={onSubmit} />
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
