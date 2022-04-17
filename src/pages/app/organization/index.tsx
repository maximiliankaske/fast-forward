import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import MemberInvite from "@/components/organization/MemberInvite";
import MemberList from "@/components/organization/MemberList";
import Divider from "@/components/ui/Divider";
import { Organization } from ".prisma/client";
import fetcher, { creator, updator } from "@/utils/fetcher";
import React, { FormEvent } from "react";
import useSWR from "swr";
import toasts from "@/utils/toast";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import Form from "@/components/organization/Form";

// TODO: Check utility here!

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
    await toasts.promise(
      organization
        ? updator(`/api/organization/${organization.id}`, {
            name: target.organization.value,
          })
        : creator(`/api/organization`, { name: target.organization.value })
    );
    mutate();
  };

  console.log(organization);

  return (
    <DefaultUserLayout>
      <div className="space-y-6">
        <Form defaultValue={organization?.name} onSubmit={onSubmit} />
        <Divider className="pb-6" />
        {organization && (
          <>
            <MemberInvite />
            <MemberList />
          </>
        )}
      </div>
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
