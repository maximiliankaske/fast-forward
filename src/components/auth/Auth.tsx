import React, { FC } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth";
import LoadingIndicator from "../common/LoadingIndicator";
import { useSession } from "next-auth/react";

export interface AuthComponentProps {
  auth?: {
    // loading?: React.ReactNode;
    role?: "admin" | "member";
    unauthorized?: string;
  };
}

export type ComponentWithAuth<PropsType = any> = FC<PropsType> &
  AuthComponentProps;

const Auth: FC<AuthComponentProps> = ({ children, auth }) => {
  const { unauthorized = "/auth/signin", ...props } = auth ?? {};
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingIndicator />;
  }

  if (status === "unauthenticated") {
    router.replace(unauthorized);
    return <LoadingIndicator />;
  }

  return <>{children}</>;
};

export default Auth;
