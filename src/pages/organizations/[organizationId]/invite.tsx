import GitHubButton from "@/components/auth/GitHubButton";
import MagicButton from "@/components/auth/MagicButton";
import { SignInOptions } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const Invite = () => {
  const router = useRouter();

  const options: SignInOptions = {
    callbackUrl: `/organizations/${router.query.organizationId}`,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
      <p>Please make sure to sign in with the email address</p>
      <MagicButton options={options} />
      <GitHubButton options={options} />
    </div>
  );
};

export default Invite;
