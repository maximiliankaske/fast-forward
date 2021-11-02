import { ComponentWithAuth } from "@/components/auth/Auth";
import SitesLayout from "@/components/layout/SitesLayout";
import Heading from "@/components/ui/Heading";
import { useAuth } from "@/lib/auth";
import { getOrganization, getOrganizations } from "@/lib/db-admin";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
// TODO: change site to subdomain

const SitePage = ({
  organization,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { name, authorId } = organization;
  const { user, loading } = useAuth();

  if (!loading && !user) {
    return <div>login</div>;
  }

  if (!loading && user?.customClaims?.organizationId !== organization.id) {
    return <div>Claim access</div>;
  }

  return (
    <SitesLayout>
      <Heading className="text-indigo-500 dark:text-pink-500">{name}</Heading>
      <p>
        <b>Owner:</b> {authorId}
      </p>
      <p>{user?.email}</p>
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
    props: { organization: organization! }, // removed site: site! as organization.id === site
    revalidate: 3600, // set revalidate interval of 1h
    notFound: !organization,
  };
}

export default SitePage;
