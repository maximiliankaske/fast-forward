import React from "react";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import GitHubButton from "@/components/auth/GitHubButton";
import { useSession, signOut } from "next-auth/react";
import MagicButton from "@/components/auth/MagicButton";
import GoogleButton from "@/components/auth/GoogleButton";
import Link from "@/components/ui/Link";

const Login = () => {
  const session = useSession();
  return (
    <DefaultLayout>
      <div className="max-w-xl mx-auto my-16 space-y-6 text-center">
        <Heading as="h2">Login Options</Heading>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            Lets be serious, why would you want to create a new account with
            email and password just to let either your password manager handle
            it or to forget the credentials after the logout. Let the providers
            to their work!
          </p>
          <p className="font-medium">Choose yours:</p>
        </div>
        {/* IDEA: make it flex-row on desktop */}
        <div className="flex flex-col items-center max-w-xs mx-auto space-y-4">
          <GitHubButton options={{ callbackUrl: "/app" }} />
          {/* <GoogleButton redirect="/app" /> */}
          <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />
          {!session.data?.user ? (
            <MagicButton options={{ callbackUrl: "/app" }} />
          ) : (
            <>
              <button onClick={() => signOut()}>logout</button>
              <Link href="/app">App</Link>
            </>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Login;
