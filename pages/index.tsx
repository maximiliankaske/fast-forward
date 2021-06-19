import { BeakerIcon } from "@heroicons/react/solid";
import { GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import Link from "../components/ui/Link";
import { useAuth, User } from "../lib/auth";
import { getAllUsers } from "../lib/db-admin";

interface Props {
  users?: User[];
}

const Home: FC<Props> = ({ users }) => {
  const auth = useAuth();
  return (
    <div className="min-h-screen min-w-screen">
      <Head>
        <title>Fast-Forward</title>
        <meta name="description" content="Fast-Forward" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="py-16 container mx-auto">
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
      </main>
      <Footer />
    </div>
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
