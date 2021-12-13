import LoadingIndicator from "@/components/common/LoadingIndicator";
import SitesLayout from "@/components/layout/SitesLayout";
import prisma from "@/lib/prisma";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useSession } from "next-auth/react";
import React from "react";

const Surveys = ({
  organization,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session, status } = useSession();

  if (status === "loading") <LoadingIndicator />;

  if (
    status === "unauthenticated" ||
    session?.user.organizationId !== organization?.id
  ) {
    return <p>Not authenticated</p>;
  }

  return (
    <SitesLayout name={organization!.name}>
      <p>Hello, you are allowed inside the organization</p>
    </SitesLayout>
  );
};

export async function getStaticPaths() {
  const organizations = await prisma.organization.findMany();
  const paths = [
    ...organizations.map((o) => {
      return { params: { organizationId: o.id } };
    }),
  ];
  return {
    paths: paths,
    fallback: "blocking", // fallback blocking allows sites to be generated using ISR
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ organizationId: string }>) {
  console.log(params);
  const { organizationId } = params || {};

  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
    include: {
      templates: true,
      surveys: true,
    },
  });

  return {
    props: {
      organization,
    }, // removed site: site! as organization.id === site
    revalidate: 3600, // set revalidate interval of 1h
  };
}

export default Surveys;
