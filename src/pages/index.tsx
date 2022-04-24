import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import React from "react";
import Link from "next/link";
import { ExternalLinkIcon, LoginIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import cn from "classnames";

const styles = {
  btn: {
    base: "inline-flex items-center px-4 py-2 border border-gray-200 rounded-full shadow dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
    demo: "text-white bg-gray-900 dark:bg-white dark:text-gray-900",
    login: "text-gray-900 bg-white dark:bg-gray-900 dark:text-white",
  },
};

const Home = () => {
  const session = useSession();
  const exists = session?.data?.user.id;
  return (
    <DefaultLayout>
      <div className="grid md:grid-cols-5 gap-x-0 md:gap-x-6 pt-6 md:pt-12 pb-24 md:pb-40">
        <div className="md:col-span-3">
          <Heading as="h1">
            The easiest way to collect{" "}
            <span className="animate-move-bg bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 bg-[length:400%] bg-clip-text text-transparent font-extrabold">
              Feedback
            </span>
            .
          </Heading>
        </div>
        <div className="md:col-span-2 hidden md:block" />
        <div className="md:col-span-3">
          <Heading as="h3">
            {`You want to collect feedback fast, reliable and without any big setup? Welcome to `}
            <span className="font-extrabold text-indigo-500 dark:text-pink-500">
              Fast Forward
            </span>
            .
          </Heading>
          <div className="space-x-4 mt-6">
            <a
              target="_blank"
              href={`/app/projects/${process.env.NEXT_PUBLIC_DEMO_PROJECT_ID}`}
              rel="noreferrer"
              className={cn(styles.btn.base, styles.btn.demo)}
            >
              Try the Demo
              <ExternalLinkIcon className="w-5 h-5 ml-2" />
            </a>
            <Link href={exists ? "/app" : "/auth/signin"}>
              <a className={cn(styles.btn.base, styles.btn.login)}>
                {exists ? "Dashboard" : "Login"}
                <LoginIcon className="h-5 w-5 ml-2" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
