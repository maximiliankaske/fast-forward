import { useRouter } from "next/router";
import React from "react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import GoogleIcon from "../icon/Google";
import { signIn } from "next-auth/react";

interface Props {
  redirect?: string;
}

const GoogleButton = ({ redirect }: Props) => {
  return (
    <Button
      // GOOGLE OAUTH is missing
      onClick={() => signIn("google")}
      className="inline-flex items-center"
    >
      Log In with Google <GoogleIcon className="h-5 w-5 -mr-1 ml-1" />
    </Button>
  );
};

export default GoogleButton;
