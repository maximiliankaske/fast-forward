import Head from "next/head";
import { allFeatures } from "contentlayer/generated";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Heading, Link, Text } from "@fast-forward/ui";
import IconBg from "@/components/ui/IconBg";
import { InferGetStaticPropsType } from "next";
import NextLink from "next/link";

const Feature = ({
  feature,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const i = allFeatures.findIndex((i) => feature.slug === i.slug);
  const prev = i > 0 && allFeatures[i - 1];
  const next = i < allFeatures.length && allFeatures[i + 1];
  console.log(prev, next);
  return (
    <>
      <Head>
        <title>{feature.title}</title>
      </Head>
      <DefaultLayout>
        {/* <Link href="/">back to home</Link> */}
        <article className="flex-1 mt-6">
          <IconBg>{feature.emoji}</IconBg>
          <Heading className="mt-3">{feature.title}</Heading>
          <div
            className="prose dark:prose-dark"
            dangerouslySetInnerHTML={{ __html: feature.body.html }}
          />
        </article>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
          {prev && (
            <div className="col-start-1">
              <NextLink href={prev.url} passHref>
                <a className="rounded-md border border-gray-200 dark:border-gray-800 p-2 block hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500">
                  <Text>Prev</Text>
                  <Text variant="description">{prev.title}</Text>
                </a>
              </NextLink>
            </div>
          )}
          {next && (
            <div className="col-start-2 md:col-start-3">
              <NextLink href={next.url} passHref>
                <a className="rounded-md border border-gray-200 dark:border-gray-800 p-2 block hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500">
                  <Text>Next</Text>
                  <Text variant="description">{next.title}</Text>
                </a>
              </NextLink>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export async function getStaticPaths() {
  const paths = allFeatures.map((feature) => feature.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const feature = allFeatures.find((feature) => feature.slug === params.slug);
  return {
    props: {
      feature,
    },
  };
}

export default Feature;
