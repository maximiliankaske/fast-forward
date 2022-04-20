import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import { creator } from "@/utils/fetcher";
import React, { FormEvent } from "react";
import toasts from "@/utils/toast";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";

const TeamPage: ComponentWithAuth = ({
  members,
  memberOf,
  invites,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
    };
    const newInvite = { email: target.email.value };
    await toasts.promise(creator("/api/invite", newInvite));
    router.reload();
  };

  return (
    <DefaultUserLayout>
      <div className="space-y-6 max-w-md">
        <div>
          <form onSubmit={handleSubmit} className="space-y-2 mb-4">
            <Input label="Email" name="email" type="email" />
            <Button variant="none" type="submit">
              Invite
            </Button>
          </form>
          <Heading>Invites</Heading>
          <ul>
            {invites.map((invite) => (
              <li key={invite.id}>
                <Text>{invite.email}</Text>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <Heading>Members</Heading>
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                <Text>{member.email}</Text>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <Heading>Member Of (teamId)</Heading>
          <ul>
            {memberOf.map((member) => (
              <li key={member.id}>
                <Text>{member.teamId}</Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DefaultUserLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  const { teamId, id } = session?.user || {};
  const members = await prisma.member.findMany({
    where: { teamId },
  });
  const invites = await prisma.invite.findMany({
    where: {
      userId: id,
    },
  });
  const memberOf = await prisma.member.findMany({
    where: { userId: id },
  });
  return {
    props: {
      members,
      invites,
      memberOf,
    },
  };
};

TeamPage.auth = {};

export default TeamPage;
