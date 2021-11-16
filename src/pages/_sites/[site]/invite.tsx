import GitHubButton from "@/components/auth/GitHubButton";
import GoogleButton from "@/components/auth/GoogleButton";
import SitesLayout from "@/components/layout/SitesLayout";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { useAuth } from "@/lib/auth";
import { createOrganizationMember } from "@/lib/db";
import { getOrganization, getOrganizations } from "@/lib/db-admin";
import { OrganizationInvite, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import organization from "src/pages/app/organization";
import useSWR from "swr";

/**
 * CURRENT INVITE FLOW
 * create account for /app
 * go to create organization
 * create "acme" (you will be automatically be the owner of the organization)
 * invite user with email
 * logout
 * allow CURR_HOST and open /invite?token=...
 * create new user with same email
 */

const InvitePage = ({
  name,
  site,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { user, refreshToken } = useAuth();
  const { data, error } = useSWR<{
    invite: WithId<OrganizationInvite> | undefined;
  }>(
    router.isReady && user
      ? [`/api/organization/${site}/invite/${router.query.token}`, user?.token]
      : null,
    fetcher
  );

  useEffect(() => {
    // TODO: needs elaboration
    if (data && data.invite && user) {
      const { id, ...invite } = data.invite;
      createOrganizationMember({
        organizationId: site,
        ...invite,
        userId: user!.uid,
      })
        .then(() =>
          // used to attach customClaims
          fetcher(`/api/organization/${site}/member/${user!.uid}`, user!.token)
        )
        // used to refresh the user token
        // FIXME: REMINDER: Remove customClaims whenever the user has been deleted from organizationId
        // Meaning: Check membership on each login and remove customClaims
        .then(() => refreshToken())
        .then(() => router.push("/"));
    }
  }, [data, refreshToken, site, user, router]);

  const renderState = useCallback(() => {
    if (data && data.invite) {
      return "Correct Link. You will be added to the organization...";
    } else if (error) {
      return "Invalid request";
    } else if (!user) {
      return "Please Login with the email address you have been invited.";
    } else if (!router.query.token) {
      return "Missing Token";
    } else {
      // TODO: check which use cases pass
      return "Missing else statement";
    }
  }, [data, error, router.query.token, user]);

  return (
    <SitesLayout name={organization.name}>
      <div className="flex flex-col items-center justify-center">
        <p>
          You have been invited to join <b>{name}</b>
        </p>
        <div className="space-x-4">
          <GoogleButton />
          <GitHubButton />
        </div>
        <div className="py-6">{renderState()}</div>
      </div>
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
    props: { ...organization, site: site! }, // site! removes undefined
    revalidate: 3600, // set revalidate interval of 1h
    notFound: !organization,
  };
}

export default InvitePage;
