import { useAuth } from "@/lib/auth";
import React, { FC } from "react";
import Button from "../ui/Button";
import Footer from "./Footer";

const SitesLayout: FC = ({ children }) => {
  const { loading, user, signout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0 py-4 text-right w-full">
        {user && <Button onClick={() => signout()}>log out</Button>}
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0 py-12 flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default SitesLayout;
