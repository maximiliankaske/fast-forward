import React, { FC } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/auth";
import LoadingIndicator from "../common/LoadingIndicator";

export interface AuthComponentProps {
  auth?: {
    loading?: React.ReactNode;
    role?: "admin" | "user";
    unauthorized?: string;
  };
}

export type ComponentWithAuth<PropsType = any> = FC<PropsType> &
  AuthComponentProps;

const Auth: FC<AuthComponentProps> = ({ children, auth }) => {
  const { unauthorized = "/login", ...props } = auth ?? {};
  const { loading, user } = useAuth();
  const router = useRouter();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!loading && !user) {
    router.replace(unauthorized);
    return <LoadingIndicator />;
  }

  return <>{children}</>;
};

export default Auth;
