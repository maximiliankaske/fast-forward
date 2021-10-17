import Head from "next/head";
import Features from "../components/landing/Features";
import DefaultLayout from "../components/layout/DefaultLayout";
import Heading from "../components/ui/Heading";
import WidgetFABExample from "../components/widget/WidgetFABExample";
import React from "react";
import Newsletter from "../components/landing/Newsletter";
import Example from "../components/landing/Example";
import DemoButton from "../components/landing/DemoButton";

const Home = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Fast-Forward</title>
        <meta name="description" content="Fast-Forward" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid md:grid-cols-5 gap-8 md:gap-6 pb-16">
        <div className="md:col-span-3">
          <Heading>The easiest way to collect Feedback.</Heading>
          <Heading as="h4" className="mb-7">
            {`You want to collect feedback fast, reliable and without any big setup? Welcome to `}
            <span className="text-indigo-500 dark:text-pink-500 font-extrabold">
              Fast Feedback
            </span>
            .
          </Heading>
          <DemoButton />
        </div>
        <div className="md:col-span-2 flex flex-col justify-end">
          <Example />
        </div>
      </div>
      <Features />
      <Newsletter />
      <WidgetFABExample />
    </DefaultLayout>
  );
};

export default Home;
