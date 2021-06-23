import { BeakerIcon } from "@heroicons/react/solid";
import { GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import Button from "../components/ui/Button";
import Link from "../components/ui/Link";
import { useAuth } from "../lib/auth";
import { getAllUsers } from "../lib/db-admin";
import type { User } from "../types";

interface Props {
  users?: User[];
}

const Home: FC<Props> = ({ users }) => {
  const auth = useAuth();
  return (
    <DefaultLayout>
      <Head>
        <title>Fast-Forward</title>
        <meta name="description" content="Fast-Forward" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="flex text-indigo-500 text-4xl font-semibold">
        Hello World!
        <BeakerIcon className="h-10 w-10" />
      </h1>
      <Link href="/docs">go to docs made with mdx</Link>
      <div className="space-x-4">
        <Button onClick={() => auth.signinWithGitHub()} reverse>
          Log In with GitHub
        </Button>
        <Button onClick={() => auth.signinWithGoogle()}>
          Log In with Google
        </Button>
      </div>
      {auth.user ? (
        <div>
          <p>Email: {auth.user.email}</p>
          <p>Provider: {auth.user.provider}</p>
        </div>
      ) : null}
      <div>
        <h1 className="text-indigo-500 text-4xl font-semibold">All Users</h1>
        {users?.map((user) => (
          <div key={user.uid}>
            {user.name} | {user.email} | {user.provider}
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { users } = await getAllUsers();
  return {
    props: {
      users,
    },
  };
};

export default Home;
