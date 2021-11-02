import { useAuth } from "@/lib/auth";
import { Organization, WithId } from "@/types/index";
import React, { FC } from "react";
import GitHubButton from "../auth/GithubButton";
import GoogleButton from "../auth/GoogleButton";
import LoadingIcon from "../icon/Loading";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

interface Props {
  organization: WithId<Organization>;
}

const Wrapper: FC<Props> = ({ organization, children }) => {
  const { loading, user, signout } = useAuth();

  if (loading) {
    return (
      <main className="flex flex-col justify-center items-center min-h-screen">
        <LoadingIcon className="animate-spin h-10 w-10 text-indigo-500" />
      </main>
    );
  }

  if (!loading && !user) {
    return (
      <main className="flex flex-col justify-center items-center min-h-screen">
        <Heading as="h3">Welcome to</Heading>
        <Heading>{organization.name}</Heading>
        <div className="space-y-4 my-6 flex flex-col">
          <GitHubButton />
          <GoogleButton />
        </div>
      </main>
    );
  }

  if (!loading && !(user?.customClaims?.organizationId === organization.id)) {
    return (
      <main className="flex flex-col justify-center items-center min-h-screen">
        <Heading>ACCESS DENIED</Heading>
        <p>Refer to the organization owner to invite you.</p>
        <Button onClick={() => signout()}>signout</Button>
      </main>
    );
  }

  return <>{children}</>;
};

export default Wrapper;
