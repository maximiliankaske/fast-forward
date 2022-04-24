import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import React from "react";
import DemoButton from "@/components/landing/DemoButton";
import LoginButton from "@/components/landing/LoginButton";

const Home = () => {
  return (
    <DefaultLayout>
      <div className="grid md:grid-cols-5 gap-x-0 md:gap-x-6 pt-6 md:pt-12 pb-24 md:pb-40">
        <div className="md:col-span-3">
          <Heading>
            The easiest way to collect{" "}
            <span className="animate-move-bg bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 bg-[length:400%] bg-clip-text text-transparent font-extrabold">
              Feedback
            </span>
            .
          </Heading>
        </div>
        <div className="md:col-span-2 hidden md:block" />
        <div className="md:col-span-3">
          <Heading as="h4">
            {`You want to collect feedback fast, reliable and without any big setup? Welcome to `}
            <span className="font-extrabold text-indigo-500 dark:text-pink-500">
              Fast Forward
            </span>
            .
          </Heading>
          <div className="space-x-4 mt-6">
            <DemoButton />
            <LoginButton />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
