import Features from "@/components/landing/Features";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import WidgetFABExample from "@/components/widget/WidgetFABExample";
import React from "react";
import Newsletter from "@/components/landing/Newsletter";
import Example from "@/components/landing/Example";
import DemoButton from "@/components/landing/DemoButton";
import Snippet from "@/components/landing/Snippet";
import LoginButton from "@/components/landing/LoginButton";
import ArrowCTA from "@/components/landing/ArrowCTA";
import Blockquote from "@/components/ui/Blockquote";
import Link from "@/components/ui/Link";

const Home = () => {
  return (
    <DefaultLayout>
      <div className="grid md:grid-cols-5 gap-x-0 md:gap-x-6 pt-6 md:pt-12 pb-24 md:pb-40">
        <div className="md:col-span-3">
          <Heading>The easiest way to collect Feedback.</Heading>
        </div>
        <div className="md:col-span-2 hidden md:block" />
        <div className="md:col-span-3">
          <Heading as="h4">
            {`You want to collect feedback fast, reliable and without any big setup? Welcome to `}
            <span className="text-indigo-500 dark:text-pink-500 font-extrabold">
              Fast Forward
            </span>
            .
          </Heading>
          <div className="space-x-4 mt-6">
            <DemoButton />
            <LoginButton />
          </div>
        </div>
        <div className="md:col-span-2 mt-6 md:mt-0 relative -mr-4 sm:-mr-6 overflow-hidden md:overflow-visible">
          <Example />
          <div className="absolute bottom-14 md:bottom-0 left-96 md:-left-36 rotate-180 md:rotate-0 z-[-10]">
            <ArrowCTA />
          </div>
        </div>
      </div>
      <Features />
      <div className="pb-24">
        <Blockquote>
          <Link href="/blog/welcome">
            Welcome to <b>Fast Forward</b>
          </Link>
          . This project was aimed at open source enthousiasts and people who
          are curious. It is in <b>Beta</b> and most likely will stay for a
          while. I would only recommend using it in small projects.
        </Blockquote>
      </div>
      <Snippet />
      <Newsletter />
      <WidgetFABExample />
    </DefaultLayout>
  );
};

export default Home;
