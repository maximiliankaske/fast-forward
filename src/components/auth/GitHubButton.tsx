import { useRouter } from "next/router";
import React from "react";
import GitHubIcon from "@/components/icon/GitHub";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { signIn } from "next-auth/react";

interface Props {
  redirect?: string;
}

const GitHubButton = ({ redirect }: Props) => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await signIn("github");
        if (redirect) {
          router.replace(redirect);
        }
        // auth.signinWithGitHub().then(() => {
        //   if (redirect) {
        //     router.replace(redirect);
        //   }
        // });
      }}
      className="inline-flex items-center"
      reverse
    >
      Log In with GitHub <GitHubIcon className="h-5 w-5 -mr-1 ml-1" />
    </Button>
  );
};

export default GitHubButton;
