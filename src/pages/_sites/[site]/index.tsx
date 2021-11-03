import SitesLayout from "@/components/layout/SitesLayout";
import Wrapper from "@/components/organization/Wrapper";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { createSession } from "@/lib/db";
import { getOrganization, getOrganizations } from "@/lib/db-admin";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
// TODO: change site to subdomain

const SitePage = ({
  organization,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { name, authorId } = organization;
  const { user } = useAuth();
  const router = useRouter();

  const onClick = async () => {
    const session = await createSession({ organizationId: organization.id });
    router.push(`/form?session=${session.id}`);
  };

  return (
    <Wrapper {...{ organization }}>
      <SitesLayout name={organization.name}>
        <div className="space-y-4">
          <p>
            <b>Owner:</b> {authorId}
          </p>
          <p>{user?.email}</p>
          <p>
            <Button onClick={onClick}>Start Form</Button>
          </p>
        </div>
      </SitesLayout>
    </Wrapper>
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
