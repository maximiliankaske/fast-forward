import { useRouter } from "next/router";
import React from "react";
import GitHubIcon from "../components/icon/GitHub";
import GoogleIcon from "../components/icon/Google";
import DefaultLayout from "../components/layout/DefaultLayout";
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import { useAuth } from "../lib/auth";

const Login = () => {
  const auth = useAuth();
  const router = useRouter();
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
        <div className="space-y-4">
          <div>
            <Button
              onClick={() =>
                auth.signinWithGitHub().then(() => router.replace("/app"))
              }
              className="inline-flex items-center"
              reverse
            >
              Log In with GitHub <GitHubIcon className="h-5 w-5 -mr-1 ml-1" />
            </Button>
          </div>
          <div>
            <Button
              onClick={() =>
                auth.signinWithGoogle().then(() => router.replace("/app"))
              }
              className="inline-flex items-center"
            >
              Log In with Google <GoogleIcon className="h-5 w-5 -mr-1 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Login;
