import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { createOrganizationMember } from "@/lib/db";
import { getOrganization, getOrganizations } from "@/lib/db-admin";
import toasts from "@/utils/toast";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { FormEvent } from "react";

const SettingsPage: ComponentWithAuth<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ name, site }) => {
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await toasts.promise(
        createOrganizationMember({
          organizationId: site,
          email: "test@gmail.de",
          role: "member",
        })
      );
    } catch {
      console.warn("Something went wrong");
    }
  };

  return (
    <DefaultLayout>
      <Heading>Settings</Heading>
      <p>{name}</p>
      <Button onClick={onSubmit}>Add dummy member to orga</Button>
    </DefaultLayout>
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
    props: { ...organization, site: site! }, // site! removes undefined
    revalidate: 3600, // set revalidate interval of 1h
    notFound: !organization,
  };
}

SettingsPage.auth = {};
export default SettingsPage;
