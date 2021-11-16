import React, { useEffect } from "react";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import GitHubButton from "@/components/auth/GitHubButton";
import GoogleButton from "@/components/auth/GoogleButton";
import { useAuth } from "@/lib/auth";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { useRouter } from "next/router";

const Login = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading && auth.user) {
      router.push("/app");
    }
  }, [auth, router]);

  if (auth.loading || auth.user) {
    return <LoadingIndicator />;
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-xl my-16 space-y-6 text-center">
        <Heading as="h2">Login Options</Heading>
        <div className="text-gray-600 dark:text-gray-400 space-y-4">
          <p className="text-sm">
            Lets be serious, why would you want to create a new account with
            email and password just to let either your password manager handle
            it or to forget the credentials after the logout. Let the providers
            to their work!
          </p>
          <p className="font-medium">Choose yours:</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <GitHubButton redirect="/app" />
          <GoogleButton redirect="/app" />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Login;
