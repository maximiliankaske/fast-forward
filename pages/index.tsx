import Head from "next/head";
import Features from "../components/landing/Features";
import DefaultLayout from "../components/layout/DefaultLayout";
import Heading from "../components/ui/Heading";
import WidgetFABExample from "../components/widget/WidgetFABExample";
import React from "react";
import Newsletter from "../components/landing/Newsletter";
import Example from "../components/landing/Example";
import DemoButton from "../components/landing/DemoButton";
import Snippet from "../components/landing/Snippet";
import LoginButton from "../components/landing/LoginButton";

const Home = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Fast-Forward</title>
        <meta name="description" content="Fast-Forward" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid md:grid-cols-5 gap-x-0 md:gap-x-6 pt-6 md:pt-12 pb-24 md:pb-32">
        <div className="md:col-span-3">
          <Heading>The easiest way to collect Feedback.</Heading>
        </div>
        <div className="md:col-span-2 hidden md:block" />
        <div className="md:col-span-3">
          <Heading as="h4" className="mb-6">
            {`You want to collect feedback fast, reliable and without any big setup? Welcome to `}
            <span className="text-indigo-500 dark:text-pink-500 font-extrabold">
              Fast Forward
            </span>
            .
          </Heading>
          <div className="space-x-4">
            <DemoButton />
            <LoginButton />
          </div>
        </div>
        <div className="md:col-span-2 mt-6 md:mt-0">
          <Example />
        </div>
      </div>
      <Features />
      <Snippet />
      <Newsletter />
      <WidgetFABExample />
    </DefaultLayout>
  );
};

export default Home;
