import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import MemberInvite from "@/components/organization/MemberInvite";
import MemberList from "@/components/organization/MemberList";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Input from "@/components/ui/Input";
import { Organization } from ".prisma/client";
import fetcher, { creator } from "@/utils/fetcher";
import React, { FormEvent } from "react";
import useSWR from "swr";
import toasts from "@/utils/toast";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import Heading from "@/components/ui/Heading";

// TODO: Missing uniqueness check of the organization
// Test if name 'Only uses letters, numbers, "_" or "-"'
// /^[A-Za-z0-9_-]*$/.test(name)

const OrganizationPage: ComponentWithAuth = ({
  fallbackData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const { data: organization, mutate } = useSWR<Organization | null>(
    `/api/organization/${session?.user.organizationId}`,
    fetcher,
    { fallbackData }
  );

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      organization: { value: string };
    };
    toasts.promise(
      creator(`/api/organization`, { name: target.organization.value }).then(
        () => mutate()
      )
    );
  };

  console.log(organization);

  return (
    <DefaultUserLayout>
      <form className="grid gap-4 md:grid-cols-3" onSubmit={onSubmit}>
        <div className="md:col-span-2">
          <Input
            label="Name*"
            name="organization"
            placeholder="Acme"
            pattern={"^[A-Za-z0-9_-]*$"}
          />
        </div>
        <div className="md:col-start-1">
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <Divider className="py-6" />
      {organization && (
        <>
          <Heading as="h4">{organization.name}</Heading>
          <MemberInvite organizationId={organization.id} />
        </>
      )}
      {/* Missing MemebrList & Invite Form */}
    </DefaultUserLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  const entry = await prisma.organization.findUnique({
    where: {
      id: session?.user.organizationId || "",
    },
  });
  return {
    props: {
      fallbackData: entry,
    },
  };
};

OrganizationPage.auth = {};

export default OrganizationPage;
