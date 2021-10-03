import Head from "next/head";
import Features from "../components/landing/Features";
import DefaultLayout from "../components/layout/DefaultLayout";
import Heading from "../components/ui/Heading";
import WidgetButtonExample from "../components/widget/WidgetButtonExample";
import WidgetFABExample from "../components/widget/WidgetFABExample";
import { useAuth } from "../lib/auth";
import feedbackConfig from "../fast-feedback.json";
import Link from "next/link";
import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import Newsletter from "../components/landing/Newsletter";
import Banner from "../components/common/Banner";

const Home = () => {
  const auth = useAuth();

  const buttonProps = {
    projectId: feedbackConfig.projects.main,
    userId: auth.user?.email || undefined,
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Fast-Forward</title>
        <meta name="description" content="Fast-Forward" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner>This is an experimental project.</Banner>
      <div className="flex flex-col items-center p-16 my-6 w-full bg-indigo-700 rounded-lg">
        <Heading as="h2" className="text-white">
          How does it work?
        </Heading>
        <div className="text-center space-y-4 pt-4">
          <WidgetButtonExample reverse {...buttonProps}>
            Give us Feedback
          </WidgetButtonExample>
          <WidgetButtonExample
            lang="de"
            metadata={{ lang: "de" }}
            reverse
            {...buttonProps}
          >
            Geben Sie Feedback
          </WidgetButtonExample>
          <WidgetButtonExample
            lang="fr"
            metadata={{ lang: "fr", test: "true" }}
            reverse
            {...buttonProps}
          >
            Donnez-nous vos commentaires
          </WidgetButtonExample>
        </div>
      </div>
      <div className="my-10 text-center">
        <Link href="/app/VWJU7eJdIEYGmoyKW4rp">
          <a
            target="_blank"
            className="inline-flex items-center text-white bg-gray-900 rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Try the Demo
            <ExternalLinkIcon className="h-5 w-5 ml-2" />
          </a>
        </Link>
      </div>
      <div className="space-y-10">
        <Features />
        <Newsletter />
      </div>
      <WidgetFABExample />
    </DefaultLayout>
  );
};

// export const getStaticProps = async () => {
//   const { users } = await getAllUsers();
//   return {
//     props: {
//       users: users || null,
//     },
//   };
// };

export default Home;
