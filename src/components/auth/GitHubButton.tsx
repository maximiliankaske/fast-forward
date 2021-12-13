import { useRouter } from "next/router";
import React from "react";
import GitHubIcon from "@/components/icon/GitHub";
import Button from "@/components/ui/Button";
import { signIn, SignInOptions } from "next-auth/react";

interface Props {
  options?: SignInOptions;
}

const GitHubButton = ({ options }: Props) => {
  return (
    <Button
      onClick={async () => {
        await signIn("github", options);
      }}
      className="inline-flex items-center"
      reverse
    >
      Log In with GitHub <GitHubIcon className="w-5 h-5 ml-1 -mr-1" />
    </Button>
  );
};

export default GitHubButton;
