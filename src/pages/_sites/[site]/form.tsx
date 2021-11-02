import SitesLayout from "@/components/layout/SitesLayout";
import Question from "@/components/question/Question";
import Input from "@/components/question/Input";
import Heading from "@/components/ui/Heading";
import { getOrganization, getOrganizations } from "@/lib/db-admin";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";

const FormPage = ({
  organization,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <SitesLayout name={organization.name}>
      <div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Question <span className="font-bold">1</span> of 13
        </p>
      </div>
      <form className="space-y-8 py-8">
        <Question />
        <Input />
        <div className="flex items-center justify-between">
          <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-600">
            <ArrowLeftIcon className="h-8 w-8" />
          </button>
          <button
            type="submit"
            className="rounded-full p-2 bg-gray-600 dark:bg-text-400 hover:bg-gray-800 dark:hover:bg-gray-600 text-white"
          >
            <ArrowRightIcon className="h-7 w-7" />
          </button>
        </div>
      </form>
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
    props: { organization: organization! }, // site! removes undefined
    revalidate: 3600, // set revalidate interval of 1h
    notFound: !organization,
  };
}

export default FormPage;
