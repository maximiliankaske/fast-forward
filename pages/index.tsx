import { GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";
import { useAuth, User } from "../lib/auth";
import { getAllUsers } from "../lib/db-admin";

interface Props {
  users?: User[];
}

const Home: FC<Props> = ({ users }) => {
  const auth = useAuth();
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen">
      <Head>
        <title>Fast-Forward</title>
        <meta name="description" content="Fast-Forward" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-indigo-500 text-4xl font-semibold">Hello World!</h1>
        <div className="space-x-4">
          <button
            className="shadow-sm rounded-md bg-gray-800 text-white hover:bg-gray-900 px-2 py-1"
            onClick={() => auth.signinWithGitHub()}
          >
            Log In with GitHub
          </button>
          <button
            className="shadow-sm rounded-md border text-gray-900 hover:bg-gray-50 px-2 py-1"
            onClick={() => auth.signinWithGoogle()}
          >
            Log In with Google
          </button>
        </div>
        {auth.user ? (
          <div>
            <p>Email: {auth.user.email}</p>
            <p>Provider: {auth.user.provider}</p>
            <button onClick={auth.signout}>log out</button>
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
