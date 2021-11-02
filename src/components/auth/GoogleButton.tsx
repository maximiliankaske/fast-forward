import { useRouter } from "next/router";
import React from "react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import GoogleIcon from "../icon/Google";

interface Props {
  redirect?: string;
}

const GoogleButton = ({ redirect }: Props) => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        auth.signinWithGoogle().then(() => {
          if (redirect) {
            router.replace(redirect);
          }
        })
      }
      className="inline-flex items-center"
    >
      Log In with Google <GoogleIcon className="h-5 w-5 -mr-1 ml-1" />
    </Button>
  );
};

export default GoogleButton;
