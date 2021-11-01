import SitesLayout from "@/components/layout/SitesLayout";
import Heading from "@/components/ui/Heading";
import { getOrganization, getOrganizations } from "@/lib/db-admin";
import { WithId, Invite } from "@/types/index";
import fetcher from "@/utils/fetcher";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { useLocalStorage } from "usehooks-ts";

// TODO: change site to subdomain
// CHECK OUT: https://magic.link/posts/magic-firebase-integration

/**
 * How to invite members for a monthly mood questionairy?
 *
 * collection("invites").doc(token).set({
 *  email: string;
 *  token: string; (same as doc id)
 *  expired: boolean;
 *  dueTo: Timestamp;
 *  site: string;
 * })
 *
 * Store token in localStorage to remember "login" into the organization
 *
 * After successfull answer of questions, set expired to true
 */

const SitePage = ({
  name,
  authorId,
  site,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [fastToken, setFastToken] = useLocalStorage<null | Invite>(
    "fast-forward-token",
    null
  );
  const { isReady, query } = useRouter();
  const { data, error } = useSWR<{
    invite: WithId<Invite> | undefined;
  }>(
    isReady ? `/api/organization/${site}/invite/${query.token}` : null,
    fetcher
  );

  const isLoading = (!error && !data) || !isReady;
  const isEmpty = !fastToken || !data;

  useEffect(() => {
    if (data?.invite) {
      setFastToken(data.invite);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getState = useCallback(() => {
    if (fastToken) {
      if (
        fastToken.expired ||
        // @ts-ignore
        new Date(fastToken.dueTo._seconds * 1000) <= new Date()
      ) {
        return "Expired";
      } else {
        return "Hurray";
      }
    } else if (isEmpty) {
      return "Error";
    } else if (isLoading) {
      return "Loading";
    }
  }, [isEmpty, fastToken, isLoading]);

  return (
    <SitesLayout>
      <Heading className="text-indigo-500 dark:text-pink-500">{name}</Heading>
      <p>
        <b>Owner:</b> {authorId}
      </p>
      <p>{getState()}</p>
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
    props: { ...organization, site: site! },
    revalidate: 3600, // set revalidate interval of 1h
    notFound: !organization,
  };
}

export default SitePage;
