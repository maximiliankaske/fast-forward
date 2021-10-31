import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import Link from "@/components/ui/Link";
import { getOrganization, getOrganizations } from "@/lib/db-admin";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

const SitePage = ({
  name,
  authorId,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <DefaultLayout>
      <Heading>{name}</Heading>
      <p>
        <b>Owner:</b> {authorId}
      </p>
      <Link href={"/settings"}>Settings</Link>
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
  // FIXME: Not sure if we should pass the organization without permission scope
  const { organization } = (await getOrganization(site || "")) || {};
  return {
    props: { ...organization },
    revalidate: 3600, // set revalidate interval of 1h
    notFound: !organization,
  };
}

export default SitePage;
