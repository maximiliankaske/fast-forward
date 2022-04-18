import React from "react";
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
      variant="primary"
    >
      Log In with GitHub
    </Button>
  );
};

export default GitHubButton;
