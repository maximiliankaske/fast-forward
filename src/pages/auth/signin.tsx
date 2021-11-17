import React, { useEffect } from "react";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import GitHubButton from "@/components/auth/GitHubButton";
import { useSession, signOut, signIn } from "next-auth/react";
import MagicButton from "@/components/auth/MagicButton";
import GoogleButton from "@/components/auth/GoogleButton";

const Login = () => {
  const session = useSession();
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-xl my-16 space-y-6 text-center">
        <Heading as="h2">Login Options</Heading>
        <div className="text-gray-600 dark:text-gray-400 space-y-4">
          <p>
            Lets be serious, why would you want to create a new account with
            email and password just to let either your password manager handle
            it or to forget the credentials after the logout. Let the providers
            to their work!
          </p>
          <p className="font-medium">Choose yours:</p>
        </div>
        {/* IDEA: make it flex-row on desktop */}
        <div className="flex flex-col items-center space-y-4 max-w-xs mx-auto">
          <GitHubButton redirect="/app" />
          <GoogleButton redirect="/app" />
          <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />
          <MagicButton />
          {session.data?.user && (
            <button onClick={() => signOut()}>logout</button>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Login;
