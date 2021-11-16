import { useAuth } from "@/lib/auth";
import React, { FC } from "react";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Footer from "./Footer";

interface Props {
  name: string;
}

const SitesLayout: FC<Props> = ({ children, name }) => {
  const { user, signout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0 py-4 w-full flex justify-between items-center">
        <Heading as="h3" className="text-indigo-500 dark:text-pink-500">
          {name}
        </Heading>
        <div>{user && <Button onClick={() => signout()}>log out</Button>}</div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0 py-12 flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default SitesLayout;
