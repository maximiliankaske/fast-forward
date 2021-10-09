import Head from "next/head";
import Features from "../components/landing/Features";
import DefaultLayout from "../components/layout/DefaultLayout";
import Heading from "../components/ui/Heading";
import WidgetButtonExample from "../components/widget/WidgetButtonExample";
import WidgetFABExample from "../components/widget/WidgetFABExample";
import { useAuth } from "../lib/auth";
import feedbackConfig from "../fast-forward.json";
import Link from "next/link";
import React, { useState } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import Newsletter from "../components/landing/Newsletter";
import Banner from "../components/common/Banner";
import Input from "../components/ui/Input";

const Home = () => {
  const [projectId, setProjectId] = useState("");
  const auth = useAuth();

  const buttonProps = {
    projectId: projectId === "" ? feedbackConfig.projects.main : projectId,
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
      <div className="p-16 my-6 w-full bg-gray-100 dark:bg-gray-900 rounded-lg space-y-6">
        <Heading as="h2">How does it work?</Heading>
        <div>
          <Input
            name="projectId"
            label="Project Id"
            className="max-w-sm"
            placeholder={feedbackConfig.projects.main}
            value={projectId}
            onChange={(event) => setProjectId(event.target.value)}
            srOnly
          />
          <p className="text-xs mt-1 text-gray-700 dark:text-gray-300">
            Leave it blank to use the demo project id. Otherwise use can your
            project id to test.
          </p>
        </div>
        <div className="flex flex-wrap">
          <WidgetButtonExample version={2} {...buttonProps}>
            Give us Feedback
          </WidgetButtonExample>
          <WidgetButtonExample
            lang="de"
            metadata={{ lang: "de" }}
            version={2}
            {...buttonProps}
          >
            Geben Sie Feedback
          </WidgetButtonExample>
          <WidgetButtonExample
            lang="fr"
            metadata={{ lang: "fr" }}
            version={2}
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
