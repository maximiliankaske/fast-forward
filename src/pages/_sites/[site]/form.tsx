import SitesLayout from "@/components/layout/SitesLayout";
import { getOrganization, getOrganizations } from "@/lib/db-admin";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FormSession, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";
import { FormEvent } from "react";
import { updateSession } from "@/lib/db";
import formsConfig from "@/config/forms";
import Heading from "@/components/ui/Heading";
import Form from "@/components/question/Form";

// FIXME: right now is ?session=docIdx but if user starts new form, it will create new doc
// TODO: think of a reducer `useReducer()`

// TODO: now(!) `session.answers` add a level more to the questions.

const pack = formsConfig["the-starter-pack"];
const { questions: questions } = pack;

const FormPage = ({
  organization,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

  const answeredQuestionIds = data?.session?.id
    ? Object.keys(data.session!)
    : undefined;

  const missingQuestionIds =
    answeredQuestionIds &&
    questions.reduce((acc: string[], curr) => {
      return answeredQuestionIds.includes(curr.id)
        ? [...acc, curr.id]
        : [...acc];
    }, []);

  const nextQuestion = answeredQuestionIds
    ? questions.find(({ id }) => {
        return !answeredQuestionIds.includes(id);
      })
    : undefined;

  const onSubmit = (event: FormEvent) => {
    // TODO: event.reset form
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
    };
    if (nextQuestion) {
      updateSession({
        organizationId: organization.id,
        id: session, // data.id is better
        [nextQuestion.id]: target.name.value,
      });
      mutate();
    }
  };

  console.log({ nextQuestion, answeredQuestionIds, missingQuestionIds });

  return (
    <SitesLayout name={organization.name}>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Question <span className="font-bold">1</span> of 13
      </p>
      {nextQuestion ? (
        <Form question={nextQuestion} onSubmit={onSubmit} />
      ) : (
        <Heading>Thanks to attempt the form!</Heading>
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
