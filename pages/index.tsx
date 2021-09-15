import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Features from "../components/landing/Features";
import DefaultLayout from "../components/layout/DefaultLayout";
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import WidgetExample from "../components/widget/WidgetExample";
import { useAuth } from "../lib/auth";
import { getAllUsers } from "../lib/db-admin";

const Home = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const auth = useAuth();
  return (
    <DefaultLayout>
      <Head>
        <title>Fast-Forward</title>
        <meta name="description" content="Fast-Forward" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center p-16 my-6 w-full bg-indigo-700 rounded-lg">
        <Heading as="h2" className="text-white">
          How does it work?
        </Heading>
        <WidgetExample reverse />
      </div>
      <Features />
      {auth.user ? (
        <div className="mt-8">
          <p>Email: {auth.user.email}</p>
          <p>Provider: {auth.user.provider}</p>
        </div>
      ) : null}
      <hr className="my-10" />
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

export const getStaticProps = async () => {
  const { users } = await getAllUsers();
  return {
    props: {
      users: users || null,
    },
  };
};

export default Home;
